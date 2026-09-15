import React, { useState } from 'react';
import { 
  HistoricalFigure, 
  TriadRelationship, 
  TriadCenterNexus, 
  RelationshipDimension, 
  FigureId 
} from '../types';
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  BookOpen, 
  Compass, 
  Award, 
  HeartHandshake, 
  Atom, 
  Scale, 
  Layers, 
  Quote, 
  Calendar, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  Info,
  Feather,
  CheckCircle2,
  PenTool
} from 'lucide-react';
import { SceneIllustration } from './HistoricalVisualScenes';

interface RelationshipVisualizerProps {
  figures: HistoricalFigure[];
  relationships: TriadRelationship[];
  centerNexus: TriadCenterNexus;
  currentFigure?: HistoricalFigure | null;
  onSelectWriter?: (figure: HistoricalFigure) => void;
  onSelectPersona: (figure: HistoricalFigure) => void;
  onWriteLetterBetween: (senderId: FigureId, recipientId: string) => void;
  onProceedToStudio?: () => void;
}

export const RelationshipVisualizer: React.FC<RelationshipVisualizerProps> = ({
  figures,
  relationships,
  centerNexus,
  currentFigure,
  onSelectWriter,
  onSelectPersona,
  onWriteLetterBetween,
  onProceedToStudio,
}) => {
  const [activeDimension, setActiveDimension] = useState<RelationshipDimension>('all');
  const [selectedRelId, setSelectedRelId] = useState<string>('einstein-curie');
  const [selectedFigureId, setSelectedFigureId] = useState<FigureId | 'nexus' | null>(
    currentFigure ? (currentFigure.id as FigureId) : null
  );
  const [viewMode, setViewMode] = useState<'graph' | 'matrix'>('graph');
  const [writerToast, setWriterToast] = useState<string | null>(null);

  const handleNodeClick = (fig: HistoricalFigure) => {
    if (onSelectWriter) {
      onSelectWriter(fig);
    }
    setSelectedFigureId(fig.id as FigureId);
    if (fig.id === 'einstein') {
      setSelectedRelId('einstein-curie');
    } else if (fig.id === 'curie') {
      setSelectedRelId('einstein-curie');
    } else if (fig.id === 'tagore') {
      setSelectedRelId('einstein-tagore');
    }
    setWriterToast(`${fig.name} selected as active writer`);
    setTimeout(() => {
      setWriterToast(null);
    }, 3500);

    // Directly trigger writer persona selection and reveal network
    onSelectPersona(fig);
  };

  // Find figures
  const einstein = figures.find(f => f.id === 'einstein') || figures[0];
  const curie = figures.find(f => f.id === 'curie') || figures[1];
  const tagore = figures.find(f => f.id === 'tagore') || figures[2];

  // Active relationship
  const activeRelationship = relationships.find(r => r.id === selectedRelId) || relationships[0];

  // Figure positions in graph coordinate space (percentages)
  const nodePositions = {
    einstein: { x: 50, y: 16 },
    curie: { x: 18, y: 80 },
    tagore: { x: 82, y: 80 },
    nexus: { x: 50, y: 56 }
  };

  const getDimensionColor = (dim: RelationshipDimension) => {
    switch (dim) {
      case 'interpersonal': return 'text-amber-400 bg-amber-950/40 border-amber-800/60';
      case 'intellectual': return 'text-blue-400 bg-blue-950/40 border-blue-800/60';
      case 'ethical': return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/60';
      case 'institutional': return 'text-purple-400 bg-purple-950/40 border-purple-800/60';
      default: return 'text-amber-300 bg-[#241E17] border-[#8C7355]/40';
    }
  };

  return (
    <div id="relationship-visualizer-container" className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div id="visualizer-header" className="relative rounded-2xl bg-gradient-to-r from-[#1E1914] via-[#241E18] to-[#1E1914] border border-[#8C7355]/30 p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B8860B]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-[#B8860B]/15 text-[#D4AF37] border border-[#B8860B]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Worldwide Iconic Nexus • 3 Countries & Multi-Dimensional Bonds</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5EBE6] tracking-tight">
              The Interconnected Global Triad
            </h1>
            <p className="text-sm md:text-base text-[#D1C7BD] max-w-3xl leading-relaxed">
              Albert Einstein <span className="text-[#8C7355] font-serif">(Germany)</span>, Marie Curie <span className="text-[#8C7355] font-serif">(France/Poland)</span>, and Rabindranath Tagore <span className="text-[#8C7355] font-serif">(India)</span>. 
              Explore their interconnected relationships spanning <span className="text-[#E6D5B8] font-medium">personal camaraderie</span>, <span className="text-[#93C5FD] font-medium">relativistic science</span>, <span className="text-[#6EE7B7] font-medium">uncompromising ethics</span>, and the <span className="text-[#D8B4FE] font-medium">League of Nations ICIC</span>.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#15120E] p-1.5 rounded-xl border border-[#8C7355]/30 self-start md:self-center shrink-0">
            <button
              id="btn-mode-graph"
              onClick={() => setViewMode('graph')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'graph'
                  ? 'bg-[#B8860B] text-[#12100E] font-semibold shadow-md'
                  : 'text-[#A89F91] hover:text-[#F5EBE6]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Constellation Map</span>
            </button>
            <button
              id="btn-mode-matrix"
              onClick={() => setViewMode('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'matrix'
                  ? 'bg-[#B8860B] text-[#12100E] font-semibold shadow-md'
                  : 'text-[#A89F91] hover:text-[#F5EBE6]'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Multi-Dimension Matrix</span>
            </button>
          </div>
        </div>

        {/* Dimension Filter Bar */}
        <div id="dimension-filter-bar" className="mt-6 pt-5 border-t border-[#8C7355]/20 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#A89F91] font-mono mr-2 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Filter Lens:</span>
          </span>

          {[
            { id: 'all', label: 'All Dimensions', icon: Sparkles },
            { id: 'interpersonal', label: 'Direct Encounters & Letters', icon: HeartHandshake },
            { id: 'intellectual', label: 'Scientific & Philosophical Dialectic', icon: Atom },
            { id: 'ethical', label: 'Ethical Renunciation & Pacifism', icon: Scale },
            { id: 'institutional', label: 'League of Nations ICIC & Nobel Vanguard', icon: Award }
          ].map(dim => {
            const Icon = dim.icon;
            const isSelected = activeDimension === dim.id;
            return (
              <button
                key={dim.id}
                id={`filter-dim-${dim.id}`}
                onClick={() => setActiveDimension(dim.id as RelationshipDimension)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#B8860B] text-[#12100E] font-semibold shadow-md'
                    : 'bg-[#15120E]/80 text-[#C4B8A5] hover:text-[#F5EBE6] hover:bg-[#2A231C] border border-[#8C7355]/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{dim.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === 'graph' ? (
        /* GRAPH VIEW: Dynamic Triangular Constellation + Dossier */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Visual Graph (7 Cols) */}
          <div id="constellation-canvas-card" className="lg:col-span-7 bg-[#17130F] rounded-2xl border border-[#8C7355]/30 p-4 md:p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
            {/* Canvas Header with Active Writer Quick Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#8C7355]/20">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5" />
                  Active Writer:
                </span>
                <span className="text-xs font-serif font-bold text-[#F5EBE6] bg-[#241E17] px-2.5 py-0.5 rounded-full border border-[#8C7355]/40">
                  {currentFigure ? currentFigure.name : 'Select a Node below to choose Writer'}
                </span>
              </div>
              <span className="text-[11px] text-[#A89F91] font-sans">
                <span className="text-[#D4AF37] font-semibold">Click any figure node</span> to select writer
              </span>
            </div>

            {/* SVG Visual Canvas Area */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl bg-radial from-[#241E17]/60 via-[#14110E] to-[#0D0B09] border border-[#8C7355]/20 p-4 flex items-center justify-center overflow-hidden">
              
              {/* Background ambient grid lines */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#8C7355_1px,transparent_1px)] [background-size:24px_24px]" />

              {/* Center Decorative Rings */}
              <div className="absolute w-72 h-72 rounded-full border border-[#8C7355]/15 animate-spin [animation-duration:120s] pointer-events-none" />
              <div className="absolute w-96 h-96 rounded-full border border-dashed border-[#8C7355]/10 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  {/* Gradients for links */}
                  <linearGradient id="grad-einstein-curie" x1="50%" y1="16%" x2="18%" y2="80%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="grad-einstein-tagore" x1="50%" y1="16%" x2="82%" y2="80%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
                  </linearGradient>
                  <linearGradient id="grad-curie-tagore" x1="18%" y1="80%" x2="82%" y2="80%">
                    <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                  </linearGradient>
                  {/* Filter glow */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Triad Lines */}
                {/* 1. Einstein to Curie */}
                <line
                  x1={`${nodePositions.einstein.x}%`}
                  y1={`${nodePositions.einstein.y}%`}
                  x2={`${nodePositions.curie.x}%`}
                  y2={`${nodePositions.curie.y}%`}
                  stroke={selectedRelId === 'einstein-curie' ? 'url(#grad-einstein-curie)' : '#5A4A3A'}
                  strokeWidth={selectedRelId === 'einstein-curie' ? 4 : 2}
                  strokeDasharray={activeDimension !== 'all' ? '6 4' : 'none'}
                  filter={selectedRelId === 'einstein-curie' ? 'url(#glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* 2. Einstein to Tagore */}
                <line
                  x1={`${nodePositions.einstein.x}%`}
                  y1={`${nodePositions.einstein.y}%`}
                  x2={`${nodePositions.tagore.x}%`}
                  y2={`${nodePositions.tagore.y}%`}
                  stroke={selectedRelId === 'einstein-tagore' ? 'url(#grad-einstein-tagore)' : '#5A4A3A'}
                  strokeWidth={selectedRelId === 'einstein-tagore' ? 4 : 2}
                  strokeDasharray={activeDimension !== 'all' ? '6 4' : 'none'}
                  filter={selectedRelId === 'einstein-tagore' ? 'url(#glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* 3. Curie to Tagore */}
                <line
                  x1={`${nodePositions.curie.x}%`}
                  y1={`${nodePositions.curie.y}%`}
                  x2={`${nodePositions.tagore.x}%`}
                  y2={`${nodePositions.tagore.y}%`}
                  stroke={selectedRelId === 'curie-tagore' ? 'url(#grad-curie-tagore)' : '#5A4A3A'}
                  strokeWidth={selectedRelId === 'curie-tagore' ? 4 : 2}
                  strokeDasharray={activeDimension !== 'all' ? '6 4' : 'none'}
                  filter={selectedRelId === 'curie-tagore' ? 'url(#glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Center Spokes to Nexus */}
                <line
                  x1={`${nodePositions.einstein.x}%`}
                  y1={`${nodePositions.einstein.y}%`}
                  x2={`${nodePositions.nexus.x}%`}
                  y2={`${nodePositions.nexus.y}%`}
                  stroke="#8C7355"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
                <line
                  x1={`${nodePositions.curie.x}%`}
                  y1={`${nodePositions.curie.y}%`}
                  x2={`${nodePositions.nexus.x}%`}
                  y2={`${nodePositions.nexus.y}%`}
                  stroke="#8C7355"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
                <line
                  x1={`${nodePositions.tagore.x}%`}
                  y1={`${nodePositions.tagore.y}%`}
                  x2={`${nodePositions.nexus.x}%`}
                  y2={`${nodePositions.nexus.y}%`}
                  stroke="#8C7355"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
              </svg>

              {/* Edge Interactive Badges / Buttons (Positioned along lines) */}
              {/* Edge 1: Einstein ⇄ Curie */}
              <button
                id="edge-btn-einstein-curie"
                onClick={() => {
                  setSelectedRelId('einstein-curie');
                  setSelectedFigureId(null);
                }}
                style={{
                  left: '32%',
                  top: '46%',
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-20 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium transition-all shadow-lg flex items-center gap-1.5 ${
                  selectedRelId === 'einstein-curie'
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400 scale-105 shadow-blue-900/50'
                    : 'bg-[#1C1712] text-[#D1C7BD] hover:text-white border border-[#8C7355]/40 hover:border-blue-400'
                }`}
              >
                <Atom className="w-3 h-3 text-blue-400" />
                <span>E=mc² & Alpine Hike</span>
              </button>

              {/* Edge 2: Einstein ⇄ Tagore */}
              <button
                id="edge-btn-einstein-tagore"
                onClick={() => {
                  setSelectedRelId('einstein-tagore');
                  setSelectedFigureId(null);
                }}
                style={{
                  left: '68%',
                  top: '46%',
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-20 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium transition-all shadow-lg flex items-center gap-1.5 ${
                  selectedRelId === 'einstein-tagore'
                    ? 'bg-amber-600 text-white ring-2 ring-amber-400 scale-105 shadow-amber-900/50'
                    : 'bg-[#1C1712] text-[#D1C7BD] hover:text-white border border-[#8C7355]/40 hover:border-amber-400'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>1930 Caputh Truth</span>
              </button>

              {/* Edge 3: Curie ⇄ Tagore */}
              <button
                id="edge-btn-curie-tagore"
                onClick={() => {
                  setSelectedRelId('curie-tagore');
                  setSelectedFigureId(null);
                }}
                style={{
                  left: '50%',
                  top: '84%',
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-20 px-2.5 py-1 rounded-full text-[11px] font-sans font-medium transition-all shadow-lg flex items-center gap-1.5 ${
                  selectedRelId === 'curie-tagore'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 scale-105 shadow-emerald-900/50'
                    : 'bg-[#1C1712] text-[#D1C7BD] hover:text-white border border-[#8C7355]/40 hover:border-emerald-400'
                }`}
              >
                <Award className="w-3 h-3 text-emerald-400" />
                <span>Nobel Vanguard & Ethics</span>
              </button>

              {/* CENTER NEXUS NODE */}
              <button
                id="node-btn-nexus"
                onClick={() => {
                  setSelectedFigureId('nexus');
                }}
                style={{
                  left: `${nodePositions.nexus.x}%`,
                  top: `${nodePositions.nexus.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute z-20 p-3 rounded-2xl transition-all shadow-2xl flex flex-col items-center gap-1 text-center max-w-[170px] ${
                  selectedFigureId === 'nexus'
                    ? 'bg-gradient-to-br from-[#8C7355] to-[#B8860B] text-[#12100E] font-bold ring-4 ring-[#D4AF37] scale-105'
                    : 'bg-[#1F1914] text-[#E8DCCB] border border-[#B8860B]/50 hover:border-[#D4AF37] hover:scale-105'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-[#12100E]/80 flex items-center justify-center text-[#D4AF37]">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-serif font-bold leading-tight">
                  League of Nations ICIC
                </span>
                <span className="text-[9px] text-[#A89F91] uppercase tracking-wider font-mono">
                  1920s Geneva Confluence
                </span>
              </button>

              {/* NODE 1: Albert Einstein */}
              <div
                id="node-einstein"
                style={{
                  left: `${nodePositions.einstein.x}%`,
                  top: `${nodePositions.einstein.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 flex flex-col items-center"
              >
                {/* Active Writer Indicator Pill */}
                {currentFigure?.id === 'einstein' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#12100E] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-xl ring-1 ring-white/30 whitespace-nowrap">
                    <Feather className="w-3 h-3" />
                    <span>Selected Writer</span>
                  </div>
                )}

                <button
                  id="btn-node-einstein"
                  onClick={() => handleNodeClick(einstein)}
                  className={`relative p-3 md:p-3.5 rounded-2xl transition-all flex flex-col items-center gap-2 shadow-2xl group text-left ${
                    currentFigure?.id === 'einstein'
                      ? 'bg-[#2E2419] ring-4 ring-[#D4AF37] border-2 border-[#F5D580] scale-105 shadow-[#D4AF37]/30'
                      : selectedFigureId === 'einstein'
                      ? 'bg-[#2A231C] ring-4 ring-blue-500 scale-105 border border-blue-400'
                      : 'bg-[#1C1712] border border-[#8C7355]/40 hover:border-[#D4AF37] hover:scale-102 hover:bg-[#251E17]'
                  }`}
                  title={currentFigure?.id === 'einstein' ? 'Albert Einstein is active writer' : 'Click to select Albert Einstein as writer'}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif font-bold text-base shadow-inner transition-colors ${
                      currentFigure?.id === 'einstein'
                        ? 'bg-gradient-to-br from-[#B8860B] to-[#8C6409] text-[#14100C] border border-[#F5D580]'
                        : 'bg-blue-950/60 border border-blue-600/50 text-blue-300'
                    }`}>
                      AE
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold">
                        Germany / Switzerland
                      </div>
                      <div className="text-sm font-serif font-bold text-[#F5EBE6] group-hover:text-[#D4AF37] transition-colors">
                        Albert Einstein
                      </div>
                      <div className="text-[10px] text-[#A89F91]">
                        1879 – 1955 • Spacetime
                      </div>
                    </div>
                  </div>

                  {/* Writer Status / Selection Affordance */}
                  <div className="w-full pt-1.5 border-t border-[#8C7355]/20 flex items-center justify-between text-[10px] font-mono gap-2">
                    {currentFigure?.id === 'einstein' ? (
                      <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active Writer
                      </span>
                    ) : (
                      <span className="text-[#A89F91] group-hover:text-[#D4AF37] flex items-center gap-1">
                        <PenTool className="w-2.5 h-2.5" /> Click to Select
                      </span>
                    )}
                    {currentFigure?.id === 'einstein' && (
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onProceedToStudio) {
                            onProceedToStudio();
                          } else {
                            onSelectPersona(einstein);
                          }
                        }}
                        className="text-[10px] bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E] font-sans font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 cursor-pointer transition"
                      >
                        <Send className="w-2.5 h-2.5" /> Studio
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {/* NODE 2: Marie Curie */}
              <div
                id="node-curie"
                style={{
                  left: `${nodePositions.curie.x}%`,
                  top: `${nodePositions.curie.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 flex flex-col items-center"
              >
                {/* Active Writer Indicator Pill */}
                {currentFigure?.id === 'curie' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#12100E] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-xl ring-1 ring-white/30 whitespace-nowrap">
                    <Feather className="w-3 h-3" />
                    <span>Selected Writer</span>
                  </div>
                )}

                <button
                  id="btn-node-curie"
                  onClick={() => handleNodeClick(curie)}
                  className={`relative p-3 md:p-3.5 rounded-2xl transition-all flex flex-col items-center gap-2 shadow-2xl group text-left ${
                    currentFigure?.id === 'curie'
                      ? 'bg-[#2E2419] ring-4 ring-[#D4AF37] border-2 border-[#F5D580] scale-105 shadow-[#D4AF37]/30'
                      : selectedFigureId === 'curie'
                      ? 'bg-[#2A231C] ring-4 ring-purple-500 scale-105 border border-purple-400'
                      : 'bg-[#1C1712] border border-[#8C7355]/40 hover:border-[#D4AF37] hover:scale-102 hover:bg-[#251E17]'
                  }`}
                  title={currentFigure?.id === 'curie' ? 'Marie Curie is active writer' : 'Click to select Marie Curie as writer'}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif font-bold text-base shadow-inner transition-colors ${
                      currentFigure?.id === 'curie'
                        ? 'bg-gradient-to-br from-[#B8860B] to-[#8C6409] text-[#14100C] border border-[#F5D580]'
                        : 'bg-purple-950/60 border border-purple-600/50 text-purple-300'
                    }`}>
                      MC
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold">
                        France / Poland
                      </div>
                      <div className="text-sm font-serif font-bold text-[#F5EBE6] group-hover:text-[#D4AF37] transition-colors">
                        Marie Curie
                      </div>
                      <div className="text-[10px] text-[#A89F91]">
                        1867 – 1934 • Radioactivity
                      </div>
                    </div>
                  </div>

                  {/* Writer Status / Selection Affordance */}
                  <div className="w-full pt-1.5 border-t border-[#8C7355]/20 flex items-center justify-between text-[10px] font-mono gap-2">
                    {currentFigure?.id === 'curie' ? (
                      <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active Writer
                      </span>
                    ) : (
                      <span className="text-[#A89F91] group-hover:text-[#D4AF37] flex items-center gap-1">
                        <PenTool className="w-2.5 h-2.5" /> Click to Select
                      </span>
                    )}
                    {currentFigure?.id === 'curie' && (
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onProceedToStudio) {
                            onProceedToStudio();
                          } else {
                            onSelectPersona(curie);
                          }
                        }}
                        className="text-[10px] bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E] font-sans font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 cursor-pointer transition"
                      >
                        <Send className="w-2.5 h-2.5" /> Studio
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {/* NODE 3: Rabindranath Tagore */}
              <div
                id="node-tagore"
                style={{
                  left: `${nodePositions.tagore.x}%`,
                  top: `${nodePositions.tagore.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 flex flex-col items-center"
              >
                {/* Active Writer Indicator Pill */}
                {currentFigure?.id === 'tagore' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#12100E] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-xl ring-1 ring-white/30 whitespace-nowrap">
                    <Feather className="w-3 h-3" />
                    <span>Selected Writer</span>
                  </div>
                )}

                <button
                  id="btn-node-tagore"
                  onClick={() => handleNodeClick(tagore)}
                  className={`relative p-3 md:p-3.5 rounded-2xl transition-all flex flex-col items-center gap-2 shadow-2xl group text-left ${
                    currentFigure?.id === 'tagore'
                      ? 'bg-[#2E2419] ring-4 ring-[#D4AF37] border-2 border-[#F5D580] scale-105 shadow-[#D4AF37]/30'
                      : selectedFigureId === 'tagore'
                      ? 'bg-[#2A231C] ring-4 ring-amber-500 scale-105 border border-amber-400'
                      : 'bg-[#1C1712] border border-[#8C7355]/40 hover:border-[#D4AF37] hover:scale-102 hover:bg-[#251E17]'
                  }`}
                  title={currentFigure?.id === 'tagore' ? 'Rabindranath Tagore is active writer' : 'Click to select Rabindranath Tagore as writer'}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-serif font-bold text-base shadow-inner transition-colors ${
                      currentFigure?.id === 'tagore'
                        ? 'bg-gradient-to-br from-[#B8860B] to-[#8C6409] text-[#14100C] border border-[#F5D580]'
                        : 'bg-amber-950/60 border border-amber-600/50 text-amber-300'
                    }`}>
                      RT
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                        India (Bengal)
                      </div>
                      <div className="text-sm font-serif font-bold text-[#F5EBE6] group-hover:text-[#D4AF37] transition-colors">
                        Rabindranath Tagore
                      </div>
                      <div className="text-[10px] text-[#A89F91]">
                        1861 – 1941 • Humanism
                      </div>
                    </div>
                  </div>

                  {/* Writer Status / Selection Affordance */}
                  <div className="w-full pt-1.5 border-t border-[#8C7355]/20 flex items-center justify-between text-[10px] font-mono gap-2">
                    {currentFigure?.id === 'tagore' ? (
                      <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Active Writer
                      </span>
                    ) : (
                      <span className="text-[#A89F91] group-hover:text-[#D4AF37] flex items-center gap-1">
                        <PenTool className="w-2.5 h-2.5" /> Click to Select
                      </span>
                    )}
                    {currentFigure?.id === 'tagore' && (
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onProceedToStudio) {
                            onProceedToStudio();
                          } else {
                            onSelectPersona(tagore);
                          }
                        }}
                        className="text-[10px] bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E] font-sans font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 cursor-pointer transition"
                      >
                        <Send className="w-2.5 h-2.5" /> Studio
                      </span>
                    )}
                  </div>
                </button>
              </div>

            </div>

            {/* Quick Actions Row under Graph */}
            <div className="mt-4 pt-4 border-t border-[#8C7355]/20 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-[#A89F91] flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#D4AF37]" />
                {currentFigure ? (
                  <span>
                    Active Writer: <strong className="text-[#D4AF37] font-serif">{currentFigure.name}</strong>. Click another node to switch.
                  </span>
                ) : (
                  <span>Click any figure node above to select your letter writer.</span>
                )}
              </span>
              <div className="flex items-center gap-2">
                {currentFigure && (
                  <button
                    id="btn-quick-enter-studio"
                    onClick={() => {
                      if (onProceedToStudio) {
                        onProceedToStudio();
                      } else {
                        onSelectPersona(currentFigure);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#241E17] hover:bg-[#B8860B] hover:text-[#12100E] text-[#D4AF37] border border-[#B8860B]/50 font-medium text-xs shadow-md transition-all font-serif"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enter Studio as {currentFigure.name.split(' ')[0]}</span>
                  </button>
                )}
                <button
                  id="btn-quick-write-active"
                  onClick={() => {
                    if (activeRelationship) {
                      onWriteLetterBetween(activeRelationship.sourceId, activeRelationship.targetId);
                    }
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E] font-medium text-xs shadow-md transition-all font-serif"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Draft Letter Across This Bond</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Detailed Dossier Panel (5 Cols) */}
          <div id="relationship-dossier-panel" className="lg:col-span-5 space-y-6">
            
            {/* If Nexus Selected */}
            {selectedFigureId === 'nexus' ? (
              <div id="nexus-dossier-card" className="bg-[#1C1712] rounded-2xl border border-[#D4AF37]/40 p-6 md:p-7 shadow-2xl space-y-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#B8860B]/20 text-[#D4AF37] border border-[#B8860B]/30">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Historical Nexus Point</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#F5EBE6] pt-2">
                    {centerNexus.title}
                  </h2>
                  <p className="text-xs font-serif text-[#C4B8A5]">
                    {centerNexus.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#D1C7BD] leading-relaxed">
                  {centerNexus.description}
                </p>

                {/* 4 Pillars */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#A89F91]">
                    Shared Foundations of the Triad
                  </h3>
                  {centerNexus.sharedPillars.map((p, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#15120E] border border-[#8C7355]/20 space-y-1">
                      <div className="text-xs font-serif font-bold text-[#E6D5B8]">
                        {p.title}
                      </div>
                      <div className="text-xs text-[#A89F91] leading-relaxed">
                        {p.detail}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#241E17] border border-[#8C7355]/30 text-xs text-[#E6D5B8] leading-relaxed italic">
                  "{centerNexus.historicalImpact}"
                </div>
              </div>
            ) : selectedFigureId ? (
              /* Figure Bio Focus */
              (() => {
                const fig = figures.find(f => f.id === selectedFigureId) || einstein;
                const isCurrentWriter = currentFigure?.id === fig.id;
                return (
                  <div id="figure-dossier-card" className="bg-[#1C1712] rounded-2xl border border-[#8C7355]/40 p-6 md:p-7 shadow-2xl space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                            {fig.country} • {fig.years}
                          </span>
                          {isCurrentWriter && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5" /> Selected Writer
                            </span>
                          )}
                        </div>
                        <h2 className="text-2xl font-serif font-bold text-[#F5EBE6] mt-1">
                          {fig.name}
                        </h2>
                        <p className="text-xs font-serif text-[#C4B8A5]">
                          {fig.epithet}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <button
                          id="btn-choose-this-persona"
                          onClick={() => handleNodeClick(fig)}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow transition-all flex items-center gap-1.5 ${
                            isCurrentWriter
                              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                              : 'bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E]'
                          }`}
                        >
                          <Feather className="w-3.5 h-3.5" />
                          <span>{isCurrentWriter ? 'Selected Writer' : 'Select as Writer'}</span>
                        </button>
                        <button
                          onClick={() => onSelectPersona(fig)}
                          className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1"
                        >
                          <span>Open Full Network ({fig.recipients.length})</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#15120E] border border-[#8C7355]/20 text-xs text-[#E6D5B8] italic font-serif leading-relaxed">
                      "{fig.mindsetQuote}"
                    </div>

                    <p className="text-sm text-[#D1C7BD] leading-relaxed">
                      {fig.historicalBio}
                    </p>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#A89F91]">
                        Cross-Connections in this Triad:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {relationships
                          .filter(r => r.sourceId === fig.id || r.targetId === fig.id)
                          .map(r => {
                            const otherId = r.sourceId === fig.id ? r.targetId : r.sourceId;
                            const otherFigure = figures.find(f => f.id === otherId);
                            return (
                              <div
                                key={r.id}
                                className="p-3 rounded-xl bg-[#15120E] border border-[#8C7355]/30 flex items-center justify-between transition-all"
                              >
                                <button
                                  onClick={() => {
                                    setSelectedRelId(r.id);
                                    setSelectedFigureId(null);
                                  }}
                                  className="text-left flex-1 hover:opacity-90"
                                >
                                  <div className="text-xs font-serif font-bold text-[#F5EBE6]">
                                    Bond with {otherFigure?.name}
                                  </div>
                                  <div className="text-[11px] text-[#A89F91]">
                                    {r.visualBadge}
                                  </div>
                                </button>

                                <button
                                  onClick={() => {
                                    handleNodeClick(fig);
                                    onWriteLetterBetween(fig.id, otherId);
                                  }}
                                  className="ml-3 px-2.5 py-1 rounded bg-[#241E17] hover:bg-[#B8860B] hover:text-[#12100E] text-[#D4AF37] border border-[#8C7355]/40 text-[11px] font-sans flex items-center gap-1 transition-all"
                                  title={`Draft letter from ${fig.name} to ${otherFigure?.name}`}
                                >
                                  <Send className="w-3 h-3" />
                                  <span>Draft Letter</span>
                                </button>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Relationship Deep Dive */
              <div id="relationship-detail-card" className="bg-[#1C1712] rounded-2xl border border-[#8C7355]/40 p-6 md:p-7 shadow-2xl space-y-6">
                {/* Visual Scene Banner */}
                <div className="relative rounded-xl overflow-hidden h-36 w-full border border-[#D4AF37]/30 bg-[#120B07] shadow-lg">
                  <SceneIllustration 
                    sceneType={activeRelationship.title} 
                    title={activeRelationship.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1712] via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-[#120B07]/85 border border-[#D4AF37]/50 text-[10px] font-mono text-[#D4AF37] flex items-center gap-1.5 shadow">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Archival Vignette</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#B8860B]/20 text-[#D4AF37] border border-[#B8860B]/30">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>{activeRelationship.visualBadge}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-[#F5EBE6] pt-1">
                    {activeRelationship.title}
                  </h2>
                  <p className="text-xs font-serif text-[#C4B8A5]">
                    {activeRelationship.epithet}
                  </p>
                </div>

                <p className="text-sm text-[#D1C7BD] leading-relaxed">
                  {activeRelationship.summary}
                </p>

                {/* Specific Dimension Breakdown */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A89F91] flex items-center justify-between">
                    <span>Dimension Focus:</span>
                    <span className="text-[#D4AF37] font-semibold capitalize">{activeDimension}</span>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-[#15120E] border border-[#8C7355]/30 space-y-2">
                    {activeDimension === 'all' || activeDimension === 'interpersonal' ? (
                      <div className="space-y-1">
                        <div className="text-xs font-serif font-bold text-[#E6D5B8] flex items-center gap-1.5">
                          <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                          <span>Direct Encounters & Letters</span>
                        </div>
                        <p className="text-xs text-[#C4B8A5] leading-relaxed">
                          {activeRelationship.dimensions.interpersonal}
                        </p>
                      </div>
                    ) : null}

                    {activeDimension === 'all' || activeDimension === 'intellectual' ? (
                      <div className="space-y-1 pt-2 border-t border-[#8C7355]/15">
                        <div className="text-xs font-serif font-bold text-[#93C5FD] flex items-center gap-1.5">
                          <Atom className="w-3.5 h-3.5 text-blue-400" />
                          <span>Scientific & Philosophical Dialectic</span>
                        </div>
                        <p className="text-xs text-[#C4B8A5] leading-relaxed">
                          {activeRelationship.dimensions.intellectual}
                        </p>
                      </div>
                    ) : null}

                    {activeDimension === 'all' || activeDimension === 'ethical' ? (
                      <div className="space-y-1 pt-2 border-t border-[#8C7355]/15">
                        <div className="text-xs font-serif font-bold text-[#6EE7B7] flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Ethical Renunciation & Anti-Militarism</span>
                        </div>
                        <p className="text-xs text-[#C4B8A5] leading-relaxed">
                          {activeRelationship.dimensions.ethical}
                        </p>
                      </div>
                    ) : null}

                    {activeDimension === 'all' || activeDimension === 'institutional' ? (
                      <div className="space-y-1 pt-2 border-t border-[#8C7355]/15">
                        <div className="text-xs font-serif font-bold text-[#D8B4FE] flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-purple-400" />
                          <span>Institutional Vanguard (ICIC & Nobel)</span>
                        </div>
                        <p className="text-xs text-[#C4B8A5] leading-relaxed">
                          {activeRelationship.dimensions.institutional}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Primary Historical Quotes */}
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A89F91] flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Surviving Archival Evidence</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {activeRelationship.primaryExcerpts.map((excerpt, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#15120E] border border-[#8C7355]/20 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-[#A89F91]">
                          <span className="font-semibold text-[#D4AF37]">{excerpt.speaker}</span>
                          <span>{excerpt.year}</span>
                        </div>
                        <div className="text-xs text-[#E6D5B8] font-serif italic whitespace-pre-line leading-relaxed">
                          "{excerpt.quote}"
                        </div>
                        <div className="text-[10px] text-[#8C7355] font-mono">
                          Source: {excerpt.source}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shared Timeline Milestones */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#A89F91] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Intersection Timeline</span>
                  </div>
                  <div className="space-y-2">
                    {activeRelationship.sharedEvents.map((evt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs">
                        <span className="font-mono font-bold text-[#D4AF37] text-[11px] px-1.5 py-0.5 rounded bg-[#251F19] border border-[#8C7355]/30 shrink-0">
                          {evt.year}
                        </span>
                        <div>
                          <div className="font-serif font-bold text-[#F5EBE6]">
                            {evt.title}
                          </div>
                          <div className="text-[11px] text-[#A89F91]">
                            {evt.description} {evt.location ? `• ${evt.location}` : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to action to write letter */}
                <div className="pt-2">
                  <button
                    id="btn-compose-between-pair"
                    onClick={() => onWriteLetterBetween(activeRelationship.sourceId, activeRelationship.targetId)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E] font-serif font-bold text-sm shadow-xl transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Step Into Studio: Write Historical Letter Between Them</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>
      ) : (
        /* MATRIX VIEW: Side-by-Side Comparison of the 3 Relationships Across Dimensions */
        <div id="relationship-matrix-card" className="bg-[#17130F] rounded-2xl border border-[#8C7355]/30 p-6 shadow-2xl overflow-x-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-serif font-bold text-[#F5EBE6]">
              Multi-Dimensional Relationship Comparison Matrix
            </h2>
            <p className="text-xs text-[#A89F91] mt-1">
              Analyze how the 3 worldwide icons intersect across interpersonal, scientific, ethical, and institutional planes.
            </p>
          </div>

          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#8C7355]/30 text-xs font-mono uppercase text-[#D4AF37]">
                <th className="py-3 px-4 w-1/4">Relationship Pair</th>
                <th className="py-3 px-4 w-1/4">Interpersonal & Epistolary</th>
                <th className="py-3 px-4 w-1/4">Intellectual & Dialectic</th>
                <th className="py-3 px-4 w-1/4">Ethical & Institutional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8C7355]/20 text-xs">
              {relationships.map(rel => {
                const src = figures.find(f => f.id === rel.sourceId);
                const tgt = figures.find(f => f.id === rel.targetId);
                return (
                  <tr key={rel.id} className="hover:bg-[#1E1914] transition-colors">
                    <td className="py-4 px-4 align-top">
                      <div className="font-serif font-bold text-base text-[#F5EBE6]">
                        {src?.name} ⇄ {tgt?.name}
                      </div>
                      <div className="text-xs text-[#D4AF37] font-serif mt-0.5">
                        {rel.title}
                      </div>
                      <div className="mt-3">
                        <button
                          onClick={() => onWriteLetterBetween(rel.sourceId, rel.targetId)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E] font-medium text-[11px] shadow transition-all font-serif"
                        >
                          <Send className="w-3 h-3" />
                          <span>Compose Letter</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed">
                      {rel.dimensions.interpersonal}
                    </td>
                    <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed">
                      {rel.dimensions.intellectual}
                    </td>
                    <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed space-y-2">
                      <div>
                        <span className="font-semibold text-[#6EE7B7]">Ethical:</span> {rel.dimensions.ethical}
                      </div>
                      <div className="pt-1 border-t border-[#8C7355]/10">
                        <span className="font-semibold text-[#D8B4FE]">Institutional:</span> {rel.dimensions.institutional}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Triad Celebrities Cards Row */}
      <div id="triad-portraits-row" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[einstein, curie, tagore].map((fig) => {
          const isSelected = currentFigure?.id === fig.id;
          return (
            <div
              key={fig.id}
              className={`rounded-2xl bg-[#17130F] border p-6 flex flex-col justify-between space-y-4 transition-all shadow-xl ${
                isSelected
                  ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 bg-[#1E1914]'
                  : 'border-[#8C7355]/30 hover:border-[#D4AF37]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                    {fig.country}
                  </span>
                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Writer
                      </span>
                    )}
                    <span className="text-xs font-mono text-[#A89F91]">
                      {fig.years}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F5EBE6]">
                  {fig.name}
                </h3>
                <p className="text-xs font-serif text-[#C4B8A5]">
                  {fig.epithet}
                </p>
                <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3 pt-1">
                  {fig.historicalBio}
                </p>
              </div>

              <div className="pt-3 border-t border-[#8C7355]/20 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleNodeClick(fig)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#241E17] hover:bg-[#B8860B] hover:text-[#12100E] text-[#D4AF37] border border-[#B8860B]/40'
                  }`}
                >
                  <Feather className="w-3 h-3" />
                  <span>{isSelected ? 'Active Writer' : 'Select Writer'}</span>
                </button>
                <button
                  onClick={() => onSelectPersona(fig)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-[#F5EBE6] transition-colors"
                >
                  <span>Network</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Active Writer Toast Notification */}
      {writerToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#241E17] border border-[#D4AF37] text-[#F5EBE6] shadow-2xl animate-bounce">
          <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#12100E] flex items-center justify-center font-bold">
            <Feather className="w-4 h-4" />
          </div>
          <div>
            <div className="font-serif font-bold text-xs text-[#D4AF37]">
              {writerToast}
            </div>
            <div className="text-[11px] text-[#C4B8A5]">
              Historical voice, instruments, and networks engaged.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
