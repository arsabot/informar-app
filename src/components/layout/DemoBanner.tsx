import React, { useState } from 'react';
import { AlertTriangle, Info, X, ExternalLink } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200/80 text-amber-950 text-xs px-4 py-2 flex items-center justify-between shadow-sm relative z-30">
        <div className="flex items-center gap-2 max-w-7xl mx-auto flex-1 justify-center text-center">
          <span className="inline-flex items-center justify-center bg-amber-200 text-amber-900 font-semibold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
            <AlertTriangle className="w-3 h-3 mr-1 inline" /> Prototipo Demo
          </span>
          <span className="hidden sm:inline font-medium">
            Los datos visualizados en esta plataforma son demostrativos para validación cívica y tecnológica.
          </span>
          <span className="sm:hidden font-medium">
            Plataforma en fase prototipo con datos de prueba.
          </span>
          <button
            onClick={() => setShowModal(true)}
            className="underline text-amber-900 font-semibold hover:text-amber-700 ml-1 inline-flex items-center gap-1 cursor-pointer"
          >
            Más información <Info className="w-3 h-3 inline" />
          </button>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-800/70 hover:text-amber-950 p-1 rounded-md transition-colors"
          aria-label="Cerrar aviso"
          title="Ocultar aviso de demo"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Aviso de Datos de Demostración</h3>
                  <p className="text-xs text-slate-500">Compromiso ético de transparencia</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>INFORMAR</strong> es una iniciativa <em>CivicTech</em> independiente diseñada para democratizar el acceso y la comprensión de la información pública municipal en Argentina.
              </p>
              <p>
                Para la presente versión interactiva (MVP / Demo), las cifras presupuestarias, listados de contrataciones y obras públicas utilizan modelos con <strong>magnitudes y estructuras presupuestarias realistas</strong>, pero son estrictamente de carácter demostrativo.
              </p>
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 text-xs text-sky-900">
                <p className="font-semibold mb-1 flex items-center gap-1.5 text-sky-950">
                  <ExternalLink className="w-3.5 h-3.5" /> Conexión con portales oficiales
                </p>
                La arquitectura del software está concebida para conectarse directamente mediante scrapers y APIs a los portales oficiales de datos abiertos, Boletines Oficiales y sistemas de compras públicas de cada intendencia.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Entendido, continuar explorando
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
