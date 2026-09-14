import React from 'react';
import { Recipient, HistoricalFigure } from '../types';
import { Check, Sparkles } from 'lucide-react';

interface RecipientNetworkWebProps {
  sender: HistoricalFigure;
  recipients: Recipient[];
  selectedRecipient: Recipient | null;
  onSelectRecipient: (recipient: Recipient) => void;
}

// Maps recipient identifiers and names to authentic vintage portraits
export function getPortraitForPerson(id: string, name: string = ''): string {
  const s = `${id} ${name}`.toLowerCase();
  if (s.includes('curie') && !s.includes('irene')) return '/assets/portraits/curie.jpg';
  if (s.includes('irene')) return '/assets/portraits/irene.jpg';
  if (s.includes('einstein')) return '/assets/portraits/einstein.jpg';
  if (s.includes('tagore')) return '/assets/portraits/tagore.jpg';
  if (s.includes('bohr')) return '/assets/portraits/bohr.jpg';
  if (s.includes('freud')) return '/assets/portraits/freud.jpg';
  if (s.includes('planck')) return '/assets/portraits/planck.jpg';
  if (s.includes('langevin')) return '/assets/portraits/langevin.jpg';
  if (s.includes('rutherford')) return '/assets/portraits/rutherford.jpg';
  if (s.includes('gandhi')) return '/assets/portraits/gandhi.jpg';
  if (s.includes('yeats')) return '/assets/portraits/yeats.jpg';
  if (s.includes('machiavelli') || s.includes('sforza')) return '/assets/portraits/machiavelli.jpg';
  if (s.includes('dluska')) return '/assets/portraits/curie.jpg';
  if (s.includes('rolland') || s.includes('andrews')) return '/assets/portraits/yeats.jpg';
  return '/assets/portraits/curie.jpg';
}

// Identifies the correspondent with the deepest historical intersection & shared events
export function getDeepestRecipientId(senderId: string, recipients: Recipient[]): string {
  if (!recipients || recipients.length === 0) return '';
  const affinities: Record<string, string> = {
    curie: 'albert-einstein',
    einstein: 'curie',
    tagore: 'einstein',
    leonardo: 'ludovico-sforza',
  };
  const target = affinities[senderId.toLowerCase()];
  if (target) {
    const match = recipients.find(r => r.id.toLowerCase().includes(target));
    if (match) return match.id;
  }
  return recipients[0]?.id || '';
}

