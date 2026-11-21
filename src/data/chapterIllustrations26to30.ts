/**
 * Vector SVG Illustrations for Chapters 26 to 30
 * Art style unified with existing Classroom Vocab picture cards (circular pastel background, subtle ground shadow, clean child-friendly vectors, safe RGB data URIs).
 */

// ============================================================================
// CHAPTER 26: 사람·학교 (People & School)
// ============================================================================

// 26-1. 학교 (School) - Warm red-brick elementary school building with clock & flag
export const HAKGYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="36" ry="5" fill="rgba(15,23,42,0.12)" />
  <!-- Main School Building -->
  <rect x="16" y="42" width="68" height="40" rx="3" fill="rgb(254,243,199)" stroke="rgb(217,119,6)" stroke-width="2" />
  <!-- Roofs -->
  <polygon points="12,42 88,42 82,34 18,34" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="1.5" />
  <!-- Center Clock Tower -->
  <rect x="38" y="22" width="24" height="20" rx="2" fill="rgb(253,230,138)" stroke="rgb(217,119,6)" stroke-width="1.8" />
  <polygon points="34,22 50,12 66,22" fill="rgb(220,38,38)" />
  <!-- Clock -->
  <circle cx="50" cy="31" r="6" fill="rgb(255,255,255)" stroke="rgb(51,65,85)" stroke-width="1.5" />
  <line x1="50" y1="31" x2="50" y2="27" stroke="rgb(30,41,59)" stroke-width="1.5" stroke-linecap="round" />
  <line x1="50" y1="31" x2="53" y2="31" stroke="rgb(30,41,59)" stroke-width="1.5" stroke-linecap="round" />
  <!-- Windows -->
  <rect x="21" y="48" width="10" height="10" rx="1.5" fill="rgb(125,211,252)" stroke="rgb(2,132,199)" stroke-width="1.2" />
  <rect x="21" y="63" width="10" height="10" rx="1.5" fill="rgb(125,211,252)" stroke="rgb(2,132,199)" stroke-width="1.2" />
  <rect x="69" y="48" width="10" height="10" rx="1.5" fill="rgb(125,211,252)" stroke="rgb(2,132,199)" stroke-width="1.2" />
  <rect x="69" y="63" width="10" height="10" rx="1.5" fill="rgb(125,211,252)" stroke="rgb(2,132,199)" stroke-width="1.2" />
  <!-- Entrance Door -->
  <rect x="42" y="62" width="16" height="20" rx="2" fill="rgb(180,83,9)" />
  <rect x="44" y="48" width="12" height="8" rx="1" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1" />
  <text x="50" y="54" font-family="'Noto Sans KR', sans-serif" font-size="5.5" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">학교</text>
</svg>`;

// 26-2. 남자 (Boy / Male) - Cheerful boy with short hair & blue cap/shirt
export const NAMJA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(219,234,254)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Shirt -->
  <path d="M 28 84 C 28 66 38 62 50 62 C 62 62 72 66 72 84 Z" fill="rgb(37,99,235)" />
  <path d="M 44 62 L 50 69 L 56 62 Z" fill="rgb(255,255,255)" />
  <!-- Neck & Face -->
  <rect x="45" y="55" width="10" height="9" fill="rgb(254,215,170)" />
  <circle cx="50" cy="40" r="19" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.4" />
  <!-- Short Spiky Hair -->
  <path d="M 30.2 38 C 28.7 12.4 71.3 12.4 69.8 38 C 66 31 58 29 52 33 C 48 28 38 30 30.2 38 Z" fill="rgb(30,41,59)" />
  <!-- Eyes & Smile -->
  <circle cx="42" cy="41" r="2.4" fill="rgb(30,41,59)" />
  <circle cx="58" cy="41" r="2.4" fill="rgb(30,41,59)" />
  <circle cx="37" cy="46" r="3" fill="rgb(251,113,133)" opacity="0.55" />
  <circle cx="63" cy="46" r="3" fill="rgb(251,113,133)" opacity="0.55" />
  <path d="M 44 48 Q 50 54 56 48" stroke="rgb(190,18,60)" stroke-width="2" fill="none" stroke-linecap="round" />
</svg>`;

// 26-3. 여자 (Girl / Female) - Cheerful girl with cute twin pigtails & pink shirt
export const YEOJA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(252,231,243)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Pigtails -->
  <circle cx="24" cy="40" r="9" fill="rgb(71,44,30)" />
  <circle cx="76" cy="40" r="9" fill="rgb(71,44,30)" />
  <circle cx="30" cy="34" r="3.5" fill="rgb(244,63,94)" />
  <circle cx="70" cy="34" r="3.5" fill="rgb(244,63,94)" />
  <!-- Dress / Shirt -->
  <path d="M 28 84 C 28 66 38 62 50 62 C 62 62 72 66 72 84 Z" fill="rgb(244,63,94)" />
  <path d="M 43 62 L 50 70 L 57 62 Z" fill="rgb(255,255,255)" />
  <!-- Neck & Face -->
  <rect x="45" y="55" width="10" height="9" fill="rgb(254,215,170)" />
  <circle cx="50" cy="40" r="19" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.4" />
  <!-- Bangs -->
  <path d="M 30.2 38 C 28.7 12.4 71.3 12.4 69.8 38 C 65 32 56 32 50 35 C 44 32 35 32 30.2 38 Z" fill="rgb(71,44,30)" />
  <!-- Eyes & Smile -->
  <circle cx="42" cy="42" r="2.4" fill="rgb(30,41,59)" />
  <circle cx="58" cy="42" r="2.4" fill="rgb(30,41,59)" />
  <circle cx="37" cy="47" r="3.2" fill="rgb(244,114,182)" opacity="0.65" />
  <circle cx="63" cy="47" r="3.2" fill="rgb(244,114,182)" opacity="0.65" />
  <path d="M 44 49 Q 50 55 56 49" stroke="rgb(190,18,60)" stroke-width="2" fill="none" stroke-linecap="round" />
