import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CategoriaGasto } from '../../types';
import { formatCurrency } from '../../data/municipios';
import { PieChart as PieIcon, Users, Trash2, Hammer, HeartPulse, GraduationCap, ShieldCheck, HelpCircle } from 'lucide-react';
import { TooltipHelp } from '../common/TooltipHelp';

interface SpendingDonutChartProps {
  data: CategoriaGasto[];
  presupuestoTotal: number;
  municipioNombre: string;
  className?: string;
}

export const SpendingDonutChart: React.FC<SpendingDonutChartProps> = ({
  data,
  presupuestoTotal,
  municipioNombre,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = data.map((item, index) => ({
    name: item.categoria,
    value: item.monto,
    porcentaje: item.porcentaje,
    color: item.color,
    descripcion: item.descripcion,
    ejemplo: item.ejemploCotextual,
    id: index
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 max-w-[240px]">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-1.5">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <strong className="text-white text-xs">{item.name}</strong>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Monto total:</span>
            <strong className="text-sky-300">{formatCurrency(item.value)}</strong>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Participación:</span>
            <strong className="text-white">{item.porcentaje}% del total</strong>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            {item.descripcion}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`glass-card rounded-2xl p-5 border border-slate-200/80 shadow-subtle ${className}`}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-sky-600" />
            Distribución del Gasto por Rubro
          </h3>
          <p className="text-xs text-slate-500">
            ¿En qué se gasta el presupuesto en {municipioNombre}?
          </p>
        </div>
        <TooltipHelp termKey="presupuesto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-4">
        
        {/* Left: Donut Visual with Center Overlay */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[260px]">
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#ffffff"
                      strokeWidth={2}
                      className="transition-all duration-200 cursor-pointer hover:opacity-90"
                      opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Presupuesto Total
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {formatCurrency(presupuestoTotal)}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5 border border-emerald-200">
              100% Distribuido
            </span>
          </div>
        </div>

        {/* Right: Categorized List with Explanations */}
        <div className="lg:col-span-7 space-y-2.5">
          {data.map((cat, idx) => {
            const isHovered = activeIndex === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                  isHovered
                    ? 'bg-sky-50/80 border-sky-200 shadow-sm scale-[1.01]'
                    : 'bg-slate-50/60 border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: cat.color }}
                    />
                    <strong className="text-xs text-slate-900 font-bold">
                      {cat.categoria}
                    </strong>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">
                      {formatCurrency(cat.monto)}
                    </span>
                    <span
                      className="text-xs font-extrabold px-2 py-0.5 rounded-md text-white shadow-2xs"
                      style={{ backgroundColor: cat.color }}
                    >
                      {cat.porcentaje}%
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-1 pl-6 line-clamp-1">
                  {cat.descripcion}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
