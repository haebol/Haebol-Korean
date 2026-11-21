/**
 * High-Definition Vector SVG Illustrations for Chapter 18: 색깔 (Colors)
 * Custom vector illustrations for Korean elementary & multicultural students.
 * Art style is unified with Chapter 7 (circular pastel background, clean child-friendly vectors, safe RGB data URIs).
 */

// 1. 무지개 (Rainbow) - 7-color vibrant rainbow arc with smiling puffy clouds & star sparkles
export const MUJIGAE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <!-- Soft sky blue circular card background -->
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="34" ry="6" fill="rgba(15,23,42,0.08)" />

  <!-- 7-Color Vibrant Rainbow Arc -->
  <g fill="none" stroke-linecap="round">
    <!-- Red -->
    <path d="M 18 72 A 34 34 0 0 1 82 72" stroke="rgb(239,68,68)" stroke-width="3.5" />
    <!-- Orange -->
    <path d="M 21.5 72 A 30.5 30.5 0 0 1 78.5 72" stroke="rgb(249,115,22)" stroke-width="3.5" />
    <!-- Yellow -->
    <path d="M 25 72 A 27 27 0 0 1 75 72" stroke="rgb(250,204,21)" stroke-width="3.5" />
    <!-- Green -->
    <path d="M 28.5 72 A 23.5 23.5 0 0 1 71.5 72" stroke="rgb(34,197,94)" stroke-width="3.5" />
    <!-- Blue (Sky) -->
    <path d="M 32 72 A 20 20 0 0 1 68 72" stroke="rgb(14,165,233)" stroke-width="3.5" />
    <!-- Indigo -->
    <path d="M 35.5 72 A 16.5 16.5 0 0 1 64.5 72" stroke="rgb(99,102,241)" stroke-width="3.5" />
    <!-- Purple -->
    <path d="M 39 72 A 13 13 0 0 1 61 72" stroke="rgb(168,85,247)" stroke-width="3.5" />
  </g>

  <!-- Left Smiling Cloud -->
  <g transform="translate(10, 56)">
    <ellipse cx="14" cy="18" rx="12" ry="7" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.5" />
    <circle cx="8" cy="14" r="7" fill="rgb(255,255,255)" />
    <circle cx="16" cy="10" r="9" fill="rgb(255,255,255)" />
    <circle cx="23" cy="14" r="6.5" fill="rgb(255,255,255)" />
    <path d="M 11 13 Q 13 11 15 13" stroke="rgb(30,41,59)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <path d="M 18 13 Q 20 11 22 13" stroke="rgb(30,41,59)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <path d="M 15 17 Q 16.5 19 18 17" stroke="rgb(239,68,68)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <circle cx="9" cy="15" r="2" fill="rgb(251,113,133)" opacity="0.6" />
    <circle cx="24" cy="15" r="2" fill="rgb(251,113,133)" opacity="0.6" />
  </g>

  <!-- Right Smiling Cloud -->
  <g transform="translate(62, 56)">
    <ellipse cx="14" cy="18" rx="12" ry="7" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.5" />
    <circle cx="7" cy="14" r="6.5" fill="rgb(255,255,255)" />
    <circle cx="14" cy="10" r="9" fill="rgb(255,255,255)" />
    <circle cx="22" cy="14" r="7" fill="rgb(255,255,255)" />
    <path d="M 9 13 Q 11 11 13 13" stroke="rgb(30,41,59)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <path d="M 16 13 Q 18 11 20 13" stroke="rgb(30,41,59)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <path d="M 13 17 Q 14.5 19 16 17" stroke="rgb(239,68,68)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <circle cx="7" cy="15" r="2" fill="rgb(251,113,133)" opacity="0.6" />
    <circle cx="22" cy="15" r="2" fill="rgb(251,113,133)" opacity="0.6" />
  </g>

  <!-- Golden Sparkles -->
  <path d="M 50 16 L 52 21 L 57 23 L 52 25 L 50 30 L 48 25 L 43 23 L 48 21 Z" fill="rgb(250,204,21)" />
  <circle cx="24" cy="30" r="2" fill="rgb(250,204,21)" />
  <circle cx="76" cy="30" r="2" fill="rgb(250,204,21)" />
