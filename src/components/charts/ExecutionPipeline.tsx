import React from 'react';
import { CheckCircle2, ArrowRight, Layers, HelpCircle, DollarSign, Clock, FileCheck2, CreditCard } from 'lucide-react';
import { EjecucionEtapas } from '../../types';
import { formatCurrency } from '../../data/municipios';
import { TooltipHelp } from '../common/TooltipHelp';

interface ExecutionPipelineProps {
  etapas: EjecucionEtapas;
  className?: string;
}

export const ExecutionPipeline: React.FC<ExecutionPipelineProps> = ({ etapas, className = '' }) => {
  const { aprobado, comprometido, devengado, pagado } = etapas;

  const pctComprometido = ((comprometido / aprobado) * 100).toFixed(0);
  const pctDevengado = ((devengado / aprobado) * 100).toFixed(0);
  const pctPagado = ((pagado / aprobado) * 100).toFixed(0);

  const steps = [
    {
      id: 'aprobado',
      name: '1. Aprobado',
      badge: '100%',
      amount: aprobado,
      color: 'bg-slate-800 text-white',
      barColor: 'bg-slate-800',
      icon: DollarSign,
      termKey: 'presupuesto',
      desc: 'Monto total autorizado por el Concejo Deliberante para todo el año fiscal.'
    },
    {
      id: 'comprometido',
      name: '2. Comprometido',
      badge: `${pctComprometido}%`,
      amount: comprometido,
      color: 'bg-sky-600 text-white',
      barColor: 'bg-sky-500',
      icon: FileCheck2,
      termKey: 'comprometido',
      desc: 'Dinero reservado contractualmente con contratos firmados u órdenes de compra.'
    },
    {
      id: 'devengado',
      name: '3. Devengado',
      badge: `${pctDevengado}%`,
      amount: devengado,
      color: 'bg-indigo-600 text-white',
      barColor: 'bg-indigo-500',
      icon: Clock,
      termKey: 'devengado',
      desc: 'Bienes o servicios efectivamente entregados con facturación conformada.'
    },
    {
      id: 'pagado',
      name: '4. Pagado',
      badge: `${pctPagado}%`,
      amount: pagado,
      color: 'bg-emerald-600 text-white',
      barColor: 'bg-emerald-500',
      icon: CreditCard,
      termKey: 'pagado',
      desc: 'Dinero transferido efectivamente a las cuentas de empleados y proveedores.'
    }
  ];

  return (
    <div className={`glass-card rounded-2xl p-5 border border-slate-200/80 shadow-subtle ${className}`}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600" />
            Etapas de Ejecución del Presupuesto
          </h3>
          <p className="text-xs text-slate-500">
            Seguimiento del ciclo administrativo del dinero público municipal
          </p>
        </div>

        <div className="flex items-center gap-2">
          <TooltipHelp termKey="ejecucion" />
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {pctPagado}% Pagado Efectivo
          </span>
        </div>
      </div>

      {/* Visual Pipeline Steps Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 space-y-3 relative hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${step.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900">{step.name}</span>
                </div>
                <TooltipHelp termKey={step.termKey} />
              </div>

              <div>
                <div className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {formatCurrency(step.amount)}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>Del presupuesto total:</span>
                  <span className="font-bold text-slate-800">{step.badge}</span>
                </div>
              </div>

              {/* Progress visual */}
              <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${step.barColor}`}
                  style={{ width: `${(step.amount / aprobado) * 100}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-snug border-t border-slate-200/60 pt-2">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pipeline Explanation note */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
        <span className="font-bold text-slate-700">📌 Flujo contable:</span>
        <span>Aprobación inicial → Firma de contratos (Compromiso) → Entrega del servicio (Devengado) → Transferencia bancaria (Pago).</span>
      </div>

    </div>
  );
};
