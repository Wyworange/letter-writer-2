import React, { useState, useEffect, useRef } from 'react';
import { HistoricalFigure, GeneratedLetter } from '../types';
import { Feather, Sparkles, FastForward, Check, Volume2 } from 'lucide-react';

interface InteractivePenAnimationProps {
  figure: HistoricalFigure;
  letter: GeneratedLetter | null;
  isWriting: boolean;
  onWritingComplete: () => void;
  onStartWriting: () => void;
  soundEnabled: boolean;
  onPlaySound: (type: 'scratch' | 'dip' | 'stamp') => void;
}

export const InteractivePenAnimation: React.FC<InteractivePenAnimationProps> = ({
  figure,
  letter,
  isWriting,
  onWritingComplete,
  onStartWriting,
  soundEnabled,
  onPlaySound,
}) => {
  // Step in the progressive inking sequence: 0: salutation, 1: p1, 2: p2, 3: valediction, 4: ready to seal, 5: sealed
  const [inkingStep, setInkingStep] = useState<number>(0);
  const [isDipping, setIsDipping] = useState<boolean>(false);
  const [isSealed, setIsSealed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Pen stroke position coordinates
  const penPositions = [
    { top: '10%', left: '20%', angle: -25 },  // Salutation
    { top: '28%', left: '45%', angle: -20 },  // P1
    { top: '50%', left: '55%', angle: -15 },  // P2
    { top: '75%', left: '75%', angle: -30 },  // Valediction & Signature
  ];

  // Auto-progress inking sequence when isWriting is true
  useEffect(() => {
    if (!isWriting) {
      setInkingStep(0);
      setIsSealed(false);
      return;
    }

    // Step 0: start inking salutation
    setInkingStep(0);
    onPlaySound('dip');

    const timer1 = setTimeout(() => {
      setInkingStep(1);
      onPlaySound('scratch');
    }, 1200);

    const timer2 = setTimeout(() => {
      setInkingStep(2);
      onPlaySound('scratch');
    }, 2800);

    const timer3 = setTimeout(() => {
      setInkingStep(3);
      onPlaySound('scratch');
    }, 4500);

    const timer4 = setTimeout(() => {
      setInkingStep(4);
      onPlaySound('scratch');
      onWritingComplete();
    }, 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isWriting]);

  // Handle user manual click to guide pen faster
  const handleGuidePen = () => {
    if (!isWriting) {
      onStartWriting();
      return;
    }
    onPlaySound('scratch');
    if (inkingStep < 4) {
      setInkingStep((prev) => Math.min(prev + 1, 4));
    }
  };

  // Handle manual dip nib
  const handleDipNib = () => {
    setIsDipping(true);
    onPlaySound('dip');
    setTimeout(() => setIsDipping(false), 800);
  };

  // Handle stamping wax seal
  const handleStampWax = () => {
    if (isSealed) return;
    onPlaySound('stamp');
    setIsSealed(true);
  };

  // Historical pen aesthetics per figure
  const penTheme = {
    curie: {
      barrelColor: '#3B2314',
      nibColor: '#D4AF37',
      gripColor: '#1A0E08',
      name: 'Turned Wood Dip Pen',
      inkColor: 'rgba(28, 18, 12, 0.95)',
      sealMonogram: 'MC',
    },
    einstein: {
      barrelColor: '#1B3D2F',
      nibColor: '#E6C665',
      gripColor: '#0E1E17',
      name: 'Pelikan 100 Fountain Pen',
      inkColor: 'rgba(20, 35, 60, 0.95)',
      sealMonogram: 'AE',
    },
    tagore: {
      barrelColor: '#8C582B',
      nibColor: '#C49A45',
      gripColor: '#5C3817',
      name: 'Bamboo Reed Pen',
      inkColor: 'rgba(18, 15, 12, 0.95)',
      sealMonogram: 'RT',
    },
  }[figure.id] || {
    barrelColor: '#3B2314',
    nibColor: '#D4AF37',
    gripColor: '#1A0E08',
    name: 'Period Dip Pen',
    inkColor: 'rgba(28, 18, 12, 0.95)',
    sealMonogram: figure.name.slice(0, 2).toUpperCase(),
  };

  const currentPos = penPositions[Math.min(inkingStep, penPositions.length - 1)];

  return (
    <div className="relative w-full select-none">
      {/* ========================================================================= */}
      {/* 1. IDLE STATE: CALL-TO-ACTION PEN & INKWELL ON PARCHMENT                  */}
      {/* ========================================================================= */}
      {!isWriting && inkingStep === 0 && (
        <div 
          id="pen-illustration-cta"
          onClick={onStartWriting}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative my-4 p-5 rounded-2xl border-2 border-dashed border-[#8C6D46]/40 hover:border-[#D4AF37] bg-gradient-to-b from-[#FAF4EA]/90 to-[#F0E4D0]/95 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
          title="Click to take up the pen and begin writing"
        >
          {/* Left: Authentic SVG Illustration of the Period Pen & Inkpot */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
              {/* Inkwell base */}
              <div className="absolute bottom-1 left-2 w-10 h-10 rounded-lg bg-[#2A180E] border border-[#8C6D46] shadow-md flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#120B06] border border-[#D4AF37]/50 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#080503] animate-pulse" />
                </div>
              </div>

              {/* Slanted Historical Pen SVG */}
              <svg 
                viewBox="0 0 100 100" 
                className={`w-16 h-16 transform transition-all duration-300 drop-shadow-lg ${
                  isHovered ? '-translate-y-2 rotate-12 scale-110' : '-rotate-12'
                }`}
              >
                {/* Pen Shaft / Barrel */}
                <rect x="42" y="10" width="10" height="60" rx="3" fill={penTheme.barrelColor} stroke="#1A0E08" strokeWidth="1" />
                {/* Grip section */}
                <rect x="44" y="65" width="6" height="15" rx="1" fill={penTheme.gripColor} />
                {/* Gold/Steel Nib */}
                <polygon points="44,80 50,96 47,80" fill={penTheme.nibColor} stroke="#B8860B" strokeWidth="0.5" />
                <polygon points="50,96 56,80 53,80" fill={penTheme.nibColor} stroke="#B8860B" strokeWidth="0.5" />
                {/* Nib Breather Hole & Slit */}
                <circle cx="47" cy="85" r="1" fill="#1A0E08" />
                <line x1="47" y1="85" x2="47" y2="95" stroke="#1A0E08" strokeWidth="0.8" />
              </svg>

              {/* Glistening ink drop */}
              <div className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-[#1A0E08] animate-ping" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#3D2211]">
                  Take Up {figure.name}'s Pen
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E5D2BA] text-[#5C3817] font-semibold">
                  {penTheme.name}
                </span>
              </div>
              <p className="font-serif text-xs text-[#6A472E] mt-0.5 leading-relaxed">
                Click here or tap <strong className="text-[#2C180B]">"Start Writing"</strong> to watch the pen inscribe your selected elements across this dispatch in real-time.
              </p>
            </div>
          </div>

          {/* Right: Primary Interactive Action Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onStartWriting();
            }}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3D2517] via-[#52331F] to-[#3D2517] text-[#FAF4EA] font-serif text-xs sm:text-sm font-bold border border-[#D4AF37] shadow-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition group-hover:scale-105"
          >
            <Sparkles className="h-4 w-4 text-[#D4AF37] animate-spin" />
            <span>Start Writing</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ACTIVE INKING SEQUENCE: FLOATING PEN GLIDING & PARTICIPATION CONTROLS  */}
      {/* ========================================================================= */}
      {isWriting && (
        <div className="relative">
          {/* Floating Interactive Controls during Writing */}
          <div className="flex items-center justify-between gap-2 p-2 mb-2 rounded-xl bg-[#FAF3E6]/90 border border-[#C5A882]/60 shadow-sm text-xs font-serif">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-cinzel text-xs font-bold text-[#3D2211]">
                {inkingStep === 0 && 'Preparing Quill & Paper...'}
                {inkingStep === 1 && 'Inscribing Salutation & Opening...'}
                {inkingStep === 2 && 'Weaving Core Epistolary Argument...'}
                {inkingStep === 3 && 'Formulating Valediction & Signature...'}
                {inkingStep >= 4 && 'Manuscript Inked · Ready to Seal'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Dip Nib Button */}
              <button
                type="button"
                onClick={handleDipNib}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EFE3CF] hover:bg-[#E2D2BC] border border-[#C5A882]/50 text-[#5C3817] text-[11px] font-serif transition"
                title="Dip nib into inkwell for darker flow"
              >
                <span>✒️</span>
                <span>{isDipping ? 'Dipping...' : 'Dip Nib'}</span>
              </button>

              {/* Guide Pen / Faster Button */}
              <button
                type="button"
                onClick={handleGuidePen}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#3D2517] text-[#FAF4EA] hover:bg-[#52331F] border border-[#D4AF37] text-[11px] font-serif transition shadow-xs"
                title="Tap to guide the pen stroke forward"
              >
                <FastForward className="h-3 w-3 text-[#D4AF37]" />
                <span>Guide Stroke</span>
              </button>
            </div>
          </div>

          {/* Dynamic Manuscript Ink Reveal */}
          {letter && (
            <div 
              onClick={handleGuidePen}
              className="relative p-4 sm:p-6 rounded-xl border border-[#C5A882]/40 bg-[#FFFDF9]/60 font-serif text-[#2C180B] cursor-pointer"
              title="Click anywhere to guide the pen forward"
            >
              {/* Floating Animated Pen following the inking position */}
              <div 
                className="absolute pointer-events-none transition-all duration-700 z-30"
                style={{
                  top: currentPos.top,
                  left: currentPos.left,
                  transform: `translate(-50%, -100%) rotate(${currentPos.angle}deg)`,
                }}
              >
                <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-md">
                  <rect x="42" y="10" width="10" height="60" rx="3" fill={penTheme.barrelColor} stroke="#1A0E08" strokeWidth="1" />
                  <rect x="44" y="65" width="6" height="15" rx="1" fill={penTheme.gripColor} />
                  <polygon points="44,80 50,96 47,80" fill={penTheme.nibColor} stroke="#B8860B" strokeWidth="0.5" />
                  <polygon points="50,96 56,80 53,80" fill={penTheme.nibColor} stroke="#B8860B" strokeWidth="0.5" />
                </svg>
                {/* Nib contact ink sparkle */}
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping ml-6 -mt-2" />
              </div>

              {/* Letter text appearing step by step with glistening ink */}
              <div className="space-y-4">
                {/* Salutation */}
                <div className={`transition-all duration-500 ${inkingStep >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                  <div className="flex justify-between text-xs text-[#6A472E] italic border-b border-[#C5A882]/30 pb-1 mb-2">
                    <span>{letter.dateAndLocation}</span>
                    <span className="font-sans text-[10px] px-1.5 py-0.2 rounded bg-[#EFE3CF]">
                      Inking in progress
                    </span>
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#2C180B]">
                    {letter.salutation}
                  </h4>
                </div>

                {/* Paragraph 1 */}
                <div className={`transition-all duration-500 text-xs sm:text-sm leading-relaxed ${inkingStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <p style={{ textIndent: '1.25rem' }}>
                    {letter.bodyParagraphs[0] || ''}
                  </p>
                </div>

                {/* Paragraph 2 */}
                <div className={`transition-all duration-500 text-xs sm:text-sm leading-relaxed ${inkingStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                  {letter.bodyParagraphs[1] && (
                    <p style={{ textIndent: '1.25rem' }}>
                      {letter.bodyParagraphs[1]}
                    </p>
                  )}
                </div>

                {/* Valediction & Signature */}
                <div className={`transition-all duration-500 pt-3 flex items-end justify-between ${inkingStep >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                  {/* Hot Wax Seal Interaction */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStampWax();
                    }}
                    className={`cursor-pointer transition-all duration-300 transform ${
                      isSealed 
                        ? 'scale-100' 
                        : 'scale-105 animate-pulse hover:scale-110'
                    }`}
                    title={isSealed ? 'Wax seal stamped' : 'Click to stamp wax seal!'}
                  >
                    <div className="relative w-14 h-14 rounded-full border-2 border-[#8C2318] bg-[#A1281A] flex items-center justify-center text-[#F5EDE1] shadow-lg">
                      <span className="font-cinzel text-xs font-bold tracking-widest">
                        {penTheme.sealMonogram}
                      </span>
                      {!isSealed && (
                        <span className="absolute -top-6 text-[9px] font-sans font-bold bg-[#FAF4EA] text-[#8C2318] px-1.5 py-0.5 rounded border border-[#8C2318] shadow-xs whitespace-nowrap">
                          Tap to Seal
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sign-off */}
                  <div className="text-right">
                    <p className="font-serif italic text-xs sm:text-sm font-semibold text-[#2C180B]">
                      {letter.valediction}
                    </p>
                    <p className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[#3D2211] mt-0.5">
                      {figure.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
