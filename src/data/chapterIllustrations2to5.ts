/**
 * High-Definition Vector SVG Illustrations for Chapters 2 ~ 5
 * Designed specifically for Korean elementary school & multicultural learners.
 * All SVGs use safe RGB/encoded values for 100% reliable rendering in <img> tags, canvas, and printouts.
 */

// ============================================================================
// CHAPTER 2: 생존 (Survival)
// ============================================================================

// 1. 화장실 (Restroom) - School restroom door with signage & clean tiled doorway
export const HWAJANGSIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <!-- Soft pastel sky backdrop -->
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <!-- Door frame shadow & door -->
  <rect x="22" y="16" width="56" height="74" rx="6" fill="rgb(224,242,254)" stroke="rgb(56,189,248)" stroke-width="2.5" />
  <rect x="26" y="20" width="48" height="70" rx="4" fill="rgb(255,255,255)" stroke="rgb(186,230,253)" stroke-width="1.5" />
  <!-- Restroom Signboard on Door -->
  <rect x="34" y="26" width="32" height="15" rx="3" fill="rgb(14,165,233)" stroke="rgb(2,132,199)" stroke-width="1.2" />
  <text x="50" y="37" font-family="'Noto Sans KR', sans-serif" font-size="7.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">화장실</text>
  <!-- Male & Female cute pictogram figures -->
  <g transform="translate(38, 46)">
    <!-- Boy (Blue) -->
    <circle cx="7" cy="4" r="3.5" fill="rgb(37,99,235)" />
    <path d="M 4 8 L 10 8 L 10 18 L 8 18 L 8 26 L 6 26 L 6 18 L 4 18 Z" fill="rgb(37,99,235)" />
  </g>
  <g transform="translate(50, 46)">
    <!-- Girl (Red/Orange) -->
    <circle cx="7" cy="4" r="3.5" fill="rgb(239,68,68)" />
    <path d="M 4 8 L 10 8 L 12 18 L 8.5 18 L 8.5 26 L 6.5 26 L 6.5 18 L 2 18 Z" fill="rgb(239,68,68)" />
  </g>
  <!-- Door Handle -->
  <rect x="66" y="56" width="4" height="10" rx="2" fill="rgb(100,116,139)" />
  <!-- Sparkles showing clean freshness -->
  <path d="M 18 28 L 20 22 L 22 28 L 28 30 L 22 32 L 20 38 L 18 32 L 12 30 Z" fill="rgb(250,204,21)" />
  <circle cx="82" cy="36" r="2" fill="rgb(56,189,248)" />
</svg>`;

// 2. 물 (Water) - Clear cup of sparkling fresh water with ice & splashing drops
export const MUL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Glass shadow -->
  <ellipse cx="50" cy="85" rx="22" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Glass Cup Body -->
  <path d="M 30 26 L 35 78 Q 35 84 50 84 Q 65 84 65 78 L 70 26 Z" fill="rgb(255,255,255)" stroke="rgb(147,197,253)" stroke-width="2.5" />
  <!-- Water Fill Inside -->
  <path d="M 32 38 Q 42 35 50 38 Q 58 41 68 38 L 64 76 Q 64 81 50 81 Q 36 81 36 76 Z" fill="rgb(56,189,248)" opacity="0.85" />
  <path d="M 33 42 Q 42 39 50 42 Q 58 45 67 42 L 64 76 Q 64 80 50 80 Q 36 80 36 76 Z" fill="rgb(14,165,233)" opacity="0.4" />
  <!-- Floating Ice Cube -->
  <polygon points="44,44 54,42 58,49 48,51" fill="rgb(255,255,255)" opacity="0.9" stroke="rgb(186,230,253)" stroke-width="1" />
  <polygon points="44,44 48,51 46,58 42,51" fill="rgb(224,242,254)" opacity="0.9" stroke="rgb(186,230,253)" stroke-width="1" />
  <!-- Glass reflection streak -->
  <path d="M 37 32 L 40 76" stroke="rgb(255,255,255)" stroke-width="3" stroke-linecap="round" opacity="0.75" />
  <!-- Sparkling Water Droplets -->
  <path d="M 72 20 C 72 20 76 25 76 28 C 76 30.5 74 32 72 32 C 70 32 68 30.5 68 28 C 68 25 72 20 72 20 Z" fill="rgb(56,189,248)" />
  <circle cx="24" cy="40" r="3" fill="rgb(56,189,248)" />
  <circle cx="78" cy="45" r="2" fill="rgb(125,211,252)" />
  <!-- Sparkle -->
  <path d="M 28 20 L 29.5 16 L 31 20 L 35 21.5 L 31 23 L 29.5 27 L 28 23 L 24 21.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 3. 휴지 (Tissue / Paper) - Soft roll of toilet paper + tissue box
export const HYUJI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.5" />
  <!-- Shadow -->
  <ellipse cx="50" cy="80" rx="34" ry="8" fill="rgba(15,23,42,0.1)" />
  <!-- Toilet Roll Paper Cylinder -->
  <g transform="translate(18, 18)">
    <!-- Unrolled paper trail hanging down -->
    <path d="M 40 30 L 40 62 Q 50 64 60 60 L 60 28 Z" fill="rgb(248,250,252)" stroke="rgb(203,213,225)" stroke-width="2" />
    <line x1="42" y1="52" x2="58" y2="52" stroke="rgb(203,213,225)" stroke-width="1.5" stroke-dasharray="2,2" />
    <!-- Roll Outer Body -->
    <path d="M 8 28 L 44 28 L 44 58 Q 26 66 8 58 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2.5" />
    <!-- Roll Top Ellipse -->
    <ellipse cx="26" cy="28" rx="18" ry="10" fill="rgb(241,245,249)" stroke="rgb(203,213,225)" stroke-width="2.5" />
    <!-- Cardboard Core Hole -->
    <ellipse cx="26" cy="28" rx="6" ry="3.5" fill="rgb(203,213,225)" stroke="rgb(148,163,184)" stroke-width="1.5" />
    <path d="M 20 28 L 20 33 Q 26 36 32 33 L 32 28 Z" fill="rgb(148,163,184)" />
    <!-- Soft Embossed flower/leaf texture on paper -->
    <circle cx="26" cy="46" r="1.5" fill="rgb(226,232,240)" />
    <circle cx="22" cy="48" r="1" fill="rgb(226,232,240)" />
    <circle cx="30" cy="48" r="1" fill="rgb(226,232,240)" />
  </g>
  <!-- Softness cloud & star -->
  <path d="M 72 26 L 73.5 22 L 75 26 L 79 27.5 L 75 29 L 73.5 33 L 72 29 L 68 27.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 4. 가요 (Go) - Energetic child with yellow backpack stepping forward
export const GAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <!-- Motion dashes -->
  <line x1="16" y1="52" x2="26" y2="52" stroke="rgb(52,211,153)" stroke-width="3" stroke-linecap="round" />
  <line x1="12" y1="60" x2="20" y2="60" stroke="rgb(52,211,153)" stroke-width="2.5" stroke-linecap="round" />
  <!-- Shadow -->
  <ellipse cx="52" cy="88" rx="22" ry="5" fill="rgba(15,23,42,0.12)" />
  <!-- Child Character Stepping Forward -->
  <g transform="translate(24, 14)">
    <!-- Yellow Backpack on Back -->
    <rect x="2" y="24" width="12" height="18" rx="4" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.8" />
    <circle cx="8" cy="33" r="2" fill="rgb(245,158,11)" />
    <!-- Back Leg (Stretched) -->
    <line x1="16" y1="48" x2="6" y2="68" stroke="rgb(30,41,59)" stroke-width="6" stroke-linecap="round" />
    <ellipse cx="4" cy="68" rx="4" ry="2.5" fill="rgb(239,68,68)" />
    <!-- Body/Shirt -->
    <path d="M 12 24 L 28 24 L 26 48 L 14 48 Z" fill="rgb(16,185,129)" stroke="rgb(5,150,105)" stroke-width="1.5" />
    <!-- Front Leg (Bending forward) -->
    <line x1="24" y1="48" x2="32" y2="60" stroke="rgb(30,41,59)" stroke-width="6" stroke-linecap="round" />
    <line x1="32" y1="60" x2="34" y2="70" stroke="rgb(30,41,59)" stroke-width="6" stroke-linecap="round" />
    <ellipse cx="36" cy="70" rx="4.5" ry="3" fill="rgb(239,68,68)" />
    <!-- Swinging Arms -->
    <line x1="14" y1="28" x2="6" y2="38" stroke="rgb(254,215,170)" stroke-width="4.5" stroke-linecap="round" />
    <line x1="26" y1="28" x2="36" y2="22" stroke="rgb(254,215,170)" stroke-width="4.5" stroke-linecap="round" />
    <!-- Head & Cheerful Face -->
    <circle cx="22" cy="14" r="12" fill="rgb(254,215,170)" />
    <!-- Cap/Hair -->
    <path d="M 9.2 12 C 8.2 -3.7 35.8 -3.7 34.8 12 C 32 10 28 6 22 6 C 16 6 12 10 9.2 12 Z" fill="rgb(30,41,59)" />
    <!-- Eye & Smile -->
    <circle cx="26" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="28" cy="16" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 24 18 Q 27 21 29 18" stroke="rgb(190,18,60)" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </g>
  <!-- Forward Arrow Sparkle -->
  <path d="M 74 44 L 84 50 L 74 56 Z" fill="rgb(16,185,129)" />
</svg>`;

