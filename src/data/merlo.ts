import { Municipio, Obra, Contratacion, Proveedor, Funcionario, Dataset, FuenteOficial, CategoriaGasto, OrigenIngreso, EvolucionPresupuestaria, EjecucionEtapas } from '../types';

// ==========================================
// 1. FUENTES DE INFORMACIÓN (MERLO)
// ==========================================
export const MERLO_FUENTES: FuenteOficial = {
  nombre: 'Municipalidad de Merlo — Portal de Transparencia (DEMO)',
  url: 'https://merlo.gob.ar/demo/transparencia-2026',
  tipo: 'Boletín Oficial Municipal y Ordenanza de Presupuesto',
  fechaCorte: '20/08/2026',
  organismo: 'Honorable Concejo Deliberante y Secretaría de Economía de Merlo',
  fechaConsulta: 'Agosto 2026',
  tipoDocumento: 'Ordenanza de Cálculo de Recursos y Presupuesto de Gastos',
  estadoFuente: 'disponible',
  esDemo: true,
};

// ==========================================
// 2. PRESUPUESTO & INGRESOS
// ==========================================
export const MERLO_PRESUPUESTO = {
  aprobado: 135800000000, // $135.8 B
  vigente: 135800000000,
  ejecutado: 99134000000, // 73%
  porcentajeEjecucion: 73,
  poblacion: 580806,
  presupuestoPorHabitante: 233812,
};

export const MERLO_EVOLUCION_PRESUPUESTO: EvolucionPresupuestaria[] = [
  { anio: 2022, aprobado: 28500000000, ejecutado: 27400000000, vigente: 28500000000 },
  { anio: 2023, aprobado: 49800000000, ejecutado: 47900000000, vigente: 49800000000 },
  { anio: 2024, aprobado: 82400000000, ejecutado: 78900000000, vigente: 82400000000 },
  { anio: 2025, aprobado: 114000000000, ejecutado: 109200000000, vigente: 114000000000 },
  { anio: 2026, aprobado: 135800000000, ejecutado: 99134000000, vigente: 135800000000 },
];

export const MERLO_ORIGEN_INGRESOS: OrigenIngreso[] = [
  {
    origen: 'Tasas Municipales (Servicios Generales, Seguridad e Higiene)',
    porcentaje: 46,
    monto: 62468000000,
    descripcion: 'Recaudación tributaria local directa abonada por vecinos, comercios e industrias de Merlo.',
  },
  {
    origen: 'Coparticipación de la Provincia de Buenos Aires',
    porcentaje: 43,
    monto: 58394000000,
    descripcion: 'Fondos derivados por la ley de coparticipación bonaerense.',
  },
  {
    origen: 'Fondos Específicos de Infraestructura y Saneamiento',
    porcentaje: 11,
    monto: 14938000000,
    descripcion: 'Aportes para obras hidráulicas y convenios específicos de hábitat.',
  },
];

export const MERLO_EJECUCION_ETAPAS: EjecucionEtapas = {
  aprobado: 135800000000,
  comprometido: 119504000000, // 88%
  devengado: 107282000000,    // 79%
  pagado: 99134000000         // 73%
};

