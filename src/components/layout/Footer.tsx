import React from 'react';
import { BarChart3, Heart, ShieldCheck, Database, Code, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Slogan */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-500/20">
                <BarChart3 className="w-4 h-4 text-slate-950" />
              </div>
              <div className="flex items-center text-xl tracking-tight">
                <span className="font-extrabold text-white tracking-wider">INFORM</span>
                <span className="font-black text-sky-400 ml-[1px]">AR</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 italic">
              “La información pública, al alcance de todos.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma CivicTech que centraliza, normaliza y visualiza datos públicos de municipios argentinos para fortalecer el control ciudadano y la transparencia fiscal.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-sky-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              Iniciativa de Datos Abiertos
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200">
              Explorar Plataforma
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('municipios')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Directorio de Municipios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('comparar')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Comparador Multi-Municipio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('donde-va-la-plata')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Simulador “¿Dónde va la plata?”
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('metodologia')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Metodología e Índice de Apertura
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sobre-nosotros')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sobre INFORMAR & Manifiesto
                </button>
              </li>
            </ul>
          </div>

          {/* Civic Tech & Method */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200">
              Transparencia & Principios
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Neutralidad política estricta</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Database className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Trazabilidad de cada fuente original</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Formatos abiertos (JSON, CSV, APIs)</span>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                Los datos provienen de presupuestos oficiales aprobados por Concejos Deliberantes y portales de transparencia.
              </li>
            </ul>
          </div>

          {/* Open Source & GitHub */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-200">
              Código Abierto & GitHub
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Iniciativa de tecnología cívica transparente y colaborativa.
            </p>
            <div className="space-y-2">
              <a
                href="https://github.com/arsabot/informar-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-all shadow-sm w-full justify-between"
              >
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-sky-400" />
                  <span>Repo: arsabot/informar-app</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href="https://arsabot.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700/60 transition-all w-full justify-between"
              >
                <span>🌐 Portafolio & Ecosistema</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} INFORMAR Argentina. Creado por <a href="https://github.com/arsabot" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-semibold">@arsabot</a> con datos abiertos.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('metodologia')}
              className="hover:text-slate-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              Cómo se procesan los datos <ArrowUpRight className="w-3 h-3" />
            </button>
            <span className="inline-flex items-center gap-1 text-slate-400">
              Hecho con <Heart className="w-3 h-3 text-red-400 fill-red-400" /> para Argentina
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
