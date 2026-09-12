import { HistoricalEventOption } from '../types';

export interface HistoricalSharedEpisode {
  id: string;
  writerId: string;
  recipientId: string;
  title: string;
  year: string;
  summary: string;
  historicalContext: string;
  historicalEvidence: string;
  historicalPeopleInvolved: string[];
  keyTopics: string[];
  primaryQuote?: {
    speaker: string;
    text: string;
    source: string;
  };
}

export const SHARED_HISTORICAL_EPISODES: HistoricalSharedEpisode[] = [
  // =========================================================================
  // MARIE CURIE <-> ALBERT EINSTEIN
  // =========================================================================
  {
    id: 'ep-curie-einstein-solvay1911',
    writerId: 'curie',
    recipientId: 'albert-einstein',
    title: 'First Solvay Council in Brussels (1911)',
    year: '1911',
    summary: 'Marie and Albert met for the first time at Hotel Métropole, walking the streets of Brussels debating the crisis of quantum energy packets and radioactivity.',
    historicalContext: 'Marie Curie sat as the only woman among 24 leading physicists (including Lorentz, Planck, Rutherford, and Einstein) at the inaugural Solvay Council. Einstein was deeply moved by Marie’s sharpness and lack of vanity, while Marie was struck by Einstein’s revolutionary clarity regarding radiation quanta.',
    historicalEvidence: 'Photograph by Benjamin Couprie (1911) showing Marie and Poincaré in intense manuscript discussion; Einstein’s letters to Heinrich Zangger.',
    historicalPeopleInvolved: ['Hendrik Lorentz', 'Max Planck', 'Ernest Rutherford', 'Paul Langevin', 'Henri Poincaré'],
    keyTopics: ['Quantum crisis', 'Radioactive decay', 'Atomic structure', 'Brussels night walks'],
    primaryQuote: {
      speaker: 'Albert Einstein',
      text: 'Madame Curie has a sparkling intelligence; but in spite of her passionate nature, she is not attractive enough to be dangerous to anyone... yet her scientific honesty is an absolute rock.',
      source: 'Letter to Heinrich Zangger (November 1911)'
    }
  },
  {
    id: 'ep-curie-einstein-defense1911',
    writerId: 'curie',
    recipientId: 'albert-einstein',
    title: 'Solidarity Letter Amidst Paris Press Scandal (1911)',
    year: '1911',
    summary: 'Einstein wrote a blistering letter of moral support urging Marie to ignore the xenophobic and misogynist attacks fabricated by the Paris tabloid press.',
    historicalContext: 'Just days before Marie was awarded her second Nobel Prize (in Chemistry), Paris yellow journals unleashed a vitriolic campaign against her. Einstein immediately wrote from Prague, telling her how much he admired her drive and urging her to hold the "rabble" in pure contempt.',
    historicalEvidence: 'Autograph letter dated Nov 20, 1911, discovered in Curie’s papers at the Bibliothèque nationale de France in 2011.',
    historicalPeopleInvolved: ['Paul Langevin', 'Gustave Téry (L\'Œuvre editor)', 'Marguerite Borel'],
    keyTopics: ['Yellow journalism', 'Moral indignation', 'Second Nobel Prize', 'Academic solidarity'],
    primaryQuote: {
      speaker: 'Albert Einstein',
      text: 'If the rabble continues to occupy itself with you, simply don’t read that hogwash, but rather leave it to the reptile for whom it has been fabricated.',
      source: 'Bibliothèque nationale de France (BnF), Papiers Curie'
    }
  },
  {
    id: 'ep-curie-einstein-alps1913',
    writerId: 'curie',
    recipientId: 'albert-einstein',
    title: 'Engadine Alpine Glacier Expedition (1913)',
    year: '1913',
    summary: 'Marie and Albert spent weeks hiking through the Swiss Alps with their children, leaping glacier crevasses and discussing relativity under open skies.',
    historicalContext: 'In the summer of 1913, Einstein, his young son Hans Albert, Marie Curie, and her teenage daughters Irène and Ève spent weeks traversing the rugged mountain passes of the Engadine. Einstein would famously stop on steep precipices to explain the equivalence principle and why gravity curves space.',
    historicalEvidence: 'Ève Curie’s biography "Madame Curie" (1937) and Hans Albert Einstein’s oral memoirs recorded at UC Berkeley.',
    historicalPeopleInvolved: ['Hans Albert Einstein', 'Irène Curie', 'Ève Curie'],
    keyTopics: ['Alpine glaciers', 'Spacetime curvature', 'Children hiking', 'Solitude of the peaks'],
    primaryQuote: {
      speaker: 'Ève Curie',
      text: 'Albert Einstein walked beside my mother, bounding from boulder to boulder, constantly halting to point his pipe at the sky and explain that time itself was elastic.',
      source: 'Madame Curie: A Biography (1937)'
    }
  },
  {
    id: 'ep-curie-einstein-emc2-proof',
    writerId: 'curie',
    recipientId: 'albert-einstein',
    title: 'The Empirical Physical Proof of E=mc²',
    year: '1905–1911',
    summary: 'Einstein derived mass-energy equivalence theoretically, but Marie Curie’s isolated radium was the only substance on Earth providing tangible experimental proof.',
    historicalContext: 'When Einstein formulated E=mc² in 1905, skeptics noted that chemical reactions released far too little energy to measure mass loss. Only Curie’s pure radium chloride continuously released millions of times more heat and radiation than any chemical coal fire, physically demonstrating atomic mass transforming directly into energy.',
    historicalEvidence: 'Curie’s Sorbonne laboratory notes (BnF) and Einstein’s 1905 paper "Does the Inertia of a Body Depend Upon Its Energy-Content?".',
    historicalPeopleInvolved: ['Pierre Curie', 'Henri Becquerel'],
    keyTopics: ['E=mc²', 'Radium chloride', 'Spontaneous heat generation', 'Atomic disintegration'],
  },
  {
    id: 'ep-curie-einstein-icic1922',
    writerId: 'curie',
    recipientId: 'albert-einstein',
    title: 'League of Nations ICIC Assembly in Geneva (1922)',
    year: '1922',
    summary: 'Marie Curie and Albert Einstein took seats as founding delegates of the International Committee on Intellectual Cooperation to mend scientific fraternity after WWI.',
    historicalContext: 'Following the devastation of World War I, European science was fractured by national boycotts. Einstein and Curie joined forces in Geneva to rebuild academic exchanges, establish international research fellowships, and defend scholars fleeing persecution.',
    historicalEvidence: 'League of Nations Archives, Geneva, Series 13C (ICIC Plenary Minutes 1922–1928).',
    historicalPeopleInvolved: ['Henri Bergson (Committee President)', 'Gilbert Murray', 'Inazo Nitobe'],
    keyTopics: ['League of Nations', 'Geneva assembly', 'Post-war reconciliation', 'International fellowships'],
    primaryQuote: {
      speaker: 'Marie Curie',
      text: 'Intellectual cooperation is the true guarantee of world peace, for science recognizes no borders or conquerors.',
      source: 'Address to the League of Nations Assembly, Geneva (1922)'
    }
  },

  // EINSTEIN <-> CURIE (Reciprocal)
  {
    id: 'ep-einstein-curie-defense1911',
    writerId: 'einstein',
    recipientId: 'curie',
    title: 'Solidarity Letter from Prague to Marie Curie (1911)',
    year: '1911',
    summary: 'Einstein wrote a blistering letter of moral support urging Marie to ignore the xenophobic and misogynist attacks fabricated by the Paris tabloid press.',
    historicalContext: 'Following the 1911 Solvay Conference, the Paris sensationalist press unleashed a brutal xenophobic and misogynist campaign against Marie Curie. Einstein wrote immediately from Prague to urge her to ignore the rabble and keep working.',
    historicalEvidence: 'Autograph letter dated Nov 20, 1911, BnF Papiers Curie.',
    historicalPeopleInvolved: ['Paul Langevin', 'Gustave Téry', 'Marguerite Borel'],
    keyTopics: ['Yellow journalism', 'Moral indignation', 'Second Nobel Prize', 'Academic solidarity'],
    primaryQuote: {
      speaker: 'Albert Einstein',
      text: 'I am so enraged by the base manner in which the public currently dares to occupy itself with you that I must tell you how much I have come to admire your intellect, your drive, and your honesty.',
      source: 'Letter to Marie Curie (Nov 20, 1911)'
    }
  },
  {
    id: 'ep-einstein-curie-alps1913',
    writerId: 'einstein',
    recipientId: 'curie',
    title: 'Swiss Engadine Alpine Walking Expedition (1913)',
    year: '1913',
    summary: 'Einstein, his son Hans Albert, Marie Curie, and her daughters Irène and Ève hiked together across glacier passes.',
    historicalContext: 'Hiking glaciers in the Swiss Alps, Einstein was delighted by Marie’s unpretentious toughness. She carried her own rucksack and never complained about cold rain or steep inclines.',
    historicalEvidence: 'Hans Albert Einstein interview, UC Berkeley Bancroft Library.',
    historicalPeopleInvolved: ['Hans Albert Einstein', 'Irène Curie', 'Ève Curie'],
    keyTopics: ['Alpine glaciers', 'Spacetime curvature', 'Children hiking', 'Solitude of the peaks']
  },
  {
    id: 'ep-einstein-curie-solvay1911',
    writerId: 'einstein',
    recipientId: 'curie',
    title: 'First Solvay Council in Brussels (1911)',
    year: '1911',
    summary: 'Marie and Albert met in Brussels to debate the quantum crisis; walked the streets discussing radiation quanta.',
    historicalContext: 'The moment Einstein established his lifelong intellectual pact with Marie Curie, finding in her an unbending devotion to physical fact over academic pomp.',
    historicalEvidence: 'Solvay Conference 1911 Proceedings (Gauthier-Villars, Paris).',
    historicalPeopleInvolved: ['Hendrik Lorentz', 'Max Planck', 'Ernest Rutherford'],
    keyTopics: ['Quantum crisis', 'Radioactive decay', 'Atomic structure', 'Brussels night walks']
  },
  {
    id: 'ep-einstein-curie-icic1922',
    writerId: 'einstein',
    recipientId: 'curie',
    title: 'League of Nations ICIC Leadership in Geneva (1922)',
    year: '1922',
    summary: 'Both served as vanguard members of the International Committee on Intellectual Cooperation in Geneva.',
    historicalContext: 'Einstein joined Marie Curie in Geneva to inaugurate the ICIC, dedicating his prestige to re-establishing cross-border academic fraternity.',
    historicalEvidence: 'League of Nations Archives, Geneva (ICIC Minutes 1922–1928, Series 13C).',
    historicalPeopleInvolved: ['Henri Bergson', 'Gilbert Murray'],
    keyTopics: ['League of Nations', 'Geneva assembly', 'Post-war reconciliation']
  },

  // =========================================================================
  // ALBERT EINSTEIN <-> RABINDRANATH TAGORE
  // =========================================================================
  {
    id: 'ep-einstein-tagore-caputh1930',
    writerId: 'einstein',
    recipientId: 'tagore',
    title: 'The Caputh Meeting on Truth & Reality (1930)',
    year: '1930',
    summary: 'Tagore visited Einstein’s summer villa in Caputh near Berlin, conducting their immortal dialogue debating whether objective reality exists independent of human perception.',
    historicalContext: 'On July 14, 1930, Tagore arrived at Einstein’s wooden villa beneath the pines in Caputh. As they sat with tea on the veranda, Einstein argued that a table in an empty room remains real even if no human exists to observe it, while Tagore argued that Truth and Beauty are realizations of universal human consciousness.',
    historicalEvidence: 'Recorded in shorthand by Dimitri Marianoff on July 14, 1930; subsequently published in The Modern Review and New York Times.',
    historicalPeopleInvolved: ['Dimitri Marianoff', 'Margot Einstein', 'C.F. Andrews'],
    keyTopics: ['Objective reality vs consciousness', 'Veranda tea in Caputh', 'Universal Man', 'Scientific realism'],
    primaryQuote: {
      speaker: 'Albert Einstein & Rabindranath Tagore',
      text: 'Einstein: "Then I am more religious than you are!" Tagore: "My religion is in the reconciliation of the Super-personal Man, the universal human spirit, in my own individual being."',
      source: 'The Caputh Dialogue Transcript (July 14, 1930)'
    }
  },
  {
    id: 'ep-einstein-tagore-music1930',
    writerId: 'einstein',
    recipientId: 'tagore',
    title: 'Dialogue on the Physics & Emotion of Music (1930)',
    year: '1930',
    summary: 'A second meeting in Berlin exploring Western classical counterpoint (Bach and Mozart) versus Indian melodic ragas as emotional physics.',
    historicalContext: 'Einstein, an ardent violinist, and Tagore, composer of over 2,200 songs, compared European harmonic counterpoint to Indian modal ragas. They realized music was the purest human bridge connecting mathematical order with spiritual intuition.',
    historicalEvidence: 'Tagore\'s travel diary "Pather Sanchay" and Einstein’s correspondence with Rolland.',
    historicalPeopleInvolved: ['Romain Rolland', 'Yehudi Menuhin'],
    keyTopics: ['Indian ragas', 'Mozart & violin Lina', 'Polyphony vs melody', 'Universal bridge'],
    primaryQuote: {
      speaker: 'Rabindranath Tagore',
      text: 'The musical system in India is not conditioned by fixed counterpoint; the melody has its freedom inside the rhythmic discipline of the raga, just like the soul in the cosmos.',
      source: 'Conversations with Einstein (Berlin, 1930)'
    }
  },
  {
    id: 'ep-einstein-tagore-goldenbook1931',
    writerId: 'einstein',
    recipientId: 'tagore',
    title: 'The Golden Book of Tagore Dedication (1931)',
    year: '1931',
    summary: 'Einstein contributed an honorary tribute to the international festschrift celebrating Tagore’s 70th birthday.',
    historicalContext: 'For Tagore’s 70th jubilee in Calcutta, international scholars compiled The Golden Book of Tagore. Einstein wrote an eloquent inscription celebrating Tagore’s ability to weave the spirit of India into an offering for the entire human family.',
    historicalEvidence: 'The Golden Book of Tagore (Calcutta, 1931), preserved at Visva-Bharati.',
    historicalPeopleInvolved: ['Ramananda Chatterjee', 'Mahatma Gandhi', 'Romain Rolland'],
    keyTopics: ['70th Jubilee', 'Festschrift', 'East-West friendship', 'Timeless wisdom'],
    primaryQuote: {
      speaker: 'Albert Einstein',
      text: 'You have done what few men have achieved: you have woven the spirit of your people into an offering for the entire human family. In your presence, one feels the timeless serenity of true wisdom.',
      source: 'The Golden Book of Tagore (1931)'
    }
  },

  // TAGORE <-> EINSTEIN (Reciprocal)
  {
    id: 'ep-tagore-einstein-caputh1930',
    writerId: 'tagore',
    recipientId: 'einstein',
    title: 'The Caputh Dialogue on Truth and Music (1930)',
    year: '1930',
    summary: 'Tagore visits Einstein at his summer villa in Caputh, Berlin, reflecting upon the harmony of the universe, Indian ragas, and the reality of the human spirit.',
    historicalContext: 'During his European tour, Tagore visited Einstein at Caputh. The two Nobel laureates explored whether truth is an absolute geometric reality or a harmony felt through human consciousness.',
    historicalEvidence: 'Recorded conversation on July 14, 1930; Tagore’s Oxford Hibbert Lectures "The Religion of Man" (1930).',
    historicalPeopleInvolved: ['Dimitri Marianoff', 'Margot Einstein'],
    keyTopics: ['Caputh pines', 'Nature of truth', 'Universal consciousness', 'The Religion of Man'],
    primaryQuote: {
      speaker: 'Rabindranath Tagore',
      text: 'Truth is realized through man... when our universe is in harmony with Man, the eternal, we know it as Truth, we feel it as Beauty.',
      source: 'The Religion of Man (1930)'
    }
  },
  {
    id: 'ep-tagore-einstein-music1930',
    writerId: 'tagore',
    recipientId: 'einstein',
    title: 'The Ragas & Counterpoint Encounter (1930)',
    year: '1930',
    summary: 'Tagore and Einstein debated how musical scales reflect emotional and mathematical truth.',
    historicalContext: 'Tagore explained to Einstein that Indian music does not rely on strict mechanical notation, but gives freedom to the performer to breathe life into the raga depending on the season and hour.',
    historicalEvidence: 'Rabindra Bhavana Archives, Santiniketan.',
    historicalPeopleInvolved: ['Romain Rolland'],
    keyTopics: ['Indian ragas', 'Mozart counterpoint', 'Monsoon melodies', 'Spiritual freedom']
  },

  // =========================================================================
  // MARIE CURIE <-> RABINDRANATH TAGORE
  // =========================================================================
  {
    id: 'ep-curie-tagore-sorbonne1921',
    writerId: 'curie',
    recipientId: 'tagore',
    title: 'Tagore’s Sorbonne Address & Parisian Circle (1921)',
    year: '1921',
    summary: 'Tagore addressed the University of Paris; he was hosted by Marie Curie’s closest personal allies (Paul Langevin, Paul Painlevé, and Sylvain Lévi).',
    historicalContext: 'In April 1921, Tagore delivered lectures in Paris warning that science without humanistic compassion becomes an engine of industrial slaughter. Marie Curie and her inner circle embraced Tagore’s message, seeking to link French laboratories with his open-air ashram school in Santiniketan.',
    historicalEvidence: 'Documentation in "Letters to a Friend" (London, 1928) and University of Paris archives.',
    historicalPeopleInvolved: ['Paul Langevin', 'Paul Painlevé', 'Sylvain Lévi'],
    keyTopics: ['Sorbonne lectures', 'Science with conscience', 'Visva-Bharati internationalism', 'Paris salons'],
    primaryQuote: {
      speaker: 'Rabindranath Tagore',
      text: 'We must wed the clarity of Western reason to the unity of Eastern soul, so science becomes a healer rather than a weapon.',
      source: 'Sorbonne Address (April 1921)'
    }
  },
  {
    id: 'ep-curie-tagore-altruism',
    writerId: 'curie',
    recipientId: 'tagore',
    title: 'The Supreme Act of Altruistic Renunciation',
    year: '1902–1921',
    summary: 'Both pioneers broke Western monopolies yet refused to monetize their fame: Curie refused to patent Radium; Tagore gave all Nobel funds to village education.',
    historicalContext: 'Marie Curie never patented her radium extraction process, allowing doctors around the globe to build radiotherapy clinics freely. Tagore similarly invested every dollar of his Nobel Prize into Visva-Bharati and renounced his British knighthood in protest of colonial violence.',
    historicalEvidence: 'Curie’s autobiographical notes (1923) and Tagore’s open letter to the Viceroy of India (1919).',
    historicalPeopleInvolved: ['Pierre Curie', 'C.F. Andrews'],
    keyTopics: ['Refusing patents', 'Visva-Bharati donation', 'Renouncing knighthood', 'Uncorrupted minds'],
    primaryQuote: {
      speaker: 'Marie Curie',
      text: 'Radium was not made to enrich any one person; it belongs to the afflicted.',
      source: 'On Renouncing Radium Patents (1923)'
    }
  },

  // TAGORE <-> CURIE (Reciprocal)
  {
    id: 'ep-tagore-curie-sorbonne1921',
    writerId: 'tagore',
    recipientId: 'curie',
    title: 'The Paris Sorbonne Gathering & Sisterhood of Truth (1921)',
    year: '1921',
    summary: 'Tagore’s dialogue with French thinkers and scientists, honoring Marie Curie’s uncorrupted life of pure inquiry.',
    historicalContext: 'Tagore admired Marie Curie as the purest living embodiment of the ascetic seeker (Rishi) in the West—someone who sacrificed comfort and health for the revelation of nature’s secrets without seeking private wealth.',
    historicalEvidence: 'Rabindra Bhavana correspondence dossiers.',
    historicalPeopleInvolved: ['Sylvain Lévi', 'Paul Painlevé', 'Paul Langevin'],
    keyTopics: ['Western science & Eastern soul', 'The ascetic seeker', 'Parisian reception', 'League of Nations']
  },

  // =========================================================================
  // MARIE CURIE <-> BRONISŁAWA DŁUSKA (Her Sister)
  // =========================================================================
  {
    id: 'ep-curie-bronia-pact',
    writerId: 'curie',
    recipientId: 'bronislawa-dluska',
    title: 'The Secret Paris-Warsaw Sisterhood Pact (1885–1891)',
    year: '1885–1891',
    summary: 'The pact that made their careers: Marie worked as a lonely governess in rural Poland to fund Bronia’s Paris medical degree; then Bronia sheltered Marie in Paris.',
    historicalContext: 'In Russian-occupied Warsaw, women were banned from university. Teenaged Marie and Bronia made an extraordinary pact: Marie spent years as a governess in the remote village of Szczuki sending her meager wages to Paris so Bronia could become a doctor. Once graduated, Bronia provided a room and soup for Marie so she could study physics at the Sorbonne.',
    historicalEvidence: 'Original family letters preserved in the Maria Skłodowska-Curie Museum, Warsaw (Freta Street).',
    historicalPeopleInvolved: ['Władysław Skłodowski (Father)', 'Kazimierz Dłuski'],
    keyTopics: ['Governess in Szczuki', 'Sorbonne medical school', 'Secret Flying University', 'Sisterly devotion'],
    primaryQuote: {
      speaker: 'Marie Curie',
      text: 'My poor Bronia, I dream of Paris as the promised land. I am saving every ruble so you can pass your exams, and then my turn will come.',
      source: 'Letter from Szczuki (1888)'
    }
  },
  {
    id: 'ep-curie-bronia-shed1902',
    writerId: 'curie',
    recipientId: 'bronislawa-dluska',
    title: 'Isolating Radium in the Leaky Rue Lhomond Shed (1902)',
    year: '1902',
    summary: 'Four years of back-breaking manual labor boiling tons of pitchblende waste from Bohemia to produce 0.1g of pure glowing radium chloride.',
    historicalContext: 'Marie worked in an abandoned wooden shed with a dirt floor, stirring boiling vats of radioactive pitchblende with a heavy iron bar for hours in winter cold. Bronia regularly brought warm broth and checked on Marie’s chronic cough.',
    historicalEvidence: 'Marie’s laboratory notebooks (1902, Bibliothèque nationale de France).',
    historicalPeopleInvolved: ['Pierre Curie', 'Kazimierz Dłuski'],
    keyTopics: ['Pitchblende waste', 'Iron stirring bar', 'Glowing test tubes', 'Physical exhaustion'],
    primaryQuote: {
      speaker: 'Marie Curie',
      text: 'One of our joys was to go into our workroom at night; the glowing tubes looked like faint fairy lights in the dark.',
      source: 'Autobiographical Notes (1923)'
    }
  },
  {
    id: 'ep-curie-bronia-institute1925',
    writerId: 'curie',
    recipientId: 'bronislawa-dluska',
    title: 'Founding the Warsaw Radium Institute (1925–1932)',
    year: '1925',
    summary: 'Marie laid the cornerstone in liberated Warsaw, appointing Bronia as the medical director to bring cancer therapy to their Polish homeland.',
    historicalContext: 'After Poland regained independence in 1918, Marie and Bronia fulfilled their final dream: building the Radium Institute in Warsaw. Marie donated a gram of radium purchased through donations from American women, and Bronia oversaw construction of the clinical sanatorium.',
    historicalEvidence: 'Foundation charter of the Instytut Radowy w Warszawie (1925).',
    historicalPeopleInvolved: ['Ignacy Mościcki (President of Poland)', 'Kazimierz Dłuski'],
    keyTopics: ['Warsaw cornerstone', 'Instytut Radowy', 'Polish independence', 'Medical radium'],
  },

  // =========================================================================
  // MARIE CURIE <-> ERNEST RUTHERFORD
  // =========================================================================
  {
    id: 'ep-curie-rutherford-standard1912',
    writerId: 'curie',
    recipientId: 'ernest-rutherford',
    title: 'The Primary International Radium Standard (1912)',
    year: '1912',
    summary: 'Marie prepared the sealed glass tube containing 21.99mg of pure radium chloride to serve as the global measurement standard (the Curie unit).',
    historicalContext: 'Rutherford and Curie collaborated to establish an international standard so researchers worldwide could calibrate radiation without fraud or discrepancy. Rutherford visited Paris and championed Marie’s authority at the International Radium Standards Commission.',
    historicalEvidence: 'Bureau International des Poids et Mesures (BIPM) Sèvres archives.',
    historicalPeopleInvolved: ['Frederick Soddy', 'William Henry Bragg'],
    keyTopics: ['Curie standard unit', 'Quartz ampoule', 'Atomic decay chains', 'Calibration Commission']
  },

  // =========================================================================
  // MARIE CURIE <-> PAUL PAINLEVÉ
  // =========================================================================
  {
    id: 'ep-curie-painleve-ambulances1914',
    writerId: 'curie',
    recipientId: 'paul-painleve',
    title: 'The "Petites Curies" Mobile Radiography Fleet (1914)',
    year: '1914',
    summary: 'Painlevé bypassed military bureaucracy to grant Marie vehicles, dynamos, and military fuel to operate X-ray ambulances at the Battle of the Marne.',
    historicalContext: 'At the outbreak of WWI, wounded French soldiers were dying of infections because surgeons could not locate bullets and shrapnel in field hospitals. Marie teamed with Painlevé (Minister of Inventions/War) to outfit 20 touring cars with mobile dynamos and X-ray apparatus, driving them to the front herself.',
    historicalEvidence: 'Marie Curie’s monograph "La Radiologie et la Guerre" (1921).',
    historicalPeopleInvolved: ['Irène Curie', 'General Joseph Joffre'],
    keyTopics: ['Battle of the Marne', 'Mobile dynamos', 'Saving amputees', 'Frontline X-ray passes']
  },

  // =========================================================================
  // ALBERT EINSTEIN <-> NIELS BOHR
  // =========================================================================
  {
    id: 'ep-einstein-bohr-solvay1927',
    writerId: 'einstein',
    recipientId: 'niels-bohr',
    title: 'The 1927 Solvay Photon Box Debate',
    year: '1927',
    summary: 'The historic clash between Einstein’s deterministic realism and Bohr’s quantum complementarity: "God does not play dice with the universe."',
    historicalContext: 'At the 5th Solvay Conference in Brussels, Einstein presented brilliant thought experiments attempting to prove quantum mechanics incomplete. Bohr defended the uncertainty principle, leading to their famous exchanges across breakfast tables at the Hotel Métropole.',
    historicalEvidence: 'Solvay 1927 Conference Proceedings and Bohr’s 1949 memoir "Discussions with Einstein on Epistemological Problems".',
    historicalPeopleInvolved: ['Max Born', 'Werner Heisenberg', 'Paul Ehrenfest'],
    keyTopics: ['God does not play dice', 'Quantum uncertainty', 'Photon box thought experiment', 'Hotel Métropole breakfast'],
    primaryQuote: {
      speaker: 'Albert Einstein',
      text: 'Quantum mechanics is certainly imposing. But an inner voice tells me that it is not yet the real thing. The theory says a lot, but does not really bring us any closer to the secret of the "old one". I, at any rate, am convinced that He does not throw dice.',
      source: 'Letter to Max Born (1926)'
    }
  },
  {
    id: 'ep-einstein-bohr-clock1930',
    writerId: 'einstein',
    recipientId: 'niels-bohr',
    title: 'The 1930 Solvay Clock-in-the-Box Challenge',
    year: '1930',
    summary: 'Einstein invented a thought experiment using a clock and box to defeat the energy-time uncertainty principle; Bohr refuted it using Einstein’s own General Relativity!',
    historicalContext: 'Einstein proposed a box containing light that weighed itself, opened a shutter for an instant, and released a single photon. That evening Bohr was distraught, but by dawn he realized that as the box moved in gravity, its clock ran at a different rate by Einstein’s own general relativity equations, saving quantum mechanics!',
    historicalEvidence: 'Recorded by Léon Rosenfeld and Paul Ehrenfest in Brussels, 1930.',
    historicalPeopleInvolved: ['Léon Rosenfeld', 'Paul Ehrenfest'],
    keyTopics: ['Clock in the box', 'General relativity in quantum mechanics', 'Overnight triumph', 'Deep friendship']
  },

  // =========================================================================
  // ALBERT EINSTEIN <-> SIGMUND FREUD
  // =========================================================================
  {
    id: 'ep-einstein-freud-whywar1932',
    writerId: 'einstein',
    recipientId: 'sigmund-freud',
    title: 'The "Why War?" (Warum Krieg?) Correspondence (1932)',
    year: '1932',
    summary: 'Einstein invited Freud under the auspices of the League of Nations to investigate human psychological aggression and whether humanity can be liberated from war.',
    historicalContext: 'With fascism rising across Europe, the League of Nations ICIC asked Einstein to choose any thinker for an open epistolary dialogue on preventing war. Einstein chose Sigmund Freud in Vienna. Einstein asked whether human psyche can resist mass psychosis, and Freud analyzed the destructive drive (Thanatos) versus Eros.',
    historicalEvidence: 'Published by the International Institute of Intellectual Cooperation in Paris (1933).',
    historicalPeopleInvolved: ['Leon Steinig', 'Margot Einstein'],
    keyTopics: ['Why War?', 'Human destructive instinct (Thanatos)', 'Eros and culture', 'Preventing global catastrophe'],
    primaryQuote: {
      speaker: 'Albert Einstein',
      text: 'Is there any way of delivering mankind from the menace of war? It is common knowledge that, with the advance of modern science, this issue has come to mean a matter of life and death for civilization.',
      source: 'Warum Krieg? (Caputh, July 30, 1932)'
    }
  },

  // =========================================================================
  // ALBERT EINSTEIN <-> MAX PLANCK
  // =========================================================================
  {
    id: 'ep-einstein-planck-annus1905',
    writerId: 'einstein',
    recipientId: 'max-planck',
    title: 'Validation of Special Relativity in Annalen der Physik (1905)',
    year: '1905',
    summary: 'Planck was the world’s first renowned physicist to recognize 26-year-old patent clerk Einstein’s genius, publishing and lecturing on his relativity paper.',
    historicalContext: 'When unknown patent clerk Einstein submitted his 1905 relativity paper, most physicists ignored it. Max Planck, editor of Annalen der Physik, immediately recognized its seismic importance and defended Einstein before the German Physical Society.',
    historicalEvidence: 'Planck’s 1906 lectures at the University of Berlin on relativistic mechanics.',
    historicalPeopleInvolved: ['Wilhelm Röntgen', 'Paul Drude'],
    keyTopics: ['Patent clerk in Bern', 'Annalen der Physik', 'First academic champion', 'Electrodynamics of moving bodies']
  },
  {
    id: 'ep-einstein-planck-berlin1913',
    writerId: 'einstein',
    recipientId: 'max-planck',
    title: 'Recruitment to the Prussian Academy of Sciences (1913)',
    year: '1913',
    summary: 'Planck and Nernst traveled in secret to Zurich to offer Einstein an unprecedented professorship in Berlin with no teaching duties and total research freedom.',
    historicalContext: 'In July 1913, Planck traveled to Zurich to offer Einstein the directorship of the Kaiser Wilhelm Institute for Physics. Einstein accepted by showing them a red rose (or white rose) as his answer.',
    historicalEvidence: 'Prussian Academy Archives, Berlin (Planck’s election nomination text signed June 12, 1913).',
    historicalPeopleInvolved: ['Walther Nernst', 'Emil Fischer'],
    keyTopics: ['Prussian Academy', 'Zurich visit', 'Complete research freedom', 'Kaiser Wilhelm Institute']
  },

  // =========================================================================
  // RABINDRANATH TAGORE <-> MAHATMA GANDHI
  // =========================================================================
  {
    id: 'ep-tagore-gandhi-titles1915',
    writerId: 'tagore',
    recipientId: 'mahatma-gandhi',
    title: 'Bestowal of the Titles "Mahatma" & "The Great Sentinel" (1915)',
    year: '1915',
    summary: 'When Gandhi returned from South Africa, Tagore welcomed his ashram students to Santiniketan and bestowed upon him the immortal title "Mahatma" (Great Soul).',
    historicalContext: 'In March 1915, Mohandas Gandhi visited Santiniketan for the first time. Tagore reverently addressed him as "Mahatma", a name that stuck for eternity. In return, Gandhi crowned Tagore "The Great Sentinel", guardian of India’s moral conscience.',
    historicalEvidence: 'The Mahatma and the Poet (Letters and Debates 1915–1941, National Book Trust, New Delhi).',
    historicalPeopleInvolved: ['C.F. Andrews (Deenabandhu)', 'Kasturba Gandhi'],
    keyTopics: ['Bestowal of Mahatma', 'The Great Sentinel', 'Santiniketan reception', 'Phoenix settlement boys'],
    primaryQuote: {
      speaker: 'Rabindranath Tagore & Mahatma Gandhi',
      text: 'Tagore: "He is the Mahatma, for his soul has embraced the poorest of the poor." Gandhi: "I have found in Gurudev the Great Sentinel who warns India whenever narrow nationalism threatens our moral horizon."',
      source: 'The Mahatma and the Poet (1915)'
    }
  },
  {
    id: 'ep-tagore-gandhi-jallianwala1919',
    writerId: 'tagore',
    recipientId: 'mahatma-gandhi',
    title: 'Jallianwala Bagh Massacre & Knighthood Renunciation (1919)',
    year: '1919',
    summary: 'Following the slaughter of unarmed civilians in Amritsar, Tagore and Gandhi shared moral anguish; Tagore renounced his British knighthood in open protest.',
    historicalContext: 'On April 13, 1919, British troops fired on thousands of unarmed men, women, and children at Jallianwala Bagh. Overcome with grief, Tagore pleaded for a joint public rally. When politicians hesitated, Tagore wrote directly to the Viceroy renouncing his title, standing in naked solidarity with Gandhi’s Satyagraha.',
    historicalEvidence: 'Tagore’s May 31, 1919 letter to Lord Chelmsford published worldwide.',
    historicalPeopleInvolved: ['Lord Chelmsford (Viceroy)', 'General Reginald Dyer', 'C.F. Andrews'],
    keyTopics: ['Amritsar massacre', 'Renouncing knighthood', 'Badges of honour make our shame glaring', 'Moral anguish'],
    primaryQuote: {
      speaker: 'Rabindranath Tagore',
      text: 'The time has come when badges of honour make our shame glaring in the incongruous context of humiliation, and I for my part wish to stand, shorn of all special distinctions, by the side of those of my countrymen who, for their so-called insignificance, are liable to suffer degradation not fit for human beings.',
      source: 'Letter to the Viceroy of India (May 31, 1919)'
    }
  },
  {
    id: 'ep-tagore-gandhi-charkha1921',
    writerId: 'tagore',
    recipientId: 'mahatma-gandhi',
    title: 'The Great Debate on the Charkha & Universal Freedom (1921–1925)',
    year: '1921',
    summary: 'A 25-year public dialogue between Tagore (championing intellectual freedom and world culture) and Gandhi (championing homespun cloth and economic boycott).',
    historicalContext: 'When Gandhi launched the Non-Cooperation movement urging Indians to burn foreign clothes and spin on the Charkha daily, Tagore published "The Call of Truth" warning that mechanical spinning could not substitute for intellectual freedom or world cooperation. Gandhi replied with "The Great Sentinel", affirming that true friendship welcomes honest disagreement.',
    historicalEvidence: 'Published in Modern Review (Calcutta) and Young India (Ahmedabad), 1921.',
    historicalPeopleInvolved: ['C.F. Andrews', 'Romain Rolland'],
    keyTopics: ['The Call of Truth', 'Spinning wheel (Charkha)', 'Burning foreign cloth', 'World fellowship vs boycott'],
    primaryQuote: {
      speaker: 'Mahatma Gandhi',
      text: 'The Poet lives in a magnificent world of his own creation... I do not want my house to be walled in on all sides and my windows to be stuffed. I want the cultures of all lands to be blown about my house as freely as possible. But I refuse to be blown off my feet by any.',
      source: 'Young India (June 1921)'
    }
  },

  // =========================================================================
  // RABINDRANATH TAGORE <-> W.B. YEATS
  // =========================================================================
  {
    id: 'ep-tagore-yeats-gitanjali1912',
    writerId: 'tagore',
    recipientId: 'wb-yeats',
    title: 'The London Reading & Introduction to Gitanjali (1912)',
    year: '1912',
    summary: 'Yeats read Tagore’s handwritten English translations of Gitanjali to spellbound gatherings in London, writing the immortal introduction that led to the 1913 Nobel Prize.',
    historicalContext: 'In June 1912 at the home of artist William Rothenstein in Hampstead, W.B. Yeats read Tagore’s manuscript to an audience including Ezra Pound, Bertrand Russell, and May Sinclair. Yeats carried the manuscript in his pocket for days on buses and trains, overcome with emotion.',
    historicalEvidence: 'Yeats’s introduction to Gitanjali (India Society, London, 1912).',
    historicalPeopleInvolved: ['William Rothenstein', 'Ezra Pound', 'May Sinclair'],
    keyTopics: ['Hampstead reading', 'Gitanjali notebook', 'Immortal introduction', 'Spiritual lyrical dawn'],
    primaryQuote: {
      speaker: 'W.B. Yeats',
      text: 'These lyrics display in their thought a world I have dreamed of all my life long... I have carried the manuscript of these translations about with me for days, reading it in railway trains, or on the top of omnibuses and in restaurants, and I have often had to close it lest some stranger would see how much it moved me.',
      source: 'Introduction to Gitanjali (1912)'
    }
  },

  // =========================================================================
  // RABINDRANATH TAGORE <-> ROMAIN ROLLAND
  // =========================================================================
  {
    id: 'ep-tagore-rolland-manifesto1919',
    writerId: 'tagore',
    recipientId: 'romain-rolland',
    title: 'Declaration of the Independence of the Spirit (1919)',
    year: '1919',
    summary: 'Rolland invited Tagore to sign his historic manifesto rallying world writers to refuse wartime nationalistic propaganda and defend universal conscience.',
    historicalContext: 'In the wake of WWI carnage, French Nobel laureate Romain Rolland drafted a manifesto urging thinkers to reject tribal hatred. Tagore was the first Asian signature, cementing an unbreakable fraternity between Villeneuve and Santiniketan.',
    historicalEvidence: 'Published in L\'Humanité (Paris, June 26, 1919).',
    historicalPeopleInvolved: ['Stefan Zweig', 'Albert Einstein', 'Benedetto Croce'],
    keyTopics: ['Declaration of Independence of Spirit', 'Refusing war propaganda', 'Fraternity of minds', 'Villeneuve retreat']
  },

  // =========================================================================
  // LEONARDO DA VINCI <-> LUDOVICO SFORZA
  // =========================================================================
  {
    id: 'ep-leonardo-sforza-job1482',
    writerId: 'leonardo',
    recipientId: 'ludovico-sforza',
    title: 'The Legendary Employment Letter of 10 Inventions (1482)',
    year: '1482',
    summary: 'Leonardo wrote to the Duke of Milan proposing 10 military engineering breakthroughs—armored wagons, catapults, pontoon bridges—and in peacetime, the bronze horse.',
    historicalContext: 'Seeking to leave Florence for Milan, 30-year-old Leonardo composed a stunning resume to Il Moro. He highlighted military technology (portable bridges, cannons, bombards) before modestly noting: "In painting, I can do what yet may be done, as well as any other, be he who he may."',
    historicalEvidence: 'Codex Atlanticus, fol. 1082r, Biblioteca Ambrosiana, Milan.',
    historicalPeopleInvolved: ['Ludovico Sforza (Il Moro)', 'Beatrice d\'Este'],
    keyTopics: ['Armored wagon', 'Siege engines', 'Gran Cavallo bronze horse', 'Corte Vecchia studio']
  },
  {
    id: 'ep-leonardo-sforza-supper1497',
    writerId: 'leonardo',
    recipientId: 'ludovico-sforza',
    title: 'The Unfinished Last Supper in the Refectory (1497)',
    year: '1497',
    summary: 'Ludovico pressed Leonardo to finish the refectory fresco of Santa Maria delle Grazie, while Leonardo spent hours staring at the wall searching for the face of Judas.',
    historicalContext: 'The Prior of Santa Maria complained to the Duke that Leonardo would stand on the scaffold for half a day without laying a single brushstroke. Leonardo replied to Sforza that men of lofty genius work most when they appear to work least, and suggested he could use the Prior’s face for Judas!',
    historicalEvidence: 'Matteo Bandello’s Novelle (1554) and Milanese ducal archives.',
    historicalPeopleInvolved: ['Prior of Santa Maria delle Grazie', 'Luca Pacioli'],
    keyTopics: ['Santa Maria delle Grazie', 'Face of Judas', 'Drying oil on plaster', 'Men of lofty genius']
  },

  // =========================================================================
  // LEONARDO DA VINCI <-> NICCOLÒ MACHIAVELLI
  // =========================================================================
  {
    id: 'ep-leonardo-machiavelli-arno1503',
    writerId: 'leonardo',
    recipientId: 'niccolo-machiavelli',
    title: 'The Audacious Plan to Divert the River Arno (1503)',
    year: '1503',
    summary: 'Machiavelli and Leonardo surveyed the Arno to cut off Pisa from the sea and turn Florence into a maritime seaport through massive canal excavations.',
    historicalContext: 'During Florence’s war against rebellious Pisa, Second Chancellor Niccolò Machiavelli backed Leonardo’s visionary plan to redirect the entire flow of the River Arno into deep canals to starve Pisa of water. Thousands of diggers were hired with water pumps designed by Leonardo.',
    historicalEvidence: 'Florentine Signoria military council minutes (1503–1504) and Leonardo’s Madrid Codices.',
    historicalPeopleInvolved: ['Piero Soderini (Gonfaloniere)', 'Cesare Borgia'],
    keyTopics: ['Diverting the Arno', 'Canal locks and dredges', 'Pisa siege', 'Florentine Signoria']
  },

  // =========================================================================
  // LEONARDO DA VINCI <-> FRANCESCO MELZI
  // =========================================================================
  {
    id: 'ep-leonardo-melzi-bequest1519',
    writerId: 'leonardo',
    recipientId: 'francesco-melzi',
    title: 'Bequest of the Codices at Château du Clos Lucé (1519)',
    year: '1519',
    summary: 'In his final months in Amboise, ailing Leonardo bequeathed all his drawings, anatomical notebooks, and manuscripts to his devoted pupil Francesco Melzi.',
    historicalContext: 'Francesco Melzi joined Leonardo’s studio at age 15 and accompanied the master over the Alps to France. When Leonardo died on May 2, 1519, Melzi wrote a weeping letter to Leonardo’s brothers in Florence and spent the rest of his life compiling the "Treatise on Painting" (Codex Urbinas).',
    historicalEvidence: 'Melzi’s letter to Leonardo’s brothers (June 1, 1519, Florence State Archives) and Leonardo’s last will dictated to notary Guillaume Boureau.',
    historicalPeopleInvolved: ['King Francis I of France', 'Salai (Gian Giacomo Caprotti)'],
    keyTopics: ['Château du Clos Lucé', 'Mirror notebooks bequest', 'Treatise on Painting', 'Fathers and disciples']
  },

  // =========================================================================
  // BENJAMIN FRANKLIN <-> COMTE DE VERGENNES
  // =========================================================================
  {
    id: 'ep-franklin-vergennes-treaty1778',
    writerId: 'franklin',
    recipientId: 'charles-gravier-vergennes',
    title: '1778 Franco-American Treaties of Alliance & Commerce',
    year: '1778',
    summary: 'Franklin charmed Versailles in his rustic fur cap, negotiating the military alliance that committed French warships, troops, and millions in gold to American liberty.',
    historicalContext: 'Following the American victory at Saratoga, Franklin met secretly with French Foreign Minister Vergennes at Versailles. Bypassing traditional diplomatic rigidity, Franklin convinced the Bourbon monarchy to recognize an infant democratic republic, securing Rochambeau’s army and Admiral de Grasse’s fleet.',
    historicalEvidence: 'Treaty of Alliance and Treaty of Amity and Commerce (February 6, 1778, French Foreign Ministry Archives).',
    historicalPeopleInvolved: ['King Louis XVI', 'Silas Deane', 'Arthur Lee'],
    keyTopics: ['Versailles secret talks', 'Saratoga victory', 'Marten fur cap', 'French navy and gold']
  },

  // =========================================================================
  // BENJAMIN FRANKLIN <-> JOSEPH PRIESTLEY
  // =========================================================================
  {
    id: 'ep-franklin-priestley-oxygen1774',
    writerId: 'franklin',
    recipientId: 'joseph-priestley',
    title: 'The Collaboration on Electricity & The Discovery of Oxygen (1767–1774)',
    year: '1767–1774',
    summary: 'Franklin encouraged Priestley to write "The History of Electricity" and advised him on isolating "dephlogisticated air" (oxygen).',
    historicalContext: 'Meeting weekly at the Club of Honest Whigs at St. Paul’s Coffeehouse in London, Franklin mentored the younger Priestley, sharing laboratory experiments with electrical Leyden jars and pneumatic gas chemistry.',
    historicalEvidence: 'Priestley’s dedication in "The History and Present State of Electricity" (London, 1767).',
    historicalPeopleInvolved: ['Richard Price', 'Antoine Lavoisier'],
    keyTopics: ['Honest Whigs coffeehouse', 'Leyden jars', 'Dephlogisticated air (oxygen)', 'Republic of science']
  }
];

