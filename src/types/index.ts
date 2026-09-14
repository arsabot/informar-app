export * from './models';

export type RegionArgentina = 'Pampa' | 'Cuyo' | 'Centro' | 'NOA' | 'NEA' | 'Patagonia' | 'AMBA';

export type NivelTransparencia = 'Muy Alto' | 'Alto' | 'Medio' | 'Bajo';

export type EstadoObra = 'En ejecución' | 'Finalizada' | 'Licitada' | 'Pausada';

export type TipoContratacion = 'Licitación Pública' | 'Licitación Privada' | 'Contratación Directa' | 'Concurso de Precios';

export type EstadoContratacion = 'Adjudicada' | 'En evaluación' | 'Completada' | 'Desierta';

export interface ScoreTransparencia {
  total: number; // 0-100
  presupuesto: number;
  contrataciones: number;
  obras: number;
  proveedores: number;
  sueldosYFuncionarios: number;
  metodologiaResumen: string;
}

export interface FuenteOficial {
  nombre: string;
  url: string;
  tipo: string;
  fechaCorte: string;
  esDemo: boolean;
  organismo?: string;
  fechaConsulta?: string;
  tipoDocumento?: string;
  estadoFuente?: 'disponible' | 'pendiente';
}

export interface EvolucionPresupuestaria {
  anio: number;
  aprobado: number;
  ejecutado: number;
  vigente?: number;
  inflacionRef?: number;
  datosPendientes?: boolean;
}

export interface CategoriaGasto {
  categoria: string;
  porcentaje: number;
  monto: number;
  color: string;
  icono: string;
  descripcion: string;
  ejemploCotextual: string;
  subrubros?: Array<{ nombre: string; monto: number }>;
}

export interface OrigenIngreso {
  origen: string;
  porcentaje: number;
  monto: number;
  descripcion: string;
}

export interface EjecucionEtapas {
  aprobado: number;
  comprometido: number;
  devengado: number;
  pagado: number;
}

export interface Obra {
  id: string;
  nombre: string;
  descripcion: string;
  estado: EstadoObra;
  presupuesto: number;
  montoEjecutado: number;
  avance: number; // 0-100
  contratista: string;
  cuitContratista?: string;
  fechaInicio: string;
  fechaFinEstimada: string;
  categoria: 'Vial y Pavimentación' | 'Salud y Hospitales' | 'Educación' | 'Espacio Público' | 'Hidráulica y Desagües' | 'Iluminación y Smart City';
  ubicacion: string;
  fuenteUrl: string;
  estadoFuente?: 'disponible' | 'pendiente';
}

export interface Contratacion {
  id: string;
  expediente: string;
  fecha: string;
  descripcion: string;
  proveedor: string;
  cuitProveedor: string;
  monto: number;
  tipo: TipoContratacion;
  estado: EstadoContratacion;
  areaSolicitante: string;
  fuenteUrl: string;
  estadoFuente?: 'disponible' | 'pendiente';
}

export interface Proveedor {
  id: string;
  razonSocial: string;
  cuit: string;
  rubro: string;
  montoTotalAdjudicado: number;
  cantidadContratos: number;
  calificacionCumplimiento: number; // 1-5
  obrasAsignadas: string[];
  ultimaContratacion?: string;
}

export interface Funcionario {
  id: string;
  nombre: string;
  cargo: string;
  area: string;
  declaracionJuradaUrl: string;
  fechaInicio: string;
  contactoPublico: string;
}

export interface Dataset {
  id: string;
  titulo: string;
  descripcion: string;
  formato: 'CSV' | 'JSON' | 'XLSX' | 'API REST';
  actualizacion: string;
  registros: number;
  peso: string;
  urlDescarga: string;
}

export interface Municipio {
  id: string;
  nombre: string;
  provincia: string;
  pais?: string;
  isPiloto?: boolean;
  sloganEspecifico?: string;
  region: RegionArgentina;
  poblacion: number;
  presupuestoTotal: number;
  presupuestoVigente?: number;
  presupuestoPorHabitante: number;
  ejecucionPorcentaje: number;
  nivelTransparencia: NivelTransparencia;
  scoreTransparencia: ScoreTransparencia;
  cantidadObras: number;
  cantidadContrataciones: number;
  cantidadProveedores: number;
  ultimaActualizacion: string;
  fuenteOficial: FuenteOficial;
  evolucionPresupuesto: EvolucionPresupuestaria[];
  distribucionGasto: CategoriaGasto[];
  origenIngresos: OrigenIngreso[];
  ejecucionEtapas: EjecucionEtapas;
  obras: Obra[];
  contrataciones: Contratacion[];
  proveedores: Proveedor[];
  funcionarios: Funcionario[];
  datosAbiertos: Dataset[];
}

export interface TermGlossary {
  term: string;
  shortDefinition: string;
  extendedDefinition: string;
  practicalExample: string;
}
