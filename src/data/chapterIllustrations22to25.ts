/**
 * Vector SVG Illustrations for Chapters 22 to 25
 * Art style unified with [그림카드 7쪽] (circular pastel background, subtle ground shadow, clean child-friendly vectors, safe RGB data URIs).
 */

// ============================================================================
// CHAPTER 22: 협동 (Cooperation / Together)
// ============================================================================

// 1. 나 (I / Me) - Proud smiling child with hand on chest & heart
export const NA_ME_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Smiling child with hand on heart -->
  <g transform="translate(50, 44)">
    <circle cx="0" cy="-18" r="14" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <path d="M -14.8 -22 C -15.9 -38 15.9 -38 14.8 -22 Q 0 -22 -14.8 -22 Z" fill="rgb(51,65,85)" />
    <!-- Cheerful Face -->
    <circle cx="-4" cy="-18" r="2" fill="rgb(30,41,59)" />
    <circle cx="4" cy="-18" r="2" fill="rgb(30,41,59)" />
    <path d="M -3 -12 Q 0 -9 3 -12" stroke="rgb(239,68,68)" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <ellipse cx="-8" cy="-14" rx="2.5" ry="1.5" fill="rgb(251,113,133)" />
    <ellipse cx="8" cy="-14" rx="2.5" ry="1.5" fill="rgb(251,113,133)" />
    <!-- Yellow Shirt -->
    <rect x="-12" y="-4" width="24" height="24" rx="6" fill="rgb(250,204,21)" />
    <!-- Hand on chest -->
    <ellipse cx="-2" cy="8" rx="5" ry="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <!-- Heart badge on chest -->
    <path d="M 4 4 C 2 1 -2 3 -2 6 C -2 10 4 14 4 14 C 4 14 10 10 10 6 C 10 3 6 1 4 4 Z" fill="rgb(239,68,68)" />
  </g>
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">나</text>
</svg>`;

// 2. 너 (You) - Friendly child smiling and pointing forward warmly
export const NEO_YOU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Friend pointing toward viewer -->
  <g transform="translate(50, 44)">
    <circle cx="0" cy="-18" r="14" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <path d="M -14.8 -22 C -15.9 -38 15.9 -38 14.8 -22 Q 0 -22 -14.8 -22 Z" fill="rgb(180,83,9)" />
    <circle cx="-4" cy="-18" r="2" fill="rgb(30,41,59)" />
    <circle cx="4" cy="-18" r="2" fill="rgb(30,41,59)" />
    <path d="M -3 -12 Q 0 -9 3 -12" stroke="rgb(239,68,68)" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <!-- Sky Blue Shirt -->
    <rect x="-12" y="-4" width="24" height="24" rx="6" fill="rgb(56,189,248)" />
    <!-- Open friendly pointing hand towards friend -->
    <ellipse cx="0" cy="8" rx="6" ry="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <circle cx="0" cy="8" r="3" fill="rgb(254,215,170)" />
  </g>
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(2,132,199)" text-anchor="middle">너</text>
</svg>`;

// 3. 같이 (Together) - Two friends holding hands jumping happily
export const GACHI_TOGETHER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Left Friend -->
  <g transform="translate(34, 42)">
    <circle cx="0" cy="-14" r="10" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-8" y="-4" width="16" height="20" rx="4" fill="rgb(244,63,94)" />
    <line x1="-4" y1="16" x2="-6" y2="28" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="4" y1="16" x2="2" y2="28" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
  </g>
  <!-- Right Friend -->
  <g transform="translate(66, 42)">
    <circle cx="0" cy="-14" r="10" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-8" y="-4" width="16" height="20" rx="4" fill="rgb(59,130,246)" />
    <line x1="-4" y1="16" x2="-2" y2="28" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="4" y1="16" x2="6" y2="28" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
  </g>
  <!-- Firmly joined hands in center -->
  <path d="M 40 44 Q 50 49 60 44" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
  <circle cx="50" cy="48" r="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <!-- Joyful stars above -->
  <polygon points="50,18 52,22 56,23 52,25 50,29 48,25 44,23 48,22" fill="rgb(250,204,21)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(16,185,129)" text-anchor="middle">같이</text>
</svg>`;

// 4. 모둠 (Small group / Team) - Four students working together around a round table
export const MODUM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Round Team Table -->
  <ellipse cx="50" cy="52" rx="30" ry="18" fill="rgb(254,240,138)" stroke="rgb(217,119,6)" stroke-width="2.5" />
  <!-- 4 Colored Puzzle Pieces on Table -->
  <rect x="42" y="44" width="8" height="8" fill="rgb(239,68,68)" />
  <rect x="50" y="44" width="8" height="8" fill="rgb(59,130,246)" />
  <rect x="42" y="52" width="8" height="8" fill="rgb(34,197,94)" />
  <rect x="50" y="52" width="8" height="8" fill="rgb(249,115,22)" />
  <!-- 4 Student heads around table -->
  <circle cx="50" cy="24" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <circle cx="20" cy="50" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <circle cx="80" cy="50" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <circle cx="50" cy="74" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <text x="50" y="38" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="8" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">1모둠</text>
</svg>`;

