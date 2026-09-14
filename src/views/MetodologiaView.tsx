import React from 'react';
import { BookOpen, ShieldCheck, Database, Layers, ArrowDown, ArrowRight, CheckCircle2, Sparkles, Cpu } from 'lucide-react';

export const MetodologiaView: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Fuente Original Oficial',
      desc: 'Acceso a Boletines Oficiales, portales de compras públicas, ordenanzas de presupuestos y balances trimestrales de cada municipio.',
      icon: Database,
      badge: 'Extracción'
    },
    {
      num: '02',
      title: 'Extracción & Digitalización',
      desc: 'Procesamiento de documentos públicos estructurados (APIs, CSV, JSON) y no estructurados (PDFs de decretos y tablas escaneadas).',
      icon: Cpu,
      badge: 'Ingesta'
    },
    {
      num: '03',
      title: 'Normalización de Cuentas',
      desc: 'Clasificación homogénea de gastos y recursos según el clasificador presupuestario estándar para posibilitar comparaciones legítimas.',
      icon: Layers,
      badge: 'Estandarización'
    },
    {
      num: '04',
      title: 'Validación Cruzada',
      desc: 'Comprobación de sumatorias aritméticas, consistencia de CUITs de proveedores y verificación de fechas de ejecución contable.',
      icon: CheckCircle2,
      badge: 'Control de Calidad'
    },
    {
      num: '05',
      title: 'Motor INFORMAR',
      desc: 'Cálculo de métricas normalizadas (gasto por habitante, porcentajes de avance de obras y puntuación de apertura técnica).',
      icon: Sparkles,
      badge: 'Analytics'
    },
    {
      num: '06',
      title: 'Visualización Ciudadana',
      desc: 'Publicación en interfaces interactivas, tablas accesibles y descargas de datasets abiertos con trazabilidad a la fuente original.',
      icon: BookOpen,
      badge: 'Acceso Universal'
    }
  ];

  const principles = [
    {
      title: '1. Transparencia Absoluta',
      desc: 'Toda la información presentada proviene exclusivamente de fuentes oficiales públicas y verificables.'
    },
    {
      title: '2. Trazabilidad',
      desc: 'Cada dato, licitación o porcentaje cuenta con su enlace o referencia documental al acto administrativo correspondiente.'
    },
    {
      title: '3. Neutralidad Estricta',
      desc: 'INFORMAR no emite juicios de valor político ni valoraciones partidarias. Solo mide y visualiza datos objetivos.'
    },
    {
      title: '4. Datos Abiertos',
      desc: 'Compromiso con formatos libres (CSV, JSON, REST API) que permitan la libre reutilización por investigadores y prensa.'
    },
    {
      title: '5. Accesibilidad',
      desc: 'Lenguaje y diseño simple para que cualquier vecino, sin conocimientos contables previos, entienda las finanzas comunales.'
    },
    {
      title: '6. Reproducibilidad',
      desc: 'Nuestros algoritmos de normalización son documentados abiertamente para permitir auditorías externas independientes.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" /> Metodología Cívica
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          ¿Cómo procesamos la información pública?
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Descubrí el pipeline técnico y los principios éticos que garantizan la fidelidad, neutralidad y rigor de cada indicador presentado en <strong>INFORMAR</strong>.
        </p>
      </div>

      {/* ===================== PILOT MUNICIPALITY EXPLANATION ===================== */}
      <div className="bg-sky-50 rounded-3xl p-6 sm:p-8 border border-sky-200/90 text-sky-950 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-200/70 text-sky-900 text-xs font-extrabold uppercase tracking-wider">
            ⭐ Municipio Piloto
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Municipio piloto — Merlo (Buenos Aires)
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
            INFORMAR comienza con <strong>Merlo, Buenos Aires</strong>, como caso piloto. La arquitectura del sistema está diseñada para incorporar posteriormente otros municipios argentinos sin modificar la experiencia de usuario.
          </p>
        </div>

        {/* Visual Pipeline Flow */}
        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs font-bold text-slate-800">
            <div className="bg-sky-600 text-white px-4 py-2.5 rounded-xl shadow-sm w-full sm:w-auto text-center font-extrabold">
              MERLO (Piloto)
            </div>
            <ArrowRight className="w-5 h-5 text-sky-500 hidden sm:inline" />
            <ArrowDown className="w-5 h-5 text-sky-500 sm:hidden" />
            
            <div className="bg-slate-100 text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 w-full sm:w-auto text-center">
              Normalización
            </div>
            <ArrowRight className="w-5 h-5 text-sky-500 hidden sm:inline" />
            <ArrowDown className="w-5 h-5 text-sky-500 sm:hidden" />

            <div className="bg-slate-100 text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 w-full sm:w-auto text-center">
              Visualización
            </div>
            <ArrowRight className="w-5 h-5 text-sky-500 hidden sm:inline" />
            <ArrowDown className="w-5 h-5 text-sky-500 sm:hidden" />

            <div className="bg-slate-100 text-slate-800 px-4 py-2.5 rounded-xl border border-slate-200 w-full sm:w-auto text-center">
              Comparación
            </div>
            <ArrowRight className="w-5 h-5 text-sky-500 hidden sm:inline" />
            <ArrowDown className="w-5 h-5 text-sky-500 sm:hidden" />

            <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-sm w-full sm:w-auto text-center font-extrabold">
              Escalar a otros municipios
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Step by Step */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Pipeline de Procesamiento de Datos
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Del documento oficial en bruto a la visualización comprensible en tu pantalla
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-subtle space-y-3 relative group hover:shadow-card-hover transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-sky-600 font-mono">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {step.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Index Breakdown Methodology */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Medición Objetiva
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            El Índice de Información Disponible
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Nuestro índice evalúa <strong>exclusivamente la cantidad y calidad técnica de datos publicados</strong>. No evalúa si una gestión de gobierno es buena o mala, sino qué tan accesible es su información para el ciudadano.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <strong className="text-sky-300 text-sm block">1. Presupuesto & Cuentas (20%)</strong>
            <p className="text-xs text-slate-400 leading-relaxed">
              Disponibilidad de ordenanzas de cálculo de recursos y publicación periódica de balances trimestrales de ejecución.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <strong className="text-sky-300 text-sm block">2. Compras & Licitaciones (20%)</strong>
            <p className="text-xs text-slate-400 leading-relaxed">
              Publicación abierta de llamados a licitación, pliegos sin arancel, actas de apertura y decretos de adjudicación con montos.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <strong className="text-sky-300 text-sm block">3. Obras Públicas (20%)</strong>
            <p className="text-xs text-slate-400 leading-relaxed">
              Catálogo de proyectos, geolocalización, porcentajes de avance físico certificado y contratistas a cargo.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-1">
            <strong className="text-sky-300 text-sm block">4. Proveedores & Funcionarios (40%)</strong>
            <p className="text-xs text-slate-400 leading-relaxed">
              Registro público de proveedores con CUIT y organigrama con declaraciones juradas patrimoniales accesibles.
            </p>
          </div>
        </div>
      </div>

      {/* 6 Principles */}
      <div className="space-y-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Nuestros 6 Principios Rectores
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Estándares innegociables para una plataforma de transparencia cívica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((p, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="font-bold text-sm text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
