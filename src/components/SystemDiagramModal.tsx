import React, { useState } from 'react';
import { X, Cpu, Server, Sparkles, Database, Layers, ArrowDown, ArrowRight, ShieldCheck, CheckCircle2, Feather, Compass } from 'lucide-react';
import { SYSTEM_ARCHITECTURE_INFO } from '../data/historicalData';

interface SystemDiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemDiagramModal: React.FC<SystemDiagramModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [selectedNodeId, setSelectedNodeId] = useState<string>('gemini-agent');

  const { nodes, appName, modelUsed } = SYSTEM_ARCHITECTURE_INFO;
  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[3];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#B8860B]/50 bg-[#16130F] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#352D23] bg-[#1E1913] px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#B8860B]/40 bg-[#292218] text-[#D4AF37]">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-cinzel text-lg font-bold text-[#F5F1E8]">
                System Architecture & Agent Specification
              </h2>
              <p className="text-xs text-[#9E9281]">
                {appName} • Powered by <span className="font-semibold text-[#D4AF37]">{modelUsed}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#9E9281] transition hover:bg-[#2C231B] hover:text-[#F5F1E8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Diagram Canvas + Inspector */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          
          {/* Visual Flow Diagram */}
          <div className="mb-6 rounded-2xl border border-[#3A3125] bg-[#12100D] p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                Interactive Pipeline Diagram
              </span>
              <span className="text-[11px] text-[#7A6F5F]">
                Click any pipeline stage to inspect technical logic
              </span>
            </div>

            {/* Pipeline Steps in Visual Flow */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
              {nodes.map((node, index) => {
                const isSelected = selectedNodeId === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-[#D4AF37] bg-[#2A2218] shadow-lg shadow-[#B8860B]/20 ring-1 ring-[#D4AF37]'
                        : 'border-[#332B21] bg-[#181511] hover:border-[#B8860B]/50 hover:bg-[#1E1914]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8A7E6E]">
                      <span>Stage 0{index + 1}</span>
                      <span className="rounded bg-[#251E16] px-1.5 py-0.5 text-[9px] text-[#C49B45]">
                        {node.type}
                      </span>
                    </div>

                    <h4 className="mt-2 font-cinzel text-sm font-bold text-[#F3EFE6] line-clamp-2">
                      {node.title.replace(/^\d+\.\s*/, '')}
                    </h4>

                    <p className="mt-1.5 text-[11px] text-[#9E9383] line-clamp-3">
                      {node.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#292219] text-[10px]">
                      <span className={isSelected ? 'text-[#D4AF37] font-semibold' : 'text-[#6A6052]'}>
                        {isSelected ? 'Active Spec' : 'Inspect'}
                      </span>
                      {index < 4 && (
                        <ArrowRight className="h-3 w-3 text-[#5A5144] hidden sm:block" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Agent Core Highlight Banner */}
            <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border border-[#B8860B]/40 bg-gradient-to-r from-[#2B2217] via-[#211A12] to-[#1A1510] p-4 sm:flex-row sm:items-center">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3C301F] text-[#D4AF37]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E8C568]">
                    Server-Side AI Agent Orchestration
                  </h4>
                  <p className="text-[11px] text-[#B5A896]">
                    Built with <code className="text-[#D4AF37]">@google/genai</code> TypeScript SDK on Express backend via <code className="text-[#D4AF37]">gemini-3.8-flash</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  Telemetry: aistudio-build
                </span>
              </div>
            </div>
          </div>

          {/* Selected Stage Detail Panel */}
          <div className="rounded-2xl border border-[#3A3225] bg-[#1A1612] p-6">
            <div className="flex items-center justify-between border-b border-[#2F271D] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B8860B]">
                  Architectural Component Details
                </span>
                <h3 className="font-cinzel text-xl font-bold text-[#F5F2E9]">
                  {activeNode.title}
                </h3>
              </div>
              <span className="rounded-full border border-[#44382B] bg-[#221C15] px-3 py-1 text-xs font-medium text-[#D4AF37]">
                Type: {activeNode.type.toUpperCase()}
              </span>
            </div>

            <p className="mt-3 text-sm text-[#BFB4A3] leading-relaxed">
              {activeNode.description}
            </p>

            <div className="mt-4">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#9E9383] mb-2">
                Core Capabilities & Grounding Mechanisms:
              </h5>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {activeNode.details.map((detail, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start space-x-2.5 rounded-lg border border-[#2D241A] bg-[#14110E] p-3 text-xs text-[#D8CFBF]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#B8860B] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* If the Agent stage is selected, show system prompt details */}
            {selectedNodeId === 'gemini-agent' && (
              <div className="mt-5 rounded-xl border border-[#382E20] bg-[#13100C] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C49B45] block mb-2">
                  Agent Conditioning & Prompt Constraints:
                </span>
                <div className="space-y-1.5 text-xs text-[#A89D8B] font-mono leading-relaxed">
                  <p>• Zero modern vocabulary in manuscript body (e.g. no "industrial", "electricity", "computer", "antibiotics").</p>
                  <p>• Historical salutations strictly adhered to (e.g. Leonardo: "Illustrissimo et Eccellentissimo", Franklin: "Dear Sir, and much esteemed Friend").</p>
                  <p>• Primary source citations referencing actual museum archives (BnF Paris, Ambrosiana Milan, Yale Franklin Papers).</p>
                  <p>• Dual JSON schema output guaranteeing contemporaneous manuscript alongside contemporary educational breakdown.</p>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#30271E] bg-[#17130F] px-6 py-3 text-xs text-[#8A7E6E]">
          <span>Designed strictly according to user epistolary requirements</span>
          <button
            onClick={onClose}
            className="rounded-lg border border-[#44382B] bg-[#221B14] px-4 py-1.5 font-semibold text-[#E8DFC8] hover:border-[#B8860B] transition"
          >
            Close System Specs
          </button>
        </div>

      </div>
    </div>
  );
};
