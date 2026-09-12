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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and App Title */}
        <div className="flex items-center space-x-3">
          <button 
            id="btn-header-logo-reset"
            onClick={() => onNavigateView('home-pens')}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#B8860B]/40 bg-[#1F1C18] text-[#D4AF37] shadow-inner transition hover:border-[#D4AF37]"
            title="Return to Home Desk"
          >
            <Feather className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span 
                onClick={() => onNavigateView('home-pens')}
                className="cursor-pointer font-cinzel text-xl font-bold tracking-wide text-[#F3EFE6] transition hover:text-[#D4AF37]"
              >
                E P I S T O L A
              </span>
              <span className="hidden rounded bg-[#2A241E] px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[#C49B45] uppercase sm:inline-block">
                Voices Across Epochs
              </span>
            </div>
            <p className="hidden text-xs text-[#A89F91] sm:block">
              Historical Celebrity Relationships & Epistolary Simulator
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-1.5 bg-[#1B1713] p-1 rounded-xl border border-[#342F2A]">
          {/* 0. Home Pens Desk Button */}
          <button
            id="nav-btn-home-pens"
            onClick={() => onNavigateView(currentFigure ? 'pen-scene' : 'home-pens')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'home-pens' || activeView === 'pen-scene'
                ? 'bg-[#B8860B] text-[#12100E] font-bold shadow-md'
                : 'text-[#D1C7BD] hover:text-[#F3EFE6] hover:bg-[#251F19]'
            }`}
          >
            <Feather className="h-3.5 w-3.5" />
            <span className="font-serif">Writing Desk</span>
          </button>

          {/* 1. Triad Relationship Map Button */}
          <button
            id="nav-btn-relationship-map"
            onClick={() => onNavigateView('relationship-map')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              activeView === 'relationship-map'
                ? 'bg-[#B8860B] text-[#12100E] font-bold shadow-md'
                : 'text-[#D1C7BD] hover:text-[#F3EFE6] hover:bg-[#251F19]'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="font-serif">Triad Map</span>
          </button>

          {/* 2. Choose Persona Button */}
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

          {/* 3. Revealed Network (if figure active) */}
          {currentFigure && (
            <button
              id="nav-btn-network-select"
              onClick={() => onNavigateView('network-select')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeView === 'network-select'
                  ? 'bg-[#B8860B] text-[#12100E] font-bold shadow-md'
                  : 'text-[#D1C7BD] hover:text-[#F3EFE6] hover:bg-[#251F19]'
              }`}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Network</span>
            </button>
          )}

          {/* 4. Letter Writing Desk (if figure active) */}
          {currentFigure && (
            <button
              id="nav-btn-desk"
              onClick={() => onNavigateView('desk')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                activeView === 'desk'
                  ? 'bg-[#B8860B] text-[#12100E] font-bold shadow-md'
                  : 'text-[#D1C7BD] hover:text-[#F3EFE6] hover:bg-[#251F19]'
              }`}
            >
              <Scroll className="h-3.5 w-3.5" />
              <span>Studio</span>
            </button>
          )}
        </div>

        {/* Right Actions: Writing Kit & System Diagram Info */}
        <div className="flex items-center space-x-2">
          {currentFigure && (
            <button
              id="btn-header-writing-kit"
              onClick={onOpenWritingKit}
              className="flex items-center space-x-1.5 rounded-lg border border-[#3D352C] bg-[#1F1A15] px-2.5 py-1.5 text-xs font-medium text-[#D4AF37] transition hover:border-[#B8860B] hover:bg-[#2A231C]"
              title="Inspect Era Writing Kit & Tools"
            >
              <Scroll className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Writing Kit</span>
            </button>
          )}

          {/* System Diagram Info Button */}
          <button
            id="btn-header-system-specs"
            onClick={onOpenSystemDiagram}
            className="flex items-center space-x-1.5 rounded-lg border border-[#B8860B]/50 bg-[#282117] px-3 py-1.5 text-xs font-semibold text-[#F0D58C] shadow-sm transition hover:border-[#E8C568] hover:bg-[#342A1D]"
            title="View System Architecture & Agent Diagram"
          >
            <Info className="h-4 w-4 text-[#D4AF37]" />
            <span className="hidden sm:inline">System Specs</span>
          </button>
        </div>

      </div>
    </header>
  );
};
