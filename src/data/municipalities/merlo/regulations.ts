import { Regulation } from '../../../types/models';

export const MERLO_REGULATIONS: Regulation[] = [
  {
    id: 'reg-merlo-ord-2025-pres',
    municipalityId: 'arg-bue-merlo',
    type: 'ordenanza',
    number: 'ORD-HCD-2025-01',
    year: 2025,
    title: 'Ordenanza de Presupuesto General de Gastos y Cálculo de Recursos — Ejercicio 2025',
    date: '2024-12-28',
    summary: 'Aprobación del presupuesto municipal de la Administración Central para el ejercicio 2025.',
    promulgationDate: '2024-12-30',
    sourceIds: ['src-merlo-hcd-presupuesto-2025']
  },
  {
    id: 'reg-merlo-res-2025-rend',
    municipalityId: 'arg-bue-merlo',
    type: 'resolucion',
    number: 'RES-HCD-2026-08',
    year: 2025,
    title: 'Aprobación de la Rendición de Cuentas — Ejercicio 2025',
    date: '2026-05-18',
    summary: 'Aprobación por unanimidad de la Rendición de Cuentas y Estado de Ejecución de Recursos y Gastos del Ejercicio 2025.',
    sourceIds: ['src-merlo-hcd-rendicion-2025']
  },
  {
    id: 'reg-merlo-res-2024-rend',
    municipalityId: 'arg-bue-merlo',
    type: 'resolucion',
    number: 'RES-HCD-2025-06',
    year: 2024,
    title: 'Aprobación de la Rendición de Cuentas — Ejercicio 2024',
    date: '2025-05-15',
    summary: 'Aprobación de la Rendición de Cuentas del Ejercicio 2024 por el Honorable Concejo Deliberante.',
    sourceIds: ['src-merlo-hcd-rendicion-2024']
  },
  {
    id: 'reg-merlo-ord-2026-pres',
    municipalityId: 'arg-bue-merlo',
    type: 'ordenanza',
    number: 'ORD-HCD-2026-01',
    year: 2026,
    title: 'Ordenanza Preparatoria de Presupuesto — Ejercicio 2026',
    date: '2025-12-22',
    summary: 'Documentación presupuestaria y cálculo de recursos para el ejercicio 2026.',
    sourceIds: ['src-merlo-hcd-presupuesto-2026']
  }
];
