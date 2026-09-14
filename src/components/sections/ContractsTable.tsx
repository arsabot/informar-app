import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, ExternalLink, FileText, CheckCircle2, Building2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Contratacion, TipoContratacion } from '../../types';
import { formatCurrency } from '../../data/municipios';
import { TooltipHelp } from '../common/TooltipHelp';
import { sanitizeUrl } from '../../utils/security';

interface ContractsTableProps {
  contrataciones: Contratacion[];
  municipioNombre: string;
  className?: string;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contrataciones,
  municipioNombre,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTipo, setFilterTipo] = useState<string>('todos');
  const [sortField, setSortField] = useState<'fecha' | 'monto'>('fecha');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContract, setSelectedContract] = useState<Contratacion | null>(null);

  const itemsPerPage = 6;

  // Filter & Sort
  const filtered = contrataciones.filter((item) => {
    const matchesTipo = filterTipo === 'todos' || item.tipo === filterTipo;
    const matchesSearch = !searchQuery ||
      item.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.proveedor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.expediente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cuitProveedor.includes(searchQuery);

    return matchesTipo && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortField === 'monto') {
      return sortOrder === 'desc' ? b.monto - a.monto : a.monto - b.monto;
    }
    // Sort by fecha (DD/MM/YYYY)
    const dateA = new Date(a.fecha.split('/').reverse().join('-')).getTime();
    const dateB = new Date(b.fecha.split('/').reverse().join('-')).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage) || 1;
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSort = (field: 'fecha' | 'monto') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getTipoBadge = (tipo: TipoContratacion) => {
    switch (tipo) {
      case 'Licitación Pública':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Licitación Privada':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Contratación Directa':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Concurso de Precios':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      
      {/* Search and Filters Bar */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por expediente, proveedor o detalle..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Filter by Type */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="font-semibold">Tipo:</span>
            <TooltipHelp termKey="licitacion" />
          </div>

          <select
            value={filterTipo}
            onChange={(e) => {
              setFilterTipo(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-500"
          >
            <option value="todos">Todos los procedimientos</option>
            <option value="Licitación Pública">Licitación Pública</option>
            <option value="Licitación Privada">Licitación Privada</option>
            <option value="Contratación Directa">Contratación Directa</option>
            <option value="Concurso de Precios">Concurso de Precios</option>
          </select>
        </div>

      </div>

      {/* Modern Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">
                  <button
                    onClick={() => handleSort('fecha')}
                    className="flex items-center gap-1 hover:text-slate-900 cursor-pointer"
                  >
                    <span>Fecha</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </button>
                </th>
                <th className="py-3 px-4 min-w-[240px]">Contratación / Objeto</th>
                <th className="py-3 px-4">Proveedor / CUIT</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleSort('monto')}
                    className="flex items-center gap-1 ml-auto hover:text-slate-900 cursor-pointer"
                  >
                    <span>Monto Total</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </button>
                </th>
                <th className="py-3 px-4 text-center">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginated.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-sky-50/50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedContract(item)}
                >
                  {/* Fecha */}
                  <td className="py-3.5 px-4 text-slate-500 font-medium whitespace-nowrap">
                    {item.fecha}
                  </td>

                  {/* Descripcion */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900 group-hover:text-sky-950 line-clamp-1">
                      {item.descripcion}
                    </p>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {item.expediente}
                    </span>
                  </td>

                  {/* Proveedor */}
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-800 line-clamp-1">
                      {item.proveedor}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      CUIT {item.cuitProveedor}
                    </span>
                  </td>

                  {/* Tipo */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${getTipoBadge(item.tipo)}`}>
                      {item.tipo}
                    </span>
                  </td>

                  {/* Monto */}
                  <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 whitespace-nowrap">
                    {formatCurrency(item.monto)}
                  </td>

                  {/* Acción */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedContract(item);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-100 transition-colors"
                      title="Ver expediente"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No se encontraron contrataciones registradas con ese criterio.
          </div>
        )}

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Mostrando {filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filtered.length)} de {filtered.length} contrataciones
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold text-slate-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Contract Detail Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-sky-100 text-sky-800 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Ficha de Contratación Pública</h4>
                  <p className="text-xs text-slate-400">{selectedContract.expediente}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedContract(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Objeto del contrato</span>
                <p className="text-slate-900 font-semibold text-sm mt-0.5">{selectedContract.descripcion}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[11px]">Monto Adjudicado:</span>
                  <strong className="text-slate-900 font-extrabold text-base">{formatCurrency(selectedContract.monto)}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Tipo de Compra:</span>
                  <span className={`inline-block px-2 py-0.5 rounded-md font-semibold text-[11px] border mt-0.5 ${getTipoBadge(selectedContract.tipo)}`}>
                    {selectedContract.tipo}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Proveedor Adjudicado:</span>
                  <strong className="text-slate-800">{selectedContract.proveedor}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">CUIT Proveedor:</span>
                  <span className="font-mono text-slate-700">{selectedContract.cuitProveedor}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 block text-[11px]">Área Solicitante:</span>
                  <span className="text-slate-800 font-medium">{selectedContract.areaSolicitante}</span>
                </div>
              </div>

              <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-between text-sky-900">
                <span>Fecha de publicación oficial: {selectedContract.fecha}</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {selectedContract.estado}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={sanitizeUrl(selectedContract.fuenteUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-700 hover:text-sky-900 font-semibold inline-flex items-center gap-1 underline"
              >
                <span>Ver expediente en portal oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedContract(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
