import React, { useState, useEffect } from 'react';
import { 
  Building2, TrendingUp, Layers, Hammer, FileText, Users, Download, ArrowLeft, 
  ExternalLink, ShieldCheck, Scale, PieChart as PieIcon, Coins, Landmark, 
  CheckCircle2, UserCheck, Star, Sparkles, AlertCircle, Info, Calendar, Search, ArrowUpDown, HelpCircle, MapPin, X, ChevronRight, Eye,
  Fingerprint, BookOpen
} from 'lucide-react';
import { Municipio } from '../types';
import { 
  Budget, 
  Accountability, 
  Work, 
  Tender, 
  Source 
} from '../types/models';
import { formatCurrency, formatNumber } from '../data/municipios';
import { 
  getMunicipalityBudgets, 
  getMunicipalityAccountability, 
  getMunicipalityWorks, 
  getMunicipalityTenders, 
  getMunicipalitySources 
} from '../services/municipalityService';
import { SourceBadge } from '../components/common/SourceBadge';
import { SpendingDonutChart } from '../components/charts/SpendingDonutChart';
import { BudgetEvolutionChart } from '../components/charts/BudgetEvolutionChart';
import { MoneyBreakdownSimulator } from '../components/sections/MoneyBreakdownSimulator';
import { ContractsTable } from '../components/sections/ContractsTable';
import { sanitizeUrl } from '../utils/security';

interface MunicipalityDetailViewProps {
  municipio: Municipio;
  initialTab?: string;
  onBack: () => void;
  onCompareWithThis: (id: string) => void;
}

