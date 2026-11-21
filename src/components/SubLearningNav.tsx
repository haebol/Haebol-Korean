import React from 'react';
import { ActiveTab, SupportedLanguage, SUB_MENU_LABELS } from '../types';
import { StudyMode } from './StudySection';
import { GameType } from './GamesSection';
import { playCutePop } from '../utils/audio';

const HANGEUL_AND_CLASSROOM_SUB_LABELS: Record<SupportedLanguage, {
  cards: string;
  writing: string;
  quiz: string;
  jamo: string;
  basic: string;
  batchim: string;
  words: string;
}> = {
  en: { cards: 'Flashcards', writing: 'Writing', quiz: 'Dictation', jamo: 'Jamo', basic: 'Basic Letters', batchim: 'Final Cons.', words: 'Words' },
  vi: { cards: 'Thẻ hình', writing: 'Tập viết', quiz: 'Chính tả', jamo: 'Chữ cái', basic: 'Chữ cơ bản', batchim: 'Phụ âm cuối', words: 'Từ vựng' },
  bn: { cards: 'ছবি কার্ড', writing: 'লেখা অনুশীলন', quiz: 'শ্রুতলিপি', jamo: 'বর্ণমালা', basic: 'মৌলিক বর্ণ', batchim: 'শেষ ব্যঞ্জন', words: 'শব্দ' },
  zh: { cards: '图画卡片', writing: '描红练习', quiz: '听写测试', jamo: '辅音元音', basic: '基础拼读', batchim: '收音练习', words: '单词' },
  ru: { cards: 'Карточки', writing: 'Прописи', quiz: 'Диктант', jamo: 'Алфавит', basic: 'Основы', batchim: 'Конечные', words: 'Слова' },
  ja: { cards: '絵カード', writing: 'なぞり書き', quiz: '書き取り', jamo: 'ハングル字母', basic: '基本文字', batchim: 'パッチム', words: '単語' },
  mn: { cards: 'Зурагт карт', writing: 'Бичих дасгал', quiz: 'Цээж бичиг', jamo: 'Үсэг', basic: 'Үндсэн үсэг', batchim: 'Дэвсгэр үсэг', words: 'Үг' },
};

interface SubLearningNavProps {
  activeTab: ActiveTab;
  currentLang: SupportedLanguage;
  hangeulStudyMode: StudyMode;
  onSelectHangeulMode: (mode: StudyMode) => void;
  classroomStudyMode: StudyMode;
  onSelectClassroomMode: (mode: StudyMode) => void;
  studySubTab: 'hangeul' | 'words' | 'verbs';
  onSelectStudySubTab: (tab: 'hangeul' | 'words' | 'verbs') => void;
  activeGame: GameType;
  onSelectGame: (game: GameType) => void;
}

