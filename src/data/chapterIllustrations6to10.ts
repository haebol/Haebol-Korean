/**
 * High-Definition Vector SVG Illustrations for Chapters 6 ~ 10
 * Designed specifically for Korean elementary school & multicultural learners.
 * All SVGs use safe RGB/encoded values for 100% reliable rendering in <img> tags, canvas, and printouts.
 */

// ============================================================================
// CHAPTER 6: 규칙 (Rules)
// ============================================================================

// 1. 시간표 (Timetable) - School weekly timetable board with clock & subjects
export const SIGANPYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <!-- Shadow -->
  <rect x="18" y="18" width="64" height="68" rx="6" fill="rgba(15,23,42,0.12)" />
  <!-- Timetable Frame (Pastel Sky) -->
  <rect x="16" y="16" width="64" height="66" rx="6" fill="rgb(255,255,255)" stroke="rgb(56,189,248)" stroke-width="2.5" />
  <!-- Header Bar: '시간표' -->
  <rect x="16" y="16" width="64" height="15" rx="4" fill="rgb(14,165,233)" />
  <text x="44" y="27" font-family="'NanumBarunGothic', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">시간표</text>
  <!-- Mini Clock icon in header -->
  <circle cx="68" cy="23.5" r="4.5" fill="rgb(255,255,255)" stroke="rgb(3,105,161)" stroke-width="1" />
  <line x1="68" y1="23.5" x2="68" y2="21" stroke="rgb(3,105,161)" stroke-width="0.8" />
  <line x1="68" y1="23.5" x2="70" y2="23.5" stroke="rgb(3,105,161)" stroke-width="0.8" />
  <!-- Days of the week row (월 화 수 목 금) -->
  <g transform="translate(19, 34)">
    <rect x="0" y="0" width="11" height="8" rx="1.5" fill="rgb(224,242,254)" />
    <text x="5.5" y="6" font-family="'NanumBarunGothic', sans-serif" font-size="5" font-weight="700" fill="rgb(3,105,161)" text-anchor="middle">월</text>
    <rect x="12" y="0" width="11" height="8" rx="1.5" fill="rgb(224,242,254)" />
    <text x="17.5" y="6" font-family="'NanumBarunGothic', sans-serif" font-size="5" font-weight="700" fill="rgb(3,105,161)" text-anchor="middle">화</text>
    <rect x="24" y="0" width="11" height="8" rx="1.5" fill="rgb(224,242,254)" />
    <text x="29.5" y="6" font-family="'NanumBarunGothic', sans-serif" font-size="5" font-weight="700" fill="rgb(3,105,161)" text-anchor="middle">수</text>
    <rect x="36" y="0" width="11" height="8" rx="1.5" fill="rgb(224,242,254)" />
    <text x="41.5" y="6" font-family="'NanumBarunGothic', sans-serif" font-size="5" font-weight="700" fill="rgb(3,105,161)" text-anchor="middle">목</text>
    <rect x="48" y="0" width="11" height="8" rx="1.5" fill="rgb(224,242,254)" />
    <text x="53.5" y="6" font-family="'NanumBarunGothic', sans-serif" font-size="5" font-weight="700" fill="rgb(3,105,161)" text-anchor="middle">금</text>
  </g>
  <!-- Class Schedule Grid Blocks (Colorful Korean elementary subjects) -->
  <g transform="translate(19, 44)">
    <!-- Row 1: 국어 (Korean) -->
    <rect x="0" y="0" width="11" height="9" rx="1.5" fill="rgb(254,226,226)" stroke="rgb(248,113,113)" stroke-width="0.8" />
    <rect x="12" y="0" width="11" height="9" rx="1.5" fill="rgb(254,243,199)" stroke="rgb(251,191,36)" stroke-width="0.8" />
    <rect x="24" y="0" width="11" height="9" rx="1.5" fill="rgb(254,226,226)" stroke="rgb(248,113,113)" stroke-width="0.8" />
    <rect x="36" y="0" width="11" height="9" rx="1.5" fill="rgb(220,252,231)" stroke="rgb(74,222,128)" stroke-width="0.8" />
    <rect x="48" y="0" width="11" height="9" rx="1.5" fill="rgb(254,226,226)" stroke="rgb(248,113,113)" stroke-width="0.8" />
    <!-- Row 2: 수학 (Math) -->
    <rect x="0" y="11" width="11" height="9" rx="1.5" fill="rgb(224,231,255)" stroke="rgb(129,140,248)" stroke-width="0.8" />
    <rect x="12" y="11" width="11" height="9" rx="1.5" fill="rgb(220,252,231)" stroke="rgb(74,222,128)" stroke-width="0.8" />
    <rect x="24" y="11" width="11" height="9" rx="1.5" fill="rgb(224,231,255)" stroke="rgb(129,140,248)" stroke-width="0.8" />
    <rect x="36" y="11" width="11" height="9" rx="1.5" fill="rgb(254,243,199)" stroke="rgb(251,191,36)" stroke-width="0.8" />
    <rect x="48" y="11" width="11" height="9" rx="1.5" fill="rgb(224,231,255)" stroke="rgb(129,140,248)" stroke-width="0.8" />
    <!-- Row 3: 봄/체육/미술/음악 -->
    <rect x="0" y="22" width="11" height="9" rx="1.5" fill="rgb(254,240,138)" stroke="rgb(234,179,8)" stroke-width="0.8" />
    <rect x="12" y="22" width="11" height="9" rx="1.5" fill="rgb(243,232,255)" stroke="rgb(192,132,252)" stroke-width="0.8" />
    <rect x="24" y="22" width="11" height="9" rx="1.5" fill="rgb(254,240,138)" stroke="rgb(234,179,8)" stroke-width="0.8" />
    <rect x="36" y="22" width="11" height="9" rx="1.5" fill="rgb(243,232,255)" stroke="rgb(192,132,252)" stroke-width="0.8" />
    <rect x="48" y="22" width="11" height="9" rx="1.5" fill="rgb(220,252,231)" stroke="rgb(74,222,128)" stroke-width="0.8" />
  </g>
</svg>`;

// 3. 줄 (Line) - Children standing in an orderly straight line on yellow floor guide
export const JUL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Yellow Floor Guide Line (노란 안전 대기선) -->
  <rect x="10" y="74" width="80" height="6" rx="3" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.2" />
  <!-- Children in line facing right -->
  <!-- Child 1 (Front, Right) -->
  <g transform="translate(62, 22)">
    <circle cx="12" cy="12" r="10" fill="rgb(254,215,170)" />
    <path d="M 1.2 10 C 0.4 -2.7 23.6 -2.7 22.8 10 C 20 6 16 3 12 3 C 8 3 4 6 1.2 10 Z" fill="rgb(51,65,85)" />
    <circle cx="16" cy="11" r="1.5" fill="rgb(30,41,59)" />
    <path d="M 14 16 Q 16 18 18 16" stroke="rgb(190,18,60)" stroke-width="1.2" fill="none" />
    <rect x="6" y="22" width="14" height="22" rx="3" fill="rgb(239,68,68)" />
    <line x1="10" y1="44" x2="10" y2="54" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="16" y1="44" x2="16" y2="54" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="11" cy="54" rx="3" ry="1.8" fill="rgb(245,158,11)" />
    <ellipse cx="17" cy="54" rx="3" ry="1.8" fill="rgb(245,158,11)" />
  </g>
  <!-- Child 2 (Middle) -->
  <g transform="translate(38, 22)">
    <circle cx="12" cy="12" r="10" fill="rgb(254,215,170)" />
    <path d="M 1.2 10 C 0.4 -2.7 23.6 -2.7 22.8 10 C 20 6 16 3 12 3 C 8 3 4 6 1.2 10 Z" fill="rgb(217,119,6)" />
    <circle cx="16" cy="11" r="1.5" fill="rgb(30,41,59)" />
    <path d="M 14 16 Q 16 18 18 16" stroke="rgb(190,18,60)" stroke-width="1.2" fill="none" />
    <rect x="6" y="22" width="14" height="22" rx="3" fill="rgb(14,165,233)" />
    <line x1="10" y1="44" x2="10" y2="54" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="16" y1="44" x2="16" y2="54" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="11" cy="54" rx="3" ry="1.8" fill="rgb(239,68,68)" />
    <ellipse cx="17" cy="54" rx="3" ry="1.8" fill="rgb(239,68,68)" />
  </g>
  <!-- Child 3 (Back, Left) -->
  <g transform="translate(14, 22)">
    <circle cx="12" cy="12" r="10" fill="rgb(254,215,170)" />
    <path d="M 1.2 10 C 0.4 -2.7 23.6 -2.7 22.8 10 C 20 6 16 3 12 3 C 8 3 4 6 1.2 10 Z" fill="rgb(67,56,202)" />
    <circle cx="16" cy="11" r="1.5" fill="rgb(30,41,59)" />
    <path d="M 14 16 Q 16 18 18 16" stroke="rgb(190,18,60)" stroke-width="1.2" fill="none" />
    <rect x="6" y="22" width="14" height="22" rx="3" fill="rgb(34,197,94)" />
    <line x1="10" y1="44" x2="10" y2="54" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="16" y1="44" x2="16" y2="54" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <ellipse cx="11" cy="54" rx="3" ry="1.8" fill="rgb(59,130,246)" />
    <ellipse cx="17" cy="54" rx="3" ry="1.8" fill="rgb(59,130,246)" />
  </g>
  <!-- Sparkle & Good mark -->
  <path d="M 76 16 L 77.5 12 L 79 16 L 83 17.5 L 79 19 L 77.5 23 L 76 19 L 72 17.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 4. 서요 (Stand in line) - Child politely stepping into orderly line
export const SEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.6" />
  <!-- Floor guide footmarks -->
  <g transform="translate(36, 78)">
    <ellipse cx="6" cy="4" rx="4" ry="7" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.2" />
    <ellipse cx="22" cy="4" rx="4" ry="7" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.2" />
  </g>
  <!-- Child Standing Tall in Position -->
  <g transform="translate(32, 14)">
    <circle cx="18" cy="14" r="12" fill="rgb(254,215,170)" />
    <path d="M 5.2 12 C 4.2 -3.7 31.8 -3.7 30.8 12 C 30 7 24 4 18 4 C 12 4 6 7 5.2 12 Z" fill="rgb(51,65,85)" />
    <circle cx="14" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="22" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="10" cy="17" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="26" cy="17" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 15 19 Q 18 23 21 19" stroke="rgb(190,18,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <!-- Neat School Uniform / Clothes -->
    <rect x="8" y="24" width="20" height="26" rx="4" fill="rgb(16,185,129)" />
    <!-- Straight arms -->
    <rect x="3" y="26" width="5" height="20" rx="2.5" fill="rgb(254,215,170)" />
    <rect x="28" y="26" width="5" height="20" rx="2.5" fill="rgb(254,215,170)" />
    <!-- Legs -->
    <rect x="10" y="48" width="6.5" height="22" rx="3" fill="rgb(30,41,59)" />
    <rect x="19.5" y="48" width="6.5" height="22" rx="3" fill="rgb(30,41,59)" />
    <!-- Shoes -->
    <ellipse cx="13" cy="71" rx="4.5" ry="2.5" fill="rgb(239,68,68)" />
    <ellipse cx="23" cy="71" rx="4.5" ry="2.5" fill="rgb(239,68,68)" />
  </g>
</svg>`;

