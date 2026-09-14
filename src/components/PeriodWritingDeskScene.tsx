import React, { useState, useEffect, useRef } from 'react';
import { 
  HistoricalFigure, 
  Recipient, 
  HistoricalEventOption, 
  ToneOption, 
  MoodOption, 
  KeywordOption, 
  GeneratedLetter 
} from '../types';
import { 
  getSharedEpisodesBetween, 
  getHistoricalPeopleBetween, 
  episodeToEventOption,
  HistoricalSharedEpisode 
} from '../data/writerReceiverInteractions';
import { 
  Feather, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Layers, 
  Sparkles, 
  Edit3, 
  RotateCcw,
  BookOpen,
  Check,
  Calendar,
  MapPin,
  Clock,
  Quote,
  Info,
  Users,
  X,
  ChevronDown,
  ChevronUp,
  Tag,
  Cpu
} from 'lucide-react';
import { 
  RecipientVisualStamp, 
  WitnessCameo 
} from './HistoricalVisualScenes';
import { RecipientNetworkWeb, getPortraitForPerson } from './RecipientNetworkWeb';

// ============================================================================
// HISTORICAL EVENT CATEGORIZATION DEFINITIONS
// Categorizes shared episodes and milestones into distinct thematic lenses
// ============================================================================

export type EventCategory = 'all' | 'intellectual' | 'solidarity' | 'crisis' | 'life';

export interface EventCategoryDef {
  id: EventCategory;
  label: string;
  labelEn: string;
  icon: string;
  description: string;
}

export const EVENT_CATEGORIES: EventCategoryDef[] = [
  { 
    id: 'all', 
    label: 'All', 
    labelEn: 'All Events', 
    icon: '📜',
    description: 'All recorded mutual events and dispatches'
  },
  { 
    id: 'intellectual', 
    label: 'Theory', 
    labelEn: 'Intellectual & Theory', 
    icon: '💡',
    description: 'Scientific councils, theoretical debates, and laboratory breakthroughs'
  },
  { 
    id: 'solidarity', 
    label: 'Solidarity', 
    labelEn: 'Solidarity & Bonds', 
    icon: '🤝',
    description: 'Mutual moral defense, intimate encouragement, and private allyship'
  },
  { 
    id: 'crisis', 
    label: 'Crises', 
    labelEn: 'Crisis & Turning Points', 
    icon: '⚡',
    description: 'Wartime mobilization, international assemblies, and historical upheavals'
  },
  { 
    id: 'life', 
    label: 'Journeys', 
    labelEn: 'Journeys & Life', 
    icon: '🌄',
    description: 'Alpine expeditions, veranda philosophical teas, and family correspondence'
  }
];

export function getEventCategory(item: {
  title: string;
  summary?: string;
  context?: string;
  historicalContext?: string;
  keyTopics?: string[];
}): EventCategory {
  const text = `${item.title} ${item.summary || ''} ${item.context || ''} ${item.historicalContext || ''} ${(item.keyTopics || []).join(' ')}`.toLowerCase();
  
  // 1. Solidarity, moral defense, intimate kinship
  if (
    text.includes('solidarity') ||
    text.includes('press scandal') ||
    text.includes('yellow journalism') ||
    text.includes('moral support') ||
    text.includes('rabble') ||
    text.includes('friendship') ||
    text.includes('admiration') ||
    text.includes('sympathy') ||
    text.includes('scandal') ||
    text.includes('defend') ||
    text.includes('kinship') ||
    text.includes('sorrow') ||
    text.includes('consolation')
  ) {
    return 'solidarity';
  }
  
  // 2. Wartime, political crisis, international diplomacy, Nobel controversy
  if (
    text.includes('league of nations') ||
    text.includes('war') ||
    text.includes('crisis') ||
    text.includes('boycott') ||
    text.includes('persecution') ||
    text.includes('exile') ||
    text.includes('political') ||
    text.includes('reconciliation') ||
    text.includes('nobel') ||
    text.includes('revolution') ||
    text.includes('icic') ||
    text.includes('ambulance') ||
    text.includes('radiolog')
  ) {
    return 'crisis';
  }

  // 3. Journeys, nature, daily encounters, hiking
  if (
    text.includes('alps') ||
    text.includes('glacier') ||
    text.includes('hiking') ||
    text.includes('caputh') ||
    text.includes('tea') ||
    text.includes('veranda') ||
    text.includes('journey') ||
    text.includes('expedition') ||
    text.includes('travel') ||
    text.includes('monsoon') ||
    text.includes('nature') ||
    text.includes('children') ||
    text.includes('daughter') ||
    text.includes('son') ||
    text.includes('walking')
  ) {
    return 'life';
  }

  // 4. Default: Scientific & Intellectual inquiries
  return 'intellectual';
}

interface PeriodWritingDeskSceneProps {
  figure: HistoricalFigure;
  selectedRecipient?: Recipient | null;
  selectedEvent?: HistoricalEventOption | null;
  selectedTone?: ToneOption | null;
  selectedMood?: MoodOption | null;
  selectedKeywords?: KeywordOption[];
  letter?: GeneratedLetter | null;
  isGenerating?: boolean;
  onBackToPens: () => void;
  onOpenTriadMap: () => void;
  onOpenNetwork: () => void;
  onProceedToStudio: () => void;
  onOpenSystemDiagram?: () => void;
  onSelectRecipient: (recipient: Recipient) => void;
  onSelectEvent: (event: HistoricalEventOption) => void;
  onSelectTone?: (tone: ToneOption) => void;
  onSelectMood?: (mood: MoodOption) => void;
  onToggleKeyword?: (keyword: KeywordOption) => void;
  onGenerateLetter?: () => void;
}

