import React from 'react';
import { 
  HistoricalFigure, 
  ToneOption, 
  MoodOption, 
  KeywordOption, 
  HistoricalEventOption 
} from '../types';
import { Sparkles, Check, Info } from 'lucide-react';

interface SymbolicElementSelectorProps {
  figure: HistoricalFigure;
  selectedTone: ToneOption | null;
  selectedMood: MoodOption | null;
  selectedKeywords: KeywordOption[];
  selectedEvent: HistoricalEventOption | null;
  onSelectTone: (tone: ToneOption) => void;
  onSelectMood: (mood: MoodOption) => void;
  onToggleKeyword: (kw: KeywordOption) => void;
  onStartWriting: () => void;
  isWritingInProgress: boolean;
  hasReceiver: boolean;
}

// Visual symbol mappings for tones
const TONE_SYMBOLS: Record<string, { icon: string; shortTag: string }> = {
  'scientific-stoic': { icon: '⚖️', shortTag: 'Stoic Rigor' },
  'fierce-solidarity': { icon: '🛡️', shortTag: 'Solidarity' },
  'urgent-humanitarian': { icon: '⚡', shortTag: 'Urgency' },
  'whimsical-intellectual': { icon: '🎻', shortTag: 'Playful Rigor' },
  'moral-pacifist': { icon: '🕊️', shortTag: 'Moral Plea' },
  'playful-comradely': { icon: '☕', shortTag: 'Camaraderie' },
  'lyrical-transcendence': { icon: '🌿', shortTag: 'Lyrical' },
  'prophetic-critique': { icon: '📜', shortTag: 'Prophetic' },
  'gentle-reverence': { icon: '🙏', shortTag: 'Reverence' },
  'courtly-reverence': { icon: '👑', shortTag: 'Courtly' },
  'philosophical-candid': { icon: '🧭', shortTag: 'Candid' },
  'patronizing-flattery': { icon: '🎭', shortTag: 'Diplomatic' },
};

// Visual symbol mappings for moods
const MOOD_SYMBOLS: Record<string, { icon: string; shortTag: string }> = {
  'quietly-indomitable': { icon: '🕯️', shortTag: 'Indomitable' },
  'intellectual-exultation': { icon: '💫', shortTag: 'Exultation' },
  'homesick-nostalgia': { icon: '🌊', shortTag: 'Nostalgia' },
  'cosmic-wonder': { icon: '🌌', shortTag: 'Cosmic Awe' },
  'weary-disillusioned': { icon: '🥀', shortTag: 'Weariness' },
  'playful-unburdened': { icon: '⛵', shortTag: 'Serenity' },
  'cosmopolitan-harmony': { icon: '🕊️', shortTag: 'Universal Peace' },
  'sorrow-violence': { icon: '🌧️', shortTag: 'World-Pain' },
  'meditative-serenity': { icon: '🧘', shortTag: 'Meditative' },
  'secretive-urgency': { icon: '🗝️', shortTag: 'Secretive' },
  'detached-fascination': { icon: '🔬', shortTag: 'Curiosity' },
  'wistful-weariness': { icon: '🍂', shortTag: 'Twilight' },
};

// Visual symbol mappings for keywords
const KEYWORD_SYMBOLS: Record<string, string> = {
  'kw-pitchblende': '⛏️',
  'kw-luminescence': '💡',
  'kw-polonium': '🇵🇱',
  'kw-patent-refusal': '📜',
  'kw-petites-curies': '🚑',
  'kw-covariance': '🌌',
  'kw-solvay': '🏛️',
  'kw-manifesto': '🕊️',
  'kw-brownian': '🔬',
  'kw-berlin-zionism': '⚖️',
  'kw-visva-bharati': '🏛️',
  'kw-knighthood': '⚔️',
  'kw-gitanjali': '📜',
  'kw-caputh': '🌳',
  'kw-baul': '🪕',
  'kw-arno': '🌊',
  'kw-pigments': '🎨',
  'kw-anatomy': '💀',
  'kw-equestrian': '🐎',
  'kw-mirror-script': '🪞',
  'kw-mechanics': '⚙️',
};

