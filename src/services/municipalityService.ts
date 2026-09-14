import { 
  Municipality, 
  Source, 
  Budget, 
  Accountability, 
  Work, 
  Tender, 
  Regulation 
} from '../types/models';
import { 
  MERLO_MUNICIPALITY, 
  MERLO_SOURCES, 
  MERLO_BUDGETS, 
  MERLO_ACCOUNTABILITY, 
  MERLO_WORKS, 
  MERLO_TENDERS, 
  MERLO_REGULATIONS 
} from '../data/municipalities/merlo';
import { MUNICIPIOS_DATA } from '../data/municipios';
import merloSnapshot from '../data/snapshots/arg-bue-merlo.snapshot.json';

// Cargar datos ingeridos prioritarios con fallback a datos base
const INGESTED_MERLO_SOURCES: Source[] = (merloSnapshot?.sources as Source[]) || MERLO_SOURCES;
const INGESTED_MERLO_BUDGETS: Budget[] = (merloSnapshot?.budgets as Budget[]) || MERLO_BUDGETS;
const INGESTED_MERLO_WORKS: Work[] = (merloSnapshot?.works as Work[]) || MERLO_WORKS;
const INGESTED_MERLO_TENDERS: Tender[] = (merloSnapshot?.tenders as Tender[]) || MERLO_TENDERS;
const INGESTED_MERLO_REGULATIONS: Regulation[] = (merloSnapshot?.regulations as Regulation[]) || MERLO_REGULATIONS;

// ==========================================
// REGISTRO DE MUNICIPIOS EN EL SISTEMA
// ==========================================
const MUNICIPALITIES_STORE: Municipality[] = [
  MERLO_MUNICIPALITY,
  // Otros municipios se mapean a la interfaz Municipality
  ...MUNICIPIOS_DATA.filter(m => m.id !== 'merlo').map(m => ({
    id: m.id,
    slug: m.id,
    name: m.nombre,
    fullName: m.nombre.includes('Municipio') ? m.nombre : `Municipio de ${m.nombre}`,
    province: m.provincia,
    country: m.pais || 'Argentina',
    population: m.poblacion,
    isPilot: false,
    region: m.region,
    slogan: 'La información pública, al alcance de todos.',
    sourceIds: [m.fuenteOficial.nombre]
  }))
];

const SOURCES_STORE: Source[] = [
  ...INGESTED_MERLO_SOURCES,
  ...MUNICIPIOS_DATA.filter(m => m.id !== 'merlo').map(m => ({
    id: `src-${m.id}-oficial`,
    title: m.fuenteOficial.nombre,
    publisher: m.fuenteOficial.organismo || m.nombre,
    documentType: 'portal_transparencia' as const,
    accessDate: '2026-08-20',
    url: m.fuenteOficial.url,
    isOfficial: true,
    status: 'available' as const,
    notes: m.fuenteOficial.tipo
  }))
];

// ==========================================
// SERVICIOS PÚBLICOS DE CONSULTA
// ==========================================

export async function getMunicipalities(): Promise<Municipality[]> {
  return MUNICIPALITIES_STORE;
}

export function getMunicipalitiesSync(): Municipality[] {
  return MUNICIPALITIES_STORE;
}

export async function getMunicipalityBySlug(slug: string): Promise<Municipality | undefined> {
  const normalized = slug.toLowerCase().trim();
  return MUNICIPALITIES_STORE.find(
    m => m.slug.toLowerCase() === normalized || 
         m.id.toLowerCase() === normalized ||
         (normalized === 'merlo' && (m.slug === 'merlo' || m.id === 'arg-bue-merlo'))
  );
}

export function getMunicipalityBySlugSync(slug: string): Municipality | undefined {
  const normalized = slug.toLowerCase().trim();
  return MUNICIPALITIES_STORE.find(
    m => m.slug.toLowerCase() === normalized || 
         m.id.toLowerCase() === normalized ||
         (normalized === 'merlo' && (m.slug === 'merlo' || m.id === 'arg-bue-merlo'))
  );
}

export async function getMunicipalityById(id: string): Promise<Municipality | undefined> {
  return getMunicipalityBySlug(id);
}