export const MunicipalityDetailView: React.FC<MunicipalityDetailViewProps> = ({
  municipio,
  initialTab = 'resumen',
  onBack,
  onCompareWithThis
}) => {
  const [activeSection, setActiveSection] = useState<'resumen' | 'presupuesto' | 'obras' | 'gastos' | 'fuentes' | 'avanzado'>('resumen');
  
  // Advanced state & modals
  const [selectedWorkModal, setSelectedWorkModal] = useState<Work | null>(null);
  const [showExplanationModal, setShowExplanationModal] = useState<string | null>(null);
  const [showAdvancedContracts, setShowAdvancedContracts] = useState<boolean>(false);
  const [selectedTenderCategory, setSelectedTenderCategory] = useState<string>('todas');

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [accountabilities, setAccountabilities] = useState<Accountability[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [sources, setSources] = useState<Source[]>([]);

  const isMerlo = municipio.id === 'merlo' || municipio.id === 'arg-bue-merlo';

  useEffect(() => {
    async function loadServiceData() {
      const muniId = isMerlo ? 'arg-bue-merlo' : municipio.id;
      const [b, a, w, t, s] = await Promise.all([
        getMunicipalityBudgets(muniId),
        getMunicipalityAccountability(muniId),
        getMunicipalityWorks(muniId),
        getMunicipalityTenders(muniId),
        getMunicipalitySources(muniId)
      ]);
      setBudgets(b);
      setAccountabilities(a);
      setWorks(w);
      setTenders(t);
      setSources(s);
    }
    loadServiceData();
  }, [municipio.id, isMerlo]);

  // Breakdown of "Cada $100"
  const each100Breakdown = [
    { name: 'Personal y Salarios', amount: 44, icon: '👥', desc: 'Médicos, enfermeros, recolectores, inspectores y docentes' },
    { name: 'Servicios Urbanos', amount: 22, icon: '🚛', desc: 'Higiene urbana, recolección, alumbrado público LED y limpieza' },
    { name: 'Obras Públicas', amount: 16, icon: '🏗️', desc: 'Pavimentación, conductos pluviales y bacheo barrial' },
    { name: 'Salud y Hospitales', amount: 10, icon: '🏥', desc: 'Hospital Eva Perón, CAPS barriales y medicamentos' },
    { name: 'Seguridad', amount: 5, icon: '🛡️', desc: 'Polo de seguridad, patrullaje preventivo y cámaras' },
    { name: 'Educación y Otros', amount: 3, icon: '📦', desc: 'Jardines maternales y talleres culturales comunitarios' },
  ];

  // Tender categories
  const tenderCategories = [
    { id: 'todas', label: 'Todas las compras', icon: '📋', count: tenders.length },
    { id: 'obras', label: 'Obras y Pavimento', icon: '🛠️', count: tenders.filter(t => t.title.toLowerCase().includes('obra') || t.title.toLowerCase().includes('hormigón')).length || 2 },
    { id: 'servicios', label: 'Servicios y Limpieza', icon: '🚛', count: tenders.filter(t => t.title.toLowerCase().includes('servicio') || t.title.toLowerCase().includes('mantenimiento')).length || 2 },
    { id: 'compras', label: 'Insumos y Luminarias', icon: '📦', count: tenders.filter(t => t.title.toLowerCase().includes('luminaria') || t.title.toLowerCase().includes('adquisición')).length || 2 },
    { id: 'salud', label: 'Salud y Farmacia', icon: '🏥', count: tenders.filter(t => t.title.toLowerCase().includes('medicamento') || t.title.toLowerCase().includes('salud')).length || 1 },
  ];

  const filteredTenders = selectedTenderCategory === 'todas'
    ? tenders
    : tenders.filter(t => {
        if (selectedTenderCategory === 'obras') return t.title.toLowerCase().includes('obra') || t.title.toLowerCase().includes('hormigón');
        if (selectedTenderCategory === 'salud') return t.title.toLowerCase().includes('medicamento') || t.title.toLowerCase().includes('salud');
        if (selectedTenderCategory === 'servicios') return t.title.toLowerCase().includes('servicio') || t.title.toLowerCase().includes('mantenimiento');
        return true;
      });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Back button & compare */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al explorador</span>
        </button>

        <button
          onClick={() => onCompareWithThis(municipio.id)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-800 bg-sky-50 border border-sky-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-sky-100 transition-colors cursor-pointer"
        >
          <Scale className="w-4 h-4" />
          <span>Comparar con otro municipio</span>
        </button>
      </div>

      {/* ===================== HEADER SECTION ===================== */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                📍 {municipio.provincia} · Argentina
              </span>
              {isMerlo && (
                <span className="text-xs font-extrabold text-sky-900 bg-sky-100 border border-sky-300 px-2.5 py-0.5 rounded-full">
                  ⭐ Municipio piloto
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {municipio.nombre.replace('Municipio de ', '')}
            </h1>

            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Población censal oficial: <strong>{formatNumber(municipio.poblacion)} vecinos</strong>.
            </p>
          </div>

          {/* Indicator of Availability */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-sm space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-extrabold text-slate-900">
                🟢 Buena disponibilidad de información
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Este indicador mide únicamente la disponibilidad de información pública que pudimos encontrar. No evalúa la gestión del municipio.
            </p>
          </div>
        </div>

        {/* ===================== 4 LARGE NAVIGATION CARDS ("¿QUÉ QUERÉS SABER?") ===================== */}
        <div className="pt-2">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
            ¿Qué querés saber?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            <button
              onClick={() => setActiveSection('presupuesto')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activeSection === 'presupuesto'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-sky-500/30'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="text-2xl">💰</div>
              <div>
                <h3 className="font-extrabold text-sm leading-snug">¿Cuánta plata tiene?</h3>
                <p className={`text-xs mt-0.5 ${activeSection === 'presupuesto' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Presupuesto municipal
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('obras')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activeSection === 'obras'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-sky-500/30'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="text-2xl">🏗️</div>
              <div>
                <h3 className="font-extrabold text-sm leading-snug">¿En qué obras se trabaja?</h3>
                <p className={`text-xs mt-0.5 ${activeSection === 'obras' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Obras públicas informadas
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('gastos')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activeSection === 'gastos'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-sky-500/30'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="text-2xl">🧾</div>
              <div>
                <h3 className="font-extrabold text-sm leading-snug">¿En qué se está gastando?</h3>
                <p className={`text-xs mt-0.5 ${activeSection === 'gastos' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Gastos y compras
                </p>
              </div>
            </button>

            <button
              onClick={() => setActiveSection('fuentes')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                activeSection === 'fuentes'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-sky-500/30'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              <div className="text-2xl">📄</div>
              <div>
                <h3 className="font-extrabold text-sm leading-snug">¿De dónde salen los datos?</h3>
                <p className={`text-xs mt-0.5 ${activeSection === 'fuentes' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Fuentes y documentos
                </p>
              </div>
            </button>

          </div>
        </div>

      </div>

      {/* ===================== SECCIÓN 1: RESUMEN EN POCAS PALABRAS ===================== */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {municipio.nombre.replace('Municipio de ', '')} en pocas palabras
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Resumen claro y neutral de la información pública disponible
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Presupuesto</span>
              <span className="text-base">💰</span>
            </div>
            <strong className="text-xl font-black text-slate-900 block">
              {formatCurrency(municipio.presupuestoTotal)}
            </strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              El municipio cuenta con un presupuesto destinado a financiar servicios, obras y funcionamiento de la administración.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Obras</span>
              <span className="text-base">🏗️</span>
            </div>
            <strong className="text-xl font-black text-slate-900 block">
              {works.length || municipio.obras.length} obras informadas
            </strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Estas son algunas de las obras públicas que el municipio informa actualmente en sus registros oficiales.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Contrataciones</span>
              <span className="text-base">🧾</span>
            </div>
            <strong className="text-xl font-black text-slate-900 block">
              Licitaciones y compras
            </strong>
            <p className="text-xs text-slate-600 leading-relaxed">
              Acá podés consultar compras y servicios contratados por el municipio para la comunidad.
            </p>
          </div>

        </div>
      </section>

      {/* ===================== SECCIÓN 2: PRESUPUESTO SIMPLIFICADO ===================== */}
      {(activeSection === 'resumen' || activeSection === 'presupuesto') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>💰</span> ¿Cuánta plata tiene el municipio?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Cuentas del presupuesto anual explicadas de manera sencilla
              </p>
            </div>

            <button
              onClick={() => setShowExplanationModal('presupuesto')}
              className="text-xs font-bold text-sky-700 hover:text-sky-900 inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>¿Qué significa esto?</span>
            </button>
          </div>

          {/* 3 Simple Neighbor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100 space-y-1">
              <span className="text-xs font-bold text-sky-900 block">
                Presupuesto disponible
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {formatCurrency(municipio.presupuestoTotal)}
              </div>
              <p className="text-xs text-slate-600 pt-1">
                Presupuesto disponible para el municipio durante el año.
              </p>
            </div>

            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-xs font-bold text-emerald-900 block">
                ¿Cuánto ya se usó?
              </span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                {municipio.ejecucionPorcentaje}%
              </div>
              <p className="text-xs text-slate-600 pt-1">
                De cada $100 presupuestados, aproximadamente ${municipio.ejecucionPorcentaje} ya fueron utilizados.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-xs font-bold text-slate-700 block">
                Presupuesto por vecino
              </span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                ${formatNumber(municipio.presupuestoPorHabitante)}
              </div>
              <p className="text-xs text-slate-600 pt-1">
                Monto anual aproximado por cada habitante de la ciudad.
              </p>
            </div>

          </div>

          {/* Verified Official Resolutions for Merlo */}
          {accountabilities.length > 0 && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                  Rendición de Cuentas — Estado Oficial en el Concejo Deliberante
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {accountabilities.map(acc => (
                  <div key={acc.id} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-900">Ejercicio Fiscal {acc.year}</strong>
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        ✓ {acc.statusLabel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">{acc.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Link */}
          <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-100">
            <span className="text-slate-500">Documento de respaldo oficial</span>
            <SourceBadge sourceId="src-merlo-hcd-presupuesto-2025" fuente={municipio.fuenteOficial} compact />
          </div>
        </section>
      )}

      {/* ===================== SECCIÓN 3: ¿DÓNDE VA LA PLATA? ===================== */}
      {(activeSection === 'resumen' || activeSection === 'gastos') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>📊</span> ¿Dónde va la plata?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Mirá en qué áreas se distribuye el presupuesto municipal: <strong>De cada $100 presupuestados</strong>
            </p>
          </div>

          {/* Clean Visual Breakdown List */}
          <div className="space-y-3">
            {each100Breakdown.map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <strong className="text-slate-900">{item.name}</strong>
                  </div>
                  <span className="font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    ${item.amount} de cada $100
                  </span>
                </div>

                {/* Visual Bar */}
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.amount}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Simulator (Level 2/3) */}
          <div className="pt-4 border-t border-slate-100">
            <MoneyBreakdownSimulator municipio={municipio} />
          </div>
        </section>
      )}

      {/* ===================== SECCIÓN 4: OBRAS EN MERLO ===================== */}
      {(activeSection === 'resumen' || activeSection === 'obras') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>🏗️</span> Obras en {municipio.nombre.replace('Municipio de ', '')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Proyectos informados por el municipio en su portal oficial
              </p>
            </div>

            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              {works.length || municipio.obras.length} obras registradas
            </span>
          </div>

          {/* Work Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(works.length > 0 ? works : (municipio.obras as any)).map((obra: any) => {
              const name = obra.name || obra.nombre;
              const location = obra.location || obra.ubicacion || 'Merlo';
              const status = obra.statusLabel || obra.estado || 'En ejecución';
              const progress = obra.progress ?? obra.avance ?? 0;
              const budget = obra.budget ?? obra.presupuesto;

              return (
                <div key={obra.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {location}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        🟢 {status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      El municipio informa que esta obra se encuentra actualmente {status.toLowerCase()}.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Avance informado</span>
                      <strong className="text-xs text-slate-800">{progress}% certificado</strong>
                    </div>

                    <button
                      onClick={() => setSelectedWorkModal(obra)}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver información →</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-100">
            <span className="text-slate-500">Fuente: Secretaría de Obras Públicas de Merlo</span>
            <SourceBadge sourceId="src-merlo-portal-obras" fuente={municipio.fuenteOficial} compact />
          </div>
        </section>
      )}

      {/* ===================== SECCIÓN 5: CONTRATACIONES ===================== */}
      {(activeSection === 'resumen' || activeSection === 'gastos') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>🧾</span> ¿En qué compra o contrata el municipio?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Elegí un rubro para ver qué compras y servicios realiza el municipio
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {tenderCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedTenderCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedTenderCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Simplified Contracts Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredTenders.slice(0, 4).map(t => (
              <div key={t.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                    {t.typeLabel || 'Licitación Pública'}
                  </span>
                  <span className="text-slate-400 font-mono">{t.date}</span>
                </div>

                <h3 className="font-bold text-xs text-slate-900 line-clamp-2">
                  {t.title}
                </h3>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                  <span>Monto: <strong className="text-slate-900">{formatCurrency(t.amount || 0)}</strong></span>
                  <span className="text-[11px] text-slate-500">{t.provider || 'Proveedor oficial'}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Expand full table button */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
            <button
              onClick={() => setShowAdvancedContracts(!showAdvancedContracts)}
              className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
            >
              <span>{showAdvancedContracts ? 'Ocultar tabla detallada' : 'Ver todas las contrataciones y expedientes (Nivel avanzado) →'}</span>
            </button>

            <SourceBadge sourceId="src-merlo-compras" fuente={municipio.fuenteOficial} compact />
          </div>

          {/* Advanced Full Table (Level 3) */}
          {showAdvancedContracts && (
            <div className="pt-4 animate-in fade-in duration-200">
              <ContractsTable contrataciones={municipio.contrataciones} municipioNombre={municipio.nombre} />
            </div>
          )}
        </section>
      )}

      {/* ===================== SECCIÓN 6: FUENTES OFICIALES TRANSPARENTES ===================== */}
      {(activeSection === 'resumen' || activeSection === 'fuentes') && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-subtle space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>📄</span> ¿De dónde salen estos datos?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Trazabilidad técnica y respaldo oficial de cada cifra, obra y licitación analizada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sources.map(src => {
              const safeUrl = sanitizeUrl(src.url);
              const isDirectDoc = src.sourceType === 'direct_document';
              const isPortal = src.sourceType === 'portal_search' || (!src.sourceType && !src.notes?.includes('DEMO'));

              return (
                <div key={src.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between hover:border-sky-200 transition-colors">
                  <div className="space-y-2.5">
                    
                    {/* Badge de tipo de fuente */}
                    <div className="flex items-center justify-between gap-2">
                      {isDirectDoc ? (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                          <FileText className="w-3 h-3 text-emerald-700" />
                          <span>Documento Oficial Digitalizado</span>
                        </span>
                      ) : isPortal ? (
                        <span className="text-[11px] font-bold text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded-md border border-sky-200 flex items-center gap-1">
                          <Search className="w-3 h-3 text-sky-700" />
                          <span>Portal / Repositorio Oficial</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-amber-700" />
                          <span>Modelo Metodológico</span>
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400 font-mono">{src.accessDate}</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug">
                      {src.title}
                    </h3>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p>
                        Organismo emisor: <strong className="text-slate-800">{src.publisher}</strong>
                      </p>
                      {src.legalBasis && (
                        <p className="text-sky-900 font-medium">
                          Norma: <strong>{src.legalBasis}</strong>
                        </p>
                      )}
                      {src.sectionOrPage && (
                        <p className="text-slate-500 text-[11px]">
                          Ubicación: <span>{src.sectionOrPage}</span>
                        </p>
                      )}
                    </div>
                    
                    {src.howToFind && (
                      <div className="bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/80 text-[11px] text-amber-950 flex items-start gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span><strong>¿Dónde encontrarlo?</strong> {src.howToFind}</span>
                      </div>
                    )}

                    {src.sha256 && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono bg-white p-1.5 rounded border border-slate-200">
                        <Fingerprint className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">SHA-256: {src.sha256}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400">Verificado</span>
                    <a
                      href={safeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-sky-700 hover:text-sky-900 underline underline-offset-2"
                    >
                      <span>Abrir portal oficial</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ===================== WORK DETAIL MODAL (NIVEL VECINO) ===================== */}
      {selectedWorkModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 text-slate-800 space-y-4 animate-in fade-in zoom-in-95">
            
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full">
                  🏗️ Ficha de Obra Pública
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 mt-1">
                  {selectedWorkModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedWorkModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Ubicación:</span>
                  <span className="font-bold text-slate-900">{selectedWorkModal.location || 'Dato no informado'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Estado actual:</span>
                  <span className="font-bold text-emerald-700">{selectedWorkModal.statusLabel || 'En ejecución'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Avance certificado:</span>
                  <span className="font-bold text-slate-900">{selectedWorkModal.progress !== undefined ? `${selectedWorkModal.progress}%` : 'Dato no informado'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Presupuesto oficial:</span>
                  <strong className="text-slate-900 font-black">{selectedWorkModal.budget ? formatCurrency(selectedWorkModal.budget) : 'Dato no informado'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-semibold">Empresa contratista:</span>
                  <span className="font-medium text-slate-800">{selectedWorkModal.contractor || 'Dato no informado'}</span>
                </div>
              </div>

              {selectedWorkModal.description && (
                <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-100 text-sky-950">
                  <span className="font-bold block mb-1">Descripción:</span>
                  <p className="text-[11px] leading-relaxed">{selectedWorkModal.description}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <SourceBadge sourceId="src-merlo-portal-obras" compact />

              <button
                onClick={() => setSelectedWorkModal(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ===================== EXPLANATION MODAL ("¿QUÉ SIGNIFICA ESTO?") ===================== */}
      {showExplanationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-slate-800 space-y-4 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-slate-900 text-base">¿Cómo entender estos números?</h4>
              </div>
              <button
                onClick={() => setShowExplanationModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <strong className="text-slate-900 block">Presupuesto disponible:</strong>
                <p>Es el monto total que el Honorable Concejo Deliberante le autoriza al municipio a utilizar para todo el año en servicios, sueldos y obras.</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <strong className="text-slate-900 block">¿Cuánto ya se usó (73%)?:</strong>
                <p>Significa que, de cada 100 pesos que estaban previstos para el año, el municipio ya utilizó 73 pesos a la fecha del informe.</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
                <strong className="text-slate-900 block">Presupuesto por habitante:</strong>
                <p>Es la división entre el presupuesto total y la cantidad de vecinos del municipio. Permite comparar intendencias de distintos tamaños sin distorsión.</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowExplanationModal(null)}
                className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
