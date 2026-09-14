import React from 'react';
import { BarChart3, Heart, ShieldCheck, Sparkles, Code, Users, ArrowRight, Building2 } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Brand Hero */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-sky-500/20">
          <BarChart3 className="w-8 h-8 text-sky-400" />
        </div>
        
        <div className="flex items-center justify-center text-3xl sm:text-4xl tracking-tight leading-none">
          <span className="font-extrabold text-slate-900 tracking-wider">INFORM</span>
          <span className="font-black text-sky-500 text-[2.2rem] ml-[2px]">AR</span>
        </div>

        <p className="text-xl sm:text-2xl font-medium text-slate-700 italic max-w-xl mx-auto">
          “La información pública, al alcance de todos.”
        </p>

        <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
          INFORMAR es una iniciativa <strong>CivicTech / GovTech argentina</strong> independiente que busca transformar la relación entre la ciudadanía y las administraciones locales a través de datos claros, comprensibles y verificables.
        </p>
      </div>

      {/* The Problem & The Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">El Desafío</span>
          <h3 className="font-bold text-lg text-slate-900">La información existe, pero está dispersa</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            En la mayoría de los más de 2.000 municipios argentinos, los presupuestos se publican en PDFs escaneados de 400 páginas, las compras están en portales difíciles de navegar y las obras no tienen seguimiento claro para los vecinos.
          </p>
        </div>

        <div className="bg-sky-50 p-6 rounded-3xl border border-sky-200/80 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700">La Solución INFORMAR</span>
          <h3 className="font-bold text-lg text-slate-900">Tecnología al servicio del ciudadano</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Centralizamos, normalizamos y traducimos los números oficiales en gráficos intuitivos, simuladores cotidianos y comparadores objetivos, permitiendo que cualquier persona entienda cómo se invierten sus tasas municipales.
          </p>
        </div>
      </div>

      {/* Commitment Cards */}
      <div className="space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          Nuestros Compromisos Fundamentales
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-sm text-slate-900">Independencia Partidaria</h4>
            <p className="text-xs text-slate-500">
              No representamos a ningún partido político ni organismo estatal. Nuestro único compromiso es con la verdad de los datos públicos.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <Code className="w-5 h-5 text-sky-600" />
            <h4 className="font-bold text-sm text-slate-900">Código Abierto & Datos</h4>
            <p className="text-xs text-slate-500">
              Fomentamos la colaboración de programadores, diseñadores y periodistas para enriquecer la infraestructura cívica argentina.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-sm text-slate-900">Para Toda la Comunidad</h4>
            <p className="text-xs text-slate-500">
              Diseñado tanto para el vecino que quiere ver su plaza como para el investigador que descarga 10.000 filas en formato JSON.
            </p>
          </div>
        </div>
      </div>

      {/* Open Source Project Links & Creator */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Desarrollo Cívico</span>
            <h3 className="font-extrabold text-xl text-slate-900">Repositorio Oficial & Ecosistema</h3>
          </div>
          <a
            href="https://github.com/arsabot/informar-app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
          >
            <Code className="w-4 h-4 text-sky-400" />
            <span>Ver Código en GitHub</span>
          </a>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          INFORMAR es un proyecto desarrollado por <a href="https://github.com/arsabot" target="_blank" rel="noopener noreferrer" className="font-bold text-sky-600 hover:underline">@arsabot (Rodrigo Saavedra)</a>. Conocé otros proyectos relacionados:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          <a
            href="https://github.com/arsabot/VocalizAR-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-sky-700">🤖 VocalizAR-AI</span>
              <span className="text-[10px] text-slate-400">GitHub →</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Lector de textos con IA, OCR y síntesis neuronal de voz.</p>
          </a>

          <a
            href="https://github.com/arsabot/parkia-pescar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-sky-700">🚗 PARKIA</span>
              <span className="text-[10px] text-slate-400">GitHub →</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Plataforma inteligente de reserva de estacionamientos con Leaflet & Django.</p>
          </a>

          <a
            href="https://github.com/arsabot/forge-champions"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-sky-700">🎓 Forge Champions</span>
              <span className="text-[10px] text-slate-400">GitHub →</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Portal de mentorías y masterclasses para Fundación Forge.</p>
          </a>

          <a
            href="https://invitely-delta-dun.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-sky-700">💌 Invitely</span>
              <span className="text-[10px] text-slate-400">Web Demo →</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">SaaS de invitaciones interactivas con RSVP en tiempo real.</p>
          </a>

          <a
            href="https://github.com/arsabot/Mac-Duo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-sky-700">💻 Mac-Duo</span>
              <span className="text-[10px] text-slate-400">GitHub →</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Efecto Dynamic Island y notificaciones fluidas para MacBook.</p>
          </a>

          <a
            href="https://arsabot.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-sky-300 transition-all group block"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 group-hover:text-sky-700">🌐 Portafolio Completo</span>
              <span className="text-[10px] text-slate-400">Visitar →</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Perfil profesional, métricas GitHub y proyectos de software.</p>
          </a>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4 border border-slate-800">
        <h3 className="text-2xl font-extrabold tracking-tight">
          Comenzá a explorar los municipios hoy mismo
        </h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Descubrí las cuentas, obras y contrataciones públicas de tu ciudad en segundos.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('municipios')}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-sky-500/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Explorar Municipios Argentinos</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
