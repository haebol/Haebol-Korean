import React from 'react';
import { ManduMascot } from './ManduMascot';

export type JollaComedyPose =
  | 'urgent'     // 화장실 급해서 다리 꼬고 땀 뻘뻘
  | 'heavy'      // 무거운 바위/글자 들고 끙차!
  | 'float'      // 풍선 매달고 두둥실
  | 'swim'       // 강물에 빠져 어푸어푸
  | 'fish'       // 낚싯대 들고 월척 기대
  | 'chef'       // 요리사 모자 쓰고 만두 번쩍
  | 'net'        // 잠자리채 들고 외계인 잡기
  | 'dance'      // 무대 위 신나게 춤추기
  | 'splat'      // 꽈당 넘어져서 별이 빙글빙글
  | 'cling'      // 점선/줄에 매달려 덜덜
  | 'cheer'      // 양팔 번쩍 만세!
  | 'astronaut'; // 우주 헬멧 쓰고 안녕!

interface JollaComicProps {
  pose: JollaComedyPose;
  size?: number;
  color?: string;
  speech?: string;
  className?: string;
}

/**
 * 글자나라에서 고군분투하는 코믹 졸라맨 SVG (유아 한글 교재 스타일 굵고 선명한 선화)
 */
export const JollaComic: React.FC<JollaComicProps> = ({
  pose,
  size = 56,
  color = '#E11D48',
  speech,
  className = '',
}) => {
  return (
    <div className={`relative inline-flex flex-col items-center select-none shrink-0 ${className}`}>
      {speech && (
        <div className="mb-0.5 px-2 py-0.5 rounded-full bg-white/95 border-[1.3px] border-slate-500 text-[10px] font-extrabold text-slate-700 whitespace-nowrap leading-tight shadow-2xs">
          {speech}
        </div>
      )}
      <svg
        viewBox="-44 -56 88 102"
        width={size}
        height={Math.round(size * 1.15)}
        className="overflow-visible"
        aria-hidden="true"
      >
        {pose === 'urgent' && (
          <g>
            {/* 땀방울 3개 */}
            <path d="M-24,-34 Q-28,-28 -24,-24 Q-20,-28 -24,-34Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.6" />
            <path d="M24,-30 Q28,-24 24,-20 Q20,-24 24,-30Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.6" />
            {/* 덜덜 떨림선 */}
            <path d="M-30,-4 L-26,4 M30,-4 L26,4" stroke="#F59E0B" strokeWidth="2.4" strokeLinecap="round" />
            {/* X자 꼬인 다리 */}
            <path d="M0,12 L10,24 L-6,36" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0,12 L-10,24 L8,36" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="-8" cy="38" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <ellipse cx="10" cy="38" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            {/* 몸통 & 양손 배 움켜쥐기 */}
            <line x1="0" y1="-10" x2="0" y2="12" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
            <path d="M0,-4 L-14,6 L-4,12 M0,-4 L14,6 L4,12" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            {/* 울상 얼굴 */}
            <circle cx="0" cy="-24" r="15" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.6" />
            <path d="M-9,-27 L-4,-24 L-9,-21 M9,-27 L4,-24 L9,-21" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M-6,-15 Q0,-19 6,-15" fill="none" stroke="#EF4444" strokeWidth="2.6" strokeLinecap="round" />
          </g>
        )}

        {pose === 'heavy' && (
          <g>
            {/* 머리 위 커다란 바위 🪨 */}
            <path
              d="M-28,-36 Q-32,-52 -12,-54 Q8,-58 24,-48 Q34,-38 22,-28 L-22,-28 Z"
              fill="#94A3B8"
              stroke="#0F172A"
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path d="M-12,-46 L-4,-40 M8,-46 L14,-39" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            {/* 땀 */}
            <path d="M26,-16 Q30,-10 26,-6 Q22,-10 26,-16Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.5" />
            {/* 쩍 벌린 버팀 다리 */}
            <path d="M0,14 L-16,24 L-18,38 M0,14 L16,24 L18,38" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="-19" cy="40" rx="6.5" ry="3.5" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <ellipse cx="19" cy="40" rx="6.5" ry="3.5" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            {/* 몸통 & 양팔 번쩍 바위 받치기 */}
            <line x1="0" y1="-4" x2="0" y2="14" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
            <path d="M0,0 L-20,-12 L-16,-28 M0,0 L20,-12 L16,-28" fill="none" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            {/* 힘주는 얼굴 */}
            <circle cx="0" cy="-16" r="13.5" fill="#FEF2F2" stroke="#0F172A" strokeWidth="3.5" />
            <path d="M-8,-19 L-3,-16 M8,-19 L3,-16" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
            <circle cx="-5" cy="-14" r="1.8" fill="#0F172A" />
            <circle cx="5" cy="-14" r="1.8" fill="#0F172A" />
            <rect x="-5" y="-10" width="10" height="4" rx="1.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6" />
          </g>
        )}

        {pose === 'float' && (
          <g>
            {/* 위쪽 동그란 풍선 */}
            <ellipse cx="14" cy="-42" rx="14" ry="16" fill="#FDE047" stroke="#0F172A" strokeWidth="2.6" />
            <path d="M14,-26 Q10,-16 14,-8" fill="none" stroke="#0F172A" strokeWidth="2" />
            {/* 대롱대롱 다리 */}
            <path d="M-4,16 L-12,32 M-4,16 L6,30" fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <ellipse cx="-13" cy="34" rx="5.5" ry="3.2" fill={color} stroke="#0F172A" strokeWidth="1.6" />
            <ellipse cx="7" cy="32" rx="5.5" ry="3.2" fill={color} stroke="#0F172A" strokeWidth="1.6" />
            {/* 몸통 & 한 손 풍선 잡기 */}
            <line x1="-4" y1="-4" x2="-4" y2="16" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <line x1="-4" y1="2" x2="14" y2="-8" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            <line x1="-4" y1="2" x2="-22" y2="-6" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            {/* 해맑은 얼굴 */}
            <circle cx="-6" cy="-18" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
            <path d="M-12,-20 Q-9,-24 -6,-20 M-2,-20 Q1,-24 4,-20" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M-10,-13 Q-6,-9 -2,-13" fill="none" stroke="#EF4444" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        )}

        {pose === 'swim' && (
          <g>
            {/* 물보라 + 물결 */}
            <path d="M-36,12 Q-24,4 -12,12 T12,12 T36,12" fill="none" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
            <path d="M-32,24 Q-20,16 -8,24 T16,24 T34,24" fill="none" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" />
            {/* 허우적 양팔 */}
            <path d="M-14,6 L-28,-12 M14,6 L28,-14" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
            {/* 물속 얼굴 */}
            <circle cx="0" cy="-6" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
            <circle cx="-5" cy="-9" r="2.2" fill="#0F172A" />
            <circle cx="5" cy="-9" r="2.2" fill="#0F172A" />
            <circle cx="0" cy="-1" r="4.2" fill="#38BDF8" stroke="#0F172A" strokeWidth="1.8" />
            {/* 물방울 */}
            <circle cx="-24" cy="-24" r="3" fill="#38BDF8" />
            <circle cx="24" cy="-26" r="3.5" fill="#38BDF8" />
          </g>
        )}

        {pose === 'fish' && (
          <g>
            {/* 낚싯대 */}
            <path d="M12,0 Q26,-28 38,-22" fill="none" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="38" y1="-22" x2="38" y2="38" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 2" />
            {/* 밀짚모자 */}
            <path d="M-16,-32 Q-4,-48 10,-32 Z" fill="#FACC15" stroke="#0F172A" strokeWidth="2.4" />
            <line x1="-22" y1="-32" x2="16" y2="-32" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
            {/* 앉은 다리 */}
            <path d="M-4,12 L10,18 L14,34 M-4,12 L-14,22 L-10,34" fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="16" cy="36" rx="5.5" ry="3.2" fill={color} stroke="#0F172A" strokeWidth="1.6" />
            <line x1="-4" y1="-8" x2="-4" y2="12" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <line x1="-4" y1="-2" x2="14" y2="0" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="-4" cy="-20" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
            <circle cx="0" cy="-21" r="2.2" fill="#0F172A" />
            <path d="M-4,-14 Q1,-11 5,-14" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {pose === 'chef' && (
          <g>
            {/* 요리사 모자 */}
            <path
              d="M-12,-35 C-18,-48 -4,-54 0,-46 C4,-54 18,-48 12,-35 Z"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <rect x="-12" y="-38" width="24" height="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
            {/* 다리 */}
            <path d="M0,14 L-12,34 M0,14 L12,34" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
            <ellipse cx="-14" cy="36" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <ellipse cx="14" cy="36" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            {/* 몸통 & 양팔 번쩍 */}
            <line x1="0" y1="-8" x2="0" y2="14" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <path d="M0,-2 L-20,-18 M0,-2 L20,-18" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
            {/* 웃는 얼굴 */}
            <circle cx="0" cy="-20" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
            <path d="M-8,-22 Q-5,-26 -2,-22 M2,-22 Q5,-26 8,-22" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M-6,-14 Q0,-9 6,-14" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {pose === 'net' && (
          <g>
            {/* 잠자리채 */}
            <line x1="12" y1="-2" x2="34" y2="-32" stroke="#92400E" strokeWidth="3.4" strokeLinecap="round" />
            <ellipse cx="36" cy="-36" rx="12" ry="8" fill="#E0F2FE" stroke="#0F172A" strokeWidth="2.4" transform="rotate(-25 36 -36)" />
            {/* 달려가는 다리 */}
            <path d="M-4,12 L-18,22 L-24,34 M-4,12 L12,20 L20,32" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="-25" cy="36" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <ellipse cx="22" cy="34" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <line x1="-4" y1="-8" x2="-4" y2="12" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <line x1="-4" y1="-2" x2="14" y2="-4" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            <line x1="-4" y1="-2" x2="-20" y2="6" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="-4" cy="-21" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
            <circle cx="0" cy="-22" r="2.4" fill="#0F172A" />
            <ellipse cx="1" cy="-14" rx="3.8" ry="4.2" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />
          </g>
        )}

        {pose === 'dance' && (
          <g>
            {/* 음표 */}
            <text x="-34" y="-26" fontSize="16" fontWeight="900" fill="#7E22CE">♪</text>
            <text x="24" y="-30" fontSize="18" fontWeight="900" fill="#EC4899">♫</text>
            {/* 신나는 댄스 다리 */}
            <path d="M0,12 L-16,22 L-10,36 M0,12 L16,18 L24,8" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="-10" cy="38" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <ellipse cx="26" cy="8" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            {/* 웨이브 양팔 */}
            <line x1="0" y1="-8" x2="0" y2="12" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
            <path d="M0,-2 L-18,-18 L-28,-8 M0,-2 L18,-18 L28,-26" fill="none" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="0" cy="-22" r="14.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.6" />
            <path d="M-8,-24 Q-5,-28 -2,-24 M2,-24 Q5,-28 8,-24" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M-7,-15 Q0,-8 7,-15 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="1.8" />
          </g>
        )}

        {pose === 'splat' && (
          <g>
            {/* 빙글빙글 별 */}
            <text x="-26" y="-26" fontSize="14" fill="#F59E0B">★</text>
            <text x="16" y="-28" fontSize="14" fill="#F59E0B">★</text>
            <ellipse cx="0" cy="-24" rx="22" ry="6" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 3" />
            {/* 꽈당 누운 몸 */}
            <line x1="-22" y1="14" x2="18" y2="14" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <path d="M18,14 L30,2 M18,14 L30,26" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
            <ellipse cx="32" cy="1" rx="5.5" ry="3.2" fill={color} stroke="#0F172A" strokeWidth="1.6" />
            <ellipse cx="32" cy="27" rx="5.5" ry="3.2" fill={color} stroke="#0F172A" strokeWidth="1.6" />
            <path d="M-8,14 L-16,28 M-8,14 L4,28" stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round" />
            <circle cx="-20" cy="0" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
            <text x="-29" y="3" fontSize="11" fontWeight="900" fill="#0F172A">×</text>
            <text x="-18" y="3" fontSize="11" fontWeight="900" fill="#0F172A">×</text>
            <path d="M-24,8 Q-20,5 -16,8" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {pose === 'cling' && (
          <g>
            <path d="M-2,12 L-10,28 M-2,12 L8,26" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
            <ellipse cx="-11" cy="30" rx="5.5" ry="3" fill={color} stroke="#0F172A" strokeWidth="1.6" />
            <ellipse cx="9" cy="28" rx="5.5" ry="3" fill={color} stroke="#0F172A" strokeWidth="1.6" />
            <line x1="-2" y1="-8" x2="-2" y2="12" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <path d="M-2,-2 L-16,-14 M-2,-2 L14,-12" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            <circle cx="-2" cy="-21" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.4" />
            <circle cx="-6" cy="-22" r="2.2" fill="#0F172A" />
            <circle cx="3" cy="-22" r="2.2" fill="#0F172A" />
            <ellipse cx="-2" cy="-14" rx="3.2" ry="4" fill="#EF4444" stroke="#0F172A" strokeWidth="1.4" />
          </g>
        )}

        {pose === 'astronaut' && (
          <g>
            {/* 우주 헬멧 */}
            <circle cx="0" cy="-22" r="19" fill="#E0F2FE" fillOpacity="0.65" stroke="#0284C7" strokeWidth="2.6" />
            <path d="M0,12 L-12,34 M0,12 L12,34" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <ellipse cx="-14" cy="36" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <ellipse cx="14" cy="36" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <line x1="0" y1="-8" x2="0" y2="12" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
            <path d="M0,-2 L-18,-14 M0,-2 L18,6" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
            <circle cx="0" cy="-22" r="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
            <circle cx="-4" cy="-23" r="2.1" fill="#0F172A" />
            <circle cx="4" cy="-23" r="2.1" fill="#0F172A" />
            <path d="M-4,-16 Q0,-12 4,-16" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {pose === 'cheer' && (
          <g>
            <text x="-32" y="-26" fontSize="14" fill="#F59E0B">✦</text>
            <text x="22" y="-28" fontSize="14" fill="#F59E0B">✦</text>
            <path d="M0,12 L-13,34 M0,12 L13,34" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <ellipse cx="-15" cy="36" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <ellipse cx="15" cy="36" rx="6" ry="3.4" fill={color} stroke="#0F172A" strokeWidth="1.8" />
            <line x1="0" y1="-8" x2="0" y2="12" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
            <path d="M0,-2 L-22,-22 M0,-2 L22,-22" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="0" cy="-22" r="14.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.6" />
            <path d="M-8,-24 Q-5,-28 -2,-24 M2,-24 Q5,-28 8,-24" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M-6,-15 Q0,-9 6,-15" fill="none" stroke="#EF4444" strokeWidth="2.6" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * 따뜻하고 깔끔한 학습지 헤더 (숨은 졸라한글맨 찾기 감성 통일)
 */
export const PlaybookHeader: React.FC<{
  chapterTag: string;
  title: string;
  accentHex?: string;
  tintHex?: string;
  badgeBgClass?: string;
  badgeTextClass?: string;
  hint?: string;
  webControls?: React.ReactNode;
  scoreBadge?: string;
}> = ({
  chapterTag,
  title,
  accentHex = '#D94A6B',
  tintHex = '#FFE4E6',
  badgeBgClass,
  badgeTextClass,
  hint,
  webControls,
  scoreBadge,
}) => (
  <div className="flex items-center justify-between gap-2 pb-1.5 mb-2.5 border-b-[1.5px] border-slate-700 shrink-0 font-korean-gothic">
    <div className="flex items-center gap-2 min-w-0">
      <ManduMascot size="xs" interactive={false} />
      <span
        className={`px-2.5 py-0.5 rounded-lg text-[11.5px] font-black shrink-0 ${
          badgeBgClass ? `${badgeBgClass} ${badgeTextClass || ''}` : ''
        }`}
        style={
          badgeBgClass
            ? undefined
            : { backgroundColor: tintHex, color: accentHex }
        }
      >
        {chapterTag}
      </span>
      <h2 className="text-[19px] sm:text-[21px] font-black text-slate-900 tracking-tight leading-none truncate">
        {title}
      </h2>
      {hint && (
        <span className="text-[11.5px] font-semibold text-slate-500 hidden sm:inline truncate">
          · {hint}
        </span>
      )}
    </div>
    <div className="flex items-center gap-2.5 shrink-0">
      {webControls && (
        <div className="no-print flex items-center gap-1.5">{webControls}</div>
      )}
      <span className="text-[13px] font-bold text-slate-700 whitespace-nowrap">
        이름: _________
      </span>
      {scoreBadge && (
        <span className="px-2.5 py-0.5 rounded-lg border-[1.5px] border-slate-700 bg-white text-[12px] font-black text-slate-800 whitespace-nowrap">
          {scoreBadge}
        </span>
      )}
    </div>
  </div>
);
