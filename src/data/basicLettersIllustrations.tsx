import React from 'react';

// Cute Vector Illustrations for 21 Basic Letter Words (ViewBox 0 0 160 160)
export const BASIC_LETTERS_ILLUSTRATIONS: Record<string, React.ReactNode> = {
  // 1. 사자 (Lion)
  사자: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      <path d="M 120 100 C 145 95 140 120 130 130" stroke="#b45309" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="132" cy="130" r="5" fill="#78350f" />
      <ellipse cx="80" cy="108" rx="28" ry="24" fill="#fbbf24" stroke="#b45309" strokeWidth="2.5" />
      <ellipse cx="80" cy="112" rx="18" ry="15" fill="#fef3c7" />
      <path d="M 64 96 L 64 128 C 64 133 74 133 74 128 L 74 96 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <path d="M 86 96 L 86 128 C 86 133 96 133 96 128 L 96 96 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
      <circle cx="67" cy="128" r="1.5" fill="#78350f" /><circle cx="71" cy="128" r="1.5" fill="#78350f" />
      <circle cx="89" cy="128" r="1.5" fill="#78350f" /><circle cx="93" cy="128" r="1.5" fill="#78350f" />
      <g fill="#92400e" stroke="#78350f" strokeWidth="2.5">
        <circle cx="80" cy="56" r="42" fill="#b45309" />
        <circle cx="48" cy="38" r="14" /><circle cx="68" cy="24" r="15" />
        <circle cx="92" cy="24" r="15" /><circle cx="112" cy="38" r="14" />
        <circle cx="122" cy="58" r="15" /><circle cx="118" cy="80" r="14" />
        <circle cx="102" cy="94" r="13" /><circle cx="80" cy="98" r="13" />
        <circle cx="58" cy="94" r="13" /><circle cx="42" cy="80" r="14" /><circle cx="38" cy="58" r="15" />
      </g>
      <circle cx="54" cy="36" r="11" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
      <circle cx="54" cy="36" r="6" fill="#fde68a" />
      <circle cx="106" cy="36" r="11" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
      <circle cx="106" cy="36" r="6" fill="#fde68a" />
      <ellipse cx="80" cy="62" rx="30" ry="27" fill="#fbbf24" stroke="#b45309" strokeWidth="2.5" />
      <ellipse cx="73" cy="71" rx="8" ry="6" fill="#fef3c7" /><ellipse cx="87" cy="71" rx="8" ry="6" fill="#fef3c7" />
      <ellipse cx="61" cy="69" rx="4.5" ry="3" fill="#f472b6" opacity="0.6" /><ellipse cx="99" cy="69" rx="4.5" ry="3" fill="#f472b6" opacity="0.6" />
      <circle cx="68" cy="58" r="4.5" fill="#1e1b4b" /><circle cx="70" cy="56" r="1.8" fill="#ffffff" />
      <circle cx="92" cy="58" r="4.5" fill="#1e1b4b" /><circle cx="94" cy="56" r="1.8" fill="#ffffff" />
      <path d="M 64 51 Q 68 49 72 52" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 88 52 Q 92 49 96 51" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 77 66 L 83 66 L 80 69 Z" fill="#78350f" />
      <path d="M 76 71 Q 80 74 84 71" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),

  // 2. 버터 (Butter)
  버터: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Plate */}
      <ellipse cx="80" cy="122" rx="60" ry="18" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
      <ellipse cx="80" cy="119" rx="52" ry="14" fill="#ffffff" />
      {/* Big Butter Block (3D isometric block) */}
      <polygon points="35,85 85,60 130,80 80,105" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
      <polygon points="35,85 80,105 80,120 35,100" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
      <polygon points="80,105 130,80 130,95 80,120" fill="#eab308" stroke="#ca8a04" strokeWidth="3" />
      {/* Melting Pat on Top */}
      <ellipse cx="85" cy="75" rx="14" ry="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
      <path d="M 82 82 Q 85 92 88 88" stroke="#facc15" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Butter Knife */}
      <path d="M 25 125 L 75 105 L 140 50" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
      <path d="M 25 125 L 45 117" stroke="#b45309" strokeWidth="9" strokeLinecap="round" />
      {/* Cute Face on Butter */}
      <circle cx="55" cy="98" r="2.5" fill="#713f12" />
      <circle cx="68" cy="103" r="2.5" fill="#713f12" />
      <path d="M 60 104 Q 62 107 64 104" stroke="#713f12" strokeWidth="1.5" fill="none" />
      <circle cx="51" cy="100" r="2" fill="#f472b6" opacity="0.6" />
      <circle cx="72" cy="105" r="2" fill="#f472b6" opacity="0.6" />
    </svg>
  ),

  // 3. 포도 (Grapes)
  포도: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Stem & Vine */}
      <path d="M 80 20 Q 82 40 80 50" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M 80 28 Q 60 18 50 30" stroke="#15803d" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Green Leaves */}
      <path d="M 80 38 C 55 25 50 50 70 52 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
      <path d="M 80 38 C 105 25 110 50 90 52 Z" fill="#16a34a" stroke="#15803d" strokeWidth="2.5" />
      {/* Grape Cluster (3 tiers) */}
      {/* Tier 1 (top 4 grapes) */}
      <circle cx="55" cy="66" r="14" fill="#9333ea" stroke="#581c87" strokeWidth="2.5" />
      <circle cx="73" cy="62" r="14" fill="#a855f7" stroke="#581c87" strokeWidth="2.5" />
      <circle cx="91" cy="63" r="14" fill="#9333ea" stroke="#581c87" strokeWidth="2.5" />
      <circle cx="108" cy="68" r="13" fill="#7e22ce" stroke="#581c87" strokeWidth="2.5" />
      {/* Tier 2 (middle 3 grapes) */}
      <circle cx="62" cy="86" r="14" fill="#a855f7" stroke="#581c87" strokeWidth="2.5" />
      <circle cx="82" cy="84" r="15" fill="#c084fc" stroke="#581c87" strokeWidth="2.5" />
      <circle cx="101" cy="88" r="14" fill="#9333ea" stroke="#581c87" strokeWidth="2.5" />
      {/* Tier 3 (lower 2 grapes) */}
      <circle cx="71" cy="107" r="13" fill="#9333ea" stroke="#581c87" strokeWidth="2.5" />
      <circle cx="91" cy="108" r="13" fill="#a855f7" stroke="#581c87" strokeWidth="2.5" />
      {/* Bottom Grape */}
      <circle cx="81" cy="126" r="12" fill="#7e22ce" stroke="#581c87" strokeWidth="2.5" />
      {/* Highlights */}
      <circle cx="78" cy="78" r="4" fill="#ffffff" opacity="0.6" />
      <circle cx="67" cy="103" r="3" fill="#ffffff" opacity="0.6" />
      {/* Cute eyes on center grape */}
      <circle cx="78" cy="85" r="2" fill="#2e1065" />
      <circle cx="87" cy="85" r="2" fill="#2e1065" />
      <path d="M 81 89 Q 83 91 85 89" stroke="#2e1065" strokeWidth="1.5" fill="none" />
    </svg>
  ),

  // 4. 구두 (Shoes)
  구두: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Left Shoe */}
      <g transform="translate(15, 30)">
        {/* Heel */}
        <rect x="20" y="70" width="12" height="22" rx="3" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" />
        {/* Shoe Body */}
        <path d="M 18 72 C 16 55 35 55 42 62 C 55 68 65 72 85 70 C 95 68 100 78 88 88 C 70 94 30 92 18 72 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />
        {/* Inside Sole */}
        <ellipse cx="40" cy="65" rx="10" ry="5" fill="#fecaca" />
        {/* Buckle Strap */}
        <path d="M 36 60 Q 45 66 52 70" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="45" cy="66" r="4" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
        {/* Sparkle */}
        <path d="M 78 68 Q 80 60 82 68 Q 90 70 82 72 Q 80 80 78 72 Q 70 70 78 68 Z" fill="#ffffff" opacity="0.8" />
      </g>
      {/* Right Shoe */}
      <g transform="translate(45, 45)">
        <rect x="20" y="70" width="12" height="22" rx="3" fill="#991b1b" stroke="#7f1d1d" strokeWidth="2" />
        <path d="M 18 72 C 16 55 35 55 42 62 C 55 68 65 72 85 70 C 95 68 100 78 88 88 C 70 94 30 92 18 72 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
        <ellipse cx="40" cy="65" rx="10" ry="5" fill="#fecaca" />
        <path d="M 36 60 Q 45 66 52 70" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="45" cy="66" r="4" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
      </g>
    </svg>
  ),

  // 5. 버스 (Bus)
  버스: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Bus Body */}
      <rect x="20" y="42" width="120" height="70" rx="18" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
      {/* Roof Highlight */}
      <path d="M 32 44 L 128 44" stroke="#fef08a" strokeWidth="4" strokeLinecap="round" />
      {/* Windshield & Windows */}
      <rect x="28" y="52" width="28" height="26" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      <rect x="62" y="52" width="24" height="26" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      <rect x="92" y="52" width="24" height="26" rx="6" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      <rect x="120" y="52" width="14" height="26" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      {/* Passenger Emojis inside */}
      <circle cx="42" cy="64" r="5" fill="#f59e0b" />
      <circle cx="74" cy="64" r="5" fill="#ec4899" />
      <circle cx="104" cy="64" r="5" fill="#3b82f6" />
      {/* Side Stripe */}
      <rect x="20" y="86" width="120" height="8" fill="#3b82f6" />
      {/* Headlights */}
      <circle cx="24" cy="98" r="5" fill="#fef08a" stroke="#eab308" strokeWidth="1.5" />
      <circle cx="136" cy="98" r="4" fill="#ef4444" />
      {/* Smiling Bumper */}
      <path d="M 20 106 L 140 106" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      {/* Wheels */}
      <circle cx="48" cy="116" r="14" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      <circle cx="48" cy="116" r="6" fill="#94a3b8" />
      <circle cx="112" cy="116" r="14" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      <circle cx="112" cy="116" r="6" fill="#94a3b8" />
    </svg>
  ),

  // 6. 가지 (Eggplant)
  가지: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Stem */}
      <path d="M 80 18 Q 85 30 80 40" stroke="#15803d" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Eggplant Body (Tear shape) */}
      <path d="M 80 40 C 65 45 50 70 48 95 C 45 125 70 142 88 142 C 108 142 125 125 120 95 C 115 65 95 45 80 40 Z" fill="#6b21a8" stroke="#3b0764" strokeWidth="3" />
      {/* Calyx / Leaf Crown */}
      <path d="M 80 38 L 62 48 L 68 56 L 56 65 L 75 62 L 80 72 L 86 62 L 105 65 L 94 56 L 100 48 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
      {/* Glossy Curved Highlight */}
      <path d="M 60 85 C 58 105 68 125 80 132" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.4" />
      {/* Cute Face */}
      <circle cx="75" cy="98" r="3" fill="#ffffff" /><circle cx="75" cy="98" r="2" fill="#1e1b4b" />
      <circle cx="93" cy="98" r="3" fill="#ffffff" /><circle cx="93" cy="98" r="2" fill="#1e1b4b" />
      <path d="M 81 106 Q 84 110 87 106" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="68" cy="103" r="3.5" fill="#f472b6" opacity="0.7" />
      <circle cx="100" cy="103" r="3.5" fill="#f472b6" opacity="0.7" />
    </svg>
  ),

  // 7. 야자 (Palm tree)
  야자: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Island Sand */}
      <ellipse cx="80" cy="138" rx="60" ry="14" fill="#fde047" stroke="#ca8a04" strokeWidth="2.5" />
      {/* Ocean waves */}
      <path d="M 15 142 Q 25 138 35 142 Q 45 146 55 142" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 105 142 Q 115 138 125 142 Q 135 146 145 142" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Trunk (Segmented curved palm trunk) */}
      <path d="M 76 135 C 72 100 85 70 80 48" stroke="#92400e" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M 76 135 C 72 100 85 70 80 48" stroke="#b45309" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Coconuts */}
      <circle cx="76" cy="50" r="6" fill="#78350f" /><circle cx="85" cy="52" r="6" fill="#78350f" /><circle cx="80" cy="57" r="6" fill="#78350f" />
      {/* Palm Fronds (big curved green leaves) */}
      <path d="M 80 48 C 65 25 25 35 20 60 C 40 50 65 52 80 48 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M 80 48 C 65 15 45 10 35 25 C 50 28 68 38 80 48 Z" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
      <path d="M 80 48 C 95 25 135 35 140 60 C 120 50 95 52 80 48 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      <path d="M 80 48 C 95 15 115 10 125 25 C 110 28 92 38 80 48 Z" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
      <path d="M 80 48 C 75 18 85 10 80 12 C 78 20 80 35 80 48 Z" fill="#4ade80" stroke="#15803d" strokeWidth="2" />
    </svg>
  ),

  // 8. 여자 (Girl)
  여자: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Pigtails / Hair Bun */}
      <circle cx="45" cy="62" r="14" fill="#92400e" />
      <circle cx="115" cy="62" r="14" fill="#92400e" />
      <circle cx="45" cy="62" r="6" fill="#f43f5e" /><circle cx="115" cy="62" r="6" fill="#f43f5e" />
      {/* Body & Dress */}
      <path d="M 55 125 L 65 95 L 95 95 L 105 125 Z" fill="#fb7185" stroke="#e11d48" strokeWidth="2.5" />
      <circle cx="80" cy="102" r="3" fill="#ffffff" /><circle cx="80" cy="112" r="3" fill="#ffffff" />
      {/* Head */}
      <circle cx="80" cy="70" r="28" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
      {/* Hair Bangs */}
      <path d="M 54 62 C 60 45 100 45 106 62 C 95 54 85 55 80 62 C 75 55 65 54 54 62 Z" fill="#92400e" />
      {/* Eyes */}
      <circle cx="70" cy="72" r="3.5" fill="#1e1b4b" /><circle cx="71" cy="70" r="1.2" fill="#ffffff" />
      <circle cx="90" cy="72" r="3.5" fill="#1e1b4b" /><circle cx="91" cy="70" r="1.2" fill="#ffffff" />
      {/* Smile & Blush */}
      <path d="M 76 80 Q 80 84 84 80" stroke="#b91c1c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="78" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
      <ellipse cx="96" cy="78" rx="4" ry="2.5" fill="#f43f5e" opacity="0.6" />
      {/* Ribbon on head */}
      <polygon points="80,48 70,42 74,52" fill="#f43f5e" />
      <polygon points="80,48 90,42 86,52" fill="#f43f5e" />
      <circle cx="80" cy="48" r="3.5" fill="#ffe4e6" />
    </svg>
  ),

  // 9. 표 (Ticket)
  표: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Ticket Shadow & Body */}
      <g transform="rotate(-6 80 80)">
        <path
          d="M 25 50 L 135 50 C 135 60 145 60 145 70 C 145 80 135 80 135 90 L 135 110 L 25 110 C 25 100 15 100 15 90 C 15 80 25 80 25 70 Z"
          fill="#fef08a"
          stroke="#ca8a04"
          strokeWidth="3.5"
        />
        {/* Dashed Tear Line */}
        <line x1="58" y1="50" x2="58" y2="110" stroke="#ca8a04" strokeWidth="2.5" strokeDasharray="5,4" />
        {/* Star & Barcode */}
        <polygon points="41,72 44,79 51,80 46,85 47,92 41,88 35,92 36,85 31,80 38,79" fill="#f59e0b" />
        <text x="80" y="78" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#b45309" textAnchor="middle">
          TICKET
        </text>
        <text x="80" y="94" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="10" fill="#78350f" textAnchor="middle">
          ★ 입장권 ★
        </text>
        <line x1="108" y1="62" x2="108" y2="98" stroke="#92400e" strokeWidth="2" />
        <line x1="113" y1="62" x2="113" y2="98" stroke="#92400e" strokeWidth="1" />
        <line x1="117" y1="62" x2="117" y2="98" stroke="#92400e" strokeWidth="3" />
        <line x1="123" y1="62" x2="123" y2="98" stroke="#92400e" strokeWidth="1.5" />
      </g>
    </svg>
  ),

  // 10. 우유 (Milk Carton)
  우유: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Straw */}
      <path d="M 68 25 L 75 45 L 80 50" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M 69 26 L 74 44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Gable Top */}
      <polygon points="50,50 80,30 110,50" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
      <polygon points="80,30 110,50 120,44 90,24" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" />
      {/* Main Carton Body */}
      <rect x="50" y="50" width="60" height="85" rx="4" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
      {/* 3D Side flap */}
      <polygon points="110,50 120,44 120,125 110,135" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
      {/* Blue Banner */}
      <rect x="50" y="70" width="60" height="25" fill="#38bdf8" />
      <text x="80" y="88" fontFamily="'KyoboHand', sans-serif" fontWeight="900" fontSize="16" fill="#ffffff" textAnchor="middle">
        MILK
      </text>
      {/* Cute Cow Spot / Smile */}
      <circle cx="70" cy="108" r="3" fill="#0f172a" /><circle cx="90" cy="108" r="3" fill="#0f172a" />
      <path d="M 76 114 Q 80 118 84 114" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="65" cy="112" rx="3" ry="2" fill="#f472b6" opacity="0.6" />
      <ellipse cx="95" cy="112" rx="3" ry="2" fill="#f472b6" opacity="0.6" />
    </svg>
  ),

  // 11. 배 (Pear - fruit)
  배: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Stem */}
      <path d="M 80 20 Q 88 32 80 44" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Leaf */}
      <path d="M 82 32 C 105 20 115 35 102 44 C 92 46 84 40 82 32 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      {/* Pear Body (Classic bulbous round fruit) */}
      <path d="M 80 42 C 65 42 62 60 58 75 C 50 95 48 115 56 128 C 66 142 94 142 104 128 C 112 115 110 95 102 75 C 98 60 95 42 80 42 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />
      {/* Dotted texture */}
      <circle cx="68" cy="95" r="1.5" fill="#ca8a04" /><circle cx="92" cy="105" r="1.5" fill="#ca8a04" />
      <circle cx="82" cy="120" r="1.5" fill="#ca8a04" /><circle cx="74" cy="110" r="1.5" fill="#ca8a04" />
      {/* Cute Face */}
      <circle cx="73" cy="85" r="3" fill="#713f12" /><circle cx="87" cy="85" r="3" fill="#713f12" />
      <path d="M 77 91 Q 80 94 83 91" stroke="#713f12" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="67" cy="88" r="3" fill="#fb923c" opacity="0.6" />
      <circle cx="93" cy="88" r="3" fill="#fb923c" opacity="0.6" />
    </svg>
  ),

  // 12. 제비 (Swallow)
  제비: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Swallow Wings in Flight */}
      <path d="M 80 70 C 50 40 25 35 18 42 C 30 65 60 75 75 78 Z" fill="#1e1b4b" stroke="#0f172a" strokeWidth="2" />
      <path d="M 80 70 C 110 40 135 35 142 42 C 130 65 100 75 85 78 Z" fill="#1e1b4b" stroke="#0f172a" strokeWidth="2" />
      {/* Forked Tail */}
      <polygon points="76,105 80,95 84,105 92,138 80,118 68,138" fill="#1e1b4b" stroke="#0f172a" strokeWidth="2" />
      {/* Body & White Belly */}
      <ellipse cx="80" cy="80" rx="16" ry="24" fill="#1e1b4b" stroke="#0f172a" strokeWidth="2" />
      <ellipse cx="80" cy="84" rx="11" ry="17" fill="#ffffff" />
      {/* Red Throat */}
      <path d="M 72 65 C 75 62 85 62 88 65 C 88 72 72 72 72 65 Z" fill="#ef4444" />
      {/* Head & Beak */}
      <circle cx="80" cy="56" r="12" fill="#1e1b4b" />
      <polygon points="76,54 84,54 80,44" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
      {/* Eyes */}
      <circle cx="75" cy="55" r="2.5" fill="#ffffff" /><circle cx="75" cy="55" r="1.5" fill="#0f172a" />
      <circle cx="85" cy="55" r="2.5" fill="#ffffff" /><circle cx="85" cy="55" r="1.5" fill="#0f172a" />
    </svg>
  ),

  // 13. 얘 (Hand-raising child)
  얘: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Body & Shirt */}
      <path d="M 55 130 L 62 95 L 98 95 L 105 130 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
      {/* Left Hand Down */}
      <path d="M 62 98 Q 50 110 46 122" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Right Hand Raised UP High (Waving "얘들아!") */}
      <path d="M 98 98 Q 115 75 120 45" stroke="#fed7aa" strokeWidth="8" strokeLinecap="round" fill="none" />
      <circle cx="120" cy="42" r="7" fill="#fed7aa" />
      {/* Head */}
      <circle cx="80" cy="68" r="26" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
      {/* Hair */}
      <path d="M 54 62 C 55 42 105 42 106 62 C 95 52 85 54 80 58 C 75 54 65 52 54 62 Z" fill="#451a03" />
      {/* Smiling Face */}
      <circle cx="72" cy="68" r="3.5" fill="#1e1b4b" /><circle cx="73" cy="66" r="1.2" fill="#ffffff" />
      <circle cx="88" cy="68" r="3.5" fill="#1e1b4b" /><circle cx="89" cy="66" r="1.2" fill="#ffffff" />
      <path d="M 76 76 Q 80 82 84 76" stroke="#b91c1c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="66" cy="74" r="3.5" fill="#f43f5e" opacity="0.6" />
      <circle cx="94" cy="74" r="3.5" fill="#f43f5e" opacity="0.6" />
      {/* Speech lines near raised hand */}
      <path d="M 128 32 L 136 28" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 132 42 L 140 44" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),

  // 14. 시계 (Clock)
  시계: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Twin Bells */}
      <circle cx="48" cy="42" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
      <circle cx="112" cy="42" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="2.5" />
      <path d="M 48 42 L 80 60 L 112 42" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* Feet */}
      <line x1="50" y1="125" x2="40" y2="142" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
      <line x1="110" y1="125" x2="120" y2="142" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
      {/* Main Clock Case */}
      <circle cx="80" cy="90" r="44" fill="#f87171" stroke="#dc2626" strokeWidth="4" />
      <circle cx="80" cy="90" r="36" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
      {/* Hour Marks */}
      <circle cx="80" cy="60" r="2.5" fill="#1e293b" />
      <circle cx="110" cy="90" r="2.5" fill="#1e293b" />
      <circle cx="80" cy="120" r="2.5" fill="#1e293b" />
      <circle cx="50" cy="90" r="2.5" fill="#1e293b" />
      {/* Clock Hands (3 o'clock) */}
      <line x1="80" y1="90" x2="80" y2="68" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="80" y1="90" x2="98" y2="90" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="80" cy="90" r="4" fill="#dc2626" />
    </svg>
  ),

  // 15. 사과 (Apple)
  사과: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Stem */}
      <path d="M 80 22 C 84 35 88 42 80 50" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Leaf */}
      <path d="M 82 34 C 105 20 118 36 102 46 C 92 48 84 42 82 34 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      {/* Apple Heart Body */}
      <path
        d="M 80 52 C 60 38 35 48 35 78 C 35 110 60 138 80 142 C 100 138 125 110 125 78 C 125 48 100 38 80 52 Z"
        fill="#ef4444"
        stroke="#b91c1c"
        strokeWidth="3.5"
      />
      {/* Glossy White Highlight */}
      <path d="M 50 68 C 45 85 48 105 58 118" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Cute Face */}
      <circle cx="72" cy="88" r="3" fill="#ffffff" /><circle cx="72" cy="88" r="2" fill="#1e1b4b" />
      <circle cx="88" cy="88" r="3" fill="#ffffff" /><circle cx="88" cy="88" r="2" fill="#1e1b4b" />
      <path d="M 77 95 Q 80 98 83 95" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="65" cy="92" r="3" fill="#fbcfe8" opacity="0.8" />
      <circle cx="95" cy="92" r="3" fill="#fbcfe8" opacity="0.8" />
    </svg>
  ),

  // 16. 뭐 (Curious question mark face)
  뭐: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Floating Big 3D Question Mark */}
      <path
        d="M 105 35 C 105 22 125 22 125 35 C 125 48 112 50 112 62"
        stroke="#8b5cf6"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="112" cy="74" r="3.5" fill="#8b5cf6" />
      {/* Round Smiley Face */}
      <circle cx="72" cy="90" r="44" fill="#fde047" stroke="#ca8a04" strokeWidth="3.5" />
      {/* Big Inquiring Eyes */}
      <ellipse cx="58" cy="84" rx="7" ry="10" fill="#ffffff" stroke="#713f12" strokeWidth="2" />
      <circle cx="60" cy="84" r="4.5" fill="#1e1b4b" /><circle cx="61" cy="82" r="1.5" fill="#ffffff" />
      <ellipse cx="86" cy="82" rx="9" ry="12" fill="#ffffff" stroke="#713f12" strokeWidth="2" />
      <circle cx="88" cy="82" r="5.5" fill="#1e1b4b" /><circle cx="90" cy="80" r="2" fill="#ffffff" />
      {/* Tilted Eyebrows (one high, one low) */}
      <path d="M 52 68 Q 60 72 66 70" stroke="#713f12" strokeWidth="3" strokeLinecap="round" />
      <path d="M 80 62 Q 88 58 96 64" stroke="#713f12" strokeWidth="3" strokeLinecap="round" />
      {/* Puzzled O-shaped Mouth */}
      <ellipse cx="74" cy="108" rx="6" ry="8" fill="#713f12" />
      <circle cx="50" cy="98" r="4" fill="#fb923c" opacity="0.6" />
      <circle cx="96" cy="98" r="4" fill="#fb923c" opacity="0.6" />
    </svg>
  ),

  // 17. 회사 (Office Building)
  회사: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Left Tower */}
      <rect x="30" y="55" width="40" height="85" rx="4" fill="#93c5fd" stroke="#2563eb" strokeWidth="2.5" />
      {/* Right High Tower */}
      <rect x="75" y="32" width="55" height="108" rx="4" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="3" />
      {/* Tower Antenna */}
      <line x1="102" y1="32" x2="102" y2="18" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="102" cy="16" r="3" fill="#ef4444" />
      {/* Glass Windows Grid on High Tower */}
      {Array.from({ length: 5 }).map((_, r) => (
        <g key={`win-r-${r}`}>
          <rect x="83" y={42 + r * 16} width="16" height="10" rx="2" fill="#ffffff" opacity="0.8" />
          <rect x="106" y={42 + r * 16} width="16" height="10" rx="2" fill="#ffffff" opacity="0.8" />
        </g>
      ))}
      {/* Windows on Left Tower */}
      {Array.from({ length: 4 }).map((_, r) => (
        <rect key={`win-l-${r}`} x="40" y={65 + r * 16} width="20" height="9" rx="2" fill="#ffffff" opacity="0.8" />
      ))}
      {/* Entrance Door */}
      <rect x="94" y="122" width="18" height="18" rx="2" fill="#1e3a8a" />
      <line x1="103" y1="122" x2="103" y2="140" stroke="#93c5fd" strokeWidth="1" />
      {/* Trees at base */}
      <circle cx="22" cy="135" r="9" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
      <circle cx="138" cy="135" r="9" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
    </svg>
  ),

  // 18. 가위 (Scissors)
  가위: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      <g transform="rotate(25 80 80)">
        {/* Steel Blade 1 */}
        <path d="M 80 75 L 125 35 C 130 32 135 38 128 45 L 85 85 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.5" />
        {/* Steel Blade 2 */}
        <path d="M 80 75 L 125 115 C 130 118 135 112 128 105 L 85 65 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="2.5" />
        {/* Center Pivot Screw */}
        <circle cx="80" cy="75" r="5" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
        {/* Plastic Handles */}
        <ellipse cx="48" cy="55" rx="18" ry="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="4" />
        <ellipse cx="48" cy="55" rx="10" ry="7" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
        <ellipse cx="48" cy="95" rx="18" ry="14" fill="#f43f5e" stroke="#e11d48" strokeWidth="4" />
        <ellipse cx="48" cy="95" rx="10" ry="7" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />
      </g>
    </svg>
  ),

  // 19. 돼지 (Pig)
  돼지: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Ears */}
      <polygon points="46,45 60,30 68,52" fill="#f472b6" stroke="#db2777" strokeWidth="2.5" />
      <polygon points="114,45 100,30 92,52" fill="#f472b6" stroke="#db2777" strokeWidth="2.5" />
      {/* Curly Tail behind */}
      <path d="M 125 100 Q 140 95 135 105 Q 145 110 135 115" stroke="#ec4899" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Body & Head */}
      <ellipse cx="80" cy="85" rx="46" ry="42" fill="#fbcfe8" stroke="#ec4899" strokeWidth="3" />
      {/* Big Piggy Snout */}
      <ellipse cx="80" cy="92" rx="18" ry="13" fill="#f472b6" stroke="#db2777" strokeWidth="2.5" />
      <ellipse cx="74" cy="92" rx="3.5" ry="5" fill="#9d174d" />
      <ellipse cx="86" cy="92" rx="3.5" ry="5" fill="#9d174d" />
      {/* Eyes with white sparkle */}
      <circle cx="62" cy="74" r="4.5" fill="#1e1b4b" /><circle cx="64" cy="72" r="1.8" fill="#ffffff" />
      <circle cx="98" cy="74" r="4.5" fill="#1e1b4b" /><circle cx="100" cy="72" r="1.8" fill="#ffffff" />
      {/* Cheeks */}
      <ellipse cx="50" cy="88" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
      <ellipse cx="110" cy="88" rx="6" ry="4" fill="#fb7185" opacity="0.6" />
      {/* Feet */}
      <rect x="58" y="122" width="12" height="12" rx="4" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
      <rect x="90" y="122" width="12" height="12" rx="4" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
    </svg>
  ),

  // 20. 스웨터 (Sweater)
  스웨터: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Sweater Body and Sleeves */}
      <path
        d="M 60 45 L 80 54 L 100 45 L 138 72 L 124 92 L 110 82 L 110 130 L 50 130 L 50 82 L 36 92 L 22 72 Z"
        fill="#0284c7"
        stroke="#0369a1"
        strokeWidth="3.5"
      />
      {/* Ribbed Collar */}
      <path d="M 60 45 Q 80 60 100 45" stroke="#fef08a" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Snowflake / Nordic Stripe across chest */}
      <rect x="50" y="75" width="60" height="16" fill="#fde047" />
      <circle cx="62" cy="83" r="3" fill="#0284c7" />
      <circle cx="80" cy="83" r="4" fill="#0284c7" />
      <circle cx="98" cy="83" r="3" fill="#0284c7" />
      {/* Sleeve Cuffs */}
      <line x1="22" y1="72" x2="36" y2="92" stroke="#fef08a" strokeWidth="4" />
      <line x1="124" y1="92" x2="138" y2="72" stroke="#fef08a" strokeWidth="4" />
      {/* Bottom Hem */}
      <rect x="50" y="124" width="60" height="6" fill="#fef08a" />
    </svg>
  ),

  // 21. 의사 (Doctor)
  의사: (
    <svg viewBox="0 0 160 160" className="w-20 h-20 sm:w-24 sm:h-24 select-none drop-shadow-sm">
      {/* Doctor Coat & Shoulders */}
      <path d="M 45 130 L 55 92 L 105 92 L 115 130 Z" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
      {/* Inner Blue Scrub Shirt */}
      <polygon points="70,92 80,112 90,92" fill="#38bdf8" />
      {/* Stethoscope */}
      <path d="M 68 92 C 65 110 70 122 80 122 C 90 122 95 110 92 92" stroke="#475569" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <circle cx="80" cy="122" r="5" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
      {/* Head */}
      <circle cx="80" cy="65" r="26" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
      {/* Doctor Cap / Headband with Reflector */}
      <path d="M 54 58 C 55 38 105 38 106 58 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
      <circle cx="80" cy="46" r="6" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="80" cy="46" r="2.5" fill="#38bdf8" />
      {/* Eyes */}
      <circle cx="72" cy="65" r="3.5" fill="#1e1b4b" /><circle cx="73" cy="63" r="1.2" fill="#ffffff" />
      <circle cx="88" cy="65" r="3.5" fill="#1e1b4b" /><circle cx="89" cy="63" r="1.2" fill="#ffffff" />
      {/* Gentle Smile */}
      <path d="M 76 73 Q 80 77 84 73" stroke="#b91c1c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="66" cy="71" r="3" fill="#f43f5e" opacity="0.6" />
      <circle cx="94" cy="71" r="3" fill="#f43f5e" opacity="0.6" />
    </svg>
  ),
};