export const RecipientNetworkWeb: React.FC<RecipientNetworkWebProps> = ({
  sender,
  recipients,
  selectedRecipient,
  onSelectRecipient,
}) => {
  const count = recipients.length;
  const centerX = 50;
  const centerY = 48;
  const rx = 36; // horizontal radius in percent
  const ry = 34; // vertical radius in percent

  const deepestRecipientId = getDeepestRecipientId(sender.id, recipients);

  // Calculate coordinates for each recipient node
  const nodePositions = recipients.map((rec, i) => {
    // Start at -90 degrees (top) and space evenly around the sender
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / (count || 1);
    const x = centerX + rx * Math.cos(angle);
    const y = centerY + ry * Math.sin(angle);
    const isDeepest = rec.id === deepestRecipientId;
    return {
      x,
      y,
      recipient: rec,
      isSelected: selectedRecipient?.id === rec.id,
      isDeepest,
    };
  });

  return (
    <div className="relative w-full h-64 sm:h-72 my-1 select-none overflow-visible">
      {/* 1. SVG WEB FILAMENTS (Transparent background, golden filaments) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="activeBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFF2B2" stopOpacity="1" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ring connection between adjacent nodes */}
        {nodePositions.map((pos, i) => {
          const nextPos = nodePositions[(i + 1) % nodePositions.length];
          return (
            <line
              key={`ring-${i}`}
              x1={`${pos.x}%`}
              y1={`${pos.y}%`}
              x2={`${nextPos.x}%`}
              y2={`${nextPos.y}%`}
              stroke="#A38259"
              strokeWidth="0.8"
              strokeOpacity="0.35"
              strokeDasharray="2, 2"
            />
          );
        })}

        {/* Radial lines from sender to each recipient */}
        {nodePositions.map((pos) => {
          const isSelected = pos.isSelected;
          const isDeepest = pos.isDeepest;

          return (
            <line
              key={`radial-${pos.recipient.id}`}
              x1={`${centerX}%`}
              y1={`${centerY}%`}
              x2={`${pos.x}%`}
              y2={`${pos.y}%`}
              stroke={isSelected ? "url(#activeBeam)" : (isDeepest ? "#D4AF37" : "#8C6D46")}
              strokeWidth={isSelected ? "2.2" : (isDeepest ? "1.8" : "0.9")}
              strokeOpacity={isSelected ? 0.95 : (isDeepest ? 0.85 : 0.4)}
              strokeDasharray={(!isSelected && !isDeepest) ? undefined : undefined}
              filter={isSelected ? "url(#goldGlow)" : undefined}
            />
          );
        })}
      </svg>

      {/* 2. CENTER SENDER NODE (Writer) */}
      <div
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          transform: 'translate(-50%, -50%)',
        }}
        className="absolute z-10 flex flex-col items-center pointer-events-none"
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#8C6D46] shadow-md bg-[#25150C]">
          <img
            src={getPortraitForPerson(sender.id, sender.name)}
            alt={sender.name}
            className="w-full h-full object-cover grayscale contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#D4AF37]/10 mix-blend-color" />
        </div>
        <div className="mt-1 px-2 py-0.5 rounded bg-[#FAF4EA]/95 border border-[#8C6D46]/40 shadow-xs">
          <span className="text-[10px] sm:text-[11px] font-serif font-bold text-[#4A2D1A] whitespace-nowrap">
            {sender.name}
          </span>
        </div>
      </div>

      {/* 3. RECIPIENT NODES */}
      {nodePositions.map(({ x, y, recipient, isSelected, isDeepest }) => {
        const portraitUrl = getPortraitForPerson(recipient.id, recipient.name);

        return (
          <button
            key={recipient.id}
            id={`node-recipient-${recipient.id}`}
            type="button"
            onClick={() => onSelectRecipient(recipient)}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className={`absolute group flex flex-col items-center cursor-pointer transition-all duration-300 ease-out focus:outline-none ${
              isSelected
                ? 'scale-125 sm:scale-130 z-30'
                : (isDeepest
                    ? 'hover:scale-115 z-25 opacity-100'
                    : 'hover:scale-110 z-20 opacity-90 hover:opacity-100')
            }`}
            title={isDeepest ? `Deepest historical affinity: ${recipient.name}` : `Correspond with ${recipient.name}`}
          >
            {/* Circular Portrait Image (Significantly larger for the deepest relationship node) */}
            <div
              className={`relative rounded-full overflow-hidden transition-all duration-300 shadow-md ${
                isSelected
                  ? (isDeepest
                      ? 'w-16 h-16 sm:w-18 sm:h-18 border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/60 shadow-[0_0_22px_rgba(212,175,55,0.7)]'
                      : 'w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/45 shadow-[0_0_18px_rgba(212,175,55,0.6)]')
                  : (isDeepest
                      ? 'w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-[0_0_12px_rgba(212,175,55,0.4)] group-hover:ring-4 group-hover:ring-[#D4AF37]/60'
                      : 'w-11 h-11 sm:w-12 sm:h-12 border-2 border-[#8C6D46]/70 group-hover:border-[#D4AF37]')
              }`}
            >
              <img
                src={portraitUrl}
                alt={recipient.name}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isSelected || isDeepest
                    ? 'brightness-105 contrast-105 grayscale-0'
                    : 'grayscale group-hover:grayscale-0'
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Selected Check Indicator */}
              {isSelected && (
                <div className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#D4AF37] text-[#1A0F07] flex items-center justify-center shadow">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </div>
              )}

              {/* Deepest Relationship Badge Indicator */}
              {isDeepest && !isSelected && (
                <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-[#1A0F07] flex items-center justify-center shadow-xs">
                  <Sparkles className="h-2 w-2" />
                </div>
              )}
            </div>

            {/* Clear Name Label with prominent styling for the deepest node */}
            <div
              className={`mt-1 px-2 py-0.5 rounded-md transition-all duration-200 shadow-sm ${
                isSelected
                  ? 'bg-[#D4AF37] text-[#140C07] font-bold border border-[#F5E0A3]'
                  : (isDeepest
                      ? 'bg-[#FFF9EE] group-hover:bg-[#FFF] text-[#2C180B] border border-[#D4AF37]/70 font-semibold shadow-xs'
                      : 'bg-[#FAF4EA]/90 group-hover:bg-[#FFF] text-[#2C180B] border border-[#8C6D46]/35')
              }`}
            >
              {isDeepest && (
                <span className="text-[8.5px] font-sans font-bold text-[#A67512] tracking-wider uppercase block text-center leading-none mb-0.5">
                  ★ Deepest Bond
                </span>
              )}
              <span className={`font-serif whitespace-nowrap block text-center leading-tight ${
                isDeepest ? 'text-xs sm:text-[13px] font-bold text-[#2C180B]' : 'text-[10.5px] sm:text-xs font-semibold'
              }`}>
                {recipient.name}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