// 5. 가위 빌려줄래? (Can you lend me scissors?) - Safe yellow safety scissors being offered
export const GAIWI_BILLYEOJULRAE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Student Safety Scissors -->
  <g transform="translate(50, 44) rotate(-35)">
    <!-- Blades with rounded safe tips -->
    <path d="M -2 0 L -2 -34 Q 0 -38 4 -34 L 2 0 Z" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="2" />
    <path d="M 2 0 L 2 -34 Q 0 -38 -4 -34 L -2 0 Z" fill="rgb(203,213,225)" stroke="rgb(148,163,184)" stroke-width="2" />
    <!-- Pivot screw -->
    <circle cx="0" cy="0" r="2.5" fill="rgb(71,85,105)" />
    <!-- Yellow Finger Loop Handles -->
    <circle cx="-10" cy="18" r="9" fill="none" stroke="rgb(250,204,21)" stroke-width="5" />
    <circle cx="10" cy="18" r="9" fill="none" stroke="rgb(250,204,21)" stroke-width="5" />
  </g>
  <!-- Question mark -->
  <text x="74" y="32" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(217,119,6)">?</text>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">가위 빌려줄래?</text>
</svg>`;

// 6. 그래 (Sure / Okay) - Cheerful thumbs-up with big smile
export const GEU_RAE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Thumbs-up Hand -->
  <g transform="translate(48, 42)">
    <!-- Palm -->
    <rect x="-14" y="0" width="28" height="24" rx="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Upward Thumb -->
    <rect x="-14" y="-18" width="10" height="22" rx="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Folded Fingers -->
    <line x1="-4" y1="6" x2="12" y2="6" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <line x1="-4" y1="12" x2="12" y2="12" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <line x1="-4" y1="18" x2="12" y2="18" stroke="rgb(234,88,12)" stroke-width="1.8" />
  </g>
  <!-- Sparkles -->
  <polygon points="76,24 78,28 82,29 78,31 76,35 74,31 70,29 74,28" fill="rgb(250,204,21)" />
  <polygon points="26,30 27.5,33 31,34 27.5,35 26,38 24.5,35 21,34 24.5,33" fill="rgb(250,204,21)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="13" font-weight="900" fill="rgb(16,185,129)" text-anchor="middle">그래!</text>
</svg>`;

// 7. 잠깐만 (Wait a moment) - Raised gentle stop palm with mini clock
export const JAM_KKAN_MAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Gentle wait palm -->
  <g transform="translate(36, 26)">
    <rect x="6" y="16" width="22" height="24" rx="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <rect x="7" y="2" width="4.5" height="16" rx="2.2" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="12" y="0" width="4.5" height="18" rx="2.2" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="17" y="1" width="4.5" height="17" rx="2.2" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="22" y="4" width="4.5" height="14" rx="2.2" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  </g>
  <!-- Mini stopwatch on bottom-right -->
  <g transform="translate(62, 52)">
    <circle cx="10" cy="10" r="10" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2" />
    <line x1="10" y1="10" x2="10" y2="4" stroke="rgb(30,41,59)" stroke-width="1.5" />
    <line x1="10" y1="10" x2="14" y2="10" stroke="rgb(239,68,68)" stroke-width="1.5" />
    <rect x="9" y="-2" width="2" height="2" fill="rgb(59,130,246)" />
  </g>
  <text x="44" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">잠깐만</text>
</svg>`;

// 8. 너 먼저 해 (You go first) - Polite hand gesture pointing forward: "After you!"
export const NEO_MEONJEO_HAE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Polite open palm directing forward -->
  <g transform="translate(30, 36)">
    <path d="M 0 16 L 32 8 C 36 7 38 11 34 14 L 16 26 C 12 28 8 26 6 22 Z" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
  </g>
  <!-- Forward guidance arrow -->
  <g transform="translate(42, 24)">
    <path d="M 4 8 L 28 8 M 22 2 L 28 8 L 22 14" stroke="rgb(99,102,241)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
  <text x="50" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(67,56,202)" text-anchor="middle">너 먼저 해</text>
</svg>`;

// 9. 나는 다 했어 (I'm all done) - Child raising finished drawing with stars
export const NA_NEUN_DA_HAESSEO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Finished Paper with checkmark & flower -->
  <g transform="translate(32, 22)">
    <rect x="0" y="0" width="36" height="42" rx="3" fill="rgb(255,255,255)" stroke="rgb(34,197,94)" stroke-width="2" />
    <!-- Big green checkmark -->
    <path d="M 10 20 L 16 26 L 28 12" stroke="rgb(34,197,94)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <circle cx="18" cy="32" r="3" fill="rgb(250,204,21)" />
  </g>
  <!-- Joyful celebration hands -->
  <path d="M 24 46 L 32 36" stroke="rgb(254,215,170)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 76 46 L 68 36" stroke="rgb(254,215,170)" stroke-width="4.5" stroke-linecap="round" />
  <!-- Sparkles -->
  <polygon points="76,18 78,22 82,23 78,25 76,29 74,25 70,23 74,22" fill="rgb(250,204,21)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(220,38,38)" text-anchor="middle">다 했어!</text>
