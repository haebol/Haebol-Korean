import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Hand, Zap } from 'lucide-react';
import { UiLanguage, GAMES_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { speakKorean, playApplauseFanfare, playCutePop } from '../utils/audio';
import {
  ArcadeBadgeTier,
  BulletBadgeGraphic,
  GameBadgeAlbumButton,
  GameBadgeAndHallOfFameModal,
  recordSlingshotBadgeClear,
} from '../utils/gameBadges';

import {
  ParticleGameUnitId,
  Unit1Particle,
  Unit2Particle,
  Unit3Particle,
  Unit4Particle,
  Unit5Particle,
  Unit6Particle,
  Unit7Particle,
  Unit8Particle,
  Unit9Particle,
  Unit10Particle,
  Unit11To13Particle,
  Unit14To16Particle,
  Unit17To19Particle,
  Unit20To21Particle,
  ParticleChoice,
  MissKind,
  GamePhase,
  ControlMode,
  FaceMode,
  Unit1NounId,
  Unit2NounId,
  Unit3NounId,
  Unit4NounId,
  Unit5NounId,
  Unit6NounId,
  Unit7NounId,
  Unit8NounId,
  Unit9NounId,
  Unit10NounId,
  Unit11NounId,
  Unit12NounId,
  Unit13NounId,
  Unit14NounId,
  Unit15NounId,
  Unit16NounId,
  Unit17NounId,
  Unit18NounId,
  Unit19NounId,
  Unit20NounId,
  Unit21NounId,
  SentenceNounId,
  ArcadeButtonConfig,
  Unit1QuestionItem,
  Unit2QuestionItem,
  Unit34QuestionItem,
  Unit5QuestionItem,
  WrongOptionFeedback,
  MultiParticleQuestionItem,
  BTN_PALETTE_YELLOW,
  BTN_PALETTE_PINK,
  BTN_PALETTE_PURPLE,
  BTN_PALETTE_MINT,
  BTN_PALETTE_SKY,
  ARCADE_BUTTONS_U1,
  ARCADE_BUTTONS_U2,
  ARCADE_BUTTONS_U3,
  ARCADE_BUTTONS_U4,
  ARCADE_BUTTONS_U5,
  ARCADE_BUTTONS_U6,
  ARCADE_BUTTONS_U7,
  ARCADE_BUTTONS_U8,
  ARCADE_BUTTONS_U9,
  ARCADE_BUTTONS_U10,
  ARCADE_BUTTONS_U11,
  ARCADE_BUTTONS_U12,
  ARCADE_BUTTONS_U13,
  ARCADE_BUTTONS_U14_TO_16,
  ARCADE_BUTTONS_U17,
  ARCADE_BUTTONS_U18,
  ARCADE_BUTTONS_U19,
  ARCADE_BUTTONS_U20,
  ARCADE_BUTTONS_U21,
  ARCADE_BUTTONS_S1,
  ARCADE_BUTTONS_S2,
  ARCADE_BUTTONS_S3,
  ARCADE_BUTTONS_S4,
  ARCADE_BUTTONS_S5,
  ARCADE_BUTTONS_S6,
  ARCADE_BUTTONS_S7,
  ARCADE_BUTTONS_S8,
  UNIT_1_ITEMS,
  UNIT_2_ITEMS,
  UNIT_3_ITEMS,
  UNIT_4_ITEMS,
  UNIT_5_ITEMS,
  UNIT_6_E_POOL,
  UNIT_6_ESEO_POOL,
  UNIT_6_2_ITEMS,
  UNIT_7_ITEMS,
  UNIT_8_ITEMS,
  UNIT_9_ITEMS,
  UNIT_10_ITEMS,
  UNIT_11_ITEMS,
  UNIT_12_ITEMS,
  UNIT_13_ITEMS,
  UNIT_14_ITEMS,
  UNIT_15_ITEMS,
  UNIT_16_ITEMS,
  UNIT_17_ITEMS,
  UNIT_18_ITEMS,
  UNIT_19_ITEMS,
  UNIT_20_ITEMS,
  UNIT_21_ITEMS,
  UNIT_S1_ITEMS,
  UNIT_S2_ITEMS,
  UNIT_S3_ITEMS,
  UNIT_S4_ITEMS,
  UNIT_S5_ITEMS,
  UNIT_S6_ITEMS,
  UNIT_S7_ITEMS,
  UNIT_S8_ITEMS,
  buildRandomUnit6Items,
} from '../data/particleArcadeData';
export type { ParticleGameUnitId } from '../data/particleArcadeData';

// ===== 독립형 Web Audio 효과음 & 음성 유틸 =====
let sharedAudioCtx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctx) sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
  return sharedAudioCtx;
}

function playTone(type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.2, delay = 0) {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f1, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, f2), now + dur);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  } catch {}
}

function playButtonSfx(idx: number) {
  const pitches = [523.25, 587.33, 659.25, 783.99];
  const f = pitches[idx % pitches.length];
  playTone('sine', f, f * 1.15, 0.06, 0.1);
}

function playLaunchSfx() {
  playTone('triangle', 220, 520, 0.11, 0.14, 0);
}

function playMissSfx(kind: MissKind) {
  if (kind === 'short') playTone('sine', 240, 110, 0.15, 0.16);
  else playTone('sine', 360, 920, 0.22, 0.14);
}

function playImpactPing(high = true) {
  // 뚜렷하고 경쾌한 '팅!' 타격음
  playTone('sine', high ? 1320 : 960, high ? 1760 : 620, 0.11, 0.48, 0);
  playTone('triangle', high ? 880 : 540, high ? 1180 : 320, 0.09, 0.36, 0);
}

function playBounceSfx() {
  playImpactPing(false);
  playTone('triangle', 460, 175, 0.22, 0.42, 0.02);
  playTone('sine', 260, 120, 0.24, 0.34, 0.06);
}

function playSpaceLaunchSfx() {
  playImpactPing(false);
  playTone('triangle', 340, 960, 0.26, 0.34, 0.03);
}

function playGoPunSfx() {
  playImpactPing(false);
  playTone('triangle', 480, 720, 0.22, 0.34, 0.03);
}

function playJackpotSfx() {
  playImpactPing(true);
  playTone('sine', 523.25, 523.25, 0.11, 0.32, 0.04);
  playTone('sine', 659.25, 659.25, 0.11, 0.32, 0.095);
  playTone('triangle', 783.99, 783.99, 0.18, 0.36, 0.15);
}

function cancelSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {}
}

