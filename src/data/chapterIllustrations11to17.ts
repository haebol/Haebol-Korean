/**
 * High-Definition Vector SVG Illustrations for Chapters 11 ~ 17
 * Styled consistently with Chapter 4 (soft pastel r=46 circular badge, clean shapes, warm child-friendly palette).
 * Every character keeps head, neck, arms, hands, torso, legs, and feet completely unclipped inside the circle.
 * Uses safe rgb()/rgba() colors only for 100% reliable rendering in <img> tags and printouts.
 */

// ============================================================================
// CHAPTER 11: 국어 (Korean Language)
// ============================================================================

// 11-1. 글자 (Letter / Character) - Wooden Hangul letter blocks ㄱ, ㅏ, ㄴ
export const GEULJA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <ellipse cx="50" cy="82" rx="30" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Top center block: 가 -->
  <rect x="35" y="18" width="30" height="30" rx="5" fill="rgb(254,240,138)" stroke="rgb(202,138,4)" stroke-width="2" />
  <text x="50" y="39" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="rgb(133,77,14)" text-anchor="middle">가</text>
  <!-- Bottom left block: ㄱ -->
  <rect x="18" y="48" width="28" height="28" rx="5" fill="rgb(191,219,254)" stroke="rgb(37,99,235)" stroke-width="2" />
  <text x="32" y="68" font-family="'Noto Sans KR', sans-serif" font-size="15" font-weight="900" fill="rgb(30,58,138)" text-anchor="middle">ㄱ</text>
  <!-- Bottom right block: ㅏ -->
  <rect x="54" y="48" width="28" height="28" rx="5" fill="rgb(254,205,211)" stroke="rgb(225,29,72)" stroke-width="2" />
  <text x="68" y="68" font-family="'Noto Sans KR', sans-serif" font-size="15" font-weight="900" fill="rgb(136,19,55)" text-anchor="middle">ㅏ</text>
  <path d="M 78 24 L 79.5 20 L 81 24 L 85 25.5 L 81 27 L 79.5 31 L 78 27 L 74 25.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 11-2. 낱말 (Word) - Flashcard & speech bubble showing a Korean word (사과)
export const NATMAL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <ellipse cx="50" cy="80" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Word card -->
  <rect x="18" y="28" width="64" height="44" rx="7" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2.2" />
  <rect x="18" y="28" width="64" height="10" rx="4" fill="rgb(147,197,253)" />
  <circle cx="25" cy="33" r="2" fill="rgb(255,255,255)" />
  <!-- Cute word + apple icon on card -->
  <circle cx="33" cy="55" r="7.5" fill="rgb(239,68,68)" />
  <path d="M 33 47 Q 36 43 39 45" stroke="rgb(22,163,74)" stroke-width="2" fill="none" stroke-linecap="round" />
  <text x="58" y="60" font-family="'Noto Sans KR', sans-serif" font-size="14" font-weight="900" fill="rgb(30,41,59)" text-anchor="middle">사과</text>
  <!-- Sparkle -->
  <circle cx="77" cy="22" r="2.5" fill="rgb(250,204,21)" />
</svg>`;

// 11-3. 소리 내요 (Read aloud) - Smiling child reading aloud with clear voice waves (complete neck, arms, hands)
export const SORI_NAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <!-- Sound waves -->
  <path d="M 65 36 Q 71 42 65 48" stroke="rgb(249,115,22)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M 72 30 Q 81 42 72 54" stroke="rgb(251,146,60)" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <!-- Child upper body completely inside circle -->
  <rect x="38" y="48" width="8" height="6" fill="rgb(254,215,170)" />
  <path d="M 28 74 C 28 57 34 54 42 54 C 50 54 56 57 56 74 Z" fill="rgb(249,115,22)" />
  <!-- Arms & hands holding book -->
  <path d="M 30 58 L 24 68" stroke="rgb(249,115,22)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 54 58 L 60 68" stroke="rgb(249,115,22)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="24" cy="69" r="3.2" fill="rgb(254,215,170)" />
  <circle cx="60" cy="69" r="3.2" fill="rgb(254,215,170)" />
  <!-- Open book in hands -->
  <path d="M 25 66 L 42 69 L 59 66 L 59 77 L 42 80 L 25 77 Z" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.6" />
  <line x1="42" y1="69" x2="42" y2="80" stroke="rgb(59,130,246)" stroke-width="1.5" />
  <!-- Head -->
  <circle cx="42" cy="36" r="14" fill="rgb(254,215,170)" />
  <path d="M 27.2 34 C 26.1 15.6 57.9 15.6 56.8 34 C 56 27 49 24 42 24 C 35 24 28 27 27.2 34 Z" fill="rgb(51,65,85)" />
  <circle cx="38" cy="35" r="2" fill="rgb(30,41,59)" />
  <circle cx="48" cy="35" r="2" fill="rgb(30,41,59)" />
  <!-- Open singing/reading mouth -->
  <ellipse cx="44" cy="42" rx="3.8" ry="4.2" fill="rgb(190,18,60)" />
  <circle cx="33" cy="39" r="2.2" fill="rgb(244,114,182)" opacity="0.6" />
</svg>`;

// 11-4. 따라 읽어요 (Read along) - Teacher pointing to book + student echoing along
export const TTARA_ILGEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <!-- Echo speech bubbles -->
  <rect x="20" y="18" width="26" height="15" rx="6" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="1.8" />
  <text x="33" y="29" font-family="'Noto Sans KR', sans-serif" font-size="8.5" font-weight="900" fill="rgb(5,150,105)" text-anchor="middle">가!</text>
  <rect x="54" y="18" width="26" height="15" rx="6" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.8" />
  <text x="67" y="29" font-family="'Noto Sans KR', sans-serif" font-size="8.5" font-weight="900" fill="rgb(37,99,235)" text-anchor="middle">가!</text>
  <!-- Left child -->
  <rect x="30" y="54" width="6" height="4" fill="rgb(254,215,170)" />
  <path d="M 22 76 C 22 60 27 58 33 58 C 39 58 44 60 44 76 Z" fill="rgb(16,185,129)" />
  <path d="M 23 63 L 18 72" stroke="rgb(16,185,129)" stroke-width="3.5" stroke-linecap="round" />
  <circle cx="18" cy="73" r="2.5" fill="rgb(254,215,170)" />
  <circle cx="33" cy="45" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 21.7 44 C 20.9 29.3 45.1 29.3 44.3 44 Z" fill="rgb(51,65,85)" />
  <circle cx="30" cy="45" r="1.5" fill="rgb(30,41,59)" />
  <circle cx="36" cy="45" r="1.5" fill="rgb(30,41,59)" />
  <circle cx="33" cy="50" r="2.2" fill="rgb(225,29,72)" />
  <!-- Right child -->
  <rect x="64" y="54" width="6" height="4" fill="rgb(254,215,170)" />
  <path d="M 56 76 C 56 60 61 58 67 58 C 73 58 78 60 78 76 Z" fill="rgb(59,130,246)" />
  <path d="M 77 63 L 82 72" stroke="rgb(59,130,246)" stroke-width="3.5" stroke-linecap="round" />
  <circle cx="82" cy="73" r="2.5" fill="rgb(254,215,170)" />
  <circle cx="67" cy="45" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 55.7 44 C 54.9 29.3 79.1 29.3 78.3 44 Z" fill="rgb(120,53,15)" />
  <circle cx="64" cy="45" r="1.5" fill="rgb(30,41,59)" />
  <circle cx="70" cy="45" r="1.5" fill="rgb(30,41,59)" />
  <circle cx="67" cy="50" r="2.2" fill="rgb(225,29,72)" />
  <!-- Shared book in front -->
  <path d="M 38 72 L 50 75 L 62 72 L 62 81 L 50 84 L 38 81 Z" fill="rgb(255,255,255)" stroke="rgb(100,116,139)" stroke-width="1.5" />
</svg>`;

// 11-5. 써봐요 (Try writing) - Pencil writing cleanly on squared notebook grid
export const SSEOBWAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" opacity="0.65" />
  <!-- Notebook page -->
  <rect x="22" y="24" width="52" height="58" rx="4" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
  <!-- Dotted writing squares -->
  <rect x="28" y="34" width="18" height="18" fill="none" stroke="rgb(203,213,225)" stroke-width="1.2" stroke-dasharray="2,2" />
  <rect x="50" y="34" width="18" height="18" fill="none" stroke="rgb(203,213,225)" stroke-width="1.2" stroke-dasharray="2,2" />
  <text x="37" y="48" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="800" fill="rgb(30,41,59)" text-anchor="middle">가</text>
  <text x="59" y="48" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="800" fill="rgb(148,163,184)" text-anchor="middle">나</text>
  <line x1="28" y1="62" x2="68" y2="62" stroke="rgb(203,213,225)" stroke-width="1.5" />
  <line x1="28" y1="71" x2="54" y2="71" stroke="rgb(203,213,225)" stroke-width="1.5" />
  <!-- Tilted Pencil -->
  <g transform="translate(64, 46) rotate(35)">
    <rect x="-4" y="-22" width="8" height="28" rx="1.5" fill="rgb(250,204,21)" stroke="rgb(180,83,9)" stroke-width="1.3" />
    <rect x="-4" y="-26" width="8" height="5" rx="1" fill="rgb(244,114,182)" />
    <polygon points="-4,6 4,6 0,14" fill="rgb(254,215,170)" stroke="rgb(180,83,9)" stroke-width="1" />
    <polygon points="-1.5,11 1.5,11 0,14" fill="rgb(30,41,59)" />
  </g>
</svg>`;

// 11-6. 문장 (Sentence) - Lined paper showing full sentence with period
export const MUNJANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <rect x="18" y="24" width="64" height="52" rx="6" fill="rgb(255,255,255)" stroke="rgb(168,85,247)" stroke-width="2.2" />
  <!-- Sentence blocks -->
  <rect x="25" y="34" width="16" height="9" rx="3" fill="rgb(216,180,254)" />
  <rect x="44" y="34" width="14" height="9" rx="3" fill="rgb(191,219,254)" />
  <rect x="61" y="34" width="12" height="9" rx="3" fill="rgb(254,215,170)" />
  <text x="50" y="59" font-family="'Noto Sans KR', sans-serif" font-size="11.5" font-weight="900" fill="rgb(30,41,59)" text-anchor="middle">나는 학교에 가요.</text>
  <line x1="25" y1="65" x2="75" y2="65" stroke="rgb(168,85,247)" stroke-width="2" stroke-linecap="round" />
</svg>`;

// 11-7. 질문 (Question) - Student raising hand politely with question bubble ?
export const JILMUN_VOCAB_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <!-- Question Bubble -->
  <circle cx="69" cy="28" r="10" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.8" />
  <text x="69" y="32.5" font-family="'Nunito', sans-serif" font-size="13" font-weight="900" fill="rgb(120,53,15)" text-anchor="middle">?</text>
  <!-- Desk -->
  <rect x="20" y="72" width="60" height="7" rx="3" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="1.6" />
  <!-- Child fully visible above desk with neck, arms & hand -->
  <rect x="41" y="49" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 32 72 C 32 56 37 54 45 54 C 53 54 58 56 58 72 Z" fill="rgb(59,130,246)" />
  <!-- Raised right arm & hand -->
  <path d="M 55 58 L 60 39" stroke="rgb(59,130,246)" stroke-width="5" stroke-linecap="round" />
  <circle cx="60" cy="36" r="3.6" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <!-- Left arm resting on desk -->
  <path d="M 33 58 L 28 70" stroke="rgb(59,130,246)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="28" cy="71" r="3" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="45" cy="37" r="13" fill="rgb(254,215,170)" />
  <path d="M 31.2 35 C 30.2 17.9 59.8 17.9 58.8 35 C 58 29 52 26 45 26 C 38 26 32 29 31.2 35 Z" fill="rgb(51,65,85)" />
  <circle cx="41" cy="37" r="1.9" fill="rgb(30,41,59)" />
  <circle cx="49" cy="37" r="1.9" fill="rgb(30,41,59)" />
  <path d="M 42 43 Q 45 45.5 48 43" stroke="rgb(190,18,60)" stroke-width="1.6" fill="none" stroke-linecap="round" />
</svg>`;

