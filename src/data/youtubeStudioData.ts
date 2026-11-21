import { AdminSummaryLang, ADMIN_SUMMARY_LANGUAGES } from './summaryTranslations';
import { HangeulCardData } from '../components/HangeulStrokeFlashcardSection';

export type YoutubeAspectRatio = '9:16' | '16:9';
export type StrokeHookPresetStyle = 'viral' | 'practice' | 'pdf';

export const STROKE_GROUP_IDS = [
  'basic_consonants',
  'double_consonants',
  'basic_vowels',
  'compound_vowels',
] as const;

export const STROKE_HOOK_STYLE_META: {
  id: StrokeHookPresetStyle;
  label: string;
}[] = [
  { id: 'viral', label: '초스피드 후킹형' },
  { id: 'practice', label: '따라쓰기 유도형' },
  { id: 'pdf', label: '무료 PDF 유입형' },
];

export const LANG_LOCALIZED_YT_COPY: Record<
  AdminSummaryLang,
  {
    brand: string;
    strokeSeriesName: string;
    followAlongCta: string;
    freePdfLine: string;
    subscribeLine: string;
    strokeWordPrefix: string;
    strokesUnit: (n: number) => string;
    chapterHeader: string;
  }
> = {
  ko: {
    brand: '해볼 한국어',
    strokeSeriesName: '한글 획순 따라쓰기',
    followAlongCta: '화면을 보며 손가락으로 함께 따라 써 보세요!',
    freePdfLine: '🎁 한국어 총정리표 6종(8장) 무료 PDF 다운로드는 블로그에서 받으실 수 있어요!',
    subscribeLine: '👍 도움이 되셨다면 구독과 좋아요로 응원해 주세요.',
    strokeWordPrefix: '예시 단어',
    strokesUnit: (n) => `${n}획`,
    chapterHeader: '⏱️ 타임스탬프 (글자별 바로가기)',
  },
  en: {
    brand: 'Haebol Korean',
    strokeSeriesName: 'Korean Hangul Stroke Order',
    followAlongCta: 'Trace along with your finger and repeat out loud!',
    freePdfLine: '🎁 Download all 6 Korean Master Summary Charts (8-page PDF) for FREE on our blog!',
    subscribeLine: '👍 Subscribe for daily beginner-friendly Korean lessons.',
    strokeWordPrefix: 'Example',
    strokesUnit: (n) => `${n} stroke${n > 1 ? 's' : ''}`,
    chapterHeader: '⏱️ Chapters',
  },
  vi: {
    brand: 'Tiếng Hàn Haebol',
    strokeSeriesName: 'Cách viết chữ Hangul đúng nét',
    followAlongCta: 'Hãy viết theo từng nét và đọc to cùng nhé!',
    freePdfLine: '🎁 Tải MIỄN PHÍ bộ 6 bảng tổng hợp tiếng Hàn (8 trang PDF) trên blog!',
    subscribeLine: '👍 Đăng ký kênh để học tiếng Hàn mỗi ngày nhé.',
    strokeWordPrefix: 'Từ ví dụ',
    strokesUnit: (n) => `${n} nét`,
    chapterHeader: '⏱️ Mục lục thời gian',
  },
  bn: {
    brand: 'হ্যাবল কোরিয়ান',
    strokeSeriesName: 'কোরিয়ান হাঙ্গুল লেখার নিয়ম',
    followAlongCta: 'দাগ অনুসরণ করে লিখুন এবং জোরে বলুন!',
    freePdfLine: '🎁 আমাদের ব্লগ থেকে ৬টি কোরিয়ান মাস্টার চার্ট (৮ পৃষ্ঠার PDF) বিনামূল্যে ডাউনলোড করুন!',
    subscribeLine: '👍 প্রতিদিন সহজ কোরিয়ান শিখতে সাবস্ক্রাইব করুন।',
    strokeWordPrefix: 'উদাহরণ',
    strokesUnit: (n) => `${n} স্ট্রোক`,
    chapterHeader: '⏱️ অধ্যায়সমূহ',
  },
  zh: {
    brand: 'Haebol 韩语',
    strokeSeriesName: '韩语字母笔顺跟写',
    followAlongCta: '跟着笔顺一起写，并大声跟读吧！',
    freePdfLine: '🎁 免费下载全套6种韩语总整理表（8页高清PDF），链接在博客中！',
    subscribeLine: '👍 订阅频道，每天轻松学韩语。',
    strokeWordPrefix: '例词',
    strokesUnit: (n) => `共${n}画`,
    chapterHeader: '⏱️ 章节跳转',
  },
  ru: {
    brand: 'Haebol Корейский',
    strokeSeriesName: 'Порядок черт Хангыль',
    followAlongCta: 'Повторяйте линии пальцем и произносите вслух!',
    freePdfLine: '🎁 Скачайте БЕСПЛАТНО 6 сводных таблиц корейского языка (PDF, 8 стр.) в блоге!',
    subscribeLine: '👍 Подпишитесь, чтобы учить корейский легко каждый день.',
    strokeWordPrefix: 'Пример',
    strokesUnit: (n) => `${n} черт.`,
    chapterHeader: '⏱️ Таймкоды',
  },
  ja: {
    brand: 'ヘボル韓国語',
    strokeSeriesName: 'ハングル書き順トレーニング',
    followAlongCta: '書き順を見ながら一緒に書いて声に出してみましょう！',
    freePdfLine: '🎁 韓国語総まとめ表6種（PDF8枚）の無料ダウンロードはブログから！',
    subscribeLine: '👍 チャンネル登録で毎日楽しく韓国語を学びましょう。',
    strokeWordPrefix: '単語例',
    strokesUnit: (n) => `${n}画`,
    chapterHeader: '⏱️ チャプター',
  },
  mn: {
    brand: 'Хэбол Солонгос хэл',
    strokeSeriesName: 'Хангыл бичих дараалал',
    followAlongCta: 'Зурлагын дарааллыг дагаж бичээд чанга уншаарай!',
    freePdfLine: '🎁 Солонгос хэлний 6 төрлийн нэгтгэсэн хүснэгт (8 хуудас PDF) блогоос ҮНЭГҮЙ татаарай!',
    subscribeLine: '👍 Өдөр бүр солонгос хэл сурахын тулд сувгаа дагаарай.',
    strokeWordPrefix: 'Жишээ үг',
    strokesUnit: (n) => `${n} зурлага`,
    chapterHeader: '⏱️ Цагийн хуваарь',
  },
};

