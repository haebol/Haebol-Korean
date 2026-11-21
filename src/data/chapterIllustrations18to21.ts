/**
 * Vector SVG Illustrations for Chapters 18 to 21
 * Art style unified with [그림카드 7쪽] (circular pastel background, subtle ground shadow, clean child-friendly vectors, safe RGB data URIs).
 */

// ============================================================================
// CHAPTER 18: 공간 (Space / Location)
// ============================================================================

// 1. 여기 (Here) - Cheerful red pin on target circle
export const YEO_GI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Concentric Target Rings -->
  <ellipse cx="50" cy="74" rx="26" ry="10" fill="none" stroke="rgb(254,202,202)" stroke-width="3" stroke-dasharray="3,3" />
  <ellipse cx="50" cy="74" rx="14" ry="5" fill="rgb(254,226,226)" stroke="rgb(239,68,68)" stroke-width="2" />
  <circle cx="50" cy="74" r="3" fill="rgb(220,38,38)" />
  <!-- Bouncing Location Pin -->
  <g transform="translate(50, 40)">
    <path d="M 0 32 C -12 18 -16 6 -16 -4 C -16 -16 -8 -24 0 -24 C 8 -24 16 -16 16 -4 C 16 6 12 18 0 32 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <circle cx="0" cy="-4" r="7" fill="rgb(255,255,255)" />
    <circle cx="0" cy="-4" r="3" fill="rgb(220,38,38)" />
  </g>
  <!-- Sparkles -->
  <polygon points="76,28 78,33 83,35 78,37 76,42 74,37 69,35 74,33" fill="rgb(250,204,21)" />
  <polygon points="24,32 25.5,36 30,37 25.5,39 24,43 22.5,39 18,37 22.5,36" fill="rgb(250,204,21)" />
</svg>`;

// 2. 저기 (Over there) - Child pointing finger towards distant goal flag
export const JEO_GI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Distant hill with flag -->
  <path d="M 45 74 Q 68 55 90 74 Z" fill="rgb(220,252,231)" stroke="rgb(134,239,172)" stroke-width="1.5" />
  <line x1="72" y1="62" x2="72" y2="40" stroke="rgb(71,85,105)" stroke-width="2" />
  <polygon points="72,40 86,45 72,50" fill="rgb(249,115,22)" />
  <!-- Child in foreground pointing finger right -->
  <g transform="translate(14, 28)">
    <circle cx="16" cy="18" r="12" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <path d="M 12 16 Q 16 13 20 16" stroke="rgb(30,41,59)" stroke-width="1.5" fill="none" />
    <circle cx="20" cy="18" r="2" fill="rgb(30,41,59)" />
    <ellipse cx="14" cy="38" rx="10" ry="14" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.5" />
    <!-- Extended arm & pointing hand -->
    <path d="M 22 36 L 44 28" stroke="rgb(59,130,246)" stroke-width="6" stroke-linecap="round" />
    <path d="M 44 28 L 52 25" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" />
    <polygon points="56,23 60,25 56,27" fill="rgb(254,215,170)" />
  </g>
</svg>`;

// 3. 위 (Up / On) - Table with cute apple on top and upward green arrow
export const WI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Table -->
  <rect x="20" y="58" width="60" height="8" rx="2" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="2" />
  <line x1="28" y1="66" x2="28" y2="84" stroke="rgb(180,83,9)" stroke-width="4" stroke-linecap="round" />
  <line x1="72" y1="66" x2="72" y2="84" stroke="rgb(180,83,9)" stroke-width="4" stroke-linecap="round" />
  <!-- Apple on top of table -->
  <g transform="translate(50, 42)">
    <circle cx="0" cy="0" r="14" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
    <path d="M 0 -14 Q 4 -20 8 -18" stroke="rgb(180,83,9)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <ellipse cx="6" cy="-17" rx="4" ry="2.5" fill="rgb(34,197,94)" />
    <!-- Apple smile -->
    <circle cx="-4" cy="-2" r="1.5" fill="rgb(255,255,255)" />
    <circle cx="4" cy="-2" r="1.5" fill="rgb(255,255,255)" />
    <path d="M -3 3 Q 0 6 3 3" stroke="rgb(255,255,255)" stroke-width="1.2" fill="none" />
  </g>
  <!-- Upward Arrow -->
  <g transform="translate(18, 30)">
    <path d="M 8 20 L 8 4 M 3 9 L 8 2 L 13 9" stroke="rgb(16,185,129)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
</svg>`;

// 4. 아래 (Down / Under) - Chair with teddy bear sitting under it and downward arrow
export const A_RAE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.8" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Chair seat and legs -->
  <rect x="24" y="44" width="52" height="6" rx="2" fill="rgb(245,158,11)" stroke="rgb(180,83,9)" stroke-width="1.8" />
  <line x1="28" y1="20" x2="28" y2="44" stroke="rgb(180,83,9)" stroke-width="3.5" stroke-linecap="round" />
  <line x1="72" y1="20" x2="72" y2="44" stroke="rgb(180,83,9)" stroke-width="3.5" stroke-linecap="round" />
  <line x1="26" y1="26" x2="74" y2="26" stroke="rgb(217,119,6)" stroke-width="2.5" />
  <line x1="28" y1="50" x2="28" y2="84" stroke="rgb(180,83,9)" stroke-width="3.5" stroke-linecap="round" />
  <line x1="72" y1="50" x2="72" y2="84" stroke="rgb(180,83,9)" stroke-width="3.5" stroke-linecap="round" />
  <!-- Cute teddy bear under chair -->
  <g transform="translate(50, 66)">
    <!-- Ears -->
    <circle cx="-10" cy="-10" r="5" fill="rgb(180,83,9)" />
    <circle cx="10" cy="-10" r="5" fill="rgb(180,83,9)" />
    <!-- Head -->
    <circle cx="0" cy="-4" r="12" fill="rgb(217,119,6)" />
    <ellipse cx="0" cy="-2" rx="6" ry="4" fill="rgb(254,215,170)" />
    <circle cx="0" cy="-3" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="-4" cy="-6" r="1.5" fill="rgb(30,41,59)" />
    <circle cx="4" cy="-6" r="1.5" fill="rgb(30,41,59)" />
    <!-- Body -->
    <ellipse cx="0" cy="11" rx="10" ry="7" fill="rgb(180,83,9)" />
  </g>
  <!-- Downward Arrow -->
  <g transform="translate(14, 52)">
    <path d="M 6 0 L 6 16 M 1 11 L 6 18 L 11 11" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
</svg>`;

