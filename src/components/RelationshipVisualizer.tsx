import React, { useState } from 'react';
import { 
  HistoricalFigure, 
  TriadRelationship, 
  TriadCenterNexus, 
  RelationshipDimension, 
  FigureId,
  Recipient 
} from '../types';
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  Compass, 
  Award, 
  HeartHandshake, 
  Atom, 
  Scale, 
  Layers, 
  Quote, 
  Calendar, 
  MapPin, 
  Feather, 
  CheckCircle2, 
  PenTool, 
  Clock, 
  ShieldAlert, 
  RefreshCw, 
  UserCheck, 
  Users, 
  BookOpen
} from 'lucide-react';

interface RelationshipVisualizerProps {
  figures: HistoricalFigure[];
  relationships?: TriadRelationship[];
  centerNexus?: TriadCenterNexus;
  currentFigure?: HistoricalFigure | null;
  onSelectWriter?: (figure: HistoricalFigure) => void;
  onSelectPersona: (figure: HistoricalFigure) => void;
  onWriteLetterBetween: (senderId: FigureId, recipientId: string) => void;
  onProceedToStudio?: () => void;
}

export const RelationshipVisualizer: React.FC<RelationshipVisualizerProps> = ({
  figures,
  currentFigure,
  onSelectWriter,
  onSelectPersona,
  onWriteLetterBetween,
  onProceedToStudio,
}) => {
  // If user has already selected a figure, focus on them; otherwise null (no forced center nexus)
  const [selectedFigureId, setSelectedFigureId] = useState<FigureId | null>(
    currentFigure ? (currentFigure.id as FigureId) : null
  );

  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>(null);
  const [activeDimension, setActiveDimension] = useState<RelationshipDimension>('all');
  const [viewMode, setViewMode] = useState<'constellation' | 'matrix'>('constellation');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // The currently focused figure (if any selected)
  const activeFigure = figures.find(f => f.id === selectedFigureId) || null;

  // Selected recipient within the active figure's network
  const activeRecipient: Recipient | null = activeFigure
    ? (activeFigure.recipients.find(r => r.id === selectedRecipientId) || activeFigure.recipients[0] || null)
    : null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectLuminary = (fig: HistoricalFigure) => {
    setSelectedFigureId(fig.id as FigureId);
    setSelectedRecipientId(fig.recipients[0]?.id || null);
    if (onSelectWriter) {
      onSelectWriter(fig);
    }
    showToast(`${fig.name} selected — correspondence network revealed`);
  };

  const handleClearSelection = () => {
    setSelectedFigureId(null);
    setSelectedRecipientId(null);
  };

  const handleDraftLetterTo = (recipient: Recipient) => {
    if (!activeFigure) return;
    if (onSelectWriter) {
      onSelectWriter(activeFigure);
    }
    onWriteLetterBetween(activeFigure.id as FigureId, recipient.id);
  };

  // Relation badge stylings
  const getRelationBadge = (type: string) => {
    switch (type) {
      case 'patron':
        return { label: 'Patronage & Court', color: 'bg-amber-950/70 text-amber-300 border-amber-600/50', icon: Award };
      case 'peer':
        return { label: 'Scientific / Intellectual Peer', color: 'bg-blue-950/70 text-blue-300 border-blue-600/50', icon: Atom };
      case 'political':
        return { label: 'Strategic & Diplomatic Ally', color: 'bg-emerald-950/70 text-emerald-300 border-emerald-600/50', icon: Scale };
      case 'kinship':
        return { label: 'Family & Intimate Confidant', color: 'bg-rose-950/70 text-rose-300 border-rose-600/50', icon: HeartHandshake };
      case 'disciple':
        return { label: 'Disciple & Studio Heir', color: 'bg-purple-950/70 text-purple-300 border-purple-600/50', icon: BookOpen };
      default:
        return { label: 'Correspondent', color: 'bg-neutral-900 text-neutral-300 border-neutral-700', icon: Feather };
    }
  };

  return (
    <div id="relationship-visualizer-container" className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Epistolary Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 bg-[#221B14] border border-[#D4AF37] text-[#F5EBE6] px-4 py-2.5 rounded-xl shadow-2xl text-xs font-serif animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div id="visualizer-header" className="relative rounded-2xl bg-gradient-to-r from-[#1A1510] via-[#241E18] to-[#1A1510] border border-[#8C7355]/30 p-6 md:p-8 shadow-2xl overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B8860B]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-[#B8860B]/15 text-[#D4AF37] border border-[#B8860B]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Epistolary Constellation • Individual Networks</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5EBE6] tracking-tight">
              {activeFigure 
                ? `${activeFigure.name}’s Correspondence Network` 
                : 'Historical Correspondence Constellation'}
            </h1>
            <p className="text-sm md:text-base text-[#D1C7BD] max-w-3xl leading-relaxed">
              {activeFigure ? (
                <>
                  Revealing authentic 1-to-1 historical correspondence for <span className="text-[#F5D580] font-semibold">{activeFigure.name}</span> ({activeFigure.country}, {activeFigure.era}). Orbiting nodes represent genuine historical recipients connected by real archival letters.
                </>
              ) : (
                <>
                  Historical luminaries lived across distinct centuries and continents. There is no artificial nexus: <span className="text-[#D4AF37] font-medium">select any writer below</span> to reveal their genuine circle of verified correspondents, transmission transit times, and primary source letters.
                </>
              )}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#15120E] p-1.5 rounded-xl border border-[#8C7355]/30 self-start md:self-center shrink-0">
            <button
              id="btn-mode-graph"
              onClick={() => setViewMode('constellation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'constellation'
                  ? 'bg-[#B8860B] text-[#12100E] font-semibold shadow-md'
                  : 'text-[#A89F91] hover:text-[#F5EBE6]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Network Constellation</span>
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
              <span>Relationship Matrix</span>
            </button>
          </div>
        </div>

        {/* Luminary Selector Tabs / Quick Switch */}
        <div className="mt-6 pt-5 border-t border-[#8C7355]/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-[#A89F91] font-mono mr-1 flex items-center gap-1.5">
              <Feather className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Luminaries:</span>
            </span>

            {figures.map(fig => {
              const isSelected = activeFigure?.id === fig.id;
              return (
                <button
                  key={fig.id}
                  id={`btn-select-luminary-${fig.id}`}
                  onClick={() => handleSelectLuminary(fig)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#12100E] font-bold shadow-md scale-105 ring-2 ring-[#F5D580]'
                      : 'bg-[#15120E] text-[#C4B8A5] hover:text-[#F5EBE6] hover:bg-[#2A231C] border border-[#8C7355]/30'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current opacity-70" />
                  <span>{fig.name}</span>
                  <span className="text-[10px] font-mono opacity-60">({fig.recipients.length})</span>
                </button>
              );
            })}
          </div>

          {activeFigure && (
            <button
              onClick={handleClearSelection}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-[#A89F91] hover:text-[#F5EBE6] hover:bg-[#241E17] border border-[#8C7355]/20 transition"
              title="Return to unselected view of all luminaries"
            >
              <RefreshCw className="w-3 h-3" />
              <span>View All Luminaries</span>
            </button>
          )}
        </div>
      </div>

      {viewMode === 'constellation' ? (
        /* CONSTELLATION GRAPH MODE */
        <div>
          {!activeFigure ? (
            /* STATE A: NO WRITER SELECTED YET (NO CENTER NEXUS, NO FORCED LINES) */
            <div id="unselected-luminaries-stage" className="space-y-6">
              <div className="bg-[#191511]/80 rounded-2xl border border-[#8C7355]/30 p-6 md:p-8 backdrop-blur-sm text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/40 text-[#D4AF37] mx-auto flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#F5EBE6]">
                  Select a Historical Luminary
                </h2>
                <p className="text-sm text-[#C4B8A5] max-w-2xl mx-auto leading-relaxed">
                  Each historical figure operated within their own distinct epistolary sphere, geography, and social conventions. Click any luminary below to reveal their authentic correspondence network and explore their primary source letters.
                </p>
              </div>

              {/* Luminaries Independent Grid (No artificial lines or fake center nexus) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {figures.map(fig => (
                  <div
                    key={fig.id}
                    id={`luminary-card-${fig.id}`}
                    onClick={() => handleSelectLuminary(fig)}
                    className="group cursor-pointer rounded-2xl border border-[#3C3328] bg-gradient-to-b from-[#1C1712] to-[#14100C] p-6 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#B8860B]/15 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2E2419] to-[#1A140F] border border-[#8C7355]/40 group-hover:border-[#D4AF37] flex items-center justify-center text-lg font-serif font-bold text-[#D4AF37] shadow-inner transition-colors">
                            {fig.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                              {fig.country} • {fig.years}
                            </span>
                            <h3 className="text-lg font-serif font-bold text-[#F5EBE6] group-hover:text-[#D4AF37] transition-colors">
                              {fig.name}
                            </h3>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-[#241E17] border border-[#8C7355]/40 text-[11px] font-mono text-[#D1C7BD]">
                          {fig.recipients.length} Correspondents
                        </span>
                      </div>

                      {/* Epithet & Bio snippet */}
                      <p className="text-xs text-[#C4B8A5] font-serif italic">
                        "{fig.mindsetQuote.slice(0, 95)}..."
                      </p>

                      <p className="text-xs text-[#A89F91] leading-relaxed line-clamp-3">
                        {fig.historicalBio}
                      </p>

                      {/* Writing Kit Preview */}
                      <div className="pt-3 border-t border-[#8C7355]/20 flex items-center justify-between text-[11px]">
                        <span className="text-[#8C7355] font-serif">Instrument:</span>
                        <span className="text-[#E6D5B8] font-mono font-medium truncate max-w-[200px]">
                          {fig.writingKit.instrument.name}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-6 pt-4 border-t border-[#8C7355]/20 flex items-center justify-between">
                      <span className="text-xs text-[#A89F91] group-hover:text-[#F5EBE6] font-serif">
                        Reveal Network
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#241E17] group-hover:bg-[#B8860B] text-[#D4AF37] group-hover:text-[#12100E] font-medium text-xs transition-all shadow">
                        <span>Unfold Circle</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* STATE B: WRITER IS SELECTED — THEIR PERSONAL AUTHENTIC NETWORKING IS REVEALED */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Constellation Canvas (7 Cols) */}
              <div className="lg:col-span-7 bg-[#1C1712]/90 rounded-2xl border border-[#8C7355]/30 p-5 md:p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
                {/* Canvas Sub-Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#8C7355]/20">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1.5">
                      <Feather className="w-3.5 h-3.5" />
                      Focal Luminary:
                    </span>
                    <span className="text-xs font-serif font-bold text-[#F5EBE6] bg-[#241E17] px-2.5 py-0.5 rounded-full border border-[#8C7355]/40">
                      {activeFigure.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A89F91] font-sans">
                    Click any node to inspect correspondence dossier
                  </span>
                </div>

                {/* SVG Visual Canvas Area */}
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-xl bg-radial from-[#221B15]/80 via-[#14100C] to-[#0A0806] border border-[#8C7355]/25 p-4 flex items-center justify-center overflow-hidden shadow-inner">
                  
                  {/* Background grid */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#8C7355_1px,transparent_1px)] [background-size:24px_24px]" />

                  {/* Concentric orbital rings radiating from the selected writer */}
                  <div className="absolute w-[70%] h-[70%] rounded-full border border-[#8C7355]/20 animate-spin [animation-duration:140s] pointer-events-none" />
                  <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-[#8C7355]/15 pointer-events-none" />

                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Filaments radiating ONLY from active writer to their authentic correspondents */}
                    {activeFigure.recipients.map((rec, idx) => {
                      const count = activeFigure.recipients.length;
                      const angle = (idx * 2 * Math.PI) / count - Math.PI / 2;
                      const radius = 37; // radius percentage
                      const targetX = 50 + radius * Math.cos(angle);
                      const targetY = 50 + radius * Math.sin(angle);

                      const isSelected = activeRecipient?.id === rec.id;

                      return (
                        <g key={rec.id}>
                          <line
                            x1="50%"
                            y1="50%"
                            x2={`${targetX}%`}
                            y2={`${targetY}%`}
                            stroke={isSelected ? '#D4AF37' : '#6A563F'}
                            strokeWidth={isSelected ? 3.5 : 1.5}
                            strokeDasharray={isSelected ? 'none' : '4 4'}
                            filter={isSelected ? 'url(#glow-gold)' : undefined}
                            opacity={isSelected ? 0.95 : 0.5}
                            className="transition-all duration-300"
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* CENTER NODE: The Selected Historical Writer */}
                  <div
                    id="node-center-active-writer"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-30 flex flex-col items-center"
                  >
                    <div className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] text-[#12100E] text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5 shadow-lg flex items-center gap-1 whitespace-nowrap">
                      <Feather className="w-3 h-3" />
                      <span>Active Luminary</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#292017] border-2 border-[#F5D580] shadow-2xl ring-4 ring-[#D4AF37]/30 flex flex-col items-center text-center max-w-[150px]">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B8860B] to-[#8C6409] text-[#14100C] font-serif font-bold text-base flex items-center justify-center shadow-inner border border-[#F5D580] mb-1.5">
                        {activeFigure.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-serif font-bold text-[#F5EBE6] leading-tight">
                        {activeFigure.name}
                      </span>
                      <span className="text-[10px] text-[#D4AF37] font-mono mt-0.5">
                        {activeFigure.city}
                      </span>
                    </div>
                  </div>

                  {/* ORBITAL NODES: Verified Historical Correspondents */}
                  {activeFigure.recipients.map((rec, idx) => {
                    const count = activeFigure.recipients.length;
                    const angle = (idx * 2 * Math.PI) / count - Math.PI / 2;
                    const radius = 37;
                    const targetX = 50 + radius * Math.cos(angle);
                    const targetY = 50 + radius * Math.sin(angle);

                    const isSelected = activeRecipient?.id === rec.id;
                    const badge = getRelationBadge(rec.relationType);

                    // Check if this recipient happens to also be one of our 5 featured writers!
                    const isAlsoWriter = figures.find(f => f.id === rec.id || f.name.toLowerCase().includes(rec.name.toLowerCase().split(' ')[0]));

                    return (
                      <div
                        key={rec.id}
                        id={`node-recipient-${rec.id}`}
                        style={{
                          left: `${targetX}%`,
                          top: `${targetY}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        className="absolute z-20 flex flex-col items-center"
                      >
                        <button
                          onClick={() => setSelectedRecipientId(rec.id)}
                          className={`group p-2.5 rounded-xl transition-all flex flex-col items-center text-center max-w-[125px] sm:max-w-[140px] shadow-xl ${
                            isSelected
                              ? 'bg-[#2E2419] border-2 border-[#D4AF37] scale-110 ring-4 ring-[#D4AF37]/30 shadow-[#D4AF37]/30'
                              : 'bg-[#18130F] border border-[#8C7355]/40 hover:border-[#D4AF37] hover:scale-105 hover:bg-[#221B14]'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-serif font-bold text-xs shadow-inner mb-1 ${
                            isSelected 
                              ? 'bg-[#D4AF37] text-[#12100E]' 
                              : 'bg-[#251E17] text-[#D1C7BD] group-hover:text-white border border-[#8C7355]/30'
                          }`}>
                            {rec.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span className={`text-[11px] font-serif font-bold leading-tight ${isSelected ? 'text-[#F5D580]' : 'text-[#E6D5B8]'}`}>
                            {rec.name}
                          </span>
                          <span className="text-[9px] text-[#A89F91] truncate w-full font-mono mt-0.5">
                            {rec.title}
                          </span>
                        </button>

                        {/* If this person is also an iconic writer, show quick switch pill */}
                        {isAlsoWriter && isAlsoWriter.id !== activeFigure.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectLuminary(isAlsoWriter);
                            }}
                            className="mt-1 px-1.5 py-0.5 rounded bg-[#B8860B]/20 hover:bg-[#B8860B] text-[#D4AF37] hover:text-[#12100E] border border-[#B8860B]/40 text-[9px] font-mono transition flex items-center gap-0.5 shadow"
                            title={`Switch perspective: Reveal ${isAlsoWriter.name}'s network`}
                          >
                            <span>Explore as Writer</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend bar */}
                <div className="mt-4 pt-3 border-t border-[#8C7355]/20 flex flex-wrap items-center justify-between gap-3 text-xs text-[#A89F91]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                    <span className="font-serif">Center: Selected Luminary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#251E17] border border-[#8C7355]" />
                    <span className="font-serif">Orbit: Genuine Correspondents</span>
                  </div>
                  <button
                    onClick={() => onSelectPersona(activeFigure)}
                    className="text-[#D4AF37] hover:underline font-serif font-semibold text-xs flex items-center gap-1"
                  >
                    <span>Open in Scriptorium Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Right Column: Detailed Correspondent Dossier (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {activeRecipient ? (
                  <div id="recipient-dossier-card" className="bg-[#1C1712] rounded-2xl border border-[#D4AF37]/40 p-6 md:p-7 shadow-2xl space-y-5">
                    {/* Header: Name and Relationship Badge */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Authentic Recipient Dossier</span>
                        </span>
                        {(() => {
                          const badge = getRelationBadge(activeRecipient.relationType);
                          const BadgeIcon = badge.icon;
                          return (
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${badge.color}`}>
                              <BadgeIcon className="w-3 h-3" />
                              <span>{badge.label}</span>
                            </span>
                          );
                        })()}
                      </div>

                      <h2 className="text-2xl font-serif font-bold text-[#F5EBE6] pt-1">
                        {activeRecipient.name}
                      </h2>
                      <p className="text-xs font-serif text-[#C4B8A5]">
                        {activeRecipient.title}
                      </p>
                    </div>

                    {/* Transit & Geographic Logistics */}
                    <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-[#2F271E] bg-[#14110E] p-3 text-xs">
                      <div className="flex items-center space-x-1.5 text-[#A69C8B]">
                        <MapPin className="h-3.5 w-3.5 text-[#B8860B] shrink-0" />
                        <span className="truncate">{activeRecipient.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-[#A69C8B]">
                        <Clock className="h-3.5 w-3.5 text-[#B8860B] shrink-0" />
                        <span className="truncate">{activeRecipient.transitDays}</span>
                      </div>
                    </div>

                    {/* Historical Bond & Connection */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#A89F91]">
                        Historical Bond & Connection:
                      </span>
                      <p className="text-sm text-[#D1C7BD] leading-relaxed bg-[#15120E] p-3.5 rounded-xl border border-[#8C7355]/20">
                        {activeRecipient.historicalConnection}
                      </p>
                    </div>

                    {/* Historical Stakes */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#A89F91]">
                        What Was at Stake in Their Letters:
                      </span>
                      <p className="text-xs text-[#C4B8A5] leading-relaxed">
                        {activeRecipient.stakes}
                      </p>
                    </div>

                    {/* Transit Risk Notice */}
                    <div className="flex items-start space-x-2.5 rounded-xl bg-[#201A13] p-3 border border-[#352B1E] text-xs">
                      <ShieldAlert className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-snug">
                        <span className="font-semibold text-[#E5C365]">Historical Transmission Risk: </span>
                        <span className="text-[#A89C8B]">{activeRecipient.transitRisk}</span>
                      </div>
                    </div>

                    {/* Surviving Archival Record */}
                    <div className="pt-2 border-t border-[#8C7355]/20 text-xs text-[#A89F91] space-y-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C7355] block">
                        Surviving Archival Evidence:
                      </span>
                      <p className="italic text-[#C4B8A5]">
                        "{activeRecipient.survivingArtifactNote}"
                      </p>
                    </div>

                    {/* Direct Action: Draft Letter */}
                    <div className="pt-2">
                      <button
                        id="btn-draft-letter-to-recipient"
                        onClick={() => handleDraftLetterTo(activeRecipient)}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#B8860B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#F5D580] text-[#12100E] font-serif font-bold text-sm shadow-xl transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Draft Historical Letter to {activeRecipient.name}</span>
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="bg-[#1C1712] rounded-2xl border border-[#8C7355]/30 p-8 text-center text-[#A89F91] space-y-3">
                    <Feather className="w-8 h-8 text-[#8C7355] mx-auto" />
                    <p className="text-sm font-serif">
                      Select a correspondent node in the constellation to examine their historical relationship and surviving letters.
                    </p>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      ) : (
        /* MATRIX VIEW: Structured Comparison Across Correspondents & Luminaries */
        <div id="relationship-matrix-card" className="bg-[#17130F] rounded-2xl border border-[#8C7355]/30 p-6 shadow-2xl overflow-x-auto space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#F5EBE6]">
              {activeFigure 
                ? `${activeFigure.name}’s Verified Correspondent Matrix` 
                : 'Comparative Scriptorium & Epistolary Matrix'}
            </h2>
            <p className="text-xs text-[#A89F91] mt-1">
              {activeFigure 
                ? `Comparing the authentic recipients of ${activeFigure.name} across relationship roles, transit latency, and historical evidence.`
                : 'Comparing the 5 historical luminaries across their material scriptoria, transit paradigms, and surviving records.'}
            </p>
          </div>

          {activeFigure ? (
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#8C7355]/30 text-xs font-mono uppercase text-[#D4AF37]">
                  <th className="py-3 px-4 w-1/4">Correspondent</th>
                  <th className="py-3 px-4 w-1/4">Relation & Dimension</th>
                  <th className="py-3 px-4 w-1/4">Logistics & Transit</th>
                  <th className="py-3 px-4 w-1/4">Archival Record</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8C7355]/20 text-xs">
                {activeFigure.recipients.map(rec => {
                  const badge = getRelationBadge(rec.relationType);
                  const isSelected = activeRecipient?.id === rec.id;
                  return (
                    <tr 
                      key={rec.id} 
                      onClick={() => setSelectedRecipientId(rec.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#241E17]' : 'hover:bg-[#1C1712]'
                      }`}
                    >
                      <td className="py-4 px-4 align-top">
                        <div className="font-serif font-bold text-base text-[#F5EBE6]">
                          {rec.name}
                        </div>
                        <div className="text-xs text-[#D4AF37] font-serif mt-0.5">
                          {rec.title}
                        </div>
                        <div className="mt-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDraftLetterTo(rec);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#B8860B] hover:bg-[#D4AF37] text-[#12100E] font-medium text-[11px] shadow transition-all font-serif"
                          >
                            <Send className="w-3 h-3" />
                            <span>Draft Letter</span>
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${badge.color} mb-1.5`}>
                          {badge.label}
                        </span>
                        <p className="text-xs text-[#D1C7BD]">
                          {rec.historicalConnection}
                        </p>
                      </td>
                      <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed space-y-1">
                        <div className="flex items-center gap-1 text-[#D4AF37] font-mono text-[11px]">
                          <MapPin className="w-3 h-3" />
                          <span>{rec.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#A89F91]">
                          <Clock className="w-3 h-3" />
                          <span>{rec.transitDays}</span>
                        </div>
                        <div className="text-[10px] text-[#D97706] pt-1">
                          Risk: {rec.transitRisk}
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top text-[#C4B8A5] italic leading-relaxed">
                        "{rec.survivingArtifactNote}"
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#8C7355]/30 text-xs font-mono uppercase text-[#D4AF37]">
                  <th className="py-3 px-4 w-1/4">Luminary</th>
                  <th className="py-3 px-4 w-1/4">Era & Location</th>
                  <th className="py-3 px-4 w-1/4">Writing Kit & Material</th>
                  <th className="py-3 px-4 w-1/4">Transit Paradigm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#8C7355]/20 text-xs">
                {figures.map(fig => (
                  <tr 
                    key={fig.id} 
                    onClick={() => handleSelectLuminary(fig)}
                    className="cursor-pointer hover:bg-[#1E1914] transition-colors"
                  >
                    <td className="py-4 px-4 align-top">
                      <div className="font-serif font-bold text-base text-[#F5EBE6]">
                        {fig.name}
                      </div>
                      <div className="text-xs text-[#D4AF37] font-mono mt-0.5">
                        {fig.years}
                      </div>
                      <div className="mt-2 text-[11px] text-[#A89F91]">
                        {fig.recipients.length} authentic correspondents
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed">
                      <div className="font-semibold text-[#E6D5B8]">{fig.era}</div>
                      <div className="text-[11px] text-[#A89F91] mt-0.5">{fig.city}, {fig.country}</div>
                      <div className="text-[11px] text-[#8C7355] mt-1">{fig.culturalContext.socialOrder.slice(0, 80)}...</div>
                    </td>
                    <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed space-y-1">
                      <div className="text-[#D4AF37] font-medium">{fig.writingKit.instrument.name}</div>
                      <div className="text-[11px] text-[#A89F91]">{fig.writingKit.substrate.name}</div>
                      <div className="text-[10px] text-[#8C7355]">{fig.writingKit.ink.name}</div>
                    </td>
                    <td className="py-4 px-4 align-top text-[#C4B8A5] leading-relaxed space-y-1">
                      <div className="font-medium text-[#E6D5B8]">{fig.writingKit.transitCourier.method}</div>
                      <div className="text-[11px] text-[#A89F91]">{fig.writingKit.transitCourier.speedEstimate}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};