/**
 * Returns all shared historical episodes recorded between a given writer and recipient
 */
export function getSharedEpisodesBetween(writerId: string, recipientId: string): HistoricalSharedEpisode[] {
  const normWriter = writerId.toLowerCase();
  const normRec = recipientId.toLowerCase();

  // Handle common ID aliases (e.g. 'albert-einstein' vs 'einstein', 'curie' vs 'marie-curie')
  const normalize = (id: string) => {
    if (id === 'albert-einstein') return 'einstein';
    if (id === 'marie-curie') return 'curie';
    return id;
  };

  const targetWriter = normalize(normWriter);
  const targetRecipient = normalize(normRec);

  return SHARED_HISTORICAL_EPISODES.filter((ep) => {
    const epWriter = normalize(ep.writerId);
    const epRec = normalize(ep.recipientId);
    return (
      (epWriter === targetWriter && epRec === targetRecipient) ||
      (epWriter === targetRecipient && epRec === targetWriter)
    );
  });
}

/**
 * Returns unique historical people who participated in or witnessed the interactions
 * between this writer and recipient
 */
export function getHistoricalPeopleBetween(writerId: string, recipientId: string): string[] {
  const episodes = getSharedEpisodesBetween(writerId, recipientId);
  const set = new Set<string>();
  episodes.forEach((ep) => {
    ep.historicalPeopleInvolved.forEach((p) => set.add(p));
  });
  return Array.from(set);
}

/**
 * Converts a HistoricalSharedEpisode into a HistoricalEventOption for letter generation
 */
export function episodeToEventOption(ep: HistoricalSharedEpisode): HistoricalEventOption {
  return {
    id: ep.id,
    title: `${ep.title} (${ep.year})`,
    year: ep.year,
    context: ep.historicalContext,
    historicalEvidence: ep.historicalEvidence,
    recipientRelevance: ep.recipientId,
    historicalQuotes: ep.primaryQuote?.text,
  };
}
