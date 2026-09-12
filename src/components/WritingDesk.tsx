import React, { useState } from 'react';
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
  Feather, 
  Scroll, 
  Sparkles, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Clock, 
  Compass, 
  HelpCircle, 
  BookOpen, 
  ShieldAlert, 
  RotateCcw, 
  Send, 
  FileText, 
  Eye, 
  RefreshCw 
} from 'lucide-react';

interface WritingDeskProps {
  figure: HistoricalFigure;
  recipient: Recipient;
  selectedEvent: HistoricalEventOption;
  selectedTone: ToneOption;
  selectedMood: MoodOption;
  selectedKeywords: KeywordOption[];
  letter: GeneratedLetter | null;
  isGenerating: boolean;
  onSelectEvent: (event: HistoricalEventOption) => void;
  onSelectTone: (tone: ToneOption) => void;
  onSelectMood: (mood: MoodOption) => void;
  onToggleKeyword: (keyword: KeywordOption) => void;
  onRegenerate: () => void;
  onBackToNetwork: () => void;
  onOpenWritingKit: () => void;
}

export const WritingDesk: React.FC<WritingDeskProps> = ({
  figure,
  recipient,
  selectedEvent,
  selectedTone,
  selectedMood,
  selectedKeywords,
  letter,
  isGenerating,
  onSelectEvent,
  onSelectTone,
  onSelectMood,
  onToggleKeyword,
  onRegenerate,
  onBackToNetwork,
  onOpenWritingKit,
}) => {
  const [activeTab, setActiveTab] = useState<'manuscript' | 'breakdown'>('manuscript');
  const [isMirrorScript, setIsMirrorScript] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Copy full letter text to clipboard
  const handleCopy = () => {
    if (!letter) return;
    const fullText = `${letter.salutation}\n\n${letter.dateAndLocation}\n\n${letter.bodyParagraphs.join('\n\n')}\n\n${letter.valediction}${letter.postScriptum ? `\n\n${letter.postScriptum}` : ''}`;
    navigator.clipboard.writeText(fullText);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  // Speech synthesis for authentic period reading
  const handleToggleSpeech = () => {
    if (!letter || typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const fullText = `${letter.salutation}. ${letter.bodyParagraphs.join(' ')}. ${letter.valediction}.`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 0.9; // deliberate, contemplative period cadence
      utterance.pitch = figure.id === 'curie' ? 1.05 : 0.92;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      
      {/* Top Breadcrumb & Status Bar */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-[#30281F] pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToNetwork}
            className="flex items-center space-x-1.5 rounded-lg border border-[#3A3125] bg-[#1A1612] px-3 py-1.5 text-xs text-[#A89D8B] transition hover:border-[#B8860B] hover:text-[#F3EFE6]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Network</span>
          </button>

          <div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="font-semibold text-[#D4AF37]">{figure.name}</span>
              <span className="text-[#6A6052]">➔</span>
              <span className="font-semibold text-[#F3EFE6]">{recipient.name}</span>
              <span className="rounded bg-[#282118] px-1.5 py-0.5 text-[10px] text-[#A69B8A]">
                {recipient.location}
              </span>
            </div>
            <p className="text-[11px] text-[#8C8070]">
              Transit: {recipient.transitDays} via {figure.writingKit.transitCourier.method.split(' ')[0]}
            </p>
          </div>
        </div>

        {/* Right Action: Era Writing Kit Quick-Launch */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenWritingKit}
            className="flex items-center space-x-1.5 rounded-lg border border-[#B8860B]/50 bg-[#221C15] px-3 py-1.5 text-xs font-semibold text-[#E8C568] transition hover:border-[#E8C568] hover:bg-[#2C231A]"
          >
            <Scroll className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Inspect Writing Kit</span>
          </button>

          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex items-center space-x-1.5 rounded-lg border border-[#44382B] bg-[#1B1713] px-3 py-1.5 text-xs text-[#C4BAA9] transition hover:border-[#B8860B] hover:text-[#F3EFE6] disabled:opacity-50"
            title="Redraft with current parameters"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin text-[#D4AF37]' : ''}`} />
            <span>{isGenerating ? 'Drafter at work...' : 'Re-Draft'}</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid: Controls on Left, Manuscript/Breakdown on Right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* ================= LEFT COLUMN: INTERACTIVE CONTROLS ================= */}
        <div className="space-y-6 lg:col-span-5">
          
          <div className="rounded-2xl border border-[#352D23] bg-[#181410] p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between border-b border-[#2B231A] pb-3">
              <div className="flex items-center space-x-2">
                <Feather className="h-4 w-4 text-[#D4AF37]" />
                <h2 className="font-cinzel text-base font-bold text-[#F3EFE6]">
                  Interactive Epistolary Controls
                </h2>
              </div>
              <span className="text-[10px] font-semibold tracking-wider text-[#A89D8B] uppercase">
                Zero typing • Historical choice
              </span>
            </div>

            {/* Step 1: Historical Event Selection */}
            <div className="mb-5">
              <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <span>1. Historical Event & Occasion</span>
                <span className="text-[10px] text-[#8A7E6E] font-normal lowercase">grounded evidence</span>
              </label>
              <div className="space-y-2">
                {figure.suggestedEvents.map((evt) => {
                  const isSelected = selectedEvent.id === evt.id;
                  return (
                    <div
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className={`cursor-pointer rounded-xl border p-3 transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#272017] ring-1 ring-[#D4AF37]'
                          : 'border-[#2D251D] bg-[#14110E] hover:border-[#B8860B]/50 hover:bg-[#1C1813]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-cinzel text-xs font-bold text-[#F3EFE6]">
                          {evt.title}
                        </h4>
                        <span className="rounded bg-[#1B1611] px-1.5 py-0.5 text-[10px] font-semibold text-[#D4AF37]">
                          {evt.year}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#A69B8A] line-clamp-2">
                        {evt.context}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Tone Selection */}
            <div className="mb-5">
              <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <span>2. Epistolary Tone</span>
                <span className="text-[10px] text-[#8A7E6E] font-normal lowercase">period etiquette</span>
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {figure.availableTones.map((tone) => {
                  const isSelected = selectedTone.id === tone.id;
                  return (
                    <div
                      key={tone.id}
                      onClick={() => onSelectTone(tone)}
                      className={`cursor-pointer rounded-xl border p-2.5 transition-all ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#272017] ring-1 ring-[#D4AF37]'
                          : 'border-[#2D251D] bg-[#14110E] hover:border-[#B8860B]/50 hover:bg-[#1C1813]'
                      }`}
                    >
                      <div className="font-semibold text-xs text-[#F3EFE6]">
                        {tone.label}
                      </div>
                      <p className="mt-0.5 text-[10px] text-[#9E9281] line-clamp-2">
                        {tone.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Emotional Mood Selection */}
            <div className="mb-5">
              <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <span>3. Inner Mood & Subtext</span>
                <span className="text-[10px] text-[#8A7E6E] font-normal lowercase">psychological state</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {figure.availableMoods.map((mood) => {
                  const isSelected = selectedMood.id === mood.id;
                  return (
                    <button
                      key={mood.id}
                      onClick={() => onSelectMood(mood)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#34291B] text-[#F3EFE6] shadow-sm'
                          : 'border-[#30281F] bg-[#14110E] text-[#9E9281] hover:border-[#4D4133] hover:text-[#D1C7B8]'
                      }`}
                    >
                      {mood.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Evidenced Research Keywords */}
            <div>
              <label className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                <span>4. Research Evidence Keywords</span>
                <span className="text-[10px] text-[#8A7E6E] font-normal lowercase">tap to include</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {figure.researchKeywords.map((kw) => {
                  const isSelected = selectedKeywords.some((k) => k.id === kw.id);
                  return (
                    <button
                      key={kw.id}
                      onClick={() => onToggleKeyword(kw)}
                      className={`flex items-center space-x-1 rounded-full border px-3 py-1 text-xs transition ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#2E2519] text-[#E5C365] font-semibold'
                          : 'border-[#30271E] bg-[#14110E] text-[#8A7E6E] hover:border-[#483B2D] hover:text-[#C4BAA9]'
                      }`}
                      title={kw.historicalFact}
                    >
                      <span>{kw.label}</span>
                      {isSelected && <Check className="h-3 w-3 text-[#D4AF37]" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Drafting Status Card */}
          <div className="flex items-center justify-between rounded-xl border border-[#2E261D] bg-[#14110D] p-3 text-xs text-[#8A7E6E]">
            <div className="flex items-center space-x-2">
              <span className={`h-2 w-2 rounded-full ${isGenerating ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`}></span>
              <span>
                {isGenerating ? 'Agent synthesizing historical letter...' : 'Letter synchronized with choices'}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#6A6052]">
              {letter?.generationSource === 'gemini-agent' ? 'gemini-3.8-flash' : 'archive-engine'}
            </span>
          </div>

        </div>


        {/* ================= RIGHT COLUMN: MANUSCRIPT & MODERN BREAKDOWN ================= */}
        <div className="space-y-4 lg:col-span-7">
          
          {/* View Mode Tabs: The Historical Letter vs. The Modern Breakdown */}
          <div className="flex items-center justify-between border-b border-[#30281F] pb-2">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab('manuscript')}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'manuscript'
                    ? 'bg-[#2E2419] text-[#E5C365] border border-[#B8860B]/50'
                    : 'text-[#8A7E6D] hover:text-[#D1C6B4]'
                }`}
              >
                <Scroll className="h-4 w-4" />
                <span>The Historical Manuscript</span>
              </button>

              <button
                onClick={() => setActiveTab('breakdown')}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                  activeTab === 'breakdown'
                    ? 'bg-[#2E2419] text-[#E5C365] border border-[#B8860B]/50'
                    : 'text-[#8A7E6D] hover:text-[#D1C6B4]'
                }`}
              >
                <Compass className="h-4 w-4" />
                <span>Modern Perspective Breakdown</span>
              </button>
            </div>

            {/* Utility Tools: Mirror Writing (Leonardo), Audio, Copy */}
            <div className="flex items-center space-x-1.5">
              {figure.id === 'leonardo' && activeTab === 'manuscript' && (
                <button
                  onClick={() => setIsMirrorScript(!isMirrorScript)}
                  className={`flex items-center space-x-1 rounded-md px-2.5 py-1 text-[11px] font-medium border transition ${
                    isMirrorScript
                      ? 'border-[#D4AF37] bg-[#B8860B]/30 text-[#E5C365]'
                      : 'border-[#382E22] bg-[#191511] text-[#9E9180] hover:text-[#F3EFE6]'
                  }`}
                  title="Toggle Leonardo's sinistral mirror-hand writing"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Mirror Script</span>
                </button>
              )}

              <button
                onClick={handleToggleSpeech}
                className={`rounded-md p-1.5 border transition ${
                  isSpeaking
                    ? 'border-[#D4AF37] bg-[#B8860B]/30 text-[#E5C365]'
                    : 'border-[#382E22] bg-[#191511] text-[#9E9180] hover:text-[#F3EFE6]'
                }`}
                title={isSpeaking ? 'Stop reading' : 'Read letter aloud'}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <button
                onClick={handleCopy}
                className="rounded-md border border-[#382E22] bg-[#191511] p-1.5 text-[#9E9180] transition hover:text-[#F3EFE6]"
                title="Copy letter text"
              >
                {hasCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>


          {/* TAB CONTENT 1: THE HISTORICAL MANUSCRIPT */}
          {activeTab === 'manuscript' && (
            <div className="relative min-h-[580px] rounded-2xl border border-[#B8860B]/30 bg-[#F4EEDF] p-8 text-[#261E14] shadow-2xl transition-all duration-300">
              
              {/* Paper Texture Overlay & Subtle Deckle Edges */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-900/5 via-transparent to-amber-950/10 mix-blend-multiply"></div>
              
              {/* Top Origin & Date */}
              <div className="mb-6 flex flex-col items-start justify-between gap-2 border-b border-[#D8CEB8] pb-4 sm:flex-row sm:items-center">
                <span className="font-cormorant text-sm italic text-[#5C4F3D]">
                  {letter?.dateAndLocation || 'Milan, in the Corte Vecchia'}
                </span>
                
                <span className="rounded bg-[#E5DBC7] px-2 py-0.5 font-cinzel text-[10px] font-bold tracking-widest text-[#735F43] uppercase">
                  {figure.writingKit.eraName.split(' ')[0]} Correspondence
                </span>
              </div>

              {/* Salutation */}
              <div className="mb-6 font-cormorant text-xl font-bold tracking-wide text-[#1F170E]">
                {letter?.salutation || `To the most honored ${recipient.name},`}
              </div>

              {/* Body Text with Mirror Hand Support for Leonardo */}
              <div 
                className={`space-y-4 font-cormorant text-lg leading-relaxed text-[#2A2016] ${
                  isMirrorScript && figure.id === 'leonardo' 
                    ? '[transform:scaleX(-1)] select-none opacity-90' 
                    : ''
                }`}
              >
                {letter ? (
                  letter.bodyParagraphs.map((paragraph, idx) => (
                    <p key={idx} className="indent-6 text-justify">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <div className="flex h-48 items-center justify-center text-sm text-[#736552] italic">
                    The quill is currently poised over the parchment...
                  </div>
                )}
              </div>

              {/* Valediction & Signature */}
              <div className="mt-8 border-t border-[#D8CEB8] pt-4 font-cormorant text-right">
                <p className="text-base italic text-[#4A3D2D]">
                  {letter?.valediction || `Your servant in art and science,\n${figure.name}`}
                </p>
                <div className="mt-2 font-cinzel text-lg font-bold tracking-wider text-[#1F170E]">
                  {figure.name}
                </div>
              </div>

              {/* Post Scriptum */}
              {letter?.postScriptum && (
                <div className="mt-6 rounded-lg bg-[#ECE4D0]/80 p-3 font-cormorant text-sm italic text-[#423525]">
                  {letter.postScriptum}
                </div>
              )}

              {/* Mirrored Script Archaic Translation Card for Leonardo */}
              {figure.id === 'leonardo' && letter?.mirroredItalianScript && (
                <div className="mt-6 rounded-xl border border-[#D5C9B0] bg-[#ECE4D0] p-4 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#735F43] mb-1">
                    <span>Archaic Tuscan Manuscript Transscription:</span>
                    <span className="italic font-normal">Codex Reading</span>
                  </div>
                  <p className="font-cormorant text-base italic text-[#261E14]">
                    "{letter.mirroredItalianScript}"
                  </p>
                </div>
              )}

              {/* Wax Seal / Stamp Simulation */}
              <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#D8CEB8]">
                <div className="text-[11px] text-[#736552]">
                  <span>Substrate: </span>
                  <span className="font-medium text-[#3A2F21]">{figure.writingKit.substrate.name}</span>
                </div>

                {/* Wax Seal Visual */}
                <div className="flex items-center space-x-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8B0000] via-[#A01D1D] to-[#550A0A] text-[#F4D03F] shadow-lg border border-[#780000]">
                    <span className="font-cinzel text-xs font-black tracking-tighter">
                      {figure.id === 'leonardo' ? 'LDV' : figure.id === 'curie' ? 'MSC' : 'BF'}
                    </span>
                  </div>
                  <div className="text-right text-[10px] text-[#736552] leading-tight">
                    <span className="block font-semibold text-[#4A3B29]">Tamper-Evident</span>
                    <span>{figure.writingKit.sealAndClosure.name.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

            </div>
          )}


          {/* TAB CONTENT 2: MODERN PERSPECTIVE BREAKDOWN */}
          {activeTab === 'breakdown' && letter && (
            <div className="space-y-6 rounded-2xl border border-[#3A3226] bg-[#181410] p-6 text-xs text-[#C4B9A7] shadow-xl animate-in fade-in">
              
              <div className="border-b border-[#2C241B] pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  Critical Temporal Contrast
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#F3EFE6]">
                  The 21st-Century Perspective vs. {figure.era}
                </h3>
                <p className="mt-1 text-xs text-[#9E9281]">
                  Why this piece of paper was fundamentally different from any communication we generate today.
                </p>
              </div>

              {/* Breakdown 1: Speed Comparison */}
              <div className="rounded-xl border border-[#30271E] bg-[#14110E] p-4">
                <div className="flex items-center space-x-2 text-[#D4AF37] font-semibold mb-1.5">
                  <Clock className="h-4 w-4" />
                  <span>1. Communication Latency & Bandwidth</span>
                </div>
                <p className="leading-relaxed text-[#D1C6B4]">
                  {letter.modernBreakdown.temporalSpeedComparison}
                </p>
              </div>

              {/* Breakdown 2: Cultural Hierarchies & Etiquette */}
              <div className="rounded-xl border border-[#30271E] bg-[#14110E] p-4">
                <div className="flex items-center space-x-2 text-[#D4AF37] font-semibold mb-1.5">
                  <ShieldAlert className="h-4 w-4" />
                  <span>2. Social Hierarchy, Censorship & Epistolary Etiquette</span>
                </div>
                <p className="leading-relaxed text-[#D1C6B4]">
                  {letter.modernBreakdown.culturalHierarchiesEtiquette}
                </p>
              </div>

              {/* Breakdown 3: Material Cost & Physicality */}
              <div className="rounded-xl border border-[#30271E] bg-[#14110E] p-4">
                <div className="flex items-center space-x-2 text-[#D4AF37] font-semibold mb-1.5">
                  <Scroll className="h-4 w-4" />
                  <span>3. Material Economics & Physical Labor of Writing</span>
                </div>
                <p className="leading-relaxed text-[#D1C6B4]">
                  {letter.modernBreakdown.materialCostAndPhysicality}
                </p>
              </div>

              {/* Breakdown 4: Historical Evidence & Citations */}
              <div className="rounded-xl border border-[#30271E] bg-[#14110E] p-4">
                <div className="flex items-center space-x-2 text-[#D4AF37] font-semibold mb-1.5">
                  <BookOpen className="h-4 w-4" />
                  <span>4. Grounded Research & Archival Evidence Citations</span>
                </div>
                <ul className="space-y-1.5 mt-2">
                  {letter.modernBreakdown.historicalEvidenceCitations.map((citation, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start space-x-2 text-[11px] text-[#A69C8B] italic"
                    >
                      <span className="text-[#D4AF37] not-italic font-bold">•</span>
                      <span>{citation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Return to Manuscript Action */}
              <div className="pt-2 text-right">
                <button
                  onClick={() => setActiveTab('manuscript')}
                  className="rounded-lg border border-[#B8860B]/60 bg-[#251E16] px-4 py-2 text-xs font-semibold text-[#F0D58C] hover:border-[#E8C568] transition"
                >
                  Return to Manuscript View ➔
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
