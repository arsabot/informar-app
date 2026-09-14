/**
 * Modelos de datos centralizados para INFORMAR
 * Diseñados para representar información pública municipal oficial de forma estructurada,
 * con soporte para campos opcionales, valores numéricos puros (sin '$') y fechas en formato ISO (YYYY-MM-DD).
 */

export type InformationStatus = 'available' | 'not_available' | 'pending' | 'demo';

export type DocumentType = 
  | 'ordenanza' 
  | 'boletin_oficial' 
  | 'resolucion' 
  | 'decreto' 
  | 'portal_transparencia' 
  | 'acta_hcd' 
  | 'noticia_oficial' 
  | 'otro';

export type SourceType = 'direct_document' | 'portal_search' | 'reference_estimate';

export interface Source {
  id: string;
  title: string;
  publisher: string;
  documentType: DocumentType;
  sourceType?: SourceType;
  legalBasis?: string;      // Ej: 'Ordenanza HCD N° 3842'
  fileNumber?: string;      // Ej: 'EXP-2026-004128'
  sectionOrPage?: string;   // Ej: 'Boletín Oficial N° 142, Pág. 45'
  sha256?: string;          // Hash criptográfico de integridad
  howToFind?: string;       // Instrucciones para ubicar el dato en la fuente oficial
  publicationDate?: string; // Formato ISO: YYYY-MM-DD
  accessDate: string;       // Formato ISO: YYYY-MM-DD
  url?: string;
  isOfficial: boolean;
  status: 'available' | 'pending' | 'unavailable';
  notes?: string;
}

export interface Municipality {
  id: string;            // Ej: 'arg-bue-merlo'
  slug: string;          // Ej: 'merlo'
  name: string;          // Ej: 'Merlo'
  fullName?: string;     // Ej: 'Municipio de Merlo'
  province: string;      // Ej: 'Buenos Aires'
  country: string;       // Ej: 'Argentina'
  population?: number;   // Ej: 580806 (Censo/estimación verificada)
  isPilot?: boolean;     // true para el municipio piloto
  region?: string;       // Ej: 'AMBA' | 'Pampa' | 'Cuyo' | etc.
  description?: string;
  slogan?: string;
  tags?: string[];
  sourceIds: string[];
}

export type BudgetStatus = 'approved' | 'in_review' | 'executed' | 'draft' | 'pending';

export interface BudgetCategoryBreakdown {
  category: string;
  amount?: number;       // Valor numérico puro en ARS
  percentage?: number;   // 0 a 100
  color?: string;
  description?: string;
  isDemo?: boolean;      // true si es una estimación demostrativa para el simulador
  sourceIds?: string[];
}

export interface BudgetRevenueSource {
  origin: string;
  amount?: number;       // Valor numérico puro en ARS
  percentage?: number;   // 0 a 100
  description?: string;
  isDemo?: boolean;
  sourceIds?: string[];
}

export interface Budget {
  id: string;
  municipalityId: string;
  year: number;          // Ej: 2025, 2026
  status: BudgetStatus;
  statusLabel?: string;  // Ej: 'Aprobado por el HCD', 'En tratamiento'
  approvedAmount?: number;
  currentAmount?: number;
  executedAmount?: number;
  executionRate?: number; // Porcentaje ejecutado (0 a 100)
  perCapitaAmount?: number;
  legalBasis?: string;   // Ej: 'Ordenanza Presupuestaria HCD'
  approvalDate?: string; // Formato ISO: YYYY-MM-DD
  breakdown?: BudgetCategoryBreakdown[];
  revenueSources?: BudgetRevenueSource[];
  isDemo?: boolean;
  notes?: string;
  sourceIds: string[];
}

export type AccountabilityStatus = 
  | 'approved' 
  | 'approved_unanimously' 
  | 'in_review' 
  | 'rejected' 
  | 'pending';

export interface Accountability {
  id: string;
  municipalityId: string;
  year: number;          // Ej: 2024, 2025
  status: AccountabilityStatus;
  statusLabel: string;   // Ej: 'Aprobada', 'Aprobada por unanimidad'
  approvalDate?: string; // Formato ISO: YYYY-MM-DD
  legislativeBody: string; // Ej: 'Honorable Concejo Deliberante de Merlo'
  legalBasis?: string;   // Ej: 'Tratamiento y Aprobación en Sesión Ordinaria'
  summary?: string;
  totalIncomeExecuted?: number;
  totalExpenseExecuted?: number;
  fiscalBalance?: number; // Superávit o Déficit
  sourceIds: string[];
}

export type WorkStatus = 'in_progress' | 'completed' | 'tendered' | 'paused' | 'planned' | 'pending_data';

export interface Work {
  id: string;
  municipalityId: string;
  name: string;
  location?: string;
  description?: string;
  status: WorkStatus;
  statusLabel?: string;  // Ej: 'En ejecución', 'Finalizada', 'Licitada'
  budget?: number;       // Valor numérico puro
  executedBudget?: number;
  progress?: number;     // 0 a 100
  contractor?: string;
  contractorTaxId?: string; // CUIT
  startDate?: string;    // Formato ISO: YYYY-MM-DD o YYYY-MM
  estimatedEndDate?: string; // Formato ISO: YYYY-MM-DD o YYYY-MM
  category?: string;     // Ej: 'Vial y Pavimentación', 'Salud y Hospitales', etc.
  sourceIds: string[];
  isDemo?: boolean;
}

export type TenderType = 
  | 'public_tender' 
  | 'private_tender' 
  | 'direct_procurement' 
  | 'price_contest' 
  | 'other';

export type TenderStatus = 
  | 'awarded' 
  | 'in_evaluation' 
  | 'completed' 
  | 'deserted' 
  | 'pending';

export interface Tender {
  id: string;
  municipalityId: string;
  fileNumber?: string;   // Expediente oficial
  date: string;          // Formato ISO: YYYY-MM-DD
  title: string;
  provider?: string;
  providerTaxId?: string; // CUIT
  amount?: number;       // Valor numérico puro
  type: TenderType;
  typeLabel?: string;    // Ej: 'Licitación Pública', 'Contratación Directa'
  status: TenderStatus;
  statusLabel?: string;  // Ej: 'Adjudicada', 'En evaluación'
  requestingArea?: string;
  sourceIds: string[];
  isDemo?: boolean;
}

export interface Regulation {
  id: string;
  municipalityId: string;
  type: 'ordenanza' | 'decreto' | 'resolucion';
  number: string;
  year: number;
  title: string;
  date?: string;         // Formato ISO: YYYY-MM-DD
  summary?: string;
  promulgationDate?: string;
  sourceIds: string[];
}