// 5. 옆 (Beside / Next to) - Two cute children standing side by side holding hands
export const YEOP_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Left Child -->
  <g transform="translate(34, 46)">
    <circle cx="0" cy="-18" r="11" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <path d="M -11.8 -22 C -12.7 -33.6 12.7 -33.6 11.8 -22 Q 0 -22 -11.8 -22 Z" fill="rgb(51,65,85)" />
    <circle cx="-3" cy="-18" r="1.5" fill="rgb(30,41,59)" />
    <circle cx="3" cy="-18" r="1.5" fill="rgb(30,41,59)" />
    <path d="M -2 -14 Q 0 -12 2 -14" stroke="rgb(239,68,68)" stroke-width="1.2" fill="none" />
    <!-- Yellow Shirt -->
    <rect x="-8" y="-7" width="16" height="18" rx="4" fill="rgb(250,204,21)" />
    <line x1="-5" y1="11" x2="-5" y2="28" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="5" y1="11" x2="5" y2="28" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  </g>
  <!-- Right Child -->
  <g transform="translate(66, 46)">
    <circle cx="0" cy="-18" r="11" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <path d="M -11.8 -22 C -12.7 -33.6 12.7 -33.6 11.8 -22 Q 0 -22 -11.8 -22 Z" fill="rgb(217,119,6)" />
    <circle cx="-3" cy="-18" r="1.5" fill="rgb(30,41,59)" />
    <circle cx="3" cy="-18" r="1.5" fill="rgb(30,41,59)" />
    <path d="M -2 -14 Q 0 -12 2 -14" stroke="rgb(239,68,68)" stroke-width="1.2" fill="none" />
    <!-- Teal Shirt -->
    <rect x="-8" y="-7" width="16" height="18" rx="4" fill="rgb(45,212,191)" />
    <line x1="-5" y1="11" x2="-5" y2="28" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="5" y1="11" x2="5" y2="28" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  </g>
  <!-- Held hands in middle -->
  <path d="M 42 45 Q 50 49 58 45" stroke="rgb(254,215,170)" stroke-width="4.5" stroke-linecap="round" fill="none" />
  <circle cx="50" cy="48" r="3.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
  <!-- Horizontal double arrow showing "beside" -->
  <g transform="translate(50, 16)">
    <path d="M -16 0 L 16 0 M -12 -4 L -16 0 L -12 4 M 12 -4 L 16 0 L 12 4" stroke="rgb(99,102,241)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
</svg>`;

// 6. 앞으로 오세요 (Come forward) - Teacher beckoning forward with green guidance arrow
export const AP_EU_RO_OSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Cheerful Teacher beckoning warmly -->
  <g transform="translate(34, 30)">
    <circle cx="16" cy="14" r="13" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <path d="M 2.4 11 C 1.4 -4.7 30.6 -4.7 29.6 11 Q 16 5 2.4 11 Z" fill="rgb(180,83,9)" />
    <circle cx="12" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="20" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <path d="M 12 19 Q 16 23 20 19" stroke="rgb(239,68,68)" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <!-- Apron / Shirt -->
    <rect x="6" y="27" width="20" height="26" rx="5" fill="rgb(16,185,129)" />
    <!-- Beckoning hands -->
    <path d="M 26 36 Q 38 30 38 22" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
  </g>
  <!-- Forward motion curve arrow -->
  <g transform="translate(48, 56)">
    <path d="M 32 20 Q 18 6 4 10" stroke="rgb(16,185,129)" stroke-width="3" stroke-linecap="round" fill="none" />
    <polygon points="2,14 2,6 8,10" fill="rgb(16,185,129)" />
    <!-- Footprints leading forward -->
    <ellipse cx="26" cy="18" rx="3.5" ry="2" fill="rgb(110,231,183)" />
    <ellipse cx="14" cy="14" rx="3.5" ry="2" fill="rgb(110,231,183)" />
  </g>
</svg>`;

// 7. 뒤로 가세요 (Step back) - Caution guide hand and footsteps moving back
export const DŴI_RO_GASEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Gentle safety palm gesture -->
  <g transform="translate(30, 24)">
    <rect x="8" y="14" width="24" height="28" rx="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <rect x="10" y="2" width="5" height="14" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="16" y="0" width="5" height="16" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="22" y="2" width="5" height="14" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="28" y="6" width="5" height="10" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  </g>
  <!-- Backward Arrow -->
  <g transform="translate(24, 62)">
    <path d="M 12 12 L 48 12 M 40 6 L 48 12 L 40 18" stroke="rgb(249,115,22)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <!-- Footsteps stepping backwards -->
    <ellipse cx="18" cy="12" rx="4" ry="2.5" fill="rgb(251,146,60)" opacity="0.6" />
    <ellipse cx="32" cy="12" rx="4" ry="2.5" fill="rgb(251,146,60)" opacity="0.9" />
  </g>
</svg>`;

// 8. 숙제 어디 있어요? (Where is homework?) - Child searching with magnifying glass
export const SUKJE_EODI_ISSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" opacity="0.8" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Notebook with "숙제" label -->
  <g transform="translate(20, 22)">
    <rect x="0" y="0" width="38" height="48" rx="4" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
    <rect x="0" y="0" width="8" height="48" rx="2" fill="rgb(59,130,246)" />
    <rect x="12" y="10" width="22" height="12" rx="2" fill="rgb(219,234,254)" />
    <text x="23" y="19" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="7" font-weight="900" fill="rgb(29,78,216)" text-anchor="middle">숙제</text>
    <line x1="12" y1="28" x2="32" y2="28" stroke="rgb(203,213,225)" stroke-width="1.5" />
    <line x1="12" y1="36" x2="32" y2="36" stroke="rgb(203,213,225)" stroke-width="1.5" />
  </g>
  <!-- Big Magnifying Glass checking around -->
  <g transform="translate(48, 40) rotate(-20)">
    <circle cx="16" cy="16" r="14" fill="rgba(255,255,255,0.7)" stroke="rgb(217,119,6)" stroke-width="3" />
    <line x1="26" y1="26" x2="42" y2="42" stroke="rgb(180,83,9)" stroke-width="4.5" stroke-linecap="round" />
    <circle cx="16" cy="16" r="5" fill="none" stroke="rgb(245,158,11)" stroke-width="1" stroke-dasharray="2,2" />
  </g>
  <!-- Question Marks -->
  <text x="76" y="30" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="16" font-weight="900" fill="rgb(239,68,68)">?</text>
  <text x="84" y="44" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(245,158,11)">?</text>
</svg>`;

