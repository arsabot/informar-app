import React, { useState, useEffect, useRef } from 'react';
import { Search, Building2, Hammer, FileText, ArrowRight, X, Sparkles } from 'lucide-react';
import { MUNICIPIOS_DATA, formatCurrency } from '../../data/municipios';
import { Municipio } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMunicipio: (id: string, tab?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectMunicipio }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via external state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results
  const matchedMunicipios = MUNICIPIOS_DATA.filter(m => {
    const combined = `${m.nombre} ${m.provincia} ${m.pais || 'Argentina'} ${m.id} ${m.region}`.toLowerCase();
    const isMerloMatch = (normalizedQuery.includes('merlo') || normalizedQuery.includes('arg-bue-merlo')) && (m.id === 'merlo' || m.id === 'arg-bue-merlo');
    return isMerloMatch || combined.includes(normalizedQuery);
  });

  const matchedObras: Array<{ obra: any; municipio: Municipio }> = [];
  const matchedContrataciones: Array<{ contratacion: any; municipio: Municipio }> = [];

  if (normalizedQuery.length >= 2) {
    MUNICIPIOS_DATA.forEach(m => {
      m.obras.forEach(o => {
        if (o.nombre.toLowerCase().includes(normalizedQuery) || o.categoria.toLowerCase().includes(normalizedQuery) || o.contratista.toLowerCase().includes(normalizedQuery)) {
          matchedObras.push({ obra: o, municipio: m });
        }
      });
      m.contrataciones.forEach(c => {
        if (c.descripcion.toLowerCase().includes(normalizedQuery) || c.proveedor.toLowerCase().includes(normalizedQuery) || c.tipo.toLowerCase().includes(normalizedQuery)) {
          matchedContrataciones.push({ contratacion: c, municipio: m });
        }
      });
    });
  }

  const hasResults = matchedMunicipios.length > 0 || matchedObras.length > 0 || matchedContrataciones.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/70">
          <Search className="w-5 h-5 text-sky-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscá por municipio, provincia, obra o licitación..."
            className="w-full bg-transparent border-none text-slate-800 placeholder-slate-400 focus:outline-none text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline bg-white border border-slate-200 text-slate-400 text-[10px] px-2 py-1 rounded shadow-xs font-mono font-bold">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-3 divide-y divide-slate-100 space-y-4">
          
          {/* Municipios Section */}
          {matchedMunicipios.length > 0 && (
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                Municipios ({matchedMunicipios.length})
              </span>
              <div className="space-y-1">
                {matchedMunicipios.map((m) => {
                  const isMerlo = m.id === 'merlo';
                  return (
                    <button
                      key={m.id}
                      onClick={() => {
                        onSelectMunicipio(m.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-sky-50/70 text-left transition-colors group cursor-pointer border ${
                        isMerlo ? 'border-sky-200 bg-sky-50/30' : 'border-transparent hover:border-sky-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                          isMerlo ? 'bg-sky-500 text-white' : 'bg-sky-100/70 text-sky-700'
                        }`}>
                          {isMerlo ? '🏛️' : <Building2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-sky-900 flex items-center gap-2">
                            <span>{m.nombre}</span>
                            {isMerlo && (
                              <span className="text-[10px] font-extrabold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded border border-sky-200">
                                ⭐ Piloto
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-medium">{m.provincia} · {m.pais || 'Argentina'}</span>
                            <span>•</span>
                            <span>{m.poblacion.toLocaleString('es-AR')} hab.</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 group-hover:bg-sky-200/60 group-hover:text-sky-900">
                          {m.scoreTransparencia.total}/100
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Obras Públicas Section */}
          {matchedObras.length > 0 && (
            <div className="space-y-1 pt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                Obras Públicas ({matchedObras.length})
              </span>
              <div className="space-y-1">
                {matchedObras.slice(0, 4).map(({ obra, municipio }) => (
                  <button
                    key={obra.id}
                    onClick={() => {
                      onSelectMunicipio(municipio.id, 'obras');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Hammer className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-xs text-slate-900 group-hover:text-sky-700 line-clamp-1">
                          {obra.nombre}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {municipio.nombre} • Avance {obra.avance}% • {formatCurrency(obra.presupuesto)}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {obra.estado}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contrataciones Section */}
          {matchedContrataciones.length > 0 && (
            <div className="space-y-1 pt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                Contrataciones y Licitaciones ({matchedContrataciones.length})
              </span>
              <div className="space-y-1">
                {matchedContrataciones.slice(0, 4).map(({ contratacion, municipio }) => (
                  <button
                    key={contratacion.id}
                    onClick={() => {
                      onSelectMunicipio(municipio.id, 'contrataciones');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-xs text-slate-900 group-hover:text-sky-700 line-clamp-1">
                          {contratacion.descripcion}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {municipio.nombre} • {contratacion.proveedor} • {formatCurrency(contratacion.monto)}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      {contratacion.tipo}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!hasResults && query && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">No encontramos resultados para “{query}”</p>
              <p className="text-xs text-slate-400 mt-1">
                Probá buscando por provincias como “Córdoba”, “Buenos Aires” o términos como “Hospital”, “LED” o “Asfalto”.
              </p>
            </div>
          )}

          {/* Initial Suggestion helper when no query typed */}
          {!query && (
            <div className="p-3 text-xs text-slate-500 space-y-2">
              <div className="flex items-center gap-1.5 text-sky-600 font-semibold mb-2">
                <Sparkles className="w-4 h-4" /> Búsquedas frecuentes recomendadas:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Merlo', 'La Plata', 'Córdoba', 'Rosario', 'Mendoza', 'Neuquén', 'Vicente López', 'Morón'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setQuery(city)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      city === 'Merlo'
                        ? 'bg-sky-100 text-sky-900 border border-sky-300 font-bold'
                        : 'bg-slate-100 hover:bg-sky-100 hover:text-sky-800 text-slate-700'
                    }`}
                  >
                    {city === 'Merlo' ? '⭐ Merlo' : city}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer shortcuts helper */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Seleccioná un municipio para ver su presupuesto completo</span>
          <span className="hidden sm:inline">INFORMAR • Datos Públicos</span>
        </div>

      </div>
    </div>
  );
};
