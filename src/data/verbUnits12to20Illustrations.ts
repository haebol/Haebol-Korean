/**
 * Vector SVG illustrations for Haebol Korean Verb Conjugation Units 12~20 (New/Repaired set)
 * Crafted to match the unbroken, child-friendly pastel character style of Unit 11.
 * Every character uses connected anatomy (torso, arms, hands, head) and rgb(...) colors for SVG data URIs.
 */

// ============================================================================
// 제12단원: 부정2 ([명사] 안 해요, [명사] 못 해요)
// ============================================================================

// 12-1. 게임하다 (게임 안 해요) - "게임은 안 해요."
// 게임기/태블릿을 옆에 두고 두 손을 모아 단호하게 X 또는 고개를 젓고 책을 보는 아이
export const GEIMHADA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="86" rx="30" ry="4" fill="rgb(221,214,254)" opacity="0.65" />

  <!-- Small handheld game console placed aside on bottom-right with gentle decline mark -->
  <g transform="translate(62, 58)">
    <rect x="0" y="6" width="26" height="16" rx="4" fill="rgb(100,116,139)" stroke="rgb(71,85,105)" stroke-width="1.2" />
    <rect x="6" y="9" width="14" height="10" rx="1.5" fill="rgb(148,163,184)" />
    <circle cx="3.2" cy="14" r="1.4" fill="rgb(226,232,240)" />
    <circle cx="22.8" cy="12.5" r="1.2" fill="rgb(248,113,113)" />
    <circle cx="22.8" cy="15.8" r="1.2" fill="rgb(96,165,250)" />
    <!-- Red diagonal 'No' badge over console -->
    <circle cx="13" cy="14" r="7" fill="none" stroke="rgb(239,68,68)" stroke-width="2" />
    <line x1="8" y1="19" x2="18" y2="9" stroke="rgb(239,68,68)" stroke-width="2" stroke-linecap="round" />
  </g>

  <!-- Child making polite X gesture / choosing not to play games -->
  <g transform="translate(14, 17)">
    <rect x="17" y="55" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <rect x="28" y="55" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <ellipse cx="19.5" cy="67" rx="4" ry="2.2" fill="rgb(99,102,241)" />
    <ellipse cx="30.5" cy="67" rx="4" ry="2.2" fill="rgb(99,102,241)" />

    <!-- Torso in bright indigo-blue top -->
    <path d="M 13 56 C 13 40 19 34 25 34 C 31 34 37 40 37 56 Z" fill="rgb(99,102,241)" />

    <!-- Connected crossed arms (decisive 'no' gesture) -->
    <path d="M 14 40 L 32 50" stroke="rgb(99,102,241)" stroke-width="4.2" stroke-linecap="round" />
    <circle cx="33" cy="50.5" r="3.2" fill="rgb(254,215,170)" />
    <path d="M 36 40 L 18 50" stroke="rgb(79,70,229)" stroke-width="4.2" stroke-linecap="round" />
    <circle cx="17" cy="50.5" r="3.2" fill="rgb(254,215,170)" />

    <!-- Head -->
    <circle cx="25" cy="20" r="13.5" fill="rgb(254,215,170)" />
    <path d="M 10.7 20 C 9.6 -0.4 40.4 -0.4 39.3 20 C 38.5 13 33 9 25 9 C 17 9 11.5 13 10.7 20 Z" fill="rgb(51,65,85)" />
    <circle cx="20.5" cy="20.5" r="1.7" fill="rgb(30,41,59)" />
    <circle cx="29.5" cy="20.5" r="1.7" fill="rgb(30,41,59)" />
    <circle cx="21.1" cy="19.8" r="0.6" fill="rgb(255,255,255)" />
    <circle cx="30.1" cy="19.8" r="0.6" fill="rgb(255,255,255)" />
    <circle cx="17" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="33" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 22 25.5 Q 25 27.5 28 25.5" stroke="rgb(30,41,59)" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// 12-2. 줄넘기하다 (줄넘기 못 해요) - "줄넘기를 못 해요."
