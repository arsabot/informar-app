import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { EvolucionPresupuestaria } from '../../types';
import { formatCurrency } from '../../data/municipios';
import { TrendingUp, Info } from 'lucide-react';
import { TooltipHelp } from '../common/TooltipHelp';

interface BudgetEvolutionChartProps {
  data: EvolucionPresupuestaria[];
  municipioNombre: string;
  className?: string;
}

export const BudgetEvolutionChart: React.FC<BudgetEvolutionChartProps> = ({ data, municipioNombre, className = '' }) => {
  const chartData = data.map(item => ({
    anio: item.anio.toString(),
    Aprobado: item.aprobado,
    Ejecutado: item.ejecutado,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const aprobado = payload.find((p: any) => p.dataKey === 'Aprobado')?.value || 0;
      const ejecutado = payload.find((p: any) => p.dataKey === 'Ejecutado')?.value || 0;
      const porcentaje = aprobado > 0 ? ((ejecutado / aprobado) * 100).toFixed(1) : '0';

      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 min-w-[200px]">
          <p className="font-bold text-sky-400 border-b border-slate-800 pb-1">
            Ejercicio Presupuestario {label}
          </p>
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span> Presupuesto Aprobado:
            </span>
            <strong className="text-white">{formatCurrency(aprobado)}</strong>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Gasto Ejecutado:
            </span>
            <strong className="text-emerald-300">{formatCurrency(ejecutado)}</strong>
          </div>
          <div className="pt-1 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
            <span>Ejecución del ejercicio:</span>
            <span className="font-semibold text-sky-300">{porcentaje}%</span>
          </div>
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
            <TrendingUp className="w-5 h-5 text-sky-600" />
            Evolución Presupuestaria (2022 — 2026)
          </h3>
          <p className="text-xs text-slate-500">
            Comparativa histórica entre presupuesto proyectado y gasto ejecutado en {municipioNombre}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TooltipHelp termKey="ejecucion" />
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            Valores Corrientes (ARS)
          </span>
        </div>
      </div>

      <div className="h-72 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="anio"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              width={75}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 12, fontSize: 12 }}
            />
            <Bar
              dataKey="Aprobado"
              fill="#0ea5e9"
              radius={[6, 6, 0, 0]}
              name="Presupuesto Aprobado"
            />
            <Bar
              dataKey="Ejecutado"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              name="Gasto Ejecutado"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100/80 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <span>💡 El presupuesto 2026 refleja la ejecución acumulada al último trimestre informado.</span>
        <span className="font-semibold text-slate-700">Fuente: Ordenanzas Anuales del Concejo Deliberante</span>
      </div>

    </div>
  );
};
