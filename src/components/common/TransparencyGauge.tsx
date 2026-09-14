import React, { useState } from 'react';
import { ShieldCheck, Info, HelpCircle, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { ScoreTransparencia } from '../../types';

interface TransparencyGaugeProps {
  score: ScoreTransparencia;
  className?: string;
  showBreakdown?: boolean;
}

export const TransparencyGauge: React.FC<TransparencyGaugeProps> = ({ score, className = '', showBreakdown = true }) => {
  const [showModal, setShowModal] = useState(false);

  const getScoreColor = (value: number) => {
    if (value >= 90) return { bg: 'bg-emerald-500', text: 'text-emerald-700', light: 'bg-emerald-50', border: 'border-emerald-200' };
    if (value >= 80) return { bg: 'bg-sky-500', text: 'text-sky-700', light: 'bg-sky-50', border: 'border-sky-200' };
    if (value >= 70) return { bg: 'bg-amber-500', text: 'text-amber-700', light: 'bg-amber-50', border: 'border-amber-200' };
    return { bg: 'bg-rose-500', text: 'text-rose-700', light: 'bg-rose-50', border: 'border-rose-200' };
  };

  const mainColor = getScoreColor(score.total);

  const criteria = [
    { label: 'Presupuesto y Ordenanzas', score: score.presupuesto, desc: 'Publicación de cálculo de recursos, gastos y ejecuciones trimestrales' },
    { label: 'Contrataciones y Licitaciones', score: score.contrataciones, desc: 'Pliegos, montos, actas de apertura y decretos de adjudicación' },
    { label: 'Obras Públicas', score: score.obras, desc: 'Catálogo de obras, avances físicos y contratistas asignados' },
    { label: 'Padrón de Proveedores', score: score.proveedores, desc: 'Registro de empresas contratadas con CUIT y rubro' },
    { label: 'Funcionarios y Nómina', score: score.sueldosYFuncionarios, desc: 'Organigrama y declaraciones juradas patrimoniales' },
  ];

  return (
    <>
      <div className={`glass-card rounded-2xl p-5 border border-slate-200/80 shadow-subtle ${className}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${mainColor.light} ${mainColor.text}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                Índice de Información Disponible
              </h4>
              <p className="text-[11px] text-slate-500">
                Nivel de apertura y datos públicos publicados
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="text-xs text-sky-600 hover:text-sky-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            Metodología <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Big Score Visual */}
        <div className="my-4 flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-extrabold text-2xl text-white shadow-md ${mainColor.bg}`}>
            <span>{score.total}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider -mt-1 opacity-80">/ 100</span>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">
                {score.total >= 90 ? 'Apertura Muy Alta' : score.total >= 80 ? 'Apertura Alta' : score.total >= 70 ? 'Apertura Media' : 'Apertura Básica'}
              </span>
              <span className="text-slate-500">{score.total}% de criterios cumplidos</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${mainColor.bg}`}
                style={{ width: `${score.total}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 pt-0.5">
              {score.metodologiaResumen}
            </p>
          </div>
        </div>

        {/* Sub-criteria progress bars */}
        {showBreakdown && (
          <div className="space-y-2 pt-3 border-t border-slate-100">
            {criteria.map((item, idx) => {
              const cColor = getScoreColor(item.score);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">{item.label}</span>
                    <span className="font-bold text-slate-800">{item.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${cColor.bg}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Disclaimer box */}
        <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-snug">
          <strong className="text-slate-700 font-semibold block mb-0.5">Nota metodológica:</strong>
          Este índice mide estrictamente la <em>disponibilidad técnica de datos</em>, no constituye un juicio de valor político ni administrativo sobre la gestión.
        </div>

      </div>

      {/* Methodology Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Metodología del Índice de Apertura</h4>
                  <p className="text-xs text-slate-500">Criterios de evaluación objetivos</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-3.5 text-sky-950 font-medium">
                “El Índice de Información Disponible evalúa qué cantidad, periodicidad y calidad de datos públicos encontramos publicados en los canales oficiales del municipio.”
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900 text-sm">Dimensiones evaluadas:</h5>
                {criteria.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">{c.label} (20%)</strong>
                      <span className="text-slate-500">{c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-3">
                <h5 className="font-bold text-slate-900 mb-1">Criterio de Formato:</h5>
                <p className="text-slate-500">
                  Se asigna mayor puntaje a datos en formatos abiertos (CSV, JSON, APIs) respecto a documentos escaneados en PDF no indexables.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