export const PeriodWritingDeskScene: React.FC<PeriodWritingDeskSceneProps> = ({
  figure,
  selectedRecipient,
  selectedEvent,
  selectedTone,
  selectedMood,
  selectedKeywords = [],
  letter,
  isGenerating = false,
  onBackToPens,
  onOpenTriadMap,
  onOpenNetwork,
  onProceedToStudio,
  onOpenSystemDiagram,
  onSelectRecipient,
  onSelectEvent,
  onSelectTone,
  onSelectMood,
  onToggleKeyword,
  onGenerateLetter
}) => {
  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Zen mode: hides HUD controls for pure contemplation of the desk
  const [zenMode, setZenMode] = useState(false);

  // Parchment mode: starts 'blank' ("without the texts on the page")
  const [writingMode, setWritingMode] = useState<'blank' | 'interactive' | 'archival'>('blank');
  const [userText, setUserText] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Recipient selection state
  const hasReceiver = Boolean(selectedRecipient);
  const activeRecipient = selectedRecipient || null;
  const [showRecipientPicker, setShowRecipientPicker] = useState(!selectedRecipient);

  // Event category filtering
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [showArchivalProof, setShowArchivalProof] = useState(false);
  const [isEventsCollapsed, setIsEventsCollapsed] = useState(false);
  const [isNetworkCollapsed, setIsNetworkCollapsed] = useState(true);
  const [showDeskFullView, setShowDeskFullView] = useState(false);

  // Modern breakdown modal state
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);

  // Whenever selectedRecipient changes, auto-expand or collapse recipient picker and activate archival mode
  useEffect(() => {
    if (!selectedRecipient) {
      setShowRecipientPicker(true);
    } else {
      setShowRecipientPicker(false);
      setWritingMode('archival');
    }
  }, [selectedRecipient]);

  // When letter arrives, switch to archival mode
  useEffect(() => {
    if (letter) {
      setWritingMode('archival');
    }
  }, [letter]);

  // Desk background and period stationery info
  const deskImageMap: Record<string, {
    src: string;
    penName: string;
    instrumentDescription: string;
    inkDescription: string;
    locationNote: string;
  }> = {
    curie: {
      src: '/assets/curie_desk.jpg',
      penName: 'Turned Wood Dip Pen',
      instrumentDescription: 'Dark carved walnut dip pen with fine steel nib',
      inkDescription: 'Square glass inkwell with dark iron-gall ink',
      locationNote: 'Sorbonne Laboratory Desk · Paris, France'
    },
    einstein: {
      src: '/assets/einstein_desk.jpg',
      penName: 'Celluloid Fountain Pen',
      instrumentDescription: '1920s Pelikan 100 marbled black-green barrel',
      inkDescription: 'Brilliant royal blue fountain ink',
      locationNote: 'Caputh Summer Veranda · Potsdam, Germany'
    },
    tagore: {
      src: '/assets/tagore_desk.jpg',
      penName: 'Hand-Carved Reed Pen',
      instrumentDescription: 'Slender hollowed bamboo reed cut with sharp oblique nib',
      inkDescription: 'Organic soot black lampblack ink with gum arabic',
      locationNote: 'Uttarayan Veranda · Santiniketan, Bengal'
    }
  };

  const deskInfo = deskImageMap[figure.id] || deskImageMap.curie;

  // Verified mutual episodes that occurred between this writer and this recipient
  const sharedEpisodes: HistoricalSharedEpisode[] = activeRecipient
    ? getSharedEpisodesBetween(figure.id, activeRecipient.id)
    : [];

  // Historical contemporaries & intermediaries involved between this pair
  const sharedPeople: string[] = activeRecipient
    ? getHistoricalPeopleBetween(figure.id, activeRecipient.id)
    : [];

  // Unified list of selectable events (shared historical episodes or suggested milestones)
  const allEventsList = sharedEpisodes.length > 0 
    ? sharedEpisodes.map(ep => ({
        id: ep.id,
        title: ep.title,
        year: ep.year,
        summary: ep.summary,
        context: ep.historicalContext,
        historicalEvidence: ep.historicalEvidence,
        historicalPeopleInvolved: ep.historicalPeopleInvolved,
        keyTopics: ep.keyTopics,
        asOption: episodeToEventOption(ep),
        category: getEventCategory(ep)
      }))
    : figure.suggestedEvents.map(evt => ({
        id: evt.id,
        title: evt.title,
        year: evt.year,
        summary: evt.context,
        context: evt.context,
        historicalEvidence: evt.historicalEvidence,
        historicalPeopleInvolved: [] as string[],
        keyTopics: [] as string[],
        asOption: evt,
        category: getEventCategory({ title: evt.title, context: evt.context, historicalContext: evt.historicalEvidence })
      }));

  // Filter events based on active category
  const filteredEvents = selectedCategory === 'all'
    ? allEventsList
    : allEventsList.filter(e => e.category === selectedCategory);

  // Authentic period dispatch on the parchment (either AI-generated or verified archival grounded draft)
  const effectiveLetter = letter || (activeRecipient ? {
    id: `grounded-${figure.id}-${activeRecipient.id}`,
    senderId: figure.id,
    recipientId: activeRecipient.id,
    salutation: activeRecipient.id === 'curie' 
      ? 'Chère Madame Curie,' 
      : activeRecipient.id === 'einstein'
      ? 'Lieber Herr Einstein,'
      : activeRecipient.id === 'tagore'
      ? 'Revered Gurudev Rabindranath,'
      : `To my esteemed ${activeRecipient.title || ''} ${activeRecipient.name},`,
    dateAndLocation: `${figure.city}, ${selectedEvent?.year || figure.era}`,
    bodyParagraphs: [
      `I write to you amidst the quiet reflections of our epoch. The matter of ${selectedEvent?.title || 'our recent correspondence'} continues to stir my deepest contemplation.`,
      selectedEvent?.context 
        ? `As history marks this juncture: ${selectedEvent.context}. In our shared pursuit of truth and understanding, these questions transcend our individual laboratories and studies.`
        : `Across the geographical distance between ${figure.city} and ${activeRecipient.location}, the invisible bridge of intellectual kinship remains unshakeable.`,
      `I remain hopeful that our paths shall soon converge once more. May this dispatch convey my unwavering respect and warm thoughts to you.`
    ],
    valediction: figure.id === 'curie' 
      ? 'With sincere devotion and scientific respect,' 
      : figure.id === 'einstein' 
      ? 'With warmest regards and friendly esteem,' 
      : 'In eternal harmony and affection,',
    postScriptum: selectedEvent?.historicalEvidence ? `P.S. Regarding our discourse: "${selectedEvent.historicalEvidence}"` : undefined,
    generationSource: 'archive-engine' as const
  } : null);

  // Sound synthesis for authentic ambient pen scratching
  const playSoundEffect = (type: 'scratch' | 'crackle' | 'dip') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'scratch') {
        const bufferSize = ctx.sampleRate * 0.15;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3200, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // Audio fallback
    }
  };

  const handleUserTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value);
    playSoundEffect('scratch');
  };

  const handleGenerateClick = () => {
    playSoundEffect('scratch');
    if (onGenerateLetter) {
      onGenerateLetter();
    }
    setWritingMode('archival');
  };

  const handleSelectRecipientCard = (rec: Recipient) => {
    onSelectRecipient(rec);
    setShowRecipientPicker(false);
    setShowDeskFullView(false);
    playSoundEffect('scratch');
  };

  const handleSelectEventItem = (eventOption: HistoricalEventOption) => {
    onSelectEvent(eventOption);
    playSoundEffect('scratch');
  };

  // Compute transit vehicle icon
  const getTransitIcon = (t: string) => {
    const s = (t || '').toLowerCase();
    if (s.includes('hour') || s.includes('local') || s.includes('train')) return '🚂';
    if (s.includes('steamer') || s.includes('ship') || s.includes('sea') || s.includes('ocean')) return '🚢';
    if (s.includes('horse') || s.includes('courier')) return '🐎';
    if (s.includes('air')) return '🛩️';
    return '📬';
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-[#140C07] select-none flex flex-col justify-between">
      
      {/* 1. PHOTOREALISTIC DESK BACKGROUND */}
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('${deskInfo.src}')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />

      {/* 2. ATMOSPHERIC CANDLELIGHT FLICKER OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none mix-blend-screen opacity-40 animate-pulse"
        style={{
          background: `radial-gradient(ellipse at 85% 20%, rgba(255, 185, 80, 0.45) 0%, rgba(212, 120, 20, 0.15) 35%, transparent 70%)`,
          animationDuration: '3.5s'
        }}
      />
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 45%, rgba(12, 7, 4, 0.75) 100%)`
        }}
      />

      {/* 3. TOP FLOATING HUD & NAVIGATION BAR */}
      <header className={`relative z-30 transition-all duration-300 px-4 sm:px-8 pt-3 pb-2 flex items-center justify-between ${
        zenMode ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}>
        {/* Left: Return to Pens */}
        <div className="flex items-center gap-3">
          <button
            id="btn-desk-back-to-pens"
            onClick={onBackToPens}
            className="flex items-center gap-2 rounded-xl border border-[#8C6D46]/40 bg-[#1C120B]/85 px-3.5 py-1.5 text-xs font-serif font-medium text-[#F5EDE3] shadow-lg backdrop-blur-md transition hover:border-[#D4AF37] hover:bg-[#2B1B10] hover:text-[#FFF]"
            title="Return to the Three Pens desk"
          >
            <ArrowLeft className="h-4 w-4 text-[#D4AF37]" />
            <span>Change Pen</span>
          </button>

          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-sm font-bold text-[#F3EFE6] tracking-wide">
                {figure.name}
              </span>
              <span className="text-[#8C6D46]">•</span>
              <span className="text-xs font-serif text-[#D4AF37]">
                {deskInfo.penName}
              </span>
            </div>
            <p className="text-[11px] font-serif text-[#9E8B7A] italic">
              {deskInfo.locationNote}
            </p>
          </div>
        </div>

        {/* Right: Desk Controls & System Diagram */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio toggle */}
          <button
            id="btn-desk-sound-toggle"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border backdrop-blur-md transition ${
              soundEnabled
                ? 'border-[#D4AF37] bg-[#2C1C12] text-[#D4AF37]'
                : 'border-[#8C6D46]/30 bg-[#1A110B]/80 text-[#9E8B7A] hover:text-[#FFF]'
            }`}
            title={soundEnabled ? 'Disable pen sounds' : 'Enable authentic nib scratching'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* System Diagram Button */}
          {onOpenSystemDiagram && (
            <button
              id="btn-desk-system-specs"
              onClick={onOpenSystemDiagram}
              className="flex items-center gap-1.5 rounded-xl border border-[#B8860B] bg-[#2A2115]/90 px-3 py-1.5 text-xs font-semibold text-[#F5D580] shadow-md backdrop-blur-md transition hover:border-[#F5D580] hover:bg-[#382B1B]"
              title="System Architecture Diagram"
            >
              <Cpu className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>System Diagram</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 4. MAIN CENTRAL STAGE: THE PARCHMENT AS THE GLORIOUS CENTERPIECE          */}
      {/* User intent: Floating elements over the parchment, no detached sidebars   */}
      {/* ========================================================================= */}
      <main className="relative z-20 flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-2 flex flex-col items-stretch">
        
        {(!hasReceiver || showDeskFullView) ? (
          /* =================================================================== */
          /* PURE FLOATING TRANSPARENT NETWORK (完全透明、无底色，露出书桌信纸与钢笔) */
          /* =================================================================== */
          <div className="flex-1 flex flex-col justify-between py-2 sm:py-3 w-full animate-in fade-in duration-300">
            
            {/* Top Transparent Title */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 mb-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C120B]/85 border border-[#8C6D46]/60 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#F5EFEB]">
                  CORRESPONDENTS
                </span>
                <span className="text-[11px] text-[#D8C7B5] font-serif hidden sm:inline">
                  · Select a node to address letter
                </span>
              </div>

              {hasReceiver && showDeskFullView && (
                <button
                  type="button"
                  onClick={() => setShowDeskFullView(false)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3D2617] text-[#F3EFE6] border border-[#D4AF37] text-xs font-serif hover:bg-[#52331F] transition shadow-md"
                >
                  <Feather className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Return to Parchment (To: {activeRecipient?.name})</span>
                </button>
              )}
            </div>

            {/* Recipient Network Web: 100% transparent, floating directly on desk */}
            <div className="w-full my-auto py-2">
              <RecipientNetworkWeb
                sender={figure}
                recipients={figure.recipients}
                selectedRecipient={activeRecipient}
                onSelectRecipient={handleSelectRecipientCard}
              />
            </div>

            {/* Bottom Floating Bar when exploring network */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-[#8C6D46]/30 px-2 mt-auto">
              <div className="flex items-center gap-2">
                {onOpenSystemDiagram && (
                  <button
                    id="btn-desk-bottom-system-diagram"
                    onClick={onOpenSystemDiagram}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B8860B] bg-[#2A2115]/90 text-[#F5D580] hover:bg-[#382B1B] text-xs font-semibold shadow-md transition"
                    title="View System Architecture & Triad Specs"
                  >
                    <Cpu className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>System Diagram</span>
                  </button>
                )}
                <span className="text-xs text-[#D8C7B5] font-serif hidden sm:inline italic">
                  Parchment paper & pen poised on {figure.name}'s desk
                </span>
              </div>

              <span className="text-xs text-[#D4AF37] font-serif font-medium bg-[#1C120B]/85 px-3 py-1.5 rounded-lg border border-[#8C6D46]/40 shadow-sm">
                Select any correspondent node above to begin writing
              </span>
            </div>

          </div>
        ) : (
          /* =================================================================== */
          /* WRITING PARCHMENT SHEET (已选定收信人，展开信纸进行落笔与信件阅读)    */
          /* =================================================================== */
          <div 
            id="writing-parchment-sheet"
            className="relative w-full rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-2 border-[#B8966E] p-4 sm:p-7 flex flex-col transition-all duration-500 text-[#2C180B] min-h-[660px] animate-in fade-in duration-300"
            style={{
              backgroundColor: '#FAF3E7',
              backgroundImage: `
                radial-gradient(ellipse at 50% 8%, rgba(255,255,255,0.45) 0%, rgba(235,215,190,0.2) 100%),
                repeating-linear-gradient(to bottom, transparent, transparent 31px, rgba(140, 109, 70, 0.07) 31px, rgba(140, 109, 70, 0.07) 32px)
              `,
              boxShadow: '0 20px 50px rgba(10,5,2,0.85), inset 0 0 45px rgba(140,90,45,0.08)'
            }}
          >
            {/* Deckled Edge Inner Border & Watermark */}
            <div className="absolute inset-2 sm:inset-3 border border-[#8C6D46]/25 rounded-xl pointer-events-none" />
            <div className="absolute top-5 right-6 opacity-[0.06] pointer-events-none select-none font-cinzel text-5xl font-bold tracking-widest text-[#4A2D1A]">
              {figure.id.toUpperCase()}
            </div>

            {/* Authentic Stationery Letterhead on Parchment Paper */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2.5 mb-2 border-b border-[#8C6D46]/25 text-[#5A3822] font-serif select-none">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#3D2211]">
                  {figure.name}
                </span>
                <span className="text-[#8C6D46]/60">·</span>
                <span className="text-xs italic text-[#70482B]">
                  {deskInfo.locationNote}
                </span>
              </div>
              <div className="text-xs sm:text-[13px] italic text-[#664630]">
                {effectiveLetter?.dateAndLocation || `${figure.city}, ${figure.era}`}
              </div>
            </div>

            {/* =================================================================== */}
            {/* FLOATING LAYER 1: RECIPIENT NETWORK WEB (网状结构，透明底，无背景)   */}
            {/* Transparent floating constellation over the parchment paper         */}
            {/* =================================================================== */}
            <section className="relative z-30 mb-2">
              <div className="flex items-center justify-between px-1 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                  <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#3D2211]">
                    CORRESPONDENTS
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNetworkCollapsed(!isNetworkCollapsed)}
                    className="flex items-center gap-1 text-[11px] font-serif text-[#70482B] hover:text-[#2C180B] px-2 py-0.5 rounded border border-[#C5A882]/50 bg-[#FAF3E6]/70 transition shadow-xs"
                    title={isNetworkCollapsed ? "Expand full network web" : "Collapse to compact strip"}
                  >
                    <span>{isNetworkCollapsed ? '🕸️ View Network' : '▲ Compact Strip'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeskFullView(true)}
                    className="flex items-center gap-1 text-[11px] font-serif text-[#70482B] hover:text-[#2C180B] px-2 py-0.5 rounded border border-[#C5A882]/50 bg-[#FAF3E6]/70 transition shadow-xs"
                    title="View full desk and fountain pen"
                  >
                    <span>👁️ Full Desk View</span>
                  </button>
                </div>
              </div>

              {/* If collapsed: compact horizontal recipient strip (does not block letter!) */}
              {isNetworkCollapsed ? (
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-1 scrollbar-none">
                  {figure.recipients.map((rec) => {
                    const isSelected = activeRecipient?.id === rec.id;
                    return (
                      <button
                        key={rec.id}
                        type="button"
                        onClick={() => handleSelectRecipientCard(rec)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif transition shrink-0 border ${
                          isSelected
                            ? 'bg-[#3D2517] text-[#F5EFEB] font-bold border-[#D4AF37] shadow-xs scale-105'
                            : 'bg-[#EFE5D3]/90 text-[#5A3822] hover:bg-[#E2D2BC] border-[#C5A882]/50'
                        }`}
                      >
                        <img
                          src={getPortraitForPerson(rec.id, rec.name)}
                          alt={rec.name}
                          className="w-5 h-5 rounded-full object-cover border border-[#8C6D46]/40"
                        />
                        <span>{rec.name}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* If expanded: 100% transparent floating network web */
                <div className="relative w-full py-1">
                  <RecipientNetworkWeb
                    sender={figure}
                    recipients={figure.recipients}
                    selectedRecipient={activeRecipient}
                    onSelectRecipient={handleSelectRecipientCard}
                  />
                </div>
              )}
            </section>

          {/* =================================================================== */}
          {/* FLOATING LAYER 2: CATEGORIZED EVENTS                                */}
          {/* =================================================================== */}
          {hasReceiver && (
            <section className="relative z-20 mb-3 rounded-xl border border-[#C5A882]/70 bg-[#FAF3E6]/85 backdrop-blur-sm p-3 shadow-xs text-[#2C180B] transition-all">
              
              {/* Event Header & Category Tabs (Guaranteed not to overflow on any screen) */}
              <div className="flex flex-col gap-2 pb-2 mb-2 border-b border-[#C5A882]/40">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2 h-2 rounded-full bg-[#B8860B] flex-shrink-0" />
                    <span className="font-cinzel text-xs sm:text-sm font-bold text-[#3D2211] tracking-wider truncate">
                      HISTORICAL CONTEXT
                    </span>
                    {selectedEvent && (
                      <span className="text-[11px] font-serif text-[#70482B] truncate hidden md:inline">
                        · {selectedEvent.title.replace(/\s*\(\d{4}\).*$/, '').trim()}
                      </span>
                    )}
                  </div>

                  {/* Collapse / Expand Toggle */}
                  <button
                    onClick={() => setIsEventsCollapsed(!isEventsCollapsed)}
                    className="flex-shrink-0 px-2 py-0.5 rounded text-[10.5px] font-serif text-[#664630] hover:text-[#2C180B] hover:bg-[#EFE3CF]/60 border border-[#C5A882]/40 transition"
                    title={isEventsCollapsed ? "Expand historical events" : "Collapse historical events"}
                  >
                    {isEventsCollapsed ? "Expand" : "Collapse"}
                  </button>
                </div>

                {/* Category Filter Pills (cleanly wrapped, never overflows) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {EVENT_CATEGORIES.map((cat) => {
                    const count = cat.id === 'all' 
                      ? allEventsList.length 
                      : allEventsList.filter(e => e.category === cat.id).length;
                    const isActive = selectedCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-serif transition whitespace-nowrap ${
                          isActive
                            ? 'bg-[#B8860B] text-[#FFF] font-bold shadow-xs'
                            : 'bg-[#EFE5D3] text-[#5A3822] hover:bg-[#E2D2BC] border border-[#C5A882]/40'
                        }`}
                        title={cat.description}
                      >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                        <span className={`text-[9px] px-1 rounded-full ${
                          isActive ? 'bg-[#FFF]/25 text-[#FFF]' : 'bg-[#FAF3E6] text-[#70482B]'
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Categorized Events Scrollable Row / Grid */}
              {!isEventsCollapsed && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                  {filteredEvents.length === 0 ? (
                    <div className="col-span-full py-3 text-center text-xs font-serif text-[#70482B] italic">
                      No historical events recorded under this category for this correspondent.
                    </div>
                  ) : (
                    filteredEvents.map((item) => {
                      const isSelected = selectedEvent?.id === item.id;
                      const categoryInfo = EVENT_CATEGORIES.find(c => c.id === item.category);

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectEventItem(item.asOption)}
                          className={`group relative p-2.5 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'border-[#B8860B] bg-[#F7EFE0] ring-1 ring-[#B8860B] shadow-xs'
                              : 'border-[#D5C2AA]/70 bg-[#FFFDF9]/80 hover:border-[#B8860B] hover:bg-[#FFF] text-[#3D2517]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] font-bold text-[#6E421F] bg-[#EFE3CF] px-1.5 py-0.5 rounded border border-[#C5A882]/40">
                                {item.year}
                              </span>
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FAF3E6] text-[#70482B] border border-[#C5A882]/30">
                                {categoryInfo?.icon} {categoryInfo?.label}
                              </span>
                            </div>
                            {isSelected && <Check className="h-3 w-3 text-[#B8860B] flex-shrink-0" />}
                          </div>

                          <h5 className="font-cinzel text-xs font-bold text-[#2C180B] line-clamp-1 mb-1">
                            {item.title.replace(/\s*\(\d{4}\).*$/, '').trim()}
                          </h5>

                          <p className="text-[10px] font-serif text-[#5A3822] line-clamp-2 leading-relaxed">
                            {item.summary}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Selected Event Details & Contemporary Witnesses Bar */}
              {selectedEvent && !isEventsCollapsed && (
                <div className="mt-2.5 pt-2 border-t border-[#C5A882]/40 flex flex-wrap items-center justify-between gap-2 text-[11px] font-serif text-[#5A3822]">
                  <div className="flex items-center gap-1.5 truncate max-w-full sm:max-w-md">
                    <span className="text-[#B8860B] font-bold">📌 Event:</span>
                    <span className="font-semibold text-[#2C180B] truncate">
                      {selectedEvent.title.replace(/\s*\(\d{4}\).*$/, '').trim()} ({selectedEvent.year})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {sharedPeople.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-[#70482B]">
                        <Users className="h-3 w-3 text-[#B8860B]" />
                        <span>Witnesses: {sharedPeople.slice(0, 3).join(', ')}</span>
                      </div>
                    )}
                    {selectedEvent.historicalEvidence && (
                      <button
                        onClick={() => setShowArchivalProof(!showArchivalProof)}
                        className="text-[10px] font-serif text-[#B8860B] hover:text-[#2C180B] underline flex items-center gap-0.5"
                      >
                        <span>Archival Proof</span>
                        {showArchivalProof ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Expanded Archival Quote & Historical Citations */}
              {showArchivalProof && selectedEvent && !isEventsCollapsed && (
                <div className="mt-2 p-2.5 rounded-lg border border-[#C5A882]/50 bg-[#EFE3CF]/60 text-[11px] font-serif text-[#3D2517] animate-in fade-in duration-200">
                  <div className="flex items-start gap-2">
                    <Quote className="h-4 w-4 text-[#B8860B] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="italic text-[#2C180B]">
                        "{selectedEvent.historicalEvidence}"
                      </p>
                      <p className="mt-1 text-[10px] text-[#70482B]">
                        Historical context: {selectedEvent.context}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </section>
          )}

          {/* =================================================================== */}
          {/* FLOATING LAYER 3: PARCHMENT MANUSCRIPT (信纸正文落款与书写区)         */}
          {/* =================================================================== */}
          <div className="flex-1 flex flex-col pt-1 sm:pt-2">
            
            {/* 1. STATE: BLANK PARCHMENT */}
            {writingMode === 'blank' && (
                  <div 
                    className="flex-1 flex flex-col items-center justify-center text-center p-6 cursor-pointer group my-4 rounded-xl border border-[#8C6D46]/15 hover:border-[#8C6D46]/40 transition"
                    onClick={() => {
                      setWritingMode('interactive');
                      playSoundEffect('scratch');
                    }}
                    title="Click anywhere to take up the pen and write"
                  >
                    <div className="flex flex-col items-center gap-2 p-4 rounded-xl max-w-md">
                      <Feather className="h-8 w-8 text-[#8C6D46] group-hover:text-[#D4AF37] group-hover:scale-110 transition duration-300" />
                      <h4 className="font-cinzel text-sm font-bold text-[#3D2211]">
                        Parchment Ready on {figure.name}'s Desk
                      </h4>
                      <p className="font-serif text-xs text-[#5A3822] leading-relaxed">
                        Addressed to <strong className="text-[#2C180B]">{activeRecipient?.name}</strong>.
                        <br />
                        Click to pen freeform thoughts, or click <strong className="text-[#2C180B]">"Pen Historical Letter"</strong> below to channel their authentic 1911-1930 cadence.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. STATE: INTERACTIVE FREELANCE WRITING */}
                {writingMode === 'interactive' && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-2 flex items-center justify-between text-xs font-serif text-[#5A3822] border-b border-[#664630]/15 pb-1">
                      <span className="italic">{deskInfo.locationNote}</span>
                      <span>From {figure.name} to {activeRecipient?.name}</span>
                    </div>

                    <textarea
                      id="parchment-user-textarea"
                      value={userText}
                      onChange={handleUserTextChange}
                      placeholder={`Write your letter here in the hand of ${figure.name}, addressing ${activeRecipient?.name}...`}
                      className="w-full flex-1 bg-transparent resize-none outline-none font-serif text-sm sm:text-base leading-relaxed text-[#2C180B] placeholder-[#664630]/60 select-text min-h-[220px]"
                      autoFocus
                      style={{
                        lineHeight: '1.9',
                        fontFamily: "'Playfair Display', Georgia, serif"
                      }}
                    />

                    <div className="mt-3 pt-2 border-t border-[#664630]/20 flex items-center justify-between text-[11px] font-serif text-[#5A3822]">
                      <span>{userText.trim().split(/\s+/).filter(Boolean).length} words penned</span>
                      <button
                        onClick={() => {
                          if (userText) {
                            navigator.clipboard.writeText(userText);
                            setCopiedNotification(true);
                            setTimeout(() => setCopiedNotification(false), 2000);
                          }
                        }}
                        className="hover:text-[#2C180B] underline transition"
                      >
                        {copiedNotification ? 'Copied to Clipboard' : 'Copy Draft Text'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. STATE: ARCHIVAL LETTER DISPATCH */}
                {writingMode === 'archival' && (
                  <div className="flex-1 flex flex-col justify-between font-serif text-[#2C180B] select-text">
                    {isGenerating ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                        <Feather className="h-8 w-8 text-[#8C6D46] animate-bounce" />
                        <p className="font-cinzel text-sm font-semibold text-[#4A2D1A] tracking-wider">
                          Transcribing Historical Dispatch...
                        </p>
                        <p className="text-xs text-[#6A472E] italic max-w-sm">
                          Channeling {figure.name}'s epistolary cadence to {activeRecipient?.name} regarding {selectedEvent?.title || 'their shared history'}...
                        </p>
                      </div>
                    ) : effectiveLetter ? (
                      <div className="space-y-3">
                        {/* Salutation & Date */}
                        <div className="flex justify-between items-baseline text-xs text-[#5A3822] border-b border-[#664630]/15 pb-1 mb-2">
                          <span className="italic">{effectiveLetter.dateAndLocation}</span>
                          <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-[#4A2D1A]/10 text-[#5A3822]">
                            {effectiveLetter.generationSource === 'gemini-agent' ? 'Archival Synthesis (AI)' : 'Primary Record Draft'}
                          </span>
                        </div>

                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C180B]">
                          {effectiveLetter.salutation}
                        </h4>

                        {/* Body Paragraphs */}
                        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#2C180B]">
                          {effectiveLetter.bodyParagraphs.map((para, idx) => (
                            <p key={idx} style={{ textIndent: '1.25rem' }}>{para}</p>
                          ))}
                        </div>

                        {/* Valediction & Signature */}
                        <div className="mt-4 flex items-end justify-between pt-2">
                          <div className="w-12 h-12 rounded-full border-2 border-[#8C2318] bg-[#A1281A] flex items-center justify-center text-[#F5EDE1] shadow-md transform rotate-6 select-none opacity-85">
                            <span className="font-cinzel text-[10px] font-bold tracking-tighter">SEAL</span>
                          </div>

                          <div className="text-right">
                            <p className="font-serif italic text-xs sm:text-sm font-semibold text-[#2C180B]">
                              {effectiveLetter.valediction}
                            </p>
                            <p className="font-cinzel text-xs font-bold tracking-wider text-[#3D2211] mt-0.5">
                              {figure.name}
                            </p>
                          </div>
                        </div>

                        {effectiveLetter.postScriptum && (
                          <p className="mt-3 text-[11px] text-[#5A3822] italic border-t border-[#664630]/20 pt-2">
                            {effectiveLetter.postScriptum}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                        <BookOpen className="h-6 w-6 text-[#8C6D46] mb-2" />
                        <p className="text-xs text-[#5A3822] mb-3">
                          No archival letter inked yet. Select an event category above and tap "Pen Historical Letter".
                        </p>
                        <button
                          onClick={handleGenerateClick}
                          className="flex items-center gap-1.5 rounded-lg border border-[#8C6D46] bg-[#3D2617] px-3.5 py-1.5 text-xs text-[#F2DFCE] hover:bg-[#52331F] transition shadow"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                          <span>Pen Letter Now</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

          {/* =================================================================== */}
          {/* FLOATING BOTTOM ACTION DOCK (落笔与工具栏，漂浮在信纸底部)           */}
          {/* =================================================================== */}
          <div className="relative z-30 mt-4 pt-3 border-t border-[#8C6D46]/25 flex flex-wrap items-center justify-between gap-2.5">
            
            {/* Left: Freeform writing & Copy */}
            <div className="flex items-center gap-2">
              {writingMode !== 'interactive' && hasReceiver && (
                <button
                  onClick={() => {
                    setWritingMode('interactive');
                    playSoundEffect('scratch');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8C6D46]/30 bg-[#FAF4EA]/80 text-[#5A3822] hover:text-[#2C180B] hover:border-[#8C6D46] text-xs font-serif transition shadow-xs"
                >
                  <Edit3 className="h-3.5 w-3.5 text-[#8C6D46]" />
                  <span>Freeform Write</span>
                </button>
              )}

              {effectiveLetter && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${effectiveLetter.salutation}\n\n${effectiveLetter.bodyParagraphs.join('\n\n')}\n\n${effectiveLetter.valediction}\n${figure.name}`
                    );
                    setCopiedNotification(true);
                    setTimeout(() => setCopiedNotification(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8C6D46]/30 bg-[#FAF4EA]/80 text-[#5A3822] hover:text-[#2C180B] text-xs font-serif transition shadow-xs"
                >
                  <Check className="h-3.5 w-3.5 text-[#8C6D46]" />
                  <span>{copiedNotification ? 'Letter Copied' : 'Copy Letter'}</span>
                </button>
              )}

              {/* Crucial: System Diagram Button preserved at the bottom */}
              {onOpenSystemDiagram && (
                <button
                  id="btn-desk-bottom-system-diagram"
                  onClick={onOpenSystemDiagram}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B8860B] bg-[#2A2115] text-[#F5D580] hover:bg-[#382B1B] text-xs font-semibold shadow-xs transition"
                  title="View System Architecture & Triad Specs"
                >
                  <Cpu className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>System Diagram</span>
                </button>
              )}
            </div>

            {/* Right: Primary Inking Action */}
            <div className="flex items-center gap-2">
              <button
                id="btn-pen-historical-letter"
                onClick={handleGenerateClick}
                disabled={!hasReceiver || isGenerating}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-serif font-semibold transition shadow-md ${
                  !hasReceiver
                    ? 'border border-[#8C6D46]/40 bg-[#251810] text-[#7A6250] cursor-not-allowed'
                    : 'border border-[#D4AF37] bg-gradient-to-r from-[#3D2517] via-[#52331F] to-[#3D2517] text-[#F7EFE4] hover:border-[#F3EFE6] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                }`}
              >
                <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                <span>
                  {isGenerating ? 'Inking Parchment...' : 'Pen Historical Letter'}
                </span>
              </button>
            </div>

          </div>

        </div>
      )}

      </main>

      {/* 5. BOTTOM PERIOD MATERIALITY FOOTER */}
      <footer className={`relative z-30 transition-all duration-300 py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#3A2417]/40 bg-[#140C07]/70 backdrop-blur-sm ${
        zenMode ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}>
        <div className="flex items-center gap-2 text-[11px] text-[#A89481] font-serif">
          <Feather className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>{deskInfo.instrumentDescription}</span>
          <span className="text-[#594231]">•</span>
          <span>{deskInfo.inkDescription}</span>
        </div>

        <div className="text-[11px] text-[#7A6858] font-serif">
          Epistolary Triad: Marie Curie (1911) · Albert Einstein (1922) · Rabindranath Tagore (1930)
        </div>
      </footer>

      {/* 6. MODERN BREAKDOWN & TEMPORAL SPEED MODAL */}
      {isBreakdownModalOpen && letter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-xl border border-[#8C6D46]/50 bg-[#180E09] p-6 text-[#E3D4C4] shadow-2xl overflow-y-auto max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#8C6D46]/30">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-[#D4AF37]" />
                <h3 className="font-cinzel text-base font-bold text-[#F3EFE6]">
                  Modern Perspective & Archival Breakdown
                </h3>
              </div>
              <button
                onClick={() => setIsBreakdownModalOpen(false)}
                className="p-1 rounded text-[#9E8B7A] hover:text-[#FFF]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 font-serif text-xs leading-relaxed">
              {/* Temporal Speed */}
              <div className="p-3.5 rounded-lg border border-[#664630]/40 bg-[#22150D]">
                <h5 className="font-cinzel text-xs font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">
                  Temporal Transit Delta
                </h5>
                <p className="text-[#D8C7B8]">
                  {letter.modernBreakdown.temporalSpeedComparison}
                </p>
              </div>

              {/* Etiquette & Censorship */}
              <div className="p-3.5 rounded-lg border border-[#664630]/40 bg-[#22150D]">
                <h5 className="font-cinzel text-xs font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">
                  Social Etiquette & Censorship Constraints
                </h5>
                <p className="text-[#D8C7B8]">
                  {letter.modernBreakdown.culturalHierarchiesEtiquette}
                </p>
              </div>

              {/* Material Cost */}
              <div className="p-3.5 rounded-lg border border-[#664630]/40 bg-[#22150D]">
                <h5 className="font-cinzel text-xs font-bold text-[#D4AF37] mb-1 uppercase tracking-wider">
                  Materiality & Economic Cost of Writing
                </h5>
                <p className="text-[#D8C7B8]">
                  {letter.modernBreakdown.materialCostAndPhysicality}
                </p>
              </div>

              {/* Primary Citations */}
              <div className="p-3.5 rounded-lg border border-[#664630]/40 bg-[#22150D]">
                <h5 className="font-cinzel text-xs font-bold text-[#D4AF37] mb-1.5 uppercase tracking-wider">
                  Primary Archival Citations
                </h5>
                <ul className="space-y-1 list-disc pl-4 text-[#B8A695]">
                  {letter.modernBreakdown.historicalEvidenceCitations.map((cit, idx) => (
                    <li key={idx}>{cit}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#8C6D46]/30 flex justify-end">
              <button
                onClick={() => setIsBreakdownModalOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-[#8C6D46] bg-[#3D2617] text-xs font-serif text-[#F2DFCE] hover:bg-[#52331F]"
              >
                Close Breakdown
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