/** 8개국어 자모음 획순 상·하단 후킹 & CTA 문구 자동 생성기 */
export function buildStrokeHookPreset(params: {
  lang: AdminSummaryLang;
  scope: 'single' | 'group';
  card?: HangeulCardData;
  groupTitleKo?: string;
  groupBadge?: string;
  groupCount?: number;
  style: StrokeHookPresetStyle;
}): { topHook: string; bottomCta: string } {
  const {
    lang,
    scope,
    card,
    groupTitleKo = '기본 자음',
    groupBadge = 'ㄱ~ㅎ',
    groupCount = 14,
    style,
  } = params;

  const ch = card?.char || 'ㄱ';
  const name = card?.name || '기역';
  const rom = card?.romaja || '[g/k]';
  const strokes = card?.strokes?.length || 1;
  const cleanGroupTitle = groupTitleKo.replace(/^[①-④]\s*/, '');

  const isSingle = scope === 'single';

  switch (lang) {
    case 'ko':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `딱 5초! 한글 '${ch}' 예쁘게 쓰는 획순`
            : `보고만 따라 써도 끝! ${cleanGroupTitle} (${groupCount}자)`,
          bottomCta: '저장하고 하루 1글자씩 따라 써 보세요!',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `헷갈리는 '${ch}' (${name}) 정확한 획순 체크!`
            : `한글 ${cleanGroupTitle} 획순 한 번에 끝내기`,
          bottomCta: '무료 한글 총정리표 PDF는 댓글 링크에서!',
        };
      }
      return {
        topHook: isSingle
          ? `한글 '${ch}' (${name}) · ${strokes}획 따라쓰기`
          : `함께 쓰는 한글 · ${cleanGroupTitle} ${groupCount}자`,
        bottomCta: '손가락으로 따라 쓰고 소리를 따라 말해요!',
      };

    case 'en':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `Write Korean '${ch}' Perfectly in 5 Seconds!`
            : `Master ${groupCount} Hangul Letters Fast! (${groupBadge})`,
          bottomCta: 'Save & trace along 1 letter a day!',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `Are You Writing '${ch}' ${rom} the Right Way?`
            : `Complete Korean Stroke Order (${groupBadge})`,
          bottomCta: 'FREE Korean Summary PDF in pinned comment!',
        };
      }
      return {
        topHook: isSingle
          ? `Hangul '${ch}' ${rom} · ${strokes}-Stroke Practice`
          : `Korean Alphabet Writing (${groupBadge})`,
        bottomCta: 'Trace with your finger & repeat out loud!',
      };

    case 'vi':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `Chỉ 5 giây! Viết chuẩn chữ '${ch}' tiếng Hàn`
            : `Thuộc ngay ${groupCount} chữ Hangul (${groupBadge})!`,
          bottomCta: 'Lưu lại và luyện viết mỗi ngày 1 chữ nhé!',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `Bạn đã viết đúng nét chữ '${ch}' ${rom} chưa?`
            : `Trọn bộ cách viết Hangul chuẩn (${groupBadge})`,
          bottomCta: 'Tải PDF bảng tổng hợp MIỄN PHÍ ở bình luận!',
        };
      }
      return {
        topHook: isSingle
          ? `Tập viết '${ch}' ${rom} · Đúng ${strokes} nét`
          : `Luyện viết chữ cái tiếng Hàn (${groupBadge})`,
        bottomCta: 'Viết theo từng nét và đọc to cùng nhé!',
      };

    case 'bn':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `মাত্র ৫ সেকেন্ডে সুন্দর করে '${ch}' লিখুন!`
            : `সহজে শিখুন ${groupCount}টি হাঙ্গুল অক্ষর (${groupBadge})`,
          bottomCta: 'সেভ করে প্রতিদিন ১টি করে অক্ষর অনুশীলন করুন!',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `'${ch}' ${rom} লেখার সঠিক নিয়ম জানেন কি?`
            : `সম্পূর্ণ কোরিয়ান অক্ষর লেখার নিয়ম (${groupBadge})`,
          bottomCta: 'ফ্রি কোরিয়ান PDF চার্ট পিন করা কমেন্টে!',
        };
      }
      return {
        topHook: isSingle
          ? `হাঙ্গুল '${ch}' ${rom} · ${strokes} স্ট্রোক অনুশীলন`
          : `কোরিয়ান বর্ণমালা লেখা শিখুন (${groupBadge})`,
        bottomCta: 'দাগ অনুসরণ করে লিখুন এবং জোরে বলুন!',
      };

    case 'zh':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `只需5秒！把韩语 '${ch}' 写得超好看`
            : `跟着写就记住！韩语字母 ${groupBadge}（${groupCount}个）`,
          bottomCta: '收藏起来，每天跟着练一个字吧！',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `韩语 '${ch}' ${rom} 你写对笔顺了吗？`
            : `一次搞定韩语笔顺（${groupBadge}）`,
          bottomCta: '免费8页韩语总整理表PDF见置顶评论！',
        };
      }
      return {
        topHook: isSingle
          ? `韩语 '${ch}' ${rom} · ${strokes}画笔顺跟写`
          : `韩语字母笔顺练习（${groupBadge}）`,
        bottomCta: '伸出手指一起写，大声跟读发音！',
      };

    case 'ru':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `За 5 секунд! Пишем '${ch}' красиво и верно`
            : `Выучи ${groupCount} букв Хангыль легко (${groupBadge})!`,
          bottomCta: 'Сохрани и повторяй по 1 букве в день!',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `Правильно ли вы пишете '${ch}' ${rom}?`
            : `Полный порядок черт Хангыль (${groupBadge})`,
          bottomCta: 'Бесплатный PDF-конспект в закреплённом комментарии!',
        };
      }
      return {
        topHook: isSingle
          ? `Хангыль '${ch}' ${rom} · Порядок черт (${strokes})`
          : `Практика письма Хангыль (${groupBadge})`,
        bottomCta: 'Повторяйте пальцем и произносите вслух!',
      };

    case 'ja':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `たった5秒！ハングル「${ch}」きれいな書き順`
            : `見るだけで覚える！ハングル ${groupBadge}（${groupCount}文字）`,
          bottomCta: '保存して1日1文字いっしょに書いてみよう！',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `ハングル「${ch}」${rom} 正しい書き順チェック！`
            : `ハングル書き順まとめて完全マスター（${groupBadge}）`,
          bottomCta: '無料PDFまとめ表は固定コメントのリンクから！',
        };
      }
      return {
        topHook: isSingle
          ? `ハングル「${ch}」${rom}・${strokes}画トレーニング`
          : `いっしょに書くハングル（${groupBadge}）`,
        bottomCta: '指でなぞりながら声に出して練習しよう！',
      };

    case 'mn':
      if (style === 'viral') {
        return {
          topHook: isSingle
            ? `Ердөө 5 секунд! '${ch}' үсгийг цэвэрхэн бичих`
            : `Хангылын ${groupCount} үсгийг хурдан сурцгаая (${groupBadge})!`,
          bottomCta: 'Хадгалаад өдөрт 1 үсэг дагаж бичээрэй!',
        };
      }
      if (style === 'pdf') {
        return {
          topHook: isSingle
            ? `'${ch}' ${rom} үсгийг зөв дарааллаар бичдэг үү?`
            : `Хангыл бичих бүрэн дараалал (${groupBadge})`,
          bottomCta: 'ҮНЭГҮЙ PDF хүснэгтийг сэтгэгдлийн линкээс!',
        };
      }
      return {
        topHook: isSingle
          ? `Хангыл '${ch}' ${rom} · ${strokes} зурлага`
          : `Хангыл үсэг бичих дасгал (${groupBadge})`,
        bottomCta: 'Зурлагыг дагаж бичээд чанга уншаарай!',
      };
  }
}