export async function getMunicipalityBudgets(municipalityId: string): Promise<Budget[]> {
  if (municipalityId === 'arg-bue-merlo' || municipalityId === 'merlo') {
    return INGESTED_MERLO_BUDGETS;
  }
  const muni = MUNICIPIOS_DATA.find(m => m.id === municipalityId);
  if (!muni) return [];
  
  return muni.evolucionPresupuesto.map(e => ({
    id: `bgt-${muni.id}-${e.anio}`,
    municipalityId: muni.id,
    year: e.anio,
    status: e.anio === 2026 ? 'approved' : 'executed',
    statusLabel: e.anio === 2026 ? 'Aprobado 2026' : `Ejecutado ${e.anio}`,
    approvedAmount: e.aprobado,
    executedAmount: e.ejecutado,
    executionRate: muni.ejecucionPorcentaje,
    perCapitaAmount: muni.presupuestoPorHabitante,
    legalBasis: 'Ordenanza de Presupuesto Municipal',
    breakdown: muni.distribucionGasto.map(d => ({
      category: d.categoria,
      amount: d.monto,
      percentage: d.porcentaje,
      color: d.color,
      description: d.descripcion,
      isDemo: true
    })),
    revenueSources: muni.origenIngresos.map(o => ({
      origin: o.origen,
      amount: o.monto,
      percentage: o.porcentaje,
      description: o.descripcion,
      isDemo: true
    })),
    isDemo: true,
    sourceIds: [`src-${muni.id}-oficial`]
  }));
}

export async function getMunicipalityBudget(municipalityId: string, year: number = 2026): Promise<Budget | undefined> {
  const budgets = await getMunicipalityBudgets(municipalityId);
  return budgets.find(b => b.year === year) || budgets[0];
}

export async function getMunicipalityAccountability(municipalityId: string): Promise<Accountability[]> {
  if (municipalityId === 'arg-bue-merlo' || municipalityId === 'merlo') {
    return MERLO_ACCOUNTABILITY;
  }
  return [];
}

export async function getMunicipalityWorks(municipalityId: string): Promise<Work[]> {
  if (municipalityId === 'arg-bue-merlo' || municipalityId === 'merlo') {
    return INGESTED_MERLO_WORKS;
  }
  const muni = MUNICIPIOS_DATA.find(m => m.id === municipalityId);
  if (!muni) return [];

  return muni.obras.map(o => ({
    id: o.id,
    municipalityId: muni.id,
    name: o.nombre,
    location: o.ubicacion,
    description: o.descripcion,
    status: o.estado === 'En ejecución' ? 'in_progress' : o.estado === 'Finalizada' ? 'completed' : 'tendered',
    statusLabel: o.estado,
    budget: o.presupuesto,
    executedBudget: o.montoEjecutado,
    progress: o.avance,
    contractor: o.contratista,
    contractorTaxId: o.cuitContratista,
    category: o.categoria,
    sourceIds: [`src-${muni.id}-oficial`]
  }));
}

export async function getMunicipalityTenders(municipalityId: string): Promise<Tender[]> {
  if (municipalityId === 'arg-bue-merlo' || municipalityId === 'merlo') {
    return INGESTED_MERLO_TENDERS;
  }
  const muni = MUNICIPIOS_DATA.find(m => m.id === municipalityId);
  if (!muni) return [];

  return muni.contrataciones.map(c => ({
    id: c.id,
    municipalityId: muni.id,
    fileNumber: c.expediente,
    date: c.fecha.split('/').reverse().join('-'),
    title: c.descripcion,
    provider: c.proveedor,
    providerTaxId: c.cuitProveedor,
    amount: c.monto,
    type: c.tipo === 'Licitación Pública' ? 'public_tender' : c.tipo === 'Contratación Directa' ? 'direct_procurement' : 'price_contest',
    typeLabel: c.tipo,
    status: 'awarded',
    statusLabel: c.estado,
    requestingArea: c.areaSolicitante,
    sourceIds: [`src-${muni.id}-oficial`]
  }));
}

export async function getMunicipalitySources(municipalityId: string): Promise<Source[]> {
  if (municipalityId === 'arg-bue-merlo' || municipalityId === 'merlo') {
    return INGESTED_MERLO_SOURCES;
  }
  return SOURCES_STORE.filter(s => s.id.includes(municipalityId));
}

export async function getMunicipalityRegulations(municipalityId: string): Promise<Regulation[]> {
  if (municipalityId === 'arg-bue-merlo' || municipalityId === 'merlo') {
    return INGESTED_MERLO_REGULATIONS;
  }
  return [];
}

export function getSourceById(sourceId: string): Source | undefined {
  return SOURCES_STORE.find(s => s.id === sourceId);
}

export function getSourcesByIds(sourceIds: string[]): Source[] {
  return sourceIds
    .map(id => SOURCES_STORE.find(s => s.id === id))
    .filter(Boolean) as Source[];
}

export async function searchMunicipalities(query: string): Promise<Municipality[]> {
  const q = query.toLowerCase().trim();
  if (!q) return MUNICIPALITIES_STORE;

  return MUNICIPALITIES_STORE.filter(m => 
    m.name.toLowerCase().includes(q) ||
    m.province.toLowerCase().includes(q) ||
    m.id.toLowerCase().includes(q) ||
    m.slug.toLowerCase().includes(q) ||
    (q.includes('merlo') && (m.slug === 'merlo' || m.id === 'arg-bue-merlo'))
  );
}
