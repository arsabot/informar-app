import { TermGlossary } from '../types';

export const GLOSSARY: Record<string, TermGlossary> = {
  presupuesto: {
    term: 'Presupuesto',
    shortDefinition: 'La estimación oficial de todos los ingresos y gastos previstos para el año.',
    extendedDefinition: 'Es la ley u ordenanza municipal anual que autoriza al intendente a gastar hasta cierto monto y establece de dónde saldrán los recursos para financiar los servicios públicos.',
    practicalExample: 'Si el municipio proyecta recaudar $100 millones, el presupuesto detalla exactamente cómo se distribuirán entre sueldos, obras, salud y recolección.'
  },
  ejecucion: {
    term: 'Ejecución Presupuestaria',
    shortDefinition: 'El porcentaje del presupuesto planificado que efectivamente se ha utilizado hasta la fecha.',
    extendedDefinition: 'Mide el ritmo real de gasto respecto al plan anual. Una ejecución baja a fin de año puede indicar subejecución o demoras en obras, mientras que una muy acelerada puede requerir ampliaciones.',
    practicalExample: 'Si en agosto se gastó el 70% del presupuesto anual, el municipio lleva un ritmo de ejecución acorde al paso de los meses transcurridos.'
  },
  comprometido: {
    term: 'Gasto Comprometido',
    shortDefinition: 'Dinero reservado formalmente para un contrato u orden de compra.',
    extendedDefinition: 'Es el primer paso legal del gasto. El municipio firma una orden de compra o contrato con un proveedor, por lo que esos fondos ya quedan apartados y no pueden usarse para otra cosa.',
    practicalExample: 'Al firmar la compra de 5 ambulancias, el monto queda comprometido antes de que las entreguen.'
  },
  devengado: {
    term: 'Gasto Devengado',
    shortDefinition: 'La obligación de pago formal que surge cuando el bien o servicio ya fue entregado.',
    extendedDefinition: 'Se registra cuando el proveedor cumplió con el trabajo o entregó los insumos (ej. entregó medicamentos al hospital municipal) y presentó la factura conforme, originando la deuda exigible.',
    practicalExample: 'El camión recolector ya prestó el servicio del mes y presentó factura: el gasto está devengado y listo para liquidarse.'
  },
  pagado: {
    term: 'Gasto Pagado',
    shortDefinition: 'El dinero que ya salió efectivamente de la cuenta bancaria del municipio.',
    extendedDefinition: 'Etapa final donde la tesorería municipal transfiere los fondos al proveedor o deposita los salarios de los empleados públicos.',
    practicalExample: 'La transferencia bancaria se acreditó en la cuenta de la empresa constructora de la plaza.'
  },
  licitacion: {
    term: 'Licitación Pública',
    shortDefinition: 'Procedimiento abierto y competitivo para compras y obras de mayor monto.',
    extendedDefinition: 'Cualquier empresa idónea que cumpla con los pliegos puede presentarse. El municipio debe publicar el llamado y adjudicar a la propuesta más conveniente técnica y económicamente.',
    practicalExample: 'La repavimentación de una avenida principal se licita públicamente para que compitan varias constructoras.'
  },
  contratacionDirecta: {
    term: 'Contratación Directa',
    shortDefinition: 'Compra o contratación sin llamado a concurso competitivo masivo.',
    extendedDefinition: 'Permitida por ley solo para montos reducidos, emergencias comprobadas o cuando hay un proveedor único exclusivo. Requiere justificación fundada para asegurar la transparencia.',
    practicalExample: 'Reparación de urgencia por rotura imprevista de un generador en el hospital municipal durante una tormenta.'
  },
  indiceTransparencia: {
    term: 'Índice de Información Disponible',
    shortDefinition: 'Medición objetiva (0 a 100) sobre qué datos publica de forma abierta el municipio.',
    extendedDefinition: 'Evalúa la disponibilidad, frecuencia y formato (datos abiertos estructurados vs PDFs escaneados) de presupuestos, compras, nómina y obras. No es una evaluación política, sino técnica de acceso a la información.',
    practicalExample: 'Un municipio con 85/100 publica compras en tiempo real, decretos indexados y presupuestos en Excel descargable.'
  }
};
