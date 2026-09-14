import React, { useState } from 'react';
import { Search, Building2, TrendingUp, Hammer, FileText, ArrowRight, ShieldCheck, PieChart, Sparkles, Scale, BookOpen, CheckCircle2, ChevronRight, HelpCircle, MapPin, Eye } from 'lucide-react';
import { MUNICIPIOS_DATA, formatCurrency, formatNumber } from '../data/municipios';
import { Municipio } from '../types';
import { SourceBadge } from '../components/common/SourceBadge';

interface LandingViewProps {
  onNavigate: (view: string, params?: any) => void;
  onSelectMunicipio: (id: string) => void;
  onOpenSearch: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate, onSelectMunicipio, onOpenSearch }) => {
  const [heroSearch, setHeroSearch] = useState<string>('');
  const [selectedDemoId, setSelectedDemoId] = useState<string>('merlo');

  const currentMunicipio = MUNICIPIOS_DATA.find(m => m.id === selectedDemoId) || MUNICIPIOS_DATA[0];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSearch.trim()) return;
    const match = MUNICIPIOS_DATA.find(m => 
      m.nombre.toLowerCase().includes(heroSearch.toLowerCase()) ||
      m.provincia.toLowerCase().includes(heroSearch.toLowerCase())
    );
    if (match) {
      onSelectMunicipio(match.id);
    } else {
      onNavigate('municipios');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-8 pb-4 text-center space-y-6 max-w-4xl mx-auto">
        
        {/* Simple Brand Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold shadow-2xs">
          <span>🏛️ Transparencia Pública Argentina</span>
        </div>

        {/* Main Title & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Entendé cómo se usa la plata de <br className="hidden sm:inline" />
            <span className="text-sky-600">tu municipio.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Buscá tu municipio y descubrí información pública sobre presupuesto, obras y contrataciones explicada de manera simple.
          </p>
        </div>

        {/* Big Search Input */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="text-left mb-2">
            <label className="text-xs font-bold text-slate-700 block">
              🔎 ¿Qué municipio querés consultar?
            </label>
          </div>
          <form onSubmit={handleHeroSearchSubmit} className="relative group">
            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-600 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Ej. Merlo"
              className="w-full bg-white border-2 border-slate-200 hover:border-slate-300 focus:border-sky-500 rounded-2xl pl-12 sm:pl-14 pr-32 py-4 text-sm sm:text-base font-medium shadow-card focus:outline-none focus:ring-4 focus:ring-sky-500/10 transition-all text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>Consultar</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </form>
        </div>

        {/* Pilot Spotlight Card right under search */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-850 text-white rounded-2xl p-5 sm:p-6 shadow-md text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-extrabold uppercase tracking-wider">
                ⭐ Municipio piloto
              </div>
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <span>🏛️ Merlo, Buenos Aires</span>
              </h2>
              <p className="text-xs text-slate-300">
                La información pública de Merlo, organizada y explicada en lenguaje simple.
              </p>
            </div>

            <button
              onClick={() => onSelectMunicipio('merlo')}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 hover:scale-105"
            >
              <span>Explorar Merlo →</span>
            </button>
          </div>
        </div>

      </section>

      {/* ===================== 4 SIMPLE TOPIC CARDS ===================== */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ¿Qué vas a poder consultar?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Información oficial explicada de forma clara para cualquier vecino
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Presupuesto */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-card transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center text-xl font-bold">
                💰
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Presupuesto municipal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Descubrí cuánta plata tiene asignada tu municipio y qué parte del presupuesto ya se utilizó.
              </p>
            </div>
            <button 
              onClick={() => onSelectMunicipio('merlo')}
              className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 pt-2 cursor-pointer"
            >
              <span>Ver cómo se distribuye →</span>
            </button>
          </div>

          {/* Card 2: Obras */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-card transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold">
                🏗️
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Obras públicas</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conocé qué calles se están pavimentando, desagües pluviales, escuelas y hospitales en marcha.
              </p>
            </div>
            <button 
              onClick={() => onSelectMunicipio('merlo')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 pt-2 cursor-pointer"
            >
              <span>Ver obras informadas →</span>
            </button>
          </div>

          {/* Card 3: Gastos y Contrataciones */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-card transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold">
                🧾
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Gastos y compras</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mirá en qué rubros y servicios se contratan proveedores para el mantenimiento de la ciudad.
              </p>
            </div>
            <button 
              onClick={() => onSelectMunicipio('merlo')}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 pt-2 cursor-pointer"
            >
              <span>Ver gastos y contratos →</span>
            </button>
          </div>

          {/* Card 4: Fuentes Oficiales */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-card transition-all space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl font-bold">
                📄
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Fuentes oficiales</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada número tiene un botón directo para consultar la ordenanza o documento público original.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('metodologia')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 pt-2 cursor-pointer"
            >
              <span>Ver cómo verificamos →</span>
            </button>
          </div>

        </div>
      </section>

      {/* ===================== HOW IT WORKS (3 SIMPLE STEPS) ===================== */}
      <section className="bg-slate-100/70 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Simple y directo</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ¿Cómo funciona INFORMAR?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Diseñado para que cualquier persona pueda entenderlo en 5 segundos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-2">
            <div className="text-2xl font-black text-sky-600 mb-1">1️⃣</div>
            <h3 className="font-bold text-slate-900 text-base">Buscá tu municipio</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Escribí el nombre de tu ciudad y entrá directamente sin registrarte ni hacer trámites.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-2">
            <div className="text-2xl font-black text-sky-600 mb-1">2️⃣</div>
            <h3 className="font-bold text-slate-900 text-base">Entendé en qué se gasta</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mirá las cuentas explicadas como: <em>"De cada $100, $44 van a sueldos y $16 a obras"</em>.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-2">
            <div className="text-2xl font-black text-sky-600 mb-1">3️⃣</div>
            <h3 className="font-bold text-slate-900 text-base">Verificá la fuente original</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hacé clic en <strong>“Ver fuente”</strong> para comprobar el documento público que respalda el dato.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== QUICK EXPLORE CTA ===================== */}
      <section className="text-center py-6 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          ¿Querés comparar diferentes municipios?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Compará indicadores por habitante entre municipios argentinos de manera neutral y objetiva.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('comparar')}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Scale className="w-4 h-4 text-sky-400" />
            <span>Abrir comparador de municipios</span>
          </button>
          <button
            onClick={() => onNavigate('municipios')}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Ver directorio de municipios</span>
          </button>
        </div>
      </section>

    </div>
  );
};