// 11-8. 손들어요 (Raise hand) - Full standing student raising one arm high cleanly inside circle
export const SONDEUREOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.65" />
  <ellipse cx="50" cy="84" rx="18" ry="4" fill="rgba(15,23,42,0.1)" />
  <!-- Legs & Shoes -->
  <line x1="45" y1="64" x2="44" y2="79" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <line x1="55" y1="64" x2="56" y2="79" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <ellipse cx="43" cy="81" rx="4" ry="2.5" fill="rgb(239,68,68)" />
  <ellipse cx="57" cy="81" rx="4" ry="2.5" fill="rgb(239,68,68)" />
  <!-- Neck & Torso -->
  <rect x="46.5" y="42" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 40 46 L 60 46 L 58 65 L 42 65 Z" fill="rgb(16,185,129)" rx="3" />
  <!-- Left arm down neatly -->
  <path d="M 41 48 L 35 61" stroke="rgb(16,185,129)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="34.5" cy="62.5" r="3" fill="rgb(254,215,170)" />
  <!-- Right arm raised straight up with open palm -->
  <path d="M 59 48 L 65 25" stroke="rgb(16,185,129)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="65" cy="22" r="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <!-- Head -->
  <circle cx="50" cy="32" r="11" fill="rgb(254,215,170)" />
  <path d="M 38.2 30 C 37.3 15.6 62.7 15.6 61.8 30 Z" fill="rgb(51,65,85)" />
  <circle cx="46.5" cy="32" r="1.7" fill="rgb(30,41,59)" />
  <circle cx="53.5" cy="32" r="1.7" fill="rgb(30,41,59)" />
  <path d="M 47 36.5 Q 50 39.5 53 36.5" stroke="rgb(190,18,60)" stroke-width="1.6" fill="none" stroke-linecap="round" />
  <path d="M 73 20 L 74.5 16 L 76 20 L 80 21.5 L 76 23 L 74.5 27 L 73 23 L 69 21.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 11-9. 대답해요 (Answer) - Cheerful student answering with exclamation bubble !
export const DAEDAPHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Answer Speech Bubble -->
  <rect x="54" y="18" width="26" height="18" rx="7" fill="rgb(34,197,94)" />
  <polygon points="56,34 52,40 62,36" fill="rgb(34,197,94)" />
  <text x="67" y="31" font-family="'Noto Sans KR', sans-serif" font-size="10.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">네!</text>
  <!-- Child upper body with complete neck & arms -->
  <rect x="37" y="51" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 27 78 C 27 59 33 56 41 56 C 49 56 55 59 55 78 Z" fill="rgb(251,146,60)" />
  <path d="M 28 60 L 23 71" stroke="rgb(251,146,60)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 54 60 L 59 71" stroke="rgb(251,146,60)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="23" cy="72" r="3" fill="rgb(254,215,170)" />
  <circle cx="59" cy="72" r="3" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="41" cy="39" r="13.5" fill="rgb(254,215,170)" />
  <path d="M 26.7 37 C 25.6 19.3 56.4 19.3 55.3 37 Z" fill="rgb(51,65,85)" />
  <circle cx="37" cy="38" r="1.9" fill="rgb(30,41,59)" />
  <circle cx="45" cy="38" r="1.9" fill="rgb(30,41,59)" />
  <circle cx="33" cy="42" r="2.2" fill="rgb(244,114,182)" opacity="0.6" />
  <circle cx="49" cy="42" r="2.2" fill="rgb(244,114,182)" opacity="0.6" />
  <path d="M 37 44 Q 41 49 45 44" stroke="rgb(190,18,60)" stroke-width="2" fill="none" stroke-linecap="round" />
</svg>`;

// 11-10. 뜻이 뭐예요 (What does it mean?) - Dictionary book + magnifying glass & ?
export const TTEUSI_MWOYEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Open Korean dictionary -->
  <path d="M 18 32 L 49 36 L 80 32 L 80 72 L 49 76 L 18 72 Z" fill="rgb(255,255,255)" stroke="rgb(99,102,241)" stroke-width="2.2" />
  <line x1="49" y1="36" x2="49" y2="76" stroke="rgb(99,102,241)" stroke-width="2" />
  <line x1="25" y1="45" x2="43" y2="47" stroke="rgb(199,210,254)" stroke-width="2.2" stroke-linecap="round" />
  <line x1="25" y1="53" x2="43" y2="55" stroke="rgb(199,210,254)" stroke-width="2.2" stroke-linecap="round" />
  <line x1="55" y1="47" x2="73" y2="45" stroke="rgb(199,210,254)" stroke-width="2.2" stroke-linecap="round" />
  <line x1="55" y1="55" x2="73" y2="53" stroke="rgb(199,210,254)" stroke-width="2.2" stroke-linecap="round" />
  <!-- Magnifying glass with ? -->
  <circle cx="58" cy="48" r="14" fill="rgb(254,249,195)" stroke="rgb(234,179,8)" stroke-width="2.6" />
  <line x1="68" y1="58" x2="79" y2="69" stroke="rgb(180,83,9)" stroke-width="4.5" stroke-linecap="round" />
  <text x="58" y="54" font-family="'Nunito', sans-serif" font-size="16" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">?</text>
</svg>`;

// ============================================================================
// CHAPTER 12: 수학 (Math)
// ============================================================================

// 12-1. 숫자 (Number) - Cheerful 1, 2, 3 number blocks
export const SUTJA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <rect x="17" y="42" width="21" height="28" rx="4" fill="rgb(248,113,113)" stroke="rgb(220,38,38)" stroke-width="1.8" />
  <text x="27.5" y="62" font-family="'Nunito', sans-serif" font-size="16" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">1</text>
  <rect x="40" y="28" width="21" height="28" rx="4" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.8" />
  <text x="50.5" y="48" font-family="'Nunito', sans-serif" font-size="16" font-weight="900" fill="rgb(120,53,15)" text-anchor="middle">2</text>
  <rect x="62" y="44" width="21" height="28" rx="4" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.8" />
  <text x="72.5" y="64" font-family="'Nunito', sans-serif" font-size="16" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">3</text>
  <circle cx="28" cy="28" r="2.5" fill="rgb(250,204,21)" />
  <circle cx="74" cy="28" r="2" fill="rgb(96,165,250)" />
</svg>`;

// 12-2. 커요 (Big) - Cute friendly blue elephant & tiny yellow star for big contrast
export const KEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="48" cy="78" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Cute Elephant Body completely inside circle -->
  <rect x="26" y="58" width="10" height="17" rx="3" fill="rgb(96,165,250)" />
  <rect x="48" y="58" width="10" height="17" rx="3" fill="rgb(96,165,250)" />
  <ellipse cx="43" cy="50" rx="20" ry="15" fill="rgb(147,197,253)" stroke="rgb(59,130,246)" stroke-width="1.8" />
  <!-- Head & big floppy ear -->
  <circle cx="61" cy="43" r="12" fill="rgb(147,197,253)" stroke="rgb(59,130,246)" stroke-width="1.8" />
  <ellipse cx="52" cy="42" rx="7" ry="10" fill="rgb(96,165,250)" />
  <!-- Curved Trunk -->
  <path d="M 71 44 Q 80 44 79 34" stroke="rgb(59,130,246)" stroke-width="5.5" stroke-linecap="round" fill="none" />
  <circle cx="64" cy="39" r="2" fill="rgb(30,41,59)" />
  <!-- Upward Big Arrow -->
  <path d="M 22 36 L 22 20 M 17 25 L 22 20 L 27 25" stroke="rgb(239,68,68)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;

// 12-3. 작아요 (Small) - Magnifying glass looking closely at a tiny cute ladybug
export const JAGAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Leaf base -->
  <ellipse cx="46" cy="64" rx="24" ry="11" fill="rgb(134,239,172)" stroke="rgb(34,197,94)" stroke-width="1.8" />
  <!-- Tiny Ladybug -->
  <circle cx="46" cy="56" r="7" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
  <circle cx="46" cy="49" r="3.5" fill="rgb(30,41,59)" />
  <line x1="46" y1="52" x2="46" y2="63" stroke="rgb(30,41,59)" stroke-width="1.4" />
  <circle cx="43" cy="56" r="1.3" fill="rgb(30,41,59)" />
  <circle cx="49" cy="56" r="1.3" fill="rgb(30,41,59)" />
  <!-- Magnifying Glass Ring -->
  <circle cx="46" cy="55" r="18" fill="none" stroke="rgb(59,130,246)" stroke-width="3" />
  <line x1="59" y1="68" x2="71" y2="80" stroke="rgb(37,99,235)" stroke-width="5" stroke-linecap="round" />
  <!-- Shrink Arrows -->
  <path d="M 46 20 L 46 31 M 41 26 L 46 31 L 51 26" stroke="rgb(245,158,11)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;

// 12-4. 같아요 (Equal / Same) - Balanced scale with equal blocks & bold = sign
export const GATAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <!-- Balance Scale -->
  <polygon points="50,36 42,76 58,76" fill="rgb(148,163,184)" />
  <rect x="34" y="75" width="32" height="5" rx="2.5" fill="rgb(100,116,139)" />
  <line x1="24" y1="40" x2="76" y2="40" stroke="rgb(71,85,105)" stroke-width="3.5" stroke-linecap="round" />
  <!-- Left & Right Equal Pans -->
  <path d="M 18 54 L 32 54 L 29 58 L 21 58 Z" fill="rgb(100,116,139)" />
  <line x1="25" y1="40" x2="20" y2="54" stroke="rgb(148,163,184)" stroke-width="1.5" />
  <line x1="25" y1="40" x2="30" y2="54" stroke="rgb(148,163,184)" stroke-width="1.5" />
  <circle cx="25" cy="48" r="5" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.5" />

  <path d="M 68 54 L 82 54 L 79 58 L 71 58 Z" fill="rgb(100,116,139)" />
  <line x1="75" y1="40" x2="70" y2="54" stroke="rgb(148,163,184)" stroke-width="1.5" />
  <line x1="75" y1="40" x2="80" y2="54" stroke="rgb(148,163,184)" stroke-width="1.5" />
  <circle cx="75" cy="48" r="5" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.5" />
  <!-- Bold = sign -->
  <rect x="40" y="20" width="20" height="4.5" rx="2" fill="rgb(126,34,206)" />
  <rect x="40" y="28" width="20" height="4.5" rx="2" fill="rgb(126,34,206)" />
</svg>`;

// 12-5. 세어봐요 (Count) - Cute colorful counting beads abacus
export const SEOBWAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <!-- Wooden Abacus Frame -->
  <rect x="18" y="24" width="64" height="52" rx="6" fill="none" stroke="rgb(180,83,9)" stroke-width="4" />
  <line x1="20" y1="38" x2="80" y2="38" stroke="rgb(148,163,184)" stroke-width="2" />
  <line x1="20" y1="51" x2="80" y2="51" stroke="rgb(148,163,184)" stroke-width="2" />
  <line x1="20" y1="64" x2="80" y2="64" stroke="rgb(148,163,184)" stroke-width="2" />
  <!-- Row 1 beads (1) -->
  <circle cx="29" cy="38" r="5" fill="rgb(239,68,68)" />
  <circle cx="61" cy="38" r="5" fill="rgb(239,68,68)" opacity="0.45" />
  <circle cx="72" cy="38" r="5" fill="rgb(239,68,68)" opacity="0.45" />
  <!-- Row 2 beads (2) -->
  <circle cx="29" cy="51" r="5" fill="rgb(245,158,11)" />
  <circle cx="40" cy="51" r="5" fill="rgb(245,158,11)" />
  <circle cx="72" cy="51" r="5" fill="rgb(245,158,11)" opacity="0.45" />
  <!-- Row 3 beads (3) -->
  <circle cx="29" cy="64" r="5" fill="rgb(16,185,129)" />
  <circle cx="40" cy="64" r="5" fill="rgb(16,185,129)" />
  <circle cx="51" cy="64" r="5" fill="rgb(16,185,129)" />