export const SubLearningNav: React.FC<SubLearningNavProps> = ({
  activeTab,
  currentLang,
  hangeulStudyMode,
  onSelectHangeulMode,
  classroomStudyMode,
  onSelectClassroomMode,
  studySubTab,
  onSelectStudySubTab,
  activeGame,
  onSelectGame,
}) => {
  const hcLabels = HANGEUL_AND_CLASSROOM_SUB_LABELS[currentLang] || HANGEUL_AND_CLASSROOM_SUB_LABELS.en;
  const subLabels = SUB_MENU_LABELS[currentLang] || SUB_MENU_LABELS.en;

  if (activeTab === 'hangeul') {
    const items: { id: StudyMode; ko: string; sub: string }[] = [
      { id: 'jamo', ko: '자음모음', sub: hcLabels.jamo },
      { id: 'basic', ko: '기본글자', sub: hcLabels.basic },
      { id: 'batchim', ko: '받침글자', sub: hcLabels.batchim },
      { id: 'words', ko: '낱말', sub: hcLabels.words },
    ];
    return (
      <div className="w-full no-print select-none font-korean-gothic bg-[#FFF9EC]/80 border-b border-amber-200/80">
        <div className="swipe-tab-strip sm:grid sm:grid-cols-4 w-full items-center gap-1 sm:gap-0 px-1.5 sm:px-0">
          {items.map((item) => {
            const isActive = hangeulStudyMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playCutePop();
                  onSelectHangeulMode(item.id);
                }}
                className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-2.5 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none font-korean-gothic ${
                  isActive
                    ? 'border-amber-500 text-amber-950 font-black bg-amber-100/50'
                    : 'border-transparent text-amber-800/85 hover:text-amber-950 hover:bg-amber-50/60 font-bold'
                }`}
                title={`${item.ko} (${item.sub})`}
              >
                <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
                  {item.ko}
                </span>
                <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
                  isActive ? 'text-amber-800 font-bold' : 'text-amber-700/70 font-medium'
                }`}>
                  {item.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === 'classroom') {
    const items: { id: StudyMode; ko: string; sub: string }[] = [
      { id: 'cards', ko: '그림카드', sub: hcLabels.cards },
      { id: 'writing', ko: '따라쓰기', sub: hcLabels.writing },
      { id: 'quiz', ko: '받아쓰기', sub: hcLabels.quiz },
    ];
    return (
      <div className="w-full no-print select-none font-korean-gothic bg-[#FAF5FF]/85 border-b border-purple-200/80">
        <div className="swipe-tab-strip sm:grid sm:grid-cols-3 w-full items-center gap-1 sm:gap-0 px-1.5 sm:px-0">
          {items.map((item) => {
            const isActive = classroomStudyMode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playCutePop();
                  onSelectClassroomMode(item.id);
                }}
                className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-2.5 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none font-korean-gothic ${
                  isActive
                    ? 'border-purple-600 text-purple-950 font-black bg-purple-100/50'
                    : 'border-transparent text-purple-800/85 hover:text-purple-950 hover:bg-purple-50/60 font-bold'
                }`}
                title={`${item.ko} (${item.sub})`}
              >
                <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
                  {item.ko}
                </span>
                <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
                  isActive ? 'text-purple-700 font-bold' : 'text-purple-600/70 font-medium'
                }`}>
                  {item.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeTab === 'study') {
    return (
      <div className="w-full no-print select-none font-korean-gothic bg-[#FAF5FF]/85 border-b border-purple-200/80">
        <div className="swipe-tab-strip sm:grid sm:grid-cols-3 w-full items-center gap-1 sm:gap-0 px-1.5 sm:px-0">
          <button
            type="button"
            onClick={() => {
              playCutePop();
              onSelectStudySubTab('hangeul');
            }}
            className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-3 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none ${
              studySubTab === 'hangeul'
                ? 'border-amber-500 text-amber-950 font-black bg-amber-100/50'
                : 'border-transparent text-amber-800/85 hover:text-amber-950 hover:bg-amber-50/50 font-bold'
            }`}
            title={`한글기초 (${subLabels.hangeulIntro})`}
          >
            <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
              한글기초
            </span>
            <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
              studySubTab === 'hangeul' ? 'text-amber-800 font-bold' : 'text-amber-700/70 font-medium'
            }`}>
              {subLabels.hangeulIntro}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playCutePop();
              onSelectStudySubTab('words');
            }}
            className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-3 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none ${
              studySubTab === 'words'
                ? 'border-purple-600 text-purple-950 font-black bg-purple-100/50'
                : 'border-transparent text-purple-800/85 hover:text-purple-950 hover:bg-purple-50/50 font-bold'
            }`}
            title={`교실어휘 (${subLabels.classroomVocab})`}
          >
            <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
              교실어휘
            </span>
            <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
              studySubTab === 'words' ? 'text-purple-700 font-bold' : 'text-purple-600/70 font-medium'
            }`}>
              {subLabels.classroomVocab}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              playCutePop();
              onSelectStudySubTab('verbs');
            }}
            className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-3 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none ${
              studySubTab === 'verbs'
                ? 'border-purple-600 text-purple-950 font-black bg-purple-100/50'
                : 'border-transparent text-purple-800/85 hover:text-purple-950 hover:bg-purple-50/50 font-bold'
            }`}
            title={`동사활용 (${subLabels.verbConjugation})`}
          >
            <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
              동사활용
            </span>
            <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
              studySubTab === 'verbs' ? 'text-purple-700 font-bold' : 'text-purple-600/70 font-medium'
            }`}>
              {subLabels.verbConjugation}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full no-print select-none font-korean-gothic bg-[#FAF5FF]/85 border-b border-purple-200/80">
      <div className="swipe-tab-strip sm:grid sm:grid-cols-4 w-full items-center gap-1 sm:gap-0 px-1.5 sm:px-0">
        <button
          type="button"
          onClick={() => {
            playCutePop();
          }}
          className="shrink-0 sm:shrink h-[30px] sm:h-[34px] px-2.5 sm:px-2 border-b-2 border-transparent whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none text-amber-800/85 hover:text-amber-950 hover:bg-amber-50/50 font-bold"
          title={`한글게임 (${subLabels.hangeulGame})`}
        >
          <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
            한글게임
          </span>
          <span className="text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight text-amber-700/70 font-medium">
            {subLabels.hangeulGame}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            playCutePop();
            onSelectGame('kart');
          }}
          className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-2.5 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none ${
            activeGame === 'kart'
              ? 'border-purple-600 text-purple-950 font-black bg-purple-100/50'
              : 'border-transparent text-purple-800/85 hover:text-purple-950 hover:bg-purple-50/50 font-bold'
          }`}
          title={`카트게임 (${subLabels.kartGame})`}
        >
          <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
            카트게임
          </span>
          <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
            activeGame === 'kart' ? 'text-purple-700 font-bold' : 'text-purple-600/70 font-medium'
          }`}>
            {subLabels.kartGame}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            playCutePop();
            onSelectGame('balloon');
          }}
          className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-2.5 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none ${
            activeGame === 'balloon'
              ? 'border-purple-600 text-purple-950 font-black bg-purple-100/50'
              : 'border-transparent text-purple-800/85 hover:text-purple-950 hover:bg-purple-50/50 font-bold'
          }`}
          title={`풍선게임 (${subLabels.balloonGame})`}
        >
          <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
            풍선게임
          </span>
          <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
            activeGame === 'balloon' ? 'text-purple-700 font-bold' : 'text-purple-600/70 font-medium'
          }`}>
            {subLabels.balloonGame}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            playCutePop();
            onSelectGame('memory');
          }}
          className={`shrink-0 sm:shrink h-[30px] sm:h-[34px] px-2.5 sm:px-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer flex items-center justify-center gap-1 leading-none ${
            activeGame === 'memory'
              ? 'border-purple-600 text-purple-950 font-black bg-purple-100/50'
              : 'border-transparent text-purple-800/85 hover:text-purple-950 hover:bg-purple-50/50 font-bold'
          }`}
          title={`카드게임 (${subLabels.memoryGame})`}
        >
          <span className="font-korean-gothic text-[12px] sm:text-[13px] leading-none whitespace-nowrap">
            카드게임
          </span>
          <span className={`text-[9px] sm:text-[10px] leading-none whitespace-nowrap tracking-tight ${
            activeGame === 'memory' ? 'text-purple-700 font-bold' : 'text-purple-600/70 font-medium'
          }`}>
            {subLabels.memoryGame}
          </span>
        </button>
      </div>
    </div>
  );
};