</svg>`;

// 26-4. 아이 (Child / Kid) - Playful elementary child holding yellow pinwheel/star
export const AI_CHILD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Yellow Kindergarten/Elementary Hat -->
  <ellipse cx="50" cy="24" rx="18" ry="7" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.5" />
  <path d="M 35 24 C 35 12 65 12 65 24 Z" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="1.5" />
  <!-- Small cheerful body -->
  <rect x="35" y="58" width="30" height="22" rx="8" fill="rgb(34,197,94)" />
  <circle cx="50" cy="42" r="16" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.4" />
  <circle cx="44" cy="41" r="2.2" fill="rgb(30,41,59)" />
  <circle cx="56" cy="41" r="2.2" fill="rgb(30,41,59)" />
  <circle cx="39" cy="45" r="2.8" fill="rgb(251,113,133)" opacity="0.65" />
  <circle cx="61" cy="45" r="2.8" fill="rgb(251,113,133)" opacity="0.65" />
  <path d="M 45 48 Q 50 53 55 48" stroke="rgb(190,18,60)" stroke-width="2" fill="none" stroke-linecap="round" />
  <!-- Raised happy arms -->
  <path d="M 35 64 L 22 52" stroke="rgb(34,197,94)" stroke-width="6" stroke-linecap="round" />
  <path d="M 65 64 L 78 52" stroke="rgb(34,197,94)" stroke-width="6" stroke-linecap="round" />
  <circle cx="21" cy="51" r="4" fill="rgb(254,215,170)" />
  <circle cx="79" cy="51" r="4" fill="rgb(254,215,170)" />
</svg>`;

// 26-5. 반 (Class / Homeroom) - Classroom door sign "1학년 2반"
export const BAN_CLASS_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Door -->
  <rect x="24" y="16" width="52" height="66" rx="4" fill="rgb(254,243,199)" stroke="rgb(180,83,9)" stroke-width="2.5" />
  <rect x="32" y="22" width="36" height="18" rx="3" fill="rgb(186,230,253)" stroke="rgb(14,165,233)" stroke-width="1.5" />
  <!-- Class Plaque -->
  <rect x="28" y="45" width="44" height="18" rx="4" fill="rgb(16,185,129)" stroke="rgb(5,150,105)" stroke-width="1.5" />
  <text x="50" y="57.5" font-family="'Noto Sans KR', sans-serif" font-size="10.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">1반 · 2반</text>
  <!-- Door knob -->
  <circle cx="67" cy="68" r="3" fill="rgb(217,119,6)" />
</svg>`;

// 26-6. 학년 (Grade level) - Escalating grade steps 1, 2, 3
export const HAKNYEON_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="84" rx="32" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Grade Steps -->
  <rect x="16" y="58" width="22" height="24" rx="3" fill="rgb(196,181,253)" stroke="rgb(124,58,237)" stroke-width="1.5" />
  <rect x="39" y="44" width="22" height="38" rx="3" fill="rgb(167,139,250)" stroke="rgb(124,58,237)" stroke-width="1.5" />
  <rect x="62" y="28" width="22" height="54" rx="3" fill="rgb(139,92,246)" stroke="rgb(109,40,217)" stroke-width="1.5" />
  <text x="27" y="74" font-family="'Noto Sans KR', sans-serif" font-size="11" font-weight="900" fill="rgb(76,29,149)" text-anchor="middle">1</text>
  <text x="50" y="64" font-family="'Noto Sans KR', sans-serif" font-size="12" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">2</text>
  <text x="73" y="54" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">3</text>
  <text x="50" y="22" font-family="'Noto Sans KR', sans-serif" font-size="11" font-weight="900" fill="rgb(109,40,217)" text-anchor="middle">학년 🎓</text>
</svg>`;

// 26-7. 학교에 가요 (Go to school) - Kid with backpack walking toward school
export const HAKGYO_E_GAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="34" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Mini School on right -->
  <rect x="54" y="42" width="32" height="34" rx="2" fill="rgb(254,226,226)" stroke="rgb(220,38,38)" stroke-width="1.8" />
  <polygon points="51,42 70,28 89,42" fill="rgb(239,68,68)" />
  <rect x="65" y="58" width="10" height="18" fill="rgb(180,83,9)" />
  <!-- Walking Student with Backpack on left -->
  <rect x="20" y="50" width="9" height="14" rx="3" fill="rgb(249,115,22)" />
  <circle cx="33" cy="40" r="10" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <rect x="26" y="50" width="14" height="17" rx="4" fill="rgb(59,130,246)" />
  <line x1="29" y1="67" x2="25" y2="79" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  <line x1="36" y1="67" x2="42" y2="78" stroke="rgb(30,41,59)" stroke-width="3" stroke-linecap="round" />
  <!-- Motion arrow -->
  <path d="M 42 52 L 51 52" stroke="rgb(217,119,6)" stroke-width="2.5" stroke-linecap="round" />
  <polygon points="52,52 47,48 47,56" fill="rgb(217,119,6)" />
</svg>`;

// 26-8. 남자아이예요 (He is a boy) - Boy pointing at himself proudly
export const NAMJAAI_YEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Baseball cap boy -->
  <path d="M 32 82 C 32 66 40 62 50 62 C 60 62 68 66 68 82 Z" fill="rgb(14,165,233)" />
  <circle cx="50" cy="44" r="17" fill="rgb(254,215,170)" stroke="rgb(2,132,199)" stroke-width="1.4" />
  <!-- Blue Cap -->
  <path d="M 33 38 C 33 22 67 22 67 38 Z" fill="rgb(37,99,235)" />
  <rect x="33" y="34" width="42" height="5" rx="2.5" fill="rgb(29,78,216)" />
  <circle cx="43" cy="45" r="2.2" fill="rgb(30,41,59)" />
  <circle cx="57" cy="45" r="2.2" fill="rgb(30,41,59)" />
  <path d="M 45 52 Q 50 56 55 52" stroke="rgb(190,18,60)" stroke-width="2" fill="none" stroke-linecap="round" />
  <!-- Badge -->
  <rect x="42" y="67" width="16" height="10" rx="2" fill="rgb(255,255,255)" />
  <text x="50" y="74.5" font-family="'Noto Sans KR', sans-serif" font-size="6.5" font-weight="900" fill="rgb(37,99,235)" text-anchor="middle">남자</text>
</svg>`;