</svg>`;

// 12-6. 더해요 (Add) - Plus sign block combining cute apples
export const DEOHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <!-- Left apples -->
  <circle cx="26" cy="40" r="8" fill="rgb(239,68,68)" />
  <path d="M 26 32 Q 29 28 31 30" stroke="rgb(22,163,74)" stroke-width="2" fill="none" />
  <circle cx="26" cy="60" r="8" fill="rgb(239,68,68)" />
  <path d="M 26 52 Q 29 48 31 50" stroke="rgb(22,163,74)" stroke-width="2" fill="none" />
  <!-- Big Green Plus + -->
  <rect x="46" y="38" width="8" height="24" rx="2" fill="rgb(16,185,129)" />
  <rect x="38" y="46" width="24" height="8" rx="2" fill="rgb(16,185,129)" />
  <!-- Right apple -->
  <circle cx="74" cy="50" r="8.5" fill="rgb(239,68,68)" />
  <path d="M 74 41.5 Q 77 37.5 79 39.5" stroke="rgb(22,163,74)" stroke-width="2" fill="none" />
</svg>`;

// 12-7. 빼요 (Subtract) - Minus sign block taking away one star
export const PPAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Left two blocks -->
  <rect x="20" y="34" width="14" height="14" rx="3" fill="rgb(96,165,250)" />
  <rect x="20" y="52" width="14" height="14" rx="3" fill="rgb(96,165,250)" />
  <!-- Bold Minus - -->
  <rect x="41" y="46" width="20" height="8" rx="2.5" fill="rgb(225,29,72)" />
  <!-- Right subtracted dashed block with fade -->
  <rect x="66" y="43" width="14" height="14" rx="3" fill="rgb(254,205,211)" stroke="rgb(225,29,72)" stroke-width="1.8" stroke-dasharray="3,2" />
</svg>`;

// 12-8. 맞아요 (Correct) - Big happy blue/green O circle mark with sparkle stars
export const MAJAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <circle cx="50" cy="50" r="26" fill="none" stroke="rgb(22,163,74)" stroke-width="9" />
  <path d="M 39 50 L 47 58 L 62 42" stroke="rgb(16,185,129)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <path d="M 22 25 L 23.5 21 L 25 25 L 29 26.5 L 25 28 L 23.5 32 L 22 28 L 18 26.5 Z" fill="rgb(250,204,21)" />
  <path d="M 76 23 L 77.5 19 L 79 23 L 83 24.5 L 79 26 L 77.5 30 L 76 26 L 72 24.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 12-9. 틀려요 (Wrong) - Gentle red X mark on paper + pink eraser
export const TEULLYEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <rect x="24" y="22" width="52" height="56" rx="5" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="2" />
  <line x1="36" y1="36" x2="64" y2="64" stroke="rgb(239,68,68)" stroke-width="7" stroke-linecap="round" />
  <line x1="64" y1="36" x2="36" y2="64" stroke="rgb(239,68,68)" stroke-width="7" stroke-linecap="round" />
</svg>`;

// 12-10. 자(cm) (Ruler) - Crisp yellow school cm ruler with tick marks
export const JACM_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <g transform="translate(50, 50) rotate(-25) translate(-50, -50)">
    <rect x="14" y="38" width="72" height="24" rx="3" fill="rgb(250,204,21)" stroke="rgb(180,83,9)" stroke-width="2" />
    <line x1="22" y1="38" x2="22" y2="48" stroke="rgb(120,53,15)" stroke-width="1.8" />
    <line x1="30" y1="38" x2="30" y2="44" stroke="rgb(120,53,15)" stroke-width="1.5" />
    <line x1="38" y1="38" x2="38" y2="48" stroke="rgb(120,53,15)" stroke-width="1.8" />
    <line x1="46" y1="38" x2="46" y2="44" stroke="rgb(120,53,15)" stroke-width="1.5" />
    <line x1="54" y1="38" x2="54" y2="48" stroke="rgb(120,53,15)" stroke-width="1.8" />
    <line x1="62" y1="38" x2="62" y2="44" stroke="rgb(120,53,15)" stroke-width="1.5" />
    <line x1="70" y1="38" x2="70" y2="48" stroke="rgb(120,53,15)" stroke-width="1.8" />
    <line x1="78" y1="38" x2="78" y2="44" stroke="rgb(120,53,15)" stroke-width="1.5" />
    <text x="50" y="57" font-family="'Nunito', sans-serif" font-size="9" font-weight="900" fill="rgb(120,53,15)" text-anchor="middle">cm</text>
  </g>
</svg>`;

// ============================================================================
// CHAPTER 13: 미술 (Art)
// ============================================================================

// 13-1. 색연필 (Colored pencil) - Trio of bright red, yellow, blue colored pencils
export const SAEKYEONPIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(253,242,248)" />
  <!-- Red pencil -->
  <g transform="translate(28, 52) rotate(-14)">
    <rect x="-5" y="-18" width="10" height="40" rx="1.5" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.3" />
    <polygon points="-5,-18 5,-18 0,-29" fill="rgb(254,215,170)" />
    <polygon points="-2,-24 2,-24 0,-29" fill="rgb(220,38,38)" />
  </g>
  <!-- Blue pencil -->
  <g transform="translate(72, 52) rotate(14)">
    <rect x="-5" y="-18" width="10" height="40" rx="1.5" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.3" />
    <polygon points="-5,-18 5,-18 0,-29" fill="rgb(254,215,170)" />
    <polygon points="-2,-24 2,-24 0,-29" fill="rgb(37,99,235)" />
  </g>
  <!-- Yellow pencil center -->
  <g transform="translate(50, 48)">
    <rect x="-5.5" y="-18" width="11" height="44" rx="1.5" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.4" />
    <polygon points="-5.5,-18 5.5,-18 0,-30" fill="rgb(254,215,170)" />
    <polygon points="-2,-25 2,-25 0,-30" fill="rgb(234,179,8)" />
  </g>
</svg>`;

// 13-2. 싸인펜 (Felt-tip pen) - Colorful felt-tip marker pens drawing bright line
export const SSAINPEN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <!-- Bright marker stroke -->
  <path d="M 20 74 Q 36 66 50 74 Q 64 82 78 72" stroke="rgb(16,185,129)" stroke-width="4" stroke-linecap="round" fill="none" />
  <!-- Left Pink Marker -->
  <g transform="translate(36, 46) rotate(-18)">
    <rect x="-6" y="-16" width="12" height="36" rx="3" fill="rgb(244,114,182)" stroke="rgb(219,39,119)" stroke-width="1.5" />
    <rect x="-5" y="14" width="10" height="8" rx="1" fill="rgb(255,255,255)" />
    <polygon points="-3,-16 3,-16 1.5,-24 -1.5,-24" fill="rgb(219,39,119)" />
  </g>
  <!-- Right Green Marker -->
  <g transform="translate(62, 46) rotate(12)">
    <rect x="-6" y="-16" width="12" height="36" rx="3" fill="rgb(52,211,153)" stroke="rgb(5,150,105)" stroke-width="1.5" />
    <rect x="-5" y="14" width="10" height="8" rx="1" fill="rgb(255,255,255)" />
    <polygon points="-3,-16 3,-16 1.5,-24 -1.5,-24" fill="rgb(5,150,105)" />
  </g>
</svg>`;

// 13-3. 네임펜 (Name marker) - Black marker pen writing on white name sticker tag
export const NEIMPEN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(241,245,249)" />
  <!-- Name sticker tag -->
  <rect x="16" y="48" width="54" height="26" rx="5" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2" />
  <text x="43" y="65" font-family="'Noto Sans KR', sans-serif" font-size="11" font-weight="900" fill="rgb(30,41,59)" text-anchor="middle">이름</text>
  <!-- Black permanent marker pen -->
  <g transform="translate(65, 38) rotate(32)">
    <rect x="-5" y="-20" width="10" height="34" rx="2.5" fill="rgb(30,41,59)" />
    <rect x="-5" y="-10" width="10" height="6" fill="rgb(250,204,21)" />
    <polygon points="-4,14 4,14 1.5,21 -1.5,21" fill="rgb(71,85,105)" />
    <rect x="-1.5" y="21" width="3" height="4" fill="rgb(15,23,42)" />
  </g>
</svg>`;

// 13-4. 그려요 (Draw) - Sketchbook with colorful crayon drawing a smiling flower/sun
export const GEURYEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <!-- Sketchbook -->
  <rect x="18" y="24" width="58" height="52" rx="5" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
  <!-- Drawing on page: sun & flower -->
  <circle cx="35" cy="39" r="7" fill="rgb(250,204,21)" />
  <path d="M 48 64 L 48 52" stroke="rgb(22,163,74)" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="48" cy="48" r="5" fill="rgb(244,114,182)" />
  <circle cx="48" cy="48" r="2" fill="rgb(250,204,21)" />
  <!-- Crayon drawing -->
  <g transform="translate(68, 52) rotate(30)">
    <rect x="-4" y="-18" width="8" height="26" rx="1.5" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="1.2" />
    <polygon points="-4,-18 4,-18 0,-25" fill="rgb(249,115,22)" />
  </g>
</svg>`;

// 13-5. 칠해요 (Color / Paint) - Artist paint palette & brush painting colorful rainbow
export const CHILHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <!-- Wooden Palette -->
  <path d="M 20 52 C 20 34 38 26 56 28 C 72 30 78 44 74 56 C 70 66 56 62 50 68 C 44 74 20 70 20 52 Z" fill="rgb(254,243,199)" stroke="rgb(217,119,6)" stroke-width="2" />
  <!-- Paint blobs -->
  <circle cx="33" cy="43" r="4.5" fill="rgb(239,68,68)" />
  <circle cx="46" cy="36" r="4.5" fill="rgb(250,204,21)" />
  <circle cx="60" cy="40" r="4.5" fill="rgb(59,130,246)" />
  <circle cx="33" cy="57" r="4.5" fill="rgb(34,197,94)" />
  <!-- Paintbrush -->
  <g transform="translate(62, 58) rotate(-38)">
    <rect x="-2.5" y="-14" width="5" height="32" rx="2" fill="rgb(180,83,9)" />
    <rect x="-3" y="-18" width="6" height="5" fill="rgb(203,213,225)" />
    <path d="M -3 -18 Q 0 -27 3 -18 Z" fill="rgb(239,68,68)" />
  </g>
</svg>`;

// 13-6. 색종이 (Colored paper) - Crisp origami squares & cute folded paper boat
export const SAEKJONGI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.65" />
  <!-- Colored Origami Sheets stacked -->
  <rect x="20" y="24" width="32" height="32" rx="2" fill="rgb(244,114,182)" stroke="rgb(219,39,119)" stroke-width="1.5" transform="rotate(-8 36 40)" />
  <rect x="34" y="28" width="32" height="32" rx="2" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.5" transform="rotate(6 50 44)" />
  <rect x="44" y="34" width="32" height="32" rx="2" fill="rgb(96,165,250)" stroke="rgb(37,99,235)" stroke-width="1.5" />
  <!-- Cute folded triangle dog/boat accent -->
  <polygon points="44,74 78,74 70,82 52,82" fill="rgb(52,211,153)" stroke="rgb(5,150,105)" stroke-width="1.4" />
  <polygon points="52,74 61,58 70,74" fill="rgb(110,231,183)" stroke="rgb(5,150,105)" stroke-width="1.4" />
</svg>`;

// 13-7. 테이프 (Tape) - Desk tape dispenser pulling out clear tape strip
export const TEIPEU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="78" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Clear Tape Strip pulled right -->
  <polygon points="44,32 78,44 74,52 44,44" fill="rgb(224,242,254)" opacity="0.85" stroke="rgb(56,189,248)" stroke-width="1.5" />
  <!-- Dispenser Body -->
  <path d="M 22 66 C 22 44 32 28 45 28 C 56 28 60 36 62 46 L 78 46 L 78 68 C 78 72 74 74 70 74 L 28 74 C 24 74 22 70 22 66 Z" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="2" />
  <!-- Tape Roll inside -->
  <circle cx="44" cy="46" r="14" fill="rgb(254,240,138)" stroke="rgb(202,138,4)" stroke-width="1.6" />
  <circle cx="44" cy="46" r="6" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="1.5" />
</svg>`;

