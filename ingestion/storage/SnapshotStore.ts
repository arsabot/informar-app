import fs from 'node:fs/promises';
import path from 'node:path';
import { IngestionRunReport } from '../core/types';

export class SnapshotStore {
  private reportsDir: string;
  private snapshotsDir: string;

  constructor() {
    this.reportsDir = path.resolve(process.cwd(), 'ingestion/data/reports');
    this.snapshotsDir = path.resolve(process.cwd(), 'src/data/snapshots');
  }

  private async ensureDirs(): Promise<void> {
    await fs.mkdir(this.reportsDir, { recursive: true });
    await fs.mkdir(this.snapshotsDir, { recursive: true });
  }

  /**
   * Guarda el reporte de ejecución de una corrida de ingestión.
   */
  public async saveReport(report: IngestionRunReport): Promise<string> {
    await this.ensureDirs();
    const timestamp = report.startedAt.replace(/[:.]/g, '-');
    const filename = `run-${report.municipalityId}-${timestamp}.json`;
    const filePath = path.join(this.reportsDir, filename);

    await fs.writeFile(filePath, JSON.stringify(report, null, 2), 'utf-8');
    return filePath;
  }

  /**
   * Genera el snapshot estructurado en TypeScript/JSON consumible por el frontend de INFORMAR.
   */
  public async saveMunicipalitySnapshot(
    municipalityId: string, 
    data: {
      sources: any[];
      budgets: any[];
      works: any[];
      tenders: any[];
      regulations: any[];
      metadata: {
        lastExtractedAt: string;
        overallStatus: string;
      };
    }
  ): Promise<string> {
    await this.ensureDirs();
    const snapshotPath = path.join(this.snapshotsDir, `${municipalityId}.snapshot.json`);
    await fs.writeFile(snapshotPath, JSON.stringify(data, null, 2), 'utf-8');
    return snapshotPath;
  }

  /**
   * Carga el snapshot más reciente de un municipio si existe.
   */
  public async loadMunicipalitySnapshot(municipalityId: string): Promise<any | null> {
    try {
      const snapshotPath = path.join(this.snapshotsDir, `${municipalityId}.snapshot.json`);
      const content = await fs.readFile(snapshotPath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }
}
