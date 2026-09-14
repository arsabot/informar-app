import { z } from 'zod';

export const SourceDocumentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  publisher: z.string().min(2),
  documentType: z.enum([
    'ordenanza', 
    'boletin_oficial', 
    'resolucion', 
    'decreto', 
    'portal_transparencia', 
    'acta_hcd', 
    'noticia_oficial', 
    'otro'
  ]),
  sourceType: z.enum(['direct_document', 'portal_search', 'reference_estimate']).optional(),
  legalBasis: z.string().optional(),
  fileNumber: z.string().optional(),
  sectionOrPage: z.string().optional(),
  sha256: z.string().optional(),
  howToFind: z.string().optional(),
  publicationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  accessDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  url: z.string().url().optional(),
  isOfficial: z.boolean(),
  status: z.enum(['available', 'pending', 'unavailable']),
  notes: z.string().optional()
});

export const BudgetCategoryBreakdownSchema = z.object({
  category: z.string().min(2),
  amount: z.number().nonnegative().optional(),
  percentage: z.number().min(0).max(100).optional(),
  color: z.string().optional(),
  description: z.string().optional(),
  isDemo: z.boolean().optional(),
  sourceIds: z.array(z.string()).optional()
});

export const BudgetRevenueSourceSchema = z.object({
  origin: z.string().min(2),
  amount: z.number().nonnegative().optional(),
  percentage: z.number().min(0).max(100).optional(),
  description: z.string().optional(),
  isDemo: z.boolean().optional(),
  sourceIds: z.array(z.string()).optional()
});

export const BudgetSchema = z.object({
  id: z.string().min(1),
  municipalityId: z.string().min(1),
  year: z.number().int().min(2015).max(2035),
  status: z.enum(['approved', 'in_review', 'executed', 'draft', 'pending']),
  statusLabel: z.string().optional(),
  approvedAmount: z.number().positive().optional(),
  currentAmount: z.number().positive().optional(),
  executedAmount: z.number().nonnegative().optional(),
  executionRate: z.number().min(0).max(200).optional(),
  perCapitaAmount: z.number().positive().optional(),
  legalBasis: z.string().optional(),
  approvalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  breakdown: z.array(BudgetCategoryBreakdownSchema).optional(),
  revenueSources: z.array(BudgetRevenueSourceSchema).optional(),
  isDemo: z.boolean().optional(),
  notes: z.string().optional(),
  sourceIds: z.array(z.string()).min(1, 'Debe incluir al menos un sourceId de respaldo oficial')
});

export const WorkSchema = z.object({
  id: z.string().min(1),
  municipalityId: z.string().min(1),
  name: z.string().min(3),
  location: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(['in_progress', 'completed', 'tendered', 'paused', 'planned', 'pending_data']),
  statusLabel: z.string().optional(),
  budget: z.number().nonnegative().optional(),
  executedBudget: z.number().nonnegative().optional(),
  progress: z.number().min(0).max(100).optional(),
  contractor: z.string().optional(),
  contractorTaxId: z.string().regex(/^\d{2}-\d{8}-\d{1}$/).optional(),
  startDate: z.string().optional(),
  estimatedEndDate: z.string().optional(),
  category: z.string().optional(),
  sourceIds: z.array(z.string()).min(1),
  isDemo: z.boolean().optional()
});

export const TenderSchema = z.object({
  id: z.string().min(1),
  municipalityId: z.string().min(1),
  fileNumber: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(3),
  provider: z.string().optional(),
  providerTaxId: z.string().regex(/^\d{2}-\d{8}-\d{1}$/).optional(),
  amount: z.number().nonnegative().optional(),
  type: z.enum(['public_tender', 'private_tender', 'direct_procurement', 'price_contest', 'other']),
  typeLabel: z.string().optional(),
  status: z.enum(['awarded', 'in_evaluation', 'completed', 'deserted', 'pending']),
  statusLabel: z.string().optional(),
  requestingArea: z.string().optional(),
  sourceIds: z.array(z.string()).min(1),
  isDemo: z.boolean().optional()
});

export const RegulationSchema = z.object({
  id: z.string().min(1),
  municipalityId: z.string().min(1),
  type: z.enum(['ordenanza', 'decreto', 'resolucion']),
  number: z.string().min(1),
  year: z.number().int().min(1980).max(2035),
  title: z.string().min(3),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  summary: z.string().optional(),
  promulgationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  sourceIds: z.array(z.string()).min(1)
});