</svg>`;

// 10. 내가 도와줄게 (I will help you) - Helping hand picking up colored pencil
export const NAEGA_DOWAJULGE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Two hands meeting to help -->
  <g transform="translate(24, 34)">
    <rect x="0" y="10" width="22" height="12" rx="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <line x1="22" y1="16" x2="36" y2="16" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <!-- Fallen pencil -->
    <rect x="28" y="24" width="24" height="6" rx="2" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.2" />
  </g>
  <!-- Helping hand reaching in -->
  <g transform="translate(56, 32)">
    <rect x="0" y="8" width="22" height="12" rx="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  </g>
  <!-- Warm red heart -->
  <path d="M 50 18 C 47 15 42 17 42 21 C 42 26 50 31 50 31 C 50 31 58 26 58 21 C 58 17 53 15 50 18 Z" fill="rgb(239,68,68)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(16,185,129)" text-anchor="middle">도와줄게!</text>
</svg>`;

// ============================================================================
// CHAPTER 23: 감정 (Emotions / Feelings)
// ============================================================================

// 1. 기뻐요 (Happy / Glad) - Cheerful beaming child face with rosy cheeks
export const GIPPEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Happy Face -->
  <g transform="translate(50, 46)">
    <circle cx="0" cy="0" r="26" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2.5" />
    <!-- Smiling crescent eyes -->
    <path d="M -16 -6 Q -10 -12 -4 -6" stroke="rgb(30,41,59)" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M 4 -6 Q 10 -12 16 -6" stroke="rgb(30,41,59)" stroke-width="3" fill="none" stroke-linecap="round" />
    <!-- Rosy blush -->
    <circle cx="-14" cy="2" r="5" fill="rgb(251,113,133)" opacity="0.6" />
    <circle cx="14" cy="2" r="5" fill="rgb(251,113,133)" opacity="0.6" />
    <!-- Big joyful open mouth smile -->
    <path d="M -10 4 Q 0 18 10 4 Z" fill="rgb(239,68,68)" />
  </g>
  <!-- Sparkles -->
  <polygon points="20,24 22,28 26,29 22,31 20,35 18,31 14,29 18,28" fill="rgb(250,204,21)" />
  <polygon points="80,24 82,28 86,29 82,31 80,35 78,31 74,29 78,28" fill="rgb(250,204,21)" />
</svg>`;

// 2. 슬퍼요 (Sad) - Tearful face with gentle tears
export const SEULPEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Sad Face -->
  <g transform="translate(50, 46)">
    <circle cx="0" cy="0" r="26" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2.5" />
    <!-- Sad eyebrows -->
    <line x1="-14" y1="-12" x2="-6" y2="-8" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="14" y1="-12" x2="6" y2="-8" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <!-- Downward eyes -->
    <circle cx="-10" cy="-4" r="2.5" fill="rgb(30,41,59)" />
    <circle cx="10" cy="-4" r="2.5" fill="rgb(30,41,59)" />
    <!-- Teardrops falling -->
    <path d="M -10 2 C -13 6 -13 10 -10 10 C -7 10 -7 6 -10 2 Z" fill="rgb(56,189,248)" />
    <!-- Downward curved mouth -->
    <path d="M -8 14 Q 0 8 8 14" stroke="rgb(239,68,68)" stroke-width="2.5" fill="none" stroke-linecap="round" />
  </g>
</svg>`;

// 3. 화나요 (Angry) - Red face with steam puffs
export const HWANAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Angry Face -->
  <g transform="translate(50, 46)">
    <circle cx="0" cy="0" r="26" fill="rgb(252,165,165)" stroke="rgb(220,38,38)" stroke-width="2.5" />
    <!-- Angled Sharp Eyebrows -->
    <line x1="-16" y1="-8" x2="-4" y2="-4" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="16" y1="-8" x2="4" y2="-4" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <circle cx="-10" cy="-2" r="2.5" fill="rgb(30,41,59)" />
    <circle cx="10" cy="-2" r="2.5" fill="rgb(30,41,59)" />
    <!-- Pouting angry mouth -->
    <path d="M -8 12 Q 0 7 8 12" stroke="rgb(185,28,28)" stroke-width="3" fill="none" stroke-linecap="round" />
  </g>
  <!-- Steam Puffs -->
  <path d="M 18 36 Q 14 30 18 24" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" fill="none" />
  <path d="M 82 36 Q 86 30 82 24" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" fill="none" />
</svg>`;

// 4. 무서워요 (Scared) - Shivering eyes with nervous sweat
export const MUSEOWOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Scared Face -->
  <g transform="translate(50, 46)">
    <circle cx="0" cy="0" r="26" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2.5" />
    <!-- Wide frightened eyes -->
    <circle cx="-10" cy="-6" r="6" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="2" />
    <circle cx="10" cy="-6" r="6" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="2" />
    <circle cx="-10" cy="-6" r="2.5" fill="rgb(30,41,59)" />
    <circle cx="10" cy="-6" r="2.5" fill="rgb(30,41,59)" />
    <!-- Wavy scared mouth -->
    <path d="M -8 12 Q -4 8 0 12 Q 4 16 8 12" stroke="rgb(30,41,59)" stroke-width="2" fill="none" stroke-linecap="round" />
    <!-- Sweat drop -->
    <path d="M 18 -12 C 16 -8 16 -6 18 -6 C 20 -6 20 -8 18 -12 Z" fill="rgb(56,189,248)" />
  </g>
</svg>`;

