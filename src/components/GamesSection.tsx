import React, { useState, useMemo } from 'react';
import { LayoutGrid } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, LearningTrack, LearningMethod, SUB_MENU_LABELS } from '../types';
import { UiLanguage, SUBTAB_UI, NAV_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { MemoryCardGameSection } from './MemoryCardGameSection';
import { HangeulBalloonGameSection } from './HangeulBalloonGameSection';
import { VerbManduCookingGameSection } from './VerbManduCookingGameSection';
import { ParticleArcadeQuiz, ParticleGameUnitId as ParticleSlingshotUnitId } from './ParticleArcadeQuiz';
import { HANGEUL_GROUPS } from './HangeulStrokeFlashcardSection';
import { VERB_UNIT_META, VERB_CARDS_BY_UNIT, VerbUnitType } from './VerbConjugationSection';
import { CompactUnitSelectButton } from './CompactUnitSelectButton';
import { DesktopControlBar } from './DesktopControlBar';
import { OverviewGridModal, OverviewCardItem } from './OverviewGridModal';
import { playCutePop } from '../utils/audio';
import {
  BadgeGameId,
  HallOfFameHeaderButton,
  GameBadgeAndHallOfFameModal,
} from '../utils/gameBadges';

export type ParticleGameUnitId = ParticleSlingshotUnitId;

export type GameType = 'kart' | 'balloon' | 'memory';

interface GamesSectionProps {
  track: LearningTrack;
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  selectedHangeulGroupId?: string;
  onSelectHangeulGroupId?: (groupId: string) => void;
  selectedVerbUnit?: VerbUnitType;
  onSelectVerbUnit?: (unit: VerbUnitType) => void;
  selectedParticleUnit?: ParticleGameUnitId;
  onSelectParticleUnit?: (unit: ParticleGameUnitId) => void;
  onSwitchTrackMethod?: (track: LearningTrack, method: LearningMethod) => void;
  activeMethod?: LearningMethod;
  onSelectMethod?: (method: LearningMethod) => void;
  isMenuCollapsed?: boolean;
}

export const GamesSection: React.FC<GamesSectionProps> = ({
  track,
  vocabulary,
  lang,
  uiLang = 'ko' as UiLanguage,
  selectedChapter = 1,
  onSelectChapter,
  selectedHangeulGroupId = HANGEUL_GROUPS[0]?.id || 'basic_consonants',
  onSelectHangeulGroupId,
  selectedVerbUnit = 'unit1',
  onSelectVerbUnit,
  selectedParticleUnit: controlledParticleUnit,
  onSelectParticleUnit,
  activeMethod = 'game',
  onSelectMethod,
  isMenuCollapsed = false,
}) => {
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isHallOfFameOpen, setIsHallOfFameOpen] = useState(false);
  const [localParticleUnit, setLocalParticleUnit] = useState<ParticleGameUnitId>('unit1');

  const activeBadgeGame: BadgeGameId =
    track === 'hangeul'
      ? 'balloon'
      : track === 'classroom'
      ? 'memory'
      : track === 'particle'
      ? 'slingshot'
      : 'mandu';

  const selectedParticleUnit = controlledParticleUnit ?? localParticleUnit;
  const setSelectedParticleUnit = (unit: ParticleGameUnitId) => {
    setLocalParticleUnit(unit);
    onSelectParticleUnit?.(unit);
  };

  const subLabels = SUB_MENU_LABELS[lang] || SUB_MENU_LABELS.en;
  const tabUi = SUBTAB_UI[uiLang] || SUBTAB_UI.ko;
  const navUi = NAV_UI[uiLang] || NAV_UI.ko;
  const menuExtras = MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko;
  const isKoUi = uiLang === 'ko';

  const hangeulOverviewItems = useMemo<OverviewCardItem[]>(() => {
    return HANGEUL_GROUPS.map((g, idx) => ({
      id: g.id,
      targetIdx: idx,
      pageLabel: `${idx + 1} / ${HANGEUL_GROUPS.length}`,
      title: g.titleKo,
      subtitle: `${g.cards.length}글자`,
      previewMain: g.cards[0]?.char || 'ㄱ',
      previewSecondary: g.cards[1]?.char,
      previewChips: g.cards.slice(0, 4).map(c => c.char),
      themeColor: 'amber',
      isActive: selectedHangeulGroupId === g.id,
    }));
  }, [selectedHangeulGroupId]);

  const classroomOverviewItems = useMemo<OverviewCardItem[]>(() => {
    return CHAPTER_LIST.map((chObj, idx) => {
      const chWords = vocabulary.filter(v => v.ch === chObj.ch);
      return {
        id: chObj.ch,
        targetIdx: chObj.ch,
        pageLabel: `${idx + 1} / ${CHAPTER_LIST.length}`,
        title: getChapterCircledTitle(chObj.ch, lang),
        subtitle: `${chWords.length}단어`,
        previewMain: chWords[0]?.ko || chObj.icon,
        previewSecondary: chWords[1]?.ko,
        previewChips: chWords.slice(0, 3).map(w => w.ko),
        themeColor: 'rose',
        isActive: selectedChapter === chObj.ch,
      };
    });
  }, [vocabulary, selectedChapter, lang]);

  const grammarOverviewItems = useMemo<OverviewCardItem[]>(() => {
    return VERB_UNIT_META.map((u, idx) => {
      const cards = VERB_CARDS_BY_UNIT[u.id] || [];
      return {
        id: u.id,
        targetIdx: idx,
        pageLabel: `${idx + 1} / ${VERB_UNIT_META.length}`,
        title: `${u.circled} ${u.grammar}`,
        subtitle: u.verbs.join(', '),
        previewMain: cards[0]?.baseWord || '가다',
        previewSecondary: cards[0]?.conjugatedWord,
        previewChips: cards.slice(0, 3).map(c => c.baseWord),
        themeColor: 'purple',
        isActive: selectedVerbUnit === u.id,
      };
    });
  }, [selectedVerbUnit]);

  const particleGameUnits = useMemo(
    () => [
      {
        id: 'unit1' as ParticleGameUnitId,
        groupLabel: menuExtras.overview.particleGroupLabel,
        label: '① 주제 (은, 는)',
        title: '① 주제 (은, 는)',
        subtitle: '나, 친구, 동생, 선생님, 가방',
        previewMain: '은 / 는',
        previewSecondary: '5문제',
        previewChips: ['나', '친구', '동생', '가방'],
      },
      {
        id: 'unit2' as ParticleGameUnitId,
        label: '② 소개 (이에요, 예요)',
        title: '② 소개 (이에요, 예요)',
        subtitle: '학생, 연필, 칠판, 의자, 지우개',
        previewMain: '이에요 / 예요',
        previewSecondary: '5문제',
        previewChips: ['학생', '연필', '의자', '지우개'],
      },
      {
        id: 'sentence1' as ParticleGameUnitId,
        label: '③ 문장 만들기 1 (은·는 / 이에요·예요)',
        title: '③ 문장 만들기 1',
        subtitle: '나는 남자예요, 너는 여자예요, 친구는 학생이에요',
        previewMain: '문장 만들기 1',
        previewSecondary: '5문제',
        previewChips: ['나는', '여자예요', '학생이에요', '동생은'],
      },
      {
        id: 'unit3' as ParticleGameUnitId,
        label: '④ 주격 (이, 가)',
        title: '④ 주격 (이, 가)',
        subtitle: '물, 책, 약, 배, 비누',
        previewMain: '이 / 가',
        previewSecondary: '5문제',
        previewChips: ['물이', '책이', '배가', '비누가'],
      },
      {
        id: 'unit4' as ParticleGameUnitId,
        label: '⑤ 주격 ★ (변화형)',
        title: '⑤ 주격 ★ (변화형)',
        subtitle: '내가, 네가, 제가, 누가, 이게',
        previewMain: '내가 / 이게 ★',
        previewSecondary: '5문제',
        previewChips: ['내가', '네가', '제가', '이게'],
      },
      {
        id: 'unit5' as ParticleGameUnitId,
        label: '⑥ 목적어 (을, 를)',
        title: '⑥ 목적어 (을, 를)',
        subtitle: '밥, 손, 무엇, 우유, 사과',
        previewMain: '을 / 를',
        previewSecondary: '5문제',
        previewChips: ['밥을', '손을', '우유를', '사과를'],
      },
      {
        id: 'sentence2' as ParticleGameUnitId,
        label: '⑦ 문장 만들기 2 (이·가 / 을·를)',
        title: '⑦ 문장 만들기 2',
        subtitle: '제가 창문을 열게요, 동생이 우유를 마셔요',
        previewMain: '문장 만들기 2',
        previewSecondary: '5문제',
        previewChips: ['창문을', '동생이', '그림을', '친구가'],
      },
      {
        id: 'unit6' as ParticleGameUnitId,
        label: '⑧ 장소·시간 (에, 에서)',
        title: '⑧ 장소·시간 (에, 에서)',
        subtitle: '에(5) + 에서(5) 섞어서 랜덤 출제',
        previewMain: '에 / 에서',
        previewSecondary: '랜덤 5문제',
        previewChips: ['학교에', '아침에', '교실에서', '도서관에서'],
      },
      {
        id: 'unit6_2' as ParticleGameUnitId,
        label: '⑨ 장소·동작 (에·에서2)',
        title: '⑨ 장소·동작 (에·에서2)',
        subtitle: '학교에서, 교실에, 운동장에, 도서관에서, 집에서',
        previewMain: '에 / 에서 2',
        previewSecondary: '심화 5문제',
        previewChips: ['학교에서', '교실에', '운동장에', '도서관에서'],
      },
      {
        id: 'unit7' as ParticleGameUnitId,
        label: '⑩ 추가 (도)',
        title: '⑩ 추가 (도)',
        subtitle: '나, 친구, 물, 사과, 우산',
        previewMain: '도',
        previewSecondary: '5문제',
        previewChips: ['나도', '친구도', '물도', '우산도'],
      },
      {
        id: 'sentence3' as ParticleGameUnitId,
        label: '⑪ 문장 만들기 3 (에·에서·도)',
        title: '⑪ 문장 만들기 3',
        subtitle: '나도 학교에 가요, 친구도 교실에서 공부해요',
        previewMain: '문장 만들기 3',
        previewSecondary: '5문제',
        previewChips: ['학교에', '친구도', '아침에', '운동장에서'],
      },
      {
        id: 'unit8' as ParticleGameUnitId,
        label: '⑫ 나열·동반 (와, 과, 하고, 이랑, 랑)',
        title: '⑫ 나열·동반 (와, 과, 하고, 이랑, 랑)',
        subtitle: '엄마, 우유, 연필, 책, 친구',
        previewMain: '와·과 / 하고 / 이랑·랑',
        previewSecondary: '5문제',
        previewChips: ['엄마하고', '우유와', '연필이랑', '책과'],
      },
      {
        id: 'unit9' as ParticleGameUnitId,
        label: '⑬ 방향·수단 (으로, 로)',
        title: '⑬ 방향·수단 (으로, 로)',
        subtitle: '학교, 운동장, 연필, 버스, 숟가락',
        previewMain: '으로 / 로',
        previewSecondary: '5문제',
        previewChips: ['학교로', '운동장으로', '연필로', '버스로'],
      },
      {
        id: 'unit10' as ParticleGameUnitId,
        label: '⑭ 행동 대상 (에게, 한테)',
        title: '⑭ 행동 대상 (에게, 한테)',
        subtitle: '짝꿍, 친구, 동생, 우리, 누구',
        previewMain: '에게 / 한테',
        previewSecondary: '5문제',
        previewChips: ['짝꿍에게', '친구에게', '동생한테', '우리한테'],
      },
      {
        id: 'sentence4' as ParticleGameUnitId,
        label: '⑮ 문장 만들기 4 (와·랑 / 로 / 한테)',
        title: '⑮ 문장 만들기 4',
        subtitle: '친구랑 운동장으로 가요, 동생이랑 기차로 가요',
        previewMain: '문장 만들기 4',
        previewSecondary: '5문제',
        previewChips: ['친구랑', '기차로', '친구한테', '공책으로'],
      },
      {
        id: 'unit11' as ParticleGameUnitId,
        label: '⑯ 시작과 끝 (부터, 까지)',
        title: '⑯ 시작과 끝 (부터, 까지)',
        subtitle: '아침부터, 월요일부터, 저녁까지, 학교까지, 어디까지',
        previewMain: '부터 / 까지',
        previewSecondary: '5문제',
        previewChips: ['아침부터', '월요일부터', '저녁까지', '학교까지'],
      },
      {
        id: 'unit12' as ParticleGameUnitId,
        label: '⑰ 선택 (이나, 나)',
        title: '⑰ 선택 (이나, 나)',
        subtitle: '빵, 물, 책, 사과, 버스',
        previewMain: '이나 / 나',
        previewSecondary: '5문제',
        previewChips: ['빵이나', '물이나', '사과나', '버스나'],
      },
      {
        id: 'unit13' as ParticleGameUnitId,
        label: '⑱ 반복 (마다 · 접미사 -씩)',
        title: '⑱ 반복 (마다 · 접미사 -씩)',
        subtitle: '날, 아침, 주말, 교실, 사람 (해볼쌤 팁: -씩)',
        previewMain: '마다 · -씩',
        previewSecondary: '5문제',
        previewChips: ['날마다', '아침마다', '주말마다', '교실마다'],
      },
      {
        id: 'sentence5' as ParticleGameUnitId,
        label: '⑲ 문장 만들기 5 (부터·까지·이나·마다)',
        title: '⑲ 문장 만들기 5',
        subtitle: '아침부터 저녁까지 공부해요, 주말마다 먹어요',
        previewMain: '문장 만들기 5',
        previewSecondary: '5문제',
        previewChips: ['아침부터', '금요일까지', '빵이나', '주말마다'],
      },
      {
        id: 'unit14' as ParticleGameUnitId,
        label: '⑳ 한정 (만)',
        title: '⑳ 한정 (만)',
        subtitle: '물, 나, 하나, 오늘, 사과',
        previewMain: '만',
        previewSecondary: '5문제',
        previewChips: ['물만', '나만', '하나만', '오늘만'],
      },
      {
        id: 'unit15' as ParticleGameUnitId,
        label: '㉑ 부정 한정 ★ (밖에)',
        title: '㉑ 부정 한정 ★ (밖에)',
        subtitle: '하나, 물, 나, 시간, 빵 + 없다/안',
        previewMain: '밖에 ★',
        previewSecondary: '5문제',
        previewChips: ['하나밖에', '물밖에', '나밖에', '빵밖에'],
      },
      {
        id: 'unit16' as ParticleGameUnitId,
        label: '㉒ 비교 (보다)',
        title: '㉒ 비교 (보다)',
        subtitle: '형, 어제, 버스, 사과, 누구',
        previewMain: '보다',
        previewSecondary: '5문제',
        previewChips: ['형보다', '어제보다', '버스보다', '사과보다'],
      },
      {
        id: 'sentence6' as ParticleGameUnitId,
        label: '㉓ 문장 만들기 6 (만·밖에·보다)',
        title: '㉓ 문장 만들기 6',
        subtitle: '나는 너만 보여, 너밖에 안 보여, 사랑밖에 난 몰라',
        previewMain: '문장 만들기 6',
        previewSecondary: '5문제',
        previewChips: ['너만', '너밖에', '누구보다', '사랑밖에'],
      },
      {
        id: 'unit17' as ParticleGameUnitId,
        label: '㉔ 비유 (처럼, 같이)',
        title: '㉔ 비유 (처럼, 같이)',
        subtitle: '토끼, 구름, 친구, 눈, 별',
        previewMain: '처럼 / 같이',
        previewSecondary: '5문제',
        previewChips: ['토끼같이', '구름같이', '눈처럼', '별처럼'],
      },
      {
        id: 'unit18' as ParticleGameUnitId,
        label: '㉕ 소유 ★ (의, 내, 네, 제)',
        title: '㉕ 소유 ★ (의, 내, 네, 제)',
        subtitle: '친구의, 선생님의, 내, 네, 제',
        previewMain: '의 / 내·네·제 ★',
        previewSecondary: '5문제',
        previewChips: ['친구의', '내', '네', '제'],
      },
      {
        id: 'unit19' as ParticleGameUnitId,
        label: '㉖ 무리·함께 (끼리)',
        title: '㉖ 무리·함께 (끼리)',
        subtitle: '친구, 우리, 남자, 여자, 학생',
        previewMain: '끼리',
        previewSecondary: '5문제',
        previewChips: ['친구끼리', '우리끼리', '남자끼리', '학생끼리'],
      },
      {
        id: 'sentence7' as ParticleGameUnitId,
        label: '㉗ 문장 만들기 7 (의·을·끼리·처럼)',
        title: '㉗ 문장 만들기 7',
        subtitle: '친구의 가방이 예뻐요, 친구끼리 놀아요',
        previewMain: '문장 만들기 7',
        previewSecondary: '5문제',
        previewChips: ['친구의', '공책을', '친구끼리', '토끼처럼'],
      },
      {
        id: 'unit20' as ParticleGameUnitId,
        label: '㉘ 높임 ★ (께서, 께)',
        title: '㉘ 높임 ★ (께서, 께)',
        subtitle: '할머니, 선생님, 부모님, 할아버지, 어른',
        previewMain: '께서 / 께 ★',
        previewSecondary: '5문제',
        previewChips: ['할머니께서', '선생님께서', '부모님께', '어른께'],
      },
      {
        id: 'unit21' as ParticleGameUnitId,
        label: '㉙ 부름 (아, 야)',
        title: '㉙ 부름 (아, 야)',
        subtitle: '민수, 수진, 강아지, 친구, 동생',
        previewMain: '아 / 야',
        previewSecondary: '5문제',
        previewChips: ['민수야', '수진아', '강아지야', '동생아'],
      },
      {
        id: 'sentence8' as ParticleGameUnitId,
        groupLabel: menuExtras.overview.particleGroupLabel,
        label: '㉚ 문장 만들기 8 (께서·께·아·야)',
        title: '㉚ 문장 만들기 8',
        subtitle: '할머니께서 선물을 주셨어요, 수진아 할아버지께 드려!',
        previewMain: '문장 만들기 8',
        previewSecondary: '5문제',
        previewChips: ['할머니께서', '부모님께', '수진아', '친구야'],
      },
    ],
    [menuExtras]
  );

  const particleOverviewItems = useMemo<OverviewCardItem[]>(() => {
    return particleGameUnits.map((u, idx) => ({
      id: u.id,
      targetIdx: idx,
      pageLabel: `${idx + 1} / ${particleGameUnits.length}`,
      title: u.title,
      subtitle: u.subtitle,
      previewMain: u.previewMain,
      previewSecondary: u.previewSecondary,
      previewChips: u.previewChips,
      themeColor: 'emerald',
      isActive: selectedParticleUnit === u.id,
      groupLabel: u.groupLabel || menuExtras.overview.particleGroupLabel,
    }));
  }, [particleGameUnits, selectedParticleUnit, menuExtras]);

  // Unified Single Row 5 across ALL 4 tracks
  const row5BorderClass =
    track === 'hangeul'
      ? 'border-amber-200/80'
      : track === 'particle'
      ? 'border-emerald-200/80'
      : track === 'verb'
      ? 'border-purple-200/80'
      : 'border-rose-200/70';

  const desktopRightControls = (
    <>
      {track === 'hangeul' && (
        <>
          <span className="text-xs font-bold text-amber-800 whitespace-nowrap mr-1">
            {tabUi.gameTabs.balloon}
          </span>
          <CompactUnitSelectButton
            value={selectedHangeulGroupId}
            onChange={(val) => onSelectHangeulGroupId?.(String(val))}
            options={HANGEUL_GROUPS.map(g => ({
              value: g.id,
              label: `${g.titleKo} (${g.cards.length}자)`,
            }))}
            theme="amber"
            title="한글 게임 단원 선택"
            ariaLabel="한글 게임 단원 선택"
            align="right"
            className="w-[220px] xl:w-[260px]"
          />
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setIsOverviewOpen(true);
            }}
            className="h-8 w-8 rounded-sm bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
            title={navUi.overviewBtn}
            aria-label={navUi.overviewBtn}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
          </button>
        </>
      )}

      {track === 'classroom' && (
        <>
          <span className="text-xs font-bold text-rose-800 whitespace-nowrap mr-1">
            {tabUi.gameTabs.memory}
          </span>
          <CompactUnitSelectButton
            value={selectedChapter}
            onChange={(val) => onSelectChapter?.(Number(val))}
            options={CHAPTER_LIST.map((ch) => ({
              value: ch.ch,
              label: getChapterCircledTitle(ch.ch, lang),
            }))}
            theme="rose"
            title={tabUi.studyControls.unitSelectTitle}
            ariaLabel={tabUi.studyControls.unitSelectTitle}
            align="right"
            className="w-[220px] xl:w-[260px]"
          />
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setIsOverviewOpen(true);
            }}
            className="h-8 w-8 rounded-sm bg-rose-100 hover:bg-rose-200 text-rose-950 border border-rose-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
            title={navUi.overviewBtn}
            aria-label={navUi.overviewBtn}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
          </button>
        </>
      )}

      {track === 'verb' && (
        <>
          <span className="text-xs font-bold text-purple-800 whitespace-nowrap mr-1">
            {tabUi.gameTabs.mandu}
          </span>
          <CompactUnitSelectButton
            value={selectedVerbUnit}
            onChange={(val) => onSelectVerbUnit?.(val as VerbUnitType)}
            options={VERB_UNIT_META.map((u) => ({
              value: u.id,
              label: u.label,
            }))}
            theme="purple"
            title={tabUi.studyControls.unitSelectTitle}
            ariaLabel={tabUi.studyControls.unitSelectTitle}
            align="right"
            className="w-[230px] xl:w-[270px]"
          />
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setIsOverviewOpen(true);
            }}
            className="h-8 w-8 rounded-sm bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
            title={navUi.overviewBtn}
            aria-label={navUi.overviewBtn}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
          </button>
        </>
      )}

      {track === 'particle' && (
        <>
          <span className="text-xs font-bold text-emerald-800 whitespace-nowrap mr-1">
            {tabUi.gameTabs.slingshot}
          </span>
          <CompactUnitSelectButton
            value={selectedParticleUnit}
            onChange={(val) => setSelectedParticleUnit(val as ParticleGameUnitId)}
            options={particleGameUnits.map((u) => ({
              value: u.id,
              label: u.label,
              groupLabel: u.groupLabel || menuExtras.overview.particleGroupLabel,
            }))}
            theme="emerald"
            title={tabUi.studyControls.unitSelectTitle}
            ariaLabel={tabUi.studyControls.unitSelectTitle}
            align="right"
            className="w-[230px] xl:w-[270px]"
          />
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setIsOverviewOpen(true);
            }}
            className="h-8 w-8 rounded-sm bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
            title={navUi.overviewBtn}
            aria-label={navUi.overviewBtn}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
          </button>
        </>
      )}

      <HallOfFameHeaderButton uiLang={uiLang} onClick={() => setIsHallOfFameOpen(true)} />
    </>
  );

  return (
    <div className="w-full flex flex-col gap-0 font-korean-gothic">
      {/* Desktop Layer 2 Learning Control Bar */}
      {!isMenuCollapsed && onSelectMethod && (
        <DesktopControlBar
          activeTrack={track}
          activeMethod={activeMethod}
          onSelectMethod={onSelectMethod}
          uiLang={uiLang}
          rightControls={desktopRightControls}
        />
      )}

      {!isMenuCollapsed && (
      <div
        className={`lg:hidden sticky top-[80px] sm:top-[90px] z-[35] bg-[#FFF5F8]/95 backdrop-blur-md pb-1 mb-1.5 border-b no-print w-full max-w-4xl mx-auto px-2.5 sm:px-4 select-none ${row5BorderClass}`}
      >
        <div className="flex items-center justify-between gap-2 h-[38px] sm:h-[42px]">
          {/* Left: Track-specific transparent text tab */}
          <div className="flex items-center gap-2.5 sm:gap-6 min-w-0 overflow-x-auto no-scrollbar">
            {track === 'hangeul' && (
              <button
                type="button"
                onClick={() => playCutePop()}
                className="relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                title={`${tabUi.gameTabs.balloon} (${isKoUi ? subLabels.balloonGame : '풍선게임'})`}
              >
                <span>{tabUi.gameTabs.balloon}</span>
                <span className="hidden md:inline text-[11px] font-bold text-amber-800/85">
                  [{isKoUi ? subLabels.balloonGame : '풍선게임'}]
                </span>
              </button>
            )}

            {track === 'classroom' && (
              <button
                type="button"
                onClick={() => playCutePop()}
                className="relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                title={`${tabUi.gameTabs.memory} (${isKoUi ? subLabels.memoryGame : '메모리게임'})`}
              >
                <span>{tabUi.gameTabs.memory}</span>
                <span className="hidden md:inline text-[11px] font-bold text-rose-700/85">
                  [{isKoUi ? subLabels.memoryGame : '메모리게임'}]
                </span>
              </button>
            )}

            {track === 'verb' && (
              <button
                type="button"
                onClick={() => playCutePop()}
                className="relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] text-purple-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                title={`${tabUi.gameTabs.mandu} (${isKoUi ? subLabels.kartGame : '만두요리'})`}
              >
                <span>{tabUi.gameTabs.mandu}</span>
                <span className="hidden md:inline text-[11px] font-bold text-purple-700/85">
                  [{isKoUi ? subLabels.kartGame : '만두요리'}]
                </span>
              </button>
            )}

            {track === 'particle' && (
              <button
                type="button"
                onClick={() => playCutePop()}
                className="relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                title={`${tabUi.gameTabs.slingshot} (${isKoUi ? subLabels.particle : '새총게임'})`}
              >
                <span>{tabUi.gameTabs.slingshot}</span>
                <span className="hidden md:inline text-[11px] font-bold text-emerald-700/85">
                  [{isKoUi ? subLabels.particle : '새총게임'}]
                </span>
              </button>
            )}
          </div>

          {/* Right: Single-line Unit Dropdown + [1x1 Overview Grid] */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 min-w-0">
            {track === 'hangeul' && (
              <>
                <CompactUnitSelectButton
                  value={selectedHangeulGroupId}
                  onChange={(val) => onSelectHangeulGroupId?.(String(val))}
                  options={HANGEUL_GROUPS.map(g => ({
                    value: g.id,
                    label: `${g.titleKo} (${g.cards.length}자)`,
                  }))}
                  theme="amber"
                  title="한글 게임 단원 선택"
                  ariaLabel="한글 게임 단원 선택"
                  align="right"
                  className="w-[155px] xs:w-[195px] sm:w-[260px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setIsOverviewOpen(true);
                  }}
                  className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
                  title={navUi.overviewBtn}
                  aria-label={navUi.overviewBtn}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                </button>
              </>
            )}

            {track === 'classroom' && (
              <>
                <CompactUnitSelectButton
                  value={selectedChapter}
                  onChange={(val) => onSelectChapter?.(Number(val))}
                  options={CHAPTER_LIST.map((ch) => ({
                    value: ch.ch,
                    label: getChapterCircledTitle(ch.ch, lang),
                  }))}
                  theme="rose"
                  title={tabUi.studyControls.unitSelectTitle}
                  ariaLabel={tabUi.studyControls.unitSelectTitle}
                  align="right"
                  className="w-[155px] xs:w-[195px] sm:w-[260px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setIsOverviewOpen(true);
                  }}
                  className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-rose-100 hover:bg-rose-200 text-rose-950 border border-rose-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
                  title={navUi.overviewBtn}
                  aria-label={navUi.overviewBtn}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                </button>
              </>
            )}

            {track === 'verb' && (
              <>
                <CompactUnitSelectButton
                  value={selectedVerbUnit}
                  onChange={(val) => onSelectVerbUnit?.(val as VerbUnitType)}
                  options={VERB_UNIT_META.map((u) => ({
                    value: u.id,
                    label: u.label,
                  }))}
                  theme="purple"
                  title={tabUi.studyControls.unitSelectTitle}
                  ariaLabel={tabUi.studyControls.unitSelectTitle}
                  align="right"
                  className="w-[155px] xs:w-[195px] sm:w-[270px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setIsOverviewOpen(true);
                  }}
                  className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
                  title={navUi.overviewBtn}
                  aria-label={navUi.overviewBtn}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                </button>
              </>
            )}

            {track === 'particle' && (
              <>
                <CompactUnitSelectButton
                  value={selectedParticleUnit}
                  onChange={(val) => setSelectedParticleUnit(val as ParticleGameUnitId)}
                  options={particleGameUnits.map((u) => ({
                    value: u.id,
                    label: u.label,
                    groupLabel: u.groupLabel || menuExtras.overview.particleGroupLabel,
                  }))}
                  theme="emerald"
                  title={tabUi.studyControls.unitSelectTitle}
                  ariaLabel={tabUi.studyControls.unitSelectTitle}
                  align="right"
                  className="w-[155px] xs:w-[195px] sm:w-[270px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setIsOverviewOpen(true);
                  }}
                  className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
                  title={navUi.overviewBtn}
                  aria-label={navUi.overviewBtn}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                </button>
              </>
            )}

            <HallOfFameHeaderButton compact uiLang={uiLang} onClick={() => setIsHallOfFameOpen(true)} />
          </div>
        </div>
      </div>
      )}

      {/* Track-specific Game Render */}
      <div className="w-full max-w-[1600px] mx-auto px-1 sm:px-4">
        {track === 'hangeul' && (
          <HangeulBalloonGameSection
            lang={lang}
            uiLang={uiLang}
            selectedGroupId={selectedHangeulGroupId}
            onSelectGroupId={onSelectHangeulGroupId}
            hideGroupBar={true}
          />
        )}

        {track === 'classroom' && (
          <MemoryCardGameSection
            vocabulary={vocabulary}
            lang={lang}
            uiLang={uiLang}
            selectedChapter={selectedChapter}
            onSelectChapter={onSelectChapter}
            hideChapterBar={true}
          />
        )}

        {track === 'verb' && (
          <VerbManduCookingGameSection
            lang={lang}
            uiLang={uiLang}
            selectedUnit={selectedVerbUnit}
            onSelectUnit={onSelectVerbUnit}
            hideUnitBar={true}
          />
        )}

        {track === 'particle' && (
          <ParticleArcadeQuiz
            uiLang={uiLang}
            activeUnit={selectedParticleUnit}
            onSelectUnit={(u) => setSelectedParticleUnit(u)}
          />
        )}
      </div>

      {/* Overview Modal per Track */}
      {track === 'hangeul' && (
        <OverviewGridModal
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          title={menuExtras.overview.gameTitles.hangeul}
          subtitle={menuExtras.overview.defaultSubtitle}
          accentTheme="amber"
          items={hangeulOverviewItems}
          onSelectItem={(item) => {
            onSelectHangeulGroupId?.(String(item.id));
          }}
          uiLang={uiLang}
        />
      )}

      {track === 'classroom' && (
        <OverviewGridModal
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          title={menuExtras.overview.gameTitles.classroom}
          subtitle={menuExtras.overview.defaultSubtitle}
          accentTheme="rose"
          items={classroomOverviewItems}
          onSelectItem={(item) => {
            onSelectChapter?.(Number(item.id));
          }}
          uiLang={uiLang}
        />
      )}

      {track === 'verb' && (
        <OverviewGridModal
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          title={menuExtras.overview.gameTitles.verb}
          subtitle={menuExtras.overview.defaultSubtitle}
          accentTheme="purple"
          items={grammarOverviewItems}
          onSelectItem={(item) => {
            onSelectVerbUnit?.(item.id as VerbUnitType);
          }}
          uiLang={uiLang}
        />
      )}

      {track === 'particle' && (
        <OverviewGridModal
          isOpen={isOverviewOpen}
          onClose={() => setIsOverviewOpen(false)}
          title={menuExtras.overview.gameTitles.particle}
          subtitle={menuExtras.overview.defaultSubtitle}
          accentTheme="emerald"
          items={particleOverviewItems}
          onSelectItem={(item) => {
            setSelectedParticleUnit(item.id as ParticleGameUnitId);
          }}
          uiLang={uiLang}
        />
      )}

      {/* Cross-Game Badge Album & Hall of Fame Modal */}
      <GameBadgeAndHallOfFameModal
        isOpen={isHallOfFameOpen}
        onClose={() => setIsHallOfFameOpen(false)}
        initialGame={activeBadgeGame}
        vocabulary={vocabulary}
        uiLang={uiLang}
      />
    </div>
  );
};
