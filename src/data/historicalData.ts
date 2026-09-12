import { HistoricalFigure } from '../types';
import { EINSTEIN_FIGURE, TAGORE_FIGURE, TRIAD_RELATIONSHIPS, TRIAD_CENTER_NEXUS } from './triadData';

export { TRIAD_RELATIONSHIPS, TRIAD_CENTER_NEXUS };

const BASE_HISTORICAL_FIGURES: HistoricalFigure[] = [
  {
    id: 'leonardo',
    name: 'Leonardo da Vinci',
    epithet: 'The Universal Polymath & Florentine Master',
    country: 'Italy',
    countryAdjective: 'Italian',
    era: 'High Renaissance (c. 1490–1516)',
    years: '1452 – 1519',
    city: 'Milan / Florence / Amboise',
    historicalBio: 'Painter, military engineer, anatomist, and natural philosopher. Leonardo lived in a fragmented Italy divided into competing city-states (Milan, Florence, Venice, the Papacy) where intellectual patronage was the only means of securing studio space, bronze, and freedom from guild regulations.',
    mindsetQuote: 'Obstacles do not bend me; every obstacle yields to effort. He who possesses most must be most afraid of loss.',
    handwritingStyle: 'Left-handed sinistrorse mirrored script written with iron gall ink on linen rag paper',
    culturalContext: {
      socialOrder: 'Rigid patron-client hierarchies. Artists were skilled craftsmen attempting to elevate painting and mechanics into liberal arts above mere guilds.',
      communicationMedium: 'Handwritten manuscripts delivered by private ducal couriers on horseback. Letters could be intercepted, stolen, or lost in alpine passes.',
      scientificParadigm: 'Aristotelian empiricism challenged by direct anatomical dissection, fluid mechanics observation, and mechanical engineering.',
      dailyPace: 'Measured by church bells (canonical hours) and natural sunlight. Months were spent formulating single pigments or casting bronze.'
    },
    writingKit: {
      eraName: 'Renaissance Florentine / Milanese Scriptoria (Late 15th c.)',
      substrate: {
        name: 'Handmade Linen Rag Paper (Carta di Stracci)',
        material: 'Macerated linen fibers and hemp rags pressed in wire mesh frames, sized with animal gelatine.',
        description: 'Manufactured by paper mills in Fabriano or Salò. Watermarked with wire symbols, creamy ivory tone with visible deckle edges.',
        tactileDetail: 'Heavy, textured, slightly fibrous tooth that absorbs iron gall ink without feathering.',
        modernEquivalent: 'Equivalent to 300gsm handmade cotton rag watercolor paper; costs roughly $15 per single leaf in modern purchasing power.'
      },
      instrument: {
        name: 'Goose Feather Quill (Piuma d\'Oca)',
        material: 'Cured primary wing feather of a white goose, hardened in hot sand and slit with a tempered penknife (temperino).',
        description: 'Leonardo, being left-handed, cut the nib tip at a reverse oblique angle to prevent smearing his famous left-to-right mirror handwriting.',
        tactileDetail: 'Flexible, scratchy feedback on paper; requires recutting every two pages of dense writing.',
        modernEquivalent: 'A flexible calligraphy dip pen or precision stylus, but requiring constant sharpening and re-dipping every 15 words.'
      },
      ink: {
        name: 'Oak Gall & Vitriol Ink (Inchiostro Ferro-Gallico)',
        material: 'Tannins extracted from crushed Aleppo oak galls, mixed with green vitriol (iron sulfate) and gum arabic.',
        description: 'Goes on pale purplish-grey and oxidizes over days into deep brownish-black. Highly acidic, slowly etching into the paper over centuries.',
        tactileDetail: 'Smells of vinegar, iron, and earthy forest loam. Leaves a slight raised gloss where gum arabic dried thick.',
        modernEquivalent: 'Modern archival fountain pen ink, though contemporary inks are pH-neutral to avoid destroying the paper.'
      },
      dryingAgent: {
        name: 'Bone Sand Pounce Shaker (Polvere di Pietra Pomice & Polvere di Calce)',
        material: 'Finely ground cuttlefish bone or pumice powder in a perforated brass or wood caster.',
        description: 'Sprinkled over wet ink to absorb excess moisture before blowing it off, preventing smears when folding the folio.',
        tactileDetail: 'Fine, silken gritty dust that leaves a subtle matte finish across the ink strokes.',
        modernEquivalent: 'Blotting paper sheets or quick-drying solvent chemicals in modern ink cartridges.'
      },
      sealAndClosure: {
        name: 'Folded Letterlock & Red Beeswax Seal (Sigillo di Cera)',
        material: 'Purified beeswax blended with Venetian red cinnabar pigment and Venice turpentine.',
        description: 'Folded intricately through paper cuts (letterlocking) with no envelope. The molten wax was impressed with Leonardo\'s personal monogram signet.',
        tactileDetail: 'Brittle, glossy vermilion seal that must be cracked to open, guaranteeing tamper-evident security.',
        modernEquivalent: 'Tamper-evident security tape, encrypted email signatures, or biometric lock.'
      },
      transitCourier: {
        method: 'Ducal mounted courier (Staffetta) across the Po Valley or over the Alps',
        speedEstimate: '30 to 45 miles per day; 4 to 12 days between Milan, Florence, or Rome.',
        risks: 'Banditry, highway tolls, rain damaging parchment saddlebags, interception by French or Papal spies.',
        modernDiff: 'Compared to a 0.04-second WhatsApp message, a letter was an expensive statecraft investment taking half a month.'
      }
    },
    recipients: [
      {
        id: 'ludovico-sforza',
        name: 'Ludovico Sforza ("Il Moro")',
        title: 'Duke of Milan & Leonardo\'s Grand Patron',
        relation: 'Supreme Patron & Sovereign Ruler',
        relationType: 'patron',
        location: 'Castello Sforzesco, Milan',
        transitDays: 'Local page delivery within 2 hours, or 3 days during military campaign',
        transitRisk: 'Court intrigues, intercepted by rival courtiers or French sympathizers',
        stakes: 'Funding for the bronze equestrian monument (Il Cavallo), court salary, and protection from guild complaints.',
        survivingArtifactNote: 'Referenced in Codex Atlanticus folio 391r: Leonardo\'s famous 10-point employment letter outlining armored cars, catapults, and painting.',
        historicalConnection: 'Leonardo served Sforza for 17 years as military architect, court pageanteer, and painter of The Last Supper.'
      },
      {
        id: 'niccolo-machiavelli',
        name: 'Niccolò Machiavelli',
        title: 'Secretary to the Second Chancery of Florence',
        relation: 'Strategic Collaborator & Florentine Diplomat',
        relationType: 'political',
        location: 'Palazzo della Signoria, Florence',
        transitDays: '5 to 7 days via mounted courier across the Apennines',
        transitRisk: 'Highway ambushes by roving mercenary condottieri',
        stakes: 'The bold, radical engineering scheme to divert the River Arno away from rival Pisa to starve them of water.',
        survivingArtifactNote: 'Machiavelli’s letters in 1503 describe inspecting the Arno canal earthworks alongside maestro Leonardo.',
        historicalConnection: 'Both men served Cesare Borgia in Romagna in 1502, forming a mutual admiration of hard-nosed realism and mechanics.'
      },
      {
        id: 'francesco-melzi',
        name: 'Francesco Melzi',
        title: 'Beloved Disciple & Milanese Nobleman',
        relation: 'Devoted Pupil, Adopted Son & Custodian of Codices',
        relationType: 'disciple',
        location: 'Villa Melzi, Vaprio d\'Adda / Milan',
        transitDays: '1 to 2 days along the Naviglio canal',
        transitRisk: 'Low, trusted domestic boat courier',
        stakes: 'Safeguarding Leonardo’s thousands of pages of anatomical, botanical, and mechanical manuscripts after his death.',
        survivingArtifactNote: 'Melzi lovingly transcribed Leonardo’s disparate notes into the Codex Urbinas Latinus (Treatise on Painting).',
        historicalConnection: 'Melzi accompanied Leonardo to Rome and France (Amboise), caring for him until his death in 1519.'
      },
      {
        id: 'isabella-deste',
        name: 'Isabella d\'Este',
        title: 'Marchioness of Mantua & Supreme Art Connoisseur',
        relation: 'Tenacious Patron & Renaissance Matron',
        relationType: 'peer',
        location: 'Palazzo Ducale, Mantua',
        transitDays: '3 to 4 days across Lombardy wetlands',
        transitRisk: 'Diplomatic courier interception by Ferrara rivals',
        stakes: 'Evading her relentless demands for a promised oil portrait while maintaining her invaluable courtly favor.',
        survivingArtifactNote: 'Surviving correspondence from 1501 to 1506 in the Mantua State Archives captures her repeated pleas to Leonardo.',
        historicalConnection: 'Isabella was the most cultivated woman of Renaissance Italy, possessing an insatiable studiolo of masterpieces.'
      }
    ],
    suggestedEvents: [
      {
        id: 'event-last-supper',
        title: 'The Unfinished Refectory of Santa Maria delle Grazie (1497)',
        year: '1497',
        context: 'The Prior of the Dominican monastery is complaining bitterly to Duke Sforza that Leonardo spends entire days staring at the wall without applying a single brushstroke, while Leonardo ponders the villainous face of Judas.',
        historicalEvidence: 'Documented by Matteo Bandello and Giorgio Vasari: Leonardo explained that men of genius sometimes accomplish the most when they work least.',
        recipientRelevance: 'ludovico-sforza',
        historicalQuotes: '“I still have not found the face for Judas... unless I make use of the face of that indiscreet Prior who complains so loudly.”'
      },
      {
        id: 'event-diverting-arno',
        title: 'The Great Arno River Diversion Project (1503)',
        year: '1503',
        context: 'Leonardo and Machiavelli propose to the Florentine Republic to dig two massive canals to redirect the River Arno away from besieging Pisa, cutting off its access to the sea and irrigating the Florentine valley.',
        historicalEvidence: 'Florence state council records (Provvisioni) and Leonardo’s maps in the Madrid Codices show the detailed hydraulic leveling.',
        recipientRelevance: 'niccolo-machiavelli',
        historicalQuotes: '“Water is the driving force of all nature; to master it is to dictate the fate of cities.”'
      },
      {
        id: 'event-mona-lisa-anatomy',
        title: 'Anatomical Revelations in the Hospital of Santa Maria Nuova (1508)',
        year: '1508',
        context: 'In candlelit hospital mortuaries, Leonardo dissects human facial muscles to understand the exact nerves that move the lips for smiles, paralleling his secretive portrait of Lisa Gherardini.',
        historicalEvidence: 'Windsor Royal Collection anatomical folios RCIN 919054 showing the orbicularis oris muscles and cranial nerves.',
        recipientRelevance: 'francesco-melzi',
        historicalQuotes: '“Describe the tongue, which muscles move it, and how the nerves branch from the brain to cause the smile.”'
      },
      {
        id: 'event-isabella-delay',
        title: 'The Elusive Portrait and the Alchemical Pigments (1504)',
        year: '1504',
        context: 'Leonardo writes to the Marchioness of Mantua apologizing for the delay of her portrait, citing deep optics studies and the unreliability of lapis lazuli and walnut oil drying times.',
        historicalEvidence: 'A letter from fra Pietro da Novellara to Isabella d\'Este reporting that Leonardo is weary of the paintbrush and captivated by geometry.',
        recipientRelevance: 'isabella-deste',
        historicalQuotes: '“He is working at geometry and has no patience with the brush.”'
      }
    ],
    availableTones: [
      {
        id: 'courtly-deference',
        label: 'Courtly Deference & Ingenuity',
        description: 'Humble submission to princely lordship paired with bold promises of unmatched mechanical superiority.',
        eraEtiquetteRule: 'Must open with "Illustrissimo et Eccellentissimo Signore" and conclude kissing the Duke’s hem.'
      },
      {
        id: 'intellectual-socratic',
        label: 'Empirical Socratic Rigor',
        description: 'Direct, observational, analyzing hydraulic laws, mathematics, and tactical realities without superstition.',
        eraEtiquetteRule: 'Appeals to natural law (Natura) rather than Scholastic dogma or Latin scripture.'
      },
      {
        id: 'paternal-tender',
        label: 'Paternal & Philosophical',
        description: 'Tender affection toward an apprentice, reflecting on the brevity of mortal life and the sanctity of observation.',
        eraEtiquetteRule: 'Familiar vernacular Italian, blending master-artisan advice with genuine filial warmth.'
      },
      {
        id: 'diplomatic-evasive',
        label: 'Diplomatically Evasive & Polite',
        description: 'Flattering the patron’s refined taste while skillfully inventing excuses for delayed artistic commissions.',
        eraEtiquetteRule: 'Excessive courtesy used as a shield against noble entitlement and contractual pressure.'
      }
    ],
    availableMoods: [
      {
        id: 'feverish-curiosity',
        label: 'Feverish Curiosity',
        emotionalState: 'Mind racing across optics, anatomy, and vortex mechanics; impatient with slow human hands.',
        subtext: 'Obsessed with the fundamental laws of nature rather than finishing commercial canvases.'
      },
      {
        id: 'pragmatic-urgency',
        label: 'Pragmatic Wartime Urgency',
        emotionalState: 'Aware that French cannons are marching and survival depends on iron fortifications and drainage.',
        subtext: 'The harsh reality of Italian Renaissance warfare overrules artistic contemplation.'
      },
      {
        id: 'wistful-weariness',
        label: 'Wistful & Weary',
        emotionalState: 'Feeling the burden of aging eyes, stiff fingers, and the vast ocean of unwritten knowledge.',
        subtext: 'Fear that his notebooks will be scattered like autumn leaves before they can be organized.'
      }
    ],
    researchKeywords: [
      { id: 'kw-arno', label: 'River Arno Canalization', category: 'science', historicalFact: 'Leonardo designed dual diversion channels with sluice gates at Serravalle.' },
      { id: 'kw-pigments', label: 'Lapis Lazuli & Walnut Oil', category: 'art', historicalFact: 'Finest ultramarine was mined in Badakhshan (Afghanistan) and cost more than gold per ounce.' },
      { id: 'kw-anatomy', label: 'Orbicularis Oris Dissections', category: 'science', historicalFact: 'Dissected over 30 cadavers at Santa Maria Nuova and Milan hospitals by candlelight.' },
      { id: 'kw-equestrian', label: 'Gran Cavallo 70-Ton Bronze', category: 'art', historicalFact: 'Sforza diverted Leonardo\'s stockpiled bronze to make cannons against Charles VIII.' },
      { id: 'kw-mirror-script', label: 'Sinistral Mirror Hand', category: 'philosophy', historicalFact: 'Wrote left-to-right backwards to keep ink from smudging and to prevent casual reading by prying eyes.' },
      { id: 'kw-mechanics', label: 'Perpetual Motion Fallacy', category: 'science', historicalFact: 'Leonardo proved perpetual motion wheels impossible centuries before thermodynamics.' }
    ]
  },
  {
    id: 'curie',
    name: 'Marie Skłodowska-Curie',
    epithet: 'Pioneer of Radioactivity & Double Nobel Laureate',
    country: 'France / Poland',
    countryAdjective: 'Franco-Polish',
    era: 'Belle Époque & Modern Atomic Genesis (c. 1903–1915)',
    years: '1867 – 1934',
    city: 'Paris (Sorbonne & Radium Institute)',
    historicalBio: 'Physicist and chemist who coined the term "radioactivity", discovered Polonium and Radium, and remains the only person to win Nobel Prizes in two distinct scientific fields (Physics 1903, Chemistry 1911). She endured xenophobic hostility in Paris, laboratory poverty, and severe radiation poisoning while refusing to patent her purification method so science could advance freely.',
    mindsetQuote: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
    handwritingStyle: 'Disciplined, upright French cursive written with a steel nib fountain pen on Sorbonne-stamped laid paper',
    culturalContext: {
      socialOrder: 'Third Republic France. Deep institutional misogyny—the Académie des Sciences refused to admit women. Rise of popular sensationalist press alongside intense scientific positivism.',
      communicationMedium: 'Bicycle telegrams (pneumatique tubes in Paris), international train postal express with daily postmarks, and academic reprints (tirés à part).',
      scientificParadigm: 'Classical Newtonian physics shattering before the discovery of subatomic decay, X-rays, and the birth of quantum mechanics.',
      dailyPace: 'Industrial clock time. Relentless 14-hour laboratory shifts stirring boiling cauldrons of pitchblende in a leaky wooden hangar.'
    },
    writingKit: {
      eraName: 'Belle Époque Parisian Academic & Laboratory (Early 20th c.)',
      substrate: {
        name: 'Sorbonne Laboratory Laid Paper (Papier Vergé)',
        material: 'Wood pulp and rag mixture with subtle parallel laid lines and embossed Sorbonne Faculty watermark.',
        description: 'Standard French university epistolary paper. Occasionally showed faint radiographic fogging on photographic plates if stored near radium vials.',
        tactileDetail: 'Crisp, lightweight, smooth surface optimized for rapid steel nib writing.',
        modernEquivalent: 'Premium 90gsm fountain pen stationery like Clairefontaine or Rhodia.'
      },
      instrument: {
        name: 'Steel Dip Pen & Waterman Safety Fountain Pen (Plume d\'Acier)',
        material: 'Hardened pressed steel nib mounted in an ebonite hard-rubber reservoir pen.',
        description: 'Marie carried a hard-rubber pocket pen into the laboratory. Her fingertips were permanently scarred and cracked from radium burns.',
        tactileDetail: 'Firm, uniform stroke with rhythmic scratching on paper; hands slightly trembling from radiation fatigue.',
        modernEquivalent: 'A modern fine-nib piston fountain pen or archival rollerball.'
      },
      ink: {
        name: 'French Black Carbon & Ferro-Tannate Ink (Encre Noire Française)',
        material: 'Suspension of purified lampblack carbon and iron gall salts stabilized with gum arabic.',
        description: 'Deep matte black, resistant to moisture and chemical fumes in the laboratory shed.',
        tactileDetail: 'Dries quickly with minimal bleed; faintly acidic aroma mixed with ozone and carbolic acid.',
        modernEquivalent: 'Carbon black archival pigment ink.'
      },
      dryingAgent: {
        name: 'Laboratory Rocker Blotter (Buvard à Bascule)',
        material: 'Porous un-sized cellulose blotting paper stretched over a curved mahogany rocker.',
        description: 'Pressed gently across wet handwriting to absorb surplus ink without smearing the precise mathematical notations.',
        tactileDetail: 'Soft, cushioned roll across the paper leaving dry, crisp ink lines instantly.',
        modernEquivalent: 'Quick-drying solvent ink or inkjet paper coating.'
      },
      sealAndClosure: {
        name: 'Gummed Envelope with French Postal Stamp & Paris Postmark',
        material: 'Factory-manufactured wove paper envelope with pre-gummed adhesive flap and Marianne/Sower postage stamp.',
        description: 'Stamped with circular black postmark: "Paris 5e - Rue d\'Ulm". Confidential letters were sealed with red resin wax imprint.',
        tactileDetail: 'Smooth glued edge, paper easily slit open with an ivory desk letter-opener.',
        modernEquivalent: 'Pre-franked business envelope or registered postal delivery.'
      },
      transitCourier: {
        method: 'French National Post (PTT) & Trans-European Express Steam Rail',
        speedEstimate: 'Same-day delivery across Paris via pneumatic tube; 24 hours to London; 36 hours to Warsaw.',
        risks: 'Cabinet Noir inspection during espionage scares; sensationalist press reporters bribing postal couriers.',
        modernDiff: 'Compared to today\'s Slack or email, mail arrived twice daily with ceremonial opening rituals.'
      }
    },
    recipients: [
      {
        id: 'albert-einstein',
        name: 'Albert Einstein',
        title: 'Theoretical Physicist, Patent Clerk Turned Genius',
        relation: 'Esteemed Peer & Lifelong Intellectual Ally',
        relationType: 'peer',
        location: 'Prague / Zurich / Berlin',
        transitDays: '2 to 3 days by trans-European mail train',
        transitRisk: 'Postal scrutiny by German and Austro-Hungarian authorities',
        stakes: 'Debating quantum radiation, Brownian motion, and solidarity against anti-Semitic and misogynist press attacks.',
        survivingArtifactNote: 'Einstein\'s famous 1911 letter to Marie: "If the rabble continues to occupy itself with you, simply don’t read that hogwash..."',
        historicalConnection: 'Both attended the first Solvay Conference in Brussels (1911) and hiked together in the Swiss Alps.'
      },
      {
        id: 'bronislawa-dluska',
        name: 'Bronisława Dłuska (née Skłodowska)',
        title: 'Older Sister, Physician & Director of Sanatorium',
        relation: 'Beloved Sister & Co-conspirator of Education',
        relationType: 'kinship',
        location: 'Zakopane / Warsaw, Poland (Russian Empire)',
        transitDays: '3 to 5 days across Russian imperial borders',
        transitRisk: 'Imperial Russian tsarist postal censorship of Polish-language letters',
        stakes: 'Fulfilling their youthful pact: Bronia became a doctor while Marie worked as a governess; now building the Warsaw Radium Institute.',
        survivingArtifactNote: 'Surviving correspondence held in the Maria Skłodowska-Curie Museum in Warsaw, filled with tender family updates.',
        historicalConnection: 'Their sisterly bond overcame extreme poverty, Russian imperial oppression, and personal tragedy.'
      },
      {
        id: 'ernest-rutherford',
        name: 'Lord Ernest Rutherford',
        title: 'Pioneer of the Nuclear Atom & Manchester Professor',
        relation: 'Respected Rival, Collaborator & Atomic Pioneer',
        relationType: 'peer',
        location: 'University of Manchester, England',
        transitDays: '24 to 36 hours via Channel packet boat and British rail',
        transitRisk: 'Damage to delicate glass ampoules and spectroscopic data sheets',
        stakes: 'Establishing an international radium measurement standard (the Curie unit) and tracking uranium decay chains.',
        survivingArtifactNote: 'Surviving letters at Cambridge University Library debating the ionization properties of alpha rays.',
        historicalConnection: 'Rutherford championed Marie’s second Nobel prize and hosted her at his laboratory in Manchester.'
      },
      {
        id: 'paul-painleve',
        name: 'Paul Painlevé',
        title: 'Mathematician & French Minister of Inventions/War',
        relation: 'Political Ally & Fellow Academic',
        relationType: 'political',
        location: 'Ministère de la Guerre, Paris',
        transitDays: 'Same-day pneumatic dispatch across Paris',
        transitRisk: 'Wartime bureaucratic interception and military secrecy',
        stakes: 'Requisitioning vehicles to build mobile radiographic ambulances ("Petites Curies") to save soldiers from amputations at the Marne.',
        survivingArtifactNote: 'Marie personally drove the X-ray vans to the front lines, training 150 female radiographic operators.',
        historicalConnection: 'Painlevé bypassed military inertia to grant Marie military passes and gasoline rations.'
      },
      {
        id: 'tagore',
        name: 'Rabindranath Tagore',
        title: 'Poet-Philosopher, Nobel Laureate & Founder of Visva-Bharati',
        relation: 'Esteemed Brother in Global Intellectual Emancipation',
        relationType: 'peer',
        location: 'Santiniketan, Bengal, India / Paris',
        transitDays: '10 to 12 days via P&O steam packet to Marseille and Paris express',
        transitRisk: 'Customs inspections and post-war French administrative delays',
        stakes: 'Fostering international education, moral responsibility in science, and supporting the League of Nations ICIC.',
        survivingArtifactNote: 'Letters and documented addresses delivered during Tagore’s visits to Paris in 1920, 1921, and 1930.',
        historicalConnection: 'Both were early pioneering Nobel laureates breaking Western imperial monopolies; both served the League of Nations ICIC.'
      }
    ],
    suggestedEvents: [
      {
        id: 'event-league-icic-geneva',
        title: 'League of Nations ICIC Assembly in Geneva (1922)',
        year: '1922',
        context: 'Marie Curie takes her seat as Vice-President of the International Committee on Intellectual Cooperation in Geneva alongside Albert Einstein and international delegates, arguing that science recognizes no borders.',
        historicalEvidence: 'League of Nations Archives, Series 13C (ICIC Plenary Minutes 1922–1926).',
        recipientRelevance: 'albert-einstein',
        historicalQuotes: '“Intellectual cooperation is the true guarantee of world peace, for science recognizes no borders or conquerors.”'
      },
      {
        id: 'event-pitchblende-refining',
        title: 'The Unbearable Stench of the Shed on Rue Lhomond (1902)',
        year: '1902',
        context: 'After four grueling years in an unheated glass-roofed shed, boiling tons of uranium pitchblende waste from Bohemia, Marie successfully isolates 0.1 gram of pure radium chloride, watching it glow in the dark.',
        historicalEvidence: 'Marie’s laboratory notebooks from 1902 (still dangerously radioactive today at the Bibliothèque nationale de France).',
        recipientRelevance: 'bronislawa-dluska',
        historicalQuotes: '“One of our joys was to go into our workroom at night; the glowing tubes looked like faint fairy lights.”'
      },
      {
        id: 'event-solvay-conference',
        title: 'The First Solvay Council and the Quantum Storm (1911)',
        year: '1911',
        context: 'Marie sits as the sole woman among Lorentz, Planck, Einstein, and Rutherford at the Hotel Métropole in Brussels, debating whether the classical atom is dissolving into discrete energy packets.',
        historicalEvidence: 'The iconic 1911 Solvay Conference photograph taken by Benjamin Couprie, where Marie is engrossed in manuscript discussion with Poincaré.',
        recipientRelevance: 'albert-einstein',
        historicalQuotes: '“Radioactivity is an atomic property; each atom carries within itself the secret of its own transformation.”'
      },
      {
        id: 'event-radium-standard',
        title: 'The International Radium Standard in a Sealed Quartz Tube (1912)',
        year: '1912',
        context: 'Marie prepares the official primary world standard: exactly 21.99 milligrams of pure radium chloride deposited in a sealed glass tube in Paris to calibrate all medical therapies globally.',
        historicalEvidence: 'Bureau International des Poids et Mesures (BIPM) records of the primary Curie standard.',
        recipientRelevance: 'ernest-rutherford',
        historicalQuotes: '“We must not allow our work to be divided by national prestige; the radium belongs to all humanity.”'
      },
      {
        id: 'event-petites-curies-front',
        title: 'The Battle of the Marne & The "Petites Curies" Ambulances (1914)',
        year: '1914',
        context: 'As German armies advance on Paris, Marie strips the Radium Institute of its X-ray equipment, installs dynamos into donated Peugeot cars, and drives directly to the front to locate shrapnel inside dying soldiers.',
        historicalEvidence: 'Marie’s wartime monograph "La Radiologie et la Guerre" (1921) documenting over 1 million wounded soldiers X-rayed.',
        recipientRelevance: 'paul-painleve',
        historicalQuotes: '“I am resolved to put all my strength at the service of my adopted country, since I cannot do anything for my native land now.”'
      }
    ],
    availableTones: [
      {
        id: 'scientific-stoic',
        label: 'Empirical Rigor & Stoic Precision',
        description: 'Stripped of flowery rhetoric; focused on numerical purity, chemical reactions, and unvarnished truth.',
        eraEtiquetteRule: 'French academic formality: courteous addressing, rigorous logic, devoid of personal self-pity.'
      },
      {
        id: 'fierce-solidarity',
        label: 'Intimate Solidarity & Defiance',
        description: 'A deep, protective loyalty between intellectual equals defying societal prejudice and institutional hostility.',
        eraEtiquetteRule: 'Warm colloquial French or Polish, sharing inner vulnerability while maintaining resolute dignity.'
      },
      {
        id: 'urgent-humanitarian',
        label: 'Urgent Wartime Determination',
        description: 'Impatient with bureaucratic foot-dragging; demanding immediate vehicles, fuel, and tubes for frontline medicine.',
        eraEtiquetteRule: 'Direct civic duty: combining military urgency with the indisputable authority of science.'
      }
    ],
    availableMoods: [
      {
        id: 'quietly-indomitable',
        label: 'Quietly Indomitable',
        emotionalState: 'Physically exhausted and radiation-burned, yet possessing an unshakeable inner compass.',
        subtext: 'Refuses to succumb to grief, press scandals, or illness when work remains to be finished.'
      },
      {
        id: 'intellectual-exultation',
        label: 'Electrified by Discovery',
        emotionalState: 'Awe in the face of nature’s hidden subatomic machinery glowing in the twilight.',
        subtext: 'Convinced that radioactive energy holds the fundamental secret of the universe.'
      },
      {
        id: 'homesick-nostalgia',
        label: 'Homesick Nostalgia (Żal)',
        emotionalState: 'A profound Polish longing for the Vistula river, pine forests, and family left behind under tsarist rule.',
        subtext: 'Even at the pinnacle of French fame, her heart remains Maria Skłodowska of Warsaw.'
      }
    ],
    researchKeywords: [
      { id: 'kw-pitchblende', label: 'Bohemian Pitchblende (Pechblende)', category: 'science', historicalFact: 'Extracted from St. Joachimsthal silver mines; Marie processed over 10 tons with iron rods.' },
      { id: 'kw-luminescence', label: 'Spontaneous Phosphorescence', category: 'science', historicalFact: 'Radium emits continuous alpha and gamma rays, illuminating zinc sulfide screens.' },
      { id: 'kw-polonium', label: 'Naming Polonium (Element 84)', category: 'politics', historicalFact: 'Named in 1898 to highlight the plight of partitioned Poland, the first chemical element named for a political cause.' },
      { id: 'kw-patent-refusal', label: 'Refusal to Patent Radium', category: 'philosophy', historicalFact: 'Marie and Pierre chose not to patent their extraction method, giving up millions in royalties for scientific progress.' },
      { id: 'kw-petites-curies', label: 'Mobile Radiographic Ambulances', category: 'science', historicalFact: 'Equipped 20 vehicles and 200 field hospitals with X-ray dynamos powered by car engines.' }
    ]
  },
  {
    id: 'franklin',
    name: 'Benjamin Franklin',
    epithet: 'The American Diplomat, Printer & Sage of the Enlightenment',
    country: 'United States',
    countryAdjective: 'American',
    era: 'Enlightenment & Transatlantic Revolution (c. 1775–1784)',
    years: '1706 – 1790',
    city: 'Philadelphia / Passy (Paris Embassy)',
    historicalBio: 'Printer, scientist, inventor of the lightning rod and bifocals, and sole signatory of all four founding documents of the United States. During the American Revolution, he served in Paris as envoy to the court of Louis XVI, using his fame, wit, and rustic fur cap to charm French nobility into financing the American war of independence.',
    mindsetQuote: 'They who can give up essential liberty to obtain a little temporary safety, deserve neither liberty nor safety. Either write something worth reading, or do something worth the writing.',
    handwritingStyle: 'Sturdy, confident 18th-century English Roundhand script written with a sharpened turkey feather quill',
    culturalContext: {
      socialOrder: 'Ancien Régime Versailles juxtaposed against American republican egalitarianism. Franklin played the "simple American Quaker philosopher" to perfection in French high society.',
      communicationMedium: 'Transatlantic packet ships sailing between Le Havre, Bristol, and Philadelphia. Mail required 6 to 10 weeks to cross the ocean, vulnerable to British Royal Navy privateers.',
      scientificParadigm: 'The Age of Reason. Natural philosophy, electrical fluids, ballooning aerostation, and social compact political theory.',
      dailyPace: 'Governed by tide and wind for transatlantic dispatches; daily rounds of Parisian intellectual salons, coffee houses, and printing presses.'
    },
    writingKit: {
      eraName: '18th-Century Anglo-American Colonial & Diplomatic (Late 1700s)',
      substrate: {
        name: 'Heavy Dutch Linen Rag Paper (Whatman or Van Gelder)',
        material: 'High-grade linen rag fiber beaten by water stamps, dried on wool felts with clear chain lines and crowned watermarks.',
        description: 'Franklin was a master printer and obsessed with paper quality. Imported fine Dutch laid paper to his residence in Passy.',
        tactileDetail: 'Crisp, resonant snap when folded; smooth hard surface that resists quill scratches.',
        modernEquivalent: 'Handmade 120gsm laid writing paper.'
      },
      instrument: {
        name: 'Sharpened Turkey or Goose Feather Quill (Penna Anserina)',
        material: 'Flight feather from a Pennsylvania wild turkey or European swan, tempered in hot sand and cut with an English penknife.',
        description: 'Cut with a square nib tip to create the contrast between thick downstrokes and thin flourishes typical of 18th-century Roundhand.',
        tactileDetail: 'Supple springiness; ink flows smoothly under steady rhythmic arm pressure.',
        modernEquivalent: 'A stub or broad-edge calligraphy nib.'
      },
      ink: {
        name: 'Colonial Iron-Gall & Lampblack Ink',
        material: 'Boiled Aleppo galls, ferrous sulfate, gum arabic, and beer or rain water.',
        description: 'Rich dark chestnut brown that darkens to velvet black. Franklin often brewed his own proprietary ink formulas in his Philadelphia print shop.',
        tactileDetail: 'Leaves slight aromatic cedar and wine tannin scent on the parchment.',
        modernEquivalent: 'Classic iron-gall dip ink.'
      },
      dryingAgent: {
        name: 'Brass Sand Caster with Black Pounce (Polvere Nera)',
        material: 'Perforated polished brass shaker containing finely ground volcanic sand or calcined slate.',
        description: 'Shaken across fresh ink lines to absorb excess liquid before folding the folio for sea transit.',
        tactileDetail: 'Dark mineral sand sparkles slightly under candlelight before being shaken back into the caster.',
        modernEquivalent: 'Heavy blotting paper or laser toner fixation.'
      },
      sealAndClosure: {
        name: 'Carmine Sealing Wax with Franklin Signet Ring',
        material: 'Shellac resin, Venice turpentine, and vermilion pigment formed into sticks.',
        description: 'Melted over a candle flame onto the folded edges, stamped with Franklin’s personal crest or a lightning rod motif.',
        tactileDetail: 'Hard, glossy seal with deep crisp impressions of the signet ring.',
        modernEquivalent: 'Digital cryptographic signature or encrypted hash.'
      },
      transitCourier: {
        method: 'Transatlantic armed packet boat & dispatch rider across colonial post roads',
        speedEstimate: '6 to 10 weeks across the Atlantic; letters were duplicated in triplicate across multiple ships in case of British capture.',
        risks: 'Interception by British Royal Navy frigates, pirate capture, shipwreck, water damage in mail sacks.',
        modernDiff: 'Compared to today\'s instantaneous global fiber-optic cables, a reply to a question took a minimum of three to four months.'
      }
    },
    recipients: [
      {
        id: 'george-washington',
        name: 'General George Washington',
        title: 'Commander-in-Chief of the Continental Army',
        relation: 'Patriotic Brother & Military Leader',
        relationType: 'political',
        location: 'Valley Forge / Continental Army Headquarters, USA',
        transitDays: '6 to 9 weeks across the Atlantic via French blockade runner',
        transitRisk: 'High risk of capture by British Admiral Howe’s naval blockade',
        stakes: 'Securing secret French ammunition shipments, Rochambeau’s troops, and the French fleet under De Grasse.',
        survivingArtifactNote: 'Franklin’s letters to Washington held in the Library of Congress, frequently marked "Duplicate" and written in diplomatic cipher.',
        historicalConnection: 'Franklin’s diplomatic triumph in Paris provided the gunpowder and naval artillery that won Yorktown.'
      },
      {
        id: 'thomas-jefferson',
        name: 'Thomas Jefferson',
        title: 'Author of the Declaration of Independence & Virginia Governor',
        relation: 'Philosophical Disciple, Colleague & Fellow Sage',
        relationType: 'peer',
        location: 'Monticello / Richmond, Virginia',
        transitDays: '7 to 10 weeks across the Atlantic',
        transitRisk: 'Interception by British naval cruisers patrolling the Chesapeake Bay',
        stakes: 'Debating the social contract, the drafting of state constitutions, and mutual fascination with fossil bones and meteorology.',
        survivingArtifactNote: 'The famous exchange when Jefferson replaced Franklin in Paris: "I succeed him; no one can replace him."',
        historicalConnection: 'Together on the Committee of Five that drafted the Declaration in Philadelphia in June 1776.'
      },
      {
        id: 'madame-brillon',
        name: 'Madame Brillon de Jouy (Anne-Louise)',
        title: 'French Harpsichordist, Composer & Parisian Salonnière',
        relation: 'Charming Intimate Friend & Intellectual Confidante',
        relationType: 'peer',
        location: 'Passy / Paris, France',
        transitDays: 'Same-day servant foot courier between neighboring estates in Passy',
        transitRisk: 'Court gossip among Parisian aristocratic circles',
        stakes: 'Playing chess twice a week, exchanging playful philosophical bagatelles ("The Ephemera", "Dialogue Between Franklin and the Gout").',
        survivingArtifactNote: 'Over 130 surviving witty bilingual letters preserved in the American Philosophical Society in Philadelphia.',
        historicalConnection: 'She epitomized the Parisian elite who embraced Franklin as the living embodiment of Rousseau\'s natural philosopher.'
      },
      {
        id: 'joseph-priestley',
        name: 'Dr. Joseph Priestley',
        title: 'English Dissident, Theologian & Discoverer of Oxygen',
        relation: 'Scientific Brother & Enlightenment Thinker',
        relationType: 'peer',
        location: 'Birmingham / London, England (War Opponent)',
        transitDays: '3 to 5 days via diplomatic pouch or neutral Dutch packet boat',
        transitRisk: 'High treason charges if letters appeared to convey military secrets across enemy lines',
        stakes: 'Maintaining the international Republic of Letters across warring nations; sharing discoveries on dephlogisticated air and electricity.',
        survivingArtifactNote: 'Franklin’s 1780 letter to Priestley lamenting that moral science has lagged so far behind physical science.',
        historicalConnection: 'Franklin encouraged Priestley to write "The History and Present State of Electricity" and helped introduce him to the Royal Society.'
      }
    ],
    suggestedEvents: [
      {
        id: 'event-french-alliance',
        title: 'The Treaty of Alliance Signed with France (February 1778)',
        year: '1778',
        context: 'Following the American victory at Saratoga, Franklin completes his greatest diplomatic masterpiece: getting King Louis XVI and Foreign Minister Vergennes to formally recognize American independence and declare war on Great Britain.',
        historicalEvidence: 'The Treaty of Amity and Commerce signed at Versailles, February 6, 1778.',
        recipientRelevance: 'george-washington',
        historicalQuotes: '“The game was never in better posture... our cause is considered here as the cause of all mankind.”'
      },
      {
        id: 'event-declaration-retrospect',
        title: 'Reflections on the Committee of Five & Natural Rights (1781)',
        year: '1781',
        context: 'Franklin writes to Jefferson reflecting on that hot Philadelphia summer of 1776 when they edited the Declaration, smiling at how they struck out "sacred and undeniable" to make truths "self-evident".',
        historicalEvidence: 'Jefferson’s rough draft of the Declaration showing Franklin’s edits in his neat, small hand.',
        recipientRelevance: 'thomas-jefferson',
        historicalQuotes: '“We must, indeed, all hang together, or most assuredly we shall all hang separately.”'
      },
      {
        id: 'event-dialogue-with-gout',
        title: 'A Game of Chess and the Dialogue with the Gout (1780)',
        year: '1780',
        context: 'Suffering from painful gout in both feet in his villa at Passy, Franklin writes a witty fable to Madame Brillon where Lady Gout visits him at midnight to scold him for eating too much Madeira wine and French pastry instead of walking.',
        historicalEvidence: 'Franklin’s Passy Press printed bagatelle "Dialogue between the Gout and Mr. Franklin" (1780).',
        recipientRelevance: 'madame-brillon',
        historicalQuotes: '“Eh! My dear lady Gout, is it not cruel to torment me so when I am working for the happiness of the world?”'
      },
      {
        id: 'event-science-and-peace',
        title: 'The Mongolfier Balloon Flight and the Lag of Moral Science (1783)',
        year: '1783',
        context: 'Watching the first manned Montgolfier hot air balloon rise over Paris, someone asks Franklin, "What good is this invention?" to which he famously replies, "What good is a newborn baby?" He writes to Priestley wishing moral progress matched physics.',
        historicalEvidence: 'Surviving letter of February 8, 1780, to Joseph Priestley: "We may perhaps at length finish by discovering a method to prevent and cure all diseases... O that moral Science were in as fair a way of Improvement."',
        recipientRelevance: 'joseph-priestley',
        historicalQuotes: '“What is the use of a newborn baby? It may grow into a man.”'
      }
    ],
    availableTones: [
      {
        id: 'enlightenment-wit',
        label: 'Shrewd Diplomatic Wit & Socratic Irony',
        description: 'Homespun American aphorisms wrapped in aristocratic Parisian elegance; charming yet uncompromising.',
        eraEtiquetteRule: 'Balance 18th-century courtly politeness with republican simplicity and sly Poor Richard humor.'
      },
      {
        id: 'patriotic-gravitas',
        label: 'Statesmanlike Gravitas & Prudence',
        description: 'Sober calculation of military supply chains, diplomatic treaties, and sovereign financial credit.',
        eraEtiquetteRule: 'Formal salutations ("Sir, I have the honor to communicate...") with clear bullet-pointed dispatches.'
      },
      {
        id: 'playful-affectionate',
        label: 'Playful, Gallant & Philosophical',
        description: 'Bilingual banter, self-deprecating wit, chess metaphors, and reflections on human foibles.',
        eraEtiquetteRule: 'French salon conversational ease, blending flirtatious warmth with profound natural philosophy.'
      }
    ],
    availableMoods: [
      {
        id: 'serenely-confident',
        label: 'Serenely Confident & Canny',
        emotionalState: 'Knowing how to play human psychology like a fine glass armonica; patient under adversity.',
        subtext: 'Trusting that reason, print, and human liberty will outlast ancient monarchies.'
      },
      {
        id: 'gouty-stoicism',
        label: 'Ailing Body, Invincible Spirit',
        emotionalState: 'Plagued by kidney stones and gout, yet writing late into the night over candlelight.',
        subtext: 'A race against time to see his infant country safely born into the family of nations.'
      },
      {
        id: 'universal-benevolence',
        label: 'Universal Benevolence',
        emotionalState: 'Viewing all humanity as brothers in the Great Republic of Letters and Science.',
        subtext: 'Hating war while recognizing it as the tragic price for self-determination.'
      }
    ],
    researchKeywords: [
      { id: 'kw-passy-press', label: 'The Passy Printing Press', category: 'art', historicalFact: 'Franklin set up his own private printing press at his villa in Passy to print diplomatic passports and satirical bagatelles.' },
      { id: 'kw-lightning-rod', label: 'Electrical Kite & Pointed Rods', category: 'science', historicalFact: 'Proved lightning was electricity in 1752, refusing to patent the lightning rod so anyone could protect their roof.' },
      { id: 'kw-treaty-alliances', label: '1778 French Naval Pact', category: 'politics', historicalFact: 'Secured 12,000 French soldiers and 32 warships that trapped Cornwallis at Yorktown.' },
      { id: 'kw-fur-cap', label: 'The Marten Fur Hat', category: 'politics', historicalFact: 'Wore a rustic Canadian fur cap in Paris instead of a powdered wig, captivating French high fashion.' },
      { id: 'kw-packet-ships', label: 'Transatlantic Triplicate Mail', category: 'personal', historicalFact: 'Dispatched every letter across three separate merchant ships to ensure at least one survived British capture.' }
    ]
  }
];