// 26-9. 몇 학년이에요? (What grade are you in?) - Question bubble + 1,2,3 grade badges
export const MYEOT_HAKNYEON_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="16" y="22" width="68" height="36" rx="10" fill="rgb(255,255,255)" stroke="rgb(245,158,11)" stroke-width="2.5" />
  <polygon points="42,58 50,68 56,58" fill="rgb(255,255,255)" stroke="rgb(245,158,11)" stroke-width="2" />
  <text x="50" y="39" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">1? 2? 3?</text>
  <text x="50" y="52" font-family="'Noto Sans KR', sans-serif" font-size="9.5" font-weight="900" fill="rgb(217,119,6)" text-anchor="middle">몇 학년?</text>
  <circle cx="30" cy="76" r="8" fill="rgb(59,130,246)" />
  <circle cx="50" cy="76" r="8" fill="rgb(16,185,129)" />
  <circle cx="70" cy="76" r="8" fill="rgb(244,63,94)" />
  <text x="30" y="80" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">1</text>
  <text x="50" y="80" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">2</text>
  <text x="70" y="80" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">3</text>
</svg>`;

// 26-10. 우리 반이에요 (This is our class) - Three smiling classmates with banner
export const URI_BAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="34" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Banner -->
  <rect x="20" y="18" width="60" height="18" rx="6" fill="rgb(244,63,94)" />
  <text x="50" y="30.5" font-family="'Noto Sans KR', sans-serif" font-size="9.5" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">우리 반 ♥</text>
  <!-- 3 Classmates -->
  <circle cx="28" cy="50" r="9" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <rect x="20" y="60" width="16" height="18" rx="4" fill="rgb(59,130,246)" />
  <circle cx="50" cy="48" r="10" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <rect x="41" y="59" width="18" height="20" rx="4" fill="rgb(250,204,21)" />
  <circle cx="72" cy="50" r="9" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <rect x="64" y="60" width="16" height="18" rx="4" fill="rgb(34,197,94)" />
</svg>`;

// ============================================================================
// CHAPTER 27: 교통·길 (Transportation & Places)
// ============================================================================

// 27-1. 차 (Car) - Friendly red compact car
export const CHA_CAR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <ellipse cx="50" cy="76" rx="36" ry="5" fill="rgba(15,23,42,0.14)" />
  <!-- Car Roof -->
  <path d="M 28 48 L 36 32 L 66 32 L 74 48 Z" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
  <!-- Car Windows -->
  <polygon points="33,46 39,35 49,35 49,46" fill="rgb(186,230,253)" />
  <polygon points="52,46 52,35 63,35 69,46" fill="rgb(186,230,253)" />
  <!-- Car Body -->
  <rect x="14" y="47" width="72" height="21" rx="8" fill="rgb(239,68,68)" stroke="rgb(185,28,28)" stroke-width="2" />
  <!-- Headlight -->
  <circle cx="81" cy="56" r="3.5" fill="rgb(254,240,138)" />
  <!-- Wheels -->
  <circle cx="30" cy="69" r="9" fill="rgb(30,41,59)" />
  <circle cx="30" cy="69" r="4.5" fill="rgb(203,213,225)" />
  <circle cx="70" cy="69" r="9" fill="rgb(30,41,59)" />
  <circle cx="70" cy="69" r="4.5" fill="rgb(203,213,225)" />
</svg>`;

// 27-2. 버스 (Bus) - Bright blue/green Korean city & school bus
export const BEOS_BUS_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="78" rx="38" ry="5" fill="rgba(15,23,42,0.14)" />
  <!-- Bus Body -->
  <rect x="12" y="28" width="76" height="42" rx="8" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="2" />
  <rect x="12" y="54" width="76" height="7" fill="rgb(250,204,21)" />
  <!-- Windows -->
  <rect x="17" y="34" width="14" height="15" rx="2" fill="rgb(224,242,254)" />
  <rect x="35" y="34" width="14" height="15" rx="2" fill="rgb(224,242,254)" />
  <rect x="53" y="34" width="14" height="15" rx="2" fill="rgb(224,242,254)" />
  <rect x="71" y="34" width="12" height="22" rx="2" fill="rgb(186,230,253)" />
  <!-- Wheels -->
  <circle cx="29" cy="71" r="8.5" fill="rgb(30,41,59)" />
  <circle cx="29" cy="71" r="4" fill="rgb(203,213,225)" />
  <circle cx="71" cy="71" r="8.5" fill="rgb(30,41,59)" />
  <circle cx="71" cy="71" r="4" fill="rgb(203,213,225)" />
</svg>`;

// 27-3. 지하철 (Subway) - Sleek silver & green metro train front
export const JIHACHEOL_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="32" ry="5" fill="rgba(15,23,42,0.12)" />
  <!-- Rails -->
  <line x1="28" y1="78" x2="22" y2="88" stroke="rgb(100,116,139)" stroke-width="3" stroke-linecap="round" />
  <line x1="72" y1="78" x2="78" y2="88" stroke="rgb(100,116,139)" stroke-width="3" stroke-linecap="round" />
  <!-- Subway Car -->
  <rect x="26" y="18" width="48" height="60" rx="12" fill="rgb(241,245,249)" stroke="rgb(71,85,105)" stroke-width="2.5" />
  <rect x="26" y="54" width="48" height="9" fill="rgb(16,185,129)" />
  <!-- Windshield -->
  <rect x="33" y="28" width="34" height="20" rx="4" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="1.5" />
  <!-- Headlights -->
  <circle cx="35" cy="69" r="3.5" fill="rgb(253,224,71)" />
  <circle cx="65" cy="69" r="3.5" fill="rgb(253,224,71)" />
  <rect x="42" y="21" width="16" height="4" rx="2" fill="rgb(16,185,129)" />
</svg>`;

// 27-4. 자전거 (Bicycle) - Bright orange kid's bicycle
export const JAJEONGEO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="50" cy="78" rx="34" ry="4" fill="rgba(15,23,42,0.1)" />
  <!-- Wheels -->
  <circle cx="28" cy="62" r="14" fill="none" stroke="rgb(30,41,59)" stroke-width="3.5" />
  <circle cx="28" cy="62" r="3" fill="rgb(148,163,184)" />
  <circle cx="72" cy="62" r="14" fill="none" stroke="rgb(30,41,59)" stroke-width="3.5" />
  <circle cx="72" cy="62" r="3" fill="rgb(148,163,184)" />
  <!-- Frame -->
  <polygon points="28,62 46,62 58,42 38,42" fill="none" stroke="rgb(249,115,22)" stroke-width="3.5" stroke-linejoin="round" />
  <line x1="58" y1="42" x2="72" y2="62" stroke="rgb(249,115,22)" stroke-width="3.5" stroke-linecap="round" />
  <line x1="38" y1="42" x2="35" y2="34" stroke="rgb(71,85,105)" stroke-width="3" stroke-linecap="round" />
  <rect x="29" y="31" width="12" height="4" rx="2" fill="rgb(30,41,59)" />
  <path d="M 58 42 L 62 32 L 70 32" fill="none" stroke="rgb(71,85,105)" stroke-width="3" stroke-linecap="round" />
</svg>`;

