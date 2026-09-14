import React, { useState, useEffect } from 'react';
import { DemoBanner } from './components/layout/DemoBanner';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';
import { LandingView } from './views/LandingView';
import { MunicipiosDirectoryView } from './views/MunicipiosDirectoryView';
import { MunicipalityDetailView } from './views/MunicipalityDetailView';
import { CompareView } from './views/CompareView';
import { DondeVaLaPlataView } from './views/DondeVaLaPlataView';
import { MetodologiaView } from './views/MetodologiaView';
import { AboutView } from './views/AboutView';
import { MUNICIPIOS_DATA, getMunicipioById } from './data/municipios';

export function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [selectedMunicipioId, setSelectedMunicipioId] = useState<string>('merlo');
  const [detailInitialTab, setDetailInitialTab] = useState<string>('resumen');
  const [compareIds, setCompareIds] = useState<string[]>(['merlo', 'moron', 'la-plata']);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Global key shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: string, params?: any) => {
    setCurrentView(view);
    if (params?.municipioId) {
      setSelectedMunicipioId(params.municipioId);
      if (params.tab) setDetailInitialTab(params.tab);
    }
    if (params?.compareIds) {
      setCompareIds(params.compareIds);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMunicipio = (id: string, tab: string = 'resumen') => {
    setSelectedMunicipioId(id);
    setDetailInitialTab(tab);
    setCurrentView('municipio-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompareSelected = (ids: string[]) => {
    setCompareIds(ids);
    setCurrentView('comparar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompareWithThis = (id: string) => {
    const otherId = id === 'merlo' ? 'moron' : 'merlo';
    setCompareIds([id, otherId]);
    setCurrentView('comparar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeMunicipio = getMunicipioById(selectedMunicipioId) || MUNICIPIOS_DATA[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-sky-500 selection:text-white">
      
      {/* Top Demo Disclaimer Banner */}
      <DemoBanner />

      {/* Modern Sticky Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Content Area */}
      <main className="flex-1 py-8 sm:py-12">
        {currentView === 'landing' && (
          <LandingView
            onNavigate={handleNavigate}
            onSelectMunicipio={handleSelectMunicipio}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentView === 'municipios' && (
          <MunicipiosDirectoryView
            onSelectMunicipio={handleSelectMunicipio}
            onCompareSelected={handleCompareSelected}
          />
        )}

        {currentView === 'municipio-detail' && (
          <MunicipalityDetailView
            municipio={activeMunicipio}
            initialTab={detailInitialTab}
            onBack={() => handleNavigate('municipios')}
            onCompareWithThis={handleCompareWithThis}
          />
        )}

        {currentView === 'comparar' && (
          <CompareView
            initialIds={compareIds}
            onSelectMunicipio={handleSelectMunicipio}
          />
        )}

        {currentView === 'donde-va-la-plata' && (
          <DondeVaLaPlataView />
        )}

        {currentView === 'metodologia' && (
          <MetodologiaView />
        )}

        {currentView === 'sobre-nosotros' && (
          <AboutView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Search Modal (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectMunicipio={handleSelectMunicipio}
      />

      {/* CivicTech Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

export default App;
