export type FigureId = 'einstein' | 'curie' | 'tagore' | 'leonardo' | 'franklin';

export type RelationType = 'patron' | 'peer' | 'kinship' | 'political' | 'disciple';

export type RelationshipDimension = 'all' | 'interpersonal' | 'intellectual' | 'ethical' | 'institutional';

export interface HistoricalQuoteExcerpt {
  speaker: string;
  recipientOrOccasion: string;
  year: string;
  quote: string;
  source: string;
}

export interface SharedMilestone {
  year: string;
  title: string;
  description: string;
  location?: string;
}

export interface TriadRelationship {
  id: string;
  sourceId: FigureId;
  targetId: FigureId;
  title: string;
  epithet: string;
  summary: string;
  dimensions: {
    interpersonal: string;
    intellectual: string;
    ethical: string;
    institutional: string;
  };
  primaryExcerpts: HistoricalQuoteExcerpt[];
  sharedEvents: SharedMilestone[];
  visualBadge: string;
  color: string;
}

export interface TriadCenterNexus {
  title: string;
  subtitle: string;
  description: string;
  sharedPillars: {
    title: string;
    detail: string;
  }[];
  historicalImpact: string;
}

export interface Recipient {
  id: string;
  name: string;
  title: string;
  relation: string;
  relationType: RelationType;
  location: string;
  transitDays: string;
  transitRisk: string;
  stakes: string;
  survivingArtifactNote: string;
  historicalConnection: string;
}

export interface WritingKitItem {
  name: string;
  material: string;
  description: string;
  tactileDetail: string;
  modernEquivalent: string;
}

export interface WritingKit {
  eraName: string;
  substrate: WritingKitItem;
  instrument: WritingKitItem;
  ink: WritingKitItem;
  dryingAgent: WritingKitItem;
  sealAndClosure: WritingKitItem;
  transitCourier: {
    method: string;
    speedEstimate: string;
    risks: string;
    modernDiff: string;
  };
}

export interface HistoricalEventOption {
  id: string;
  title: string;
  year: string;
  context: string;
  historicalEvidence: string;
  recipientRelevance?: string;
  historicalQuotes?: string;
}

export interface ToneOption {
  id: string;
  label: string;
  description: string;
  eraEtiquetteRule: string;
}

export interface MoodOption {
  id: string;
  label: string;
  emotionalState: string;
  subtext: string;
}

export interface KeywordOption {
  id: string;
  label: string;
  category: 'science' | 'politics' | 'personal' | 'philosophy' | 'art';
  historicalFact: string;
}

export interface HistoricalFigure {
  id: FigureId;
  name: string;
  epithet: string;
  country: string;
  countryAdjective: string;
  era: string;
  years: string;
  city: string;
  historicalBio: string;
  mindsetQuote: string;
  handwritingStyle: string;
  culturalContext: {
    socialOrder: string;
    communicationMedium: string;
    scientificParadigm: string;
    dailyPace: string;
  };
  writingKit: WritingKit;
  recipients: Recipient[];
  suggestedEvents: HistoricalEventOption[];
  availableTones: ToneOption[];
  availableMoods: MoodOption[];
  researchKeywords: KeywordOption[];
}

export interface GeneratedLetter {
  salutation: string;
  dateAndLocation: string;
  bodyParagraphs: string[];
  valediction: string;
  postScriptum?: string;
  mirroredItalianScript?: string;
  modernBreakdown: {
    temporalSpeedComparison: string;
    culturalHierarchiesEtiquette: string;
    materialCostAndPhysicality: string;
    historicalEvidenceCitations: string[];
  };
  generationSource: 'gemini-agent' | 'historical-archive-engine';
}

export interface SystemComponentInfo {
  id: string;
  title: string;
  type: 'client' | 'agent' | 'knowledge' | 'output';
  description: string;
  details: string[];
}