// 27-5. 집 (House / Home) - Cozy warm home with chimney & heart window
export const JIP_HOUSE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="34" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Chimney -->
  <rect x="64" y="22" width="10" height="20" fill="rgb(239,68,68)" />
  <!-- House Wall -->
  <rect x="24" y="44" width="52" height="36" rx="3" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="2" />
  <!-- Roof -->
  <polygon points="16,46 50,18 84,46" fill="rgb(249,115,22)" stroke="rgb(194,65,12)" stroke-width="2" stroke-linejoin="round" />
  <!-- Door -->
  <rect x="43" y="56" width="14" height="24" rx="2" fill="rgb(217,119,6)" />
  <circle cx="54" cy="68" r="1.5" fill="rgb(254,240,138)" />
  <!-- Windows -->
  <rect x="29" y="54" width="9" height="9" rx="1.5" fill="rgb(186,230,253)" stroke="rgb(59,130,246)" stroke-width="1.2" />
  <rect x="62" y="54" width="9" height="9" rx="1.5" fill="rgb(186,230,253)" stroke="rgb(59,130,246)" stroke-width="1.2" />
</svg>`;

// 27-6. 길 (Road / Street) - Winding road with crosswalk & trees
export const GIL_ROAD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(220,252,231)" />
  <!-- Winding Gray Road -->
  <path d="M 38 86 Q 42 58 55 44 Q 65 32 62 16 L 76 16 Q 78 36 66 50 Q 56 64 64 86 Z" fill="rgb(100,116,139)" />
  <!-- Dashed Road Line -->
  <path d="M 51 83 Q 51 60 61 46 Q 70 34 69 18" stroke="rgb(253,224,71)" stroke-width="2.5" stroke-dasharray="5,4" fill="none" />
  <!-- Green Trees -->
  <circle cx="24" cy="54" r="10" fill="rgb(34,197,94)" />
  <rect x="22" y="64" width="4" height="10" fill="rgb(146,64,14)" />
  <circle cx="80" cy="58" r="8" fill="rgb(22,163,74)" />
  <rect x="78" y="66" width="4" height="8" fill="rgb(146,64,14)" />
</svg>`;

// 27-7. 버스를 타요 (Take the bus) - Kid stepping onto a blue bus
export const BEOS_TAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="34" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Bus Right Side -->
  <rect x="42" y="24" width="44" height="48" rx="6" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="2" />
  <rect x="47" y="30" width="16" height="16" rx="2" fill="rgb(224,242,254)" />
  <rect x="67" y="30" width="14" height="28" rx="2" fill="rgb(186,230,253)" />
  <circle cx="56" cy="72" r="7" fill="rgb(30,41,59)" />
  <circle cx="76" cy="72" r="7" fill="rgb(30,41,59)" />
  <!-- Kid stepping in -->
  <circle cx="24" cy="46" r="8" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <rect x="18" y="54" width="12" height="16" rx="3" fill="rgb(244,63,94)" />
  <path d="M 32 58 L 43 58" stroke="rgb(234,88,12)" stroke-width="2.5" stroke-linecap="round" />
  <polygon points="44,58 39,54 39,62" fill="rgb(234,88,12)" />
</svg>`;

// 27-8. 어떻게 가요? (How do you go?) - Map route with bus/walk/bike choices & ?
export const EOTTEOKE_GAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="84" rx="30" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Question Signpost -->
  <rect x="20" y="20" width="60" height="32" rx="8" fill="rgb(255,255,255)" stroke="rgb(139,92,246)" stroke-width="2.5" />
  <text x="50" y="38" font-family="'Noto Sans KR', sans-serif" font-size="11" font-weight="900" fill="rgb(109,40,217)" text-anchor="middle">🚌? 🚶? 🚲?</text>
  <text x="50" y="48" font-family="'Noto Sans KR', sans-serif" font-size="8" font-weight="900" fill="rgb(124,58,237)" text-anchor="middle">어떻게 가요?</text>
  <!-- Forking arrows -->
  <path d="M 50 78 L 50 64 L 26 64" stroke="rgb(139,92,246)" stroke-width="3" fill="none" stroke-linecap="round" />
  <path d="M 50 64 L 74 64" stroke="rgb(139,92,246)" stroke-width="3" fill="none" stroke-linecap="round" />
  <circle cx="50" cy="78" r="5" fill="rgb(139,92,246)" />
</svg>`;

// 27-9. 걸어서 가요 (Go on foot / Walk) - Child walking cheerfully with footsteps
export const GEOREOSEO_GAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Walking child -->
  <circle cx="50" cy="28" r="11" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.4" />
  <path d="M 38.2 26 C 37.3 11.6 62.7 11.6 61.8 26 Z" fill="rgb(51,65,85)" />
  <rect x="42" y="40" width="16" height="20" rx="5" fill="rgb(16,185,129)" />
  <line x1="46" y1="60" x2="36" y2="78" stroke="rgb(30,41,59)" stroke-width="4" stroke-linecap="round" />
  <line x1="54" y1="60" x2="64" y2="76" stroke="rgb(30,41,59)" stroke-width="4" stroke-linecap="round" />
  <line x1="42" y1="45" x2="32" y2="54" stroke="rgb(16,185,129)" stroke-width="4" stroke-linecap="round" />
  <line x1="58" y1="45" x2="68" y2="52" stroke="rgb(16,185,129)" stroke-width="4" stroke-linecap="round" />
  <!-- Footsteps -->
  <ellipse cx="24" cy="76" rx="4" ry="2.2" fill="rgb(100,116,139)" />
  <ellipse cx="76" cy="76" rx="4" ry="2.2" fill="rgb(100,116,139)" />