// 9. 교실에 있어요 (It's in the classroom) - Classroom chalkboard and desk
export const GYOSIL_E_ISSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Classroom Chalkboard -->
  <rect x="18" y="18" width="64" height="34" rx="4" fill="rgb(22,101,52)" stroke="rgb(180,83,9)" stroke-width="3" />
  <text x="50" y="38" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">우리 교실</text>
  <!-- Chalk tray with white chalk -->
  <rect x="22" y="52" width="56" height="4" rx="1.5" fill="rgb(217,119,6)" />
  <rect x="30" y="50" width="8" height="3" rx="1" fill="rgb(255,255,255)" />
  <!-- Student Desk in front with book -->
  <g transform="translate(32, 58)">
    <rect x="0" y="0" width="36" height="8" rx="2" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="1.8" />
    <line x1="6" y1="8" x2="6" y2="24" stroke="rgb(100,116,139)" stroke-width="2.5" />
    <line x1="30" y1="8" x2="30" y2="24" stroke="rgb(100,116,139)" stroke-width="2.5" />
    <rect x="10" y="-4" width="16" height="6" rx="1" fill="rgb(59,130,246)" />
  </g>
</svg>`;

// 10. 오른손 (Right hand) - Cheerful raised right palm with star badge
export const OREUNSON_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Raised Right Hand (Thumb on left when facing palm) -->
  <g transform="translate(32, 22)">
    <!-- Arm -->
    <rect x="10" y="38" width="16" height="26" rx="4" fill="rgb(250,204,21)" />
    <!-- Palm -->
    <rect x="6" y="16" width="24" height="24" rx="6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <!-- Thumb on Left -->
    <path d="M 6 26 L -2 22 C -5 20 -5 16 -2 14 C 1 12 5 15 7 20 Z" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- 4 Fingers -->
    <rect x="7" y="2" width="5" height="16" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="13" y="0" width="5" height="18" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="19" y="1" width="5" height="17" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <rect x="25" y="4" width="5" height="14" rx="2.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
    <!-- "오른손" Badge on palm -->
    <circle cx="18" cy="28" r="6" fill="rgb(239,68,68)" />
    <text x="18" y="31" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="7" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">R</text>
  </g>
  <!-- Sparkles -->
  <polygon points="78,24 80,28 84,30 80,32 78,36 76,32 72,30 76,28" fill="rgb(250,204,21)" />
</svg>`;

// ============================================================================
// CHAPTER 19: 시간 (Time)
// ============================================================================

// 1. 어제 (Yesterday) - Calendar turning page left
export const EO_JE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Desk Calendar -->
  <g transform="translate(24, 24)">
    <rect x="0" y="6" width="52" height="48" rx="6" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
    <rect x="0" y="6" width="52" height="14" rx="4" fill="rgb(168,85,247)" />
    <!-- Spiral rings -->
    <circle cx="12" cy="6" r="3" fill="rgb(100,116,139)" />
    <circle cx="26" cy="6" r="3" fill="rgb(100,116,139)" />
    <circle cx="40" cy="6" r="3" fill="rgb(100,116,139)" />
    <!-- Moon icon representing yesterday -->
    <path d="M 28 26 C 24 26 20 29 20 34 C 20 40 25 45 32 45 C 34 45 36 44 38 43 C 33 42 30 38 30 33 C 30 29 32 27 28 26 Z" fill="rgb(234,179,8)" />
    <text x="26" y="16" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="8" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">어제</text>
  </g>
  <!-- Left pointing arrow -->
  <g transform="translate(20, 72)">
    <path d="M 28 6 L 6 6 M 12 1 L 6 6 L 12 11" stroke="rgb(168,85,247)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
</svg>`;

// 2. 오늘 (Today) - Bright glowing calendar with shining star
export const O_NEUL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <g transform="translate(24, 22)">
    <rect x="0" y="6" width="52" height="50" rx="6" fill="rgb(255,255,255)" stroke="rgb(245,158,11)" stroke-width="2.5" />
    <rect x="0" y="6" width="52" height="16" rx="4" fill="rgb(239,68,68)" />
    <circle cx="12" cy="6" r="3" fill="rgb(100,116,139)" />
    <circle cx="26" cy="6" r="3" fill="rgb(100,116,139)" />
    <circle cx="40" cy="6" r="3" fill="rgb(100,116,139)" />
    <text x="26" y="18" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">오늘</text>
    <!-- Big star on today -->
    <polygon points="26,26 29,34 38,34 31,39 34,47 26,42 18,47 21,39 14,34 23,34" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  </g>
</svg>`;

// 3. 내일 (Tomorrow) - Calendar pointing to tomorrow with rising sunshine
export const NAE_IL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <g transform="translate(24, 24)">
    <rect x="0" y="6" width="52" height="48" rx="6" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
    <rect x="0" y="6" width="52" height="14" rx="4" fill="rgb(59,130,246)" />
    <circle cx="12" cy="6" r="3" fill="rgb(100,116,139)" />
    <circle cx="26" cy="6" r="3" fill="rgb(100,116,139)" />
    <circle cx="40" cy="6" r="3" fill="rgb(100,116,139)" />
    <!-- Rising Sun -->
    <circle cx="26" cy="38" r="10" fill="rgb(249,115,22)" />
    <line x1="26" y1="24" x2="26" y2="20" stroke="rgb(249,115,22)" stroke-width="2" />
    <line x1="36" y1="28" x2="39" y2="25" stroke="rgb(249,115,22)" stroke-width="2" />
    <line x1="16" y1="28" x2="13" y2="25" stroke="rgb(249,115,22)" stroke-width="2" />
    <text x="26" y="16" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="8" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">내일</text>
  </g>
  <!-- Right pointing arrow -->
  <g transform="translate(56, 72)">
    <path d="M 0 6 L 22 6 M 16 1 L 22 6 L 16 11" stroke="rgb(59,130,246)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  </g>
