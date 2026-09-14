import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Municipio } from '../../types';
import { formatCurrency, formatNumber } from '../../data/municipios';
import { Scale } from 'lucide-react';

interface ComparativeChartProps {
  municipios: Municipio[];
  metric: 'perCapita' | 'obrasPct' | 'ejecucionPct' | 'scoreTransparencia';
  className?: string;
}

export const ComparativeChart: React.FC<ComparativeChartProps> = ({ municipios, metric, className = '' }) => {
  const getMetricConfig = () => {
    switch (metric) {
      case 'perCapita':
        return {
          title: 'Presupuesto por Habitante (ARS)',
          subtitle: 'Gasto presupuestario normalizado por cada habitante de la ciudad',
          dataKey: 'valor',
          formatter: (v: number) => `$${formatNumber(v)} / hab.`,
          yAxisFormatter: (v: number) => `$${(v / 1000).toFixed(0)}k`,
          color: '#0ea5e9'
        };
      case 'obrasPct':
        return {
          title: 'Porcentaje Destinado a Obras Públicas (%)',
          subtitle: 'Proporción del presupuesto volcada directamente a infraestructura física y vial',
          dataKey: 'valor',
          formatter: (v: number) => `${v}% del total`,
          yAxisFormatter: (v: number) => `${v}%`,
          color: '#3b82f6'
        };
      case 'ejecucionPct':
        return {
          title: 'Ritmo de Ejecución Presupuestaria (%)',
          subtitle: 'Porcentaje del presupuesto anual pagado o devengado al último corte',
          dataKey: 'valor',
          formatter: (v: number) => `${v}% ejecutado`,
          yAxisFormatter: (v: number) => `${v}%`,
          color: '#10b981'
        };
      case 'scoreTransparencia':
        return {
          title: 'Índice de Información Disponible (0-100)',
          subtitle: 'Puntaje técnico objetivo de apertura de datos de compras, presupuestos y obras',
          dataKey: 'valor',
          formatter: (v: number) => `${v} / 100 pts`,
          yAxisFormatter: (v: number) => `${v}`,
          color: '#8b5cf6'
        };
    }
  };

  const config = getMetricConfig();

  const chartData = municipios.map(m => {
    let valor = 0;
    if (metric === 'perCapita') valor = m.presupuestoPorHabitante;
    if (metric === 'obrasPct') {
      const obrasCat = m.distribucionGasto.find(g => g.categoria.includes('Obras') || g.categoria.includes('Vialidad'));
      valor = obrasCat ? obrasCat.porcentaje : 15;
    }
    if (metric === 'ejecucionPct') valor = m.ejecucionPorcentaje;
    if (metric === 'scoreTransparencia') valor = m.scoreTransparencia.total;

    return {
      name: m.nombre,
      provincia: m.provincia,
      valor: valor,
    };
  });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
          <p className="font-bold text-sky-400">{data.name} ({data.provincia})</p>
          <p className="text-slate-200">
            {config.title}: <strong className="text-white">{config.formatter(data.valor)}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`glass-card rounded-2xl p-5 border border-slate-200/80 shadow-subtle ${className}`}>
      <div className="pb-3 border-b border-slate-100">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Scale className="w-4 h-4 text-sky-600" />
          {config.title}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          {config.subtitle}
        </p>
      </div>

      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={config.yAxisFormatter}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              width={65}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="valor"
              fill={config.color}
              radius={[6, 6, 0, 0]}
              name={config.title}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