// 5. 졸려요 (Sleepy) - Yawning face with Zzz bubbles
export const JOLLYAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Sleepy Face -->
  <g transform="translate(50, 48)">
    <circle cx="0" cy="0" r="26" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2.5" />
    <!-- Closed sleepy eyes -->
    <line x1="-16" y1="-4" x2="-4" y2="-4" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="4" y1="-4" x2="16" y2="-4" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <!-- Yawning O mouth -->
    <ellipse cx="0" cy="8" rx="6" ry="8" fill="rgb(239,68,68)" />
  </g>
  <!-- Zzz letters -->
  <text x="72" y="32" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(99,102,241)">Z</text>
  <text x="80" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(168,85,247)">z</text>
</svg>`;

// 6. 기분이 어때요? (How do you feel?) - Four emotion face badges with question mark
export const GIBUN_EOTTEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- 4 emotion circles -->
  <circle cx="34" cy="36" r="11" fill="rgb(254,240,138)" stroke="rgb(202,138,4)" stroke-width="1.5" />
  <circle cx="66" cy="36" r="11" fill="rgb(254,202,202)" stroke="rgb(220,38,38)" stroke-width="1.5" />
  <circle cx="34" cy="62" r="11" fill="rgb(187,247,208)" stroke="rgb(22,163,74)" stroke-width="1.5" />
  <circle cx="66" cy="62" r="11" fill="rgb(191,219,254)" stroke="rgb(37,99,235)" stroke-width="1.5" />
  <!-- Central Question mark -->
  <circle cx="50" cy="49" r="8" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  <text x="50" y="54" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(217,119,6)" text-anchor="middle">?</text>
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="9" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">기분이 어때요?</text>
</svg>`;

// 7. 왜 그래요? (What's wrong?) - Caring friend gently asking
export const WAE_GEURAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Caring friend on left leaning towards sad friend -->
  <g transform="translate(32, 42)">
    <circle cx="0" cy="-14" r="10" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-7" y="-4" width="14" height="20" rx="4" fill="rgb(16,185,129)" />
    <!-- Caring hand extending -->
    <path d="M 6 6 L 18 10" stroke="rgb(254,215,170)" stroke-width="4" stroke-linecap="round" />
  </g>
  <!-- Sad friend on right -->
  <g transform="translate(68, 44)">
    <circle cx="0" cy="-14" r="10" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-7" y="-4" width="14" height="20" rx="4" fill="rgb(244,63,94)" />
  </g>
  <text x="50" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(234,88,12)" text-anchor="middle">왜 그래요?</text>
</svg>`;

// 8. 괜찮아요? (Are you okay?) - Gentle heart with bandage
export const GWAENCHANOYO_Q_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Big Red Heart with Bandage -->
  <g transform="translate(50, 42)">
    <path d="M 0 -8 C -12 -22 -28 -6 -28 10 C -28 26 0 38 0 38 C 0 38 28 26 28 10 C 28 -6 12 -22 0 -8 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <!-- Band-aid patch across heart -->
    <g transform="rotate(35)">
      <rect x="-18" y="-5" width="36" height="10" rx="3" fill="rgb(254,215,170)" stroke="rgb(217,119,6)" stroke-width="1.2" />
      <circle cx="0" cy="0" r="1.5" fill="rgb(217,119,6)" />
    </g>
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(185,28,28)" text-anchor="middle">괜찮아요?</text>
</svg>`;

// 9. 힘내요 (Cheer up!) - Pumping fist with energy stars
export const HIMNAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Strong Pumping Fist in air -->
  <g transform="translate(50, 46)">
    <!-- Arm -->
    <rect x="-8" y="4" width="16" height="26" rx="4" fill="rgb(239,68,68)" />
    <!-- Fist -->
    <rect x="-12" y="-14" width="24" height="20" rx="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <line x1="-8" y1="-8" x2="8" y2="-8" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <line x1="-8" y1="-2" x2="8" y2="-2" stroke="rgb(234,88,12)" stroke-width="1.8" />
  </g>
  <!-- Energy Sparkles -->
  <polygon points="50,14 52,18 56,19 52,21 50,25 48,21 44,19 48,18" fill="rgb(250,204,21)" />
  <polygon points="26,24 27.5,27 31,28 27.5,29 26,32 24.5,29 21,28 24.5,27" fill="rgb(250,204,21)" />
  <polygon points="74,24 75.5,27 79,28 75.5,29 74,32 72.5,29 69,28 72.5,27" fill="rgb(250,204,21)" />
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(220,38,38)" text-anchor="middle">힘내요!</text>
</svg>`;

// 10. 걱정 마세요 (Don't worry) - Warm umbrella sheltering with rainbow
export const GEOKJJEONG_MASEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Colorful Umbrella sheltering -->
  <g transform="translate(50, 42)">
    <!-- Canopy -->
    <path d="M -26 0 C -26 -22 26 -22 26 0 Z" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2" />
    <path d="M -9 -19 C -16 -8 -16 0 -16 0" stroke="rgb(217,119,6)" stroke-width="1.5" fill="none" />
    <path d="M 9 -19 C 16 -8 16 0 16 0" stroke="rgb(217,119,6)" stroke-width="1.5" fill="none" />
    <!-- Umbrella handle -->
    <line x1="0" y1="0" x2="0" y2="24" stroke="rgb(180,83,9)" stroke-width="2.5" />
    <path d="M 0 24 C 0 28 -6 28 -6 24" stroke="rgb(180,83,9)" stroke-width="2.5" fill="none" stroke-linecap="round" />
  </g>
  <!-- Mini Rainbow Arc above -->
  <path d="M 28 20 A 24 24 0 0 1 72 20" stroke="rgb(244,63,94)" stroke-width="2" fill="none" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(67,56,202)" text-anchor="middle">걱정 마세요</text>
</svg>`;

