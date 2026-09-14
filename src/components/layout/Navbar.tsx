import React, { useState, useEffect } from 'react';
import { Search, Menu, X, BarChart3, Scale, BookOpen, Building2, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simplified navigation links according to UX specification
  const navLinks = [
    { id: 'landing', label: 'Inicio' },
    { id: 'municipios', label: 'Municipios' },
    { id: 'comparar', label: 'Comparar' },
    { id: 'metodologia', label: 'Cómo funciona' },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-2.5' 
        : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/80 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md shadow-sky-500/10 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center text-xl tracking-tight leading-none">
                <span className="font-extrabold text-slate-900 tracking-wider">INFORM</span>
                <span className="font-black text-sky-500 text-[1.28rem] relative ml-[1px]">
                  AR
                  <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping opacity-75"></span>
                  <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-sky-500 rounded-full"></span>
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold block mt-0.5">
                Para vecinos
              </span>
            </div>
          </button>
        </div>

        {/* Clean Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-full border border-slate-200/70">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Search Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 hover:text-slate-900 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold transition-all group cursor-pointer shadow-2xs"
            title="Buscar municipio (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform" />
            <span>Buscar municipio</span>
            <kbd className="bg-white border border-slate-300 text-slate-400 text-[10px] px-1.5 py-0.5 rounded shadow-xs ml-1 font-mono font-bold">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-xl"
            aria-label="Buscar municipio"
          >
            <Search className="w-4 h-4 text-sky-600" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-xl"
            aria-label="Menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 mt-2 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors text-left ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 border border-sky-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-sky-500"></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold shadow-sm"
            >
              <Search className="w-4 h-4 text-sky-400" />
              <span>Buscar municipio...</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
