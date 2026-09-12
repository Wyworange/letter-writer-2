import React, { useState } from 'react';
import { WritingKit, HistoricalFigure } from '../types';
import { X, Scroll, Feather, Droplets, Sparkles, Lock, Truck, HelpCircle } from 'lucide-react';

interface WritingKitModalProps {
  figure: HistoricalFigure;
  isOpen: boolean;
  onClose: () => void;
}

export const WritingKitModal: React.FC<WritingKitModalProps> = ({
  figure,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const { writingKit } = figure;
  const [activeTab, setActiveTab] = useState<'instrument' | 'substrate' | 'ink' | 'drying' | 'seal' | 'transit'>('instrument');

  const tools = [
    {
      id: 'instrument',
      label: 'Instrument',
      icon: Feather,
      item: writingKit.instrument,
    },
    {
      id: 'substrate',
      label: 'Substrate & Paper',
      icon: Scroll,
      item: writingKit.substrate,
    },
    {
      id: 'ink',
      label: 'Ink & Formulation',
      icon: Droplets,
      item: writingKit.ink,
    },
    {
      id: 'drying',
      label: 'Blotter / Pounce',
      icon: Sparkles,
      item: writingKit.dryingAgent,
    },
    {
      id: 'seal',
      label: 'Seal & Security',
      icon: Lock,
      item: writingKit.sealAndClosure,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#B8860B]/40 bg-[#171410] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#352D24] bg-[#1E1914] px-6 py-4">
          <div>
            <div className="flex items-center space-x-2">
              <Scroll className="h-5 w-5 text-[#D4AF37]" />
              <h2 className="font-cinzel text-xl font-bold text-[#F5F1E8]">
                Era Writing Kit: {figure.writingKit.eraName}
              </h2>
            </div>
            <p className="text-xs text-[#9E9281]">
              The material tools, physical sciences, and logistics of correspondence in {figure.years}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#9E9281] transition hover:bg-[#2A231C] hover:text-[#F5F1E8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation for Tools */}
        <div className="flex border-b border-[#30281F] bg-[#14110D] overflow-x-auto px-4">
          {tools.map((t) => {
            const Icon = t.icon;
            const isCurrent = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center space-x-2 border-b-2 px-4 py-3 text-xs font-semibold whitespace-nowrap transition ${
                  isCurrent
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1F1913]'
                    : 'border-transparent text-[#8A7E6D] hover:text-[#C9BFB1]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setActiveTab('transit')}
            className={`flex items-center space-x-2 border-b-2 px-4 py-3 text-xs font-semibold whitespace-nowrap transition ${
              activeTab === 'transit'
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1F1913]'
                : 'border-transparent text-[#8A7E6D] hover:text-[#C9BFB1]'
            }`}
          >
            <Truck className="h-4 w-4" />
            <span>Transit & Couriers</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {activeTab !== 'transit' ? (
            (() => {
              const currentTool = tools.find((t) => t.id === activeTab)!;
              const { item } = currentTool;
              return (
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8860B]">
                      Historical Specimen
                    </span>
                    <h3 className="font-cinzel text-2xl font-bold text-[#F3EFE6]">
                      {item.name}
                    </h3>
                  </div>

                  <div className="rounded-xl border border-[#322A21] bg-[#1B1712] p-4 text-xs text-[#BFB4A3] leading-relaxed">
                    <span className="font-semibold text-[#D4AF37] block mb-1">
                      Material Composition & Preparation:
                    </span>
                    {item.material}
                  </div>

                  <div className="text-xs text-[#B5AA9A] leading-relaxed">
                    {item.description}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-[#2D251D] bg-[#13110E] p-3">
                      <span className="text-[11px] font-semibold text-[#8C8070] uppercase tracking-wider block">
                        Tactile Physical Sensation:
                      </span>
                      <p className="mt-1 text-xs text-[#D8CFC2]">
                        {item.tactileDetail}
                      </p>
                    </div>

                    <div className="rounded-lg border border-[#2D251D] bg-[#13110E] p-3">
                      <span className="text-[11px] font-semibold text-[#8C8070] uppercase tracking-wider block">
                        21st-Century Digital Equivalent:
                      </span>
                      <p className="mt-1 text-xs text-[#D4AF37]">
                        {item.modernEquivalent}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8860B]">
                  Transmission Infrastructure
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-[#F3EFE6]">
                  {writingKit.transitCourier.method}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#322A21] bg-[#1B1712] p-4">
                  <span className="font-semibold text-[#D4AF37] text-xs block mb-1">
                    Transit Speed Estimate:
                  </span>
                  <p className="text-xs text-[#D1C7B8]">
                    {writingKit.transitCourier.speedEstimate}
                  </p>
                </div>

                <div className="rounded-xl border border-[#322A21] bg-[#1B1712] p-4">
                  <span className="font-semibold text-[#D97706] text-xs block mb-1">
                    Transmission Perils & Risks:
                  </span>
                  <p className="text-xs text-[#D1C7B8]">
                    {writingKit.transitCourier.risks}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#3C3225] bg-[#221C16] p-4 text-xs text-[#E5D7C2]">
                <span className="font-semibold text-[#D4AF37] block mb-1">
                  Contrast with Contemporary 21st-Century Reality:
                </span>
                <p className="leading-relaxed">
                  {writingKit.transitCourier.modernDiff}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#30281F] bg-[#14110D] px-6 py-3">
          <span className="text-[11px] text-[#786D5E]">
            Grounded in historical material culture studies & museum codices
          </span>
          <button
            onClick={onClose}
            className="rounded-lg border border-[#44382B] bg-[#221B14] px-4 py-1.5 text-xs font-semibold text-[#E8DFC8] hover:border-[#B8860B] transition"
          >
            Close Kit
          </button>
        </div>

      </div>
    </div>
  );
};
