import React from 'react';

// ============================================================================
// 1. ILLUSTRATED SCENE DIORAMAS (CUSTOM SVGs WITH ATMOSPHERIC PERIOD LIGHTING)
// ============================================================================

interface SceneIllustrationProps {
  sceneType?: string;
  title?: string;
  className?: string;
}

export const SceneIllustration: React.FC<SceneIllustrationProps> = ({ 
  sceneType = 'default',
  title = '',
  className = 'w-full h-36'
}) => {
  const normType = (sceneType || title || '').toLowerCase();

  // 1. ALPS EXPEDITION / HIKING
  if (normType.includes('alp') || normType.includes('glacier') || normType.includes('engadine') || normType.includes('hike')) {
    return (
      <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="alpsSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#334155" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="snowGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="pineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
        </defs>
        <rect width="360" height="160" fill="url(#alpsSky)" />
        {/* Sun / Light behind peaks */}
        <circle cx="180" cy="55" r="28" fill="#FDE68A" opacity="0.4" filter="blur(4px)" />
        <circle cx="180" cy="55" r="16" fill="#FEF08A" opacity="0.8" />
        
        {/* Distant Alpine Peaks */}
        <polygon points="50,160 140,40 220,160" fill="#334155" />
        <polygon points="120,68 140,40 160,68 145,62" fill="url(#snowGlow)" />
        <polygon points="140,160 250,25 350,160" fill="#1E293B" />
        <polygon points="225,58 250,25 280,62 255,54" fill="url(#snowGlow)" />
        <polygon points="-20,160 70,60 170,160" fill="#475569" />
        <polygon points="50,88 70,60 90,88 75,82" fill="url(#snowGlow)" />

        {/* Foreground Ridge with Pine Trees & Hiking Silhouettes */}
        <path d="M0 160 C 60 120, 160 135, 240 115 C 300 100, 340 110, 360 115 L 360 160 Z" fill="url(#pineGrad)" />
        
        {/* Walking Figures on Alpine Ridge */}
        <g transform="translate(195, 96)">
          {/* Adult 1 (Einstein bounding with walking stick) */}
          <circle cx="10" cy="8" r="3" fill="#D4AF37" />
          <line x1="10" y1="11" x2="8" y2="23" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="23" x2="3" y2="33" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="23" x2="13" y2="31" stroke="#D4AF37" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="10" y1="14" x2="17" y2="24" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="18" x2="18" y2="34" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" /> {/* Staff */}
          
          {/* Adult 2 (Marie Curie with pack) */}
          <circle cx="28" cy="11" r="2.8" fill="#F8FAFC" />
          <path d="M25 14 Q28 20 26 31 L31 31 Q30 20 31 14 Z" fill="#F8FAFC" />
          <rect x="23" y="15" width="4" height="7" rx="1.5" fill="#94A3B8" /> {/* Rucksack */}
          
          {/* Child (Irène / Hans Albert) */}
          <circle cx="40" cy="16" r="2.2" fill="#E2E8F0" />
          <line x1="40" y1="18" x2="39" y2="28" stroke="#E2E8F0" strokeWidth="1.5" />
          <line x1="39" y1="28" x2="36" y2="33" stroke="#E2E8F0" strokeWidth="1.4" />
          <line x1="39" y1="28" x2="42" y2="33" stroke="#E2E8F0" strokeWidth="1.4" />
        </g>

        {/* Swiss Engadine Compass / Altitude Stamp */}
        <g transform="translate(24, 24)" opacity="0.75">
          <circle cx="12" cy="12" r="10" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" fill="none" />
          <polygon points="12,5 15,12 12,19 9,12" fill="#D4AF37" />
        </g>
      </svg>
    );
  }

  // 2. SOLVAY COUNCIL 1911 BRUSSELS (Atoms, Ballroom Chandelier, Physics Council)
  if (normType.includes('solvay') || normType.includes('brussel') || normType.includes('quantum') || normType.includes('emc2')) {
    return (
      <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="solvayRoom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1C100B" />
            <stop offset="70%" stopColor="#2A170F" />
            <stop offset="100%" stopColor="#140A06" />
          </linearGradient>
          <radialGradient id="chandelierGlow" cx="50%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#CA8A04" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="360" height="160" fill="url(#solvayRoom)" />
        <rect width="360" height="160" fill="url(#chandelierGlow)" />
        
        {/* Salon Wallpaper Damask Arches */}
        <path d="M 40 160 L 40 40 Q 90 20 140 40 L 140 160" stroke="#8C6D46" strokeWidth="1" opacity="0.25" fill="none" />
        <path d="M 220 160 L 220 40 Q 270 20 320 40 L 320 160" stroke="#8C6D46" strokeWidth="1" opacity="0.25" fill="none" />

        {/* Grand Crystal Chandelier in Hotel Métropole */}
        <g transform="translate(180, 15)">
          <line x1="0" y1="-15" x2="0" y2="8" stroke="#D4AF37" strokeWidth="1.5" />
          <ellipse cx="0" cy="8" rx="20" ry="4" fill="#D4AF37" />
          <path d="M-18 8 Q0 24 18 8" stroke="#FDE047" strokeWidth="1.5" fill="none" />
          <path d="M-10 12 Q0 28 10 12" stroke="#FDE047" strokeWidth="1.2" fill="none" />
          {/* Sparkles */}
          <circle cx="-12" cy="10" r="1.5" fill="#FFF" />
          <circle cx="12" cy="10" r="1.5" fill="#FFF" />
          <circle cx="0" cy="24" r="2" fill="#FFF" />
        </g>

        {/* Glowing Quantum Orbital Rings (representing radiation quanta) */}
        <g transform="translate(180, 68)">
          <ellipse cx="0" cy="0" rx="45" ry="16" stroke="#38BDF8" strokeWidth="1.2" opacity="0.75" strokeDasharray="4 2" />
          <ellipse cx="0" cy="0" rx="45" ry="16" transform="rotate(60)" stroke="#F472B6" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" />
          <ellipse cx="0" cy="0" rx="45" ry="16" transform="rotate(-60)" stroke="#FBBF24" strokeWidth="1" opacity="0.6" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="4" fill="#38BDF8" filter="drop-shadow(0 0 4px #38BDF8)" />
        </g>

        {/* Historic Council Table & 24 Physicists Silhouettes */}
        <ellipse cx="180" cy="135" rx="140" ry="24" fill="#143622" stroke="#4ADE80" strokeWidth="0.8" opacity="0.85" />
        
        {/* Marie Curie Silhouette (Center Left, Sole Woman) */}
        <g transform="translate(148, 108)">
          <circle cx="6" cy="6" r="3.5" fill="#E2E8F0" />
          <path d="M2 11 Q6 9 10 11 L12 24 L0 24 Z" fill="#E2E8F0" />
        </g>

        {/* Albert Einstein Silhouette (Right next to her) */}
        <g transform="translate(168, 107)">
          <circle cx="7" cy="6" r="3.8" fill="#FCD34D" />
          <path d="M3 5 Q7 1 11 5" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" /> {/* Mop of hair */}
          <path d="M3 11 Q7 10 11 11 L13 25 L1 25 Z" fill="#FCD34D" />
        </g>

        {/* Other council delegates (Lorentz, Planck, Poincaré) */}
        <g opacity="0.5" fill="#94A3B8">
          <circle cx="115" cy="115" r="3" />
          <rect x="112" y="119" width="6" height="12" rx="2" />
          <circle cx="85" cy="118" r="3" />
          <rect x="82" y="122" width="6" height="10" rx="2" />
          <circle cx="210" cy="114" r="3" />
          <rect x="207" y="118" width="6" height="12" rx="2" />
          <circle cx="240" cy="118" r="3" />
          <rect x="237" y="122" width="6" height="10" rx="2" />
        </g>

        {/* Brussels 1911 Stamp */}
        <g transform="translate(300, 18)" opacity="0.8">
          <rect x="0" y="0" width="38" height="24" rx="2" fill="#29150B" stroke="#D4AF37" strokeWidth="0.8" />
          <text x="19" y="15" fill="#D4AF37" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">1911</text>
        </g>
      </svg>
    );
  }

  // 3. SOLIDARITY DEFENSE (Golden Aegis Shield, Defending Marie Against Tabloids)
  if (normType.includes('defense') || normType.includes('solidarity') || normType.includes('scandal') || normType.includes('rabble')) {
    return (
      <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shieldSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1308" />
            <stop offset="100%" stopColor="#3F2613" />
          </linearGradient>
          <linearGradient id="goldShield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
        </defs>
        <rect width="360" height="160" fill="url(#shieldSky)" />
        
        {/* Storm Clouds with Dark Tabloid Vipers on the Left */}
        <path d="M-10 40 Q30 20 80 45 Q120 15 150 50 L140 160 L-10 160 Z" fill="#1C1917" opacity="0.7" />
        <path d="M10 70 L50 90 L30 110 L70 130" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" /> {/* Tabloid venom spark */}
        
        {/* Radiant Sunburst behind the Shield */}
        <circle cx="210" cy="80" r="55" fill="#F59E0B" opacity="0.2" filter="blur(8px)" />
        <g stroke="#FDE68A" strokeWidth="0.8" opacity="0.4">
          <line x1="210" y1="15" x2="210" y2="145" />
          <line x1="145" y1="80" x2="275" y2="80" />
          <line x1="165" y1="35" x2="255" y2="125" />
          <line x1="165" y1="125" x2="255" y2="35" />
        </g>

        {/* Heraldic Golden Shield (Einstein's Defense Letter) */}
        <path 
          d="M 180 40 L 240 40 C 240 85, 210 115, 210 125 C 210 115, 180 85, 180 40 Z" 
          fill="url(#goldShield)" 
          stroke="#FEF08A" 
          strokeWidth="1.5" 
          filter="drop-shadow(0 4px 10px rgba(0,0,0,0.5))"
        />
        
        {/* Emblem on Shield: Lion of Truth / Atomic Beacon */}
        <circle cx="210" cy="65" r="9" fill="#78350F" />
        <path d="M210 58 L213 65 L210 72 L207 65 Z" fill="#FDE047" />
        <circle cx="210" cy="65" r="3" fill="#FFF" />

        {/* Golden Quill Pen across the Shield */}
        <g transform="translate(192, 45) rotate(-35)">
          <path d="M0 0 C 4 10, 8 25, 10 50 L 5 46 C 4 30, 2 15, 0 0 Z" fill="#FFF" />
          <line x1="5" y1="46" x2="4" y2="58" stroke="#D4AF37" strokeWidth="1.5" />
        </g>

        {/* Wax Seal at the Bottom */}
        <circle cx="210" cy="135" r="12" fill="#991B1B" stroke="#DC2626" strokeWidth="1" />
        <text x="210" y="138" fill="#FCA5A5" fontSize="8" fontFamily="serif" textAnchor="middle">1911</text>
      </svg>
    );
  }

  // 4. CAPUTH DIALOGUE (Lakeside Villa, Pine Trees, Sailboat, Violin & Sitar)
  if (normType.includes('caputh') || normType.includes('tagore') || normType.includes('truth') || normType.includes('music') || normType.includes('reality')) {
    return (
      <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="caputhSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="lakeWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="40%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width="360" height="160" fill="url(#caputhSky)" />
        
        {/* Star Constellations (Universal Consciousness) */}
        <g fill="#FFF" opacity="0.8">
          <circle cx="45" cy="25" r="1" />
          <circle cx="75" cy="15" r="1.5" />
          <circle cx="110" cy="30" r="1" />
          <circle cx="240" cy="20" r="1.2" />
          <circle cx="310" cy="35" r="1" />
          <circle cx="285" cy="15" r="1.8" />
        </g>
        <line x1="45" y1="25" x2="75" y2="15" stroke="#FFF" strokeWidth="0.4" opacity="0.4" />
        <line x1="75" y1="15" x2="110" y2="30" stroke="#FFF" strokeWidth="0.4" opacity="0.4" />

        {/* Lake Templin Water Horizon */}
        <rect y="90" width="360" height="70" fill="url(#lakeWater)" />
        
        {/* Sunset Glow Shimmer */}
        <ellipse cx="180" cy="90" rx="90" ry="12" fill="#F59E0B" opacity="0.4" filter="blur(4px)" />

        {/* Einstein's Wooden Sailboat on Lake Templin */}
        <g transform="translate(70, 75)">
          <polygon points="0,15 28,15 22,22 4,22" fill="#451A03" /> {/* Hull */}
          <line x1="16" y1="15" x2="16" y2="0" stroke="#D4AF37" strokeWidth="1.2" /> {/* Mast */}
          <polygon points="16,2 26,13 16,13" fill="#FEF3C7" opacity="0.8" /> {/* Main Sail */}
          <polygon points="15,4 6,13 15,13" fill="#E2E8F0" opacity="0.7" /> {/* Jib */}
        </g>

        {/* Caputh Pine Trees along the Shore */}
        <g fill="#064E3B" opacity="0.9">
          <polygon points="260,95 270,55 280,95" />
          <polygon points="275,98 285,62 295,98" />
          <polygon points="290,95 300,50 310,95" />
        </g>

        {/* Veranda Arch with Einstein & Tagore Sitting in Dialogue */}
        <g transform="translate(155, 62)">
          {/* Table with Tea Samovar */}
          <line x1="20" y1="36" x2="35" y2="36" stroke="#B45309" strokeWidth="2" />
          <line x1="22" y1="36" x2="22" y2="44" stroke="#B45309" strokeWidth="1.5" />
          <line x1="33" y1="36" x2="33" y2="44" stroke="#B45309" strokeWidth="1.5" />
          <rect x="25" y="31" width="5" height="5" rx="1" fill="#FDE68A" />

          {/* Tagore Silhouette (Left: Long robe, flowing silver beard) */}
          <circle cx="10" cy="22" r="3.5" fill="#FEF3C7" />
          <path d="M10 24 L10 28 L7 25 Z" fill="#FFF" /> {/* Beard */}
          <path d="M5 26 Q10 24 15 26 L16 44 L4 44 Z" fill="#E2E8F0" />

          {/* Einstein Silhouette (Right: Distinct hair, leaning forward in debate) */}
          <circle cx="45" cy="23" r="3.5" fill="#FDE68A" />
          <path d="M41 21 Q45 18 49 21" stroke="#FDE68A" strokeWidth="2.5" /> {/* Hair */}
          <path d="M40 27 Q45 26 50 27 L51 44 L39 44 Z" fill="#93C5FD" />
        </g>

        {/* Intertwined Musical Notes (Violin Clef & Indian Sitar Raga Waves) */}
        <path d="M 20 135 Q 80 110, 140 135 T 260 135 T 340 130" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <text x="32" y="148" fill="#FDE68A" fontSize="9" opacity="0.75" fontFamily="serif">𝄞 𝄢 ♩</text>
      </svg>
    );
  }

  // 5. NOBEL PRIZE PRECEDENT (Gold Medallion, Swedish Laurel, Historic First)
  if (normType.includes('nobel') || normType.includes('stockholm') || normType.includes('precedent') || normType.includes('1903') || normType.includes('1913')) {
    return (
      <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="nobelBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <radialGradient id="goldGleam" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </radialGradient>
        </defs>
        <rect width="360" height="160" fill="url(#nobelBlue)" />
        
        {/* Swedish Ribbon Sash (Blue and Yellow) */}
        <polygon points="20,0 60,0 120,160 80,160" fill="#0284C7" opacity="0.6" />
        <polygon points="40,0 50,0 100,160 90,160" fill="#FACC15" opacity="0.8" />

        {/* Laurel Wreath */}
        <g stroke="#EAB308" strokeWidth="1.2" fill="none" opacity="0.8">
          <path d="M 140 80 C 140 45, 170 30, 180 30 C 190 30, 220 45, 220 80 C 220 115, 190 130, 180 130 C 170 130, 140 115, 140 80" />
          {/* Leaves */}
          <path d="M142 60 Q135 55 145 52" fill="#EAB308" />
          <path d="M150 42 Q144 36 154 35" fill="#EAB308" />
          <path d="M218 60 Q225 55 215 52" fill="#EAB308" />
          <path d="M210 42 Q216 36 206 35" fill="#EAB308" />
        </g>

        {/* Large Golden Nobel Medallion */}
        <circle cx="180" cy="80" r="36" fill="url(#goldGleam)" stroke="#FEF08A" strokeWidth="2" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.6))" />
        <circle cx="180" cy="80" r="32" fill="none" stroke="#CA8A04" strokeWidth="1" strokeDasharray="3 2" />
        
        {/* Profile Silhouette on Medal */}
        <circle cx="178" cy="74" r="10" fill="#854D0E" />
        <path d="M170 82 Q178 78 186 82 L188 96 L168 96 Z" fill="#854D0E" />
        
        {/* Roman Numerals & Stars */}
        <text x="180" y="106" fill="#FEF08A" fontSize="7" fontFamily="serif" textAnchor="middle" fontWeight="bold">ALFR. NOBEL</text>
      </svg>
    );
  }

  // 6. PETITES CURIES (WWI Radiological Ambulances on Frontline)
  if (normType.includes('curie') && (normType.includes('war') || normType.includes('ww1') || normType.includes('ambulance') || normType.includes('radiolog'))) {
    return (
      <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="warSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18181B" />
            <stop offset="60%" stopColor="#27272A" />
            <stop offset="100%" stopColor="#3F3F46" />
          </linearGradient>
        </defs>
        <rect width="360" height="160" fill="url(#warSky)" />

        {/* Battlefield Mud & Lanterns */}
        <path d="M0 130 Q120 115 240 128 L360 120 L360 160 L0 160 Z" fill="#2E1B10" />

        {/* 1914 Renault Ambulance Silhouette ("Petite Curie") */}
        <g transform="translate(130, 68)">
          {/* Truck Body */}
          <rect x="0" y="15" width="85" height="35" rx="3" fill="#3F3F46" stroke="#71717A" strokeWidth="1" />
          <polygon points="85,32 105,32 105,50 85,50" fill="#27272A" /> {/* Hood */}
          
          {/* Driver Cabin Window */}
          <rect x="65" y="20" width="18" height="12" fill="#E2E8F0" opacity="0.6" />

          {/* Red Cross Emblem on Canvas */}
          <circle cx="35" cy="32" r="11" fill="#FFF" />
          <rect x="32" y="24" width="6" height="16" fill="#DC2626" />
          <rect x="27" y="29" width="16" height="6" fill="#DC2626" />

          {/* Wheels */}
          <circle cx="20" cy="50" r="10" fill="#18181B" stroke="#71717A" strokeWidth="2" />
          <circle cx="20" cy="50" r="4" fill="#D4AF37" />
          <circle cx="85" cy="50" r="10" fill="#18181B" stroke="#71717A" strokeWidth="2" />
          <circle cx="85" cy="50" r="4" fill="#D4AF37" />

          {/* Glowing X-Ray Radiographic Tube Inside */}
          <circle cx="45" cy="32" r="18" fill="#38BDF8" opacity="0.3" filter="blur(6px)" />
        </g>

        {/* Marie Curie & Irène Driving */}
        <circle cx="204" cy="90" r="3.5" fill="#E2E8F0" />
        <rect x="201" y="94" width="7" height="10" fill="#475569" />
      </svg>
    );
  }

  // 7. LEAGUE OF NATIONS ICIC (Lake Geneva, Jet d'Eau, Peace Dove)
  if (normType.includes('icic') || normType.includes('geneva') || normType.includes('league') || normType.includes('peace') || normType.includes('unesco')) {
    return (
      <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="genevaSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>
        <rect width="360" height="160" fill="url(#genevaSky)" />
        
        {/* Lake Geneva Waters */}
        <rect y="105" width="360" height="55" fill="#0369A1" />

        {/* Iconic Geneva Jet d'Eau Water Plume */}
        <path d="M 280 105 Q 285 20 286 10 Q 287 20 292 105 Z" fill="#FFF" opacity="0.85" filter="blur(1px)" />

        {/* Distant Alps around Geneva */}
        <polygon points="0,105 50,60 110,105" fill="#0284C7" opacity="0.4" />
        <polygon points="90,105 160,50 240,105" fill="#0369A1" opacity="0.3" />

        {/* Palais des Nations Round Assembly Table with Flags */}
        <ellipse cx="160" cy="120" rx="90" ry="18" fill="#075985" stroke="#38BDF8" strokeWidth="1" />

        {/* Flying White Peace Dove with Olive Branch */}
        <g transform="translate(140, 42)">
          {/* Wings */}
          <path d="M20 18 Q35 0 50 8 Q35 14 28 20" fill="#FFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
          <path d="M15 20 Q5 6 0 16 Q10 20 15 23" fill="#E2E8F0" />
          {/* Body */}
          <ellipse cx="22" cy="22" rx="10" ry="5" fill="#FFF" />
          <circle cx="28" cy="20" r="3" fill="#FFF" />
          {/* Olive Leaf in Beak */}
          <line x1="31" y1="20" x2="38" y2="16" stroke="#15803D" strokeWidth="1.2" />
          <ellipse cx="36" cy="15" rx="3" ry="1.5" fill="#22C55E" />
        </g>
      </svg>
    );
  }

  // DEFAULT / RENAISSANCE / SCIENTIFIC ARCHIVAL SCENE
  return (
    <svg className={className} viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="parchmentBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E1C12" />
          <stop offset="100%" stopColor="#160D08" />
        </linearGradient>
      </defs>
      <rect width="360" height="160" fill="url(#parchmentBg)" />
      
      {/* Engraved Geometry Lines & Astrolabe Circles */}
      <circle cx="180" cy="80" r="50" stroke="#D4AF37" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="180" cy="80" r="30" stroke="#D4AF37" strokeWidth="0.8" opacity="0.2" />
      <line x1="120" y1="80" x2="240" y2="80" stroke="#D4AF37" strokeWidth="0.6" opacity="0.4" />
      <line x1="180" y1="20" x2="180" y2="140" stroke="#D4AF37" strokeWidth="0.6" opacity="0.4" />

      {/* Center Antique Wax Monogram Stamp */}
      <circle cx="180" cy="80" r="18" fill="#881337" stroke="#BE123C" strokeWidth="1.5" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.5))" />
      <text x="180" y="85" fill="#FECDD3" fontSize="14" fontFamily="serif" textAnchor="middle" fontWeight="bold">📜</text>
    </svg>
  );
};