// ============================================================================
// CHAPTER 24: 색깔 (Colors)
// ============================================================================

// 1. 빨강 (Red) - Red strawberry & red crayon
export const PPAL_GANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Shiny Strawberry -->
  <g transform="translate(50, 46)">
    <path d="M 0 -18 C 22 -18 24 16 0 24 C -24 16 -22 -18 0 -18 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <!-- Green Cap -->
    <polygon points="0,-18 -8,-24 -2,-20 0,-26 2,-20 8,-24" fill="rgb(34,197,94)" />
    <!-- Seeds -->
    <circle cx="-8" cy="-4" r="1.2" fill="rgb(254,240,138)" />
    <circle cx="0" cy="-6" r="1.2" fill="rgb(254,240,138)" />
    <circle cx="8" cy="-4" r="1.2" fill="rgb(254,240,138)" />
    <circle cx="-5" cy="6" r="1.2" fill="rgb(254,240,138)" />
    <circle cx="5" cy="6" r="1.2" fill="rgb(254,240,138)" />
    <circle cx="0" cy="14" r="1.2" fill="rgb(254,240,138)" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(220,38,38)" text-anchor="middle">빨강</text>
</svg>`;

// 2. 주황 (Orange) - Fresh juicy orange fruit
export const JU_HWANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Orange Fruit -->
  <g transform="translate(50, 46)">
    <circle cx="0" cy="0" r="22" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="2" />
    <!-- Green leaf on top -->
    <ellipse cx="6" cy="-22" rx="6" ry="3.5" fill="rgb(34,197,94)" stroke="rgb(21,128,61)" stroke-width="1" />
    <circle cx="-6" cy="-6" r="2" fill="rgb(255,255,255)" opacity="0.6" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(234,88,12)" text-anchor="middle">주황</text>
</svg>`;

// 3. 노랑 (Yellow) - Cute baby chick & yellow circle
export const NO_RANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Cute Baby Chick -->
  <g transform="translate(50, 46)">
    <!-- Body -->
    <ellipse cx="0" cy="2" rx="20" ry="18" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="2" />
    <!-- Eyes -->
    <circle cx="-6" cy="-4" r="2.5" fill="rgb(30,41,59)" />
    <circle cx="6" cy="-4" r="2.5" fill="rgb(30,41,59)" />
    <!-- Orange Beak -->
    <polygon points="0,-1 -4,4 4,4" fill="rgb(249,115,22)" />
    <!-- Little wing -->
    <ellipse cx="-16" cy="4" rx="4" ry="7" fill="rgb(234,179,8)" />
    <ellipse cx="16" cy="4" rx="4" ry="7" fill="rgb(234,179,8)" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">노랑</text>
</svg>`;

// 4. 초록 (Green) - Four leaf clover
export const CHO_ROK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Lucky 4-leaf Clover -->
  <g transform="translate(50, 44)">
    <circle cx="-10" cy="-10" r="10" fill="rgb(34,197,94)" stroke="rgb(21,128,61)" stroke-width="1.5" />
    <circle cx="10" cy="-10" r="10" fill="rgb(34,197,94)" stroke="rgb(21,128,61)" stroke-width="1.5" />
    <circle cx="-10" cy="10" r="10" fill="rgb(34,197,94)" stroke="rgb(21,128,61)" stroke-width="1.5" />
    <circle cx="10" cy="10" r="10" fill="rgb(34,197,94)" stroke="rgb(21,128,61)" stroke-width="1.5" />
    <path d="M 0 0 Q 6 18 2 28" stroke="rgb(21,128,61)" stroke-width="3" fill="none" stroke-linecap="round" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(21,128,61)" text-anchor="middle">초록</text>
</svg>`;