</svg>`;

// 2. 색/색깔 (Color) - Wooden artist paint palette with colorful paint blobs & brush
export const SAEK_SAEKKAL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <!-- Soft pastel yellow-cream circular background -->
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.75" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />

  <!-- Wooden Paint Palette -->
  <g transform="translate(16, 18)">
    <path d="M 28 4 C 52 -2 68 12 66 36 C 64 54 48 64 30 64 C 12 64 2 50 2 34 C 2 18 12 8 28 4 Z" fill="rgb(253,230,138)" stroke="rgb(217,119,6)" stroke-width="2" />
    <!-- Thumb hole -->
    <ellipse cx="50" cy="46" rx="6" ry="7" fill="rgb(254,249,195)" stroke="rgb(217,119,6)" stroke-width="1.8" />
    
    <!-- Paint Blobs with shine highlights -->
    <!-- Red blob -->
    <circle cx="16" cy="22" r="6" fill="rgb(239,68,68)" />
    <circle cx="14" cy="20" r="1.8" fill="rgb(255,255,255)" opacity="0.8" />
    <!-- Orange blob -->
    <circle cx="28" cy="14" r="6" fill="rgb(249,115,22)" />
    <circle cx="26" cy="12" r="1.8" fill="rgb(255,255,255)" opacity="0.8" />
    <!-- Green blob -->
    <circle cx="43" cy="16" r="6" fill="rgb(34,197,94)" />
    <circle cx="41" cy="14" r="1.8" fill="rgb(255,255,255)" opacity="0.8" />
    <!-- Blue blob -->
    <circle cx="56" cy="26" r="6" fill="rgb(37,99,235)" />
    <circle cx="54" cy="24" r="1.8" fill="rgb(255,255,255)" opacity="0.8" />
    <!-- Purple blob -->
    <circle cx="18" cy="40" r="6" fill="rgb(168,85,247)" />
    <circle cx="16" cy="38" r="1.8" fill="rgb(255,255,255)" opacity="0.8" />
  </g>

  <!-- Paint Brush laying diagonally -->
  <g transform="translate(48, 48) rotate(-40)">
    <path d="M -3 6 L -3 50 Q 0 54 3 50 L 3 6 Z" fill="rgb(217,119,6)" stroke="rgb(180,83,9)" stroke-width="1.5" />
    <rect x="-3.5" y="-6" width="7" height="12" fill="rgb(203,213,225)" stroke="rgb(148,163,184)" stroke-width="1.2" />
    <path d="M -3.5 -6 C -3.5 -18 0 -24 0 -24 C 0 -24 3.5 -18 3.5 -6 Z" fill="rgb(51,65,85)" />
    <path d="M -2.5 -14 C -2.5 -22 0 -24 0 -24 C 0 -24 2.5 -22 2.5 -14 Z" fill="rgb(14,165,233)" />
    <circle cx="0.5" cy="-18" r="1" fill="rgb(255,255,255)" />
  </g>

  <!-- Paint splash drop -->
  <circle cx="28" cy="74" r="2.5" fill="rgb(14,165,233)" />
  <!-- Sparkle -->
  <path d="M 78 22 L 80 17 L 82 22 L 87 24 L 82 26 L 80 31 L 78 26 L 73 24 Z" fill="rgb(250,204,21)" />
</svg>`;

