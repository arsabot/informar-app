import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { SourceDocumentMeta } from '../core/types';

export class DocumentVault {
  private vaultDir: string;

  constructor(customVaultDir?: string) {
    this.vaultDir = customVaultDir || path.resolve(process.cwd(), 'ingestion/data/vault');
  }

  private async ensureDir(): Promise<void> {
    await fs.mkdir(this.vaultDir, { recursive: true });
  }

  /**
   * Almacena un documento binario (PDF o HTML) indexado por su hash SHA-256 y guarda su manifiesto.
   */
  public async storeDocument(
    buffer: Buffer, 
    meta: Omit<SourceDocumentMeta, 'sha256' | 'fileSizeBytes'>, 
    extension: string = 'bin'
  ): Promise<SourceDocumentMeta> {
    await this.ensureDir();

    const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
    const filename = `${sha256}.${extension.replace(/^\./, '')}`;
    const filePath = path.join(this.vaultDir, filename);
    const metaPath = path.join(this.vaultDir, `${sha256}.meta.json`);

    const fullMeta: SourceDocumentMeta = {
      ...meta,
      sha256,
      fileSizeBytes: buffer.length
    };

    // Guardar el archivo crudo y el manifiesto JSON de auditoría
    await fs.writeFile(filePath, buffer);
    await fs.writeFile(metaPath, JSON.stringify(fullMeta, null, 2), 'utf-8');

    return fullMeta;
  }

  /**
   * Recupera un documento almacenado por su hash SHA-256.
   */
  public async getDocument(sha256: string, extension: string = 'bin'): Promise<Buffer | null> {
    try {
      const filePath = path.join(this.vaultDir, `${sha256}.${extension.replace(/^\./, '')}`);
      return await fs.readFile(filePath);
    } catch {
      return null;
    }
  }

  /**
   * Lee los metadatos de un documento por su hash.
   */
  public async getDocumentMeta(sha256: string): Promise<SourceDocumentMeta | null> {
    try {
      const metaPath = path.join(this.vaultDir, `${sha256}.meta.json`);
      const raw = await fs.readFile(metaPath, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}