// 줄넘기 줄이 발에 걸려 땀을 삐질 흘리며 아쉬워하는 아이
export const JULNEOMGIHADA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="86" rx="28" ry="4" fill="rgb(167,243,208)" opacity="0.6" />

  <!-- Tangled jump rope around feet -->
  <path d="M 20 55 Q 16 80 50 82 Q 84 80 80 55" stroke="rgb(245,158,11)" stroke-width="2.4" fill="none" stroke-linecap="round" />
  <path d="M 38 78 Q 50 72 62 78" stroke="rgb(245,158,11)" stroke-width="2" fill="none" stroke-linecap="round" />

  <!-- Child trying jump rope -->
  <g transform="translate(24, 15)">
    <!-- Legs -->
    <rect x="17" y="54" width="5" height="12" rx="2" fill="rgb(71,85,105)" />
    <rect x="30" y="54" width="5" height="12" rx="2" fill="rgb(71,85,105)" />
    <ellipse cx="19.5" cy="67" rx="4" ry="2.2" fill="rgb(16,185,129)" />
    <ellipse cx="32.5" cy="67" rx="4" ry="2.2" fill="rgb(16,185,129)" />

    <!-- Torso in sporty emerald-mint tee -->
    <path d="M 14 55 C 14 39 20 33 26 33 C 32 33 38 39 38 55 Z" fill="rgb(16,185,129)" />

    <!-- Arms holding green jump rope handles -->
    <path d="M 15 41 L 4 46" stroke="rgb(16,185,129)" stroke-width="4.2" stroke-linecap="round" />
    <rect x="-4" y="42" width="5" height="9" rx="2" fill="rgb(239,68,68)" />
    <circle cx="3" cy="46" r="3.4" fill="rgb(254,215,170)" />

    <path d="M 37 41 L 48 46" stroke="rgb(16,185,129)" stroke-width="4.2" stroke-linecap="round" />
    <rect x="51" y="42" width="5" height="9" rx="2" fill="rgb(239,68,68)" />
    <circle cx="49" cy="46" r="3.4" fill="rgb(254,215,170)" />

    <!-- Head -->
    <circle cx="26" cy="20" r="13.5" fill="rgb(254,215,170)" />
    <path d="M 11.7 20 C 10.6 -0.4 41.4 -0.4 40.3 20 C 39.5 13 34 9 26 9 C 18 9 12.5 13 11.7 20 Z" fill="rgb(51,65,85)" />

    <!-- Effort / flustered eyes -->
    <path d="M 18 18 L 23 20 L 18 22" stroke="rgb(30,41,59)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M 34 18 L 29 20 L 34 22" stroke="rgb(30,41,59)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <path d="M 22 25.5 Q 26 23.5 30 25.5" stroke="rgb(71,85,105)" stroke-width="1.5" stroke-linecap="round" fill="none" />

    <!-- Sweat drop -->
    <path d="M 41 14 C 41 11.5 43 9 43 9 C 43 9 45 11.5 45 14 C 45 15.3 44.1 16.3 43 16.3 C 41.9 16.3 41 15.3 41 14 Z" fill="rgb(56,189,248)" />
  </g>
</svg>`;

// 12-3. 요리하다 (요리 못 해요) - "혼자 요리 못 해요."
// 앞치마와 요리 모자를 쓰고 냄비와 국자를 들고 난감해하는 아이
export const YORIHADA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(255,247,237)" />
  <ellipse cx="50" cy="86" rx="30" ry="4" fill="rgb(254,215,170)" opacity="0.65" />

  <!-- Child wearing chef hat & apron -->
  <g transform="translate(22, 14)">
    <!-- Torso & apron -->
    <path d="M 13 54 C 13 40 19 34 26 34 C 33 34 39 40 39 54 Z" fill="rgb(251,146,60)" />
    <rect x="19" y="39" width="14" height="15" rx="2" fill="rgb(255,255,255)" />

    <!-- Arms holding wooden spoon and lid -->
    <path d="M 14 42 L 6 47" stroke="rgb(251,146,60)" stroke-width="4" stroke-linecap="round" />
    <circle cx="5.5" cy="47.5" r="3.2" fill="rgb(254,215,170)" />
    <line x1="5.5" y1="47.5" x2="10" y2="33" stroke="rgb(180,83,9)" stroke-width="2.2" stroke-linecap="round" />
    <ellipse cx="10.5" cy="31" rx="3.2" ry="4.5" fill="rgb(217,119,6)" />

    <path d="M 38 42 L 46 47" stroke="rgb(251,146,60)" stroke-width="4" stroke-linecap="round" />
    <circle cx="46.5" cy="47.5" r="3.2" fill="rgb(254,215,170)" />

    <!-- Head + Chef Hat -->
    <circle cx="26" cy="21" r="13" fill="rgb(254,215,170)" />
    <path d="M 12.2 20 C 11.2 1.6 40.8 1.6 39.8 20 C 39 14 33 10 26 10 C 19 10 13 14 12.2 20 Z" fill="rgb(51,65,85)" />
    <!-- Puffy white chef hat -->
    <path d="M 16 11 L 36 11 L 34 4 C 31 2 21 2 18 4 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1" />
    <circle cx="20" cy="4" r="4" fill="rgb(255,255,255)" />
    <circle cx="26" cy="2.5" r="4.5" fill="rgb(255,255,255)" />
    <circle cx="32" cy="4" r="4" fill="rgb(255,255,255)" />

    <!-- Hesitant eyes & wavy mouth -->
    <circle cx="21.5" cy="21" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="30.5" cy="21" r="1.6" fill="rgb(30,41,59)" />
    <path d="M 22 26 Q 24.5 24 26 26 Q 27.5 28 30 26" stroke="rgb(71,85,105)" stroke-width="1.4" stroke-linecap="round" fill="none" />

    <!-- Sweat drop -->
    <path d="M 41 15 C 41 12.5 43 10 43 10 C 43 10 45 12.5 45 15 C 45 16.3 44.1 17.3 43 17.3 C 41.9 17.3 41 16.3 41 15 Z" fill="rgb(56,189,248)" />
  </g>

  <!-- Cooking pot on table in front -->
  <rect x="24" y="66" width="52" height="16" rx="2" fill="rgb(253,186,116)" opacity="0.55" />
  <rect x="37" y="57" width="26" height="12" rx="3" fill="rgb(148,163,184)" stroke="rgb(71,85,105)" stroke-width="1.2" />
  <line x1="33" y1="60" x2="37" y2="60" stroke="rgb(71,85,105)" stroke-width="2" stroke-linecap="round" />
  <line x1="63" y1="60" x2="67" y2="60" stroke="rgb(71,85,105)" stroke-width="2" stroke-linecap="round" />
  <!-- Tilted question mark next to pot -->
  <text x="68" y="64" font-size="11" font-weight="900" fill="rgb(234,88,12)">?</text>
</svg>`;

