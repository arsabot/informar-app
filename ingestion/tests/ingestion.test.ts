import { SafeFetcher } from '../core/SafeFetcher';
import { Normalizer } from '../parsers/Normalizer';
import { HtmlTableExtractor } from '../parsers/HtmlTableExtractor';
import { QualityGate } from '../validators/QualityGate';
import { BudgetSchema, TenderSchema } from '../validators/schemas';
import { MerloAdapter, MERLO_ADAPTER_CONFIG } from '../adapters/merlo/MerloAdapter';

async function runTests() {
  console.log('🧪 Ejecutando Suite de Pruebas Automatizadas de Ingestión...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. Tests de Seguridad Anti-SSRF (SafeFetcher)
  console.log('🔒 1. Pruebas de Seguridad y Anti-SSRF:');
  const fetcher = new SafeFetcher(MERLO_ADAPTER_CONFIG);

  assert(!fetcher.isUrlAllowed('http://localhost:8080/admin').allowed, 'Bloquea localhost');
  assert(!fetcher.isUrlAllowed('http://127.0.0.1:5173').allowed, 'Bloquea IP de loopback 127.0.0.1');
  assert(!fetcher.isUrlAllowed('http://192.168.1.1/secret').allowed, 'Bloquea subred privada 192.168.x');
  assert(!fetcher.isUrlAllowed('http://169.254.169.254/latest/meta-data').allowed, 'Bloquea metadata link-local 169.254.x');
  assert(!fetcher.isUrlAllowed('http://malicious-site.com/exploit').allowed, 'Bloquea dominios fuera de la allowlist');
  assert(fetcher.isUrlAllowed('https://merlo.gob.ar/presupuesto').allowed, 'Permite dominio oficial https://merlo.gob.ar');
  assert(fetcher.isUrlAllowed('https://hcdmerlo.gob.ar/ordenanzas').allowed, 'Permite subdominio oficial https://hcdmerlo.gob.ar');

  // 2. Tests de Normalización (Normalizer)
  console.log('\n📐 2. Pruebas de Normalización de Monedas, Fechas y CUIT:');
  assert(Normalizer.parseCurrency('$ 145.200.000,50') === 145200000.5, 'Normaliza moneda ARS con puntos y coma decimal');
  assert(Normalizer.parseCurrency('150M') === 150000000, 'Normaliza notación abreviada en millones (150M)');
  assert(Normalizer.parseCurrency('12.500') === 12500, 'Normaliza miles con punto');
  assert(Normalizer.parseDate('28/12/2024') === '2024-12-28', 'Normaliza fecha DD/MM/YYYY a ISO');
  assert(Normalizer.parseDate('15 de mayo de 2025') === '2025-05-15', 'Normaliza fecha en lenguaje natural');
  assert(Normalizer.formatCuit('30712345678') === '30-71234567-8', 'Formatea CUIT numérico a XX-XXXXXXXX-X');
  assert(Normalizer.formatCuit('123') === undefined, 'Rechaza CUIT inválido con longitud incorrecta');

  // 3. Tests de Extracción HTML (HtmlTableExtractor)
  console.log('\n📑 3. Pruebas de Extracción de Tablas HTML:');
  const sampleHtml = `
    <table>
      <thead>
        <tr><th>Expediente</th><th>Objeto</th><th>Monto</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>EXP-101</td>
          <td><a href="/compras/101">Adquisición de Insumos</a></td>
          <td>$ 5.000.000</td>
        </tr>
      </tbody>
    </table>
  `;
  const tables = HtmlTableExtractor.extractTables(sampleHtml);
  assert(tables.length === 1, 'Detecta 1 tabla HTML');
  assert(tables[0].rowCount === 1, 'Extrae 1 fila estructurada');
  assert(tables[0].rows[0]['expediente'] === 'EXP-101', 'Mapea columna expediente correctamente');
  assert(tables[0].rows[0]['objeto_link'] === '/compras/101', 'Preserva el enlace embebido en la celda');

  // 4. Tests de Quality Gate y Validación Zod
  console.log('\n🛡️ 4. Pruebas de Quality Gate & Validación Zod:');
  const validTender = {
    id: 't-1',
    municipalityId: 'arg-bue-merlo',
    date: '2026-08-01',
    title: 'Adquisición de Luminarias LED',
    amount: 10000000,
    type: 'public_tender' as const,
    status: 'awarded' as const,
    sourceIds: ['src-1']
  };
  const gateValid = QualityGate.validateBatch([validTender], TenderSchema);
  assert(gateValid.status === 'SUCCESS' && gateValid.validItems.length === 1, 'QualityGate aprueba licitación válida');

  const invalidTender = {
    id: '',
    municipalityId: 'arg-bue-merlo',
    date: 'fecha-invalida',
    title: 'AB',
    amount: -500,
    type: 'tipo_inexistente',
    status: 'desconocido',
    sourceIds: []
  };
  const gateInvalid = QualityGate.validateBatch([invalidTender as any], TenderSchema);
  assert(gateInvalid.status === 'FAILED' && gateInvalid.errors.length > 0, 'QualityGate rechaza esquema inválido y emite errores');

  // 5. Test del Adapter de Merlo
  console.log('\n🔌 5. Pruebas del Conector MerloAdapter:');
  const adapter = new MerloAdapter();
  const report = await adapter.runFullIngestion();
  assert(report.status === 'SUCCESS', 'MerloAdapter completa corrida con estado SUCCESS');
  assert((report.results.budgets?.data.length || 0) >= 2, 'MerloAdapter extrae presupuestos válidos');
  assert((report.results.works?.data.length || 0) >= 5, 'MerloAdapter extrae obras públicas válidas');
  assert((report.results.tenders?.data.length || 0) >= 5, 'MerloAdapter extrae contrataciones válidas');

  console.log('\n===========================================================');
  console.log(`📊 Resultado Final: ${passed} pruebas superadas, ${failed} fallidas`);
  console.log('===========================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Error al ejecutar tests:', err);
  process.exit(1);
});