// 13-8. 붙여요 (Paste / Stick) - Cute glue stick pasting a colorful star onto paper
export const BUCHYEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Paper -->
  <rect x="18" y="34" width="44" height="44" rx="4" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
  <!-- Pasted Star -->
  <path d="M 40 42 L 43 49 L 50 49 L 44.5 54 L 46.5 61 L 40 57 L 33.5 61 L 35.5 54 L 30 49 L 37 49 Z" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.3" />
  <!-- Glue Stick -->
  <g transform="translate(68, 46) rotate(22)">
    <rect x="-7" y="-14" width="14" height="32" rx="3" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.8" />
    <rect x="-7" y="10" width="14" height="8" rx="1.5" fill="rgb(59,130,246)" />
    <rect x="-4.5" y="-21" width="9" height="7" rx="2" fill="rgb(191,219,254)" />
  </g>
</svg>`;

// 13-9. 오려요 (Cut out) - Safety scissors cutting along a dotted paper line
export const ORYEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Paper with dotted cut line -->
  <rect x="20" y="24" width="54" height="52" rx="4" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="2" />
  <line x1="22" y1="50" x2="72" y2="50" stroke="rgb(239,68,68)" stroke-width="2" stroke-dasharray="4,3" />
  <!-- Kids Scissors -->
  <g transform="translate(62, 50)">
    <line x1="0" y1="0" x2="-24" y2="-9" stroke="rgb(100,116,139)" stroke-width="3.5" stroke-linecap="round" />
    <line x1="0" y1="0" x2="-24" y2="9" stroke="rgb(148,163,184)" stroke-width="3.5" stroke-linecap="round" />
    <circle cx="11" cy="-9" r="7.5" fill="none" stroke="rgb(239,68,68)" stroke-width="3.5" />
    <circle cx="11" cy="9" r="7.5" fill="none" stroke="rgb(239,68,68)" stroke-width="3.5" />
    <circle cx="-2" cy="0" r="2" fill="rgb(30,41,59)" />
  </g>
</svg>`;

// 13-10. 만들어요 (Make) - Kid joyfully crafting colorful paper/block house
export const MANDEUREOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Craft Table -->
  <rect x="18" y="68" width="64" height="8" rx="3" fill="rgb(251,191,36)" stroke="rgb(180,83,9)" stroke-width="1.6" />
  <!-- Crafted Colorful House Blocks on Table -->
  <rect x="44" y="48" width="24" height="20" rx="2" fill="rgb(96,165,250)" stroke="rgb(37,99,235)" stroke-width="1.5" />
  <polygon points="41,48 56,34 71,48" fill="rgb(248,113,113)" stroke="rgb(220,38,38)" stroke-width="1.5" />
  <rect x="52" y="56" width="8" height="12" fill="rgb(254,240,138)" />
  <!-- Extra craft blocks -->
  <rect x="24" y="57" width="12" height="11" rx="2" fill="rgb(52,211,153)" stroke="rgb(5,150,105)" stroke-width="1.4" />
  <circle cx="75" cy="62" r="5" fill="rgb(244,114,182)" />
  <path d="M 30 28 L 31.5 24 L 33 28 L 37 29.5 L 33 31 L 31.5 35 L 30 31 L 26 29.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// ============================================================================
// CHAPTER 14: 체육 (PE / Sports)
// ============================================================================

// 14-1. 운동장 (Playground) - Sunny green school playground with running track & soccer goal
export const UNDONGJANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <!-- Green grass field inside bottom half -->
  <path d="M 10 56 Q 50 50 90 56 A 46 46 0 0 1 10 56 Z" fill="rgb(74,222,128)" />
  <!-- Track oval -->
  <ellipse cx="50" cy="70" rx="32" ry="12" fill="rgb(251,146,60)" stroke="rgb(255,255,255)" stroke-width="2" />
  <ellipse cx="50" cy="70" rx="22" ry="7" fill="rgb(34,197,94)" />
  <!-- Soccer goal -->
  <path d="M 38 52 L 38 40 L 62 40 L 62 52" stroke="rgb(255,255,255)" stroke-width="2.8" fill="rgba(255,255,255,0.35)" stroke-linejoin="round" />
  <!-- Smiling Sun -->
  <circle cx="72" cy="27" r="7.5" fill="rgb(250,204,21)" />
</svg>`;

// 14-2. 체육관 (Gymnasium) - Indoor gym court with basketball backboard & hoop
export const CHEYUKGWAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <!-- Wooden court floor -->
  <ellipse cx="50" cy="76" rx="34" ry="8" fill="rgb(253,186,116)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  <!-- Hoop pole & backboard -->
  <line x1="50" y1="42" x2="50" y2="75" stroke="rgb(100,116,139)" stroke-width="3.5" />
  <rect x="30" y="20" width="40" height="25" rx="3" fill="rgb(255,255,255)" stroke="rgb(37,99,235)" stroke-width="2.2" />
  <rect x="42" y="29" width="16" height="11" fill="none" stroke="rgb(239,68,68)" stroke-width="2" />
  <!-- Hoop & Net -->
  <ellipse cx="50" cy="42" rx="9" ry="2.5" fill="none" stroke="rgb(234,88,12)" stroke-width="2.5" />
  <path d="M 42 43 L 45 53 L 55 53 L 58 43" fill="none" stroke="rgb(203,213,225)" stroke-width="1.5" />
  <!-- Orange Basketball -->
  <circle cx="68" cy="64" r="7.5" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="1.5" />
  <line x1="60.5" y1="64" x2="75.5" y2="64" stroke="rgb(154,52,18)" stroke-width="1.2" />
</svg>`;

// 14-3. 공 (Ball) - Crisp classic soccer ball bouncing with motion lines
export const GONG_BALL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="79" rx="22" ry="4.5" fill="rgba(15,23,42,0.12)" />
  <!-- Soccer Ball -->
  <circle cx="50" cy="46" r="24" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="2.4" />
  <polygon points="50,36 58,42 55,52 45,52 42,42" fill="rgb(30,41,59)" />
  <polygon points="50,22 57,27 43,27" fill="rgb(30,41,59)" />
  <polygon points="27,42 33,38 33,48" fill="rgb(30,41,59)" />
  <polygon points="73,42 67,38 67,48" fill="rgb(30,41,59)" />
  <polygon points="38,67 44,61 35,58" fill="rgb(30,41,59)" />
  <polygon points="62,67 56,61 65,58" fill="rgb(30,41,59)" />
  <line x1="50" y1="27" x2="50" y2="36" stroke="rgb(30,41,59)" stroke-width="1.6" />
  <line x1="33" y1="43" x2="42" y2="42" stroke="rgb(30,41,59)" stroke-width="1.6" />
  <line x1="67" y1="43" x2="58" y2="42" stroke="rgb(30,41,59)" stroke-width="1.6" />
  <line x1="45" y1="52" x2="42" y2="61" stroke="rgb(30,41,59)" stroke-width="1.6" />
  <line x1="55" y1="52" x2="58" y2="61" stroke="rgb(30,41,59)" stroke-width="1.6" />
</svg>`;

// 14-4. 줄넘기 (Jump rope) - Happy child jumping rope with ALL limbs & rope cleanly inside circle
export const JULNEOMGI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <ellipse cx="50" cy="82" rx="18" ry="3.5" fill="rgba(15,23,42,0.1)" />
  <!-- Jump Rope Arc cleanly inside circle -->
  <path d="M 27 52 C 20 82 80 82 73 52" fill="none" stroke="rgb(239,68,68)" stroke-width="2.6" stroke-linecap="round" />
  <!-- Child Jumping (centered at x=50, feet at y=69) -->
  <line x1="45" y1="55" x2="43" y2="67" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" />
  <line x1="55" y1="55" x2="57" y2="67" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" />
  <ellipse cx="42" cy="69" rx="4" ry="2.4" fill="rgb(59,130,246)" />
  <ellipse cx="58" cy="69" rx="4" ry="2.4" fill="rgb(59,130,246)" />
  <!-- Neck & Torso -->
  <rect x="46.5" y="34" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 40 38 L 60 38 L 58 56 L 42 56 Z" fill="rgb(59,130,246)" />
  <!-- Arms holding rope handles -->
  <path d="M 41 40 L 29 50" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <path d="M 59 40 L 71 50" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <circle cx="28" cy="51" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="72" cy="51" r="2.8" fill="rgb(254,215,170)" />
  <!-- Rope handles -->
  <rect x="25" y="49" width="4" height="5" rx="1" fill="rgb(239,68,68)" />
  <rect x="71" y="49" width="4" height="5" rx="1" fill="rgb(239,68,68)" />
  <!-- Head -->
  <circle cx="50" cy="25" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 38.7 23 C 37.9 9.7 62.1 9.7 61.3 23 Z" fill="rgb(51,65,85)" />
  <circle cx="46.5" cy="25" r="1.6" fill="rgb(30,41,59)" />
  <circle cx="53.5" cy="25" r="1.6" fill="rgb(30,41,59)" />
  <path d="M 47 29.5 Q 50 32.5 53 29.5" stroke="rgb(190,18,60)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// 14-5. 달려요 (Run) - Kid running energetically with all arms/hands/legs/shoes completely inside circle
export const DALLYEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <!-- Speed lines -->
  <line x1="16" y1="42" x2="26" y2="42" stroke="rgb(52,211,153)" stroke-width="2.5" stroke-linecap="round" />
  <line x1="14" y1="52" x2="23" y2="52" stroke="rgb(52,211,153)" stroke-width="2.5" stroke-linecap="round" />
  <ellipse cx="52" cy="81" rx="22" ry="4" fill="rgba(15,23,42,0.1)" />
  <!-- Back & Front Running Legs with shoes -->
  <path d="M 47 56 L 34 66 L 28 73" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <ellipse cx="26" cy="74" rx="4.2" ry="2.5" fill="rgb(239,68,68)" />
  <path d="M 54 56 L 65 64 L 68 75" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <ellipse cx="70" cy="76" rx="4.5" ry="2.6" fill="rgb(239,68,68)" />
  <!-- Neck & Torso -->
  <rect x="46.5" y="34" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 42 38 L 58 38 L 56 57 L 43 57 Z" fill="rgb(16,185,129)" />
  <!-- Running Arms with hands -->
  <path d="M 43 41 L 32 48 L 36 53" stroke="rgb(16,185,129)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <circle cx="37" cy="54" r="2.8" fill="rgb(254,215,170)" />
  <path d="M 57 41 L 67 45 L 72 38" stroke="rgb(16,185,129)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <circle cx="72.5" cy="36.5" r="2.8" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="51" cy="25" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 39.7 23 C 38.9 9.7 63.1 9.7 62.3 23 Z" fill="rgb(51,65,85)" />
  <circle cx="54" cy="25" r="1.7" fill="rgb(30,41,59)" />
  <path d="M 52 29.5 Q 55 32 58 29.5" stroke="rgb(190,18,60)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// 14-6. 던져요 (Throw) - Kid throwing ball in clean arc completely inside circle
export const DEONJYEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <ellipse cx="40" cy="81" rx="18" ry="4" fill="rgba(15,23,42,0.1)" />
  <!-- Arc & Flying Ball -->
  <path d="M 48 30 Q 64 20 75 34" stroke="rgb(147,197,253)" stroke-width="2" stroke-dasharray="3,3" fill="none" />
  <circle cx="76" cy="36" r="7" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="1.5" />
  <!-- Legs & Shoes -->
  <line x1="35" y1="58" x2="31" y2="76" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <line x1="43" y1="58" x2="49" y2="76" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <ellipse cx="30" cy="78" rx="4" ry="2.4" fill="rgb(37,99,235)" />
  <ellipse cx="50" cy="78" rx="4" ry="2.4" fill="rgb(37,99,235)" />
  <!-- Neck & Torso -->
  <rect x="35.5" y="36" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 30 40 L 48 40 L 46 59 L 32 59 Z" fill="rgb(59,130,246)" />
  <!-- Left Arm & Throwing Right Arm -->
  <path d="M 31 43 L 24 53" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <circle cx="23.5" cy="54.5" r="2.8" fill="rgb(254,215,170)" />
  <path d="M 47 42 L 55 32" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <circle cx="56" cy="30.5" r="3" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="39" cy="27" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 27.7 25 C 26.9 11.7 51.1 11.7 50.3 25 Z" fill="rgb(51,65,85)" />
  <circle cx="42.5" cy="27" r="1.7" fill="rgb(30,41,59)" />
  <path d="M 40 31.5 Q 43 34 45.5 31.5" stroke="rgb(190,18,60)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// 14-7. 받아요 (Catch - PE) - Kid extending both arms & hands to catch flying ball inside circle
export const BADAYO_CATCH_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="42" cy="81" rx="18" ry="4" fill="rgba(15,23,42,0.1)" />
  <!-- Incoming Ball & motion trail -->
  <line x1="78" y1="26" x2="68" y2="33" stroke="rgb(251,146,60)" stroke-width="2" stroke-dasharray="3,2" />
  <circle cx="64" cy="39" r="7.5" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="1.5" />
  <!-- Legs & Shoes -->
  <line x1="36" y1="58" x2="34" y2="76" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <line x1="45" y1="58" x2="48" y2="76" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <ellipse cx="33" cy="78" rx="4" ry="2.4" fill="rgb(239,68,68)" />
  <ellipse cx="49" cy="78" rx="4" ry="2.4" fill="rgb(239,68,68)" />
  <!-- Neck & Torso -->
  <rect x="37" y="36" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 32 40 L 49 40 L 47 59 L 34 59 Z" fill="rgb(249,115,22)" />
  <!-- Both arms reaching out to catch the ball -->
  <path d="M 47 43 L 58 43" stroke="rgb(249,115,22)" stroke-width="4" stroke-linecap="round" />
  <path d="M 46 47 L 58 48" stroke="rgb(249,115,22)" stroke-width="4" stroke-linecap="round" />
  <circle cx="59.5" cy="43" r="3" fill="rgb(254,215,170)" />
  <circle cx="59.5" cy="48" r="3" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="40.5" cy="27" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 29.2 25 C 28.4 11.7 52.6 11.7 51.8 25 Z" fill="rgb(51,65,85)" />
  <circle cx="44" cy="27" r="1.7" fill="rgb(30,41,59)" />
  <path d="M 41 31.5 Q 44 34 46.5 31.5" stroke="rgb(190,18,60)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// 14-8. 준비운동 (Warm-up) - Cheerful student stretching arms overhead cleanly inside circle
export const JUNBIUNDONG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="83" rx="18" ry="4" fill="rgba(15,23,42,0.1)" />
  <!-- Legs apart in warm-up stance -->
  <line x1="45" y1="62" x2="39" y2="78" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <line x1="55" y1="62" x2="61" y2="78" stroke="rgb(30,41,59)" stroke-width="5" stroke-linecap="round" />
  <ellipse cx="38" cy="80" rx="4" ry="2.4" fill="rgb(16,185,129)" />
  <ellipse cx="62" cy="80" rx="4" ry="2.4" fill="rgb(16,185,129)" />
  <!-- Neck & Torso -->
  <rect x="46.5" y="40" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 41 44 L 59 44 L 57 63 L 43 63 Z" fill="rgb(34,197,94)" />
  <!-- Both Arms Stretching Up Overhead -->
  <path d="M 42 46 Q 32 32 38 19" stroke="rgb(34,197,94)" stroke-width="4" stroke-linecap="round" fill="none" />
  <path d="M 58 46 Q 68 32 62 19" stroke="rgb(34,197,94)" stroke-width="4" stroke-linecap="round" fill="none" />
  <circle cx="38" cy="18" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="62" cy="18" r="2.8" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="50" cy="30" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 38.7 28 C 37.9 14.7 62.1 14.7 61.3 28 Z" fill="rgb(51,65,85)" />
  <circle cx="46.5" cy="30" r="1.6" fill="rgb(30,41,59)" />
  <circle cx="53.5" cy="30" r="1.6" fill="rgb(30,41,59)" />
  <path d="M 47 34.5 Q 50 37.5 53 34.5" stroke="rgb(190,18,60)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// 14-9. 시작해요 (Start / Begin) - Sports whistle & checkered start flag
export const SIJAKHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <!-- Flag Pole & Checkered Flag -->
  <line x1="28" y1="22" x2="28" y2="76" stroke="rgb(71,85,105)" stroke-width="3.5" stroke-linecap="round" />
  <rect x="30" y="23" width="38" height="24" rx="2" fill="rgb(255,255,255)" stroke="rgb(30,41,59)" stroke-width="1.8" />
  <rect x="30" y="23" width="9.5" height="8" fill="rgb(30,41,59)" />
  <rect x="49" y="23" width="9.5" height="8" fill="rgb(30,41,59)" />
  <rect x="39.5" y="31" width="9.5" height="8" fill="rgb(30,41,59)" />
  <rect x="58.5" y="31" width="9.5" height="8" fill="rgb(30,41,59)" />
  <rect x="30" y="39" width="9.5" height="8" fill="rgb(30,41,59)" />
  <rect x="49" y="39" width="9.5" height="8" fill="rgb(30,41,59)" />
  <!-- Bright Whistle -->
  <circle cx="64" cy="64" r="10" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.8" />
  <rect x="48" y="57" width="16" height="9" rx="2" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.8" />
  <circle cx="64" cy="64" r="3.5" fill="rgb(255,255,255)" />
  <path d="M 42 56 L 45 52 M 40 62 L 44 62" stroke="rgb(245,158,11)" stroke-width="2.2" stroke-linecap="round" />
</svg>`;