</svg>`;

// 4. 아침 (Morning) - Cheerful sun rising over green hill with 7:00 clock
export const A_CHIM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Green Hills -->
  <path d="M 10 78 Q 40 56 60 78 Q 80 64 90 78 Z" fill="rgb(134,239,172)" stroke="rgb(34,197,94)" stroke-width="2" />
  <!-- Smiling Morning Sun rising -->
  <g transform="translate(42, 38)">
    <circle cx="0" cy="0" r="16" fill="rgb(251,191,36)" stroke="rgb(245,158,11)" stroke-width="2" />
    <circle cx="-5" cy="-2" r="2" fill="rgb(30,41,59)" />
    <circle cx="5" cy="-2" r="2" fill="rgb(30,41,59)" />
    <path d="M -4 4 Q 0 8 4 4" stroke="rgb(239,68,68)" stroke-width="1.8" fill="none" stroke-linecap="round" />
    <!-- Sunbeams -->
    <line x1="0" y1="-22" x2="0" y2="-18" stroke="rgb(245,158,11)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="16" y1="-16" x2="13" y2="-13" stroke="rgb(245,158,11)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="-16" y1="-16" x2="-13" y2="-13" stroke="rgb(245,158,11)" stroke-width="2.5" stroke-linecap="round" />
  </g>
  <!-- Mini Alarm Clock ringing 7:00 -->
  <g transform="translate(68, 54)">
    <circle cx="8" cy="8" r="8" fill="rgb(255,255,255)" stroke="rgb(239,68,68)" stroke-width="2" />
    <line x1="8" y1="8" x2="8" y2="3" stroke="rgb(30,41,59)" stroke-width="1.5" stroke-linecap="round" />
    <line x1="8" y1="8" x2="5" y2="11" stroke="rgb(30,41,59)" stroke-width="1.5" stroke-linecap="round" />
    <!-- Bells on top -->
    <circle cx="4" cy="1" r="2" fill="rgb(239,68,68)" />
    <circle cx="12" cy="1" r="2" fill="rgb(239,68,68)" />
  </g>
</svg>`;

// 5. 점심 (Lunch time) - Midday sun & yummy steaming meal bowl with spoon
export const JEOM_SIM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.8" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Midday High Sun in corner -->
  <circle cx="76" cy="24" r="10" fill="rgb(249,115,22)" />
  <!-- Steaming Lunch Bowl -->
  <g transform="translate(50, 56)">
    <!-- Bowl Base -->
    <path d="M -24 -6 Q 0 28 24 -6 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2" />
    <!-- Delicious Rice & Veggies inside bowl -->
    <ellipse cx="0" cy="-6" rx="23" ry="8" fill="rgb(248,250,252)" stroke="rgb(203,213,225)" stroke-width="1.5" />
    <circle cx="-8" cy="-6" r="4" fill="rgb(34,197,94)" />
    <circle cx="0" cy="-6" r="4" fill="rgb(239,68,68)" />
    <circle cx="8" cy="-6" r="4" fill="rgb(250,204,21)" />
    <!-- Steam waves rising -->
    <path d="M -8 -16 Q -5 -22 -8 -28" stroke="rgb(148,163,184)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 0 -18 Q 3 -24 0 -30" stroke="rgb(148,163,184)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 8 -16 Q 11 -22 8 -28" stroke="rgb(148,163,184)" stroke-width="2" stroke-linecap="round" fill="none" />
  </g>
  <!-- Stainless Spoon -->
  <g transform="translate(22, 42) rotate(25)">
    <ellipse cx="6" cy="0" rx="7" ry="10" fill="rgb(241,245,249)" stroke="rgb(148,163,184)" stroke-width="1.8" />
    <line x1="6" y1="10" x2="6" y2="34" stroke="rgb(148,163,184)" stroke-width="2.5" stroke-linecap="round" />
  </g>
</svg>`;

// 6. 저녁 (Evening) - Twilight sky with moon and cozy glowing house window
export const JEO_NYEOK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Purple Twilight backdrop -->
  <path d="M 6 50 A 44 44 0 0 0 94 50 Z" fill="rgb(199,210,254)" opacity="0.5" />
  <!-- Golden Crescent Moon -->
  <path d="M 32 20 C 26 20 22 24 22 30 C 22 38 28 44 38 44 C 40 44 42 43 44 41 C 37 40 33 34 33 28 C 33 24 35 21 32 20 Z" fill="rgb(250,204,21)" />
  <!-- Little stars -->
  <polygon points="50,22 51,24 53,24 51.5,25.5 52,27.5 50,26 48,27.5 48.5,25.5 47,24 49,24" fill="rgb(250,204,21)" />
  <polygon points="68,32 69,34 71,34 69.5,35.5 70,37.5 68,36 66,37.5 66.5,35.5 65,34 67,34" fill="rgb(250,204,21)" />
  <!-- Cozy house with warm window -->
  <g transform="translate(42, 46)">
    <!-- Roof -->
    <polygon points="16,0 -4,16 36,16" fill="rgb(239,68,68)" />
    <!-- Wall -->
    <rect x="0" y="16" width="32" height="22" fill="rgb(254,243,199)" stroke="rgb(217,119,6)" stroke-width="1.5" />
    <!-- Glowing yellow window -->
    <rect x="8" y="20" width="16" height="12" rx="2" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.2" />
    <line x1="16" y1="20" x2="16" y2="32" stroke="rgb(217,119,6)" stroke-width="1" />
    <line x1="8" y1="26" x2="24" y2="26" stroke="rgb(217,119,6)" stroke-width="1" />
  </g>
</svg>`;

// 7. 지금 몇 시예요? (What time is it now?) - Friendly clock face with question mark
export const JIGEUM_MYEOTSI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Wall Clock -->
  <g transform="translate(44, 46)">
    <circle cx="0" cy="0" r="26" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="4" />
    <circle cx="0" cy="0" r="2.5" fill="rgb(30,41,59)" />
    <!-- Hour marks -->
    <line x1="0" y1="-22" x2="0" y2="-18" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" />
    <line x1="22" y1="0" x2="18" y2="0" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" />
    <line x1="0" y1="22" x2="0" y2="18" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" />
    <line x1="-22" y1="0" x2="-18" y2="0" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" />
    <!-- Hands -->
    <line x1="0" y1="0" x2="0" y2="-14" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="0" y1="0" x2="9" y2="5" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" />
  </g>
  <!-- Question Mark -->
  <text x="76" y="42" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="24" font-weight="900" fill="rgb(239,68,68)">?</text>
