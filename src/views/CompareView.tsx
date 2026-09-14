import React, { useState } from 'react';
import { Scale, Plus, X, Building2, TrendingUp, Users, Hammer, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { MUNICIPIOS_DATA, formatCurrency, formatNumber } from '../data/municipios';
import { Municipio } from '../types';
import { ComparativeChart } from '../components/charts/ComparativeChart';

interface CompareViewProps {
  initialIds?: string[];
  onSelectMunicipio: (id: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({
  initialIds = ['merlo', 'moron', 'la-plata'],
  onSelectMunicipio
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialIds.length >= 2 ? initialIds : ['merlo', 'moron', 'la-plata']
  );
  const [activeChartMetric, setActiveChartMetric] = useState<'perCapita' | 'obrasPct' | 'ejecucionPct' | 'scoreTransparencia'>('perCapita');

  const selectedMunicipios = selectedIds
    .map(id => MUNICIPIOS_DATA.find(m => m.id === id))
    .filter(Boolean) as Municipio[];

  const handleAddMunicipio = (id: string) => {
    if (!selectedIds.includes(id) && selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveMunicipio = (id: string) => {
    if (selectedIds.length > 2) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      alert('Se requieren al menos 2 municipios para poder comparar.');
    }
  };

  const availableToAdd = MUNICIPIOS_DATA.filter(m => !selectedIds.includes(m.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Scale className="w-3.5 h-3.5" /> Herramienta de Análisis
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Compará Municipios Argentinos
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Comparativa objetiva basada en <strong>indicadores normalizados por habitante</strong> para contrastar realidades presupuestarias sin sesgo por tamaño geográfico.
        </p>
      </div>

      {/* Municipality Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {selectedMunicipios.map((m, idx) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl p-4 border-2 border-sky-100 shadow-sm flex items-center justify-between gap-3 relative group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                {idx + 1}
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-700 block uppercase">
                  {m.provincia}
                </span>
                <h3 className="font-bold text-base text-slate-900 leading-tight">
                  {m.nombre}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onSelectMunicipio(m.id)}
                className="text-xs text-sky-600 hover:text-sky-800 font-semibold p-1 hover:bg-sky-50 rounded-lg"
                title="Ver dashboard completo"
              >
                Ver
              </button>
              {selectedIds.length > 2 && (
                <button
                  onClick={() => handleRemoveMunicipio(m.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 hover:bg-rose-50 rounded-lg"
                  title="Quitar de comparación"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {selectedIds.length < 3 && (
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex items-center justify-center">
            <select
              onChange={(e) => {
                if (e.target.value) handleAddMunicipio(e.target.value);
                e.target.value = '';
              }}
              className="bg-transparent text-xs font-bold text-sky-700 focus:outline-none cursor-pointer"
            >
              <option value="">+ Agregar 3er municipio...</option>
              {availableToAdd.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.provincia})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Comparative Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Matriz de Indicadores Comparativa</h3>
            <p className="text-xs text-slate-400">Valores del ejercicio vigente (Demo 2026)</p>
          </div>
          <span className="text-xs font-semibold bg-slate-800 px-3 py-1 rounded-full text-sky-400 border border-slate-700">
            {selectedMunicipios.length} Ciudades Comparadas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-5 min-w-[200px]">Indicador</th>
                {selectedMunicipios.map((m) => (
                  <th key={m.id} className="py-3.5 px-5 text-right font-extrabold text-slate-900 min-w-[160px]">
                    {m.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* Presupuesto Total */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-slate-800">
                  Presupuesto Total Anual
                </td>
                {selectedMunicipios.map((m) => (
                  <td key={m.id} className="py-3.5 px-5 text-right font-bold text-slate-900 text-sm">
                    {formatCurrency(m.presupuestoTotal)}
                  </td>
                ))}
              </tr>

              {/* Presupuesto por habitante */}
              <tr className="bg-sky-50/40 hover:bg-sky-50/70 transition-colors">
                <td className="py-3.5 px-5 font-bold text-sky-950">
                  💰 Presupuesto por Habitante (Per Cápita)
                </td>
                {selectedMunicipios.map((m) => (
                  <td key={m.id} className="py-3.5 px-5 text-right font-black text-sky-700 text-sm">
                    ${formatNumber(m.presupuestoPorHabitante)}
                  </td>
                ))}
              </tr>

              {/* Poblacion */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-medium text-slate-600">
                  Población Estimada
                </td>
                {selectedMunicipios.map((m) => (
                  <td key={m.id} className="py-3.5 px-5 text-right font-semibold text-slate-800">
                    {formatNumber(m.poblacion)} hab.
                  </td>
                ))}
              </tr>

              {/* % Gasto en Obras */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-slate-800">
                  % Inversión en Obras e Infraestructura
                </td>
                {selectedMunicipios.map((m) => {
                  const obrasCat = m.distribucionGasto?.find(g => g.categoria.includes('Obras') || g.categoria.includes('Vialidad'));
                  return (
                    <td key={m.id} className="py-3.5 px-5 text-right font-bold text-slate-900">
                      {obrasCat ? (
                        `${obrasCat.porcentaje}%`
                      ) : (
                        <span className="text-slate-400 font-normal italic" title="No hay información disponible en el dataset actual">
                          N/D
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* % Gasto en Personal */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-slate-800">
                  % Gasto en Salarios y Personal
                </td>
                {selectedMunicipios.map((m) => {
                  const persCat = m.distribucionGasto?.find(g => g.categoria.includes('Personal'));
                  return (
                    <td key={m.id} className="py-3.5 px-5 text-right font-bold text-slate-900">
                      {persCat ? (
                        `${persCat.porcentaje}%`
                      ) : (
                        <span className="text-slate-400 font-normal italic" title="No hay información disponible en el dataset actual">
                          N/D
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* % Ejecución */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-slate-800">
                  Ritmo de Ejecución del Presupuesto
                </td>
                {selectedMunicipios.map((m) => (
                  <td key={m.id} className="py-3.5 px-5 text-right font-bold text-emerald-600">
                    {m.ejecucionPorcentaje}%
                  </td>
                ))}
              </tr>

              {/* Obras Públicas */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-slate-800">
                  Proyectos de Obras Públicas
                </td>
                {selectedMunicipios.map((m) => (
                  <td key={m.id} className="py-3.5 px-5 text-right font-semibold text-slate-800">
                    {m.cantidadObras} registradas
                  </td>
                ))}
              </tr>

              {/* Contrataciones */}
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3.5 px-5 font-semibold text-slate-800">
                  Contrataciones y Licitaciones
                </td>
                {selectedMunicipios.map((m) => (
                  <td key={m.id} className="py-3.5 px-5 text-right font-semibold text-slate-800">
                    {formatNumber(m.cantidadContrataciones)} procesos
                  </td>
                ))}
              </tr>

              {/* Score de Apertura */}
              <tr className="bg-slate-50/80 hover:bg-slate-100 transition-colors">
                <td className="py-3.5 px-5 font-bold text-slate-900">
                  🛡️ Índice de Información Disponible (Score)
                </td>
                {selectedMunicipios.map((m) => (
                  <td key={m.id} className="py-3.5 px-5 text-right font-black text-indigo-700 text-sm">
                    {m.scoreTransparencia.total} / 100
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Chart Comparison */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Visualización Comparativa
          </h3>

          {/* Metric switcher buttons */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'perCapita', label: 'Presupuesto por Habitante' },
              { id: 'obrasPct', label: '% Gasto en Obras' },
              { id: 'ejecucionPct', label: '% Ejecución' },
              { id: 'scoreTransparencia', label: 'Score Apertura' },
            ].map((metric) => (
              <button
                key={metric.id}
                onClick={() => setActiveChartMetric(metric.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeChartMetric === metric.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {metric.label}
              </button>
            ))}
          </div>
        </div>

        <ComparativeChart
          municipios={selectedMunicipios}
          metric={activeChartMetric}
        />
      </div>

    </div>
  );
};
