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
  Share2, 
  Sparkles, 
  Edit3, 
  Eye, 
  EyeOff, 
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
  ChevronRight,
  HelpCircle,
  Maximize2,
  Lock
} from 'lucide-react';
import { 
  SceneIllustration, 
  RecipientVisualStamp, 
  WitnessCameo, 
  VisualMoodSphere, 
  VisualToneSeal 
} from './HistoricalVisualScenes';

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

  // Zen mode: hides all HUD controls for pure contemplation of the desk
  const [zenMode, setZenMode] = useState(false);

  // Parchment mode: starts 'blank' ("without the texts on the page")
  const [writingMode, setWritingMode] = useState<'blank' | 'interactive' | 'archival'>('blank');
  const [userText, setUserText] = useState('');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // User directive: before user starts to write, they need to select receivers first and then all other elements reveal
  const hasReceiver = Boolean(selectedRecipient);
  const activeRecipient = selectedRecipient || null;

  // Right-hand Dossier panel toggle & active tab
  // If receiver is not yet selected, always default to 'recipients' so user selects receiver first
  const [isDossierCollapsed, setIsDossierCollapsed] = useState(false);
  const [activeDossierTab, setActiveDossierTab] = useState<'recipients' | 'events' | 'people' | 'tone'>(
    selectedRecipient ? 'events' : 'recipients'
  );
  const [promptReceiverSelection, setPromptReceiverSelection] = useState(false);
  const [dossierVisualMode, setDossierVisualMode] = useState(true);

  // Keep tab on recipients if receiver is cleared
  useEffect(() => {
    if (!selectedRecipient) {
      setActiveDossierTab('recipients');
    }
  }, [selectedRecipient]);

  // Breakdown modal state
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);

  // Desk asset selection based on figure
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
      penName: 'Gold-Trim Fountain Pen',
      instrumentDescription: 'Glossy black fountain pen with gold trim bands & gold nib',
      inkDescription: 'Square glass inkwell with midnight black ink',
      locationNote: 'Princeton Study · Mercer Street, New Jersey'
    },
    tagore: {
      src: '/assets/tagore_desk.jpg',
      penName: 'Slender Blonde Wood Dip Pen',
      instrumentDescription: 'Tapered blonde natural wood dip pen with precision nib',
      inkDescription: 'Hand-thrown earthen clay ink pot with deep sepia pigment',
      locationNote: 'Santiniketan Writing Desk · Bengal, India'
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

  // Sound synthesis for authentic ambient candle crackle and pen scratch
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

  // Handle typing inside the parchment if user opts into interactive writing
  const handleUserTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value);
    playSoundEffect('scratch');
  };

  // Switch to archival view whenever a new letter arrives
  useEffect(() => {
    if (letter && writingMode === 'blank') {
      // Keep blank initially as user requested, but if generated by explicit click, switch
    }
  }, [letter]);

  const handleGenerateClick = () => {
    playSoundEffect('scratch');
    if (onGenerateLetter) {
      onGenerateLetter();
    }
    // Switch to archival viewing mode
    setWritingMode('archival');
  };

  const handleEpisodeSelect = (ep: HistoricalSharedEpisode) => {
    const eventOption = episodeToEventOption(ep);
    onSelectEvent(eventOption);
    playSoundEffect('scratch');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#160D08] select-none flex flex-col justify-between">
      
      {/* 1. PHOTOREALISTIC DESK BACKGROUND */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('${deskInfo.src}')`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      />

      {/* 2. ATMOSPHERIC CANDLELIGHT FLICKER OVERLAY */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 animate-pulse"
        style={{
          background: `radial-gradient(ellipse at 88% 25%, rgba(255, 185, 80, 0.45) 0%, rgba(212, 120, 20, 0.15) 35%, transparent 70%)`,
          animationDuration: '3.5s'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 55%, rgba(12, 7, 4, 0.65) 100%)`
        }}
      />

      {/* 3. TOP FLOATING HUD & NAVIGATION BAR */}
      <header className={`relative z-30 transition-all duration-300 px-4 sm:px-8 pt-4 pb-2 flex items-center justify-between ${
        zenMode ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}>
        {/* Left: Change Pen & Writer Bio */}
        <div className="flex items-center gap-3">
          <button
            id="btn-desk-back-to-pens"
            onClick={onBackToPens}
            className="flex items-center gap-2 rounded-xl border border-[#8C6D46]/40 bg-[#1C120B]/85 px-3.5 py-2 text-xs font-serif font-medium text-[#F5EDE3] shadow-lg backdrop-blur-md transition hover:border-[#D4AF37] hover:bg-[#2B1B10] hover:text-[#FFF]"
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

        {/* Right: Desk Controls & Mode Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            id="btn-desk-toggle-sound"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 rounded-lg border border-[#523825]/60 bg-[#1A1009]/80 px-2.5 py-1.5 text-xs text-[#C5B3A1] backdrop-blur-sm transition hover:border-[#D4AF37] hover:text-[#FFF]"
            title={soundEnabled ? 'Mute desk audio' : 'Enable candle & pen tactile audio'}
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-[#D4AF37]" /> : <VolumeX className="h-3.5 w-3.5 text-[#705F52]" />}
            <span className="hidden md:inline text-[11px]">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          {/* Triad Star Map */}
          <button
            id="btn-desk-open-triad"
            onClick={onOpenTriadMap}
            className="flex items-center gap-1.5 rounded-lg border border-[#8C6D46]/40 bg-[#1F140D]/80 px-3 py-1.5 text-xs font-medium text-[#E3D4C4] backdrop-blur-sm transition hover:border-[#D4AF37] hover:bg-[#2D1B11] hover:text-[#FFF]"
          >
            <Layers className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Triad Map</span>
          </button>

          {/* Recipient Network */}
          <button
            id="btn-desk-open-network"
            onClick={onOpenNetwork}
            className="flex items-center gap-1.5 rounded-lg border border-[#8C6D46]/40 bg-[#1F140D]/80 px-3 py-1.5 text-xs font-medium text-[#E3D4C4] backdrop-blur-sm transition hover:border-[#D4AF37] hover:bg-[#2D1B11] hover:text-[#FFF]"
          >
            <Share2 className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Network</span>
          </button>

          {/* Zen View (Hide UI) */}
          <button
            id="btn-desk-zen-mode"
            onClick={() => setZenMode(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#664630]/60 bg-[#1A1009]/80 px-2.5 py-1.5 text-xs text-[#C5B3A1] backdrop-blur-sm transition hover:border-[#D4AF37] hover:text-[#FFF]"
            title="Hide controls for atmospheric view"
          >
            <EyeOff className="h-3.5 w-3.5 text-[#C5B3A1]" />
            <span className="hidden md:inline text-[11px]">Atmosphere</span>
          </button>
        </div>
      </header>

      {/* Zen Mode Wake Button */}
      {zenMode && (
        <button
          onClick={() => setZenMode(false)}
          className="absolute top-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-[#8C6D46]/50 bg-[#1F130B]/80 px-3 py-1.5 text-xs font-serif text-[#D4AF37] backdrop-blur-md transition hover:bg-[#2E1C10]"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Show Controls</span>
        </button>
      )}

      {/* 4. MAIN DESK WORKSPACE: DUAL PANE LAYOUT (Parchment on Left, Dispatch Dossier on Right) */}
      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col lg:flex-row gap-6 items-stretch justify-between">
        
        {/* ========================================================================= */}
        {/* LEFT PANE: THE PERIOD PARCHMENT SHEET */}
        {/* ========================================================================= */}
        <div className={`flex flex-col justify-center transition-all duration-500 ${
          isDossierCollapsed ? 'w-full max-w-3xl mx-auto' : 'w-full lg:w-[48%] xl:w-[44%]'
        }`}>
          
          {/* Parchment Sub-header Toolbar */}
          {!zenMode && (
            <div className="mb-2 flex items-center justify-between px-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-[11px] font-bold text-[#EEDCC9] tracking-wider">
                  {!hasReceiver && 'Parchment : Awaiting Recipient'}
                  {hasReceiver && writingMode === 'blank' && 'Parchment : Clean & Untouched'}
                  {hasReceiver && writingMode === 'interactive' && 'Parchment : Pen in Hand'}
                  {hasReceiver && writingMode === 'archival' && 'Parchment : Historical Transcript'}
                </span>
              </div>

              {/* Mode switch actions only visible once receiver is selected */}
              {hasReceiver && (
                <div className="flex items-center gap-1.5">
                  {writingMode === 'blank' ? (
                    <button
                      id="btn-desk-start-penning"
                      onClick={() => {
                        setWritingMode('interactive');
                        playSoundEffect('scratch');
                      }}
                      className="flex items-center gap-1 rounded bg-[#2D1B11]/90 border border-[#8C6D46]/50 px-2 py-0.5 text-[10px] font-serif text-[#D4AF37] hover:bg-[#3D2517] transition"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Pen Freeform</span>
                    </button>
                  ) : (
                    <button
                      id="btn-desk-clear-parchment"
                      onClick={() => {
                        setWritingMode('blank');
                        setUserText('');
                      }}
                      className="flex items-center gap-1 rounded bg-[#2D1B11]/90 border border-[#8C6D46]/50 px-2 py-0.5 text-[10px] font-serif text-[#C5B3A1] hover:text-[#FFF] hover:bg-[#3D2517] transition"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Clear Paper</span>
                    </button>
                  )}

                  {letter && writingMode !== 'archival' && (
                    <button
                      id="btn-desk-load-letter"
                      onClick={() => setWritingMode('archival')}
                      className="flex items-center gap-1 rounded bg-[#2D1B11]/90 border border-[#8C6D46]/50 px-2 py-0.5 text-[10px] font-serif text-[#E0C9A6] hover:bg-[#3D2517] transition"
                    >
                      <BookOpen className="h-3 w-3" />
                      <span>View Letter</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* THE PARCHMENT PAPER CONTAINER */}
          <div 
            className="relative w-full rounded-sm min-h-[460px] sm:min-h-[520px] max-h-[75vh] p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 overflow-y-auto"
            style={{
              background: 'transparent',
            }}
          >
            {/* 0. STATE: AWAITING RECEIVER SELECTION */}
            {!hasReceiver ? (
              <div 
                className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 cursor-pointer group"
                onClick={() => {
                  setActiveDossierTab('recipients');
                  setPromptReceiverSelection(true);
                  setTimeout(() => setPromptReceiverSelection(false), 2500);
                }}
              >
                <div className="w-16 h-16 rounded-full bg-[#2B1B10]/70 border-2 border-dashed border-[#D4AF37]/50 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 animate-pulse">
                  <Feather className="h-7 w-7 text-[#D4AF37]" />
                </div>

                <div className="space-y-1.5 max-w-xs">
                  <h4 className="font-cinzel text-base font-bold text-[#3D2211] tracking-wider uppercase">
                    Parchment Awaiting Recipient
                  </h4>
                  <p className="font-serif text-xs text-[#5C3920] leading-relaxed">
                    Select a letter receiver from the philatelic stamps on the right. Once chosen, mutual historical episodes, witness cameos, and pen controls will reveal.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3D2211]/15 border border-[#8C6D46]/40 text-[#3D2211] text-xs font-serif font-semibold shadow-sm">
                  <Lock className="h-3.5 w-3.5 text-[#8C6D46]" />
                  <span>Choose Receiver on Right to Unlock</span>
                </div>
              </div>
            ) : (
              <>
                {/* 1. STATE: PURE BLANK PARCHMENT */}
                {writingMode === 'blank' && (
                  <div 
                    className="flex-1 flex flex-col items-center justify-center text-center p-4 cursor-pointer group"
                    onClick={() => {
                      setWritingMode('interactive');
                      playSoundEffect('scratch');
                    }}
                    title="Tap anywhere to take up the pen and write"
                  >
                    <div className="opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col items-center gap-2 bg-[#2B1B10]/70 p-4 rounded-xl border border-[#8C6D46]/40 backdrop-blur-sm max-w-xs shadow-xl">
                      <Feather className="h-6 w-6 text-[#D4AF37]" />
                      <span className="font-serif text-xs text-[#F2DFCE] tracking-wider leading-relaxed">
                        Parchment addressed to {activeRecipient?.name}. Tap to write freeform, or choose a historical event on the right to pen a letter.
                      </span>
                    </div>
                  </div>
                )}

            {/* 2. STATE: INTERACTIVE FREELANCE WRITING */}
            {writingMode === 'interactive' && (
              <div className="flex-1 flex flex-col">
                <div className="mb-2 text-right">
                  <span className="font-serif text-[11px] text-[#5A3822] italic">
                    From the desk of {figure.name} to {activeRecipient.name}
                  </span>
                </div>

                <textarea
                  id="parchment-user-textarea"
                  value={userText}
                  onChange={handleUserTextChange}
                  placeholder={`Write your letter here in the hand of ${figure.name}, addressing ${activeRecipient.name}...`}
                  className="w-full flex-1 bg-transparent resize-none outline-none font-serif text-sm sm:text-base leading-relaxed text-[#2C180B] placeholder-[#664630]/70 select-text"
                  autoFocus
                  style={{
                    lineHeight: '1.8',
                    fontFamily: "'Playfair Display', Georgia, serif"
                  }}
                />

                <div className="mt-4 pt-2 border-t border-[#664630]/20 flex items-center justify-between text-[11px] font-serif text-[#5A3822]">
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
                    {copiedNotification ? 'Copied to Clipboard' : 'Copy Text'}
                  </button>
                </div>
              </div>
            )}

            {/* 3. STATE: ARCHIVAL LETTER */}
            {writingMode === 'archival' && (
              <div className="flex-1 flex flex-col justify-between font-serif text-[#2C180B] select-text">
                {isGenerating ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <Feather className="h-8 w-8 text-[#8C6D46] animate-bounce" />
                    <p className="font-cinzel text-sm font-semibold text-[#4A2D1A] tracking-wider">
                      Transcribing Historical Dispatch...
                    </p>
                    <p className="text-xs text-[#6A472E] italic max-w-xs">
                      Channeling {figure.name}'s epistolary cadence to {activeRecipient.name} regarding {selectedEvent?.title || 'their shared history'}...
                    </p>
                  </div>
                ) : letter ? (
                  <div>
                    {/* Salutation & Date */}
                    <div className="mb-3 flex justify-between items-baseline text-xs text-[#5A3822]">
                      <span className="italic">{letter.dateAndLocation}</span>
                      <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-[#4A2D1A]/10 text-[#5A3822]">
                        {letter.generationSource === 'gemini-agent' ? 'Archival Agent' : 'Archival Record'}
                      </span>
                    </div>

                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C180B] mb-3">
                      {letter.salutation}
                    </h4>

                    {/* Body Paragraphs */}
                    <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#2C180B]">
                      {letter.bodyParagraphs.map((para, idx) => (
                        <p key={idx} style={{ textIndent: '1.25rem' }}>{para}</p>
                      ))}
                    </div>

                    {/* Valediction */}
                    <div className="mt-4 text-right">
                      <p className="font-serif italic text-xs sm:text-sm font-semibold text-[#2C180B]">
                        {letter.valediction}
                      </p>
                      <p className="font-cinzel text-xs font-bold tracking-wider text-[#3D2211] mt-0.5">
                        {figure.name}
                      </p>
                    </div>

                    {letter.postScriptum && (
                      <p className="mt-3 text-[11px] text-[#5A3822] italic border-t border-[#664630]/20 pt-2">
                        {letter.postScriptum}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                    <BookOpen className="h-6 w-6 text-[#8C6D46] mb-2" />
                    <p className="text-xs text-[#5A3822] mb-3">
                      No letter penned yet. Select your event and correspondent on the right, then click "Pen Historical Letter".
                    </p>
                    <button
                      onClick={handleGenerateClick}
                      className="flex items-center gap-1.5 rounded-lg border border-[#8C6D46] bg-[#3D2617] px-3 py-1.5 text-xs text-[#F2DFCE] hover:bg-[#52331F] transition shadow"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>Pen Letter Now</span>
                    </button>
                  </div>
                )}

                {/* Archival Actions Footer */}
                {letter && !isGenerating && (
                  <div className="mt-4 pt-2 border-t border-[#664630]/20 flex items-center justify-between text-[11px] text-[#5A3822]">
                    <button
                      onClick={() => setWritingMode('blank')}
                      className="hover:text-[#2C180B] underline transition"
                    >
                      ← Revert to Blank Paper
                    </button>
                    <button
                      onClick={() => setIsBreakdownModalOpen(true)}
                      className="flex items-center gap-1 font-medium text-[#3D2211] hover:underline"
                    >
                      <Info className="h-3 w-3 text-[#8C6D46]" />
                      <span>Historical Breakdown</span>
                    </button>
                  </div>
                )}
              </div>
            )}
              </>
            )}

          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANE: THE EPISTOLARY DOSSIER & CORRESPONDENCE REGISTER */}
        {/* User request: selection of letter receivers, events and people */}
        {/* supported by what previously happened between writer and receiver */}
        {/* ========================================================================= */}
        {!zenMode && (
          <div className={`flex flex-col transition-all duration-500 ${
            isDossierCollapsed ? 'w-10 overflow-hidden' : 'w-full lg:w-[52%] xl:w-[56%]'
          }`}>
            
            {/* Dossier Outer Book Wrapper */}
            <div className="relative flex-1 flex flex-col rounded-xl border border-[#8C6D46]/40 bg-[#160E09]/90 shadow-2xl backdrop-blur-md overflow-hidden text-[#E3D4C4]">
              
              {/* Dossier Header Bar */}
              <div className="p-3.5 border-b border-[#8C6D46]/30 bg-[#1F130B]/90 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {!hasReceiver ? (
                    <>
                      <div className="h-2 w-2 rounded-full bg-[#E5A93C] animate-ping" />
                      <span className="font-cinzel text-xs font-bold text-[#F3EFE6] tracking-wider uppercase">
                        Step 1: Select Letter Receiver
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="font-cinzel text-xs font-bold text-[#F3EFE6] tracking-wider uppercase">
                        To: {activeRecipient?.name}
                      </span>
                      <button
                        onClick={() => setActiveDossierTab('recipients')}
                        className="ml-1 text-[10px] text-[#D4AF37] hover:underline"
                        title="Change letter recipient"
                      >
                        (Change)
                      </button>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {/* Mode Toggle: Visual vs Text */}
                  <div className="flex items-center p-0.5 rounded-lg bg-[#25150C] border border-[#8C6D46]/40 text-[10px]">
                    <button
                      onClick={() => setDossierVisualMode(true)}
                      className={`px-2 py-0.5 rounded-md font-sans transition ${
                        dossierVisualMode
                          ? 'bg-[#D4AF37] text-[#160E09] font-bold shadow'
                          : 'text-[#9E8B7A] hover:text-[#FFF]'
                      }`}
                      title="Visual Diorama Mode (Minimal Text)"
                    >
                      🎨 Visual
                    </button>
                    <button
                      onClick={() => setDossierVisualMode(false)}
                      className={`px-2 py-0.5 rounded-md font-sans transition ${
                        !dossierVisualMode
                          ? 'bg-[#D4AF37] text-[#160E09] font-bold shadow'
                          : 'text-[#9E8B7A] hover:text-[#FFF]'
                      }`}
                      title="Archival Text Mode"
                    >
                      📜 Text
                    </button>
                  </div>

                  <span className="hidden xl:inline text-[11px] text-[#A69280] font-serif">
                    <strong className="text-[#E8D9C8]">{figure.name.split(' ')[0]}</strong>
                  </span>
                  <button
                    onClick={() => setIsDossierCollapsed(!isDossierCollapsed)}
                    className="p-1 rounded hover:bg-[#2F1D11] text-[#A69280] hover:text-[#FFF] transition"
                    title={isDossierCollapsed ? 'Expand Dossier' : 'Collapse Dossier'}
                  >
                    <ChevronRight className={`h-4 w-4 transition-transform ${isDossierCollapsed ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Gating prompt alert if user tries to jump tabs before selecting receiver */}
              {promptReceiverSelection && (
                <div className="px-3.5 py-1.5 bg-[#8C5D33]/90 border-b border-[#D4AF37] text-white text-[11px] font-sans flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3 w-3 text-[#FFE699]" />
                    <span>Please select a letter receiver stamp first. All other elements will reveal.</span>
                  </div>
                  <button onClick={() => setPromptReceiverSelection(false)} className="text-white hover:text-[#FFE699]">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Dossier Tab Navigation */}
              <div className="flex items-center border-b border-[#8C6D46]/25 bg-[#1A1009]/80 px-2 pt-1 overflow-x-auto">
                <button
                  id="tab-select-recipient"
                  onClick={() => setActiveDossierTab('recipients')}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-serif border-b-2 transition whitespace-nowrap ${
                    activeDossierTab === 'recipients'
                      ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#26170E]/50'
                      : 'border-transparent text-[#9E8B7A] hover:text-[#D4AF37]'
                  }`}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>1. Receivers ({figure.recipients.length})</span>
                  {!hasReceiver && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#D4AF37] text-[#160E09] text-[9px] font-mono font-bold animate-pulse">
                      Select First
                    </span>
                  )}
                </button>

                <button
                  id="tab-select-events"
                  onClick={() => {
                    if (!hasReceiver) {
                      setPromptReceiverSelection(true);
                      setTimeout(() => setPromptReceiverSelection(false), 2500);
                      return;
                    }
                    setActiveDossierTab('events');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-serif border-b-2 transition whitespace-nowrap ${
                    !hasReceiver
                      ? 'opacity-40 cursor-not-allowed border-transparent text-[#6B5A4B]'
                      : activeDossierTab === 'events'
                      ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#26170E]/50'
                      : 'border-transparent text-[#9E8B7A] hover:text-[#D4AF37]'
                  }`}
                  title={!hasReceiver ? 'Select receiver first to unlock mutual events' : 'Mutual Historical Precedents'}
                >
                  {!hasReceiver ? <Lock className="h-3 w-3 text-[#8C6D46]" /> : <Calendar className="h-3.5 w-3.5" />}
                  <span>2. Mutual Events ({hasReceiver ? (sharedEpisodes.length > 0 ? sharedEpisodes.length : figure.suggestedEvents.length) : '—'})</span>
                </button>

                <button
                  id="tab-select-people"
                  onClick={() => {
                    if (!hasReceiver) {
                      setPromptReceiverSelection(true);
                      setTimeout(() => setPromptReceiverSelection(false), 2500);
                      return;
                    }
                    setActiveDossierTab('people');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-serif border-b-2 transition whitespace-nowrap ${
                    !hasReceiver
                      ? 'opacity-40 cursor-not-allowed border-transparent text-[#6B5A4B]'
                      : activeDossierTab === 'people'
                      ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#26170E]/50'
                      : 'border-transparent text-[#9E8B7A] hover:text-[#D4AF37]'
                  }`}
                  title={!hasReceiver ? 'Select receiver first to unlock contemporaries' : 'Contemporaries & Witnesses'}
                >
                  {!hasReceiver ? <Lock className="h-3 w-3 text-[#8C6D46]" /> : <Users className="h-3.5 w-3.5" />}
                  <span>3. People Involved ({hasReceiver ? sharedPeople.length : '—'})</span>
                </button>

                <button
                  id="tab-select-tone"
                  onClick={() => {
                    if (!hasReceiver) {
                      setPromptReceiverSelection(true);
                      setTimeout(() => setPromptReceiverSelection(false), 2500);
                      return;
                    }
                    setActiveDossierTab('tone');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-serif border-b-2 transition whitespace-nowrap ${
                    !hasReceiver
                      ? 'opacity-40 cursor-not-allowed border-transparent text-[#6B5A4B]'
                      : activeDossierTab === 'tone'
                      ? 'border-[#D4AF37] text-[#D4AF37] font-semibold bg-[#26170E]/50'
                      : 'border-transparent text-[#9E8B7A] hover:text-[#D4AF37]'
                  }`}
                  title={!hasReceiver ? 'Select receiver first to unlock tone & mood' : 'Tone & Mood'}
                >
                  {!hasReceiver ? <Lock className="h-3 w-3 text-[#8C6D46]" /> : <Sparkles className="h-3.5 w-3.5" />}
                  <span>4. Tone & Mood</span>
                </button>
              </div>

              {/* Dossier Body Content Container */}
              <div className="flex-1 p-4 overflow-y-auto max-h-[50vh] sm:max-h-[54vh] space-y-4 text-xs font-serif">
                
                {/* ------------------------------------------------------------- */}
                {/* TAB 1: LETTER RECEIVER SELECTION */}
                {/* ------------------------------------------------------------- */}
                {activeDossierTab === 'recipients' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-[#E8D9C8] tracking-wider uppercase">
                        {dossierVisualMode ? 'Correspondent Philatelic Stamps' : 'Select Correspondent'}
                      </span>
                      <span className="text-[10px] text-[#A69280] italic">
                        {dossierVisualMode ? 'Click stamp to select receiver' : 'Click to change correspondent'}
                      </span>
                    </div>

                    {dossierVisualMode ? (
                      /* Visual Philatelic Stamps Grid */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {figure.recipients.map((rec) => {
                          const isSelected = activeRecipient.id === rec.id;
                          return (
                            <RecipientVisualStamp
                              key={rec.id}
                              name={rec.name}
                              relation={rec.relation}
                              location={rec.location}
                              transitDays={rec.transitDays}
                              isSelected={isSelected}
                              onClick={() => {
                                onSelectRecipient(rec);
                                playSoundEffect('scratch');
                                setActiveDossierTab('events');
                              }}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      /* Text-Based Recipient Cards */
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {figure.recipients.map((rec) => {
                          const isSelected = activeRecipient.id === rec.id;
                          return (
                            <div
                              key={rec.id}
                              id={`recipient-card-${rec.id}`}
                              onClick={() => {
                                onSelectRecipient(rec);
                                playSoundEffect('scratch');
                                setActiveDossierTab('events');
                              }}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[#D4AF37] bg-[#2E1C11] shadow-lg text-[#FFF]'
                                  : 'border-[#664630]/40 bg-[#1A110B]/60 hover:border-[#8C6D46] hover:bg-[#25170E] text-[#D4C4B5]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-1 mb-1">
                                <h5 className="font-cinzel text-xs font-bold text-[#F3EFE6]">
                                  {rec.name}
                                </h5>
                                {isSelected && (
                                  <span className="flex items-center gap-0.5 text-[10px] text-[#D4AF37] font-semibold uppercase">
                                    <Check className="h-3 w-3" />
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#D4AF37] font-serif mb-1">
                                {rec.relation}
                              </p>
                              <p className="text-[10px] text-[#9E8B7A] line-clamp-2 leading-relaxed mb-2">
                                {rec.title}
                              </p>
                              <div className="flex items-center justify-between text-[10px] text-[#8C7A6B] pt-1.5 border-t border-[#523825]/40">
                                <span className="flex items-center gap-1 truncate max-w-[65%]">
                                  <MapPin className="h-2.5 w-2.5 text-[#A69280]" />
                                  {rec.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-2.5 w-2.5 text-[#A69280]" />
                                  {rec.transitDays}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Active Recipient Visual Route & Connection */}
                    {dossierVisualMode ? (
                      <div className="mt-3 p-3 rounded-xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#2A160C] to-[#1E110A] shadow-lg">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base">🤝</span>
                            <span className="font-cinzel font-bold text-[#F3EFE6] uppercase tracking-wider text-[11px]">
                              {figure.name.split(' ')[0]} ⟷ {activeRecipient.name.split(' ')[0]}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[10px] text-[#D4AF37] font-semibold">
                            {activeRecipient.relation}
                          </span>
                        </div>

                        {/* Visual Route Vector */}
                        <div className="py-2 px-3 rounded-lg bg-[#140A05]/80 border border-[#8C6D46]/30 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-[#E5D7C9]">
                            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                            <span className="font-mono text-[10px]">{figure.city.split('/')[0].trim()}</span>
                          </div>

                          <div className="flex-1 mx-3 flex items-center justify-center relative">
                            <div className="w-full h-0.5 bg-gradient-to-r from-[#38BDF8] via-[#D4AF37] to-[#F59E0B]" />
                            <span className="absolute px-1.5 py-0.5 rounded bg-[#25150C] border border-[#8C6D46] text-[9px] font-mono text-[#D4AF37] flex items-center gap-1">
                              <span>{activeRecipient.transitDays.toLowerCase().includes('hour') ? '⚡' : activeRecipient.transitDays.toLowerCase().includes('sea') || activeRecipient.transitDays.toLowerCase().includes('steamer') ? '🚢' : '🚂'}</span>
                              <span>{activeRecipient.transitDays.split('via')[0].trim()}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#E5D7C9]">
                            <span className="font-mono text-[10px]">{activeRecipient.location.split(',')[0].trim()}</span>
                            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                          </div>
                        </div>

                        {/* 1-sentence historical anchor */}
                        <p className="mt-2 text-[11px] text-[#CDBEAF] font-serif italic line-clamp-2">
                          "{activeRecipient.historicalConnection}"
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3 p-3 rounded-lg border border-[#8C6D46]/40 bg-[#251810]/70">
                        <div className="flex items-center gap-2 mb-1.5 text-xs text-[#D4AF37]">
                          <Info className="h-3.5 w-3.5" />
                          <span className="font-semibold uppercase tracking-wider">
                            Historical Connection with {activeRecipient.name}
                          </span>
                        </div>
                        <p className="text-xs text-[#DDD0C2] leading-relaxed mb-2">
                          {activeRecipient.historicalConnection}
                        </p>
                        <div className="text-[11px] text-[#A69280] italic border-t border-[#523825]/40 pt-1.5">
                          <strong>Archival Stakes:</strong> {activeRecipient.stakes}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TAB 2: MUTUAL HISTORICAL EPISODES & EVENTS */}
                {/* User request: "selection of event and people or sth that is supported */}
                {/* by the 之前有在writer and receiver之间发生的事情" */}
                {/* ------------------------------------------------------------- */}
                {activeDossierTab === 'events' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-cinzel font-bold text-[#E8D9C8] tracking-wider uppercase block">
                          Historical Precedents & Shared Episodes
                        </span>
                        <span className="text-[10px] text-[#A69280] italic">
                          Real events that transpired between {figure.name} and {activeRecipient.name}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[10px] text-[#D4AF37]">
                        {sharedEpisodes.length} Recorded Episodes
                      </span>
                    </div>

                    {/* If shared verified episodes exist between this pair */}
                    {sharedEpisodes.length > 0 ? (
                      dossierVisualMode ? (
                        /* Visual Scene Diorama Cards (Minimal text, visual focus) */
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {sharedEpisodes.map((ep) => {
                              const isSelected = selectedEvent?.id === ep.id || selectedEvent?.title?.includes(ep.title);
                              const locationLabel = ep.title.includes('Alp')
                                ? '🇨🇭 Alps'
                                : ep.title.includes('Solvay')
                                ? '🇧🇪 Brussels'
                                : ep.title.includes('Caputh')
                                ? '🇩🇪 Caputh'
                                : ep.title.includes('Prague') || ep.title.includes('Defense')
                                ? '🇫🇷 Paris'
                                : ep.title.includes('Nobel')
                                ? '🇸🇪 Stockholm'
                                : '🏛️ Europe';

                              return (
                                <div
                                  key={ep.id}
                                  id={`episode-card-${ep.id}`}
                                  onClick={() => handleEpisodeSelect(ep)}
                                  className={`group relative rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer flex flex-col ${
                                    isSelected
                                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-2xl bg-[#28160C]'
                                      : 'border-[#664630]/40 bg-[#160E08]/80 hover:border-[#A67C52] hover:bg-[#1E110A]'
                                  }`}
                                >
                                  {/* Illustrated Scene Diorama */}
                                  <div className="relative w-full h-24 overflow-hidden bg-[#0C0603]">
                                    <SceneIllustration
                                      sceneType={ep.title}
                                      title={ep.title}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#160E08] via-transparent to-black/30 pointer-events-none" />

                                    {/* Floating Badges */}
                                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                                      <span className="px-2 py-0.5 rounded-full bg-[#180E09]/90 border border-[#D4AF37] font-mono text-[10px] font-bold text-[#D4AF37] shadow">
                                        {ep.year}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-full bg-[#180E09]/90 border border-[#8C6D46]/60 text-[9px] text-[#E5D7C9] flex items-center gap-1 shadow">
                                        <MapPin className="h-2.5 w-2.5 text-[#D4AF37]" />
                                        {locationLabel}
                                      </span>
                                    </div>

                                    {isSelected && (
                                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#160E09] font-bold text-[9px] flex items-center gap-1 shadow">
                                        <Check className="h-3 w-3" />
                                        Active
                                      </div>
                                    )}
                                  </div>

                                  {/* Card Lower Bar: Minimalist Title & Topic Pills */}
                                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                                    <h5 className="font-cinzel text-xs font-bold text-[#F3EFE6] group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-1.5">
                                      {ep.title}
                                    </h5>

                                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-[#523825]/40 text-[9px]">
                                      <div className="flex items-center gap-1">
                                        {ep.keyTopics.slice(0, 2).map((t, idx) => (
                                          <span
                                            key={idx}
                                            className="px-1.5 py-0.5 rounded bg-[#27170E] text-[#D4AF37] border border-[#664630]/40 font-mono"
                                          >
                                            {t.split(' ')[0]}
                                          </span>
                                        ))}
                                      </div>
                                      <span className="text-[#A69280] font-sans flex items-center gap-0.5">
                                        <Users className="h-2.5 w-2.5 text-[#D4AF37]" />
                                        {ep.historicalPeopleInvolved.length}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Active Precedent Spotlight Ribbon */}
                          {selectedEvent && (
                            <div className="p-3 rounded-xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#2B170D] to-[#1C0E07] shadow-lg">
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-cinzel font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  Selected Memory Anchor: {selectedEvent.title}
                                </span>
                                <span className="text-[10px] font-mono text-[#A69280]">
                                  {selectedEvent.year}
                                </span>
                              </div>

                              {/* Primary Quote in Antique Scroll if available */}
                              {selectedEvent.primaryQuote ? (
                                <div className="p-2 rounded bg-[#140A05]/80 border-l-2 border-[#D4AF37] text-[11px] text-[#E5D7C9] italic font-serif">
                                  "{selectedEvent.primaryQuote.text}"
                                  <div className="text-[9px] text-[#A69280] not-italic font-sans mt-0.5">
                                    — {selectedEvent.primaryQuote.speaker} ({selectedEvent.primaryQuote.source})
                                  </div>
                                </div>
                              ) : (
                                <p className="text-[11px] text-[#CDBEAF] font-serif italic">
                                  "{selectedEvent.summary}"
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Text-Dense Archival Mode */
                        <div className="space-y-2.5">
                          {sharedEpisodes.map((ep) => {
                            const isSelected = selectedEvent?.id === ep.id || selectedEvent?.title?.includes(ep.title);
                            return (
                              <div
                                key={ep.id}
                                id={`episode-card-${ep.id}`}
                                onClick={() => handleEpisodeSelect(ep)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                  isSelected
                                    ? 'border-[#D4AF37] bg-[#2C1A0F] shadow-lg text-[#FFF]'
                                    : 'border-[#664630]/40 bg-[#1A110B]/60 hover:border-[#8C6D46] hover:bg-[#23150C] text-[#D4C4B5]'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 font-mono text-[10px] font-bold text-[#D4AF37]">
                                      {ep.year}
                                    </span>
                                    <h5 className="font-cinzel text-xs font-bold text-[#F3EFE6]">
                                      {ep.title}
                                    </h5>
                                  </div>
                                  {isSelected && (
                                    <span className="flex items-center gap-0.5 text-[10px] text-[#D4AF37] font-semibold">
                                      <Check className="h-3 w-3" />
                                      Selected
                                    </span>
                                  )}
                                </div>

                                <p className="text-xs text-[#E3D5C8] leading-relaxed mb-2">
                                  {ep.summary}
                                </p>

                                <p className="text-[11px] text-[#B09E8F] leading-relaxed mb-2 italic">
                                  {ep.historicalContext}
                                </p>

                                {ep.primaryQuote && (
                                  <div className="p-2 rounded bg-[#150D08]/80 border-l-2 border-[#D4AF37] text-[10.5px] text-[#D8C7B8] mb-2">
                                    <div className="flex items-center gap-1 text-[#D4AF37] font-semibold text-[10px] mb-0.5">
                                      <Quote className="h-2.5 w-2.5" />
                                      <span>{ep.primaryQuote.speaker}</span>
                                    </div>
                                    <p className="italic">"{ep.primaryQuote.text}"</p>
                                    <span className="text-[9px] text-[#8C7A6B] block mt-0.5">— {ep.primaryQuote.source}</span>
                                  </div>
                                )}

                                <div className="flex items-center justify-between text-[10px] text-[#8C7A6B] pt-1.5 border-t border-[#523825]/40">
                                  <span className="truncate max-w-[70%]">
                                    <strong>Archival Source:</strong> {ep.historicalEvidence}
                                  </span>
                                  <span className="text-[#D4AF37]">
                                    {ep.historicalPeopleInvolved.length} Witnesses
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )
                    ) : (
                      /* Fallback: Show suggested historical events for this figure */
                      <div className="space-y-2.5">
                        <p className="text-[11px] text-[#A69280] italic">
                          Showing contemporaneous historical milestones involving {figure.name} and {activeRecipient.name}:
                        </p>
                        {figure.suggestedEvents.map((evt) => {
                          const isSelected = selectedEvent?.id === evt.id;
                          return (
                            <div
                              key={evt.id}
                              onClick={() => {
                                onSelectEvent(evt);
                                playSoundEffect('scratch');
                              }}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-[#D4AF37] bg-[#2C1A0F] shadow-lg text-[#FFF]'
                                  : 'border-[#664630]/40 bg-[#1A110B]/60 hover:border-[#8C6D46] hover:bg-[#23150C] text-[#D4C4B5]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40 font-mono text-[10px] font-bold text-[#D4AF37]">
                                  {evt.year}
                                </span>
                                <h5 className="font-cinzel text-xs font-bold text-[#F3EFE6] flex-1">
                                  {evt.title}
                                </h5>
                                {isSelected && (
                                  <span className="flex items-center gap-0.5 text-[10px] text-[#D4AF37] font-semibold">
                                    <Check className="h-3 w-3" />
                                    Selected
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#E3D5C8] leading-relaxed mb-1">
                                {evt.context}
                              </p>
                              <span className="text-[10px] text-[#8C7A6B]">
                                Source: {evt.historicalEvidence}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TAB 3: HISTORICAL PEOPLE & INTERMEDIARIES */}
                {/* ------------------------------------------------------------- */}
                {activeDossierTab === 'people' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-cinzel font-bold text-[#E8D9C8] tracking-wider uppercase block">
                        {dossierVisualMode ? 'Contemporaries & Intermediaries' : 'Shared Social Circle'}
                      </span>
                      <span className="text-[10px] text-[#A69280] italic">
                        {dossierVisualMode ? 'Historical witnesses' : 'Witnesses & intermediaries'}
                      </span>
                    </div>

                    {sharedPeople.length > 0 ? (
                      dossierVisualMode ? (
                        /* Visual Cameo Grid */
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {sharedPeople.map((person, idx) => {
                              const role = person.includes('Planck') ? 'Quantum Physicist'
                                : person.includes('Lorentz') ? 'Solvay Chair'
                                : person.includes('Rutherford') ? 'Nuclear Pioneer'
                                : person.includes('Poincaré') ? 'Mathematician'
                                : person.includes('Langevin') ? 'Physicist & Compeer'
                                : person.includes('Gandhi') ? 'Satyagraha Leader'
                                : person.includes('Rolland') ? 'Pacifist Author'
                                : person.includes('Menuhin') ? 'Violin Virtuoso'
                                : person.includes('Andrews') ? 'Emissary & Educator'
                                : person.includes('Irène') ? 'Sorbonne Colleague'
                                : 'Archival Witness';

                              return (
                                <WitnessCameo
                                  key={idx}
                                  name={person}
                                  role={role}
                                />
                              );
                            })}
                          </div>

                          {/* Visual Topic Badges */}
                          <div className="pt-2 border-t border-[#523825]/40">
                            <span className="text-[10px] font-cinzel font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
                              Historical Evidence Badges
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {figure.researchKeywords.map((kw) => {
                                const isToggled = selectedKeywords.some((k) => k.id === kw.id);
                                const icon = kw.category === 'science' ? '⚛️' : kw.category === 'philosophy' ? '📜' : kw.category === 'personal' ? '💌' : '🌍';
                                return (
                                  <button
                                    key={kw.id}
                                    onClick={() => onToggleKeyword && onToggleKeyword(kw)}
                                    className={`px-2 py-1 rounded-lg border text-[10px] font-sans flex items-center gap-1.5 transition ${
                                      isToggled
                                        ? 'border-[#D4AF37] bg-[#2E1B10] text-[#FFF] shadow'
                                        : 'border-[#664630]/40 bg-[#160E08]/70 text-[#A69280] hover:border-[#8C6D46]'
                                    }`}
                                  >
                                    <span>{icon}</span>
                                    <span className="font-serif">{kw.label}</span>
                                    {isToggled && <Check className="h-2.5 w-2.5 text-[#D4AF37]" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-[11px] text-[#DDD0C2]">
                            The following real historical figures were present or directly referenced during their mutual encounters:
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {sharedPeople.map((person, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8C6D46]/40 bg-[#251810]/70 text-xs font-serif text-[#F2DFCE] shadow-sm hover:border-[#D4AF37] transition"
                              >
                                <Users className="h-3 w-3 text-[#D4AF37]" />
                                <span>{person}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ) : (
                      <p className="text-[11px] text-[#A69280] italic">
                        Direct bilateral correspondence preserved in museum archives.
                      </p>
                    )}

                    {!dossierVisualMode && (
                      /* Research evidence keywords (archival text view) */
                      <div className="pt-3 border-t border-[#523825]/40">
                        <span className="text-xs font-cinzel font-bold text-[#E8D9C8] tracking-wider uppercase block mb-1">
                          Historical Topics & Evidence Keywords
                        </span>
                        <p className="text-[10px] text-[#A69280] italic mb-2">
                          Toggle evidenced historical facts to thread into the letter
                        </p>

                        <div className="space-y-1.5">
                          {figure.researchKeywords.map((kw) => {
                            const isToggled = selectedKeywords.some((k) => k.id === kw.id);
                            return (
                              <div
                                key={kw.id}
                                onClick={() => onToggleKeyword && onToggleKeyword(kw)}
                                className={`p-2 rounded border cursor-pointer transition ${
                                  isToggled
                                    ? 'border-[#D4AF37] bg-[#2B1B10] text-[#FFF]'
                                    : 'border-[#664630]/30 bg-[#160E08]/60 text-[#B8A695] hover:border-[#8C6D46]'
                                }`}
                              >
                                <div className="flex items-center justify-between text-xs font-medium mb-0.5">
                                  <span className={isToggled ? 'text-[#D4AF37]' : 'text-[#E3D4C4]'}>
                                    {kw.label}
                                  </span>
                                  <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#422B1B]/40 rounded text-[#A69280]">
                                    {kw.category}
                                  </span>
                                </div>
                                <p className="text-[10px] text-[#8C7A6B] line-clamp-1">
                                  {kw.historicalFact}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* TAB 4: TONE & MOOD QUICK CONTROLS */}
                {/* ------------------------------------------------------------- */}
                {activeDossierTab === 'tone' && (
                  <div className="space-y-4">
                    {/* Tone selection */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-cinzel font-bold text-[#E8D9C8] tracking-wider uppercase">
                          {dossierVisualMode ? 'Epistolary Wax Seals' : `Epistolary Tone (${figure.era})`}
                        </span>
                        <span className="text-[10px] text-[#A69280] italic">
                          {dossierVisualMode ? 'Select signature seal' : 'Tone register'}
                        </span>
                      </div>

                      {dossierVisualMode ? (
                        /* Visual Wax Seals Matrix */
                        <div className="grid grid-cols-2 gap-2.5">
                          {figure.availableTones.map((tone) => {
                            const isSelected = selectedTone?.id === tone.id;
                            return (
                              <VisualToneSeal
                                key={tone.id}
                                toneId={tone.id}
                                label={tone.label}
                                description={tone.description}
                                isSelected={isSelected}
                                onClick={() => onSelectTone && onSelectTone(tone)}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {figure.availableTones.map((tone) => {
                            const isSelected = selectedTone?.id === tone.id;
                            return (
                              <div
                                key={tone.id}
                                onClick={() => onSelectTone && onSelectTone(tone)}
                                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                                  isSelected
                                    ? 'border-[#D4AF37] bg-[#2C1A0F] text-[#FFF]'
                                    : 'border-[#664630]/40 bg-[#1A110B]/60 text-[#C7B5A4] hover:border-[#8C6D46]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-0.5">
                                  <strong className="text-xs text-[#F3EFE6]">{tone.label}</strong>
                                  {isSelected && <Check className="h-3 w-3 text-[#D4AF37]" />}
                                </div>
                                <p className="text-[10px] text-[#A69280]">{tone.description}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Mood selection */}
                    <div className="pt-3 border-t border-[#523825]/40">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-cinzel font-bold text-[#E8D9C8] tracking-wider uppercase">
                          {dossierVisualMode ? 'Inner Emotional Spheres' : "Writer's Inner Mood"}
                        </span>
                        <span className="text-[10px] text-[#A69280] italic">
                          {dossierVisualMode ? 'Chromatic affect' : 'Emotional disposition'}
                        </span>
                      </div>

                      {dossierVisualMode ? (
                        /* Visual Chromatic Mood Spheres */
                        <div className="grid grid-cols-2 gap-2.5">
                          {figure.availableMoods.map((mood) => {
                            const isSelected = selectedMood?.id === mood.id;
                            return (
                              <VisualMoodSphere
                                key={mood.id}
                                moodId={mood.id}
                                label={mood.label}
                                emotionalState={mood.emotionalState}
                                isSelected={isSelected}
                                onClick={() => onSelectMood && onSelectMood(mood)}
                              />
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {figure.availableMoods.map((mood) => {
                            const isSelected = selectedMood?.id === mood.id;
                            return (
                              <div
                                key={mood.id}
                                onClick={() => onSelectMood && onSelectMood(mood)}
                                className={`p-2.5 rounded-lg border cursor-pointer transition ${
                                  isSelected
                                    ? 'border-[#D4AF37] bg-[#2C1A0F] text-[#FFF]'
                                    : 'border-[#664630]/40 bg-[#1A110B]/60 text-[#C7B5A4] hover:border-[#8C6D46]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-0.5">
                                  <strong className="text-xs text-[#F3EFE6]">{mood.label}</strong>
                                  {isSelected && <Check className="h-3 w-3 text-[#D4AF37]" />}
                                </div>
                                <p className="text-[10px] text-[#A69280]">{mood.emotionalState}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Dossier Bottom Action Bar */}
              <div className="p-3 border-t border-[#8C6D46]/30 bg-[#1D120B]/90 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="text-[11px] font-serif text-[#C5B3A1]">
                  <span>To: <strong className="text-[#F2DFCE]">{activeRecipient.name}</strong></span>
                  <span className="text-[#6B4B35] mx-1.5">•</span>
                  <span>Event: <strong className="text-[#F2DFCE]">{selectedEvent?.year || '1911'}</strong></span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    id="btn-pen-historical-letter"
                    onClick={handleGenerateClick}
                    disabled={isGenerating}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg border border-[#D4AF37] bg-gradient-to-r from-[#8C5D33] to-[#B37943] px-4 py-2 text-xs font-serif font-bold text-[#FFF] shadow-lg hover:from-[#A66E3C] hover:to-[#C98A4E] transition disabled:opacity-50"
                  >
                    <Feather className="h-3.5 w-3.5 text-[#FFE699]" />
                    <span>{isGenerating ? 'Inking Parchment...' : 'Pen Historical Letter'}</span>
                  </button>

                  <button
                    onClick={onProceedToStudio}
                    className="px-2.5 py-2 rounded-lg border border-[#8C6D46]/40 bg-[#25170E] text-xs font-serif text-[#D4C4B5] hover:text-[#FFF] hover:border-[#D4AF37] transition"
                    title="Open in dual-perspective studio"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* 5. BOTTOM PERIOD MATERIALITY BAR */}
      <footer className={`relative z-30 transition-all duration-300 pb-4 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#3A2417]/40 bg-[#160D08]/60 backdrop-blur-sm ${
        zenMode ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}>
        <div className="flex items-center gap-2 text-xs text-[#A89481] font-serif">
          <Feather className="h-3.5 w-3.5 text-[#D4AF37]" />
          <span>{deskInfo.instrumentDescription}</span>
          <span className="text-[#594231]">•</span>
          <span>{deskInfo.inkDescription}</span>
        </div>

        <div className="flex items-center gap-2">
          {letter && (
            <button
              onClick={() => setIsBreakdownModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#8C6D46]/40 bg-[#1F130B]/80 px-3 py-1.5 text-xs font-serif text-[#E0C9A6] hover:bg-[#2C1B10] hover:text-[#FFF] transition"
            >
              <Info className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Modern Breakdown & Citations</span>
            </button>
          )}

          <button
            onClick={handleGenerateClick}
            className="flex items-center gap-1.5 rounded-lg border border-[#8C6D46]/60 bg-[#2C1C12]/90 px-3.5 py-1.5 text-xs font-serif font-medium text-[#E5D7C7] hover:bg-[#3D2719] hover:border-[#D4AF37] hover:text-[#FFF] transition shadow"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Generate Historical Letter</span>
          </button>
        </div>
      </footer>

      {/* 6. MODERN BREAKDOWN & CITATIONS MODAL */}
      {isBreakdownModalOpen && letter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
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