// ==========================================
// 3. GASTOS & DISTRIBUCIÓN
// ==========================================
export const MERLO_DISTRIBUCION_GASTO: CategoriaGasto[] = [
  {
    categoria: 'Personal y Salarios',
    porcentaje: 44,
    monto: 59752000000,
    color: '#0284c7',
    icono: 'Users',
    descripcion: 'Sueldos de médicos de hospitales y salas barriales, recolectores, inspectores y docentes municipales.',
    ejemploCotextual: 'De cada $100, $44 van a salarios y aportes del equipo municipal que atiende a la comunidad.',
  },
  {
    categoria: 'Servicios Urbanos y Limpieza',
    porcentaje: 22,
    monto: 29876000000,
    color: '#06b6d4',
    icono: 'Trash2',
    descripcion: 'Higiene urbana, recolección de residuos, barrido, mantenimiento de plazas y alumbrado público LED.',
    ejemploCotextual: '$22 de cada $100 se destinan a la higiene urbana y mantenimiento diario.',
  },
  {
    categoria: 'Obras Públicas e Infraestructura',
    porcentaje: 16,
    monto: 21728000000,
    color: '#3b82f6',
    icono: 'Hammer',
    descripcion: 'Pavimentación de corredores barriales, conductos pluviales de desagüe y mejora de veredas.',
    ejemploCotextual: '$16 de cada $100 van directo a asfalto, hormigón y desagües.',
  },
  {
    categoria: 'Salud y Hospitales Municipales',
    porcentaje: 10,
    monto: 13580000000,
    color: '#10b981',
    icono: 'HeartPulse',
    descripcion: 'Hospital Municipal Eva Perón, Hospital Odonto-Oftalmológico y red de Centros de Atención Primaria.',
    ejemploCotextual: '$10 de cada $100 van a medicamentos, guardias y atención preventiva.',
  },
  {
    categoria: 'Seguridad y Protección Ciudadana',
    porcentaje: 5,
    monto: 6790000000,
    color: '#f59e0b',
    icono: 'ShieldCheck',
    descripcion: 'Centro de Monitoreo Urbano (Polo de Seguridad), patrullaje municipal y cámaras de videovigilancia.',
    ejemploCotextual: '$5 de cada $100 se invierten en tecnología de prevención del delito y patrullaje.',
  },
  {
    categoria: 'Educación, Deporte y Cultura',
    porcentaje: 3,
    monto: 4074000000,
    color: '#8b5cf6',
    icono: 'GraduationCap',
    descripcion: 'Jardines maternales de Merlo, polideportivos comunitarios y talleres culturales gratuitos.',
    ejemploCotextual: '$3 de cada $100 financian educación inicial, cultura y deportes barriales.',
  },
];

// ==========================================
// 4. OBRAS PÚBLICAS
// ==========================================
export const MERLO_OBRAS: Obra[] = [
  {
    id: 'merlo-obra-1',
    nombre: 'Pavimentación Integral y Conectividad en Avenida Calle Real (Merlo Centro a Parque San Martín)',
    descripcion: 'Fresado, colocación de carpeta asfáltica de alto impacto, demarcación vial e instalación de luminarias LED de 150W.',
    estado: 'En ejecución',
    presupuesto: 2650000000,
    montoEjecutado: 1855000000,
    avance: 70,
    contratista: 'Constructora Vial del Oeste S.A.',
    cuitContratista: '30-71239045-8',
    fechaInicio: '02/2026',
    fechaFinEstimada: '11/2026',
    categoria: 'Vial y Pavimentación',
    ubicacion: 'Merlo Centro / Parque San Martín',
    fuenteUrl: 'https://merlo.gob.ar/demo/obras/merlo-1',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-obra-2',
    nombre: 'Desagües Pluviales y Aliviador Cuenca Arroyo Torres (Libertad - Pontevedra)',
    descripcion: 'Construcción de conducto pluvial principal de hormigón armado para mitigar anegamientos en días de tormenta.',
    estado: 'En ejecución',
    presupuesto: 3890000000,
    montoEjecutado: 3112000000,
    avance: 80,
    contratista: 'Ingeniería Hídrica Metropolitana S.R.L.',
    cuitContratista: '30-69841233-2',
    fechaInicio: '09/2025',
    fechaFinEstimada: '10/2026',
    categoria: 'Hidráulica y Desagües',
    ubicacion: 'Libertad / Pontevedra',
    fuenteUrl: 'https://merlo.gob.ar/demo/obras/merlo-2',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-obra-3',
    nombre: 'Nuevo Pabellón de Guardia y Consultorios Externos Hospital Municipal Eva Perón',
    descripcion: 'Ampliación edilicia con 8 consultorios modulares de guardia, sala de shock room y nuevo sector de triaje.',
    estado: 'En ejecución',
    presupuesto: 1820000000,
    montoEjecutado: 1365000000,
    avance: 75,
    contratista: 'Obras & Arquitectura Hospitalaria S.A.',
    cuitContratista: '30-71092841-9',
    fechaInicio: '01/2026',
    fechaFinEstimada: '09/2026',
    categoria: 'Salud y Hospitales',
    ubicacion: 'Merlo Centro / Hospital Eva Perón (Colón 451)',
    fuenteUrl: 'https://merlo.gob.ar/demo/obras/merlo-3',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-obra-4',
    nombre: 'Renovación y Puesta en Valor del Parque Presidente Néstor Kirchner (El Tejadito)',
    descripcion: 'Nuevos solados de paseo, juegos infantiles inclusivos con piso de caucho, sendas aeróbicas y luces LED.',
    estado: 'Finalizada',
    presupuesto: 940000000,
    montoEjecutado: 940000000,
    avance: 100,
    contratista: 'Parques Urbanos y Espacios Públicos S.R.L.',
    cuitContratista: '30-71589120-1',
    fechaInicio: '04/2025',
    fechaFinEstimada: '02/2026',
    categoria: 'Espacio Público',
    ubicacion: 'Merlo (Av. Constitución 152)',
    fuenteUrl: 'https://merlo.gob.ar/demo/obras/merlo-4',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-obra-5',
    nombre: 'Asfaltado y Cordón Cuneta en Calle Salguero y Corredores Escolares',
    descripcion: 'Pavimentación de 25 cuadras estratégicas para garantizar el acceso seguro a establecimientos educativos.',
    estado: 'Licitada',
    presupuesto: 1150000000,
    montoEjecutado: 0,
    avance: 0,
    contratista: 'En proceso de adjudicación',
    cuitContratista: '-',
    fechaInicio: '09/2026',
    fechaFinEstimada: '03/2027',
    categoria: 'Vial y Pavimentación',
    ubicacion: 'Mariano Acosta / Barrio San Enrique',
    fuenteUrl: 'https://merlo.gob.ar/demo/obras/merlo-5',
    estadoFuente: 'disponible',
  },
];

