import React from 'react';
import { VocabularyItem, SupportedLanguage, getCircledNumber, getLanguageMeta } from '../types';
import { VocabVisual } from './VocabVisual';
import { speakKorean, playCutePop } from '../utils/audio';

export interface PrintableWorksheetPageProps {
  chapter: { ch: number; title?: string; theme?: string; circledTitle: string; itemCount?: number };
  items: VocabularyItem[];
  selectedLangs?: SupportedLanguage[];
  interactiveAudio?: boolean;
  className?: string;
}

const DEFAULT_LANGS: SupportedLanguage[] = ['en', 'vi'];

export const PrintableWorksheetPage: React.FC<PrintableWorksheetPageProps> = ({
  chapter,
  items,
  selectedLangs = DEFAULT_LANGS,
  interactiveAudio = false,
  className = ''
}) => {
  const activeLangs: SupportedLanguage[] =
    selectedLangs && selectedLangs.length > 0
      ? (selectedLangs.slice(0, 3) as SupportedLanguage[])
      : DEFAULT_LANGS;

  return (
    <div
      className={`printable-a4-page w-full max-w-[990px] bg-white rounded-xl shadow-lg border-2 border-slate-300 p-2 sm:p-2.5 text-slate-800 flex flex-col justify-between transition-shadow ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* Sheet Top Header: 2. 최상단 "해볼 한국어 <그림카드>", 3. "학년: ________ 이름: ________________" (날짜 삭제) */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-slate-700 pb-1 mb-1 text-slate-800 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-base leading-none shrink-0">🥟</span>
          <span className="text-xs sm:text-sm font-black text-slate-900 font-korean-gothic break-keep">
            해볼 한국어 [그림카드] {chapter.circledTitle}
          </span>
        </div>

        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic shrink-0">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 10 Cards Grid: 5 columns x 2 rows */}
      <div className="flashcard-print-grid grid grid-cols-5 print:grid-cols-5 print:grid-rows-2 gap-1.5 sm:gap-2 flex-1">
        {items.slice(0, 10).map((item, idx) => (
          <div
            key={`${item.ch}-${item.ko}-${idx}`}
            onClick={() => {
              if (interactiveAudio) {
                playCutePop();
                speakKorean(item.ko, 0.85);
              }
            }}
            className={`print-card relative border-2 border-dashed border-slate-400 rounded-xl p-1.5 bg-white flex flex-col justify-between text-center overflow-hidden transition-all ${
              interactiveAudio
                ? 'cursor-pointer hover:border-emerald-500 hover:shadow-md hover:bg-emerald-50/20 active:scale-[0.98]'
                : 'hover:border-emerald-500'
            }`}
            title={interactiveAudio ? `클릭하여 한국어 발음 듣기: "${item.ko}"` : undefined}
          >
            {/* Card Index */}
            <div className="flex items-center justify-start text-[10px] font-bold text-slate-400 mb-0 leading-none">
              <span className="bg-amber-100 text-amber-950 px-1.5 py-0.5 rounded font-black text-[9.5px] font-korean-gothic">
                {getCircledNumber(item.ch)}-{idx + 1}
              </span>
            </div>

            {/* 1. 그림 (Icon/Emoji or Custom Illustration) */}
            <div className="my-0.5 flex items-center justify-center min-h-[60px] max-h-[74px] shrink-0">
              <VocabVisual item={item} size="print" />
            </div>

            {/* 2. 한글 단어 (Korean Word) - 학교안심 받아쓰기 '극대화 볼드 900' 적용 */}
            <div
              style={{
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                fontWeight: 900,
                WebkitTextStroke: '0.8px currentColor'
              }}
              className={`font-black text-slate-950 leading-none tracking-normal my-0 font-badasseugi break-keep ${
                item.ko.length >= 7
                  ? 'text-[17px] sm:text-[18.5px]'
                  : item.ko.length >= 5
                  ? 'text-[19px] sm:text-[21px]'
                  : 'text-[21px] sm:text-[23px]'
              }`}
            >
              {item.ko}
            </div>

            {/* 3. 영어 로마자 표기 (Romanization) - 줄간격 및 여백 축소 */}
            <div className="text-[9.5px] sm:text-[10px] font-bold text-amber-900 leading-none my-0 truncate">
              [{item.romaja}]
            </div>

            {/* 4. 문장 표현 (Sample Phrase) - 1.5배 확대 & 전체 검정색 */}
            <div
              style={{
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                fontWeight: 600
              }}
              className="text-[17.5px] sm:text-[19px] font-semibold text-black leading-[1.15] my-0.5 line-clamp-2 break-keep font-badasseugi"
              title={item.samplePhrase}
            >
              "{item.samplePhrase}"
            </div>

            {/* 5. 아래에 선택된 1~3개국어 번역 - 폰트 크기 확대 & 국기 이모티콘 단일 표기 */}
            <div className="mt-0.5 pt-0.5 border-t border-slate-200 text-left space-y-0.5 leading-snug">
              {activeLangs.map((langCode) => {
                const lMeta = getLanguageMeta(langCode);
                const text = (item as any)[langCode] || '';
                const isSingle = activeLangs.length === 1;
                const isDouble = activeLangs.length === 2;
                return (
                  <div
                    key={langCode}
                    className={`truncate flex items-center gap-1 leading-snug font-normal text-slate-800 ${
                      isSingle
                        ? 'text-[14.5px] sm:text-[15.5px] py-0.5'
                        : isDouble
                        ? 'text-[13px] sm:text-[14px] py-0.2'
                        : 'text-[12px] sm:text-[13px]'
                    } ${lMeta.fontClass || ''}`}
                    title={`${lMeta.flag} ${lMeta.fullName}: ${text}`}
                  >
                    <span className="text-[13px] sm:text-[14px] shrink-0 leading-none">{lMeta.flag}</span>
                    <span className="truncate">{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sheet Footer: 최하단 왼쪽 브랜드 표기 */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic">
        <span className="font-medium">
          해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};
