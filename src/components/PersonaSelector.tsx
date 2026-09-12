import React, { useState } from 'react';
import { HistoricalFigure } from '../types';
import { ArrowRight, MapPin, Clock, Scroll, Sparkles, BookOpen, Layers, Atom } from 'lucide-react';

interface PersonaSelectorProps {
  figures: HistoricalFigure[];
  onSelectFigure: (figure: HistoricalFigure) => void;
  onOpenRelationshipMap?: () => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  figures,
  onSelectFigure,
  onOpenRelationshipMap,
}) => {
  const [filterCategory, setFilterCategory] = useState<'triad' | 'all'>('triad');

  // Segregate the triad from archival figures
  const triadFigures = figures.filter(f => ['einstein', 'curie', 'tagore'].includes(f.id));
  const displayedFigures = filterCategory === 'triad' ? triadFigures : figures;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Intro Banner with Triad Relationship Quick Link */}
      <div className="rounded-2xl border border-[#B8860B]/40 bg-gradient-to-r from-[#1F1914] via-[#2A2218] to-[#1F1914] p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#B8860B]/40 bg-[#16120E] px-3.5 py-1 text-xs font-semibold text-[#D4AF37] tracking-wider uppercase">
            <Atom className="h-3.5 w-3.5" />
            <span>Worldwide Multi-Dimensional Relationship Nexus</span>
          </div>
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#F8F5EE] sm:text-4xl">
            Whose Hand Will Hold the Pen?
          </h1>
          <p className="max-w-2xl text-sm text-[#C4B8A5] leading-relaxed">
            Step into three monumental minds across three countries: Albert Einstein <span className="text-[#D4AF37] font-serif">(Germany)</span>, Marie Curie <span className="text-[#D4AF37] font-serif">(France/Poland)</span>, and Rabindranath Tagore <span className="text-[#D4AF37] font-serif">(India)</span>. Or explore their interconnected relationship matrix.
          </p>
        </div>

        {onOpenRelationshipMap && (
          <button
            id="btn-banner-open-triad-map"
            onClick={onOpenRelationshipMap}
            className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#8B6508] to-[#B8860B] text-[#12100E] font-serif font-bold text-sm shadow-xl hover:from-[#A87B0A] hover:to-[#D4AF37] transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>View Triad Relationship Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Figures Category Selector */}
      <div className="flex items-center justify-between border-b border-[#3A332A] pb-4">
        <div className="flex items-center space-x-2">
          <button
            id="btn-tab-triad"
            onClick={() => setFilterCategory('triad')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
              filterCategory === 'triad'
                ? 'bg-[#B8860B] text-[#12100E] shadow-md'
                : 'text-[#A89F91] hover:text-[#F8F5EE] bg-[#1A1713]'
            }`}
          >
            Global Triad (Einstein • Curie • Tagore)
          </button>
          <button
            id="btn-tab-all-figures"
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-serif font-semibold transition-all ${
              filterCategory === 'all'
                ? 'bg-[#B8860B] text-[#12100E] shadow-md'
                : 'text-[#A89F91] hover:text-[#F8F5EE] bg-[#1A1713]'
            }`}
          >
            All 5 Historical Personas (Incl. Leonardo & Franklin)
          </button>
        </div>
        <span className="text-xs text-[#8A7F6F] font-mono hidden sm:inline-block">
          Showing {displayedFigures.length} figures
        </span>
      </div>

      {/* Persona Cards Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {displayedFigures.map((figure) => (
          <div
            key={figure.id}
            id={`persona-card-${figure.id}`}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#3A332A] bg-[#1A1713] p-6 shadow-xl transition-all duration-300 hover:border-[#B8860B]/70 hover:bg-[#201C17] hover:shadow-2xl hover:shadow-[#B8860B]/10"
          >
            {/* Country & Era Badge */}
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 rounded-md border border-[#483F33] bg-[#262018] px-2.5 py-1 text-xs font-medium text-[#E5C365]">
                <span>{figure.country}</span>
                <span className="text-[#877C6D]">•</span>
                <span className="text-[#C4BAAB]">{figure.years}</span>
              </span>

              <span className="rounded-full bg-[#2B241C] px-2.5 py-0.5 text-[11px] font-medium text-[#A89D8B]">
                {figure.recipients.length} Correspondents
              </span>
            </div>

            {/* Main Info */}
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold tracking-wide text-[#F3EFE6] transition-colors group-hover:text-[#D4AF37]">
                {figure.name}
              </h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#C49B45]">
                {figure.epithet}
              </p>
              
              <div className="mt-3 flex items-center space-x-4 text-xs text-[#9E9382]">
                <span className="flex items-center space-x-1">
                  <MapPin className="h-3.5 w-3.5 text-[#B8860B]" />
                  <span>{figure.city}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-[#B8860B]" />
                  <span>{figure.era}</span>
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#BDB2A2] line-clamp-3">
                {figure.historicalBio}
              </p>
            </div>

            {/* Mindset Quote */}
            <div className="mb-4 rounded-xl border border-[#352E25] bg-[#15120E] p-3 text-xs italic text-[#C9BEAE]">
              <div className="font-serif text-[#D4AF37] mb-1 font-semibold text-[11px] tracking-wide uppercase not-italic">
                Guiding Mindset:
              </div>
              "{figure.mindsetQuote}"
            </div>

            {/* Cultural Epoch Breakdown Preview */}
            <div className="mb-5 space-y-2 rounded-lg border border-[#2E271F] bg-[#171410] p-3 text-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8F8474]">
                Cultural Epoch Reality:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#A69B8B]">
                <div>
                  <span className="text-[#6E6456] block">Transmission:</span>
                  <span className="font-medium text-[#D1C6B4] truncate block">
                    {figure.writingKit.transitCourier.speedEstimate}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E6456] block">Script & Nib:</span>
                  <span className="font-medium text-[#D1C6B4] truncate block">
                    {figure.writingKit.instrument.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              id={`btn-select-persona-${figure.id}`}
              onClick={() => onSelectFigure(figure)}
              className="flex w-full items-center justify-center space-x-2 rounded-xl border border-[#B8860B]/60 bg-gradient-to-r from-[#8B6508] to-[#B8860B] py-3 text-sm font-bold text-[#141210] shadow-md transition-all duration-200 hover:from-[#A87B0A] hover:to-[#D4AF37] hover:shadow-lg active:scale-[0.99]"
            >
              <span>Immerse & Reveal Network</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        ))}
      </div>

      {/* Philosophy Footnote */}
      <div className="rounded-2xl border border-[#322B22] bg-[#16130F] p-6 text-center text-xs text-[#8A7F6F]">
        <span className="font-semibold text-[#D4AF37]">Untraditional Epistolary Method:</span> Rather than composing generic modern text, you will select grounded historical events, authentic epistolary tones, emotional moods, and researched keywords. Our historical agent crafts the letter adhering to period syntax and etiquette, accompanied by an essential contemporary breakdown.
      </div>

    </div>
  );
};