// 14-10. 멈추어요 (Stop / Halt) - Red octagonal STOP sign & open stop palm
export const MEOMCHUOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <rect x="47" y="60" width="6" height="22" rx="2" fill="rgb(100,116,139)" />
  <!-- Red Octagonal Stop Sign -->
  <polygon points="38,20 62,20 76,34 76,54 62,68 38,68 24,54 24,34" fill="rgb(239,68,68)" stroke="rgb(255,255,255)" stroke-width="2.5" />
  <!-- Clear Raised Stop Hand Palm Inside -->
  <rect x="42" y="42" width="16" height="15" rx="5" fill="rgb(255,255,255)" />
  <rect x="42" y="32" width="3.5" height="12" rx="1.7" fill="rgb(255,255,255)" />
  <rect x="46.2" y="29" width="3.5" height="15" rx="1.7" fill="rgb(255,255,255)" />
  <rect x="50.4" y="30" width="3.5" height="14" rx="1.7" fill="rgb(255,255,255)" />
  <rect x="54.5" y="33" width="3.5" height="11" rx="1.7" fill="rgb(255,255,255)" />
</svg>`;

// ============================================================================
// CHAPTER 15: 음악 (Music)
// ============================================================================

// 15-1. 노래 (Song) - Colorful musical staff & joyful bouncing notes
export const NORAE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(253,242,248)" />
  <!-- Staff lines -->
  <line x1="16" y1="42" x2="84" y2="42" stroke="rgb(203,213,225)" stroke-width="1.6" />
  <line x1="16" y1="52" x2="84" y2="52" stroke="rgb(203,213,225)" stroke-width="1.6" />
  <line x1="16" y1="62" x2="84" y2="62" stroke="rgb(203,213,225)" stroke-width="1.6" />
  <!-- Double Eighth Note (Pink) -->
  <ellipse cx="32" cy="64" rx="6.5" ry="5" fill="rgb(236,72,153)" transform="rotate(-15 32 64)" />
  <ellipse cx="52" cy="58" rx="6.5" ry="5" fill="rgb(236,72,153)" transform="rotate(-15 52 58)" />
  <line x1="38" y1="63" x2="38" y2="32" stroke="rgb(236,72,153)" stroke-width="3.2" />
  <line x1="58" y1="57" x2="58" y2="26" stroke="rgb(236,72,153)" stroke-width="3.2" />
  <polygon points="36.5,31 59.5,25 59.5,31 36.5,37" fill="rgb(236,72,153)" />
  <!-- Single Note (Purple) -->
  <ellipse cx="72" cy="52" rx="6" ry="4.5" fill="rgb(147,51,234)" transform="rotate(-15 72 52)" />
  <line x1="77" y1="51" x2="77" y2="28" stroke="rgb(147,51,234)" stroke-width="3" />
  <path d="M 77 28 Q 84 32 82 38" stroke="rgb(147,51,234)" stroke-width="3" fill="none" stroke-linecap="round" />
  <path d="M 23 28 L 24.5 24 L 26 28 L 30 29.5 L 26 31 L 24.5 35 L 23 31 L 19 29.5 Z" fill="rgb(250,204,21)" />
</svg>`;

// 15-2. 불러요 (Sing) - Happy child holding a microphone singing cheerfully
export const BULLEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <!-- Music Note -->
  <circle cx="72" cy="31" r="3.5" fill="rgb(168,85,247)" />
  <line x1="75" y1="31" x2="75" y2="19" stroke="rgb(168,85,247)" stroke-width="2.2" />
  <!-- Child with complete neck & arms -->
  <rect x="41" y="48" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 30 78 C 30 58 37 54 45 54 C 53 54 60 58 60 78 Z" fill="rgb(168,85,247)" />
  <path d="M 31 59 L 25 71" stroke="rgb(168,85,247)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="25" cy="72" r="3" fill="rgb(254,215,170)" />
  <!-- Right Arm holding microphone -->
  <path d="M 59 59 L 65 51" stroke="rgb(168,85,247)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="65" cy="49" r="3" fill="rgb(254,215,170)" />
  <!-- Microphone -->
  <line x1="65" y1="49" x2="61" y2="57" stroke="rgb(71,85,105)" stroke-width="3" stroke-linecap="round" />
  <circle cx="66" cy="43" r="4.5" fill="rgb(148,163,184)" stroke="rgb(51,65,85)" stroke-width="1.5" />
  <!-- Head -->
  <circle cx="45" cy="36" r="13" fill="rgb(254,215,170)" />
  <path d="M 31.2 34 C 30.2 16.9 59.8 16.9 58.8 34 Z" fill="rgb(51,65,85)" />
  <path d="M 38 35 Q 40.5 32 43 35" stroke="rgb(30,41,59)" stroke-width="2" fill="none" stroke-linecap="round" />
  <path d="M 47 35 Q 49.5 32 52 35" stroke="rgb(30,41,59)" stroke-width="2" fill="none" stroke-linecap="round" />
  <ellipse cx="45" cy="42" rx="3.5" ry="4" fill="rgb(225,29,72)" />
</svg>`;

// 15-3. 악기 (Instrument) - Colorful elementary instruments: tambourine & recorder
export const AKGI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <!-- Tambourine -->
  <circle cx="42" cy="54" r="20" fill="rgb(254,240,138)" stroke="rgb(217,119,6)" stroke-width="4" />
  <circle cx="42" cy="54" r="13" fill="rgb(255,251,235)" />
  <!-- Jingles around rim -->
  <circle cx="42" cy="34" r="3" fill="rgb(148,163,184)" />
  <circle cx="62" cy="54" r="3" fill="rgb(148,163,184)" />
  <circle cx="42" cy="74" r="3" fill="rgb(148,163,184)" />
  <circle cx="22" cy="54" r="3" fill="rgb(148,163,184)" />
  <!-- Recorder Flute on right -->
  <g transform="translate(68, 44) rotate(28)">
    <rect x="-4" y="-22" width="8" height="44" rx="2.5" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.8" />
    <circle cx="0" cy="-6" r="1.5" fill="rgb(59,130,246)" />
    <circle cx="0" cy="1" r="1.5" fill="rgb(59,130,246)" />
    <circle cx="0" cy="8" r="1.5" fill="rgb(59,130,246)" />
  </g>
</svg>`;

// 15-4. 연주해요 (Play instrument) - Colorful xylophone with two wooden mallets
export const YEONJUHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <!-- Xylophone Rainbow Bars -->
  <rect x="20" y="38" width="9" height="34" rx="3" fill="rgb(239,68,68)" />
  <rect x="31" y="40" width="9" height="30" rx="3" fill="rgb(249,115,22)" />
  <rect x="42" y="42" width="9" height="26" rx="3" fill="rgb(250,204,21)" />
  <rect x="53" y="44" width="9" height="22" rx="3" fill="rgb(34,197,94)" />
  <rect x="64" y="46" width="9" height="18" rx="3" fill="rgb(59,130,246)" />
  <!-- Wooden Mallets -->
  <line x1="25" y1="22" x2="36" y2="44" stroke="rgb(180,83,9)" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="36" cy="45" r="4" fill="rgb(217,119,6)" />
  <line x1="72" y1="24" x2="58" y2="46" stroke="rgb(180,83,9)" stroke-width="2.6" stroke-linecap="round" />
  <circle cx="58" cy="47" r="4" fill="rgb(217,119,6)" />