</svg>`;

// 27-10. 집 앞에 있어요 (It's in front of the house) - Red pin right in front of cozy house
export const JIP_APE_ISSEOYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="34" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- House behind -->
  <rect x="34" y="40" width="44" height="32" rx="2" fill="rgb(254,243,199)" stroke="rgb(217,119,6)" stroke-width="1.8" />
  <polygon points="28,42 56,20 84,42" fill="rgb(249,115,22)" />
  <rect x="50" y="54" width="12" height="18" fill="rgb(180,83,9)" />
  <!-- Map Location Pin RIGHT IN FRONT of house -->
  <path d="M 32 42 C 23 42 18 50 18 57 C 18 67 32 79 32 79 C 32 79 46 67 46 57 C 46 50 41 42 32 42 Z" fill="rgb(225,29,72)" stroke="rgb(255,255,255)" stroke-width="2" />
  <circle cx="32" cy="56" r="5" fill="rgb(255,255,255)" />
</svg>`;

// ============================================================================
// CHAPTER 28: 의문사 ① (Question Words: Who, What, Where, When, Why, How)
// ============================================================================

// 28-1. 누구 (Who) - Silhouette with crisp purple "?" badge
export const NUGU_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <circle cx="48" cy="36" r="15" fill="rgb(167,139,250)" />
  <path d="M 24 80 C 24 62 36 56 48 56 C 60 56 72 62 72 80 Z" fill="rgb(139,92,246)" />
  <text x="48" y="43" font-family="'Noto Sans KR', sans-serif" font-size="22" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">?</text>
  <rect x="30" y="66" width="36" height="14" rx="6" fill="rgb(255,255,255)" />
  <text x="48" y="76.5" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(109,40,217)" text-anchor="middle">누구</text>
</svg>`;

// 28-2. 무엇 (What) - Mystery gift box with "?" popping out
export const MUEOT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Mystery Box -->
  <rect x="26" y="42" width="48" height="36" rx="5" fill="rgb(245,158,11)" stroke="rgb(180,83,9)" stroke-width="2" />
  <rect x="46" y="42" width="8" height="36" fill="rgb(254,240,138)" />
  <rect x="23" y="34" width="54" height="10" rx="3" fill="rgb(217,119,6)" />
  <text x="50" y="29" font-family="'Noto Sans KR', sans-serif" font-size="24" font-weight="900" fill="rgb(239,68,68)" text-anchor="middle">?</text>
  <text x="50" y="66" font-family="'Noto Sans KR', sans-serif" font-size="11" font-weight="900" fill="rgb(120,53,15)" text-anchor="middle">무엇</text>
</svg>`;

// 28-3. 어디 (Where) - Map pin & compass searching location
export const EODI_WHERE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Folded Map -->
  <polygon points="18,32 38,24 62,32 82,24 82,74 62,82 38,74 18,82" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="2" />
  <!-- Red Location Pin -->
  <path d="M 50 18 C 39 18 33 27 33 36 C 33 48 50 62 50 62 C 50 62 67 48 67 36 C 67 27 61 18 50 18 Z" fill="rgb(239,68,68)" />
  <text x="50" y="41" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">?</text>
  <text x="50" y="75" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(5,150,105)" text-anchor="middle">어디</text>
</svg>`;

// 28-4. 언제 (When) - Calendar & Clock with "?"
export const EONJE_WHEN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Calendar -->
  <rect x="20" y="24" width="46" height="46" rx="6" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2" />
  <rect x="20" y="24" width="46" height="14" rx="4" fill="rgb(59,130,246)" />
  <text x="43" y="59" font-family="'Noto Sans KR', sans-serif" font-size="11" font-weight="900" fill="rgb(30,64,175)" text-anchor="middle">언제?</text>
  <!-- Clock badge -->
  <circle cx="70" cy="60" r="16" fill="rgb(254,240,138)" stroke="rgb(217,119,6)" stroke-width="2" />
  <line x1="70" y1="60" x2="70" y2="51" stroke="rgb(120,53,15)" stroke-width="2" stroke-linecap="round" />
  <line x1="70" y1="60" x2="77" y2="63" stroke="rgb(120,53,15)" stroke-width="2" stroke-linecap="round" />
</svg>`;

// 28-5. 왜 (Why) - Curious thinking bubble with big "왜?"
export const WAE_WHY_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="20" y="20" width="60" height="44" rx="16" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="2.5" />
  <circle cx="34" cy="70" r="5" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="2" />
  <circle cx="24" cy="78" r="3" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="1.5" />
  <text x="50" y="48" font-family="'Noto Sans KR', sans-serif" font-size="20" font-weight="900" fill="rgb(225,29,72)" text-anchor="middle">왜?</text>
</svg>`;

// 28-6. 어떻게 (How) - Lightbulb + gears / method steps
export const EOTTEOKE_HOW_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Lightbulb -->
  <path d="M 34 38 C 34 24 66 24 66 38 C 66 47 58 51 58 58 L 42 58 C 42 51 34 47 34 38 Z" fill="rgb(253,224,71)" stroke="rgb(217,119,6)" stroke-width="2" />
  <rect x="43" y="58" width="14" height="8" rx="2" fill="rgb(148,163,184)" />
  <text x="50" y="45" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">?</text>
  <rect x="28" y="70" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(245,158,11)" stroke-width="1.5" />
  <text x="50" y="80" font-family="'Noto Sans KR', sans-serif" font-size="9.5" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">어떻게</text>
</svg>`;

// 28-7. 어디에 가요? (Where are you going?) - Kid with backpack & two destination signs
export const EODI_E_GAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="30" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Signpost -->
  <rect x="48" y="22" width="5" height="58" fill="rgb(146,64,14)" />
  <polygon points="20,26 52,26 52,38 20,38 14,32" fill="rgb(59,130,246)" />
  <polygon points="48,42 80,42 86,48 80,54 48,54" fill="rgb(16,185,129)" />
  <text x="34" y="35" font-family="'Noto Sans KR', sans-serif" font-size="8" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">🏫?</text>
  <text x="66" y="51" font-family="'Noto Sans KR', sans-serif" font-size="8" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">🏠?</text>
  <rect x="26" y="64" width="48" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="8.5" font-weight="900" fill="rgb(30,64,175)" text-anchor="middle">어디에 가요?</text>