</svg>`;

// 8. 한 시예요 (It is 1 o'clock) - Clock showing exactly 1:00 with big "1"
export const HAN_SI_YEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Clock with hands pointing to 1:00 -->
  <g transform="translate(50, 48)">
    <circle cx="0" cy="0" r="28" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="4" />
    <circle cx="0" cy="0" r="3" fill="rgb(30,41,59)" />
    <!-- 12 mark & 1 mark -->
    <text x="0" y="-18" font-family="'NanumBarunGothic', sans-serif" font-size="6" font-weight="bold" fill="rgb(71,85,105)" text-anchor="middle">12</text>
    <text x="12" y="-14" font-family="'NanumBarunGothic', sans-serif" font-size="6" font-weight="bold" fill="rgb(220,38,38)" text-anchor="middle">1</text>
    <!-- Long hand to 12 -->
    <line x1="0" y1="0" x2="0" y2="-17" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <!-- Short hand to 1 -->
    <line x1="0" y1="0" x2="8" y2="-9" stroke="rgb(220,38,38)" stroke-width="3.5" stroke-linecap="round" />
  </g>
  <!-- Golden "1" badge -->
  <g transform="translate(18, 20)">
    <circle cx="10" cy="10" r="9" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.5" />
    <text x="10" y="14" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">1</text>
  </g>
</svg>`;

// 9. 과자파티 언제 해요? (When is the snack party?) - Party hat, cookies, and candy
export const GWAJA_PARTY_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Party Hat -->
  <g transform="translate(32, 22) rotate(-10)">
    <polygon points="18,0 4,36 32,36" fill="rgb(244,63,94)" />
    <!-- Pom-pom on top -->
    <circle cx="18" cy="0" r="4" fill="rgb(250,204,21)" />
    <path d="M 6 24 Q 18 16 30 24" stroke="rgb(255,255,255)" stroke-width="2.5" fill="none" />
    <circle cx="12" cy="16" r="2" fill="rgb(250,204,21)" />
    <circle cx="24" cy="20" r="2" fill="rgb(59,130,246)" />
  </g>
  <!-- Tasty Choco Cookie -->
  <g transform="translate(62, 54)">
    <circle cx="10" cy="10" r="14" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="1.8" />
    <!-- Choco chips -->
    <circle cx="6" cy="6" r="2" fill="rgb(120,53,15)" />
    <circle cx="14" cy="7" r="2.2" fill="rgb(120,53,15)" />
    <circle cx="9" cy="14" r="2" fill="rgb(120,53,15)" />
    <circle cx="15" cy="13" r="1.8" fill="rgb(120,53,15)" />
  </g>
  <!-- Wrapped Candy -->
  <g transform="translate(24, 60)">
    <ellipse cx="14" cy="10" rx="9" ry="6" fill="rgb(168,85,247)" stroke="rgb(126,34,206)" stroke-width="1.5" />
    <polygon points="5,10 0,6 0,14" fill="rgb(168,85,247)" />
    <polygon points="23,10 28,6 28,14" fill="rgb(168,85,247)" />
  </g>
  <!-- Sparkles -->
  <polygon points="76,22 78,26 82,27 78,29 76,33 74,29 70,27 74,26" fill="rgb(250,204,21)" />
</svg>`;

// 10. 나중에요 (Later) - Cute hourglass with golden sand
export const NAJUNG_E_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Wooden Hourglass -->
  <g transform="translate(34, 20)">
    <!-- Top & bottom wooden plates -->
    <rect x="0" y="0" width="32" height="6" rx="2" fill="rgb(217,119,6)" stroke="rgb(180,83,9)" stroke-width="1.8" />
    <rect x="0" y="54" width="32" height="6" rx="2" fill="rgb(217,119,6)" stroke="rgb(180,83,9)" stroke-width="1.8" />
    <!-- Pillars -->
    <line x1="4" y1="6" x2="4" y2="54" stroke="rgb(180,83,9)" stroke-width="2" />
    <line x1="28" y1="6" x2="28" y2="54" stroke="rgb(180,83,9)" stroke-width="2" />
    <!-- Glass Bulb Bulge -->
    <path d="M 6 6 Q 6 24 16 30 Q 6 36 6 54 L 26 54 Q 26 36 16 30 Q 26 24 26 6 Z" fill="rgba(255,255,255,0.7)" stroke="rgb(148,163,184)" stroke-width="1.8" />
    <!-- Sand in top bulb -->
    <path d="M 10 18 Q 16 28 16 30 Q 16 28 22 18 Z" fill="rgb(250,204,21)" />
    <!-- Sand trickling line -->
    <line x1="16" y1="30" x2="16" y2="46" stroke="rgb(250,204,21)" stroke-width="1.5" stroke-dasharray="2,2" />
    <!-- Sand mound in bottom bulb -->
    <path d="M 8 54 Q 16 44 24 54 Z" fill="rgb(250,204,21)" />
  </g>
</svg>`;

// ============================================================================
// CHAPTER 20: 요일 (Days & Week)
// ============================================================================

// 1. 월요일 (Monday) - Moon badge & school backpack
export const WOL_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Golden Moon (월: Moon) -->
  <g transform="translate(24, 20)">
    <path d="M 22 4 C 14 4 8 10 8 18 C 8 28 16 34 26 34 C 29 34 32 33 34 31 C 26 29 22 22 22 14 C 22 9 24 6 22 4 Z" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.5" />
    <!-- Smiling eye on moon -->
    <path d="M 14 16 Q 16 19 18 16" stroke="rgb(180,83,9)" stroke-width="1.5" fill="none" />
  </g>
  <!-- School Backpack ready for Monday -->
  <g transform="translate(48, 38)">
    <rect x="0" y="6" width="30" height="34" rx="8" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="2" />
    <rect x="4" y="20" width="22" height="16" rx="4" fill="rgb(250,204,21)" />
    <path d="M 6 6 Q 15 -2 24 6" stroke="rgb(29,78,216)" stroke-width="2.5" fill="none" />
  </g>
  <text x="32" y="74" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(59,130,246)">월요일</text>
