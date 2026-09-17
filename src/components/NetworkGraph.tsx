import React, { useState } from 'react';
import { HistoricalFigure, Recipient, RelationType } from '../types';
import { RecipientNetworkWeb } from './RecipientNetworkWeb';
import { 
  Users, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Send, 
  ArrowLeft, 
  Sparkles, 
  Scroll, 
  Building2, 
  Crown, 
  GraduationCap, 
  HeartHandshake,
  Share2
} from 'lucide-react';

interface NetworkGraphProps {
  figure: HistoricalFigure;
  selectedRecipient: Recipient | null;
  onSelectRecipient: (recipient: Recipient) => void;
  onBackToPersonas: () => void;
  onProceedToStudio: () => void;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  figure,
  selectedRecipient,
  onSelectRecipient,
  onBackToPersonas,
  onProceedToStudio,
}) => {
  const [hoveredNode, setHoveredNode] = useState<Recipient | null>(null);

  const getRelationBadge = (type: RelationType) => {
    switch (type) {
      case 'patron':
        return { label: 'Sovereign Patron', color: 'border-amber-700/60 bg-amber-950/40 text-amber-300', icon: Crown };
      case 'political':
        return { label: 'Strategic Ally', color: 'border-blue-700/60 bg-blue-950/40 text-blue-300', icon: Building2 };
      case 'peer':
        return { label: 'Intellectual Peer', color: 'border-emerald-700/60 bg-emerald-950/40 text-emerald-300', icon: GraduationCap };
      case 'kinship':
        return { label: 'Kinship & Pact', color: 'border-rose-700/60 bg-rose-950/40 text-rose-300', icon: HeartHandshake };
      case 'disciple':
        return { label: 'Devoted Disciple', color: 'border-purple-700/60 bg-purple-950/40 text-purple-300', icon: Users };
      default:
        return { label: 'Correspondent', color: 'border-stone-700 bg-stone-900 text-stone-300', icon: Users };
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Top Navigation & Status */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-[#2E271F] pb-6 sm:flex-row sm:items-center">
        <div>
          <button
            onClick={onBackToPersonas}
            className="group mb-2 flex items-center space-x-1.5 text-xs font-medium text-[#9E9484] transition hover:text-[#D4AF37]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Choose Different Historical Role</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <h1 className="font-cinzel text-2xl font-bold tracking-tight text-[#F8F5EE] sm:text-3xl">
              {figure.name}’s Correspondence Web
            </h1>
            <span className="rounded-full border border-[#B8860B]/40 bg-[#251E16] px-3 py-0.5 text-xs font-semibold text-[#D4AF37]">
              {figure.country} • {figure.era}
            </span>
          </div>
          
          <p className="mt-1 text-sm text-[#A89D8B]">
            Select an authentic historical correspondent from {figure.name}’s network to begin interactive letter composition.
          </p>
        </div>

        {selectedRecipient && (
          <button
            onClick={onProceedToStudio}
            className="flex items-center space-x-2 rounded-xl border border-[#B8860B] bg-gradient-to-r from-[#8B6508] to-[#B8860B] px-5 py-2.5 text-sm font-bold text-[#141210] shadow-lg transition hover:from-[#A87B0A] hover:to-[#D4AF37] active:scale-[0.98]"
          >
            <span>Write to {selectedRecipient.name.split(' ')[0]}</span>
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Visual Network Overview Banner */}
      <div className="mb-8 rounded-2xl border border-[#3A3228] bg-gradient-to-b from-[#1E1A15] to-[#16130F] p-6 shadow-inner">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8860B]">
              The Realities of Correspondence in {figure.years}
            </span>
            <h2 className="mt-1 font-cinzel text-lg font-bold text-[#F3EFE6]">
              Every Letter Carried Political Stakes and Months of Waiting
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-[#A69B8B]">
              In this era, epistolary connections required heavy physical labor: messengers on horseback traversing alpine snows, diplomatic packet vessels running naval blockades, or pneumatic copper tubes beneath Paris cobblestones. Select a recipient to explore their relationship.
            </p>
          </div>

          <div className="flex items-center space-x-4 border-t border-[#312920] pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
            <div className="rounded-lg bg-[#221D16] p-3 text-center border border-[#3C3328]">
              <span className="block font-cinzel text-xl font-bold text-[#D4AF37]">{figure.recipients.length}</span>
              <span className="text-[11px] uppercase tracking-wider text-[#8A7E6E]">Active Nodes</span>
            </div>
            <div className="rounded-lg bg-[#221D16] p-3 text-center border border-[#3C3328]">
              <span className="block font-cinzel text-xl font-bold text-[#D4AF37]">
                {figure.writingKit.eraName.split(' ')[0]}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#8A7E6E]">Scriptorium</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Constellation Network Diagram (Transparent floating background) */}
      <div className="mb-8 rounded-2xl border border-[#8C6D46]/40 bg-[#1C120B]/35 backdrop-blur-md p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3 border-b border-[#8C6D46]/30 pb-3">
          <div className="flex items-center space-x-2">
            <Share2 className="h-4 w-4 text-[#D4AF37]" />
            <h3 className="font-cinzel text-base font-bold text-[#F5F2E9]">
              Interactive Epistolary Network Diagram
            </h3>
          </div>
          <span className="text-xs text-[#A89D8B] font-serif hidden sm:inline">
            Click any correspondent to establish letter link
          </span>
        </div>

        <div className="w-full py-2">
          <RecipientNetworkWeb
            sender={figure}
            recipients={figure.recipients}
            selectedRecipient={selectedRecipient}
            onSelectRecipient={onSelectRecipient}
          />
        </div>
      </div>

      {/* Recipient Nodes Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {figure.recipients.map((recipient) => {
          const isSelected = selectedRecipient?.id === recipient.id;
          const badge = getRelationBadge(recipient.relationType);
          const BadgeIcon = badge.icon;

          return (
            <div
              key={recipient.id}
              onClick={() => onSelectRecipient(recipient)}
              onMouseEnter={() => setHoveredNode(recipient)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`cursor-pointer rounded-2xl border p-6 transition-all duration-300 ${
                isSelected
                  ? 'border-[#D4AF37] bg-[#241E17] shadow-xl shadow-[#B8860B]/15 ring-1 ring-[#D4AF37]'
                  : 'border-[#383025] bg-[#191612] hover:border-[#B8860B]/60 hover:bg-[#1E1A14]'
              }`}
            >
              {/* Header: Name and Relationship Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[#F5F2E9]">
                    {recipient.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#C49B45]">
                    {recipient.title}
                  </p>
                </div>

                <span className={`inline-flex items-center space-x-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${badge.color}`}>
                  <BadgeIcon className="h-3 w-3" />
                  <span>{badge.label}</span>
                </span>
              </div>

              {/* Transit & Geographic Details */}
              <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-[#2F271E] bg-[#14110E] p-3 text-xs">
                <div className="flex items-center space-x-1.5 text-[#A69C8B]">
                  <MapPin className="h-3.5 w-3.5 text-[#B8860B] shrink-0" />
                  <span className="truncate">{recipient.location}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[#A69C8B]">
                  <Clock className="h-3.5 w-3.5 text-[#B8860B] shrink-0" />
                  <span className="truncate">{recipient.transitDays}</span>
                </div>
              </div>

              {/* Historical Stakes & Risk */}
              <div className="mt-4 space-y-2 text-xs">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8F8372]">
                    Historical Stakes:
                  </span>
                  <p className="mt-0.5 text-[#C4B9A7] leading-relaxed">
                    {recipient.stakes}
                  </p>
                </div>

                <div className="flex items-start space-x-2 rounded-lg bg-[#201A13] p-2.5 border border-[#352B1E]">
                  <ShieldAlert className="h-4 w-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-snug">
                    <span className="font-semibold text-[#E5C365]">Era Transmission Risk: </span>
                    <span className="text-[#A89C8B]">{recipient.transitRisk}</span>
                  </div>
                </div>

                {/* Primary Source Evidence Reference */}
                <div className="pt-2 border-t border-[#2B231A] text-[11px] text-[#7A6F5F] italic">
                  <span className="not-italic font-semibold text-[#998B78]">Surviving Record: </span>
                  {recipient.survivingArtifactNote}
                </div>
              </div>

              {/* Selection Indicator Action */}
              <div className="mt-5 flex items-center justify-between pt-3 border-t border-[#2A231A]">
                <span className="text-xs text-[#8A7F6E]">
                  {isSelected ? 'Selected Correspondent' : 'Click to select'}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRecipient(recipient);
                    onProceedToStudio();
                  }}
                  className={`flex items-center space-x-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-[#B8860B] text-[#141210]'
                      : 'border border-[#453A2C] bg-[#221C16] text-[#D4AF37] hover:border-[#B8860B]'
                  }`}
                >
                  <span>Open Studio</span>
                  <Send className="h-3 w-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
