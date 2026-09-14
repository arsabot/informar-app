import React, { useState } from 'react';
import { Search, Filter, Building2, TrendingUp, Users, ArrowRight, ShieldCheck, Scale, Check, ArrowUpDown } from 'lucide-react';
import { MUNICIPIOS_DATA, PROVINCIAS_ARGENTINA, formatCurrency, formatNumber } from '../data/municipios';
import { Municipio, NivelTransparencia } from '../types';

interface MunicipiosDirectoryViewProps {
  onSelectMunicipio: (id: string) => void;
  onCompareSelected: (municipioIds: string[]) => void;
}

export const MunicipiosDirectoryView: React.FC<MunicipiosDirectoryViewProps> = ({
  onSelectMunicipio,
  onCompareSelected
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvincia, setSelectedProvincia] = useState<string>('todas');
  const [selectedNivel, setSelectedNivel] = useState<string>('todos');
  const [selectedPoblacionRange, setSelectedPoblacionRange] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'nombre' | 'poblacion' | 'presupuesto' | 'transparencia' | 'perCapita'>('poblacion');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  // Filtering
  const filtered = MUNICIPIOS_DATA.filter((m) => {
    const matchesSearch = !searchQuery ||
      m.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.provincia.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvincia = selectedProvincia === 'todas' || m.provincia === selectedProvincia;
    const matchesNivel = selectedNivel === 'todos' || m.nivelTransparencia === selectedNivel;

    let matchesPob = true;
    if (selectedPoblacionRange === 'mas-500k') matchesPob = m.poblacion >= 500000;
    else if (selectedPoblacionRange === '200k-500k') matchesPob = m.poblacion >= 200000 && m.poblacion < 500000;
    else if (selectedPoblacionRange === 'menos-200k') matchesPob = m.poblacion < 200000;

    return matchesSearch && matchesProvincia && matchesNivel && matchesPob;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'nombre':
        return a.nombre.localeCompare(b.nombre);
      case 'poblacion':
        return b.poblacion - a.poblacion;
      case 'presupuesto':
        return b.presupuestoTotal - a.presupuestoTotal;
      case 'transparencia':
        return b.scoreTransparencia.total - a.scoreTransparencia.total;
      case 'perCapita':
        return b.presupuestoPorHabitante - a.presupuestoPorHabitante;
      default:
        return 0;
    }
  });

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(item => item !== id));
    } else {
      if (selectedForCompare.length < 3) {
        setSelectedForCompare([...selectedForCompare, id]);
      } else {
        alert('Podés comparar hasta 3 municipios simultáneamente.');
      }
    }
  };

  const getNivelBadge = (nivel: NivelTransparencia, score: number) => {
    if (score >= 90) return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' };
    if (score >= 80) return { bg: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500' };
    if (score >= 70) return { bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' };
    return { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Directorio de Municipios
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Explorá presupuestos, obras y contrataciones públicas de municipios de toda la República Argentina.
          </p>
        </div>

        {/* Selected for Compare Floating Trigger */}
        {selectedForCompare.length > 0 && (
          <div className="bg-slate-900 text-white rounded-2xl p-3 px-4 shadow-xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <span className="text-xs font-semibold text-sky-400">
              {selectedForCompare.length} de 3 seleccionados
            </span>
            <button
              onClick={() => onCompareSelected(selectedForCompare)}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" /> Comparar ahora
            </button>
            <button
              onClick={() => setSelectedForCompare([])}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Limpiar
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card rounded-2xl p-5 border border-slate-200/90 shadow-subtle space-y-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Text search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o provincia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Filter Province */}
          <div>
            <select
              value={selectedProvincia}
              onChange={(e) => setSelectedProvincia(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-500"
            >
              <option value="todas">Todas las provincias ({PROVINCIAS_ARGENTINA.length})</option>
              {PROVINCIAS_ARGENTINA.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Filter Population */}
          <div>
            <select
              value={selectedPoblacionRange}
              onChange={(e) => setSelectedPoblacionRange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-500"
            >
              <option value="todos">Toda la población</option>
              <option value="mas-500k">Grandes ciudades (+500k hab.)</option>
              <option value="200k-500k">Medianas (200k a 500k hab.)</option>
              <option value="menos-200k">Menos de 200k hab.</option>
            </select>
          </div>

          {/* Filter Transparency */}
          <div>
            <select
              value={selectedNivel}
              onChange={(e) => setSelectedNivel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-500"
            >
              <option value="todos">Todos los niveles de apertura</option>
              <option value="Muy Alto">Apertura Muy Alta (Score 90+)</option>
              <option value="Alto">Apertura Alta (Score 80-89)</option>
              <option value="Medio">Apertura Media (Score 70-79)</option>
            </select>
          </div>

        </div>

        {/* Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="text-slate-500 font-medium">
            Mostrando <strong>{sorted.length}</strong> municipios encontrados
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Ordenar por:
            </span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'poblacion', label: 'Población' },
                { id: 'presupuesto', label: 'Presupuesto Total' },
                { id: 'perCapita', label: 'Gasto por Habitante' },
                { id: 'transparencia', label: 'Score Apertura' },
                { id: 'nombre', label: 'Nombre A-Z' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    sortBy === s.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Grid of Municipal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sorted.map((m) => {
          const isSelected = selectedForCompare.includes(m.id);
          const badge = getNivelBadge(m.nivelTransparencia, m.scoreTransparencia.total);
          const isPiloto = m.isPiloto || m.id === 'merlo';

          return (
            <div
              key={m.id}
              onClick={() => onSelectMunicipio(m.id)}
              className={`bg-white rounded-3xl p-6 shadow-subtle hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-5 group cursor-pointer relative ${
                isPiloto
                  ? 'border-2 border-sky-400/80 ring-4 ring-sky-500/10 shadow-md'
                  : 'border border-slate-200/90'
              }`}
            >
              {/* Card Top */}
              <div className="space-y-3">
                {isPiloto && (
                  <div className="bg-sky-50 border border-sky-200 text-sky-900 rounded-xl p-2.5 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-extrabold text-sky-950">
                      <span>⭐ Municipio piloto</span>
                    </div>
                    <p className="text-[11px] text-sky-800 leading-snug">
                      Merlo es el municipio piloto de INFORMAR. Utilizamos este municipio para validar nuestro modelo de recopilación, normalización y visualización de información pública.
                    </p>
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-sky-700">
                        {m.provincia}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {m.pais || 'Argentina'}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-sky-950 transition-colors mt-0.5">
                      {m.nombre}
                    </h3>
                  </div>

                  {/* Compare Checkbox pill */}
                  <button
                    onClick={(e) => toggleCompare(m.id, e)}
                    className={`p-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                    title="Seleccionar para comparar"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isSelected ? 'Comparando' : 'Comparar'}</span>
                  </button>
                </div>

                {/* Score badge */}
                <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-600" />
                    <span className="text-xs font-semibold text-slate-700">Datos disponibles:</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${badge.bg}`}>
                    {m.scoreTransparencia.total} / 100
                  </span>
                </div>

                {/* Indicators 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Presupuesto 2026</span>
                    <strong className="text-slate-900 font-bold text-sm">{formatCurrency(m.presupuestoTotal)}</strong>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Por Habitante</span>
                    <strong className="text-slate-900 font-bold text-sm">${formatNumber(m.presupuestoPorHabitante)}</strong>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Población</span>
                    <span className="text-slate-700 font-medium">{formatNumber(m.poblacion)} hab.</span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Obras Registradas</span>
                    <span className="text-slate-700 font-medium">{m.cantidadObras} proyectos</span>
                  </div>
                </div>

              </div>

              {/* Card Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">
                  Actualizado: {m.ultimaActualizacion}
                </span>

                <button
                  onClick={() => onSelectMunicipio(m.id)}
                  className="font-bold text-sky-700 group-hover:text-sky-950 inline-flex items-center gap-1 transition-transform group-hover:translate-x-0.5"
                >
                  <span>Ver municipio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 text-slate-400">
          <Building2 className="w-10 h-10 mx-auto mb-3 opacity-40 text-slate-400" />
          <h3 className="font-bold text-slate-800 text-base">No encontramos municipios con los filtros seleccionados</h3>
          <p className="text-xs text-slate-500 mt-1">
            Probá quitando algunos filtros de provincia o cambiando el término de búsqueda.
          </p>
        </div>
      )}

    </div>
  );
};
