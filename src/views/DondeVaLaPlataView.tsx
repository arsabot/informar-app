import React, { useState } from 'react';
import { PieChart as PieIcon, Sparkles, Building2, ChevronDown } from 'lucide-react';
import { MUNICIPIOS_DATA } from '../data/municipios';
import { MoneyBreakdownSimulator } from '../components/sections/MoneyBreakdownSimulator';
import { SpendingDonutChart } from '../components/charts/SpendingDonutChart';

export const DondeVaLaPlataView: React.FC = () => {
  const [selectedMunicipioId, setSelectedMunicipioId] = useState<string>('la-plata');

  const selectedMunicipio = MUNICIPIOS_DATA.find(m => m.id === selectedMunicipioId) || MUNICIPIOS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Educación Cívica & Fiscal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ¿Dónde va la plata de tu municipio?
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Simulador interactivo diseñado para entender fácilmente el destino de cada $100 pesos de tasas e impuestos municipales.
          </p>
        </div>

        {/* City Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-500 whitespace-nowrap">
            Municipio activo:
          </label>
          <div className="relative">
            <select
              value={selectedMunicipioId}
              onChange={(e) => setSelectedMunicipioId(e.target.value)}
              className="bg-white border-2 border-slate-200 hover:border-sky-500 rounded-xl px-4 py-2 text-xs font-extrabold text-slate-900 focus:outline-none focus:border-sky-500 cursor-pointer shadow-2xs"
            >
              {MUNICIPIOS_DATA.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre} ({m.provincia})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Interactive Simulator */}
      <MoneyBreakdownSimulator municipio={selectedMunicipio} />

      {/* Spending Donut Detail */}
      <div className="pt-4">
        <SpendingDonutChart
          data={selectedMunicipio.distribucionGasto}
          presupuestoTotal={selectedMunicipio.presupuestoTotal}
          municipioNombre={selectedMunicipio.nombre}
        />
      </div>

      {/* Educational Explanation Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 space-y-4">
        <h3 className="text-xl font-bold text-sky-400">
          ¿Cómo se financian los municipios en Argentina?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <strong className="text-white block mb-1 text-sm">1. Tasas Propias (ABL / Comercio)</strong>
            Cobros directos por contraprestación de servicios: alumbrado, barrido, limpieza, habilitaciones e inspecciones.
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <strong className="text-white block mb-1 text-sm">2. Coparticipación Provincial</strong>
            Fondos que la provincia recauda (Ingresos Brutos, Inmobiliario, Automotor) y gira a los municipios según fórmulas legales.
          </div>
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
            <strong className="text-white block mb-1 text-sm">3. Fondos Específicos & Obras</strong>
            Aportes para infraestructura vial o hidráulica, fondos turísticos o regalías hidrocarburíferas.
          </div>
        </div>
      </div>

    </div>
  );
};
