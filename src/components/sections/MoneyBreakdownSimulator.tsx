import React, { useState } from 'react';
import { Calculator, DollarSign, Users, Trash2, Hammer, HeartPulse, GraduationCap, ShieldCheck, HelpCircle, Sparkles, RefreshCw } from 'lucide-react';
import { Municipio, CategoriaGasto } from '../../types';
import { formatCurrency, formatNumber } from '../../data/municipios';
import { TooltipHelp } from '../common/TooltipHelp';

interface MoneyBreakdownSimulatorProps {
  municipio: Municipio;
  className?: string;
  onSelectAnotherMunicipio?: () => void;
}

export const MoneyBreakdownSimulator: React.FC<MoneyBreakdownSimulatorProps> = ({
  municipio,
  className = '',
  onSelectAnotherMunicipio
}) => {
  const [customAmount, setCustomAmount] = useState<number>(100);

  const presets = [
    { label: '$100 (Básico)', value: 100 },
    { label: '$1.000 (Referencia)', value: 1000 },
    { label: '$15.000 (Tasa ABL Barrial)', value: 15000 },
    { label: '$50.000 (Comercio Local)', value: 50000 },
  ];

  const iconMap: Record<string, any> = {
    Users: Users,
    Trash2: Trash2,
    Hammer: Hammer,
    HeartPulse: HeartPulse,
    GraduationCap: GraduationCap,
    ShieldCheck: ShieldCheck,
  };

  return (
    <div className={`glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-card ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Simulador Ciudadano
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            ¿Dónde va la plata de tu municipio?
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Descubrí cómo se distribuye cada peso recaudado en <strong>{municipio.nombre}</strong>. Ingresá el monto de tu tasa municipal o elegí una cifra de referencia.
          </p>
        </div>

        {onSelectAnotherMunicipio && (
          <button
            onClick={onSelectAnotherMunicipio}
            className="text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-4 py-2 rounded-xl transition-colors cursor-pointer self-start md:self-auto"
          >
            Cambiar municipio
          </button>
        )}
      </div>

      {/* Input & Presets Controls */}
      <div className="my-6 bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-1">
              Ingresá cualquier monto a simular ($ ARS):
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">
                $
              </span>
              <input
                type="number"
                min="10"
                max="100000000"
                value={customAmount || ''}
                onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-white font-extrabold text-xl focus:outline-none focus:border-sky-400"
                placeholder="100"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 font-semibold block">
              Atajos rápidos:
            </span>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setCustomAmount(p.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    customAmount === p.value
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Breakdown Cards Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pb-1">
          <span>De cada <strong className="text-slate-900 font-extrabold">{formatCurrency(customAmount)}</strong> que ingresan al municipio:</span>
          <span>Participación %</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {municipio.distribucionGasto.map((cat, idx) => {
            const calculatedAmount = (customAmount * (cat.porcentaje / 100));
            const IconComponent = iconMap[cat.icono] || DollarSign;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: cat.color }}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                          {cat.categoria}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {cat.porcentaje}% del presupuesto
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-slate-900">
                        ${calculatedAmount.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {cat.descripcion}
                  </p>
                </div>

                <div className="text-[11px] font-semibold text-sky-800 bg-sky-50/70 p-2 rounded-lg border border-sky-100 flex items-center gap-1.5">
                  <span>🎯 {cat.ejemploCotextual}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mandatory Disclaimer from Prompt */}
      <div className="mt-8 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="italic">
          “Los datos se presentan de forma simplificada para facilitar su comprensión.”
        </p>
        <span className="text-[11px] font-semibold text-slate-400">
          Cálculo proporcional basado en la ordenanza de presupuesto anual vigente.
        </span>
      </div>

    </div>
  );
};