</svg>`;

// 28-8. 언제 와요? (When are you coming?) - Looking at watch waiting by door
export const EONJE_WAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <circle cx="50" cy="40" r="18" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="3" />
  <line x1="50" y1="40" x2="50" y2="28" stroke="rgb(30,41,59)" stroke-width="2.5" stroke-linecap="round" />
  <line x1="50" y1="40" x2="60" y2="40" stroke="rgb(239,68,68)" stroke-width="2.5" stroke-linecap="round" />
  <text x="72" y="28" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="rgb(16,185,129)" text-anchor="middle">?</text>
  <rect x="26" y="64" width="48" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(5,150,105)" text-anchor="middle">언제 와요?</text>
</svg>`;

// 28-9. 무엇을 해요? (What are you doing?) - Activity icons (book, ball, brush) with ?
export const MUEOSEUL_HAEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <circle cx="30" cy="36" r="12" fill="rgb(255,255,255)" stroke="rgb(167,139,250)" stroke-width="1.8" />
  <text x="30" y="40" font-size="12" text-anchor="middle">📖</text>
  <circle cx="50" cy="26" r="12" fill="rgb(255,255,255)" stroke="rgb(167,139,250)" stroke-width="1.8" />
  <text x="50" y="30" font-size="12" text-anchor="middle">⚽</text>
  <circle cx="70" cy="36" r="12" fill="rgb(255,255,255)" stroke="rgb(167,139,250)" stroke-width="1.8" />
  <text x="70" y="40" font-size="12" text-anchor="middle">🎨</text>
  <rect x="22" y="58" width="56" height="16" rx="6" fill="rgb(139,92,246)" />
  <text x="50" y="69" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">무엇을 해요?</text>
</svg>`;

// 28-10. 왜 늦었어요? (Why are you late?) - Hurrying student + clock showing late
export const WAE_NEUJEO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,237,213)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Clock with red exclamation -->
  <circle cx="66" cy="32" r="13" fill="rgb(255,255,255)" stroke="rgb(239,68,68)" stroke-width="2.2" />
  <line x1="66" y1="32" x2="66" y2="24" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" />
  <line x1="66" y1="32" x2="73" y2="35" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" />
  <!-- Running kid -->
  <circle cx="34" cy="40" r="10" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <rect x="28" y="50" width="12" height="15" rx="4" fill="rgb(249,115,22)" />
  <rect x="22" y="68" width="56" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  <text x="50" y="78" font-family="'Noto Sans KR', sans-serif" font-size="8.8" font-weight="900" fill="rgb(194,65,12)" text-anchor="middle">왜 늦었어요?</text>
</svg>`;

// ============================================================================
// CHAPTER 29: 지시·수량 (Demonstratives, Choice & Cost/Amount)
// ============================================================================

// 29-1. 그거 (That near listener) - Hand pointing toward item near listener
export const GEUGEO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Target Notebook near friend on right -->
  <rect x="56" y="28" width="22" height="28" rx="3" fill="rgb(56,189,248)" stroke="rgb(2,132,199)" stroke-width="2" />
  <circle cx="67" cy="42" r="14" stroke="rgb(59,130,246)" stroke-width="1.8" stroke-dasharray="3,2" fill="none" />
  <!-- Pointing Finger -->
  <rect x="16" y="42" width="28" height="10" rx="5" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  <polygon points="48,47 42,42 42,52" fill="rgb(59,130,246)" />
  <rect x="30" y="66" width="40" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.5" />
  <text x="50" y="76" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(30,64,175)" text-anchor="middle">그거</text>
</svg>`;

// 29-2. 거기 (There near listener) - Dotted path pointing to listener's spot
export const GEOGI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Spot Circle -->
  <ellipse cx="66" cy="56" rx="16" ry="7" fill="rgb(167,243,208)" stroke="rgb(16,185,129)" stroke-width="2" />
  <path d="M 66 22 C 58 22 54 28 54 35 C 54 44 66 54 66 54 C 66 54 78 44 78 35 C 78 28 74 22 66 22 Z" fill="rgb(16,185,129)" />
  <circle cx="66" cy="34" r="4" fill="rgb(255,255,255)" />
  <!-- Arrow from left -->
  <path d="M 18 54 Q 34 46 47 53" stroke="rgb(5,150,105)" stroke-width="2.5" stroke-dasharray="3,2" fill="none" />
  <polygon points="49,54 44,49 43,56" fill="rgb(5,150,105)" />
  <rect x="30" y="68" width="40" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="1.5" />
  <text x="50" y="78" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(5,150,105)" text-anchor="middle">거기</text>
</svg>`;

// 29-3. 어느 (Which - choice between A or B)
export const EONEU_WHICH_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Choice A vs Choice B -->
  <rect x="18" y="26" width="24" height="30" rx="5" fill="rgb(251,113,133)" stroke="rgb(225,29,72)" stroke-width="2" />
  <text x="30" y="45" font-family="'Noto Sans KR', sans-serif" font-size="14" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">A</text>
  <rect x="58" y="26" width="24" height="30" rx="5" fill="rgb(59,130,246)" stroke="rgb(29,78,216)" stroke-width="2" />
  <text x="70" y="45" font-family="'Noto Sans KR', sans-serif" font-size="14" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">B</text>
  <text x="50" y="45" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">?</text>
  <rect x="30" y="66" width="40" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  <text x="50" y="76" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">어느</text>
</svg>`;

// 29-4. 무슨 (What kind of) - Multiple varied categories with "?"
export const MUSEUN_WHATKIND_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <circle cx="30" cy="36" r="10" fill="rgb(255,255,255)" stroke="rgb(139,92,246)" stroke-width="1.5" />
  <text x="30" y="40" font-size="11" text-anchor="middle">🍎</text>
  <circle cx="50" cy="28" r="10" fill="rgb(255,255,255)" stroke="rgb(139,92,246)" stroke-width="1.5" />
  <text x="50" y="32" font-size="11" text-anchor="middle">🐶</text>
  <circle cx="70" cy="36" r="10" fill="rgb(255,255,255)" stroke="rgb(139,92,246)" stroke-width="1.5" />
  <text x="70" y="40" font-size="11" text-anchor="middle">🎵</text>
  <text x="50" y="54" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="rgb(124,58,237)" text-anchor="middle">?</text>
  <rect x="30" y="64" width="40" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(139,92,246)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(109,40,217)" text-anchor="middle">무슨</text>
</svg>`;