</svg>`;

// 15-5. 즐거워요 (Joyful / Fun) - Child leaping happily with arms up inside circle
export const JEULGEOWOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" opacity="0.75" />
  <ellipse cx="50" cy="83" rx="18" ry="3.5" fill="rgba(15,23,42,0.1)" />
  <!-- Joyful Stars -->
  <path d="M 24 28 L 25.5 24 L 27 28 L 31 29.5 L 27 31 L 25.5 35 L 24 31 L 20 29.5 Z" fill="rgb(245,158,11)" />
  <path d="M 74 26 L 75.5 22 L 77 26 L 81 27.5 L 77 29 L 75.5 33 L 74 29 L 70 27.5 Z" fill="rgb(236,72,153)" />
  <!-- Full Child Jumping -->
  <path d="M 45 60 L 38 72 L 42 76" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" fill="none" />
  <path d="M 55 60 L 62 72 L 58 76" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" fill="none" />
  <ellipse cx="43" cy="77" rx="3.8" ry="2.2" fill="rgb(239,68,68)" />
  <ellipse cx="57" cy="77" rx="3.8" ry="2.2" fill="rgb(239,68,68)" />
  <rect x="46.5" y="38" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 41 42 L 59 42 L 57 61 L 43 61 Z" fill="rgb(245,158,11)" />
  <path d="M 42 45 L 30 33" stroke="rgb(245,158,11)" stroke-width="4" stroke-linecap="round" />
  <path d="M 58 45 L 70 33" stroke="rgb(245,158,11)" stroke-width="4" stroke-linecap="round" />
  <circle cx="29" cy="31.5" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="71" cy="31.5" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="50" cy="28" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 38.7 26 C 37.9 12.7 62.1 12.7 61.3 26 Z" fill="rgb(51,65,85)" />
  <path d="M 44 27 Q 46.5 24 49 27" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <path d="M 51 27 Q 53.5 24 56 27" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <path d="M 46 31.5 Q 50 35.5 54 31.5" stroke="rgb(190,18,60)" stroke-width="1.8" fill="none" stroke-linecap="round" />
</svg>`;

// 15-6. 감동적이에요 (Touching / Moving) - Child holding hands over heart with warm pink heart & music note
export const GAMDONGJEOGIEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(253,242,248)" />
  <!-- Floating warm heart -->
  <path d="M 50 18 C 50 14 44 12 41 15 C 38 18 42 23 50 28 C 58 23 62 18 59 15 C 56 12 50 14 50 18 Z" fill="rgb(244,63,94)" />
  <!-- Child with complete neck & arms folded to heart -->
  <rect x="46" y="48" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 34 78 C 34 58 41 54 50 54 C 59 54 66 58 66 78 Z" fill="rgb(244,114,182)" />
  <path d="M 36 60 L 46 66" stroke="rgb(244,114,182)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 64 60 L 54 66" stroke="rgb(244,114,182)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="47" cy="66" r="3" fill="rgb(254,215,170)" />
  <circle cx="53" cy="66" r="3" fill="rgb(254,215,170)" />
  <!-- Head with sparkling moved eyes -->
  <circle cx="50" cy="36" r="13" fill="rgb(254,215,170)" />
  <path d="M 36.2 34 C 35.2 16.9 64.8 16.9 63.8 34 Z" fill="rgb(51,65,85)" />
  <circle cx="45" cy="35" r="2.2" fill="rgb(30,41,59)" />
  <circle cx="55" cy="35" r="2.2" fill="rgb(30,41,59)" />
  <circle cx="44" cy="34" r="1" fill="rgb(255,255,255)" />
  <circle cx="54" cy="34" r="1" fill="rgb(255,255,255)" />
  <circle cx="40" cy="39" r="2.2" fill="rgb(244,114,182)" opacity="0.65" />
  <circle cx="60" cy="39" r="2.2" fill="rgb(244,114,182)" opacity="0.65" />
  <path d="M 46 42 Q 50 45 54 42" stroke="rgb(190,18,60)" stroke-width="1.8" fill="none" stroke-linecap="round" />
</svg>`;

// 15-7. 쳐요 (Play / Beat) - Wooden drumsticks beating a bright school drum
export const CHYEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="76" rx="25" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Drum Body -->
  <path d="M 26 48 L 74 48 L 74 68 Q 50 76 26 68 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
  <!-- Drum Zigzag Rope -->
  <polyline points="28,50 37,68 46,50 55,68 64,50 72,68" fill="none" stroke="rgb(254,240,138)" stroke-width="2.2" stroke-linejoin="round" />
  <!-- Drum Top Membrane -->
  <ellipse cx="50" cy="48" rx="24" ry="8" fill="rgb(255,251,235)" stroke="rgb(217,119,6)" stroke-width="2" />
  <!-- Drumsticks -->
  <line x1="25" y1="24" x2="43" y2="46" stroke="rgb(180,83,9)" stroke-width="3" stroke-linecap="round" />
  <circle cx="44" cy="47" r="3" fill="rgb(217,119,6)" />
  <line x1="75" y1="24" x2="57" y2="46" stroke="rgb(180,83,9)" stroke-width="3" stroke-linecap="round" />
  <circle cx="56" cy="47" r="3" fill="rgb(217,119,6)" />
</svg>`;

// 15-8. 들어요 (Listen - Music) - Smiling child wearing cozy headphones listening to music notes
export const DEUREOYO_MUSIC_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <!-- Music notes -->
  <circle cx="24" cy="28" r="3" fill="rgb(99,102,241)" />
  <line x1="26.5" y1="28" x2="26.5" y2="18" stroke="rgb(99,102,241)" stroke-width="2" />
  <circle cx="76" cy="28" r="3" fill="rgb(236,72,153)" />
  <line x1="78.5" y1="28" x2="78.5" y2="18" stroke="rgb(236,72,153)" stroke-width="2" />
  <!-- Child body & neck -->
  <rect x="46" y="52" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 33 78 C 33 60 40 56 50 56 C 60 56 67 60 67 78 Z" fill="rgb(99,102,241)" />
  <!-- Headphone band -->
  <path d="M 33 39 A 17 17 0 0 1 67 39" fill="none" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <!-- Head -->
  <circle cx="50" cy="39" r="13.5" fill="rgb(254,215,170)" />
  <path d="M 35.7 37 C 34.6 19.3 65.4 19.3 64.3 37 Z" fill="rgb(51,65,85)" />
  <!-- Cozy Headphone Earcups -->
  <rect x="31" y="34" width="6" height="12" rx="3" fill="rgb(59,130,246)" stroke="rgb(30,58,138)" stroke-width="1.2" />
  <rect x="63" y="34" width="6" height="12" rx="3" fill="rgb(59,130,246)" stroke="rgb(30,58,138)" stroke-width="1.2" />
  <!-- Happy closed eyes -->
  <path d="M 42 39 Q 44.5 36.5 47 39" stroke="rgb(30,41,59)" stroke-width="2" fill="none" stroke-linecap="round" />
  <path d="M 53 39 Q 55.5 36.5 58 39" stroke="rgb(30,41,59)" stroke-width="2" fill="none" stroke-linecap="round" />
  <path d="M 46 45 Q 50 48.5 54 45" stroke="rgb(190,18,60)" stroke-width="1.8" fill="none" stroke-linecap="round" />
</svg>`;

// 15-9. 박수 (Clap) - Two complete clapping hands with sleeves/wrists & impact sparkles
export const BAKSU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <!-- Sparkles -->
  <line x1="50" y1="22" x2="50" y2="15" stroke="rgb(245,158,11)" stroke-width="2.5" stroke-linecap="round" />
  <line x1="36" y1="26" x2="31" y2="20" stroke="rgb(245,158,11)" stroke-width="2.5" stroke-linecap="round" />
  <line x1="64" y1="26" x2="69" y2="20" stroke="rgb(245,158,11)" stroke-width="2.5" stroke-linecap="round" />
  <!-- Left Hand & Wrist -->
  <g transform="translate(38, 52) rotate(-20)">
    <rect x="-5" y="12" width="10" height="12" rx="3" fill="rgb(59,130,246)" />
    <rect x="-7" y="-12" width="14" height="24" rx="7" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
  </g>
  <!-- Right Hand & Wrist -->
  <g transform="translate(62, 52) rotate(20)">
    <rect x="-5" y="12" width="10" height="12" rx="3" fill="rgb(16,185,129)" />
    <rect x="-7" y="-12" width="14" height="24" rx="7" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.8" />
  </g>
</svg>`;

// 15-10. 춤춰요 (Dance) - Happy kid dancing gracefully with full arms, hands, legs & shoes inside circle
export const CHUMCHWOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(253,242,248)" />
  <ellipse cx="50" cy="83" rx="22" ry="4" fill="rgba(236,72,153,0.18)" />
  <!-- Music notes -->
  <circle cx="74" cy="27" r="3" fill="rgb(168,85,247)" />
  <line x1="76.5" y1="27" x2="76.5" y2="17" stroke="rgb(168,85,247)" stroke-width="2" />
  <circle cx="24" cy="29" r="2.6" fill="rgb(236,72,153)" />
  <line x1="26.5" y1="29" x2="26.5" y2="20" stroke="rgb(236,72,153)" stroke-width="1.8" />
  <!-- Dancing Legs & Shoes -->
  <line x1="45" y1="60" x2="38" y2="75" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" />
  <line x1="55" y1="60" x2="63" y2="71" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" />
  <ellipse cx="37" cy="77" rx="4" ry="2.4" fill="rgb(236,72,153)" />
  <ellipse cx="64" cy="72.5" rx="4" ry="2.4" fill="rgb(236,72,153)" />
  <!-- Neck & Dress/Shirt -->
  <rect x="46.5" y="38" width="7" height="4" fill="rgb(254,215,170)" />
  <path d="M 41 42 L 59 42 L 62 61 L 38 61 Z" fill="rgb(236,72,153)" />
  <!-- Dancing Arms & Hands -->
  <path d="M 41 45 L 30 33" stroke="rgb(236,72,153)" stroke-width="4" stroke-linecap="round" />
  <path d="M 59 45 L 70 38" stroke="rgb(236,72,153)" stroke-width="4" stroke-linecap="round" />
  <circle cx="29" cy="32" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="71" cy="37" r="2.8" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="50" cy="28" r="10.5" fill="rgb(254,215,170)" />
  <path d="M 38.7 26 C 37.9 12.7 62.1 12.7 61.3 26 Z" fill="rgb(51,65,85)" />
  <path d="M 44 27 Q 46.5 24 49 27" stroke="rgb(30,41,59)" stroke-width="1.6" fill="none" />
  <path d="M 51 27 Q 53.5 24 56 27" stroke="rgb(30,41,59)" stroke-width="1.6" fill="none" />
  <path d="M 47 32 Q 50 35 53 32" stroke="rgb(190,18,60)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// ============================================================================
// CHAPTER 16: 안전 (Safety)
// ============================================================================

// 16-1. 교무실 (Staff room) - Clean school office door with "교무실" nameplate
export const GYOMUSIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <rect x="26" y="18" width="48" height="64" rx="4" fill="rgb(254,243,199)" stroke="rgb(180,83,9)" stroke-width="2.2" />
  <rect x="33" y="25" width="34" height="14" rx="2.5" fill="rgb(37,99,235)" />
  <text x="50" y="35" font-family="'Noto Sans KR', sans-serif" font-size="8.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">교무실</text>
  <rect x="34" y="44" width="32" height="16" rx="2" fill="rgb(224,242,254)" stroke="rgb(147,197,253)" stroke-width="1.5" />
  <circle cx="66" cy="64" r="3" fill="rgb(217,119,6)" />