// 5. 마셔요 (Drink) - Cute child drinking fresh drink with a straw
export const MASYEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <g transform="translate(14, 12)">
    <!-- Child Body -->
    <path d="M 22 76 C 22 60 32 56 46 56 C 60 56 70 60 70 76 Z" fill="rgb(249,115,22)" />
    <!-- Face -->
    <circle cx="46" cy="38" r="22" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 23.2 36 C 21.4 6.4 70.6 6.4 68.8 36 C 68 28 60 22 46 22 C 32 22 24 28 23.2 36 Z" fill="rgb(51,65,85)" />
    <!-- Happy Closed Squeinting Eyes -->
    <path d="M 34 36 Q 38 41 42 36" stroke="rgb(30,41,59)" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <path d="M 50 36 Q 54 41 58 36" stroke="rgb(30,41,59)" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <!-- Rosy Cheeks -->
    <circle cx="32" cy="42" r="4" fill="rgb(244,63,94)" opacity="0.6" />
    <circle cx="60" cy="42" r="4" fill="rgb(244,63,94)" opacity="0.6" />
    <!-- Satisfied small 'o' mouth around straw -->
    <circle cx="46" cy="45" r="3" fill="rgb(190,18,60)" />
    <!-- Cup Held with Hands -->
    <g transform="translate(32, 42)">
      <!-- Red striped drinking straw -->
      <path d="M 14 -12 L 14 6 L 10 26" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M 14 -12 L 14 6 L 10 26" stroke="rgb(255,255,255)" stroke-width="3" stroke-linecap="round" stroke-dasharray="3,3" fill="none" />
      <!-- Drink Cup -->
      <path d="M 4 8 L 24 8 L 21 34 Q 21 38 14 38 Q 7 38 7 34 Z" fill="rgb(56,189,248)" stroke="rgb(14,165,233)" stroke-width="2" />
      <rect x="4" y="6" width="20" height="3" rx="1.5" fill="rgb(255,255,255)" stroke="rgb(14,165,233)" stroke-width="1.2" />
      <!-- Two little hands holding the cup -->
      <ellipse cx="4" cy="22" rx="4.5" ry="5.5" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.2" />
      <ellipse cx="24" cy="22" rx="4.5" ry="5.5" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.2" />
    </g>
  </g>
  <path d="M 76 22 L 77.5 18 L 79 22 L 83 23.5 L 79 25 L 77.5 29 L 76 25 L 72 23.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 6. 손 (Hand) - Clean, cheerful child's hand with sparkles
export const SON_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="84" rx="24" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Hand Palm & Wrist -->
  <g transform="translate(18, 12)">
    <!-- Wrist & Sleeve -->
    <rect x="18" y="56" width="28" height="20" rx="4" fill="rgb(251,146,60)" />
    <rect x="16" y="53" width="32" height="6" rx="3" fill="rgb(255,255,255)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- Palm and Fingers -->
    <!-- Thumb -->
    <path d="M 16 46 C 8 42 6 32 14 30 C 19 28 22 36 22 42 Z" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Index Finger -->
    <rect x="20" y="10" width="8" height="32" rx="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Middle Finger -->
    <rect x="28" y="6" width="8.5" height="36" rx="4.25" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Ring Finger -->
    <rect x="36.5" y="10" width="8" height="32" rx="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Little Pinky Finger -->
    <rect x="44.5" y="18" width="7.5" height="24" rx="3.75" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Main Palm Base -->
    <path d="M 18 36 L 48 36 L 46 54 L 18 54 Z" fill="rgb(254,215,170)" />
    <!-- Gentle Palm Lines -->
    <path d="M 24 44 Q 32 46 40 42" stroke="rgb(251,146,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <path d="M 28 48 Q 34 52 42 49" stroke="rgb(251,146,60)" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </g>
  <!-- Clean golden sparkles -->
  <path d="M 16 26 L 17.5 22 L 19 26 L 23 27.5 L 19 29 L 17.5 33 L 16 29 L 12 27.5 Z" fill="rgb(250,204,21)" />
  <path d="M 80 20 L 81.5 16 L 83 20 L 87 21.5 L 83 23 L 81.5 27 L 80 23 L 76 21.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 7. 비누 (Soap) - Pastel soap on cute dish with rich bubbly foam lather
export const BINU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,250)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="80" rx="36" ry="8" fill="rgba(15,23,42,0.12)" />
  <!-- Soap Dish -->
  <ellipse cx="50" cy="68" rx="36" ry="12" fill="rgb(204,251,241)" stroke="rgb(45,212,191)" stroke-width="2.5" />
  <ellipse cx="50" cy="67" rx="30" ry="8" fill="rgb(255,255,255)" opacity="0.6" />
  <!-- Soap Bar (Soft Coral Pink, Angled) -->
  <g transform="translate(24, 30) rotate(-6)">
    <!-- 3D Thickness side -->
    <rect x="0" y="10" width="52" height="20" rx="10" fill="rgb(244,114,182)" stroke="rgb(219,39,119)" stroke-width="2" />
    <!-- Top Face -->
    <rect x="0" y="0" width="52" height="20" rx="10" fill="rgb(249,168,212)" stroke="rgb(219,39,119)" stroke-width="2" />
    <ellipse cx="26" cy="10" rx="16" ry="5" fill="rgb(255,255,255)" opacity="0.5" />
    <!-- Clean Soap Text / Star -->
    <path d="M 26 6 L 27.5 8.5 L 30 8.5 L 28 10 L 29 12.5 L 26 11 L 23 12.5 L 24 10 L 22 8.5 L 24.5 8.5 Z" fill="rgb(255,255,255)" />
  </g>
  <!-- Rich Iridescent Soap Bubbles -->
  <circle cx="28" cy="30" r="8" fill="rgb(224,242,254)" stroke="rgb(56,189,248)" stroke-width="1.8" opacity="0.9" />
  <ellipse cx="26" cy="27" rx="2.5" ry="1.5" fill="rgb(255,255,255)" />
  <circle cx="70" cy="34" r="11" fill="rgb(254,240,138)" stroke="rgb(250,204,21)" stroke-width="1.8" opacity="0.85" />
  <ellipse cx="67" cy="30" rx="3" ry="2" fill="rgb(255,255,255)" />
  <circle cx="68" cy="18" r="6" fill="rgb(243,232,255)" stroke="rgb(192,132,252)" stroke-width="1.5" opacity="0.9" />
  <circle cx="48" cy="22" r="5" fill="rgb(204,251,241)" stroke="rgb(45,212,191)" stroke-width="1.5" />
</svg>`;

// 8. 알아요 (I know) - 반짝 전구와 함께 '아하! 알아요!' 활짝 웃는 아이 (머리 옆 귀 모양 제거)
export const ALAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />

  <!-- Soft golden lightbulb glow aura -->
  <circle cx="50" cy="21" r="15" fill="rgb(254,240,138)" opacity="0.55" />
  <!-- Radiant Light Rays -->
  <line x1="50" y1="5" x2="50" y2="9" stroke="rgb(217,119,6)" stroke-width="2.4" stroke-linecap="round" />
  <line x1="33" y1="10" x2="36.5" y2="13" stroke="rgb(217,119,6)" stroke-width="2.4" stroke-linecap="round" />
  <line x1="67" y1="10" x2="63.5" y2="13" stroke="rgb(217,119,6)" stroke-width="2.4" stroke-linecap="round" />
  <line x1="28" y1="21" x2="32.5" y2="21" stroke="rgb(217,119,6)" stroke-width="2.2" stroke-linecap="round" />
  <line x1="72" y1="21" x2="67.5" y2="21" stroke="rgb(217,119,6)" stroke-width="2.2" stroke-linecap="round" />

  <!-- Glowing Lightbulb -->
  <g transform="translate(40, 10)">
    <circle cx="10" cy="10" r="9.5" fill="rgb(253,224,71)" stroke="rgb(202,138,4)" stroke-width="1.6" />
    <path d="M 5.5 16.5 L 14.5 16.5 L 13.2 22.5 L 6.8 22.5 Z" fill="rgb(203,213,225)" stroke="rgb(100,116,139)" stroke-width="1.2" />
    <line x1="8" y1="19" x2="12" y2="19" stroke="rgb(100,116,139)" stroke-width="1" />
    <line x1="8.3" y1="21" x2="11.7" y2="21" stroke="rgb(100,116,139)" stroke-width="1" />
    <!-- Filament & shine -->
    <path d="M 7.5 10 Q 10 6.5 12.5 10" stroke="rgb(255,255,255)" stroke-width="2" stroke-linecap="round" fill="none" />
  </g>

  <!-- Cheerful child centered cleanly (no ears or detached objects near head) -->
  <g transform="translate(18, 36)">
    <!-- Shoulders & sweater with white collar -->
    <path d="M 12 56 C 12 42 20 37 32 37 C 44 37 52 42 52 56 Z" fill="rgb(59,130,246)" stroke="rgb(37,99,235)" stroke-width="1.4" />
    <path d="M 25 37 L 32 44 L 39 37 Z" fill="rgb(255,255,255)" />
    <!-- Left arm down neatly -->
    <path d="M 15 44 L 10 53" stroke="rgb(37,99,235)" stroke-width="5" stroke-linecap="round" />
    <circle cx="9.5" cy="54" r="3" fill="rgb(254,215,170)" />
    <!-- Right arm waving out happily from shoulder (well below head) -->
    <path d="M 48 44 L 59 38" stroke="rgb(37,99,235)" stroke-width="5" stroke-linecap="round" />
    <circle cx="60.5" cy="36.5" r="3.4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="0.9" />
    <!-- Neck -->
    <rect x="28" y="33" width="8" height="6" rx="2" fill="rgb(254,215,170)" />
    <!-- Smooth Round Head -->
    <circle cx="32" cy="21" r="15" fill="rgb(254,215,170)" />
    <!-- Clean Hair Cap -->
    <path d="M 16.4 20.5 A 15.6 16.2 0 0 1 47.6 20.5 C 43.8 13.8 37.8 12.8 32 14.4 C 26.2 12.8 20.2 13.8 16.4 20.5 Z" fill="rgb(51,65,85)" />
    <!-- Expressive bright eyes & catchlights -->
    <circle cx="26.5" cy="20.5" r="2.1" fill="rgb(30,41,59)" />
    <circle cx="37.5" cy="20.5" r="2.1" fill="rgb(30,41,59)" />
    <circle cx="27.3" cy="19.6" r="0.8" fill="rgb(255,255,255)" />
    <circle cx="38.3" cy="19.6" r="0.8" fill="rgb(255,255,255)" />
    <!-- Rosy cheeks & happy 'Aha!' smile -->
    <circle cx="22.5" cy="24.5" r="2.4" fill="rgb(251,113,133)" opacity="0.65" />
    <circle cx="41.5" cy="24.5" r="2.4" fill="rgb(251,113,133)" opacity="0.65" />
    <path d="M 28 25.5 Q 32 30.5 36 25.5 Z" fill="rgb(225,29,72)" />
  </g>
</svg>`;

