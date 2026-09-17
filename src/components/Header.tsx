import React from 'react';
import { Feather, Info, RotateCcw, Compass, Scroll, Cpu, Share2, Layers } from 'lucide-react';
import { HistoricalFigure } from '../types';

interface HeaderProps {
  currentFigure: HistoricalFigure | null;
  onReset: () => void;
  onOpenSystemDiagram: () => void;
  onOpenWritingKit: () => void;
  activeView: 'home-pens' | 'pen-scene' | 'relationship-map' | 'figure-select' | 'network-select' | 'desk';
  onNavigateView: (view: 'home-pens' | 'pen-scene' | 'relationship-map' | 'figure-select' | 'network-select' | 'desk') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentFigure,
  onReset,
  onOpenSystemDiagram,
  onOpenWritingKit,
  activeView,
  onNavigateView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#342F2A] bg-[#141210]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Title */}
        <div className="flex items-center space-x-3">
          <button 
            id="btn-header-logo-reset"
            onClick={() => onNavigateView('home-pens')}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#B8860B]/40 bg-[#1F1C18] text-[#D4AF37] shadow-inner transition hover:border-[#D4AF37]"
            title="Return to Writing Desk"
          >
            <Feather className="h-4 w-4" />
          </button>
          <div>
            <span 
              onClick={() => onNavigateView('home-pens')}
              className="cursor-pointer font-cinzel text-lg font-bold tracking-wider text-[#F3EFE6] transition hover:text-[#D4AF37]"
            >
              E P I S T O L A
            </span>
          </div>
        </div>

        {/* Streamlined Core Navigation */}
        <nav className="flex items-center space-x-1 bg-[#1B1713] p-1 rounded-xl border border-[#342F2A]">
          {/* 1. Desk */}
          <button
            id="nav-btn-home-pens"
            onClick={() => onNavigateView(currentFigure ? 'pen-scene' : 'home-pens')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'home-pens' || activeView === 'pen-scene' || activeView === 'desk'
                ? 'bg-[#B8860B] text-[#12100E] font-bold shadow-md'
                : 'text-[#D1C7BD] hover:text-[#F3EFE6] hover:bg-[#251F19]'
            }`}
          >
            <Feather className="h-3.5 w-3.5" />
            <span className="font-serif">Writing Desk</span>
          </button>

          {/* 2. Network Web (Authentic Correspondence Graph) */}
          <button
            id="nav-btn-network-graph"
            onClick={() => onNavigateView('relationship-map')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'relationship-map' || activeView === 'network-select'
                ? 'bg-[#B8860B] text-[#12100E] font-bold shadow-md'
                : 'text-[#D1C7BD] hover:text-[#F3EFE6] hover:bg-[#251F19]'
            }`}
            title="Authentic Epistolary Network Diagram"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="font-serif">Network Web</span>
          </button>

          {/* 4. Personas */}
          <button
            id="nav-btn-figure-select"
            onClick={() => onNavigateView('figure-select')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'figure-select'
                ? 'bg-[#B8860B] text-[#12100E] font-bold shadow-md'
                : 'text-[#D1C7BD] hover:text-[#F3EFE6] hover:bg-[#251F19]'
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Personas</span>
          </button>
        </nav>

        {/* Right Actions: System Diagram Button (PRESERVED & PROMINENT) */}
        <div className="flex items-center space-x-2">
          {currentFigure && (
            <button
              id="btn-header-writing-kit"
              onClick={onOpenWritingKit}
              className="hidden sm:flex items-center space-x-1.5 rounded-lg border border-[#3D352C] bg-[#1F1A15] px-2.5 py-1.5 text-xs font-medium text-[#D4AF37] transition hover:border-[#B8860B] hover:bg-[#2A231C]"
              title="Inspect Era Writing Kit & Tools"
            >
              <Scroll className="h-3.5 w-3.5" />
              <span>Writing Kit</span>
            </button>
          )}

          {/* Crucial: System Diagram Button */}
          <button
            id="btn-header-system-specs"
            onClick={onOpenSystemDiagram}
            className="flex items-center space-x-1.5 rounded-lg border border-[#B8860B] bg-[#2A2115] px-3 py-1.5 text-xs font-semibold text-[#F5D580] shadow-sm transition hover:border-[#F5D580] hover:bg-[#382B1B]"
            title="System Architecture & Diagram"
          >
            <Cpu className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="font-sans">System Diagram</span>
          </button>
        </div>

      </div>
    </header>
  );
};
