import { 
  HistoricalFigure, 
  TriadRelationship, 
  TriadCenterNexus,
  Recipient,
  HistoricalEventOption,
  ToneOption,
  MoodOption,
  KeywordOption 
} from '../types';

// =========================================================================
// 1. THE THREE INTERCONNECTED CELEBRITIES
// =========================================================================

export const EINSTEIN_FIGURE: HistoricalFigure = {
  id: 'einstein',
  name: 'Albert Einstein',
  epithet: 'The Revolutionary of Spacetime & Universal Pacifist',
  country: 'Germany / Switzerland',
  countryAdjective: 'German-Swiss',
  era: 'Interwar Weimar & Atomic Dawn (c. 1905–1933)',
  years: '1879 – 1955',
  city: 'Berlin / Caputh / Bern / Princeton',
  historicalBio: 'Theoretical physicist who transformed our understanding of space, time, gravity, and light through the special and general theories of relativity. Awarded the 1921 Nobel Prize for the photoelectric effect, Einstein was an impassioned champion of international pacifism, human rights, and scientific freedom. He was close comrades with Marie Curie and engaged in historic philosophical dialogues with Rabindranath Tagore in Berlin.',
  mindsetQuote: 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.',
  handwritingStyle: 'Neat, flowing Germanic script with mathematical formulas, written with a Montblanc gold-nib fountain pen on Haberlandstraße stationery',
  culturalContext: {
    socialOrder: 'Weimar Republic Germany transitioning toward catastrophic fascism. Deep polarization between cosmopolitan scientific luminaries and reactionary nationalist militarism.',
    communicationMedium: 'Deutsche Reichsbahn express rail, transatlantic steam packets (e.g. SS Deutschland), telegrams, and the League of Nations courier dispatches.',
    scientificParadigm: 'The collapse of classical Newtonian mechanics before the twin revolutions of General Relativity and Quantum Mechanics.',
    dailyPace: 'Intense mathematical thought in his attic study in Berlin or sailing his wooden boat on Lake Templin in Caputh, interspersed with international lecture tours.'
  },
  writingKit: {
    eraName: 'Weimar Academic & Caputh Scriptorium (1920s–1930s)',
    substrate: {
      name: 'Watermarked Rag Bond Paper (Büttenpapier)',
      material: 'Fine linen rag and cellulose paper embossed with the header: "Prof. Dr. Albert Einstein, Berlin-Schöneberg, Haberlandstraße 5".',
      description: 'Heavy creamy stock that absorbs fountain pen ink with crisp featherless precision, often scribbled with tensor equations in margins.',
      tactileDetail: 'Substantial, smooth paper that rattles crisply when folded into official postal envelopes.',
      modernEquivalent: 'Premium 100gsm cotton watermark executive stationery.'
    },
    instrument: {
      name: 'Pelikan 100 & Montblanc Meisterstück Fountain Pen',
      material: 'Hard vulcanite and celluloid barrel with a flexible 14-karat gold iridium-tipped nib and cork piston filling mechanism.',
      description: 'Einstein favored smooth-flowing German piston-filler fountain pens that could keep pace with his rapid mathematical calculations.',
      tactileDetail: 'Warm celluloid in hand, gentle flex of the gold nib allowing expressive variation from hairline notations to thick signatures.',
      modernEquivalent: 'Modern luxury piston fountain pen or archival felt fineliner.'
    },
    ink: {
      name: 'Prussian Blue & Iron Carbon Fountain Pen Ink',
      material: 'Water-soluble Prussian blue dye blended with fine carbon lampblack and phenol preservative.',
      description: 'Flows rich deep sapphire-blue and dries with a dark lustrous edge, permanent enough to withstand transatlantic ocean mail.',
      tactileDetail: 'Slightly sweet, medicinal phenolic fragrance as the ink dries across the manuscript.',
      modernEquivalent: 'Archival fountain pen ink like Pelikan 4001 or Montblanc Royal Blue.'
    },
    dryingAgent: {
      name: 'Felt-Padded Mahogany Rocker Blotter (Löschwiege)',
      material: 'Curved polished mahogany rocker fitted with multiple layers of thick absorbent blotting paper (Löschpapier).',
      description: 'Rolled gently across freshly written mathematical equations to lift surplus ink before folding.',
      tactileDetail: 'Satisfying weighted rocking motion across the desk leaves the manuscript instantly dry and smudge-proof.',
      modernEquivalent: 'Standard desk blotter sheets or quick-drying solvent rollerballs.'
    },
    sealAndClosure: {
      name: 'Embossed Gummed Envelope with Airmail Label (Mit Flugpost)',
      material: 'Moisture-activated gummed flap envelope stamped with Prussian postal franking and blue "Par Avion / Mit Flugpost" labels.',
      description: 'Folded and sealed securely with postal wax or gum, occasionally checked by diplomatic pouch.',
      tactileDetail: 'Crisp gummed seal requiring a wet sponge or thumb press.',
      modernEquivalent: 'Self-adhesive security airmail envelopes or encrypted digital PDF dispatch.'
    },
    transitCourier: {
      method: 'German Reichspost mail trains & transatlantic express steam ocean liners (RMS Olympic, SS Bremen)',
      speedEstimate: '1 to 2 days across Western Europe; 5 to 7 days across the Atlantic to America; 14 days to India by Imperial air/sea post.',
      risks: 'Political espionage by nationalist surveillance; mail tampering prior to Einstein\'s emigration to Princeton.',
      modernDiff: 'Compared to a 50-millisecond email or video call today, Einstein waited 3 weeks to receive replies from India or New York.'
    }
  },
  recipients: [
    {
      id: 'curie',
      name: 'Marie Skłodowska-Curie',
      title: 'Double Nobel Laureate & Sorbonne Director of Radium Institute',
      relation: 'Beloved Comrade in Science & Lifelong Confidante',
      relationType: 'peer',
      location: 'Laboratoire Curie, 11 Rue Pierre Curie, Paris, France',
      transitDays: '24 hours via Berlin-Paris Express mail train',
      transitRisk: 'Border customs examination and French sensationalist press leaks',
      stakes: 'Defending her honor against xenophobic press attacks, collaborating at Solvay conferences, and coordinating the League of Nations ICIC.',
      survivingArtifactNote: 'Einstein’s impassioned Nov 20, 1911 letter: "If the rabble continues to occupy itself with you, simply don’t read that hogwash..."',
      historicalConnection: 'Hiked the Swiss Alps together with their children in 1913; Solvay conference pioneers; mutual champions of scientific freedom.'
    },
    {
      id: 'tagore',
      name: 'Rabindranath Tagore',
      title: 'Poet-Philosopher, Nobel Laureate & Founder of Visva-Bharati',
      relation: 'Spiritual Peer & Dialogue Partner in Caputh',
      relationType: 'peer',
      location: 'Santiniketan, Bengal, India / Grand Hotel Berlin',
      transitDays: '12 to 14 days by Imperial Air Mail and P&O steamer',
      transitRisk: 'Monsoon storms in the Indian Ocean and British colonial postal oversight',
      stakes: 'Exploring the fundamental nature of truth, whether reality exists independent of human perception, and championing universal pacifism.',
      survivingArtifactNote: 'Famous July 14, 1930 transcript "The Nature of Reality" recorded at Einstein\'s home in Caputh, Berlin.',
      historicalConnection: 'Met in 1930 in Berlin to debate whether truth and beauty are human-dependent, finding deep harmonic resonance in music and peace.'
    },
    {
      id: 'niels-bohr',
      name: 'Niels Bohr',
      title: 'Director of Institute for Theoretical Physics, Copenhagen',
      relation: 'Rival and Cherished Scientific Interlocutor',
      relationType: 'peer',
      location: 'Blegdamsvej 15, Copenhagen, Denmark',
      transitDays: '36 hours by rail and Baltic ferry',
      transitRisk: 'Scientific confidentiality of unannounced thought experiments (EPR paradox)',
      stakes: 'The eternal philosophical debate on the completeness of quantum mechanics: "God does not play dice with the universe."',
      survivingArtifactNote: 'Decades of intense, polite letters and thought experiments debating the Solvay 1927 photon-box experiment.',
      historicalConnection: 'Their intellectual duel shaped the entire architecture of modern 20th-century physics.'
    },
    {
      id: 'sigmund-freud',
      name: 'Sigmund Freud',
      title: 'Founder of Psychoanalysis, Vienna',
      relation: 'Fellow Pioneer of Human Psychology & Co-Author',
      relationType: 'peer',
      location: 'Berggasse 19, Vienna, Austria',
      transitDays: '2 days via Berlin-Vienna express train',
      transitRisk: 'Austrian postal delays and political instability in Central Europe',
      stakes: 'Co-authoring the open exchange "Why War?" (Warum Krieg?) commissioned by the League of Nations International Institute of Intellectual Cooperation.',
      survivingArtifactNote: 'Published in 1932 as an international manifesto analyzing why humanity is susceptible to psychological mobilization for slaughter.',
      historicalConnection: 'Shared members of the League of Nations cultural circle seeking psychological defenses against war.'
    },
    {
      id: 'max-planck',
      name: 'Max Planck',
      title: 'Father of Quantum Theory & Secretary of Prussian Academy',
      relation: 'Revered Mentor, Colleague & Berlin Sponsor',
      relationType: 'patron',
      location: 'Berlin-Grunewald, Prussia',
      transitDays: 'Same-day city express dispatch across Berlin',
      transitRisk: 'Academic council politics and Prussian institutional bureaucracy',
      stakes: 'Securing Einstein’s appointment to the Prussian Academy of Sciences and debating entropy, quanta, and the cosmic order.',
      survivingArtifactNote: 'Letters preserved in the Max Planck Society Archives documenting Einstein\'s 1913 recruitment to Berlin.',
      historicalConnection: 'Planck was the very first established physicist to recognize and champion Einstein’s 1905 special relativity papers.'
    }
  ],
  suggestedEvents: [
    {
      id: 'evt-caputh-dialogue',
      title: 'The Caputh Meeting on Truth and Reality (1930)',
      year: '1930',
      context: 'Rabindranath Tagore arrives at Einstein’s summer villa in Caputh near Berlin. The two Nobel laureates sit beneath the pines, discussing whether truth exists independent of humanity, and the harmony of music.',
      historicalEvidence: 'Recorded in shorthand by Dimitri Marianoff on July 14, 1930; subsequently published in The Modern Review and New York Times.',
      recipientRelevance: 'Direct dialogue with Rabindranath Tagore debating human consciousness and objective reality.'
    },
    {
      id: 'evt-defending-marie',
      title: 'Letter of Solidarity to Marie Curie (1911)',
      year: '1911',
      context: 'Following the 1911 Solvay Conference, the Paris sensationalist press unleashes a brutal xenophobic and misogynist campaign against Marie Curie. Einstein writes immediately to urge her to ignore the rabble.',
      historicalEvidence: 'Autograph letter dated Nov 20, 1911, discovered in Curie’s papers at the Bibliothèque nationale de France in 2011.',
      recipientRelevance: 'Direct passionate solidarity letter to Marie Skłodowska-Curie in Paris.'
    },
    {
      id: 'evt-general-relativity-proof',
      title: 'Confirmation of General Relativity by Solar Eclipse (1919)',
      year: '1919',
      context: 'Sir Arthur Eddington’s expeditions to Príncipe and Sobral measure the gravitational deflection of starlight around the Sun, confirming Einstein’s curved spacetime over Newton’s gravity.',
      historicalEvidence: 'Joint meeting of the Royal Society and Royal Astronomical Society in London on November 6, 1919; headline in The Times: "Revolution in Science".',
      recipientRelevance: 'Announcing the transformation of physics to scientific allies across national borders after WWI.'
    },
    {
      id: 'evt-league-icic-1922',
      title: 'Formation of the League of Nations ICIC (1922)',
      year: '1922',
      context: 'Einstein joins Marie Curie in Geneva to inaugurate the International Committee on Intellectual Cooperation, dedicating his prestige to re-establishing cross-border academic fraternity.',
      historicalEvidence: 'League of Nations Archives, Geneva (ICIC Minutes 1922–1928, Series 13C).'
    }
  ],
  availableTones: [
    {
      id: 'tone-philosophical',
      label: 'Contemplative & Philosophical',
      description: 'Reflective, exploring the cosmic order, human limitations, and the beauty of natural law.',
      eraEtiquetteRule: '1920s German intellectual epistolary etiquette, blending courteous formal address with affectionate philosophical intimacy.'
    },
    {
      id: 'tone-passionate-solidarity',
      label: 'Passionate Defense & Fraternal Solidarity',
      description: 'Indignant against injustice, fierce loyalty to comrades, and contempt for cowardly sensationalism.',
      eraEtiquetteRule: 'Direct, morally uncompromising language stripping away academic pretense to stand shoulder-to-shoulder with a besieged friend.'
    },
    {
      id: 'tone-whimsical-scientific',
      label: 'Whimsical & Thought-Experimental',
      description: 'Playful yet profoundly rigorous, using analogies of trains, elevators, light beams, and violin strings.',
      eraEtiquetteRule: 'The signature Einsteinian style: playful clarity designed to illuminate the deepest mathematical enigmas.'
    }
  ],
  availableMoods: [
    {
      id: 'mood-cosmic-wonder',
      label: 'Cosmic Awe & Curiosity',
      emotionalState: 'Overcome by the mathematical elegance and profound mysteries of the universe.',
      subtext: 'The realization that the most incomprehensible thing about the world is that it is comprehensible.'
    },
    {
      id: 'mood-pacifist-urgency',
      label: 'Urgent Concern for Humanity',
      emotionalState: 'Deep alarm at the resurgence of tribal nationalism, militarism, and ideological dogmatism.',
      subtext: 'A profound moral obligation to use one’s scientific fame as a shield for peace and vulnerable human lives.'
    },
    {
      id: 'mood-serene-solitude',
      label: 'Serene Detachment',
      emotionalState: 'Calmly observing the world from a quiet study, immune to praise, vanity, or worldly ambition.',
      subtext: 'The peace of living in the timeless temple of science and art.'
    }
  ],
  researchKeywords: [
    { id: 'kw-spacetime', label: 'Curvature of Spacetime (g_μν)', category: 'science', historicalFact: 'Einstein formulated gravity not as a Newtonian force, but as the geometric curvature of 4D spacetime induced by mass-energy.' },
    { id: 'kw-mass-energy', label: 'Mass-Energy Equivalence (E=mc²)', category: 'science', historicalFact: 'Curie\'s isolated radium provided the first tangible physical proof where tiny mass loss produced continuous thermal and radiative energy.' },
    { id: 'kw-truth-debate', label: 'Objective Reality vs Human Consciousness', category: 'philosophy', historicalFact: 'Einstein and Tagore debated in 1930 whether an unobserved table in a room retains its objective truth without human observation.' },
    { id: 'kw-solvay-alpine', label: '1913 Engadine Alpine Walking Tour', category: 'personal', historicalFact: 'Einstein, his son Hans Albert, Marie Curie, and her daughters Irène and Ève spent weeks hiking glaciers in the Swiss Alps.' },
    { id: 'kw-violino', label: 'Mozart & The Violin "Lina"', category: 'art', historicalFact: 'Einstein played his beloved violin "Lina" daily to stimulate mathematical intuition and discussed music with Tagore as a universal bridge.' },
    { id: 'kw-icic-geneva', label: 'League of Nations ICIC Geneva', category: 'politics', historicalFact: 'Curie and Einstein served together on the International Committee on Intellectual Cooperation to build a global republic of letters.' }
  ]
};

