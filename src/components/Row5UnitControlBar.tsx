import React, { useState } from 'react';
import { ChevronDown, LayoutGrid } from 'lucide-react';
import {
  ActiveTab,
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
} from '../types';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { StudyMode } from './StudySection';
import { GameType } from './GamesSection';
import { HANGEUL_GROUPS } from './HangeulStrokeFlashcardSection';
import {
  JAMO_SECTION_OPTIONS,
  BASIC_SECTION_OPTIONS,
  BATCHIM_SECTION_OPTIONS,
  WORDS_SECTION_OPTIONS,
  VERB_UNIT_OPTIONS,
  VerbUnitOption,
} from '../data/worksheetMeta';
import { playCutePop } from '../utils/audio';

interface Row5UnitControlBarProps {
  activeTab: ActiveTab;
  currentLang: SupportedLanguage;
  // Hangeul worksheet controls
  hangeulStudyMode: StudyMode;
  selectedJamoSection: string;
  onSelectJamoSection: (id: string, targetSheet: number) => void;
  selectedBasicSection: string;
  onSelectBasicSection: (id: string, targetSheet: number) => void;
  selectedBatchimSection: string;
  onSelectBatchimSection: (id: string, targetSheet: number) => void;
  selectedWordsSection: string;
  onSelectWordsSection: (id: string, targetSheet: number) => void;
  // Classroom worksheet controls
  classroomStudyMode?: StudyMode;
  selectedChapter: number;
  onSelectChapter: (ch: number) => void;
  customSelectedLangs: SupportedLanguage[];
  onToggleCustomLang: (code: SupportedLanguage) => void;
  onPrintAll: () => void;
  onPrintTripleSet: () => void;
  // Study (Flashcards) controls
  studySubTab: 'hangeul' | 'words' | 'verbs';
  selectedHangeulGroupId: string;
  onSelectHangeulGroupId: (id: string) => void;
  selectedVerbUnit: VerbUnitOption['id'];
  onSelectVerbUnit: (unit: VerbUnitOption['id']) => void;
  // Games controls
  activeGame: GameType;
  // Page overview grid popup trigger
  onOpenOverview: () => void;
}

const SELECT_CLASS =
  'row5-select w-full h-[42px] sm:h-[44px] py-2 pl-3 pr-9 rounded-none bg-white border font-black text-[13px] sm:text-sm leading-[1.4] appearance-none cursor-pointer focus:outline-none focus:ring-1 font-korean-gothic shadow-none text-ellipsis';