</svg>`;

// 2. 화요일 (Tuesday) - Fire/Flame symbol (화: Fire) & sports ball
export const HWA_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Flame character (화) -->
  <g transform="translate(36, 18)">
    <path d="M 14 0 C 14 0 20 8 20 14 C 20 18 24 20 26 18 C 28 26 22 34 14 34 C 6 34 0 26 2 18 C 4 14 8 10 14 0 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <path d="M 14 12 C 14 12 18 16 18 20 C 18 24 14 26 14 26 C 14 26 10 24 10 20 C 10 16 14 12 14 12 Z" fill="rgb(250,204,21)" />
  </g>
  <!-- Soccer ball on ground -->
  <g transform="translate(48, 54)">
    <circle cx="12" cy="12" r="11" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="1.8" />
    <polygon points="12,7 16,10 14,15 10,15 8,10" fill="rgb(30,41,59)" />
  </g>
  <text x="30" y="74" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(239,68,68)">화요일</text>
</svg>`;

// 3. 수요일 (Wednesday) - Water droplet character (수: Water)
export const SU_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Smiling Water Drop -->
  <g transform="translate(50, 40)">
    <path d="M 0 -22 C -14 -4 -16 6 -16 12 C -16 22 -8 28 0 28 C 8 28 16 22 16 12 C 16 6 14 -4 0 -22 Z" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="2" />
    <!-- Cute face -->
    <circle cx="-5" cy="10" r="2" fill="rgb(15,23,42)" />
    <circle cx="5" cy="10" r="2" fill="rgb(15,23,42)" />
    <path d="M -3 16 Q 0 19 3 16" stroke="rgb(239,68,68)" stroke-width="1.5" fill="none" />
    <ellipse cx="-8" cy="13" rx="2" ry="1.2" fill="rgb(251,113,133)" />
    <ellipse cx="8" cy="13" rx="2" ry="1.2" fill="rgb(251,113,133)" />
  </g>
  <text x="50" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(2,132,199)" text-anchor="middle">수요일</text>
</svg>`;

// 4. 목요일 (Thursday) - Green sprout tree (목: Tree/Wood)
export const MOG_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Cute Tree -->
  <g transform="translate(50, 42)">
    <!-- Trunk -->
    <rect x="-4" y="6" width="8" height="24" rx="2" fill="rgb(180,83,9)" />
    <!-- Foliage Circles -->
    <circle cx="0" cy="-6" r="18" fill="rgb(34,197,94)" stroke="rgb(21,128,61)" stroke-width="2" />
    <circle cx="-12" cy="0" r="10" fill="rgb(74,222,128)" />
    <circle cx="12" cy="0" r="10" fill="rgb(74,222,128)" />
    <!-- Red apples in tree -->
    <circle cx="-6" cy="-8" r="3" fill="rgb(239,68,68)" />
    <circle cx="6" cy="-4" r="3" fill="rgb(239,68,68)" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(21,128,61)" text-anchor="middle">목요일</text>
</svg>`;

// 5. 금요일 (Friday) - Shiny Gold Coin (금: Gold)
export const GEUM_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Shiny Gold Coin -->
  <g transform="translate(50, 42)">
    <circle cx="0" cy="0" r="22" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="3" />
    <circle cx="0" cy="0" r="17" fill="rgb(254,240,138)" stroke="rgb(202,138,4)" stroke-width="1.5" stroke-dasharray="2,2" />
    <polygon points="0,-10 3,-3 10,-3 5,2 7,9 0,5 -7,9 -5,2 -10,-3 -3,-3" fill="rgb(245,158,11)" />
  </g>
  <!-- Sparkles -->
  <polygon points="76,24 78,28 82,29 78,31 76,35 74,31 70,29 74,28" fill="rgb(250,204,21)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">금요일</text>
</svg>`;

// 6. 토요일 (Saturday) - Earth / Picnic basket for weekend (토: Earth/Soil)
export const TO_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Woven Picnic Basket -->
  <g transform="translate(32, 34)">
    <rect x="0" y="10" width="36" height="24" rx="4" fill="rgb(217,119,6)" stroke="rgb(180,83,9)" stroke-width="2" />
    <!-- Handle -->
    <path d="M 6 10 Q 18 -6 30 10" stroke="rgb(180,83,9)" stroke-width="3" fill="none" />
    <!-- Red & white checkered napkin popping out -->
    <polygon points="12,10 18,2 24,10" fill="rgb(239,68,68)" />
    <!-- Basket weaves -->
    <line x1="0" y1="18" x2="36" y2="18" stroke="rgb(180,83,9)" stroke-width="1.5" />
    <line x1="0" y1="26" x2="36" y2="26" stroke="rgb(180,83,9)" stroke-width="1.5" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">토요일</text>
</svg>`;

// 7. 일요일 (Sunday) - Big Smiling Sun (일: Sun)
export const IL_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Radiant Smiling Sun -->
  <g transform="translate(50, 42)">
    <circle cx="0" cy="0" r="20" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <!-- Sunglasses -->
    <rect x="-14" y="-6" width="12" height="9" rx="2" fill="rgb(30,41,59)" />
    <rect x="2" y="-6" width="12" height="9" rx="2" fill="rgb(30,41,59)" />
    <line x1="-2" y1="-2" x2="2" y2="-2" stroke="rgb(30,41,59)" stroke-width="2" />
    <!-- Big toothy smile -->
    <path d="M -8 7 Q 0 14 8 7 Z" fill="rgb(255,255,255)" />
    <!-- Beams -->
    <line x1="0" y1="-28" x2="0" y2="-23" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <line x1="20" y1="-20" x2="16" y2="-16" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <line x1="28" y1="0" x2="23" y2="0" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <line x1="20" y1="20" x2="16" y2="16" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <line x1="0" y1="28" x2="0" y2="23" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <line x1="-20" y1="20" x2="-16" y2="16" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <line x1="-28" y1="0" x2="-23" y2="0" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <line x1="-20" y1="-20" x2="-16" y2="-16" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(220,38,38)" text-anchor="middle">일요일</text>
</svg>`;

// 8. 주말 (Weekend) - Weekend relaxation banner with tent & trees
export const JUMAL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Cozy Camping Tent -->
  <g transform="translate(30, 32)">
    <polygon points="20,0 2,34 38,34" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="2" />
    <!-- Tent Door Flap -->
    <polygon points="20,8 12,34 28,34" fill="rgb(254,215,170)" />
    <!-- Little flag on tent peak -->
    <polygon points="20,0 26,-4 20,-8" fill="rgb(239,68,68)" />
  </g>
  <!-- Mini pine trees beside tent -->
  <polygon points="74,40 68,54 80,54" fill="rgb(34,197,94)" />
  <polygon points="22,44 16,58 28,58" fill="rgb(34,197,94)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="12" font-weight="900" fill="rgb(16,185,129)" text-anchor="middle">주말</text>
</svg>`;