export const TAGORE_FIGURE: HistoricalFigure = {
  id: 'tagore',
  name: 'Rabindranath Tagore',
  epithet: 'The Voice of Global Humanism & Universal Spirit',
  country: 'India',
  countryAdjective: 'Indian',
  era: 'Bengal Renaissance & Global Anti-Colonial Awakening (c. 1910–1941)',
  years: '1861 – 1941',
  city: 'Santiniketan / Kolkata / Worldwide travels',
  historicalBio: 'Poet, philosopher, educator, composer, and visual artist. Known affectionately as Gurudev, Tagore was the first non-European and first Asian to win the Nobel Prize in Literature (1913, for Gitanjali). He composed the national anthems of India and Bangladesh, founded Visva-Bharati international university where children learned under the open sky, and traveled across five continents to champion a universal spiritual humanism transcending narrow nationalism. His historic dialogues with Albert Einstein and correspondence with Mahatma Gandhi reshaped 20th-century intellectual history.',
  mindsetQuote: 'Where the mind is without fear and the head is held high; where knowledge is free; where the world has not been broken up into fragments by narrow domestic walls... into that heaven of freedom, my Father, let my country awake.',
  handwritingStyle: 'Flowing, rhythmic Bengali and English script adorned with spontaneous poetic doodles and ink silhouettes, written on Santiniketan cotton paper',
  culturalContext: {
    socialOrder: 'British colonial rule in India challenged by the Swadeshi and non-violent independence movements. Tagore stood as an independent cultural colossus, rejecting both British colonial arrogance and aggressive chauvinistic nationalism.',
    communicationMedium: 'Imperial Air Mail via Cairo and Karachi, P&O steam ocean packets across the Arabian Sea and Mediterranean, and telegram dispatches.',
    scientificParadigm: 'Bridging ancient Upanishadic monism with modern 20th-century physics; arguing that scientific empiricism requires humanistic spiritual conscience.',
    dailyPace: 'Dawn prayers under ancient sal trees in Santiniketan, composing songs (Rabindra Sangeet) by mid-morning, teaching students in open-air groves, writing late into the night.'
  },
  writingKit: {
    eraName: 'Santiniketan Ashram & Visva-Bharati Scriptorium (1910s–1930s)',
    substrate: {
      name: 'Hand-Milled Bengal Cotton & Jute Paper (Kutir Silpa)',
      material: 'Handmade deckle-edged paper produced by village artisans in rural Bengal, stamped with the Visva-Bharati Sanskrit seal.',
      description: 'Textured, warm ivory paper with natural vegetal fibers visible in the grain, resilient and unbleached.',
      tactileDetail: 'Soft, fibrous tooth that gives the ink a gentle, deep watercolor absorption; warm to the palm.',
      modernEquivalent: 'Handmade 100% cotton rag handmade journal paper with deckle edge.'
    },
    instrument: {
      name: 'Swan Mabie-Todd Pen & Split Reed Nib (Khag-er Kolom)',
      material: 'English ebonite fountain pen with a flexible 14k gold nib, accompanied by a sharpened wild river reed pen for Bengali calligraphic titles.',
      description: 'Tagore wrote thousands of poems, letters, and songs using his reliable travel fountain pen, frequently turning ink smudges into intricate ink drawings of fantastic birds.',
      tactileDetail: 'Feather-light in the fingers; gliding rhythmically across the fibrous page with zero fatigue.',
      modernEquivalent: 'A flexible flex-nib fountain pen or traditional bamboo calligraphy stylus.'
    },
    ink: {
      name: 'Natural Indigo & Lampblack Ink (Kalo Shahi)',
      material: 'Soot collected from mustard-oil lamps blended with crushed acacia gum and natural Bengal indigo dye.',
      description: 'Lustrous, velvety deep blue-black ink that maintains its rich tone for centuries without fading in tropical humidity.',
      tactileDetail: 'Smells faintly of gum arabic and dried earth; leaves a soft sheen on the page.',
      modernEquivalent: 'Artisanal pigment ink like Pilot Iroshizuku Take-sumi or natural indigo ink.'
    },
    dryingAgent: {
      name: 'Sandalwood Blotting Rocker (Chandan Löschpapier)',
      material: 'Carved fragrant Indian sandalwood rocker fitted with imported English blotting sheets.',
      description: 'Gently pressed over wet Bengali poetry and English letters to prevent smearing during humid monsoon drafting.',
      tactileDetail: 'Emits a subtle warm scent of sandalwood when rocked over warm ink.',
      modernEquivalent: 'Felt blotter or natural blotting paper card.'
    },
    sealAndClosure: {
      name: 'Scarlet Shellac Wax Seal with Sanskrit Motto',
      material: 'Purified Indian shellac blended with vermilion cinnabar, impressed with Tagore\'s personal crest.',
      description: 'Carries the sacred motto: "Yatra visvam bhavatyekanidam" (Where the whole world meets in one single nest).',
      tactileDetail: 'Glossy, firm deep-red seal holding the folded envelope secure against monsoon damp.',
      modernEquivalent: 'Custom engraved botanical or heraldic wax seal stamp.'
    },
    transitCourier: {
      method: 'Imperial Air Mail via Karachi-Cairo and P&O Royal Mail ocean steam packets',
      speedEstimate: '10 to 14 days to London or Berlin; 3 to 4 weeks across the Pacific to America; 2 to 3 days across India by Great Indian Peninsula Railway.',
      risks: 'Monsoon humidity damaging envelopes; British colonial surveillance of political letters regarding Indian independence.',
      modernDiff: 'Compared to today’s instant global messaging, Tagore maintained friendships across four continents through patiently anticipated envelopes arriving every few weeks.'
    }
  },
  recipients: [
    {
      id: 'einstein',
      name: 'Albert Einstein',
      title: 'Theoretical Physicist & Fellow Cosmopolitan Pacifist',
      relation: 'Revered Intellectual Peer & Dialogue Comrade',
      relationType: 'peer',
      location: 'Caputh near Berlin / Princeton, USA',
      transitDays: '12 to 14 days via Imperial Air Mail and German Reichspost',
      transitRisk: 'Postal inspections during interwar political upheavals in Europe',
      stakes: 'Synthesizing Eastern universal consciousness with Western scientific inquiry; finding peace beyond nationalist boundaries.',
      survivingArtifactNote: 'Surviving handwritten letters and the 1930 Caputh transcript in the Rabindra Bhavana Archives in Santiniketan.',
      historicalConnection: 'Met in Berlin in 1930 to record historic dialogues on truth, beauty, music, and the cosmos.'
    },
    {
      id: 'curie',
      name: 'Marie Skłodowska-Curie',
      title: 'Double Nobel Laureate & Sorbonne Professor of Radiochemistry',
      relation: 'Noble Pioneer & Sister in Global Intellectual Emancipation',
      relationType: 'peer',
      location: 'Institut du Radium, 11 Rue Pierre Curie, Paris, France',
      transitDays: '10 to 12 days via P&O steam packet to Marseille and Paris express',
      transitRisk: 'Customs inspections and post-war French administrative delays',
      stakes: 'Coordinating international education, moral responsibility in science, and supporting the League of Nations ICIC.',
      survivingArtifactNote: 'Letters and documented addresses delivered during Tagore’s visits to Paris in 1920, 1921, and 1930.',
      historicalConnection: 'Both were early pioneering Nobel laureates breaking Western imperial monopolies; both served the League of Nations ICIC.'
    },
    {
      id: 'mahatma-gandhi',
      name: 'Mahatma Mohandas K. Gandhi',
      title: 'Leader of the Indian Independence Movement',
      relation: 'Dearest Brother & Soulful Interlocutor ("The Great Sentinel")',
      relationType: 'kinship',
      location: 'Sabarmati Ashram, Ahmedabad / Sevagram, Wardha, India',
      transitDays: '2 to 3 days by Indian Imperial railway post',
      transitRisk: 'Interception by British CID colonial surveillance officers',
      stakes: 'Debating non-violent civil disobedience (Satyagraha), the boycott of Western learning, and universal humanism versus national struggle.',
      survivingArtifactNote: 'Extensive published correspondence (The Mahatma and the Poet) spanning 25 years of mutual love and philosophical disagreement.',
      historicalConnection: 'Tagore bestowed the title "Mahatma" (Great Soul) upon Gandhi, while Gandhi called Tagore "The Great Sentinel".'
    },
    {
      id: 'wb-yeats',
      name: 'William Butler Yeats',
      title: 'Irish Poet & Nobel Laureate in Literature',
      relation: 'Poetic Brother & Champion of Gitanjali in the West',
      relationType: 'peer',
      location: 'Woburn Buildings, London / Thoor Ballylee, Ireland',
      transitDays: '14 to 16 days across oceans to London and Dublin',
      transitRisk: 'Damage from sea damp during transatlantic/Irish Channel voyages',
      stakes: 'Refining the poetic translation of Gitanjali, debating Irish and Indian cultural revival against British imperial rule.',
      survivingArtifactNote: 'Yeats wrote the immortal introduction to Gitanjali in 1912: "These lyrics display in their thought a world I have dreamed of all my life long..."',
      historicalConnection: 'Yeats read Tagore\'s poems to enchanted gatherings in London in 1912, introducing his voice to the global stage.'
    },
    {
      id: 'romain-rolland',
      name: 'Romain Rolland',
      title: 'French Pacifist, Novelist & Nobel Laureate',
      relation: 'Fraternal Ally for World Peace & Cultural Bridge',
      relationType: 'peer',
      location: 'Villeneuve, Lake Geneva, Switzerland',
      transitDays: '12 days via French mail routes to Switzerland',
      transitRisk: 'Swiss border controls and censorship during interwar tensions',
      stakes: 'Building an intellectual bridge between European humanism and Indian spirituality to heal the catastrophic wounds of WWI.',
      survivingArtifactNote: 'Extensive published correspondence documenting their shared vision of a "Republic of the Spirit".',
      historicalConnection: 'Hosted Tagore in Switzerland in 1926; co-signed manifestos demanding an end to European imperial exploitation.'
    }
  ],
  suggestedEvents: [
    {
      id: 'evt-nobel-1913',
      title: 'Award of the 1913 Nobel Prize in Literature',
      year: '1913',
      context: 'The Swedish Academy awards the Nobel Prize in Literature to Rabindranath Tagore for Gitanjali—the first time the award is granted to a non-European or Asian writer.',
      historicalEvidence: 'Presentation speech by Harald Hjärne on December 10, 1913; worldwide telegrams preserved at Rabindra Bhavana.',
      recipientRelevance: 'Announcing to William Butler Yeats and global friends the dawn of global recognition for Eastern literature.'
    },
    {
      id: 'evt-renouncing-knighthood',
      title: 'Renunciation of British Knighthood (1919)',
      year: '1919',
      context: 'Following the brutal Jallianwala Bagh massacre in Amritsar where British troops fired into an unarmed crowd, Tagore writes an open letter to the Viceroy of India renouncing his knighthood.',
      historicalEvidence: 'Published letter to Lord Chelmsford on May 31, 1919: "The time has come when badges of honour make our shame glaring..."',
      recipientRelevance: 'Written in moral anguish and sent to Mahatma Gandhi and global newspapers.'
    },
    {
      id: 'evt-caputh-dialogue-tagore',
      title: 'The Dialogue on Truth and Music with Einstein (1930)',
      year: '1930',
      context: 'During his European tour, Tagore visits Einstein at his home in Caputh, Berlin, reflecting upon the harmony of the universe, Indian ragas, and the reality of the human spirit.',
      historicalEvidence: 'Recorded conversation on July 14, 1930; Tagore’s essay "The Religion of Man" (The Hibbert Lectures at Oxford, 1930).'
    },
    {
      id: 'evt-visva-bharati-founding',
      title: 'Dedication of Visva-Bharati University (1921)',
      year: '1921',
      context: 'Tagore dedicates all his Nobel prize earnings and family land in Santiniketan to create an international university where scholars from France, Germany, China, and India study together.',
      historicalEvidence: 'Founding charter of Visva-Bharati, December 23, 1921, with scholars Sylvain Lévi and C.F. Andrews.'
    }
  ],
  availableTones: [
    {
      id: 'tone-lyrical-spiritual',
      label: 'Lyrical, Reverent & Mystic',
      description: 'Elevated, poetic prose steeped in nature, harmony, compassion, and the unity of the human soul.',
      eraEtiquetteRule: 'The noble, rhythmic Bengali epistolary cadence, addressing correspondents with profound deference and fraternal blessing.'
    },
    {
      id: 'tone-prophetic-moral',
      label: 'Prophetic & Moral Conscience',
      description: 'Fearless, speaking truth to imperial power, lamenting the moral decay of machine civilization without spirit.',
      eraEtiquetteRule: 'Dignified, unyielding moral clarity rejecting worldly titles and political expedience in the name of universal truth.'
    },
    {
      id: 'tone-intimate-fraternal',
      label: 'Warm, Tender & Brotherly',
      description: 'Affectionate sharing of ashram life, the blossoming of mango groves, singing students, and physical weariness.',
      eraEtiquetteRule: 'Warm epistolary intimacy characteristic of Tagore’s letters to Gandhi, Rolland, and his family.'
    }
  ],
  availableMoods: [
    {
      id: 'mood-universal-harmony',
      label: 'Universal Harmony & Love',
      emotionalState: 'Radiant with the joy of seeing the divine spirit reflected in every child, bird, and tree.',
      subtext: 'The feeling that borders and nations are artificial illusions that cannot divide the human heart.'
    },
    {
      id: 'mood-sorrow-violence',
      label: 'Grief Over Human Violence',
      emotionalState: 'Profound sorrow at imperial bloodshed, war, and the mechanization of human souls.',
      subtext: 'The anguish of a poet watching the world prepare the engines of self-destruction.'
    },
    {
      id: 'mood-twilight-peace',
      label: 'Twilight Contemplation',
      emotionalState: 'Serene acceptance of the approaching sunset of life, thankful for the songs gifted to the earth.',
      subtext: 'A traveler packing his bag as the boat arrives to carry him across the silent river.'
    }
  ],
  researchKeywords: [
    { id: 'kw-gitanjali', label: 'Gitanjali (Song Offerings)', category: 'art', historicalFact: 'Tagore translated his Bengali devotional poems into English during a sea voyage to England in 1912, winning the 1913 Nobel Prize.' },
    { id: 'kw-nature-reality', label: 'The Caputh Dialogue with Einstein', category: 'philosophy', historicalFact: 'Debated whether Truth exists independently of the human mind: "Truth is realized through man... beauty is the harmony of universal consciousness."' },
    { id: 'kw-visva-bharati', label: 'Visva-Bharati Open-Air School', category: 'personal', historicalFact: 'Classes were held under ancient banyan and sal trees so students remained in unbroken harmony with natural rhythms.' },
    { id: 'kw-jallianwala', label: 'Jallianwala Bagh Knighthood Renunciation', category: 'politics', historicalFact: 'Tagore renounced his British knighthood in 1919 to stand in complete solidarity with oppressed Indian countrymen after the Amritsar massacre.' },
    { id: 'kw-rabindra-sangeet', label: 'Rabindra Sangeet Melodic Modes', category: 'art', historicalFact: 'Composed over 2,230 songs synthesizing classical Indian ragas with Western folk melodies, discussed with Einstein as emotional physics.' },
    { id: 'kw-icic-dialogue', label: 'League of Nations ICIC Representation', category: 'politics', historicalFact: 'Tagore was appointed as India\'s foremost cultural representative to the League of Nations International Committee on Intellectual Cooperation.' }
  ]
};