// 9. 씻어요 (Wash) - Hands washing under running faucet with clean splashes
export const SSISEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Water Faucet Top Center -->
  <path d="M 50 10 L 50 20 Q 50 26 44 26 L 38 26" stroke="rgb(148,163,184)" stroke-width="7" stroke-linecap="round" fill="none" />
  <circle cx="38" cy="26" r="5" fill="rgb(100,116,139)" />
  <!-- Water stream pouring down -->
  <path d="M 38 28 L 36 58 Q 42 62 48 58 L 44 28 Z" fill="rgb(56,189,248)" opacity="0.75" />
  <line x1="40" y1="30" x2="40" y2="54" stroke="rgb(255,255,255)" stroke-width="2" stroke-linecap="round" opacity="0.8" />
  <!-- Two Hands Washing Together -->
  <g transform="translate(18, 48)">
    <!-- Left Hand -->
    <path d="M 6 30 C 14 24 26 22 36 26 L 32 38 C 22 36 12 38 6 42 Z" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.8" />
    <!-- Right Hand scrubbing over -->
    <path d="M 58 32 C 50 24 38 22 28 26 L 32 38 C 42 36 52 38 58 44 Z" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.8" />
    <!-- Foamy Soap Lather Clusters -->
    <circle cx="32" cy="24" r="6" fill="rgb(255,255,255)" stroke="rgb(186,230,253)" stroke-width="1.2" />
    <circle cx="26" cy="28" r="5" fill="rgb(255,255,255)" stroke="rgb(186,230,253)" stroke-width="1.2" />
    <circle cx="38" cy="28" r="5" fill="rgb(255,255,255)" stroke="rgb(186,230,253)" stroke-width="1.2" />
    <circle cx="33" cy="32" r="4.5" fill="rgb(255,255,255)" stroke="rgb(186,230,253)" stroke-width="1.2" />
  </g>
  <!-- Water Splashes & Sparkles -->
  <circle cx="22" cy="56" r="3" fill="rgb(56,189,248)" />
  <circle cx="76" cy="58" r="3" fill="rgb(56,189,248)" />
  <path d="M 72 22 L 73.5 18 L 75 22 L 79 23.5 L 75 25 L 73.5 29 L 72 25 L 68 23.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 10. 급해요 (Urgent) - Kid hopping with crossed legs, nervous sweat bead, urgent restroom need!
export const GEUPHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Urgent Sweat Drop (Big comic blue drop) -->
  <g transform="translate(68, 22)">
    <path d="M 6 0 C 6 0 12 7 12 11 C 12 14.5 9.3 17 6 17 C 2.7 17 0 14.5 0 11 C 0 7 6 0 6 0 Z" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="1.2" />
    <circle cx="4" cy="11" r="1.5" fill="rgb(255,255,255)" />
  </g>
  <!-- Child Character in urgent posture -->
  <g transform="translate(24, 16)">
    <!-- Head & Anxious Face -->
    <circle cx="26" cy="18" r="16" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 9.2 16 C 7.9 -5.6 44.1 -5.6 42.8 16 C 42 11 36 7 26 7 C 16 7 10 11 9.2 16 Z" fill="rgb(51,65,85)" />
    <!-- Anxious Eyes (wide & tense) -->
    <circle cx="20" cy="18" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="32" cy="18" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="21" cy="17" r="1" fill="rgb(255,255,255)" />
    <circle cx="33" cy="17" r="1" fill="rgb(255,255,255)" />
    <!-- Tense wavy mouth -->
    <path d="M 20 26 Q 23 23 26 26 Q 29 29 32 26" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Body -->
    <path d="M 14 34 L 38 34 L 34 56 L 18 56 Z" fill="rgb(239,68,68)" />
    <!-- Hands holding lower tummy/crotch -->
    <ellipse cx="26" cy="52" rx="7" ry="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <!-- Tightly crossed legs hopping -->
    <path d="M 20 56 L 32 74" stroke="rgb(30,41,59)" stroke-width="6" stroke-linecap="round" />
    <path d="M 32 56 L 20 74" stroke="rgb(30,41,59)" stroke-width="6" stroke-linecap="round" />
    <ellipse cx="34" cy="75" rx="4.5" ry="3" fill="rgb(245,158,11)" />
    <ellipse cx="18" cy="75" rx="4.5" ry="3" fill="rgb(245,158,11)" />
  </g>
  <!-- Exclamation Mark Bubble -->
  <g transform="translate(14, 18)">
    <circle cx="8" cy="8" r="7" fill="rgb(239,68,68)" />
    <text x="8" y="11" font-family="'Nunito', sans-serif" font-size="10" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">!</text>
  </g>
</svg>`;

// ============================================================================
// CHAPTER 3: 건강 (Health)
// ============================================================================

// 12. 약 (Medicine) - Pediatric medicine bottle with measuring spoon & cute capsule
export const YAK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="82" rx="30" ry="7" fill="rgba(15,23,42,0.1)" />
  <!-- Medicine Syrup Bottle -->
  <g transform="translate(18, 20)">
    <!-- White Cap -->
    <rect x="12" y="4" width="16" height="8" rx="2" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="1.5" />
    <rect x="10" y="12" width="20" height="4" rx="1.5" fill="rgb(203,213,225)" />
    <!-- Glass Bottle Body -->
    <rect x="6" y="16" width="28" height="46" rx="7" fill="rgb(254,242,242)" stroke="rgb(239,68,68)" stroke-width="2.5" />
    <!-- Pink syrup level inside -->
    <rect x="8" y="28" width="24" height="32" rx="5" fill="rgb(244,63,94)" opacity="0.85" />
    <!-- Red Cross on bottle label -->
    <rect x="8" y="32" width="24" height="18" rx="2" fill="rgb(255,255,255)" />
    <rect x="18" y="35" width="4" height="12" rx="1" fill="rgb(220,38,38)" />
    <rect x="14" y="39" width="12" height="4" rx="1" fill="rgb(220,38,38)" />
  </g>
  <!-- Cute Medicine Capsule Pill (Two Tone Red & White) -->
  <g transform="translate(56, 38) rotate(35)">
    <rect x="0" y="0" width="14" height="28" rx="7" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
    <path d="M 0 14 L 14 14 L 14 21 Q 14 28 7 28 Q 0 28 0 21 Z" fill="rgb(255,255,255)" />
    <circle cx="5" cy="8" r="1.5" fill="rgb(255,255,255)" opacity="0.8" />
  </g>
  <!-- Measuring Medicine Spoon with Drop -->
  <g transform="translate(50, 64)">
    <ellipse cx="14" cy="8" rx="12" ry="6" fill="rgb(224,242,254)" stroke="rgb(56,189,248)" stroke-width="1.5" />
    <ellipse cx="14" cy="8" rx="8" ry="3.5" fill="rgb(244,63,94)" />
    <path d="M 26 8 L 40 8" stroke="rgb(148,163,184)" stroke-width="3" stroke-linecap="round" />
  </g>
</svg>`;

// 13. 아파요 (Sick / Hurts) - Sad child with ice pack on head and fever cheeks
export const APAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <!-- Ice Bag on top of head -->
  <g transform="translate(38, 10)">
    <!-- Ice pack cloth bag with wrinkles -->
    <ellipse cx="12" cy="18" rx="16" ry="10" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="1.8" />
    <!-- Cap & Tie -->
    <rect x="9" y="4" width="6" height="6" rx="2" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.2" />
    <ellipse cx="12" cy="10" rx="4" ry="2" fill="rgb(234,179,8)" />
    <!-- Ice sparkles -->
    <polygon points="6,16 9,14 11,18 8,20" fill="rgb(255,255,255)" opacity="0.75" />
  </g>
  <!-- Child Face -->
  <g transform="translate(26, 26)">
    <!-- Blanket covering shoulders -->
    <path d="M 0 58 C 4 48 16 46 24 46 C 32 46 44 48 48 58 Z" fill="rgb(167,243,208)" stroke="rgb(52,211,153)" stroke-width="2" />
    <!-- Face -->
    <circle cx="24" cy="28" r="20" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 3.2 24 C 1.6 -0.3 46.4 -0.3 44.8 24 C 44 18 36 12 24 12 C 12 12 4 18 3.2 24 Z" fill="rgb(51,65,85)" />
    <!-- Sad droopy eyebrows -->
    <path d="M 12 20 Q 17 24 21 21" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 27 21 Q 31 24 36 20" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Sick Teary Eyes -->
    <circle cx="16" cy="27" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="32" cy="27" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="17" cy="26" r="1" fill="rgb(255,255,255)" />
    <circle cx="33" cy="26" r="1" fill="rgb(255,255,255)" />
    <!-- Tear drop -->
    <path d="M 37 32 C 37 32 39 34 39 36 C 39 37.5 38 38.5 37 38.5 C 36 38.5 35 37.5 35 36 C 35 34 37 32 37 32 Z" fill="rgb(56,189,248)" />
    <!-- Fever red flush cheeks -->
    <circle cx="12" cy="33" r="4.5" fill="rgb(244,63,94)" opacity="0.65" />
    <circle cx="36" cy="33" r="4.5" fill="rgb(244,63,94)" opacity="0.65" />
    <!-- Sad frowning mouth -->
    <path d="M 20 38 Q 24 34 28 38" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// 14. 도와주세요 (Help me) - Child raising hand high with heart SOS speech bubble
export const DOWAJUSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Heart Speech Bubble (Top Right) -->
  <g transform="translate(56, 12)">
    <rect x="0" y="0" width="32" height="26" rx="8" fill="rgb(244,63,94)" />
    <polygon points="6,24 2,32 14,26" fill="rgb(244,63,94)" />
    <!-- Heart Icon inside -->
    <path d="M 16 7 C 16 3 11 0 7 4 C 3 8 7 14 16 19 C 25 14 29 8 25 4 C 21 0 16 3 16 7 Z" fill="rgb(255,255,255)" />
  </g>
  <!-- Child raising hand high -->
  <g transform="translate(18, 22)">
    <!-- Body -->
    <path d="M 14 56 C 14 42 22 38 30 38 C 38 38 46 42 46 56 Z" fill="rgb(251,146,60)" />
    <!-- Face -->
    <circle cx="28" cy="26" r="16" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 11.2 24 C 9.9 2.4 46.1 2.4 44.8 24 C 44 18 38 14 28 14 C 18 14 12 18 11.2 24 Z" fill="rgb(51,65,85)" />
    <!-- Earnest Wide Eyes -->
    <circle cx="23" cy="25" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="33" cy="25" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="24" cy="24" r="1" fill="rgb(255,255,255)" />
    <circle cx="34" cy="24" r="1" fill="rgb(255,255,255)" />
    <circle cx="20" cy="30" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="36" cy="30" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <!-- Speaking mouth -->
    <path d="M 25 32 Q 28 36 31 32" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Right Arm Raised High with open palm -->
    <line x1="42" y1="42" x2="48" y2="12" stroke="rgb(254,215,170)" stroke-width="6" stroke-linecap="round" />
    <!-- Open Palm Fingers -->
    <ellipse cx="49" cy="8" rx="5" ry="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  </g>
