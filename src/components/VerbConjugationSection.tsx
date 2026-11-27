import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Star,
  Search,
  Printer,
  X,
  LayoutGrid
} from 'lucide-react';
import { ManduMascot } from './ManduMascot';
import { SupportedLanguage } from '../types';
import { UiLanguage, FLASHCARD_COMMON_UI, NAV_UI, SUBTAB_UI } from '../i18n/uiTranslations';
import { speakKorean, playCutePop, playSuccessChime, playPaperFlipSound } from '../utils/audio';
import { getBaseWordParts, getOptionBCharMapping, getFallingCardText, getFlashcardMagicData } from '../utils/verbConjugationUtils';
import { getVerbConjugatedMeaning } from '../data/verbConjugatedMeanings';
import { VERB_UNIT_META, VerbUnitType, VerbCardItem } from '../data/verbUnitMeta';
import { VERB_CARDS_BY_UNIT } from '../data/verbCardsData';

export { VERB_UNIT_META, VERB_CARDS_BY_UNIT };
export type { VerbUnitType, VerbCardItem };

interface VerbConjugationSectionProps {
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedUnit?: VerbUnitType;
  onSelectUnit?: (unit: VerbUnitType) => void;
  onOpenOverview?: () => void;
  hideStickyUnitBar?: boolean;
}


