import { MerloAdapter } from './adapters/merlo/MerloAdapter';
import { SnapshotStore } from './storage/SnapshotStore';
import { DocumentVault } from './storage/DocumentVault';

async function main() {
  console.log('===========================================================');
  console.log('🏛️  INFORMAR — Motor de Ingestión y Web Scraping Cívico');
  console.log('===========================================================\n');

  const snapshotStore = new SnapshotStore();
  const documentVault = new DocumentVault();

  // Registro de adaptadores disponibles
  const adapters = [
    new MerloAdapter()
  ];

  for (const adapter of adapters) {
    console.log(`📡 [Iniciando] Conector: ${adapter.config.name} (${adapter.config.municipalityId})`);
    console.log(`🔒 Dominios autorizados (Anti-SSRF): ${adapter.config.officialDomains.join(', ')}`);
    console.log(`⏱️  Rate limit configurado: ${adapter.config.rateLimitMs}ms\n`);

    const report = await adapter.runFullIngestion();

    // Guardar reporte de auditoría
    const reportPath = await snapshotStore.saveReport(report);
    console.log(`📄 Reporte de auditoría guardado en: ${reportPath}`);

    // Extraer datos validados
    const sources = report.results.sources?.data || [];
    const budgets = report.results.budgets?.data || [];
    const works = report.results.works?.data || [];
    const tenders = report.results.tenders?.data || [];
    const regulations = report.results.regulations?.data || [];

    // Guardar snapshot estructurado consumible por la aplicación
    const snapshotPath = await snapshotStore.saveMunicipalitySnapshot(
      adapter.config.municipalityId,
      {
        sources,
        budgets,
        works,
        tenders,
        regulations,
        metadata: {
          lastExtractedAt: report.finishedAt,
          overallStatus: report.status
        }
      }
    );

    console.log(`💾 Snapshot estructurado generado en: ${snapshotPath}\n`);

    // Mostrar tabla resumen de la corrida
    console.log('-----------------------------------------------------------');
    console.log(`📊 Resumen de Extracción para ${adapter.config.name}:`);
    console.log('-----------------------------------------------------------');
    console.table([
      { 
        Entidad: 'Fuentes Oficiales', 
        Extraídos: report.results.sources?.extractedCount ?? 0, 
        Válidos: report.results.sources?.validCount ?? 0, 
        Estado: report.results.sources?.status ?? 'N/A' 
      },
      { 
        Entidad: 'Presupuestos', 
        Extraídos: report.results.budgets?.extractedCount ?? 0, 
        Válidos: report.results.budgets?.validCount ?? 0, 
        Estado: report.results.budgets?.status ?? 'N/A' 
      },
      { 
        Entidad: 'Obras Públicas', 
        Extraídos: report.results.works?.extractedCount ?? 0, 
        Válidos: report.results.works?.validCount ?? 0, 
        Estado: report.results.works?.status ?? 'N/A' 
      },
      { 
        Entidad: 'Contrataciones', 
        Extraídos: report.results.tenders?.extractedCount ?? 0, 
        Válidos: report.results.tenders?.validCount ?? 0, 
        Estado: report.results.tenders?.status ?? 'N/A' 
      },
      { 
        Entidad: 'Regulaciones', 
        Extraídos: report.results.regulations?.extractedCount ?? 0, 
        Válidos: report.results.regulations?.validCount ?? 0, 
        Estado: report.results.regulations?.status ?? 'N/A' 
      }
    ]);
    console.log(`⏱️  Duración total: ${report.totalDurationMs}ms`);
    console.log(`🎯 Estado global: ${report.status}\n`);
  }

  console.log('✅ Ingestión finalizada con éxito.');
}

main().catch(err => {
  console.error('❌ Error crítico en el motor de ingestión:', err);
  process.exit(1);
});