</svg>`;

// 15. 열나요 (Have a fever) - Forehead cooling pad + clinical thermometer showing fever
export const YEOLNAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Hot radiant fever waves -->
  <path d="M 24 16 Q 28 12 24 8" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" fill="none" />
  <path d="M 32 14 Q 36 10 32 6" stroke="rgb(239,68,68)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M 68 14 Q 72 10 68 6" stroke="rgb(239,68,68)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <!-- Child Face -->
  <g transform="translate(22, 22)">
    <circle cx="28" cy="32" r="22" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 5.2 28 C 3.4 1.1 52.6 1.1 50.8 28 C 50 20 42 14 28 14 C 14 14 6 20 5.2 28 Z" fill="rgb(51,65,85)" />
    <!-- Blue Hydrogel Cooling Pad on Forehead (열패치) -->
    <rect x="14" y="16" width="28" height="10" rx="3" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="1.5" />
    <circle cx="18" cy="21" r="1" fill="rgb(255,255,255)" />
    <circle cx="38" cy="21" r="1" fill="rgb(255,255,255)" />
    <!-- Droopy Fever Eyes -->
    <line x1="16" y1="32" x2="24" y2="34" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="40" y1="32" x2="32" y2="34" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <!-- Bright Red Fever Cheeks -->
    <circle cx="14" cy="38" r="5.5" fill="rgb(239,68,68)" opacity="0.75" />
    <circle cx="42" cy="38" r="5.5" fill="rgb(239,68,68)" opacity="0.75" />
    <!-- Mouth holding Thermometer -->
    <path d="M 24 44 Q 28 42 32 44" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Digital / Glass Thermometer angled out -->
    <g transform="translate(28, 42) rotate(22)">
      <rect x="0" y="-3" width="28" height="6" rx="2" fill="rgb(255,255,255)" stroke="rgb(100,116,139)" stroke-width="1.2" />
      <circle cx="28" cy="0" r="4" fill="rgb(239,68,68)" />
      <rect x="12" y="-1.5" width="16" height="3" fill="rgb(239,68,68)" />
    </g>
  </g>
</svg>`;

// 16. 배 (Stomach) - Child holding hurting tummy with swirling pain lines
export const BAE_STOMACH_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <g transform="translate(20, 14)">
    <!-- Face -->
    <circle cx="30" cy="20" r="16" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 13.2 18 C 11.9 -3.6 48.1 -3.6 46.8 18 C 46 12 40 8 30 8 C 20 8 14 12 13.2 18 Z" fill="rgb(51,65,85)" />
    <!-- Sad squinting eyes -->
    <path d="M 22 19 Q 25 16 27 20" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 33 20 Q 35 16 38 19" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <circle cx="19" cy="24" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="41" cy="24" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 26 27 Q 30 25 34 27" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Body with Tummy Focus -->
    <path d="M 12 36 L 48 36 L 46 68 L 14 68 Z" fill="rgb(251,146,60)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <!-- Tummy Pain Swirl (소용돌이 배 아픔) -->
    <path d="M 30 46 C 36 46 38 52 32 55 C 26 58 24 50 30 50 Z" stroke="rgb(239,68,68)" stroke-width="2" fill="none" stroke-linecap="round" />
    <!-- Both Hands Pressed firmly against Tummy -->
    <ellipse cx="20" cy="52" rx="7" ry="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <ellipse cx="40" cy="52" rx="7" ry="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  </g>
  <!-- Sparkles of pain -->
  <circle cx="20" cy="62" r="2" fill="rgb(239,68,68)" />
  <circle cx="80" cy="64" r="2.5" fill="rgb(239,68,68)" />
</svg>`;

// 17. 머리 (Head) - Child gently holding aching head with cartoon dizziness stars
export const MEORI_HEAD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <!-- Dizzy Spinning Stars & Spiral Orbit around head -->
  <ellipse cx="50" cy="22" rx="30" ry="8" fill="none" stroke="rgb(192,132,252)" stroke-width="1.5" stroke-dasharray="3,3" />
  <path d="M 22 18 L 24 14 L 26 18 L 30 19 L 26 21 L 24 25 L 22 21 L 18 19 Z" fill="rgb(250,204,21)" />
  <path d="M 74 22 L 76 18 L 78 22 L 82 23 L 78 25 L 76 29 L 74 25 L 70 23 Z" fill="rgb(250,204,21)" />
  <!-- Child Holding Head with Both Hands -->
  <g transform="translate(22, 24)">
    <circle cx="28" cy="30" r="20" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 7.2 26 C 5.6 1.7 50.4 1.7 48.8 26 C 48 18 40 12 28 12 C 16 12 8 18 7.2 26 Z" fill="rgb(51,65,85)" />
    <!-- Dizzy spiral eyes -->
    <path d="M 17 28 C 17 26 21 26 21 28 C 21 31 18 31 18 29" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <path d="M 33 28 C 33 26 37 26 37 28 C 37 31 34 31 34 29" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <!-- Frown mouth -->
    <path d="M 24 38 Q 28 35 32 38" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Both Hands Cupping Head on Sides -->
    <ellipse cx="6" cy="26" rx="5.5" ry="7" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <ellipse cx="50" cy="26" rx="5.5" ry="7" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- Body -->
    <path d="M 12 50 C 12 44 18 42 28 42 C 38 42 44 44 44 50 Z" fill="rgb(139,92,246)" />
  </g>
</svg>`;

// 18. 다쳤어요 (Got hurt) - Knee/elbow with cute adhesive bandage (반창고) & heart
export const DACHYEOSSEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <!-- Child Knee/Leg Profile -->
  <g transform="translate(18, 16)">
    <!-- Leg Joint -->
    <path d="M 6 12 Q 24 16 36 28 Q 48 40 44 68 L 22 68 Q 28 46 16 36 Q 4 28 6 12 Z" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="2.5" />
    <!-- Cute Adhesive Cross Band-aid (반창고) -->
    <!-- Strip 1 (Angled right) -->
    <g transform="translate(32, 34) rotate(45)">
      <rect x="-16" y="-6" width="32" height="12" rx="6" fill="rgb(254,205,211)" stroke="rgb(244,63,94)" stroke-width="1.5" />
      <rect x="-5" y="-6" width="10" height="12" fill="rgb(255,255,255)" />
      <!-- Breathing holes -->
      <circle cx="-10" cy="0" r="1" fill="rgb(244,63,94)" />
      <circle cx="10" cy="0" r="1" fill="rgb(244,63,94)" />
    </g>
    <!-- Strip 2 (Angled left cross) -->
    <g transform="translate(32, 34) rotate(-45)">
      <rect x="-16" y="-6" width="32" height="12" rx="6" fill="rgb(254,205,211)" stroke="rgb(244,63,94)" stroke-width="1.5" />
      <rect x="-5" y="-6" width="10" height="12" fill="rgb(255,255,255)" />
      <!-- Red Cross in center -->
      <rect x="-2" y="-4" width="4" height="8" rx="0.5" fill="rgb(220,38,38)" />
      <rect x="-4" y="-2" width="8" height="4" rx="0.5" fill="rgb(220,38,38)" />
    </g>
  </g>
  <!-- Healing heart above injury -->
  <path d="M 72 24 C 72 19 67 16 63 19 C 59 22 63 28 72 34 C 81 28 85 22 81 19 C 77 16 72 19 72 24 Z" fill="rgb(244,63,94)" />
  <circle cx="67" cy="21" r="1.5" fill="rgb(255,255,255)" />
</svg>`;

// 19. 괜찮아요 (I'm okay) - Cheerful child giving thumbs up with bright smile
export const GWAENCHANA_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Child Character -->
  <g transform="translate(18, 16)">
    <!-- Body -->
    <path d="M 16 56 C 16 42 26 38 36 38 C 46 38 56 42 56 56 Z" fill="rgb(16,185,129)" />
    <!-- Face -->
    <circle cx="36" cy="24" r="18" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 17.2 22 C 15.8 -2.3 56.2 -2.3 54.8 22 C 54 16 46 12 36 12 C 26 12 18 16 17.2 22 Z" fill="rgb(51,65,85)" />
    <!-- Winking confident face (One open bright eye, one cheerful wink) -->
    <circle cx="30" cy="23" r="3" fill="rgb(30,41,59)" />
    <circle cx="31" cy="22" r="1" fill="rgb(255,255,255)" />
    <path d="M 40 23 Q 44 20 48 23" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <!-- Big joyful smile -->
    <path d="M 30 29 Q 36 36 42 29" stroke="rgb(190,18,60)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="26" cy="27" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="46" cy="27" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <!-- Big Thumbs-Up Hand in foreground -->
    <g transform="translate(6, 32)">
      <rect x="2" y="14" width="12" height="18" rx="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
      <!-- Thumb pointing up -->
      <path d="M 6 16 L 6 4 Q 6 0 10 0 Q 14 0 14 4 L 14 16 Z" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    </g>
  </g>
  <!-- Sparkles -->
  <path d="M 76 26 L 78 20 L 80 26 L 86 28 L 80 30 L 78 36 L 76 30 L 70 28 Z" fill="rgb(250,204,21)" />
</svg>`;

// 20. 쉬어요 (Rest) - Child resting peacefully in comfy bed under soft quilt
export const SWI_EO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Wooden Bed Frame -->
  <g transform="translate(10, 22)">
    <rect x="4" y="24" width="72" height="42" rx="6" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
    <!-- Pillow -->
    <rect x="8" y="28" width="22" height="16" rx="6" fill="rgb(224,231,255)" stroke="rgb(165,180,252)" stroke-width="1.5" />
    <!-- Child Head on Pillow (Sleeping with serene closed eyes) -->
    <circle cx="22" cy="36" r="10" fill="rgb(254,215,170)" />
    <path d="M 11.2 34 C 10.4 21.3 33.6 21.3 32.8 34 Z" fill="rgb(51,65,85)" />
    <!-- Peaceful closed eye -->
    <path d="M 19 37 Q 22 39 25 37" stroke="rgb(30,41,59)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <circle cx="24" cy="40" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <!-- Soft Quilt / Blanket pulled up to shoulders -->
    <path d="M 28 38 L 76 38 L 76 66 L 24 66 Z" fill="rgb(199,210,254)" stroke="rgb(129,140,248)" stroke-width="2" />
    <!-- Quilt Pattern (Polka dots / stars) -->
    <circle cx="40" cy="50" r="2" fill="rgb(255,255,255)" />
    <circle cx="56" cy="48" r="2" fill="rgb(255,255,255)" />
    <circle cx="68" cy="54" r="2" fill="rgb(255,255,255)" />
    <circle cx="48" cy="58" r="2" fill="rgb(255,255,255)" />
  </g>
  <!-- Sleep 'Zzz' Floating -->
  <text x="68" y="24" font-family="'Nunito', sans-serif" font-size="11" font-weight="900" fill="rgb(129,140,248)">Z</text>
  <text x="76" y="17" font-family="'Nunito', sans-serif" font-size="8.5" font-weight="900" fill="rgb(165,180,252)">z</text>
