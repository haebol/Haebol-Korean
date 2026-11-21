import React, { useId } from 'react';
import { motion } from 'motion/react';
import { BlunderAnimKind, SitcomBlunderItem, SitcomEpisodeItem } from '../data/particleSitcomUnit1Data';

export type StageMode = 'IDLE' | 'BLUNDER' | 'SUCCESS';

interface ParticleSitcomStageProps {
  mode: StageMode;
  episode: SitcomEpisodeItem;
  activeBlunder?: SitcomBlunderItem | null;
  replayKey?: number;
  compact?: boolean;
  correctStampText?: string;
}

type ActorMood = 'happy' | 'shock' | 'dizzy' | 'squashed' | 'kneel' | 'cool' | 'proud';

/**
 * Compact, self-contained expressive comedy Mandu actor (zero shared SVG gradient IDs)
 */
const ComedyManduActor: React.FC<{
  mood: ActorMood;
  className?: string;
}> = ({ mood, className = 'w-24 h-24 sm:w-28 sm:h-28' }) => {
  const uid = useId().replace(/:/g, '');
  const bodyGradId = `cm-body-${uid}`;
  const isSquashed = mood === 'squashed';

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={bodyGradId} cx="42%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="68%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="60" cy="106" rx={isSquashed ? 48 : 34} ry="7" fill="rgba(15, 23, 42, 0.14)" />

      <g transform={isSquashed ? 'translate(0, 38) scale(1.18, 0.56)' : undefined}>
        {/* Mandu crimps top hat */}
        <path
          d="M 42 26 Q 48 16 54 24 Q 60 13 66 24 Q 72 16 78 26 Z"
          fill="#FEF3C7"
          stroke="#92400E"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Dumpling plump body */}
        <path
          d="M 20 72 C 18 44 36 24 60 24 C 84 24 102 44 100 72 C 98 93 80 100 60 100 C 40 100 22 93 20 72 Z"
          fill={`url(#${bodyGradId})`}
          stroke="#78350F"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Cheek blush */}
        <ellipse cx="36" cy="68" rx="6.5" ry="4" fill="#FB7185" opacity="0.55" />
        <ellipse cx="84" cy="68" rx="6.5" ry="4" fill="#FB7185" opacity="0.55" />

        {/* Facial Expressions */}
        {mood === 'happy' && (
          <>
            <path d="M 38 56 Q 43 50 48 56" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 72 56 Q 77 50 82 56" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 51 67 Q 60 77 69 67" stroke="#9F1239" strokeWidth="3" strokeLinecap="round" fill="#FDA4AF" />
          </>
        )}

        {mood === 'proud' && (
          <>
            <path d="M 37 55 Q 43 48 49 55" stroke="#1E293B" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M 71 55 Q 77 48 83 55" stroke="#1E293B" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M 48 66 Q 60 80 72 66 Z" fill="#E11D48" stroke="#78350F" strokeWidth="2.2" />
            {/* Little sparkling eyes cheek stars */}
            <circle cx="29" cy="52" r="2.2" fill="#F59E0B" />
            <circle cx="91" cy="52" r="2.2" fill="#F59E0B" />
          </>
        )}

        {mood === 'cool' && (
          <>
            <rect x="33" y="48" width="21" height="12" rx="3" fill="#0F172A" />
            <rect x="66" y="48" width="21" height="12" rx="3" fill="#0F172A" />
            <line x1="54" y1="53" x2="66" y2="53" stroke="#0F172A" strokeWidth="3" />
            <path d="M 52 70 Q 61 75 68 68" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" />
          </>
        )}

        {mood === 'shock' && (
          <>
            <circle cx="43" cy="55" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="43" cy="55" r="2.3" fill="#1E293B" />
            <circle cx="77" cy="55" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
            <circle cx="77" cy="55" r="2.3" fill="#1E293B" />
            <ellipse cx="60" cy="72" rx="6.5" ry="8.5" fill="#9F1239" stroke="#78350F" strokeWidth="2.2" />
            {/* Sweat drop */}
            <path d="M 96 40 Q 103 48 96 54 Q 89 48 96 40 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          </>
        )}

        {(mood === 'dizzy' || mood === 'squashed') && (
          <>
            <path d="M 38 50 L 48 60 M 48 50 L 38 60" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 72 50 L 82 60 M 82 50 L 72 60" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 49 72 Q 54 67 60 72 Q 66 77 71 72" stroke="#9F1239" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          </>
        )}

        {mood === 'kneel' && (
          <>
            <path d="M 37 52 L 47 57 L 37 61" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 83 52 L 73 57 L 83 61" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Tear drops */}
            <path d="M 38 64 L 35 76" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M 82 64 L 85 76" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
            <path d="M 52 73 Q 60 66 68 73" stroke="#9F1239" strokeWidth="2.8" strokeLinecap="round" />
          </>
        )}

        {/* Cute stubby arms */}
        {mood === 'proud' ? (
          <>
            <path d="M 21 67 Q 10 53 16 42" stroke="#78350F" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 99 67 Q 110 53 104 42" stroke="#78350F" strokeWidth="3.2" strokeLinecap="round" />
          </>
        ) : mood === 'kneel' ? (
          <>
            <path d="M 24 68 Q 16 48 24 36" stroke="#78350F" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 96 68 Q 104 48 96 36" stroke="#78350F" strokeWidth="3.2" strokeLinecap="round" />
          </>
        ) : (
          <>
            <path d="M 22 68 Q 12 72 15 80" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
            <path d="M 98 68 Q 108 72 105 80" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          </>
        )}
      </g>
    </svg>
  );
};