// 12-4. 운전하다 (운전 못 해요) - "아직 운전 못 해요."
// 작은 자동차 운전대 옆에서 어려서 운전 못 한다고 손사래 치는 아이
export const UNJEONHADA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(239,246,255)" />
  <ellipse cx="50" cy="86" rx="32" ry="4" fill="rgb(191,219,254)" opacity="0.65" />

  <!-- Cute yellow compact car -->
  <g transform="translate(44, 48)">
    <path d="M 6 16 L 12 6 L 34 6 L 40 16 Z" fill="rgb(253,224,71)" stroke="rgb(234,179,8)" stroke-width="1.4" stroke-linejoin="round" />
    <rect x="14" y="8.5" width="9" height="6" rx="1" fill="rgb(224,242,254)" />
    <rect x="25" y="8.5" width="8" height="6" rx="1" fill="rgb(224,242,254)" />
    <rect x="2" y="16" width="44" height="14" rx="5" fill="rgb(250,204,21)" stroke="rgb(234,179,8)" stroke-width="1.4" />
    <circle cx="12" cy="31" r="5" fill="rgb(51,65,85)" />
    <circle cx="12" cy="31" r="2" fill="rgb(203,213,225)" />
    <circle cx="36" cy="31" r="5" fill="rgb(51,65,85)" />
    <circle cx="36" cy="31" r="2" fill="rgb(203,213,225)" />
  </g>

  <!-- Child standing next to car holding up hands ("I can't drive yet!") -->
  <g transform="translate(12, 18)">
    <rect x="14" y="54" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <rect x="24" y="54" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <ellipse cx="16.5" cy="66" rx="4" ry="2.2" fill="rgb(59,130,246)" />
    <ellipse cx="26.5" cy="66" rx="4" ry="2.2" fill="rgb(59,130,246)" />

    <path d="M 10 55 C 10 40 16 34 21.5 34 C 27 34 33 40 33 55 Z" fill="rgb(59,130,246)" />

    <!-- Raised shaking hands ("not yet!") -->
    <path d="M 11 41 L 4 32" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
    <circle cx="3.5" cy="31" r="3.2" fill="rgb(254,215,170)" />
    <path d="M 32 41 L 39 33" stroke="rgb(59,130,246)" stroke-width="4" stroke-linecap="round" />
    <circle cx="39.5" cy="32" r="3.2" fill="rgb(254,215,170)" />

    <circle cx="21.5" cy="20" r="13" fill="rgb(254,215,170)" />
    <path d="M 7.7 20 C 6.7 0.3 36.3 0.3 35.3 20 C 34.5 13 29 9 21.5 9 C 14 9 8.5 13 7.7 20 Z" fill="rgb(51,65,85)" />
    <circle cx="17.5" cy="20.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="25.5" cy="20.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="14" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <circle cx="29" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.6" />
    <path d="M 19 25.5 Q 21.5 24 24 25.5" stroke="rgb(71,85,105)" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// 12-5. 샤워하다 (샤워 안 해요) - "아침에는 샤워 안 해요."