// ==========================================
// 5. CONTRATACIONES
// ==========================================
export const MERLO_CONTRATACIONES: Contratacion[] = [
  {
    id: 'merlo-lic-2026-0091',
    expediente: 'EXP-MER-2026-08912',
    fecha: '18/07/2026',
    descripcion: 'Adquisición de 8.500 artefactos luminarias LED de 150W para el Plan de Alumbrado Barrial Seguro',
    proveedor: 'TecnoLuz Argentina S.A.',
    cuitProveedor: '30-71289456-1',
    monto: 1190000000,
    tipo: 'Licitación Pública',
    estado: 'Adjudicada',
    areaSolicitante: 'Secretaría de Obras y Servicios Públicos',
    fuenteUrl: 'https://merlo.gob.ar/demo/compras/91',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-lic-2026-0078',
    expediente: 'EXP-MER-2026-07419',
    fecha: '24/06/2026',
    descripcion: 'Provisión de medicamentos esenciales, antibióticos y sueros para la red de Centros de Salud de Merlo',
    proveedor: 'Droguería Farmacéutica del Oeste S.A.',
    cuitProveedor: '30-70981245-3',
    monto: 620000000,
    tipo: 'Licitación Pública',
    estado: 'Adjudicada',
    areaSolicitante: 'Secretaría de Salud Pública',
    fuenteUrl: 'https://merlo.gob.ar/demo/compras/78',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-cd-2026-0314',
    expediente: 'EXP-MER-2026-05118',
    fecha: '15/05/2026',
    descripcion: 'Reparación de urgencia de grupos electrógenos de respaldo para la guardia del Hospital Eva Perón',
    proveedor: 'Electromecánica Merlo S.R.L.',
    cuitProveedor: '30-68192341-7',
    monto: 74500000,
    tipo: 'Contratación Directa',
    estado: 'Completada',
    areaSolicitante: 'Dirección de Infraestructura Hospitalaria',
    fuenteUrl: 'https://merlo.gob.ar/demo/compras/314',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-lp-2026-0045',
    expediente: 'EXP-MER-2026-04221',
    fecha: '08/04/2026',
    descripcion: 'Adquisición de 4.000 m³ de hormigón elaborado H-30 para el Plan de Reparación de Calzadas',
    proveedor: 'Hormigonera Buenos Aires S.A.',
    cuitProveedor: '30-71194821-6',
    monto: 540000000,
    tipo: 'Licitación Pública',
    estado: 'Adjudicada',
    areaSolicitante: 'Secretaría de Obras Públicas',
    fuenteUrl: 'https://merlo.gob.ar/demo/compras/45',
    estadoFuente: 'disponible',
  },
  {
    id: 'merlo-cp-2026-0112',
    expediente: 'EXP-MER-2026-03102',
    fecha: '19/03/2026',
    descripcion: 'Mantenimiento preventivo y renovación de fibra óptica para 85 cámaras del Polo de Seguridad',
    proveedor: 'Telecomunicaciones & Redes del Oeste S.A.',
    cuitProveedor: '30-71409122-8',
    monto: 195000000,
    tipo: 'Concurso de Precios',
    estado: 'Adjudicada',
    areaSolicitante: 'Subsecretaría de Protección Ciudadana',
    fuenteUrl: 'https://merlo.gob.ar/demo/compras/112',
    estadoFuente: 'disponible',
  },
];

