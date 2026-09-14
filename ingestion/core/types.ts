import { Source, Budget, Work, Tender, Regulation, Municipality } from '../../src/types/models';

export type ExtractionStatus = 'SUCCESS' | 'PARTIAL' | 'NEEDS_REVIEW' | 'FAILED';

export interface SourceDocumentMeta {
  url: string;
  title: string;
  documentType: string;
  publisher: string;
  downloadDate: string;
  sha256?: string;
  fileSizeBytes?: number;
  mimeType?: string;
  pageCount?: number;
}

export interface ExtractionLog {
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  context?: Record<string, any>;
}

export interface ExtractionResult<T> {
  entityType: 'budget' | 'work' | 'tender' | 'regulation' | 'source' | 'municipality';
  status: ExtractionStatus;
  data: T[];
  sourceDocument: SourceDocumentMeta;
  extractedCount: number;
  validCount: number;
  warnings: string[];
  errors: string[];
  durationMs: number;
}

export interface AdapterConfig {
  municipalityId: string;
  name: string;
  officialDomains: string[];        // Allowlist estricto contra SSRF
  rateLimitMs: number;             // Delay mínimo entre peticiones (ms)
  maxConcurrent: number;           // Concurrencia máxima
  userAgent: string;               // Identificador cívico
  timeoutMs: number;               // Timeout de conexión por solicitud
  maxDownloadBytes: number;        // Tamaño máximo de descarga permitido (ej. 30MB)
}

export interface IngestionRunReport {
  municipalityId: string;
  startedAt: string;
  finishedAt: string;
  totalDurationMs: number;
  status: ExtractionStatus;
  results: {
    sources?: ExtractionResult<Source>;
    budgets?: ExtractionResult<Budget>;
    works?: ExtractionResult<Work>;
    tenders?: ExtractionResult<Tender>;
    regulations?: ExtractionResult<Regulation>;
  };
  logs: ExtractionLog[];
}