// 5. 펴세요 (Open book) - Hands opening book cleanly with turning page motion
export const PYEOGE_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <!-- Turning Page Arc Motion Arrow -->
  <path d="M 52 24 A 18 18 0 0 1 76 34" stroke="rgb(59,130,246)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <polygon points="78,34 72,32 76,28" fill="rgb(59,130,246)" />
  <!-- Open Book Spreads -->
  <g transform="translate(14, 26)">
    <!-- Base cover -->
    <path d="M 0 46 Q 36 54 72 46 L 72 48 Q 36 56 0 48 Z" fill="rgb(2,132,199)" />
    <!-- Left Page -->
    <path d="M 36 46 Q 20 42 2 36 L 4 12 Q 20 18 36 20 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.8" />
    <line x1="12" y1="22" x2="28" y2="25" stroke="rgb(148,163,184)" stroke-width="1.5" stroke-linecap="round" />
    <line x1="11" y1="28" x2="29" y2="31" stroke="rgb(148,163,184)" stroke-width="1.5" stroke-linecap="round" />
    <!-- Right Page (Being turned open) -->
    <path d="M 36 46 Q 52 42 70 36 L 68 12 Q 52 18 36 20 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.8" />
    <!-- Page curl effect -->
    <path d="M 36 20 Q 50 14 58 28 L 36 46 Z" fill="rgb(241,245,249)" stroke="rgb(147,197,253)" stroke-width="1.2" />
    <!-- Child hands gently holding sides to open -->
    <ellipse cx="2" cy="24" rx="4.5" ry="6" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.2" />
    <ellipse cx="70" cy="24" rx="4.5" ry="6" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.2" />
  </g>
</svg>`;

// 6. 가방 (Backpack) - Elementary school backpack with pockets & cute keychain
export const GABANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="84" rx="28" ry="6" fill="rgba(15,23,42,0.12)" />
  <!-- Backpack Body -->
  <g transform="translate(22, 14)">
    <!-- Top Carry Handle -->
    <path d="M 20 12 Q 28 4 36 12" stroke="rgb(180,83,9)" stroke-width="4" stroke-linecap="round" fill="none" />
    <!-- Main Bag (Sunny Yellow with Orange Accents) -->
    <rect x="6" y="10" width="44" height="60" rx="14" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2.5" />
    <!-- Front Zipper Pocket -->
    <rect x="10" y="36" width="36" height="30" rx="9" fill="rgb(245,158,11)" stroke="rgb(180,83,9)" stroke-width="2" />
    <!-- Zipper Line & Puller -->
    <line x1="16" y1="36" x2="40" y2="36" stroke="rgb(255,255,255)" stroke-width="2" stroke-dasharray="2,2" />
    <circle cx="28" cy="36" r="2.5" fill="rgb(255,255,255)" />
    <!-- Cute Bear Reflector Keychain Badge -->
    <circle cx="28" cy="52" r="7" fill="rgb(254,240,138)" stroke="rgb(202,138,4)" stroke-width="1.2" />
    <circle cx="25" cy="51" r="1" fill="rgb(30,41,59)" />
    <circle cx="31" cy="51" r="1" fill="rgb(30,41,59)" />
    <path d="M 26 54 Q 28 56 30 54" stroke="rgb(30,41,59)" stroke-width="1" fill="none" />
    <!-- Side Water Bottle Mesh Pocket -->
    <rect x="0" y="32" width="7" height="24" rx="3.5" fill="rgb(217,119,6)" />
    <rect x="49" y="32" width="7" height="24" rx="3.5" fill="rgb(217,119,6)" />
  </g>
</svg>`;

// 8. 쉬는 시간 (Break time) - School bell ringing & clock showing 10 min break
export const SWINEUN_SIGAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Ringing Bell sound waves -->
  <path d="M 22 28 Q 16 38 22 48" stroke="rgb(234,179,8)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M 78 28 Q 84 38 78 48" stroke="rgb(234,179,8)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <!-- Golden School Bell (딩동댕~) -->
  <g transform="translate(32, 16)">
    <!-- Bell Top Ring -->
    <circle cx="18" cy="6" r="4" fill="none" stroke="rgb(202,138,4)" stroke-width="2.5" />
    <!-- Bell Dome -->
    <path d="M 6 36 C 6 22 10 12 18 12 C 26 12 30 22 30 36 Z" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="2.5" />
    <!-- Bell Lip -->
    <ellipse cx="18" cy="36" rx="14" ry="4" fill="rgb(245,158,11)" stroke="rgb(202,138,4)" stroke-width="2" />
    <!-- Bell Clapper ball -->
    <circle cx="18" cy="41" r="3.5" fill="rgb(180,83,9)" />
  </g>
  <!-- Happy Children running in break time -->
  <g transform="translate(22, 60)">
    <circle cx="14" cy="10" r="7" fill="rgb(254,215,170)" />
    <path d="M 8 16 L 20 16 L 18 30 L 10 30 Z" fill="rgb(16,185,129)" />
    <line x1="10" y1="30" x2="6" y2="38" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="18" y1="30" x2="22" y2="38" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  </g>
  <g transform="translate(56, 60)">
    <circle cx="14" cy="10" r="7" fill="rgb(254,215,170)" />
    <path d="M 8 16 L 20 16 L 18 30 L 10 30 Z" fill="rgb(244,63,94)" />
    <line x1="10" y1="30" x2="6" y2="38" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="18" y1="30" x2="22" y2="38" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  </g>
  <!-- Joyful sparkles -->
  <path d="M 50 56 L 51.5 52 L 53 56 L 57 57.5 L 53 59 L 51.5 63 L 50 59 L 46 57.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 9. 내세요 (Submit / Hand in) - Respectful hands submitting homework paper to teacher
export const NAESEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <!-- Submission Tray / Teacher Desk edge -->
  <rect x="22" y="16" width="56" height="18" rx="4" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="2" />
  <text x="50" y="28" font-family="'NanumBarunGothic', sans-serif" font-size="7" font-weight="900" fill="rgb(71,85,105)" text-anchor="middle">숙제 제출함</text>
  <!-- Downward submission arrow -->
  <path d="M 50 36 L 50 44 M 46 41 L 50 45 L 54 41" stroke="rgb(16,185,129)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  <!-- Homework Paper being handed in -->
  <g transform="translate(30, 44)">
    <rect x="0" y="0" width="40" height="42" rx="4" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="1.8" />
    <!-- Checkmark on homework -->
    <circle cx="10" cy="10" r="5" fill="rgb(220,252,231)" />
    <path d="M 8 10 L 10 12 L 13 8" stroke="rgb(16,185,129)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <line x1="18" y1="10" x2="34" y2="10" stroke="rgb(148,163,184)" stroke-width="1.5" stroke-linecap="round" />
    <line x1="6" y1="18" x2="34" y2="18" stroke="rgb(203,213,225)" stroke-width="1.5" stroke-linecap="round" />
    <line x1="6" y1="26" x2="34" y2="26" stroke="rgb(203,213,225)" stroke-width="1.5" stroke-linecap="round" />
    <!-- Two polite student hands holding paper on bottom corners -->
    <ellipse cx="-2" cy="30" rx="4.5" ry="6" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.2" />
    <ellipse cx="42" cy="30" rx="4.5" ry="6" fill="rgb(254,215,170)" stroke="rgb(249,115,22)" stroke-width="1.2" />
  </g>
</svg>`;

// 10. 넣어요 (Put in) - Placing books neatly inside school desk drawer
export const NEO_EO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- School Desk & Open Drawer -->
  <g transform="translate(14, 20)">
    <!-- Desk Top Board -->
    <rect x="0" y="0" width="72" height="12" rx="3" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="2" />
    <!-- Drawer Compartment Cavity (Dark interior) -->
    <rect x="6" y="12" width="60" height="34" rx="2" fill="rgb(100,116,139)" stroke="rgb(51,65,85)" stroke-width="2" />
    <!-- Textbook Being Put Inside Drawer -->
    <g transform="translate(14, 18)">
      <rect x="0" y="0" width="34" height="22" rx="3" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.5" />
      <rect x="2" y="2" width="6" height="18" fill="rgb(30,64,175)" />
      <text x="18" y="14" font-family="'NanumBarunGothic', sans-serif" font-size="7" font-weight="900" fill="rgb(255,255,255)">국어</text>
    </g>
    <!-- Arrow pointing into drawer -->
    <path d="M 54 18 L 44 26 M 44 22 L 44 26 L 48 26" stroke="rgb(250,204,21)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Child Hand sliding book in -->
    <g transform="translate(42, 28)">
      <rect x="0" y="0" width="16" height="7" rx="3.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
      <rect x="12" y="-2" width="14" height="11" rx="3" fill="rgb(239,68,68)" />
    </g>
  </g>
</svg>`;

// ============================================================================
// CHAPTER 7: 급식 (Lunch)
// ============================================================================

