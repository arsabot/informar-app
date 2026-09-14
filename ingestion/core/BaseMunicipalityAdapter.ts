import { 
  AdapterConfig, 
  ExtractionResult, 
  ExtractionLog, 
  IngestionRunReport 
} from './types';
import { SafeFetcher } from './SafeFetcher';
import { Budget, Work, Tender, Regulation, Source, Municipality } from '../../src/types/models';

export abstract class BaseMunicipalityAdapter {
  public readonly config: AdapterConfig;
  protected fetcher: SafeFetcher;
  protected logs: ExtractionLog[] = [];

  constructor(config: AdapterConfig) {
    this.config = config;
    this.fetcher = new SafeFetcher(config);
  }

  protected log(level: 'info' | 'warn' | 'error', message: string, context?: Record<string, any>) {
    this.logs.push({
      level,
      message,
      timestamp: new Date().toISOString(),
      context
    });
  }

  /**
   * Extrae los metadatos institucionales del municipio.
   */
  abstract extractMunicipalityProfile(): Promise<ExtractionResult<Municipality>>;

  /**
   * Extrae el catálogo de fuentes oficiales y documentos primarios.
   */
  abstract extractSources(): Promise<ExtractionResult<Source>>;

  /**
   * Extrae presupuestos generales de gastos y recursos (ordenanzas, distribuciones).
   */
  abstract extractBudgets(): Promise<ExtractionResult<Budget>>;

  /**
   * Extrae el registro de obras públicas e infraestructura.
   */
  abstract extractWorks(): Promise<ExtractionResult<Work>>;

  /**
   * Extrae las contrataciones, compras directas y licitaciones públicas.
   */
  abstract extractTenders(): Promise<ExtractionResult<Tender>>;

  /**
   * Extrae ordenanzas, decretos y resoluciones regulatorias relevantes.
   */
  abstract extractRegulations(): Promise<ExtractionResult<Regulation>>;

  /**
   * Ejecuta una corrida completa de ingestión para el municipio coordinando todos los extractores.
   */
  public async runFullIngestion(): Promise<IngestionRunReport> {
    const startedAt = new Date().toISOString();
    const startTime = Date.now();
    this.logs = [];

    this.log('info', `Iniciando corrida de ingestión para ${this.config.name} (${this.config.municipalityId})`);

    let sourcesRes: ExtractionResult<Source> | undefined;
    let budgetsRes: ExtractionResult<Budget> | undefined;
    let worksRes: ExtractionResult<Work> | undefined;
    let tendersRes: ExtractionResult<Tender> | undefined;
    let regulationsRes: ExtractionResult<Regulation> | undefined;

    try {
      this.log('info', 'Paso 1/5: Extrayendo fuentes oficiales...');
      sourcesRes = await this.extractSources();
    } catch (e: any) {
      this.log('error', `Fallo al extraer fuentes: ${e?.message}`);
    }

    try {
      this.log('info', 'Paso 2/5: Extrayendo presupuestos...');
      budgetsRes = await this.extractBudgets();
    } catch (e: any) {
      this.log('error', `Fallo al extraer presupuestos: ${e?.message}`);
    }

    try {
      this.log('info', 'Paso 3/5: Extrayendo obras públicas...');
      worksRes = await this.extractWorks();
    } catch (e: any) {
      this.log('error', `Fallo al extraer obras públicas: ${e?.message}`);
    }

    try {
      this.log('info', 'Paso 4/5: Extrayendo contrataciones y licitaciones...');
      tendersRes = await this.extractTenders();
    } catch (e: any) {
      this.log('error', `Fallo al extraer contrataciones: ${e?.message}`);
    }

    try {
      this.log('info', 'Paso 5/5: Extrayendo ordenanzas y regulaciones...');
      regulationsRes = await this.extractRegulations();
    } catch (e: any) {
      this.log('error', `Fallo al extraer regulaciones: ${e?.message}`);
    }

    const finishedAt = new Date().toISOString();
    const totalDurationMs = Date.now() - startTime;

    // Calcular estado global
    const results = [sourcesRes, budgetsRes, worksRes, tendersRes, regulationsRes].filter(Boolean);
    const hasFailures = results.some(r => r?.status === 'FAILED');
    const hasPartial = results.some(r => r?.status === 'PARTIAL' || r?.status === 'NEEDS_REVIEW');

    let overallStatus: 'SUCCESS' | 'PARTIAL' | 'NEEDS_REVIEW' | 'FAILED' = 'SUCCESS';
    if (hasFailures && results.length === 0) overallStatus = 'FAILED';
    else if (hasFailures || hasPartial) overallStatus = 'PARTIAL';

    this.log('info', `Corrida completada con estado ${overallStatus} en ${totalDurationMs}ms`);

    return {
      municipalityId: this.config.municipalityId,
      startedAt,
      finishedAt,
      totalDurationMs,
      status: overallStatus,
      results: {
        sources: sourcesRes,
        budgets: budgetsRes,
        works: worksRes,
        tenders: tendersRes,
        regulations: regulationsRes
      },
      logs: this.logs
    };
  }
}