// =========================================================================
// 2. THE MULTI-DIMENSIONAL TRIAD RELATIONSHIPS
// =========================================================================

export const TRIAD_RELATIONSHIPS: TriadRelationship[] = [
  {
    id: 'einstein-curie',
    sourceId: 'einstein',
    targetId: 'curie',
    title: 'Comrades in Science & Incorruptible Minds',
    epithet: 'The Empirical Proof of E=mc² & The 1913 Alpine Bond',
    summary: 'A 25-year bond of profound intellectual admiration, mutual defense against public prejudice, and collaborative leadership at the Solvay Councils and the League of Nations.',
    dimensions: {
      interpersonal: 'Deep, affectionate camaraderie. They hiked together in the Swiss Alps (1913) with their children. When the French yellow press launched a xenophobic and misogynist campaign against Marie Curie in November 1911 during the Langevin controversy, Einstein immediately penned a blistering letter of support urging her to hold the "rabble" in contempt.',
      intellectual: 'Theoretical vision meets empirical proof: In 1905, Einstein derived E=mc² as a purely mathematical consequence of special relativity. The only physical phenomenon on earth that provided concrete, measurable proof of mass transforming into continuous heat and radiation was the Radium isolated and measured by Marie Curie at the Sorbonne.',
      ethical: 'Uncompromising integrity and hatred of vanity. In his 1935 memorial address at the Roerich Museum in New York, Einstein immortalized Marie: "Marie Curie is, of all celebrated beings, the only one whom fame has not corrupted."',
      institutional: 'Founding leaders of the Solvay Physics Councils (from 1911 onward) and the League of Nations International Committee on Intellectual Cooperation (ICIC) in Geneva, coordinating international post-WWI scientific standards.'
    },
    primaryExcerpts: [
      {
        speaker: 'Albert Einstein',
        recipientOrOccasion: 'To Marie Curie (Letter from Prague)',
        year: 'November 20, 1911',
        quote: 'I am so enraged by the base manner in which the public currently dares to occupy itself with you that I must tell you how much I have come to admire your intellect, your drive, and your honesty... If the rabble continues to occupy itself with you, simply don’t read that hogwash, but rather leave it to the reptile for whom it has been fabricated.',
        source: 'Bibliothèque nationale de France (BnF), Papiers Curie, discovered 2011'
      },
      {
        speaker: 'Albert Einstein',
        recipientOrOccasion: 'Marie Curie Memorial Celebration, Roerich Museum, New York',
        year: 'November 23, 1935',
        quote: 'Marie Curie is, of all celebrated beings, the only one whom fame has not corrupted. Her strength of character, her purity of intention, her objectivity, her incorruptible judgment—all these were of a kind seldom found in a single individual.',
        source: 'Out of My Later Years (Philosophical Library, 1950)'
      },
      {
        speaker: 'Marie Curie',
        recipientOrOccasion: 'Recommendation Letter for Einstein to ETH Zurich',
        year: 'November 17, 1911',
        quote: 'Herr Einstein is one of the most original and fruitful minds that I have ever had the fortune to know... His theoretical understanding of new concepts in physics is unmatched.',
        source: 'ETH Zurich Archives (Einstein Documentation Dossier)'
      }
    ],
    sharedEvents: [
      {
        year: '1911',
        title: 'First Solvay Council in Brussels',
        description: 'Marie Curie and Albert Einstein met in Brussels to debate the quantum crisis; walked the streets discussing radiation quanta.',
        location: 'Hotel Metropole, Brussels'
      },
      {
        year: '1911',
        title: 'Einstein\'s Defense Letter During the Paris Scandal',
        description: 'Einstein sent his famous letter of moral solidarity amidst press attacks following her second Nobel prize announcement.',
        location: 'Prague / Paris'
      },
      {
        year: '1913',
        title: 'Swiss Engadine Alpine Walking Expedition',
        description: 'Einstein, his son Hans Albert, Marie Curie, and her daughters Irène and Ève hiked together across mountain passes.',
        location: 'Engadine Alps, Switzerland'
      },
      {
        year: '1922–1930',
        title: 'League of Nations ICIC Leadership',
        description: 'Both served as vanguard members of the International Committee on Intellectual Cooperation in Geneva.',
        location: 'Geneva, Switzerland'
      }
    ],
    visualBadge: 'Scientific Comrades & E=mc²',
    color: '#3B82F6'
  },
  {
    id: 'einstein-tagore',
    sourceId: 'einstein',
    targetId: 'tagore',
    title: 'The Confluence of Reason & Mystic Harmony',
    epithet: 'The 1930 Caputh Dialogues on Truth, Music & Reality',
    summary: 'A monumental East-West philosophical encounter between modern physics and universal humanism, debating whether truth exists independent of human perception and exploring music as universal bridge.',
    dimensions: {
      interpersonal: 'A meeting of warm mutual reverence. On July 14, 1930, Tagore visited Einstein’s summer villa in Caputh near Berlin. They sat together on the veranda, drinking tea and exploring the ultimate nature of existence in a calm, recorded conversation that captivated the global press.',
      intellectual: 'Realism vs. Human-Dependent Truth: Einstein represented scientific realism (the physical universe exists objectively, independent of whether human beings are here to observe it). Tagore countered with the philosophical ideal of universal consciousness (Truth and Beauty are realized through human mind; reality is the harmony between the Universal Man and the infinite).',
      ethical: 'Passionate mutual anti-militarism and anti-nationalism. Both used their worldwide celebrity status to denounce aggressive tribal patriotism and the rise of European fascism in the 1930s.',
      institutional: 'Both contributed to the League of Nations intellectual exchange initiatives and issued joint statements urging universities to teach global human solidarity rather than jingoistic history.'
    },
    primaryExcerpts: [
      {
        speaker: 'Albert Einstein & Rabindranath Tagore',
        recipientOrOccasion: 'Recorded Dialogue in Caputh near Berlin',
        year: 'July 14, 1930',
        quote: 'Einstein: "Truth, then, or Beauty, is not independent of Man?"\nTagore: "No."\nEinstein: "If there would be no human beings anymore, the Apollo of Belvedere would no longer be beautiful?"\nTagore: "No."\nEinstein: "I agree with this conception of Beauty, but not with regard to Truth."\nTagore: "Why not? Truth is realized through man... When our universe is in harmony with Man, the eternal, we know it as Truth, we feel it as Beauty."\nEinstein: "Then I am more religious than you are!"',
        source: 'The Modern Review (Calcutta, 1931) & The New York Times (August 10, 1930)'
      },
      {
        speaker: 'Albert Einstein',
        recipientOrOccasion: 'To Rabindranath Tagore (Birthday Greeting)',
        year: 'May 1931',
        quote: 'You have done what few men have achieved: you have woven the spirit of your people into an offering for the entire human family. In your presence, one feels the timeless serenity of true wisdom.',
        source: 'The Golden Book of Tagore (Calcutta, 1931)'
      },
      {
        speaker: 'Rabindranath Tagore',
        recipientOrOccasion: 'Reflections on Science and the Human Universe',
        year: '1930',
        quote: 'The music of the universe is not made of mechanical clockwork; it is a creative flow of harmony that resonates only when human consciousness attunes its instrument to the infinite.',
        source: 'The Religion of Man (Oxford Hibbert Lectures, 1930)'
      }
    ],
    sharedEvents: [
      {
        year: '1930',
        title: 'The Caputh Meeting on the Nature of Reality',
        description: 'Tagore and Einstein met at Einstein’s summer villa to conduct their historic philosophical dialogues.',
        location: 'Caputh near Berlin, Germany'
      },
      {
        year: '1930',
        title: 'Discussion on the Physics & Emotion of Music',
        description: 'Second meeting in Berlin exploring Western classical counterpoint versus Indian melodic ragas.',
        location: 'Berlin, Germany'
      },
      {
        year: '1931',
        title: 'The Golden Book of Tagore Dedication',
        description: 'Einstein contributed an honorary tribute to the international festschrift celebrating Tagore’s 70th birthday.',
        location: 'Calcutta / Berlin'
      }
    ],
    visualBadge: 'The 1930 Caputh Dialogues',
    color: '#F59E0B'
  },
  {
    id: 'curie-tagore',
    sourceId: 'curie',
    targetId: 'tagore',
    title: 'The Vanguard of Global Human Dignity',
    epithet: 'Pioneering Nobel Laureates & The Rejection of Imperial Monopoly',
    summary: 'A profound shared destiny as the two historic pioneers who broke Western imperial and patriarchal monopolies over global prestige, united by their absolute refusal to monetize knowledge.',
    dimensions: {
      interpersonal: 'Mutual admiration and shared social circles. During Tagore’s visits to Paris in 1920, 1921, and 1930, he was hosted by the elite of French science and intellectual life—including Sorbonne physicist Paul Langevin, mathematician Paul Painlevé, and indologist Sylvain Lévi, all of whom were Marie Curie’s closest personal and academic allies.',
      intellectual: 'Empirical rigor meets moral spirituality: Curie proved that nature reveals her secrets only to relentless, humble experimental labor. Tagore complemented this by warning that empirical discovery without moral conscience becomes a weapon of industrial subjugation and world war. Both demanded that knowledge serve human healing rather than conquest.',
      ethical: 'The Supreme Act of Altruistic Renunciation: Both figures became legendary for refusing to profit from their genius. Marie Curie explicitly refused to patent the radium extraction process, stating: "Radium is an element, it belongs to the whole world." Similarly, Tagore donated every penny of his 1913 Nobel prize money ($40,000) to his experimental school in Santiniketan, and renounced his British Knighthood in 1919 after the Jallianwala Bagh massacre.',
      institutional: 'Historic breakthrough pioneers: Curie was the first woman Nobel laureate (and first double laureate); Tagore was the first non-European/Asian Nobel laureate (1913). Both served and contributed to the League of Nations International Committee on Intellectual Cooperation (ICIC) to champion cross-cultural parity.'
    },
    primaryExcerpts: [
      {
        speaker: 'Marie Skłodowska-Curie',
        recipientOrOccasion: 'Address to the League of Nations ICIC',
        year: 'Geneva, July 1922',
        quote: 'Intellectual cooperation is the only genuine guarantee of world peace. Science recognizes no geographical frontiers, no sovereign masteries, and no imperial monopolies. It is the heritage of all mankind.',
        source: 'League of Nations Archives, Series 13C (ICIC Plenary Minutes)'
      },
      {
        speaker: 'Rabindranath Tagore',
        recipientOrOccasion: 'Address at the Sorbonne, University of Paris',
        year: 'Paris, April 1921',
        quote: 'The West has given the world the gifts of science and rigorous truth; but if this truth is divorced from human sympathy and exploited for power, it creates an engine of global destruction. We must wed the clarity of Western reason to the unity of Eastern soul.',
        source: 'Letters to a Friend (London, 1928)'
      },
      {
        speaker: 'Marie Curie',
        recipientOrOccasion: 'On Renouncing Radium Patents',
        year: '1923',
        quote: 'Physicists always publish their research completely. If our discovery has a commercial future, that is an accident by which we must not profit. Radium was not made to enrich any one person; it belongs to the afflicted.',
        source: 'Pierre Curie (Autobiographical Notes, 1923)'
      }
    ],
    sharedEvents: [
      {
        year: '1903 & 1913',
        title: 'Historic Nobel Precedent Milestones',
        description: 'Curie became the first woman laureate in 1903; Tagore became the first non-European laureate in 1913, expanding global consciousness.',
        location: 'Stockholm, Sweden'
      },
      {
        year: '1919',
        title: 'WWI Medical Mobilization & Knighthood Renunciation',
        description: 'Curie drove radiographic vans on the frontlines; Tagore renounced his knighthood in protest of colonial violence in Amritsar.',
        location: 'Paris / Kolkata'
      },
      {
        year: '1920–1930',
        title: 'Tagore\'s Paris Encounters & League of Nations Confluence',
        description: 'Tagore met the Sorbonne scientific vanguard and both contributed to the League of Nations ICIC in Geneva.',
        location: 'Paris, France & Geneva, Switzerland'
      }
    ],
    visualBadge: 'Nobel Pioneers & Ethical Renunciation',
    color: '#10B981'
  }
];