// 12. 숟가락 (Spoon) - Shiny Korean stainless steel spoon scooping warm rice
export const SUTGARAK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(241,245,249)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="82" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Angled Stainless Steel Spoon -->
  <g transform="translate(50, 48) rotate(-45)">
    <!-- Long Sleek Handle -->
    <path d="M -2 0 L -2 58 Q 0 62 2 62 Q 4 62 4 58 L 4 0 Z" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="2" />
    <!-- Metallic shine streak -->
    <line x1="0" y1="6" x2="0" y2="54" stroke="rgb(255,255,255)" stroke-width="1.5" stroke-linecap="round" />
    <!-- Spoon Bowl Head -->
    <ellipse cx="1" cy="-20" rx="16" ry="24" fill="rgb(248,250,252)" stroke="rgb(148,163,184)" stroke-width="2.5" />
    <!-- Inner Bowl Depth Reflection -->
    <ellipse cx="1" cy="-20" rx="11" ry="17" fill="rgb(226,232,240)" />
    <path d="M -6 -32 Q 1 -24 8 -32" stroke="rgb(255,255,255)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  </g>
  <!-- Sparkles of clean cutlery -->
  <path d="M 68 20 L 70 14 L 72 20 L 78 22 L 72 24 L 70 30 L 68 24 L 62 22 Z" fill="rgb(250,204,21)" />
</svg>`;

// 13. 젓가락 (Chopsticks) - Pair of Korean flat stainless chopsticks picking up tasty banchan
export const JEOTGARAK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.6" />
  <!-- Shadow -->
  <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.1)" />
  <!-- Pair of Stainless Flat Chopsticks -->
  <g transform="translate(50, 48) rotate(-35)">
    <!-- Left Chopstick -->
    <polygon points="-8,-48 -4,-48 -2,48 -5,48" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="1.8" />
    <!-- Right Chopstick -->
    <polygon points="4,-48 8,-48 2,48 -1,48" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="1.8" />
    <!-- Grip lines on tips -->
    <line x1="-3" y1="36" x2="-4" y2="36" stroke="rgb(100,116,139)" stroke-width="1" />
    <line x1="-2.5" y1="40" x2="-3.5" y2="40" stroke="rgb(100,116,139)" stroke-width="1" />
    <line x1="0.5" y1="36" x2="1.5" y2="36" stroke="rgb(100,116,139)" stroke-width="1" />
    <line x1="0" y1="40" x2="1" y2="40" stroke="rgb(100,116,139)" stroke-width="1" />
    <!-- Picking up a delicious yellow rolled omelette (계란말이) -->
    <rect x="-8" y="44" width="16" height="12" rx="4" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.5" />
    <circle cx="-2" cy="50" r="1.5" fill="rgb(239,68,68)" />
    <circle cx="4" cy="50" r="1.5" fill="rgb(34,197,94)" />
  </g>
</svg>`;

// 14-B. 받아요 (Receive Notebook) - 친구/선생님에게 두 손으로 공책을 공손히 받는 아이
export const BADA_YO_NOTEBOOK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <ellipse cx="42" cy="87" rx="28" ry="4" fill="rgb(199,210,254)" opacity="0.65" />

  <!-- Receiving Child (Left-Center) -->
  <g transform="translate(8, 18)">
    <!-- Body in warm mint cardigan & white collar -->
    <path d="M 10 64 C 10 47 18 42 28 42 C 38 42 44 47 45 64 Z" fill="rgb(16,185,129)" stroke="rgb(5,150,105)" stroke-width="1.4" />
    <path d="M 22 42 L 28 48 L 34 42 Z" fill="rgb(255,255,255)" />
    <!-- Neck -->
    <rect x="24" y="37" width="8" height="6" rx="2" fill="rgb(254,215,170)" />
    <!-- Head -->
    <circle cx="28" cy="24" r="14.5" fill="rgb(254,215,170)" />
    <!-- Soft rounded hair with neat bangs (no ear protrusions) -->
    <path d="M 13.3 22 C 13 6 43 6 42.7 22 C 39 14 33 13 28 14 C 23 13 17 14 13.3 22 Z" fill="rgb(51,65,85)" />
    <!-- Happy smiling crescent eyes looking right at the notebook -->
    <path d="M 21 23 Q 23.5 20 26 23" stroke="rgb(30,41,59)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <path d="M 31 23 Q 33.5 20 36 23" stroke="rgb(30,41,59)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <!-- Rosy cheeks & warm smile -->
    <circle cx="19.5" cy="26.5" r="2.2" fill="rgb(251,113,133)" opacity="0.65" />
    <circle cx="37" cy="26.5" r="2.2" fill="rgb(251,113,133)" opacity="0.65" />
    <path d="M 25 28 Q 29 32 33 28" stroke="rgb(190,18,60)" stroke-width="1.6" stroke-linecap="round" fill="none" />
    <!-- Child's outstretched arms & polite open hands receiving -->
    <path d="M 35 49 L 47 47" stroke="rgb(16,185,129)" stroke-width="5.5" stroke-linecap="round" />
    <circle cx="49" cy="46.5" r="3.4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
    <path d="M 28 53 L 44 53" stroke="rgb(5,150,105)" stroke-width="5" stroke-linecap="round" />
    <circle cx="46" cy="53" r="3.2" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
  </g>

  <!-- Giver's Sleeve & Hand (Right) passing the notebook over -->
  <g transform="translate(68, 22)">
    <path d="M 24 8 L 8 15" stroke="rgb(245,158,11)" stroke-width="7.5" stroke-linecap="round" />
    <circle cx="7" cy="15.5" r="3.8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
  </g>

  <!-- Crisp Indigo School Notebook (공책) held in between -->
  <g transform="translate(50, 34) rotate(-8)">
    <rect x="2" y="2" width="28" height="33" rx="3" fill="rgba(67,56,202,0.18)" />
    <rect x="0" y="0" width="28" height="33" rx="3" fill="rgb(99,102,241)" stroke="rgb(67,56,202)" stroke-width="1.6" />
    <rect x="5" y="0" width="23" height="33" rx="2" fill="rgb(99,102,241)" />
    <rect x="0" y="0" width="5.5" height="33" rx="1.5" fill="rgb(67,56,202)" />
    <rect x="7" y="4" width="18" height="10" rx="2" fill="rgb(254,243,199)" stroke="rgb(245,158,11)" stroke-width="0.9" />
    <text x="16" y="11.5" font-size="6.2" font-family="'Hakgyoansim Badasseugi', sans-serif" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">공책</text>
    <polygon points="16,18 17.4,21 20.6,21.4 18.2,23.6 18.8,26.8 16,25.2 13.2,26.8 13.8,23.6 11.4,21.4 14.6,21" fill="rgb(253,224,71)" />
  </g>

  <!-- Gentle receiving motion arrow & sparkle -->
  <path d="M 76 58 Q 68 65 59 63" stroke="rgb(79,70,229)" stroke-width="1.8" stroke-linecap="round" fill="none" />
  <path d="M 62 60.5 L 58.5 63 L 61.5 65.5" stroke="rgb(79,70,229)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <path d="M 54 22 Q 56.5 22 56.5 19.5 Q 56.5 22 59 22 Q 56.5 22 56.5 24.5 Q 56.5 22 54 22 Z" fill="rgb(234,179,8)" />
</svg>`;

// 14. 받아요 (Receive / Take) - Polite hands receiving a clean meal tray
export const BADA_YO_LUNCH_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- School meal tray being handed down -->
  <rect x="18" y="22" width="64" height="42" rx="8" fill="rgb(241,245,249)" stroke="rgb(148,163,184)" stroke-width="2.5" />
  <!-- Mini tray compartments -->
  <rect x="23" y="27" width="15" height="14" rx="3" fill="rgb(254,226,226)" />
  <rect x="42" y="27" width="15" height="14" rx="3" fill="rgb(254,243,199)" />
  <rect x="61" y="27" width="15" height="14" rx="3" fill="rgb(220,252,231)" />
  <circle cx="34" cy="51" r="9" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.5" />
  <circle cx="58" cy="51" r="9" fill="rgb(254,240,138)" stroke="rgb(203,213,225)" stroke-width="1.5" />
  <!-- Two Polite Hands Supporting the Tray from Below -->
  <g transform="translate(18, 56)">
    <ellipse cx="6" cy="14" rx="6" ry="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <ellipse cx="58" cy="14" rx="6" ry="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <!-- Sleeves -->
    <rect x="-1" y="20" width="14" height="14" rx="3" fill="rgb(16,185,129)" />
    <rect x="51" y="20" width="14" height="14" rx="3" fill="rgb(16,185,129)" />
  </g>
</svg>`;

// 15. 먹어요 (Eat) - Cheerful kid eating deliciously with spoon & rosy cheeks
export const MEOK_EO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <g transform="translate(20, 14)">
    <!-- Face -->
    <circle cx="30" cy="24" r="18" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 11.2 20 C 9.8 -1.6 50.2 -1.6 48.8 20 C 48 14 40 10 30 10 C 20 10 12 14 11.2 20 Z" fill="rgb(51,65,85)" />
    <!-- Happy Eating Eyes (Squinting joy) -->
    <path d="M 20 22 Q 24 17 28 22" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 32 22 Q 36 17 40 22" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <!-- Big Rosy Cheeks -->
    <circle cx="16" cy="28" r="4.5" fill="rgb(244,63,94)" opacity="0.65" />
    <circle cx="44" cy="28" r="4.5" fill="rgb(244,63,94)" opacity="0.65" />
    <!-- Open Happy Mouth (냠냠!) -->
    <path d="M 23 28 Q 30 38 37 28 Z" fill="rgb(190,18,60)" />
    <!-- Body -->
    <path d="M 14 54 C 14 42 22 38 30 38 C 38 38 46 42 46 54 Z" fill="rgb(249,115,22)" />
    <!-- Hand holding spoon to mouth -->
    <g transform="translate(38, 26)">
      <line x1="2" y1="18" x2="-8" y2="6" stroke="rgb(148,163,184)" stroke-width="3" stroke-linecap="round" />
      <ellipse cx="-8" cy="6" rx="5" ry="3.5" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="1.2" />
      <!-- Rice on spoon -->
      <circle cx="-8" cy="5" r="2.5" fill="rgb(248,250,252)" />
      <circle cx="2" cy="18" r="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    </g>
  </g>
