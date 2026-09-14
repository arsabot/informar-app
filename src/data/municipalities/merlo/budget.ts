import { Budget } from '../../../types/models';

export const MERLO_BUDGETS: Budget[] = [
  {
    id: 'bgt-merlo-2026',
    municipalityId: 'arg-bue-merlo',
    year: 2026,
    status: 'approved',
    statusLabel: 'Presupuesto Aprobado (Demo 2026)',
    approvedAmount: 135800000000,
    currentAmount: 135800000000,
    executedAmount: 99134000000,
    executionRate: 73,
    perCapitaAmount: 233812, // 135800000000 / 580806
    legalBasis: 'Ordenanza de Cálculo de Recursos y Presupuesto de Gastos Ejercicio 2026',
    approvalDate: '2025-12-22',
    breakdown: [
      {
        category: 'Personal y Salarios',
        amount: 59752000000,
        percentage: 44,
        color: '#0284c7',
        description: 'Sueldos y aportes de médicos, enfermeros, recolectores, inspectores y docentes municipales.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      },
      {
        category: 'Servicios Urbanos y Limpieza',
        amount: 29876000000,
        percentage: 22,
        color: '#06b6d4',
        description: 'Higiene urbana, recolección de residuos, barrido, alumbrado público LED y mantenimiento de plazas.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      },
      {
        category: 'Obras Públicas e Infraestructura',
        amount: 21728000000,
        percentage: 16,
        color: '#3b82f6',
        description: 'Pavimentación de calles barriales, conductos pluviales de desagüe y bacheo intensivo.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026', 'src-merlo-portal-obras']
      },
      {
        category: 'Salud y Hospitales Municipales',
        amount: 13580000000,
        percentage: 10,
        color: '#10b981',
        description: 'Hospital Municipal Eva Perón, Hospital Odonto-Oftalmológico y Centros de Atención Primaria (CAPS).',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      },
      {
        category: 'Seguridad y Protección Ciudadana',
        amount: 6790000000,
        percentage: 5,
        color: '#f59e0b',
        description: 'Polo de Seguridad, monitoreo de cámaras y patrullaje preventivo municipal.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      },
      {
        category: 'Educación, Deporte y Cultura',
        amount: 4074000000,
        percentage: 3,
        color: '#8b5cf6',
        description: 'Jardines maternales de Merlo, polideportivos municipales y programas culturales comunitarios.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      }
    ],
    revenueSources: [
      {
        origin: 'Tasas Municipales Directas (Servicios Generales y TISH)',
        amount: 62468000000,
        percentage: 46,
        description: 'Recaudación tributaria local directa de contribuyentes y comercios merlenses.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      },
      {
        origin: 'Coparticipación de la Provincia de Buenos Aires',
        amount: 58394000000,
        percentage: 43,
        description: 'Transferencias de la ley de coparticipación de la Provincia de Buenos Aires.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      },
      {
        origin: 'Fondos de Infraestructura y Convenios Hídricos Específicos',
        amount: 14938000000,
        percentage: 11,
        description: 'Aportes para cuencas hidráulicas y equipamiento urbano.',
        isDemo: true,
        sourceIds: ['src-merlo-hcd-presupuesto-2026']
      }
    ],
    isDemo: true,
    sourceIds: ['src-merlo-hcd-presupuesto-2026']
  },
  {
    id: 'bgt-merlo-2025',
    municipalityId: 'arg-bue-merlo',
    year: 2025,
    status: 'approved',
    statusLabel: 'Presupuesto Aprobado 2025',
    approvedAmount: 114000000000,
    currentAmount: 114000000000,
    executedAmount: 109200000000,
    executionRate: 95.7,
    perCapitaAmount: 196279,
    legalBasis: 'Ordenanza de Presupuesto General de Gastos y Cálculo de Recursos sancionada por el HCD Merlo',
    approvalDate: '2024-12-28',
    isDemo: false,
    notes: 'Presupuesto oficial 2025 sancionado y promulgado.',
    sourceIds: ['src-merlo-hcd-presupuesto-2025']
  }
];
