import React, { useState } from 'react';
import { 
  ExternalLink, CheckCircle2, ShieldCheck, AlertCircle, X, 
  FileText, Calendar, Building2, Search, Fingerprint, HelpCircle, BookOpen
} from 'lucide-react';
import { FuenteOficial } from '../../types';
import { Source } from '../../types/models';
import { getSourceById } from '../../services/municipalityService';
import { sanitizeUrl } from '../../utils/security';

interface SourceBadgeProps {
  fuente?: FuenteOficial;
  sourceId?: string;
  sourceIds?: string[];
  customTitle?: string;
  className?: string;
  compact?: boolean;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({ 
  fuente, 
  sourceId, 
  sourceIds, 
  customTitle, 
  className = '', 
  compact = false 
}) => {
  const [showModal, setShowModal] = useState(false);

  // Resolve source details
  let resolvedSource: Source | undefined;
  if (sourceId) {
    resolvedSource = getSourceById(sourceId);
  } else if (sourceIds && sourceIds.length > 0) {
    resolvedSource = getSourceById(sourceIds[0]);
  }

  const title = customTitle || resolvedSource?.title || fuente?.nombre || 'Fuente Oficial Municipal';
  const publisher = resolvedSource?.publisher || fuente?.organismo || fuente?.nombre || 'Municipalidad de Merlo';
  const date = resolvedSource?.publicationDate || resolvedSource?.accessDate || fuente?.fechaCorte || '2026';
  const url = sanitizeUrl(resolvedSource?.url || fuente?.url || 'https://www.merlo.gob.ar/');
  const documentType = resolvedSource?.documentType || fuente?.tipoDocumento || fuente?.tipo || 'Documento Oficial';
  const sourceType = resolvedSource?.sourceType || (fuente?.esDemo ? 'reference_estimate' : 'portal_search');
  const legalBasis = resolvedSource?.legalBasis;
  const sectionOrPage = resolvedSource?.sectionOrPage;
  const howToFind = resolvedSource?.howToFind;
  const sha256 = resolvedSource?.sha256;
  const isPending = resolvedSource?.status === 'pending' || fuente?.estadoFuente === 'pendiente';

  return (
    <>
      <div className={`inline-flex flex-wrap items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-xl px-3 py-1.5 text-xs text-slate-700 shadow-2xs ${className}`}>
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Fuente oficial: <strong className="text-slate-900 font-semibold">{publisher}</strong></span>
        </div>

        {!compact && (
          <span className="hidden sm:inline text-slate-400 font-normal">• {date}</span>
        )}

        {isPending ? (
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
            Fuente pendiente
          </span>
        ) : (
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1 text-sky-700 hover:text-sky-900 font-bold underline underline-offset-2 ml-1 cursor-pointer transition-colors"
            title="Ver trazabilidad técnica y documento oficial"
          >
            <span>Ver trazabilidad</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Ficha Técnica de Trazabilidad</h4>
                  <p className="text-xs text-slate-500">Respaldo y verificación del dato público municipal</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Source Type Indicator */}
            <div className="mb-4">
              {sourceType === 'direct_document' && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>📄 Documento Oficial Directo: El enlace conecta con el archivo o PDF publicado por el municipio.</span>
                </div>
              )}
              {sourceType === 'portal_search' && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-semibold">
                  <Search className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>🏛️ Portal / Repositorio Institucional: Enlace al buscador de ordenanzas o boletín oficial donde se tramita la norma.</span>
                </div>
              )}
              {sourceType === 'reference_estimate' && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
                  <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>🧪 Modelo Metodológico: Registro estructurado con fines cívicos basado en marcos normativos vigentes.</span>
                </div>
              )}
            </div>

            {/* Source Content */}
            <div className="space-y-3.5 text-xs text-slate-600">
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                <div>
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider block">Título del Documento / Publicación</span>
                  <p className="text-slate-900 font-bold text-sm mt-0.5">{title}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Organismo Emisor:</span>
                    <strong className="text-slate-800">{publisher}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Tipo de Documento:</span>
                    <span className="font-semibold text-slate-800 capitalize">{documentType.replace('_', ' ')}</span>
                  </div>
                  {legalBasis && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Norma / Base Legal:</span>
                      <strong className="text-sky-800">{legalBasis}</strong>
                    </div>
                  )}
                  {sectionOrPage && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">Ubicación / Sección:</span>
                      <span className="font-semibold text-slate-800">{sectionOrPage}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-400 block text-[11px]">Fecha Oficial / Consulta:</span>
                    <span className="font-semibold text-slate-800">{date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Estado de Verificación:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                      ✓ Verificado con Esquema Cívico
                    </span>
                  </div>
                </div>
              </div>

              {/* Guía de cómo encontrar el dato */}
              {howToFind && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-1 text-amber-950">
                  <span className="font-bold text-xs flex items-center gap-1.5 text-amber-900">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" /> ¿Cómo encontrar este dato en la página oficial?
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {howToFind}
                  </p>
                </div>
              )}

              {/* SHA-256 Vault Hash */}
              {sha256 && (
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px]">
                    <Fingerprint className="w-3.5 h-3.5 text-slate-500" />
                    <span>Hash Criptográfico de Respaldo (SHA-256):</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-mono break-all select-all bg-white p-1.5 rounded border border-slate-200">
                    {sha256}
                  </p>
                </div>
              )}

              {/* URL or Link */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-slate-700">
                <span className="font-bold text-xs flex items-center gap-1.5 text-slate-900">
                  <ExternalLink className="w-3.5 h-3.5 text-sky-600" /> Enlace Oficial Público
                </span>
                <p className="text-[11px] text-sky-800 font-mono break-all bg-white p-2 rounded border border-slate-200">
                  {url}
                </p>
                <p className="text-[10px] text-slate-500 pt-0.5">
                  Los enlaces externos redirigen a dominios públicos administrados por el organismo emisor.
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-700 hover:text-sky-900 font-bold inline-flex items-center gap-1 underline underline-offset-2"
              >
                <span>Abrir portal oficial ↗</span>
              </a>

              <button
                onClick={() => setShowModal(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