</svg>`;

// 16. 밥 (Rice) - Mounded warm fluffy white rice in ceramic bowl with steam
export const BAP_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="80" rx="32" ry="7" fill="rgba(15,23,42,0.12)" />
  <!-- Steam Wisps Rising -->
  <path d="M 42 22 Q 38 14 42 8" stroke="rgb(203,213,225)" stroke-width="2.2" stroke-linecap="round" fill="none" />
  <path d="M 50 20 Q 54 12 50 6" stroke="rgb(203,213,225)" stroke-width="2.2" stroke-linecap="round" fill="none" />
  <path d="M 58 22 Q 54 14 58 8" stroke="rgb(203,213,225)" stroke-width="2.2" stroke-linecap="round" fill="none" />
  <!-- Mounded White Fluffy Rice Dome -->
  <g transform="translate(20, 24)">
    <path d="M 6 34 C 6 12 18 6 30 6 C 42 6 54 12 54 34 Z" fill="rgb(255,255,255)" stroke="rgb(226,232,240)" stroke-width="2" />
    <!-- Individual Rice Grain Highlights -->
    <ellipse cx="26" cy="18" rx="2.5" ry="1.2" fill="rgb(241,245,249)" />
    <ellipse cx="36" cy="16" rx="2.5" ry="1.2" fill="rgb(241,245,249)" />
    <ellipse cx="30" cy="24" rx="2.5" ry="1.2" fill="rgb(241,245,249)" />
    <!-- Ceramic Rice Bowl Body -->
    <path d="M 2 32 Q 4 60 30 60 Q 56 60 58 32 Z" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="2.5" />
    <!-- Bowl Ring Base -->
    <rect x="22" y="60" width="16" height="4" rx="2" fill="rgb(2,132,199)" />
    <!-- Cute Smiley Face on Bowl -->
    <circle cx="24" cy="44" r="2" fill="rgb(15,23,42)" />
    <circle cx="36" cy="44" r="2" fill="rgb(15,23,42)" />
    <path d="M 27 48 Q 30 52 33 48" stroke="rgb(15,23,42)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <circle cx="20" cy="46" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="40" cy="46" r="2" fill="rgb(244,114,182)" opacity="0.6" />
  </g>
</svg>`;

// 17. 국 (Soup) - Warm Korean soup with tofu cubes, scallions & gentle steam
export const GUK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="82" rx="34" ry="7" fill="rgba(15,23,42,0.12)" />
  <!-- Steam Wisps -->
  <path d="M 44 20 Q 40 12 44 6" stroke="rgb(217,119,6)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6" />
  <path d="M 56 20 Q 60 12 56 6" stroke="rgb(217,119,6)" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.6" />
  <!-- Soup Bowl & Broth -->
  <g transform="translate(16, 26)">
    <!-- Bowl Rim Back -->
    <ellipse cx="34" cy="18" rx="34" ry="14" fill="rgb(245,158,11)" stroke="rgb(180,83,9)" stroke-width="2.5" />
    <!-- Rich Warm Broth Fill -->
    <ellipse cx="34" cy="19" rx="31" ry="11" fill="rgb(251,191,36)" />
    <!-- Floating Tofu Cubes (두부) -->
    <rect x="22" y="14" width="8" height="8" rx="1.5" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1" />
    <rect x="38" y="16" width="9" height="9" rx="1.5" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1" />
    <!-- Green Scallions / Seaweed (파/미역) -->
    <ellipse cx="26" cy="18" rx="2" ry="3.5" fill="rgb(34,197,94)" />
    <ellipse cx="46" cy="15" rx="3" ry="1.5" fill="rgb(22,163,74)" />
    <ellipse cx="34" cy="22" rx="2.5" ry="1.5" fill="rgb(22,163,74)" />
    <!-- Soup Bowl Ceramic Front Body -->
    <path d="M 0 18 Q 4 52 34 52 Q 64 52 68 18 Z" fill="rgb(244,63,94)" stroke="rgb(190,18,60)" stroke-width="2.5" />
    <rect x="24" y="52" width="20" height="4" rx="2" fill="rgb(190,18,60)" />
  </g>
</svg>`;

// 18. 반찬 (Side dish) - Trio of delicious side dishes on cute plates
export const BANCHAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Big Ceramic Serving Plate -->
  <ellipse cx="50" cy="56" rx="42" ry="24" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2.5" />
  <ellipse cx="50" cy="55" rx="36" ry="19" fill="rgb(248,250,252)" />
  <!-- Side Dish 1: Rolled Omelette (계란말이) Left -->
  <g transform="translate(18, 42)">
    <rect x="0" y="0" width="16" height="12" rx="4" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.2" />
    <circle cx="4" cy="6" r="1.5" fill="rgb(34,197,94)" />
    <circle cx="10" cy="6" r="1.5" fill="rgb(239,68,68)" />
  </g>
  <!-- Side Dish 2: Savory Meat Patty / Tteok-galbi (떡갈비) Center -->
  <g transform="translate(40, 38)">
    <ellipse cx="10" cy="12" rx="10" ry="8" fill="rgb(180,83,9)" stroke="rgb(120,53,15)" stroke-width="1.5" />
    <line x1="4" y1="9" x2="16" y2="15" stroke="rgb(250,204,21)" stroke-width="1" />
    <line x1="6" y1="15" x2="14" y2="9" stroke="rgb(250,204,21)" stroke-width="1" />
  </g>
  <!-- Side Dish 3: Fresh Broccoli / Green Veggies (초록 나물) Right -->
  <g transform="translate(64, 42)">
    <circle cx="6" cy="6" r="5" fill="rgb(34,197,94)" stroke="rgb(22,163,74)" stroke-width="1.2" />
    <circle cx="12" cy="7" r="4" fill="rgb(22,163,74)" />
    <circle cx="8" cy="12" r="4.5" fill="rgb(34,197,94)" />
  </g>
  <!-- Sparkles -->
  <path d="M 50 20 L 51.5 16 L 53 20 L 57 21.5 L 53 23 L 51.5 27 L 50 23 L 46 21.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 19. 물통 (Water bottle) - Student stainless water bottle with strap & flip straw
export const MULTONG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="85" rx="20" ry="5" fill="rgba(15,23,42,0.12)" />
  <!-- Water Bottle Body -->
  <g transform="translate(34, 14)">
    <!-- Flip Lid & Straw Mouthpiece -->
    <rect x="8" y="2" width="16" height="8" rx="4" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
    <rect x="6" y="10" width="20" height="6" rx="2" fill="rgb(30,41,59)" />
    <!-- Main Cylinder Bottle -->
    <rect x="4" y="16" width="24" height="54" rx="8" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="2.5" />
    <!-- White Water Wave Pattern on bottle -->
    <path d="M 4 42 Q 16 38 28 42 L 28 58 Q 16 62 4 58 Z" fill="rgb(255,255,255)" opacity="0.65" />
    <!-- Cute Whale / Drop Sticker on bottle -->
    <circle cx="16" cy="50" r="4" fill="rgb(14,165,233)" />
    <circle cx="15" cy="49" r="0.8" fill="rgb(255,255,255)" />
    <!-- Shoulder Carrying Strap (Rainbow/Fabric band) -->
    <path d="M 4 24 C -12 24 -12 60 4 60" stroke="rgb(244,63,94)" stroke-width="3" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// 20. 치워요 (Clean up) - Carrying meal tray to dish return window (퇴식구)
export const CHIWO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Dish Return Counter Sign (퇴식구) -->
  <rect x="24" y="14" width="52" height="16" rx="4" fill="rgb(16,185,129)" stroke="rgb(5,150,105)" stroke-width="1.8" />
  <text x="50" y="25.5" font-family="'NanumBarunGothic', sans-serif" font-size="8.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">퇴식구 (정리)</text>
  <!-- Return Opening slot -->
  <rect x="28" y="30" width="44" height="6" rx="2" fill="rgb(100,116,139)" />
  <!-- Child carrying tray to return -->
  <g transform="translate(26, 38)">
    <!-- Meal Tray with empty bowl -->
    <rect x="4" y="14" width="40" height="12" rx="3" fill="rgb(241,245,249)" stroke="rgb(148,163,184)" stroke-width="1.5" />
    <ellipse cx="14" cy="20" rx="5" ry="3" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1" />
    <line x1="26" y1="18" x2="36" y2="22" stroke="rgb(148,163,184)" stroke-width="1.5" stroke-linecap="round" />
    <!-- Hands holding tray -->
    <ellipse cx="4" cy="20" rx="3.5" ry="4.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <ellipse cx="44" cy="20" rx="3.5" ry="4.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    <!-- Child body -->
    <rect x="14" y="26" width="20" height="20" rx="4" fill="rgb(14,165,233)" />
  </g>
  <!-- Sparkles -->
  <path d="M 78 44 L 80 38 L 82 44 L 88 46 L 82 48 L 80 54 L 78 48 L 72 46 Z" fill="rgb(250,204,21)" />
</svg>`;

// ============================================================================
// CHAPTER 8: 맛 (Taste)
// ============================================================================

// 21. 더 주세요 (More please) - Child holding bowl asking for seconds with '+' sign
export const DEO_JUSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <!-- Big Friendly Plus Sign Badge (➕ 더 많이) -->
  <g transform="translate(68, 14)">
    <circle cx="10" cy="10" r="9" fill="rgb(239,68,68)" />
    <line x1="10" y1="5" x2="10" y2="15" stroke="rgb(255,255,255)" stroke-width="3" stroke-linecap="round" />
    <line x1="5" y1="10" x2="15" y2="10" stroke="rgb(255,255,255)" stroke-width="3" stroke-linecap="round" />
  </g>
  <!-- Child Holding Bowl Pleadingly -->
  <g transform="translate(20, 16)">
    <!-- Face -->
    <circle cx="30" cy="24" r="18" fill="rgb(254,215,170)" />
    <path d="M 11.2 20 C 9.8 -1.6 50.2 -1.6 48.8 20 C 48 14 40 10 30 10 C 20 10 12 14 11.2 20 Z" fill="rgb(51,65,85)" />
    <!-- Sparkling pleading puppy eyes -->
    <circle cx="23" cy="22" r="3.2" fill="rgb(30,41,59)" />
    <circle cx="37" cy="22" r="3.2" fill="rgb(30,41,59)" />
    <circle cx="22" cy="20.5" r="1.3" fill="rgb(255,255,255)" />
    <circle cx="36" cy="20.5" r="1.3" fill="rgb(255,255,255)" />
    <circle cx="24" cy="23.5" r="0.7" fill="rgb(255,255,255)" />
    <circle cx="38" cy="23.5" r="0.7" fill="rgb(255,255,255)" />
    <circle cx="17" cy="28" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="43" cy="28" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 27 29 Q 30 33 33 29" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Hands holding empty bowl forward -->
    <g transform="translate(14, 40)">
      <path d="M 4 6 Q 6 24 16 24 Q 26 24 28 6 Z" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="2" />
      <ellipse cx="2" cy="12" rx="3.5" ry="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
      <ellipse cx="30" cy="12" rx="3.5" ry="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    </g>
  </g>