// ==========================================
// 6. PROVEEDORES
// ==========================================
export const MERLO_PROVEEDORES: Proveedor[] = [
  {
    id: 'prov-merlo-1',
    razonSocial: 'Constructora Vial del Oeste S.A.',
    cuit: '30-71239045-8',
    rubro: 'Infraestructura Vial y Movimiento de Suelos',
    montoTotalAdjudicado: 4890000000,
    cantidadContratos: 4,
    calificacionCumplimiento: 4.8,
    obrasAsignadas: ['Avenida Calle Real', 'Bacheo Mariano Acosta'],
    ultimaContratacion: '18/07/2026',
  },
  {
    id: 'prov-merlo-2',
    razonSocial: 'TecnoLuz Argentina S.A.',
    cuit: '30-71289456-1',
    rubro: 'Iluminación y Redes Eléctricas',
    montoTotalAdjudicado: 1730000000,
    cantidadContratos: 3,
    calificacionCumplimiento: 4.7,
    obrasAsignadas: ['Recambio Lumínico LED Merlo'],
    ultimaContratacion: '18/07/2026',
  },
  {
    id: 'prov-merlo-3',
    razonSocial: 'Droguería Farmacéutica del Oeste S.A.',
    cuit: '30-70981245-3',
    rubro: 'Medicamentos y Productos Farmacéuticos',
    montoTotalAdjudicado: 1240000000,
    cantidadContratos: 5,
    calificacionCumplimiento: 4.9,
    obrasAsignadas: [],
    ultimaContratacion: '24/06/2026',
  },
  {
    id: 'prov-merlo-4',
    razonSocial: 'Hormigonera Buenos Aires S.A.',
    cuit: '30-71194821-6',
    rubro: 'Hormigón Elaborado y Materiales',
    montoTotalAdjudicado: 980000000,
    cantidadContratos: 3,
    calificacionCumplimiento: 4.6,
    obrasAsignadas: ['Bacheo Barrial'],
    ultimaContratacion: '08/04/2026',
  },
];

// ==========================================
// 7. FUNCIONARIOS
// ==========================================
export const MERLO_FUNCIONARIOS: Funcionario[] = [
  {
    id: 'f-mer-1',
    nombre: 'Lic. Fernando R. Martínez',
    cargo: 'Secretario de Economía y Finanzas',
    area: 'Secretaría de Economía',
    declaracionJuradaUrl: 'https://merlo.gob.ar/demo/ddjj/martinez.pdf',
    fechaInicio: '10/12/2023',
    contactoPublico: 'economia@merlo.gob.ar',
  },
  {
    id: 'f-mer-2',
    nombre: 'Ing. Gustavo E. Menéndez (H.)',
    cargo: 'Secretario de Obras y Servicios Públicos',
    area: 'Secretaría de Obras Públicas',
    declaracionJuradaUrl: 'https://merlo.gob.ar/demo/ddjj/menendez.pdf',
    fechaInicio: '10/12/2023',
    contactoPublico: 'obras@merlo.gob.ar',
  },
  {
    id: 'f-mer-3',
    nombre: 'Dra. Mariela G. Gómez',
    cargo: 'Secretaria de Salud Pública',
    area: 'Secretaría de Salud',
    declaracionJuradaUrl: 'https://merlo.gob.ar/demo/ddjj/gomez.pdf',
    fechaInicio: '10/12/2023',
    contactoPublico: 'salud@merlo.gob.ar',
  },
];

