import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { speakKorean, playCutePop } from '../utils/audio';

interface ManduMascotProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'cheer' | 'think' | 'speak';
  showBubble?: boolean;
  bubbleText?: string;
  onClick?: () => void;
  interactive?: boolean;
  isHappy?: boolean;
}

const CHEER_PHRASES = [
  '안녕! 오늘도 한국어 재미있게 해보자! 🥟',
  '우와! 정말 잘하고 있어요! 최고! ✨',
  '어려운 게 있으면 언제든 도와줄게요! 💛',
  '해볼쌤이랑 같이 말해보자! 따라해봐요! 🗣️',
  '천천히 또박또박 말하면 다 통해요! 🌟'
];

export const ManduMascot: React.FC<ManduMascotProps> = ({
  size = 'md',
  mood = 'happy',
  showBubble = false,
  bubbleText,
  onClick,
  interactive = true
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [internalBubble, setInternalBubble] = useState<string | null>(null);

  const sizePixels = {
    xs: 28,
    sm: 44,
    md: 68,
    lg: 110
  }[size];

  const handleTap = () => {
    playCutePop();
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 800);

    if (onClick) {
      onClick();
    } else if (interactive) {
      const phrase = CHEER_PHRASES[Math.floor(Math.random() * CHEER_PHRASES.length)];
      setInternalBubble(phrase);
      speakKorean(phrase.replace(/[^\uAC00-\uD7A3\s]/g, ''));
      setTimeout(() => {
        setInternalBubble(null);
      }, 3500);
    }
  };

  const currentBubble = bubbleText || internalBubble;

  return (
    <div className="relative inline-flex items-center select-none">
      <motion.div
        animate={
          isWiggling
            ? { rotate: [-6, 6, -4, 4, 0], scale: [1, 1.15, 1] }
            : { y: [0, -3, 0] }
        }
        transition={
          isWiggling
            ? { duration: 0.6 }
            : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
        }
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleTap}
        className={`cursor-pointer focus:outline-none transition-transform ${
          interactive ? 'hover:drop-shadow-md' : ''
        }`}
        title="해볼쌤 (터치해보세요!)"
        role="button"
        tabIndex={0}
        aria-label="해볼쌤 캐릭터 마스코트"
      >
        <svg
          width={sizePixels}
          height={sizePixels}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 3D Dough Gradient */}
            <radialGradient id="dumplingBodyGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="45%" stopColor="#FFF9EB" />
              <stop offset="85%" stopColor="#F6E7C8" />
              <stop offset="100%" stopColor="#EAD3A6" />
            </radialGradient>

            {/* Sun Glow Gradient */}
            <radialGradient id="sunGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF385" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="90%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Cheek Blush Gradient */}
            <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F87171" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft Shadow on ground */}
          <ellipse cx="60" cy="110" rx="38" ry="7" fill="#E6D7B8" opacity="0.6" />

          {/* Dumpling Body (Plump, 3D textured bun) */}
          <path
            d="M60 22C42 22 24 34 19 55C14 74 22 96 42 103C54 107 72 107 86 101C102 94 108 72 103 54C97 34 78 22 60 22Z"
            fill="url(#dumplingBodyGrad)"
            stroke="#DDC396"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Top Pleats / Crimps Gathered at Top Crown */}
          <path
            d="M48 24C44 14 54 12 59 20C63 12 73 14 69 24"
            stroke="#C9A66B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="#FFF6E0"
          />
          <path
            d="M38 31C39 22 47 21 51 27"
            stroke="#C9A66B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M68 27C72 21 80 22 81 31"
            stroke="#C9A66B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M58 20L60 27"
            stroke="#C9A66B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Blushing Pink Cheeks with cute stitch accents */}
          <ellipse cx="38" cy="74" rx="9" ry="6" fill="url(#blushGrad)" />
          <ellipse cx="84" cy="74" rx="9" ry="6" fill="url(#blushGrad)" />
          {/* Cheek markings */}
          <path d="M34 73L36 76 M38 73L40 76 M42 73L44 76" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M80 73L82 76 M84 73L86 76 M88 73L90 76" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round" />

          {/* Big Sparkly Anime Eyes */}
          {/* Left Eye */}
          <ellipse cx="44" cy="62" rx="6" ry="6.5" fill="#261A14" />
          <circle cx="42" cy="59" r="2.4" fill="#FFFFFF" />
          <circle cx="46" cy="64" r="1.3" fill="#FFFFFF" />

          {/* Right Eye */}
          <ellipse cx="78" cy="62" rx="6" ry="6.5" fill="#261A14" />
          <circle cx="76" cy="59" r="2.4" fill="#FFFFFF" />
          <circle cx="80" cy="64" r="1.3" fill="#FFFFFF" />

          {/* Happy Open Smiling Mouth with pink tongue */}
          <path
            d="M52 70C52 82 70 82 70 70Z"
            fill="#881337"
          />
          <path
            d="M55 75C58 71 64 71 67 75C64 79 58 79 55 75Z"
            fill="#FB7185"
          />

          {/* Right arm/hand resting gently */}
          <ellipse cx="94" cy="80" rx="5" ry="6" fill="#FFF8EB" stroke="#DDC396" strokeWidth="1.8" />

          {/* Left arm hugging the Smiling Radiant Little Sun */}
          {/* Sun Rays */}
          <g>
            {/* Sun Glow Outer */}
            <circle cx="28" cy="80" r="16" fill="#FEF08A" opacity="0.45" />

            {/* Sun Ray Triangles */}
            <path d="M28 59L30 64L26 64Z" fill="#F59E0B" />
            <path d="M28 101L30 96L26 96Z" fill="#F59E0B" />
            <path d="M7 80L12 78L12 82Z" fill="#F59E0B" />
            <path d="M49 80L44 78L44 82Z" fill="#F59E0B" />
            <path d="M13 65L18 67L15 71Z" fill="#F59E0B" />
            <path d="M43 95L38 93L41 89Z" fill="#F59E0B" />
            <path d="M13 95L18 93L15 89Z" fill="#F59E0B" />
            <path d="M43 65L38 67L41 71Z" fill="#F59E0B" />

            {/* Sun Body */}
            <circle cx="28" cy="80" r="11" fill="url(#sunGlowGrad)" stroke="#D97706" strokeWidth="1.2" />

            {/* Sun Happy Smiling Face */}
            <circle cx="24.5" cy="78" r="1.3" fill="#451A03" />
            <circle cx="31.5" cy="78" r="1.3" fill="#451A03" />
            <path d="M26 81.5C27 83.5 29 83.5 30 81.5" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" />
            {/* Sun Blush */}
            <circle cx="23" cy="80.5" r="1.2" fill="#F87171" opacity="0.8" />
            <circle cx="33" cy="80.5" r="1.2" fill="#F87171" opacity="0.8" />
          </g>

          {/* Dumpling Left Hand Hugging Around Sun */}
          <path
            d="M34 88C31 89 27 89 25 86C23 83 25 80 28 80C32 80 35 83 37 87Z"
            fill="#FFF8EB"
            stroke="#DDC396"
            strokeWidth="1.8"
          />
        </svg>
      </motion.div>

      {/* Floating Speech Bubble */}
      <AnimatePresence>
        {(showBubble || currentBubble) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none w-max max-w-[200px] sm:max-w-xs bg-white text-slate-800 text-sm sm:text-base font-bold px-3.5 py-2 rounded-2xl shadow-lg border border-amber-200"
          >
            {/* Pointer arrow */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-8 border-r-white" />
            <p className="leading-snug text-slate-800">{currentBubble}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
