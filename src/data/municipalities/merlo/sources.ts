import { Source } from '../../../types/models';

export const MERLO_SOURCES: Source[] = [
  {
    id: 'src-merlo-hcd-presupuesto-2025',
    title: 'Ordenanza de Presupuesto General de Gastos y Cálculo de Recursos — Ejercicio 2025',
    publisher: 'Honorable Concejo Deliberante de Merlo',
    documentType: 'ordenanza',
    publicationDate: '2024-12-28',
    accessDate: '2026-08-20',
    url: 'https://merlo.gob.ar/demo/hcd/ordenanza-presupuesto-2025',
    isOfficial: true,
    status: 'available',
    notes: 'Presupuesto municipal aprobado para el ejercicio fiscal 2025 por el HCD de Merlo.'
  },
  {
    id: 'src-merlo-hcd-presupuesto-2026',
    title: 'Documentación y Proyección Presupuestaria — Ejercicio 2026',
    publisher: 'Honorable Concejo Deliberante y Secretaría de Economía de Merlo',
    documentType: 'ordenanza',
    publicationDate: '2025-12-22',
    accessDate: '2026-08-20',
    url: 'https://merlo.gob.ar/demo/hcd/presupuesto-2026',
    isOfficial: true,
    status: 'available',
    notes: 'Tratamiento y documentación oficial de recursos y partidas para el ejercicio 2026.'
  },
  {
    id: 'src-merlo-hcd-rendicion-2024',
    title: 'Rendición de Cuentas y Balance de Ejecución Presupuestaria — Ejercicio 2024',
    publisher: 'Honorable Concejo Deliberante de Merlo',
    documentType: 'resolucion',
    publicationDate: '2025-05-15',
    accessDate: '2026-08-20',
    url: 'https://merlo.gob.ar/demo/hcd/rendicion-cuentas-2024',
    isOfficial: true,
    status: 'available',
    notes: 'Rendición de cuentas anual correspondiente al ejercicio 2024 aprobada en sesión del HCD.'
  },
  {
    id: 'src-merlo-hcd-rendicion-2025',
    title: 'Rendición de Cuentas y Estado de Ejecución de Recursos y Gastos — Ejercicio 2025',
    publisher: 'Honorable Concejo Deliberante de Merlo',
    documentType: 'resolucion',
    publicationDate: '2026-05-18',
    accessDate: '2026-08-20',
    url: 'https://merlo.gob.ar/demo/hcd/rendicion-cuentas-2025',
    isOfficial: true,
    status: 'available',
    notes: 'Rendición de cuentas 2025 aprobada por unanimidad por todos los bloques del Honorable Concejo Deliberante.'
  },
  {
    id: 'src-merlo-portal-obras',
    title: 'Catálogo Oficial de Obras Públicas y Plan de Infraestructura Barrial',
    publisher: 'Secretaría de Obras y Servicios Públicos — Municipalidad de Merlo',
    documentType: 'portal_transparencia',
    accessDate: '2026-08-20',
    url: 'https://merlo.gob.ar/demo/obras-publicas',
    isOfficial: true,
    status: 'available',
    notes: 'Registro georreferenciado y seguimiento físico de obras viales, hidráulicas y edilicias.'
  },
  {
    id: 'src-merlo-compras',
    title: 'Registro de Licitaciones Públicas, Concursos y Compras Directas',
    publisher: 'Dirección de Compras y Suministros — Municipalidad de Merlo',
    documentType: 'portal_transparencia',
    accessDate: '2026-08-20',
    url: 'https://merlo.gob.ar/demo/compras-y-licitaciones',
    isOfficial: true,
    status: 'available',
    notes: 'Pliegos licitatorios, decretos de adjudicación y órdenes de compra con proveedores.'
  }
];

export function getMerloSource(id: string): Source | undefined {
  return MERLO_SOURCES.find(s => s.id === id);
}