</svg>`;

// 22. 배불러요 (I'm full) - Satisfied child with round full tummy patting belly
export const BAEBULLEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <g transform="translate(20, 14)">
    <!-- Face -->
    <circle cx="30" cy="22" r="16" fill="rgb(254,215,170)" />
    <path d="M 13.2 18 C 11.9 -0.9 48.1 -0.9 46.8 18 C 46 12 40 8 30 8 C 20 8 14 12 13.2 18 Z" fill="rgb(51,65,85)" />
    <!-- Contented closed happy curved eyes -->
    <path d="M 21 20 Q 25 24 29 20" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 31 20 Q 35 24 39 20" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="18" cy="25" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="42" cy="25" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 27 27 Q 30 31 33 27" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Round protruding tummy (배가 뽈록!) -->
    <path d="M 16 36 L 44 36 C 54 48 54 62 44 68 L 16 68 C 6 62 6 48 16 36 Z" fill="rgb(251,146,60)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Hand gently patting tummy -->
    <ellipse cx="30" cy="52" rx="7" ry="5.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  </g>
  <!-- Sparkles of contentment -->
  <path d="M 76 28 L 78 24 L 80 28 L 84 29.5 L 80 31 L 78 35 L 76 31 L 72 29.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 23. 매워요 (Spicy) - Red chili pepper + child fanning burning mouth with steam
export const MAEWO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Red Hot Chili Pepper Top Right -->
  <g transform="translate(64, 12) rotate(25)">
    <path d="M 10 2 C 18 2 24 10 20 22 C 16 34 8 40 4 44 C 4 36 2 26 4 16 C 6 8 8 2 10 2 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.8" />
    <!-- Green stem -->
    <path d="M 10 2 Q 10 -4 4 -6" stroke="rgb(34,197,94)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  </g>
  <!-- Child Face: Red Cheeks, Fanning mouth (후하후하!) -->
  <g transform="translate(20, 20)">
    <circle cx="28" cy="28" r="20" fill="rgb(254,215,170)" />
    <!-- Hair -->
    <path d="M 7.2 24 C 5.6 -0.3 50.4 -0.3 48.8 24 Z" fill="rgb(51,65,85)" />
    <!-- Teary squinting eyes -->
    <path d="M 17 25 Q 21 21 25 25" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 31 25 Q 35 21 39 25" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <!-- Burning Red Face Flushes -->
    <circle cx="14" cy="34" r="5" fill="rgb(239,68,68)" opacity="0.75" />
    <circle cx="42" cy="34" r="5" fill="rgb(239,68,68)" opacity="0.75" />
    <!-- Mouth open panting with red tongue -->
    <ellipse cx="28" cy="36" rx="6" ry="7" fill="rgb(185,28,28)" />
    <ellipse cx="28" cy="39" rx="4" ry="3" fill="rgb(244,63,94)" />
    <!-- Hand fanning air in front of mouth -->
    <g transform="translate(36, 32)">
      <ellipse cx="6" cy="4" rx="4" ry="7" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" transform="rotate(-30 6 4)" />
    </g>
  </g>
  <!-- Comic fire/heat wisps -->
  <path d="M 22 20 Q 26 14 22 8" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" fill="none" />
</svg>`;

// 24. 맛있어요 (Delicious) - Ecstatic smiling face licking lips with heart eyes
export const MASI_SSEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Floating Hearts around -->
  <path d="M 22 22 C 22 18 18 16 15 18 C 12 20 15 25 22 29 C 29 25 32 20 29 18 C 26 16 22 18 22 22 Z" fill="rgb(244,63,94)" />
  <path d="M 76 18 C 76 14 72 12 69 14 C 66 16 69 21 76 25 C 83 21 86 16 83 14 C 80 12 76 14 76 18 Z" fill="rgb(244,63,94)" />
  <!-- Ecstatic Tasting Face -->
  <g transform="translate(24, 20)">
    <circle cx="26" cy="28" r="22" fill="rgb(254,215,170)" />
    <path d="M 3.2 24 C 1.4 -2.9 50.6 -2.9 48.8 24 Z" fill="rgb(51,65,85)" />
    <!-- Happy Blissful Eyes -->
    <path d="M 15 25 Q 20 20 25 25" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" fill="none" />
    <path d="M 29 25 Q 34 20 39 25" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- Big Rosy Cheeks -->
    <circle cx="12" cy="32" r="5" fill="rgb(244,63,94)" opacity="0.65" />
    <circle cx="40" cy="32" r="5" fill="rgb(244,63,94)" opacity="0.65" />
    <!-- Big Grin with cute tongue licking lip (낼름!) -->
    <path d="M 18 34 Q 27 46 36 34 Z" fill="rgb(190,18,60)" />
    <path d="M 28 36 C 28 42 36 42 36 36 Z" fill="rgb(244,114,182)" />
  </g>
</svg>`;

// 25. 좋아요 (Good / Like) - Thumbs up with bright smiling flower & hearts
export const JO_A_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Big Thumbs Up Hand Center (따봉 / 최고) -->
  <g transform="translate(32, 22)">
    <!-- Shadow -->
    <ellipse cx="18" cy="54" rx="16" ry="5" fill="rgba(15,23,42,0.12)" />
    <!-- Fist -->
    <rect x="6" y="24" width="24" height="26" rx="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2.5" />
    <!-- Thumb pointing straight up -->
    <path d="M 6 26 L 6 8 Q 6 0 14 0 Q 22 0 22 8 L 22 26 Z" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2.5" />
    <!-- Folded Fingers definition lines -->
    <line x1="16" y1="30" x2="28" y2="30" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <line x1="16" y1="37" x2="28" y2="37" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <line x1="16" y1="44" x2="28" y2="44" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <!-- Wrist & green cuff -->
    <rect x="8" y="48" width="20" height="10" rx="3" fill="rgb(16,185,129)" />
  </g>
  <!-- Sparkles of joy -->
  <path d="M 22 24 L 24 18 L 26 24 L 32 26 L 26 28 L 24 34 L 22 28 L 16 26 Z" fill="rgb(250,204,21)" />
  <path d="M 76 24 L 78 18 L 80 24 L 86 26 L 80 28 L 78 34 L 76 28 L 70 26 Z" fill="rgb(250,204,21)" />
</svg>`;

// 26. 싫어요 (Don't like) - Child crossing hands in gentle 'X' declining politely
export const SI_REO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <g transform="translate(20, 16)">
    <!-- Face (Head turning away slightly) -->
    <circle cx="28" cy="22" r="16" fill="rgb(254,215,170)" />
    <path d="M 11.2 18 C 9.9 -0.9 46.1 -0.9 44.8 18 Z" fill="rgb(51,65,85)" />
    <!-- Eyes closed firmly turning away -->
    <path d="M 19 21 Q 23 24 27 21" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 31 21 Q 35 24 39 21" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 26 28 Q 29 26 32 28" stroke="rgb(190,18,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <!-- Body -->
    <path d="M 14 42 C 14 36 20 34 30 34 C 40 34 46 36 46 42 Z" fill="rgb(148,163,184)" />
    <!-- Arms crossed in front in gentle 'X' (안 먹을래요 / 싫어요) -->
    <line x1="16" y1="42" x2="42" y2="60" stroke="rgb(254,215,170)" stroke-width="6" stroke-linecap="round" />
    <line x1="42" y1="42" x2="16" y2="60" stroke="rgb(254,215,170)" stroke-width="6" stroke-linecap="round" />
  </g>
</svg>`;

// 27. 조금만요 (Just a little) - Child pinching fingers close together (🤏 조금)
export const JOGEUM_MAN_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Big Pinching Hand (Pinching thumb and index finger close) -->
  <g transform="translate(24, 20)">
    <!-- Wrist & Sleeve -->
    <rect x="0" y="32" width="20" height="22" rx="4" fill="rgb(59,130,246)" />
    <!-- Main Hand Base -->
    <ellipse cx="26" cy="38" rx="16" ry="14" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Curled fingers (Middle, Ring, Pinky) -->
    <rect x="24" y="36" width="14" height="6" rx="3" fill="rgb(253,186,116)" />
    <rect x="22" y="44" width="14" height="6" rx="3" fill="rgb(253,186,116)" />
    <!-- Index Finger curving down -->
    <path d="M 28 26 Q 44 20 48 30 Q 42 36 34 32" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Thumb curving up toward index finger with tiny gap -->
    <path d="M 26 36 Q 44 42 46 34 Q 40 28 32 30" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="2" />
    <!-- Tiny Gap Indicator Lines showing "Just a little!" -->
    <line x1="48" y1="31" x2="48" y2="33" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" />
  </g>
  <!-- Tiny heart sparkle in the gap -->
  <circle cx="76" cy="52" r="2.5" fill="rgb(239,68,68)" />
</svg>`;

// 28. 남겨요 (Leave food) - Clean eating conscious habits: plate with tiny leftover
export const NAMGYEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(241,245,249)" />
  <!-- Plate -->
  <ellipse cx="50" cy="55" rx="38" ry="22" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2.5" />
  <ellipse cx="50" cy="54" rx="30" ry="16" fill="rgb(248,250,252)" />
  <!-- Small portion left on plate -->
  <ellipse cx="44" cy="52" rx="6" ry="4" fill="rgb(254,240,138)" stroke="rgb(234,179,8)" stroke-width="1.2" />
  <ellipse cx="56" cy="54" rx="5" ry="3.5" fill="rgb(252,165,165)" stroke="rgb(239,68,68)" stroke-width="1.2" />
  <!-- Spoon resting on edge of plate -->
  <g transform="translate(56, 32) rotate(35)">
    <line x1="0" y1="0" x2="0" y2="36" stroke="rgb(148,163,184)" stroke-width="2.5" stroke-linecap="round" />
    <ellipse cx="0" cy="0" rx="6" ry="9" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="1.5" />
  </g>