// ==========================================
// 8. DATASETS ABIERTOS
// ==========================================
export const MERLO_DATOS_ABIERTOS: Dataset[] = [
  {
    id: 'merlo-ds-1',
    titulo: 'Presupuesto Analítico de Gastos y Recursos de Merlo 2026',
    descripcion: 'Detalle de partidas de recursos y erogaciones por secretaría del Municipio de Merlo.',
    formato: 'CSV',
    actualizacion: '20/08/2026',
    registros: 3840,
    peso: '1.2 MB',
    urlDescarga: '#',
  },
  {
    id: 'merlo-ds-2',
    titulo: 'Registro de Compras y Contrataciones Públicas de Merlo 2024-2026',
    descripcion: 'Base estructurada con montos, proveedores adjudicados y expedientes licitatorios.',
    formato: 'JSON',
    actualizacion: '22/08/2026',
    registros: 1140,
    peso: '2.6 MB',
    urlDescarga: '#',
  },
  {
    id: 'merlo-ds-3',
    titulo: 'Catálogo de Obras Públicas Municipales de Merlo',
    descripcion: 'Puntos de intervención, avances físicos certificados y contratistas asignados.',
    formato: 'API REST',
    actualizacion: '24/08/2026',
    registros: 42,
    peso: '190 KB',
    urlDescarga: '#',
  },
];

// ==========================================
// 9. OBJETO MUNICIPIO MERLO (INTEGRAL)
// ==========================================
export const MUNICIPIO_MERLO: Municipio = {
  id: 'merlo',
  nombre: 'Municipio de Merlo',
  provincia: 'Buenos Aires',
  pais: 'Argentina',
  isPiloto: true,
  sloganEspecifico: 'La información pública de Merlo, en un solo lugar.',
  region: 'AMBA',
  poblacion: MERLO_PRESUPUESTO.poblacion,
  presupuestoTotal: MERLO_PRESUPUESTO.aprobado,
  presupuestoVigente: MERLO_PRESUPUESTO.vigente,
  presupuestoPorHabitante: MERLO_PRESUPUESTO.presupuestoPorHabitante,
  ejecucionPorcentaje: MERLO_PRESUPUESTO.porcentajeEjecucion,
  nivelTransparencia: 'Alto',
  scoreTransparencia: {
    total: 84,
    presupuesto: 88,
    contrataciones: 85,
    obras: 82,
    proveedores: 80,
    sueldosYFuncionarios: 85,
    metodologiaResumen: 'Municipio piloto de INFORMAR. Publica ordenanzas presupuestarias, decretos de compras bimestrales y catálogo de obras públicas.',
  },
  cantidadObras: MERLO_OBRAS.length,
  cantidadContrataciones: 1140,
  cantidadProveedores: 320,
  ultimaActualizacion: '20/08/2026',
  fuenteOficial: MERLO_FUENTES,
  evolucionPresupuesto: MERLO_EVOLUCION_PRESUPUESTO,
  distribucionGasto: MERLO_DISTRIBUCION_GASTO,
  origenIngresos: MERLO_ORIGEN_INGRESOS,
  ejecucionEtapas: MERLO_EJECUCION_ETAPAS,
  obras: MERLO_OBRAS,
  contrataciones: MERLO_CONTRATACIONES,
  proveedores: MERLO_PROVEEDORES,
  funcionarios: MERLO_FUNCIONARIOS,
  datosAbiertos: MERLO_DATOS_ABIERTOS,
};