</svg>`;

// 16-2. 도서관 (Library) - Neat wooden bookshelf packed with colorful books
export const DOSEOGWAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.65" />
  <rect x="22" y="20" width="56" height="60" rx="4" fill="rgb(217,119,6)" stroke="rgb(146,64,14)" stroke-width="2" />
  <rect x="26" y="24" width="48" height="24" fill="rgb(254,243,199)" />
  <rect x="26" y="52" width="48" height="24" fill="rgb(254,243,199)" />
  <!-- Top shelf books -->
  <rect x="28" y="28" width="8" height="20" fill="rgb(239,68,68)" />
  <rect x="37" y="30" width="7" height="18" fill="rgb(59,130,246)" />
  <rect x="45" y="27" width="9" height="21" fill="rgb(16,185,129)" />
  <rect x="55" y="31" width="7" height="17" fill="rgb(245,158,11)" />
  <!-- Bottom shelf books -->
  <rect x="29" y="56" width="9" height="20" fill="rgb(168,85,247)" />
  <rect x="39" y="58" width="8" height="18" fill="rgb(236,72,153)" />
  <rect x="48" y="55" width="8" height="21" fill="rgb(14,165,233)" />
  <rect x="58" y="60" width="13" height="16" fill="rgb(249,115,22)" />
</svg>`;

// 16-3. 과학실 (Science lab) - Bubbling Erlenmeyer flask & test tube
export const GWAHAKSIL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="79" rx="28" ry="4.5" fill="rgba(15,23,42,0.1)" />
  <!-- Conical Flask -->
  <path d="M 41 26 L 49 26 L 49 38 L 64 70 Q 65 74 60 74 L 30 74 Q 25 74 26 70 L 41 38 Z" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2.2" />
  <path d="M 33 56 L 57 56 L 63 70 Q 64 73 60 73 L 30 73 Q 26 73 27 70 Z" fill="rgb(52,211,153)" />
  <!-- Bubbles -->
  <circle cx="43" cy="64" r="2.5" fill="rgb(255,255,255)" />
  <circle cx="48" cy="52" r="2.2" fill="rgb(16,185,129)" />
  <circle cx="44" cy="20" r="2.5" fill="rgb(52,211,153)" />
  <!-- Test tube -->
  <g transform="translate(70, 50) rotate(14)">
    <rect x="-5" y="-18" width="10" height="36" rx="5" fill="rgb(255,255,255)" stroke="rgb(168,85,247)" stroke-width="2" />
    <path d="M -4 0 L 4 0 L 4 13 A 4 4 0 0 1 -4 13 Z" fill="rgb(192,132,252)" />
  </g>
</svg>`;

// 16-4. 복도 (Hallway) - Clean school corridor with right-side walking safety arrows
export const BOKDO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(241,245,249)" />
  <!-- Hallway perspective lines -->
  <polygon points="18,22 36,36 36,64 18,78" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="1.6" />
  <polygon points="82,22 64,36 64,64 82,78" fill="rgb(226,232,240)" stroke="rgb(148,163,184)" stroke-width="1.6" />
  <rect x="36" y="36" width="28" height="28" fill="rgb(248,250,252)" stroke="rgb(148,163,184)" stroke-width="1.6" />
  <!-- Corridor floor -->
  <polygon points="36,64 64,64 82,78 18,78" fill="rgb(254,243,199)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  <line x1="50" y1="64" x2="50" y2="78" stroke="rgb(16,185,129)" stroke-width="2" stroke-dasharray="3,2" />
  <!-- Green arrow for safe walking -->
  <path d="M 60 74 L 58 67 M 55 70 L 58 67 L 62 69" stroke="rgb(22,163,74)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;

// 16-5. 계단 (Stairs) - Safe school stairs with handrail & tidy steps
export const GYEDAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <!-- Staircase steps -->
  <path d="M 20 76 L 20 64 L 34 64 L 34 52 L 48 52 L 48 40 L 62 40 L 62 28 L 78 28 L 78 76 Z" fill="rgb(203,213,225)" stroke="rgb(71,85,105)" stroke-width="2" stroke-linejoin="round" />
  <!-- Handrail -->
  <line x1="22" y1="48" x2="66" y2="18" stroke="rgb(234,88,12)" stroke-width="3.5" stroke-linecap="round" />
  <line x1="26" y1="46" x2="26" y2="64" stroke="rgb(100,116,139)" stroke-width="2" />
  <line x1="60" y1="22" x2="60" y2="40" stroke="rgb(100,116,139)" stroke-width="2" />
</svg>`;

// 16-6. 교문 (School gate) - Welcoming elementary school brick gate & green trees
export const GYOMUN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <!-- Ground -->
  <path d="M 12 70 L 88 70 A 46 46 0 0 1 12 70 Z" fill="rgb(134,239,172)" />
  <!-- Left & Right Gate Pillars -->
  <rect x="20" y="34" width="14" height="38" rx="2" fill="rgb(251,146,60)" stroke="rgb(194,65,12)" stroke-width="1.8" />
  <rect x="66" y="34" width="14" height="38" rx="2" fill="rgb(251,146,60)" stroke="rgb(194,65,12)" stroke-width="1.8" />
  <!-- Top School Arch Sign -->
  <rect x="18" y="24" width="64" height="12" rx="3" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="1.6" />
  <text x="50" y="33" font-family="'Noto Sans KR', sans-serif" font-size="7.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">초등학교</text>
  <!-- Open Iron Gates -->
  <rect x="34" y="48" width="12" height="22" fill="none" stroke="rgb(71,85,105)" stroke-width="2" />
  <rect x="54" y="48" width="12" height="22" fill="none" stroke="rgb(71,85,105)" stroke-width="2" />
</svg>`;

// 16-7. 신발장 (Shoe rack) - Neat wooden cubbies with tidy pairs of shoes
export const SINBALJANG_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" opacity="0.65" />
  <!-- Wooden Shoe Cubby Frame -->
  <rect x="20" y="22" width="60" height="56" rx="4" fill="rgb(253,230,138)" stroke="rgb(180,83,9)" stroke-width="2.2" />
  <line x1="50" y1="22" x2="50" y2="78" stroke="rgb(180,83,9)" stroke-width="2" />
  <line x1="20" y1="50" x2="80" y2="50" stroke="rgb(180,83,9)" stroke-width="2" />
  <!-- Sneakers / Indoor shoes in cubbies -->
  <ellipse cx="30" cy="40" rx="5.5" ry="3.5" fill="rgb(59,130,246)" />
  <ellipse cx="41" cy="40" rx="5.5" ry="3.5" fill="rgb(59,130,246)" />
  <ellipse cx="60" cy="40" rx="5.5" ry="3.5" fill="rgb(239,68,68)" />
  <ellipse cx="71" cy="40" rx="5.5" ry="3.5" fill="rgb(239,68,68)" />
  <ellipse cx="30" cy="68" rx="5.5" ry="3.5" fill="rgb(16,185,129)" />
  <ellipse cx="41" cy="68" rx="5.5" ry="3.5" fill="rgb(16,185,129)" />
  <ellipse cx="60" cy="68" rx="5.5" ry="3.5" fill="rgb(245,158,11)" />
  <ellipse cx="71" cy="68" rx="5.5" ry="3.5" fill="rgb(245,158,11)" />
</svg>`;

// 16-8. 뛰지 마세요 (Don't run) - Red prohibition circle with running figure inside & diagonal slash
export const TTWIJI_MASEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <circle cx="50" cy="50" r="30" fill="rgb(255,255,255)" stroke="rgb(239,68,68)" stroke-width="5" />
  <!-- Running stick figure safely inside circle -->
  <circle cx="53" cy="34" r="5" fill="rgb(30,41,59)" />
  <path d="M 50 40 L 47 52 L 38 61" stroke="rgb(30,41,59)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <path d="M 48 52 L 58 58 L 57 67" stroke="rgb(30,41,59)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  <path d="M 48 43 L 40 46 M 48 43 L 58 46" stroke="rgb(30,41,59)" stroke-width="3.5" stroke-linecap="round" />
  <!-- Prohibition Slash -->
  <line x1="30" y1="30" x2="70" y2="70" stroke="rgb(239,68,68)" stroke-width="5" stroke-linecap="round" />
</svg>`;

// 16-9. 조용히 해요 (Be quiet) - Cute student gently placing finger to lips ("쉿!") inside circle
export const JOYONGHI_HAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(243,232,255)" />
  <!-- Neck & Body -->
  <rect x="46" y="49" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 33 78 C 33 58 40 54 50 54 C 60 54 67 58 67 78 Z" fill="rgb(139,92,246)" />
  <!-- Left arm resting neatly -->
  <path d="M 35 60 L 31 73" stroke="rgb(139,92,246)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="31" cy="74" r="2.8" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="50" cy="36" r="13.5" fill="rgb(254,215,170)" />
  <path d="M 35.7 34 C 34.6 16.3 65.4 16.3 64.3 34 Z" fill="rgb(51,65,85)" />
  <circle cx="45" cy="35" r="2" fill="rgb(30,41,59)" />
  <circle cx="55" cy="35" r="2" fill="rgb(30,41,59)" />
  <circle cx="50" cy="43" r="1.8" fill="rgb(190,18,60)" />
  <!-- Right Arm & Finger Shushing at Lips -->
  <path d="M 64 60 L 54 49" stroke="rgb(139,92,246)" stroke-width="4.5" stroke-linecap="round" />
  <rect x="48.5" y="39" width="3" height="10" rx="1.5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1" />
  <text x="72" y="34" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(126,34,206)">쉿!</text>
</svg>`;

// 16-10. 조심해요 (Be careful) - Bright yellow triangular caution sign ! & wet puddle
export const JOSIMHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <!-- Wet Puddle below -->
  <ellipse cx="50" cy="74" rx="24" ry="6" fill="rgb(125,211,252)" stroke="rgb(56,189,248)" stroke-width="1.5" />
  <!-- Warning Triangle -->
  <polygon points="50,20 76,66 24,66" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="3" stroke-linejoin="round" />
  <rect x="47.5" y="34" width="5" height="18" rx="2.5" fill="rgb(30,41,59)" />
  <circle cx="50" cy="58" r="3" fill="rgb(30,41,59)" />
</svg>`;

// ============================================================================
// CHAPTER 17: 일상 (Daily Life)
// ============================================================================

// 17-1. 안녕히 계세요 (Goodbye - leaving) - Polite student bowing goodbye with backpack
export const ANNYEONGHI_GYESEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <ellipse cx="50" cy="83" rx="22" ry="4" fill="rgba(15,23,42,0.1)" />
  <!-- Legs & Shoes -->
  <line x1="45" y1="62" x2="44" y2="78" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" />
  <line x1="54" y1="62" x2="56" y2="78" stroke="rgb(30,41,59)" stroke-width="4.5" stroke-linecap="round" />
  <ellipse cx="43" cy="80" rx="4" ry="2.4" fill="rgb(59,130,246)" />
  <ellipse cx="57" cy="80" rx="4" ry="2.4" fill="rgb(59,130,246)" />
  <!-- Backpack -->
  <rect x="33" y="42" width="10" height="16" rx="3" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.5" />
  <!-- Bowing Torso & Neck -->
  <path d="M 41 44 L 58 46 L 56 63 L 42 63 Z" fill="rgb(59,130,246)" />
  <!-- Polite clasped hands in front -->
  <path d="M 55 49 L 61 59" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <circle cx="61.5" cy="60.5" r="3" fill="rgb(254,215,170)" />
  <!-- Bowing Head -->
  <circle cx="56" cy="34" r="11" fill="rgb(254,215,170)" />
  <path d="M 44.2 32 C 43.3 17.6 68.7 17.6 67.8 32 Z" fill="rgb(51,65,85)" />
  <path d="M 56 35 Q 58.5 33 61 35" stroke="rgb(30,41,59)" stroke-width="1.6" fill="none" />
  <path d="M 55 39 Q 58 41.5 61 39" stroke="rgb(190,18,60)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// 17-2. 안녕히 가세요 (Goodbye - staying/waving) - Smiling teacher waving warm goodbye
export const ANNYEONGHI_GASEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" opacity="0.75" />
  <!-- Neck & Outfit -->
  <rect x="44" y="49" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 32 78 C 32 58 39 54 48 54 C 57 54 64 58 64 78 Z" fill="rgb(2,132,199)" />
  <!-- Left arm resting -->
  <path d="M 33 59 L 28 72" stroke="rgb(2,132,199)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="28" cy="73" r="3" fill="rgb(254,215,170)" />
  <!-- Right waving arm & open hand inside circle -->
  <path d="M 63 58 L 72 42" stroke="rgb(2,132,199)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="73" cy="39" r="3.8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <path d="M 78 32 Q 81 36 78 40" stroke="rgb(245,158,11)" stroke-width="2" fill="none" stroke-linecap="round" />
  <!-- Head & Bun -->
  <circle cx="48" cy="21" r="4.5" fill="rgb(67,56,202)" />
  <circle cx="48" cy="36" r="13" fill="rgb(254,215,170)" />
  <path d="M 34.2 34 C 33.2 16.9 62.8 16.9 61.8 34 Z" fill="rgb(67,56,202)" />
  <circle cx="44" cy="36" r="1.9" fill="rgb(30,41,59)" />
  <circle cx="52" cy="36" r="1.9" fill="rgb(30,41,59)" />
  <path d="M 44 42 Q 48 45.5 52 42" stroke="rgb(190,18,60)" stroke-width="1.8" fill="none" stroke-linecap="round" />
</svg>`;