// 아침 햇살 창가 옆에서 샤워기 대신 수건·옷을 차려입고 손사래 치는 아이
export const SHAWEOHADA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,249,255)" />
  <ellipse cx="50" cy="86" rx="28" ry="4" fill="rgb(186,230,253)" opacity="0.6" />

  <!-- Morning Sun icon top-left -->
  <circle cx="22" cy="24" r="6.5" fill="rgb(251,191,36)" />
  <line x1="22" y1="14" x2="22" y2="16" stroke="rgb(251,191,36)" stroke-width="1.8" stroke-linecap="round" />
  <line x1="22" y1="32" x2="22" y2="34" stroke="rgb(251,191,36)" stroke-width="1.8" stroke-linecap="round" />
  <line x1="12" y1="24" x2="14" y2="24" stroke="rgb(251,191,36)" stroke-width="1.8" stroke-linecap="round" />
  <line x1="30" y1="24" x2="32" y2="24" stroke="rgb(251,191,36)" stroke-width="1.8" stroke-linecap="round" />

  <!-- Shower head on right (turned off, dry) with red X -->
  <g transform="translate(68, 22)">
    <path d="M 18 54 L 18 10 Q 18 2 10 2 L 4 2" stroke="rgb(148,163,184)" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 0 6 L 8 6 L 6 12 L 2 12 Z" fill="rgb(100,116,139)" />
    <circle cx="4" cy="20" r="6.5" fill="rgb(255,255,255)" stroke="rgb(239,68,68)" stroke-width="1.8" />
    <line x1="0" y1="16" x2="8" y2="24" stroke="rgb(239,68,68)" stroke-width="1.8" stroke-linecap="round" />
    <line x1="8" y1="16" x2="0" y2="24" stroke="rgb(239,68,68)" stroke-width="1.8" stroke-linecap="round" />
  </g>

  <!-- Child already dressed neatly in morning shirt gesturing no shower now -->
  <g transform="translate(22, 18)">
    <rect x="17" y="54" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <rect x="28" y="54" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <ellipse cx="19.5" cy="66" rx="4" ry="2.2" fill="rgb(14,165,233)" />
    <ellipse cx="30.5" cy="66" rx="4" ry="2.2" fill="rgb(14,165,233)" />

    <path d="M 13 55 C 13 40 19 34 25 34 C 31 34 37 40 37 55 Z" fill="rgb(56,189,248)" />

    <!-- Connected arms making small crossed hand wave -->
    <path d="M 14 41 L 6 47" stroke="rgb(56,189,248)" stroke-width="4" stroke-linecap="round" />
    <circle cx="5.5" cy="48" r="3.2" fill="rgb(254,215,170)" />
    <path d="M 36 41 L 45 34" stroke="rgb(56,189,248)" stroke-width="4" stroke-linecap="round" />
    <circle cx="46" cy="33" r="3.2" fill="rgb(254,215,170)" />

    <circle cx="25" cy="20" r="13.5" fill="rgb(254,215,170)" />
    <path d="M 10.7 20 C 9.6 -0.4 40.4 -0.4 39.3 20 C 38.5 13 33 9 25 9 C 17 9 11.5 13 10.7 20 Z" fill="rgb(120,53,15)" />
    <circle cx="20.5" cy="20.5" r="1.7" fill="rgb(30,41,59)" />
    <circle cx="29.5" cy="20.5" r="1.7" fill="rgb(30,41,59)" />
    <circle cx="17" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="33" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 22 25.5 Q 25 28 28 25.5" stroke="rgb(225,29,72)" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// ============================================================================
// 제13단원: 희망 (-고 싶어요) — 보수 및 신규 캐릭터
// ============================================================================

// 13-1. 배우다 (배우고 싶어요) - "태권도를 배우고 싶어요." (완전 연결된 도복 + 팔 + 다리)
export const BAEUDA_U13_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,242,242)" />
  <ellipse cx="50" cy="86" rx="26" ry="4" fill="rgb(254,202,202)" opacity="0.6" />
  <g transform="translate(22, 14)">
    <!-- Legs in Taekwondo stance -->
    <rect x="17" y="54" width="6" height="12" rx="2" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1" />
    <rect x="29" y="54" width="6" height="12" rx="2" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1" />
    <ellipse cx="20" cy="67" rx="3.8" ry="2" fill="rgb(254,215,170)" />
    <ellipse cx="32" cy="67" rx="3.8" ry="2" fill="rgb(254,215,170)" />

    <!-- White Taekwondo uniform torso & V-neck -->
    <path d="M 14 55 C 14 39 20 33 26 33 C 32 33 38 39 38 55 Z" fill="rgb(255,255,255)" stroke="rgb(203,213,225)" stroke-width="1.3" />
    <path d="M 21 33 L 26 41 L 31 33" fill="none" stroke="rgb(51,65,85)" stroke-width="1.6" stroke-linejoin="round" />

    <!-- Connected uniform arms + fists -->
    <path d="M 15 40 L 6 35" stroke="rgb(255,255,255)" stroke-width="5" stroke-linecap="round" />
    <path d="M 15 40 L 6 35" stroke="rgb(203,213,225)" stroke-width="5.2" stroke-linecap="round" opacity="0.35" />
    <circle cx="5" cy="34.5" r="3.5" fill="rgb(254,215,170)" />

    <path d="M 37 40 L 47 34" stroke="rgb(255,255,255)" stroke-width="5" stroke-linecap="round" />
    <path d="M 37 40 L 47 34" stroke="rgb(203,213,225)" stroke-width="5.2" stroke-linecap="round" opacity="0.35" />
    <circle cx="48" cy="33.5" r="3.5" fill="rgb(254,215,170)" />

    <!-- Yellow belt -->
    <rect x="16" y="45" width="20" height="3.8" rx="1" fill="rgb(234,179,8)" />
    <path d="M 24 49 L 22 56 M 28 49 L 30 56" stroke="rgb(202,138,4)" stroke-width="2" stroke-linecap="round" />

    <!-- Head -->
    <circle cx="26" cy="20" r="13.5" fill="rgb(254,215,170)" />
    <path d="M 11.7 19 C 10.6 -0.1 41.4 -0.1 40.3 19 C 39.5 13 34 9 26 9 C 18 9 12.5 13 11.7 19 Z" fill="rgb(51,65,85)" />
    <circle cx="21" cy="20.5" r="1.7" fill="rgb(30,41,59)" />
    <circle cx="31" cy="20.5" r="1.7" fill="rgb(30,41,59)" />
    <circle cx="17" cy="24" r="2.1" fill="rgb(244,114,182)" opacity="0.7" />
    <circle cx="35" cy="24" r="2.1" fill="rgb(244,114,182)" opacity="0.7" />
    <path d="M 22.5 25 Q 26 28.5 29.5 25" stroke="rgb(225,29,72)" stroke-width="1.6" stroke-linecap="round" fill="none" />
  </g>
  <path d="M 15 28 Q 18 28 18 25 Q 18 28 21 28 Q 18 28 18 31 Q 18 28 15 28 Z" fill="rgb(239,68,68)" />
  <path d="M 80 26 Q 83 26 83 23 Q 83 26 86 26 Q 83 26 83 29 Q 83 26 80 26 Z" fill="rgb(234,179,8)" />