</svg>`;

// 29. 흘렸어요 (Spilled) - Water cup tipped over with cute spilled puddle
export const HEULLYEO_SSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Spilled Water Puddle on Table -->
  <ellipse cx="56" cy="68" rx="34" ry="14" fill="rgb(56,189,248)" opacity="0.75" />
  <circle cx="28" cy="74" r="3" fill="rgb(56,189,248)" />
  <circle cx="84" cy="62" r="2.5" fill="rgb(56,189,248)" />
  <!-- Tipped Over Cup (Angled sideways) -->
  <g transform="translate(30, 42) rotate(65)">
    <path d="M 0 0 L 26 0 L 22 36 Q 13 40 4 36 Z" fill="rgb(255,255,255)" stroke="rgb(14,165,233)" stroke-width="2.5" />
    <ellipse cx="13" cy="2" rx="13" ry="5" fill="rgb(186,230,253)" stroke="rgb(14,165,233)" stroke-width="2" />
  </g>
  <!-- Oops Surprise Marks! -->
  <text x="74" y="32" font-family="'Nunito', sans-serif" font-size="16" font-weight="900" fill="rgb(239,68,68)">!</text>
</svg>`;

// 30. 닦아요 (Wipe) - Hand using clean white cloth/tissue wiping tabletop to sparkling shine
export const DAKKAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,250)" />
  <!-- Tabletop Surface Line -->
  <rect x="8" y="66" width="84" height="20" rx="4" fill="rgb(254,243,199)" stroke="rgb(217,119,6)" stroke-width="2" />
  <!-- Sparkles showing clean polished surface -->
  <path d="M 24 50 L 26 44 L 28 50 L 34 52 L 28 54 L 26 60 L 24 54 L 18 52 Z" fill="rgb(250,204,21)" />
  <path d="M 72 46 L 73.5 42 L 75 46 L 79 47.5 L 75 49 L 73.5 53 L 72 49 L 68 47.5 Z" fill="rgb(250,204,21)" />
  <!-- Hand Wiping with Clean Folded Cloth (행주/물티슈) -->
  <g transform="translate(36, 32)">
    <!-- White Folded Cloth on table -->
    <ellipse cx="16" cy="34" rx="20" ry="10" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
    <!-- Motion streak lines -->
    <path d="M 2 24 Q 16 28 30 24" stroke="rgb(56,189,248)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Child Hand pressing and wiping -->
    <ellipse cx="16" cy="24" rx="11" ry="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
    <rect x="10" y="4" width="12" height="18" rx="3" fill="rgb(16,185,129)" />
  </g>
</svg>`;

// ============================================================================
// CHAPTER 9: 친구 (Friends)
// ============================================================================

// 31. 같이 놀자 (Let's play together) - Child holding ball & jumping with joyful invite
export const GACHI_NOLJA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <!-- Cheerful Kid Holding Ball & Waving -->
  <g transform="translate(24, 14)">
    <circle cx="26" cy="20" r="16" fill="rgb(254,215,170)" />
    <path d="M 9.2 16 C 7.9 -2.9 44.1 -2.9 42.8 16 Z" fill="rgb(51,65,85)" />
    <!-- Winking friendly eye & bright smile -->
    <circle cx="21" cy="19" r="2.5" fill="rgb(30,41,59)" />
    <path d="M 29 19 Q 33 16 37 19" stroke="rgb(30,41,59)" stroke-width="2.2" stroke-linecap="round" fill="none" />
    <circle cx="16" cy="24" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="36" cy="24" r="2.5" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 23 25 Q 26 30 29 25" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Body -->
    <path d="M 14 36 L 38 36 L 36 60 L 16 60 Z" fill="rgb(239,68,68)" />
    <!-- Waving Left Arm -->
    <path d="M 14 40 Q 2 30 6 18" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
    <!-- Right Arm Holding Colorful Soccer Ball -->
    <g transform="translate(36, 42)">
      <circle cx="10" cy="6" r="10" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="1.8" />
      <polygon points="10,2 14,5 12,9 8,9 6,5" fill="rgb(30,41,59)" />
    </g>
  </g>
  <!-- Hearts & Sparkles of friendship -->
  <path d="M 76 18 C 76 14 72 12 69 14 C 66 16 69 21 76 25 C 83 21 86 16 83 14 C 80 12 76 14 76 18 Z" fill="rgb(244,63,94)" />
</svg>`;

// 32. 고마워요 (Thank you) - Child with hands on heart, warm grateful smile
export const GOMAWO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <!-- Radiant Heart above -->
  <path d="M 50 14 C 50 9 44 6 40 10 C 36 14 40 20 50 26 C 60 20 64 14 60 10 C 56 6 50 9 50 14 Z" fill="rgb(244,63,94)" />
  <g transform="translate(22, 22)">
    <circle cx="28" cy="24" r="18" fill="rgb(254,215,170)" />
    <path d="M 9.2 20 C 7.8 -1.6 48.2 -1.6 46.8 20 Z" fill="rgb(51,65,85)" />
    <!-- Gentle happy closed eyes -->
    <path d="M 19 23 Q 23 27 27 23" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 29 23 Q 33 27 37 23" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="16" cy="28" r="3.5" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="40" cy="28" r="3.5" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 25 30 Q 28 34 31 30" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Hands placed gently together over heart -->
    <path d="M 16 48 C 16 38 22 36 28 36 C 34 36 40 38 40 48 Z" fill="rgb(251,146,60)" />
    <ellipse cx="28" cy="44" rx="7" ry="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  </g>
</svg>`;

// 33. 미안해요 (I'm sorry) - Polite bow with hands together and humble apology
export const MIANHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <!-- Apologetic sweat drop -->
  <g transform="translate(68, 26)">
    <path d="M 5 0 C 5 0 10 6 10 9 C 10 12 7.8 14 5 14 C 2.2 14 0 12 0 9 C 0 6 5 0 5 0 Z" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="1" />
  </g>
  <g transform="translate(22, 20)">
    <circle cx="28" cy="26" r="18" fill="rgb(254,215,170)" />
    <path d="M 9.2 22 C 7.8 0.4 48.2 0.4 46.8 22 Z" fill="rgb(51,65,85)" />
    <!-- Droopy apologetic eyebrows -->
    <path d="M 17 19 Q 21 16 25 20" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <path d="M 31 20 Q 35 16 39 19" stroke="rgb(30,41,59)" stroke-width="2" stroke-linecap="round" fill="none" />
    <circle cx="21" cy="25" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="35" cy="25" r="2.8" fill="rgb(30,41,59)" />
    <circle cx="22" cy="24" r="1" fill="rgb(255,255,255)" />
    <circle cx="36" cy="24" r="1" fill="rgb(255,255,255)" />
    <path d="M 25 33 Q 28 31 31 33" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Body bowing slightly with hands clasped in front -->
    <path d="M 14 50 C 14 40 20 36 28 36 C 36 36 42 40 42 50 Z" fill="rgb(168,85,247)" />
    <ellipse cx="28" cy="46" rx="6" ry="4.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  </g>
</svg>`;

// 34. 이름 (Name) - Elementary student yellow star nameplate badge (이름표)
export const IREUM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Shadow -->
  <rect x="16" y="28" width="68" height="48" rx="10" fill="rgba(15,23,42,0.12)" />
  <!-- Nameplate Badge Outer -->
  <rect x="14" y="26" width="68" height="46" rx="10" fill="rgb(255,255,255)" stroke="rgb(234,179,8)" stroke-width="3" />
  <!-- Nameplate Header Tape -->
  <rect x="14" y="26" width="68" height="12" rx="6" fill="rgb(250,204,21)" />
  <circle cx="22" cy="32" r="2" fill="rgb(180,83,9)" />
  <circle cx="74" cy="32" r="2" fill="rgb(180,83,9)" />
  <!-- Golden Star on badge -->
  <path d="M 28 50 L 30 45 L 34 45 L 31 48 L 32 52 L 28 49.5 L 24 52 L 25 48 L 22 45 L 26 45 Z" fill="rgb(245,158,11)" />
  <!-- Name Text Field ('김 하 늘' - Example Elementary Name) -->
  <text x="54" y="54" font-family="'NanumBarunGothic', sans-serif" font-size="12" font-weight="900" fill="rgb(15,23,42)" text-anchor="middle">김하늘</text>
  <line x1="38" y1="60" x2="70" y2="60" stroke="rgb(203,213,225)" stroke-width="1.5" />
</svg>`;

// 35. 누구예요 (Who is it?) - Child inquiring with friendly curiosity & magnifying silhouette
export const NUGU_YE_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Magnifying Glass with Silhouette -->
  <g transform="translate(44, 16)">
    <circle cx="22" cy="22" r="20" fill="rgb(224,242,254)" stroke="rgb(59,130,246)" stroke-width="3.5" />
    <!-- Handle -->
    <line x1="36" y1="36" x2="48" y2="48" stroke="rgb(180,83,9)" stroke-width="5" stroke-linecap="round" />
    <!-- Mystery Silhouette Inside Glass -->
    <circle cx="22" cy="18" r="7" fill="rgb(147,197,253)" />
    <path d="M 12 34 C 12 28 16 26 22 26 C 28 26 32 28 32 34 Z" fill="rgb(147,197,253)" />
    <text x="22" y="24" font-family="'Nunito', sans-serif" font-size="12" font-weight="900" fill="rgb(30,58,138)" text-anchor="middle">?</text>
  </g>
  <!-- Inquiring Child pointing forward -->
  <g transform="translate(14, 26)">
    <circle cx="20" cy="20" r="14" fill="rgb(254,215,170)" />
    <path d="M 5.2 18 C 4.1 -0.4 35.9 -0.4 34.8 18 Z" fill="rgb(51,65,85)" />
    <circle cx="24" cy="19" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="26" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="24" cy="27" r="2.5" fill="rgb(190,18,60)" />
    <!-- Pointing Finger -->
    <line x1="26" y1="36" x2="38" y2="28" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" />
  </g>
</svg>`;

