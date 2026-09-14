import { Municipality } from '../../../types/models';

export const MERLO_MUNICIPALITY: Municipality = {
  id: 'arg-bue-merlo',
  slug: 'merlo',
  name: 'Merlo',
  fullName: 'Municipio de Merlo',
  province: 'Buenos Aires',
  country: 'Argentina',
  population: 580806,
  isPilot: true,
  region: 'AMBA',
  slogan: 'La información pública de Merlo, en un solo lugar.',
  description: 'Municipio piloto de INFORMAR situado en el oeste del Gran Buenos Aires. Validamos con Merlo nuestro modelo de recopilación, normalización y visualización de información pública.',
  tags: ['Municipio Piloto', 'Primera Sección', 'Gran Buenos Aires', 'Datos Abiertos'],
  sourceIds: [
    'src-merlo-hcd-presupuesto-2025',
    'src-merlo-hcd-presupuesto-2026',
    'src-merlo-hcd-rendicion-2024',
    'src-merlo-hcd-rendicion-2025',
    'src-merlo-portal-obras',
    'src-merlo-compras'
  ]
};