</svg>`;

// 13-3. 사다 (사고 싶어요) - "빵을 사고 싶어요." (연결된 팔과 손에 들린 동전)
export const SADA_U13_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,243,199)" />
  <ellipse cx="50" cy="86" rx="28" ry="4" fill="rgb(253,230,138)" opacity="0.6" />

  <!-- Child with connected arm holding coin & pointing to bread -->
  <g transform="translate(22, 12)">
    <!-- Body -->
    <path d="M 14 50 C 14 36 20 30 26 30 C 32 30 38 36 38 50 Z" fill="rgb(16,185,129)" />
    <!-- Connected arms -->
    <path d="M 15 39 L 7 45" stroke="rgb(16,185,129)" stroke-width="4" stroke-linecap="round" />
    <circle cx="6.5" cy="45.5" r="3" fill="rgb(254,215,170)" />

    <path d="M 37 39 L 47 35" stroke="rgb(16,185,129)" stroke-width="4" stroke-linecap="round" />
    <circle cx="48" cy="34.5" r="3" fill="rgb(254,215,170)" />
    <!-- Coin held cleanly in hand -->
    <circle cx="52" cy="31" r="4.8" fill="rgb(234,179,8)" stroke="rgb(180,83,9)" stroke-width="1" />
    <text x="49.5" y="33" font-size="5" font-weight="900" fill="rgb(146,64,14)">₩</text>

    <!-- Head -->
    <circle cx="26" cy="18" r="12.5" fill="rgb(254,215,170)" />
    <path d="M 12.7 18 C 11.7 -1.1 40.3 -1.1 39.3 18 C 38.5 11 32 8 26 8 C 20 8 13.5 11 12.7 18 Z" fill="rgb(51,65,85)" />
    <circle cx="21.5" cy="18.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="30.5" cy="18.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="18" cy="22" r="1.9" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="34" cy="22" r="1.9" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 23 23.5 Q 26 26.5 29 23.5" stroke="rgb(225,29,72)" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </g>

  <!-- Bakery counter with bread -->
  <rect x="16" y="61" width="68" height="22" rx="3" fill="rgb(245,158,11)" />
  <ellipse cx="38" cy="61" rx="14" ry="4" fill="rgb(254,249,195)" />
  <ellipse cx="38" cy="58" rx="9" ry="5" fill="rgb(217,119,6)" />
  <line x1="34" y1="55" x2="36" y2="59" stroke="rgb(254,243,199)" stroke-width="1.2" stroke-linecap="round" />
  <line x1="39" y1="55" x2="41" y2="59" stroke="rgb(254,243,199)" stroke-width="1.2" stroke-linecap="round" />
  <!-- Bread bag -->
  <path d="M 59 50 L 72 50 L 70 66 L 57 66 Z" fill="rgb(253,230,138)" stroke="rgb(180,83,9)" stroke-width="1" />
  <circle cx="65" cy="50" r="4" fill="rgb(217,119,6)" />
</svg>`;

