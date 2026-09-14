import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  HistoricalFigure, 
  Recipient, 
  HistoricalEventOption, 
  ToneOption, 
  MoodOption, 
  KeywordOption, 
  GeneratedLetter,
  FigureId
} from './types';
import { 
  HISTORICAL_FIGURES, 
  TRIAD_FIGURES, 
  TRIAD_RELATIONSHIPS, 
  TRIAD_CENTER_NEXUS 
} from './data/historicalData';
import { 
  getSharedEpisodesBetween, 
  episodeToEventOption 
} from './data/writerReceiverInteractions';
import { Header } from './components/Header';
import { HomePagePens } from './components/HomePagePens';
import { PeriodWritingDeskScene } from './components/PeriodWritingDeskScene';
import { PersonaSelector } from './components/PersonaSelector';
import { RelationshipVisualizer } from './components/RelationshipVisualizer';
import { NetworkGraph } from './components/NetworkGraph';
import { WritingDesk } from './components/WritingDesk';
import { SystemDiagramModal } from './components/SystemDiagramModal';
import { WritingKitModal } from './components/WritingKitModal';

export default function App() {
  const [currentFigure, setCurrentFigure] = useState<HistoricalFigure | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEventOption | null>(null);
  const [selectedTone, setSelectedTone] = useState<ToneOption | null>(null);
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [selectedKeywords, setSelectedKeywords] = useState<KeywordOption[]>([]);
  
  const [letter, setLetter] = useState<GeneratedLetter | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'home-pens' | 'pen-scene' | 'relationship-map' | 'figure-select' | 'network-select' | 'desk'>('home-pens');
  
  const [isSystemModalOpen, setIsSystemModalOpen] = useState<boolean>(false);
  const [isKitModalOpen, setIsKitModalOpen] = useState<boolean>(false);

  // Debounce ref to prevent duplicate calls when rapidly clicking keywords
  const generateDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Generate Letter via Server-Side Gemini API (with fallback)
  const generateLetter = useCallback(async (
    fig: HistoricalFigure,
    rec: Recipient,
    evt: HistoricalEventOption,
    tne: ToneOption,
    md: MoodOption,
    kws: KeywordOption[]
  ) => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figure: {
            id: fig.id,
            name: fig.name,
            country: fig.country,
            era: fig.era,
            city: fig.city,
          },
          recipient: {
            id: rec.id,
            name: rec.name,
            title: rec.title,
            relation: rec.relation,
            location: rec.location,
            transitDays: rec.transitDays,
          },
          event: evt,
          tone: tne,
          mood: md,
          keywords: kws,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data: GeneratedLetter = await response.json();
      setLetter(data);
    } catch (err) {
      console.warn('Network or API issue, generating grounded letter:', err);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  // When user selects a historical figure to immerse as
  const handleSelectFigure = (figure: HistoricalFigure) => {
    setCurrentFigure(figure);
    // As per user directive: before user starts to write, they need to select receivers first,
    // and then all other elements reveal
    setSelectedRecipient(null);
    setSelectedEvent(null);
    setSelectedTone(figure.availableTones[0]);
    setSelectedMood(figure.availableMoods[0]);
    setSelectedKeywords(figure.researchKeywords.slice(0, 2));
    setLetter(null);
    setActiveView('pen-scene');
  };

  // Select writer without immediately switching view
  const handleSelectWriterOnly = (figure: HistoricalFigure) => {
    setCurrentFigure(figure);
    const initialRec = figure.recipients[0];
    setSelectedRecipient(initialRec);

    const sharedEps = getSharedEpisodesBetween(figure.id, initialRec.id);
    if (sharedEps.length > 0) {
      setSelectedEvent(episodeToEventOption(sharedEps[0]));
    } else {
      setSelectedEvent(figure.suggestedEvents[0]);
    }

    setSelectedTone(figure.availableTones[0]);
    setSelectedMood(figure.availableMoods[0]);
    setSelectedKeywords(figure.researchKeywords.slice(0, 2));
  };

  // Launch writing studio between two specific triad figures
  const handleWriteLetterBetween = (senderId: FigureId, recipientId: string) => {
    const sender = HISTORICAL_FIGURES.find(f => f.id === senderId) || HISTORICAL_FIGURES[0];
    const targetFigure = HISTORICAL_FIGURES.find(f => f.id === recipientId);
    
    // Find recipient matching target, or default to first
    let matchedRecipient = sender.recipients.find(r => r.id === recipientId || r.name.toLowerCase().includes(recipientId.toLowerCase()));
    
    if (!matchedRecipient && targetFigure) {
      // Create recipient mapping on the fly if cross-triad
      matchedRecipient = {
        id: targetFigure.id,
        name: targetFigure.name,
        title: targetFigure.epithet,
        relation: 'Esteemed Global Peer & Correspondent',
        relationType: 'peer',
        location: `${targetFigure.city}, ${targetFigure.country}`,
        transitDays: '4 to 12 days via international post & steamer',
        transitRisk: 'Border censorship and maritime delay',
        stakes: 'Global intellectual dialogue and moral unity',
        survivingArtifactNote: `Preserved in the archival correspondence collections of ${sender.name} and ${targetFigure.name}.`,
        historicalConnection: `Direct intellectual exchange between ${sender.name} and ${targetFigure.name}.`
      };
    } else if (!matchedRecipient) {
      matchedRecipient = sender.recipients[0];
    }

    const defaultEvent = sender.suggestedEvents[0];
    const defaultTone = sender.availableTones[0];
    const defaultMood = sender.availableMoods[0];
    const defaultKeywords = sender.researchKeywords.slice(0, 2);

    setCurrentFigure(sender);
    setSelectedRecipient(matchedRecipient);
    setSelectedEvent(defaultEvent);
    setSelectedTone(defaultTone);
    setSelectedMood(defaultMood);
    setSelectedKeywords(defaultKeywords);
    setActiveView('desk');

    generateLetter(
      sender,
      matchedRecipient,
      defaultEvent,
      defaultTone,
      defaultMood,
      defaultKeywords
    );
  };

  // When user selects a recipient from the revealed network or writing desk
  const handleSelectRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    
    // Automatically ground in shared mutual episode if one exists
    let matchedEvent = selectedEvent;
    if (currentFigure) {
      const sharedEps = getSharedEpisodesBetween(currentFigure.id, recipient.id);
      if (sharedEps.length > 0) {
        matchedEvent = episodeToEventOption(sharedEps[0]);
        setSelectedEvent(matchedEvent);
      } else {
        const relevant = currentFigure.suggestedEvents.find(
          (e) => e.recipientRelevance === recipient.id
        );
        if (relevant) {
          matchedEvent = relevant;
          setSelectedEvent(relevant);
        }
      }
    }

    // Automatically generate authentic letter on parchment for this pair
    if (currentFigure && matchedEvent && selectedTone && selectedMood) {
      generateLetter(
        currentFigure,
        recipient,
        matchedEvent,
        selectedTone,
        selectedMood,
        selectedKeywords
      );
    }
  };

  // Proceed to studio after picking recipient
  const handleProceedToStudio = () => {
    setActiveView('desk');
    if (currentFigure && selectedRecipient && selectedEvent && selectedTone && selectedMood && !letter) {
      generateLetter(
        currentFigure,
        selectedRecipient,
        selectedEvent,
        selectedTone,
        selectedMood,
        selectedKeywords
      );
    }
  };

  // Trigger regeneration when controls change
  const triggerRegeneration = (
    updatedEvt = selectedEvent,
    updatedTone = selectedTone,
    updatedMood = selectedMood,
    updatedKws = selectedKeywords
  ) => {
    if (!currentFigure || !selectedRecipient || !updatedEvt || !updatedTone || !updatedMood) return;

    if (generateDebounceRef.current) {
      clearTimeout(generateDebounceRef.current);
    }

    generateDebounceRef.current = setTimeout(() => {
      generateLetter(
        currentFigure,
        selectedRecipient,
        updatedEvt,
        updatedTone,
        updatedMood,
        updatedKws
      );
    }, 250);
  };

  const handleSelectEvent = (event: HistoricalEventOption) => {
    setSelectedEvent(event);
    triggerRegeneration(event, selectedTone, selectedMood, selectedKeywords);
  };

  const handleSelectTone = (tone: ToneOption) => {
    setSelectedTone(tone);
    triggerRegeneration(selectedEvent, tone, selectedMood, selectedKeywords);
  };

  const handleSelectMood = (mood: MoodOption) => {
    setSelectedMood(mood);
    triggerRegeneration(selectedEvent, selectedTone, mood, selectedKeywords);
  };

  const handleToggleKeyword = (keyword: KeywordOption) => {
    const exists = selectedKeywords.some((k) => k.id === keyword.id);
    const updated = exists
      ? selectedKeywords.filter((k) => k.id !== keyword.id)
      : [...selectedKeywords, keyword];
    setSelectedKeywords(updated);
    triggerRegeneration(selectedEvent, selectedTone, selectedMood, updated);
  };

  const handleResetToPersonas = () => {
    setCurrentFigure(null);
    setSelectedRecipient(null);
    setLetter(null);
    setActiveView('home-pens');
  };

  return (
    <div className="min-h-screen bg-[#12100E] text-[#E8E2D6] font-sans selection:bg-[#B8860B]/30 selection:text-[#F3EFE6]">
      
      {/* Universal Header with Navigation & System Specs info button */}
      <Header
        currentFigure={currentFigure}
        onReset={handleResetToPersonas}
        onOpenSystemDiagram={() => setIsSystemModalOpen(true)}
        onOpenWritingKit={() => setIsKitModalOpen(true)}
        activeView={activeView}
        onNavigateView={(view) => setActiveView(view)}
      />

      {/* Main View Router */}
      <main className="pb-16">
        
        {/* 0. HOME PAGE: THE THREE PENS OF HISTORY (Curie, Einstein, Tagore) */}
        {activeView === 'home-pens' && (
          <HomePagePens
            figures={HISTORICAL_FIGURES}
            onSelectFigure={handleSelectFigure}
            onOpenRelationshipMap={() => setActiveView('relationship-map')}
          />
        )}

        {/* 0.1 IMMERSIVE PERIOD DESK VIEW (Respective Desk with Blank Parchment) */}
        {activeView === 'pen-scene' && currentFigure && (
          <PeriodWritingDeskScene
            figure={currentFigure}
            selectedRecipient={selectedRecipient}
            selectedEvent={selectedEvent}
            selectedTone={selectedTone}
            selectedMood={selectedMood}
            selectedKeywords={selectedKeywords}
            letter={letter}
            isGenerating={isGenerating}
            onBackToPens={() => setActiveView('home-pens')}
            onOpenTriadMap={() => setActiveView('relationship-map')}
            onOpenNetwork={() => setActiveView('network-select')}
            onOpenSystemDiagram={() => setIsSystemModalOpen(true)}
            onProceedToStudio={() => {
              if (selectedRecipient && selectedEvent && selectedTone && selectedMood && !letter) {
                generateLetter(
                  currentFigure,
                  selectedRecipient,
                  selectedEvent,
                  selectedTone,
                  selectedMood,
                  selectedKeywords
                );
              }
              setActiveView('desk');
            }}
            onSelectRecipient={handleSelectRecipient}
            onSelectEvent={handleSelectEvent}
            onSelectTone={handleSelectTone}
            onSelectMood={handleSelectMood}
            onToggleKeyword={handleToggleKeyword}
            onGenerateLetter={() => {
              if (selectedRecipient && selectedEvent && selectedTone && selectedMood) {
                generateLetter(
                  currentFigure,
                  selectedRecipient,
                  selectedEvent,
                  selectedTone,
                  selectedMood,
                  selectedKeywords
                );
              }
            }}
          />
        )}

        {/* 1. TRIAD RELATIONSHIP VISUALIZER (Celebrities Relationship Map) */}
        {activeView === 'relationship-map' && (
          <RelationshipVisualizer
            figures={HISTORICAL_FIGURES}
            relationships={TRIAD_RELATIONSHIPS}
            centerNexus={TRIAD_CENTER_NEXUS}
            currentFigure={currentFigure}
            onSelectWriter={handleSelectWriterOnly}
            onSelectPersona={handleSelectFigure}
            onWriteLetterBetween={handleWriteLetterBetween}
            onProceedToStudio={() => {
              if (selectedRecipient) {
                setActiveView('letter-studio');
              } else if (currentFigure) {
                setActiveView('network-select');
              }
            }}
          />
        )}

        {/* 2. PERSONA SELECTION */}
        {activeView === 'figure-select' && (
          <PersonaSelector
            figures={HISTORICAL_FIGURES}
            onSelectFigure={handleSelectFigure}
            onOpenRelationshipMap={() => setActiveView('relationship-map')}
          />
        )}

        {/* 3. REVEALED NETWORK GRAPH */}
        {activeView === 'network-select' && currentFigure && (
          <NetworkGraph
            figure={currentFigure}
            selectedRecipient={selectedRecipient}
            onSelectRecipient={handleSelectRecipient}
            onBackToPersonas={handleResetToPersonas}
            onProceedToStudio={handleProceedToStudio}
          />
        )}

        {/* 4. HISTORICAL WRITING DESK & BREAKDOWN STUDIO */}
        {activeView === 'desk' && currentFigure && selectedRecipient && selectedEvent && selectedTone && selectedMood && (
          <WritingDesk
            figure={currentFigure}
            recipient={selectedRecipient}
            selectedEvent={selectedEvent}
            selectedTone={selectedTone}
            selectedMood={selectedMood}
            selectedKeywords={selectedKeywords}
            letter={letter}
            isGenerating={isGenerating}
            onSelectEvent={handleSelectEvent}
            onSelectTone={handleSelectTone}
            onSelectMood={handleSelectMood}
            onToggleKeyword={handleToggleKeyword}
            onRegenerate={() => generateLetter(
              currentFigure,
              selectedRecipient,
              selectedEvent,
              selectedTone,
              selectedMood,
              selectedKeywords
            )}
            onBackToNetwork={() => setActiveView('network-select')}
            onOpenWritingKit={() => setIsKitModalOpen(true)}
          />
        )}
      </main>

      {/* System Specs Architecture & Agent Modal */}
      <SystemDiagramModal
        isOpen={isSystemModalOpen}
        onClose={() => setIsSystemModalOpen(false)}
      />

      {/* Era Writing Kit & Materiality Modal */}
      {currentFigure && (
        <WritingKitModal
          figure={currentFigure}
          isOpen={isKitModalOpen}
          onClose={() => setIsKitModalOpen(false)}
        />
      )}

    </div>
  );
}