export const CURIE_FIGURE: HistoricalFigure = BASE_HISTORICAL_FIGURES.find(f => f.id === 'curie')!;
export const LEONARDO_FIGURE: HistoricalFigure = BASE_HISTORICAL_FIGURES.find(f => f.id === 'leonardo')!;
export const FRANKLIN_FIGURE: HistoricalFigure = BASE_HISTORICAL_FIGURES.find(f => f.id === 'franklin')!;

export const TRIAD_FIGURES: HistoricalFigure[] = [
  EINSTEIN_FIGURE,
  CURIE_FIGURE,
  TAGORE_FIGURE
];

export const HISTORICAL_FIGURES: HistoricalFigure[] = [
  EINSTEIN_FIGURE,
  CURIE_FIGURE,
  TAGORE_FIGURE,
  LEONARDO_FIGURE,
  FRANKLIN_FIGURE
];

export const SYSTEM_ARCHITECTURE_INFO = {
  appName: "Epistola: Historical Correspondence & Cultural Epochs",
  version: "2.5.0-Epoch",
  modelUsed: "gemini-3.8-flash (via @google/genai TypeScript SDK)",
  nodes: [
    {
      id: "user-perspective",
      title: "1. Contemporary User Perspective",
      type: "client",
      description: "Modern user immersed as an active historical persona while retaining critical 21st-century comparative awareness.",
      details: [
        "Selection of 3 global figures: Leonardo da Vinci (Italy), Marie Curie (France), Benjamin Franklin (USA)",
        "Zero arbitrary typing: selection of authentic historical events, tones, moods, and evidenced keywords",
        "Interactive comparison of modern sub-second messaging vs. historical months-long maritime/courier transit"
      ]
    },
    {
      id: "social-network-engine",
      title: "2. Dynamic Historical Network Graph",
      type: "knowledge",
      description: "Visual relationship web revealing 4 grounded historical correspondents per persona.",
      details: [
        "Categorization of relationship types: Sovereign Patron, Intellectual Peer, Kinship/Pact, Political Ally, Disciple",
        "Geographic distance calculation & historical transit delay simulation (e.g. 6–10 weeks transatlantic packet ship)",
        "Authentic stakes, risks (Cabinet Noir censorship, highwaymen), and surviving archival citations"
      ]
    },
    {
      id: "material-kit-analyzer",
      title: "3. Materiality & Tool Rack Engine",
      type: "knowledge",
      description: "Simulates the exact physical writing equipment of each era and culture.",
      details: [
        "Substrate: 15th-c. Fabriano rag paper vs. 18th-c. Dutch laid paper vs. 20th-c. Sorbonne watermark stationery",
        "Writing Instrument: Hand-cut goose quill (left-hand cut for Leonardo) vs. turkey quill vs. Waterman safety fountain pen",
        "Ink & Drying: Iron-gall & oak tannins with volcanic sand pounce shaker vs. carbon black with mahogany rocker blotter",
        "Sealing & Security: Molten cinnabar beeswax with signet ring vs. folded letterlocking vs. postmarked PTT stamp"
      ]
    },
    {
      id: "gemini-agent",
      title: "4. Gemini 3.8 Flash Historical Agent",
      type: "agent",
      description: "Server-side LLM orchestrator configured with deep epistolary persona prompting & primary source constraints.",
      details: [
        "System Instruction: Enforces era-authentic syntax, salutations (e.g. 'Illustrissimo et Eccellentissimo'), and period vocabulary",
        "No modern anachronisms: Strict grounding in contemporaneous knowledge boundaries (e.g. Leonardo knows no steam engines; Franklin knows no electrons)",
        "Few-shot conditioning on actual surviving letters (Codex Atlanticus, Curie laboratory notes, Franklin Papers at Yale)",
        "Generates paired outputs: The Authentic Historical Letter + Modern Epistolary Breakdown (Cultural/Technological delta)"
      ]
    },
    {
      id: "dual-output-engine",
      title: "5. Dual-Perspective Epistolary Studio",
      type: "output",
      description: "Renders the living historical manuscript alongside the essential contemporary breakdown.",
      details: [
        "Manuscript View: Authentic typography, aged paper texture, wax seal, and left-handed mirror script toggle for Leonardo",
        "Modern Perspective View: Temporal transit speed delta, social hierarchy rules, economic cost breakdown of paper/postage",
        "Evidence Dossier: Exact archival citations, museum catalog numbers, and verified historical anecdotes"
      ]
    }
  ]
};
