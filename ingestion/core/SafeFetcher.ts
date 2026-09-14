import crypto from 'node:crypto';
import { AdapterConfig, SourceDocumentMeta } from './types';

export interface FetchOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
  maxSizeBytes?: number;
  expectedContentType?: string;
}

export interface FetchResult {
  url: string;
  statusCode: number;
  headers: Headers;
  buffer: Buffer;
  text: string;
  sha256: string;
  contentLength: number;
  contentType: string;
  durationMs: number;
}

export class SafeFetcher {
  private config: AdapterConfig;
  private lastRequestTime: number = 0;

  constructor(config: AdapterConfig) {
    this.config = config;
  }

  /**
   * Valida que una URL pertenezca estrictamente a los dominios oficiales permitidos (Anti-SSRF).
   */
  public isUrlAllowed(rawUrl: string): { allowed: boolean; reason?: string } {
    try {
      const parsed = new URL(rawUrl);

      // Solo permitir protocolos web seguros
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { allowed: false, reason: `Protocolo no permitido: ${parsed.protocol}` };
      }

      const hostname = parsed.hostname.toLowerCase();

      // Bloqueo estricto de direcciones locales y privadas (Anti-SSRF)
      const privateIpPatterns = [
        /^localhost$/i,
        /^127\./,
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
        /^192\.168\./,
        /^169\.254\./, // Link-local / metadata cloud endpoints
        /^0\.0\.0\.0/,
        /^::1$/,
        /^fc00:/,
        /^fe80:/
      ];

      for (const pattern of privateIpPatterns) {
        if (pattern.test(hostname)) {
          return { allowed: false, reason: `Acceso denegado a red privada/local: ${hostname}` };
        }
      }

      // Comprobar contra la lista blanca de dominios oficiales del adapter
      const isWhitelisted = this.config.officialDomains.some(domain => {
        const d = domain.toLowerCase();
        return hostname === d || hostname.endsWith(`.${d}`);
      });

      if (!isWhitelisted) {
        return { 
          allowed: false, 
          reason: `El dominio '${hostname}' no está en la lista de dominios autorizados para ${this.config.name}` 
        };
      }

      return { allowed: true };
    } catch (e: any) {
      return { allowed: false, reason: `URL inválida o malformada: ${e?.message || 'Error de parseo'}` };
    }
  }

  /**
   * Aplica rate limiting ético esperando el intervalo mínimo configurado.
   */
  private async applyRateLimit(): Promise<void> {
    const now = Date.now();
    const elapsed = now - this.lastRequestTime;
    const requiredDelay = this.config.rateLimitMs || 1500;

    if (elapsed < requiredDelay) {
      const waitTime = requiredDelay - elapsed;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    this.lastRequestTime = Date.now();
  }

  /**
   * Realiza una solicitud HTTP segura respetando límites de tamaño, timeouts y lista blanca.
   */
  public async fetch(url: string, options: FetchOptions = {}): Promise<FetchResult> {
    const urlCheck = this.isUrlAllowed(url);
    if (!urlCheck.allowed) {
      throw new Error(`[SafeFetcher Block] ${urlCheck.reason}`);
    }

    await this.applyRateLimit();

    const startTime = Date.now();
    const timeoutMs = options.timeoutMs || this.config.timeoutMs || 15000;
    const maxSizeBytes = options.maxSizeBytes || this.config.maxDownloadBytes || 25 * 1024 * 1024; // 25 MB

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': this.config.userAgent || 'INFORMAR-CivicBot/1.0 (+https://informar.org.ar/datos-abiertos)',
          'Accept': 'text/html,application/xhtml+xml,application/xml,application/pdf;q=0.9,*/*;q=0.8',
          'Accept-Language': 'es-AR,es;q=0.9,en;q=0.8',
          ...options.headers,
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status} (${response.statusText}) al consultar ${url}`);
      }

      const contentLengthHeader = response.headers.get('content-length');
      if (contentLengthHeader && parseInt(contentLengthHeader, 10) > maxSizeBytes) {
        throw new Error(`El recurso excede el límite máximo de descarga permitido (${maxSizeBytes} bytes)`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      if (buffer.length > maxSizeBytes) {
        throw new Error(`El archivo descargado (${buffer.length} bytes) superó el límite permitido`);
      }

      const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
      const text = buffer.toString('utf-8');
      const contentType = response.headers.get('content-type') || 'application/octet-stream';

      return {
        url,
        statusCode: response.status,
        headers: response.headers,
        buffer,
        text,
        sha256,
        contentLength: buffer.length,
        contentType,
        durationMs: Date.now() - startTime
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error(`Timeout de conexión (${timeoutMs}ms) al acceder a ${url}`);
      }
      throw err;
    }
  }

  /**
   * Genera los metadatos de trazabilidad para un documento descargado.
   */
  public createDocumentMeta(
    fetchResult: FetchResult, 
    title: string, 
    documentType: string
  ): SourceDocumentMeta {
    return {
      url: fetchResult.url,
      title,
      documentType,
      publisher: this.config.name,
      downloadDate: new Date().toISOString().split('T')[0],
      sha256: fetchResult.sha256,
      fileSizeBytes: fetchResult.contentLength,
      mimeType: fetchResult.contentType
    };
  }
}
