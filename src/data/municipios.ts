import { Municipio } from '../types';
import { MUNICIPIO_MERLO } from './merlo';

export const MUNICIPIOS_DATA: Municipio[] = [
  MUNICIPIO_MERLO,
  {
    id: 'la-plata',
    nombre: 'La Plata',
    provincia: 'Buenos Aires',
    region: 'Pampa',
    poblacion: 772618,
    presupuestoTotal: 184500000000, // $184.5 B
    presupuestoPorHabitante: 238798,
    ejecucionPorcentaje: 74,
    nivelTransparencia: 'Alto',
    scoreTransparencia: {
      total: 82,
      presupuesto: 88,
      contrataciones: 84,
      obras: 79,
      proveedores: 75,
      sueldosYFuncionarios: 84,
      metodologiaResumen: 'Publica ordenanzas presupuestarias, decretos de compras bimestrales y portal georreferenciado de obras.'
    },
    cantidadObras: 54,
    cantidadContrataciones: 1420,
    cantidadProveedores: 430,
    ultimaActualizacion: '20/08/2026',
    fuenteOficial: {
      nombre: 'Portal de Datos Abiertos de La Plata (DEMO)',
      url: 'https://datos.laplata.gob.ar/demo/presupuesto-2026',
      tipo: 'Portal Municipal Oficial de Transparencia',
      fechaCorte: '15/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 38200000000, ejecutado: 36800000000 },
      { anio: 2023, aprobado: 67500000000, ejecutado: 64900000000 },
      { anio: 2024, aprobado: 112000000000, ejecutado: 106400000000 },
      { anio: 2025, aprobado: 154000000000, ejecutado: 148200000000 },
      { anio: 2026, aprobado: 184500000000, ejecutado: 136530000000 }
    ],
    distribucionGasto: [
      {
        categoria: 'Personal y Salarios',
        porcentaje: 42,
        monto: 77490000000,
        color: '#0284c7',
        icono: 'Users',
        descripcion: 'Médicos de salas barriales, recolectores, inspectores, docentes de jardines y personal administrativo.',
        ejemploCotextual: 'De cada $100, $42 van a sueldos y aportes del personal que atiende al vecino.'
      },
      {
        categoria: 'Servicios Urbanos y Limpieza',
        porcentaje: 24,
        monto: 44280000000,
        color: '#06b6d4',
        icono: 'Trash2',
        descripcion: 'Recolección de residuos, barrido, alumbrado LED, mantenimiento de plazas y poda.',
        ejemploCotextual: '$24 de cada $100 se destinan a la higiene urbana y mantenimiento diario.'
      },
      {
        categoria: 'Obras Públicas e Infraestructura',
        porcentaje: 16,
        monto: 29520000000,
        color: '#3b82f6',
        icono: 'Hammer',
        descripcion: 'Repavimentación de avenidas, conductos hidráulicos para prevenir anegamientos y luminarias.',
        ejemploCotextual: '$16 de cada $100 van directo a hormigón, asfalto y desagües.'
      },
      {
        categoria: 'Salud y Prevención Primaria',
        porcentaje: 9,
        monto: 16605000000,
        color: '#10b981',
        icono: 'HeartPulse',
        descripcion: 'Centros de Atención Primaria (CAPS), vacunatorios, insumos médicos y emergencias SAME.',
        ejemploCotextual: '$9 de cada $100 van a medicamentos y atención médica preventiva en los barrios.'
      },
      {
        categoria: 'Seguridad y Monitoreo',
        porcentaje: 5,
        monto: 9225000000,
        color: '#f59e0b',
        icono: 'ShieldCheck',
        descripcion: 'Cámaras del Centro de Monitoreo Urbano (COM), patrullaje de guardia urbana y paradas seguras.',
        ejemploCotextual: '$5 de cada $100 se invierten en tecnología de prevención del delito y patrullaje.'
      },
      {
        categoria: 'Educación y Cultura',
        porcentaje: 4,
        monto: 7380000000,
        color: '#8b5cf6',
        icono: 'GraduationCap',
        descripcion: 'Jardines maternales municipales, centros culturales, talleres comunitarios y bibliotecas.',
        ejemploCotextual: '$4 de cada $100 financian la educación inicial municipal y eventos culturales públicos.'
      }
    ],
    origenIngresos: [
      { origen: 'Tasas Municipales (Tasas de Servicios Urbanos, Seguridad e Higiene)', porcentaje: 48, monto: 88560000000, descripcion: 'Recaudación propia directa que pagan vecinos y comercios platenses.' },
      { origen: 'Coparticipación Provincial', porcentaje: 38, monto: 70110000000, descripcion: 'Fondos girados por la Provincia de Buenos Aires derivados de impuestos provinciales y nacionales.' },
      { origen: 'Aportes No Reintegrables y Convenios Específicos', porcentaje: 14, monto: 25830000000, descripcion: 'Financiamiento para obras hidráulicas específicas y programas nacionales.' }
    ],
    ejecucionEtapas: {
      aprobado: 184500000000,
      comprometido: 162360000000, // 88%
      devengado: 147600000000,    // 80%
      pagado: 136530000000        // 74%
    },
    obras: [
      {
        id: 'lp-obra-1',
        nombre: 'Repavimentación Integral y Bacheo en Avenida 7 (Calles 32 a 90)',
        descripcion: 'Fresado, colocación de nueva carpeta asfáltica de alto tránsito, demarcación horizontal e iluminación LED.',
        estado: 'En ejecución',
        presupuesto: 3450000000,
        montoEjecutado: 2346000000,
        avance: 68,
        contratista: 'Vial Construcciones del Plata S.A.',
        cuitContratista: '30-71458921-9',
        fechaInicio: '02/2026',
        fechaFinEstimada: '11/2026',
        categoria: 'Vial y Pavimentación',
        ubicacion: 'Casco Urbano / Villa Elvira',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/obras/lp-obra-1'
      },
      {
        id: 'lp-obra-2',
        nombre: 'Desagüe Pluvial Cuenca Maldonado - Etapa IV',
        descripcion: 'Construcción de conducto subterráneo doble celda de hormigón armado para evacuación hídrica pluvial.',
        estado: 'En ejecución',
        presupuesto: 5800000000,
        montoEjecutado: 4756000000,
        avance: 82,
        contratista: 'Ingeniería Hídrica Bonaerense S.R.L.',
        cuitContratista: '30-68994512-3',
        fechaInicio: '08/2025',
        fechaFinEstimada: '10/2026',
        categoria: 'Hidráulica y Desagües',
        ubicacion: 'Tolosa / Barrio Hipódromo',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/obras/lp-obra-2'
      },
      {
        id: 'lp-obra-3',
        nombre: 'Nuevo Centro de Atención Primaria de la Salud (CAPS 48) - Los Hornos',
        descripcion: 'Construcción de 6 consultorios médicos, sala de enfermería, vacunatorio y guardia médica 24hs.',
        estado: 'Finalizada',
        presupuesto: 1420000000,
        montoEjecutado: 1420000000,
        avance: 100,
        contratista: 'Edificadora Centro S.A.',
        cuitContratista: '33-70231548-9',
        fechaInicio: '03/2025',
        fechaFinEstimada: '04/2026',
        categoria: 'Salud y Hospitales',
        ubicacion: 'Los Hornos (Calle 66 y 153)',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/obras/lp-obra-3'
      },
      {
        id: 'lp-obra-4',
        nombre: 'Renovación y Puesta en Valor de Plaza San Martín',
        descripcion: 'Readecuación de solados, paisajismo con flora nativa, luminarias solares y accesibilidad universal.',
        estado: 'Finalizada',
        presupuesto: 980000000,
        montoEjecutado: 980000000,
        avance: 100,
        contratista: 'Parques y Espacios Urbanos S.A.',
        cuitContratista: '30-71120034-7',
        fechaInicio: '01/2025',
        fechaFinEstimada: '01/2026',
        categoria: 'Espacio Público',
        ubicacion: 'Eje Cívico (Calles 6 y 50)',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/obras/lp-obra-4'
      },
      {
        id: 'lp-obra-5',
        nombre: 'Ampliación Red de Ciclovías Conectividad Norte-Sur (18 km)',
        descripcion: 'Trazado segregado para bicicletas con cordones de seguridad, semaforización exclusiva y señalética.',
        estado: 'Licitada',
        presupuesto: 850000000,
        montoEjecutado: 0,
        avance: 0,
        contratista: 'En proceso de adjudicación',
        cuitContratista: '-',
        fechaInicio: '09/2026',
        fechaFinEstimada: '03/2027',
        categoria: 'Vial y Pavimentación',
        ubicacion: 'City Bell / Gonnet / Villa Elisa',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/obras/lp-obra-5'
      }
    ],
    contrataciones: [
      {
        id: 'lp-lic-2026-0089',
        expediente: 'EXP-LP-2026-10492',
        fecha: '12/07/2026',
        descripcion: 'Adquisición de 12.000 luminarias LED de 150W para renovación de alumbrado público barrial',
        proveedor: 'TecnoLuz Argentina S.A.',
        cuitProveedor: '30-71289456-1',
        monto: 1680000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Obras y Servicios Públicos',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/compras/lp-lic-2026-0089'
      },
      {
        id: 'lp-lic-2026-0074',
        expediente: 'EXP-LP-2026-08731',
        fecha: '28/06/2026',
        descripcion: 'Servicio de recolección y tratamiento de residuos patogénicos para los 46 centros de salud municipales',
        proveedor: 'Tratamiento Ambiental Verde S.R.L.',
        cuitProveedor: '30-69874521-4',
        monto: 412000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Salud',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/compras/lp-lic-2026-0074'
      },
      {
        id: 'lp-cd-2026-0412',
        expediente: 'EXP-LP-2026-06519',
        fecha: '14/05/2026',
        descripcion: 'Reparación de urgencia de bomba extractora y motores del canal derivador Aliviador 1',
        proveedor: 'Electromecánica Platense S.R.L.',
        cuitProveedor: '30-58441299-8',
        monto: 89500000,
        tipo: 'Contratación Directa',
        estado: 'Completada',
        areaSolicitante: 'Dirección de Hidráulica',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/compras/lp-cd-2026-0412'
      },
      {
        id: 'lp-lp-2026-0041',
        expediente: 'EXP-LP-2026-05118',
        fecha: '02/04/2026',
        descripcion: 'Provisión de insumos de farmacia, vacunas y descartables para stock semestral de centros barriales',
        proveedor: 'Distribuidora Farmacéutica Central S.A.',
        cuitProveedor: '30-70891234-5',
        monto: 890000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Salud',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/compras/lp-lp-2026-0041'
      },
      {
        id: 'lp-cp-2026-0105',
        expediente: 'EXP-LP-2026-03912',
        fecha: '18/03/2026',
        descripcion: 'Servicio de mantenimiento preventivo y correctivo para 120 cámaras de seguridad del Centro de Operaciones',
        proveedor: 'Sistemas Ópticos y Redes S.A.',
        cuitProveedor: '30-71400231-9',
        monto: 245000000,
        tipo: 'Concurso de Precios',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Seguridad Ciudadana',
        fuenteUrl: 'https://datos.laplata.gob.ar/demo/compras/lp-cp-2026-0105'
      }
    ],
    proveedores: [
      {
        id: 'prov-1',
        razonSocial: 'Vial Construcciones del Plata S.A.',
        cuit: '30-71458921-9',
        rubro: 'Infraestructura Vial y Hormigón',
        montoTotalAdjudicado: 6890000000,
        cantidadContratos: 4,
        calificacionCumplimiento: 4.8,
        obrasAsignadas: ['Repavimentación Integral en Av. 7', 'Bacheo Calle 137']
      },
      {
        id: 'prov-2',
        razonSocial: 'TecnoLuz Argentina S.A.',
        cuit: '30-71289456-1',
        rubro: 'Iluminación y Materiales Eléctricos',
        montoTotalAdjudicado: 2150000000,
        cantidadContratos: 3,
        calificacionCumplimiento: 4.6,
        obrasAsignadas: ['Recambio Lumínico Barrial 2026']
      },
      {
        id: 'prov-3',
        razonSocial: 'Distribuidora Farmacéutica Central S.A.',
        cuit: '30-70891234-5',
        rubro: 'Medicamentos e Insumos Médicos',
        montoTotalAdjudicado: 1740000000,
        cantidadContratos: 6,
        calificacionCumplimiento: 4.9,
        obrasAsignadas: []
      }
    ],
    funcionarios: [
      { id: 'f-1', nombre: 'Dr. Martín E. Albarracín', cargo: 'Secretario de Economía y Hacienda', area: 'Secretaría de Economía', declaracionJuradaUrl: 'https://datos.laplata.gob.ar/demo/ddjj/albarracin.pdf', fechaInicio: '10/12/2023', contactoPublico: 'economia@laplata.gob.ar' },
      { id: 'f-2', nombre: 'Ing. Sofía Carbone', cargo: 'Secretaria de Obras y Servicios Públicos', area: 'Obras Públicas', declaracionJuradaUrl: 'https://datos.laplata.gob.ar/demo/ddjj/carbone.pdf', fechaInicio: '10/12/2023', contactoPublico: 'obras@laplata.gob.ar' },
      { id: 'f-3', nombre: 'Dra. Valeria R. Méndez', cargo: 'Secretaria de Salud', area: 'Salud', declaracionJuradaUrl: 'https://datos.laplata.gob.ar/demo/ddjj/mendez.pdf', fechaInicio: '10/12/2023', contactoPublico: 'salud@laplata.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'ds-1', titulo: 'Presupuesto de Gastos y Recursos 2026 (Analítico)', descripcion: 'Desglose partida por partida de recursos y erogaciones proyectadas para el ejercicio 2026.', formato: 'CSV', actualizacion: '15/08/2026', registros: 4120, peso: '1.4 MB', urlDescarga: '#' },
      { id: 'ds-2', titulo: 'Registro de Contrataciones y Compras Públicas 2024-2026', descripcion: 'Dataset con todas las licitaciones públicas, privadas y compras directas adjudicadas con montos y proveedores.', formato: 'JSON', actualizacion: '18/08/2026', registros: 1420, peso: '3.2 MB', urlDescarga: '#' },
      { id: 'ds-3', titulo: 'Geolocalización de Obras Públicas Municipales', descripcion: 'Coordenadas, estado de avance físico y financiero de las obras ejecutadas.', formato: 'API REST', actualizacion: '20/08/2026', registros: 54, peso: '240 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'cordoba',
    nombre: 'Córdoba Capital',
    provincia: 'Córdoba',
    region: 'Centro',
    poblacion: 1565112,
    presupuestoTotal: 398000000000, // $398 B
    presupuestoPorHabitante: 254294,
    ejecucionPorcentaje: 78,
    nivelTransparencia: 'Muy Alto',
    scoreTransparencia: {
      total: 91,
      presupuesto: 95,
      contrataciones: 92,
      obras: 88,
      proveedores: 89,
      sueldosYFuncionarios: 91,
      metodologiaResumen: 'Portal de datos abiertos con APIs REST en vivo, compras subastadas electrónicamente y mapa interactivo de obras.'
    },
    cantidadObras: 112,
    cantidadContrataciones: 3450,
    cantidadProveedores: 920,
    ultimaActualizacion: '24/08/2026',
    fuenteOficial: {
      nombre: 'Portal Open Data Municipalidad de Córdoba (DEMO)',
      url: 'https://gobiernoabierto.cordoba.gob.ar/demo',
      tipo: 'Portal de Gobierno Abierto Oficial',
      fechaCorte: '20/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 89000000000, ejecutado: 85200000000 },
      { anio: 2023, aprobado: 152000000000, ejecutado: 146800000000 },
      { anio: 2024, aprobado: 248000000000, ejecutado: 239000000000 },
      { anio: 2025, aprobado: 335000000000, ejecutado: 326500000000 },
      { anio: 2026, aprobado: 398000000000, ejecutado: 310440000000 }
    ],
    distribucionGasto: [
      { categoria: 'Personal y Salarios', porcentaje: 38, monto: 151240000000, color: '#0284c7', icono: 'Users', descripcion: 'Sueldos de agentes municipales, médicos de dispensarios y docentes de escuelas municipales.', ejemploCotextual: '$38 de cada $100 financian el equipo humano del municipio.' },
      { categoria: 'Servicios Urbanos y Limpieza', porcentaje: 26, monto: 103480000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Recolección diferenciada de residuos, poda, mantenimiento de espacios verdes y alumbrado.', ejemploCotextual: '$26 de cada $100 para limpieza e higiene de la capital.' },
      { categoria: 'Obras Públicas e Infraestructura', porcentaje: 20, monto: 79600000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Aliviadores de tránsito, desagües pluviales en zona sur y puesta en valor de costanera.', ejemploCotextual: '$20 de cada $100 van a infraestructura duradera.' },
      { categoria: 'Salud y Centros de Salud', porcentaje: 8, monto: 31840000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Red de 100 centros de salud barriales y hospitales de urgencias.', ejemploCotextual: '$8 de cada $100 en atención médica y prevención.' },
      { categoria: 'Transporte y Movilidad', porcentaje: 5, monto: 19900000000, color: '#f59e0b', icono: 'Bus', descripcion: 'Subsidios operativos al transporte urbano, carriles exclusivos y mantenimiento de paradas.', ejemploCotextual: '$5 de cada $100 en movilidad de pasajeros.' },
      { categoria: 'Educación y Modernización', porcentaje: 3, monto: 11940000000, color: '#8b5cf6', icono: 'GraduationCap', descripcion: '37 escuelas municipales primarias, centros de innovación tecnológica e inclusión digital.', ejemploCotextual: '$3 de cada $100 en educación e innovación.' }
    ],
    origenIngresos: [
      { origen: 'Contribución sobre los Inmuebles y Comercio e Industria (Tasas)', porcentaje: 52, monto: 206960000000, descripcion: 'Ingresos propios de tasas municipales directas.' },
      { origen: 'Coparticipación de Impuestos de Córdoba y Nación', porcentaje: 37, monto: 147260000000, descripcion: 'Transferencias automáticas legales de recaudación impositiva.' },
      { origen: 'Fondos de Afectación Específica y Crédito para Infraestructura', porcentaje: 11, monto: 43780000000, descripcion: 'Créditos para pavimentación y desagües.' }
    ],
    ejecucionEtapas: {
      aprobado: 398000000000,
      comprometido: 358200000000,
      devengado: 330340000000,
      pagado: 310440000000
    },
    obras: [
      {
        id: 'cba-obra-1',
        nombre: 'Paso Bajo Nivel y Nudo Vial Avenida Los Granaderos',
        descripcion: 'Desnivelación vial subterránea para agilizar cruce ferroviario con iluminación LED inteligente.',
        estado: 'En ejecución',
        presupuesto: 7200000000,
        montoEjecutado: 5400000000,
        avance: 75,
        contratista: 'Constructora Mediterránea S.A.',
        cuitContratista: '30-67123984-2',
        fechaInicio: '11/2025',
        fechaFinEstimada: '10/2026',
        categoria: 'Vial y Pavimentación',
        ubicacion: 'Barrio Alta Córdoba / San Martín',
        fuenteUrl: 'https://gobiernoabierto.cordoba.gob.ar/demo/obras/cba-1'
      },
      {
        id: 'cba-obra-2',
        nombre: 'Parque Lineal y Puesta en Valor Costanera Río Suquía (Tramo Isla de los Patos)',
        descripcion: 'Nuevas sendas aeróbicas, iluminación solar, ciclovías segregadas y forestación autóctona.',
        estado: 'Finalizada',
        presupuesto: 2900000000,
        montoEjecutado: 2900000000,
        avance: 100,
        contratista: 'Espacios Verdes Urbanos S.R.L.',
        cuitContratista: '30-71589123-0',
        fechaInicio: '04/2025',
        fechaFinEstimada: '03/2026',
        categoria: 'Espacio Público',
        ubicacion: 'Costanera Sur / Alberdi',
        fuenteUrl: 'https://gobiernoabierto.cordoba.gob.ar/demo/obras/cba-2'
      }
    ],
    contrataciones: [
      {
        id: 'cba-sub-2026-118',
        expediente: 'EXP-CBA-2026-44102',
        fecha: '19/07/2026',
        descripcion: 'Subasta electrónica para adquisición de 40 camionetas utilitarias para Defensa Civil y Tránsito',
        proveedor: 'Automotores del Centro S.A.',
        cuitProveedor: '30-54129841-3',
        monto: 1980000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Transporte y Tránsito',
        fuenteUrl: 'https://gobiernoabierto.cordoba.gob.ar/demo/compras/118'
      }
    ],
    proveedores: [
      {
        id: 'prov-cba-1',
        razonSocial: 'Constructora Mediterránea S.A.',
        cuit: '30-67123984-2',
        rubro: 'Vial y Grandes Obras Civiles',
        montoTotalAdjudicado: 11400000000,
        cantidadContratos: 6,
        calificacionCumplimiento: 4.9,
        obrasAsignadas: ['Paso Bajo Nivel Los Granaderos']
      }
    ],
    funcionarios: [
      { id: 'fcba-1', nombre: 'Lic. Sergio R. Mansilla', cargo: 'Secretario de Finanzas', area: 'Secretaría de Finanzas', declaracionJuradaUrl: 'https://gobiernoabierto.cordoba.gob.ar/demo/ddjj/mansilla.pdf', fechaInicio: '10/12/2023', contactoPublico: 'finanzas@cordoba.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'cba-ds-1', titulo: 'API de Ejecución Presupuestaria en Tiempo Real', descripcion: 'Endpoint REST con datos devengados diarios de la Secretaría de Finanzas.', formato: 'API REST', actualizacion: '24/08/2026', registros: 12800, peso: 'Live API', urlDescarga: '#' }
    ]
  },
  {
    id: 'rosario',
    nombre: 'Rosario',
    provincia: 'Santa Fe',
    region: 'Centro',
    poblacion: 1029000,
    presupuestoTotal: 295000000000, // $295 B
    presupuestoPorHabitante: 286686,
    ejecucionPorcentaje: 76,
    nivelTransparencia: 'Muy Alto',
    scoreTransparencia: {
      total: 89,
      presupuesto: 92,
      contrataciones: 90,
      obras: 85,
      proveedores: 87,
      sueldosYFuncionarios: 91,
      metodologiaResumen: 'Histórico portal de datos con catálogo de licitaciones detalladas y ejecución programática trimestral.'
    },
    cantidadObras: 78,
    cantidadContrataciones: 2600,
    cantidadProveedores: 680,
    ultimaActualizacion: '22/08/2026',
    fuenteOficial: {
      nombre: 'Portal de Datos Rosario Gobierno Abierto (DEMO)',
      url: 'https://datos.rosario.gob.ar/demo',
      tipo: 'Portal Municipal Oficial de Santa Fe',
      fechaCorte: '18/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 68000000000, ejecutado: 65100000000 },
      { anio: 2023, aprobado: 118000000000, ejecutado: 112400000000 },
      { anio: 2024, aprobado: 189000000000, ejecutado: 182000000000 },
      { anio: 2025, aprobado: 249000000000, ejecutado: 241000000000 },
      { anio: 2026, aprobado: 295000000000, ejecutado: 224200000000 }
    ],
    distribucionGasto: [
      { categoria: 'Salud Pública y Hospitales', porcentaje: 26, monto: 76700000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Sistema integral de salud municipal rosarino (HECA, Vilela, Centros de Salud).', ejemploCotextual: '$26 de cada $100 sostienen la red hospitalaria pública municipal más grande del país.' },
      { categoria: 'Personal y Servicios Generales', porcentaje: 35, monto: 103250000000, color: '#0284c7', icono: 'Users', descripcion: 'Nómina de médicos, enfermeros, inspectores y trabajadores de maestranza.', ejemploCotextual: '$35 de cada $100 en remuneraciones de servidores públicos.' },
      { categoria: 'Higiene Urbana y Ambiente', porcentaje: 18, monto: 53100000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Servicio de recolección contenerizada y barrido de la ciudad.', ejemploCotextual: '$18 de cada $100 para limpieza urbana.' },
      { categoria: 'Obras Públicas y Pavimentación', porcentaje: 14, monto: 41300000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Transformación de barrios populares y pavimentación a nivel definitivo.', ejemploCotextual: '$14 de cada $100 en obras de infraestructura.' },
      { categoria: 'Cultura y Desarrollo Social', porcentaje: 7, monto: 20650000000, color: '#8b5cf6', icono: 'GraduationCap', descripcion: 'Tríptico de la infancia, centros de convivencia barrial y talleres.', ejemploCotextual: '$7 de cada $100 en programas socioculturales.' }
    ],
    origenIngresos: [
      { origen: 'Tasa General de Inmuebles y Derecho de Registro e Inspección (DReI)', porcentaje: 49, monto: 144550000000, descripcion: 'Recursos tributarios de origen municipal directo.' },
      { origen: 'Coparticipación Provincial y Federal', porcentaje: 41, monto: 120950000000, descripcion: 'Fondos derivados de coparticipación santafesina.' },
      { origen: 'Fondos de Infraestructura y Convenios Portuarios', porcentaje: 10, monto: 29500000000, descripcion: 'Aportes por actividad agroexportadora y portuaria.' }
    ],
    ejecucionEtapas: {
      aprobado: 295000000000,
      comprometido: 262550000000,
      devengado: 241900000000,
      pagado: 224200000000
    },
    obras: [
      {
        id: 'ros-obra-1',
        nombre: 'Plan de Pavimentación Definitiva en Barrio Empalme Graneros',
        descripcion: 'Eliminación de zanjas a cielo abierto, colocación de cordón cuneta y asfalto definitivo.',
        estado: 'En ejecución',
        presupuesto: 4200000000,
        montoEjecutado: 3150000000,
        avance: 75,
        contratista: 'Constructora Litoral Santa Fe S.A.',
        cuitContratista: '30-68194721-5',
        fechaInicio: '01/2026',
        fechaFinEstimada: '12/2026',
        categoria: 'Vial y Pavimentación',
        ubicacion: 'Distrito Noroeste / Empalme',
        fuenteUrl: 'https://datos.rosario.gob.ar/demo/obras/ros-1'
      }
    ],
    contrataciones: [
      {
        id: 'ros-lic-2026-042',
        expediente: 'EXP-ROS-2026-19402',
        fecha: '15/06/2026',
        descripcion: 'Provisión de equipamiento de diagnóstico por imágenes para el Hospital de Emergencias Dr. Clemente Álvarez (HECA)',
        proveedor: 'BioMédica Diagnóstica Argentina S.A.',
        cuitProveedor: '30-70918234-9',
        monto: 1450000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Salud Pública',
        fuenteUrl: 'https://datos.rosario.gob.ar/demo/compras/42'
      }
    ],
    proveedores: [
      {
        id: 'prov-ros-1',
        razonSocial: 'Constructora Litoral Santa Fe S.A.',
        cuit: '30-68194721-5',
        rubro: 'Pavimentación y Desagües',
        montoTotalAdjudicado: 7800000000,
        cantidadContratos: 5,
        calificacionCumplimiento: 4.7,
        obrasAsignadas: ['Pavimentación Empalme Graneros']
      }
    ],
    funcionarios: [
      { id: 'fros-1', nombre: 'Lic. Guido B. Bulfoni', cargo: 'Secretario de Hacienda y Economía', area: 'Hacienda', declaracionJuradaUrl: 'https://datos.rosario.gob.ar/demo/ddjj/bulfoni.pdf', fechaInicio: '10/12/2023', contactoPublico: 'hacienda@rosario.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'ros-ds-1', titulo: 'Ejecución Presupuestaria Histórica 2018-2026', descripcion: 'Series temporales en CSV de gastos devengados y recursos percibidos.', formato: 'CSV', actualizacion: '22/08/2026', registros: 8900, peso: '2.8 MB', urlDescarga: '#' }
    ]
  },
  {
    id: 'mendoza',
    nombre: 'Mendoza Capital',
    provincia: 'Mendoza',
    region: 'Cuyo',
    poblacion: 122000,
    presupuestoTotal: 58900000000, // $58.9 B
    presupuestoPorHabitante: 482786,
    ejecucionPorcentaje: 81,
    nivelTransparencia: 'Muy Alto',
    scoreTransparencia: {
      total: 93,
      presupuesto: 96,
      contrataciones: 94,
      obras: 92,
      proveedores: 90,
      sueldosYFuncionarios: 93,
      metodologiaResumen: 'Líder en apertura de cuentas, visualizador interactivo de compras públicas y arbolado georreferenciado.'
    },
    cantidadObras: 38,
    cantidadContrataciones: 980,
    cantidadProveedores: 310,
    ultimaActualizacion: '25/08/2026',
    fuenteOficial: {
      nombre: 'Portal Ciudad de Mendoza Datos Abiertos (DEMO)',
      url: 'https://ciudaddemendoza.gob.ar/demo/transparencia',
      tipo: 'Portal Municipal Oficial de Cuyo',
      fechaCorte: '20/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 12500000000, ejecutado: 12100000000 },
      { anio: 2023, aprobado: 22800000000, ejecutado: 21900000000 },
      { anio: 2024, aprobado: 37500000000, ejecutado: 36200000000 },
      { anio: 2025, aprobado: 49200000000, ejecutado: 47800000000 },
      { anio: 2026, aprobado: 58900000000, ejecutado: 47709000000 }
    ],
    distribucionGasto: [
      { categoria: 'Servicios Urbanos, Ambiente y Arbolado', porcentaje: 30, monto: 17670000000, color: '#06b6d4', icono: 'Trees', descripcion: 'Cuidado de acequias, bosque urbano, riego, barrido y plazas históricas.', ejemploCotextual: '$30 de cada $100 van a mantener la ciudad jardín y su sistema de acequias.' },
      { categoria: 'Personal y Salarios', porcentaje: 32, monto: 18848000000, color: '#0284c7', icono: 'Users', descripcion: 'Equipo de preventores de seguridad ciudadana, inspectores y planta municipal.', ejemploCotextual: '$32 de cada $100 en salarios de trabajadores municipales.' },
      { categoria: 'Obras Públicas y Renovación Urbana', porcentaje: 22, monto: 12958000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Paseos comerciales a cielo abierto, veredas accesibles y luminaria LED.', ejemploCotextual: '$22 de cada $100 invertidos en infraestructura y renovación.' },
      { categoria: 'Seguridad Ciudadana (Preventores)', porcentaje: 10, monto: 5890000000, color: '#f59e0b', icono: 'ShieldCheck', descripcion: 'Patrullaje preventivo de preventores municipales y cámaras conectadas al CEO.', ejemploCotextual: '$10 de cada $100 en seguridad y prevención.' },
      { categoria: 'Cultura, Turismo y Desarrollo Económico', porcentaje: 6, monto: 3534000000, color: '#8b5cf6', icono: 'Sparkles', descripcion: 'Eventos de la Vendimia de la Ciudad, capacitaciones y polo gastronómico.', ejemploCotextual: '$6 de cada $100 en atracción turística y cultura.' }
    ],
    origenIngresos: [
      { origen: 'Tasas Municipales e Ingresos Tributarios Propios', porcentaje: 58, monto: 34162000000, descripcion: 'Alta cobrabilidad de tasas locales de servicios y comercio.' },
      { origen: 'Coparticipación de Mendoza', porcentaje: 34, monto: 20026000000, descripcion: 'Fondos girados por el gobierno provincial.' },
      { origen: 'Fondos Turísticos y Específicos', porcentaje: 8, monto: 4712000000, descripcion: 'Fondos de promoción y convenios de capitalidad.' }
    ],
    ejecucionEtapas: {
      aprobado: 58900000000,
      comprometido: 53010000000,
      devengado: 50065000000,
      pagado: 47709000000
    },
    obras: [
      {
        id: 'mdz-obra-1',
        nombre: 'Remodelación de Veredas y Acequias en Eje Comercial San Martín',
        descripcion: 'Reemplazo de baldosas tradicionales por pisos atérmicos antideslizantes y recuperación patrimonial de acequias.',
        estado: 'En ejecución',
        presupuesto: 1850000000,
        montoEjecutado: 1480000000,
        avance: 80,
        contratista: 'Cuyo Construcciones Urbanas S.A.',
        cuitContratista: '30-71192841-6',
        fechaInicio: '02/2026',
        fechaFinEstimada: '09/2026',
        categoria: 'Espacio Público',
        ubicacion: 'Centro / Av. San Martín',
        fuenteUrl: 'https://ciudaddemendoza.gob.ar/demo/obras/mdz-1'
      }
    ],
    contrataciones: [
      {
        id: 'mdz-lic-2026-031',
        expediente: 'EXP-MDZ-2026-08129',
        fecha: '10/06/2026',
        descripcion: 'Sistema de sensores IoT para control automatizado de compuertas y riego de arbolado público',
        proveedor: 'Smart Water & Agro IoT S.R.L.',
        cuitProveedor: '30-71552391-8',
        monto: 380000000,
        tipo: 'Licitación Privada',
        estado: 'Adjudicada',
        areaSolicitante: 'Dirección de Ambiente y Arbolado',
        fuenteUrl: 'https://ciudaddemendoza.gob.ar/demo/compras/31'
      }
    ],
    proveedores: [
      {
        id: 'prov-mdz-1',
        razonSocial: 'Cuyo Construcciones Urbanas S.A.',
        cuit: '30-71192841-6',
        rubro: 'Arquitectura Urbana y Patrimonio',
        montoTotalAdjudicado: 3400000000,
        cantidadContratos: 4,
        calificacionCumplimiento: 4.9,
        obrasAsignadas: ['Remodelación Veredas San Martín']
      }
    ],
    funcionarios: [
      { id: 'fmdz-1', nombre: 'Cra. Patricia S. Molina', cargo: 'Secretaria de Hacienda', area: 'Hacienda', declaracionJuradaUrl: 'https://ciudaddemendoza.gob.ar/demo/ddjj/molina.pdf', fechaInicio: '10/12/2023', contactoPublico: 'hacienda@ciudaddemendoza.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'mdz-ds-1', titulo: 'Censo y Estado Sanitario del Arbolado Público', descripcion: 'Inventario georreferenciado de más de 45.000 ejemplares de árboles urbanos.', formato: 'JSON', actualizacion: '25/08/2026', registros: 45200, peso: '5.1 MB', urlDescarga: '#' }
    ]
  },
  {
    id: 'mar-del-plata',
    nombre: 'General Pueyrredón (Mar del Plata)',
    provincia: 'Buenos Aires',
    region: 'Pampa',
    poblacion: 682605,
    presupuestoTotal: 172000000000, // $172 B
    presupuestoPorHabitante: 251975,
    ejecucionPorcentaje: 73,
    nivelTransparencia: 'Alto',
    scoreTransparencia: {
      total: 80,
      presupuesto: 84,
      contrataciones: 82,
      obras: 78,
      proveedores: 76,
      sueldosYFuncionarios: 80,
      metodologiaResumen: 'Publica ordenanzas de cálculo de recursos, boletín oficial municipal digitalizado y licitaciones del Emvial y Emtur.'
    },
    cantidadObras: 49,
    cantidadContrataciones: 1350,
    cantidadProveedores: 410,
    ultimaActualizacion: '19/08/2026',
    fuenteOficial: {
      nombre: 'Portal de Transparencia Mar del Plata (DEMO)',
      url: 'https://mgp.gob.ar/demo/transparencia',
      tipo: 'Portal Municipal Oficial de la Costa',
      fechaCorte: '15/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 36000000000, ejecutado: 34200000000 },
      { anio: 2023, aprobado: 62000000000, ejecutado: 59800000000 },
      { anio: 2024, aprobado: 104000000000, ejecutado: 99100000000 },
      { anio: 2025, aprobado: 143000000000, ejecutado: 137800000000 },
      { anio: 2026, aprobado: 172000000000, ejecutado: 125560000000 }
    ],
    distribucionGasto: [
      { categoria: 'Personal y Salarios', porcentaje: 44, monto: 75680000000, color: '#0284c7', icono: 'Users', descripcion: 'Docentes del sistema educativo municipal marplatense, salud y operativos.', ejemploCotextual: '$44 de cada $100 destinados al personal.' },
      { categoria: 'Higiene Urbana y Tratamiento de Residuos', porcentaje: 22, monto: 37840000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Recolección y operación del predio de disposición final de residuos.', ejemploCotextual: '$22 de cada $100 en higiene y tratamiento ambiental.' },
      { categoria: 'Vialidad y Alumbrado (EMVIAL)', porcentaje: 15, monto: 25800000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Reparación de calzadas, repavimentación y luminarias en barrios periféricos.', ejemploCotextual: '$15 de cada $100 en calles y luminarias.' },
      { categoria: 'Salud y Prevención', porcentaje: 10, monto: 17200000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Centros de salud municipales y CEMA (Centro de Especialidades Médicas).', ejemploCotextual: '$10 de cada $100 en atención médica ambulatoria.' },
      { categoria: 'Seguridad y Operativos de Temporada', porcentaje: 5, monto: 8600000000, color: '#f59e0b', icono: 'ShieldCheck', descripcion: 'Centro de Monitoreo COM y guardavidas de playas públicas.', ejemploCotextual: '$5 de cada $100 en seguridad y operativos de costa.' },
      { categoria: 'Turismo y Cultura (EMTUR)', porcentaje: 4, monto: 6880000000, color: '#8b5cf6', icono: 'Sun', descripcion: 'Promoción turística durante los 12 meses y festivales culturales.', ejemploCotextual: '$4 de cada $100 en eventos y turismo.' }
    ],
    origenIngresos: [
      { origen: 'Tasa por Servicios Urbanos (TSU) y Reductores Comerciales', porcentaje: 46, monto: 79120000000, descripcion: 'Recaudación tributaria local.' },
      { origen: 'Coparticipación de la Provincia de Buenos Aires', porcentaje: 42, monto: 72240000000, descripcion: 'Aportes automáticos de la ley de coparticipación bonaerense.' },
      { origen: 'Fondos Turísticos y Convenios Portuarios', porcentaje: 12, monto: 20640000000, descripcion: 'Tasas de infraestructura y canon de playas.' }
    ],
    ejecucionEtapas: {
      aprobado: 172000000000,
      comprometido: 149640000000,
      devengado: 135880000000,
      pagado: 125560000000
    },
    obras: [
      {
        id: 'mdp-obra-1',
        nombre: 'Reencarpetado Asfáltico en Avenida Juan B. Justo',
        descripcion: 'Fresado integral y colocación de concreto asfáltico en caliente en 4.5 km del corredor fabril y comercial.',
        estado: 'En ejecución',
        presupuesto: 2800000000,
        montoEjecutado: 1960000000,
        avance: 70,
        contratista: 'Constructora Atlántica S.A.',
        cuitContratista: '30-71009823-4',
        fechaInicio: '03/2026',
        fechaFinEstimada: '11/2026',
        categoria: 'Vial y Pavimentación',
        ubicacion: 'Avenida Juan B. Justo (Independencia a Champagnat)',
        fuenteUrl: 'https://mgp.gob.ar/demo/obras/mdp-1'
      }
    ],
    contrataciones: [
      {
        id: 'mdp-lic-2026-088',
        expediente: 'EXP-MGP-2026-11200',
        fecha: '05/07/2026',
        descripcion: 'Servicio de mantenimiento y guardia preventiva del sistema de cámaras de monitoreo costero',
        proveedor: 'Seguridad Electrónica Mar del Plata S.R.L.',
        cuitProveedor: '30-71339841-2',
        monto: 310000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Seguridad',
        fuenteUrl: 'https://mgp.gob.ar/demo/compras/88'
      }
    ],
    proveedores: [
      {
        id: 'prov-mdp-1',
        razonSocial: 'Constructora Atlántica S.A.',
        cuit: '30-71009823-4',
        rubro: 'Obras Viales y Movimiento de Suelos',
        montoTotalAdjudicado: 5600000000,
        cantidadContratos: 4,
        calificacionCumplimiento: 4.7,
        obrasAsignadas: ['Reencarpetado Juan B. Justo']
      }
    ],
    funcionarios: [
      { id: 'fmdp-1', nombre: 'Lic. Germán Blanco', cargo: 'Secretario de Hacienda', area: 'Hacienda', declaracionJuradaUrl: 'https://mgp.gob.ar/demo/ddjj/blanco.pdf', fechaInicio: '10/12/2023', contactoPublico: 'hacienda@mardelplata.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'mdp-ds-1', titulo: 'Obras Públicas y Plan de Asfalto Mar del Plata', descripcion: 'Listado georreferenciado con contratistas y porcentaje de ejecución.', formato: 'CSV', actualizacion: '19/08/2026', registros: 49, peso: '180 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'moron',
    nombre: 'Morón',
    provincia: 'Buenos Aires',
    region: 'AMBA',
    poblacion: 334178,
    presupuestoTotal: 92400000000, // $92.4 B
    presupuestoPorHabitante: 276500,
    ejecucionPorcentaje: 75,
    nivelTransparencia: 'Muy Alto',
    scoreTransparencia: {
      total: 90,
      presupuesto: 93,
      contrataciones: 91,
      obras: 88,
      proveedores: 87,
      sueldosYFuncionarios: 91,
      metodologiaResumen: 'Histórico municipio pionero en audiencias públicas ciudadanas, presupuesto participativo y portal de compras abiertas.'
    },
    cantidadObras: 42,
    cantidadContrataciones: 1100,
    cantidadProveedores: 360,
    ultimaActualizacion: '21/08/2026',
    fuenteOficial: {
      nombre: 'Portal Morón Transparente (DEMO)',
      url: 'https://transparencia.moron.gob.ar/demo',
      tipo: 'Portal Municipal Oficial del Conurbano',
      fechaCorte: '18/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 19800000000, ejecutado: 19100000000 },
      { anio: 2023, aprobado: 34500000000, ejecutado: 33200000000 },
      { anio: 2024, aprobado: 56000000000, ejecutado: 53900000000 },
      { anio: 2025, aprobado: 76800000000, ejecutado: 73500000000 },
      { anio: 2026, aprobado: 92400000000, ejecutado: 69300000000 }
    ],
    distribucionGasto: [
      { categoria: 'Personal y Salarios', porcentaje: 40, monto: 36960000000, color: '#0284c7', icono: 'Users', descripcion: 'Trabajadores del Hospital de Morón, jardines maternales y servicios comunales.', ejemploCotextual: '$40 de cada $100 van a sueldos y aportes de trabajadores municipales.' },
      { categoria: 'Servicios Urbanos y Limpieza', porcentaje: 23, monto: 21252000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Higiene urbana, barrido, alumbrado público LED y mantenimiento de espacios verdes.', ejemploCotextual: '$23 de cada $100 para limpieza y mantenimiento de la vía pública.' },
      { categoria: 'Salud Pública Municipal', porcentaje: 15, monto: 13860000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Hospital Municipal de Morón Ostaciana B. de Lavignolle y 13 Centros de Salud (CAPS).', ejemploCotextual: '$15 de cada $100 en atención médica y farmacia hospitalaria.' },
      { categoria: 'Obras Públicas y Hábitat', porcentaje: 12, monto: 11088000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Pavimentación, cloacas y puesta en valor de plazas barriales.', ejemploCotextual: '$12 de cada $100 en obras e infraestructura urbana.' },
      { categoria: 'Seguridad Ciudadana', porcentaje: 6, monto: 5544000000, color: '#f59e0b', icono: 'ShieldCheck', descripcion: 'Central de Monitoreo de Seguridad de Morón, postas policiales y alarmas comunitarias.', ejemploCotextual: '$6 de cada $100 en prevención del delito.' },
      { categoria: 'Educación, Infancias y Políticas de Género', porcentaje: 4, monto: 3696000000, color: '#8b5cf6', icono: 'GraduationCap', descripcion: '16 jardines de infantes municipales y centro de atención a la mujer.', ejemploCotextual: '$4 de cada $100 en educación inicial y protección social.' }
    ],
    origenIngresos: [
      { origen: 'Tasas Municipales (Servicios Generales y TISH)', porcentaje: 51, monto: 47124000000, descripcion: 'Recursos tributarios de cobro directo municipal.' },
      { origen: 'Coparticipación de la Provincia de Buenos Aires', porcentaje: 39, monto: 36036000000, descripcion: 'Transferencias automáticas bonaerenses.' },
      { origen: 'Convenios Específicos para Cloacas y Obras', porcentaje: 10, monto: 9240000000, descripcion: 'Programas de financiamiento conjuntos.' }
    ],
    ejecucionEtapas: {
      aprobado: 92400000000,
      comprometido: 81312000000,
      devengado: 73920000000,
      pagado: 69300000000
    },
    obras: [
      {
        id: 'mor-obra-1',
        nombre: 'Reconversión Integral de la Plaza Alsina y Entorno Peatonal',
        descripcion: 'Nuevos juegos infantiles inclusivos con piso de caucho, luces LED y canteros con vegetación nativa.',
        estado: 'En ejecución',
        presupuesto: 620000000,
        montoEjecutado: 496000000,
        avance: 80,
        contratista: 'Urbana Oeste Construcciones S.R.L.',
        cuitContratista: '30-71348912-1',
        fechaInicio: '01/2026',
        fechaFinEstimada: '09/2026',
        categoria: 'Espacio Público',
        ubicacion: 'Villa Sarmiento / Morón Norte',
        fuenteUrl: 'https://transparencia.moron.gob.ar/demo/obras/mor-1'
      }
    ],
    contrataciones: [
      {
        id: 'mor-lic-2026-033',
        expediente: 'EXP-MOR-2026-05411',
        fecha: '11/06/2026',
        descripcion: 'Compra de medicamentos oncológicos y antibióticos de alta complejidad para la Farmacia Central Hospitalaria',
        proveedor: 'Laboratorios Unidos del Oeste S.A.',
        cuitProveedor: '30-70884912-7',
        monto: 540000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Hospital Municipal de Morón',
        fuenteUrl: 'https://transparencia.moron.gob.ar/demo/compras/33'
      }
    ],
    proveedores: [
      {
        id: 'prov-mor-1',
        razonSocial: 'Urbana Oeste Construcciones S.R.L.',
        cuit: '30-71348912-1',
        rubro: 'Obras Civiles y Plazas',
        montoTotalAdjudicado: 1850000000,
        cantidadContratos: 3,
        calificacionCumplimiento: 4.8,
        obrasAsignadas: ['Plaza Alsina']
      }
    ],
    funcionarios: [
      { id: 'fmor-1', nombre: 'Lic. Cecilia F. Soler', cargo: 'Secretaria de Economía y Finanzas', area: 'Economía', declaracionJuradaUrl: 'https://transparencia.moron.gob.ar/demo/ddjj/soler.pdf', fechaInicio: '10/12/2023', contactoPublico: 'economia@moron.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'mor-ds-1', titulo: 'Presupuesto Participativo: Proyectos Votados por Vecinos', descripcion: 'Resultados y estado de ejecución de obras elegidas directamente por la ciudadanía.', formato: 'CSV', actualizacion: '21/08/2026', registros: 180, peso: '320 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'bariloche',
    nombre: 'San Carlos de Bariloche',
    provincia: 'Río Negro',
    region: 'Patagonia',
    poblacion: 146000,
    presupuestoTotal: 54800000000, // $54.8 B
    presupuestoPorHabitante: 375342,
    ejecucionPorcentaje: 72,
    nivelTransparencia: 'Alto',
    scoreTransparencia: {
      total: 79,
      presupuesto: 83,
      contrataciones: 80,
      obras: 76,
      proveedores: 77,
      sueldosYFuncionarios: 79,
      metodologiaResumen: 'Publica ordenanzas de ejecución trimestral, tasas turísticas (Ecotasa) y contrataciones del Plan de Manejo Costero.'
    },
    cantidadObras: 31,
    cantidadContrataciones: 740,
    cantidadProveedores: 240,
    ultimaActualizacion: '18/08/2026',
    fuenteOficial: {
      nombre: 'Portal Bariloche Abierto (DEMO)',
      url: 'https://bariloche.gov.ar/demo/datos',
      tipo: 'Portal Municipal Oficial de la Patagonia',
      fechaCorte: '15/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 11200000000, ejecutado: 10800000000 },
      { anio: 2023, aprobado: 20500000000, ejecutado: 19800000000 },
      { anio: 2024, aprobado: 34000000000, ejecutado: 32600000000 },
      { anio: 2025, aprobado: 45600000000, ejecutado: 43900000000 },
      { anio: 2026, aprobado: 54800000000, ejecutado: 39456000000 }
    ],
    distribucionGasto: [
      { categoria: 'Personal y Salarios', porcentaje: 43, monto: 23564000000, color: '#0284c7', icono: 'Users', descripcion: 'Personal de mantenimiento invernal, inspectores de turismo, tránsito y operarios.', ejemploCotextual: '$43 de cada $100 van a sueldos del personal municipal.' },
      { categoria: 'Servicios Públicos y Mantenimiento Invernal', porcentaje: 23, monto: 12604000000, color: '#06b6d4', icono: 'Snowflake', descripcion: 'Despeje de nieve y hielo en calles, recolección de residuos y alumbrado.', ejemploCotextual: '$23 de cada $100 para operatividad y despeje de nieve.' },
      { categoria: 'Obras Turísticas e Infraestructura (Ecotasa)', porcentaje: 16, monto: 8768000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Senderos de montaña, miradores, iluminación de avenidas pioneras y ciclovías.', ejemploCotextual: '$16 de cada $100 en obras para vecinos y turistas.' },
      { categoria: 'Desarrollo Social y Atención Barrial', porcentaje: 10, monto: 5480000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Plan Calor para provisión de leña y gas en barrios altos durante el invierno.', ejemploCotextual: '$10 de cada $100 en contención social y Plan Calor.' },
      { categoria: 'Ambiente, Bosques y Protección Civil', porcentaje: 8, monto: 4384000000, color: '#10b981', icono: 'Trees', descripcion: 'Brigadas de prevención de incendios forestales y cuidado del lago Nahuel Huapi.', ejemploCotextual: '$8 de cada $100 en prevención de incendios y ambiente.' }
    ],
    origenIngresos: [
      { origen: 'Tasas Municipales e Inspección y Ecotasa Turística', porcentaje: 54, monto: 29592000000, descripcion: 'Ingresos tributarios locales y tasa al turista.' },
      { origen: 'Coparticipación de la Provincia de Río Negro', porcentaje: 36, monto: 19728000000, descripcion: 'Fondos de la ley de coparticipación provincial.' },
      { origen: 'Regalías Hidrocarburíferas e Hidroeléctricas', porcentaje: 10, monto: 5480000000, descripcion: 'Regalías de generación de energía patagónica.' }
    ],
    ejecucionEtapas: {
      aprobado: 54800000000,
      comprometido: 47128000000,
      devengado: 42744000000,
      pagado: 39456000000
    },
    obras: [
      {
        id: 'bar-obra-1',
        nombre: 'Paseo Costero del Lago Nahuel Huapi - Etapa III',
        descripcion: 'Construcción de pasarelas de madera tratada, iluminación solar fotovoltaica y barandas de seguridad.',
        estado: 'En ejecución',
        presupuesto: 950000000,
        montoEjecutado: 617500000,
        avance: 65,
        contratista: 'Patagonia Obras Civiles S.A.',
        cuitContratista: '30-71409218-3',
        fechaInicio: '02/2026',
        fechaFinEstimada: '11/2026',
        categoria: 'Espacio Público',
        ubicacion: 'Avenida Bustillo Km 4 / Playa Bonita',
        fuenteUrl: 'https://bariloche.gov.ar/demo/obras/bar-1'
      }
    ],
    contrataciones: [
      {
        id: 'bar-lic-2026-024',
        expediente: 'EXP-BAR-2026-03120',
        fecha: '18/05/2026',
        descripcion: 'Adquisición de sal a granel y líquido anticongelante para el Plan de Contingencia Invernal en rutas municipales',
        proveedor: 'Sales y Químicos del Sur S.R.L.',
        cuitProveedor: '30-69123490-1',
        monto: 215000000,
        tipo: 'Licitación Privada',
        estado: 'Adjudicada',
        areaSolicitante: 'Dirección de Protección Civil',
        fuenteUrl: 'https://bariloche.gov.ar/demo/compras/24'
      }
    ],
    proveedores: [
      {
        id: 'prov-bar-1',
        razonSocial: 'Patagonia Obras Civiles S.A.',
        cuit: '30-71409218-3',
        rubro: 'Arquitectura Paisajística y Senderos',
        montoTotalAdjudicado: 2100000000,
        cantidadContratos: 3,
        calificacionCumplimiento: 4.8,
        obrasAsignadas: ['Paseo Costero Nahuel Huapi']
      }
    ],
    funcionarios: [
      { id: 'fbar-1', nombre: 'Lic. Carina Ondarçuhu', cargo: 'Secretaria de Hacienda', area: 'Hacienda', declaracionJuradaUrl: 'https://bariloche.gov.ar/demo/ddjj/ondarcuhu.pdf', fechaInicio: '10/12/2023', contactoPublico: 'hacienda@bariloche.gov.ar' }
    ],
    datosAbiertos: [
      { id: 'bar-ds-1', titulo: 'Recaudación y Destino de Fondos de la Ecotasa', descripcion: 'Rendición de cuentas de la tasa al turismo aplicada exclusivamente a infraestructura pública.', formato: 'CSV', actualizacion: '18/08/2026', registros: 120, peso: '140 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'salta',
    nombre: 'Salta Capital',
    provincia: 'Salta',
    region: 'NOA',
    poblacion: 627000,
    presupuestoTotal: 138000000000, // $138 B
    presupuestoPorHabitante: 220095,
    ejecucionPorcentaje: 74,
    nivelTransparencia: 'Alto',
    scoreTransparencia: {
      total: 81,
      presupuesto: 85,
      contrataciones: 82,
      obras: 78,
      proveedores: 77,
      sueldosYFuncionarios: 83,
      metodologiaResumen: 'Publica ordenanzas de presupuesto, padrón de proveedores y geolocalización de bacheo y obras hidráulicas.'
    },
    cantidadObras: 46,
    cantidadContrataciones: 1190,
    cantidadProveedores: 380,
    ultimaActualizacion: '17/08/2026',
    fuenteOficial: {
      nombre: 'Portal de Transparencia Ciudad de Salta (DEMO)',
      url: 'https://municipalidadsalta.gob.ar/demo/transparencia',
      tipo: 'Portal Municipal Oficial del NOA',
      fechaCorte: '14/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 28000000000, ejecutado: 26900000000 },
      { anio: 2023, aprobado: 51000000000, ejecutado: 48900000000 },
      { anio: 2024, aprobado: 84000000000, ejecutado: 80200000000 },
      { anio: 2025, aprobado: 11400000000, ejecutado: 10950000000 },
      { anio: 2026, aprobado: 138000000000, ejecutado: 102120000000 }
    ],
    distribucionGasto: [
      { categoria: 'Personal y Salarios', porcentaje: 41, monto: 56580000000, color: '#0284c7', icono: 'Users', descripcion: 'Sueldos de agentes municipales, agentes de tránsito y personal de servicios.', ejemploCotextual: '$41 de cada $100 para remuneraciones del personal.' },
      { categoria: 'Servicios Urbanos y Recolección', porcentaje: 25, monto: 34500000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Servicio de higiene urbana, recolección y alumbrado público.', ejemploCotextual: '$25 de cada $100 en higiene y recolección.' },
      { categoria: 'Obras Públicas y Desagües Pluviales', porcentaje: 18, monto: 24840000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Canales de drenaje pluvial para temporada estival y bacheo intensivo.', ejemploCotextual: '$18 de cada $100 en canales y pavimento.' },
      { categoria: 'Desarrollo Humano y Acción Social', porcentaje: 10, monto: 13800000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Comedores comunitarios, centros integradores comunitarios (CIC) y salud.', ejemploCotextual: '$10 de cada $100 en contención social barrial.' },
      { categoria: 'Cultura, Turismo y Patrimonio Colonial', porcentaje: 6, monto: 8280000000, color: '#8b5cf6', icono: 'Landmark', descripcion: 'Puesta en valor del casco histórico y circuitos culturales.', ejemploCotextual: '$6 de cada $100 en turismo y patrimonio.' }
    ],
    origenIngresos: [
      { origen: 'Tasas Municipales e Impuesto Automotor Local', porcentaje: 44, monto: 60720000000, descripcion: 'Recaudación propia municipal.' },
      { origen: 'Coparticipación Provincial y Federal', porcentaje: 48, monto: 66240000000, descripcion: 'Transferencias de ley provincial de coparticipación.' },
      { origen: 'Fondos Hídricos Especiales', porcentaje: 8, monto: 11040000000, descripcion: 'Aportes para mitigación de inundaciones de verano.' }
    ],
    ejecucionEtapas: {
      aprobado: 138000000000,
      comprometido: 121440000000,
      devengado: 110400000000,
      pagado: 102120000000
    },
    obras: [
      {
        id: 'sal-obra-1',
        nombre: 'Revestimiento de Hormigón en Canal Tineo y Colector Norte',
        descripcion: 'Ensanche de capacidad hidráulica para evacuar crecidas pluviales de lluvias de verano.',
        estado: 'En ejecución',
        presupuesto: 3100000000,
        montoEjecutado: 2325000000,
        avance: 75,
        contratista: 'Noroeste Construcciones Hidráulicas S.A.',
        cuitContratista: '30-70984123-5',
        fechaInicio: '01/2026',
        fechaFinEstimada: '10/2026',
        categoria: 'Hidráulica y Desagües',
        ubicacion: 'Zona Norte / Canal Tineo',
        fuenteUrl: 'https://municipalidadsalta.gob.ar/demo/obras/sal-1'
      }
    ],
    contrataciones: [
      {
        id: 'sal-lic-2026-051',
        expediente: 'EXP-SAL-2026-07412',
        fecha: '20/06/2026',
        descripcion: 'Adquisición de 4.000 toneladas de mezcla asfáltica en caliente para el Plan de Bacheo Nocturno',
        proveedor: 'Asfaltos del Norte S.R.L.',
        cuitProveedor: '30-68449102-1',
        monto: 620000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Obras Públicas',
        fuenteUrl: 'https://municipalidadsalta.gob.ar/demo/compras/51'
      }
    ],
    proveedores: [
      {
        id: 'prov-sal-1',
        razonSocial: 'Noroeste Construcciones Hidráulicas S.A.',
        cuit: '30-70984123-5',
        rubro: 'Canales y Obras Hidráulicas',
        montoTotalAdjudicado: 4800000000,
        cantidadContratos: 3,
        calificacionCumplimiento: 4.6,
        obrasAsignadas: ['Canal Tineo']
      }
    ],
    funcionarios: [
      { id: 'fsal-1', nombre: 'Lic. Facundo F. Furió', cargo: 'Secretario de Economía y Hacienda', area: 'Economía', declaracionJuradaUrl: 'https://municipalidadsalta.gob.ar/demo/ddjj/furio.pdf', fechaInicio: '10/12/2023', contactoPublico: 'economia@municipalidadsalta.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'sal-ds-1', titulo: 'Mapa Interactivo de Puntos de Bacheo y Obras Pluviales', descripcion: 'Dataset con puntos intervenidos por el municipio.', formato: 'JSON', actualizacion: '17/08/2026', registros: 340, peso: '480 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'neuquen',
    nombre: 'Neuquén Capital',
    provincia: 'Neuquén',
    region: 'Patagonia',
    poblacion: 288898,
    presupuestoTotal: 126000000000, // $126 B
    presupuestoPorHabitante: 436140,
    ejecucionPorcentaje: 79,
    nivelTransparencia: 'Muy Alto',
    scoreTransparencia: {
      total: 91,
      presupuesto: 94,
      contrataciones: 91,
      obras: 90,
      proveedores: 88,
      sueldosYFuncionarios: 92,
      metodologiaResumen: 'Superávit corriente sostenido con inversión récord en obras financiadas con recursos propios y regalías de Vaca Muerta.'
    },
    cantidadObras: 62,
    cantidadContrataciones: 1580,
    cantidadProveedores: 490,
    ultimaActualizacion: '24/08/2026',
    fuenteOficial: {
      nombre: 'Portal Neuquén Abierto (DEMO)',
      url: 'https://neuquencapital.gov.ar/demo/transparencia',
      tipo: 'Portal Municipal Oficial de la Patagonia',
      fechaCorte: '21/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 26000000000, ejecutado: 25400000000 },
      { anio: 2023, aprobado: 48000000000, ejecutado: 46900000000 },
      { anio: 2024, aprobado: 79000000000, ejecutado: 77200000000 },
      { anio: 2025, aprobado: 10500000000, ejecutado: 10280000000 },
      { anio: 2026, aprobado: 126000000000, ejecutado: 99540000000 }
    ],
    distribucionGasto: [
      { categoria: 'Obras Públicas y Plan Capital', porcentaje: 34, monto: 42840000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Apertura de avenidas, pavimentación masiva y paseos costeros en los ríos Limay y Neuquén.', ejemploCotextual: '$34 de cada $100 van directo a obras de infraestructura.' },
      { categoria: 'Personal y Salarios', porcentaje: 30, monto: 37800000000, color: '#0284c7', icono: 'Users', descripcion: 'Equipo de servicios comunales, inspectores y planta municipal.', ejemploCotextual: '$30 de cada $100 en salarios municipales.' },
      { categoria: 'Servicios Urbanos y Limpieza', porcentaje: 22, monto: 27720000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Cliba/recolección diferenciada, centros de transferencia de residuos y alumbrado.', ejemploCotextual: '$22 de cada $100 en higiene y recolección.' },
      { categoria: 'Transporte y Conectividad (COLE)', porcentaje: 8, monto: 10080000000, color: '#f59e0b', icono: 'Bus', descripcion: 'Sistema moderno de colectivos con GPS y paradas inteligentes.', ejemploCotextual: '$8 de cada $100 en transporte público.' },
      { categoria: 'Cultura, Deporte y Juventud', porcentaje: 6, monto: 7560000000, color: '#8b5cf6', icono: 'Sparkles', descripcion: 'Fiesta Nacional de la Confluencia y polideportivos barriales.', ejemploCotextual: '$6 de cada $100 en eventos y deporte comunitario.' }
    ],
    origenIngresos: [
      { origen: 'Tasas Municipales e Ingresos Tributarios Propios', porcentaje: 52, monto: 65520000000, descripcion: 'Alta recaudación por actividad comercial y de servicios.' },
      { origen: 'Regalías Petroleras y Gasíferas (Vaca Muerta)', porcentaje: 26, monto: 32760000000, descripcion: 'Participación municipal directa en regalías hidrocarburíferas.' },
      { origen: 'Coparticipación de la Provincia de Neuquén', porcentaje: 22, monto: 27720000000, descripcion: 'Transferencias legales automáticas.' }
    ],
    ejecucionEtapas: {
      aprobado: 126000000000,
      comprometido: 114660000000,
      devengado: 105840000000,
      pagado: 99540000000
    },
    obras: [
      {
        id: 'nqn-obra-1',
        nombre: 'Extensión del Paseo Costero sobre el Río Neuquén (Fase 4)',
        descripcion: '4 km de paseo peatonal iluminado con miradores, ciclovía asfaltada y reforestación de ribera.',
        estado: 'En ejecución',
        presupuesto: 3900000000,
        montoEjecutado: 3315000000,
        avance: 85,
        contratista: 'Neuquén Construcciones Civiles S.A.',
        cuitContratista: '30-71199412-8',
        fechaInicio: '10/2025',
        fechaFinEstimada: '09/2026',
        categoria: 'Espacio Público',
        ubicacion: 'Confluencia Travesía Río Neuquén',
        fuenteUrl: 'https://neuquencapital.gov.ar/demo/obras/nqn-1'
      }
    ],
    contrataciones: [
      {
        id: 'nqn-lic-2026-092',
        expediente: 'EXP-NQN-2026-14109',
        fecha: '14/07/2026',
        descripcion: 'Construcción de cordón cuneta y asfaltado de 50 cuadras en Barrio Confluencia Rural',
        proveedor: 'Asfaltos Patagónicos S.A.',
        cuitProveedor: '30-71049182-3',
        monto: 1820000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Infraestructura',
        fuenteUrl: 'https://neuquencapital.gov.ar/demo/compras/92'
      }
    ],
    proveedores: [
      {
        id: 'prov-nqn-1',
        razonSocial: 'Neuquén Construcciones Civiles S.A.',
        cuit: '30-71199412-8',
        rubro: 'Grandes Obras de Infraestructura',
        montoTotalAdjudicado: 7400000000,
        cantidadContratos: 4,
        calificacionCumplimiento: 4.9,
        obrasAsignadas: ['Paseo Costero Río Neuquén']
      }
    ],
    funcionarios: [
      { id: 'fnqn-1', nombre: 'Cr. Fernando Schpoliansky', cargo: 'Secretario de Finanzas', area: 'Finanzas', declaracionJuradaUrl: 'https://neuquencapital.gov.ar/demo/ddjj/schpoliansky.pdf', fechaInicio: '10/12/2023', contactoPublico: 'finanzas@neuquencapital.gov.ar' }
    ],
    datosAbiertos: [
      { id: 'nqn-ds-1', titulo: 'Régimen de Inversión y Plan Capital', descripcion: 'Plan de inversiones públicas con geocodificación de obras.', formato: 'CSV', actualizacion: '24/08/2026', registros: 1400, peso: '620 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'tucuman',
    nombre: 'San Miguel de Tucumán',
    provincia: 'Tucumán',
    region: 'NOA',
    poblacion: 605000,
    presupuestoTotal: 119000000000, // $119 B
    presupuestoPorHabitante: 196694,
    ejecucionPorcentaje: 71,
    nivelTransparencia: 'Medio',
    scoreTransparencia: {
      total: 73,
      presupuesto: 78,
      contrataciones: 72,
      obras: 70,
      proveedores: 68,
      sueldosYFuncionarios: 77,
      metodologiaResumen: 'Publica ordenanzas anuales en PDF y boletín oficial quincenal, avanzando en digitalización de compras.'
    },
    cantidadObras: 37,
    cantidadContrataciones: 890,
    cantidadProveedores: 290,
    ultimaActualizacion: '14/08/2026',
    fuenteOficial: {
      nombre: 'Portal de la Municipalidad de San Miguel de Tucumán (DEMO)',
      url: 'https://smt.gob.ar/demo/transparencia',
      tipo: 'Portal Municipal Oficial de Tucumán',
      fechaCorte: '10/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 24000000000, ejecutado: 22800000000 },
      { anio: 2023, aprobado: 43000000000, ejecutado: 41200000000 },
      { anio: 2024, aprobado: 72000000000, ejecutado: 68500000000 },
      { anio: 2025, aprobado: 98000000000, ejecutado: 93500000000 },
      { anio: 2026, aprobado: 119000000000, ejecutado: 84490000000 }
    ],
    distribucionGasto: [
      { categoria: 'Personal y Salarios', porcentaje: 48, monto: 57120000000, color: '#0284c7', icono: 'Users', descripcion: 'Sueldos de planta permanente, docentes y operarios municipales.', ejemploCotextual: '$48 de cada $100 en salarios del personal municipal.' },
      { categoria: 'Servicios Urbanos y Limpieza', porcentaje: 24, monto: 28560000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Recolección de basura, desmalezamiento y mantenimiento de plazas.', ejemploCotextual: '$24 de cada $100 en limpieza y servicios.' },
      { categoria: 'Obras Públicas y Pavimento', porcentaje: 13, monto: 15470000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Repavimentación de avenidas y repotenciación lumínica LED.', ejemploCotextual: '$13 de cada $100 en obras viales.' },
      { categoria: 'Salud y Asistencia Comunitaria', porcentaje: 9, monto: 10710000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Asistencia Pública Municipal y centros periféricos.', ejemploCotextual: '$9 de cada $100 en salud comunitaria.' },
      { categoria: 'Cultura y Turismo Histórico', porcentaje: 6, monto: 7140000000, color: '#8b5cf6', icono: 'Landmark', descripcion: 'Casa Histórica entorno, eventos del 9 de Julio y teatros.', ejemploCotextual: '$6 de cada $100 en cultura y patrimonio.' }
    ],
    origenIngresos: [
      { origen: 'Contribución Tributaria Municipal (TEM)', porcentaje: 42, monto: 49980000000, descripcion: 'Tributo sobre la Actividad Económica y tasas.' },
      { origen: 'Coparticipación de la Provincia de Tucumán', porcentaje: 49, monto: 58310000000, descripcion: 'Fondos de coparticipación tucumana.' },
      { origen: 'Aportes Extraordinarios de Obras', porcentaje: 9, monto: 10710000000, descripcion: 'Convenios para pavimentación.' }
    ],
    ejecucionEtapas: {
      aprobado: 119000000000,
      comprometido: 101150000000,
      devengado: 91630000000,
      pagado: 84490000000
    },
    obras: [
      {
        id: 'tuc-obra-1',
        nombre: 'Puesta en Valor y Semi-Peatonalización Calle 25 de Mayo (Fase 2)',
        descripcion: 'Ensanche de veredas, adoquines de pórfido y soterramiento de cables en el microcentro.',
        estado: 'En ejecución',
        presupuesto: 1200000000,
        montoEjecutado: 840000000,
        avance: 70,
        contratista: 'Norte Construcciones S.A.',
        cuitContratista: '30-67123901-4',
        fechaInicio: '02/2026',
        fechaFinEstimada: '10/2026',
        categoria: 'Espacio Público',
        ubicacion: 'Microcentro / Calle 25 de Mayo',
        fuenteUrl: 'https://smt.gob.ar/demo/obras/tuc-1'
      }
    ],
    contrataciones: [
      {
        id: 'tuc-lic-2026-019',
        expediente: 'EXP-SMT-2026-03910',
        fecha: '11/05/2026',
        descripcion: 'Provisión de 3.500 artefactos LED de alta potencia para alumbrado público barrial',
        proveedor: 'Luminarias del Norte S.R.L.',
        cuitProveedor: '30-71239041-8',
        monto: 390000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Dirección de Alumbrado',
        fuenteUrl: 'https://smt.gob.ar/demo/compras/19'
      }
    ],
    proveedores: [
      {
        id: 'prov-tuc-1',
        razonSocial: 'Norte Construcciones S.A.',
        cuit: '30-67123901-4',
        rubro: 'Obras Civiles y Viales',
        montoTotalAdjudicado: 3200000000,
        cantidadContratos: 3,
        calificacionCumplimiento: 4.5,
        obrasAsignadas: ['Semipeatonalización 25 de Mayo']
      }
    ],
    funcionarios: [
      { id: 'ftuc-1', nombre: 'C.P.N. Marcelo R. Albaca', cargo: 'Secretario de Ingresos Municipales', area: 'Hacienda', declaracionJuradaUrl: 'https://smt.gob.ar/demo/ddjj/albaca.pdf', fechaInicio: '10/12/2023', contactoPublico: 'ingresos@smt.gob.ar' }
    ],
    datosAbiertos: [
      { id: 'tuc-ds-1', titulo: 'Boletines Oficiales Municipales Digitales 2026', descripcion: 'Compendio de decretos y ordenanzas promulgadas.', formato: 'CSV', actualizacion: '14/08/2026', registros: 540, peso: '980 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'posadas',
    nombre: 'Posadas',
    provincia: 'Misiones',
    region: 'NEA',
    poblacion: 393000,
    presupuestoTotal: 86500000000, // $86.5 B
    presupuestoPorHabitante: 220101,
    ejecucionPorcentaje: 76,
    nivelTransparencia: 'Alto',
    scoreTransparencia: {
      total: 83,
      presupuesto: 86,
      contrataciones: 84,
      obras: 81,
      proveedores: 80,
      sueldosYFuncionarios: 84,
      metodologiaResumen: 'Ciudad sustentable con monitoreo de puntos limpios, compras transparentes y portal geográfico de obras costeras.'
    },
    cantidadObras: 39,
    cantidadContrataciones: 940,
    cantidadProveedores: 280,
    ultimaActualizacion: '20/08/2026',
    fuenteOficial: {
      nombre: 'Portal Posadas Sustentable y Abierta (DEMO)',
      url: 'https://posadas.gov.ar/demo/transparencia',
      tipo: 'Portal Municipal Oficial de Misiones',
      fechaCorte: '16/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 18000000000, ejecutado: 17200000000 },
      { anio: 2023, aprobado: 32000000000, ejecutado: 30800000000 },
      { anio: 2024, aprobado: 53000000000, ejecutado: 51200000000 },
      { anio: 2025, aprobado: 71000000000, ejecutado: 68500000000 },
      { anio: 2026, aprobado: 86500000000, ejecutado: 65740000000 }
    ],
    distribucionGasto: [
      { categoria: 'Personal y Salarios', porcentaje: 41, monto: 35465000000, color: '#0284c7', icono: 'Users', descripcion: 'Equipo de servicios públicos, saneamiento ambiental y salud barrial.', ejemploCotextual: '$41 de cada $100 para remuneraciones del personal.' },
      { categoria: 'Ambiente, Sustentabilidad y Recolección', porcentaje: 25, monto: 21625000000, color: '#06b6d4', icono: 'Recycle', descripcion: 'Eco-puntos, recolección clasificada de residuos y arbolado nativo.', ejemploCotextual: '$25 de cada $100 en economía circular y ambiente.' },
      { categoria: 'Obras Públicas y Costanera', porcentaje: 18, monto: 15570000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Extensión de la Costanera del Río Paraná, asfalto sobre empedrado y desagües.', ejemploCotextual: '$18 de cada $100 en obras e infraestructura urbana.' },
      { categoria: 'Salud y Prevención de Endemias', porcentaje: 10, monto: 8650000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Operativos de descacharrado y combate preventivo del dengue.', ejemploCotextual: '$10 de cada $100 en prevención epidemiológica y salud.' },
      { categoria: 'Turismo, Innovación y Eventos', porcentaje: 6, monto: 5190000000, color: '#8b5cf6', icono: 'Sparkles', descripcion: 'Polo de innovación Silicon Misiones municipal y balnearios El Brete y Costa Sur.', ejemploCotextual: '$6 de cada $100 en innovación y turismo.' }
    ],
    origenIngresos: [
      { origen: 'Tasas Inmobiliarias y Comercio Local', porcentaje: 45, monto: 38925000000, descripcion: 'Recursos tributarios directos posadeños.' },
      { origen: 'Coparticipación de la Provincia de Misiones', porcentaje: 43, monto: 37195000000, descripcion: 'Fondos de coparticipación misionera.' },
      { origen: 'Regalías Energéticas de Yacyretá y Convenios EBY', porcentaje: 12, monto: 10380000000, descripcion: 'Convenios de la Entidad Binacional Yacyretá.' }
    ],
    ejecucionEtapas: {
      aprobado: 86500000000,
      comprometido: 76120000000,
      devengado: 69200000000,
      pagado: 65740000000
    },
    obras: [
      {
        id: 'pos-obra-1',
        nombre: 'Parque Solar Fotovoltaico y Parque Botánico Costa Sur',
        descripcion: 'Instalación de paneles solares para autoabastecimiento del balneario y senderos de selva paranaense.',
        estado: 'En ejecución',
        presupuesto: 1450000000,
        montoEjecutado: 1160000000,
        avance: 80,
        contratista: 'Misiones Energías Renovables S.A.',
        cuitContratista: '30-71589412-6',
        fechaInicio: '01/2026',
        fechaFinEstimada: '09/2026',
        categoria: 'Iluminación y Smart City',
        ubicacion: 'Costa Sur / Miguel Lanús',
        fuenteUrl: 'https://posadas.gov.ar/demo/obras/pos-1'
      }
    ],
    contrataciones: [
      {
        id: 'pos-lic-2026-044',
        expediente: 'EXP-POS-2026-06192',
        fecha: '18/06/2026',
        descripcion: 'Adquisición de 8 camiones compactadores de carga lateral para recolección automatizada',
        proveedor: 'Camiones y Maquinarias del NEA S.A.',
        cuitProveedor: '30-70912458-3',
        monto: 980000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Servicios Públicos',
        fuenteUrl: 'https://posadas.gov.ar/demo/compras/44'
      }
    ],
    proveedores: [
      {
        id: 'prov-pos-1',
        razonSocial: 'Misiones Energías Renovables S.A.',
        cuit: '30-71589412-6',
        rubro: 'Energía Solar y Sustentabilidad',
        montoTotalAdjudicado: 2400000000,
        cantidadContratos: 3,
        calificacionCumplimiento: 4.8,
        obrasAsignadas: ['Parque Solar Costa Sur']
      }
    ],
    funcionarios: [
      { id: 'fpos-1', nombre: 'Lic. Sebastián Guastavino', cargo: 'Secretario de Hacienda', area: 'Hacienda', declaracionJuradaUrl: 'https://posadas.gov.ar/demo/ddjj/guastavino.pdf', fechaInicio: '10/12/2023', contactoPublico: 'hacienda@posadas.gov.ar' }
    ],
    datosAbiertos: [
      { id: 'pos-ds-1', titulo: 'Mapa y Métricas de Puntos Limpios y Reciclaje 2026', descripcion: 'Toneladas recicladas por mes y localización de contenedores sustentables.', formato: 'JSON', actualizacion: '20/08/2026', registros: 420, peso: '380 KB', urlDescarga: '#' }
    ]
  },
  {
    id: 'vicente-lopez',
    nombre: 'Vicente López',
    provincia: 'Buenos Aires',
    region: 'AMBA',
    poblacion: 283500,
    presupuestoTotal: 142000000000, // $142 B
    presupuestoPorHabitante: 500881,
    ejecucionPorcentaje: 82,
    nivelTransparencia: 'Muy Alto',
    scoreTransparencia: {
      total: 94,
      presupuesto: 97,
      contrataciones: 95,
      obras: 92,
      proveedores: 91,
      sueldosYFuncionarios: 95,
      metodologiaResumen: 'Máxima puntuación en publicación en formatos abiertos, mapa georreferenciado de cámaras y seguimiento presupuestario mensual.'
    },
    cantidadObras: 51,
    cantidadContrataciones: 1820,
    cantidadProveedores: 510,
    ultimaActualizacion: '26/08/2026',
    fuenteOficial: {
      nombre: 'Portal Vicente López Abierto (DEMO)',
      url: 'https://vicentelopez.gov.ar/demo/datos-abiertos',
      tipo: 'Portal Municipal Oficial de Primera Sección',
      fechaCorte: '22/08/2026',
      esDemo: true
    },
    evolucionPresupuesto: [
      { anio: 2022, aprobado: 29000000000, ejecutado: 28200000000 },
      { anio: 2023, aprobado: 54000000000, ejecutado: 52600000000 },
      { anio: 2024, aprobado: 89000000000, ejecutado: 87100000000 },
      { anio: 2025, aprobado: 119000000000, ejecutado: 116500000000 },
      { anio: 2026, aprobado: 142000000000, ejecutado: 116440000000 }
    ],
    distribucionGasto: [
      { categoria: 'Salud y Maternidad Santa Rosa', porcentaje: 25, monto: 35500000000, color: '#10b981', icono: 'HeartPulse', descripcion: 'Hospital Municipal Dr. Bernardo Houssay, Maternidad Santa Rosa y centros de atención.', ejemploCotextual: '$25 de cada $100 van directo a sostener el sistema de salud municipal.' },
      { categoria: 'Seguridad Ciudadana y Patrulla', porcentaje: 20, monto: 28400000000, color: '#f59e0b', icono: 'ShieldCheck', descripcion: '2.100 cámaras de seguridad, patrullas municipales, paradas seguras y analítica con IA.', ejemploCotextual: '$20 de cada $100 en tecnología de seguridad y patrullaje preventivo.' },
      { categoria: 'Personal y Salarios', porcentaje: 28, monto: 39760000000, color: '#0284c7', icono: 'Users', descripcion: 'Personal médico, enfermería, inspectores, docentes y servidores públicos.', ejemploCotextual: '$28 de cada $100 en salarios de trabajadores municipales.' },
      { categoria: 'Servicios Urbanos y Paseo de la Costa', porcentaje: 15, monto: 21300000000, color: '#06b6d4', icono: 'Trash2', descripcion: 'Mantenimiento del Paseo de la Costa, higiene urbana, barrido mecánico y reciclaje.', ejemploCotextual: '$15 de cada $100 en limpieza y parques ribereños.' },
      { categoria: 'Educación e Innovación (Centro Universitario)', porcentaje: 7, monto: 9940000000, color: '#8b5cf6', icono: 'GraduationCap', descripcion: 'Centro Universitario Vicente López, jardín maternal de vanguardia y robótica.', ejemploCotextual: '$7 de cada $100 en formación universitaria y escuelas municipales.' },
      { categoria: 'Obras y Alumbrado', porcentaje: 5, monto: 7100000000, color: '#3b82f6', icono: 'Hammer', descripcion: 'Renovación de centros comerciales a cielo abierto y luminarias LED inteligentes.', ejemploCotextual: '$5 de cada $100 en obras barriales.' }
    ],
    origenIngresos: [
      { origen: 'Tasas Municipales (Tasa de Alumbrado, Limpieza y Servicios / TISH)', porcentaje: 65, monto: 92300000000, descripcion: 'Alta autonomía financiera con cobrabilidad récord.' },
      { origen: 'Coparticipación de la Provincia de Buenos Aires', porcentaje: 28, monto: 39760000000, descripcion: 'Fondos de coparticipación bonaerense.' },
      { origen: 'Fondos Específicos de Salud y Seguridad', porcentaje: 7, monto: 9940000000, descripcion: 'Aportes por especialidades hospitalarias.' }
    ],
    ejecucionEtapas: {
      aprobado: 142000000000,
      comprometido: 127800000000,
      devengado: 120700000000,
      pagado: 116440000000
    },
    obras: [
      {
        id: 'vl-obra-1',
        nombre: 'Nuevo Pabellón de Diagnóstico de Alta Complejidad Hospital Houssay',
        descripcion: 'Construcción y equipamiento de resonador magnético de última generación y consultorios modulares.',
        estado: 'En ejecución',
        presupuesto: 2600000000,
        montoEjecutado: 2210000000,
        avance: 85,
        contratista: 'Constructora Médica Metropolitana S.A.',
        cuitContratista: '30-71289123-1',
        fechaInicio: '08/2025',
        fechaFinEstimada: '09/2026',
        categoria: 'Salud y Hospitales',
        ubicacion: 'Florida / Hospital Houssay',
        fuenteUrl: 'https://vicentelopez.gov.ar/demo/obras/vl-1'
      }
    ],
    contrataciones: [
      {
        id: 'vl-lic-2026-077',
        expediente: 'EXP-VL-2026-10941',
        fecha: '22/07/2026',
        descripcion: 'Renovación de servidores y software con analítica forense por IA para el Centro de Monitoreo Urbano',
        proveedor: 'Seguridad Inteligente & Data S.A.',
        cuitProveedor: '30-71542109-9',
        monto: 890000000,
        tipo: 'Licitación Pública',
        estado: 'Adjudicada',
        areaSolicitante: 'Secretaría de Seguridad',
        fuenteUrl: 'https://vicentelopez.gov.ar/demo/compras/77'
      }
    ],
    proveedores: [
      {
        id: 'prov-vl-1',
        razonSocial: 'Constructora Médica Metropolitana S.A.',
        cuit: '30-71289123-1',
        rubro: 'Arquitectura Hospitalaria',
        montoTotalAdjudicado: 5200000000,
        cantidadContratos: 4,
        calificacionCumplimiento: 5.0,
        obrasAsignadas: ['Pabellón Diagnóstico Hospital Houssay']
      }
    ],
    funcionarios: [
      { id: 'fvl-1', nombre: 'Lic. Andrés P. Petrillo', cargo: 'Secretario de Hacienda y Finanzas', area: 'Hacienda', declaracionJuradaUrl: 'https://vicentelopez.gov.ar/demo/ddjj/petrillo.pdf', fechaInicio: '10/12/2023', contactoPublico: 'hacienda@vicentelopez.gov.ar' }
    ],
    datosAbiertos: [
      { id: 'vl-ds-1', titulo: 'API de Contrataciones Abiertas Estándar OCDS', descripcion: 'Licitaciones públicas en formato Open Contracting Data Standard.', formato: 'API REST', actualizacion: '26/08/2026', registros: 1820, peso: 'Live API', urlDescarga: '#' }
    ]
  }
];

export const PROVINCIAS_ARGENTINA = Array.from(new Set(MUNICIPIOS_DATA.map(m => m.provincia))).sort();

export function getMunicipioById(id: string): Municipio | undefined {
  return MUNICIPIOS_DATA.find(m => m.id === id);
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) {
    const b = (amount / 1_000_000_000).toFixed(1);
    return `$${b.replace('.0', '')} B`;
  }
  if (amount >= 1_000_000) {
    const m = (amount / 1_000_000).toFixed(1);
    return `$${m.replace('.0', '')} M`;
  }
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-AR').format(num);
}
