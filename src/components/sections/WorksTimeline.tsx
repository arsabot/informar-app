import React, { useState } from 'react';
import { Hammer, Calendar, MapPin, Building2, CheckCircle2, Clock, AlertCircle, ExternalLink, Filter } from 'lucide-react';
import { Obra, EstadoObra } from '../../types';
import { formatCurrency } from '../../data/municipios';
import { sanitizeUrl } from '../../utils/security';

interface WorksTimelineProps {
  obras: Obra[];
  municipioNombre: string;
  className?: string;
}

export const WorksTimeline: React.FC<WorksTimelineProps> = ({ obras, municipioNombre, className = '' }) => {
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [filterCategoria, setFilterCategoria] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categorias = Array.from(new Set(obras.map(o => o.categoria)));

  const filteredObras = obras.filter(obra => {
    const matchesEstado = filterEstado === 'todos' || obra.estado === filterEstado;
    const matchesCategoria = filterCategoria === 'todas' || obra.categoria === filterCategoria;
    const matchesQuery = !searchQuery || 
      obra.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obra.contratista.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obra.ubicacion.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesEstado && matchesCategoria && matchesQuery;
  });

  const getStatusBadge = (estado: EstadoObra) => {
    switch (estado) {
      case 'En ejecución':
        return {
          icon: Clock,
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          label: '🟢 En ejecución'
        };
      case 'Finalizada':
        return {
          icon: CheckCircle2,
          color: 'bg-sky-50 text-sky-700 border-sky-200',
          dot: 'bg-sky-500',
          label: '🔵 Finalizada'
        };
      case 'Licitada':
        return {
          icon: Hammer,
          color: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: '🟡 En Licitación'
        };
      case 'Pausada':
        return {
          icon: AlertCircle,
          color: 'bg-rose-50 text-rose-700 border-rose-200',
          dot: 'bg-rose-500',
          label: '🟠 Pausada'
        };
      default:
        return {
          icon: Clock,
          color: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-500',
          label: estado
        };
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Search & Filter Header */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar por obra, contratista o zona..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold">Estado:</span>
          </div>
          
          {['todos', 'En ejecución', 'Finalizada', 'Licitada'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterEstado(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterEstado === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'todos' ? 'Todas' : st}
            </button>
          ))}
        </div>

      </div>

      {/* Works Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredObras.map((obra) => {
          const status = getStatusBadge(obra.estado);
          const isFinished = obra.estado === 'Finalizada';

          return (
            <div
              key={obra.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                
                {/* Category & Status Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 uppercase tracking-wider">
                    {obra.categoria}
                  </span>

                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-950 transition-colors">
                    {obra.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {obra.descripcion}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">Avance Físico Registrado</span>
                    <span className="text-slate-900 font-extrabold">{obra.avance}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFinished ? 'bg-sky-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${obra.avance}%` }}
                    />
                  </div>
                </div>

                {/* Key metadata grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Presupuesto Asignado:</span>
                    <strong className="text-slate-900 font-bold">{formatCurrency(obra.presupuesto)}</strong>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Contratista:</span>
                    <strong className="text-slate-800 font-medium line-clamp-1" title={obra.contratista}>
                      {obra.contratista}
                    </strong>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Plazo de Obra:</span>
                    <span className="text-slate-700 font-medium flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {obra.fechaInicio} → {obra.fechaFinEstimada}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-slate-400 text-[11px] block">Ubicación:</span>
                    <span className="text-slate-700 font-medium flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {obra.ubicacion}
                    </span>
                  </div>
                </div>

              </div>

              {/* Card Footer with link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">ID: {obra.id}</span>
                <a
                  href={sanitizeUrl(obra.fuenteUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-700 hover:text-sky-900 font-semibold inline-flex items-center gap-1 hover:underline"
                >
                  <span>Ver ficha oficial</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {filteredObras.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
          <Hammer className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
          <p className="text-sm font-semibold text-slate-700">No encontramos obras públicas con esos filtros</p>
          <button
            onClick={() => {
              setFilterEstado('todos');
              setFilterCategoria('todas');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-sky-600 font-semibold underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}

    </div>
  );
};