// 9. 무슨 요일이에요? (What day is it?) - Weekday cards flipping with question mark
export const MUSEUN_YOIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Three mini calendar cards -->
  <g transform="translate(18, 30)">
    <rect x="0" y="4" width="20" height="26" rx="3" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.5" />
    <text x="10" y="20" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(59,130,246)" text-anchor="middle">월</text>
  </g>
  <g transform="translate(38, 24)">
    <rect x="0" y="4" width="24" height="32" rx="3" fill="rgb(255,255,255)" stroke="rgb(239,68,68)" stroke-width="2" />
    <text x="12" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="13" font-weight="900" fill="rgb(239,68,68)" text-anchor="middle">화</text>
  </g>
  <g transform="translate(62, 30)">
    <rect x="0" y="4" width="20" height="26" rx="3" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="1.5" />
    <text x="10" y="20" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(16,185,129)" text-anchor="middle">수</text>
  </g>
  <!-- Question mark on top -->
  <text x="50" y="22" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="20" font-weight="900" fill="rgb(217,119,6)" text-anchor="middle">?</text>
  <text x="50" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">무슨 요일?</text>
</svg>`;

// 10. 뭐 했어요? (What did you do?) - Thought bubble with child's memories
export const MWO_HAESSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Thought Bubble Cloud -->
  <g transform="translate(20, 16)">
    <ellipse cx="30" cy="24" rx="28" ry="20" fill="rgb(255,255,255)" stroke="rgb(168,85,247)" stroke-width="2" />
    <circle cx="16" cy="12" r="10" fill="rgb(255,255,255)" />
    <circle cx="44" cy="12" r="10" fill="rgb(255,255,255)" />
    <!-- Drawing inside thought bubble: cute soccer ball & paint brush -->
    <circle cx="22" cy="24" r="7" fill="rgb(241,245,249)" stroke="rgb(30,41,59)" stroke-width="1.2" />
    <polygon points="22,21 24,23 23,26 21,26 20,23" fill="rgb(30,41,59)" />
    <line x1="32" y1="30" x2="42" y2="16" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" />
    <circle cx="43" cy="15" r="2.5" fill="rgb(250,204,21)" />
  </g>
  <!-- Thought connector bubbles -->
  <circle cx="34" cy="54" r="4" fill="rgb(255,255,255)" stroke="rgb(168,85,247)" stroke-width="1.5" />
  <circle cx="28" cy="62" r="2.5" fill="rgb(255,255,255)" stroke="rgb(168,85,247)" stroke-width="1.2" />
  <!-- Thinking child in corner -->
  <g transform="translate(14, 52)">
    <circle cx="10" cy="14" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
    <circle cx="13" cy="13" r="1.2" fill="rgb(30,41,59)" />
  </g>
  <text x="64" y="74" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(126,34,206)">뭐 했어요?</text>
</svg>`;

// ============================================================================
// CHAPTER 21: 숫자 (Numbers)
// ============================================================================

// 1. 하나/둘 (One / Two) - Blocks 1 & 2
export const HANA_DUL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Block 1 (Red) -->
  <g transform="translate(20, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">1</text>
  </g>
  <!-- Block 2 (Blue) -->
  <g transform="translate(54, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">2</text>
  </g>
  <!-- 1 apple, 2 cherries -->
  <circle cx="33" cy="22" r="5" fill="rgb(239,68,68)" />
  <circle cx="63" cy="22" r="4" fill="rgb(244,63,94)" />
  <circle cx="71" cy="22" r="4" fill="rgb(244,63,94)" />
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">하나 · 둘</text>
</svg>`;

// 2. 셋/넷 (Three / Four) - Blocks 3 & 4
export const SET_NET_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Block 3 (Yellow) -->
  <g transform="translate(20, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">3</text>
  </g>
  <!-- Block 4 (Green) -->
  <g transform="translate(54, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(34,197,94)" stroke="rgb(21,128,61)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">4</text>
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">셋 · 넷</text>
</svg>`;

// 3. 다섯/여섯 (Five / Six) - Blocks 5 & 6
export const DASEOT_YEOSEOT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Block 5 (Orange) -->
  <g transform="translate(20, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">5</text>
  </g>
  <!-- Block 6 (Teal) -->
  <g transform="translate(54, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(20,184,166)" stroke="rgb(13,148,136)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">6</text>
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">다섯 · 여섯</text>
</svg>`;

// 4. 일곱/여덟 (Seven / Eight) - Blocks 7 & 8
export const ILGOP_YEODEOL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Block 7 (Indigo) -->
  <g transform="translate(20, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(99,102,241)" stroke="rgb(67,56,202)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">7</text>
  </g>
  <!-- Block 8 (Purple) -->
  <g transform="translate(54, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(168,85,247)" stroke="rgb(126,34,206)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">8</text>
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">일곱 · 여덟</text>
</svg>`;

// 5. 아홉/열 (Nine / Ten) - Blocks 9 & 10
export const AHOP_YEOL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Block 9 (Rose) -->
  <g transform="translate(18, 32)">
    <rect x="0" y="0" width="26" height="32" rx="4" fill="rgb(244,63,94)" stroke="rgb(190,18,60)" stroke-width="2" />
    <text x="13" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">9</text>
  </g>
  <!-- Block 10 (Golden) -->
  <g transform="translate(50, 32)">
    <rect x="0" y="0" width="34" height="32" rx="4" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="2" />
    <text x="17" y="24" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="20" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">10</text>
  </g>
  <text x="50" y="78" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">아홉 · 열</text>