export const VerbConjugationSection: React.FC<VerbConjugationSectionProps> = ({
  lang,
  uiLang = 'ko',
  selectedUnit: propSelectedUnit,
  onSelectUnit,
  onOpenOverview,
  hideStickyUnitBar = false,
}) => {
  const [viewMode, setViewMode] = useState<'flashcard' | 'worksheet'>('flashcard');
  const [internalUnit, setInternalUnit] = useState<VerbUnitType>('unit1');
  const selectedUnit = propSelectedUnit ?? internalUnit;
  const [cardIndex, setCardIndex] = useState(0);
  const [isCovered, setIsCovered] = useState(false);
  const [isMagicTransformed, setIsMagicTransformed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [savedVerbs, setSavedVerbs] = useState<string[]>([]);
  const magicTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cardList = VERB_CARDS_BY_UNIT[selectedUnit] || VERB_CARDS_BY_UNIT.unit1;
  const currentCard = cardList[cardIndex] || cardList[0];
  const isSaved = savedVerbs.includes(currentCard.baseWord);

  // 1. 단어 바뀌거나 첫 로드 시 '기본형' 자동 발음 (0.2s 지연) 및 상태 초기화
  useEffect(() => {
    setIsCovered(false);
    setIsMagicTransformed(false);
    if (magicTimerRef.current) {
      clearTimeout(magicTimerRef.current);
      magicTimerRef.current = null;
    }
    setShowHint(false);
    const timer = setTimeout(() => {
      speakKorean(currentCard.baseWord, 0.85);
    }, 200);
    return () => {
      clearTimeout(timer);
      if (magicTimerRef.current) {
        clearTimeout(magicTimerRef.current);
        magicTimerRef.current = null;
      }
    };
  }, [selectedUnit, cardIndex]);

  // 2. 단원 변경 핸들러
  const handleUnitChange = (unit: VerbUnitType) => {
    playCutePop();
    setInternalUnit(unit);
    onSelectUnit?.(unit);
    setCardIndex(0);
  };

  // 3. 이전 / 다음 카드 핸들러
  const handlePrev = () => {
    playCutePop();
    setCardIndex(prev => (prev > 0 ? prev - 1 : cardList.length - 1));
  };

  const handleNext = () => {
    playCutePop();
    setCardIndex(prev => (prev < cardList.length - 1 ? prev + 1 : 0));
  };

  const handlePrevUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const curIdx = VERB_UNIT_META.findIndex((u) => u.id === selectedUnit);
    const prevIdx = curIdx > 0 ? curIdx - 1 : VERB_UNIT_META.length - 1;
    handleUnitChange(VERB_UNIT_META[prevIdx].id);
  };

  const handleNextUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const curIdx = VERB_UNIT_META.findIndex((u) => u.id === selectedUnit);
    const nextIdx = curIdx < VERB_UNIT_META.length - 1 ? curIdx + 1 : 0;
    handleUnitChange(VERB_UNIT_META[nextIdx].id);
  };

  // 4. 플래시카드 클릭 시 토글 반복 학습
  // 미적용 상태 -> '아요/어요/았어요/었어요/했어요' 종이 카드가 내려와서 덮음
  // 4·5단원 및 9·10단원: 카드가 내려온 후 (~700ms) 보라색(#9333EA) 매직 전환
  // 적용 상태 -> 올라가서 기본형 복귀 및 기본형 발음
  const handleCardClick = () => {
    playPaperFlipSound();
    if (magicTimerRef.current) {
      clearTimeout(magicTimerRef.current);
      magicTimerRef.current = null;
    }
    if (!isCovered) {
      setIsCovered(true);
      setIsMagicTransformed(false);
      if (
        selectedUnit === 'unit4' ||
        selectedUnit === 'unit5' ||
        selectedUnit === 'unit9' ||
        selectedUnit === 'unit10' ||
        selectedUnit === 'unit11' ||
        selectedUnit === 'unit15' ||
        selectedUnit === 'unit17' ||
        selectedUnit === 'unit18' ||
        selectedUnit === 'unit19' ||
        selectedUnit === 'unit20' ||
        selectedUnit === 'unit21' ||
        selectedUnit === 'unit22' ||
        selectedUnit === 'unit25' ||
        selectedUnit === 'unit26' ||
        selectedUnit === 'unit27' ||
        selectedUnit === 'unit29' ||
        selectedUnit === 'unit30'
      ) {
        magicTimerRef.current = setTimeout(() => {
          setIsMagicTransformed(true);
        }, 760);
      }
      speakKorean(currentCard.conjugatedWord, 0.85);
    } else {
      setIsCovered(false);
      setIsMagicTransformed(false);
      speakKorean(currentCard.baseWord, 0.85);
    }
  };

  // 5. 돋보기 힌트 버튼 클릭 (순수 힌트 팝업 토글)
  const handleMagnifierClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCutePop();
    setShowHint(prev => !prev);
  };

  // 5-2. 해볼쌤 팁 버튼 클릭 (단원별 팁 모달 팝업 열기)
  const handleTipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCutePop();
    setShowTipModal(true);
  };

  // 6. 음성 듣기 버튼 클릭
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCutePop();
    if (isCovered) {
      speakKorean(currentCard.conjugatedWord, 0.85);
    } else {
      speakKorean(currentCard.baseWord, 0.85);
    }
  };

  // 6-2. 예문 듣기 클릭
  const handleSentenceSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playCutePop();
    speakKorean(text, 0.85);
  };

  // 7. 즐겨찾기 토글
  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSuccessChime();
    setSavedVerbs(prev =>
      prev.includes(currentCard.baseWord)
        ? prev.filter(w => w !== currentCard.baseWord)
        : [...prev, currentCard.baseWord]
    );
  };

  // 8. "Click the magnifying glass to get a hint" 언어별 번역 문구
  const hintLabels: Record<SupportedLanguage | 'ko', string> = {
    ko: '돋보기를 클릭하면 힌트를 볼 수 있어요 🔍',
    en: 'Click the magnifying glass to get a hint 🔍',
    vi: 'Nhấn vào kính lúp để xem gợi ý 🔍',
    bn: 'ইঙ্গিত পেতে ম্যাগনিফাইং গ্লাসে ক্লিক করুন 🔍',
    zh: '点击放大镜查看提示 🔍',
    ru: 'Нажмите на лупу, чтобы увидеть подсказку 🔍',
    ja: '虫眼鏡をクリックするとヒントが表示されます 🔍',
    mn: 'Томруулагч дээр дарж зөвлөмж авна уу 🔍',
  };

  // 플래시카드 상단 안내, 힌트, 팁 버튼 다국어 번역 문구 (웹앱 [내언어로 이용하기] 연동)
  const flashcardUiLabels: Record<SupportedLanguage | 'ko', {
    clickWordGuide: string;
    hint: string;
    tip: string;
    hintTitle: string;
    tipTitle: string;
    listenSentence: string;
  }> = {
    en: {
      clickWordGuide: 'Click to see conjugation',
      hint: 'Hint',
      tip: 'Tip',
      hintTitle: 'View vowel hint',
      tipTitle: "View Teacher's Tip",
      listenSentence: 'Click to listen',
    },
    ko: {
      clickWordGuide: '클릭하여 활용 확인',
      hint: '힌트',
      tip: '팁',
      hintTitle: '어간 모음 힌트 보기',
      tipTitle: '해볼쌤 팁 보기',
      listenSentence: '클릭해서 예문 듣기',
    },
    vi: {
      clickWordGuide: 'Nhấn để xem chia động từ',
      hint: 'Gợi ý',
      tip: 'Mẹo',
      hintTitle: 'Xem gợi ý nguyên âm',
      tipTitle: 'Xem mẹo học',
      listenSentence: 'Nhấn để nghe câu mẫu',
    },
    bn: {
      clickWordGuide: 'রূপান্তর দেখতে ক্লিক করুন',
      hint: 'ইঙ্গিত',
      tip: 'টিপস',
      hintTitle: 'ইঙ্গিত দেখুন',
      tipTitle: 'শিক্ষকের পরামর্শ দেখুন',
      listenSentence: 'বাক্য শুনতে ক্লিক করুন',
    },
    zh: {
      clickWordGuide: '点击查看活用',
      hint: '提示',
      tip: '秘诀',
      hintTitle: '查看元音提示',
      tipTitle: '查看教师小贴士',
      listenSentence: '点击听例句',
    },
    ru: {
      clickWordGuide: 'Нажмите, чтобы увидеть форму',
      hint: 'Подсказка',
      tip: 'Совет',
      hintTitle: 'Посмотреть подсказку',
      tipTitle: 'Совет учителя',
      listenSentence: 'Нажмите, чтобы послушать',
    },
    ja: {
      clickWordGuide: 'クリックして活用を確認',
      hint: 'ヒント',
      tip: 'コツ',
      hintTitle: '語幹母音のヒントを見る',
      tipTitle: '先生のコツを見る',
      listenSentence: 'クリックして例文を聞く',
    },
    mn: {
      clickWordGuide: 'Хувирлыг харахын тулд дарна уу',
      hint: 'Зөвлөгөө',
      tip: 'Санамж',
      hintTitle: 'Зөвлөмж харах',
      tipTitle: 'Багшийн санамж',
      listenSentence: 'Жишээ өгүүлбэр сонсох',
    },
  };

  const hintText = hintLabels[uiLang] || hintLabels.ko;
  const fcUiLabels = flashcardUiLabels[uiLang] || flashcardUiLabels.ko;
  const commonUi = FLASHCARD_COMMON_UI[uiLang] || FLASHCARD_COMMON_UI.ko;
  const navUi = NAV_UI[uiLang] || NAV_UI.ko;
  const subUi = SUBTAB_UI[uiLang] || SUBTAB_UI.ko;
  const baseMeaning = currentCard.meanings[lang] || currentCard.meanings.en;
  const conjugatedMeaning = getVerbConjugatedMeaning(currentCard.id, lang) || baseMeaning;
  const currentMeaning = isCovered ? conjugatedMeaning : baseMeaning;

  const renderSpeechBubble = () => (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 flex flex-col items-center pointer-events-none z-40"
        >
          <div className="px-2.5 py-1 bg-red-500 text-white font-black text-xs sm:text-sm rounded-lg shadow-md border border-white flex items-center gap-1 whitespace-nowrap">
            <span>🔍</span>
            <span>{currentCard.vowelHint}</span>
          </div>
          {/* 말풍선 뾰족한 꼭짓점 (부모 음절 수평 50% 중심에 일치) */}
          <div className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[7px] border-t-red-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="w-full max-w-[1312px] mx-auto px-1 sm:px-4 space-y-1 sm:space-y-1.5 font-korean-gothic">
      {/* Row 5 Sticky Top Bar: Unit Dropdown + 모아보기 */}
      {!hideStickyUnitBar && (
        <div className="no-print sticky top-[80px] sm:top-[90px] z-[22] bg-[#F4F3F8]/95 lg:bg-[#FFF5F8]/95 backdrop-blur-md pb-1 w-full">
          <div className="flex items-center justify-center gap-1.5 w-full max-w-md mx-auto">
            <div className="relative flex-1 min-w-0">
              <select
                value={selectedUnit}
                onChange={e => handleUnitChange(e.target.value as VerbUnitType)}
                className="w-full h-8 sm:h-8.5 pl-3 sm:pl-4 pr-8 rounded-none bg-white hover:bg-purple-50/80 border border-purple-300 text-purple-950 font-black text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-400 font-korean-gothic shadow-2xs truncate text-left"
                title={subUi.studyControls.unitSelectTitle}
              >
                {VERB_UNIT_META.map(u => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-purple-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {onOpenOverview && (
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  onOpenOverview();
                }}
                className="h-8 sm:h-8.5 w-8 sm:w-9 rounded-none bg-purple-100 hover:bg-purple-200 text-purple-950 border border-purple-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
                title={navUi.overviewBtn}
                aria-label={navUi.overviewBtn}
              >
                <LayoutGrid className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Flashcard Display Area: 모바일 화면 꽉 차게 확장, PC에서 확대 */}
      <div className="w-full max-w-full sm:max-w-3xl lg:max-w-[960px] flex justify-center px-1 sm:px-4 font-korean-gothic mx-auto">
        <div className="w-full">
          <div
            onClick={handleCardClick}
            className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] w-full rounded-lg pt-3 sm:pt-5 px-3 sm:px-6 pb-2 sm:pb-5 shadow-lg border-2 sm:border-4 border-purple-300 flex flex-col justify-between transition-shadow hover:shadow-xl bg-gradient-to-b from-purple-50 via-[#FAF5FF] to-purple-100/60 cursor-pointer select-none overflow-hidden"
          >
              {/* Top-Left Guide Text: Click the word (다국어 연동) */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-purple-100/90 border border-purple-200 text-purple-700 text-[11px] sm:text-xs font-black pointer-events-none shadow-xs">
                <span>{fcUiLabels.clickWordGuide}</span>
              </div>

              {/* Top Row on Card: 해볼쌤 팁(왼쪽) + 힌트(오른쪽) 가로 배치 */}
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 flex items-center gap-2 z-20">
                {/* 1) 해볼쌤 팁 버튼 (돋보기 왼쪽으로 이동) */}
                <button
                  type="button"
                  onClick={handleTipClick}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-md flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs border bg-white/90 hover:bg-amber-50 active:scale-95 border-amber-300 text-amber-950 group"
                  title={fcUiLabels.tipTitle}
                  aria-label={fcUiLabels.tip}
                >
                  <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center pointer-events-none">
                    <ManduMascot size="xs" interactive={false} />
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-black leading-none mt-0.5 text-amber-900">{fcUiLabels.tip}</span>
                </button>

                {/* 2) 힌트 버튼 (돋보기) */}
                <button
                  type="button"
                  onClick={handleMagnifierClick}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs border ${
                    showHint
                      ? 'bg-amber-300 text-amber-950 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-white/90 hover:bg-purple-100 text-purple-900 border-purple-200'
                  } active:scale-95`}
                  title={fcUiLabels.hintTitle}
                  aria-label={fcUiLabels.hint}
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-700" />
                  <span className="text-[9px] sm:text-[10px] font-black leading-none mt-0.5">{fcUiLabels.hint}</span>
                </button>
              </div>

              {/* Card Center Content with streamlined vertical gaps */}
              <div className="flex flex-col items-center justify-start sm:justify-center flex-1 text-center pt-14 sm:pt-0 sm:my-auto">
                
                {/* 1. Visual Illustration */}
                <div className="mb-3 sm:mb-4 flex items-center justify-center">
                  <div className="w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center drop-shadow-xs">
                    {currentCard.illustrationSvg ? (
                      <img
                        src={currentCard.illustrationSvg}
                        alt={`${currentCard.baseWord} 일러스트`}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-6xl sm:text-7xl select-none" role="img" aria-label={currentCard.baseWord}>
                        {currentCard.emojiIcon}
                      </span>
                    )}
                  </div>
                </div>

                {/* 
                  2. 낱말 카드 (어간 끝음절 위에 꼭짓점이 닿는 말풍선 배치)
                  - '어간'은 카드 내 우측 정렬
                  - '어미'는 카드 내 좌측 정렬, 기본형 파란색 (#2563EB)
                  - 4·5단원은 카드가 내려올 때 빨간글씨 '아요/어요'로 내려와 덮은 후 즉시 보라색(#9333EA)으로 마법 전환
                  - 동시에 변형 어간(오, 보, 돕, 주, 쓰, 듣, 부)도 보라색(#9333EA) 전환, 불변 어간(가, 아, 마)은 검정색(#1E293B) 유지
                */}
                {(() => {
                  const magicData = getFlashcardMagicData(currentCard.baseWord, selectedUnit);
                  const isUnit4or5 = selectedUnit === 'unit4' || selectedUnit === 'unit5';
                  const isUnit9or10 = selectedUnit === 'unit9' || selectedUnit === 'unit10';
                  const isUnit11 = selectedUnit === 'unit11';
                  const isUnit12 = selectedUnit === 'unit12';
                  const isUpperIrregularUnit =
                    selectedUnit === 'unit15' ||
                    selectedUnit === 'unit17' ||
                    selectedUnit === 'unit18' ||
                    selectedUnit === 'unit19' ||
                    selectedUnit === 'unit20' ||
                    selectedUnit === 'unit21' ||
                    selectedUnit === 'unit22' ||
                    selectedUnit === 'unit25' ||
                    selectedUnit === 'unit26' ||
                    selectedUnit === 'unit27' ||
                    selectedUnit === 'unit29' ||
                    selectedUnit === 'unit30';
                  const isHadaUnit =
                    selectedUnit === 'unit3' ||
                    selectedUnit === 'unit8' ||
                    selectedUnit === 'unit12' ||
                    magicData.baseEnding === '하다';
                  const isLongPhrase = (magicData.fullConjugatedWord?.length || 0) >= 8;
                  const cardTextSizeClass = isLongPhrase
                    ? 'text-2xl sm:text-4xl'
                    : (magicData.fullConjugatedWord?.length || 0) >= 6
                    ? 'text-3xl sm:text-[42px]'
                    : 'text-4xl sm:text-5xl';

                  // 4·5단원 및 9·10단원 등 변형 단원 모두 학습지 색상(불변 어간 검정, 변형 글자 보라, 유지 어미 빨강)과 100% 일치 + 동시 전환
                  const hasMagicStemChange = isUnit4or5 || isUnit9or10 || isUnit11 || isUpperIrregularUnit;
                  const currentStemText = !isCovered
                    ? magicData.baseStem
                    : hasMagicStemChange
                    ? (isMagicTransformed ? magicData.magicStem : magicData.baseStem)
                    : magicData.baseStem;

                  const currentStemColor = !isCovered
                    ? '#1E293B'
                    : (isUnit4or5 || isUnit9or10)
                    ? (isMagicTransformed ? magicData.magicStemColor : '#1E293B')
                    : '#1E293B';

                  const activeStemChars =
                    isCovered && isMagicTransformed && hasMagicStemChange && magicData.magicStemChars
                      ? magicData.magicStemChars
                      : currentStemText.split('').map(char => ({ char, color: currentStemColor }));

                  const shouldAnimateStemMorph = Boolean(
                    isCovered && isMagicTransformed && hasMagicStemChange && magicData.isStemAltered
                  );

                  return (
                    <div className="w-full flex items-center justify-center min-h-[92px] my-2 sm:my-3">
                      <div className="w-full max-w-xl flex items-center justify-center">
                        
                        {/* LEFT HALF: 어간 영역 (11단원은 초록색 부정 부사 '안'/'못'이 왼쪽에서 날아와 어간 앞에 위치) */}
                        <div className="w-[46%] sm:w-1/2 flex justify-end items-center pr-0">
                          <div className="relative inline-flex items-center justify-end bg-white rounded-none shadow-none pl-2 sm:pl-6 pr-0 py-2 sm:py-2.5 select-none whitespace-nowrap">
                            {/* 11단원 한정: 초록색 부사('안'/'못')가 날아와서 어간 앞에 위치 */}
                            <AnimatePresence>
                              {isUnit11 && isCovered && magicData.prefixAdverb && (
                                <motion.span
                                  key={`adverb-${currentCard.id}-${magicData.prefixAdverb}`}
                                  initial={{ x: -64, y: -34, opacity: 0, scale: 0.85 }}
                                  animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                  exit={{ x: -64, y: -34, opacity: 0, scale: 0.85 }}
                                  transition={{
                                    duration: 0.72,
                                    ease: [0.16, 1, 0.3, 1]
                                  }}
                                  style={{
                                    fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                    fontWeight: 900,
                                    WebkitTextStroke: '0.8px currentColor',
                                    color: magicData.prefixColor || '#16A34A'
                                  }}
                                  className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi inline-flex items-center mr-2 sm:mr-2.5`}
                                >
                                  {magicData.prefixAdverb}
                                </motion.span>
                              )}
                            </AnimatePresence>

                            <div
                              style={{
                                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                fontWeight: 900,
                                WebkitTextStroke: '0.8px currentColor'
                              }}
                              className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-right inline-flex items-center`}
                            >
                              {activeStemChars.map((item, idx, arr) => {
                                const isStemLast = idx === arr.length - 1;
                                const isBubbleTarget = isStemLast && !isHadaUnit;
                                return (
                                  <span
                                    key={idx}
                                    className={isBubbleTarget ? 'relative inline-block' : 'inline-block'}
                                  >
                                    <motion.span
                                      key={`${currentCard.id}-${idx}-${shouldAnimateStemMorph ? 'magic' : 'base'}`}
                                      initial={shouldAnimateStemMorph ? { opacity: 0.25, scale: 0.96 } : false}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                                      style={{ color: item.color }}
                                      className="inline-block"
                                    >
                                      {item.char}
                                    </motion.span>
                                    {isBubbleTarget && renderSpeechBubble()}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* RIGHT HALF: 어미 슬롯 영역 (카드 내 좌측정렬, 기본형 파란색 #2563EB) */}
                        <div className="w-[54%] sm:w-1/2 flex justify-start items-center relative pl-0">
                          <div className="relative inline-flex items-center justify-start">
                            
                            {/* 기본 어미 카드 (카드 내 좌측정렬, 파란색 표기 #2563EB) */}
                            <div className={`bg-white rounded-none shadow-none pl-0 pr-3 sm:pr-6 py-2 sm:py-2.5 flex items-center justify-start transition-opacity duration-150 ${isCovered ? 'opacity-0' : 'opacity-100'}`}>
                              <div
                                style={{
                                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                  fontWeight: 900,
                                  WebkitTextStroke: '0.8px currentColor',
                                  color: '#2563EB'
                                }}
                                className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-left inline-flex items-center`}
                              >
                                {magicData.baseEnding.split('').map((char, idx) => {
                                  const isEndingFirst = idx === 0;
                                  const isBubbleTarget = isEndingFirst && isHadaUnit && !isCovered;
                                  return (
                                    <span
                                      key={idx}
                                      className={isBubbleTarget ? 'relative inline-block' : 'inline-block'}
                                    >
                                      {char}
                                      {isBubbleTarget && renderSpeechBubble()}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>

                            {/* 새로 내려오는 활용 카드 (종이 카드가 덮어씌워지는 모션) */}
                            <AnimatePresence>
                              {isCovered && (
                                <motion.div
                                  initial={{ y: -160, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  exit={{ y: -160, opacity: 0 }}
                                  transition={{
                                    duration: 0.76,
                                    ease: [0.16, 1, 0.3, 1]
                                  }}
                                  className="absolute left-0 top-0 bottom-0 flex items-center justify-start z-20 pointer-events-none"
                                >
                                  <div className={`bg-white rounded-none shadow-none ${isUnit12 ? 'pl-1.5 sm:pl-2.5' : 'pl-0'} pr-3 sm:pr-6 py-2 sm:py-2.5 flex items-center justify-start whitespace-nowrap`}>
                                    {(isUnit4or5 || isUnit9or10) ? (
                                      /* 4·5단원 및 9·10단원: 어간 변색과 정확히 동시에 어미 전환 */
                                      <div
                                        style={{
                                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                          fontWeight: 900,
                                          WebkitTextStroke: '0.8px currentColor'
                                        }}
                                        className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-left inline-flex items-center`}
                                      >
                                        {!isMagicTransformed ? (
                                          <span style={{ color: '#EF4444' }}>
                                            {magicData.fallingRedEnding}
                                          </span>
                                        ) : (
                                          <motion.span
                                            key={`purple-magic-${currentCard.id}`}
                                            initial={{ opacity: 0.25, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.45, ease: 'easeInOut' }}
                                            style={{ color: magicData.magicEndingColor }}
                                          >
                                            {magicData.magicEnding}
                                          </motion.span>
                                        )}
                                      </div>
                                    ) : isUnit11 && magicData.isStemAltered ? (
                                      /* 11단원 축약(남기다→남겨요, 던지다→던져요): 어간과 동시에 축약 글자 보라(#9333EA) + '요' 빨강(#EF4444) */
                                      <div
                                        style={{
                                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                          fontWeight: 900,
                                          WebkitTextStroke: '0.8px currentColor'
                                        }}
                                        className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-left inline-flex items-center`}
                                      >
                                        {!isMagicTransformed ? (
                                          <span style={{ color: '#EF4444' }}>
                                            {magicData.fallingRedEnding}
                                          </span>
                                        ) : (
                                          <motion.span
                                            key={`u11-contracted-${currentCard.id}`}
                                            initial={{ opacity: 0.25, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.45, ease: 'easeInOut' }}
                                            className="inline-flex items-center"
                                          >
                                            <span style={{ color: '#9333EA' }}>
                                              {magicData.magicEnding.slice(0, -1)}
                                            </span>
                                            <span style={{ color: '#EF4444' }}>
                                              {magicData.magicEnding.slice(-1)}
                                            </span>
                                          </motion.span>
                                        )}
                                      </div>
                                    ) : isUnit12 && magicData.midAdverb ? (
                                      /* 12단원 부정2: 초록색 '안'/'못' + 빨간색 '해요' */
                                      <div
                                        style={{
                                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                          fontWeight: 900,
                                          WebkitTextStroke: '0.8px currentColor'
                                        }}
                                        className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-left inline-flex items-center`}
                                      >
                                        <span
                                          style={{ color: magicData.midAdverbColor || '#16A34A' }}
                                          className="mr-1.5 sm:mr-2 relative inline-block"
                                        >
                                          {magicData.midAdverb}
                                          {isHadaUnit && isCovered && renderSpeechBubble()}
                                        </span>
                                        <span style={{ color: '#EF4444' }}>
                                          {magicData.fallingRedEnding}
                                        </span>
                                      </div>
                                    ) : isUpperIrregularUnit && magicData.isStemAltered ? (
                                      /* 15·17·18·19·20단원 축약/불규칙: 어간과 동시에 최종 활용 어미로 전환 */
                                      <div
                                        style={{
                                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                          fontWeight: 900,
                                          WebkitTextStroke: '0.8px currentColor',
                                          color: '#EF4444'
                                        }}
                                        className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-left inline-flex items-center`}
                                      >
                                        {!isMagicTransformed ? (
                                          <span>{magicData.fallingRedEnding}</span>
                                        ) : (
                                          <motion.span
                                            key={`u-morph-${currentCard.id}`}
                                            initial={{ opacity: 0.25, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.45, ease: 'easeInOut' }}
                                          >
                                            {magicData.magicEnding.split('').map((c, ci) => (
                                              <span key={ci}>{c === ' ' ? '\u00A0' : c}</span>
                                            ))}
                                          </motion.span>
                                        )}
                                      </div>
                                    ) : (
                                      /* 1~3단원, 6~8단원, 11단원 규칙형, 13~20단원 규칙형은 빨간색 어미 카드 */
                                      <div
                                        style={{
                                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                          fontWeight: 900,
                                          WebkitTextStroke: '0.8px currentColor',
                                          color: '#EF4444'
                                        }}
                                        className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-left inline-flex items-center`}
                                      >
                                        {magicData.fallingRedEnding.split('').map((char, idx) => {
                                          const isEndingFirst = idx === 0;
                                          const isBubbleTarget = isEndingFirst && isHadaUnit && isCovered;
                                          return (
                                            <span
                                              key={idx}
                                              className={isBubbleTarget ? 'relative inline-block' : 'inline-block'}
                                            >
                                              {char === ' ' ? '\u00A0' : char}
                                              {isBubbleTarget && renderSpeechBubble()}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()}

                {/* 3. Translation Badge (기본형 ↔ 활용형 뜻 전환) */}
                <div
                  className={`mt-3 sm:mt-4 px-3.5 py-0.5 text-sm sm:text-base font-bold rounded-sm border shadow-xs tracking-wide transition-colors duration-300 ${
                    isCovered
                      ? 'bg-rose-100/95 text-rose-950 border-rose-300'
                      : 'bg-purple-100/90 text-purple-950 border-purple-200'
                  }`}
                >
                  [{currentMeaning}]
                </div>

                {/* 4. Sample Sentence Card (clickable to listen) */}
                <button
                  type="button"
                  onClick={(e) => handleSentenceSpeak(e, currentCard.sampleSentence)}
                  title={fcUiLabels.listenSentence}
                  className="mt-3.5 sm:mt-4.5 px-4 py-2 bg-white/95 hover:bg-purple-50/70 rounded-md border border-purple-200 shadow-sm max-w-md w-full flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <p
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 600
                    }}
                    className="text-sm sm:text-base font-bold text-slate-800 leading-snug font-badasseugi"
                  >
                    "{currentCard.sampleSentence}"
                  </p>
                </button>

              </div>

              {/* 왼쪽 이전 (<) + 이전단원 (<<) 버튼 */}
              <div className="absolute left-1.5 sm:left-3 top-18 sm:top-24 z-[15] flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="h-20 sm:h-24 w-12 sm:w-15 rounded-md bg-transparent hover:bg-purple-500/10 active:scale-95 border-2 border-purple-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-purple-400"
                  title={commonUi.prevCard}
                  aria-label={commonUi.prevCard}
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                </button>
                <button
                  type="button"
                  onClick={handlePrevUnit}
                  className="h-10 sm:h-12 w-12 sm:w-15 rounded-md bg-transparent hover:bg-purple-500/10 active:scale-95 border-2 border-purple-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-purple-400"
                  title={commonUi.prevUnit}
                  aria-label={commonUi.prevUnit}
                >
                  <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </button>
              </div>

              {/* 오른쪽 다음 (>) + 다음단원 (>>) 버튼 */}
              <div className="absolute right-1.5 sm:right-3 top-18 sm:top-24 z-[15] flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="h-20 sm:h-24 w-12 sm:w-15 rounded-md bg-transparent hover:bg-purple-500/10 active:scale-95 border-2 border-purple-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-purple-400"
                  title={commonUi.nextCard}
                  aria-label={commonUi.nextCard}
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                </button>
                <button
                  type="button"
                  onClick={handleNextUnit}
                  className="h-10 sm:h-12 w-12 sm:w-15 rounded-md bg-transparent hover:bg-purple-500/10 active:scale-95 border-2 border-purple-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-purple-400"
                  title={commonUi.nextUnit}
                  aria-label={commonUi.nextUnit}
                >
                  <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </button>
              </div>

            </div>
          </div>
        </div>

      {/* 3. 해볼쌤 팁 중앙 모달 팝업 */}
      <AnimatePresence>
        {showTipModal && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowTipModal(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs font-korean-gothic select-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-lg p-6 sm:p-7 shadow-2xl border-2 border-purple-200 text-left"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowTipModal(false)}
                className="absolute top-4 right-4 p-2 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="닫기"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <ManduMascot size="sm" interactive={false} />
                <h3 className="text-lg sm:text-xl font-black text-slate-950 font-korean-gothic tracking-tight">
                  해볼쌤 팁 | {
                    selectedUnit === 'unit30'
                      ? '경험 (-아/어/해 봤어요)'
                      : selectedUnit === 'unit29'
                      ? '순서 (-기 전에, -ㄴ/은 후에)'
                      : selectedUnit === 'unit28'
                      ? '목적 (-러/으러 가요, 와요)'
                      : selectedUnit === 'unit27'
                      ? '시간 (-ㄹ 때, -을 때)'
                      : selectedUnit === 'unit26'
                      ? '조건 (-면, -으면)'
                      : selectedUnit === 'unit25'
                      ? '이유 (-아서, -어서, -해서)'
                      : selectedUnit === 'unit24'
                      ? '대조 (-지만)'
                      : selectedUnit === 'unit23'
                      ? '나열 (-고)'
                      : selectedUnit === 'unit22'
                      ? '제안 (-ㄹ까요?, -을까요?)'
                      : selectedUnit === 'unit21'
                      ? '능력 (-ㄹ/을 수 있어요, 없어요)'
                      : selectedUnit === 'unit20'
                      ? '의무 (-아야/어야/해야 돼요)'
                      : selectedUnit === 'unit19'
                      ? '허락 (-아도/어도/해도 돼요?)'
                      : selectedUnit === 'unit18'
                      ? '부탁 (-아/어/해 주세요)'
                      : selectedUnit === 'unit17'
                      ? '미래 (-ㄹ/을 거예요)'
                      : selectedUnit === 'unit16'
                      ? '금지 (-지 마세요)'
                      : selectedUnit === 'unit15'
                      ? '요청 (-세요, -으세요)'
                      : selectedUnit === 'unit14'
                      ? '진행 (-고 있어요)'
                      : selectedUnit === 'unit13'
                      ? '희망 (-고 싶어요)'
                      : selectedUnit === 'unit12'
                      ? '부정2 ([명사] 안 해요, [명사] 못 해요)'
                      : selectedUnit === 'unit11'
                      ? '부정1 (안, 못)'
                      : selectedUnit === 'unit10'
                      ? '-었어요 ★'
                      : selectedUnit === 'unit9'
                      ? '-았어요 ★'
                      : selectedUnit === 'unit8'
                      ? '-했어요'
                      : selectedUnit === 'unit7'
                      ? '-었어요'
                      : selectedUnit === 'unit6'
                      ? '-았어요'
                      : selectedUnit === 'unit5'
                      ? '-어요 ★'
                      : selectedUnit === 'unit4'
                      ? '-아요 ★'
                      : selectedUnit === 'unit3'
                      ? '-해요'
                      : selectedUnit === 'unit2'
                      ? '-어요'
                      : '-아요'
                  }
                </h3>
              </div>

              {/* Modal Content based on unit */}
              {selectedUnit === 'unit1' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    동사나 형용사의 어간 끝음절 모음이{' '}
                    <span className="font-black text-amber-600">ㅏ, ㅗ</span>이면{' '}
                    <span className="font-black text-red-600">‘-아요’</span>를 붙여요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('받다, 받아요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      받다 → <span className="font-black text-red-600">받아요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('놀다, 놀아요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      놀다 → <span className="font-black text-red-600">놀아요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('좋다, 좋아요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      좋다 → <span className="font-black text-red-600">좋아요</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    ‘-어1’는 동사나 형용사, ‘이다, 아니다′ 뒤에 붙어 생각을 말하거나 설명할 때 사용하는 종결어미이다. 높임 표현으로는 ‘-요’가 결합한 ‘-어요’의 형태로 사용한다. -국립국어원
                  </p>
                </div>
              )}

              {selectedUnit === 'unit2' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    동사나 형용사의 어간 끝음절 모음이{' '}
                    <span className="font-black text-amber-600">‘ㅏ, ㅗ’가 아니면</span>{' '}
                    <span className="font-black text-red-600">‘-어요’</span>를 붙여요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('먹다, 먹어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      먹다 → <span className="font-black text-red-600">먹어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('씻다, 씻어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      씻다 → <span className="font-black text-red-600">씻어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('입다, 입어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      입다 → <span className="font-black text-red-600">입어요</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘다’를 빼고 ‘-어요’를 붙이는 기본 형태를 익혀 보세요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit3' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    <span className="font-black text-purple-700">‘하다’</span>로 끝나는 동사나 형용사는{' '}
                    <span className="font-black text-red-600">‘-해요’</span>로 바뀌어요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('공부하다, 공부해요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      공부하다 → <span className="font-black text-red-600">공부해요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('청소하다, 청소해요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      청소하다 → <span className="font-black text-red-600">청소해요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('숙제하다, 숙제해요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      숙제하다 → <span className="font-black text-red-600">숙제해요</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘하다’를 빼고 ‘-해요’를 붙이는 기본 형태를 익혀 보세요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit4' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    모음이 만나거나 어간의 모양이 달라지면서 활용형이 바뀌기도 해요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('오다, 와요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      오다 → <span className="font-black text-red-600">와요</span> (모음 축약)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('아프다, 아파요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      아프다 → <span className="font-black text-red-600">아파요</span> (ㅡ 탈락)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('돕다, 도와요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      돕다 → <span className="font-black text-red-600">도와요</span> (ㅂ 불규칙)
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    기본 규칙과 다른 형태도 눈으로 익히고 소리 내어 연습해 보세요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit5' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    <span className="font-black text-red-600">‘-어요’</span>를 붙일 때도 모음이 줄어들거나 어간의 모양이 달라지는 경우가 있어요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('주다, 줘요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      주다 → <span className="font-black text-red-600">줘요</span> (모음 축약)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('쓰다, 써요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      쓰다 → <span className="font-black text-red-600">써요</span> (ㅡ 탈락)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('듣다, 들어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      듣다 → <span className="font-black text-red-600">들어요</span> (ㄷ 불규칙)
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    활용할 때 모양이 달라지는 동사와 형용사는 바뀐 형태를 함께 익혀 보세요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit6' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    동작이나 상태가 이미 지나간 일(과거)임을 나타낼 때{' '}
                    <span className="font-black text-red-600">‘-았어요’</span>를 써요.<br />
                    어간 끝음절의 모음이 <span className="font-black text-amber-600">‘ㅏ, ㅗ’</span>이면{' '}
                    <span className="font-black text-red-600">‘-았어요’</span>를 붙여요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('닦다, 닦았어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      닦다 → <span className="font-black text-red-600">닦았어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('앉다, 앉았어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      앉다 → <span className="font-black text-red-600">앉았어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('좋다, 좋았어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      좋다 → <span className="font-black text-red-600">좋았어요</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    끝음절의 모음을 확인하고 ‘-았어요’를 붙여 지나간 일을 말해 보세요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원 한국어기초사전
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit7' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    어간 끝음절의 모음이 <span className="font-black text-amber-600">‘ㅏ, ㅗ’가 아닌 모든 모음</span>일 때{' '}
                    <span className="font-black text-red-600">‘-었어요’</span>를 붙여요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('신다, 신었어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      신다 → <span className="font-black text-red-600">신었어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('웃다, 웃었어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      웃다 → <span className="font-black text-red-600">웃었어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('만들다, 만들었어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      만들다 → <span className="font-black text-red-600">만들었어요</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    끝음절 모음이 ‘ㅏ, ㅗ’인지 아닌지 먼저 확인해 보세요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원 한국어기초사전
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit8' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    <span className="font-black text-purple-700">‘하다’</span>가 붙은 동사는 과거의 일을 말할 때{' '}
                    <span className="font-black text-red-600">‘-했어요’</span>로 바꿔요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('시작하다, 시작했어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      시작하다 → <span className="font-black text-red-600">시작했어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('운동하다, 운동했어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      운동하다 → <span className="font-black text-red-600">운동했어요</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('정리하다, 정리했어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      정리하다 → <span className="font-black text-red-600">정리했어요</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘하다’를 떼어내고 ‘-했어요’를 쏙 붙여 주면 돼요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원 한국어기초사전
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit9' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    어간의 끝 모음과 <span className="font-black text-red-600">‘-았-’</span>이 만날 때 글자가 줄어들거나 어간의 받침이 바뀌기도 해요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('타다, 탔어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      타다 → <span className="font-black text-purple-600">탔어요</span> (모음 탈락)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('모르다, 몰랐어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      모르다 → <span className="font-black text-purple-600">몰랐어요</span> (르 불규칙)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('낫다, 나았어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      낫다 → <span className="font-black text-purple-600">나았어요</span> (ㅅ 탈락)
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    모양이 변하는 특별한 단어들은 통째로 기억해 두면 좋아요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원 한국어기초사전
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit10' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    과거형 <span className="font-black text-red-600">‘-었어요’</span>와 만날 때 모음이 합쳐지거나 어간의 모양(ㅎ·ㅂ 불규칙 등)이 달라져요.
                  </p>

                  {/* 예시 단어 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('그리다, 그렸어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      그리다 → <span className="font-black text-purple-600">그렸</span><span className="font-black text-red-600">어요</span> (축약)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('까맣다, 까맸어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      까맣다 → <span className="font-black text-slate-800">까</span><span className="font-black text-purple-600">맸</span><span className="font-black text-red-600">어요</span> (ㅎ 불규칙)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('춥다, 추웠어요', 0.85);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      춥다 → <span className="font-black text-purple-600">추웠</span><span className="font-black text-red-600">어요</span> (ㅂ 불규칙)
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘까맣다 + -았어요 → 까맸어요’처럼 받침 ‘ㅎ’이 빠지고 모음이 변하는 모습도 눈으로 확인해 보세요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원 한국어기초사전
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit11' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    내 의지로 하지 않을 때는 <span className="font-black text-green-600">‘안 + [용언]’</span>, 능력이 부족하거나 상황상 못 할 때는 <span className="font-black text-green-600">‘못 + [용언]’</span>을 써요.
                  </p>

                  {/* 예시 단어 3개 박스 (클릭 시 발음 듣기 가능) */}
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('남기다, 안 남겨요', 1.0, 1.0);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      남기다 → <span className="font-black text-green-600">안</span>{' '}
                      <span className="font-black text-slate-800">남</span>
                      <span className="font-black text-purple-600">겨</span>
                      <span className="font-black text-red-600">요</span> (의지)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('던지다, 못 던져요', 1.0, 1.0);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      던지다 → <span className="font-black text-green-600">못</span>{' '}
                      <span className="font-black text-slate-800">던</span>
                      <span className="font-black text-purple-600">져</span>
                      <span className="font-black text-red-600">요</span> (능력)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean('참다, 못 참아요', 1.0, 1.0);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
                      title="클릭하여 발음 듣기"
                    >
                      참다 → <span className="font-black text-green-600">못</span>{' '}
                      <span className="font-black text-slate-800">참</span>
                      <span className="font-black text-red-600">아요</span> (상황)
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    단순 부정(안)과 상황/능력 부정(못)의 차이를 구별하여 표현해요.
                  </p>

                  <div className="pt-2 text-right">
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-400">
                      출처: 국립국어원 한국어 교수·학습 샘터
                    </span>
                  </div>
                </div>
              )}

              {selectedUnit === 'unit12' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    ‘[명사] + 하다’ 동사는 ‘안/못’이 <span className="font-black text-green-600">명사와 ‘해요’ 사이</span>에 들어가요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('게임하다, 게임 안 해요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      게임하다 → <span className="font-black text-slate-800">게임</span> <span className="font-black text-green-600">안</span> <span className="font-black text-red-600">해요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('줄넘기하다, 줄넘기 못 해요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      줄넘기하다 → <span className="font-black text-slate-800">줄넘기</span> <span className="font-black text-green-600">못</span> <span className="font-black text-red-600">해요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('샤워하다, 샤워 안 해요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      샤워하다 → <span className="font-black text-slate-800">샤워</span> <span className="font-black text-green-600">안</span> <span className="font-black text-red-600">해요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    의지 부정은 ‘명사 안 해요’, 능력·상황 부정은 ‘명사 못 해요’로 나누어 표현해요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit13' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    동사 어간 뒤에 받침 유무와 상관없이 <span className="font-black text-red-600">‘-고 싶어요’</span>를 붙여 바라는 마음을 말해요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('배우다, 배우고 싶어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      배우다 → <span className="font-black text-slate-800">배우</span><span className="font-black text-red-600">고 싶어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('만나다, 만나고 싶어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      만나다 → <span className="font-black text-slate-800">만나</span><span className="font-black text-red-600">고 싶어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('잘하다, 잘하고 싶어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      잘하다 → <span className="font-black text-slate-800">잘</span><span className="font-black text-red-600">하고 싶어요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    내가 하고 싶은 희망이나 소망을 나타낼 때 자주 사용하는 표현이에요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit14' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    동사 어간 뒤에 받침과 관계없이 <span className="font-black text-red-600">‘-고 있어요’</span>를 붙여 지금 진행 중인 일을 말해요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('일하다, 일하고 있어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      일하다 → <span className="font-black text-slate-800">일</span><span className="font-black text-red-600">하고 있어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('짓다, 짓고 있어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      짓다 → <span className="font-black text-slate-800">짓</span><span className="font-black text-red-600">고 있어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('물어보다, 물어보고 있어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      물어보다 → <span className="font-black text-slate-800">물어보</span><span className="font-black text-red-600">고 있어요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    지금 눈앞에서 동작이 계속 이어지고 있을 때 사용해요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit15' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    받침이 없거나 ‘ㄹ’ 받침이면 <span className="font-black text-red-600">‘-세요’</span>, ‘ㄹ’ 제외 받침이 있으면 <span className="font-black text-red-600">‘-으세요’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('서다, 서세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      서다 → <span className="font-black text-slate-800">서</span><span className="font-black text-red-600">세요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('걷다, 걸으세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      걷다 → <span className="font-black text-purple-600">걸</span><span className="font-black text-red-600">으세요</span> (ㄷ 불규칙)
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('풀다, 푸세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      풀다 → <span className="font-black text-purple-600">푸</span><span className="font-black text-red-600">세요</span> (ㄹ 탈락)
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    상대방에게 어떤 행동을 정중하게 안내하거나 요청할 때 써요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit16' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    동사 어간 뒤에 받침과 관계없이 <span className="font-black text-red-600">‘-지 마세요’</span>를 붙여 하지 말라고 말해요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('뛰다, 뛰지 마세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      뛰다 → <span className="font-black text-slate-800">뛰</span><span className="font-black text-red-600">지 마세요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('떠들다, 떠들지 마세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      떠들다 → <span className="font-black text-slate-800">떠들</span><span className="font-black text-red-600">지 마세요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('버리다, 버리지 마세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      버리다 → <span className="font-black text-slate-800">버리</span><span className="font-black text-red-600">지 마세요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    공공장소나 학교에서 지켜야 할 안전 약속과 금지를 부드럽게 알려줘요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit17' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    받침이 없거나 ‘ㄹ’ 받침이면 <span className="font-black text-red-600">‘-ㄹ 거예요’</span>, 그 외 자음 받침이면 <span className="font-black text-red-600">‘-을 거예요’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('가져오다, 가져올 거예요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      가져오다 → <span className="font-black text-slate-800">가져</span><span className="font-black text-purple-600">올</span> <span className="font-black text-red-600">거예요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('살다, 살 거예요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      살다 → <span className="font-black text-slate-800">살</span> <span className="font-black text-red-600">거예요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('놓다, 놓을 거예요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      놓다 → <span className="font-black text-slate-800">놓</span><span className="font-black text-red-600">을 거예요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    앞으로 할 계획이나 미래에 일어날 일을 말할 때 써요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit18' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    ‘ㅏ, ㅗ’면 <span className="font-black text-red-600">‘-아 주세요’</span>, 아니면 <span className="font-black text-red-600">‘-어 주세요’</span>, ‘하다’는 <span className="font-black text-red-600">‘-해 주세요’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('기다리다, 기다려 주세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      기다리다 → <span className="font-black text-slate-800">기다</span><span className="font-black text-purple-600">려</span> <span className="font-black text-red-600">주세요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('깎다, 깎아 주세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      깎다 → <span className="font-black text-slate-800">깎</span><span className="font-black text-red-600">아 주세요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('끄다, 꺼 주세요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      끄다 → <span className="font-black text-purple-600">꺼</span> <span className="font-black text-red-600">주세요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    다른 사람에게 도움을 요청하거나 공손히 부탁할 때 써요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit19' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    ‘ㅏ, ㅗ’면 <span className="font-black text-red-600">‘-아도 돼요?’</span>, 아니면 <span className="font-black text-red-600">‘-어도 돼요?’</span>, ‘하다’는 <span className="font-black text-red-600">‘-해도 돼요?’</span>로 허락을 구해요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('들어가다, 들어가도 돼요?', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      들어가다 → <span className="font-black text-slate-800">들어가</span><span className="font-black text-red-600">도 돼요?</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('빌리다, 빌려도 돼요?', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      빌리다 → <span className="font-black text-slate-800">빌</span><span className="font-black text-purple-600">려</span><span className="font-black text-red-600">도 돼요?</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('움직이다, 움직여도 돼요?', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      움직이다 → <span className="font-black text-slate-800">움직</span><span className="font-black text-purple-600">여</span><span className="font-black text-red-600">도 돼요?</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    교실이나 생활 속에서 어떤 행동을 해도 괜찮은지 공손히 물어볼 때 써요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit20' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    ‘ㅏ, ㅗ’면 <span className="font-black text-red-600">‘-아야 돼요’</span>, 아니면 <span className="font-black text-red-600">‘-어야 돼요’</span>, ‘하다’는 <span className="font-black text-red-600">‘-해야 돼요’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('조심하다, 조심해야 돼요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      조심하다 → <span className="font-black text-slate-800">조심</span><span className="font-black text-red-600">해야 돼요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('지키다, 지켜야 돼요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      지키다 → <span className="font-black text-slate-800">지</span><span className="font-black text-purple-600">켜</span><span className="font-black text-red-600">야 돼요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('바르다, 발라야 돼요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      바르다 → <span className="font-black text-purple-600">발라</span><span className="font-black text-red-600">야 돼요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    꼭 해야 하는 일이나 지켜야 할 규칙·의무를 나타낼 때 사용해요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit21' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    받침이 없거나 ‘ㄹ’ 받침이면 <span className="font-black text-red-600">‘-ㄹ 수 있어요(없어요)’</span>, ‘ㄹ’ 제외 받침이면 <span className="font-black text-red-600">‘-을 수 있어요(없어요)’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('건너다, 건널 수 있어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      건너다 → <span className="font-black text-slate-800">건</span><span className="font-black text-purple-600">널</span> <span className="font-black text-red-600">수 있어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('날다, 날 수 있어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      날다 → <span className="font-black text-slate-800">날</span> <span className="font-black text-red-600">수 있어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('밟다, 밟을 수 없어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      밟다 → <span className="font-black text-slate-800">밟</span><span className="font-black text-red-600">을 수 없어요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    어떤 일을 할 수 있는 능력이나 가능성을 말하거나, 할 수 없음을 표현할 때 써요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit22' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    상대방에게 함께하자고 제안하거나 의견을 물을 때, 받침 없음/‘ㄹ’ 뒤 <span className="font-black text-red-600">‘-ㄹ까요?’</span>, 자음 받침 뒤 <span className="font-black text-red-600">‘-을까요?’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('나누다, 나눌까요?', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      나누다 → <span className="font-black text-slate-800">나</span><span className="font-black text-purple-600">눌</span><span className="font-black text-red-600">까요?</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('더하다, 더할까요?', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      더하다 → <span className="font-black text-slate-800">더</span><span className="font-black text-red-600">할까요?</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('빼다, 뺄까요?', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      빼다 → <span className="font-black text-purple-600">뺄</span><span className="font-black text-red-600">까요?</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    친구나 선생님에게 같이 할 일을 부드럽게 제안할 때 자주 사용해요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit23' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    동사나 형용사 어간 뒤에 받침 유무에 상관없이 <span className="font-black text-red-600">‘-고’</span>를 붙여 동작 순서나 두 가지를 나열해요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('세수하다, 세수하고', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      세수하다 → <span className="font-black text-slate-800">세수</span><span className="font-black text-red-600">하고</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('펴다, 펴고', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      펴다 → <span className="font-black text-slate-800">펴</span><span className="font-black text-red-600">고</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('좋아하다, 좋아하고', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      좋아하다 → <span className="font-black text-slate-800">좋아</span><span className="font-black text-red-600">하고</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    앞의 일을 먼저 한 뒤 다음 일을 하거나, 좋아하는 것을 나란히 이어 말할 때 써요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit24' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    어간 끝에 받침이 있든 없든 모양 변화 없이 그대로 <span className="font-black text-red-600">‘-지만’</span>을 붙여 반대되는 내용을 연결해요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('어렵다, 어렵지만', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      어렵다 → <span className="font-black text-slate-800">어렵</span><span className="font-black text-red-600">지만</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('무겁다, 무겁지만', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      무겁다 → <span className="font-black text-slate-800">무겁</span><span className="font-black text-red-600">지만</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('멀다, 멀지만', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      멀다 → <span className="font-black text-slate-800">멀</span><span className="font-black text-red-600">지만</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘ㅂ’이나 ‘ㄹ’ 받침이 있어도 바뀌지 않고 ‘다’ 자리에 ‘-지만’만 붙이면 돼요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit25' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    원인·이유를 말할 때 ‘ㅏ, ㅗ’면 <span className="font-black text-red-600">‘-아서’</span>, 아니면 <span className="font-black text-red-600">‘-어서’</span>, ‘하다’는 <span className="font-black text-red-600">‘-해서’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('배고프다, 배고파서', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      배고프다 → <span className="font-black text-slate-800">배고</span><span className="font-black text-purple-600">파</span><span className="font-black text-red-600">서</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('덥다, 더워서', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      덥다 → <span className="font-black text-slate-800">더</span><span className="font-black text-purple-600">워</span><span className="font-black text-red-600">서</span> (ㅂ 불규칙)
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('빠르다, 빨라서', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      빠르다 → <span className="font-black text-purple-600">빨라</span><span className="font-black text-red-600">서</span> (르 불규칙)
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    앞 문장이 뒤 문장의 이유나 원인이 될 때 자연스럽게 이어 주는 연결 표현이에요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit26' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    어떤 조건이나 가정을 말할 때 받침 없음/‘ㄹ’ 받침 뒤 <span className="font-black text-red-600">‘-면’</span>, 그 외 자음 받침 뒤 <span className="font-black text-red-600">‘-으면’</span>을 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('그렇다, 그러면', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      그렇다 → <span className="font-black text-slate-800">그</span><span className="font-black text-purple-600">러</span><span className="font-black text-red-600">면</span> (ㅎ 불규칙)
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('힘들다, 힘들면', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      힘들다 → <span className="font-black text-slate-800">힘들</span><span className="font-black text-red-600">면</span> (‘ㄹ’ 유지)
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('작다, 작으면', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      작다 → <span className="font-black text-slate-800">작</span><span className="font-black text-red-600">으면</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘그렇다’처럼 받침 ‘ㅎ’으로 끝나는 말은 모음 어미 ‘-(으)면’ 앞에서 ‘ㅎ’과 ‘으’가 모두 빠져 ‘그러면’이 돼요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit27' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    어떤 일이 일어나는 순간이나 시간을 말할 때 받침 없음/‘ㄹ’ 뒤 <span className="font-black text-red-600">‘-ㄹ 때’</span>, 자음 받침 뒤 <span className="font-black text-red-600">‘-을 때’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('발표하다, 발표할 때', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      발표하다 → <span className="font-black text-slate-800">발표</span><span className="font-black text-red-600">할 때</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('졸리다, 졸릴 때', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      졸리다 → <span className="font-black text-slate-800">졸</span><span className="font-black text-purple-600">릴</span> <span className="font-black text-red-600">때</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('벗다, 벗을 때', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      벗다 → <span className="font-black text-slate-800">벗</span><span className="font-black text-red-600">을 때</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘졸리+ㄹ’처럼 모음으로 끝난 어간에는 ‘ㄹ’ 받침이 들어가 한 글자가 돼요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit28' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    무엇을 하러 이동할 때 받침 없음/‘ㄹ’ 뒤 <span className="font-black text-red-600">‘-러 가요(와요)’</span>, 자음 받침 뒤 <span className="font-black text-red-600">‘-으러 가요(와요)’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('구경하다, 구경하러 가요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      구경하다 → <span className="font-black text-slate-800">구경</span><span className="font-black text-red-600">하러 가요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('반납하다, 반납하러 와요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      반납하다 → <span className="font-black text-slate-800">반납</span><span className="font-black text-red-600">하러 와요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('심다, 심으러 가요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      심다 → <span className="font-black text-slate-800">심</span><span className="font-black text-red-600">으러 가요</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    뒤에는 꼭 ‘가요, 와요’ 같은 이동을 나타내는 동사가 함께 와요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit29' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    행동 이전은 <span className="font-black text-red-600">‘-기 전에’</span>, 행동 이후는 받침 없으면 <span className="font-black text-red-600">‘-ㄴ 후에’</span>, 받침 있으면 <span className="font-black text-red-600">‘-은 후에’</span>를 써요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('양치하다, 양치하기 전에', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      양치하다 → <span className="font-black text-slate-800">양치</span><span className="font-black text-red-600">하기 전에</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('모으다, 모은 후에', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      모으다 → <span className="font-black text-slate-800">모</span><span className="font-black text-purple-600">은</span> <span className="font-black text-red-600">후에</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('섞다, 섞은 후에', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      섞다 → <span className="font-black text-slate-800">섞</span><span className="font-black text-red-600">은 후에</span>
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    ‘모으다’는 ‘모은 후에’가 되는 예외 형태이므로 모양을 꼭 함께 기억해 두세요.
                  </p>
                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}

              {selectedUnit === 'unit30' && (
                <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-normal text-slate-800">
                    ‘ㅏ, ㅗ’면 <span className="font-black text-red-600">‘-아 봤어요’</span>, 아니면 <span className="font-black text-red-600">‘-어 봤어요’</span>, ‘하다’는 <span className="font-black text-red-600">‘-해 봤어요’</span>로 경험을 말해요.
                  </p>
                  <div className="py-2.5 px-3.5 bg-purple-50/70 rounded-2xl border border-purple-100 flex flex-wrap items-center justify-between gap-2">
                    <button type="button" onClick={() => { playCutePop(); speakKorean('안다, 안아 봤어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      안다 → <span className="font-black text-slate-800">안</span><span className="font-black text-red-600">아 봤어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('춤추다, 춤춰 봤어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      춤추다 → <span className="font-black text-slate-800">춤</span><span className="font-black text-purple-600">춰</span> <span className="font-black text-red-600">봤어요</span>
                    </button>
                    <button type="button" onClick={() => { playCutePop(); speakKorean('묻다, 물어봤어요', 1.0, 1.0); }} className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-purple-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800">
                      묻다 → <span className="font-black text-purple-600">물</span><span className="font-black text-red-600">어봤어요</span> (ㄷ 불규칙)
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal">
                    내가 해 본 경험이나 시도해 본 일을 이야기할 때 사용해요.
                  </p>

                  {/* 마지막 불규칙 완주 및 초급 패스 불규칙 2가지 안내 (1회성 배치) */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                    <p className="text-xs sm:text-sm font-bold text-amber-900">
                      🎉 ‘묻다 → 물어봤어요(ㄷ 불규칙)’가 이제 용언 과정의 마지막 불규칙이에요!
                    </p>
                    <p className="text-xs sm:text-[13px] font-extrabold text-slate-900">
                      [💡 안 배워도 될까? 초급 패스 불규칙 2가지]
                    </p>
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                      한국어 불규칙 중에는 &apos;우 불규칙&apos;과 &apos;러 불규칙&apos;도 있어요. 하지만 &apos;우 불규칙&apos;은 세상에 딱 한 단어 &apos;푸다(물을 퍼요)&apos;밖에 없고, &apos;러 불규칙&apos;은 &apos;이르다(이르러요), 푸르다(푸르러요)&apos;처럼 글을 쓸 때나 어른들이 쓰는 어려운 말이에요. 그래서 초등·기초 한국어 단계에서는 과감히 패스해도 전혀 문제가 없답니다! 찡긋! 😉
                    </p>
                  </div>

                  <div className="pt-2 text-right"><span className="text-[11px] sm:text-xs font-semibold text-slate-400">출처: 국립국어원 한국어 교수·학습 샘터</span></div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