// ============================================================================
// 2. VINTAGE POSTAL STAMP & CAMEO FOR RECIPIENTS (MINIMAL TEXT, PURE VISUAL)
// ============================================================================

interface RecipientVisualStampProps {
  name: string;
  relation: string;
  location: string;
  transitDays: string;
  isSelected: boolean;
  onClick: () => void;
}

export const RecipientVisualStamp: React.FC<RecipientVisualStampProps> = ({
  name,
  relation,
  location,
  transitDays,
  isSelected,
  onClick
}) => {
  // Determine portrait cameo symbol & country flag
  const getSymbol = (n: string) => {
    const s = n.toLowerCase();
    if (s.includes('curie')) return { icon: '⚛️', color: '#38BDF8', flag: '🇫🇷', role: 'Physics' };
    if (s.includes('einstein')) return { icon: '🌌', color: '#FACC15', flag: '🇩🇪', role: 'Relativity' };
    if (s.includes('tagore')) return { icon: '🪕', color: '#FB923C', flag: '🇮🇳', role: 'Poet' };
    if (s.includes('bohr')) return { icon: '🔬', color: '#60A5FA', flag: '🇩🇰', role: 'Quantum' };
    if (s.includes('freud')) return { icon: '🧠', color: '#C084FC', flag: '🇦🇹', role: 'Psyche' };
    if (s.includes('machiavelli')) return { icon: '⚖️', color: '#F87171', flag: '🇮🇹', role: 'Diplomat' };
    if (s.includes('sforza')) return { icon: '👑', color: '#FDE047', flag: '🇮🇹', role: 'Sovereign' };
    if (s.includes('melzi')) return { icon: '🎨', color: '#A7F3D0', flag: '🇮🇹', role: 'Disciple' };
    if (s.includes('yeats') || s.includes('gandhi') || s.includes('rolland')) return { icon: '🕊️', color: '#34D399', flag: '🌐', role: 'Conscience' };
    return { icon: '📜', color: '#D4AF37', flag: '🏛️', role: 'Peer' };
  };

  const info = getSymbol(name);

  // Transit vehicle icon
  const getTransitIcon = (t: string) => {
    const s = t.toLowerCase();
    if (s.includes('hour') || s.includes('local') || s.includes('train')) return '🚂';
    if (s.includes('steamer') || s.includes('ship') || s.includes('sea') || s.includes('ocean')) return '🚢';
    if (s.includes('horse') || s.includes('courier')) return '🐎';
    if (s.includes('air')) return '🛩️';
    return '📬';
  };

  const transitIcon = getTransitIcon(transitDays);

  return (
    <div
      onClick={onClick}
      className={`relative group p-2.5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? 'bg-gradient-to-br from-[#2E1A0F] to-[#422513] border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-xl scale-[1.02]'
          : 'bg-[#180E09]/80 border-[#664630]/40 hover:border-[#A67C52] hover:bg-[#22140C] text-[#C7B5A4]'
      }`}
    >
      {/* Decorative Postal Perforation Dots */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex justify-between px-1 overflow-hidden opacity-30">
        {[...Array(16)].map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#000] inline-block -mt-1" />
        ))}
      </div>

      <div className="flex items-center gap-3 pt-1">
        {/* Vintage Oval Cameo Portrait */}
        <div className={`relative flex-shrink-0 w-12 h-12 rounded-full p-0.5 border-2 flex items-center justify-center shadow-md ${
          isSelected ? 'border-[#D4AF37] bg-[#532E16]' : 'border-[#8C6D46]/60 bg-[#25150C]'
        }`}>
          <span className="text-2xl select-none">{info.icon}</span>
          
          {/* Country Flag Badge at bottom right of cameo */}
          <span className="absolute -bottom-1 -right-1 text-xs p-0.5 rounded-full bg-[#180E09] border border-[#8C6D46] shadow leading-none">
            {info.flag}
          </span>
        </div>

        {/* Minimalist Info: Name + Visual Badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h5 className="font-cinzel text-xs font-bold text-[#F3EFE6] truncate">
              {name}
            </h5>
            {isSelected && (
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37] animate-pulse flex-shrink-0" />
            )}
          </div>

          <p className="text-[10px] text-[#D4AF37] font-serif truncate mt-0.5">
            {relation}
          </p>

          {/* Visual Route & Transit Gauge */}
          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#9E8B7A]">
            <span className="flex items-center gap-1 truncate max-w-[55%]">
              <span>📍</span>
              <span className="truncate">{location.split(',')[0]}</span>
            </span>
            <span className="text-[#664630]">•</span>
            <span className="flex items-center gap-1 font-mono text-[#D4AF37]">
              <span>{transitIcon}</span>
              <span>{transitDays.replace(/via.*/i, '').trim()}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. VISUAL WITNESS CONSTELLATION (ORBIT MEDALLIONS INSTEAD OF TEXT LISTS)
// ============================================================================

interface WitnessCameoProps {
  name: string;
  role?: string;
  onClick?: () => void;
}

export const WitnessCameo: React.FC<WitnessCameoProps> = ({ name, onClick }) => {
  const getCameoSymbol = (n: string) => {
    const s = n.toLowerCase();
    if (s.includes('lorentz') || s.includes('planck') || s.includes('rutherford')) return '⚛️';
    if (s.includes('langevin')) return '🧲';
    if (s.includes('poincaré') || s.includes('bergson')) return '📐';
    if (s.includes('gandhi') || s.includes('rolland')) return '🕊️';
    if (s.includes('curie')) return '🧪';
    if (s.includes('menuhin')) return '🎻';
    if (s.includes('andrews') || s.includes('lévi')) return '📜';
    return '👤';
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8C6D46]/40 bg-[#25170E]/80 hover:border-[#D4AF37] hover:bg-[#382012] transition-all shadow group"
    >
      <span className="text-base select-none">{getCameoSymbol(name)}</span>
      <span className="font-serif text-xs text-[#E5D7C9] group-hover:text-[#FFF]">{name}</span>
    </button>
  );
};

// ============================================================================
// 4. VISUAL MOOD CHROMATIC SPHERES
// ============================================================================

interface VisualMoodSphereProps {
  id: string;
  label: string;
  color: string;
  glowColor: string;
  symbol: string;
  isSelected: boolean;
  onClick: () => void;
}

export const VisualMoodSphere: React.FC<VisualMoodSphereProps> = ({
  label,
  color,
  glowColor,
  symbol,
  isSelected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${
        isSelected ? 'scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
      }`}
    >
      <div 
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg transition-all border-2 ${
          isSelected ? 'ring-2 ring-[#FFF] border-[#FFF]' : 'border-[#8C6D46]/60'
        }`}
        style={{
          background: color,
          boxShadow: isSelected ? `0 0 16px ${glowColor}` : 'none'
        }}
      >
        <span className="select-none filter drop-shadow">{symbol}</span>
      </div>
      <span className={`text-[10px] font-serif text-center transition-colors ${
        isSelected ? 'text-[#FFF] font-bold' : 'text-[#A69280]'
      }`}>
        {label.split(' ')[0]}
      </span>
    </button>
  );
};

// ============================================================================
// 5. VISUAL TONE WAX SEAL SELECTOR
// ============================================================================

interface VisualToneSealProps {
  id: string;
  label: string;
  sealIcon: string;
  isSelected: boolean;
  onClick: () => void;
}

export const VisualToneSeal: React.FC<VisualToneSealProps> = ({
  label,
  sealIcon,
  isSelected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? 'border-[#D4AF37] bg-[#3B1F11] shadow-lg text-[#FFF]'
          : 'border-[#664630]/30 bg-[#1A110A]/60 text-[#BFAEA0] hover:border-[#8C6D46]'
      }`}
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm shadow ${
        isSelected ? 'bg-[#991B1B] text-[#FDE047]' : 'bg-[#451A03] text-[#A69280]'
      }`}>
        {sealIcon}
      </div>
      <span className="font-cinzel text-xs font-semibold">{label}</span>
    </button>
  );
};