// 3. 무슨 색 (What color) - Friendly crayons and curious colorful question mark
export const MUSEUN_SAEK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <!-- Soft pastel lavender circular background -->
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" opacity="0.8" />
  <ellipse cx="50" cy="85" rx="30" ry="5.5" fill="rgba(15,23,42,0.1)" />

  <!-- Big Friendly Question Mark in the center-top -->
  <g transform="translate(50, 26)">
    <path d="M -9 4 C -9 -7 9 -7 9 2 C 9 8 0 10 0 16" fill="none" stroke="rgba(15,23,42,0.12)" stroke-width="6.5" stroke-linecap="round" />
    <path d="M -9 2 C -9 -9 9 -9 9 0 C 9 6 0 8 0 14" fill="none" stroke="rgb(147,51,234)" stroke-width="6" stroke-linecap="round" />
    <circle cx="0" cy="22" r="3.2" fill="rgb(147,51,234)" />
    <circle cx="-3" cy="-2" r="1.3" fill="rgb(255,255,255)" />
    <circle cx="3" cy="-2" r="1.3" fill="rgb(255,255,255)" />
  </g>

  <!-- Three Cute Standing Crayons (Red, Yellow, Blue) -->
  <!-- Left: Red Crayon -->
  <g transform="translate(18, 48)">
    <rect x="0" y="8" width="14" height="28" rx="2" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.4" />
    <rect x="0" y="14" width="14" height="16" fill="rgb(254,202,202)" />
    <line x1="2" y1="22" x2="12" y2="22" stroke="rgb(185,28,28)" stroke-width="1" />
    <polygon points="0,8 7,-2 14,8" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.4" />
    <circle cx="4.5" cy="19" r="1" fill="rgb(30,41,59)" />
    <circle cx="9.5" cy="19" r="1" fill="rgb(30,41,59)" />
    <path d="M 6 24 Q 7 25.5 8 24" stroke="rgb(185,28,28)" stroke-width="1" fill="none" stroke-linecap="round" />
  </g>

  <!-- Middle: Yellow Crayon (Taller) -->
  <g transform="translate(43, 44)">
    <rect x="0" y="8" width="14" height="32" rx="2" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.4" />
    <rect x="0" y="16" width="14" height="18" fill="rgb(254,249,195)" />
    <line x1="2" y1="25" x2="12" y2="25" stroke="rgb(217,119,6)" stroke-width="1" />
    <polygon points="0,8 7,-2 14,8" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.4" />
    <circle cx="4.5" cy="21" r="1" fill="rgb(30,41,59)" />
    <circle cx="9.5" cy="21" r="1" fill="rgb(30,41,59)" />
    <path d="M 6 26 Q 7 27.5 8 26" stroke="rgb(180,83,9)" stroke-width="1" fill="none" stroke-linecap="round" />
  </g>

  <!-- Right: Blue Crayon -->
  <g transform="translate(68, 48)">
    <rect x="0" y="8" width="14" height="28" rx="2" fill="rgb(37,99,235)" stroke="rgb(29,78,216)" stroke-width="1.4" />
    <rect x="0" y="14" width="14" height="16" fill="rgb(191,219,254)" />
    <line x1="2" y1="22" x2="12" y2="22" stroke="rgb(29,78,216)" stroke-width="1" />
    <polygon points="0,8 7,-2 14,8" fill="rgb(37,99,235)" stroke="rgb(29,78,216)" stroke-width="1.4" />
    <circle cx="4.5" cy="19" r="1" fill="rgb(30,41,59)" />
    <circle cx="9.5" cy="19" r="1" fill="rgb(30,41,59)" />
    <path d="M 6 24 Q 7 25.5 8 24" stroke="rgb(29,78,216)" stroke-width="1" fill="none" stroke-linecap="round" />
  </g>

  <!-- Sparkles -->
  <path d="M 22 26 L 24 22 L 26 26 L 30 28 L 26 30 L 24 34 L 22 30 L 18 28 Z" fill="rgb(250,204,21)" />
  <circle cx="82" cy="28" r="2" fill="rgb(250,204,21)" />
</svg>`;

// 4. 더 좋아요? (Do you like it more?) - Choosing between two cute colorful choices with love & thumbs up
export const DEO_JOAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <!-- Soft pink circular card background -->
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="85" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />

  <!-- Left Choice: Cute Big Shining Red Heart (Wearing a golden crown) -->
  <g transform="translate(26, 36)">
    <path d="M 0 5 C -14 -12 -26 4 -10 18 L 0 28 L 10 18 C 26 4 14 -12 0 5 Z" fill="rgba(239,68,68,0.2)" transform="translate(1, 2)" />
    <path d="M 0 5 C -14 -12 -26 4 -10 18 L 0 28 L 10 18 C 26 4 14 -12 0 5 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.8" />
    <circle cx="-5" cy="8" r="1.3" fill="rgb(255,255,255)" />
    <path d="M 3 8 Q 6 6 8 8" stroke="rgb(255,255,255)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <path d="M -2 14 Q 0 16 2 14" stroke="rgb(255,255,255)" stroke-width="1.2" fill="none" stroke-linecap="round" />
    <polygon points="-8,-6 -6,0 0,-7 6,0 8,-6 5,2 -5,2" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1" />
  </g>

  <!-- Right Choice: Cute Yellow Star with cheerful face -->
  <g transform="translate(72, 42)">
    <polygon points="0,-18 5,-6 18,-6 8,2 12,15 0,7 -12,15 -8,2 -18,-6 -5,-6" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.8" />
    <circle cx="-3" cy="0" r="1.3" fill="rgb(30,41,59)" />
    <circle cx="3" cy="0" r="1.3" fill="rgb(30,41,59)" />
    <path d="M -2 4 Q 0 6 2 4" stroke="rgb(180,83,9)" stroke-width="1" fill="none" stroke-linecap="round" />
  </g>

  <!-- Center "Pick / Love" Indicator -->
  <g transform="translate(50, 68)">
    <circle cx="0" cy="0" r="12" fill="rgb(254,202,202)" stroke="rgb(244,63,94)" stroke-width="1.6" />
    <!-- Thumbs up icon -->
    <path d="M -3 3 L -3 -2 C -3 -5 -1 -7 1 -7 C 2 -7 3 -6 3 -4 L 3 -2 L 5 -2 C 6 -2 7 -1 7 1 L 6 4 C 5 6 3 6 1 6 L -3 6 Z" fill="rgb(239,68,68)" />
    <rect x="-6" y="-2" width="3" height="8" rx="1" fill="rgb(225,29,72)" />
  </g>

  <!-- Floating hearts & question marks -->
  <path d="M 50 20 C 47 16 43 19 46 22 L 50 26 L 54 22 C 57 19 53 16 50 20 Z" fill="rgb(244,63,94)" />
  <text x="50" y="36" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(225,29,72)" text-anchor="middle">?</text>
  <!-- Sparkles -->
  <circle cx="16" cy="24" r="2" fill="rgb(251,191,36)" />
  <circle cx="86" cy="26" r="2" fill="rgb(251,191,36)" />
</svg>`;