// 5. 파랑 (Blue) - Blue dolphin jumping over wave
export const PA_RANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Blue Dolphin -->
  <g transform="translate(50, 40)">
    <path d="M -22 10 Q -6 -20 18 -10 Q 28 -4 24 10 Q 14 0 -6 4 Z" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="2" />
    <!-- Fin -->
    <polygon points="2,-14 8,-22 12,-12" fill="rgb(59,130,246)" />
    <!-- Eye -->
    <circle cx="-14" cy="2" r="2" fill="rgb(255,255,255)" />
    <circle cx="-14" cy="2" r="1" fill="rgb(30,41,59)" />
  </g>
  <!-- Splash wave -->
  <path d="M 22 58 Q 36 50 50 58 Q 64 50 78 58" stroke="rgb(14,165,233)" stroke-width="3" fill="none" stroke-linecap="round" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(29,78,216)" text-anchor="middle">파랑</text>
</svg>`;

// 6. 무슨 색이 좋아요? (What color do you like?) - Color pencils wheel with question mark
export const MUSEUN_SAEKI_JOAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Fan of colored crayons -->
  <g transform="translate(50, 52)">
    <!-- Red crayon -->
    <g transform="rotate(-30)"><rect x="-3" y="-24" width="6" height="24" rx="2" fill="rgb(239,68,68)" /></g>
    <!-- Yellow crayon -->
    <g transform="rotate(-10)"><rect x="-3" y="-24" width="6" height="24" rx="2" fill="rgb(250,204,21)" /></g>
    <!-- Green crayon -->
    <g transform="rotate(10)"><rect x="-3" y="-24" width="6" height="24" rx="2" fill="rgb(34,197,94)" /></g>
    <!-- Blue crayon -->
    <g transform="rotate(30)"><rect x="-3" y="-24" width="6" height="24" rx="2" fill="rgb(59,130,246)" /></g>
  </g>
  <text x="74" y="36" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="24" font-weight="900" fill="rgb(217,119,6)">?</text>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="9" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">무슨 색이 좋아요?</text>
</svg>`;

// 7. 보라색이 좋아요 (I like purple) - Purple grape bunch & purple heart
export const BORA_SAEKI_JOAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Purple Grapes Bunch -->
  <g transform="translate(50, 44)">
    <circle cx="-8" cy="-8" r="8" fill="rgb(168,85,247)" stroke="rgb(126,34,206)" stroke-width="1.5" />
    <circle cx="8" cy="-8" r="8" fill="rgb(168,85,247)" stroke="rgb(126,34,206)" stroke-width="1.5" />
    <circle cx="0" cy="-2" r="8" fill="rgb(147,51,234)" stroke="rgb(107,33,168)" stroke-width="1.5" />
    <circle cx="-6" cy="8" r="7" fill="rgb(168,85,247)" stroke="rgb(126,34,206)" stroke-width="1.5" />
    <circle cx="6" cy="8" r="7" fill="rgb(168,85,247)" stroke="rgb(126,34,206)" stroke-width="1.5" />
    <circle cx="0" cy="16" r="6" fill="rgb(147,51,234)" stroke="rgb(107,33,168)" stroke-width="1.5" />
  </g>
  <!-- Purple Heart -->
  <path d="M 72 24 C 69 20 64 22 64 26 C 64 31 72 36 72 36 C 72 36 80 31 80 26 C 80 22 75 20 72 24 Z" fill="rgb(147,51,234)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(107,33,168)" text-anchor="middle">보라색이 좋아요</text>
</svg>`;

// 8. 어느 게 더 좋아요? (Which one do you like better?) - Comparing two colorful stars
export const EONEU_GE_DEO_JOAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Red apple on left -->
  <g transform="translate(32, 44)">
    <circle cx="0" cy="0" r="14" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
    <path d="M 0 -14 Q 2 -18 5 -16" stroke="rgb(180,83,9)" stroke-width="2" fill="none" />
  </g>
  <!-- VS text or question -->
  <text x="50" y="48" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(100,116,139)" text-anchor="middle">?</text>
  <!-- Yellow banana on right -->
  <g transform="translate(68, 44)">
    <circle cx="0" cy="0" r="14" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.5" />
    <path d="M 0 -14 Q 2 -18 5 -16" stroke="rgb(180,83,9)" stroke-width="2" fill="none" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="9" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">어느 게 더 좋아요?</text>
</svg>`;

// 9. 이게 더 좋아요 (I like this better) - Smiling child picking favorite star
export const IGE_DEO_JOAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Big Golden Star held with thumbs up -->
  <g transform="translate(50, 42)">
    <polygon points="0,-22 6,-6 22,-6 10,4 14,20 0,10 -14,20 -10,4 -22,-6 -6,-6" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2" />
    <circle cx="-5" cy="-2" r="2" fill="rgb(30,41,59)" />
    <circle cx="5" cy="-2" r="2" fill="rgb(30,41,59)" />
    <path d="M -4 4 Q 0 8 4 4" stroke="rgb(239,68,68)" stroke-width="1.5" fill="none" stroke-linecap="round" />
  </g>
  <!-- Heart sparkles -->
  <path d="M 76 22 C 74 19 70 20 70 23 C 70 27 76 31 76 31 C 76 31 82 27 82 23 C 82 20 78 19 76 22 Z" fill="rgb(239,68,68)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">이게 더 좋아요!</text>