// 36. 차례 (Turn) - Queue turn numbers: '1st -> 2nd -> 3rd' order indicator
export const CHARYE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Three Turn Badges (1, 2, 3) with arrows -->
  <!-- Badge 1 (Done) -->
  <g transform="translate(14, 34)">
    <circle cx="12" cy="12" r="12" fill="rgb(220,252,231)" stroke="rgb(34,197,94)" stroke-width="2" />
    <text x="12" y="16.5" font-family="'Nunito', sans-serif" font-size="12" font-weight="900" fill="rgb(22,163,74)" text-anchor="middle">1</text>
  </g>
  <path d="M 40 46 L 46 46 M 44 43 L 47 46 L 44 49" stroke="rgb(180,83,9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <!-- Badge 2 (Current Turn / Spotlight!) -->
  <g transform="translate(48, 28)">
    <circle cx="16" cy="16" r="16" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2.5" />
    <text x="16" y="22" font-family="'Nunito', sans-serif" font-size="16" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">2</text>
    <!-- '내 차례!' badge above -->
    <rect x="2" y="-14" width="28" height="12" rx="4" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1" />
    <text x="16" y="-5" font-family="'NanumBarunGothic', sans-serif" font-size="6" font-weight="900" fill="rgb(113,63,18)" text-anchor="middle">내 차례!</text>
  </g>
  <path d="M 80 46 L 86 46" stroke="rgb(180,83,9)" stroke-width="2" stroke-linecap="round" />
</svg>`;

// 37. 양보해요 (Yield / Share) - Child warmly welcoming friend to go first
export const YANGBO_HAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Warm Gesturing Child (먼저 해! / 먼저 타!) -->
  <g transform="translate(18, 18)">
    <circle cx="24" cy="20" r="14" fill="rgb(254,215,170)" />
    <path d="M 9.2 16 C 8.1 0.3 39.9 0.3 38.8 16 Z" fill="rgb(51,65,85)" />
    <circle cx="28" cy="19" r="2.2" fill="rgb(30,41,59)" />
    <circle cx="30" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 26 25 Q 29 29 32 25" stroke="rgb(190,18,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <!-- Polite Hand Extending Forward Open Palm -->
    <g transform="translate(32, 28)">
      <line x1="0" y1="12" x2="24" y2="4" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" />
      <ellipse cx="26" cy="3" rx="4.5" ry="5.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
    </g>
    <!-- Body -->
    <path d="M 14 36 L 36 36 L 32 58 L 16 58 Z" fill="rgb(16,185,129)" />
  </g>
  <!-- Welcoming heart sparkle -->
  <path d="M 76 26 C 76 22 72 20 69 22 C 66 24 69 29 76 33 C 83 29 86 24 83 22 C 80 20 76 22 76 26 Z" fill="rgb(244,63,94)" />
</svg>`;

// 38. 심심해요 (Bored) - Child with chin in hand resting on table dreaming of fun
export const SIMSIM_HAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(241,245,249)" />
  <!-- Dream Bubble of Boredom -->
  <circle cx="70" cy="26" r="3" fill="rgb(203,213,225)" />
  <circle cx="78" cy="20" r="5" fill="rgb(203,213,225)" />
  <ellipse cx="76" cy="14" rx="8" ry="5" fill="rgb(226,232,240)" />
  <text x="76" y="16" font-family="'Nunito', sans-serif" font-size="6" font-weight="700" fill="rgb(100,116,139)" text-anchor="middle">...</text>
  <!-- Table Surface -->
  <rect x="10" y="66" width="80" height="14" rx="3" fill="rgb(254,243,199)" stroke="rgb(217,119,6)" stroke-width="1.8" />
  <!-- Child Resting Chin on Hand (턱 괴기) -->
  <g transform="translate(26, 22)">
    <circle cx="24" cy="24" r="18" fill="rgb(254,215,170)" />
    <path d="M 5.2 20 C 3.8 -1.6 44.2 -1.6 42.8 20 Z" fill="rgb(51,65,85)" />
    <!-- Half-closed sleepy bored eyes -->
    <path d="M 16 23 Q 21 21 26 23" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 28 23 Q 33 21 38 23" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 23 33 Q 27 30 31 33" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Arm resting on table supporting chin -->
    <line x1="24" y1="38" x2="24" y2="46" stroke="rgb(254,215,170)" stroke-width="6" stroke-linecap="round" />
    <ellipse cx="24" cy="38" rx="5" ry="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  </g>
</svg>`;

// 39. 재미있어요 (Fun) - Joyful kid jumping with confetti, stars & laughter
export const JAEMI_ISSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Confetti Pieces Falling -->
  <rect x="20" y="16" width="3" height="6" rx="1.5" fill="rgb(239,68,68)" transform="rotate(25 20 16)" />
  <rect x="76" y="20" width="3" height="6" rx="1.5" fill="rgb(59,130,246)" transform="rotate(-35 76 20)" />
  <circle cx="28" cy="32" r="2" fill="rgb(34,197,94)" />
  <circle cx="72" cy="36" r="2.5" fill="rgb(244,63,94)" />
  <!-- Jumping Joyful Child -->
  <g transform="translate(24, 18)">
    <circle cx="26" cy="20" r="16" fill="rgb(254,215,170)" />
    <path d="M 9.2 16 C 7.9 -2.9 44.1 -2.9 42.8 16 Z" fill="rgb(51,65,85)" />
    <!-- Happy squinting eyes & laughing mouth -->
    <path d="M 18 19 Q 22 14 26 19" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 28 19 Q 32 14 36 19" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="15" cy="24" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="37" cy="24" r="3" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 21 25 Q 27 34 33 25 Z" fill="rgb(190,18,60)" />
    <!-- Arms Thrown High in Air (Hurray!) -->
    <path d="M 12 36 Q 2 24 6 12" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M 40 36 Q 50 24 46 12" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
    <!-- Torso -->
    <path d="M 12 36 L 40 36 L 36 56 L 16 56 Z" fill="rgb(249,115,22)" />
  </g>
</svg>`;

// 40. 내일 봐요 (See you tomorrow) - Waving goodbye at school gate under afternoon sun
export const NAEIL_BWAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <!-- Gentle Afternoon Sun (Left) -->
  <circle cx="24" cy="24" r="10" fill="rgb(251,146,60)" opacity="0.8" />
  <!-- School Gate Column (Right) -->
  <rect x="74" y="24" width="12" height="58" rx="2" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="2" />
  <!-- Child Waving Goodbye -->
  <g transform="translate(30, 20)">
    <circle cx="20" cy="20" r="14" fill="rgb(254,215,170)" />
    <path d="M 5.2 16 C 4.1 0.3 35.9 0.3 34.8 16 Z" fill="rgb(51,65,85)" />
    <circle cx="17" cy="18" r="2" fill="rgb(30,41,59)" />
    <circle cx="25" cy="18" r="2" fill="rgb(30,41,59)" />
    <path d="M 18 24 Q 21 27 24 24" stroke="rgb(190,18,60)" stroke-width="1.8" stroke-linecap="round" fill="none" />
    <!-- Yellow Backpack on back -->
    <rect x="2" y="34" width="8" height="18" rx="3" fill="rgb(250,204,21)" />
    <!-- Body -->
    <rect x="8" y="32" width="22" height="26" rx="4" fill="rgb(59,130,246)" />
    <!-- Arm Waving High (안녕, 내일 봐!) -->
    <path d="M 28 36 Q 38 24 34 12" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
    <ellipse cx="35" cy="10" rx="4" ry="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  </g>
</svg>`;

// ============================================================================
// CHAPTER 10: 방과후 (After School)
// ============================================================================

// 41. 방과후 (After school) - Elementary school with afternoon clock pointing 3:00 PM
export const BANGGWAHU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- School Building Silhouette -->
  <g transform="translate(18, 26)">
    <!-- Roof Triangular Pediment -->
    <polygon points="32,2 6,18 58,18" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <!-- Clock Tower in pediment -->
    <circle cx="32" cy="12" r="5" fill="rgb(255,255,255)" stroke="rgb(185,28,28)" stroke-width="1.2" />
    <!-- Hands pointing to 3:00 PM -->
    <line x1="32" y1="12" x2="32" y2="9.5" stroke="rgb(30,41,59)" stroke-width="0.8" />
    <line x1="32" y1="12" x2="34.5" y2="12" stroke="rgb(30,41,59)" stroke-width="0.8" />
    <!-- School Main Wall -->
    <rect x="10" y="18" width="44" height="42" rx="2" fill="rgb(254,242,242)" stroke="rgb(185,28,28)" stroke-width="2" />
    <!-- Windows -->
    <rect x="16" y="24" width="8" height="8" rx="1.5" fill="rgb(147,197,253)" />
    <rect x="40" y="24" width="8" height="8" rx="1.5" fill="rgb(147,197,253)" />
    <!-- Front Door -->
    <rect x="26" y="42" width="12" height="18" rx="2" fill="rgb(180,83,9)" />
  </g>
  <!-- Activity Sparkles (Music, Art, Sports after school) -->
  <path d="M 74 18 L 78 16 L 78 22 L 74 24 Z" fill="rgb(16,185,129)" />
</svg>`;

// 42. 교실 (Classroom) - Classroom doorway with room sign '1학년 2반'
export const GYOSIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Classroom Door & Wall -->
  <g transform="translate(20, 14)">
    <rect x="0" y="0" width="60" height="74" rx="5" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2.5" />
    <!-- Room Name Sign Hanging above ('1-2 교실') -->
    <rect x="14" y="6" width="32" height="14" rx="3" fill="rgb(16,185,129)" stroke="rgb(5,150,105)" stroke-width="1.2" />
    <text x="30" y="16.5" font-family="'NanumBarunGothic', sans-serif" font-size="7.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">1학년 교실</text>
    <!-- Door Window showing classroom blackboard & desks inside -->
    <rect x="12" y="26" width="36" height="30" rx="3" fill="rgb(224,242,254)" stroke="rgb(56,189,248)" stroke-width="1.8" />
    <!-- Inside miniature blackboard -->
    <rect x="18" y="30" width="24" height="14" rx="1.5" fill="rgb(22,101,52)" />
    <!-- Door Handle -->
    <circle cx="50" cy="54" r="2.5" fill="rgb(100,116,139)" />
  </g>
</svg>`;

// 43. 이동해요 (Move) - Children walking in line through hallway toward special room
export const IDONG_HAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Movement Direction Arrow along hallway -->
  <path d="M 22 76 L 76 76 M 70 71 L 77 76 L 70 81" stroke="rgb(16,185,129)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
  <!-- Leading Child -->
  <g transform="translate(48, 22)">
    <circle cx="12" cy="12" r="10" fill="rgb(254,215,170)" />
    <path d="M 1.2 10 C 0.4 -2.7 23.6 -2.7 22.8 10 Z" fill="rgb(51,65,85)" />
    <circle cx="16" cy="11" r="1.5" fill="rgb(30,41,59)" />
    <rect x="6" y="22" width="14" height="20" rx="3" fill="rgb(239,68,68)" />
    <line x1="8" y1="42" x2="6" y2="52" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="16" y1="42" x2="18" y2="52" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  </g>
  <!-- Following Child -->
  <g transform="translate(22, 22)">
    <circle cx="12" cy="12" r="10" fill="rgb(254,215,170)" />
    <path d="M 1.2 10 C 0.4 -2.7 23.6 -2.7 22.8 10 Z" fill="rgb(217,119,6)" />
    <circle cx="16" cy="11" r="1.5" fill="rgb(30,41,59)" />
    <rect x="6" y="22" width="14" height="20" rx="3" fill="rgb(14,165,233)" />
    <line x1="8" y1="42" x2="6" y2="52" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
    <line x1="16" y1="42" x2="18" y2="52" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  </g>
</svg>`;