// 5. 어디 있어요? (Where is it?) - Cute bear peeking from a colorful box with a magnifying glass
export const EODI_ISSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <!-- Soft mint green circular card background -->
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="85" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />

  <!-- Cute Little Bear Peeking out from behind a colorful desk/box -->
  <g transform="translate(18, 52)">
    <rect x="0" y="10" width="64" height="24" rx="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <line x1="0" y1="22" x2="64" y2="22" stroke="rgb(251,146,60)" stroke-width="1.2" />
    <circle cx="32" cy="16" r="2" fill="rgb(194,65,12)" />
    
    <!-- Bear ears -->
    <circle cx="20" cy="2" r="6" fill="rgb(180,83,9)" />
    <circle cx="20" cy="2" r="3.5" fill="rgb(254,215,170)" />
    <circle cx="44" cy="2" r="6" fill="rgb(180,83,9)" />
    <circle cx="44" cy="2" r="3.5" fill="rgb(254,215,170)" />
    <!-- Bear head -->
    <ellipse cx="32" cy="7" rx="16" ry="13" fill="rgb(217,119,6)" stroke="rgb(180,83,9)" stroke-width="1.5" />
    <!-- Bear muzzle -->
    <ellipse cx="32" cy="11" rx="7" ry="5.5" fill="rgb(254,243,199)" />
    <polygon points="32,9 30,7 34,7" fill="rgb(69,26,3)" />
    <path d="M 32 9 L 32 12" stroke="rgb(69,26,3)" stroke-width="1" />
    <!-- Curious Searching Eyes -->
    <ellipse cx="26" cy="6" rx="2.2" ry="2.8" fill="rgb(30,41,59)" />
    <circle cx="25" cy="5" r="0.9" fill="rgb(255,255,255)" />
    <ellipse cx="38" cy="6" rx="2.2" ry="2.8" fill="rgb(30,41,59)" />
    <circle cx="37" cy="5" r="0.9" fill="rgb(255,255,255)" />
    <!-- Bear paws holding the edge of box -->
    <ellipse cx="14" cy="10" rx="4.5" ry="3.5" fill="rgb(254,215,170)" stroke="rgb(180,83,9)" stroke-width="1.2" />
    <ellipse cx="50" cy="10" rx="4.5" ry="3.5" fill="rgb(254,215,170)" stroke="rgb(180,83,9)" stroke-width="1.2" />
  </g>

  <!-- Big Detective Magnifying Glass Inspecting -->
  <g transform="translate(62, 28) rotate(-20)">
    <rect x="-3" y="16" width="6" height="24" rx="3" fill="rgb(180,83,9)" stroke="rgb(120,53,15)" stroke-width="1.5" />
    <circle cx="0" cy="0" r="16" fill="rgb(224,242,254)" opacity="0.65" stroke="rgb(14,165,233)" stroke-width="3" />
    <path d="M -9 -9 A 12 12 0 0 1 9 -9" stroke="rgb(255,255,255)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <circle cx="5" cy="5" r="1.5" fill="rgb(255,255,255)" />
  </g>

  <!-- Question mark looking around -->
  <g transform="translate(26, 22)">
    <text x="0" y="0" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(2,132,199)">?</text>
  </g>
  <!-- Search Sparkles -->
  <path d="M 80 18 L 82 13 L 84 18 L 89 20 L 84 22 L 82 27 L 80 22 L 75 20 Z" fill="rgb(250,204,21)" />
</svg>`;