// 13-4. 여행하다 (여행하고 싶어요) - "바다로 여행하고 싶어요."
// 파란 바다 배경에서 밀짚모자 쓰고 연결된 팔로 캐리어 끄는 아이
export const YEOHAENGHADA_U13_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(224,242,254)" />
  <!-- Sea horizon wave bottom -->
  <path d="M 10 72 Q 30 66 50 72 Q 70 78 90 72 A 44 44 0 0 1 10 72 Z" fill="rgb(125,211,252)" opacity="0.65" />

  <!-- Yellow Luggage / Suitcase -->
  <g transform="translate(56, 40)">
    <path d="M 9 0 L 9 10 M 15 0 L 15 10 M 7 0 L 17 0" stroke="rgb(100,116,139)" stroke-width="2" stroke-linecap="round" />
    <rect x="3" y="10" width="18" height="27" rx="3" fill="rgb(251,191,36)" stroke="rgb(217,119,6)" stroke-width="1.4" />
    <line x1="3" y1="23" x2="21" y2="23" stroke="rgb(217,119,6)" stroke-width="1.2" />
    <circle cx="7" cy="38.5" r="2.5" fill="rgb(51,65,85)" />
    <circle cx="17" cy="38.5" r="2.5" fill="rgb(51,65,85)" />
  </g>

  <!-- Traveler Child with connected arm pulling handle -->
  <g transform="translate(15, 14)">
    <rect x="17" y="53" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <rect x="27" y="53" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <ellipse cx="19.5" cy="65" rx="3.8" ry="2.2" fill="rgb(239,68,68)" />
    <ellipse cx="29.5" cy="65" rx="3.8" ry="2.2" fill="rgb(239,68,68)" />

    <path d="M 13 54 C 13 40 19 35 25 35 C 31 35 37 40 37 54 Z" fill="rgb(14,165,233)" />
    <!-- Left arm waving happily, right arm reaching to luggage handle -->
    <path d="M 14 40 L 6 29" stroke="rgb(14,165,233)" stroke-width="4" stroke-linecap="round" />
    <circle cx="5.5" cy="28" r="3" fill="rgb(254,215,170)" />
    <path d="M 36 42 L 49 28" stroke="rgb(14,165,233)" stroke-width="4" stroke-linecap="round" />
    <circle cx="49" cy="27" r="3" fill="rgb(254,215,170)" />

    <circle cx="25" cy="20" r="13" fill="rgb(254,215,170)" />
    <ellipse cx="25" cy="12" rx="17" ry="4.5" fill="rgb(251,191,36)" />
    <path d="M 16 12 C 16 4 34 4 34 12 Z" fill="rgb(245,158,11)" />
    <circle cx="20.5" cy="21" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="29.5" cy="21" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="17" cy="24.5" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="33" cy="24.5" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 22 25.5 Q 25 28.5 28 25.5" stroke="rgb(225,29,72)" stroke-width="1.5" stroke-linecap="round" fill="none" />
  </g>
</svg>`;

// 13-5. 잘하다 (잘하고 싶어요) - "수학을 잘하고 싶어요."
// 100점 수학 공책을 꼭 들고 반짝반짝 눈을 빛내며 열심히 다짐하는 아이
export const JALHADA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(245,243,255)" />
  <ellipse cx="50" cy="86" rx="28" ry="4" fill="rgb(221,214,254)" opacity="0.6" />

  <g transform="translate(22, 13)">
    <!-- Body -->
    <path d="M 14 55 C 14 39 20 33 26 33 C 32 33 38 39 38 55 Z" fill="rgb(139,92,246)" />

    <!-- Arms holding Math 100 notebook -->
    <path d="M 15 41 L 8 49" stroke="rgb(139,92,246)" stroke-width="4" stroke-linecap="round" />
    <path d="M 37 41 L 44 49" stroke="rgb(139,92,246)" stroke-width="4" stroke-linecap="round" />

    <!-- Math notebook centered in hands -->
    <rect x="9" y="38" width="34" height="25" rx="3" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="1.4" />
    <rect x="9" y="38" width="6" height="25" rx="1.5" fill="rgb(59,130,246)" />
    <text x="20" y="50" font-size="9" font-weight="900" fill="rgb(30,41,59)">1+2=</text>
    <text x="22" y="59" font-size="9" font-weight="900" fill="rgb(239,68,68)">100!</text>

    <!-- Hands on notebook edges -->
    <circle cx="8" cy="50" r="3.2" fill="rgb(254,215,170)" />
    <circle cx="44" cy="50" r="3.2" fill="rgb(254,215,170)" />

    <!-- Head -->
    <circle cx="26" cy="20" r="13.5" fill="rgb(254,215,170)" />
    <path d="M 11.7 20 C 10.6 -0.4 41.4 -0.4 40.3 20 C 39.5 13 34 9 26 9 C 18 9 12.5 13 11.7 20 Z" fill="rgb(51,65,85)" />
    <circle cx="21" cy="20.5" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="31" cy="20.5" r="1.8" fill="rgb(30,41,59)" />
    <circle cx="21.7" cy="19.8" r="0.7" fill="rgb(255,255,255)" />
    <circle cx="31.7" cy="19.8" r="0.7" fill="rgb(255,255,255)" />
    <circle cx="17" cy="24" r="2.1" fill="rgb(244,114,182)" opacity="0.7" />
    <circle cx="35" cy="24" r="2.1" fill="rgb(244,114,182)" opacity="0.7" />
    <path d="M 22.5 25 Q 26 28.5 29.5 25" stroke="rgb(225,29,72)" stroke-width="1.6" stroke-linecap="round" fill="none" />
  </g>
  <path d="M 14 26 Q 17 26 17 23 Q 17 26 20 26 Q 17 26 17 29 Q 17 26 14 26 Z" fill="rgb(234,179,8)" />
  <path d="M 80 24 Q 83 24 83 21 Q 83 24 86 24 Q 83 24 83 27 Q 83 24 80 24 Z" fill="rgb(234,179,8)" />
</svg>`;