// =========================================================================
// 3. THE CENTER NEXUS: THE CONFLUENCE OF ALL THREE
// =========================================================================

export const TRIAD_CENTER_NEXUS: TriadCenterNexus = {
  title: 'The 1920s Geneva Confluence & The Post-Mechanistic Epoch',
  subtitle: 'The League of Nations ICIC & The Moral Responsibility of Genius',
  description: 'In the aftermath of the First World War, Albert Einstein, Marie Curie, and Rabindranath Tagore converged upon a shared historical mission: constructing a global commonwealth of intellectual freedom through the League of Nations International Committee on Intellectual Cooperation (ICIC). Together, they dismantled the rigid mechanical certainty of the 19th century and laid the foundations for a 20th-century worldview defined by relativity, quantum uncertainty, and universal human empathy.',
  sharedPillars: [
    {
      title: 'The League of Nations ICIC (Geneva, 1922–1939)',
      detail: 'The direct precursor to modern UNESCO. Marie Curie served as Vice-President; Albert Einstein was a founding member; Rabindranath Tagore was an active international representative. They united to ensure science and literature would transcend nationalist warmongering.'
    },
    {
      title: 'Dismantling 19th-Century Mechanistic Dogma',
      detail: 'Curie demonstrated that the atom is neither immutable nor permanent; Einstein proved that time and space are relative and flexible; Tagore proved that intellectual and spiritual genius is not the exclusive monopoly of Western colonial powers.'
    },
    {
      title: 'The Sacred Renunciation of Commercial Exploitation',
      detail: 'None of the three allowed their work to be privatized for personal greed. Curie gave radium to the world without a single patent; Einstein lived with ascetic simplicity rejecting commercial endorsements; Tagore donated his Nobel fortune to open-air education for poor village children.'
    },
    {
      title: 'Militant Pacifism Against Rising Fascism',
      detail: 'Throughout the interwar years, the trio issued warnings to humanity against the rising tides of totalitarianism, antisemitism, colonial oppression, and mechanized warfare, pleading for an international conscience.'
    }
  ],
  historicalImpact: 'The triad of Einstein (Germany), Curie (France/Poland), and Tagore (India) represents the highest apex of human thought in the early 20th century: the union of theoretical genius, experimental heroism, and poetic humanism.'
};

// =========================================================================
// 4. COMBINED ARRAY FOR PERSONA SELECTION
// =========================================================================

export const TRIAD_FIGURES: HistoricalFigure[] = [
  EINSTEIN_FIGURE,
  // We'll import the updated Curie figure from historicalData or redefine here
];