</svg>`;

// ============================================================================
// CHAPTER 4: 교실 (Classroom)
// ============================================================================

// 21. 선생님 (Teacher) - Warm smiling elementary teacher with pointer & book
export const SEONSAENGNIM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <g transform="translate(18, 12)">
    <!-- Professional teacher attire -->
    <path d="M 18 76 C 18 58 28 54 44 54 C 60 54 70 58 70 76 Z" fill="rgb(2,132,199)" />
    <polygon points="36,54 44,66 52,54" fill="rgb(255,255,255)" />
    <polygon points="41,54 44,72 47,54" fill="rgb(239,68,68)" />
    <!-- Face -->
    <circle cx="44" cy="34" r="18" fill="rgb(254,215,170)" />
    <!-- Hair with neat teacher bun/style -->
    <path d="M 24 30 C 22.6 8.4 65.4 8.4 64 30 C 64 22 56 16 44 16 C 32 16 24 22 24 30 Z" fill="rgb(67,56,202)" />
    <circle cx="44" cy="12" r="6" fill="rgb(67,56,202)" />
    <!-- Friendly Teacher Glasses -->
    <circle cx="37" cy="32" r="5" fill="none" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <circle cx="51" cy="32" r="5" fill="none" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <line x1="42" y1="32" x2="46" y2="32" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- Eyes behind glasses -->
    <circle cx="37" cy="32" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="51" cy="32" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="32" cy="38" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="56" cy="38" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 39 40 Q 44 44 49 40" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Teaching Pointer Stick in Hand -->
    <line x1="62" y1="58" x2="78" y2="24" stroke="rgb(217,119,6)" stroke-width="3" stroke-linecap="round" />
    <circle cx="78" cy="24" r="2.5" fill="rgb(239,68,68)" />
    <!-- Book in other hand -->
    <rect x="12" y="52" width="16" height="20" rx="2" fill="rgb(16,185,129)" stroke="rgb(5,150,105)" stroke-width="1.5" transform="rotate(-15 20 62)" />
  </g>
</svg>`;

// 22. 칠판 (Chalkboard) - Wooden frame school blackboard with chalk & eraser
export const CHILPAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(241,245,249)" />
  <!-- Wooden Stand Legs -->
  <line x1="24" y1="68" x2="16" y2="88" stroke="rgb(180,83,9)" stroke-width="4" stroke-linecap="round" />
  <line x1="76" y1="68" x2="84" y2="88" stroke="rgb(180,83,9)" stroke-width="4" stroke-linecap="round" />
  <!-- Blackboard Outer Wooden Frame -->
  <rect x="12" y="18" width="76" height="54" rx="5" fill="rgb(217,119,6)" stroke="rgb(146,64,14)" stroke-width="2" />
  <!-- Dark Green Chalkboard Slate Surface -->
  <rect x="16" y="22" width="68" height="46" rx="3" fill="rgb(22,101,52)" />
  <!-- Cute Chalk Writing (ㄱ ㄴ ㄷ & ABC) -->
  <text x="24" y="38" font-family="'NanumBarunGothic', sans-serif" font-size="11" font-weight="900" fill="rgb(255,255,255)">ㄱ ㄴ ㄷ</text>
  <text x="24" y="54" font-family="'Nunito', sans-serif" font-size="10" font-weight="900" fill="rgb(254,240,138)">A B C</text>
  <!-- Mini drawn star on board -->
  <path d="M 68 32 L 69.5 35 L 73 35 L 70 37 L 71 40 L 68 38 L 65 40 L 66 37 L 63 35 L 66.5 35 Z" fill="rgb(250,204,21)" />
  <!-- Bottom Chalk Tray -->
  <rect x="10" y="68" width="80" height="4" rx="2" fill="rgb(180,83,9)" />
  <!-- Pieces of Chalk & Wooden Eraser on tray -->
  <rect x="26" y="66" width="6" height="2.5" rx="1" fill="rgb(255,255,255)" />
  <rect x="34" y="66" width="6" height="2.5" rx="1" fill="rgb(254,240,138)" />
  <!-- Blackboard Eraser -->
  <rect x="52" y="64" width="14" height="4.5" rx="1" fill="rgb(120,53,15)" />
  <rect x="52" y="67" width="14" height="2" fill="rgb(71,85,105)" />
</svg>`;

// 23. 자리 (Seat) - Elementary school wooden desk and chair
export const JARI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.6" />
  <!-- Floor shadow -->
  <ellipse cx="50" cy="85" rx="36" ry="6" fill="rgba(15,23,42,0.12)" />
  <!-- Classroom Chair (Left) -->
  <g transform="translate(16, 32)">
    <!-- Backrest -->
    <rect x="4" y="0" width="22" height="12" rx="3" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="1.8" />
    <!-- Backrest support metal poles -->
    <line x1="8" y1="12" x2="8" y2="28" stroke="rgb(100,116,139)" stroke-width="2.5" />
    <line x1="22" y1="12" x2="22" y2="28" stroke="rgb(100,116,139)" stroke-width="2.5" />
    <!-- Seat Board -->
    <rect x="2" y="26" width="26" height="6" rx="2.5" fill="rgb(245,158,11)" stroke="rgb(180,83,9)" stroke-width="1.8" />
    <!-- Chair Legs -->
    <line x1="6" y1="32" x2="4" y2="52" stroke="rgb(71,85,105)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="24" y1="32" x2="26" y2="52" stroke="rgb(71,85,105)" stroke-width="2.5" stroke-linecap="round" />
  </g>
  <!-- Classroom Desk (Right) -->
  <g transform="translate(42, 24)">
    <!-- Desk Wooden Top Board -->
    <rect x="0" y="16" width="44" height="8" rx="3" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="2" />
    <!-- Pencil groove on desk -->
    <line x1="8" y1="18" x2="36" y2="18" stroke="rgb(180,83,9)" stroke-width="1" />
    <!-- Book Storage Basket underneath -->
    <rect x="4" y="24" width="36" height="12" rx="2" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="1.5" />
    <!-- Textbook in basket -->
    <rect x="8" y="27" width="20" height="6" fill="rgb(59,130,246)" />
    <!-- Steel Desk Legs -->
    <line x1="6" y1="36" x2="4" y2="60" stroke="rgb(71,85,105)" stroke-width="3" stroke-linecap="round" />
    <line x1="38" y1="36" x2="40" y2="60" stroke="rgb(71,85,105)" stroke-width="3" stroke-linecap="round" />
    <!-- Foot rest bar -->
    <line x1="5" y1="52" x2="39" y2="52" stroke="rgb(100,116,139)" stroke-width="2" />
  </g>
</svg>`;

// 24. 들어요 (Listen) - Child cupping hand to ear with listening sound waves & notes
export const DEUREOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Sound Waves entering ear (Right) -->
  <path d="M 66 32 Q 72 40 66 48" stroke="rgb(99,102,241)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M 72 26 Q 80 40 72 54" stroke="rgb(129,140,248)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M 78 20 Q 88 40 78 60" stroke="rgb(165,180,252)" stroke-width="2" stroke-linecap="round" fill="none" />
  <!-- Musical note floating -->
  <path d="M 76 16 L 82 14 L 82 22 L 76 24 Z" fill="rgb(234,179,8)" />
  <circle cx="76" cy="24" r="3" fill="rgb(234,179,8)" />
  <!-- Child Cupping Hand to Ear -->
  <g transform="translate(18, 16)">
    <!-- Body -->
    <path d="M 16 56 C 16 42 26 38 36 38 C 46 38 56 42 56 56 Z" fill="rgb(14,165,233)" />
    <!-- Face (Head tilted right listening) -->
    <circle cx="36" cy="26" r="18" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 17.2 24 C 15.8 -0.3 56.2 -0.3 54.8 24 C 54 16 46 12 36 12 C 26 12 18 16 17.2 24 Z" fill="rgb(51,65,85)" />
    <!-- Big Big Listening Ear -->
    <ellipse cx="54" cy="27" rx="6" ry="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <path d="M 53 24 Q 56 27 53 30" stroke="rgb(234,88,12)" stroke-width="1.5" fill="none" />
    <!-- Attentive eyes looking forward -->
    <circle cx="28" cy="25" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="40" cy="25" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="29" cy="24" r="1" fill="rgb(255,255,255)" />
    <circle cx="41" cy="24" r="1" fill="rgb(255,255,255)" />
    <circle cx="24" cy="31" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="46" cy="31" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 32 33 Q 36 37 40 33" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Hand Cupping right behind the ear -->
    <g transform="translate(48, 14)">
      <ellipse cx="8" cy="14" rx="5" ry="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
      <line x1="8" y1="22" x2="2" y2="38" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" />
    </g>
  </g>
</svg>`;

// 25. 봐요 (Look / Watch) - Big curious sparkling eyes focusing attentively forward
export const BWAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Focus Light Beam radiating forward -->
  <polygon points="50,44 88,18 88,70" fill="rgb(254,240,138)" opacity="0.45" />
  <!-- Pair of Big Sparkling Cartoon Eyes -->
  <g transform="translate(12, 24)">
    <!-- Left Eye Outer -->
    <ellipse cx="24" cy="24" rx="18" ry="22" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="3" />
    <!-- Left Pupil (Deep Blue / Black) -->
    <ellipse cx="28" cy="24" rx="11" ry="14" fill="rgb(30,58,138)" />
    <ellipse cx="29" cy="24" rx="8" ry="11" fill="rgb(15,23,42)" />
    <!-- Large Catchlight Sparkles -->
    <circle cx="25" cy="18" r="4.5" fill="rgb(255,255,255)" />
    <circle cx="33" cy="28" r="2.2" fill="rgb(255,255,255)" />
    <!-- Right Eye Outer -->
    <ellipse cx="56" cy="24" rx="18" ry="22" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="3" />
    <!-- Right Pupil -->
    <ellipse cx="60" cy="24" rx="11" ry="14" fill="rgb(30,58,138)" />
    <ellipse cx="61" cy="24" rx="8" ry="11" fill="rgb(15,23,42)" />
    <!-- Catchlights -->
    <circle cx="57" cy="18" r="4.5" fill="rgb(255,255,255)" />
    <circle cx="65" cy="28" r="2.2" fill="rgb(255,255,255)" />
    <!-- Cheerful Eyelashes & Brows -->
    <path d="M 10 6 Q 24 0 38 6" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 42 6 Q 56 0 70 6" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- Cute pink cheeks under eyes -->
    <circle cx="16" cy="46" r="4" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="64" cy="46" r="4" fill="rgb(244,114,182)" opacity="0.6" />
  </g>
  <!-- Sparkles in field of vision -->
  <path d="M 80 40 L 82 34 L 84 40 L 90 42 L 84 44 L 82 50 L 80 44 L 74 42 Z" fill="rgb(250,204,21)" />
</svg>`;