function formatCleanSubtitle(raw: string): string {
  return raw
    .replace(/^[🎉★🔥🚀💢💧👉\s]+/, '')
    .replace(
      /^(문법 땡!|비문 개그!|말장난 개그 발동!|받침 [ㄱ-ㅎ]+ 방어막!|문법 구별!|예절 경보 개그!|존칭 개그!|높임 주어 정답!|높임 대상 정답!|보스 부정 호응 정답!|보스 높임 호응 정답!|보스 호응 정답!|정답!)\s*/g,
      ''
    )
    .replace(/👉/g, '→')
    .replace(/[!]{2,}/g, '!')
    .replace(/\?\!/g, '?')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function formatCleanWrongSpeech(raw: string): string {
  return raw
    .replace(/^[🎉★🔥🚀💢💧\s]+/, '')
    .replace(/^(땡!|으악!|어\?!|어\?|헉!)\s*/g, '')
    .replace(/[!]{2,}/g, '.')
    .replace(/\?\!/g, '?')
    .trim();
}

function buildDirectSentenceSpeech(params: {
  prefix?: string;
  noun: string;
  choice: ParticleChoice;
  predicate?: string;
  transformedWord?: string;
}): string {
  const { prefix, noun, choice, predicate, transformedWord } = params;
  const head = transformedWord ? transformedWord : `${noun}${choice}`;
  const parts = [prefix?.trim(), head, predicate?.trim()].filter(Boolean);
  return parts.join(' ').trim();
}

const JONGSEONG_LIST = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
  'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

function getLastBatchimInfo(word: string): { hasBatchim: boolean; batchimChar: string } {
  const cleaned = word.replace(/[^가-힣]/g, '');
  if (!cleaned) return { hasBatchim: false, batchimChar: '' };
  const code = cleaned.charCodeAt(cleaned.length - 1) - 0xac00;
  if (code < 0 || code > 11171) return { hasBatchim: false, batchimChar: '' };
  const jong = code % 28;
  return {
    hasBatchim: jong !== 0,
    batchimChar: JONGSEONG_LIST[jong] || '',
  };
}

interface WrongRuleHighlight {
  badge: string;
  highlightLastSyllable: boolean;
  highlightPredicate: boolean;
}

function getWrongRuleHighlight(
  unit: ParticleGameUnitId,
  noun: string,
  wrongChoice: ParticleChoice,
  predicate: string,
  correctChoiceHint?: string
): WrongRuleHighlight | null {
  const { hasBatchim, batchimChar } = getLastBatchimInfo(noun);

  if (unit === 'unit1' || unit === 'unit3' || unit === 'unit4') {
    if (wrongChoice === '을') {
      return {
        badge: `'을' 불가 → 서술어와 호응하는 주격·주제 자리`,
        highlightLastSyllable: false,
        highlightPredicate: true,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) 확인!` : '받침 없음 확인!',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit2') {
    if (wrongChoice === '고') {
      return {
        badge: hasBatchim ? `끝말 자리! 받침 있음 (${batchimChar}) → 이에요` : '끝말 자리! 받침 없음 → 예요',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 이에요` : '받침 없음 → 예요',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit5') {
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) 확인!` : '받침 없음 확인!',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit8') {
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 과 / 이랑 (만능: 하고)` : '받침 없음 → 와 / 랑 (만능: 하고)',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit9') {
    if (wrongChoice === '에게') {
      return {
        badge: '장소·도구 명사 → 사람 대상 \'에게\' 불가!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (batchimChar === 'ㄹ') {
      return {
        badge: '★ ㄹ 받침 예외 → 무조건 \'로\'!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 으로` : '받침 없음 → 로',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit6' || unit === 'unit6_2') {
    if (wrongChoice === '께서') {
      return {
        badge: '장소·시간 명사 → 높임 \'께서\' 불가!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: correctChoiceHint === '에' ? '목적지·존재·시간 → \'에\'' : '행동·출발 장소 → \'에서\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit7') {
    return {
      badge: '더할 때 → 추가 조사 \'도\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit10') {
    return {
      badge: '사람·동물 대상 → \'에게 / 한테\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit11') {
    return {
      badge: correctChoiceHint === '부터' ? "시작 시점 → '부터'" : "끝·도착 지점 → '까지'",
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit12') {
    if (wrongChoice === '까지') {
      return {
        badge: "여러 개 중 하나 선택 → '이나 / 나'",
        highlightLastSyllable: false,
        highlightPredicate: true,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 이나` : '받침 없음 → 나',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit13') {
    return {
      badge: '매번 반복·각각 모두 → \'마다\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit14') {
    return {
      badge: '긍정 서술어 호응 → \'만\' (\'밖에\'는 부정어와!)',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit15') {
    return {
      badge: `부정어('${predicate}') 호응 → '밖에'`,
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit16') {
    return {
      badge: '두 대상 비교 기준 → \'보다\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit17') {
    return {
      badge: "비슷한 모습 비유 → '처럼 · 같이'",
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit18') {
    return {
      badge: '주인·소유 → \'의\' (나+의→내, 저+의→제)',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit19') {
    return {
      badge: "여럿이 함께 어울릴 때 → '끼리'",
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit20') {
    return {
      badge: correctChoiceHint === '께서' ? '어른 주어 높임 → \'께서\'' : `서술어('${predicate}') 높임 대상 → '께'`,
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit21') {
    if (wrongChoice === '께서') {
      return {
        badge: '친근한 부름 자리 → 높임 \'께서\' 불가!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 아` : '받침 없음 → 야',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (
    unit === 'sentence1' ||
    unit === 'sentence2' ||
    unit === 'sentence3' ||
    unit === 'sentence4' ||
    unit === 'sentence5' ||
    unit === 'sentence6' ||
    unit === 'sentence7' ||
    unit === 'sentence8'
  ) {
    const c = correctChoiceHint || '';
    if (c === '은' || c === '는') {
      return {
        badge: hasBatchim ? `받침 있음 (${batchimChar}) → 은` : '받침 없음 → 는',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '이에요' || c === '예요') {
      return {
        badge: hasBatchim ? `받침 있음 (${batchimChar}) → 이에요` : '받침 없음 → 예요',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '이' || c === '가') {
      return {
        badge: hasBatchim ? `주어 자리 · 받침 (${batchimChar}) → 이` : '주어 자리 · 받침 없음 → 가',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '을' || c === '를') {
      return {
        badge: hasBatchim ? `목적어 자리 · 받침 (${batchimChar}) → 을` : '목적어 자리 · 받침 없음 → 를',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '에') return { badge: "목적지·시간 → '에'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '에서') return { badge: "행동 장소 → '에서'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '도') return { badge: "이미 있는 것에 더할 때 → '도'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '랑') return { badge: '함께 · 받침 없음 → 랑', highlightLastSyllable: true, highlightPredicate: false };
    if (c === '으로' || c === '로') {
      return {
        badge: hasBatchim && batchimChar !== 'ㄹ' ? `수단 · 받침 (${batchimChar}) → 으로` : '수단 · 받침 없음/ㄹ → 로',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '한테') return { badge: "사람 대상 → '한테'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '부터') return { badge: "시작 시점 → '부터'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '까지') return { badge: "끝 지점 → '까지'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '이나') return { badge: `선택 · 받침 (${batchimChar}) → 이나`, highlightLastSyllable: true, highlightPredicate: false };
    if (c === '마다') return { badge: "매번 반복 → '마다'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '만') return { badge: "긍정 서술어 호응 → '만'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '밖에') return { badge: `부정어('${predicate}') 호응 → '밖에'`, highlightLastSyllable: false, highlightPredicate: true };
    if (c === '보다') return { badge: "비교 기준 → '보다'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '의') return { badge: "주인·소유 → '의'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '끼리') return { badge: "함께 어울림 → '끼리'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '처럼') return { badge: "비슷한 모습 비유 → '처럼'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '께서') return { badge: "어른 주어 높임 → '께서'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '께') return { badge: "어른 대상 높임 → '께'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '아' || c === '야') {
      return {
        badge: hasBatchim ? `부름 · 받침 (${batchimChar}) → 아` : '부름 · 받침 없음 → 야',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
  }

  return null;
}

// ===== 에메랄드 파스텔 마스코트 배지 & 별빛 헬퍼 =====
const PastelMascotBadge: React.FC<{ isCorrect: boolean; children: React.ReactNode }> = ({ isCorrect, children }) => (
  <g>
    <circle cx="0" cy="4" r="56" fill={isCorrect ? '#D1FAE5' : '#FFFFFF'} opacity="0.92" />
    <circle
      cx="0"
      cy="4"
      r="56"
      fill="none"
      stroke={isCorrect ? '#10B981' : '#6EE7B7'}
      strokeWidth={isCorrect ? '3.5' : '2.5'}
    />
    <circle
      cx="0"
      cy="4"
      r="49"
      fill="none"
      stroke={isCorrect ? '#34D399' : '#A7F3D0'}
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    {isCorrect && (
      <g>
        <path d="M-58 -36 L-54 -44 L-50 -36 L-42 -32 L-50 -28 L-54 -20 L-58 -28 L-66 -32 Z" fill="#34D399" />
        <path d="M54 -40 L57 -46 L60 -40 L66 -37 L60 -34 L57 -28 L54 -34 L48 -37 Z" fill="#10B981" />
        <circle cx="62" cy="18" r="4" fill="#6EE7B7" />
        <circle cx="-62" cy="24" r="3.5" fill="#A7F3D0" />
      </g>
    )}
    {children}
  </g>
);

// ===== 독립형 졸라맨 캐릭터 SVG =====
const StickmanPlayer: React.FC<{ face: FaceMode; running: boolean; animTime: number }> = ({
  face,
  running,
  animTime,
}) => {
  const leg = running ? Math.sin(animTime * 22) * 18 : 0;
  const arm = running ? Math.cos(animTime * 22) * 18 : 0;
  return (
    <g>
      <ellipse cx="0" cy="50" rx="18" ry="4.5" fill="#059669" opacity="0.18" />
      <circle cx="0" cy="-38" r="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
      {face === 'happy' && (
        <g>
          <circle cx="-10" cy="-35" r="3.2" fill="#FDA4AF" opacity="0.55" />
          <circle cx="10" cy="-35" r="3.2" fill="#FDA4AF" opacity="0.55" />
          <circle cx="-6" cy="-41" r="2.4" fill="#1E293B" />
          <circle cx="6" cy="-41" r="2.4" fill="#1E293B" />
          <circle cx="-5.2" cy="-41.8" r="0.8" fill="#FFFFFF" />
          <circle cx="6.8" cy="-41.8" r="0.8" fill="#FFFFFF" />
          <path d="M-5.5 -32 Q0 -26.5 5.5 -32" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {face === 'panic' && (
        <g>
          <circle cx="-6" cy="-41" r="3.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="6" cy="-41" r="3.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="-6" cy="-41" r="1.2" fill="#1E293B" />
          <circle cx="6" cy="-41" r="1.2" fill="#1E293B" />
          <ellipse cx="0" cy="-30" rx="5" ry="6" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
        </g>
      )}
      {face === 'dizzy' && (
        <g>
          <path d="M-9 -44 L-3 -38 M-3 -44 L-9 -38" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M3 -44 L9 -38 M9 -44 L3 -38" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M-5 -30 Q0 -34 5 -30" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {(face === 'crying' || face === 'headClutch') && (
        <g>
          <path d="M-9 -42 L-3 -40 L-9 -38" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M9 -42 L3 -40 L9 -38" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="-6" y1="-37" x2="-6" y2="-24" stroke="#60A5FA" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="6" y1="-37" x2="6" y2="-24" stroke="#60A5FA" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M-5 -28 Q0 -33 5 -28" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      <line x1="0" y1="-20" x2="0" y2="16" stroke="#1E293B" strokeWidth="4.8" strokeLinecap="round" />
      <line x1="0" y1="-10" x2={-18 - arm} y2="6" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      <line x1="0" y1="-10" x2={18 + arm} y2={face === 'headClutch' ? -36 : 4} stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      <line x1="0" y1="16" x2={-12 + leg} y2="48" stroke="#1E293B" strokeWidth="4.8" strokeLinecap="round" />
      <line x1="0" y1="16" x2={12 - leg} y2="48" stroke="#1E293B" strokeWidth="4.8" strokeLinecap="round" />
    </g>
  );
};

// ===== 1단원 명사별 마스코트 SVG =====
const Unit1NounMascot: React.FC<{ nounId: Unit1NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {nounId === 'na' && (
        <g>
          <rect x="-24" y="-2" width="48" height="44" rx="14" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="25" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">나</text>
          <circle cx="0" cy="-26" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -30 Q0 -52 21 -30" fill="#1E293B" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'chingu' && (
        <g>
          <rect x="-24" y="-4" width="48" height="44" rx="14" fill="#10B981" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="21" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-20 -31 Q0 -50 20 -31 Z" fill="#78350F" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-36" cy="28" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <polygon points="-36,21 -42,26 -39,33 -33,33 -30,26" fill="#1E293B" />
        </g>
      )}
      {nounId === 'dongsaeng' && (
        <g>
          <rect x="-20" y="0" width="40" height="38" rx="13" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-22" r="20" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-20 -26 Q0 -48 20 -26 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-10" cy="-17" r="4" fill="#FDA4AF" opacity="0.7" />
          <circle cx="10" cy="-17" r="4" fill="#FDA4AF" opacity="0.7" />
          <circle cx="-6" cy="-22" r="2.5" fill="#1E293B" />
          <circle cx="6" cy="-22" r="2.5" fill="#1E293B" />
          <path d="M-5 -13 Q0 -8 5 -13" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'seonsaengnim' && (
        <g>
          <rect x="-25" y="-4" width="50" height="46" rx="14" fill="#A78BFA" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-8,-4 8,-4 0,10" fill="#FFFFFF" />
          <circle cx="0" cy="-28" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-22 -33 Q0 -54 22 -33" fill="#334155" />
          <circle cx="-8" cy="-26" r="6" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="8" cy="-26" r="6" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <line x1="-2" y1="-26" x2="2" y2="-26" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="-8" cy="-26" r="1.8" fill="#1E293B" />
          <circle cx="8" cy="-26" r="1.8" fill="#1E293B" />
          <path d="M-5 -15 Q0 -10 5 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'gabang' && (
        <g>
          <path d="M-20 -36 Q0 -56 20 -36" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
          <rect x="-36" y="-34" width="72" height="78" rx="22" fill={isCorrect ? '#EC4899' : '#FB7185'} stroke="#1E293B" strokeWidth="4" />
          <rect x="-26" y="4" width="52" height="28" rx="10" fill={isCorrect ? '#F472B6' : '#FDA4AF'} stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
    </g>
  );
};

// ===== 2단원 명사별 개그 마스코트 SVG =====
const Unit2NounMascot: React.FC<{
  nounId: Unit2NounId;
  isCorrect: boolean;
  isGoMode: boolean;
  animTime: number;
}> = ({ nounId, isCorrect, isGoMode, animTime }) => {
  const legSwing = Math.sin(animTime * 28) * 18;
  return (
    <g>
      {isGoMode && (
        <g opacity="0.85">
          <line x1="-88" y1="-18" x2="-52" y2="-18" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="-96" y1="4" x2="-56" y2="4" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
          <line x1="-82" y1="24" x2="-50" y2="24" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'haksaeng' && (
        <g>
          {isGoMode && (
            <g>
              <line x1="-12" y1="36" x2={-16 + legSwing} y2="68" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
              <line x1="12" y1="36" x2={16 - legSwing} y2="68" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
          <rect x="-36" y="-8" width="16" height="36" rx="6" fill="#FB7185" stroke="#7F1D1D" strokeWidth="3" />
          <rect x="-22" y="-4" width="44" height="44" rx="14" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-24 -30 Q0 -54 24 -30 Z" fill="#1E293B" />
          <rect x="6" y="-33" width="22" height="5" rx="2.5" fill="#1E293B" />
          <circle cx="-7" cy="-23" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-23" r="2.6" fill="#1E293B" />
          <path d={isGoMode ? 'M-5 -15 Q0 -8 5 -15' : 'M-5 -16 Q0 -11 5 -16'} fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'yeonpil' && (
        <g>
          {isGoMode && (
            <g transform="translate(0, 48)">
              <polygon points="-14,0 0,34 14,0" fill="#F97316" />
              <polygon points="-7,0 0,20 7,0" fill="#FEF08A" />
            </g>
          )}
          <polygon points="0,-54 -18,-26 18,-26" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="0,-54 -6,-44 6,-44" fill="#1E293B" />
          <rect x="-18" y="-26" width="36" height="58" fill="#FACC15" stroke="#854D0E" strokeWidth="3.5" />
          <line x1="-6" y1="-26" x2="-6" y2="32" stroke="#CA8A04" strokeWidth="2.5" />
          <line x1="6" y1="-26" x2="6" y2="32" stroke="#CA8A04" strokeWidth="2.5" />
          <rect x="-18" y="32" width="36" height="14" rx="4" fill="#FB7185" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-6" cy="-4" r="2.8" fill="#1E293B" />
          <circle cx="6" cy="-4" r="2.8" fill="#1E293B" />
          <path d="M-5 5 Q0 10 5 5" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'chilpan' && (
        <g>
          {isGoMode && (
            <g>
              <rect x="-46" y="42" width="92" height="8" rx="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
              <circle cx="-28" cy="56" r="10" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
              <circle cx="28" cy="56" r="10" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
            </g>
          )}
          <rect x="-52" y="-34" width="104" height="72" rx="10" fill="#34D399" stroke="#1E293B" strokeWidth="7" />
          <rect x="-36" y="34" width="30" height="6" rx="2" fill="#FFFFFF" />
          <rect x="10" y="34" width="18" height="6" rx="2" fill="#FEF08A" />
          <circle cx="-16" cy="-6" r="3.5" fill="#FFFFFF" />
          <circle cx="16" cy="-6" r="3.5" fill="#FFFFFF" />
          <path d="M-10 8 Q0 17 10 8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'uija' && (
        <g>
          {isGoMode && (
            <g>
              <circle cx="-24" cy="48" r="11" fill="#1E293B" stroke="#FACC15" strokeWidth="3" />
              <circle cx="24" cy="48" r="11" fill="#1E293B" stroke="#FACC15" strokeWidth="3" />
              <line x1="34" y1="-44" x2="34" y2="10" stroke="#1E293B" strokeWidth="3.5" />
              <rect x="34" y="-44" width="24" height="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              <rect x="34" y="-44" width="12" height="8" fill="#1E293B" />
              <rect x="46" y="-36" width="12" height="8" fill="#1E293B" />
            </g>
          )}
          <rect x="-26" y="-42" width="52" height="36" rx="8" fill="#D97706" stroke="#1E293B" strokeWidth="3.5" />
          <line x1="-20" y1="-6" x2="-20" y2="10" stroke="#1E293B" strokeWidth="5" />
          <line x1="20" y1="-6" x2="20" y2="10" stroke="#1E293B" strokeWidth="5" />
          <rect x="-32" y="8" width="64" height="14" rx="6" fill="#F59E0B" stroke="#1E293B" strokeWidth="3.5" />
          <line x1="-22" y1="22" x2="-22" y2="44" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          <line x1="22" y1="22" x2="22" y2="44" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          <circle cx="-9" cy="-26" r="3" fill="#1E293B" />
          <circle cx="9" cy="-26" r="3" fill="#1E293B" />
          <path d="M-6 -17 Q0 -12 6 -17" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'jiugae' && (
        <g>
          {isGoMode && (
            <g>
              <line x1="-14" y1="36" x2={-16 + legSwing} y2="66" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
              <line x1="14" y1="36" x2={16 - legSwing} y2="66" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
          <rect x="-34" y="-36" width="68" height="32" rx="10" fill="#F8FAFC" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-34" y="-10" width="68" height="48" rx="8" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="14" width="48" height="12" rx="4" fill="#DBEAFE" />
          <circle cx="-11" cy="-22" r="2.8" fill="#1E293B" />
          <circle cx="11" cy="-22" r="2.8" fill="#1E293B" />
          <path d="M-6 -15 Q0 -10 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 3단원 명사별 마스코트 SVG =====
const Unit3NounMascot: React.FC<{ nounId: Unit3NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {nounId === 'mul' && (
        <g>
          <polygon points="-28,-30 28,-30 20,40 -20,40" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <polygon points="-24,-6 24,-6 18,36 -18,36" fill="#38BDF8" />
          <circle cx="-7" cy="12" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="12" r="2.6" fill="#1E293B" />
          <path d="M-5 21 Q0 26 5 21" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'chaek' && (
        <g>
          <rect x="-34" y="-32" width="68" height="72" rx="8" fill="#6366F1" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="-32" width="8" height="72" fill="#4F46E5" />
          <rect x="-6" y="-18" width="30" height="22" rx="4" fill="#FFFFFF" />
          <circle cx="4" cy="-7" r="2.4" fill="#1E293B" />
          <circle cx="14" cy="-7" r="2.4" fill="#1E293B" />
          <path d="M5 1 Q9 5 13 1" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'yak' && (
        <g>
          <rect x="-30" y="-34" width="60" height="74" rx="14" fill="#FFFFFF" stroke="#059669" strokeWidth="3.5" />
          <rect x="-12" y="-18" width="24" height="8" rx="2" fill="#FB7185" />
          <rect x="-4" y="-26" width="8" height="24" rx="2" fill="#FB7185" />
          <circle cx="-9" cy="12" r="2.5" fill="#1E293B" />
          <circle cx="9" cy="12" r="2.5" fill="#1E293B" />
          <path d="M-5 20 Q0 25 5 20" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'bae' && (
        <g>
          <rect x="-28" y="-10" width="56" height="52" rx="18" fill="#FBBF24" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-30" r="19" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-6" cy="-30" r="2.4" fill="#1E293B" />
          <circle cx="6" cy="-30" r="2.4" fill="#1E293B" />
          <path d={isCorrect ? 'M-6 -21 Q0 -16 6 -21' : 'M-5 -18 Q0 -23 5 -18'} fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <text x="0" y="22" textAnchor="middle" fontSize="18" fontWeight="900" fill="#92400E">{isCorrect ? '튼튼!' : '꼬르륵'}</text>
        </g>
      )}
      {nounId === 'binu' && (
        <g>
          <rect x="-38" y="-18" width="76" height="48" rx="22" fill="#F472B6" stroke="#9D174D" strokeWidth="3.5" />
          <circle cx="-30" cy="-32" r="9" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="28" cy="-36" r="11" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="-10" cy="4" r="2.8" fill="#1E293B" />
          <circle cx="10" cy="4" r="2.8" fill="#1E293B" />
          <path d="M-6 13 Q0 19 6 13" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 4단원 변화형 명사별 마스코트 SVG =====
const Unit4NounMascot: React.FC<{ nounId: Unit4NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {(nounId === 'na5' || nounId === 'neo5' || nounId === 'jeo5' || nounId === 'nugu5') && (
        <g>
          <rect
            x="-26"
            y="-4"
            width="52"
            height="46"
            rx="15"
            fill={nounId === 'na5' ? '#3B82F6' : nounId === 'neo5' ? '#F59E0B' : nounId === 'jeo5' ? '#8B5CF6' : '#14B8A6'}
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <text x="0" y="26" textAnchor="middle" fontSize="17" fontWeight="900" fill="#FFFFFF">
            {nounId === 'na5' ? '내가!' : nounId === 'neo5' ? '네가!' : nounId === 'jeo5' ? '제가!' : '누가?'}
          </text>
          <circle cx="0" cy="-28" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-27" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-27" r="2.6" fill="#1E293B" />
          <path d="M-6 -18 Q0 -12 6 -18" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'igeot5' && (
        <g>
          <rect x="-34" y="-26" width="68" height="64" rx="12" fill="#FDE047" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="14" textAnchor="middle" fontSize="26" fontWeight="900" fill="#713F12">이게?</text>
        </g>
      )}
    </g>
  );
};

// ===== 5단원 명사별 마스코트 SVG =====
const Unit5NounMascot: React.FC<{ nounId: Unit5NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {nounId === 'bap' && (
        <g>
          <path d="M-38 2 Q0 -34 38 2 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
          <path d="M-40 2 L40 2 Q34 40 0 40 Q-34 40 -40 2 Z" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-10" cy="18" r="2.8" fill="#FFFFFF" />
          <circle cx="10" cy="18" r="2.8" fill="#FFFFFF" />
          <path d="M-6 26 Q0 31 6 26" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'son' && (
        <g>
          <rect x="-24" y="-8" width="48" height="46" rx="18" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="-34" width="10" height="30" rx="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="-11" y="-42" width="10" height="38" rx="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="2" y="-40" width="10" height="36" rx="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="15" y="-30" width="9" height="28" rx="4.5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-7" cy="10" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="10" r="2.5" fill="#1E293B" />
          <path d="M-5 19 Q0 24 5 19" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'mueot' && (
        <g>
          <rect x="-34" y="-30" width="68" height="68" rx="14" fill="#A855F7" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="18" textAnchor="middle" fontSize="44" fontWeight="900" fill="#FEF08A">?</text>
        </g>
      )}
      {nounId === 'uyu' && (
        <g>
          <polygon points="-24,-34 24,-34 30,-16 -30,-16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-30" y="-16" width="60" height="58" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-30" y="6" width="60" height="22" fill="#38BDF8" />
          <text x="0" y="23" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FFFFFF">우유</text>
          <circle cx="-10" cy="-4" r="2.6" fill="#1E293B" />
          <circle cx="10" cy="-4" r="2.6" fill="#1E293B" />
        </g>
      )}
      {nounId === 'sagwa' && (
        <g>
          <path d="M0 -34 Q8 -48 18 -42 Q12 -32 0 -34 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="0" cy="2" r="36" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-10" cy="0" r="3" fill="#1E293B" />
          <circle cx="10" cy="0" r="3" fill="#1E293B" />
          <path d="M-6 10 Q0 16 6 10" fill="none" stroke="#1E293B" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 6~10단원 명사별 마스코트 SVG =====
const Unit6To10NounMascot: React.FC<{
  nounId: Unit6NounId | Unit7NounId | Unit8NounId | Unit9NounId | Unit10NounId;
  isCorrect: boolean;
}> = ({ nounId, isCorrect }) => {
  if (nounId === 'na' || nounId === 'chingu' || nounId === 'dongsaeng' || nounId === 'seonsaengnim') {
    return <Unit1NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'yeonpil') {
    return <Unit2NounMascot nounId="yeonpil" isCorrect={isCorrect} isGoMode={false} animTime={0} />;
  }
  if (nounId === 'mul' || nounId === 'chaek') {
    return <Unit3NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'sagwa' || nounId === 'uyu') {
    return <Unit5NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  return (
    <g>
      {nounId === 'hakgyo' && (
        <g>
          <rect x="-42" y="-12" width="84" height="54" rx="8" fill="#FEF3C7" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-48,-12 0,-46 48,-12" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-24" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="0" y1="-24" x2="0" y2="-30" stroke="#1E293B" strokeWidth="2.2" />
          <line x1="0" y1="-24" x2="5" y2="-24" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="-12" y="14" width="24" height="28" rx="4" fill="#92400E" />
          <circle cx="-26" cy="10" r="2.5" fill="#1E293B" />
          <circle cx="26" cy="10" r="2.5" fill="#1E293B" />
        </g>
      )}
      {(nounId === 'jip_e' || nounId === 'jip_eseo') && (
        <g>
          <rect x="-34" y="-6" width="68" height="48" rx="8" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-42,-4 0,-44 42,-4" fill="#F97316" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-10" y="14" width="20" height="28" rx="4" fill="#B45309" />
          <circle cx="-18" cy="12" r="2.5" fill="#1E293B" />
          <circle cx="18" cy="12" r="2.5" fill="#1E293B" />
          <path d="M-5 2 Q0 7 5 2" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'eodi' && (
        <g>
          <rect x="-6" y="-42" width="12" height="86" rx="4" fill="#92400E" />
          <polygon points="-38,-32 30,-32 44,-16 30,0 -38,0" fill="#38BDF8" stroke="#1E293B" strokeWidth="3" />
          <text x="0" y="-9" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">어디?</text>
        </g>
      )}
      {nounId === 'achim' && (
        <g>
          <circle cx="0" cy="4" r="34" fill="#FACC15" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-18" cy="-28" r="10" fill="#FB7185" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-28" r="10" fill="#FB7185" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-10" cy="0" r="2.8" fill="#1E293B" />
          <circle cx="10" cy="0" r="2.8" fill="#1E293B" />
          <path d="M-6 12 Q0 18 6 12" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'jeomsim' && (
        <g>
          <rect x="-40" y="-22" width="80" height="58" rx="14" fill="#FB923C" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-30" y="-12" width="26" height="22" rx="6" fill="#FFFFFF" />
          <rect x="4" y="-12" width="26" height="22" rx="6" fill="#FDE047" />
          <circle cx="-10" cy="22" r="2.5" fill="#1E293B" />
          <circle cx="10" cy="22" r="2.5" fill="#1E293B" />
          <path d="M-5 28 Q0 32 5 28" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'gyosil' && (
        <g>
          <rect x="-44" y="-32" width="88" height="54" rx="8" fill="#34D399" stroke="#1E293B" strokeWidth="5" />
          <text x="0" y="0" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FEF08A">공부</text>
          <rect x="-32" y="26" width="64" height="16" rx="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'undongjang' && (
        <g>
          <rect x="-46" y="10" width="92" height="28" rx="8" fill="#22C55E" stroke="#15803D" strokeWidth="3.5" />
          <path d="M-32 14 L-32 -22 L32 -22 L32 14" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="0" cy="-2" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <polygon points="0,-9 -6,-3 -4,5 4,5 6,-3" fill="#1E293B" />
        </g>
      )}
      {nounId === 'doseogwan' && (
        <g>
          <rect x="-38" y="-34" width="76" height="76" rx="8" fill="#B45309" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-28" y="-24" width="14" height="24" rx="2" fill="#FB7185" />
          <rect x="-10" y="-24" width="14" height="24" rx="2" fill="#60A5FA" />
          <rect x="8" y="-24" width="16" height="24" rx="2" fill="#10B981" />
          <rect x="-28" y="8" width="16" height="24" rx="2" fill="#FACC15" />
          <rect x="-8" y="8" width="32" height="24" rx="2" fill="#EC4899" />
        </g>
      )}
      {nounId === 'eoneunara' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#38BDF8" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-20 -10 Q-5 -20 6 -6 Q-6 8 -20 -10 Z" fill="#22C55E" />
          <path d="M10 6 Q24 2 26 18 Q12 24 10 6 Z" fill="#22C55E" />
          <circle cx="-10" cy="0" r="2.8" fill="#1E293B" />
          <circle cx="10" cy="0" r="2.8" fill="#1E293B" />
          <path d="M-6 11 Q0 17 6 11" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'usan' && (
        <g>
          <path d="M-42 0 Q0 -48 42 0 Z" fill="#A78BFA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M0 0 L0 32 Q0 42 10 42 Q18 42 18 34" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="-12" cy="-12" r="2.6" fill="#FFFFFF" />
          <circle cx="12" cy="-12" r="2.6" fill="#FFFFFF" />
          <path d="M-6 -4 Q0 2 6 -4" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'eomma' && (
        <g>
          <circle cx="-18" cy="-34" r="11" fill="#78350F" />
          <circle cx="18" cy="-34" r="11" fill="#78350F" />
          <rect x="-26" y="-2" width="52" height="44" rx="16" fill="#EC4899" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-10 -2 L0 10 L10 -2" fill="#FCE7F3" />
          <circle cx="0" cy="-26" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-23 -28 Q0 -54 23 -28 Q16 -38 0 -36 Q-16 -38 -23 -28 Z" fill="#78350F" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="-12" cy="-19" r="3.5" fill="#FDA4AF" opacity="0.7" />
          <circle cx="12" cy="-19" r="3.5" fill="#FDA4AF" opacity="0.7" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'beoseu' && (
        <g>
          <rect x="-48" y="-28" width="96" height="58" rx="14" fill="#FACC15" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-40" y="-18" width="24" height="20" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <rect x="-10" y="-18" width="24" height="20" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <rect x="20" y="-18" width="20" height="20" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <circle cx="-26" cy="30" r="11" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="26" cy="30" r="11" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="-12" cy="14" r="2.5" fill="#1E293B" />
          <circle cx="12" cy="14" r="2.5" fill="#1E293B" />
          <path d="M-6 20 Q0 24 6 20" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'sutgarak' && (
        <g>
          <rect x="-7" y="-8" width="14" height="56" rx="7" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3.5" />
          <ellipse cx="0" cy="-22" rx="22" ry="28" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3.5" />
          <ellipse cx="0" cy="-24" rx="14" ry="18" fill="#F8FAFC" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-5 -15 Q0 -10 5 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'jjakkkung' && (
        <g>
          <circle cx="-18" cy="-18" r="15" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-33" y="-2" width="30" height="36" rx="10" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-18" r="15" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="3" y="-2" width="30" height="36" rx="10" fill="#F43F5E" stroke="#1E293B" strokeWidth="3" />
          <rect x="-40" y="24" width="80" height="14" rx="4" fill="#D97706" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'uri' && (
        <g>
          <circle cx="-18" cy="-18" r="15" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-33" y="-2" width="30" height="40" rx="11" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-18" r="15" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="3" y="-2" width="30" height="40" rx="11" fill="#10B981" stroke="#1E293B" strokeWidth="3" />
          <path d="M-8 14 Q0 8 8 14" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'gangaji' && (
        <g>
          <ellipse cx="-26" cy="-16" rx="11" ry="20" fill="#B45309" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx="26" cy="-16" rx="11" ry="20" fill="#B45309" stroke="#1E293B" strokeWidth="3" />
          <rect x="-24" y="2" width="48" height="38" rx="18" fill="#F59E0B" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-18" r="24" fill="#FBBF24" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-8" cy="-20" r="3" fill="#1E293B" />
          <circle cx="8" cy="-20" r="3" fill="#1E293B" />
          <ellipse cx="0" cy="-12" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M-6 -6 Q0 -1 6 -6" fill="none" stroke="#1E293B" strokeWidth="2.3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'nugu10' && (
        <g>
          <rect x="-26" y="-4" width="52" height="46" rx="15" fill="#14B8A6" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="26" textAnchor="middle" fontSize="17" fontWeight="900" fill="#FFFFFF">누구?</text>
          <circle cx="0" cy="-28" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-27" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-27" r="2.6" fill="#1E293B" />
          <path d="M-6 -18 Q0 -12 6 -18" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 11~16단원 명사별 마스코트 SVG =====
const Unit11To16NounMascot: React.FC<{
  nounId: Unit11NounId | Unit12NounId | Unit13NounId | Unit14NounId | Unit15NounId | Unit16NounId;
  isCorrect: boolean;
}> = ({ nounId, isCorrect }) => {
  if (
    nounId === 'achim' ||
    nounId === 'hakgyo' ||
    nounId === 'eodi' ||
    nounId === 'gyosil' ||
    nounId === 'beoseu' ||
    nounId === 'nugu10'
  ) {
    return <Unit6To10NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'na') {
    return <Unit1NounMascot nounId="na" isCorrect={isCorrect} />;
  }
  if (nounId === 'mul') {
    return <Unit3NounMascot nounId="mul" isCorrect={isCorrect} />;
  }
  if (nounId === 'chaek') {
    return <Unit3NounMascot nounId="chaek" isCorrect={isCorrect} />;
  }
  if (nounId === 'sagwa') {
    return <Unit5NounMascot nounId="sagwa" isCorrect={isCorrect} />;
  }

  return (
    <g>
      {(nounId === 'wolyoil' || nounId === 'geumyoil' || nounId === 'oneul' || nounId === 'eoje') && (
        <g>
          <rect x="-36" y="-32" width="72" height="74" rx="12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <rect
            x="-36"
            y="-32"
            width="72"
            height="22"
            rx="10"
            fill={
              nounId === 'wolyoil'
                ? '#3B82F6'
                : nounId === 'geumyoil'
                ? '#F59E0B'
                : nounId === 'oneul'
                ? '#EC4899'
                : '#64748B'
            }
          />
          <circle cx="-16" cy="-34" r="4" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
          <circle cx="16" cy="-34" r="4" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
          <text x="0" y="20" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1E293B">
            {nounId === 'wolyoil' ? '월' : nounId === 'geumyoil' ? '금' : nounId === 'oneul' ? '오늘' : '어제'}
          </text>
        </g>
      )}
      {nounId === 'ilbeon' && (
        <g>
          <circle cx="0" cy="4" r="36" fill="#FACC15" stroke="#1E293B" strokeWidth="4" />
          <circle cx="0" cy="4" r="27" fill="#FEF08A" />
          <text x="0" y="15" textAnchor="middle" fontSize="30" fontWeight="900" fill="#854D0E">1번</text>
        </g>
      )}
      {nounId === 'jigeum' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#38BDF8" stroke="#1E293B" strokeWidth="4" />
          <circle cx="0" cy="2" r="27" fill="#FFFFFF" />
          <line x1="0" y1="2" x2="0" y2="-15" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <line x1="0" y1="2" x2="14" y2="8" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          <text x="0" y="54" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0369A1">지금!</text>
        </g>
      )}
      {nounId === 'eonje' && (
        <g>
          <rect x="-34" y="-30" width="68" height="68" rx="14" fill="#A78BFA" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FEF08A">언제?</text>
        </g>
      )}
      {nounId === 'jeonyeok' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#1E293B" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-8 -18 A20 20 0 1 0 18 14 A15 15 0 1 1 -8 -18 Z" fill="#FACC15" />
          <circle cx="14" cy="-14" r="3" fill="#FEF08A" />
          <circle cx="-18" cy="18" r="2.5" fill="#FEF08A" />
        </g>
      )}
      {nounId === 'yeogi' && (
        <g>
          <path d="M0 -38 C-22 -38 -34 -20 -34 -2 C-34 20 0 44 0 44 C0 44 34 20 34 -2 C34 -20 22 -38 0 -38 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-6" r="14" fill="#FFFFFF" />
          <text x="0" y="-1" textAnchor="middle" fontSize="12" fontWeight="900" fill="#991B1B">여기</text>
        </g>
      )}
      {nounId === 'nal' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="3.5" />
          <circle cx="0" cy="2" r="18" fill="#FACC15" />
          <text x="0" y="8" textAnchor="middle" fontSize="15" fontWeight="900" fill="#713F12">매일</text>
        </g>
      )}
      {nounId === 'jumal' && (
        <g>
          <rect x="-40" y="-28" width="80" height="66" rx="14" fill="#10B981" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="10" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">토·일</text>
        </g>
      )}
      {nounId === 'saram' && (
        <g>
          <circle cx="-18" cy="-16" r="14" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-32" y="0" width="28" height="36" rx="10" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-16" r="14" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="4" y="0" width="28" height="36" rx="10" fill="#EC4899" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'hana' && (
        <g>
          <circle cx="0" cy="2" r="34" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-26" cy="-20" r="8" fill="#FDA4AF" />
          <circle cx="26" cy="24" r="8" fill="#FDA4AF" />
          <text x="0" y="13" textAnchor="middle" fontSize="28" fontWeight="900" fill="#FFFFFF">1</text>
        </g>
      )}
      {nounId === 'sigan' && (
        <g>
          <rect x="-28" y="-34" width="56" height="8" rx="4" fill="#92400E" />
          <rect x="-28" y="32" width="56" height="8" rx="4" fill="#92400E" />
          <polygon points="-22,-26 22,-26 0,2 -22,32 22,32 0,2" fill="#E0F2FE" stroke="#1E293B" strokeWidth="3" />
          <polygon points="-14,30 14,30 0,14" fill="#F59E0B" />
        </g>
      )}
      {nounId === 'ppang' && (
        <g>
          <path d="M-34 -8 C-34 -34 34 -34 34 -8 L28 36 L-28 36 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-24 -6 C-24 -24 24 -24 24 -6 L20 28 L-20 28 Z" fill="#FEF3C7" />
          <circle cx="-9" cy="4" r="2.6" fill="#1E293B" />
          <circle cx="9" cy="4" r="2.6" fill="#1E293B" />
          <path d="M-5 13 Q0 18 5 13" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'hyeong' && (
        <g>
          <rect x="-26" y="-2" width="52" height="46" rx="14" fill="#0EA5E9" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="27" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">형</text>
          <circle cx="0" cy="-26" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -30 Q0 -52 21 -30" fill="#1E293B" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 17~21단원 명사별 마스코트 SVG =====
const Unit17To21NounMascot: React.FC<{
  nounId: Unit17NounId | Unit18NounId | Unit19NounId | Unit20NounId | Unit21NounId;
  isCorrect: boolean;
}> = ({ nounId, isCorrect }) => {
  if (nounId === 'chingu' || nounId === 'dongsaeng' || nounId === 'seonsaengnim') {
    return <Unit1NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'eomma' || nounId === 'gangaji' || nounId === 'nugu10') {
    return <Unit6To10NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'hyeong') {
    return <Unit11To16NounMascot nounId="hyeong" isCorrect={isCorrect} />;
  }
  if (nounId === 'haksaeng') {
    return <Unit2NounMascot nounId="haksaeng" isCorrect={isCorrect} isGoMode={false} animTime={0} />;
  }

  return (
    <g>
      {nounId === 'uri' && (
        <g>
          <circle cx="-18" cy="-18" r="15" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-33" y="-2" width="30" height="40" rx="11" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-18" r="15" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="3" y="-2" width="30" height="40" rx="11" fill="#10B981" stroke="#1E293B" strokeWidth="3" />
          <path d="M-8 14 Q0 8 8 14" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'namja' && (
        <g>
          <rect x="-24" y="-2" width="48" height="44" rx="14" fill="#2563EB" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="21" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -30 Q0 -52 21 -30 Z" fill="#1E293B" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'yeoja' && (
        <g>
          <circle cx="-18" cy="-34" r="10" fill="#78350F" />
          <circle cx="18" cy="-34" r="10" fill="#78350F" />
          <rect x="-24" y="-2" width="48" height="44" rx="16" fill="#EC4899" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="21" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -28 Q0 -52 21 -28 Q14 -37 0 -35 Q-14 -37 -21 -28 Z" fill="#78350F" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'tokki' && (
        <g>
          <ellipse cx="-14" cy="-42" rx="9" ry="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx="14" cy="-42" rx="9" ry="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx="-14" cy="-42" rx="4.5" ry="14" fill="#FDA4AF" />
          <ellipse cx="14" cy="-42" rx="4.5" ry="14" fill="#FDA4AF" />
          <circle cx="0" cy="-12" r="26" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-8" cy="-14" r="2.8" fill="#1E293B" />
          <circle cx="8" cy="-14" r="2.8" fill="#1E293B" />
          <circle cx="0" cy="-7" r="3" fill="#FB7185" />
          <path d="M-5 -2 Q0 2 5 -2" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="0" cy="24" rx="22" ry="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'gureum' && (
        <g>
          <circle cx="-24" cy="4" r="22" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="24" cy="4" r="22" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="0" cy="-12" r="28" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
          <rect x="-26" y="-4" width="52" height="28" fill="#FFFFFF" />
          <line x1="-24" y1="26" x2="24" y2="26" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-9" cy="2" r="2.6" fill="#1E293B" />
          <circle cx="9" cy="2" r="2.6" fill="#1E293B" />
          <path d="M-5 10 Q0 15 5 10" fill="none" stroke="#1E293B" strokeWidth="2.3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'nun' && (
        <g>
          <circle cx="0" cy="-2" r="34" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <line x1="0" y1="-26" x2="0" y2="22" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="-22" y1="-14" x2="22" y2="10" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="22" y1="-14" x2="-22" y2="10" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="-2" r="7" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
        </g>
      )}
      {nounId === 'byeol' && (
        <g>
          <polygon
            points="0,-42 11,-14 40,-14 17,4 26,34 0,16 -26,34 -17,4 -40,-14 -11,-14"
            fill="#FACC15"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <circle cx="-8" cy="-4" r="2.8" fill="#1E293B" />
          <circle cx="8" cy="-4" r="2.8" fill="#1E293B" />
          <path d="M-5 4 Q0 9 5 4" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {(nounId === 'na25' || nounId === 'neo25' || nounId === 'jeo25') && (
        <g>
          <rect
            x="-26"
            y="-4"
            width="52"
            height="46"
            rx="15"
            fill={nounId === 'na25' ? '#3B82F6' : nounId === 'neo25' ? '#F59E0B' : '#8B5CF6'}
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <text x="0" y="26" textAnchor="middle" fontSize="19" fontWeight="900" fill="#FFFFFF">
            {nounId === 'na25' ? '내!' : nounId === 'neo25' ? '네!' : '제!'}
          </text>
          <circle cx="0" cy="-28" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-27" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-27" r="2.6" fill="#1E293B" />
          <path d="M-6 -18 Q0 -12 6 -18" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'halmeoni' && (
        <g>
          <circle cx="0" cy="-42" r="11" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3" />
          <rect x="-26" y="-2" width="52" height="44" rx="16" fill="#F472B6" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-24" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -28 Q0 -48 21 -28" fill="#E2E8F0" />
          <circle cx="-7" cy="-22" r="5.5" fill="none" stroke="#1E293B" strokeWidth="2" />
          <circle cx="7" cy="-22" r="5.5" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="-1.5" y1="-22" x2="1.5" y2="-22" stroke="#1E293B" strokeWidth="2" />
          <path d="M-6 -13 Q0 -7 6 -13" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'halabeoji' && (
        <g>
          <rect x="-26" y="-2" width="52" height="44" rx="16" fill="#10B981" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-24" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -28 Q0 -48 21 -28" fill="#CBD5E1" />
          <path d="M-10 -12 Q0 -4 10 -12" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-5 -16 Q0 -12 5 -16" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'bumonim' && (
        <g>
          <circle cx="-18" cy="-22" r="16" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="-34" y="-4" width="32" height="42" rx="12" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-22" r="16" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="2" y="-4" width="32" height="42" rx="12" fill="#EC4899" stroke="#1E293B" strokeWidth="3" />
          <path d="M-6 6 Q0 0 6 6 Q0 14 -6 6 Z" fill="#FB7185" />
        </g>
      )}
      {nounId === 'eoreun' && (
        <g>
          <rect x="-26" y="-4" width="52" height="46" rx="14" fill="#475569" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-8,-4 8,-4 0,12" fill="#FB7185" />
          <circle cx="0" cy="-28" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-22 -32 Q0 -54 22 -32" fill="#334155" />
          <circle cx="-7" cy="-26" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-26" r="2.5" fill="#1E293B" />
          <path d="M-5 -16 Q0 -11 5 -16" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {(nounId === 'minsu' || nounId === 'sujin') && (
        <g>
          <rect
            x="-24"
            y="-2"
            width="48"
            height="44"
            rx="14"
            fill={nounId === 'minsu' ? '#0EA5E9' : '#FB7185'}
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <text x="0" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FFFFFF">
            {nounId === 'minsu' ? '민수' : '수진'}
          </text>
          <circle cx="0" cy="-26" r="21" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path
            d={nounId === 'minsu' ? 'M-21 -30 Q0 -52 21 -30' : 'M-22 -24 Q0 -52 22 -24'}
            fill={nounId === 'minsu' ? '#1E293B' : '#78350F'}
          />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 문장 만들기 1~8 명사별 마스코트 SVG =====
const SentenceNounMascot: React.FC<{ nounId: SentenceNounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  if (
    nounId === 'na' ||
    nounId === 'chingu' ||
    nounId === 'dongsaeng' ||
    nounId === 'seonsaengnim' ||
    nounId === 'gabang'
  ) {
    return <Unit1NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'haksaeng') {
    return <Unit2NounMascot nounId="haksaeng" isCorrect={isCorrect} isGoMode={false} animTime={0} />;
  }
  if (nounId === 'sagwa') {
    return <Unit5NounMascot nounId="sagwa" isCorrect={isCorrect} />;
  }
  if (nounId === 'hakgyo' || nounId === 'achim' || nounId === 'undongjang') {
    return <Unit6To10NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'geumyoil' || nounId === 'ppang' || nounId === 'jumal' || nounId === 'eonje') {
    return <Unit11To16NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'eoje23') {
    return <Unit11To16NounMascot nounId="eoje" isCorrect={isCorrect} />;
  }
  if (
    nounId === 'yeoja' ||
    nounId === 'tokki' ||
    nounId === 'halmeoni' ||
    nounId === 'bumonim' ||
    nounId === 'sujin'
  ) {
    return <Unit17To21NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }

  return (
    <g>
      {nounId === 'changmun' && (
        <g>
          <rect x="-36" y="-32" width="72" height="68" rx="10" fill="#BAE6FD" stroke="#1E293B" strokeWidth="3.5" />
          <line x1="0" y1="-32" x2="0" y2="36" stroke="#FFFFFF" strokeWidth="5" />
          <line x1="-36" y1="2" x2="36" y2="2" stroke="#FFFFFF" strokeWidth="5" />
          <rect x="-36" y="-32" width="72" height="68" rx="10" fill="none" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-18" cy="-16" r="6" fill="#FACC15" />
        </g>
      )}
      {nounId === 'geurim' && (
        <g>
          <rect x="-34" y="-30" width="68" height="58" rx="8" fill="#FFFBEB" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-24 14 Q0 -18 24 14" fill="none" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
          <path d="M-18 16 Q0 -8 18 16" fill="none" stroke="#34D399" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="16" cy="-14" r="6" fill="#FACC15" />
        </g>
      )}
      {nounId === 'norae' && (
        <g>
          <circle cx="-14" cy="18" r="13" fill="#EC4899" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="12" r="13" fill="#8B5CF6" stroke="#1E293B" strokeWidth="3" />
          <path d="M-3 18 L-3 -24 L29 -30 L29 12" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="-3" y1="-12" x2="29" y2="-18" stroke="#F472B6" strokeWidth="6" />
        </g>
      )}
      {nounId === 'gicha' && (
        <g>
          <rect x="-36" y="-12" width="72" height="40" rx="12" fill="#38BDF8" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="-28" width="48" height="20" rx="8" fill="#BAE6FD" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-18" cy="30" r="9" fill="#1E293B" />
          <circle cx="18" cy="30" r="9" fill="#1E293B" />
          <circle cx="0" cy="4" r="7" fill="#FEF08A" />
        </g>
      )}
      {nounId === 'yeongeo' && (
        <g>
          <rect x="-36" y="-28" width="72" height="58" rx="16" fill="#6366F1" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="9" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FFFFFF">ABC</text>
        </g>
      )}
      {nounId === 'gongchaek' && (
        <g>
          <rect x="-30" y="-32" width="60" height="72" rx="10" fill="#A7F3D0" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-18" y="-18" width="36" height="16" rx="4" fill="#FFFFFF" />
          <circle cx="-30" cy="-16" r="4" fill="#1E293B" />
          <circle cx="-30" cy="0" r="4" fill="#1E293B" />
          <circle cx="-30" cy="16" r="4" fill="#1E293B" />
        </g>
      )}
      {nounId === 'neo23' && (
        <g>
          <rect x="-24" y="-2" width="48" height="44" rx="14" fill="#F59E0B" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="25" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">너</text>
          <circle cx="0" cy="-26" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'nugu23' && <Unit6To10NounMascot nounId="nugu10" isCorrect={isCorrect} />}
      {nounId === 'sarang' && (
        <g>
          <path
            d="M0 32 C-10 22 -36 4 -36 -14 C-36 -28 -22 -38 -10 -32 C-4 -29 0 -22 0 -22 C0 -22 4 -29 10 -32 C22 -38 36 -28 36 -14 C36 4 10 22 0 32 Z"
            fill="#FB7185"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <circle cx="-11" cy="-10" r="2.6" fill="#1E293B" />
          <circle cx="11" cy="-10" r="2.6" fill="#1E293B" />
          <path d="M-6 -1 Q0 4 6 -1" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

const SLING_X = 165;
const SLING_Y = 268;
const TARGET_X_STD = 570;
const TARGET_X_U2 = 740;
const VIEW_WIDTH = 960;
const VIEW_BOTTOM = 386;
const MIN_VIEW_HEIGHT = 355;
const MAX_VIEW_HEIGHT = 760;
const GRAVITY = 960;
const SWEET_MIN = 0.50;
const SWEET_MAX = 0.83;
const CHARGE_FULL_SEC = 1.25;

interface ParticleArcadeQuizProps {
  activeUnit?: ParticleGameUnitId;
  uiLang?: UiLanguage;
  onSelectUnit?: (unit: ParticleGameUnitId) => void;
}

export const ParticleArcadeQuiz = ({
  activeUnit = 'unit1',
  uiLang = 'ko',
  onSelectUnit,
}: ParticleArcadeQuizProps) => {
  const gameUi = (GAMES_UI[uiLang] || GAMES_UI.ko).slingshot;
  const [controlMode, setControlMode] = useState<ControlMode>('arcade');
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [selectedParticle, setSelectedParticle] = useState<ParticleChoice>('은');
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [outcome, setOutcome] = useState<ParticleChoice | null>(null);
  const [missKind, setMissKind] = useState<MissKind | null>(null);
  const [missLandingPos, setMissLandingPos] = useState<{ x: number; y: number } | null>(null);
  const [chargingBtn, setChargingBtn] = useState<ParticleChoice | null>(null);
  const [chargePower, setChargePower] = useState(0);
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number } | null>(null);
  const [animTime, setAnimTime] = useState(0);
  const [impactFlash, setImpactFlash] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [bestComboInUnit, setBestComboInUnit] = useState(0);
  const [firstTryCount, setFirstTryCount] = useState(0);
  const [totalMissesInUnit, setTotalMissesInUnit] = useState(0);
  const totalMissesRef = useRef(0);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [clearBadgeOutcome, setClearBadgeOutcome] = useState<{
    tier: ArcadeBadgeTier;
    newlyUnlockedTrophyMilestone: number | null;
  } | null>(null);

  const [unit6Items, setUnit6Items] = useState<MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[]>(() =>
    buildRandomUnit6Items()
  );

  const currentU1Item = UNIT_1_ITEMS[questionIdx] || UNIT_1_ITEMS[0];
  const currentU2Item = UNIT_2_ITEMS[questionIdx] || UNIT_2_ITEMS[0];
  const currentU3Item = UNIT_3_ITEMS[questionIdx] || UNIT_3_ITEMS[0];
  const currentU4Item = UNIT_4_ITEMS[questionIdx] || UNIT_4_ITEMS[0];
  const currentU5Item = UNIT_5_ITEMS[questionIdx] || UNIT_5_ITEMS[0];
  const currentU6Item = unit6Items[questionIdx] || unit6Items[0];
  const currentU6_2Item = UNIT_6_2_ITEMS[questionIdx] || UNIT_6_2_ITEMS[0];
  const currentU7Item = UNIT_7_ITEMS[questionIdx] || UNIT_7_ITEMS[0];
  const currentU8Item = UNIT_8_ITEMS[questionIdx] || UNIT_8_ITEMS[0];
  const currentU9Item = UNIT_9_ITEMS[questionIdx] || UNIT_9_ITEMS[0];
  const currentU10Item = UNIT_10_ITEMS[questionIdx] || UNIT_10_ITEMS[0];
  const currentU11Item = UNIT_11_ITEMS[questionIdx] || UNIT_11_ITEMS[0];
  const currentU12Item = UNIT_12_ITEMS[questionIdx] || UNIT_12_ITEMS[0];
  const currentU13Item = UNIT_13_ITEMS[questionIdx] || UNIT_13_ITEMS[0];
  const currentU14Item = UNIT_14_ITEMS[questionIdx] || UNIT_14_ITEMS[0];
  const currentU15Item = UNIT_15_ITEMS[questionIdx] || UNIT_15_ITEMS[0];
  const currentU16Item = UNIT_16_ITEMS[questionIdx] || UNIT_16_ITEMS[0];
  const currentU17Item = UNIT_17_ITEMS[questionIdx] || UNIT_17_ITEMS[0];
  const currentU18Item = UNIT_18_ITEMS[questionIdx] || UNIT_18_ITEMS[0];
  const currentU19Item = UNIT_19_ITEMS[questionIdx] || UNIT_19_ITEMS[0];
  const currentU20Item = UNIT_20_ITEMS[questionIdx] || UNIT_20_ITEMS[0];
  const currentU21Item = UNIT_21_ITEMS[questionIdx] || UNIT_21_ITEMS[0];
  const currentS1Item = UNIT_S1_ITEMS[questionIdx] || UNIT_S1_ITEMS[0];
  const currentS2Item = UNIT_S2_ITEMS[questionIdx] || UNIT_S2_ITEMS[0];
  const currentS3Item = UNIT_S3_ITEMS[questionIdx] || UNIT_S3_ITEMS[0];
  const currentS4Item = UNIT_S4_ITEMS[questionIdx] || UNIT_S4_ITEMS[0];
  const currentS5Item = UNIT_S5_ITEMS[questionIdx] || UNIT_S5_ITEMS[0];
  const currentS6Item = UNIT_S6_ITEMS[questionIdx] || UNIT_S6_ITEMS[0];
  const currentS7Item = UNIT_S7_ITEMS[questionIdx] || UNIT_S7_ITEMS[0];
  const currentS8Item = UNIT_S8_ITEMS[questionIdx] || UNIT_S8_ITEMS[0];

  const isSentenceUnit =
    activeUnit === 'sentence1' ||
    activeUnit === 'sentence2' ||
    activeUnit === 'sentence3' ||
    activeUnit === 'sentence4' ||
    activeUnit === 'sentence5' ||
    activeUnit === 'sentence6' ||
    activeUnit === 'sentence7' ||
    activeUnit === 'sentence8';

  const activeButtons =
    activeUnit === 'unit1'
      ? ARCADE_BUTTONS_U1
      : activeUnit === 'unit2'
      ? ARCADE_BUTTONS_U2
      : activeUnit === 'sentence1'
      ? ARCADE_BUTTONS_S1
      : activeUnit === 'unit3'
      ? ARCADE_BUTTONS_U3
      : activeUnit === 'unit4'
      ? ARCADE_BUTTONS_U4
      : activeUnit === 'unit5'
      ? ARCADE_BUTTONS_U5
      : activeUnit === 'sentence2'
      ? ARCADE_BUTTONS_S2
      : activeUnit === 'unit6' || activeUnit === 'unit6_2'
      ? ARCADE_BUTTONS_U6
      : activeUnit === 'unit7'
      ? ARCADE_BUTTONS_U7
      : activeUnit === 'sentence3'
      ? ARCADE_BUTTONS_S3
      : activeUnit === 'unit8'
      ? ARCADE_BUTTONS_U8
      : activeUnit === 'unit9'
      ? ARCADE_BUTTONS_U9
      : activeUnit === 'unit10'
      ? ARCADE_BUTTONS_U10
      : activeUnit === 'sentence4'
      ? ARCADE_BUTTONS_S4
      : activeUnit === 'unit11'
      ? ARCADE_BUTTONS_U11
      : activeUnit === 'unit12'
      ? ARCADE_BUTTONS_U12
      : activeUnit === 'unit13'
      ? ARCADE_BUTTONS_U13
      : activeUnit === 'sentence5'
      ? ARCADE_BUTTONS_S5
      : activeUnit === 'unit14' || activeUnit === 'unit15' || activeUnit === 'unit16'
      ? ARCADE_BUTTONS_U14_TO_16
      : activeUnit === 'sentence6'
      ? ARCADE_BUTTONS_S6
      : activeUnit === 'unit17'
      ? ARCADE_BUTTONS_U17
      : activeUnit === 'unit18'
      ? ARCADE_BUTTONS_U18
      : activeUnit === 'unit19'
      ? ARCADE_BUTTONS_U19
      : activeUnit === 'sentence7'
      ? ARCADE_BUTTONS_S7
      : activeUnit === 'unit20'
      ? ARCADE_BUTTONS_U20
      : activeUnit === 'unit21'
      ? ARCADE_BUTTONS_U21
      : ARCADE_BUTTONS_S8;

  const isEndSlotLayout =
    activeUnit === 'unit2' || (activeUnit === 'sentence1' && !currentS1Item.predicate);
  const activeTargetX = isEndSlotLayout ? TARGET_X_U2 : TARGET_X_STD;
  const totalQuestions =
    activeUnit === 'unit1'
      ? UNIT_1_ITEMS.length
      : activeUnit === 'unit2'
      ? UNIT_2_ITEMS.length
      : activeUnit === 'sentence1'
      ? UNIT_S1_ITEMS.length
      : activeUnit === 'unit3'
      ? UNIT_3_ITEMS.length
      : activeUnit === 'unit4'
      ? UNIT_4_ITEMS.length
      : activeUnit === 'unit5'
      ? UNIT_5_ITEMS.length
      : activeUnit === 'sentence2'
      ? UNIT_S2_ITEMS.length
      : activeUnit === 'unit6'
      ? unit6Items.length
      : activeUnit === 'unit6_2'
      ? UNIT_6_2_ITEMS.length
      : activeUnit === 'unit7'
      ? UNIT_7_ITEMS.length
      : activeUnit === 'sentence3'
      ? UNIT_S3_ITEMS.length
      : activeUnit === 'unit8'
      ? UNIT_8_ITEMS.length
      : activeUnit === 'unit9'
      ? UNIT_9_ITEMS.length
      : activeUnit === 'unit10'
      ? UNIT_10_ITEMS.length
      : activeUnit === 'sentence4'
      ? UNIT_S4_ITEMS.length
      : activeUnit === 'unit11'
      ? UNIT_11_ITEMS.length
      : activeUnit === 'unit12'
      ? UNIT_12_ITEMS.length
      : activeUnit === 'unit13'
      ? UNIT_13_ITEMS.length
      : activeUnit === 'sentence5'
      ? UNIT_S5_ITEMS.length
      : activeUnit === 'unit14'
      ? UNIT_14_ITEMS.length
      : activeUnit === 'unit15'
      ? UNIT_15_ITEMS.length
      : activeUnit === 'unit16'
      ? UNIT_16_ITEMS.length
      : activeUnit === 'sentence6'
      ? UNIT_S6_ITEMS.length
      : activeUnit === 'unit17'
      ? UNIT_17_ITEMS.length
      : activeUnit === 'unit18'
      ? UNIT_18_ITEMS.length
      : activeUnit === 'unit19'
      ? UNIT_19_ITEMS.length
      : activeUnit === 'sentence7'
      ? UNIT_S7_ITEMS.length
      : activeUnit === 'unit20'
      ? UNIT_20_ITEMS.length
      : activeUnit === 'unit21'
      ? UNIT_21_ITEMS.length
      : UNIT_S8_ITEMS.length;

  const defaultChoiceForUnit = (u: ParticleGameUnitId): ParticleChoice => {
    switch (u) {
      case 'unit1':
      case 'sentence1':
        return '은';
      case 'unit2':
        return '이에요';
      case 'unit3':
      case 'unit4':
      case 'sentence2':
        return '이';
      case 'unit5':
        return '을';
      case 'unit6':
      case 'unit6_2':
      case 'sentence3':
        return '에';
      case 'unit7':
        return '도';
      case 'unit8':
        return '와';
      case 'sentence4':
        return '과';
      case 'unit9':
        return '으로';
      case 'unit10':
        return '에게';
      case 'unit11':
      case 'sentence5':
        return '부터';
      case 'unit12':
        return '이나';
      case 'unit13':
        return '마다';
      case 'unit14':
      case 'unit15':
      case 'unit16':
      case 'sentence6':
        return '만';
      case 'unit17':
      case 'unit18':
        return '처럼';
      case 'unit19':
        return '끼리';
      case 'sentence7':
        return '의';
      case 'unit20':
      case 'sentence8':
        return '께서';
      case 'unit21':
        return '아';
    }
  };

  const nextUnitForUnit = (u: ParticleGameUnitId): ParticleGameUnitId | null => {
    switch (u) {
      case 'unit1':
        return 'unit2';
      case 'unit2':
        return 'sentence1';
      case 'sentence1':
        return 'unit3';
      case 'unit3':
        return 'unit4';
      case 'unit4':
        return 'unit5';
      case 'unit5':
        return 'sentence2';
      case 'sentence2':
        return 'unit6';
      case 'unit6':
        return 'unit6_2';
      case 'unit6_2':
        return 'unit7';
      case 'unit7':
        return 'sentence3';
      case 'sentence3':
        return 'unit8';
      case 'unit8':
        return 'unit9';
      case 'unit9':
        return 'unit10';
      case 'unit10':
        return 'sentence4';
      case 'sentence4':
        return 'unit11';
      case 'unit11':
        return 'unit12';
      case 'unit12':
        return 'unit13';
      case 'unit13':
        return 'sentence5';
      case 'sentence5':
        return 'unit14';
      case 'unit14':
        return 'unit15';
      case 'unit15':
        return 'unit16';
      case 'unit16':
        return 'sentence6';
      case 'sentence6':
        return 'unit17';
      case 'unit17':
        return 'unit18';
      case 'unit18':
        return 'unit19';
      case 'unit19':
        return 'sentence7';
      case 'sentence7':
        return 'unit20';
      case 'unit20':
        return 'unit21';
      case 'unit21':
        return 'sentence8';
      case 'sentence8':
        return null;
    }
  };

  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [stageViewHeight, setStageViewHeight] = useState<number>(390);

  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;
    const updateViewHeight = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const desired = Math.round(VIEW_WIDTH * (rect.height / rect.width));
        const clamped = Math.max(MIN_VIEW_HEIGHT, Math.min(MAX_VIEW_HEIGHT, desired));
        setStageViewHeight((prev) => (Math.abs(prev - clamped) >= 2 ? clamped : prev));
      }
    };
    updateViewHeight();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateViewHeight);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', updateViewHeight);
    return () => window.removeEventListener('resize', updateViewHeight);
  }, []);

  const viewMinY = VIEW_BOTTOM - stageViewHeight;
  const boardDropOffset = Math.round(Math.max(0, stageViewHeight - 280) * 0.27);
  const boardY = Math.min(134, viewMinY + 74 + boardDropOffset);
  const targetY = boardY - 14;
  const viewMinYRef = useRef(viewMinY);
  viewMinYRef.current = viewMinY;
  const stageViewHeightRef = useRef(stageViewHeight);
  stageViewHeightRef.current = stageViewHeight;
  const targetYRef = useRef(targetY);
  targetYRef.current = targetY;

  const autoAdvanceTimerRef = useRef<number | null>(null);
  const speechTimerRef = useRef<number | null>(null);
  const clearSpeechQueue = useCallback(() => {
    if (speechTimerRef.current !== null) {
      window.clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    cancelSpeech();
  }, []);
  const clearAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimerRef.current !== null) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (speechTimerRef.current !== null) {
      window.clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
  }, []);

  const chargeRef = useRef<{ active: ParticleChoice | null; startTime: number; power: number }>({
    active: null,
    startTime: 0,
    power: 0,
  });
  const flightRef = useRef({
    x: SLING_X,
    y: SLING_Y,
    vx: 0,
    vy: 0,
    particle: defaultChoiceForUnit(activeUnit),
    intendedMiss: null as MissKind | null,
    startTime: 0,
    impactTime: 0,
    resolved: false,
  });
  const phaseRef = useRef<GamePhase>(phase);
  phaseRef.current = phase;
  const controlModeRef = useRef<ControlMode>(controlMode);
  controlModeRef.current = controlMode;
  const hadMistakeThisQuestionRef = useRef(false);
  const hasRecordedResultRef = useRef(false);
  const unitRef = useRef<ParticleGameUnitId>(activeUnit);
  unitRef.current = activeUnit;
  const questionIdxRef = useRef(questionIdx);
  questionIdxRef.current = questionIdx;
  const totalQuestionsRef = useRef(totalQuestions);
  totalQuestionsRef.current = totalQuestions;
  const onSelectUnitRef = useRef(onSelectUnit);
  onSelectUnitRef.current = onSelectUnit;

  const u1ItemRef = useRef(currentU1Item);
  u1ItemRef.current = currentU1Item;
  const u2ItemRef = useRef(currentU2Item);
  u2ItemRef.current = currentU2Item;
  const u3ItemRef = useRef(currentU3Item);
  u3ItemRef.current = currentU3Item;
  const u4ItemRef = useRef(currentU4Item);
  u4ItemRef.current = currentU4Item;
  const u5ItemRef = useRef(currentU5Item);
  u5ItemRef.current = currentU5Item;
  const u6ItemRef = useRef(currentU6Item);
  u6ItemRef.current = currentU6Item;
  const u6_2ItemRef = useRef(currentU6_2Item);
  u6_2ItemRef.current = currentU6_2Item;
  const u7ItemRef = useRef(currentU7Item);
  u7ItemRef.current = currentU7Item;
  const u8ItemRef = useRef(currentU8Item);
  u8ItemRef.current = currentU8Item;
  const u9ItemRef = useRef(currentU9Item);
  u9ItemRef.current = currentU9Item;
  const u10ItemRef = useRef(currentU10Item);
  u10ItemRef.current = currentU10Item;
  const u11ItemRef = useRef(currentU11Item);
  u11ItemRef.current = currentU11Item;
  const u12ItemRef = useRef(currentU12Item);
  u12ItemRef.current = currentU12Item;
  const u13ItemRef = useRef(currentU13Item);
  u13ItemRef.current = currentU13Item;
  const u14ItemRef = useRef(currentU14Item);
  u14ItemRef.current = currentU14Item;
  const u15ItemRef = useRef(currentU15Item);
  u15ItemRef.current = currentU15Item;
  const u16ItemRef = useRef(currentU16Item);
  u16ItemRef.current = currentU16Item;
  const u17ItemRef = useRef(currentU17Item);
  u17ItemRef.current = currentU17Item;
  const u18ItemRef = useRef(currentU18Item);
  u18ItemRef.current = currentU18Item;
  const u19ItemRef = useRef(currentU19Item);
  u19ItemRef.current = currentU19Item;
  const u20ItemRef = useRef(currentU20Item);
  u20ItemRef.current = currentU20Item;
  const u21ItemRef = useRef(currentU21Item);
  u21ItemRef.current = currentU21Item;
  const s1ItemRef = useRef(currentS1Item);
  s1ItemRef.current = currentS1Item;
  const s2ItemRef = useRef(currentS2Item);
  s2ItemRef.current = currentS2Item;
  const s3ItemRef = useRef(currentS3Item);
  s3ItemRef.current = currentS3Item;
  const s4ItemRef = useRef(currentS4Item);
  s4ItemRef.current = currentS4Item;
  const s5ItemRef = useRef(currentS5Item);
  s5ItemRef.current = currentS5Item;
  const s6ItemRef = useRef(currentS6Item);
  s6ItemRef.current = currentS6Item;
  const s7ItemRef = useRef(currentS7Item);
  s7ItemRef.current = currentS7Item;
  const s8ItemRef = useRef(currentS8Item);
  s8ItemRef.current = currentS8Item;
  const activeButtonsRef = useRef(activeButtons);
  activeButtonsRef.current = activeButtons;
  const activeTargetXRef = useRef(activeTargetX);
  activeTargetXRef.current = activeTargetX;

  useEffect(() => {
    clearAutoAdvanceTimer();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    if (activeUnit === 'unit6') {
      setUnit6Items(buildRandomUnit6Items());
    }
    setQuestionIdx(0);
    setSelectedParticle(defaultChoiceForUnit(activeUnit));
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setComboStreak(0);
    setBestComboInUnit(0);
    setFirstTryCount(0);
    setTotalMissesInUnit(0);
    totalMissesRef.current = 0;
    setClearBadgeOutcome(null);
    hadMistakeThisQuestionRef.current = false;
    hasRecordedResultRef.current = false;
    setPhase('ready');
    phaseRef.current = 'ready';
    cancelSpeech();
    return () => clearAutoAdvanceTimer();
  }, [activeUnit, clearAutoAdvanceTimer]);

  const handleReplayUnit = useCallback(() => {
    clearAutoAdvanceTimer();
    clearSpeechQueue();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    if (unitRef.current === 'unit6') {
      setUnit6Items(buildRandomUnit6Items());
    }
    setQuestionIdx(0);
    setSelectedParticle(defaultChoiceForUnit(unitRef.current));
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setComboStreak(0);
    setBestComboInUnit(0);
    setFirstTryCount(0);
    setTotalMissesInUnit(0);
    totalMissesRef.current = 0;
    setClearBadgeOutcome(null);
    hadMistakeThisQuestionRef.current = false;
    hasRecordedResultRef.current = false;
    setPhase('ready');
    phaseRef.current = 'ready';
  }, [clearAutoAdvanceTimer, clearSpeechQueue]);

  const advanceToNext = useCallback(() => {
    const curIdx = questionIdxRef.current;
    const total = totalQuestionsRef.current;
    const u = unitRef.current;
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    setDragOffset(null);
    if (curIdx < total - 1) {
      hadMistakeThisQuestionRef.current = false;
      hasRecordedResultRef.current = false;
      setQuestionIdx(curIdx + 1);
      setSelectedParticle(defaultChoiceForUnit(u));
      setOutcome(null);
      setMissKind(null);
      setMissLandingPos(null);
      setChargePower(0);
      setPhase('ready');
      phaseRef.current = 'ready';
    } else {
      const outcomeBadge = recordSlingshotBadgeClear(u, totalMissesRef.current);
      setClearBadgeOutcome({
        tier: outcomeBadge.tier,
        newlyUnlockedTrophyMilestone: outcomeBadge.newlyUnlockedTrophyMilestone,
      });
      setPhase('cleared');
      phaseRef.current = 'cleared';
      playApplauseFanfare();
    }
  }, []);

  const scheduleAutoAdvance = useCallback(
    (delayMs = 900) => {
      clearAutoAdvanceTimer();
      autoAdvanceTimerRef.current = window.setTimeout(() => {
        autoAdvanceTimerRef.current = null;
        advanceToNext();
      }, delayMs);
    },
    [advanceToNext, clearAutoAdvanceTimer]
  );

  const playQueuedSpeech = useCallback(
    (text: string, isCorrect: boolean, autoAdvanceAfter = false) => {
      clearSpeechQueue();
      const spoken = isCorrect ? text : formatCleanWrongSpeech(text);
      const minAdvanceAt = performance.now() + 680;
      speechTimerRef.current = window.setTimeout(() => {
        speechTimerRef.current = null;
        speakKorean(spoken, 1.0, 1.0, () => {
          if (!autoAdvanceAfter) return;
          const remaining = Math.max(150, minAdvanceAt - performance.now());
          scheduleAutoAdvance(remaining);
        });
      }, isCorrect ? 80 : 90);
      if (autoAdvanceAfter) {
        // Fallback if speechSynthesis onend does not fire cleanly
        scheduleAutoAdvance(1650);
      }
    },
    [clearSpeechQueue, scheduleAutoAdvance]
  );

  const recordCorrectHit = useCallback(() => {
    if (hasRecordedResultRef.current) return;
    hasRecordedResultRef.current = true;
    if (!hadMistakeThisQuestionRef.current) {
      setFirstTryCount((c) => c + 1);
      setComboStreak((prev) => {
        const next = prev + 1;
        setBestComboInUnit((best) => Math.max(best, next));
        return next;
      });
    }
  }, []);

  const recordMistake = useCallback(() => {
    hadMistakeThisQuestionRef.current = true;
    totalMissesRef.current += 1;
    setTotalMissesInUnit((m) => m + 1);
    setComboStreak(0);
  }, []);

  const triggerImpact = useCallback(
    (choice: ParticleChoice) => {
      clearAutoAdvanceTimer();
      setOutcome(choice);
      setMissKind(null);
      setPhase('impact');
      phaseRef.current = 'impact';
      setImpactFlash(1);
      flightRef.current.impactTime = performance.now();

      const u = unitRef.current;
      if (u === 'unit1') {
        const item = u1ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '을') {
          recordMistake();
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.particleWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit2') {
        const item = u2ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '고') {
          recordMistake();
          playGoPunSfx();
          playQueuedSpeech('받침을 보고 알맞은 말을 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.grammarWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit3') {
        const item = u3ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '을') {
          recordMistake();
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.subjectWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit4') {
        const item = u4ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
            transformedWord: item.transformedWord,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '을') {
          recordMistake();
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.subjectWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit5') {
        const item = u5ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
          });
          playQueuedSpeech(sentence, true, true);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.wrongSpeech, false);
        }
        return;
      }

      const multiItem =
        u === 'unit6'
          ? u6ItemRef.current
          : u === 'unit6_2'
          ? u6_2ItemRef.current
          : u === 'unit7'
          ? u7ItemRef.current
          : u === 'unit8'
          ? u8ItemRef.current
          : u === 'unit9'
          ? u9ItemRef.current
          : u === 'unit10'
          ? u10ItemRef.current
          : u === 'unit11'
          ? u11ItemRef.current
          : u === 'unit12'
          ? u12ItemRef.current
          : u === 'unit13'
          ? u13ItemRef.current
          : u === 'unit14'
          ? u14ItemRef.current
          : u === 'unit15'
          ? u15ItemRef.current
          : u === 'unit16'
          ? u16ItemRef.current
          : u === 'unit17'
          ? u17ItemRef.current
          : u === 'unit18'
          ? u18ItemRef.current
          : u === 'unit19'
          ? u19ItemRef.current
          : u === 'unit20'
          ? u20ItemRef.current
          : u === 'unit21'
          ? u21ItemRef.current
          : u === 'sentence1'
          ? s1ItemRef.current
          : u === 'sentence2'
          ? s2ItemRef.current
          : u === 'sentence3'
          ? s3ItemRef.current
          : u === 'sentence4'
          ? s4ItemRef.current
          : u === 'sentence5'
          ? s5ItemRef.current
          : u === 'sentence6'
          ? s6ItemRef.current
          : u === 'sentence7'
          ? s7ItemRef.current
          : s8ItemRef.current;
      if ((multiItem.correctList as ParticleChoice[]).includes(choice)) {
        recordCorrectHit();
        playJackpotSfx();
        const sentence = buildDirectSentenceSpeech({
          prefix: multiItem.prefix,
          noun: multiItem.noun,
          choice,
          predicate: multiItem.predicate,
          transformedWord: multiItem.transformedWord,
        });
        playQueuedSpeech(sentence, true, true);
      } else {
        recordMistake();
        const fb = multiItem.wrongFeedback[choice];
        if (fb?.isSpaceGag) {
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          playBounceSfx();
          playQueuedSpeech(fb?.wrongSpeech || '다시 생각해 봐요.', false);
        }
      }
    },
    [clearAutoAdvanceTimer, playQueuedSpeech, recordCorrectHit, recordMistake]
  );

  const triggerMiss = useCallback(
    (kind: MissKind, x: number, y: number) => {
      clearAutoAdvanceTimer();
      clearSpeechQueue();
      recordMistake();
      setOutcome(null);
      setMissKind(kind);
      setMissLandingPos({ x, y });
      setPhase('missed');
      phaseRef.current = 'missed';

      playMissSfx(kind);
    },
    [clearAutoAdvanceTimer, clearSpeechQueue, recordMistake]
  );

  const launchFromCharge = useCallback((choice: ParticleChoice, power: number) => {
    const f = flightRef.current;
    f.particle = choice;
    f.x = SLING_X;
    f.y = SLING_Y;
    f.resolved = false;

    if (power < SWEET_MIN) {
      const ratio = Math.max(0.18, power / SWEET_MIN);
      f.intendedMiss = 'short';
      f.vx = 110 + ratio * 155;
      f.vy = -120 - ratio * 165;
    } else if (power <= SWEET_MAX) {
      const T = 0.56;
      f.intendedMiss = null;
      f.vx = (activeTargetXRef.current - SLING_X) / T;
      f.vy = (targetYRef.current - SLING_Y - 0.5 * GRAVITY * T * T) / T;
    } else {
      const over = (power - SWEET_MAX) / (1 - SWEET_MAX);
      const sweetT = 0.56;
      const sweetVy = (targetYRef.current - SLING_Y - 0.5 * GRAVITY * sweetT * sweetT) / sweetT;
      f.intendedMiss = 'over';
      f.vx = 520 + over * 240;
      f.vy = Math.min(-1080, sweetVy - 380) - over * 380;
    }

    f.startTime = performance.now();
    setSelectedParticle(choice);
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setPhase('flying');
    phaseRef.current = 'flying';
    playLaunchSfx();
  }, []);

  const launchManualSlingshot = useCallback((choice: ParticleChoice, vx: number, vy: number) => {
    const f = flightRef.current;
    f.particle = choice;
    f.x = SLING_X;
    f.y = SLING_Y;
    f.vx = vx;
    f.vy = vy;
    f.intendedMiss = null;
    f.resolved = false;
    f.startTime = performance.now();

    setSelectedParticle(choice);
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setPhase('flying');
    phaseRef.current = 'flying';
    playLaunchSfx();
  }, []);

  const startChargingButton = useCallback(
    (btn: ArcadeButtonConfig) => {
      if (phaseRef.current === 'cleared') return;
      if (controlModeRef.current === 'easy') {
        clearAutoAdvanceTimer();
        clearSpeechQueue();
        playButtonSfx(btn.idx);
        chargeRef.current = { active: null, startTime: 0, power: 0.667 };
        setChargingBtn(null);
        setChargePower(0.667);
        launchFromCharge(btn.particle, 0.667);
        return;
      }
      if (chargeRef.current.active === btn.particle) return;
      clearAutoAdvanceTimer();
      clearSpeechQueue();
      playButtonSfx(btn.idx);
      chargeRef.current = { active: btn.particle, startTime: performance.now(), power: 0.04 };
      setSelectedParticle(btn.particle);
      setOutcome(null);
      setMissKind(null);
      setMissLandingPos(null);
      setPhase('ready');
      phaseRef.current = 'ready';
      setChargingBtn(btn.particle);
      setChargePower(0.04);
    },
    [clearAutoAdvanceTimer, clearSpeechQueue, launchFromCharge]
  );

  const releaseChargingButton = useCallback(
    (particle?: ParticleChoice) => {
      const active = chargeRef.current.active;
      if (!active) return;
      if (particle && active !== particle) return;
      const finalPower = chargeRef.current.power;
      chargeRef.current.active = null;
      setChargingBtn(null);
      setChargePower(finalPower);
      launchFromCharge(active, finalPower);
    },
    [launchFromCharge]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const found = activeButtonsRef.current.find((b) => b.keyHint === e.key);
      if (found) startChargingButton(found);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const found = activeButtonsRef.current.find((b) => b.keyHint === e.key);
      if (found) releaseChargingButton(found.particle);
    };
    const onGlobalPointerUp = () => {
      if (chargeRef.current.active) releaseChargingButton();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('pointerup', onGlobalPointerUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('pointerup', onGlobalPointerUp);
    };
  }, [startChargingButton, releaseChargingButton]);

  useEffect(() => {
    let rafId: number;
    let lastNow = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - lastNow) / 1000, 0.04);
      lastNow = now;
      setAnimTime((t) => t + dt);
      setImpactFlash((f) => Math.max(0, f - dt * 2.4));

      if (chargeRef.current.active) {
        const elapsed = (now - chargeRef.current.startTime) / 1000;
        const p = Math.min(1, 0.04 + elapsed / CHARGE_FULL_SEC);
        chargeRef.current.power = p;
        setChargePower(p);
      }

      if (phaseRef.current === 'flying') {
        const f = flightRef.current;
        const t = (now - f.startTime) / 1000;
        const nx = SLING_X + f.vx * t;
        const ny = SLING_Y + f.vy * t + 0.5 * GRAVITY * t * t;
        f.x = nx;
        f.y = ny;

        if (!f.resolved) {
          if (f.intendedMiss === 'short') {
            if (ny >= 336) {
              f.resolved = true;
              triggerMiss('short', Math.min(nx, 440), 336);
            }
          } else if (f.intendedMiss === 'over') {
            const topOutY = viewMinYRef.current - 45;
            if (ny < topOutY || nx > 1010) {
              f.resolved = true;
              triggerMiss('over', Math.min(910, Math.max(240, nx)), viewMinYRef.current + 36);
            }
          } else {
            const targetX = activeTargetXRef.current;
            const liveTargetY = targetYRef.current;
            const topOutY = viewMinYRef.current - 55;
            const dist = Math.hypot(nx - targetX, ny - liveTargetY);
            if (dist < 68 || (nx >= targetX - 28 && ny <= liveTargetY + 62 && ny >= liveTargetY - 68)) {
              f.resolved = true;
              triggerImpact(f.particle);
            } else if (ny >= 344) {
              f.resolved = true;
              triggerMiss('short', Math.min(nx, 880), 336);
            } else if (ny < topOutY || nx > 1020) {
              f.resolved = true;
              triggerMiss('over', Math.min(910, Math.max(240, nx)), viewMinYRef.current + 36);
            }
          }
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [triggerImpact, triggerMiss]);

  const getSvgCoords = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: SLING_X, y: SLING_Y };
    const ctm = svg.getScreenCTM();
    if (ctm) {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const mapped = pt.matrixTransform(ctm.inverse());
      return { x: mapped.x, y: mapped.y };
    }
    const rect = svg.getBoundingClientRect();
    return {
      x: 20 + ((clientX - rect.left) / rect.width) * VIEW_WIDTH,
      y: viewMinYRef.current + ((clientY - rect.top) / rect.height) * stageViewHeightRef.current,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (phase === 'flying' || phase === 'cleared') return;
    const pt = getSvgCoords(e.clientX, e.clientY);
    if (pt.x < 340 && pt.y > 125) {
      clearAutoAdvanceTimer();
      e.currentTarget.setPointerCapture(e.pointerId);
      setOutcome(null);
      setMissKind(null);
      setMissLandingPos(null);
      setPhase('ready');
      phaseRef.current = 'ready';
      setDragOffset({
        dx: Math.max(-120, Math.min(40, pt.x - SLING_X)),
        dy: Math.max(-45, Math.min(100, pt.y - SLING_Y)),
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragOffset) return;
    const pt = getSvgCoords(e.clientX, e.clientY);
    setDragOffset({
      dx: Math.max(-125, Math.min(30, pt.x - SLING_X)),
      dy: Math.max(-45, Math.min(105, pt.y - SLING_Y)),
    });
  };

  const handlePointerUp = () => {
    if (!dragOffset) return;
    const dragScaleY = stageViewHeightRef.current > 460 ? 10.6 * (stageViewHeightRef.current / 420) : 10.6;
    const powerX = -dragOffset.dx * 9.8;
    const powerY = -dragOffset.dy * dragScaleY;
    if (Math.hypot(dragOffset.dx, dragOffset.dy) > 22 && powerX > 120) {
      launchManualSlingshot(selectedParticle, powerX, powerY);
    } else {
      setDragOffset(null);
    }
  };

  const handleReset = () => {
    clearAutoAdvanceTimer();
    clearSpeechQueue();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setPhase('ready');
    phaseRef.current = 'ready';
  };

  const handleGoQuestion = (nextIdx: number) => {
    clearAutoAdvanceTimer();
    clearSpeechQueue();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    hadMistakeThisQuestionRef.current = false;
    hasRecordedResultRef.current = false;
    setQuestionIdx(nextIdx);
    setSelectedParticle(defaultChoiceForUnit(activeUnit));
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setPhase('ready');
    phaseRef.current = 'ready';
  };

  const impactAge = phase === 'impact' ? Math.max(0, (performance.now() - flightRef.current.impactTime) / 1000) : 0;
  const activeBtnMeta = activeButtons.find((b) => b.particle === (outcome || selectedParticle)) || activeButtons[0];
  const flyingBtnMeta = activeButtons.find((b) => b.particle === flightRef.current.particle) || activeBtnMeta;

  const isU1Correct = activeUnit === 'unit1' && outcome === currentU1Item.correct;
  const isU1ParticleWrong = activeUnit === 'unit1' && outcome === currentU1Item.wrongParticleChoice;
  const isU1EulWrong = activeUnit === 'unit1' && outcome === '을';

  const isU2Correct = activeUnit === 'unit2' && outcome === currentU2Item.correct;
  const isU2GrammarWrong = activeUnit === 'unit2' && outcome === currentU2Item.wrongGrammarChoice;
  const isU2GoGag = activeUnit === 'unit2' && outcome === '고';

  const isU3Correct = activeUnit === 'unit3' && outcome === currentU3Item.correct;
  const isU3SubjectWrong = activeUnit === 'unit3' && outcome === currentU3Item.wrongSubjectChoice;
  const isU3EulWrong = activeUnit === 'unit3' && outcome === '을';

  const isU4Correct = activeUnit === 'unit4' && outcome === currentU4Item.correct;
  const isU4SubjectWrong = activeUnit === 'unit4' && outcome === currentU4Item.wrongSubjectChoice;
  const isU4EulWrong = activeUnit === 'unit4' && outcome === '을';

  const isU5Correct = activeUnit === 'unit5' && outcome === currentU5Item.correct;
  const isU5Wrong = activeUnit === 'unit5' && outcome === currentU5Item.wrongChoice;

  const isMultiUnit =
    activeUnit === 'unit6' ||
    activeUnit === 'unit6_2' ||
    activeUnit === 'unit7' ||
    activeUnit === 'unit8' ||
    activeUnit === 'unit9' ||
    activeUnit === 'unit10' ||
    activeUnit === 'unit11' ||
    activeUnit === 'unit12' ||
    activeUnit === 'unit13' ||
    activeUnit === 'unit14' ||
    activeUnit === 'unit15' ||
    activeUnit === 'unit16' ||
    activeUnit === 'unit17' ||
    activeUnit === 'unit18' ||
    activeUnit === 'unit19' ||
    activeUnit === 'unit20' ||
    activeUnit === 'unit21' ||
    isSentenceUnit;
  const currentMultiItem =
    activeUnit === 'unit6'
      ? currentU6Item
      : activeUnit === 'unit6_2'
      ? currentU6_2Item
      : activeUnit === 'unit7'
      ? currentU7Item
      : activeUnit === 'unit8'
      ? currentU8Item
      : activeUnit === 'unit9'
      ? currentU9Item
      : activeUnit === 'unit10'
      ? currentU10Item
      : activeUnit === 'unit11'
      ? currentU11Item
      : activeUnit === 'unit12'
      ? currentU12Item
      : activeUnit === 'unit13'
      ? currentU13Item
      : activeUnit === 'unit14'
      ? currentU14Item
      : activeUnit === 'unit15'
      ? currentU15Item
      : activeUnit === 'unit16'
      ? currentU16Item
      : activeUnit === 'unit17'
      ? currentU17Item
      : activeUnit === 'unit18'
      ? currentU18Item
      : activeUnit === 'unit19'
      ? currentU19Item
      : activeUnit === 'unit20'
      ? currentU20Item
      : activeUnit === 'unit21'
      ? currentU21Item
      : activeUnit === 'sentence1'
      ? currentS1Item
      : activeUnit === 'sentence2'
      ? currentS2Item
      : activeUnit === 'sentence3'
      ? currentS3Item
      : activeUnit === 'sentence4'
      ? currentS4Item
      : activeUnit === 'sentence5'
      ? currentS5Item
      : activeUnit === 'sentence6'
      ? currentS6Item
      : activeUnit === 'sentence7'
      ? currentS7Item
      : currentS8Item;
  const isMultiCorrect = isMultiUnit && outcome !== null && (currentMultiItem.correctList as ParticleChoice[]).includes(outcome);
  const multiWrongFeedback =
    isMultiUnit && outcome && !(currentMultiItem.correctList as ParticleChoice[]).includes(outcome)
      ? currentMultiItem.wrongFeedback[outcome]
      : undefined;
  const isMultiSpaceGag = Boolean(multiWrongFeedback?.isSpaceGag);
  const isMultiRicochet = Boolean(multiWrongFeedback && !multiWrongFeedback.isSpaceGag);

  const isAnyCorrect = isU1Correct || isU2Correct || isU3Correct || isU4Correct || isU5Correct || isMultiCorrect;
  const isAnySpaceGag = isU1EulWrong || isU3EulWrong || isU4EulWrong || isU2GoGag || isMultiSpaceGag;
  const isAnyRicochet =
    isU1ParticleWrong || isU2GrammarWrong || isU3SubjectWrong || isU4SubjectWrong || isU5Wrong || isMultiRicochet;

  const isLastQuestion = questionIdx === totalQuestions - 1;
  const isUnitAllClear = isAnyCorrect && isLastQuestion;

  let jollaFace: FaceMode = 'happy';
  let jollaX = 105;
  let jollaY = 302;
  const jollaRot = 0;

  if (phase === 'impact') {
    if (isAnyCorrect) {
      jollaFace = 'happy';
      jollaY = 302 - Math.abs(Math.sin(animTime * 9)) * 18;
    } else if (isAnyRicochet) {
      jollaFace = 'dizzy';
      jollaX = 105 + Math.sin(animTime * 24) * 5;
    } else if (isAnySpaceGag) {
      jollaFace = 'panic';
      jollaX = 105 + Math.min(impactAge * 130, 110);
    }
  } else if (phase === 'missed') {
    jollaFace = missKind === 'short' ? 'headClutch' : 'panic';
  }

  let mascotX = 760;
  let mascotY = 266;
  let mascotRot = 0;

  if (phase === 'impact') {
    if (isAnyCorrect) {
      mascotY = 252 + Math.sin(animTime * 5) * 8;
    } else if (isAnyRicochet) {
      mascotX = 760 + Math.sin(animTime * 35) * 4;
    } else if (isU1EulWrong || isU3EulWrong || isU4EulWrong || isMultiSpaceGag) {
      const flyT = Math.min(impactAge / 1.1, 1);
      mascotX = 760 + flyT * 260;
      mascotY = 266 - flyT * 320;
      mascotRot = flyT * 960;
    } else if (isU2GoGag) {
      if (currentU2Item.id === 'yeonpil') {
        const flyT = Math.min(impactAge / 0.95, 1);
        mascotX = 760 + flyT * 210;
        mascotY = 266 - flyT * 330;
        mascotRot = 35;
      } else {
        mascotX = 760 + impactAge * 260;
        mascotY = 264 - Math.abs(Math.sin(animTime * 20)) * 12;
      }
    }
  }

  const shouldRicochet = phase === 'impact' && isAnyRicochet;
  const bounceAge = shouldRicochet ? Math.min(impactAge / 0.55, 1) : 0;
  const ricochetX = shouldRicochet ? activeTargetX + (jollaX + 10 - activeTargetX) * bounceAge : 0;
  const ricochetY = shouldRicochet
    ? targetY + (jollaY - 35 - targetY) * bounceAge - Math.sin(bounceAge * Math.PI) * 95
    : 0;

  const dragScaleY = stageViewHeight > 460 ? 10.6 * (stageViewHeight / 420) : 10.6;
  const effectivePull = dragOffset ? dragOffset : chargingBtn ? { dx: -chargePower * 96, dy: chargePower * 34 } : null;
  const aimDots = dragOffset
    ? Array.from({ length: 10 }).map((_, idx) => {
        const dt = (idx + 1) * 0.055;
        return {
          x: SLING_X + -dragOffset.dx * 9.8 * dt,
          y: SLING_Y + -dragOffset.dy * dragScaleY * dt + 0.5 * GRAVITY * dt * dt,
        };
      })
    : [];

  const currentNounLabel =
    activeUnit === 'unit1'
      ? currentU1Item.noun
      : activeUnit === 'unit2'
      ? currentU2Item.noun
      : activeUnit === 'unit3'
      ? currentU3Item.noun
      : activeUnit === 'unit4'
      ? currentU4Item.noun
      : activeUnit === 'unit5'
      ? currentU5Item.noun
      : currentMultiItem.noun;

  const textForBgHex = (bgHex: string) =>
    ['#F2FCF7', '#ECFDF5', '#E6FFFA', '#D1FAE5', '#DCFCE7', '#FACC15', '#FFFBEB', '#F3E8FF', '#FFE4E6', '#E0F2FE', '#FFF4F7', '#FAF5FF', '#F0F9FF'].includes(bgHex)
      ? '#1E293B'
      : '#FFFFFF';
  const currentBallColor = activeBtnMeta.accentHex || textForBgHex(activeBtnMeta.bgHex);
  const flyingBallColor = flyingBtnMeta.accentHex || textForBgHex(flyingBtnMeta.bgHex);
  const ricochetMeta = activeButtons.find((b) => b.particle === outcome) || activeBtnMeta;
  const ricochetBg = ricochetMeta.bgHex;
  const ricochetColor = ricochetMeta.accentHex || textForBgHex(ricochetBg);

  const stdItem =
    activeUnit === 'unit1'
      ? {
          prefix: currentU1Item.prefix,
          noun: currentU1Item.noun,
          predicate: currentU1Item.predicate,
          isCorrect: isU1Correct,
          isRedPredicate: Boolean(currentU1Item.isRedPredicate),
          transformedHead: undefined,
          transformedTail: undefined,
        }
      : activeUnit === 'unit3'
      ? {
          prefix: currentU3Item.prefix,
          noun: currentU3Item.noun,
          predicate: currentU3Item.predicate,
          isCorrect: isU3Correct,
          isRedPredicate: Boolean(currentU3Item.isRedPredicate),
          transformedHead: undefined,
          transformedTail: undefined,
        }
      : activeUnit === 'unit4'
      ? {
          prefix: currentU4Item.prefix,
          noun: currentU4Item.noun,
          predicate: currentU4Item.predicate,
          isCorrect: isU4Correct,
          isRedPredicate: Boolean(currentU4Item.isRedPredicate),
          transformedHead: isU4Correct ? currentU4Item.transformedHead : undefined,
          transformedTail: isU4Correct ? currentU4Item.transformedTail : undefined,
        }
      : activeUnit === 'unit5'
      ? {
          prefix: currentU5Item.prefix,
          noun: currentU5Item.noun,
          predicate: currentU5Item.predicate,
          isCorrect: isU5Correct,
          isRedPredicate: Boolean(currentU5Item.isRedPredicate),
          transformedHead: undefined,
          transformedTail: undefined,
        }
      : {
          prefix: currentMultiItem.prefix,
          noun: currentMultiItem.noun,
          predicate: currentMultiItem.predicate,
          isCorrect: isMultiCorrect,
          isRedPredicate: Boolean(currentMultiItem.isRedPredicate),
          transformedHead: isMultiCorrect ? currentMultiItem.transformedHead : undefined,
          transformedTail: isMultiCorrect ? currentMultiItem.transformedTail : undefined,
        };

  const correctHintForUnit =
    activeUnit === 'unit1'
      ? currentU1Item.correct
      : activeUnit === 'unit2'
      ? currentU2Item.correct
      : activeUnit === 'unit3'
      ? currentU3Item.correct
      : activeUnit === 'unit4'
      ? currentU4Item.correct
      : activeUnit === 'unit5'
      ? currentU5Item.correct
      : currentMultiItem.correctList[0];

  const wrongRuleCue =
    phase === 'impact' && outcome && !isAnyCorrect
      ? getWrongRuleHighlight(
          activeUnit,
          currentNounLabel,
          outcome,
          activeUnit === 'unit2' ? '' : stdItem.predicate,
          correctHintForUnit
        )
      : null;

  const earnedStars = firstTryCount >= totalQuestions ? 3 : firstTryCount >= 3 ? 2 : 1;

  const flightTimeSec =
    phase === 'flying' ? Math.max(0, (performance.now() - flightRef.current.startTime) / 1000) : 0;
  const flightVelX = flightRef.current.vx;
  const flightVelY = flightRef.current.vy + GRAVITY * flightTimeSec;
  const flightSpeed = Math.hypot(flightVelX, flightVelY) || 1;
  const flightUx = flightVelX / flightSpeed;
  const flightUy = flightVelY / flightSpeed;

  const nextUnitTarget = nextUnitForUnit(activeUnit);
  const nextUnitLabelMap: Record<ParticleGameUnitId, string> = {
    unit1: '① 주제',
    unit2: '② 소개',
    sentence1: '③ 문장 만들기 1',
    unit3: '④ 주격',
    unit4: '⑤ 주격 ★',
    unit5: '⑥ 목적어',
    sentence2: '⑦ 문장 만들기 2',
    unit6: '⑧ 에·에서',
    unit6_2: '⑨ 에·에서2',
    unit7: '⑩ 도',
    sentence3: '⑪ 문장 만들기 3',
    unit8: '⑫ 와·과·하고·이랑·랑',
    unit9: '⑬ 으로·로',
    unit10: '⑭ 에게·한테',
    sentence4: '⑮ 문장 만들기 4',
    unit11: '⑯ 부터·까지',
    unit12: '⑰ 이나·나',
    unit13: '⑱ 마다·-씩',
    sentence5: '⑲ 문장 만들기 5',
    unit14: '⑳ 만',
    unit15: '㉑ 밖에 ★',
    unit16: '㉒ 보다',
    sentence6: '㉓ 문장 만들기 6',
    unit17: '㉔ 처럼·같이',
    unit18: '㉕ 의 ★',
    unit19: '㉖ 끼리',
    sentence7: '㉗ 문장 만들기 7',
    unit20: '㉘ 께서·께 ★',
    unit21: '㉙ 아·야',
    sentence8: '㉚ 문장 만들기 8',
  };
  const nextUnitBtnLabel = nextUnitTarget
    ? `${gameUi.nextUnitPrefix} ${nextUnitLabelMap[nextUnitTarget]}${gameUi.nextUnitSuffix ? ` ${gameUi.nextUnitSuffix}` : ''}`
    : '';

  const unitNumberLabel =
    activeUnit === 'unit1'
      ? '1단원'
      : activeUnit === 'unit2'
      ? '2단원'
      : activeUnit === 'sentence1'
      ? '3단원'
      : activeUnit === 'unit3'
      ? '4단원'
      : activeUnit === 'unit4'
      ? '5단원'
      : activeUnit === 'unit5'
      ? '6단원'
      : activeUnit === 'sentence2'
      ? '7단원'
      : activeUnit === 'unit6'
      ? '8단원'
      : activeUnit === 'unit6_2'
      ? '9단원'
      : activeUnit === 'unit7'
      ? '10단원'
      : activeUnit === 'sentence3'
      ? '11단원'
      : activeUnit === 'unit8'
      ? '12단원'
      : activeUnit === 'unit9'
      ? '13단원'
      : activeUnit === 'unit10'
      ? '14단원'
      : activeUnit === 'sentence4'
      ? '15단원'
      : activeUnit === 'unit11'
      ? '16단원'
      : activeUnit === 'unit12'
      ? '17단원'
      : activeUnit === 'unit13'
      ? '18단원'
      : activeUnit === 'sentence5'
      ? '19단원'
      : activeUnit === 'unit14'
      ? '20단원'
      : activeUnit === 'unit15'
      ? '21단원'
      : activeUnit === 'unit16'
      ? '22단원'
      : activeUnit === 'sentence6'
      ? '23단원'
      : activeUnit === 'unit17'
      ? '24단원'
      : activeUnit === 'unit18'
      ? '25단원'
      : activeUnit === 'unit19'
      ? '26단원'
      : activeUnit === 'sentence7'
      ? '27단원'
      : activeUnit === 'unit20'
      ? '28단원'
      : activeUnit === 'unit21'
      ? '29단원'
      : '30단원';

  return (
    <div className="w-full max-w-4xl mx-auto font-korean-gothic select-none">
      <div
        className={`relative h-[400px] sm:h-[500px] rounded-lg border-2 border-emerald-200 shadow-md ${
          isAnyCorrect ? 'bg-[#CCFBF1]' : 'bg-[#D8FAEC]'
        } overflow-hidden flex flex-col justify-between`}
        style={{
          transform:
            impactFlash > 0.35
              ? `translate(${Math.sin(animTime * 60) * 3 * impactFlash}px, ${Math.cos(animTime * 54) * 2.5 * impactFlash}px)`
              : undefined,
        }}
      >
        {/* 상단 좌/우 안내 문구 + 정중앙 메모리게임 동일 뱃지 앨범 버튼 */}
        <div className="relative z-20 w-full shrink-0 px-2 sm:px-4 pt-1.5 sm:pt-2.5 pb-0.5">
          <div className="w-full grid grid-cols-[1fr_auto_1fr] items-start gap-1.5 sm:gap-4 px-1 pt-0 sm:pt-0.5">
            <div className="flex justify-start pt-0.5 sm:pt-1 pointer-events-none">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-emerald-950 leading-snug text-left break-keep -rotate-3 origin-center select-none">
                알맞은 조사를 골라요
              </p>
            </div>

            <GameBadgeAlbumButton
              onClick={() => setIsBadgeModalOpen(true)}
              title="내 앨범"
            />

            <div className="flex justify-end pt-0.5 sm:pt-1 pointer-events-none">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-emerald-900 leading-snug text-right break-keep rotate-3 origin-center select-none">
                버튼을 꾹 눌렀다 떼요
              </p>
            </div>
          </div>
        </div>

        {/* 새총 무대 SVG: 화면 비율에 맞춰 위 하늘 공간을 동적으로 확장 (모바일 상단 데드존 제거) */}
        <div
          ref={stageContainerRef}
          className="relative w-full flex-1 min-h-0 overflow-hidden"
          style={{
            background: isAnyCorrect
              ? 'linear-gradient(to bottom, #CCFBF1 0%, #ECFDF5 68%, #6EE7B7 100%)'
              : 'linear-gradient(to bottom, #D8FAEC 0%, #ECFEF6 68%, #6EE7B7 100%)',
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`20 ${viewMinY} ${VIEW_WIDTH} ${stageViewHeight}`}
            preserveAspectRatio="xMidYMax meet"
            className="absolute inset-0 w-full h-full block touch-pan-y cursor-crosshair"
            style={{ touchAction: dragOffset ? 'none' : 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <defs>
              <linearGradient id="abSkyDefault" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D8FAEC" />
                <stop offset="55%" stopColor="#ECFEF6" />
                <stop offset="100%" stopColor="#F9FFFC" />
              </linearGradient>
              <linearGradient id="abSkyWin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CCFBF1" />
                <stop offset="58%" stopColor="#ECFDF5" />
                <stop offset="100%" stopColor="#FEF9C3" />
              </linearGradient>
              <linearGradient id="mintHillFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.65" />
                <stop offset="35%" stopColor="#A7F3D0" />
                <stop offset="100%" stopColor="#6EE7B7" />
              </linearGradient>
              <filter id="boardShadow" x="-8%" y="-12%" width="116%" height="132%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#10B981" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* 1. 화사한 에메랄드·민트 파스텔 하늘 (상단 끝까지 이음새 없이 풀 블리드) */}
            <rect
              x="-220"
              y={viewMinY - 160}
              width="1440"
              height={stageViewHeight + 280}
              fill={isAnyCorrect ? 'url(#abSkyWin)' : 'url(#abSkyDefault)'}
            />

            {/* 하늘 반짝임 별빛 포인트 */}
            <g fill="#6EE7B7" opacity="0.45">
              <path d={`M120 ${viewMinY + 38} L123 ${viewMinY + 46} L131 ${viewMinY + 49} L123 ${viewMinY + 52} L120 ${viewMinY + 60} L117 ${viewMinY + 52} L109 ${viewMinY + 49} L117 ${viewMinY + 46} Z`} />
              <path d={`M895 ${viewMinY + 34} L897.5 ${viewMinY + 40} L903.5 ${viewMinY + 42.5} L897.5 ${viewMinY + 45} L895 ${viewMinY + 51} L892.5 ${viewMinY + 45} L886.5 ${viewMinY + 42.5} L892.5 ${viewMinY + 40} Z`} />
              <circle cx="290" cy={viewMinY + 36} r="3" fill="#A7F3D0" />
              <circle cx="780" cy={Math.round(boardY + (240 - boardY) * 0.48)} r="3.5" fill="#A7F3D0" />
            </g>

            {/* 2. 몽글몽글 파스텔 구름 (확장된 하늘 전체에 고르게 배치) */}
            <g fill="#FFFFFF" opacity="0.86">
              <g transform={`translate(115, ${Math.round(boardY + 18)})`}>
                <circle cx="-26" cy="8" r="22" />
                <circle cx="0" cy="0" r="28" />
                <circle cx="28" cy="10" r="20" />
                <rect x="-28" y="8" width="58" height="20" rx="10" />
              </g>
              <g transform={`translate(360, ${Math.round(boardY + (240 - boardY) * 0.52)})`}>
                <circle cx="-22" cy="8" r="18" />
                <circle cx="2" cy="0" r="24" />
                <circle cx="26" cy="8" r="17" />
                <rect x="-24" y="6" width="52" height="19" rx="9.5" />
              </g>
              <g transform={`translate(885, ${Math.round(boardY + (240 - boardY) * 0.56)})`}>
                <circle cx="-26" cy="8" r="20" />
                <circle cx="0" cy="0" r="26" />
                <circle cx="28" cy="8" r="19" />
                <rect x="-28" y="8" width="58" height="19" rx="9.5" />
              </g>
            </g>

            {/* 3. 먼 파스텔 민트 언덕 (레이어 1) */}
            <path
              d="M-220 296 Q155 242 320 284 Q490 238 670 282 Q845 240 1220 278 L1220 440 L-220 440 Z"
              fill="#D1FAE5"
              opacity="0.82"
            />

            {/* 4. 중간 부드러운 곡선 민트 언덕 (레이어 2) */}
            <path
              d="M-220 322 Q190 276 380 316 Q585 274 785 316 Q905 292 1220 308 L1220 440 L-220 440 Z"
              fill="#A7F3D0"
              opacity="0.72"
            />

            {/* 5. 포근한 앞쪽 에메랄드 민트 잔디 언덕 바닥 */}
            <path
              d="M-220 352 Q240 334 495 348 Q755 362 1220 344 L1220 440 L-220 440 Z"
              fill="url(#mintHillFront)"
            />
            <path
              d="M-220 352 Q240 334 495 348 Q755 362 1220 344"
              fill="none"
              stroke="#6EE7B7"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* 언덕 위 아기자기한 파스텔 꽃·풀잎 장식 */}
            <g opacity="0.85">
              <circle cx="72" cy="376" r="4" fill="#FFFFFF" />
              <circle cx="72" cy="376" r="1.6" fill="#34D399" />
              <circle cx="295" cy="382" r="4.2" fill="#FFFFFF" />
              <circle cx="295" cy="382" r="1.7" fill="#34D399" />
              <circle cx="640" cy="378" r="4" fill="#FFFFFF" />
              <circle cx="640" cy="378" r="1.6" fill="#10B981" />
              <circle cx="912" cy="370" r="4.2" fill="#FFFFFF" />
              <circle cx="912" cy="370" r="1.7" fill="#34D399" />
              <path d="M442 370 Q445 359 450 368 Q455 358 458 370" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M775 376 Q778 365 783 374 Q788 364 791 376" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" />
            </g>

            {/* 목표 문장 보드 (하늘 배경 내 동적 최상단 배치) */}
            {isEndSlotLayout ? (
              <g transform={`translate(610, ${boardY})`} filter="url(#boardShadow)">
                {(() => {
                  const endPrefix = activeUnit === 'unit2' ? currentU2Item.prefix : stdItem.prefix || '';
                  const endNoun = activeUnit === 'unit2' ? currentU2Item.noun : stdItem.noun;
                  const endCorrect = activeUnit === 'unit2' ? isU2Correct : stdItem.isCorrect;
                  return (
                    <>
                      <rect
                        x="-260"
                        y="-66"
                        width="520"
                        height="112"
                        rx="24"
                        fill="#FFFFFF"
                        stroke={endCorrect ? '#10B981' : outcome ? '#FB7185' : '#6EE7B7'}
                        strokeWidth="4.5"
                      />
                      <text
                        x="-192"
                        y="6"
                        textAnchor="middle"
                        fontSize={endPrefix.length >= 5 ? 22 : 34}
                        fontWeight="800"
                        fill="#475569"
                      >
                        {endPrefix}
                      </text>
                      <text
                        x="-42"
                        y="12"
                        textAnchor="middle"
                        fontSize={endNoun.length >= 3 ? 44 : 54}
                        fontWeight="900"
                        fill="#1E293B"
                      >
                        {wrongRuleCue?.highlightLastSyllable && endNoun.length > 0 ? (
                          <>
                            <tspan>{endNoun.slice(0, -1)}</tspan>
                            <tspan fill="#E11D48" textDecoration="underline">
                              {endNoun.slice(-1)}
                            </tspan>
                          </>
                        ) : (
                          endNoun
                        )}
                      </text>
                      <g transform="translate(132, -14)">
                        <rect
                          x="-76"
                          y="-40"
                          width="152"
                          height="80"
                          rx="18"
                          fill={endCorrect ? '#D1FAE5' : outcome ? '#FFE4E6' : '#ECFDF5'}
                          stroke={endCorrect ? '#059669' : outcome ? '#FB7185' : '#34D399'}
                          strokeWidth="3.5"
                        />
                        <text
                          x="0"
                          y={outcome ? 15 : 21}
                          textAnchor="middle"
                          fontSize={outcome ? (String(outcome).length > 2 ? 38 : 48) : 52}
                          fontWeight="900"
                          fill={endCorrect ? '#047857' : outcome ? '#E11D48' : '#10B981'}
                        >
                          {outcome ? outcome : '?'}
                        </text>
                      </g>
                    </>
                  );
                })()}
              </g>
            ) : (
              <g transform={`translate(615, ${boardY})`} filter="url(#boardShadow)">
                <rect
                  x={stdItem.prefix ? -382 : -290}
                  y="-66"
                  width={stdItem.prefix ? 672 : 580}
                  height="112"
                  rx="24"
                  fill="#FFFFFF"
                  stroke={stdItem.isCorrect ? '#10B981' : outcome ? '#FB7185' : '#6EE7B7'}
                  strokeWidth="4.5"
                />
                {stdItem.transformedHead ? (
                  <>
                    <text x="-185" y="10" textAnchor="middle" fontSize="36" fontWeight="800" fill="#64748B">
                      {stdItem.noun}+
                    </text>
                    <g transform="translate(-45, -14)">
                      <rect
                        x="-58"
                        y="-40"
                        width="116"
                        height="80"
                        rx="18"
                        fill="#ECFDF5"
                        stroke="#10B981"
                        strokeWidth="3.5"
                      />
                      <text x="0" y="21" textAnchor="middle" fontSize="50" fontWeight="900">
                        <tspan fill="#059669">{stdItem.transformedHead}</tspan>
                        {stdItem.transformedTail ? <tspan fill="#E11D48">{stdItem.transformedTail}</tspan> : null}
                      </text>
                    </g>
                  </>
                ) : (
                  <>
                    {stdItem.prefix && (
                      <text
                        x="-296"
                        y="7"
                        textAnchor="middle"
                        fontSize={stdItem.prefix.length >= 6 ? 21 : stdItem.prefix.length >= 4 ? 25 : 30}
                        fontWeight="800"
                        fill="#475569"
                      >
                        {stdItem.prefix}
                      </text>
                    )}
                    <text
                      x={stdItem.prefix ? -168 : -192}
                      y="10"
                      textAnchor="middle"
                      fontSize={
                        stdItem.prefix
                          ? stdItem.noun.length >= 3
                            ? 38
                            : 46
                          : stdItem.noun.length >= 4
                          ? 32
                          : stdItem.noun.length === 3
                          ? 42
                          : 54
                      }
                      fontWeight="900"
                      fill="#1E293B"
                    >
                      {wrongRuleCue?.highlightLastSyllable && stdItem.noun.length > 0 ? (
                        <>
                          <tspan>{stdItem.noun.slice(0, -1)}</tspan>
                          <tspan fill="#E11D48" textDecoration="underline">
                            {stdItem.noun.slice(-1)}
                          </tspan>
                        </>
                      ) : (
                        stdItem.noun
                      )}
                    </text>
                    <g transform="translate(-45, -14)">
                      <rect
                        x="-50"
                        y="-40"
                        width="100"
                        height="80"
                        rx="18"
                        fill={stdItem.isCorrect ? '#D1FAE5' : outcome ? '#FFE4E6' : '#ECFDF5'}
                        stroke={stdItem.isCorrect ? '#059669' : outcome ? '#FB7185' : '#34D399'}
                        strokeWidth="3.5"
                      />
                      <text
                        x="0"
                        y={outcome && String(outcome).length >= 3 ? 13 : 20}
                        textAnchor="middle"
                        fontSize={outcome ? (String(outcome).length >= 3 ? 30 : String(outcome).length === 2 ? 40 : 52) : 54}
                        fontWeight="900"
                        fill={stdItem.isCorrect ? '#047857' : outcome ? '#E11D48' : '#10B981'}
                      >
                        {outcome ? outcome : '?'}
                      </text>
                    </g>
                  </>
                )}
                <text
                  x="148"
                  y="10"
                  textAnchor="middle"
                  fontSize={
                    stdItem.predicate.length >= 9
                      ? 27
                      : stdItem.predicate.length >= 7
                      ? 31
                      : stdItem.predicate.length >= 5
                      ? 37
                      : 48
                  }
                  fontWeight="900"
                  fill={stdItem.isRedPredicate ? '#E11D48' : wrongRuleCue?.highlightPredicate ? '#BE123C' : '#1E293B'}
                  textDecoration={wrongRuleCue?.highlightPredicate ? 'underline' : undefined}
                >
                  {stdItem.predicate}
                </text>
              </g>
            )}

            {wrongRuleCue && (
              <g transform={`translate(520, ${boardY + 72})`}>
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="900"
                  fill="#BE123C"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  style={{ paintOrder: 'stroke fill' }}
                >
                  ⚠️ {wrongRuleCue.badge}
                </text>
              </g>
            )}

            {isAnyCorrect && phase === 'impact' && impactAge < 1.2 && (
              <g transform={`translate(${activeTargetX}, ${targetY})`} opacity={Math.max(0, 1 - impactAge / 1.2)}>
                    <circle
                      cx="0"
                      cy="0"
                      r={24 + impactAge * 68}
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="4"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={14 + impactAge * 44}
                      fill="none"
                      stroke="#A7F3D0"
                      strokeWidth="3"
                    />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
                      const rad = (deg * Math.PI) / 180;
                      const dist = 28 + impactAge * 72;
                      const sx = Math.cos(rad) * dist;
                      const sy = Math.sin(rad) * dist;
                      return (
                        <g key={deg} transform={`translate(${sx}, ${sy}) scale(${idx % 2 === 0 ? 1.05 : 0.8})`}>
                          <path
                            d="M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5 Z"
                            fill={idx % 2 === 0 ? '#10B981' : '#6EE7B7'}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                          />
                        </g>
                      );
                    })}
                </g>
            )}

            {/* 목표 명사 캐릭터 */}
            {mascotX < 1080 && mascotY > viewMinY - 120 && (
              <g transform={`translate(${mascotX}, ${mascotY}) rotate(${mascotRot})`}>
                <PastelMascotBadge isCorrect={isAnyCorrect}>
                  {activeUnit === 'unit1' ? (
                    <Unit1NounMascot nounId={currentU1Item.id} isCorrect={isU1Correct} />
                  ) : activeUnit === 'unit2' ? (
                    <Unit2NounMascot
                      nounId={currentU2Item.id}
                      isCorrect={isU2Correct}
                      isGoMode={isU2GoGag}
                      animTime={animTime}
                    />
                  ) : activeUnit === 'unit3' ? (
                    <Unit3NounMascot nounId={currentU3Item.id} isCorrect={isU3Correct} />
                  ) : activeUnit === 'unit4' ? (
                    <Unit4NounMascot nounId={currentU4Item.id} isCorrect={isU4Correct} />
                  ) : activeUnit === 'unit5' ? (
                    <Unit5NounMascot nounId={currentU5Item.id} isCorrect={isU5Correct} />
                  ) : activeUnit === 'unit11' ||
                    activeUnit === 'unit12' ||
                    activeUnit === 'unit13' ||
                    activeUnit === 'unit14' ||
                    activeUnit === 'unit15' ||
                    activeUnit === 'unit16' ? (
                    <Unit11To16NounMascot nounId={currentMultiItem.id} isCorrect={isMultiCorrect} />
                  ) : activeUnit === 'unit17' ||
                    activeUnit === 'unit18' ||
                    activeUnit === 'unit19' ||
                    activeUnit === 'unit20' ||
                    activeUnit === 'unit21' ? (
                    <Unit17To21NounMascot nounId={currentMultiItem.id} isCorrect={isMultiCorrect} />
                  ) : isSentenceUnit ? (
                    <SentenceNounMascot
                      nounId={currentMultiItem.id as SentenceNounId}
                      isCorrect={isMultiCorrect}
                    />
                  ) : (
                    <Unit6To10NounMascot nounId={currentMultiItem.id} isCorrect={isMultiCorrect} />
                  )}
                </PastelMascotBadge>
              </g>
            )}



            {phase === 'missed' && missKind === 'short' && missLandingPos && (
              <text x={missLandingPos.x} y="286" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0F766E" stroke="#FFFFFF" strokeWidth="5" style={{ paintOrder: 'stroke fill' }}>
                {gameUi.weakBanner}
              </text>
            )}
            {phase === 'missed' && missKind === 'over' && missLandingPos && (
              <text x={missLandingPos.x} y={viewMinY + 42} textAnchor="middle" fontSize="22" fontWeight="900" fill="#D97706" stroke="#FFFFFF" strokeWidth="5" style={{ paintOrder: 'stroke fill' }}>
                {gameUi.overBanner}
              </text>
            )}

            {/* 새총 직접 조준 영역만 touch-action: none 적용 (나머지 하늘·민트 배경은 상하 터치 스크롤 허용) */}
            <rect
              x="0"
              y="125"
              width="340"
              height="275"
              fill="transparent"
              style={{
                touchAction: 'none',
                cursor: phase === 'flying' || phase === 'cleared' ? 'default' : dragOffset ? 'grabbing' : 'grab',
              }}
            />

            {/* 새총 & 반짝이는 에메랄드·민트 조준 궤적 */}
            <g style={{ touchAction: 'none' }}>
              {aimDots.map((d, i) =>
                i % 3 === 0 ? (
                  <g key={i} transform={`translate(${d.x}, ${d.y}) scale(${Math.max(0.55, 1.05 - i * 0.04)})`} opacity={Math.max(0.28, 0.94 - i * 0.06)}>
                    <path
                      d="M0 -8 L2.2 -2.2 L8 0 L2.2 2.2 L0 8 L-2.2 2.2 L-8 0 L-2.2 -2.2 Z"
                      fill="#10B981"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                  </g>
                ) : (
                  <circle
                    key={i}
                    cx={d.x}
                    cy={d.y}
                    r={Math.max(3, 6.2 - i * 0.32)}
                    fill={i % 2 === 1 ? '#34D399' : '#A7F3D0'}
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    opacity={Math.max(0.28, 0.92 - i * 0.06)}
                  />
                )
              )}

              {/* 새총 발판 그림자 */}
              <ellipse cx={SLING_X} cy="354" rx="26" ry="7" fill="#10B981" opacity="0.24" />

              {/* 뒤쪽 새총 가지 (따뜻한 라이트 우드 + 다크 네이비 외곽선) */}
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X + 12} 276 ${SLING_X + 22} 260`}
                fill="none"
                stroke="#1E293B"
                strokeWidth="15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X + 12} 276 ${SLING_X + 22} 260`}
                fill="none"
                stroke="#E5B874"
                strokeWidth="9.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 뒤쪽 에메랄드 고무줄 */}
              <line
                x1={SLING_X + 22}
                y1="260"
                x2={effectivePull ? SLING_X + effectivePull.dx : SLING_X}
                y2={effectivePull ? SLING_Y + effectivePull.dy : SLING_Y}
                stroke="#059669"
                strokeWidth="5.5"
                strokeLinecap="round"
              />

              {/* 장전된 조사 구슬 */}
              {phase === 'ready' && (
                <g transform={`translate(${effectivePull ? SLING_X + effectivePull.dx : SLING_X}, ${effectivePull ? SLING_Y + effectivePull.dy : SLING_Y})`}>
                  <circle cx="0" cy="0" r={selectedParticle.length > 1 ? 30 : 26} fill={activeBtnMeta.bgHex} stroke="#1E293B" strokeWidth="3" />
                  <circle cx="-7" cy="-10" r={selectedParticle.length > 1 ? 6 : 5} fill="#FFFFFF" opacity="0.7" />
                  <text
                    x="0"
                    y={selectedParticle.length > 1 ? 6 : 10}
                    textAnchor="middle"
                    fontSize={selectedParticle.length >= 3 ? 16 : selectedParticle.length === 2 ? 20 : 28}
                    fontWeight="900"
                    fill={currentBallColor}
                  >
                    {selectedParticle}
                  </text>
                </g>
              )}

              {/* 앞쪽 새총 고무줄 */}
              <line
                x1={SLING_X - 18}
                y1="260"
                x2={effectivePull ? SLING_X + effectivePull.dx : SLING_X}
                y2={effectivePull ? SLING_Y + effectivePull.dy : SLING_Y}
                stroke="#34D399"
                strokeWidth="5.5"
                strokeLinecap="round"
              />

              {/* 앞쪽 새총 손잡이 & 가지 (따뜻한 라이트 우드 + 에메랄드 포인트 밴드) */}
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X - 10} 276 ${SLING_X - 18} 260`}
                fill="none"
                stroke="#1E293B"
                strokeWidth="15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X - 10} 276 ${SLING_X - 18} 260`}
                fill="none"
                stroke="#F6D399"
                strokeWidth="9.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 에메랄드 포인트 그립 & 가지 밴드 */}
              <rect x={SLING_X - 7} y="310" width="14" height="32" rx="6" fill="#10B981" stroke="#1E293B" strokeWidth="2.5" />
              <line x1={SLING_X - 4} y1="319" x2={SLING_X + 4} y2="319" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
              <line x1={SLING_X - 4} y1="328" x2={SLING_X + 4} y2="328" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
              <circle cx={SLING_X - 18} cy="260" r="6" fill="#34D399" stroke="#1E293B" strokeWidth="2.5" />
              <circle cx={SLING_X + 22} cy="260" r="6" fill="#10B981" stroke="#1E293B" strokeWidth="2.5" />
            </g>

            {phase === 'flying' && (
              <g transform={`translate(${flightRef.current.x}, ${flightRef.current.y})`}>
                {/* 기본 반짝이는 에메랄드·민트 별빛 궤적 */}
                {[18, 36, 54, 72].map((dist, idx) => {
                  const tx = -flightUx * dist + Math.sin(animTime * 26 + idx * 1.5) * (idx + 1) * 1.9;
                  const ty = -flightUy * dist + Math.cos(animTime * 22 + idx * 1.7) * (idx + 1) * 1.9;
                  return idx % 2 === 0 ? (
                    <g key={dist} transform={`translate(${tx}, ${ty}) scale(${Math.max(0.55, 1.1 - idx * 0.14)})`} opacity={0.85 - idx * 0.16}>
                      <path
                        d="M0 -10 L2.6 -2.6 L10 0 L2.6 2.6 L0 10 L-2.6 2.6 L-10 0 L-2.6 -2.6 Z"
                        fill="#10B981"
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                      />
                    </g>
                  ) : (
                    <circle
                      key={dist}
                      cx={tx}
                      cy={ty}
                      r={Math.max(4, 11 - idx * 2)}
                      fill={comboStreak >= 2 ? '#34D399' : '#6EE7B7'}
                      opacity={0.78 - idx * 0.16}
                    />
                  );
                })}
                {comboStreak >= 2 && (
                  <circle
                    cx="0"
                    cy="0"
                    r={flightRef.current.particle.length > 1 ? 39 : 36}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="4.5"
                    strokeDasharray="8 6"
                    opacity="0.82"
                  />
                )}
                <circle cx="0" cy="0" r={flightRef.current.particle.length > 1 ? 31 : 28} fill={flyingBtnMeta.bgHex} stroke="#1E293B" strokeWidth="3" />
                <text
                  x="0"
                  y={flightRef.current.particle.length > 1 ? 6 : 11}
                  textAnchor="middle"
                  fontSize={flightRef.current.particle.length >= 3 ? 16 : flightRef.current.particle.length === 2 ? 20 : 30}
                  fontWeight="900"
                  fill={flyingBallColor}
                >
                  {flightRef.current.particle}
                </text>
              </g>
            )}

            {shouldRicochet && bounceAge < 1 && (
              <g transform={`translate(${ricochetX}, ${ricochetY}) rotate(${bounceAge * 720})`}>
                <circle cx="0" cy="0" r={String(outcome).length > 1 ? 30 : 26} fill={ricochetBg} stroke="#1E293B" strokeWidth="3" />
                <text
                  x="0"
                  y={String(outcome).length > 1 ? 6 : 10}
                  textAnchor="middle"
                  fontSize={String(outcome).length >= 3 ? 16 : String(outcome).length === 2 ? 20 : 28}
                  fontWeight="900"
                  fill={ricochetColor}
                >
                  {outcome}
                </text>
              </g>
            )}

            <g transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot})`} style={{ touchAction: 'none' }}>
              <StickmanPlayer face={jollaFace} running={isAnySpaceGag && impactAge < 0.8} animTime={animTime} />
            </g>
          </svg>
        </div>

        {/* 동일 통합 박스 하단 조작부: 아이콘 간소화된 발사 모드 토글 + 분홍 게이지 바 + 후추통 선택지 */}
        <div className="shrink-0 relative z-20 bg-gradient-to-b from-[#F4FDF9] to-[#E6FAF0] border-t-2 border-emerald-200 px-2 sm:px-5 pt-1.5 sm:pt-2 pb-2 sm:pb-2.5 flex flex-col gap-1.5">
          {/* 간소화 모드 토글 + 파워 게이지 바 한 줄 배치 (플레이박스 확장 없음) */}
          <div
            className={`${
              activeButtons.length >= 5
                ? 'max-w-[840px]'
                : activeButtons.length === 4
                ? 'max-w-[820px]'
                : activeButtons.length === 2
                ? 'max-w-[540px]'
                : 'max-w-[760px]'
            } w-full mx-auto flex items-center gap-2`}
          >
            <div
              className="inline-flex items-center rounded-md border border-emerald-300 bg-white overflow-hidden shrink-0 shadow-2xs"
              role="group"
              aria-label="발사 방식 선택"
            >
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setControlMode('arcade');
                }}
                className={`px-2 py-0.5 text-[11px] sm:text-xs font-black flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  controlMode === 'arcade'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-transparent text-slate-700 hover:bg-emerald-50'
                }`}
                title="꾹 누르기"
              >
                <Hand className="w-3.5 h-3.5 shrink-0" />
                <span>꾹</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  chargeRef.current = { active: null, startTime: 0, power: 0 };
                  setChargingBtn(null);
                  setChargePower(0);
                  setControlMode('easy');
                }}
                className={`px-2 py-0.5 text-[11px] sm:text-xs font-black border-l border-emerald-200 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  controlMode === 'easy'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-transparent text-slate-700 hover:bg-emerald-50'
                }`}
                title="원터치 발사"
              >
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>원터치</span>
              </button>
            </div>

            {controlMode === 'arcade' ? (
              <div className="relative flex-1 h-3.5 sm:h-4 rounded-full bg-white/95 border-2 border-emerald-300 overflow-hidden shadow-inner">
                <div
                  className="absolute top-0 bottom-0 bg-pink-300/85 border-x-2 border-pink-500"
                  style={{ left: `${SWEET_MIN * 100}%`, width: `${(SWEET_MAX - SWEET_MIN) * 100}%` }}
                />
                <div className="absolute top-0 bottom-0 w-0.5 bg-pink-600/60" style={{ left: '66.7%' }} />
                <div
                  className="h-full rounded-l-full"
                  style={{
                    width: `${chargePower * 100}%`,
                    backgroundColor: chargePower < SWEET_MIN ? '#34D399' : chargePower <= SWEET_MAX ? '#EC4899' : '#FB7185',
                  }}
                />
              </div>
            ) : (
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800 truncate">
                조사를 한 번 누르면 바로 명중 구간으로 날아가요!
              </span>
            )}
          </div>

          {/* 후추통 몸통 스타일 파스텔 선택지 (1~2글자: 동그란 원, 3글자+: 타원, 흰 바탕에 작은 글씨) */}
          <div
            className={`flex items-center justify-center flex-wrap w-full mx-auto ${
              activeButtons.length === 5 ? 'gap-1.5 sm:gap-3.5 max-w-[840px]' : 'gap-2 sm:gap-5 max-w-[780px]'
            }`}
          >
            {activeButtons.map((btn) => {
              const isPressed = chargingBtn === btn.particle;
              const isOval = btn.label.length >= 3;
              const isFiveMode = activeButtons.length === 5;
              const shapeClass = isOval
                ? 'rounded-[1.4rem] min-w-[78px] sm:min-w-[116px] h-[44px] sm:h-[60px] px-2 sm:px-3.5'
                : isFiveMode
                ? 'rounded-full w-[42px] h-[42px] sm:w-[58px] sm:h-[58px] p-1'
                : 'rounded-full w-[46px] h-[46px] sm:w-[64px] sm:h-[64px] p-1 sm:p-1.5';

              return (
                <button
                  key={btn.particle}
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    startChargingButton(btn);
                  }}
                  onPointerUp={() => releaseChargingButton(btn.particle)}
                  onPointerCancel={() => releaseChargingButton(btn.particle)}
                  className={`relative ${shapeClass} flex items-center justify-center overflow-hidden transition-transform cursor-pointer touch-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
                  style={{
                    backgroundColor: btn.bgHex,
                    border: '2.5px solid #1E293B',
                    boxShadow: isPressed ? '0 1px 0 #1E293B' : '0 3px 0 #1E293B',
                    transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
                  }}
                >
                  {/* 후추통 왼쪽 광택 라인 */}
                  <span
                    className={`pointer-events-none absolute top-1.5 bottom-2 w-1 sm:w-1.5 rounded-full bg-white/80 ${
                      isOval ? 'left-2' : 'left-1.5 sm:left-2'
                    }`}
                  />

                  {/* 후추통 하단 미세 도트 4개 */}
                  <span className="pointer-events-none absolute bottom-1 inset-x-2 flex justify-center gap-0.5 sm:gap-1 opacity-35">
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-500" />
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-400" />
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-500" />
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-400" />
                  </span>

                  {/* 흰 바탕에 작은 글씨 라벨 */}
                  <span
                    className={`relative z-10 bg-white border border-slate-300/85 shadow-xs font-black whitespace-nowrap leading-none flex items-center justify-center ${
                      isOval
                        ? 'px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-xl text-[11px] sm:text-sm'
                        : isFiveMode
                        ? 'px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs'
                        : 'px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-sm'
                    }`}
                    style={{ color: btn.accentHex }}
                  >
                    {btn.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 단원 클리어 팝업: 뷰포트 중앙에 상하 스크롤 없이 크게 띄우기 */}
      {phase === 'cleared' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-emerald-950/45 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border-4 border-emerald-300 bg-white px-6 py-7 sm:px-8 sm:py-8 shadow-2xl text-center space-y-5">
            {clearBadgeOutcome ? (
              <div className="w-18 h-18 mx-auto rounded-full bg-emerald-50 border-3 border-emerald-400 flex items-center justify-center shadow-xs p-2">
                <BulletBadgeGraphic tier={clearBadgeOutcome.tier} className="w-13 h-13" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3].map((starIdx) => (
                  <svg
                    key={starIdx}
                    viewBox="0 0 24 24"
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${
                      starIdx <= earnedStars ? 'text-amber-400 drop-shadow-sm' : 'text-slate-200'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 2.5l2.92 5.92 6.53.95-4.72 4.6 1.11 6.5L12 17.4l-5.84 3.07 1.11-6.5-4.72-4.6 6.53-.95L12 2.5z" />
                  </svg>
                ))}
              </div>
            )}

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 break-keep">{unitNumberLabel} 완료!</h3>
              <p className="text-sm sm:text-base font-semibold text-slate-500 mt-1 break-keep">
                {clearBadgeOutcome
                  ? `${
                      clearBadgeOutcome.tier === 'gold'
                        ? '👑 금색 총알'
                        : clearBadgeOutcome.tier === 'silver'
                        ? '🥈 은색 총알'
                        : '🌿 민트 총알'
                    } 뱃지 획득! (실수 ${totalMissesInUnit}회)`
                  : earnedStars === 3
                  ? '한 번에 모든 조사를 정확히 맞혔어요!'
                  : earnedStars === 2
                  ? '보스 문제까지 멋지게 해냈어요!'
                  : '끝까지 포기하지 않고 완주했어요!'}
              </p>
              {clearBadgeOutcome?.newlyUnlockedTrophyMilestone && (() => {
                const hallUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).hallOfFame;
                return (
                  <p className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md mt-2">
                    {hallUi.trophyUnlockedPrefix} ({clearBadgeOutcome.newlyUnlockedTrophyMilestone} {hallUi.badgeLabel})
                  </p>
                );
              })()}
            </div>

            <div className="grid grid-cols-3 gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 sm:p-4">
              <div className="min-w-0 px-0.5">
                <div className="text-xs font-bold text-slate-500 break-keep">첫 시도 명중</div>
                <div className="text-lg sm:text-xl font-black text-emerald-800 tabular-nums mt-0.5">
                  {firstTryCount}/{totalQuestions}
                </div>
              </div>
              <div className="min-w-0 px-0.5 border-x border-emerald-200">
                <div className="text-xs font-bold text-slate-500 break-keep">실수</div>
                <div className="text-lg sm:text-xl font-black text-rose-600 tabular-nums mt-0.5">
                  {totalMissesInUnit}회
                </div>
              </div>
              <div className="min-w-0 px-0.5">
                <div className="text-xs font-bold text-slate-500 break-keep">최고 연속</div>
                <div className="text-lg sm:text-xl font-black text-amber-600 tabular-nums mt-0.5">
                  {bestComboInUnit}연속
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                onClick={handleReplayUnit}
                className="sm:w-auto sm:min-w-[124px] shrink-0 min-h-[46px] px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-black cursor-pointer whitespace-nowrap"
              >
                🔄 다시 하기
              </button>
              {nextUnitTarget && onSelectUnit ? (
                <button
                  type="button"
                  onClick={() => onSelectUnit(nextUnitTarget)}
                  className="flex-1 min-w-0 min-h-[46px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-black cursor-pointer shadow-sm leading-snug break-keep whitespace-normal text-center"
                >
                  {nextUnitBtnLabel}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => (onSelectUnit ? onSelectUnit('unit1') : handleReplayUnit())}
                  className="flex-1 min-w-0 min-h-[46px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm sm:text-base font-black cursor-pointer shadow-sm leading-snug break-keep whitespace-normal text-center"
                >
                  🏆 {gameUi.fromStart}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🏆 SHARED BADGE COLLECTION & HALL OF FAME MODAL */}
      <GameBadgeAndHallOfFameModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        initialGame="slingshot"
        uiLang={uiLang}
      />
    </div>
  );
};

export default ParticleArcadeQuiz;
