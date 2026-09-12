import React, { useState } from 'react';
import { HistoricalFigure, FigureId } from '../types';
import { Feather, Sparkles, Compass, ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface HomePagePensProps {
  figures: HistoricalFigure[];
  onSelectFigure: (figure: HistoricalFigure) => void;
  onOpenRelationshipMap: () => void;
}

export const HomePagePens: React.FC<HomePagePensProps> = ({
  figures,
  onSelectFigure,
  onOpenRelationshipMap,
}) => {
  const [hoveredFigureId, setHoveredFigureId] = useState<FigureId | null>(null);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Map figures explicitly
  const curie = figures.find((f) => f.id === 'curie') || figures[1];
  const einstein = figures.find((f) => f.id === 'einstein') || figures[0];
  const tagore = figures.find((f) => f.id === 'tagore') || figures[2];

  // Synthesize tactile pen acoustic feedback using Web Audio API
  const playTactileAudio = (type: 'curie' | 'einstein' | 'tagore') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'einstein') {
        // Capped Fountain Pen uncap mechanical snap sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(420, now + 0.04);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);

        // Click transient
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.005));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.2, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);
      } else {
        // Dip Pen nib touch & ink resonance
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const baseFreq = type === 'curie' ? 380 : 490;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.03);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.8, now + 0.15);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Ignore silent audio block
    }
  };

  const handlePenClick = (fig: HistoricalFigure, type: 'curie' | 'einstein' | 'tagore') => {
    playTactileAudio(type);
    onSelectFigure(fig);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#24160E] select-none flex flex-col justify-between">
      {/* 1. Leather Desk Texture & Ambient Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/pens_desk.jpg')`,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          background: `
            radial-gradient(ellipse at 50% 45%, rgba(68, 41, 25, 0.45) 0%, rgba(26, 15, 9, 0.95) 85%),
            linear-gradient(180deg, rgba(20, 11, 7, 0.7) 0%, rgba(36, 22, 14, 0.3) 50%, rgba(18, 10, 6, 0.85) 100%)
          `,
        }}
      />

      {/* Subtle fine leather grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #fff 1px, transparent 1px)`,
          backgroundSize: '12px 12px',
        }}
      />

      {/* 2. Top Header - Minimalist & Atmospheric */}
      <header className="relative z-20 pt-8 pb-4 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#8C6D46]/30 bg-[#1A1009]/60 backdrop-blur-sm mb-3">
          <Feather className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#CBB99F] uppercase">
            Historical Writing Desk
          </span>
        </div>
        <h1 className="font-cinzel text-2xl sm:text-4xl font-bold tracking-widest text-[#F5EFEB] drop-shadow-md">
          E P I S T O L A
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#A89481] max-w-xl mx-auto font-serif tracking-wide">
          Select an authentic period writing instrument to step into their persona and begin historical correspondence
        </p>
      </header>

      {/* 3. The Three Pens on Desk (Left to Right: Marie Curie -> Albert Einstein -> Rabindranath Tagore) */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-4xl grid grid-cols-3 gap-3 sm:gap-8 md:gap-14 items-center justify-items-center">
          
          {/* ========================================================= */}
          {/* PEN 1 (LEFT): Marie Curie · Dark Brown Wood Dip Pen */}
          {/* ========================================================= */}
          <div 
            id="desk-pen-curie"
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 w-full"
            onMouseEnter={() => {
              setHoveredFigureId('curie');
              playTactileAudio('curie');
            }}
            onMouseLeave={() => setHoveredFigureId(null)}
            onClick={() => handlePenClick(curie, 'curie')}
          >
            {/* Top Indicator Badge on Hover */}
            <div className={`mb-3 transition-all duration-300 text-center ${hoveredFigureId === 'curie' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              <span className="inline-block rounded border border-[#8C5E3C] bg-[#2E180E]/90 px-2.5 py-1 text-[11px] font-serif font-bold text-[#E6CDB8] shadow-lg">
                Take Pen · Marie Curie
              </span>
            </div>

            {/* Pen Body Container */}
            <div className="relative flex items-center justify-center p-2 sm:p-4 rounded-2xl transition-transform duration-300 group-hover:-translate-y-4">
              
              {/* Soft cast shadow on leather */}
              <div className="absolute inset-x-4 bottom-2 h-4 rounded-full bg-black/50 blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-75" />

              {/* SVG Illustration of Curie's Dark Brown Wooden Dip Pen */}
              <svg 
                viewBox="0 0 70 540" 
                className="w-12 sm:w-16 md:w-20 h-80 sm:h-[460px] md:h-[520px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] filter"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Dark wood grain gradient */}
                  <linearGradient id="curieWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#25130A" />
                    <stop offset="35%" stopColor="#4A2917" />
                    <stop offset="65%" stopColor="#5E351F" />
                    <stop offset="85%" stopColor="#3B2011" />
                    <stop offset="100%" stopColor="#1B0C06" />
                  </linearGradient>

                  {/* Steel Nib gradient */}
                  <linearGradient id="steelNibGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7E8489" />
                    <stop offset="40%" stopColor="#C8CDD1" />
                    <stop offset="70%" stopColor="#F0F3F5" />
                    <stop offset="100%" stopColor="#8A9096" />
                  </linearGradient>

                  {/* Brass ferrule */}
                  <linearGradient id="brassCollar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6E501E" />
                    <stop offset="50%" stopColor="#DFB35A" />
                    <stop offset="100%" stopColor="#593E14" />
                  </linearGradient>
                </defs>

                {/* 1. Pointed Dip Nib (Top) */}
                <path 
                  d="M35 15 L25 80 Q25 95 28 100 L42 100 Q45 95 45 80 Z" 
                  fill="url(#steelNibGrad)" 
                  stroke="#474A4D" 
                  strokeWidth="0.8" 
                />
                {/* Nib Breather Hole & Slit */}
                <circle cx="35" cy="55" r="2.2" fill="#24150E" />
                <line x1="35" y1="16" x2="35" y2="53" stroke="#2B2E30" strokeWidth="1" />
                <path d="M28 78 Q35 84 42 78" stroke="#686C70" strokeWidth="0.8" fill="none" />

                {/* 2. Brass Ferrule Collar */}
                <rect x="27" y="98" width="16" height="12" rx="2" fill="url(#brassCollar)" stroke="#4A3412" strokeWidth="0.6" />
                <line x1="27" y1="104" x2="43" y2="104" stroke="#FFF0A8" strokeWidth="0.5" opacity="0.6" />

                {/* 3. Dark Brown Turned Wooden Shaft (Deep contoured ergonomic taper) */}
                <path 
                  d="M28 110 
                     C25 150, 23 200, 24 260 
                     C25 320, 27 380, 31 460 
                     C32 485, 30 500, 31 515 
                     C31 525, 33 530, 35 530 
                     C37 530, 39 525, 39 515 
                     C40 500, 38 485, 39 460 
                     C43 380, 45 320, 46 260 
                     C47 200, 45 150, 42 110 Z" 
                  fill="url(#curieWoodGrad)" 
                  stroke="#1E0D05" 
                  strokeWidth="1.2" 
                />

                {/* Wooden Finial Bulb (Bottom) */}
                <circle cx="35" cy="522" r="5" fill="url(#curieWoodGrad)" stroke="#190A04" strokeWidth="0.8" />

                {/* Wood Specular Highlight Spine */}
                <path 
                  d="M33 115 C31 200, 32 300, 34 460" 
                  stroke="#8B5332" 
                  strokeWidth="1.2" 
                  opacity="0.45" 
                  strokeLinecap="round" 
                />
              </svg>

              {/* Selection Halo / Glow */}
              <div className={`absolute inset-0 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/5 transition-opacity duration-300 pointer-events-none ${hoveredFigureId === 'curie' ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Bottom Pen Identification Plaque */}
            <div className="mt-4 text-center">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#EEDCC9] tracking-wider group-hover:text-[#D4AF37] transition">
                Marie Curie
              </h3>
              <p className="text-[10px] sm:text-xs text-[#A88C74] font-serif mt-0.5">
                Turned Wood Dip Pen
              </p>
              <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium tracking-wide rounded bg-[#351E12] text-[#D8BFA8] border border-[#523321]">
                Sorbonne Laboratory · Paris
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PEN 2 (CENTER): Albert Einstein · Capped Gold-Trim Fountain Pen */}
          {/* ========================================================= */}
          <div 
            id="desk-pen-einstein"
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 w-full"
            onMouseEnter={() => {
              setHoveredFigureId('einstein');
              playTactileAudio('einstein');
            }}
            onMouseLeave={() => setHoveredFigureId(null)}
            onClick={() => handlePenClick(einstein, 'einstein')}
          >
            {/* Top Indicator Badge on Hover */}
            <div className={`mb-3 transition-all duration-300 text-center ${hoveredFigureId === 'einstein' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              <span className="inline-block rounded border border-[#D4AF37] bg-[#1E1912]/95 px-2.5 py-1 text-[11px] font-serif font-bold text-[#F3E5AB] shadow-lg">
                Take Pen · Albert Einstein
              </span>
            </div>

            {/* Pen Body Container */}
            <div className="relative flex items-center justify-center p-2 sm:p-4 rounded-2xl transition-transform duration-300 group-hover:-translate-y-4">
              
              {/* Soft cast shadow on leather */}
              <div className="absolute inset-x-4 bottom-2 h-4 rounded-full bg-black/65 blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-85" />

              {/* SVG Illustration of Einstein's Black Capped Fountain Pen with Gold Trim */}
              <svg 
                viewBox="0 0 70 540" 
                className="w-13 sm:w-18 md:w-22 h-80 sm:h-[460px] md:h-[520px] drop-shadow-[0_14px_28px_rgba(0,0,0,0.7)] filter"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Glossy Black Resin gradient */}
                  <linearGradient id="blackResinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0E0E0F" />
                    <stop offset="25%" stopColor="#222326" />
                    <stop offset="50%" stopColor="#383B3F" />
                    <stop offset="70%" stopColor="#1E2021" />
                    <stop offset="100%" stopColor="#080809" />
                  </linearGradient>

                  {/* Polished Gold Trim gradient */}
                  <linearGradient id="goldTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8C6517" />
                    <stop offset="25%" stopColor="#E5C158" />
                    <stop offset="60%" stopColor="#FFF2A3" />
                    <stop offset="85%" stopColor="#D9AA35" />
                    <stop offset="100%" stopColor="#75520E" />
                  </linearGradient>
                </defs>

                {/* 1. Rounded Cap Top Finial & Clip Ring */}
                <ellipse cx="35" cy="50" rx="16" ry="14" fill="url(#blackResinGrad)" stroke="#111" strokeWidth="0.8" />
                <rect x="25" y="58" width="20" height="4" rx="1" fill="url(#goldTrimGrad)" />

                {/* 2. Fountain Pen Cap Body (Capped) */}
                <path 
                  d="M20 60 
                     L19 220 
                     Q35 224 51 220 
                     L50 60 
                     Z" 
                  fill="url(#blackResinGrad)" 
                  stroke="#101012" 
                  strokeWidth="1.2" 
                />

                {/* Vintage Gold Pocket Clip with Teardrop Ball End */}
                <path 
                  d="M33 60 L33 168 Q35 174 37 168 L37 60 Z" 
                  fill="url(#goldTrimGrad)" 
                  stroke="#7A560E" 
                  strokeWidth="0.6" 
                />
                <circle cx="35" cy="170" r="3.2" fill="url(#goldTrimGrad)" stroke="#6A490A" strokeWidth="0.6" />

                {/* 3. Wide Center Cap Band (Gold Ring Trim) */}
                <rect x="18.5" y="212" width="33" height="12" rx="1.5" fill="url(#goldTrimGrad)" stroke="#6A4D0E" strokeWidth="0.8" />
                <line x1="19" y1="218" x2="51" y2="218" stroke="#FFF7C2" strokeWidth="0.6" opacity="0.7" />

                {/* 4. Barrel Body (Vintage Torpedo Contour) */}
                <path 
                  d="M20 224 
                     L21 440 
                     Q22 490 35 520 
                     Q48 490 49 440 
                     L50 224 
                     Z" 
                  fill="url(#blackResinGrad)" 
                  stroke="#0C0D0E" 
                  strokeWidth="1.2" 
                />

                {/* 5. Lower Gold Barrel Accent Ring */}
                <rect x="23" y="440" width="24" height="6" rx="1" fill="url(#goldTrimGrad)" stroke="#6B4E0E" strokeWidth="0.6" />

                {/* Specular Highlight along Left Shoulder */}
                <path 
                  d="M23 70 L22 210 M24 230 L25 430 Q26 470 33 505" 
                  stroke="#62666B" 
                  strokeWidth="1.4" 
                  opacity="0.4" 
                  strokeLinecap="round" 
                />
              </svg>

              {/* Selection Halo / Glow */}
              <div className={`absolute inset-0 rounded-2xl border border-[#D4AF37]/60 bg-[#D4AF37]/8 transition-opacity duration-300 pointer-events-none ${hoveredFigureId === 'einstein' ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Bottom Pen Identification Plaque */}
            <div className="mt-4 text-center">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F3EFE6] tracking-wider group-hover:text-[#D4AF37] transition">
                Albert Einstein
              </h3>
              <p className="text-[10px] sm:text-xs text-[#BFAB95] font-serif mt-0.5">
                Capped Gold-Trim Fountain Pen
              </p>
              <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium tracking-wide rounded bg-[#2D2319] text-[#E0C9A6] border border-[#52412E]">
                Princeton Study · New Jersey
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PEN 3 (RIGHT): Rabindranath Tagore · Slender Blonde Wood Dip Pen */}
          {/* ========================================================= */}
          <div 
            id="desk-pen-tagore"
            className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 w-full"
            onMouseEnter={() => {
              setHoveredFigureId('tagore');
              playTactileAudio('tagore');
            }}
            onMouseLeave={() => setHoveredFigureId(null)}
            onClick={() => handlePenClick(tagore, 'tagore')}
          >
            {/* Top Indicator Badge on Hover */}
            <div className={`mb-3 transition-all duration-300 text-center ${hoveredFigureId === 'tagore' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              <span className="inline-block rounded border border-[#C2965D] bg-[#2A1D13]/90 px-2.5 py-1 text-[11px] font-serif font-bold text-[#F2DFCE] shadow-lg">
                Take Pen · Rabindranath Tagore
              </span>
            </div>

            {/* Pen Body Container */}
            <div className="relative flex items-center justify-center p-2 sm:p-4 rounded-2xl transition-transform duration-300 group-hover:-translate-y-4">
              
              {/* Soft cast shadow on leather */}
              <div className="absolute inset-x-4 bottom-2 h-4 rounded-full bg-black/45 blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-75" />

              {/* SVG Illustration of Tagore's Slender Blonde Wood Dip Pen */}
              <svg 
                viewBox="0 0 70 540" 
                className="w-12 sm:w-16 md:w-20 h-80 sm:h-[460px] md:h-[520px] drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] filter"
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Light Blonde Wood Grain gradient */}
                  <linearGradient id="tagoreWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7B5024" />
                    <stop offset="25%" stopColor="#C99457" />
                    <stop offset="55%" stopColor="#E4B47B" />
                    <stop offset="80%" stopColor="#B37E43" />
                    <stop offset="100%" stopColor="#6E441D" />
                  </linearGradient>

                  {/* Silver pointed nib */}
                  <linearGradient id="silverNibGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#85888C" />
                    <stop offset="45%" stopColor="#E2E6EA" />
                    <stop offset="75%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#969BA0" />
                  </linearGradient>

                  {/* Dark wood insert ring */}
                  <linearGradient id="woodRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4A2A11" />
                    <stop offset="50%" stopColor="#7E4C24" />
                    <stop offset="100%" stopColor="#3C210C" />
                  </linearGradient>
                </defs>

                {/* 1. Fine Pointed Dip Nib (Top) */}
                <path 
                  d="M35 15 L26 78 Q27 94 30 100 L40 100 Q43 94 44 78 Z" 
                  fill="url(#silverNibGrad)" 
                  stroke="#575B5F" 
                  strokeWidth="0.8" 
                />
                {/* Nib Slit & Vent */}
                <circle cx="35" cy="52" r="1.8" fill="#2E1C12" />
                <line x1="35" y1="16" x2="35" y2="50" stroke="#33373A" strokeWidth="0.9" />

                {/* 2. Metal Collar Joint */}
                <rect x="29" y="98" width="12" height="8" rx="1" fill="#999EA3" stroke="#525559" strokeWidth="0.5" />

                {/* 3. Slender Light Wooden Shaft (Elegant straight taper) */}
                <path 
                  d="M30 106 
                     C27 150, 26 210, 28 290 
                     C29 360, 31 430, 33 490 
                     C33.5 510, 34 525, 35 528 
                     C36 525, 36.5 510, 37 490 
                     C39 430, 41 360, 42 290 
                     C44 210, 43 150, 40 106 Z" 
                  fill="url(#tagoreWoodGrad)" 
                  stroke="#4E2F16" 
                  strokeWidth="1.1" 
                />

                {/* Organic Fine Wood Striations */}
                <path 
                  d="M32 110 C30 190, 31 290, 34 470" 
                  stroke="#F3CA98" 
                  strokeWidth="1" 
                  opacity="0.5" 
                  strokeLinecap="round" 
                />
                <path 
                  d="M37 125 C39 200, 38 290, 36 440" 
                  stroke="#8E5E2E" 
                  strokeWidth="0.8" 
                  opacity="0.35" 
                  strokeLinecap="round" 
                />
              </svg>

              {/* Selection Halo / Glow */}
              <div className={`absolute inset-0 rounded-2xl border border-[#D4AF37]/50 bg-[#D4AF37]/5 transition-opacity duration-300 pointer-events-none ${hoveredFigureId === 'tagore' ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Bottom Pen Identification Plaque */}
            <div className="mt-4 text-center">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#EEDCC9] tracking-wider group-hover:text-[#D4AF37] transition">
                Rabindranath Tagore
              </h3>
              <p className="text-[10px] sm:text-xs text-[#A88C74] font-serif mt-0.5">
                Slender Blonde Wood Dip Pen
              </p>
              <span className="inline-block mt-1.5 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium tracking-wide rounded bg-[#352216] text-[#D8BFA8] border border-[#523825]">
                Santiniketan Manuscript Desk · Bengal
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Bottom Discrete Actions & Audio Toggle */}
      <footer className="relative z-20 pb-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#3A2417]/50 bg-[#160D08]/40 backdrop-blur-sm">
        <div className="flex items-center gap-4 text-xs text-[#8A7663] font-serif">
          <span>Marie Curie · Dark Turned Wood Dip Pen</span>
          <span className="text-[#594231]">•</span>
          <span>Albert Einstein · Capped Gold-Trim Fountain Pen</span>
          <span className="text-[#594231]">•</span>
          <span>Rabindranath Tagore · Slender Blonde Wood Dip Pen</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute/Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border border-[#5A3A26]/50 bg-[#21140D] text-[#A89481] hover:text-[#E8DACB] transition"
            title={soundEnabled ? 'Mute pen tactile sound' : 'Enable pen tactile sound'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <VolumeX className="w-3.5 h-3.5 text-[#736353]" />}
            <span className="text-[11px]">{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          {/* Direct link to Triad Relationship Map */}
          <button
            id="btn-goto-relationship-map"
            onClick={onOpenRelationshipMap}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#8C6D46]/60 bg-[#2C1C12] text-[#E5D7C7] hover:bg-[#3D2719] hover:border-[#D4AF37] hover:text-[#FFF5EB] transition shadow"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Explore Triad Star Map</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-70" />
          </button>
        </div>
      </footer>
    </div>
  );
};
