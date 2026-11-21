import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ChevronDown, Volume2, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { SupportedLanguage } from '../types';
import {
  VERB_UNIT_META,
  VERB_CARDS_BY_UNIT,
  VerbUnitType,
  VerbCardItem,
} from './VerbConjugationSection';
import { getBaseWordParts } from '../utils/verbConjugationUtils';
import {
  speakKorean,
  playCutePop,
  playSuccessChime,
  playApplauseFanfare,
  playBeethovenFateMemeSound,
} from '../utils/audio';

interface VerbKartQuizSectionProps {
  lang: SupportedLanguage;
  selectedUnit?: VerbUnitType;
  onSelectUnit?: (unit: VerbUnitType) => void;
  hideUnitBar?: boolean;
}

export interface VerbEndingQuestion {
  unitId: VerbUnitType;
  card: VerbCardItem;
  stemDisplay: string;
  baseEnding: string;
  cueBadge?: string;
  correctOption: string;
  options: string[];
  optionHints?: Record<string, string>;
}

const PRESENT_BY_PAST_GROUP: Record<string, '-아요' | '-어요' | '-해요'> = {
  '-았어요': '-아요',
  '-었어요': '-어요',
  '-했어요': '-해요',
};

export function buildVerbEndingQuestion(
  unit: VerbUnitType,
  card: VerbCardItem
): VerbEndingQuestion {
  const baseParts = getBaseWordParts(card.baseWord, unit);
  const stemDisplay = card.stem || baseParts.stem;
  const baseEnding = baseParts.ending;
  const isHada = baseEnding === '하다';

  let correctOption = '';
  let distractors: string[] = [];
  let cueBadge: string | undefined;
  const optionHints: Record<string, string> = {};

  switch (unit) {
    case 'unit1':
      correctOption = '-아요';
      distractors = ['-어요', '-해요', '-으요'];
      optionHints['-어요'] = "어간에 밝은 모음 'ㅏ·ㅗ'가 있으니 '-어요'는 어색한 비문이에요. '-아요'가 맞아요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! 모음조화에 맞춰 '-아요'를 붙여요.";
      break;
    case 'unit2':
      correctOption = '-어요';
      distractors = ['-아요', '-해요', '-으요'];
      optionHints['-아요'] = "어간에 'ㅏ·ㅗ'가 없으므로 '-아요'를 붙일 수 없어요. '-어요'가 맞아요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! '-어요'를 붙여요.";
      break;
    case 'unit3':
      correctOption = '-해요';
      distractors = ['-아요', '-어요', '-으요'];
      optionHints['-아요'] = "'하다' 동사는 어간 뒤에 '-아요'가 아니라 '-해요'로 결합해요!";
      optionHints['-어요'] = "'하다' 동사는 '-어요'가 아니라 '-해요'가 문법에 맞아요!";
      optionHints['-으요'] = "'-으요'라는 어미는 쓸 수 없어요. '하다 → 해요'예요!";
      break;
    case 'unit4':
      correctOption = '-아요';
      distractors = ['-어요', '-해요', '-으요'];
      optionHints['-어요'] = "어간이 변신해도 'ㅏ·ㅗ' 계열이므로 '-어요'는 비문이에요. '-아요'예요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'는 쓸 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! '-아요'가 맞아요.";
      cueBadge = '★ 변신 (ㅏ·ㅗ 계열)';
      break;
    case 'unit5':
      correctOption = '-어요';
      distractors = ['-아요', '-해요', '-으요'];
      optionHints['-아요'] = "이 어간은 'ㅏ·ㅗ'가 아니므로 '-아요'가 아니라 '-어요'가 맞아요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! '-어요'를 골라요.";
      cueBadge = '★ 변신 (ㅓ·ㅜ·ㅡ 계열)';
      break;
    case 'unit6':
    case 'unit9':
      correctOption = '-았어요';
      distractors = ['-었어요', '-해요', '-으어요'];
      cueBadge = unit === 'unit9' ? '🕰️ 과거 ★변신' : '🕰️ 과거';
      optionHints['-었어요'] = "어간에 'ㅏ·ㅗ'가 있으므로 '-었어요'는 비문이에요! '-았어요'가 맞아요.";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으어요'] = "'-으어요'라는 어미는 한국어에 없어요!";
      break;
    case 'unit7':
    case 'unit10':
      if (unit === 'unit10' && card.baseWord === '까맣다') {
        correctOption = '-았어요';
        distractors = ['-었어요', '-해요', '-으어요'];
        optionHints['-었어요'] = "'까맣-'에는 밝은 모음 'ㅏ'가 있어서 '-었어요'가 아니라 '-았어요'예요!";
        optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 쓸 수 없어요!";
        optionHints['-으어요'] = "'-으어요'라는 어미는 문법에 맞지 않아요!";
      } else {
        correctOption = '-었어요';
        distractors = ['-았어요', '-해요', '-으어요'];
        optionHints['-았어요'] = "어간에 'ㅏ·ㅗ'가 없으므로 '-았어요'는 비문이에요! '-었어요'가 맞아요.";
        optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
        optionHints['-으어요'] = "'-으어요'라는 어미는 문법에 맞지 않아요!";
      }
      cueBadge = unit === 'unit10' ? '🕰️ 과거 ★변신' : '🕰️ 과거';
      break;
    case 'unit8':
      correctOption = '-했어요';
      distractors = ['-았어요', '-었어요', '-으어요'];
      cueBadge = '🕰️ 과거 (하다)';
      optionHints['-았어요'] = "'하다' 동사의 과거형은 '-았어요'가 아니라 '-했어요'예요!";
      optionHints['-었어요'] = "'하다' 동사의 과거형은 '-었어요'가 아니라 '-했어요'예요!";
      optionHints['-으어요'] = "'-으어요'라는 어미는 쓸 수 없어요. '하다 → 했어요'예요!";
      break;
    case 'unit11': {
      const isAn = card.conjugatedWord.startsWith('안 ');
      const endType = card.conjugatedEnding === '아요' ? '아요' : '어요';
      cueBadge = isAn ? '🙅 안 (안 함 · 의지)' : '🚫 못 (못 함 · 불가)';
      correctOption = `${isAn ? '안' : '못'} ~${endType}`;
      distractors = ['안 ~아요', '안 ~어요', '못 ~아요', '못 ~어요'].filter(
        (x) => x !== correctOption
      );
      for (const d of distractors) {
        if (d.startsWith(isAn ? '못' : '안')) {
          optionHints[d] = isAn
            ? "배지 확인! 스스로 하지 않는 '🙅 안' 부정 표현이에요!"
            : "배지 확인! 할 수 없는 '🚫 못' 부정 표현이에요!";
        } else {
          optionHints[d] = `모음 조화에 맞춰 어미가 '~${endType}'로 끝나야 비문이 되지 않아요!`;
        }
      }
      break;
    }
    case 'unit12': {
      const isAn = card.conjugatedEnding.startsWith('안');
      cueBadge = isAn ? '🙅 안 (의지 부정)' : '🚫 못 (능력·상황 부정)';
      correctOption = isAn ? '안 해요' : '못 해요';
      distractors = ['안 해요', '못 해요', '안 아요', '못 어요'].filter(
        (x) => x !== correctOption
      );
      optionHints[isAn ? '못 해요' : '안 해요'] = isAn
        ? "배지 확인! 스스로 안 하는 '🙅 안 해요'가 맞아요!"
        : "배지 확인! 능력·상황상 어려운 '🚫 못 해요'가 맞아요!";
      optionHints['안 아요'] = "'하다' 동사는 '-아요'가 아니라 '-해요'와 결합해요!";
      optionHints['못 어요'] = "'하다' 동사는 '-어요'가 아니라 '-해요'와 결합해요!";
      break;
    }
    case 'unit13':
      correctOption = isHada ? '-하고 싶어요' : '-고 싶어요';
      distractors = isHada
        ? ['-고 싶어요', '-으고 싶어요', '-아 싶어요']
        : ['-하고 싶어요', '-으고 싶어요', '-아 싶어요'];
      optionHints[isHada ? '-고 싶어요' : '-하고 싶어요'] = isHada
        ? "명사 뒤에 '하다'가 꼭 들어가야 하므로 '-하고 싶어요'예요!"
        : "'하다' 동사가 아니므로 '-하고' 없이 바로 '-고 싶어요'를 붙여요!";
      optionHints['-으고 싶어요'] = "'-고' 앞에는 '으'를 넣지 않아요!";
      optionHints['-아 싶어요'] = "희망을 말할 때는 '-아'가 아니라 '-고 싶어요'예요!";
      break;
    case 'unit14':
      correctOption = isHada ? '-하고 있어요' : '-고 있어요';
      distractors = isHada
        ? ['-고 있어요', '-으고 있어요', '-고 있아요']
        : ['-하고 있어요', '-으고 있어요', '-고 있아요'];
      optionHints[isHada ? '-고 있어요' : '-하고 있어요'] = isHada
        ? "명사 뒤에 '하다'가 살아 있어야 하므로 '-하고 있어요'예요!"
        : "'하다' 동사가 아니므로 '-하고' 없이 바로 '-고 있어요'를 붙여요!";
      optionHints['-으고 있어요'] = "'-고' 앞에는 '으'를 붙이지 않아요!";
      optionHints['-고 있아요'] = "'있-' 뒤에는 '-아요'가 아니라 '-어요'가 와야 해요 ('있어요')!";
      break;
    case 'unit15': {
      correctOption = isHada
        ? '-하세요'
        : card.conjugatedEnding.startsWith('으')
        ? '-으세요'
        : '-세요';
      distractors = ['-세요', '-으세요', '-하세요', '-아세요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      optionHints['-세요'] = "어간 끝에 받침이 남았으니 '-으세요'를 붙여야 발음이 자연스러워요!";
      optionHints['-으세요'] = isHada
        ? "'하다' 동사는 '-하세요'로 결합해요!"
        : "받침이 없거나 'ㄹ' 받침 뒤에는 '으' 없이 바로 '-세요'를 붙여요!";
      optionHints['-하세요'] = "'하다' 동사가 아니므로 '-하세요'는 비문이에요!";
      optionHints['-아세요'] = "요청·명령을 나타내는 어미는 '-아세요'가 아니라 '-(으)세요'예요!";
      break;
    }
    case 'unit16':
      correctOption = '-지 마세요';
      distractors = ['-으지 마세요', '-지 마아요', '-지 마해요'];
      cueBadge = '🚫 금지 부탁';
      optionHints['-으지 마세요'] = "'-지' 앞에는 '으'를 넣지 않고 어간에 바로 '-지 마세요'를 붙여요!";
      optionHints['-지 마아요'] = "'말다+세요'는 '마아요'가 아니라 '-지 마세요'예요!";
      optionHints['-지 마해요'] = "금지 표현의 끝은 '-마해요'가 아니라 '-지 마세요'예요!";
      break;
    case 'unit17':
      correctOption =
        card.conjugatedEnding === ' 거예요'
          ? '- 거예요'
          : card.conjugatedEnding.startsWith('을')
          ? '-을 거예요'
          : '-ㄹ 거예요';
      distractors = ['-ㄹ 거예요', '-을 거예요', '- 거예요', '-으 거예요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🚀 미래 계획';
      optionHints['-ㄹ 거예요'] = "어간 끝 받침이 남아 있으니 '-을 거예요'가 문법에 맞아요!";
      optionHints['-을 거예요'] = "받침이 없거나 'ㄹ' 받침일 때는 '-을'을 붙이면 비문이에요!";
      optionHints['- 거예요'] = "'ㄹ' 받침이 이미 있는 어간이 아니면 '- 거예요'만 붙일 수 없어요!";
      optionHints['-으 거예요'] = "미래 어미에는 ㄹ 받침이 필요해요 ('-(으)ㄹ 거예요')!";
      break;
    case 'unit18':
      if (isHada) correctOption = '-해 주세요';
      else if (card.vowelHint.includes('ㅏ') || card.conjugatedEnding.startsWith('아'))
        correctOption = '-아 주세요';
      else correctOption = '-어 주세요';
      distractors = ['-아 주세요', '-어 주세요', '-해 주세요', '-으 주세요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      optionHints['-아 주세요'] = "어간 모음에 맞게 '-어 주세요' 또는 '-해 주세요'를 써야 해요!";
      optionHints['-어 주세요'] = "어간에 'ㅏ·ㅗ'가 있거나 '하다' 동사일 땐 '-어 주세요'가 비문이에요!";
      optionHints['-해 주세요'] = "'하다' 동사가 아니므로 '-해 주세요'를 붙일 수 없어요!";
      optionHints['-으 주세요'] = "'-으 주세요'라는 형태는 문법에 없어요! '-아/어/해 주세요'예요.";
      break;
    case 'unit19':
      if (isHada) correctOption = '-해도 돼요?';
      else if (card.vowelHint.includes('ㅏ')) correctOption = '-아도 돼요?';
      else correctOption = '-어도 돼요?';
      distractors = ['-아도 돼요?', '-어도 돼요?', '-해도 돼요?', '-으도 돼요?']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🙋 허락 구하기';
      optionHints['-아도 돼요?'] = "'ㅏ·ㅗ'가 없을 땐 '-어도 돼요?'로 써야 자연스러워요!";
      optionHints['-어도 돼요?'] = "'ㅏ·ㅗ' 계열 어간이나 '하다' 동사에는 '-어도 돼요?'가 비문이에요!";
      optionHints['-해도 돼요?'] = "'하다' 동사가 아니므로 '-해도 돼요?'는 붙일 수 없어요!";
      optionHints['-으도 돼요?'] = "'-으도 돼요?'는 없는 형태예요! '-아/어/해도 돼요?'를 골라요.";
      break;
    case 'unit20':
      if (isHada) correctOption = '-해야 돼요';
      else if (
        card.vowelHint.includes('ㅏ 발견') ||
        card.vowelHint.includes('바르+아') ||
        card.conjugatedEnding.startsWith('아')
      ) {
        correctOption = '-아야 돼요';
      } else {
        correctOption = '-어야 돼요';
      }
      distractors = ['-아야 돼요', '-어야 돼요', '-해야 돼요', '-으야 돼요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '📌 의무';
      optionHints['-아야 돼요'] = "어간 모음 조화에 맞게 '-어야 돼요' 또는 '-해야 돼요'가 맞아요!";
      optionHints['-어야 돼요'] = "'ㅏ·ㅗ' 계열이나 '하다' 동사 뒤엔 '-어야 돼요'가 비문이에요!";
      optionHints['-해야 돼요'] = "'하다' 동사가 아니므로 '-해야 돼요'를 쓸 수 없어요!";
      optionHints['-으야 돼요'] = "'-으야 돼요'라는 어미는 한국어에 없어요!";
      break;
    case 'unit21': {
      const isPossible = card.conjugatedWord.includes('있어요');
      cueBadge = isPossible ? '⭕ 가능 (할 수 있음)' : '❌ 불가능 (할 수 없음)';
      if (card.conjugatedEnding.trim() === '수 있어요') correctOption = '- 수 있어요';
      else if (card.conjugatedEnding.startsWith('을'))
        correctOption = isPossible ? '-을 수 있어요' : '-을 수 없어요';
      else correctOption = isPossible ? '-ㄹ 수 있어요' : '-ㄹ 수 없어요';

      const suf = isPossible ? '있어요' : '없어요';
      const oppSuf = isPossible ? '없어요' : '있어요';
      distractors = [
        `-ㄹ 수 ${suf}`,
        `-을 수 ${suf}`,
        `- 수 ${suf}`,
        `-으 수 ${suf}`,
        `-ㄹ 수 ${oppSuf}`,
      ]
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      for (const d of distractors) {
        if (d.endsWith(oppSuf)) {
          optionHints[d] = isPossible
            ? "배지 확인! 할 수 있음('⭕ 가능')이므로 '있어요'를 골라야 해요!"
            : "배지 확인! 할 수 없음('❌ 불가능')이므로 '없어요'를 골라야 해요!";
        } else {
          optionHints[d] = "받침 유무(받침 O → -을, 받침 X → -ㄹ, ㄹ받침 → - 수)에 맞는 형태만 문법에 맞아요!";
        }
      }
      break;
    }
    case 'unit22':
      correctOption = isHada
        ? '-할까요?'
        : card.conjugatedEnding.startsWith('을')
        ? '-을까요?'
        : '-ㄹ까요?';
      distractors = ['-ㄹ까요?', '-을까요?', '-할까요?', '-으까요?']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🤝 제안하기';
      optionHints['-ㄹ까요?'] = "받침이 남는 어간에는 '-을까요?'가 붙어야 자연스러워요!";
      optionHints['-을까요?'] = "받침이 없거나 '하다' 동사에는 '-을까요?'를 붙이면 비문이에요!";
      optionHints['-할까요?'] = "'하다' 동사가 아니므로 '-할까요?'는 쓸 수 없어요!";
      optionHints['-으까요?'] = "'-으까요?'는 비문이에요! ㄹ 받침이 들어간 '-(으)ㄹ까요?'예요.";
      break;
    case 'unit23':
      correctOption = isHada ? '-하고' : '-고';
      distractors = isHada ? ['-고', '-으고', '-아고'] : ['-하고', '-으고', '-아고'];
      optionHints[isHada ? '-고' : '-하고'] = isHada
        ? "명사+'하다' 형태이므로 '-하고'를 붙여야 문장이 완성돼요!"
        : "'하다' 동사가 아니므로 바로 '-고'를 붙여요!";
      optionHints['-으고'] = "'-고' 앞에는 '으'를 넣지 않아요!";
      optionHints['-아고'] = "나열 연결 어미는 '-아고'가 아니라 '-고 / -하고'예요!";
      break;
    case 'unit24':
      correctOption = '-지만';
      distractors = ['-하지만', '-으지만', '-아지만'];
      cueBadge = '⚖️ 대조 연결';
      optionHints['-하지만'] = "'하다' 동사가 아닌데 '-하지만'을 붙이면 비문이에요!";
      optionHints['-으지만'] = "'-지만' 앞에는 '으'가 들어가지 않아요!";
      optionHints['-아지만'] = "'-지만'은 어간에 바로 붙어요 ('-아지만' ❌)!";
      break;
    case 'unit25':
      correctOption = isHada ? '-해서' : card.conjugatedEnding.startsWith('아') ? '-아서' : '-어서';
      distractors = ['-아서', '-어서', '-해서', '-으서']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '💡 이유·원인';
      optionHints['-아서'] = "어간 모음에 맞게 '-어서' 또는 '-해서'를 골라야 해요!";
      optionHints['-어서'] = "'ㅏ·ㅗ'가 있거나 '하다' 동사 뒤엔 '-어서'가 비문이에요!";
      optionHints['-해서'] = "'하다' 동사가 아니므로 '-해서'를 붙일 수 없어요!";
      optionHints['-으서'] = "이유 어미는 '-으서'가 아니라 '-아서/어서/해서'예요!";
      break;
    case 'unit26':
      correctOption = isHada
        ? '-하면'
        : card.conjugatedEnding.startsWith('으')
        ? '-으면'
        : '-면';
      distractors = ['-면', '-으면', '-하면', '-아면']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🔮 조건 (~하면)';
      optionHints['-면'] = "어간 끝 받침이 남아 있으니 '-으면'을 써야 해요!";
      optionHints['-으면'] = "받침이 없거나 'ㄹ' 받침·'하다' 동사에는 '-으면'이 비문이에요!";
      optionHints['-하면'] = "'하다' 동사가 아니므로 '-하면'은 붙일 수 없어요!";
      optionHints['-아면'] = "조건 어미는 '-아면'이 아니라 '-(으)면'이에요!";
      break;
    case 'unit27':
      correctOption = isHada
        ? '-할 때'
        : card.conjugatedEnding.startsWith('을')
        ? '-을 때'
        : '-ㄹ 때';
      distractors = ['-ㄹ 때', '-을 때', '-할 때', '-으 때']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '⏱️ 시간 (~할 때)';
      optionHints['-ㄹ 때'] = "받침이 남는 어간에는 '-을 때'가 붙어야 해요!";
      optionHints['-을 때'] = "받침이 없거나 'ㄹ' 받침·'하다' 동사에는 '-을 때'가 비문이에요!";
      optionHints['-할 때'] = "'하다' 동사가 아니므로 '-할 때'는 쓸 수 없어요!";
      optionHints['-으 때'] = "'-으 때'가 아니라 '-(으)ㄹ 때'로 ㄹ 받침이 들어가야 해요!";
      break;
    case 'unit28': {
      const isCome = card.conjugatedWord.includes('와요');
      if (isCome) {
        cueBadge = '🏫 목적 (~러 와요)';
        correctOption = '-하러 와요';
        distractors = ['-러 와요', '-으러 와요', '-아러 와요'];
        optionHints['-러 와요'] = "명사+'하다'는 '하'가 있어야 하므로 '-하러 와요'예요!";
        optionHints['-으러 와요'] = "'하다' 동사는 '-하러 와요'로 연결해요!";
        optionHints['-아러 와요'] = "'-아러 와요'라는 표현은 문법에 없어요!";
      } else {
        cueBadge = '🚶 목적 (~러 가요)';
        correctOption = isHada
          ? '-하러 가요'
          : card.conjugatedEnding.startsWith('으')
          ? '-으러 가요'
          : '-러 가요';
        distractors = ['-러 가요', '-으러 가요', '-하러 가요', '-아러 가요']
          .filter((x) => x !== correctOption)
          .slice(0, 3);
        optionHints['-러 가요'] = "받침이 남아 있는 어간 뒤에는 '-으러 가요'를 붙여야 해요!";
        optionHints['-으러 가요'] = "받침이 없거나 'ㄹ' 받침·'하다' 동사 뒤에는 '-으러'가 비문이에요!";
        optionHints['-하러 가요'] = "'하다' 동사가 아니므로 '-하러 가요'는 쓸 수 없어요!";
        optionHints['-아러 가요'] = "목적 어미는 '-아러 가요'가 아니라 '-(으)러 가요'예요!";
      }
      break;
    }
    case 'unit29': {
      const isBefore = card.conjugatedWord.includes('전에');
      cueBadge = isBefore ? '⏪ 순서 (~전에)' : '⏩ 순서 (~후에)';
      if (isBefore) {
        correctOption = isHada ? '-하기 전에' : '-기 전에';
        distractors = isHada
          ? ['-기 전에', '-으기 전에', '-아기 전에']
          : ['-하기 전에', '-으기 전에', '-아기 전에'];
        optionHints['-기 전에'] = "'하다' 동사는 '하'가 남아 '-하기 전에'가 맞아요!";
        optionHints['-하기 전에'] = "'하다' 동사가 아니므로 바로 '-기 전에'를 붙여요!";
        optionHints['-으기 전에'] = "'-기' 앞에는 '으'를 붙이지 않아요!";
        optionHints['-아기 전에'] = "순서 표현은 '-아기 전에'가 아니라 '-(하)기 전에'예요!";
      } else {
        correctOption = isHada
          ? '-한 후에'
          : card.conjugatedEnding.startsWith('은')
          ? '-은 후에'
          : '-ㄴ 후에';
        distractors = ['-ㄴ 후에', '-은 후에', '-한 후에', '-으 후에']
          .filter((x) => x !== correctOption)
          .slice(0, 3);
        optionHints['-ㄴ 후에'] = "받침이 있는 어간에는 '-은 후에'가 자연스러워요!";
        optionHints['-은 후에'] = "받침이 없거나 'ㄹ'·모음 어간 예외에는 '-ㄴ 후에'가 붙어요!";
        optionHints['-한 후에'] = "'하다' 동사가 아니므로 '-한 후에'는 쓸 수 없어요!";
        optionHints['-으 후에'] = "'-으 후에'가 아니라 ㄴ 받침이 있는 '-(으)ㄴ 후에'예요!";
      }
      break;
    }
    case 'unit30':
      correctOption = isHada
        ? '-해 봤어요'
        : card.conjugatedEnding.startsWith('아')
        ? '-아 봤어요'
        : '-어 봤어요';
      distractors = ['-아 봤어요', '-어 봤어요', '-해 봤어요', '-으 봤어요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🌟 경험 (~해 봤어요)';
      optionHints['-아 봤어요'] = "어간 모음에 맞게 '-어 봤어요' 또는 '-해 봤어요'를 써야 해요!";
      optionHints['-어 봤어요'] = "'ㅏ·ㅗ'가 있거나 '하다' 동사 뒤엔 '-어 봤어요'가 비문이에요!";
      optionHints['-해 봤어요'] = "'하다' 동사가 아니므로 '-해 봤어요'는 쓸 수 없어요!";
      optionHints['-으 봤어요'] = "경험 어미는 '-으 봤어요'가 아니라 '-아/어/해 봤어요'예요!";
      break;
    default: {
      const guessedPresent = PRESENT_BY_PAST_GROUP[`-${card.conjugatedEnding.trim()}`];
      correctOption = `-${card.conjugatedEnding.trim()}`;
      distractors = ['-아요', '-어요', '-해요', ...(guessedPresent ? [guessedPresent] : [])]
        .filter((x) => x !== correctOption)
        .slice(0, 3);
    }
  }

  const uniqueDistractors = Array.from(new Set(distractors))
    .filter((d) => d !== correctOption)
    .slice(0, 3);
  const options = [correctOption, ...uniqueDistractors].sort(() => 0.5 - Math.random());

  return {
    unitId: unit,
    card,
    stemDisplay,
    baseEnding,
    cueBadge,
    correctOption,
    options,
    optionHints,
  };
}

export const VerbKartQuizSection: React.FC<VerbKartQuizSectionProps> = ({
  lang,
  selectedUnit: propUnit,
  onSelectUnit,
  hideUnitBar = false,
}) => {
  const [internalUnit, setInternalUnit] = useState<VerbUnitType>(propUnit || 'unit1');
  const activeUnit = propUnit ?? internalUnit;

  const currentUnitMeta = useMemo(
    () => VERB_UNIT_META.find((u) => u.id === activeUnit) || VERB_UNIT_META[0],
    [activeUnit]
  );

  const TOTAL_STOPS = 5;
  const [stops, setStops] = useState(0);
  const [queue, setQueue] = useState<VerbCardItem[]>([]);
  const [queueIdx, setQueueIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<VerbEndingQuestion | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showHazardSign, setShowHazardSign] = useState(false);
  const [isArrivalModalOpen, setIsArrivalModalOpen] = useState(false);

  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);
  const advanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startNewGame = (unitId: VerbUnitType) => {
    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);

    const cards = VERB_CARDS_BY_UNIT[unitId] || VERB_CARDS_BY_UNIT.unit1;
    const shuffled = [...cards].sort(() => 0.5 - Math.random()).slice(0, TOTAL_STOPS);
    setQueue(shuffled);
    setQueueIdx(0);
    setStops(0);
    setStreak(0);
    setIsArrivalModalOpen(false);
    setShowHazardSign(false);

    if (shuffled[0]) {
      const q = buildVerbEndingQuestion(unitId, shuffled[0]);
      setCurrentQuestion(q);
      setWrongAttempts([]);
      setIsAnswered(false);
      audioTimerRef.current = setTimeout(() => {
        speakKorean(shuffled[0].baseWord, 0.88);
      }, 260);
    }
  };

  useEffect(() => {
    startNewGame(activeUnit);
    return () => {
      if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, [activeUnit]);

  const loadQuestion = (unitId: VerbUnitType, card: VerbCardItem) => {
    const q = buildVerbEndingQuestion(unitId, card);
    setCurrentQuestion(q);
    setWrongAttempts([]);
    setIsAnswered(false);
    setShowHazardSign(false);

    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    audioTimerRef.current = setTimeout(() => {
      speakKorean(card.baseWord, 0.88);
    }, 240);
  };

  const handleSelectEnding = (opt: string) => {
    if (isAnswered || !currentQuestion) return;

    const isCorrect = opt === currentQuestion.correctOption;

    if (isCorrect) {
      playCutePop();
      playSuccessChime();
      setIsAnswered(true);
      setShowHazardSign(false);
      setStreak((prev) => prev + 1);

      const nextStop = stops + 1;
      setStops(nextStop);

      setTimeout(() => {
        speakKorean(currentQuestion.card.conjugatedWord, 0.9);
      }, 220);

      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      if (nextStop >= TOTAL_STOPS) {
        advanceTimerRef.current = setTimeout(() => {
          playApplauseFanfare();
          try {
            confetti({
              particleCount: 110,
              spread: 85,
              origin: { y: 0.55 },
              colors: ['#7E22CE', '#A855F7', '#FACC15', '#EC4899', '#10B981'],
            });
          } catch {
            // ignore
          }
          setIsArrivalModalOpen(true);
        }, 1200);
      } else {
        advanceTimerRef.current = setTimeout(() => {
          const nextIdx = queueIdx + 1;
          setQueueIdx(nextIdx);
          if (queue[nextIdx]) {
            loadQuestion(activeUnit, queue[nextIdx]);
          }
        }, 1350);
      }
    } else {
      playBeethovenFateMemeSound();
      setStreak(0);
      setShowHazardSign(true);
      setWrongAttempts((prev) => (prev.includes(opt) ? prev : [...prev, opt]));
      setTimeout(() => {
        setShowHazardSign(false);
      }, 1300);
    }
  };

  const handleNextUnit = () => {
    playCutePop();
    const idx = VERB_UNIT_META.findIndex((u) => u.id === activeUnit);
    const nextMeta = VERB_UNIT_META[(idx + 1) % VERB_UNIT_META.length];
    setInternalUnit(nextMeta.id);
    onSelectUnit?.(nextMeta.id);
  };

  const labelsDict: Record<
    SupportedLanguage | 'ko',
    {
      prompt: string;
      replayBase: string;
      cheerMessage: string;
      destinationReached: string;
      nextCourseBtn: string;
      replayCourseBtn: string;
    }
  > = {
    ko: {
      prompt: '어간 카드를 보고 아래에서 알맞은 어미 버튼을 골라 카트를 출발시키세요!',
      replayBase: '🔊 기본형 다시 듣기',
      cheerMessage: '부릉부릉~ 결합 성공! 🚗💨',
      destinationReached: '결합 카트 완주 성공! 🏁',
      nextCourseBtn: '다음 단원 코스로 달리기 🚗💨',
      replayCourseBtn: '이 단원 다시 달리기 🔁',
    },
    en: {
      prompt: 'Check the verb stem and choose the matching ending to launch the kart!',
      replayBase: '🔊 Hear Base Verb',
      cheerMessage: 'Vroom~ Conjugated! 🚗💨',
      destinationReached: 'Verb Kart Race Complete! 🏁',
      nextCourseBtn: 'Next Unit Course 🚗💨',
      replayCourseBtn: 'Replay This Unit 🔁',
    },
    vi: {
      prompt: 'Xem gốc động từ và chọn đuôi chia phù hợp để xe chạy nhé!',
      replayBase: '🔊 Nghe dạng gốc',
      cheerMessage: 'Vù vù~ Ghép đúng rồi! 🚗💨',
      destinationReached: 'Về đích thành công! 🏁',
      nextCourseBtn: 'Chặng đơn vị tiếp theo 🚗💨',
      replayCourseBtn: 'Chơi lại đơn vị này 🔁',
    },
    bn: {
      prompt: 'ক্রিয়ার মূল দেখে সঠিক শেষাংশ নির্বাচন করে কার্ট চালান!',
      replayBase: '🔊 মূল শব্দ শুনুন',
      cheerMessage: 'দারুণ! সঠিক সংযোগ! 🚗💨',
      destinationReached: 'গন্তব্যে পৌঁছে গেছ! 🏁',
      nextCourseBtn: 'পরবর্তী ইউনিটে চলুন 🚗💨',
      replayCourseBtn: 'আবার খেলুন 🔁',
    },
    zh: {
      prompt: '查看词干卡片，选择正确的词尾让卡丁车冲刺吧！',
      replayBase: '🔊 重听原形',
      cheerMessage: '嘟嘟~ 变形成功！🚗💨',
      destinationReached: '卡丁车语法冲刺终点！🏁',
      nextCourseBtn: '前往下一单元赛道 🚗💨',
      replayCourseBtn: '重玩本单元 🔁',
    },
    ru: {
      prompt: 'Посмотрите на основу слова и выберите нужное окончание!',
      replayBase: '🔊 Слушать основу',
      cheerMessage: 'Врум~ Верно! 🚗💨',
      destinationReached: 'Финиш! Отличная работа! 🏁',
      nextCourseBtn: 'Следующий раздел 🚗💨',
      replayCourseBtn: 'Пройти снова 🔁',
    },
    ja: {
      prompt: '語幹カードを見て、合う語尾を選んでカートを出発させよう！',
      replayBase: '🔊 基本形を聴く',
      cheerMessage: 'ブーブー！結合成功！🚗💨',
      destinationReached: 'ゴールに到着しました！🏁',
      nextCourseBtn: '次の単元へ 🚗💨',
      replayCourseBtn: 'もう一度走る 🔁',
    },
    mn: {
      prompt: 'Үгийн үндсийг хараад зөв нөхцөлийг сонгон машинаа хөдөлгөөрэй!',
      replayBase: '🔊 Үндсэн хэлбэр сонсох',
      cheerMessage: 'Зөв холболоо! 🚗💨',
      destinationReached: 'Барианд амжилттай орлоо! 🏁',
      nextCourseBtn: 'Дараагийн хичээл рүү 🚗💨',
      replayCourseBtn: 'Дахин тоглох 🔁',
    },
  };

  const labels = labelsDict[lang as SupportedLanguage | 'ko'] || labelsDict.ko;
  if (!currentQuestion) return null;

  const carLeftPercent = Math.min(88, 3 + (stops / TOTAL_STOPS) * 85);
  const meaningText =
    currentQuestion.card.meanings[lang] || currentQuestion.card.meanings.en;

  return (
    <div className="w-full space-y-1 sm:space-y-1.5 max-w-4xl mx-auto font-korean-gothic overflow-x-clip">
      {!hideUnitBar && (
        <div className="sticky top-[80px] sm:top-[90px] z-[22] bg-[#FFF5F8]/95 backdrop-blur-md pb-1 w-full">
          <div className="relative w-full max-w-md mx-auto">
            <select
              value={activeUnit}
              onChange={(e) => {
                playCutePop();
                const u = e.target.value as VerbUnitType;
                setInternalUnit(u);
                onSelectUnit?.(u);
              }}
              className="w-full h-8 sm:h-8.5 pl-3 pr-8 rounded-none bg-white hover:bg-purple-50/80 border border-purple-300 text-purple-950 font-black text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-400 font-korean-gothic shadow-none truncate"
              title="용언 활용 단원 선택"
            >
              {VERB_UNIT_META.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-purple-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Main Purple Speed Quiz Kart Stage */}
      <div className="bg-[#FAF5FF] border-2 border-purple-300 rounded-lg p-3 sm:p-5 shadow-md shadow-purple-200/40 flex flex-col font-korean-gothic">
        {/* Top Bar: Unit Tag + Sound Button + Speed Streak */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="text-[11px] sm:text-xs font-black text-purple-950 bg-purple-200 border border-purple-300 px-2.5 py-1 rounded-sm truncate max-w-[230px] sm:max-w-xs">
            {currentUnitMeta.circled} {currentUnitMeta.grammar}
          </span>

          <div className="flex items-center gap-1.5 ml-auto">
            {streak > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-200 text-amber-950 border border-amber-400 px-2 py-1 rounded-sm">
                <Zap className="w-3.5 h-3.5 text-amber-800 fill-amber-500" />
                <span>{streak} 연속!</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                playCutePop();
                speakKorean(
                  isAnswered
                    ? currentQuestion.card.conjugatedWord
                    : currentQuestion.card.baseWord,
                  0.88
                );
              }}
              className="h-8 sm:h-9 px-3 sm:px-4 rounded-md bg-[#7E22CE] hover:bg-purple-800 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              title={labels.replayBase}
            >
              <Volume2 className="w-4 h-4" />
              <span>{labels.replayBase}</span>
            </button>
          </div>
        </div>

        {/* Kart Track (5 Checkpoints) */}
        <div className="relative h-24 sm:h-28 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 rounded-lg border-2 border-slate-600 shadow-inner overflow-hidden flex items-center px-3 sm:px-6 mb-3 select-none">
          <div className="absolute inset-x-0 h-1 top-1 bg-purple-400/60" />
          <div className="absolute inset-x-0 h-1 bottom-1 bg-purple-400/60" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0 border-t-2 border-dashed border-white/60 w-full pointer-events-none" />

          <div className="relative w-full flex items-center justify-between px-2 sm:px-5 pointer-events-none z-10">
            {Array.from({ length: TOTAL_STOPS }).map((_, i) => {
              const stopIdx = i + 1;
              const isReached = stops >= stopIdx;
              const isDestination = stopIdx === TOTAL_STOPS;
              return (
                <div key={stopIdx} className="flex flex-col items-center justify-center">
                  <span
                    className={`text-lg sm:text-2xl transition-all duration-400 ${
                      isReached
                        ? 'scale-125 drop-shadow-[0_2px_8px_rgba(255,255,255,0.85)]'
                        : 'opacity-40 grayscale scale-90'
                    }`}
                  >
                    {isDestination ? '🏁' : '⚡'}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[11px] font-black mt-0.5 rounded-sm px-1.5 py-0.5 ${
                      isReached
                        ? 'bg-amber-300 text-slate-900'
                        : 'text-slate-400 bg-slate-900/70'
                    }`}
                  >
                    {isDestination ? '도착' : `${stopIdx}`}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="absolute z-20 flex items-center select-none"
            style={{
              left: `${carLeftPercent}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              transition: 'left 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {isAnswered && (
              <div className="absolute -top-8 -left-4 whitespace-nowrap bg-white text-purple-950 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-sm shadow-md border-2 border-purple-400 animate-bounce z-30">
                {labels.cheerMessage}
              </div>
            )}
            <div className="relative flex items-center">
              <span className="text-3xl sm:text-4xl inline-block scale-x-[-1] drop-shadow-md">
                🏎️
              </span>
              {isAnswered && (
                <span className="absolute -left-3 text-sm sm:text-base animate-ping opacity-85">
                  💨
                </span>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showHazardSign && (
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/55 backdrop-blur-[1px] pointer-events-none"
              >
                <div className="bg-rose-600 text-white font-black px-4 py-2 rounded-md shadow-xl border-2 border-amber-300 flex items-center gap-2 text-xs sm:text-sm">
                  <span>🛑</span>
                  <span>어미가 안 맞아요! 다시 골라보세요!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Center 어간 카드 Prompt */}
        <div className="bg-white border-2 border-purple-200 rounded-lg p-3 sm:p-4 mb-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 shadow-2xs">
          {/* Illustration / Emoji */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-md bg-purple-50 border border-purple-200 flex items-center justify-center shrink-0 p-1.5">
            {currentQuestion.card.illustrationSvg ? (
              <img
                src={currentQuestion.card.illustrationSvg}
                alt={currentQuestion.card.baseWord}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-4xl sm:text-5xl">{currentQuestion.card.emojiIcon || '✨'}</span>
            )}
          </div>

          {/* Stem + Target Ending Formula */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
              <span className="text-[11px] font-black text-purple-800 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-sm">
                기본형: {currentQuestion.card.baseWord}
              </span>
              {currentQuestion.cueBadge && (
                <span className="text-[11px] font-black text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-sm">
                  {currentQuestion.cueBadge}
                </span>
              )}
            </div>

            {!isAnswered ? (
              <div className="flex items-center gap-1.5 sm:gap-2 my-1">
                <span
                  style={{
                    fontFamily:
                      "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif",
                  }}
                  className="text-3xl sm:text-4xl font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-md border border-slate-300"
                >
                  {currentQuestion.stemDisplay}
                </span>
                <span className="text-purple-600 font-black text-lg">+</span>
                <span className="text-xl sm:text-2xl font-black text-purple-700 bg-purple-50 border-2 border-dashed border-purple-400 px-3.5 py-1.5 rounded-md animate-pulse">
                  ?
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 my-1"
              >
                <span
                  style={{
                    fontFamily:
                      "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif",
                  }}
                  className="text-3xl sm:text-4xl font-black text-[#7E22CE] bg-purple-100 px-4 py-1 rounded-md border-2 border-purple-400"
                >
                  {currentQuestion.card.conjugatedWord}
                </span>
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              </motion.div>
            )}

            <span className="text-xs sm:text-sm font-bold text-slate-600 mt-0.5">
              [{meaningText}]
            </span>
          </div>
        </div>

        {/* Ending Choice Buttons */}
        <div
          className={`grid gap-2 sm:gap-3 ${
            currentQuestion.options.length === 4
              ? 'grid-cols-2 sm:grid-cols-4'
              : 'grid-cols-3'
          }`}
        >
          {currentQuestion.options.map((opt) => {
            const isCorrectOpt = opt === currentQuestion.correctOption;
            const isWrong = wrongAttempts.includes(opt);
            const isChosenCorrect = isAnswered && isCorrectOpt;

            let btnStyle =
              'bg-white hover:bg-purple-100/80 border-2 border-purple-300 hover:border-[#7E22CE] text-purple-950 shadow-2xs';
            if (isChosenCorrect) {
              btnStyle =
                'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
            } else if (isWrong) {
              btnStyle =
                'bg-rose-50 border-2 border-rose-300 text-rose-800/65 line-through opacity-75';
            }

            return (
              <motion.button
                key={opt}
                type="button"
                disabled={isAnswered || isWrong}
                whileHover={!isAnswered && !isWrong ? { y: -2 } : {}}
                whileTap={!isAnswered && !isWrong ? { scale: 0.97 } : {}}
                onClick={() => handleSelectEnding(opt)}
                className={`min-h-[60px] sm:min-h-[70px] px-2.5 py-2.5 rounded-md font-black text-base sm:text-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${btnStyle}`}
              >
                <span
                  style={{
                    fontFamily:
                      "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif",
                  }}
                >
                  {opt}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div className="text-center mt-3 pt-2 border-t border-purple-200/70">
          <span className="text-xs sm:text-sm font-bold text-slate-600">
            {labels.prompt}
          </span>
        </div>
      </div>

      {/* Arrival Victory Modal */}
      <AnimatePresence>
        {isArrivalModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              className="bg-gradient-to-b from-white via-purple-50 to-violet-100 rounded-lg p-6 sm:p-8 max-w-md w-full shadow-2xl border-2 border-purple-400 text-center flex flex-col items-center font-korean-gothic"
            >
              <div className="text-5xl mb-2 animate-bounce">🏆</div>
              <h3 className="text-xl sm:text-2xl font-black text-purple-950 mb-1">
                {labels.destinationReached}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-purple-700 mb-5">
                {currentUnitMeta.circled} {currentUnitMeta.grammar} 용언 결합 5문제 완주! 👏
              </p>

              <div className="w-full flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleNextUnit}
                  className="w-full py-3 px-5 rounded-md bg-[#7E22CE] hover:bg-purple-800 active:scale-95 text-white font-black text-sm sm:text-base shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{labels.nextCourseBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    startNewGame(activeUnit);
                  }}
                  className="w-full py-2.5 px-4 rounded-md bg-white hover:bg-purple-100 text-purple-950 font-bold text-sm border border-purple-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{labels.replayCourseBtn}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