// ============================================================================
// 제19단원: 허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?) — 보수 및 신규 캐릭터
// ============================================================================

// 19-3. 빌리다 (빌려도 돼요?) - "색연필을 빌려도 돼요?" (머리+몸통+팔 완전한 아이)
export const BILLIDA_U19_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(254,249,195)" />
  <ellipse cx="50" cy="86" rx="28" ry="4" fill="rgb(253,224,71)" opacity="0.55" />

  <!-- Kid with complete torso & arms asking politely to borrow color pencils -->
  <g transform="translate(14, 17)">
    <rect x="14" y="54" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <rect x="25" y="54" width="5" height="11" rx="2" fill="rgb(71,85,105)" />
    <ellipse cx="16.5" cy="66" rx="3.8" ry="2.2" fill="rgb(139,92,246)" />
    <ellipse cx="27.5" cy="66" rx="3.8" ry="2.2" fill="rgb(139,92,246)" />

    <path d="M 10 55 C 10 39 16 33 22 33 C 28 33 34 39 34 55 Z" fill="rgb(168,85,247)" />
    <!-- Left arm down, right arm politely reaching toward colored pencils -->
    <path d="M 11 40 L 6 48" stroke="rgb(168,85,247)" stroke-width="4" stroke-linecap="round" />
    <circle cx="5.5" cy="49" r="3" fill="rgb(254,215,170)" />

    <path d="M 33 41 L 47 39" stroke="rgb(168,85,247)" stroke-width="4" stroke-linecap="round" />
    <circle cx="48" cy="39" r="3.2" fill="rgb(254,215,170)" />

    <circle cx="22" cy="19" r="13" fill="rgb(254,215,170)" />
    <path d="M 8.2 19 C 7.2 -0.7 36.8 -0.7 35.8 19 C 35 12 29 8 22 8 C 15 8 9 12 8.2 19 Z" fill="rgb(51,65,85)" />
    <circle cx="18" cy="19.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="26" cy="19.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="15" cy="23" r="1.9" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="29" cy="23" r="1.9" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 19.5 24 Q 22 26.5 24.5 24" stroke="rgb(225,29,72)" stroke-width="1.4" stroke-linecap="round" fill="none" />
  </g>

  <!-- Color pencils on desk stand -->
  <g transform="translate(61, 44)">
    <rect x="0" y="18" width="22" height="16" rx="2" fill="rgb(251,146,60)" opacity="0.85" />
    <rect x="4" y="4" width="3.5" height="16" fill="rgb(239,68,68)" />
    <polygon points="4,4 5.75,0 7.5,4" fill="rgb(254,215,170)" />
    <rect x="9.5" y="2" width="3.5" height="18" fill="rgb(59,130,246)" />
    <polygon points="9.5,2 11.25,-2 13,2" fill="rgb(254,215,170)" />
    <rect x="15" y="5" width="3.5" height="15" fill="rgb(16,185,129)" />
    <polygon points="15,5 16.75,1 18.5,5" fill="rgb(254,215,170)" />
  </g>