</svg>`;

// ============================================================================
// CHAPTER 25: 가족 (Family / Self)
// ============================================================================

// 1. 저 (I / Me polite) - Polite student with backpack bowing slightly
export const JEO_POLITE_ME_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Polite Student Bowing Respectfully -->
  <g transform="translate(50, 46)">
    <circle cx="0" cy="-16" r="12" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <path d="M -12.8 -20 C -13.8 -32.9 13.8 -32.9 12.8 -20 Q 0 -20 -12.8 -20 Z" fill="rgb(51,65,85)" />
    <!-- Polite smiling eyes -->
    <path d="M -6 -16 Q -3 -20 0 -16" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" />
    <path d="M 2 -16 Q 5 -20 8 -16" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" />
    <!-- Navy Uniform Shirt -->
    <rect x="-10" y="-2" width="20" height="22" rx="4" fill="rgb(30,64,175)" />
    <!-- Two polite hands folded in front -->
    <ellipse cx="0" cy="10" rx="6" ry="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  </g>
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="14" font-weight="900" fill="rgb(30,64,175)" text-anchor="middle">저</text>
</svg>`;

// 2. 우리 (We / Us) - Cheerful group of students together
export const URI_WE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Three close friends with arms around each other -->
  <g transform="translate(32, 46)">
    <circle cx="0" cy="-12" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-6" y="-3" width="12" height="18" rx="3" fill="rgb(59,130,246)" />
  </g>
  <g transform="translate(50, 42)">
    <circle cx="0" cy="-12" r="9" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-7" y="-2" width="14" height="20" rx="3" fill="rgb(239,68,68)" />
  </g>
  <g transform="translate(68, 46)">
    <circle cx="0" cy="-12" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-6" y="-3" width="12" height="18" rx="3" fill="rgb(34,197,94)" />
  </g>
  <!-- Big Warm Heart -->
  <path d="M 50 16 C 46 12 40 14 40 20 C 40 26 50 32 50 32 C 50 32 60 26 60 20 C 60 14 54 12 50 16 Z" fill="rgb(244,63,94)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">우리</text>
</svg>`;

// 3. 가족 (Family) - House frame with happy family (Mom, Dad, Me)
export const GAJOK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- House outline -->
  <polygon points="50,18 20,40 26,40 26,68 74,68 74,40 80,40" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="2" />
  <!-- Dad -->
  <g transform="translate(38, 52)">
    <circle cx="0" cy="-8" r="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
    <rect x="-5" y="-1" width="10" height="14" rx="2" fill="rgb(59,130,246)" />
  </g>
  <!-- Mom -->
  <g transform="translate(62, 52)">
    <circle cx="0" cy="-8" r="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
    <rect x="-5" y="-1" width="10" height="14" rx="2" fill="rgb(249,115,22)" />
  </g>
  <!-- Child in middle -->
  <g transform="translate(50, 56)">
    <circle cx="0" cy="-6" r="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
    <rect x="-4" y="0" width="8" height="10" rx="2" fill="rgb(250,204,21)" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(220,38,38)" text-anchor="middle">가족</text>
</svg>`;

// 4. 엄마 (Mom) - Loving mother with warm smile and apron
export const EOMMA_MOM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Smiling Mother -->
  <g transform="translate(50, 44)">
    <circle cx="0" cy="-14" r="14" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- Pretty wavy hair -->
    <path d="M -14.6 -17 C -15.7 -34.8 15.7 -34.8 14.6 -17 Q 0 -22 -14.6 -17 Z" fill="rgb(180,83,9)" /> <path d="M -14 -18 C -14 -34.3 14 -34.3 14 -18 C 14 -12 18 0 16 8 C 14 8 12 -4 12 -10" stroke="rgb(180,83,9)" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M -14 -18 C -14 -12 -18 0 -16 8 C -14 8 -12 -4 -12 -10" stroke="rgb(180,83,9)" stroke-width="3" fill="none" stroke-linecap="round" />
    <circle cx="-4" cy="-14" r="2" fill="rgb(30,41,59)" />
    <circle cx="4" cy="-14" r="2" fill="rgb(30,41,59)" />
    <path d="M -3 -8 Q 0 -5 3 -8" stroke="rgb(239,68,68)" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <!-- Coral Blouse -->
    <rect x="-12" y="2" width="24" height="22" rx="5" fill="rgb(251,146,60)" />
  </g>
  <!-- Heart above -->
  <path d="M 50 16 C 47 13 42 15 42 19 C 42 24 50 29 50 29 C 50 29 58 24 58 19 C 58 15 53 13 50 16 Z" fill="rgb(244,63,94)" />
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(194,65,12)" text-anchor="middle">엄마</text>
</svg>`;

// 5. 아빠 (Dad) - Cheerful father with glasses
export const APPA_DAD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Cheerful Father -->
  <g transform="translate(50, 44)">
    <circle cx="0" cy="-14" r="14" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- Short Hair -->
    <path d="M -14.8 -18 C -15.9 -34 15.9 -34 14.8 -18 Q 0 -22 -14.8 -18 Z" fill="rgb(51,65,85)" />
    <!-- Cute Round Glasses -->
    <circle cx="-5" cy="-14" r="4.5" fill="none" stroke="rgb(30,41,59)" stroke-width="1.5" />
    <circle cx="5" cy="-14" r="4.5" fill="none" stroke="rgb(30,41,59)" stroke-width="1.5" />
    <line x1="-1" y1="-14" x2="1" y2="-14" stroke="rgb(30,41,59)" stroke-width="1.5" />
    <circle cx="-5" cy="-14" r="1.5" fill="rgb(30,41,59)" />
    <circle cx="5" cy="-14" r="1.5" fill="rgb(30,41,59)" />
    <path d="M -3 -6 Q 0 -3 3 -6" stroke="rgb(239,68,68)" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <!-- Blue Collar Shirt -->
    <rect x="-12" y="2" width="24" height="22" rx="5" fill="rgb(59,130,246)" />
    <polygon points="0,2 -4,10 0,16 4,10" fill="rgb(239,68,68)" />
  </g>
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(29,78,216)" text-anchor="middle">아빠</text>
</svg>`;