const renderBlunderCutscene = (
  animKind: BlunderAnimKind,
  episode: SitcomEpisodeItem,
  blunder: SitcomBlunderItem,
  compact: boolean
) => {
  const actorSize = compact ? 'w-20 h-20' : 'w-24 h-24 sm:w-28 sm:h-28';
  const illusSize = compact ? 'w-16 h-16' : 'w-20 h-20 sm:w-24 sm:h-24';

  switch (animKind) {
    // 1. 나 + 은 = 나은? -> 병원 반창고·체온계·구급십자
    case 'bandage':
      return (
        <div className="relative flex items-center justify-center gap-3 sm:gap-5 w-full h-full">
          <motion.div
            initial={{ y: -24, opacity: 0, rotate: -15 }}
            animate={{ y: 0, opacity: 1, rotate: [-4, 4, -2, 0] }}
            transition={{ duration: 0.55 }}
            className="relative flex items-center justify-center"
          >
            {/* Nurse hat */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 bg-white border-2 border-rose-500 rounded-t-lg px-2 py-0.5 shadow-sm">
              <span className="text-rose-600 font-black text-xs sm:text-sm">+</span>
            </div>
            <ComedyManduActor mood="dizzy" className={actorSize} />
            {/* Big X Bandage across forehead */}
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: 'spring' }}
              className="absolute top-5 right-2 bg-amber-100 border-2 border-amber-500 rounded-md px-1.5 py-0.5 text-[10px] font-black text-amber-800 rotate-12 shadow-xs"
            >
              ✚ 반창고
            </motion.div>
          </motion.div>

          {/* Thermometer + First Aid Kit */}
          <motion.div
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1, y: [0, -5, 0] }}
            transition={{ y: { repeat: Infinity, duration: 1.5 } }}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-white border-2 border-rose-400 rounded-xl px-3 py-1.5 shadow-md text-center">
              <div className="text-xl sm:text-2xl leading-none">🩺🩹</div>
              <div className="text-[11px] sm:text-xs font-black text-rose-700 mt-0.5">
                감기 다 나은?!
              </div>
            </div>
          </motion.div>
        </div>
      );

    // 2. 나 + 가 = 나가! -> 빨간 문 + 스프링 발차기 퇴장
    case 'kickout':
      return (
        <div className="relative flex items-center justify-between w-full max-w-[360px] mx-auto px-2 sm:px-4">
          {/* Red Door & Spring Boot */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative flex items-center"
          >
            <div className="w-12 h-24 sm:w-14 sm:h-28 bg-rose-600 border-2 border-rose-900 rounded-t-lg shadow-md flex flex-col items-center justify-center text-white">
              <span className="text-[10px] font-black tracking-tighter bg-amber-300 text-rose-950 px-1 rounded">
                OUT
              </span>
              <div className="w-2 h-2 rounded-full bg-amber-300 mt-3 self-end mr-1.5" />
            </div>
            <motion.div
              initial={{ scaleX: 0.3 }}
              animate={{ scaleX: [0.3, 1.35, 1] }}
              transition={{ duration: 0.4 }}
              className="origin-left text-2xl sm:text-3xl -ml-1 select-none"
            >
              🥾💨
            </motion.div>
          </motion.div>

          {/* Flying Shocked Mandu */}
          <motion.div
            initial={{ x: -50, rotate: 0 }}
            animate={{ x: [0, 26, 16], y: [0, -14, -4], rotate: [0, 22, 14] }}
            transition={{ duration: 0.65, type: 'spring' }}
            className="relative flex flex-col items-center"
          >
            <span className="text-xs font-black bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-sm mb-0.5">
              나가!!
            </span>
            <ComedyManduActor mood="shock" className={actorSize} />
          </motion.div>
        </div>
      );

    // 3. 나 + 을 = 나을? -> 약병 비가 우르르
    case 'medicine':
      return (
        <div className="relative flex items-center justify-center gap-3 w-full">
          {/* Falling Pills & Medicine Bottles */}
          {[
            { icon: '💊', x: -75, delay: 0.05 },
            { icon: '🧴', x: -35, delay: 0.14 },
            { icon: '💊', x: 40, delay: 0.1 },
            { icon: '🧪', x: 78, delay: 0.2 },
          ].map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ y: -48, opacity: 0, rotate: -25 }}
              animate={{ y: [-38, 8, 2], opacity: 1, rotate: [0, 20, -10] }}
              transition={{ delay: item.delay, duration: 0.55 }}
              style={{ left: `calc(50% + ${item.x}px)` }}
              className="absolute top-0 text-xl sm:text-2xl pointer-events-none"
            >
              {item.icon}
            </motion.span>
          ))}

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="mt-3 flex items-center gap-3"
          >
            <ComedyManduActor mood="dizzy" className={actorSize} />
            <div className="bg-sky-50 border-2 border-sky-400 rounded-xl px-2.5 py-1.5 shadow-sm text-center">
              <span className="text-lg sm:text-xl">💊</span>
              <p className="text-[11px] font-black text-sky-900">약 먹고 나을~</p>
            </div>
          </motion.div>
        </div>
      );

    // 4. 친구 + 은 = 친구은? -> 거대한 은메달 쿵!
    case 'silvermedal':
      return (
        <div className="relative flex items-center justify-center gap-4 w-full">
          <motion.div
            initial={{ y: -70, rotate: -10 }}
            animate={{ y: [-60, 4, 0], rotate: [-8, 8, 0] }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-100 via-slate-300 to-slate-500 border-4 border-slate-600 shadow-lg flex flex-col items-center justify-center">
              <span className="font-black text-lg sm:text-xl text-slate-900 leading-none">은</span>
              <span className="text-[10px] font-bold text-slate-700">2등 🥈</span>
            </div>
            <span className="text-[11px] font-black text-slate-600 mt-1">묵직~ 쿵!</span>
          </motion.div>

          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: [1, 0.8, 0.94] }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <ComedyManduActor mood="squashed" className={actorSize} />
          </motion.div>
        </div>
      );

    // 5. 친구 + 를 = 친구를 축구를?! -> 친구가 축구공 안에 말려 날아감
    case 'soccerfriend':
      return (
        <div className="relative flex items-center justify-between w-full max-w-[370px] mx-auto px-3">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [-12, 16, 0] }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center"
          >
            <ComedyManduActor mood="shock" className={compact ? 'w-16 h-16' : 'w-20 h-20'} />
            <span className="text-[10px] font-black text-emerald-800 bg-white/90 px-1.5 rounded border border-emerald-300">
              어?! 공이 아니잖아!
            </span>
          </motion.div>

          {/* Rolling Friend Ball flying into Goal Net */}
          <motion.div
            initial={{ x: -60, y: 12, rotate: 0 }}
            animate={{ x: [0, 30, 15], y: [0, -24, -4], rotate: [0, 360] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="relative flex items-center gap-2"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-slate-800 bg-white shadow-lg overflow-hidden flex items-center justify-center">
              <img src={episode.illustrationSvg} alt="친구" className="w-12 h-12 object-contain" />
              <span className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[9px] font-black text-center">
                인간축구공
              </span>
            </div>
            <div className="text-2xl sm:text-3xl">🥅</div>
          </motion.div>
        </div>
      );

    // 6. 친구 + 에 = 친구에 축구를?! -> 친구 머리 위 무등 드리블
    case 'headride':
      return (
        <div className="relative flex flex-col items-center justify-center">
          {/* Mandu balancing soccer ball on top of Friend's illustration */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 0.9 }}
            className="flex items-center gap-1 -mb-3 z-20"
          >
            <ComedyManduActor mood="cool" className="w-14 h-14 sm:w-16 sm:h-16" />
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              className="text-xl sm:text-2xl"
            >
              ⚽
            </motion.span>
          </motion.div>
          <div className="relative flex items-center gap-2">
            <img
              src={episode.illustrationSvg}
              alt="친구"
              className={`${illusSize} rounded-full border-2 border-amber-400 bg-white p-1 shadow-md object-contain`}
            />
            <span className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-400 px-2 py-1 rounded-lg">
              머리 위가 축구장?!
            </span>
          </div>
        </div>
      );

    // 7. 동생 + 는 = 동생는? -> ㅇ 받침이 공처럼 굴러 도망
    case 'rolling_o':
      return (
        <div className="relative flex items-center justify-between w-full max-w-[360px] mx-auto px-3">
          <div className="flex items-center gap-2">
            <ComedyManduActor mood="shock" className={actorSize} />
            <div className="bg-white border-2 border-violet-300 rounded-xl px-2.5 py-1.5 text-center shadow-sm">
              <div className="text-lg sm:text-2xl font-black text-slate-800 leading-none">
                동<span className="text-violet-700">새</span>
                <span className="inline-block w-4 h-4 border-2 border-dashed border-violet-400 rounded-full align-middle ml-0.5" />
              </div>
              <span className="text-[10px] font-bold text-rose-600">ㅇ 받침 실종!</span>
            </div>
          </div>

          <motion.div
            initial={{ x: -35, rotate: 0 }}
            animate={{ x: [0, 32, 42], rotate: [0, 360, 720] }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-violet-600 border-4 border-white shadow-lg flex items-center justify-center text-white font-black text-2xl sm:text-3xl">
              ㅇ
            </div>
            <span className="text-[10px] font-black text-violet-800 mt-0.5">데구루루~💨</span>
          </motion.div>
        </div>
      );

    // 8. 동생 + 를 = 동생을 귀여워요?! -> 어질어질 문장 대혼란
    case 'dizzy_spin':
      return (
        <div className="relative flex items-center justify-center gap-4 w-full">
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="relative"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg sm:text-xl"
            >
              💫💫
            </motion.span>
            <ComedyManduActor mood="dizzy" className={actorSize} />
          </motion.div>

          <motion.div
            animate={{ rotate: [12, -12, 12] }}
            transition={{ repeat: Infinity, duration: 1.1 }}
            className="bg-pink-100 border-2 border-pink-400 rounded-xl px-3 py-2 shadow-sm text-center"
          >
            <p className="text-sm sm:text-base font-black text-pink-900">동생을 귀여워요?!</p>
            <p className="text-[10px] font-bold text-pink-700 mt-0.5">문법이 빙글빙글 😵‍💫</p>
          </motion.div>
        </div>
      );

    // 9. 동생 + 야 = 동생야?! -> ㅇ 받침 문지기가 '야'를 튕겨냄
    case 'bouncer_o':
      return (
        <div className="relative flex items-center justify-center gap-3 sm:gap-5 w-full">
          {/* Muscular ㅇ Bouncer */}
          <motion.div
            animate={{ scale: [1, 1.07, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-700 border-4 border-amber-300 shadow-lg flex flex-col items-center justify-center text-white">
              <span className="text-xs">🕶️</span>
              <span className="text-2xl sm:text-3xl font-black leading-none">ㅇ</span>
            </div>
            <span className="text-[10px] font-black text-indigo-900 mt-0.5">받침 문지기</span>
          </motion.div>

          {/* Bounced-off '야' tile */}
          <motion.div
            initial={{ x: -16, y: 0, rotate: 0 }}
            animate={{ x: [0, 34, 24], y: [0, -26, -12], rotate: [0, 35, 20] }}
            transition={{ duration: 0.65, type: 'spring' }}
            className="bg-rose-500 text-white font-black text-xl sm:text-2xl px-3 py-1.5 rounded-xl border-2 border-rose-800 shadow-md"
          >
            야! 🚫
          </motion.div>

          <ComedyManduActor mood="shock" className={compact ? 'w-16 h-16' : 'w-20 h-20'} />
        </div>
      );

    // 10. 선생님 + 는 = 선생님는? -> 무거운 ㅁ 받침 납작 프레스
    case 'square_squash':
      return (
        <div className="relative flex items-center justify-center gap-4 w-full">
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ y: -48 }}
              animate={{ y: 8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 16 }}
              className="z-20 w-16 h-12 sm:w-20 sm:h-14 bg-amber-600 border-4 border-amber-900 rounded-md shadow-lg flex items-center justify-center text-white font-black text-2xl sm:text-3xl"
            >
              ㅁ
            </motion.div>
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: [1, 0.58] }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="-mt-3"
            >
              <ComedyManduActor mood="squashed" className={actorSize} />
            </motion.div>
          </div>
          <div className="bg-amber-100 border-2 border-amber-400 rounded-xl px-2.5 py-1.5 text-center shadow-sm">
            <span className="text-xs font-black text-amber-900">100톤 「ㅁ」 받침</span>
            <p className="text-[11px] font-bold text-amber-800">납작 만두 완성!</p>
          </div>
        </div>
      );

    // 11. 선생님 + 아 = 선생님아?! -> 천둥번개 치며 무릎 꿇고 반성
    case 'thunder_kneel':
      return (
        <div className="relative flex flex-col items-center justify-center w-full bg-slate-900/90 rounded-xl py-2 px-4 text-white">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="flex items-center gap-3 text-xl sm:text-2xl mb-1"
          >
            <span>⛈️</span>
            <span className="text-amber-300 font-black text-sm sm:text-base">
              선생님께 “아”라니!! ⚡
            </span>
            <span>⚡</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ x: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
            >
              <ComedyManduActor mood="kneel" className={compact ? 'w-16 h-16' : 'w-20 h-20'} />
            </motion.div>
            <div className="bg-amber-100 text-slate-900 px-2.5 py-1 rounded-lg border-2 border-amber-400 text-xs font-black">
              반성문 100장! 😭
            </div>
          </div>
        </div>
      );

    // 12. 선생님 + 을 = 선생님을 친절해요?! -> 문법 로봇 과열 연기 폭발
    case 'robot_smoke':
      return (
        <div className="relative flex items-center justify-center gap-3 sm:gap-5 w-full">
          <motion.div
            animate={{ x: [-3, 3, -3, 3, 0], rotate: [-3, 3, 0] }}
            transition={{ repeat: Infinity, duration: 0.45 }}
            className="relative flex flex-col items-center bg-slate-200 border-2 border-slate-600 rounded-xl px-3 py-2 shadow-md"
          >
            <motion.span
              animate={{ y: [0, -10, -16], opacity: [0.9, 0.4, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="absolute -top-5 text-xl"
            >
              💨💥
            </motion.span>
            <span className="text-2xl sm:text-3xl leading-none">🤖</span>
            <span className="text-[10px] font-black text-red-600 mt-0.5">ERROR! 과열!</span>
          </motion.div>

          <ComedyManduActor mood="shock" className={actorSize} />
        </div>
      );

    // 13. 가방 + 는 = 가방는? -> 지퍼 퍽 터져 연필·공책 분수쇼
    case 'zipper_burst':
      return (
        <div className="relative flex items-center justify-center gap-3 w-full">
          <motion.span
            initial={{ y: 10, x: 0, opacity: 0 }}
            animate={{ y: -28, x: -34, rotate: -35, opacity: 1 }}
            transition={{ duration: 0.55 }}
            className="text-xl sm:text-2xl"
          >
            ✏️
          </motion.span>
          <motion.div
            animate={{ scale: [1, 1.15, 0.96, 1.05] }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <img
              src={episode.illustrationSvg}
              alt="가방"
              className={`${illusSize} object-contain`}
            />
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[11px] font-black px-1.5 py-0.5 rounded-full shadow">
              펑!! 💥
            </span>
          </motion.div>
          <motion.span
            initial={{ y: 10, x: 0, opacity: 0 }}
            animate={{ y: -30, x: 30, rotate: 30, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-xl sm:text-2xl"
          >
            📓📏
          </motion.span>
          <ComedyManduActor mood="shock" className={compact ? 'w-16 h-16' : 'w-20 h-20'} />
        </div>
      );

    // 14. 가방 + 을 = 가방을 예뻐요?! -> 가방 괴물이 리본을 꿀꺽!
    case 'bag_monster':
      return (
        <div className="relative flex items-center justify-center gap-3 sm:gap-5 w-full">
          <motion.div
            animate={{ scaleY: [1, 1.1, 0.92, 1] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            className="relative flex flex-col items-center bg-fuchsia-100 border-2 border-fuchsia-400 rounded-2xl px-3 py-1.5 shadow-md"
          >
            <div className="flex items-center gap-1">
              <img src={episode.illustrationSvg} alt="가방" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
              <span className="text-xl sm:text-2xl">👾🦷</span>
            </div>
            <span className="text-[10px] font-black text-fuchsia-900">「을」 꿀꺽! 옴뇸뇸</span>
          </motion.div>
          <ComedyManduActor mood="shock" className={compact ? 'w-16 h-16' : 'w-20 h-20'} />
        </div>
      );

    // 15. 가방 + 야 = 가방야?! -> 만두가 가방에게 장미 들고 어색한 고백
    case 'self_talk':
      return (
        <div className="relative flex items-center justify-center gap-3 sm:gap-5 w-full">
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
            className="flex items-center"
          >
            <ComedyManduActor mood="happy" className={compact ? 'w-16 h-16' : 'w-20 h-20'} />
            <span className="text-2xl sm:text-3xl -ml-2">🌹</span>
          </motion.div>
          <div className="relative flex flex-col items-center">
            <span className="text-xs font-black bg-teal-600 text-white px-2 py-0.5 rounded-full mb-1">
              가방…야?! 💦
            </span>
            <img
              src={episode.illustrationSvg}
              alt="가방"
              className={`${illusSize} object-contain bg-white rounded-xl p-1 border border-teal-300 shadow-xs`}
            />
          </div>
        </div>
      );
  }
};

export const ParticleSitcomStage: React.FC<ParticleSitcomStageProps> = ({
  mode,
  episode,
  activeBlunder,
  replayKey = 0,
  compact = false,
  correctStampText = '합격!',
}) => {
  const isBlunder = mode === 'BLUNDER' && activeBlunder;
  const isSuccess = mode === 'SUCCESS';

  return (
    <div
      key={`${mode}-${activeBlunder?.id || 'idle'}-${replayKey}`}
      className={`relative w-full overflow-hidden rounded-xl border-2 transition-colors ${
        compact ? 'min-h-[156px] p-2.5' : 'min-h-[185px] sm:min-h-[215px] px-3 py-3 sm:px-6 sm:py-4'
      } ${
        isBlunder
          ? 'bg-gradient-to-b from-amber-50 via-rose-50/75 to-orange-50 border-rose-300'
          : isSuccess
          ? 'bg-gradient-to-b from-emerald-50 via-teal-50/60 to-amber-50/50 border-emerald-400'
          : 'bg-gradient-to-b from-emerald-50/60 via-white to-amber-50/30 border-emerald-200'
      }`}
    >
      {/* Theater Velvet Side Curtains */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-3 sm:w-5 bg-gradient-to-r from-rose-700/85 via-rose-600/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-3 sm:w-5 bg-gradient-to-l from-rose-700/85 via-rose-600/75 to-transparent"
      />
      {/* Wooden Theater Stage Floor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-5 sm:h-6 bg-gradient-to-t from-amber-200/80 to-amber-100/20 border-t border-amber-300/60"
      />

      {/* STAGE CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[150px] sm:min-h-[178px] gap-2">
        {mode === 'IDLE' && (
          <div className="flex items-center justify-center gap-3 sm:gap-7 w-full">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="shrink-0"
            >
              <ComedyManduActor mood="happy" className={compact ? 'w-20 h-20' : 'w-24 h-24 sm:w-28 sm:h-28'} />
            </motion.div>

            {/* Episode Character / Object Illustration */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white/95 rounded-2xl border-2 border-emerald-200 p-2 sm:p-2.5 shadow-sm flex flex-col items-center"
            >
              <img
                src={episode.illustrationSvg}
                alt={episode.baseNoun}
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
              />
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-900">
                {episode.baseNoun}
              </span>
            </motion.div>
          </div>
        )}

        {isBlunder && activeBlunder && (
          <motion.div
            initial={{ x: -6 }}
            animate={{ x: [0, -7, 7, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center gap-2"
          >
            {/* Comic Speech Bubble Quote */}
            {!compact && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white border-2 border-rose-400 rounded-xl px-3 py-1 shadow-sm max-w-[92%] text-center"
              >
                <p className="text-xs sm:text-sm font-black text-rose-700 leading-snug">
                  “{activeBlunder.reactionQuote}”
                </p>
              </motion.div>
            )}

            {/* Slapstick Scene Renderer */}
            <div className="w-full flex items-center justify-center py-1">
              {renderBlunderCutscene(activeBlunder.animKind, episode, activeBlunder, compact)}
            </div>
          </motion.div>
        )}

        {isSuccess && (
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="flex items-center justify-center gap-4 sm:gap-7">
              <motion.div
                initial={{ scale: 0.85, y: 10 }}
                animate={{ scale: [1, 1.08, 1], y: [0, -8, 0] }}
                transition={{ duration: 0.6 }}
              >
                <ComedyManduActor mood="proud" className="w-24 h-24 sm:w-28 sm:h-28" />
              </motion.div>

              <motion.div
                initial={{ scale: 0.85, rotate: -4 }}
                animate={{ scale: 1, rotate: 0 }}
                className="relative bg-white rounded-2xl border-2 border-emerald-400 p-2 sm:p-2.5 shadow-md"
              >
                <img
                  src={episode.illustrationSvg}
                  alt={episode.baseNoun}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                />
                {/* Director's Stamp */}
                <motion.div
                  initial={{ scale: 2.2, rotate: -18, opacity: 0 }}
                  animate={{ scale: 1, rotate: -10, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className="absolute -top-2.5 -right-3 bg-emerald-600 text-white border-2 border-white px-2.5 py-0.5 rounded-lg text-xs font-black shadow-md"
                >
                  🎬 {correctStampText}
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