// 17-3. 네 (Yes) - Cheerful nodding child with big emerald checkmark / O sign
export const NE_YES_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <!-- Big Green O Badge -->
  <circle cx="71" cy="28" r="10" fill="rgb(34,197,94)" />
  <circle cx="71" cy="28" r="5" fill="none" stroke="rgb(255,255,255)" stroke-width="2.5" />
  <!-- Child with complete neck & arms -->
  <rect x="41" y="50" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 30 78 C 30 58 37 54 45 54 C 53 54 60 58 60 78 Z" fill="rgb(16,185,129)" />
  <path d="M 32 60 L 26 72" stroke="rgb(16,185,129)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 58 60 L 64 72" stroke="rgb(16,185,129)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="26" cy="73" r="3" fill="rgb(254,215,170)" />
  <circle cx="64" cy="73" r="3" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="45" cy="38" r="13" fill="rgb(254,215,170)" />
  <path d="M 31.2 36 C 30.2 18.9 59.8 18.9 58.8 36 Z" fill="rgb(51,65,85)" />
  <path d="M 38 37 Q 40.5 34 43 37" stroke="rgb(30,41,59)" stroke-width="2" fill="none" stroke-linecap="round" />
  <path d="M 47 37 Q 49.5 34 52 37" stroke="rgb(30,41,59)" stroke-width="2" fill="none" stroke-linecap="round" />
  <path d="M 41 43 Q 45 47 49 43" stroke="rgb(190,18,60)" stroke-width="2" fill="none" stroke-linecap="round" />
</svg>`;

// 17-4. 아니요 (No) - Polite child gesturing X / no with both hands inside circle
export const ANIYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <!-- Red X Badge -->
  <circle cx="71" cy="28" r="10" fill="rgb(239,68,68)" />
  <line x1="67" y1="24" x2="75" y2="32" stroke="rgb(255,255,255)" stroke-width="2.5" stroke-linecap="round" />
  <line x1="75" y1="24" x2="67" y2="32" stroke="rgb(255,255,255)" stroke-width="2.5" stroke-linecap="round" />
  <!-- Child with complete neck & crossed arms -->
  <rect x="41" y="50" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 30 78 C 30 58 37 54 45 54 C 53 54 60 58 60 78 Z" fill="rgb(249,115,22)" />
  <path d="M 33 60 L 53 70" stroke="rgb(249,115,22)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M 57 60 L 37 70" stroke="rgb(249,115,22)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="54" cy="70" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="36" cy="70" r="2.8" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="45" cy="38" r="13" fill="rgb(254,215,170)" />
  <path d="M 31.2 36 C 30.2 18.9 59.8 18.9 58.8 36 Z" fill="rgb(51,65,85)" />
  <circle cx="40.5" cy="37" r="1.9" fill="rgb(30,41,59)" />
  <circle cx="49.5" cy="37" r="1.9" fill="rgb(30,41,59)" />
  <line x1="42" y1="44" x2="48" y2="44" stroke="rgb(190,18,60)" stroke-width="2" stroke-linecap="round" />
</svg>`;

// 17-5. 모르겠어요 (I don't know) - Curious child tilting head with ? bubble
export const MOREUGESSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(238,242,255)" />
  <circle cx="71" cy="27" r="10" fill="rgb(99,102,241)" />
  <text x="71" y="32" font-family="'Nunito', sans-serif" font-size="14" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">?</text>
  <rect x="41" y="50" width="8" height="5" fill="rgb(254,215,170)" />
  <path d="M 30 78 C 30 58 37 54 45 54 C 53 54 60 58 60 78 Z" fill="rgb(99,102,241)" />
  <!-- Thinking arm to chin -->
  <path d="M 33 60 L 27 72" stroke="rgb(99,102,241)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="27" cy="73" r="3" fill="rgb(254,215,170)" />
  <path d="M 57 60 L 51 50" stroke="rgb(99,102,241)" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="50" cy="49" r="3" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="45" cy="38" r="13" fill="rgb(254,215,170)" />
  <path d="M 31.2 36 C 30.2 18.9 59.8 18.9 58.8 36 Z" fill="rgb(51,65,85)" />
  <circle cx="40.5" cy="37" r="1.9" fill="rgb(30,41,59)" />
  <circle cx="49.5" cy="37" r="1.9" fill="rgb(30,41,59)" />
  <path d="M 42 44 Q 45 42 48 44" stroke="rgb(190,18,60)" stroke-width="1.8" fill="none" stroke-linecap="round" />
</svg>`;

// 17-6. 알겠어요 (I understand) - Smiling child with glowing yellow lightbulb above head
export const ALGESSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.7" />
  <!-- Bright Lightbulb -->
  <circle cx="50" cy="21" r="7.5" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  <rect x="47.5" y="28" width="5" height="3.5" rx="1" fill="rgb(148,163,184)" />
  <line x1="39" y1="21" x2="34" y2="21" stroke="rgb(245,158,11)" stroke-width="2" stroke-linecap="round" />
  <line x1="61" y1="21" x2="66" y2="21" stroke="rgb(245,158,11)" stroke-width="2" stroke-linecap="round" />
  <!-- Child -->
  <rect x="46" y="53" width="8" height="4" fill="rgb(254,215,170)" />
  <path d="M 35 78 C 35 61 41 57 50 57 C 59 57 65 61 65 78 Z" fill="rgb(59,130,246)" />
  <path d="M 36 62 L 30 73" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <path d="M 64 62 L 70 73" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <circle cx="30" cy="74" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="70" cy="74" r="2.8" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="50" cy="43" r="12" fill="rgb(254,215,170)" />
  <path d="M 37.2 41 C 36.2 25.3 63.8 25.3 62.8 41 Z" fill="rgb(51,65,85)" />
  <circle cx="46" cy="43" r="1.9" fill="rgb(30,41,59)" />
  <circle cx="54" cy="43" r="1.9" fill="rgb(30,41,59)" />
  <path d="M 46 48 Q 50 52 54 48" stroke="rgb(190,18,60)" stroke-width="1.8" fill="none" stroke-linecap="round" />
</svg>`;

// 17-7. 다시 말씀해 주세요 (Please say again) - Speech bubble with circular repeat arrow
export const DASI_MALSSEUMHAE_JUSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <!-- Speech Bubble -->
  <rect x="20" y="24" width="60" height="44" rx="14" fill="rgb(255,255,255)" stroke="rgb(14,165,233)" stroke-width="2.5" />
  <polygon points="34,67 27,76 44,68" fill="rgb(255,255,255)" stroke="rgb(14,165,233)" stroke-width="2.2" stroke-linejoin="round" />
  <!-- Repeat Circular Arrow inside -->
  <path d="M 61 46 A 12 12 0 1 1 56 36" fill="none" stroke="rgb(2,132,199)" stroke-width="4" stroke-linecap="round" />
  <polygon points="58,31 62,40 52,39" fill="rgb(2,132,199)" />
</svg>`;

// 17-8. 주말 잘 보냈어요? (Did you have a good weekend?) - Weekend calendar with smiling sun
export const JUMAL_JAL_BONAESSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <!-- Calendar Card -->
  <rect x="22" y="24" width="56" height="52" rx="6" fill="rgb(255,255,255)" stroke="rgb(249,115,22)" stroke-width="2.2" />
  <rect x="22" y="24" width="56" height="14" rx="4" fill="rgb(249,115,22)" />
  <text x="50" y="34" font-family="'Noto Sans KR', sans-serif" font-size="8.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">토 · 일 주말</text>
  <!-- Smiling sun inside weekend calendar -->
  <circle cx="50" cy="56" r="11" fill="rgb(250,204,21)" />
  <circle cx="46.5" cy="54.5" r="1.4" fill="rgb(120,53,15)" />
  <circle cx="53.5" cy="54.5" r="1.4" fill="rgb(120,53,15)" />
  <path d="M 46.5 58.5 Q 50 61.5 53.5 58.5" stroke="rgb(120,53,15)" stroke-width="1.5" fill="none" stroke-linecap="round" />
</svg>`;

// 17-9. 사랑해요 (I love you) - Smiling child making big overhead heart with both arms inside circle
export const SARANGHAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(253,242,248)" />
  <!-- Floating pink heart -->
  <path d="M 50 18 C 50 14 45 12 42 15 C 39 18 43 22 50 27 C 57 22 61 18 58 15 C 55 12 50 14 50 18 Z" fill="rgb(244,63,94)" />
  <!-- Child neck & torso -->
  <rect x="46" y="51" width="8" height="4" fill="rgb(254,215,170)" />
  <path d="M 35 78 C 35 59 41 55 50 55 C 59 55 65 59 65 78 Z" fill="rgb(244,63,94)" />
  <!-- Both arms curved upward forming big heart above head -->
  <path d="M 36 59 Q 22 38 44 26" stroke="rgb(244,63,94)" stroke-width="4.5" stroke-linecap="round" fill="none" />
  <path d="M 64 59 Q 78 38 56 26" stroke="rgb(244,63,94)" stroke-width="4.5" stroke-linecap="round" fill="none" />
  <circle cx="46" cy="26" r="2.8" fill="rgb(254,215,170)" />
  <circle cx="54" cy="26" r="2.8" fill="rgb(254,215,170)" />
  <!-- Head -->
  <circle cx="50" cy="41" r="11.5" fill="rgb(254,215,170)" />
  <path d="M 37.7 39 C 36.8 23.9 63.2 23.9 62.3 39 Z" fill="rgb(51,65,85)" />
  <path d="M 43 40 Q 45.5 37.5 48 40" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <path d="M 52 40 Q 54.5 37.5 57 40" stroke="rgb(30,41,59)" stroke-width="1.8" fill="none" stroke-linecap="round" />
  <path d="M 46 45 Q 50 48.5 54 45" stroke="rgb(190,18,60)" stroke-width="1.8" fill="none" stroke-linecap="round" />
</svg>`;

// 17-10. 최고예요 (You're the best) - Shining golden trophy & sparkling thumbs up
export const CHOEGOYEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" opacity="0.75" />
  <!-- Gold Trophy -->
  <path d="M 34 26 L 66 26 L 62 48 Q 50 58 38 48 Z" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="2" />
  <path d="M 34 30 C 24 30 24 44 36 44" fill="none" stroke="rgb(202,138,4)" stroke-width="2.5" />
  <path d="M 66 30 C 76 30 76 44 64 44" fill="none" stroke="rgb(202,138,4)" stroke-width="2.5" />
  <rect x="46" y="54" width="8" height="12" fill="rgb(234,179,8)" />
  <rect x="34" y="66" width="32" height="9" rx="2.5" fill="rgb(180,83,9)" />
  <!-- Star on trophy -->
  <path d="M 50 32 L 52 37 L 57 37 L 53 40 L 54.5 45 L 50 42 L 45.5 45 L 47 40 L 43 37 L 48 37 Z" fill="rgb(255,255,255)" />
  <!-- Sparkles -->
  <path d="M 24 24 L 25.5 20 L 27 24 L 31 25.5 L 27 27 L 25.5 31 L 24 27 L 20 25.5 Z" fill="rgb(245,158,11)" />
  <path d="M 75 24 L 76.5 20 L 78 24 L 82 25.5 L 78 27 L 76.5 31 L 75 27 L 71 25.5 Z" fill="rgb(245,158,11)" />
</svg>`;