// 44. 끝났어요 (Finished) - Big bold checkmark & bell chime '딩동댕! 끝!'
export const KKEUTNA_SSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <!-- Golden Bell ringing finish chime -->
  <g transform="translate(36, 12)">
    <path d="M 6 22 C 6 12 10 6 14 6 C 18 6 22 12 22 22 Z" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.8" />
    <ellipse cx="14" cy="22" rx="10" ry="3" fill="rgb(245,158,11)" />
  </g>
  <!-- Big Green Celebratory Checkmark Badge (끝! / 완료) -->
  <circle cx="50" cy="56" r="26" fill="rgb(16,185,129)" stroke="rgb(5,150,105)" stroke-width="3" />
  <path d="M 37 56 L 46 65 L 63 47" stroke="rgb(255,255,255)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <!-- Stars -->
  <path d="M 22 32 L 23.5 28 L 25 32 L 29 33.5 L 25 35 L 23.5 39 L 22 35 L 18 33.5 Z" fill="rgb(250,204,21)" />
  <path d="M 76 34 L 77.5 30 L 79 34 L 83 35.5 L 79 37 L 77.5 41 L 76 37 L 72 35.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 45. 가방 싸요 (Pack bag) - Packing textbooks & pencil case into open school backpack
export const GABANG_SSAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Open Yellow Backpack -->
  <g transform="translate(20, 24)">
    <rect x="6" y="14" width="48" height="50" rx="12" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2.5" />
    <!-- Open Main Zipper Flap (Showing interior) -->
    <path d="M 6 24 C 6 8 54 8 54 24 Z" fill="rgb(245,158,11)" stroke="rgb(217,119,6)" stroke-width="2" />
    <!-- Textbook Being Slid Into Bag -->
    <g transform="translate(18, -6)">
      <rect x="0" y="0" width="24" height="34" rx="3" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.8" />
      <text x="12" y="16" font-family="'NanumBarunGothic', sans-serif" font-size="7" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">국어</text>
    </g>
    <!-- Downward Packing Arrow -->
    <path d="M 46 8 L 46 18 M 43 14 L 46 19 L 49 14" stroke="rgb(239,68,68)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;

// 47. 간식 (Snack) - Milk carton with straw & delicious chocolate chip cookie
export const GANSIK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <!-- Shadow -->
  <ellipse cx="50" cy="80" rx="34" ry="7" fill="rgba(15,23,42,0.12)" />
  <!-- Milk Carton (Left) -->
  <g transform="translate(18, 22)">
    <!-- Carton Gable Top -->
    <polygon points="12,2 24,2 32,14 4,14" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2" />
    <polygon points="12,2 24,2 22,8 14,8" fill="rgb(224,231,255)" />
    <!-- Red Straw sticking out -->
    <line x1="20" y1="2" x2="26" y2="-8" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" />
    <!-- Carton Box Body -->
    <rect x="4" y="14" width="28" height="44" rx="3" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2.5" />
    <path d="M 4 28 Q 18 34 32 28 L 32 58 L 4 58 Z" fill="rgb(96,165,250)" />
    <text x="18" y="44" font-family="'NanumBarunGothic', sans-serif" font-size="8" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">우유</text>
  </g>
  <!-- Chocolate Chip Cookie (Right) -->
  <g transform="translate(52, 40)">
    <circle cx="20" cy="20" r="18" fill="rgb(245,158,11)" stroke="rgb(180,83,9)" stroke-width="2.5" />
    <!-- Chocolate Chips -->
    <circle cx="14" cy="14" r="2.8" fill="rgb(69,26,3)" />
    <circle cx="26" cy="16" r="2.5" fill="rgb(69,26,3)" />
    <circle cx="18" cy="26" r="3" fill="rgb(69,26,3)" />
    <circle cx="27" cy="25" r="2.2" fill="rgb(69,26,3)" />
  </g>
</svg>`;

// 48. 기다려요 (Wait) - Child sitting patiently on bench waiting for pickup
export const GIDARYEO_YO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <!-- School Bench -->
  <rect x="12" y="60" width="76" height="8" rx="3" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="2" />
  <line x1="22" y1="68" x2="20" y2="84" stroke="rgb(100,116,139)" stroke-width="3" stroke-linecap="round" />
  <line x1="78" y1="68" x2="80" y2="84" stroke="rgb(100,116,139)" stroke-width="3" stroke-linecap="round" />
  <!-- Child Sitting Patiently with hands on knees -->
  <g transform="translate(36, 18)">
    <circle cx="14" cy="14" r="12" fill="rgb(254,215,170)" />
    <path d="M 1.2 12 C 0.2 -3.7 27.8 -3.7 26.8 12 Z" fill="rgb(51,65,85)" />
    <circle cx="10" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="18" cy="13" r="1.8" fill="rgb(30,41,59)" />
    <path d="M 12 18 Q 14 21 16 18" stroke="rgb(190,18,60)" stroke-width="1.5" stroke-linecap="round" fill="none" />
    <rect x="4" y="24" width="20" height="22" rx="4" fill="rgb(244,63,94)" />
    <!-- Legs dangling off bench -->
    <line x1="8" y1="46" x2="8" y2="58" stroke="rgb(30,41,59)" stroke-width="4" stroke-linecap="round" />
    <line x1="20" y1="46" x2="20" y2="58" stroke="rgb(30,41,59)" stroke-width="4" stroke-linecap="round" />
    <ellipse cx="8" cy="59" rx="3" ry="2" fill="rgb(250,204,21)" />
    <ellipse cx="20" cy="59" rx="3" ry="2" fill="rgb(250,204,21)" />
  </g>
  <!-- Mini Clock/Watch Waiting Symbol -->
  <g transform="translate(18, 22)">
    <circle cx="8" cy="8" r="8" fill="rgb(255,255,255)" stroke="rgb(14,165,233)" stroke-width="1.8" />
    <line x1="8" y1="8" x2="8" y2="4" stroke="rgb(2,132,199)" stroke-width="1.2" />
    <line x1="8" y1="8" x2="11" y2="8" stroke="rgb(2,132,199)" stroke-width="1.2" />
  </g>
</svg>`;

// 49. 엄마 (Mom) - Warm, loving mother smiling with open welcoming arms
export const EOMMA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <!-- Radiant Hearts of maternal love -->
  <path d="M 50 14 C 50 9 44 6 40 10 C 36 14 40 20 50 26 C 60 20 64 14 60 10 C 56 6 50 9 50 14 Z" fill="rgb(244,63,94)" />
  <!-- Mother Figure -->
  <g transform="translate(20, 18)">
    <circle cx="30" cy="24" r="18" fill="rgb(254,215,170)" />
    <!-- Warm hairstyle -->
    <path d="M 10 24 C 8.6 -2.9 51.4 -2.9 50 24 C 50 18 42 12 30 12 C 18 12 10 18 10 24 Z" fill="rgb(67,56,202)" />
    <!-- Kind smiling eyes & warm smile -->
    <path d="M 21 23 Q 25 27 29 23" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <path d="M 31 23 Q 35 27 39 23" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="18" cy="28" r="3.5" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="42" cy="28" r="3.5" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 26 31 Q 30 36 34 31" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" fill="none" />
    <!-- Warm Apron / Blouse & Welcoming Arms -->
    <path d="M 12 56 C 12 40 20 36 30 36 C 40 36 48 40 48 56 Z" fill="rgb(236,72,153)" />
    <path d="M 12 42 Q 0 46 4 56" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M 48 42 Q 60 46 56 56" stroke="rgb(254,215,170)" stroke-width="5" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// 50. 집에 가요 (Go home) - Child happily walking toward warm cozy home
export const JIB_E_GAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <!-- Warm Home with Red Roof (Right) -->
  <g transform="translate(52, 28)">
    <!-- Chimney & Smoke -->
    <rect x="22" y="2" width="6" height="12" fill="rgb(180,83,9)" />
    <circle cx="25" cy="-2" r="3" fill="rgb(203,213,225)" />
    <!-- Red Roof Triangular -->
    <polygon points="18,6 -4,22 40,22" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
    <!-- Cozy House Body -->
    <rect x="0" y="22" width="36" height="34" rx="2" fill="rgb(254,242,242)" stroke="rgb(185,28,28)" stroke-width="2" />
    <!-- Window with warm yellow glow -->
    <rect x="6" y="28" width="10" height="10" rx="1.5" fill="rgb(254,240,138)" stroke="rgb(217,119,6)" stroke-width="1.2" />
    <!-- Door -->
    <rect x="20" y="34" width="12" height="22" rx="2" fill="rgb(180,83,9)" />
  </g>
  <!-- Child Happily Walking Toward Home (Left) -->
  <g transform="translate(14, 28)">
    <circle cx="16" cy="14" r="10" fill="rgb(254,215,170)" />
    <path d="M 5.2 12 C 4.4 -0.7 27.6 -0.7 26.8 12 Z" fill="rgb(51,65,85)" />
    <circle cx="20" cy="13" r="1.5" fill="rgb(30,41,59)" />
    <!-- Yellow Backpack -->
    <rect x="2" y="24" width="8" height="16" rx="3" fill="rgb(250,204,21)" />
    <!-- Body -->
    <rect x="8" y="22" width="16" height="22" rx="4" fill="rgb(16,185,129)" />
    <!-- Moving legs -->
    <line x1="12" y1="44" x2="8" y2="56" stroke="rgb(30,41,59)" stroke-width="3.5" stroke-linecap="round" />
    <line x1="20" y1="44" x2="24" y2="56" stroke="rgb(30,41,59)" stroke-width="3.5" stroke-linecap="round" />
  </g>
</svg>`;