// 6. 동생 (Younger sibling) - Cute toddler with pacifier / baby rattle
export const DONGSAENG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Cute Toddler Sibling -->
  <g transform="translate(50, 46)">
    <circle cx="0" cy="-10" r="16" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- Baby hair tuft -->
    <path d="M -2 -26 Q 0 -32 4 -28" stroke="rgb(180,83,9)" stroke-width="3" stroke-linecap="round" fill="none" />
    <circle cx="-6" cy="-10" r="2" fill="rgb(30,41,59)" />
    <circle cx="6" cy="-10" r="2" fill="rgb(30,41,59)" />
    <!-- Cute pink pacifier -->
    <circle cx="0" cy="-2" r="4.5" fill="rgb(244,63,94)" />
    <circle cx="0" cy="-2" r="2" fill="rgb(255,255,255)" />
    <!-- Baby Onesie -->
    <rect x="-12" y="8" width="24" height="16" rx="6" fill="rgb(254,240,138)" />
  </g>
  <text x="50" y="80" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">동생</text>
</svg>`;

// 7. 저는 학생이에요 (I am a student) - Proud student with backpack & student card
export const HAKSAENG_I_E_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Student holding book -->
  <g transform="translate(50, 42)">
    <circle cx="0" cy="-14" r="12" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <circle cx="-4" cy="-14" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="4" cy="-14" r="1.8" fill="rgb(30,41,59)" />
    <path d="M -3 -8 Q 0 -5 3 -8" stroke="rgb(239,68,68)" stroke-width="1.5" fill="none" />
    <!-- Uniform jacket -->
    <rect x="-10" y="0" width="20" height="22" rx="4" fill="rgb(16,185,129)" />
    <!-- Student ID badge -->
    <rect x="2" y="4" width="6" height="8" rx="1" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="0.8" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(16,185,129)" text-anchor="middle">학생이에요</text>
</svg>`;

// 8. 저는 한국 사람이에요 (I am Korean) - Taegeuk badge & cheerful student
export const HANGUK_SARAM_I_E_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Taegeuk Emblem (Red Top, Blue Bottom with S-curve) -->
  <g transform="translate(50, 42)">
    <circle cx="0" cy="0" r="24" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2" />
    <!-- Taegeuk Symbol -->
    <path d="M 0 -18 A 9 9 0 0 1 0 0 A 9 9 0 0 0 0 18 A 18 18 0 0 1 0 -18 Z" fill="rgb(239,68,68)" />
    <path d="M 0 -18 A 18 18 0 0 0 0 18 A 9 9 0 0 1 0 0 A 9 9 0 0 0 0 -18 Z" fill="rgb(37,99,235)" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="9" font-weight="900" fill="rgb(30,64,175)" text-anchor="middle">한국 사람이에요</text>
</svg>`;

// 9. 가족이 몇 명이에요? (How many in your family?) - Family count question mark
export const GAJOKI_MYEOTMYEONG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Family Silhouettes inside house -->
  <polygon points="50,18 24,36 30,36 30,60 70,60 70,36 76,36" fill="rgb(254,242,242)" stroke="rgb(244,63,94)" stroke-width="2" />
  <!-- Question mark in center of house -->
  <text x="50" y="52" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="28" font-weight="900" fill="rgb(239,68,68)" text-anchor="middle">?</text>
  <text x="50" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="9" font-weight="900" fill="rgb(190,18,60)" text-anchor="middle">가족이 몇 명?</text>
</svg>`;

// 10. 네 명이에요 (Four people) - 4 happy family members with "4" badge
export const NE_MYEONG_I_E_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- 4 people silhouettes -->
  <circle cx="26" cy="42" r="6" fill="rgb(59,130,246)" />
  <circle cx="42" cy="42" r="6" fill="rgb(249,115,22)" />
  <circle cx="58" cy="42" r="6" fill="rgb(239,68,68)" />
  <circle cx="74" cy="42" r="6" fill="rgb(34,197,94)" />
  <!-- "4명" Golden Star Badge -->
  <g transform="translate(50, 22)">
    <circle cx="0" cy="0" r="11" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2" />
    <text x="0" y="4" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">4명</text>
  </g>
  <text x="50" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(21,128,61)" text-anchor="middle">네 명이에요</text>
</svg>`;
