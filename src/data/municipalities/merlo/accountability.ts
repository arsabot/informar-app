import { Accountability } from '../../../types/models';

export const MERLO_ACCOUNTABILITY: Accountability[] = [
  {
    id: 'acc-merlo-2025',
    municipalityId: 'arg-bue-merlo',
    year: 2025,
    status: 'approved_unanimously',
    statusLabel: 'Aprobada por unanimidad',
    approvalDate: '2026-05-18',
    legislativeBody: 'Honorable Concejo Deliberante de Merlo',
    legalBasis: 'Aprobación por unanimidad de todos los bloques políticos en Sesión Ordinaria del HCD',
    summary: 'Rendición de cuentas del ejercicio presupuestario 2025 tratada y aprobada por unanimidad por el cuerpo legislativo municipal.',
    totalIncomeExecuted: 112400000000,
    totalExpenseExecuted: 109200000000,
    fiscalBalance: 3200000000,
    sourceIds: ['src-merlo-hcd-rendicion-2025']
  },
  {
    id: 'acc-merlo-2024',
    municipalityId: 'arg-bue-merlo',
    year: 2024,
    status: 'approved',
    statusLabel: 'Aprobada',
    approvalDate: '2025-05-15',
    legislativeBody: 'Honorable Concejo Deliberante de Merlo',
    legalBasis: 'Aprobada conforme a la Ley Orgánica de las Municipalidades',
    summary: 'Rendición de cuentas del ejercicio fiscal 2024 correspondiente a la ejecución de recursos y gastos.',
    totalIncomeExecuted: 81500000000,
    totalExpenseExecuted: 78900000000,
    fiscalBalance: 2600000000,
    sourceIds: ['src-merlo-hcd-rendicion-2024']
  }
];