// 29-5. 어떤 (What sort of / What kind) - Star / Heart / Flower qualities
export const EOTTEON_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(252,231,243)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <circle cx="32" cy="36" r="11" fill="rgb(254,240,138)" stroke="rgb(245,158,11)" stroke-width="1.5" />
  <text x="32" y="40" font-size="12" text-anchor="middle">⭐</text>
  <circle cx="68" cy="36" r="11" fill="rgb(186,230,253)" stroke="rgb(59,130,246)" stroke-width="1.5" />
  <text x="68" y="40" font-size="12" text-anchor="middle">✨</text>
  <text x="50" y="45" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="rgb(219,39,119)" text-anchor="middle">?</text>
  <rect x="30" y="64" width="40" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(236,72,153)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(190,24,93)" text-anchor="middle">어떤</text>
</svg>`;

// 29-6. 몇 (How many / What number) - Counting blocks + "?"
export const MYEOT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="20" y="34" width="16" height="16" rx="3" fill="rgb(251,113,133)" />
  <rect x="42" y="34" width="16" height="16" rx="3" fill="rgb(250,204,21)" />
  <rect x="64" y="34" width="16" height="16" rx="3" fill="rgb(52,211,153)" />
  <text x="28" y="46" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">1</text>
  <text x="50" y="46" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(120,53,15)" text-anchor="middle">2</text>
  <text x="72" y="46" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">?</text>
  <rect x="30" y="62" width="40" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(2,132,199)" stroke-width="1.5" />
  <text x="50" y="72.5" font-family="'Noto Sans KR', sans-serif" font-size="11" font-weight="900" fill="rgb(3,105,161)" text-anchor="middle">몇</text>
</svg>`;

// 29-7. 얼마 (How much) - Price tag & golden coins with "?"
export const EOLMA_HOWMUCH_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Coin -->
  <circle cx="38" cy="40" r="14" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="2" />
  <text x="38" y="45" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="900" fill="rgb(161,98,7)" text-anchor="middle">₩</text>
  <!-- Price Tag -->
  <polygon points="52,26 78,26 84,38 78,50 52,50" fill="rgb(255,255,255)" stroke="rgb(234,88,12)" stroke-width="2" />
  <text x="68" y="42" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="900" fill="rgb(234,88,12)" text-anchor="middle">?</text>
  <rect x="30" y="64" width="40" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">얼마</text>
</svg>`;

// 29-8. 그거 주세요 (Please give me that) - Polite cupped hand pointing to item
export const GEUGEO_JUSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Cute Pencil/Notebook item -->
  <rect x="52" y="22" width="24" height="28" rx="4" fill="rgb(251,146,60)" stroke="rgb(234,88,12)" stroke-width="1.8" />
  <circle cx="64" cy="36" r="5" fill="rgb(254,240,138)" />
  <!-- Hand reaching politely -->
  <rect x="18" y="34" width="24" height="8" rx="4" fill="rgb(254,215,170)" stroke="rgb(234,88,12)" stroke-width="1.2" />
  <rect x="22" y="62" width="56" height="15" rx="5" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="1.5" />
  <text x="50" y="72.5" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(5,150,105)" text-anchor="middle">그거 주세요</text>
</svg>`;

// 29-9. 이거 얼마예요? (How much is this?) - Pointing at an item with price tag ?
export const IGEO_EOLMAYEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="22" y="24" width="24" height="24" rx="5" fill="rgb(239,68,68)" />
  <circle cx="34" cy="36" r="5" fill="rgb(255,255,255)" />
  <circle cx="66" cy="36" r="14" fill="rgb(250,204,21)" stroke="rgb(202,138,4)" stroke-width="2" />
  <text x="66" y="41" font-family="'Noto Sans KR', sans-serif" font-size="13" font-weight="900" fill="rgb(161,98,7)" text-anchor="middle">₩?</text>
  <rect x="19" y="62" width="62" height="15" rx="5" fill="rgb(255,255,255)" stroke="rgb(234,88,12)" stroke-width="1.5" />
  <text x="50" y="72.5" font-family="'Noto Sans KR', sans-serif" font-size="8.5" font-weight="900" fill="rgb(194,65,12)" text-anchor="middle">이거 얼마예요?</text>
</svg>`;

// 29-10. 어떤 걸 좋아해요? (What kind do you like?) - Heart choice speech bubble
export const EOTTEON_GEOL_JOAYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <path d="M 50 28 C 50 21 41 18 37 23 C 33 28 38 35 50 43 C 62 35 67 28 63 23 C 59 18 50 21 50 28 Z" fill="rgb(244,63,94)" />
  <text x="72" y="34" font-family="'Noto Sans KR', sans-serif" font-size="16" font-weight="900" fill="rgb(225,29,72)" text-anchor="middle">?</text>
  <rect x="16" y="60" width="68" height="16" rx="5" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="1.5" />
  <text x="50" y="71" font-family="'Noto Sans KR', sans-serif" font-size="8" font-weight="900" fill="rgb(190,18,60)" text-anchor="middle">어떤 걸 좋아해요?</text>
</svg>`;

// ============================================================================
// CHAPTER 30: 접속·부사 (Connectors & Essential Adverbs)
// ============================================================================

// 30-1. 그리고 (And) - Two puzzle links + "+"
export const GEURIGO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <circle cx="30" cy="40" r="13" fill="rgb(59,130,246)" />
  <circle cx="70" cy="40" r="13" fill="rgb(16,185,129)" />
  <text x="50" y="46" font-family="'Noto Sans KR', sans-serif" font-size="18" font-weight="900" fill="rgb(30,64,175)" text-anchor="middle">+</text>
  <rect x="28" y="64" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(30,64,175)" text-anchor="middle">그리고</text>
</svg>`;

// 30-2. 그래서 (So / Therefore) - Cause -> Result arrow
export const GEURAESEO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="18" y="30" width="22" height="22" rx="5" fill="rgb(245,158,11)" />
  <path d="M 43 41 L 56 41" stroke="rgb(217,119,6)" stroke-width="3.5" stroke-linecap="round" />
  <polygon points="59,41 53,36 53,46" fill="rgb(217,119,6)" />
  <circle cx="72" cy="41" r="11" fill="rgb(16,185,129)" />
  <rect x="28" y="64" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">그래서</text>
</svg>`;