// 26. 친구 (Friend) - Two diverse elementary friends with arms over shoulders
export const CHINGU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.6" />
  <!-- Heart above friends -->
  <path d="M 50 16 C 50 11 44 8 40 12 C 36 16 40 22 50 28 C 60 22 64 16 60 12 C 56 8 50 11 50 16 Z" fill="rgb(244,63,94)" />
  <!-- Left Friend (Yellow Shirt) -->
  <g transform="translate(16, 26)">
    <!-- Body -->
    <path d="M 8 50 C 8 36 18 32 28 32 C 38 32 46 36 46 50 Z" fill="rgb(251,191,36)" />
    <!-- Face -->
    <circle cx="26" cy="22" r="14" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 11.2 20 C 10.1 1.6 41.9 1.6 40.8 20 C 40 14 34 10 26 10 C 18 10 12 14 11.2 20 Z" fill="rgb(180,83,9)" />
    <!-- Eye & smile -->
    <circle cx="22" cy="21" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="30" cy="21" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="18" cy="26" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 23 27 Q 26 31 29 27" stroke="rgb(190,18,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
  </g>
  <!-- Right Friend (Blue Shirt, Arm around shoulder) -->
  <g transform="translate(42, 26)">
    <!-- Body -->
    <path d="M 14 50 C 14 36 24 32 34 32 C 44 32 52 36 52 50 Z" fill="rgb(59,130,246)" />
    <!-- Face -->
    <circle cx="32" cy="22" r="14" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 17.2 20 C 16.1 1.6 47.9 1.6 46.8 20 C 46 14 40 10 32 10 C 24 10 18 14 17.2 20 Z" fill="rgb(30,41,59)" />
    <!-- Eye & smile -->
    <circle cx="28" cy="21" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="36" cy="21" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="40" cy="26" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 29 27 Q 32 31 35 27" stroke="rgb(190,18,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
  </g>
  <!-- Arm draped over shoulder -->
  <path d="M 38 52 Q 50 46 62 52" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
</svg>`;

// 27. 화면 (Screen) - Classroom smart screen TV with colorful educational graphics
export const HWAMYEON_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(241,245,249)" />
  <!-- Stand & Base -->
  <ellipse cx="50" cy="84" rx="20" ry="5" fill="rgb(100,116,139)" />
  <rect x="47" y="68" width="6" height="16" fill="rgb(71,85,105)" />
  <!-- TV Monitor Outer Frame -->
  <rect x="12" y="16" width="76" height="54" rx="6" fill="rgb(30,41,59)" stroke="rgb(15,23,42)" stroke-width="2.5" />
  <!-- Glowing Display Screen -->
  <rect x="16" y="20" width="68" height="46" rx="3" fill="rgb(224,242,254)" />
  <!-- Content on screen: Rainbow & Smiling Sun -->
  <!-- Rainbow Arcs -->
  <path d="M 22 56 A 28 28 0 0 1 78 56" stroke="rgb(239,68,68)" stroke-width="4" fill="none" />
  <path d="M 26 56 A 24 24 0 0 1 74 56" stroke="rgb(245,158,11)" stroke-width="4" fill="none" />
  <path d="M 30 56 A 20 20 0 0 1 70 56" stroke="rgb(16,185,129)" stroke-width="4" fill="none" />
  <!-- Smiling Mini Sun in top left corner of screen -->
  <circle cx="28" cy="30" r="6" fill="rgb(250,204,21)" />
  <circle cx="26" cy="29" r="0.8" fill="rgb(113,63,18)" />
  <circle cx="30" cy="29" r="0.8" fill="rgb(113,63,18)" />
  <path d="M 26 32 Q 28 34 30 32" stroke="rgb(113,63,18)" stroke-width="0.8" fill="none" />
  <!-- Power LED Indicator dot -->
  <circle cx="50" cy="67" r="1.5" fill="rgb(34,197,94)" />
</svg>`;

// 28. 앉아요 (Sit) - Child sitting neatly with proper upright posture on classroom chair
export const ANJAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Floor shadow -->
  <ellipse cx="50" cy="85" rx="26" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Chair in profile -->
  <g transform="translate(20, 24)">
    <!-- Backrest -->
    <rect x="6" y="10" width="5" height="24" rx="2" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="1.5" />
    <line x1="8.5" y1="34" x2="8.5" y2="40" stroke="rgb(100,116,139)" stroke-width="2.5" />
    <!-- Seat -->
    <rect x="6" y="38" width="28" height="5" rx="2" fill="rgb(245,158,11)" stroke="rgb(180,83,9)" stroke-width="1.5" />
    <!-- Legs -->
    <line x1="10" y1="43" x2="8" y2="60" stroke="rgb(71,85,105)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="30" y1="43" x2="32" y2="60" stroke="rgb(71,85,105)" stroke-width="2.5" stroke-linecap="round" />
  </g>
  <!-- Child sitting in upright proper posture (바른 자세) -->
  <g transform="translate(30, 16)">
    <!-- Head & Face -->
    <circle cx="18" cy="14" r="12" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 5.2 12 C 4.2 -3.7 31.8 -3.7 30.8 12 C 30 8 24 4 18 4 C 12 4 6 8 5.2 12 Z" fill="rgb(51,65,85)" />
    <!-- Eye & smile -->
    <circle cx="22" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="24" cy="17" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 20 18 Q 23 21 26 18" stroke="rgb(190,18,60)" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <!-- Torso (Upright) -->
    <rect x="8" y="24" width="16" height="24" rx="4" fill="rgb(14,165,233)" />
    <!-- Hands placed neatly on knees -->
    <ellipse cx="28" cy="46" rx="4" ry="3" fill="rgb(254,215,170)" />
    <!-- Upper Leg (Horizontal on seat) -->
    <rect x="10" y="44" width="20" height="7" rx="3" fill="rgb(30,41,59)" />
    <!-- Lower Leg (Vertical down to floor) -->
    <rect x="24" y="48" width="6" height="18" rx="3" fill="rgb(30,41,59)" />
    <!-- Shoe -->
    <ellipse cx="28" cy="67" rx="5" ry="2.5" fill="rgb(239,68,68)" />
  </g>
  <!-- Good posture check star -->
  <path d="M 76 22 L 77.5 18 L 79 22 L 83 23.5 L 79 25 L 77.5 29 L 76 25 L 72 23.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 29. 일어나요 (Stand up) - Child standing up cleanly from desk with upward motion arrows
export const IREONAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Upward Rising Motion Arrows -->
  <g transform="translate(14, 28)">
    <path d="M 6 24 L 6 8 L 2 12 M 6 8 L 10 12" stroke="rgb(16,185,129)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  </g>
  <g transform="translate(76, 28)">
    <path d="M 6 24 L 6 8 L 2 12 M 6 8 L 10 12" stroke="rgb(16,185,129)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  </g>
  <!-- Floor shadow -->
  <ellipse cx="50" cy="86" rx="20" ry="5" fill="rgba(15,23,42,0.12)" />
  <!-- Child Standing Tall and Proud -->
  <g transform="translate(32, 12)">
    <!-- Head & Cheerful Face -->
    <circle cx="18" cy="14" r="12" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 5.2 12 C 4.2 -3.7 31.8 -3.7 30.8 12 C 30 7 24 4 18 4 C 12 4 6 7 5.2 12 Z" fill="rgb(51,65,85)" />
    <!-- Confident Eyes & Smile -->
    <circle cx="14" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="22" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="10" cy="17" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="26" cy="17" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 15 19 Q 18 23 21 19" stroke="rgb(190,18,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <!-- Torso (Standing tall) -->
    <rect x="8" y="24" width="20" height="24" rx="4" fill="rgb(239,68,68)" />
    <!-- Arms neatly by side -->
    <rect x="3" y="26" width="5" height="18" rx="2.5" fill="rgb(254,215,170)" />
    <rect x="28" y="26" width="5" height="18" rx="2.5" fill="rgb(254,215,170)" />
    <!-- Standing straight legs -->
    <rect x="10" y="46" width="7" height="25" rx="3" fill="rgb(30,41,59)" />
    <rect x="19" y="46" width="7" height="25" rx="3" fill="rgb(30,41,59)" />
    <!-- Shoes -->
    <ellipse cx="13" cy="72" rx="4.5" ry="2.5" fill="rgb(245,158,11)" />
    <ellipse cx="23" cy="72" rx="4.5" ry="2.5" fill="rgb(245,158,11)" />
  </g>
</svg>`;

// 30. 따라해요 (Repeat after me) - Echoing speech bubbles: Teacher speaking & student repeating
export const TTARAHAE_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Teacher's Speech Bubble (Left, Magenta) -->
  <g transform="translate(14, 16)">
    <rect x="0" y="0" width="34" height="28" rx="10" fill="rgb(236,72,153)" />
    <polygon points="6,24 2,32 14,27" fill="rgb(236,72,153)" />
    <text x="17" y="18" font-family="'NanumBarunGothic', sans-serif" font-size="10.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">안녕!</text>
  </g>
  <!-- Transfer Arrow in middle -->
  <path d="M 46 32 L 54 32 M 51 28 L 55 32 L 51 36" stroke="rgb(139,92,246)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  <!-- Student's Echoing Bubble (Right, Violet) -->
  <g transform="translate(52, 28)">
    <rect x="0" y="0" width="34" height="28" rx="10" fill="rgb(139,92,246)" />
    <polygon points="28,24 32,32 20,27" fill="rgb(139,92,246)" />
    <text x="17" y="18" font-family="'NanumBarunGothic', sans-serif" font-size="10.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">안녕!</text>
  </g>
  <!-- Two cute characters below echoing each other -->
  <!-- Left Speaker (Teacher/Leader) -->
  <circle cx="28" cy="72" r="14" fill="rgb(254,215,170)" />
  <circle cx="24" cy="70" r="2" fill="rgb(30,41,59)" />
  <circle cx="32" cy="70" r="2" fill="rgb(30,41,59)" />
  <ellipse cx="28" cy="76" rx="3" ry="2.5" fill="rgb(190,18,60)" />
  <!-- Right Listener repeating -->
  <circle cx="72" cy="72" r="14" fill="rgb(254,215,170)" />
  <circle cx="68" cy="70" r="2" fill="rgb(30,41,59)" />
  <circle cx="76" cy="70" r="2" fill="rgb(30,41,59)" />
  <ellipse cx="72" cy="76" rx="3" ry="2.5" fill="rgb(190,18,60)" />
  <!-- Musical notes -->
  <path d="M 50 70 L 54 68 L 54 74 L 50 75 Z" fill="rgb(250,204,21)" />
  <circle cx="50" cy="75" r="2" fill="rgb(250,204,21)" />
</svg>`;

// ============================================================================
// CHAPTER 5: 학습 (Learning)
// ============================================================================

// 31. 책 (Book) - Colorful open illustrated storybook with fluttered pages
export const CHAEK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <!-- Book Shadow -->
  <ellipse cx="50" cy="78" rx="34" ry="7" fill="rgba(15,23,42,0.12)" />
  <!-- Open Book Spreads -->
  <g transform="translate(14, 24)">
    <!-- Book Cover Spine (Red/Orange) -->
    <path d="M 0 46 Q 36 54 72 46 L 72 48 Q 36 56 0 48 Z" fill="rgb(234,88,12)" />
    <!-- Left Open Page -->
    <path d="M 36 46 Q 20 42 2 36 L 4 10 Q 20 18 36 20 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.8" />
    <path d="M 36 44 Q 20 40 4 34 L 6 12 Q 20 19 36 20 Z" fill="rgb(248,250,252)" />
    <!-- Right Open Page -->
    <path d="M 36 46 Q 52 42 70 36 L 68 10 Q 52 18 36 20 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.8" />
    <path d="M 36 44 Q 52 40 68 34 L 66 12 Q 52 19 36 20 Z" fill="rgb(248,250,252)" />
    <!-- Text lines on left page -->
    <line x1="12" y1="20" x2="28" y2="23" stroke="rgb(148,163,184)" stroke-width="1.8" stroke-linecap="round" />
    <line x1="11" y1="26" x2="29" y2="29" stroke="rgb(148,163,184)" stroke-width="1.8" stroke-linecap="round" />
    <line x1="10" y1="32" x2="26" y2="35" stroke="rgb(148,163,184)" stroke-width="1.8" stroke-linecap="round" />
    <!-- Picture on right page (Sun & mountain) -->
    <circle cx="48" cy="22" r="3" fill="rgb(250,204,21)" />
    <polygon points="42,32 50,24 58,32" fill="rgb(34,197,94)" />
    <polygon points="52,32 58,26 64,32" fill="rgb(22,163,74)" />
    <!-- Ribbon Bookmark in middle -->
    <path d="M 36 20 L 36 48 L 40 44 L 44 48 L 44 20 Z" fill="rgb(239,68,68)" />
  </g>
  <!-- Sparkles -->
  <path d="M 76 18 L 78 12 L 80 18 L 86 20 L 80 22 L 78 28 L 76 22 L 70 20 Z" fill="rgb(250,204,21)" />
</svg>`;

// 32. 교과서 (Textbook) - Official elementary Korean textbook with "국어" label & bookmark
export const GYOGWASEO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Shadow -->
  <rect x="22" y="18" width="58" height="72" rx="7" fill="rgba(15,23,42,0.12)" />
  <!-- Textbook Cover (Premium Sky Blue & Navy Spine) -->
  <g transform="translate(20, 14)">
    <!-- Book Thickness / Paper Pages edge -->
    <path d="M 54 6 L 58 6 L 58 72 L 54 72 Z" fill="rgb(241,245,249)" stroke="rgb(203,213,225)" stroke-width="1.5" />
    <!-- Front Cover -->
    <rect x="4" y="4" width="50" height="68" rx="6" fill="rgb(14,165,233)" stroke="rgb(2,132,199)" stroke-width="2.5" />
    <!-- Dark Blue Spine Binding -->
    <path d="M 4 4 L 14 4 L 14 72 L 4 72 Z" fill="rgb(3,105,161)" />
    <!-- Title Label Box -->
    <rect x="18" y="16" width="32" height="24" rx="4" fill="rgb(255,255,255)" stroke="rgb(2,132,199)" stroke-width="1.8" />
    <text x="34" y="32" font-family="'NanumBarunGothic', sans-serif" font-size="12" font-weight="900" fill="rgb(15,23,42)" text-anchor="middle">국어</text>
    <text x="34" y="38" font-family="'NanumBarunGothic', sans-serif" font-size="6" font-weight="700" fill="rgb(2,132,199)" text-anchor="middle">1 - 1</text>
    <!-- Cute Character Badge on textbook cover -->
    <circle cx="34" cy="52" r="8" fill="rgb(254,240,138)" stroke="rgb(234,179,8)" stroke-width="1.2" />
    <circle cx="31" cy="51" r="1.2" fill="rgb(30,41,59)" />
    <circle cx="37" cy="51" r="1.2" fill="rgb(30,41,59)" />
    <path d="M 32 55 Q 34 57 36 55" stroke="rgb(190,18,60)" stroke-width="1" stroke-linecap="round" fill="none" />
    <!-- Ribbon bookmark sticking out of bottom -->
    <polygon points="26,72 26,80 30,76 34,80 34,72" fill="rgb(239,68,68)" />
  </g>
</svg>`;

// 33. 연필 (Pencil) - Classic yellow wooden pencil with sharp tip & pink eraser
export const YEONPIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Angled Diagonal Pencil -->
  <g transform="translate(50, 48) rotate(-45)">
    <!-- Sharpened Wood Cone -->
    <polygon points="-8,-42 8,-42 0,-56" fill="rgb(254,215,170)" stroke="rgb(217,119,6)" stroke-width="1" />
    <!-- Graphite Lead Tip -->
    <polygon points="-3,-51 3,-51 0,-56" fill="rgb(30,41,59)" />
    <!-- Main Yellow Hexagonal Shaft Body -->
    <rect x="-8" y="-42" width="16" height="68" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2" />
    <!-- Darker facet stripe for 3D hexagonal effect -->
    <rect x="-3" y="-42" width="6" height="68" fill="rgb(245,158,11)" />
    <!-- Silver Metal Ferrule Band -->
    <rect x="-8" y="26" width="16" height="10" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="1.5" />
    <line x1="-8" y1="31" x2="8" y2="31" stroke="rgb(100,116,139)" stroke-width="1" />
    <!-- Pink Rubber Eraser Top -->
    <path d="M -8 36 L 8 36 Q 8 46 0 46 Q -8 46 -8 36 Z" fill="rgb(244,114,182)" stroke="rgb(219,39,119)" stroke-width="1.8" />
  </g>
  <!-- Sparkles -->
  <path d="M 72 20 L 73.5 16 L 75 20 L 79 21.5 L 75 23 L 73.5 27 L 72 23 L 68 21.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 35. 써요 (Write) - Cute child hand holding pencil and writing neatly on lined paper
export const SSEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,250)" />
  <!-- Lined Composition Paper Background -->
  <g transform="translate(14, 16)">
    <rect x="0" y="0" width="56" height="68" rx="5" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2" />
    <line x1="6" y1="16" x2="50" y2="16" stroke="rgb(226,232,240)" stroke-width="1.5" />
    <line x1="6" y1="28" x2="50" y2="28" stroke="rgb(226,232,240)" stroke-width="1.5" />
    <line x1="6" y1="40" x2="50" y2="40" stroke="rgb(226,232,240)" stroke-width="1.5" />
    <line x1="6" y1="52" x2="50" y2="52" stroke="rgb(226,232,240)" stroke-width="1.5" />
    <!-- Written Hangul Characters (가 나) in pencil -->
    <text x="12" y="26" font-family="'NanumBarunGothic', sans-serif" font-size="10" font-weight="900" fill="rgb(30,41,59)">가</text>
    <text x="26" y="26" font-family="'NanumBarunGothic', sans-serif" font-size="10" font-weight="900" fill="rgb(30,41,59)">나</text>
    <!-- Traced guide line -->
    <line x1="10" y1="39" x2="24" y2="39" stroke="rgb(71,85,105)" stroke-width="2" stroke-linecap="round" />
  </g>
  <!-- Hand Holding Pencil in Writing Position -->
  <g transform="translate(38, 22)">
    <!-- Yellow Pencil angled down to paper -->
    <g transform="rotate(-30 18 36)">
      <polygon points="15,-10 21,-10 18,-18" fill="rgb(254,215,170)" />
      <polygon points="17,-15 19,-15 18,-18" fill="rgb(30,41,59)" />
      <rect x="15" y="-10" width="6" height="42" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.2" />
    </g>
    <!-- Chubby Child Hand Fingers gripping pencil -->
    <path d="M 8 26 C 2 24 2 34 8 36 L 22 36 L 22 24 Z" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Index finger pressing down -->
    <rect x="8" y="22" width="16" height="7" rx="3.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <circle cx="12" cy="25" r="1.5" fill="rgb(253,186,116)" />
    <!-- Sleeve -->
    <rect x="22" y="20" width="18" height="24" rx="4" fill="rgb(59,130,246)" />
    <rect x="20" y="18" width="5" height="28" rx="2.5" fill="rgb(255,255,255)" />
  </g>
</svg>`;

// 36. 공책 (Notebook) - Elementary lined composition notebook with label
export const GONGCHAEK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Shadow -->
  <rect x="20" y="16" width="60" height="72" rx="7" fill="rgba(15,23,42,0.12)" />
  <!-- Notebook Cover (Pastel Peach/Coral) -->
  <g transform="translate(18, 12)">
    <rect x="4" y="4" width="56" height="70" rx="7" fill="rgb(254,205,211)" stroke="rgb(244,63,94)" stroke-width="2.5" />
    <!-- Left Dark Rose Binding Tape -->
    <path d="M 4 4 L 14 4 L 14 74 L 4 74 Z" fill="rgb(225,29,72)" />
    <!-- Title Label Box (White) -->
    <rect x="18" y="14" width="36" height="20" rx="4" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="1.5" />
    <text x="36" y="28" font-family="'NanumBarunGothic', sans-serif" font-size="10.5" font-weight="900" fill="rgb(159,18,57)" text-anchor="middle">공책</text>
    <!-- Student Name / Info Lines -->
    <line x1="18" y1="44" x2="52" y2="44" stroke="rgb(244,63,94)" stroke-width="1.5" opacity="0.6" />
    <line x1="18" y1="52" x2="52" y2="52" stroke="rgb(244,63,94)" stroke-width="1.5" opacity="0.6" />
    <line x1="18" y1="60" x2="44" y2="60" stroke="rgb(244,63,94)" stroke-width="1.5" opacity="0.6" />
    <!-- Cute Clover sticker on cover -->
    <circle cx="48" cy="58" r="4" fill="rgb(34,197,94)" />
    <circle cx="52" cy="58" r="4" fill="rgb(34,197,94)" />
    <circle cx="50" cy="55" r="4" fill="rgb(34,197,94)" />
  </g>
</svg>`;

// 37. 필통 (Pencil case) - Zippered colorful pouch with pencil & ruler peeking out
export const PILTONG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="80" rx="36" ry="8" fill="rgba(15,23,42,0.12)" />
  <!-- Stationery peeking out from inside -->
  <g transform="translate(18, 18)">
    <!-- Yellow Pencil sticking out -->
    <g transform="translate(16, 2) rotate(-15)">
      <polygon points="4,0 8,0 6,-6" fill="rgb(254,215,170)" />
      <polygon points="5,-3 7,-3 6,-6" fill="rgb(30,41,59)" />
      <rect x="4" y="0" width="4" height="24" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1" />
    </g>
    <!-- Clear Transparent Ruler sticking out -->
    <g transform="translate(32, 4) rotate(15)">
      <rect x="0" y="0" width="8" height="24" rx="1.5" fill="rgb(224,242,254)" stroke="rgb(56,189,248)" stroke-width="1.2" opacity="0.9" />
      <line x1="0" y1="6" x2="4" y2="6" stroke="rgb(2,132,199)" stroke-width="1" />
      <line x1="0" y1="12" x2="5" y2="12" stroke="rgb(2,132,199)" stroke-width="1" />
      <line x1="0" y1="18" x2="4" y2="18" stroke="rgb(2,132,199)" stroke-width="1" />
    </g>
    <!-- Main Pencil Case Pouch (Lavender Purple) -->
    <rect x="2" y="20" width="60" height="36" rx="12" fill="rgb(168,85,247)" stroke="rgb(126,34,206)" stroke-width="2.5" />
    <!-- Zipper Track along top -->
    <line x1="10" y1="20" x2="54" y2="20" stroke="rgb(250,204,21)" stroke-width="2" stroke-dasharray="2,2" />
    <!-- Zipper Pull Tab -->
    <circle cx="16" cy="20" r="3.5" fill="rgb(234,179,8)" stroke="rgb(161,98,7)" stroke-width="1" />
    <rect x="14" y="20" width="4" height="8" rx="1.5" fill="rgb(250,204,21)" />
    <!-- Cute Star Emblem on front pouch -->
    <circle cx="32" cy="38" r="8" fill="rgb(255,255,255)" />
    <path d="M 32 32 L 33.5 36 L 37.5 36.5 L 34.5 39 L 35.5 43 L 32 41 L 28.5 43 L 29.5 39 L 26.5 36.5 L 30.5 36 Z" fill="rgb(244,63,94)" />
  </g>
</svg>`;

// 38. 쉬워요 (Easy) - Cheerful kid with a test paper showing a big red 100점 (💯)
export const SWIWO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Test Paper with 100점 -->
  <g transform="translate(14, 20) rotate(-12)">
    <rect x="0" y="0" width="36" height="48" rx="4" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2" />
    <line x1="6" y1="12" x2="30" y2="12" stroke="rgb(226,232,240)" stroke-width="1.5" />
    <line x1="6" y1="20" x2="30" y2="20" stroke="rgb(226,232,240)" stroke-width="1.5" />
    <line x1="6" y1="28" x2="30" y2="28" stroke="rgb(226,232,240)" stroke-width="1.5" />
    <!-- Big Red Circle (O) -->
    <circle cx="18" cy="20" r="12" fill="none" stroke="rgb(239,68,68)" stroke-width="3" />
    <text x="18" y="24" font-family="'Nunito', sans-serif" font-size="10" font-weight="900" fill="rgb(220,38,38)" text-anchor="middle">100</text>
  </g>
  <!-- Cheerful Happy Child celebrating -->
  <g transform="translate(42, 18)">
    <!-- Face -->
    <circle cx="26" cy="24" r="18" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 7.2 20 C 5.8 -1.6 46.2 -1.6 44.8 20 C 42 14 36 10 26 10 C 16 10 10 14 7.2 20 Z" fill="rgb(51,65,85)" />
    <!-- Cheerful Closed Happy Eyes -->
    <path d="M 17 22 Q 21 17 25 22" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 27 22 Q 31 17 35 22" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="14" cy="27" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="38" cy="27" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <!-- Big Open Laughing Mouth -->
    <path d="M 20 28 Q 26 36 32 28 Z" fill="rgb(190,18,60)" />
    <!-- Body -->
    <path d="M 10 52 C 10 40 18 36 26 36 C 34 36 42 40 42 52 Z" fill="rgb(16,185,129)" />
    <!-- Arms Up Hurray! -->
    <path d="M 10 42 Q 2 32 6 22" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M 42 42 Q 50 32 46 22" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
  </g>
  <!-- Confetti sparkles -->
  <circle cx="82" cy="18" r="2.5" fill="rgb(244,63,94)" />
  <circle cx="20" cy="14" r="2" fill="rgb(59,130,246)" />
</svg>`;

// 39. 어려워요 (Difficult) - Child scratching head with confusing puzzle piece & question marks
export const EORYEOWO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <!-- Question Marks around head -->
  <text x="18" y="26" font-family="'Nunito', sans-serif" font-size="14" font-weight="900" fill="rgb(168,85,247)">?</text>
  <text x="76" y="24" font-family="'Nunito', sans-serif" font-size="16" font-weight="900" fill="rgb(139,92,246)">?</text>
  <g transform="translate(24, 18)">
    <!-- Face -->
    <circle cx="26" cy="26" r="18" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 7.2 22 C 5.8 0.4 46.2 0.4 44.8 22 C 42 16 34 12 26 12 C 18 12 10 16 7.2 22 Z" fill="rgb(51,65,85)" />
    <!-- Furrowed, tilted eyebrows -->
    <path d="M 15 20 Q 20 24 24 19" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 28 19 Q 32 24 37 20" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Puzzled Eyes -->
    <circle cx="19" cy="25" r="2.5" fill="rgb(30,41,59)" />
    <circle cx="33" cy="25" r="2.5" fill="rgb(30,41,59)" />
    <!-- Confused wavy mouth -->
    <path d="M 20 34 Q 23 31 26 34 Q 29 37 32 34" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Body -->
    <path d="M 8 54 C 8 42 16 38 26 38 C 36 38 44 42 44 54 Z" fill="rgb(14,165,233)" />
    <!-- Hand Scratching Head (머리 긁적이기) -->
    <path d="M 42 44 Q 52 30 46 16" stroke="rgb(254,215,170)" stroke-width="6" stroke-linecap="round" fill="none" />
    <circle cx="44" cy="14" r="4.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  </g>
  <!-- Sweat drop -->
  <path d="M 22 36 C 22 36 25 40 25 42 C 25 43.5 24 44.5 23 44.5 C 22 44.5 21 43.5 21 42 C 21 40 22 36 22 36 Z" fill="rgb(56,189,248)" />
</svg>`;

// 40. 읽어요 (Read) - Child happily holding open book and reading aloud with speech notes
export const ILGEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Musical note & sound sparkle of reading aloud -->
  <path d="M 68 18 L 74 16 L 74 22 L 68 24 Z" fill="rgb(239,68,68)" />
  <circle cx="68" cy="24" r="2.5" fill="rgb(239,68,68)" />
  <path d="M 78 26 L 80 22 L 82 26 L 86 27.5 L 82 29 L 80 33 L 78 29 L 74 27.5 Z" fill="rgb(250,204,21)" />
  <!-- Child Holding Book -->
  <g transform="translate(20, 14)">
    <!-- Body (drawn behind neck & head) -->
    <path d="M 13 58 C 13 44 21 39 30 39 C 39 39 47 44 47 58 Z" fill="rgb(249,115,22)" />
    <!-- Neck -->
    <rect x="26" y="35" width="8" height="7" rx="2.5" fill="rgb(254,215,170)" />
    <!-- Face -->
    <circle cx="30" cy="22" r="15.5" fill="rgb(254,215,170)" />
    <!-- Full lush hair with soft bangs -->
    <path d="M 13.9 21.5 A 16.1 16.8 0 0 1 46.1 21.5 C 42 14.8 35.8 13.8 30 15.4 C 24.2 13.8 18 14.8 13.9 21.5 Z" fill="rgb(51,65,85)" />
    <!-- Bright attentive eyes looking down at book -->
    <circle cx="25" cy="22.5" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="35" cy="22.5" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="20.5" cy="26.5" r="2.4" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="39.5" cy="26.5" r="2.4" fill="rgb(244,114,182)" opacity="0.6" />
    <!-- Mouth open cheerfully reading aloud -->
    <ellipse cx="30" cy="29.5" rx="3.4" ry="3.8" fill="rgb(190,18,60)" />
    <!-- Open Book in hands -->
    <g transform="translate(8, 38)">
      <path d="M 22 24 Q 10 20 0 16 L 2 2 Q 12 6 22 8 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.5" />
      <path d="M 22 24 Q 34 20 44 16 L 42 2 Q 32 6 22 8 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.5" />
      <!-- Book spine -->
      <line x1="22" y1="8" x2="22" y2="24" stroke="rgb(234,88,12)" stroke-width="2" />
      <!-- Text lines -->
      <line x1="6" y1="8" x2="16" y2="10" stroke="rgb(148,163,184)" stroke-width="1.2" />
      <line x1="5" y1="13" x2="17" y2="15" stroke="rgb(148,163,184)" stroke-width="1.2" />
      <line x1="27" y1="10" x2="38" y2="8" stroke="rgb(148,163,184)" stroke-width="1.2" />
      <line x1="27" y1="15" x2="39" y2="13" stroke="rgb(148,163,184)" stroke-width="1.2" />
      <!-- Hands holding book edges -->
      <ellipse cx="0" cy="12" rx="3.5" ry="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
      <ellipse cx="44" cy="12" rx="3.5" ry="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
    </g>
  </g>
</svg>`;