export const SymbolicElementSelector: React.FC<SymbolicElementSelectorProps> = ({
  figure,
  selectedTone,
  selectedMood,
  selectedKeywords,
  onSelectTone,
  onSelectMood,
  onToggleKeyword,
  onStartWriting,
  isWritingInProgress,
  hasReceiver,
}) => {
  return (
    <div className="relative z-20 mb-3 p-2.5 sm:p-3 rounded-xl border border-[#C5A882]/60 bg-[#FAF3E6]/90 backdrop-blur-md shadow-sm text-[#2C180B] transition-all">
      {/* Symbolic Element Bar Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C5A882]/40">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#3D2211]">
            KEY ELEMENTS & MOTIFS
          </span>
          <span className="text-[10.5px] font-serif text-[#70482B] hidden md:inline">
            · Select symbols to weave into your letter
          </span>
        </div>

        {/* Selected count pill */}
        <div className="flex items-center gap-2">
          <span className="text-[10.5px] font-mono px-2 py-0.5 rounded-full bg-[#EFE3CF] text-[#6E421F] border border-[#C5A882]/40">
            {selectedKeywords.length} motif{selectedKeywords.length !== 1 ? 's' : ''} active
          </span>
          <button
            onClick={onStartWriting}
            disabled={!hasReceiver || isWritingInProgress}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif font-semibold transition shadow-xs ${
              !hasReceiver
                ? 'bg-[#C5A882]/30 text-[#8C6D46] cursor-not-allowed'
                : 'bg-[#3D2517] text-[#F7EFE4] hover:bg-[#52331F] border border-[#D4AF37]'
            }`}
            title="Pen your letter with these selected elements"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>{isWritingInProgress ? 'Writing...' : 'Inscribe Letter'}</span>
          </button>
        </div>
      </div>

      {/* Row 1: Tone & Mood Symbols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        {/* Epistolary Tone */}
        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#FFFDF9]/80 border border-[#D5C2AA]/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6D46] px-1 flex-shrink-0">
            Tone:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            {figure.availableTones.map((tone) => {
              const isSelected = selectedTone?.id === tone.id;
              const sym = TONE_SYMBOLS[tone.id] || { icon: '📜', shortTag: tone.label.split(' ')[0] };
              return (
                <button
                  key={tone.id}
                  type="button"
                  onClick={() => onSelectTone(tone)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-serif transition whitespace-nowrap border ${
                    isSelected
                      ? 'bg-[#3D2517] text-[#F5EFEB] font-bold border-[#D4AF37] shadow-xs'
                      : 'bg-[#EFE5D3]/90 text-[#5A3822] hover:bg-[#E2D2BC] border-[#C5A882]/40'
                  }`}
                  title={`${tone.label}: ${tone.description}`}
                >
                  <span>{sym.icon}</span>
                  <span>{sym.shortTag}</span>
                  {isSelected && <Check className="h-2.5 w-2.5 text-[#D4AF37]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inner Mood */}
        <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[#FFFDF9]/80 border border-[#D5C2AA]/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6D46] px-1 flex-shrink-0">
            Mood:
          </span>
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            {figure.availableMoods.map((mood) => {
              const isSelected = selectedMood?.id === mood.id;
              const sym = MOOD_SYMBOLS[mood.id] || { icon: '🕯️', shortTag: mood.label.split(' ')[0] };
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => onSelectMood(mood)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-serif transition whitespace-nowrap border ${
                    isSelected
                      ? 'bg-[#3D2517] text-[#F5EFEB] font-bold border-[#D4AF37] shadow-xs'
                      : 'bg-[#EFE5D3]/90 text-[#5A3822] hover:bg-[#E2D2BC] border-[#C5A882]/40'
                  }`}
                  title={`${mood.label}: ${mood.emotionalState}`}
                >
                  <span>{sym.icon}</span>
                  <span>{sym.shortTag}</span>
                  {isSelected && <Check className="h-2.5 w-2.5 text-[#D4AF37]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: Multi-Selectable Key Motifs / Keywords (Symbolized) */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#FFFDF9]/80 border border-[#D5C2AA]/50">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C6D46] px-1 flex-shrink-0 flex items-center gap-1">
          <span>Motifs:</span>
        </span>
        <div className="flex flex-wrap items-center gap-1 py-0.5">
          {figure.researchKeywords.map((kw) => {
            const isSelected = selectedKeywords.some((k) => k.id === kw.id);
            const icon = KEYWORD_SYMBOLS[kw.id] || '✨';
            // Concise label without heavy text
            const conciseLabel = kw.label.replace(/\(.*\)/, '').trim();

            return (
              <button
                key={kw.id}
                type="button"
                onClick={() => onToggleKeyword(kw)}
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-serif transition whitespace-nowrap border ${
                  isSelected
                    ? 'bg-[#B8860B] text-[#FFFFFF] font-bold border-[#8C6D46] shadow-xs scale-102'
                    : 'bg-[#FAF4EA] text-[#5A3822] hover:bg-[#EFE3CF] border-[#C5A882]/50'
                }`}
                title={`${kw.label} · ${kw.historicalFact}`}
              >
                <span>{icon}</span>
                <span>{conciseLabel}</span>
                {isSelected ? (
                  <Check className="h-2.5 w-2.5 text-[#FFFFFF]" />
                ) : (
                  <span className="text-[#A89481] text-[9px]">+</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