</svg>`;

// 19-5. 움직이다 (움직여도 돼요?) - "자리에서 움직여도 돼요?"
// 의자 자리에서 조심스레 일어나며 팔을 움직여 허락을 구하는 아이
export const UMJIGIDA_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(236,253,245)" />
  <ellipse cx="50" cy="86" rx="30" ry="4" fill="rgb(167,243,208)" opacity="0.6" />

  <!-- School chair on left -->
  <g transform="translate(18, 48)">
    <rect x="4" y="0" width="4" height="32" rx="1.5" fill="rgb(180,83,9)" />
    <rect x="4" y="2" width="14" height="10" rx="2" fill="rgb(217,119,6)" />
    <rect x="4" y="18" width="20" height="4" rx="1.5" fill="rgb(217,119,6)" />
    <rect x="20" y="20" width="3.5" height="12" rx="1" fill="rgb(180,83,9)" />
  </g>

  <!-- Child stepping out from seat with gentle motion lines -->
  <g transform="translate(36, 16)">
    <!-- Legs stepping slightly right -->
    <path d="M 20 55 L 15 67" stroke="rgb(71,85,105)" stroke-width="5" stroke-linecap="round" />
    <path d="M 28 55 L 35 66" stroke="rgb(71,85,105)" stroke-width="5" stroke-linecap="round" />
    <ellipse cx="14.5" cy="68" rx="3.8" ry="2.2" fill="rgb(20,184,166)" />
    <ellipse cx="36" cy="67" rx="3.8" ry="2.2" fill="rgb(20,184,166)" />

    <path d="M 13 56 C 13 40 19 34 25 34 C 31 34 37 40 37 56 Z" fill="rgb(20,184,166)" />
    <!-- Connected arms: left raised slightly asking permission, right balanced -->
    <path d="M 14 41 L 7 49" stroke="rgb(20,184,166)" stroke-width="4" stroke-linecap="round" />
    <circle cx="6.5" cy="50" r="3" fill="rgb(254,215,170)" />
    <path d="M 36 40 L 42 25" stroke="rgb(20,184,166)" stroke-width="4" stroke-linecap="round" />
    <circle cx="42.5" cy="24" r="3.2" fill="rgb(254,215,170)" />

    <circle cx="25" cy="20" r="13" fill="rgb(254,215,170)" />
    <path d="M 11.2 20 C 10.2 0.3 39.8 0.3 38.8 20 C 38 13 32 9 25 9 C 18 9 12 13 11.2 20 Z" fill="rgb(51,65,85)" />
    <circle cx="20.5" cy="20.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="29.5" cy="20.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="17" cy="24" r="1.9" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="33" cy="24" r="1.9" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 22 25 Q 25 27.5 28 25" stroke="rgb(225,29,72)" stroke-width="1.4" stroke-linecap="round" fill="none" />
  </g>

  <!-- Subtle curved movement lines -->
  <path d="M 32 34 Q 28 40 32 46" stroke="rgb(16,185,129)" stroke-width="1.8" stroke-linecap="round" fill="none" />
  <path d="M 79 34 Q 83 40 79 46" stroke="rgb(16,185,129)" stroke-width="1.8" stroke-linecap="round" fill="none" />
</svg>`;

// ============================================================================
// 제20단원: 의무 (-아야 돼요, -어야 돼요, -해야 돼요) — 손에 약 바르기
// ============================================================================

// 20-5. 바르다 (발라야 돼요) - "손에 약을 발라야 돼요."
export const BAREUDA_U20_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="46" fill="rgb(240,253,250)" />
  <ellipse cx="50" cy="86" rx="28" ry="4" fill="rgb(153,246,228)" opacity="0.6" />

  <!-- Friendly child applying ointment cream to hand -->
  <g transform="translate(20, 15)">
    <path d="M 14 57 C 14 41 20 35 28 35 C 36 35 42 41 42 57 Z" fill="rgb(20,184,166)" />
    <!-- Left arm holding hand forward -->
    <path d="M 16 43 L 10 53 L 23 55" stroke="rgb(20,184,166)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <ellipse cx="24" cy="55" rx="5.5" ry="4" fill="rgb(254,215,170)" />
    <!-- Ointment cream dollop on hand -->
    <ellipse cx="24" cy="53" rx="3" ry="1.8" fill="rgb(255,255,255)" stroke="rgb(148,163,184)" stroke-width="0.6" />

    <!-- Right arm squeezing red+white medicine tube -->
    <path d="M 40 42 L 45 49 L 36 50" stroke="rgb(20,184,166)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <circle cx="36" cy="50" r="3" fill="rgb(254,215,170)" />
    <g transform="translate(26, 36) rotate(-32)">
      <rect x="0" y="6" width="10" height="16" rx="2" fill="rgb(255,255,255)" stroke="rgb(239,68,68)" stroke-width="1.2" />
      <rect x="2" y="10" width="6" height="4" fill="rgb(239,68,68)" />
      <!-- Red cross symbol on ointment tube -->
      <line x1="5" y1="10.8" x2="5" y2="13.2" stroke="rgb(255,255,255)" stroke-width="1" />
      <line x1="3.8" y1="12" x2="6.2" y2="12" stroke="rgb(255,255,255)" stroke-width="1" />
    </g>

    <!-- Head -->
    <circle cx="28" cy="20" r="13.5" fill="rgb(254,215,170)" />
    <path d="M 13.7 20 C 12.6 -0.4 43.4 -0.4 42.3 20 C 41.5 13 35.5 9 28 9 C 20.5 9 14.5 13 13.7 20 Z" fill="rgb(51,65,85)" />
    <circle cx="23.5" cy="20.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="32.5" cy="20.5" r="1.6" fill="rgb(30,41,59)" />
    <circle cx="20" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <circle cx="36" cy="24" r="2" fill="rgb(244,114,182)" opacity="0.65" />
    <path d="M 25 25 Q 28 27.5 31 25" stroke="rgb(225,29,72)" stroke-width="1.4" stroke-linecap="round" fill="none" />
  </g>
  <path d="M 14 30 Q 17 30 17 27 Q 17 30 20 30 Q 17 30 17 33 Q 17 30 14 30 Z" fill="rgb(16,185,129)" />
  <path d="M 78 28 Q 81 28 81 25 Q 81 28 84 28 Q 81 28 81 31 Q 81 28 78 28 Z" fill="rgb(16,185,129)" />
</svg>`;