export function formatSrtTime(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const hrs = Math.floor(clamped / 3600);
  const mins = Math.floor((clamped % 3600) / 60);
  const secs = Math.floor(clamped % 60);
  const ms = Math.round((clamped - Math.floor(clamped)) * 1000);
  const safeMs = Math.min(999, ms);
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(safeMs).padStart(3, '0')}`;
}

export function formatChapterTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function getStrokeCardDurationSec(
  card: HangeulCardData,
  secPerStroke: number,
  pauseAfterCardSec: number
): number {
  const strokeCount = Math.max(1, card.strokes?.length || 1);
  return 0.45 + strokeCount * secPerStroke + pauseAfterCardSec;
}

export function buildStrokeSrt(
  cards: HangeulCardData[],
  lang: AdminSummaryLang,
  secPerStroke: number,
  pauseAfterCardSec: number
): string {
  const copy = LANG_LOCALIZED_YT_COPY[lang];
  let cursor = 0;
  const blocks: string[] = [];

  cards.forEach((card, idx) => {
    const strokeCount = Math.max(1, card.strokes?.length || 1);
    const dur = getStrokeCardDurationSec(card, secPerStroke, pauseAfterCardSec);
    const start = cursor;
    const end = cursor + dur - 0.12;
    cursor += dur;

    const meaning = lang === 'ko' ? card.sampleWord : card.meanings[lang];
    const line1 = `${card.char} (${card.name}) ${card.romaja} · ${copy.strokesUnit(strokeCount)}`;
    const line2 =
      lang === 'ko'
        ? `${copy.strokeWordPrefix}: ${card.sampleWord} (${card.sampleWordRomaja})`
        : `${card.sampleWord} (${card.sampleWordRomaja}) — ${meaning}`;

    blocks.push(`${idx + 1}\n${formatSrtTime(start)} --> ${formatSrtTime(end)}\n${line1}\n${line2}`);
  });

  return blocks.join('\n\n') + '\n';
}

export interface YoutubeUploadPackage {
  titles: { label: string; text: string }[];
  description: string;
  pinnedComment: string;
  tags: string;
  hashtags: string;
}

export function buildYoutubeUploadPackage(params: {
  aspect: YoutubeAspectRatio;
  lang: AdminSummaryLang;
  strokeGroupTitle?: string;
  strokeCards?: HangeulCardData[];
  secPerStroke?: number;
  pauseAfterCardSec?: number;
}): YoutubeUploadPackage {
  const {
    aspect,
    lang,
    strokeGroupTitle = '기본 자음 14자',
    strokeCards = [],
    secPerStroke = 1.1,
    pauseAfterCardSec = 1.6,
  } = params;

  const isShorts = aspect === '9:16';
  const copy = LANG_LOCALIZED_YT_COPY[lang];
  const langMeta = ADMIN_SUMMARY_LANGUAGES.find((l) => l.code === lang) || ADMIN_SUMMARY_LANGUAGES[0];

  const isSingle = strokeCards.length === 1;
  const singleCard = strokeCards[0];
  const charsSummary = isSingle
    ? `${singleCard.char} (${singleCard.name})`
    : `${strokeCards[0]?.char || 'ㄱ'}~${strokeCards[strokeCards.length - 1]?.char || 'ㅎ'} (${strokeCards.length}자)`;

  let cursor = 0;
  const chapters = strokeCards.map((c) => {
    const ts = formatChapterTime(cursor);
    cursor += getStrokeCardDurationSec(c, secPerStroke, pauseAfterCardSec);
    const meaning = lang === 'ko' ? c.sampleWord : `${c.sampleWord} (${c.meanings[lang]})`;
    return `${ts} ${c.char} ${c.name} ${c.romaja} - ${meaning}`;
  });

  const titles = isSingle
    ? [
        {
          label: '검색 유입형',
          text:
            lang === 'ko'
              ? `한글 '${singleCard.char}' (${singleCard.name}) 획순 따라쓰기 | ${singleCard.sampleWord} 발음 연습 ${isShorts ? '#Shorts' : ''}`.trim()
              : `How to Write Korean '${singleCard.char}' (${singleCard.romaja}) Stroke Order | ${singleCard.sampleWord} ${isShorts ? '#Shorts' : ''}`.trim(),
        },
        {
          label: '쇼츠 후킹형',
          text:
            lang === 'ko'
              ? `딱 5초면 끝! 한글 '${singleCard.char}' 예쁘게 쓰는 획순 ✏️ #Shorts`
              : `Write Korean '${singleCard.char}' Perfectly in 5 Seconds! ✏️ (${singleCard.meanings[lang]}) #Shorts`,
        },
        {
          label: '글로벌 학습자용',
          text: `Learn Hangul '${singleCard.char}' ${singleCard.romaja} · ${copy.strokeSeriesName} (${langMeta.nativeName})`,
        },
      ]
    : [
        {
          label: '검색 유입형',
          text:
            lang === 'ko'
              ? `[해볼 한국어] 한글 획순 따라쓰기 · ${strokeGroupTitle} 완벽 정리`
              : `[${copy.brand}] ${copy.strokeSeriesName} · ${charsSummary} (${langMeta.nativeName})`,
        },
        {
          label: '클릭 후킹형',
          text:
            lang === 'ko'
              ? `보고만 따라 써도 한글 끝! ${strokeGroupTitle} 획순 + 발음 한 번에 마스터 ✏️`
              : `Master Hangul Writing Fast! ${charsSummary} Stroke Order + Audio ✏️`,
        },
        {
          label: '글로벌 학습자용',
          text: `Korean Alphabet Writing Practice (${charsSummary}) | ${copy.brand}`,
        },
      ];

  const hashtags = isShorts
    ? '#Shorts #한글쓰기 #LearnKorean'
    : '#한글획순 #한국어공부 #LearnKorean';

  const description = [
    `${copy.followAlongCta}`,
    isSingle
      ? `✏️ ${singleCard.char} (${singleCard.name}) ${singleCard.romaja} · ${copy.strokesUnit(singleCard.strokes?.length || 1)} · ${singleCard.sampleWord}${lang !== 'ko' ? ` (${singleCard.meanings[lang]})` : ''}`
      : `✏️ ${strokeGroupTitle} (${charsSummary})`,
    '',
    copy.freePdfLine,
    '👉 블로그 무료 나눔 링크: [여기에 블로그 총정리표 글 링크를 붙여넣으세요]',
    '',
    ...(!isSingle && chapters.length > 0 ? [copy.chapterHeader, ...chapters, ''] : []),
    copy.subscribeLine,
    '',
    hashtags,
  ].join('\n');

  const pinnedComment = [
    copy.freePdfLine,
    '📌 자음·모음·받침·용언·조사·교실한국어 300표현 총정리표(PDF) 무료 받기:',
    '👉 [여기에 블로그 링크 입력]',
  ].join('\n');

  const baseTags = [
    '해볼한국어',
    '한글쓰기',
    '한글획순',
    '한글공부',
    '한국어초급',
    'LearnKorean',
    'Hangul',
    'HangulStrokeOrder',
    'KoreanAlphabet',
    ...(isSingle ? [singleCard.char, singleCard.name, singleCard.sampleWord] : [strokeGroupTitle, '자음모음']),
    ...(lang !== 'ko' ? [langMeta.nativeName, `Korean in ${langMeta.nativeName}`] : []),
  ];

  return {
    titles,
    description,
    pinnedComment,
    tags: baseTags.join(', '),
    hashtags,
  };
}

export function triggerTextFileDownload(content: string, filename: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