export const Row5UnitControlBar: React.FC<Row5UnitControlBarProps> = ({
  activeTab,
  currentLang,
  hangeulStudyMode,
  selectedJamoSection,
  onSelectJamoSection,
  selectedBasicSection,
  onSelectBasicSection,
  selectedBatchimSection,
  onSelectBatchimSection,
  selectedWordsSection,
  onSelectWordsSection,
  classroomStudyMode: _classroomStudyMode,
  selectedChapter,
  onSelectChapter,
  customSelectedLangs,
  onToggleCustomLang,
  onPrintAll,
  onPrintTripleSet,
  studySubTab,
  selectedHangeulGroupId,
  onSelectHangeulGroupId,
  selectedVerbUnit,
  onSelectVerbUnit,
  onOpenOverview,
}) => {
  const [isCustomLangOpen, setIsCustomLangOpen] = useState(false);

  const currentChapterObj = CHAPTER_LIST.find(c => c.ch === selectedChapter) || CHAPTER_LIST[0];

  const renderOverviewButton = (accent: 'amber' | 'rose' | 'purple' = 'rose') => {
    const colorClass =
      accent === 'amber'
        ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
        : accent === 'purple'
        ? 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300'
        : 'bg-pink-100 hover:bg-pink-200 text-rose-950 border-pink-300';

    return (
      <button
        type="button"
        onClick={() => {
          playCutePop();
          onOpenOverview();
        }}
        className={`h-[42px] sm:h-[44px] px-3 sm:px-3.5 rounded-none border font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all shrink-0 whitespace-nowrap font-korean-gothic ${colorClass}`}
        title="모아보기 (전체 페이지 한눈에 보기)"
        aria-label="모아보기"
      >
        <LayoutGrid className="w-4 h-4 shrink-0" />
        <span>모아보기</span>
      </button>
    );
  };

  if (activeTab === 'hangeul') {
    const isWordsMode = hangeulStudyMode === 'words';
    return (
      <div className="w-full pt-0.5 relative z-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-2.5 no-print select-none font-korean-gothic">
        <div className="relative flex-1 min-w-[180px] sm:max-w-md">
          {hangeulStudyMode === 'jamo' && (
            <>
              <select
                value={selectedJamoSection}
                onChange={(e) => {
                  playCutePop();
                  const val = e.target.value;
                  const opt = JAMO_SECTION_OPTIONS.find(o => o.id === val);
                  onSelectJamoSection(val, opt ? opt.targetSheet : 0);
                }}
                className={`${SELECT_CLASS} hover:bg-rose-50/80 border-rose-300 text-rose-950 focus:ring-rose-400`}
                title="단원 선택"
              >
                {JAMO_SECTION_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}

          {hangeulStudyMode === 'basic' && (
            <>
              <select
                value={selectedBasicSection}
                onChange={(e) => {
                  playCutePop();
                  const val = e.target.value;
                  const opt = BASIC_SECTION_OPTIONS.find(o => o.id === val);
                  onSelectBasicSection(val, opt ? opt.targetSheet : 0);
                }}
                className={`${SELECT_CLASS} hover:bg-rose-50/80 border-rose-300 text-rose-950 focus:ring-rose-400`}
                title="단원 선택"
              >
                {BASIC_SECTION_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}

          {hangeulStudyMode === 'batchim' && (
            <>
              <select
                value={selectedBatchimSection}
                onChange={(e) => {
                  playCutePop();
                  const val = e.target.value;
                  const opt = BATCHIM_SECTION_OPTIONS.find(o => o.id === val);
                  onSelectBatchimSection(val, opt ? opt.targetSheet : 0);
                }}
                className={`${SELECT_CLASS} hover:bg-rose-50/80 border-rose-300 text-rose-950 focus:ring-rose-400`}
                title="단원 선택"
              >
                {BATCHIM_SECTION_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}

          {isWordsMode && (
            <>
              <select
                value={selectedWordsSection}
                onChange={(e) => {
                  playCutePop();
                  const val = e.target.value;
                  const opt = WORDS_SECTION_OPTIONS.find(o => o.id === val);
                  onSelectWordsSection(val, opt ? opt.targetSheet : 0);
                }}
                className={`${SELECT_CLASS} hover:bg-amber-50/80 border-amber-300 text-amber-950 focus:ring-amber-400`}
                title="단원 선택"
              >
                {WORDS_SECTION_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-amber-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 ml-auto justify-end shrink-0">
          {renderOverviewButton('amber')}
          <button
            type="button"
            onClick={() => {
              playCutePop();
              onPrintAll();
            }}
            className="h-[42px] sm:h-[44px] px-3 sm:px-4 rounded-none bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs sm:text-sm shadow-none active:scale-95 flex items-center justify-center text-center transition-all cursor-pointer font-korean-gothic whitespace-nowrap border border-slate-300"
            title={
              hangeulStudyMode === 'jamo'
                ? '총 14장 전체 일괄 인쇄'
                : hangeulStudyMode === 'basic'
                ? '총 21장 전체 일괄 인쇄'
                : hangeulStudyMode === 'batchim'
                ? '총 15장 전체 일괄 인쇄'
                : hangeulStudyMode === 'words'
                ? '총 30장 전체 일괄 인쇄'
                : '전체 인쇄'
            }
          >
            <span>전체인쇄</span>
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === 'classroom') {
    return (
      <div className="w-full pt-0.5 relative z-20 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-2.5 no-print select-none font-korean-gothic">
        {/* 1. 단원선택 드롭다운 */}
        <div className="relative flex-1 min-w-[145px] sm:flex-initial sm:w-[240px] md:w-[280px]">
          <select
            value={selectedChapter}
            onChange={(e) => {
              playCutePop();
              onSelectChapter(Number(e.target.value));
            }}
            className={`${SELECT_CLASS} hover:bg-rose-50/80 border-rose-300 text-rose-950 focus:ring-rose-400`}
            title="단원 선택"
          >
            {CHAPTER_LIST.map((ch) => (
              <option key={ch.ch} value={ch.ch}>
                {getChapterCircledTitle(ch.ch, currentLang)}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* 2. 언어 골라 담기 */}
        <div className="relative z-30 shrink-0 sm:flex-1 sm:max-w-[260px]">
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setIsCustomLangOpen(prev => !prev);
            }}
            className="h-[42px] sm:h-[44px] px-2.5 sm:px-3 py-1 rounded-none bg-[#441A75] hover:bg-[#52208E] active:scale-[0.98] text-white shadow-none flex items-center justify-between gap-2 transition-all focus:outline-none cursor-pointer border border-[#6328A6] w-full"
            title="학습지에 필요한 언어 골라 담기 (최소 1개 ~ 최대 3개, FIFO 순환)"
            aria-expanded={isCustomLangOpen}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-sm leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
              <span className="text-xs sm:text-xs font-bold text-white tracking-tight leading-snug whitespace-nowrap">
                언어 골라 담기
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="bg-[#FEF08A] text-[#1E0B36] font-extrabold text-[11px] px-1.5 py-0.5 rounded-none shadow-none whitespace-nowrap flex items-center leading-none">
                [{customSelectedLangs.length}/3]
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform shrink-0 ${isCustomLangOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {isCustomLangOpen && (
            <>
              <div
                className="fixed inset-0 z-[110] bg-black/10 backdrop-blur-[0.5px]"
                onClick={() => setIsCustomLangOpen(false)}
              />
              <div className="absolute right-0 sm:left-0 mt-1.5 w-[280px] xs:w-[320px] sm:w-[360px] max-w-[calc(100vw-1rem)] bg-white rounded-2xl shadow-2xl border-2 border-[#441A75]/30 p-2.5 sm:p-3 z-[115] font-korean-gothic text-xs text-slate-800 animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
                  <span className="font-black text-purple-950 text-xs">학습지 표기 언어 담기 (최대 3개)</span>
                  <span className="text-[11px] font-extrabold text-[#1E0B36] bg-[#FEF08A] px-2 py-0.5 rounded-full shadow-2xs">
                    [{customSelectedLangs.length}/3] 선택됨
                  </span>
                </div>

                <div className="space-y-2">
                  {SUPPORTED_LANGUAGES.map(langMeta => {
                    const isChecked = customSelectedLangs.includes(langMeta.code);
                    const orderIdx = customSelectedLangs.indexOf(langMeta.code);
                    return (
                      <button
                        key={langMeta.code}
                        type="button"
                        onClick={() => {
                          playCutePop();
                          onToggleCustomLang(langMeta.code);
                        }}
                        className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors text-left cursor-pointer border ${
                          isChecked
                            ? 'bg-purple-100/80 text-purple-950 font-black border-purple-300 shadow-2xs'
                            : 'bg-white hover:bg-purple-50/80 text-slate-800 font-bold border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{langMeta.flag}</span>
                          <span className="font-bold">{langMeta.fullName}</span>
                          {isChecked && (
                            <span className="text-[10px] font-extrabold text-purple-700 bg-purple-200/80 px-1.5 py-0.5 rounded-full">
                              {orderIdx + 1}순위
                            </span>
                          )}
                        </div>
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs font-bold ${
                          isChecked
                            ? 'bg-purple-700 border-purple-700 text-white'
                            : 'border-slate-400 bg-white text-transparent'
                        }`}>
                          ✓
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* 3. 모아보기 + 단원별인쇄 + 전체인쇄 */}
        <div className="flex items-center gap-2 sm:gap-2.5 ml-auto justify-end shrink-0 flex-wrap">
          {renderOverviewButton('rose')}

          <button
            type="button"
            onClick={() => {
              playCutePop();
              onPrintTripleSet();
            }}
            className="h-[42px] sm:h-[44px] px-3 sm:px-3.5 rounded-none bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs sm:text-sm shadow-none active:scale-95 flex items-center justify-center text-center transition-all cursor-pointer font-korean-gothic whitespace-nowrap border border-slate-300 shrink-0"
            title={`현재 선택된 단원(${currentChapterObj.circledTitle})의 [그림카드 + 따라쓰기 + 받아쓰기] 3장 연속 일괄 인쇄`}
          >
            <span>단원별인쇄</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playCutePop();
              onPrintAll();
            }}
            className="h-[42px] sm:h-[44px] px-3 sm:px-3.5 rounded-none bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs sm:text-sm shadow-none active:scale-95 flex items-center justify-center text-center transition-all cursor-pointer font-korean-gothic whitespace-nowrap border border-slate-300 shrink-0"
            title={`총 ${CHAPTER_LIST.length}장 전체 일괄 인쇄`}
          >
            <span>전체인쇄</span>
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === 'study') {
    return (
      <div className="w-full pt-0.5 relative z-20 flex items-center justify-center gap-2 sm:gap-2.5 no-print select-none font-korean-gothic">
        <div className="relative flex-1 max-w-md">
          {studySubTab === 'hangeul' && (
            <>
              <select
                value={selectedHangeulGroupId}
                onChange={(e) => {
                  playCutePop();
                  onSelectHangeulGroupId(e.target.value);
                }}
                className={`${SELECT_CLASS} hover:bg-amber-50/80 border-amber-300 text-amber-950 focus:ring-amber-400`}
                title="한글 기초 단원 선택"
              >
                {HANGEUL_GROUPS.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.titleKo} ({g.titleEn})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-amber-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}

          {studySubTab === 'words' && (
            <>
              <select
                value={selectedChapter}
                onChange={(e) => {
                  playCutePop();
                  onSelectChapter(Number(e.target.value));
                }}
                className={`${SELECT_CLASS} hover:bg-rose-50/80 border-rose-300 text-rose-950 focus:ring-rose-400`}
                title="단원 선택"
              >
                {CHAPTER_LIST.map((ch) => (
                  <option key={ch.ch} value={ch.ch}>
                    {getChapterCircledTitle(ch.ch, currentLang)}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}

          {studySubTab === 'verbs' && (
            <>
              <select
                value={selectedVerbUnit}
                onChange={(e) => {
                  playCutePop();
                  onSelectVerbUnit(e.target.value as VerbUnitOption['id']);
                }}
                className={`${SELECT_CLASS} hover:bg-purple-50/80 border-purple-300 text-purple-950 focus:ring-purple-400`}
                title="단원 선택"
              >
                {VERB_UNIT_OPTIONS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-purple-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </>
          )}
        </div>

        {renderOverviewButton(
          studySubTab === 'hangeul' ? 'amber' : studySubTab === 'verbs' ? 'purple' : 'rose'
        )}
      </div>
    );
  }

  // activeTab === 'games'
  return (
    <div className="w-full pt-0.5 relative z-20 flex items-center justify-center gap-2 sm:gap-2.5 no-print select-none font-korean-gothic">
      <div className="relative flex-1 max-w-md">
        <select
          value={selectedChapter}
          onChange={(e) => {
            playCutePop();
            onSelectChapter(Number(e.target.value));
          }}
          className={`${SELECT_CLASS} hover:bg-rose-50/80 border-rose-300 text-rose-950 focus:ring-rose-400`}
          title="단원 선택"
        >
          {CHAPTER_LIST.map((ch) => (
            <option key={ch.ch} value={ch.ch}>
              {getChapterCircledTitle(ch.ch, currentLang)}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {renderOverviewButton('rose')}
    </div>
  );
};