</svg>`;

// 6. 백 점 (100 points) - 100 points stamp with praise stars on test paper
export const BAEK_JEOM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Test Paper -->
  <g transform="translate(24, 18)">
    <rect x="0" y="0" width="52" height="60" rx="4" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2" />
    <line x1="8" y1="12" x2="28" y2="12" stroke="rgb(148,163,184)" stroke-width="2" stroke-linecap="round" />
    <line x1="8" y1="20" x2="44" y2="20" stroke="rgb(226,232,240)" stroke-width="2" stroke-linecap="round" />
    <line x1="8" y1="28" x2="44" y2="28" stroke="rgb(226,232,240)" stroke-width="2" stroke-linecap="round" />
    <line x1="8" y1="36" x2="44" y2="36" stroke="rgb(226,232,240)" stroke-width="2" stroke-linecap="round" />
    <!-- Big Red "100" Stamp with double underline -->
    <g transform="translate(26, 38) rotate(-12)">
      <text x="0" y="0" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="26" font-weight="900" fill="rgb(239,68,68)" text-anchor="middle">100</text>
      <line x1="-16" y1="4" x2="16" y2="4" stroke="rgb(239,68,68)" stroke-width="2.5" stroke-linecap="round" />
      <line x1="-14" y1="8" x2="14" y2="8" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" />
    </g>
  </g>
  <!-- Sparkle stars -->
  <polygon points="76,16 78,20 82,21 78,23 76,27 74,23 70,21 74,20" fill="rgb(250,204,21)" />
</svg>`;

// 7. 모두 (All / Everyone) - Happy children holding hands in a circle
export const MODU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Three diverse happy children holding hands -->
  <!-- Left child -->
  <g transform="translate(28, 48)">
    <circle cx="0" cy="-14" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-6" y="-6" width="12" height="16" rx="3" fill="rgb(59,130,246)" />
    <line x1="-3" y1="10" x2="-3" y2="24" stroke="rgb(30,41,59)" stroke-width="2.5" />
    <line x1="3" y1="10" x2="3" y2="24" stroke="rgb(30,41,59)" stroke-width="2.5" />
  </g>
  <!-- Middle child -->
  <g transform="translate(50, 44)">
    <circle cx="0" cy="-14" r="9" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-7" y="-5" width="14" height="18" rx="4" fill="rgb(239,68,68)" />
    <line x1="-3" y1="13" x2="-3" y2="28" stroke="rgb(30,41,59)" stroke-width="2.5" />
    <line x1="3" y1="13" x2="3" y2="28" stroke="rgb(30,41,59)" stroke-width="2.5" />
  </g>
  <!-- Right child -->
  <g transform="translate(72, 48)">
    <circle cx="0" cy="-14" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <rect x="-6" y="-6" width="12" height="16" rx="3" fill="rgb(250,204,21)" />
    <line x1="-3" y1="10" x2="-3" y2="24" stroke="rgb(30,41,59)" stroke-width="2.5" />
    <line x1="3" y1="10" x2="3" y2="24" stroke="rgb(30,41,59)" stroke-width="2.5" />
  </g>
  <!-- Connected hands -->
  <line x1="28" y1="46" x2="50" y2="44" stroke="rgb(254,215,170)" stroke-width="3.5" stroke-linecap="round" />
  <line x1="50" y1="44" x2="72" y2="46" stroke="rgb(254,215,170)" stroke-width="3.5" stroke-linecap="round" />
  <!-- Heart over them -->
  <path d="M 50 16 C 46 12 40 14 40 20 C 40 26 50 32 50 32 C 50 32 60 26 60 20 C 60 14 54 12 50 16 Z" fill="rgb(244,63,94)" />
</svg>`;

// 8. 몇 개예요? (How many?) - Basket of apples with question mark
export const MYEOT_GAE_YE_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Bowl with apples -->
  <g transform="translate(42, 50)">
    <path d="M -20 0 Q 0 24 20 0 Z" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="2" />
    <circle cx="-10" cy="-4" r="7" fill="rgb(239,68,68)" />
    <circle cx="0" cy="-6" r="7" fill="rgb(239,68,68)" />
    <circle cx="10" cy="-4" r="7" fill="rgb(239,68,68)" />
  </g>
  <!-- Big Question mark -->
  <text x="74" y="44" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="28" font-weight="900" fill="rgb(239,68,68)">?</text>
  <text x="50" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">몇 개예요?</text>
</svg>`;

// 9. 세 개예요 (There are three) - Three shiny red apples with "3" badge
export const SE_GAE_YE_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Three delicious apples in a triangle -->
  <g transform="translate(32, 52)">
    <circle cx="0" cy="0" r="11" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
    <circle cx="-3" cy="-3" r="2" fill="rgb(255,255,255)" opacity="0.6" />
    <path d="M 0 -11 Q 2 -15 5 -13" stroke="rgb(180,83,9)" stroke-width="1.8" fill="none" />
  </g>
  <g transform="translate(68, 52)">
    <circle cx="0" cy="0" r="11" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
    <circle cx="-3" cy="-3" r="2" fill="rgb(255,255,255)" opacity="0.6" />
    <path d="M 0 -11 Q 2 -15 5 -13" stroke="rgb(180,83,9)" stroke-width="1.8" fill="none" />
  </g>
  <g transform="translate(50, 34)">
    <circle cx="0" cy="0" r="11" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
    <circle cx="-3" cy="-3" r="2" fill="rgb(255,255,255)" opacity="0.6" />
    <path d="M 0 -11 Q 2 -15 5 -13" stroke="rgb(180,83,9)" stroke-width="1.8" fill="none" />
  </g>
  <!-- "3개" Badge -->
  <rect x="36" y="66" width="28" height="14" rx="7" fill="rgb(16,185,129)" />
  <text x="50" y="77" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">3개</text>
</svg>`;

// 10. 두 개 더 주세요 (Please give two more) - Two candies being offered with "+2" badge
export const DU_GAE_DEO_JUSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Two colorful wrapped sweets -->
  <g transform="translate(36, 44)">
    <circle cx="0" cy="0" r="9" fill="rgb(244,63,94)" stroke="rgb(190,18,60)" stroke-width="1.5" />
    <polygon points="-8,0 -14,-5 -14,5" fill="rgb(244,63,94)" />
    <polygon points="8,0 14,-5 14,5" fill="rgb(244,63,94)" />
  </g>
  <g transform="translate(64, 44)">
    <circle cx="0" cy="0" r="9" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.5" />
    <polygon points="-8,0 -14,-5 -14,5" fill="rgb(59,130,246)" />
    <polygon points="8,0 14,-5 14,5" fill="rgb(59,130,246)" />
  </g>
  <!-- "+2" Golden Star Badge -->
  <g transform="translate(50, 22)">
    <circle cx="0" cy="0" r="12" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2" />
    <text x="0" y="4" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="11" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">+2</text>
  </g>
  <text x="50" y="76" font-family="'Hakgyoansim Badasseugi', sans-serif" font-size="10" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">2개 더!</text>
</svg>`;