// 30-3. 하지만 (But / However) - Contrasting U-turn / split arrow
export const HAJIMAN_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,241,242)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <path d="M 24 38 L 48 38" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
  <path d="M 52 38 L 76 38" stroke="rgb(244,63,94)" stroke-width="4" stroke-linecap="round" />
  <polygon points="78,38 71,33 71,43" fill="rgb(244,63,94)" />
  <polygon points="22,38 29,33 29,43" fill="rgb(59,130,246)" />
  <circle cx="50" cy="38" r="7" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="2" />
  <text x="50" y="42" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(225,29,72)" text-anchor="middle">!</text>
  <rect x="28" y="64" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(244,63,94)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(190,18,60)" text-anchor="middle">하지만</text>
</svg>`;

// 30-4. 많이 (A lot / Many) - Pile of colorful stars/apples
export const MANI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Pile of cheerful stars -->
  <circle cx="32" cy="48" r="8" fill="rgb(250,204,21)" />
  <circle cx="50" cy="48" r="8" fill="rgb(251,146,60)" />
  <circle cx="68" cy="48" r="8" fill="rgb(244,63,94)" />
  <circle cx="40" cy="36" r="8" fill="rgb(52,211,153)" />
  <circle cx="60" cy="36" r="8" fill="rgb(59,130,246)" />
  <circle cx="50" cy="24" r="8" fill="rgb(167,139,250)" />
  <rect x="28" y="64" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(217,119,6)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(180,83,9)" text-anchor="middle">많이</text>
</svg>`;

// 30-5. 아주 (Very / Really) - Shining big trophy/star with sparkles
export const AJU_VERY_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <polygon points="50,14 57,30 75,32 61,44 65,61 50,52 35,61 39,44 25,32 43,30" fill="rgb(250,204,21)" stroke="rgb(217,119,6)" stroke-width="2" />
  <rect x="28" y="65" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(139,92,246)" stroke-width="1.5" />
  <text x="50" y="75" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(109,40,217)" text-anchor="middle">아주 ✨</text>
</svg>`;

// 30-6. 빨리 (Fast / Quickly) - Rabbit dashing with speed lines
export const PPALLI_FAST_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Speed lines -->
  <line x1="16" y1="34" x2="36" y2="34" stroke="rgb(59,130,246)" stroke-width="3" stroke-linecap="round" />
  <line x1="12" y1="44" x2="32" y2="44" stroke="rgb(59,130,246)" stroke-width="3" stroke-linecap="round" />
  <line x1="18" y1="54" x2="38" y2="54" stroke="rgb(59,130,246)" stroke-width="3" stroke-linecap="round" />
  <!-- Cute Dashing Rabbit / Rocket -->
  <circle cx="58" cy="44" r="14" fill="rgb(255,255,255)" stroke="rgb(100,116,139)" stroke-width="2" />
  <ellipse cx="52" cy="24" rx="4" ry="10" fill="rgb(255,255,255)" stroke="rgb(100,116,139)" stroke-width="1.8" />
  <ellipse cx="62" cy="24" rx="4" ry="10" fill="rgb(255,255,255)" stroke="rgb(100,116,139)" stroke-width="1.8" />
  <circle cx="64" cy="42" r="2.2" fill="rgb(30,41,59)" />
  <rect x="28" y="64" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(2,132,199)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(3,105,161)" text-anchor="middle">빨리 💨</text>
</svg>`;

// 30-7. 천천히 (Slowly) - Cute smiling green turtle walking calmly
export const CHEONCHEONHI_SLOW_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="84" rx="28" ry="5" fill="rgba(15,23,42,0.1)" />
  <!-- Turtle Shell -->
  <path d="M 26 52 C 26 30 62 30 62 52 Z" fill="rgb(22,163,74)" stroke="rgb(21,128,61)" stroke-width="2" />
  <!-- Turtle Head -->
  <circle cx="69" cy="46" r="8" fill="rgb(134,239,172)" stroke="rgb(22,163,74)" stroke-width="1.8" />
  <circle cx="72" cy="44" r="1.8" fill="rgb(30,41,59)" />
  <!-- Legs -->
  <rect x="30" y="52" width="7" height="7" rx="2" fill="rgb(134,239,172)" />
  <rect x="50" y="52" width="7" height="7" rx="2" fill="rgb(134,239,172)" />
  <rect x="28" y="64" width="44" height="14" rx="5" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="1.5" />
  <text x="50" y="74" font-family="'Noto Sans KR', sans-serif" font-size="10" font-weight="900" fill="rgb(5,150,105)" text-anchor="middle">천천히</text>
</svg>`;

// 30-8. 천천히 말해 주세요 (Please speak slowly) - Calm speaker waves + turtle icon
export const CHEONCHEONHI_MALHAE_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,244)" />
  <ellipse cx="50" cy="84" rx="30" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="20" y="22" width="60" height="32" rx="10" fill="rgb(255,255,255)" stroke="rgb(16,185,129)" stroke-width="2" />
  <text x="50" y="42" font-size="18" text-anchor="middle">🐢💬</text>
  <rect x="16" y="62" width="68" height="15" rx="5" fill="rgb(16,185,129)" />
  <text x="50" y="72.5" font-family="'Noto Sans KR', sans-serif" font-size="8" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">천천히 말해 주세요</text>
</svg>`;

// 30-9. 빨리 오세요 (Please come quickly) - Beckoning hand + dash waves
export const PPALLI_OSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <ellipse cx="50" cy="84" rx="30" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="24" y="22" width="52" height="32" rx="10" fill="rgb(255,255,255)" stroke="rgb(59,130,246)" stroke-width="2" />
  <text x="50" y="43" font-size="18" text-anchor="middle">🏃💨</text>
  <rect x="20" y="62" width="60" height="15" rx="5" fill="rgb(59,130,246)" />
  <text x="50" y="72.5" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">빨리 오세요</text>
</svg>`;

// 30-10. 많이 주세요 (Please give me a lot) - Two big hands with overflowing stars
export const MANI_JUSEYO_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="84" rx="30" ry="5" fill="rgba(15,23,42,0.1)" />
  <rect x="24" y="22" width="52" height="32" rx="10" fill="rgb(255,255,255)" stroke="rgb(245,158,11)" stroke-width="2" />
  <text x="50" y="43" font-size="18" text-anchor="middle">🤲✨</text>
  <rect x="20" y="62" width="60" height="15" rx="5" fill="rgb(245,158,11)" />
  <text x="50" y="72.5" font-family="'Noto Sans KR', sans-serif" font-size="9" font-weight="900" fill="rgb(255,255,255)" text-anchor="middle">많이 주세요</text>
</svg>`;
