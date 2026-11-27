import type { SupportedLanguage } from '../types';
import type {
  BatchimWordCardConfig,
  BatchimSpeechRule,
} from '../components/PrintableBatchimSheet';
import { HANGEUL_UNITS_7_TO_12 } from './hangeulExtendedUnits';

export interface BasicCombinationData {
  consonant: string;
  consonantSound: string;
  consonantRomaja: string;
  vowel: string;
  vowelSound: string;
  vowelRomaja: string;
  syllable: string;
  syllableSound: string;
  syllableRomaja: string;
  isWordCard?: boolean;
  word?: string;
  wordMeaning?: string;
  wordRomaja?: string;
  vowelComponents?: [string, string];
  isJamoWordCard?: boolean;
  wordSyllables?: { char: string; sound: string; romaja: string }[];
  isBatchimCard?: boolean;
  isDoubleBatchim?: boolean;
  firstBatchim?: { char: string; romaja: string; isSilent?: boolean; sound?: string };
  secondBatchim?: { char: string; romaja: string; isSilent?: boolean; sound?: string };
  pronunciationNote?: string;
  batchimIllustrationType?: BatchimWordCardConfig['illustrationType'];
  batchimSpeechRules?: BatchimSpeechRule[];
  batchimRuleFormat?: 'short' | 'standard';
}

export interface HangeulCardData {
  id: string;
  char: string;
  name: string;
  romaja: string;
  strokes?: string[]; // SVG path d attributes in 160x160 coordinate space
  strokePoints?: { x: number; y: number }[]; // starting point coordinates for ①, ②, ③ badges
  sampleWord: string;
  sampleWordRomaja: string;
  meanings: Record<SupportedLanguage, string>;
  tips: Record<SupportedLanguage, string>;
  combination?: BasicCombinationData;
}

export interface HangeulUnitGroup {
  id: string;
  titleKo: string;
  titleEn: string;
  badge: string;
  cards: HangeulCardData[];
}

// -------------------------------------------------------------
// Hangeul Stroke Flashcards Data (자음 14자, 쌍자음 5자, 모음 10자, 복합모음 11자)
// -------------------------------------------------------------

export const HANGEUL_GROUPS: HangeulUnitGroup[] = [
  // 1. 기본 자음 14자 (ㄱ ~ ㅎ)
  {
    id: 'basic_consonants',
    titleKo: '① 기본 자음 14자 (ㄱ~ㅎ)',
    titleEn: '14 Basic Consonants (ㄱ~ㅎ)',
    badge: '자음',
    cards: [
      {
        id: 'c-giyeok',
        char: 'ㄱ',
        name: '기역',
        romaja: '[g / k]',
        strokes: ['M 32 46 L 116 46 Q 132 46 132 62 L 132 130'],
        strokePoints: [{ x: 32, y: 46 }],
        sampleWord: '가방',
        sampleWordRomaja: 'ga-bang',
        meanings: {
          en: 'bag / backpack',
          vi: 'cặp sách / túi xách',
          bn: 'ব্যাগ',
          zh: '书包 / 背包',
          ru: 'сумка / рюкзак',
          ja: 'かばん',
          mn: 'цүнх'
        },
        tips: {
          en: 'Draw left-to-right, then bend downward smoothly in one stroke (1 stroke).',
          vi: 'Kéo từ trái sang phải rồi gập xuống dưới thành 1 nét liền (1 nét).',
          bn: 'বাম থেকে ডানে টেনে নিচের দিকে বাঁকিয়ে এক টানে লিখুন (১ স্ট্রোক)।',
          zh: '从左向右横折直下，一笔完成（共1画）。',
          ru: 'Ведите слева направо и плавно загните вниз за одно движение (1 черта).',
          ja: '左から右へ引いて、そのまま下へ曲げて1画で書きます（1画）。',
          mn: 'Зүүнээс баруун тийш татаж, нэг зурлагаар доош нугална (1 зурлага).'
        }
      },
      {
        id: 'c-nieun',
        char: 'ㄴ',
        name: '니은',
        romaja: '[n]',
        strokes: ['M 46 32 L 46 116 Q 46 132 62 132 L 130 132'],
        strokePoints: [{ x: 46, y: 32 }],
        sampleWord: '나비',
        sampleWordRomaja: 'na-bi',
        meanings: {
          en: 'butterfly',
          vi: 'con bướm',
          bn: 'প্রজাপতি',
          zh: '蝴蝶',
          ru: 'бабочка',
          ja: 'ちょうちょ',
          mn: 'эрвээхэй'
        },
        tips: {
          en: 'Go down from top, then bend rightward in one smooth stroke (1 stroke).',
          vi: 'Kéo thẳng từ trên xuống rồi gập sang phải thành 1 nét liền (1 nét).',
          bn: 'উপর থেকে নিচে নেমে ডানে বাঁকিয়ে এক টানে লিখুন (১ স্ট্রোক)।',
          zh: '从上往下竖折向右，一笔连成（共1画）。',
          ru: 'Ведите сверху вниз и поверните вправо одной линией (1 черта).',
          ja: '上から下へ引き、そのまま右へ曲げて1画で書きます（1画）。',
          mn: 'Дээрээс доош татаж, баруун тийш нугалан нэг зурлагаар бичнэ (1 зурлага).'
        }
      },
      {
        id: 'c-digeut',
        char: 'ㄷ',
        name: '디귿',
        romaja: '[d / t]',
        strokes: [
          'M 34 46 L 126 46',
          'M 48 50 L 48 116 Q 48 132 64 132 L 126 132'
        ],
        strokePoints: [{ x: 34, y: 46 }, { x: 48, y: 50 }],
        sampleWord: '다람쥐',
        sampleWordRomaja: 'da-ram-jwi',
        meanings: {
          en: 'squirrel',
          vi: 'con sóc',
          bn: 'কাঠবিড়ালি',
          zh: '松鼠',
          ru: 'белка',
          ja: 'リス',
          mn: 'хэрэм'
        },
        tips: {
          en: '① Top horizontal line. ② Vertical down and bend right (2 strokes).',
          vi: '① Nét ngang trên. ② Kéo xuống rồi gập sang phải (2 nét).',
          bn: '① উপরের আনুভূমিক রেখা। ② নিচে নেমে ডানে বাঁকানো (২ স্ট্রোক)।',
          zh: '① 先写上面一横。② 再写下面的竖折（共2画）。',
          ru: '① Верхняя горизонталь. ② Вниз и вправо (2 черты).',
          ja: '① 上の横線。② 下に引いて右へ曲げる（2画）。',
          mn: '① Дээд хөндлөн шугам. ② Доош татаж баруун тийш нугална (2 зурлага).'
        }
      },
      {
        id: 'c-rieul',
        char: 'ㄹ',
        name: '리을',
        romaja: '[r / l]',
        strokes: [
          'M 36 46 L 116 46 Q 130 46 130 58 L 130 78',
          'M 36 78 L 124 78',
          'M 48 80 L 48 118 Q 48 132 62 132 L 128 132'
        ],
        strokePoints: [{ x: 36, y: 46 }, { x: 36, y: 78 }, { x: 48, y: 80 }],
        sampleWord: '라디오',
        sampleWordRomaja: 'ra-di-o',
        meanings: {
          en: 'radio',
          vi: 'đài radio',
          bn: 'রেডিও',
          zh: '收音机',
          ru: 'радио',
          ja: 'ラジオ',
          mn: 'радио'
        },
        tips: {
          en: '① Top ㄱ shape. ② Middle horizontal. ③ Bottom ㄴ shape (3 strokes).',
          vi: '① Nét ㄱ trên. ② Nét ngang giữa. ③ Nét ㄴ dưới (3 nét).',
          bn: '① উপরের ㄱ আকৃতি। ② মাঝের আনুভূমিক রেখা। ③ নিচের ㄴ আকৃতি (৩ স্ট্রোক)।',
          zh: '① 上面写ㄱ。② 中间写一横。③ 下面写ㄴ（共3画）。',
          ru: '① Верхняя часть ㄱ. ② Средняя линия. ③ Нижняя часть ㄴ (3 черты).',
          ja: '① 上の「ㄱ」。② 真ん中の横線。③ 下の「ㄴ」（3画）。',
          mn: '① Дээд ㄱ хэлбэр. ② Дунд хөндлөн. ③ Доод ㄴ хэлбэр (3 зурлага).'
        }
      },
      {
        id: 'c-mieum',
        char: 'ㅁ',
        name: '미음',
        romaja: '[m]',
        strokes: [
          'M 42 40 L 42 122',
          'M 40 46 L 118 46 Q 124 46 124 52 L 124 122',
          'M 38 120 L 128 120'
        ],
        strokePoints: [{ x: 42, y: 40 }, { x: 40, y: 46 }, { x: 38, y: 120 }],
        sampleWord: '모자',
        sampleWordRomaja: 'mo-ja',
        meanings: {
          en: 'hat / cap',
          vi: 'cái mũ / nón',
          bn: 'টুপি',
          zh: '帽子',
          ru: 'шапка / кепка',
          ja: 'ぼうし',
          mn: 'малгай'
        },
        tips: {
          en: '① Left vertical. ② Top horizontal & right vertical. ③ Close bottom (3 strokes).',
          vi: '① Nét dọc trái. ② Ngang trên gập dọc phải. ③ Khóa đáy (3 nét).',
          bn: '① বাম উল্লম্ব রেখা। ② উপরের আনুভূমিক ও ডান উল্লম্ব। ③ নিচে বন্ধ করুন (৩ স্ট্রোক)।',
          zh: '① 先写左边一竖。② 横折到右边。③ 最后封底（共3画）。',
          ru: '① Левая вертикаль. ② Верх и правая сторона. ③ Закрываем снизу (3 черты).',
          ja: '① 左の縦線。② 上の横線と右の縦線。③ 底を閉じる（3画）。',
          mn: '① Зүүн босоо. ② Дээд хөндлөн ба баруун босоо. ③ Доод суурийг хаана (3 зурлага).'
        }
      },
      {
        id: 'c-bieup',
        char: 'ㅂ',
        name: '비읍',
        romaja: '[b / p]',
        strokes: [
          'M 44 38 L 44 122',
          'M 116 38 L 116 122',
          'M 44 82 L 116 82',
          'M 42 122 L 118 122'
        ],
        strokePoints: [{ x: 44, y: 38 }, { x: 116, y: 38 }, { x: 44, y: 82 }, { x: 42, y: 122 }],
        sampleWord: '바나나',
        sampleWordRomaja: 'ba-na-na',
        meanings: {
          en: 'banana',
          vi: 'quả chuối',
          bn: 'কলা',
          zh: '香蕉',
          ru: 'банан',
          ja: 'バナナ',
          mn: 'гадил'
        },
        tips: {
          en: '① Left vertical. ② Right vertical. ③ Middle horizontal. ④ Bottom horizontal (4 strokes).',
          vi: '① Dọc trái. ② Dọc phải. ③ Ngang giữa. ④ Ngang đáy (4 nét).',
          bn: '① বাম উল্লম্ব। ② ডান উল্লম্ব। ③ মাঝের রেখা। ④ নিচের রেখা (৪ স্ট্রোক)।',
          zh: '① 左竖。② 右竖。③ 中横。④ 底横（共4画）。',
          ru: '① Левая вертикаль. ② Правая вертикаль. ③ Средняя линия. ④ Нижняя линия (4 черты).',
          ja: '① 左の縦線。② 右の縦線。③ 真ん中の横線。④ 下の横線（4画）。',
          mn: '① Зүүн босоо. ② Баруун босоо. ③ Дунд хөндлөн. ④ Доод хөндлөн (4 зурлага).'
        }
      },
      {
        id: 'c-siot',
        char: 'ㅅ',
        name: '시옷',
        romaja: '[s]',
        strokes: [
          'M 80 40 Q 72 70 42 122',
          'M 70 76 Q 96 100 122 122'
        ],
        strokePoints: [{ x: 80, y: 40 }, { x: 70, y: 76 }],
        sampleWord: '사과',
        sampleWordRomaja: 'sa-gwa',
        meanings: {
          en: 'apple',
          vi: 'quả táo',
          bn: 'আপেল',
          zh: '苹果',
          ru: 'яблоко',
          ja: 'りんご',
          mn: 'алим'
        },
        tips: {
          en: '① Diagonal stroke down to left. ② Slanted stroke down to right (2 strokes).',
          vi: '① Nét xiên sang trái. ② Nét xiên sang phải từ điểm giữa (2 nét).',
          bn: '① বামে তির্যক রেখা। ② ডানে তির্যক রেখা (২ স্ট্রোক)।',
          zh: '① 从上向左撇。② 从中间向右捺（共2画）。',
          ru: '① Диагональ влево вниз. ② Диагональ вправо вниз (2 черты).',
          ja: '① 左下に払う。② 右下に払う（2画）。',
          mn: '① Зүүн доош ташуу зурах. ② Баруун доош ташуу зурах (2 зурлага).'
        }
      },
      {
        id: 'c-ieung',
        char: 'ㅇ',
        name: '이응',
        romaja: '[silent / ng]',
        strokes: ['M 80 38 A 42 42 0 1 0 80 122 A 42 42 0 1 0 80 38'],
        strokePoints: [{ x: 80, y: 38 }],
        sampleWord: '오이',
        sampleWordRomaja: 'o-i',
        meanings: {
          en: 'cucumber',
          vi: 'dưa leo / dưa chuột',
          bn: 'শসা',
          zh: '黄瓜',
          ru: 'огурец',
          ja: 'きゅうり',
          mn: 'өргөст хэмх'
        },
        tips: {
          en: 'Draw a circle starting from the top, moving counter-clockwise (1 stroke).',
          vi: 'Vẽ hình tròn ngược chiều kim đồng hồ bắt đầu từ đỉnh (1 nét).',
          bn: 'উপর থেকে ঘড়ির কাঁটার বিপরীত দিকে বৃত্ত আঁকুন (১ স্ট্রোক)।',
          zh: '从正上方开始，逆时针画一个完整的圆（共1画）。',
          ru: 'Круг против часовой стрелки, начиная сверху (1 черта).',
          ja: '上から反時計回りにきれいに丸を書きます（1画）。',
          mn: 'Дээрээс цагийн зүүний эсрэг чиглэлд бүтэн дугуй зурна (1 зурлага).'
        }
      },
      {
        id: 'c-jieut',
        char: 'ㅈ',
        name: '지읒',
        romaja: '[j / ch]',
        strokes: [
          'M 38 48 L 110 48 Q 116 48 108 58 L 42 120',
          'M 80 84 L 122 118'
        ],
        strokePoints: [{ x: 38, y: 48 }, { x: 80, y: 84 }],
        sampleWord: '자전거',
        sampleWordRomaja: 'ja-jeon-geo',
        meanings: {
          en: 'bicycle',
          vi: 'xe đạp',
          bn: 'সাইকেল',
          zh: '自行车',
          ru: 'велосипед',
          ja: 'じてんしゃ',
          mn: 'унадаг дугуй'
        },
        tips: {
          en: '① Horizontal and curve down to left. ② Slant down to right (2 strokes).',
          vi: '① Ngang rồi uốn cong sang trái. ② Nét xiên sang phải (2 nét).',
          bn: '① আনুভূমিক থেকে বামে বাঁকানো। ② ডানে তির্যক রেখা (২ স্ট্রোক)।',
          zh: '① 横折向左弯。② 从折角向右下撇（共2画）。',
          ru: '① Горизонталь и влево вниз. ② Вправо вниз (2 черты).',
          ja: '① 横に引いて左下に曲げる。② 右下に払う（2画）。',
          mn: '① Хөндлөн татаж зүүн тийш нугалах. ② Баруун доош ташуу зурах (2 зурлага).'
        }
      },
      {
        id: 'c-chieut',
        char: 'ㅊ',
        name: '치읓',
        romaja: '[ch]',
        strokes: [
          'M 52 40 L 102 40',
          'M 38 64 L 110 64 Q 116 64 108 74 L 42 124',
          'M 80 96 L 122 122'
        ],
        strokePoints: [{ x: 52, y: 40 }, { x: 38, y: 64 }, { x: 80, y: 96 }],
        sampleWord: '치마',
        sampleWordRomaja: 'chi-ma',
        meanings: {
          en: 'skirt',
          vi: 'váy',
          bn: 'স্কার্ট',
          zh: '裙子',
          ru: 'юбка',
          ja: 'スカート',
          mn: 'банзал'
        },
        tips: {
          en: '① Top dot/dash. ② Horizontal and curve left. ③ Slant right (3 strokes).',
          vi: '① Chấm/ngang ngắn trên. ② Ngang rồi cong sang trái. ③ Xiên phải (3 nét).',
          bn: '① উপরের ছোট রেখা। ② আনুভূমিক থেকে বামে বাঁকা। ③ ডানে তির্যক (৩ স্ট্রোক)।',
          zh: '① 顶上一短横。② 横折向左。③ 右下撇（共3画）。',
          ru: '① Верхний короткий штрих. ② Горизонталь и влево. ③ Вправо вниз (3 черты).',
          ja: '① 上の短い横線。② 横に引いて左下に曲げる。③ 右下へ払う（3画）。',
          mn: '① Дээд богино зураас. ② Хөндлөн татаж зүүн тийш нугалах. ③ Баруун доош ташуу (3 зурлага).'
        }
      },
      {
        id: 'c-kieuk',
        char: 'ㅋ',
        name: '키읔',
        romaja: '[k]',
        strokes: [
          'M 34 46 L 120 46 Q 132 46 132 58 L 132 128',
          'M 34 86 L 124 86'
        ],
        strokePoints: [{ x: 34, y: 46 }, { x: 34, y: 86 }],
        sampleWord: '카메라',
        sampleWordRomaja: 'ka-me-ra',
        meanings: {
          en: 'camera',
          vi: 'máy ảnh',
          bn: 'ক্যামেরা',
          zh: '照相机',
          ru: 'камера',
          ja: 'カメラ',
          mn: 'камер'
        },
        tips: {
          en: '① Outer ㄱ shape. ② Middle horizontal line (2 strokes).',
          vi: '① Nét ㄱ bên ngoài. ② Nét ngang ở giữa (2 nét).',
          bn: '① বাইরের ㄱ আকৃতি। ② মাঝের আনুভূমিক রেখা (২ স্ট্রোক)।',
          zh: '① 先写外面的ㄱ。② 再添中间一横（共2画）。',
          ru: '① Внешний угол ㄱ. ② Средняя перекладина (2 черты).',
          ja: '① 外側の「ㄱ」。② 真ん中の横線（2画）。',
          mn: '① Гадна ㄱ хэлбэр. ② Дунд хөндлөн шугам (2 зурлага).'
        }
      },
      {
        id: 'c-tieut',
        char: 'ㅌ',
        name: '티읕',
        romaja: '[t]',
        strokes: [
          'M 40 44 L 122 44',
          'M 44 82 L 118 82',
          'M 44 44 L 40 114 Q 40 120 50 120 L 124 120'
        ],
        strokePoints: [{ x: 40, y: 44 }, { x: 44, y: 82 }, { x: 44, y: 44 }],
        sampleWord: '토끼',
        sampleWordRomaja: 'to-kki',
        meanings: {
          en: 'rabbit / bunny',
          vi: 'con thỏ',
          bn: 'খরগোশ',
          zh: '兔子',
          ru: 'кролик / заяц',
          ja: 'うさぎ',
          mn: 'туулай'
        },
        tips: {
          en: '① Top horizontal. ② Middle horizontal. ③ Left vertical & bottom horizontal (3 strokes).',
          vi: '① Ngang trên. ② Ngang giữa. ③ Dọc trái uốn ngang đáy (3 nét).',
          bn: '① উপরের আনুভূমিক। ② মাঝের আনুভূমিক। ③ বাম উল্লম্ব ও নিচের রেখা (৩ স্ট্রোক)।',
          zh: '① 上横。② 中横。③ 竖折到底横（共3画）。',
          ru: '① Верхняя линия. ② Средняя линия. ③ Вертикаль с нижним загибом (3 черты).',
          ja: '① 上の横線。② 真ん中の横線。③ 縦に引いて下の横線へ曲げる（3画）。',
          mn: '① Дээд хөндлөн. ② Дунд хөндлөн. ③ Босоо татаж доод сууриар нугалах (3 зурлага).'
        }
      },
      {
        id: 'c-pieup',
        char: 'ㅍ',
        name: '피읖',
        romaja: '[p]',
        strokes: [
          'M 32 44 L 128 44',
          'M 58 44 L 58 122',
          'M 102 44 L 102 122',
          'M 32 122 L 128 122'
        ],
        strokePoints: [{ x: 32, y: 44 }, { x: 58, y: 44 }, { x: 102, y: 44 }, { x: 32, y: 122 }],
        sampleWord: '피아노',
        sampleWordRomaja: 'pi-a-no',
        meanings: {
          en: 'piano',
          vi: 'đàn piano',
          bn: 'পিয়ানো',
          zh: '钢琴',
          ru: 'пианино',
          ja: 'ピアノ',
          mn: 'төгөлдөр хуур'
        },
        tips: {
          en: '① Top horizontal. ② Left vertical. ③ Right vertical. ④ Bottom horizontal (4 strokes).',
          vi: '① Ngang trên. ② Dọc trái. ③ Dọc phải. ④ Ngang đáy (4 nét).',
          bn: '① উপরের রেখা। ② বাম উল্লম্ব। ③ ডান উল্লম্ব। ④ নিচের রেখা (৪ স্ট্রোক)।',
          zh: '① 上横。② 左竖。③ 右竖。④ 底横（共4画）。',
          ru: '① Верхняя линия. ② Левая вертикаль. ③ Правая вертикаль. ④ Нижняя линия (4 черты).',
          ja: '① 上の横線。② 左の縦線。③ 右の縦線。④ 下の横線（4画）。',
          mn: '① Дээд хөндлөн. ② Зүүн босоо. ③ Баруун босоо. ④ Доод хөндлөн (4 зурлага).'
        }
      },
      {
        id: 'c-hieut',
        char: 'ㅎ',
        name: '히읗',
        romaja: '[h]',
        strokes: [
          'M 54 38 L 106 38',
          'M 34 64 L 126 64',
          'M 80 76 A 28 28 0 1 0 80 132 A 28 28 0 1 0 80 76'
        ],
        strokePoints: [{ x: 54, y: 38 }, { x: 34, y: 64 }, { x: 80, y: 76 }],
        sampleWord: '하늘',
        sampleWordRomaja: 'ha-neul',
        meanings: {
          en: 'sky',
          vi: 'bầu trời',
          bn: 'আকাশ',
          zh: '天空',
          ru: 'небо',
          ja: 'そら',
          mn: 'тэнгэр'
        },
        tips: {
          en: '① Short top horizontal. ② Long middle horizontal. ③ Bottom circle (3 strokes).',
          vi: '① Ngang ngắn trên. ② Ngang dài giữa. ③ Vòng tròn dưới (3 nét).',
          bn: '① উপরের ছোট রেখা। ② মাঝের দীর্ঘ রেখা। ③ নিচের বৃত্ত (৩ স্ট্রোক)।',
          zh: '① 顶上一短横。② 中间一长横。③ 下面画圆圈（共3画）。',
          ru: '① Короткий верхний штрих. ② Длинная средняя линия. ③ Нижний круг (3 черты).',
          ja: '① 上の短い横線。② 真ん中の長い横線。③ 下の丸（3画）。',
          mn: '① Дээд богино хөндлөн. ② Дунд урт хөндлөн. ③ Доод дугуй (3 зурлага).'
        }
      }
    ]
  },

  // 2. 쌍자음 5자 (ㄲ ~ ㅉ)
  {
    id: 'double_consonants',
    titleKo: '② 쌍자음 5자 (ㄲ~ㅉ)',
    titleEn: '5 Double Consonants (ㄲ~ㅉ)',
    badge: '쌍자음',
    cards: [
      {
        id: 'c-ssang-giyeok',
        char: 'ㄲ',
        name: '쌍기역',
        romaja: '[kk]',
        strokes: [
          'M 18 48 L 68 48 Q 78 48 78 58 L 78 124',
          'M 86 48 L 136 48 Q 146 48 146 58 L 146 124'
        ],
        strokePoints: [{ x: 18, y: 48 }, { x: 86, y: 48 }],
        sampleWord: '꼬리',
        sampleWordRomaja: 'kko-ri',
        meanings: {
          en: 'tail',
          vi: 'cái đuôi',
          bn: 'লেজ',
          zh: '尾巴',
          ru: 'хвост',
          ja: 'しっぽ',
          mn: 'сүүл'
        },
        tips: {
          en: 'Write two ㄱ side-by-side (2 strokes).',
          vi: 'Viết hai chữ ㄱ cạnh nhau (2 nét).',
          bn: 'পাশাপাশি দুটি ㄱ লিখুন (২ স্ট্রোক)।',
          zh: '并排写两个ㄱ（共2画）。',
          ru: 'Напишите два ㄱ рядом (2 черты).',
          ja: '「ㄱ」を横に2つ並べて書きます（2画）。',
          mn: 'Хоёр ㄱ-г зэрэгцүүлэн бичнэ (2 зурлага).'
        }
      },
      {
        id: 'c-ssang-digeut',
        char: 'ㄸ',
        name: '쌍디귿',
        romaja: '[tt]',
        strokes: [
          'M 18 46 L 72 46',
          'M 30 50 L 30 120 Q 30 126 38 126 L 72 126',
          'M 86 46 L 140 46',
          'M 98 50 L 98 120 Q 98 126 106 126 L 140 126'
        ],
        strokePoints: [{ x: 18, y: 46 }, { x: 30, y: 50 }, { x: 86, y: 46 }, { x: 98, y: 50 }],
        sampleWord: '딸기',
        sampleWordRomaja: 'ttal-gi',
        meanings: {
          en: 'strawberry',
          vi: 'quả dâu tây',
          bn: 'স্ট্রবেরি',
          zh: '草莓',
          ru: 'клубника',
          ja: 'いちご',
          mn: 'гүзээлзгэнэ'
        },
        tips: {
          en: 'Write two ㄷ side-by-side (4 strokes).',
          vi: 'Viết hai chữ ㄷ cạnh nhau (4 nét).',
          bn: 'পাশাপাশি দুটি ㄷ লিখুন (৪ স্ট্রোক)।',
          zh: '并排写两个ㄷ（共4画）。',
          ru: 'Напишите два ㄷ рядом (4 черты).',
          ja: '「ㄷ」を横に2つ並べて書きます（4画）。',
          mn: 'Хоёр ㄷ-г зэрэгцүүлэн бичнэ (4 зурлага).'
        }
      },
      {
        id: 'c-ssang-bieup',
        char: 'ㅃ',
        name: '쌍비읍',
        romaja: '[pp]',
        strokes: [
          'M 22 42 L 22 120',
          'M 68 42 L 68 120',
          'M 22 78 L 68 78',
          'M 22 120 L 68 120',
          'M 90 42 L 90 120',
          'M 136 42 L 136 120',
          'M 90 78 L 136 78',
          'M 90 120 L 136 120'
        ],
        strokePoints: [{ x: 22, y: 42 }, { x: 68, y: 42 }, { x: 22, y: 78 }, { x: 22, y: 120 }, { x: 90, y: 42 }, { x: 136, y: 42 }, { x: 90, y: 78 }, { x: 90, y: 120 }],
        sampleWord: '빵',
        sampleWordRomaja: 'ppang',
        meanings: {
          en: 'bread',
          vi: 'bánh mì',
          bn: 'রুটি',
          zh: '面包',
          ru: 'хлеб',
          ja: 'パン',
          mn: 'талх'
        },
        tips: {
          en: 'Write two ㅂ side-by-side (8 strokes).',
          vi: 'Viết hai chữ ㅂ cạnh nhau (8 nét).',
          bn: 'পাশাপাশি দুটি ㅂ লিখুন (৮ স্ট্রোক)।',
          zh: '并排写两个ㅂ（共8画）。',
          ru: 'Напишите два ㅂ рядом (8 черт).',
          ja: '「ㅂ」を横に2つ並べて書きます（8画）。',
          mn: 'Хоёр ㅂ-г зэрэгцүүлэн бичнэ (8 зурлага).'
        }
      },
      {
        id: 'c-ssang-siot',
        char: 'ㅆ',
        name: '쌍시옷',
        romaja: '[ss]',
        strokes: [
          'M 52 46 Q 44 76 22 122',
          'M 44 80 Q 64 100 80 122',
          'M 108 46 Q 100 76 78 122',
          'M 100 80 Q 120 100 136 122'
        ],
        strokePoints: [{ x: 52, y: 46 }, { x: 44, y: 80 }, { x: 108, y: 46 }, { x: 100, y: 80 }],
        sampleWord: '쌀',
        sampleWordRomaja: 'ssal',
        meanings: {
          en: 'uncooked rice',
          vi: 'gạo',
          bn: 'চাল',
          zh: '大米',
          ru: 'рис',
          ja: 'お米',
          mn: 'цагаан будаа'
        },
        tips: {
          en: 'Write two ㅅ side-by-side (4 strokes).',
          vi: 'Viết hai chữ ㅅ cạnh nhau (4 nét).',
          bn: 'পাশাপাশি দুটি ㅅ লিখুন (৪ স্ট্রোক)।',
          zh: '并排写两个ㅅ（共4画）。',
          ru: 'Напишите два ㅅ рядом (4 черты).',
          ja: '「ㅅ」を横に2つ並べて書きます（4画）。',
          mn: 'Хоёр ㅅ-г зэрэгцүүлэн бичнэ (4 зурлага).'
        }
      },
      {
        id: 'c-ssang-jieut',
        char: 'ㅉ',
        name: '쌍지읒',
        romaja: '[jj]',
        strokes: [
          'M 20 52 L 68 52 Q 74 52 68 62 L 22 120',
          'M 54 84 L 78 120',
          'M 84 52 L 132 52 Q 138 52 132 62 L 86 120',
          'M 118 84 L 142 120'
        ],
        strokePoints: [{ x: 20, y: 52 }, { x: 54, y: 84 }, { x: 84, y: 52 }, { x: 118, y: 84 }],
        sampleWord: '찌개',
        sampleWordRomaja: 'jji-gae',
        meanings: {
          en: 'stew (jjigae)',
          vi: 'canh hầm / lẩu',
          bn: 'স্টু / স্যুপ',
          zh: '韩式锅 / 炖汤',
          ru: 'суп ччигэ',
          ja: 'チゲ（鍋）',
          mn: 'жигэ шөл'
        },
        tips: {
          en: 'Write two ㅈ side-by-side (4 strokes).',
          vi: 'Viết hai chữ ㅈ cạnh nhau (4 nét).',
          bn: 'পাশাপাশি দুটি ㅈ লিখুন (৪ স্ট্রোক)।',
          zh: '并排写两个ㅈ（共4画）。',
          ru: 'Напишите два ㅈ рядом (4 черты).',
          ja: '「ㅈ」を横に2つ並べて書きます（4画）。',
          mn: 'Хоёр ㅈ-г зэрэгцүүлэн бичнэ (4 зурлага).'
        }
      }
    ]
  },

  // 3. 기본 모음 10자 (ㅏ ~ ㅣ)
  {
    id: 'basic_vowels',
    titleKo: '③ 기본 모음 10자 (ㅏ~ㅣ)',
    titleEn: '10 Basic Vowels (ㅏ~ㅣ)',
    badge: '모음',
    cards: [
      {
        id: 'v-a',
        char: 'ㅏ',
        name: '아',
        romaja: '[a]',
        strokes: [
          'M 70 32 L 70 128',
          'M 70 80 L 118 80'
        ],
        strokePoints: [{ x: 70, y: 32 }, { x: 70, y: 80 }],
        sampleWord: '아이',
        sampleWordRomaja: 'a-i',
        meanings: {
          en: 'child / kid',
          vi: 'đứa trẻ / em bé',
          bn: 'শিশু',
          zh: '孩子',
          ru: 'ребёнок',
          ja: 'こども',
          mn: 'хүүхэд'
        },
        tips: {
          en: '① Long vertical line down. ② Short horizontal line to right (2 strokes).',
          vi: '① Kéo nét dọc dài từ trên xuống. ② Nét ngang ngắn sang phải (2 nét).',
          bn: '① লম্বা উল্লম্ব রেখা। ② ডানে ছোট আনুভূমিক রেখা (২ স্ট্রোক)।',
          zh: '① 先写竖。② 再向右写短横（共2画）。',
          ru: '① Длинная вертикаль вниз. ② Короткая вправо (2 черты).',
          ja: '① 長い縦線。② 右へ短い横線（2画）。',
          mn: '① Урт босоо шугам. ② Баруун тийш богино хөндлөн (2 зурлага).'
        }
      },
      {
        id: 'v-ya',
        char: 'ㅑ',
        name: '야',
        romaja: '[ya]',
        strokes: [
          'M 64 32 L 64 128',
          'M 64 62 L 114 62',
          'M 64 98 L 114 98'
        ],
        strokePoints: [{ x: 64, y: 32 }, { x: 64, y: 62 }, { x: 64, y: 98 }],
        sampleWord: '야구',
        sampleWordRomaja: 'ya-gu',
        meanings: {
          en: 'baseball',
          vi: 'bóng chày',
          bn: 'বেসবল',
          zh: '棒球',
          ru: 'бейсбол',
          ja: 'やきゅう',
          mn: 'бэйсбол'
        },
        tips: {
          en: '① Long vertical line. ② Upper horizontal. ③ Lower horizontal (3 strokes).',
          vi: '① Nét dọc dài. ② Nét ngang trên. ③ Nét ngang dưới (3 nét).',
          bn: '① লম্বা উল্লম্ব রেখা। ② উপরের অনুভূমিক। ③ নিচের অনুভূমিক (৩ স্ট্রোক)।',
          zh: '① 先写竖。② 写上边的短横。③ 写下边的短横（共3画）。',
          ru: '① Длинная вертикаль. ② Верхний короткий штрих. ③ Нижний (3 черты).',
          ja: '① 長い縦線。② 上の横線。③ 下の横線（3画）。',
          mn: '① Урт босоо. ② Дээд богино хөндлөн. ③ Доод богино хөндлөн (3 зурлага).'
        }
      },
      {
        id: 'v-eo',
        char: 'ㅓ',
        name: '어',
        romaja: '[eo]',
        strokes: [
          'M 42 80 L 90 80',
          'M 90 32 L 90 128'
        ],
        strokePoints: [{ x: 42, y: 80 }, { x: 90, y: 32 }],
        sampleWord: '어머니',
        sampleWordRomaja: 'eo-meo-ni',
        meanings: {
          en: 'mother',
          vi: 'mẹ',
          bn: 'মা',
          zh: '母亲 / 妈妈',
          ru: 'мама',
          ja: 'お母さん',
          mn: 'ээж'
        },
        tips: {
          en: '① Short horizontal from left. ② Long vertical line down (2 strokes).',
          vi: '① Nét ngang ngắn bên trái. ② Nét dọc dài từ trên xuống (2 nét).',
          bn: '① বামের ছোট আনুভূমিক রেখা। ② লম্বা উল্লম্ব রেখা (২ স্ট্রোক)।',
          zh: '① 先写左边的短横。② 再写长竖（共2画）。',
          ru: '① Короткий штрих слева. ② Длинная вертикаль вниз (2 черты).',
          ja: '① 左の短い横線。② 長い縦線（2画）。',
          mn: '① Зүүн богино хөндлөн. ② Урт босоо шугам (2 зурлага).'
        }
      },
      {
        id: 'v-yeo',
        char: 'ㅕ',
        name: '여',
        romaja: '[yeo]',
        strokes: [
          'M 46 62 L 96 62',
          'M 46 98 L 96 98',
          'M 96 32 L 96 128'
        ],
        strokePoints: [{ x: 46, y: 62 }, { x: 46, y: 98 }, { x: 96, y: 32 }],
        sampleWord: '여우',
        sampleWordRomaja: 'yeo-u',
        meanings: {
          en: 'fox',
          vi: 'con cáo',
          bn: 'শেয়াল',
          zh: '狐狸',
          ru: 'лиса',
          ja: 'きつね',
          mn: 'үнэг'
        },
        tips: {
          en: '① Upper short horizontal. ② Lower short horizontal. ③ Long vertical line (3 strokes).',
          vi: '① Ngang ngắn trên. ② Ngang ngắn dưới. ③ Dọc dài (3 nét).',
          bn: '① উপরের অনুভূমিক। ② নিচের অনুভূমিক। ③ লম্বা উল্লম্ব রেখা (৩ স্ট্রোক)।',
          zh: '① 上短横。② 下短横。③ 长竖（共3画）。',
          ru: '① Верхний короткий штрих. ② Нижний короткий штрих. ③ Длинная вертикаль (3 черты).',
          ja: '① 上の短い横線。② 下の短い横線。③ 長い縦線（3画）。',
          mn: '① Дээд богино хөндлөн. ② Доод богино хөндлөн. ③ Урт босоо (3 зурлага).'
        }
      },
      {
        id: 'v-o',
        char: 'ㅗ',
        name: '오',
        romaja: '[o]',
        strokes: [
          'M 80 42 L 80 92',
          'M 32 92 L 128 92'
        ],
        strokePoints: [{ x: 80, y: 42 }, { x: 32, y: 92 }],
        sampleWord: '오리',
        sampleWordRomaja: 'o-ri',
        meanings: {
          en: 'duck',
          vi: 'con vịt',
          bn: 'হাঁস',
          zh: '鸭子',
          ru: 'утка',
          ja: 'あひる',
          mn: 'нугас'
        },
        tips: {
          en: '① Short vertical down from top. ② Long horizontal line below (2 strokes).',
          vi: '① Nét dọc ngắn ở trên. ② Nét ngang dài ở dưới (2 nét).',
          bn: '① উপরের ছোট উল্লম্ব রেখা। ② নিচের লম্বা অনুভূমিক রেখা (২ স্ট্রোক)।',
          zh: '① 先写上面的短竖。② 再写下面的长横（共2画）。',
          ru: '① Короткая вертикаль сверху. ② Длинная горизонталь внизу (2 черты).',
          ja: '① 上の短い縦線。② 下の長い横線（2画）。',
          mn: '① Дээд богино босоо. ② Доод урт хөндлөн шугам (2 зурлага).'
        }
      },
      {
        id: 'v-yo',
        char: 'ㅛ',
        name: '요',
        romaja: '[yo]',
        strokes: [
          'M 62 42 L 62 92',
          'M 98 42 L 98 92',
          'M 32 92 L 128 92'
        ],
        strokePoints: [{ x: 62, y: 42 }, { x: 98, y: 42 }, { x: 32, y: 92 }],
        sampleWord: '요리',
        sampleWordRomaja: 'yo-ri',
        meanings: {
          en: 'cooking / cuisine',
          vi: 'nấu ăn / món ăn',
          bn: 'রান্না',
          zh: '料理 / 做菜',
          ru: 'готовка / блюдо',
          ja: 'りょうり',
          mn: 'хоол хийх'
        },
        tips: {
          en: '① Left short vertical. ② Right short vertical. ③ Bottom long horizontal (3 strokes).',
          vi: '① Dọc ngắn trái. ② Dọc ngắn phải. ③ Ngang dài đáy (3 nét).',
          bn: '① বামের ছোট উল্লম্ব। ② ডানের ছোট উল্লম্ব। ③ নিচের লম্বা অনুভূমিক (৩ স্ট্রোক)।',
          zh: '① 左短竖。② 右短竖。③ 下长横（共3画）。',
          ru: '① Левая короткая вертикаль. ② Правая короткая. ③ Нижняя длинная (3 черты).',
          ja: '① 左の短い縦線。② 右の短い縦線。③ 下の長い横線（3画）。',
          mn: '① Зүүн богино босоо. ② Баруун богино босоо. ③ Доод урт хөндлөн (3 зурлага).'
        }
      },
      {
        id: 'v-u',
        char: 'ㅜ',
        name: '우',
        romaja: '[u]',
        strokes: [
          'M 32 68 L 128 68',
          'M 80 68 L 80 118'
        ],
        strokePoints: [{ x: 32, y: 68 }, { x: 80, y: 68 }],
        sampleWord: '우산',
        sampleWordRomaja: 'u-san',
        meanings: {
          en: 'umbrella',
          vi: 'cái ô / cái dù',
          bn: 'ছাতা',
          zh: '雨伞',
          ru: 'зонтик',
          ja: 'かさ',
          mn: 'шүхэр'
        },
        tips: {
          en: '① Long horizontal line. ② Short vertical down from center (2 strokes).',
          vi: '① Nét ngang dài ở trên. ② Nét dọc ngắn kéo xuống từ giữa (2 nét).',
          bn: '① লম্বা অনুভূমিক রেখা। ② মাঝ থেকে নিচে ছোট উল্লম্ব (২ স্ট্রোক)।',
          zh: '① 先写上面的长横。② 再从中间向下写短竖（共2画）。',
          ru: '① Длинная горизонталь. ② Короткая вертикаль вниз из центра (2 черты).',
          ja: '① 長い横線。② 真ん中から下へ短い縦線（2画）。',
          mn: '① Урт хөндлөн шугам. ② Төвөөс доош богино босоо (2 зурлага).'
        }
      },
      {
        id: 'v-yu',
        char: 'ㅠ',
        name: '유',
        romaja: '[yu]',
        strokes: [
          'M 32 68 L 128 68',
          'M 62 68 L 62 118',
          'M 98 68 L 98 118'
        ],
        strokePoints: [{ x: 32, y: 68 }, { x: 62, y: 68 }, { x: 98, y: 68 }],
        sampleWord: '유리',
        sampleWordRomaja: 'yu-ri',
        meanings: {
          en: 'glass',
          vi: 'kính / thủy tinh',
          bn: 'কাচ',
          zh: '玻璃',
          ru: 'стекло',
          ja: 'ガラス',
          mn: 'шил'
        },
        tips: {
          en: '① Long horizontal. ② Left short vertical down. ③ Right short vertical down (3 strokes).',
          vi: '① Ngang dài trên. ② Dọc ngắn trái. ③ Dọc ngắn phải (3 nét).',
          bn: '① লম্বা অনুভূমিক। ② বামের ছোট উল্লম্ব। ③ ডানের ছোট উল্লম্ব (৩ স্ট্রোক)।',
          zh: '① 先写上长横。② 左短竖向下。③ 右短竖向下（共3画）。',
          ru: '① Длинная горизонталь. ② Левая короткая вниз. ③ Правая короткая вниз (3 черты).',
          ja: '① 長い横線。② 左の短い縦線。③ 右の短い縦線（3画）。',
          mn: '① Урт хөндлөн. ② Зүүн богино босоо. ③ Баруун богино босоо (3 зурлага).'
        }
      },
      {
        id: 'v-eu',
        char: 'ㅡ',
        name: '으',
        romaja: '[eu]',
        strokes: ['M 34 80 L 126 80'],
        strokePoints: [{ x: 34, y: 80 }],
        sampleWord: '으뜸',
        sampleWordRomaja: 'eu-tteum',
        meanings: {
          en: 'best / foremost',
          vi: 'đứng đầu / giỏi nhất',
          bn: 'সেরা / শীর্ষ',
          zh: '第一 / 魁首',
          ru: 'лучший / высший',
          ja: 'いちばん / 最高',
          mn: 'хамгийн шилдэг'
        },
        tips: {
          en: 'Draw a single horizontal line straight from left to right (1 stroke).',
          vi: 'Kéo một nét ngang thẳng từ trái sang phải (1 nét).',
          bn: 'বাম থেকে ডানে একটি সোজা অনুভূমিক রেখা টানুন (১ স্ট্রোক)।',
          zh: '从左向右平稳写一长横（共1画）。',
          ru: 'Одна горизонтальная линия слева направо (1 черта).',
          ja: '左から右へ真っ直ぐ1本引きます（1画）。',
          mn: 'Зүүнээс баруун тийш нэг шулуун хөндлөн зураас (1 зурлага).'
        }
      },
      {
        id: 'v-i',
        char: 'ㅣ',
        name: '이',
        romaja: '[i]',
        strokes: ['M 80 32 L 80 128'],
        strokePoints: [{ x: 80, y: 32 }],
        sampleWord: '이마',
        sampleWordRomaja: 'i-ma',
        meanings: {
          en: 'forehead',
          vi: 'cái trán',
          bn: 'কপাল',
          zh: '额头',
          ru: 'лоб',
          ja: 'おでこ',
          mn: 'дух'
        },
        tips: {
          en: 'Draw a single vertical line straight down from top to bottom (1 stroke).',
          vi: 'Kéo một nét dọc thẳng từ trên xuống dưới (1 nét).',
          bn: 'উপর থেকে নিচে একটি সোজা উল্লম্ব রেখা টানুন (১ স্ট্রোক)।',
          zh: '从上向下垂直写一长竖（共1画）。',
          ru: 'Одна прямая вертикальная линия сверху вниз (1 черта).',
          ja: '上から下へ真っ直ぐ1本引きます（1画）。',
          mn: 'Дээрээс доош нэг шулуун босоо зураас (1 зурлага).'
        }
      }
    ]
  },

  // 4. 복합 모음 11자 (ㅐ ~ ㅢ)
  {
    id: 'compound_vowels',
    titleKo: '④ 복합 모음 11자 (ㅐ~ㅢ)',
    titleEn: '11 Compound Vowels (ㅐ~ㅢ)',
    badge: '복합모음',
    cards: [
      {
        id: 'v-ae',
        char: 'ㅐ',
        name: '애',
        romaja: '[ae]',
        strokes: [
          'M 52 32 L 52 128',
          'M 52 80 L 108 80',
          'M 108 32 L 108 128'
        ],
        strokePoints: [{ x: 52, y: 32 }, { x: 52, y: 80 }, { x: 108, y: 32 }],
        sampleWord: '개미',
        sampleWordRomaja: 'gae-mi',
        meanings: {
          en: 'ant',
          vi: 'con kiến',
          bn: 'পিপঁড়ে',
          zh: '蚂蚁',
          ru: 'муравей',
          ja: 'あり',
          mn: 'шоргоолж'
        },
        tips: {
          en: '① Left vertical. ② Middle horizontal. ③ Right vertical (3 strokes).',
          vi: '① Dọc trái. ② Ngang giữa. ③ Dọc phải (3 nét).',
          bn: '① বাম উল্লম্ব। ② মাঝের অনুভূমিক। ③ ডান উল্লম্ব (৩ স্ট্রোক)।',
          zh: '① 左竖。② 中短横。③ 右竖（共3画）。',
          ru: '① Левая вертикаль. ② Средний штрих. ③ Правая вертикаль (3 черты).',
          ja: '① 左の縦線。② 真ん中の横線。③ 右の縦線（3画）。',
          mn: '① Зүүн босоо. ② Дунд хөндлөн. ③ Баруун босоо (3 зурлага).'
        }
      },
      {
        id: 'v-yae',
        char: 'ㅒ',
        name: '얘',
        romaja: '[yae]',
        strokes: [
          'M 52 32 L 52 128',
          'M 52 64 L 108 64',
          'M 52 96 L 108 96',
          'M 108 32 L 108 128'
        ],
        strokePoints: [{ x: 52, y: 32 }, { x: 52, y: 64 }, { x: 52, y: 96 }, { x: 108, y: 32 }],
        sampleWord: '얘기',
        sampleWordRomaja: 'yae-gi',
        meanings: {
          en: 'story / conversation',
          vi: 'câu chuyện / nói chuyện',
          bn: 'গল্প / কথা',
          zh: '故事 / 聊天',
          ru: 'разговор / история',
          ja: 'おはなし',
          mn: 'яриа / түүх'
        },
        tips: {
          en: '① Left vertical. ② Upper horizontal. ③ Lower horizontal. ④ Right vertical (4 strokes).',
          vi: '① Dọc trái. ② Ngang trên. ③ Ngang dưới. ④ Dọc phải (4 nét).',
          bn: '① বাম উল্লম্ব। ② উপরের রেখা। ③ নিচের রেখা। ④ ডান উল্লম্ব (৪ স্ট্রোক)।',
          zh: '① 左竖。② 上短横。③ 下短横。④ 右竖（共4画）。',
          ru: '① Левая вертикаль. ② Верхний штрих. ③ Нижний штрих. ④ Правая вертикаль (4 черты).',
          ja: '① 左の縦線。② 上の横線。③ 下の横線。④ 右の縦線（4画）。',
          mn: '① Зүүн босоо. ② Дээд хөндлөн. ③ Доод хөндлөн. ④ Баруун босоо (4 зурлага).'
        }
      },
      {
        id: 'v-e',
        char: 'ㅔ',
        name: '에',
        romaja: '[e]',
        strokes: [
          'M 40 80 L 78 80',
          'M 78 32 L 78 128',
          'M 118 32 L 118 128'
        ],
        strokePoints: [{ x: 40, y: 80 }, { x: 78, y: 32 }, { x: 118, y: 32 }],
        sampleWord: '베개',
        sampleWordRomaja: 'be-gae',
        meanings: {
          en: 'pillow',
          vi: 'cái gối',
          bn: 'বালিশ',
          zh: '枕头',
          ru: 'подушка',
          ja: 'まくら',
          mn: 'дэр'
        },
        tips: {
          en: '① Left horizontal. ② Middle vertical. ③ Right vertical (3 strokes).',
          vi: '① Ngang trái. ② Dọc giữa. ③ Dọc phải (3 nét).',
          bn: '① বাম অনুভূমিক। ② মাঝের উল্লম্ব। ③ ডান উল্লম্ব (৩ স্ট্রোক)।',
          zh: '① 左短横。② 中竖。③ 右竖（共3画）。',
          ru: '① Левый штрих. ② Средняя вертикаль. ③ Правая вертикаль (3 черты).',
          ja: '① 左の短い横線。② 真ん中の縦線。③ 右の縦線（3画）。',
          mn: '① Зүүн хөндлөн. ② Дунд босоо. ③ Баруун босоо (3 зурлага).'
        }
      },
      {
        id: 'v-ye',
        char: 'ㅖ',
        name: '예',
        romaja: '[ye]',
        strokes: [
          'M 40 62 L 78 62',
          'M 40 98 L 78 98',
          'M 78 32 L 78 128',
          'M 118 32 L 118 128'
        ],
        strokePoints: [{ x: 40, y: 62 }, { x: 40, y: 98 }, { x: 78, y: 32 }, { x: 118, y: 32 }],
        sampleWord: '예의',
        sampleWordRomaja: 'ye-ui',
        meanings: {
          en: 'manners / etiquette',
          vi: 'lễ phép / phép tắc',
          bn: 'ভদ্রতা / শিষ্টাচার',
          zh: '礼貌 / 礼节',
          ru: 'вежливость / этикет',
          ja: 'れいぎ / マナー',
          mn: 'эелдэг зан / ёс зүй'
        },
        tips: {
          en: '① Upper left horizontal. ② Lower left horizontal. ③ Middle vertical. ④ Right vertical (4 strokes).',
          vi: '① Ngang trên trái. ② Ngang dưới trái. ③ Dọc giữa. ④ Dọc phải (4 nét).',
          bn: '① উপরের বাম রেখা। ② নিচের বাম রেখা। ③ মাঝের উল্লম্ব। ④ ডান উল্লম্ব (৪ স্ট্রোক)।',
          zh: '① 左上横。② 左下横。③ 中竖。④ 右竖（共4画）。',
          ru: '① Верхний левый. ② Нижний левый. ③ Средняя вертикаль. ④ Правая вертикаль (4 черты).',
          ja: '① 左上の横線。② 左下の横線。③ 真ん中の縦線。④ 右の縦線（4画）。',
          mn: '① Зүүн дээд хөндлөн. ② Зүүн доод хөндлөн. ③ Дунд босоо. ④ Баруун босоо (4 зурлага).'
        }
      },
      {
        id: 'v-wa',
        char: 'ㅘ',
        name: '와',
        romaja: '[wa]',
        strokes: [
          'M 56 46 L 56 86',
          'M 28 86 L 94 86',
          'M 112 32 L 112 128',
          'M 112 76 L 138 76'
        ],
        strokePoints: [{ x: 56, y: 46 }, { x: 28, y: 86 }, { x: 112, y: 32 }, { x: 112, y: 76 }],
        sampleWord: '와플',
        sampleWordRomaja: 'wa-peul',
        meanings: {
          en: 'waffle',
          vi: 'bánh quế (waffle)',
          bn: 'ওয়াফেল',
          zh: '华夫饼',
          ru: 'вафля',
          ja: 'ワッフル',
          mn: 'вафли'
        },
        tips: {
          en: 'Write ㅗ (strokes 1, 2), then write ㅏ on the right (strokes 3, 4) (4 strokes).',
          vi: 'Viết ㅗ trước (nét 1, 2) rồi viết ㅏ bên phải (nét 3, 4) (4 nét).',
          bn: 'প্রথমে ㅗ লিখুন (১, ২), তারপর ডানে ㅏ লিখুন (৩, ৪) (৪ স্ট্রোক)।',
          zh: '先写左边的ㅗ，再写右边的ㅏ（共4画）。',
          ru: 'Сначала напишите ㅗ (1, 2), затем справа ㅏ (3, 4) (4 черты).',
          ja: 'まず「ㅗ」を書き、右に「ㅏ」を書きます（4画）。',
          mn: 'Эхлээд ㅗ-г бичиж, баруун талд нь ㅏ-г бичнэ (4 зурлага).'
        }
      },
      {
        id: 'v-wae',
        char: 'ㅙ',
        name: '왜',
        romaja: '[wae]',
        strokes: [
          'M 48 46 L 48 86',
          'M 24 86 L 82 86',
          'M 98 32 L 98 128',
          'M 98 76 L 134 76',
          'M 134 32 L 134 128'
        ],
        strokePoints: [{ x: 48, y: 46 }, { x: 24, y: 86 }, { x: 98, y: 32 }, { x: 98, y: 76 }, { x: 134, y: 32 }],
        sampleWord: '왜냐하면',
        sampleWordRomaja: 'wae-nya-ha-myeon',
        meanings: {
          en: 'because / since',
          vi: 'bởi vì / vì',
          bn: 'কারণ',
          zh: '因为',
          ru: 'потому что',
          ja: 'なぜなら',
          mn: 'учир нь'
        },
        tips: {
          en: 'Write ㅗ (strokes 1, 2), then write ㅐ on the right (strokes 3, 4, 5) (5 strokes).',
          vi: 'Viết ㅗ trước (nét 1, 2) rồi viết ㅐ bên phải (nét 3, 4, 5) (5 nét).',
          bn: 'প্রথমে ㅗ লিখুন (১, ২), তারপর ডানে ㅐ লিখুন (৩, ৪, ৫) (৫ স্ট্রোক)।',
          zh: '先写左边的ㅗ，再写右边的ㅐ（共5画）。',
          ru: 'Сначала напишите ㅗ (1, 2), затем справа ㅐ (3, 4, 5) (5 черт).',
          ja: 'まず「ㅗ」を書き、右に「ㅐ」を書きます（5画）。',
          mn: 'Эхлээд ㅗ-г бичиж, баруун талд нь ㅐ-г бичнэ (5 зурлага).'
        }
      },
      {
        id: 'v-oe',
        char: 'ㅚ',
        name: '외',
        romaja: '[oe / we]',
        strokes: [
          'M 60 46 L 60 86',
          'M 30 86 L 96 86',
          'M 118 32 L 118 128'
        ],
        strokePoints: [{ x: 60, y: 46 }, { x: 30, y: 86 }, { x: 118, y: 32 }],
        sampleWord: '외투',
        sampleWordRomaja: 'oe-tu',
        meanings: {
          en: 'coat / jacket',
          vi: 'áo khoác ngoài',
          bn: 'কোট / জ্যাকেট',
          zh: '外套 / 大衣',
          ru: 'пальто / куртка',
          ja: 'コート / 上着',
          mn: 'дээл / цув'
        },
        tips: {
          en: 'Write ㅗ (strokes 1, 2), then vertical line ㅣ on right (stroke 3) (3 strokes).',
          vi: 'Viết ㅗ trước (nét 1, 2) rồi viết nét dọc ㅣ bên phải (nét 3) (3 nét).',
          bn: 'প্রথমে ㅗ লিখুন (১, ২), তারপর ডানে ㅣ টানুন (৩) (৩ স্ট্রোক)।',
          zh: '先写左边的ㅗ，再在右边加竖ㅣ（共3画）。',
          ru: 'Сначала напишите ㅗ (1, 2), затем справа вертикаль ㅣ (3 черты).',
          ja: 'まず「ㅗ」を書き、右に「ㅣ」を書きます（3画）。',
          mn: 'Эхлээд ㅗ-г бичиж, баруун талд нь босоо ㅣ-г бичнэ (3 зурлага).'
        }
      },
      {
        id: 'v-wo',
        char: 'ㅝ',
        name: '워',
        romaja: '[wo]',
        strokes: [
          'M 24 54 L 80 54',
          'M 52 54 L 52 98',
          'M 78 86 L 114 86',
          'M 114 32 L 114 128'
        ],
        strokePoints: [{ x: 24, y: 54 }, { x: 52, y: 54 }, { x: 78, y: 86 }, { x: 114, y: 32 }],
        sampleWord: '원숭이',
        sampleWordRomaja: 'won-sung-i',
        meanings: {
          en: 'monkey',
          vi: 'con khỉ',
          bn: 'বানর',
          zh: '猴子',
          ru: 'обезьяна',
          ja: 'さる',
          mn: 'сармагчин'
        },
        tips: {
          en: 'Write ㅜ on upper left (strokes 1, 2), then ㅓ on right (strokes 3, 4) (4 strokes).',
          vi: 'Viết ㅜ trước (nét 1, 2) rồi viết ㅓ bên phải (nét 3, 4) (4 nét).',
          bn: 'প্রথমে ㅜ লিখুন (১, ২), তারপর ডানে ㅓ লিখুন (৩, ৪) (৪ স্ট্রোক)।',
          zh: '先写左边的ㅜ，再写右边的ㅓ（共4画）。',
          ru: 'Сначала напишите ㅜ (1, 2), затем справа ㅓ (3, 4) (4 черты).',
          ja: 'まず「ㅜ」を書き、右に「ㅓ」を書きます（4画）。',
          mn: 'Эхлээд ㅜ-г бичиж, баруун талд нь ㅓ-г бичнэ (4 зурлага).'
        }
      },
      {
        id: 'v-we',
        char: 'ㅞ',
        name: '웨',
        romaja: '[we]',
        strokes: [
          'M 24 54 L 80 54',
          'M 52 54 L 52 98',
          'M 78 86 L 104 86',
          'M 104 32 L 104 128',
          'M 136 32 L 136 128'
        ],
        strokePoints: [{ x: 24, y: 54 }, { x: 52, y: 54 }, { x: 78, y: 86 }, { x: 104, y: 32 }, { x: 136, y: 32 }],
        sampleWord: '웨딩',
        sampleWordRomaja: 'we-ding',
        meanings: {
          en: 'wedding',
          vi: 'đám cưới',
          bn: 'বিবাহ / বিয়ে',
          zh: '婚礼',
          ru: 'свадьба',
          ja: 'ウェディング / 結婚式',
          mn: 'хурим'
        },
        tips: {
          en: 'Write ㅜ on left (strokes 1, 2), then ㅔ on right (strokes 3, 4, 5) (5 strokes).',
          vi: 'Viết ㅜ trước (nét 1, 2) rồi viết ㅔ bên phải (nét 3, 4, 5) (5 nét).',
          bn: 'প্রথমে ㅜ লিখুন (১, ২), তারপর ডানে ㅔ লিখুন (৩, ৪, ৫) (৫ স্ট্রোক)।',
          zh: '先写左边的ㅜ，再写右边的ㅔ（共5画）。',
          ru: 'Сначала напишите ㅜ (1, 2), затем справа ㅔ (3, 4, 5) (5 черт).',
          ja: 'まず「ㅜ」を書き、右に「ㅔ」を書きます（5画）。',
          mn: 'Эхлээд ㅜ-г бичиж, баруун талд нь ㅔ-г бичнэ (5 зурлага).'
        }
      },
      {
        id: 'v-wi',
        char: 'ㅟ',
        name: '위',
        romaja: '[wi]',
        strokes: [
          'M 32 72 L 98 72',
          'M 62 72 L 62 114',
          'M 118 32 L 118 128'
        ],
        strokePoints: [{ x: 32, y: 72 }, { x: 62, y: 72 }, { x: 118, y: 32 }],
        sampleWord: '위치',
        sampleWordRomaja: 'wi-chi',
        meanings: {
          en: 'location / position',
          vi: 'vị trí',
          bn: 'অবস্থান',
          zh: '位置',
          ru: 'местоположение',
          ja: 'いち / ばしょ',
          mn: 'байршил'
        },
        tips: {
          en: 'Write ㅜ on left (strokes 1, 2), then vertical line ㅣ on right (stroke 3) (3 strokes).',
          vi: 'Viết ㅜ trước (nét 1, 2) rồi thêm nét dọc ㅣ bên phải (nét 3) (3 nét).',
          bn: 'প্রথমে ㅜ লিখুন (১, ২), তারপর ডানে ㅣ টানুন (৩) (৩ স্ট্রোক)।',
          zh: '先写左边的ㅜ，再在右边加竖ㅣ（共3画）。',
          ru: 'Сначала напишите ㅜ (1, 2), затем справа вертикаль ㅣ (3 черты).',
          ja: 'まず「ㅜ」を書き、右に「ㅣ」を書きます（3画）。',
          mn: 'Эхлээд ㅜ-г бичиж, баруун талд нь босоо ㅣ-г бичнэ (3 зурлага).'
        }
      },
      {
        id: 'v-ui',
        char: 'ㅢ',
        name: '의',
        romaja: '[ui]',
        strokes: [
          'M 30 80 L 98 80',
          'M 116 32 L 116 128'
        ],
        strokePoints: [{ x: 30, y: 80 }, { x: 116, y: 32 }],
        sampleWord: '의사',
        sampleWordRomaja: 'ui-sa',
        meanings: {
          en: 'doctor',
          vi: 'bác sĩ',
          bn: 'ডাক্তার',
          zh: '医生',
          ru: 'врач / доктор',
          ja: 'おいしゃさん',
          mn: 'эмч'
        },
        tips: {
          en: '① Horizontal line ㅡ on left. ② Vertical line ㅣ on right (2 strokes).',
          vi: '① Nét ngang ㅡ bên trái. ② Nét dọc ㅣ bên phải (2 nét).',
          bn: '① বামে অনুভূমিক ㅡ। ② ডানে উল্লম্ব ㅣ (২ স্ট্রোক)।',
          zh: '① 先写左边的横ㅡ。② 再写右边的竖ㅣ（共2画）。',
          ru: '① Горизонталь ㅡ слева. ② Вертикаль ㅣ справа (2 черты).',
          ja: '① 左の横線「ㅡ」。② 右の縦線「ㅣ」（2画）。',
          mn: '① Зүүн талд хөндлөн ㅡ. ② Баруун талд босоо ㅣ (2 зурлага).'
        }
      }
    ]
  },

  // 5. 기본글자 만들기 (ㅏㅓㅗㅜㅡㅣ) - 총 24장 플래시카드 (1~6쪽)
  {
    id: 'basic_syllables_p1',
    titleKo: '⑤ 기본글자 만들기 (ㅏㅓㅗㅜㅡㅣ)',
    titleEn: '⑤ Making Basic Syllables (ㅏㅓㅗㅜㅡㅣ)',
    badge: '기본글자',
    cards: [
      {
        id: 'bs-p1-ga',
        char: '가',
        name: '가',
        romaja: '[ga]',
        sampleWord: '가방',
        sampleWordRomaja: 'ga-bang',
        meanings: {
          en: 'bag / backpack',
          vi: 'cặp sách / túi xách',
          bn: 'ব্যাগ',
          zh: '书包 / 背包',
          ru: 'сумка / рюкзак',
          ja: 'かばん',
          mn: 'цүнх'
        },
        tips: {
          en: 'Consonant [ㄱ](g) + Vowel [ㅏ](a) combine horizontally into [가](ga).',
          vi: 'Phụ âm [ㄱ](g) + Nguyên âm [ㅏ](a) kết hợp trái phải thành [가](ga).',
          bn: 'ব্যঞ্জনবর্ণ [ㄱ](g) + স্বরবর্ণ [ㅏ](a) পাশাপাশি যুক্ত হয়ে [가](ga) তৈরি হয়।',
          zh: '声母 [ㄱ](g) + 韵母 [ㅏ](a) 左右拼合成 [가](ga)。',
          ru: 'Согласный [ㄱ](g) + гласный [ㅏ](a) соединяются слева направо в [가](ga).',
          ja: '子音 [ㄱ](g) + 母音 [ㅏ](a) が左右に合わさって [가](ga) になります。',
          mn: 'Гийгүүлэгч [ㄱ](g) ба эгшиг [ㅏ](a) зүүнээс баруун тийш нийлж [가](ga) болно.'
        },
        combination: {
          consonant: 'ㄱ',
          consonantSound: '그',
          consonantRomaja: '[g]',
          vowel: 'ㅏ',
          vowelSound: '아',
          vowelRomaja: '[a]',
          syllable: '가',
          syllableSound: '가',
          syllableRomaja: '[ga]'
        }
      },
      {
        id: 'bs-p1-sa',
        char: '사',
        name: '사',
        romaja: '[sa]',
        sampleWord: '사과',
        sampleWordRomaja: 'sa-gwa',
        meanings: {
          en: 'apple',
          vi: 'quả táo',
          bn: 'আপেল',
          zh: '苹果',
          ru: 'яблоко',
          ja: 'りんご',
          mn: 'алим'
        },
        tips: {
          en: 'Consonant [ㅅ](s) + Vowel [ㅏ](a) combine horizontally into [사](sa).',
          vi: 'Phụ âm [ㅅ](s) + Nguyên âm [ㅏ](a) kết hợp trái phải thành [사](sa).',
          bn: 'ব্যঞ্জনবর্ণ [ㅅ](s) + স্বরবর্ণ [ㅏ](a) পাশাপাশি যুক্ত হয়ে [사](sa) তৈরি হয়।',
          zh: '声母 [ㅅ](s) + 韵母 [ㅏ](a) 左右拼合成 [사](sa)。',
          ru: 'Согласный [ㅅ](s) + гласный [ㅏ](a) соединяются слева направо в [사](sa).',
          ja: '子音 [ㅅ](s) + 母音 [ㅏ](a) が左右に合わさって [사](sa) になります。',
          mn: 'Гийгүүлэгч [ㅅ](s) ба эгшиг [ㅏ](a) зүүнээс баруун тийш нийлж [사](sa) болно.'
        },
        combination: {
          consonant: 'ㅅ',
          consonantSound: '스',
          consonantRomaja: '[s]',
          vowel: 'ㅏ',
          vowelSound: '아',
          vowelRomaja: '[a]',
          syllable: '사',
          syllableSound: '사',
          syllableRomaja: '[sa]'
        }
      },
      {
        id: 'bs-p1-ja',
        char: '자',
        name: '자',
        romaja: '[ja]',
        sampleWord: '자동차',
        sampleWordRomaja: 'ja-dong-cha',
        meanings: {
          en: 'car / automobile',
          vi: 'xe ô tô',
          bn: 'গাড়ি',
          zh: '汽车',
          ru: 'машина / автомобиль',
          ja: '自動車 / 車',
          mn: 'машин'
        },
        tips: {
          en: 'Consonant [ㅈ](j) + Vowel [ㅏ](a) combine horizontally into [자](ja).',
          vi: 'Phụ âm [ㅈ](j) + Nguyên âm [ㅏ](a) kết hợp trái phải thành [자](ja).',
          bn: 'ব্যঞ্জনবর্ণ [ㅈ](j) + স্বরবর্ণ [ㅏ](a) পাশাপাশি যুক্ত হয়ে [자](ja) তৈরি হয়।',
          zh: '声母 [ㅈ](j) + 韵母 [ㅏ](a) 左右拼合成 [자](ja)。',
          ru: 'Согласный [ㅈ](j) + гласный [ㅏ](a) соединяются слева направо в [자](ja).',
          ja: '子音 [ㅈ](j) + 母音 [ㅏ](a) が左右に合わさって [자](ja) になります。',
          mn: 'Гийгүүлэгч [ㅈ](j) ба эгшиг [ㅏ](a) зүүнээс баруун тийш нийлж [자](ja) болно.'
        },
        combination: {
          consonant: 'ㅈ',
          consonantSound: '즈',
          consonantRomaja: '[j]',
          vowel: 'ㅏ',
          vowelSound: '아',
          vowelRomaja: '[a]',
          syllable: '자',
          syllableSound: '자',
          syllableRomaja: '[ja]'
        }
      },
      {
        id: 'bs-p1-word-saja',
        char: '사자',
        name: '사자',
        romaja: '[sa-ja]',
        sampleWord: '사자',
        sampleWordRomaja: 'sa-ja',
        meanings: {
          en: 'Lion',
          vi: 'sư tử',
          bn: 'সিংহ',
          zh: '狮子',
          ru: 'лев',
          ja: 'ライオン',
          mn: 'арслан'
        },
        tips: {
          en: '[사](sa) + [자](ja) combine to make the word [사자](Lion)!',
          vi: '[사](sa) + [자](ja) kết hợp tạo thành từ [사자](sư tử)!',
          bn: '[사](sa) + [자](ja) যুক্ত হয়ে [사자](সিংহ) শব্দটি গঠিত হয়!',
          zh: '[사](sa) + [자](ja) 组合成单词 [사자](狮子)！',
          ru: '[사](sa) + [자](ja) соединяются и образуют слово [사자](лев)!',
          ja: '[사](sa) + [자](ja) が合わさって単語 [사자](ライオン) になります！',
          mn: '[사](sa) ба [자](ja) нийлж [사자](арслан) үг бүтдэг!'
        },
        combination: {
          consonant: '사',
          consonantSound: '사',
          consonantRomaja: '[sa]',
          vowel: '자',
          vowelSound: '자',
          vowelRomaja: '[ja]',
          syllable: '사자',
          syllableSound: '사자',
          syllableRomaja: '[sa-ja]',
          isWordCard: true,
          word: '사자',
          wordMeaning: 'Lion',
          wordRomaja: '[sa-ja]'
        }
      },

      // [2쪽] ㅓ : ㅂ, ㅌ, ㅁ ➔ 버터
      {
        id: 'bs-p2-beo',
        char: '버',
        name: '버',
        romaja: '[beo]',
        sampleWord: '버터',
        sampleWordRomaja: 'beo-teo',
        meanings: {
          en: 'butter',
          vi: 'bơ',
          bn: 'মাখন',
          zh: '黄油',
          ru: 'сливочное масло',
          ja: 'バター',
          mn: 'цөцгийн тос'
        },
        tips: {
          en: 'Consonant [ㅂ](b) + Vowel [ㅓ](eo) combine horizontally into [버](beo).',
          vi: 'Phụ âm [ㅂ](b) + Nguyên âm [ㅓ](eo) kết hợp thành [버](beo).',
          bn: 'ব্যঞ্জনবর্ণ [ㅂ](b) + স্বরবর্ণ [ㅓ](eo) পাশাপাশি যুক্ত হয়ে [버](beo) তৈরি হয়।',
          zh: '声母 [ㅂ](b) + 韵母 [ㅓ](eo) 左右拼合成 [버](beo)。',
          ru: 'Согласный [ㅂ](b) + гласный [ㅓ](eo) соединяются в [버](beo).',
          ja: '子音 [ㅂ](b) + 母音 [ㅓ](eo) が合わさって [버](beo) になります。',
          mn: 'Гийгүүлэгч [ㅂ](b) ба эгшиг [ㅓ](eo) нийлж [버](beo) болно.'
        },
        combination: {
          consonant: 'ㅂ',
          consonantSound: '브',
          consonantRomaja: '[b]',
          vowel: 'ㅓ',
          vowelSound: '어',
          vowelRomaja: '[eo]',
          syllable: '버',
          syllableSound: '버',
          syllableRomaja: '[beo]'
        }
      },
      {
        id: 'bs-p2-teo',
        char: '터',
        name: '터',
        romaja: '[teo]',
        sampleWord: '터미널',
        sampleWordRomaja: 'teo-mi-neol',
        meanings: {
          en: 'terminal / station',
          vi: 'bến xe',
          bn: 'টার্মিনাল',
          zh: '客运站 / 车站',
          ru: 'терминал',
          ja: 'ターミナル',
          mn: 'буудал'
        },
        tips: {
          en: 'Consonant [ㅌ](t) + Vowel [ㅓ](eo) combine horizontally into [터](teo).',
          vi: 'Phụ âm [ㅌ](t) + Nguyên âm [ㅓ](eo) kết hợp thành [터](teo).',
          bn: 'ব্যঞ্জনবর্ণ [ㅌ](t) + স্বরবর্ণ [ㅓ](eo) পাশাপাশি যুক্ত হয়ে [터](teo) তৈরি হয়।',
          zh: '声母 [ㅌ](t) + 韵母 [ㅓ](eo) 左右拼合成 [터](teo)。',
          ru: 'Согласный [ㅌ](t) + гласный [ㅓ](eo) соединяются в [터](teo).',
          ja: '子音 [ㅌ](t) + 母音 [ㅓ](eo) が合わさって [터](teo) になります。',
          mn: 'Гийгүүлэгч [ㅌ](t) ба эгшиг [ㅓ](eo) нийлж [터](teo) болно.'
        },
        combination: {
          consonant: 'ㅌ',
          consonantSound: '트',
          consonantRomaja: '[t]',
          vowel: 'ㅓ',
          vowelSound: '어',
          vowelRomaja: '[eo]',
          syllable: '터',
          syllableSound: '터',
          syllableRomaja: '[teo]'
        }
      },
      {
        id: 'bs-p2-meo',
        char: '머',
        name: '머',
        romaja: '[meo]',
        sampleWord: '머리',
        sampleWordRomaja: 'meo-ri',
        meanings: {
          en: 'head / hair',
          vi: 'đầu / tóc',
          bn: 'মাথা / চুল',
          zh: '头 / 头发',
          ru: 'голова / волосы',
          ja: '頭 / 髪',
          mn: 'толгой / үс'
        },
        tips: {
          en: 'Consonant [ㅁ](m) + Vowel [ㅓ](eo) combine horizontally into [머](meo).',
          vi: 'Phụ âm [ㅁ](m) + Nguyên âm [ㅓ](eo) kết hợp thành [머](meo).',
          bn: 'ব্যঞ্জনবর্ণ [ㅁ](m) + স্বরবর্ণ [ㅓ](eo) পাশাপাশি যুক্ত হয়ে [머](meo) তৈরি হয়।',
          zh: '声母 [ㅁ](m) + 韵母 [ㅓ](eo) 左右拼合成 [머](meo)。',
          ru: 'Согласный [ㅁ](m) + гласный [ㅓ](eo) соединяются в [머](meo).',
          ja: '子音 [ㅁ](m) + 母音 [ㅓ](eo) が合わさって [머](meo) になります。',
          mn: 'Гийгүүлэгч [ㅁ](m) ба эгшиг [ㅓ](eo) нийлж [머](meo) болно.'
        },
        combination: {
          consonant: 'ㅁ',
          consonantSound: '므',
          consonantRomaja: '[m]',
          vowel: 'ㅓ',
          vowelSound: '어',
          vowelRomaja: '[eo]',
          syllable: '머',
          syllableSound: '머',
          syllableRomaja: '[meo]'
        }
      },
      {
        id: 'bs-p2-word-beoteo',
        char: '버터',
        name: '버터',
        romaja: '[beo-teo]',
        sampleWord: '버터',
        sampleWordRomaja: 'beo-teo',
        meanings: {
          en: 'Butter',
          vi: 'bơ',
          bn: 'মাখন',
          zh: '黄油',
          ru: 'сливочное масло',
          ja: 'バター',
          mn: 'цөцгийн тос'
        },
        tips: {
          en: '[버](beo) + [터](teo) combine to make the word [버터](Butter)!',
          vi: '[버](beo) + [터](teo) kết hợp tạo thành từ [버터](bơ)!',
          bn: '[버](beo) + [터](teo) যুক্ত হয়ে [버터](মাখন) শব্দটি গঠিত হয়!',
          zh: '[버](beo) + [터](teo) 组合成单词 [버터](黄油)！',
          ru: '[버](beo) + [터](teo) соединяются и образуют слово [버터](масло)!',
          ja: '[버](beo) + [터](teo) が合わさって単語 [버터](バター) になります！',
          mn: '[버](beo) ба [터](teo) нийлж [버터](цөцгийн тос) үг бүтдэг!'
        },
        combination: {
          consonant: '버',
          consonantSound: '버',
          consonantRomaja: '[beo]',
          vowel: '터',
          vowelSound: '터',
          vowelRomaja: '[teo]',
          syllable: '버터',
          syllableSound: '버터',
          syllableRomaja: '[beo-teo]',
          isWordCard: true,
          word: '버터',
          wordMeaning: 'Butter',
          wordRomaja: '[beo-teo]'
        }
      },

      // [3쪽] ㅗ : ㅍ, ㄷ, ㅌ ➔ 포도
      {
        id: 'bs-p3-po',
        char: '포',
        name: '포',
        romaja: '[po]',
        sampleWord: '포도',
        sampleWordRomaja: 'po-do',
        meanings: {
          en: 'grape',
          vi: 'quả nho',
          bn: 'আঙ্গুর',
          zh: '葡萄',
          ru: 'виноград',
          ja: 'ぶどう',
          mn: 'усан үзэм'
        },
        tips: {
          en: 'Consonant [ㅍ](p) + Vowel [ㅗ](o) combine vertically into [포](po).',
          vi: 'Phụ âm [ㅍ](p) + Nguyên âm [ㅗ](o) kết hợp trên dưới thành [포](po).',
          bn: 'ব্যঞ্জনবর্ণ [ㅍ](p) + স্বরবর্ণ [ㅗ](o) উপর-নিচে যুক্ত হয়ে [포](po) তৈরি হয়।',
          zh: '声母 [ㅍ](p) + 韵母 [ㅗ](o) 上下拼合成 [포](po)。',
          ru: 'Согласный [ㅍ](p) + гласный [ㅗ](o) соединяются сверху вниз в [포](po).',
          ja: '子音 [ㅍ](p) + 母音 [ㅗ](o) が上下に合わさって [포](po) になります。',
          mn: 'Гийгүүлэгч [ㅍ](p) ба эгшиг [ㅗ](o) дээрээс доош нийлж [포](po) болно.'
        },
        combination: {
          consonant: 'ㅍ',
          consonantSound: '프',
          consonantRomaja: '[p]',
          vowel: 'ㅗ',
          vowelSound: '오',
          vowelRomaja: '[o]',
          syllable: '포',
          syllableSound: '포',
          syllableRomaja: '[po]'
        }
      },
      {
        id: 'bs-p3-do',
        char: '도',
        name: '도',
        romaja: '[do]',
        sampleWord: '도토리',
        sampleWordRomaja: 'do-to-ri',
        meanings: {
          en: 'acorn',
          vi: 'quả sồi',
          bn: 'ওক ফল',
          zh: '橡子',
          ru: 'жёлудь',
          ja: 'どんぐり',
          mn: 'царсны самар'
        },
        tips: {
          en: 'Consonant [ㄷ](d) + Vowel [ㅗ](o) combine vertically into [도](do).',
          vi: 'Phụ âm [ㄷ](d) + Nguyên âm [ㅗ](o) kết hợp trên dưới thành [도](do).',
          bn: 'ব্যঞ্জনবর্ণ [ㄷ](d) + স্বরবর্ণ [ㅗ](o) উপর-নিচে যুক্ত হয়ে [도](do) তৈরি হয়।',
          zh: '声母 [ㄷ](d) + 韵母 [ㅗ](o) 上下拼合成 [도](do)。',
          ru: 'Согласный [ㄷ](d) + гласный [ㅗ](o) соединяются сверху вниз в [도](do).',
          ja: '子音 [ㄷ](d) + 母音 [ㅗ](o) が上下に合わさって [도](do) になります。',
          mn: 'Гийгүүлэгч [ㄷ](d) ба эгшиг [ㅗ](o) дээрээс до오ш нийлж [도](do) болно.'
        },
        combination: {
          consonant: 'ㄷ',
          consonantSound: '드',
          consonantRomaja: '[d]',
          vowel: 'ㅗ',
          vowelSound: '오',
          vowelRomaja: '[o]',
          syllable: '도',
          syllableSound: '도',
          syllableRomaja: '[do]'
        }
      },
      {
        id: 'bs-p3-to',
        char: '토',
        name: '토',
        romaja: '[to]',
        sampleWord: '토끼',
        sampleWordRomaja: 'to-kki',
        meanings: {
          en: 'rabbit / bunny',
          vi: 'con thỏ',
          bn: 'খরগোশ',
          zh: '兔子',
          ru: 'кролик / заяц',
          ja: 'うさぎ',
          mn: 'туулай'
        },
        tips: {
          en: 'Consonant [ㅌ](t) + Vowel [ㅗ](o) combine vertically into [토](to).',
          vi: 'Phụ âm [ㅌ](t) + Nguyên âm [ㅗ](o) kết hợp trên dưới thành [토](to).',
          bn: 'ব্যঞ্জনবর্ণ [ㅌ](t) + স্বরবর্ণ [ㅗ](o) উপর-নিচে যুক্ত হয়ে [토](to) তৈরি হয়।',
          zh: '声母 [ㅌ](t) + 韵母 [ㅗ](o) 上下拼合成 [토](to)。',
          ru: 'Согласный [ㅌ](t) + гласный [ㅗ](o) соединяются сверху вниз в [토](to).',
          ja: '子音 [ㅌ](t) + 母音 [ㅗ](o) が上下에合わさって [토](to) になります。',
          mn: 'Гийгүүлэгч [ㅌ](t) ба эгшиг [ㅗ](o) дээрээс до오ш нийлж [토](to) болно.'
        },
        combination: {
          consonant: 'ㅌ',
          consonantSound: '트',
          consonantRomaja: '[t]',
          vowel: 'ㅗ',
          vowelSound: '오',
          vowelRomaja: '[o]',
          syllable: '토',
          syllableSound: '토',
          syllableRomaja: '[to]'
        }
      },
      {
        id: 'bs-p3-word-podo',
        char: '포도',
        name: '포도',
        romaja: '[po-do]',
        sampleWord: '포도',
        sampleWordRomaja: 'po-do',
        meanings: {
          en: 'Grapes',
          vi: 'quả nho',
          bn: 'আঙ্গুর',
          zh: '葡萄',
          ru: 'виноград',
          ja: 'ぶどう',
          mn: 'усан үзэм'
        },
        tips: {
          en: '[포](po) + [도](do) combine to make the word [포도](Grapes)!',
          vi: '[포](po) + [도](do) kết hợp tạo thành từ [포도](quả nho)!',
          bn: '[포](po) + [도](do) যুক্ত হয়ে [포도](আঙ্গুর) শব্দটি গঠিত হয়!',
          zh: '[포](po) + [도](do) 组合成单词 [포도](葡萄)！',
          ru: '[포](po) + [도](do) соединяются и образуют слово [포도](виноград)!',
          ja: '[포](po) + [도](do) が合わさって単語 [포도](ぶどう) になります！',
          mn: '[포](po) ба [도](do) нийлж [포도](усан үзэм) үг бүтдэг!'
        },
        combination: {
          consonant: '포',
          consonantSound: '포',
          consonantRomaja: '[po]',
          vowel: '도',
          vowelSound: '도',
          vowelRomaja: '[do]',
          syllable: '포도',
          syllableSound: '포도',
          syllableRomaja: '[po-do]',
          isWordCard: true,
          word: '포도',
          wordMeaning: 'Grapes',
          wordRomaja: '[po-do]'
        }
      },

      // [4쪽] ㅜ : ㄱ, ㄷ, ㅇ ➔ 구두
      {
        id: 'bs-p4-gu',
        char: '구',
        name: '구',
        romaja: '[gu]',
        sampleWord: '구두',
        sampleWordRomaja: 'gu-du',
        meanings: {
          en: 'shoes',
          vi: 'giày da',
          bn: 'জুতা',
          zh: '皮鞋',
          ru: 'туфли',
          ja: '革靴',
          mn: 'гутал'
        },
        tips: {
          en: 'Consonant [ㄱ](g) + Vowel [ㅜ](u) combine vertically into [구](gu).',
          vi: 'Phụ âm [ㄱ](g) + Nguyên âm [ㅜ](u) kết hợp trên dưới thành [구](gu).',
          bn: 'ব্যঞ্জনবর্ণ [ㄱ](g) + স্বরবর্ণ [ㅜ](u) উপর-নিচে যুক্ত হয়ে [구](gu) তৈরি হয়।',
          zh: '声母 [ㄱ](g) + 韵母 [ㅜ](u) 上下拼合成 [구](gu)。',
          ru: 'Согласный [ㄱ](g) + гласный [ㅜ](u) соединяются сверху вниз в [구](gu).',
          ja: '子音 [ㄱ](g) + 母音 [ㅜ](u) が上下에合わさって [구](gu) になります。',
          mn: 'Гийгүүлэгч [ㄱ](g) ба эгшиг [ㅜ](u) дээрээс доош нийлж [구](gu) болно.'
        },
        combination: {
          consonant: 'ㄱ',
          consonantSound: '그',
          consonantRomaja: '[g]',
          vowel: 'ㅜ',
          vowelSound: '우',
          vowelRomaja: '[u]',
          syllable: '구',
          syllableSound: '구',
          syllableRomaja: '[gu]'
        }
      },
      {
        id: 'bs-p4-du',
        char: '두',
        name: '두',
        romaja: '[du]',
        sampleWord: '두부',
        sampleWordRomaja: 'du-bu',
        meanings: {
          en: 'tofu',
          vi: 'đậu phụ',
          bn: 'টোফু',
          zh: '豆腐',
          ru: 'тофу',
          ja: '豆腐',
          mn: 'дүпү'
        },
        tips: {
          en: 'Consonant [ㄷ](d) + Vowel [ㅜ](u) combine vertically into [두](du).',
          vi: 'Phụ âm [ㄷ](d) + Nguyên âm [ㅜ](u) kết hợp trên dưới thành [두](du).',
          bn: 'ব্যঞ্জনবর্ণ [ㄷ](d) + স্বরবর্ণ [ㅜ](u) উপর-নিচে যুক্ত হয়ে [두](du) তৈরি হয়।',
          zh: '声母 [ㄷ](d) + 韵母 [ㅜ](u) 上下拼合成 [두](du)。',
          ru: 'Согласный [ㄷ](d) + гласный [ㅜ](u) соединяются сверху вниз в [두](du).',
          ja: '子音 [ㄷ](d) + 母音 [ㅜ](u) が上下에合わさって [두](du) になります。',
          mn: 'Гийгүүлэгч [ㄷ](d) ба эгшиг [ㅜ](u) дээрээс доош нийлж [두](du) болно.'
        },
        combination: {
          consonant: 'ㄷ',
          consonantSound: '드',
          consonantRomaja: '[d]',
          vowel: 'ㅜ',
          vowelSound: '우',
          vowelRomaja: '[u]',
          syllable: '두',
          syllableSound: '두',
          syllableRomaja: '[du]'
        }
      },
      {
        id: 'bs-p4-u',
        char: '우',
        name: '우',
        romaja: '[u]',
        sampleWord: '우산',
        sampleWordRomaja: 'u-san',
        meanings: {
          en: 'umbrella',
          vi: 'cái ô / cái dù',
          bn: 'ছাতা',
          zh: '雨伞',
          ru: 'зонт',
          ja: '傘',
          mn: 'шүхэр'
        },
        tips: {
          en: 'Consonant [ㅇ](ng) + Vowel [ㅜ](u) combine vertically into [우](u).',
          vi: 'Phụ âm [ㅇ](ng) + Nguyên âm [ㅜ](u) kết hợp trên dưới thành [우](u).',
          bn: 'ব্যঞ্জনবর্ণ [ㅇ](ng) + স্বরবর্ণ [ㅜ](u) উপর-নিচে যুক্ত হয়ে [우](u) তৈরি হয়।',
          zh: '声母 [ㅇ](ng) + 韵母 [ㅜ](u) 上下拼合成 [우](u)。',
          ru: 'Согласный [ㅇ](ng) + гласный [ㅜ](u) соединяются сверху вниз в [우](u).',
          ja: '子音 [ㅇ](ng) + 母音 [ㅜ](u) が上下에合わさって [우](u) になります。',
          mn: 'Гийгүүлэгч [ㅇ](ng) ба эгшиг [ㅜ](u) дээрээс до오ш нийлж [우](u) болно.'
        },
        combination: {
          consonant: 'ㅇ',
          consonantSound: '으',
          consonantRomaja: '[ng]',
          vowel: 'ㅜ',
          vowelSound: '우',
          vowelRomaja: '[u]',
          syllable: '우',
          syllableSound: '우',
          syllableRomaja: '[u]'
        }
      },
      {
        id: 'bs-p4-word-gudu',
        char: '구두',
        name: '구두',
        romaja: '[gu-du]',
        sampleWord: '구두',
        sampleWordRomaja: 'gu-du',
        meanings: {
          en: 'Shoes',
          vi: 'giày da',
          bn: 'জুতা',
          zh: '皮鞋',
          ru: 'туфли',
          ja: '革靴',
          mn: 'гутал'
        },
        tips: {
          en: '[구](gu) + [두](du) combine to make the word [구두](Shoes)!',
          vi: '[구](gu) + [두](du) kết hợp tạo thành từ [구두](giày da)!',
          bn: '[구](gu) + [두](du) যুক্ত হয়ে [구두](জুতা) শব্দটি গঠিত হয়!',
          zh: '[구](gu) + [두](du) 组合成单词 [구두](皮鞋)！',
          ru: '[구](gu) + [두](du) соединяются и образуют слово [구두](туфли)!',
          ja: '[구](gu) + [두](du) が合わさって単語 [구두](革靴) になります！',
          mn: '[구](gu) ба [두](du) нийлж [구두](гутал) үг бүтдэг!'
        },
        combination: {
          consonant: '구',
          consonantSound: '구',
          consonantRomaja: '[gu]',
          vowel: '두',
          vowelSound: '두',
          vowelRomaja: '[du]',
          syllable: '구두',
          syllableSound: '구두',
          syllableRomaja: '[gu-du]',
          isWordCard: true,
          word: '구두',
          wordMeaning: 'Shoes',
          wordRomaja: '[gu-du]'
        }
      },

      // [5쪽] ㅡ : ㅅ, ㅋ, ㅌ ➔ 버스
      {
        id: 'bs-p5-seu',
        char: '스',
        name: '스',
        romaja: '[seu]',
        sampleWord: '스푼',
        sampleWordRomaja: 'seu-pun',
        meanings: {
          en: 'spoon',
          vi: 'cái thìa',
          bn: 'চামচ',
          zh: '勺子',
          ru: 'ложка',
          ja: 'スプーン',
          mn: 'халбага'
        },
        tips: {
          en: 'Consonant [ㅅ](s) + Vowel [ㅡ](eu) combine vertically into [스](seu).',
          vi: 'Phụ âm [ㅅ](s) + Nguyên âm [ㅡ](eu) kết hợp trên dưới thành [스](seu).',
          bn: 'ব্যঞ্জনবর্ণ [ㅅ](s) + স্বরবর্ণ [ㅡ](eu) উপর-নিচে যুক্ত হয়ে [스](seu) তৈরি হয়।',
          zh: '声母 [ㅅ](s) + 韵母 [ㅡ](eu) 上下拼合成 [스](seu)。',
          ru: 'Согласный [ㅅ](s) + гласный [ㅡ](eu) соединяются сверху вниз в [스](seu).',
          ja: '子音 [ㅅ](s) + 母音 [ㅡ](eu) が上下에合わさって [스](seu) になります。',
          mn: 'Гийгүүлэгч [ㅅ](s) ба эгшиг [ㅡ](eu) дээрээс до오ш нийлж [스](seu) болно.'
        },
        combination: {
          consonant: 'ㅅ',
          consonantSound: '스',
          consonantRomaja: '[s]',
          vowel: 'ㅡ',
          vowelSound: '으',
          vowelRomaja: '[eu]',
          syllable: '스',
          syllableSound: '스',
          syllableRomaja: '[seu]'
        }
      },
      {
        id: 'bs-p5-keu',
        char: '크',
        name: '크',
        romaja: '[keu]',
        sampleWord: '크레파스',
        sampleWordRomaja: 'keu-re-pa-seu',
        meanings: {
          en: 'crayons',
          vi: 'bút sáp màu',
          bn: 'রংপেন্সিল',
          zh: '蜡笔',
          ru: 'пастель / мелки',
          ja: 'クレヨン',
          mn: 'өнгийн харандаа'
        },
        tips: {
          en: 'Consonant [ㅋ](k) + Vowel [ㅡ](eu) combine vertically into [크](keu).',
          vi: 'Phụ âm [ㅋ](k) + Nguyên âm [ㅡ](eu) kết hợp trên dưới thành [크](keu).',
          bn: 'ব্যঞ্জনবর্ণ [ㅋ](k) + স্বরবর্ণ [ㅡ](eu) উপর-নিচে যুক্ত হয়ে [크](keu) তৈরি হয়।',
          zh: '声母 [ㅋ](k) + 韵母 [ㅡ](eu) 上下拼合成 [크](keu)。',
          ru: 'Согласный [ㅋ](k) + гласный [ㅡ](eu) соединяются сверху вниз в [크](keu).',
          ja: '子音 [ㅋ](k) + 母音 [ㅡ](eu) が上下에合わさって [크](keu) になります。',
          mn: 'Гийгүүлэгч [ㅋ](k) ба эгшиг [ㅡ](eu) дээрээс доош нийлж [크](keu) болно.'
        },
        combination: {
          consonant: 'ㅋ',
          consonantSound: '크',
          consonantRomaja: '[k]',
          vowel: 'ㅡ',
          vowelSound: '으',
          vowelRomaja: '[eu]',
          syllable: '크',
          syllableSound: '크',
          syllableRomaja: '[keu]'
        }
      },
      {
        id: 'bs-p5-teu',
        char: '트',
        name: '트',
        romaja: '[teu]',
        sampleWord: '트럭',
        sampleWordRomaja: 'teu-reok',
        meanings: {
          en: 'truck',
          vi: 'xe tải',
          bn: 'ট্রাক',
          zh: '卡车',
          ru: 'грузовик',
          ja: 'トラック',
          mn: 'ачааны тэрэг'
        },
        tips: {
          en: 'Consonant [ㅌ](t) + Vowel [ㅡ](eu) combine vertically into [트](teu).',
          vi: 'Phụ âm [ㅌ](t) + Nguyên âm [ㅡ](eu) kết hợp trên dưới thành [트](teu).',
          bn: 'ব্যঞ্জনবর্ণ [ㅌ](t) + স্বরবর্ণ [ㅡ](eu) উপর-নিচে যুক্ত হয়ে [트](teu) তৈরি হয়।',
          zh: '声母 [ㅌ](t) + 韵母 [ㅡ](eu) 上下拼合成 [트](teu)。',
          ru: 'Согласный [ㅌ](t) + гласный [ㅡ](eu) соединяются сверху вниз в [트](teu).',
          ja: '子音 [ㅌ](t) + 母音 [ㅡ](eu) が上下에合わさって [트](teu) になります。',
          mn: 'Гийгүүлэгч [ㅌ](t) ба эгшиг [ㅡ](eu) дээрээс до오ш нийлж [트](teu) болно.'
        },
        combination: {
          consonant: 'ㅌ',
          consonantSound: '트',
          consonantRomaja: '[t]',
          vowel: 'ㅡ',
          vowelSound: '으',
          vowelRomaja: '[eu]',
          syllable: '트',
          syllableSound: '트',
          syllableRomaja: '[teu]'
        }
      },
      {
        id: 'bs-p5-word-beoseu',
        char: '버스',
        name: '버스',
        romaja: '[beo-seu]',
        sampleWord: '버스',
        sampleWordRomaja: 'beo-seu',
        meanings: {
          en: 'Bus',
          vi: 'xe buýt',
          bn: 'বাস',
          zh: '公交车 / 巴士',
          ru: 'автобус',
          ja: 'バス',
          mn: 'автобус'
        },
        tips: {
          en: '[버](beo) + [스](seu) combine to make the word [버스](Bus)!',
          vi: '[버](beo) + [스](seu) kết hợp tạo thành từ [버스](xe buýt)!',
          bn: '[버](beo) + [스](seu) যুক্ত হয়ে [버스](বাস) শব্দটি গঠিত হয়!',
          zh: '[버](beo) + [스](seu) 组合成单词 [버스](公交车)！',
          ru: '[버](beo) + [스](seu) соединяются и образуют слово [버스](автобус)!',
          ja: '[버](beo) + [스](seu) が合わさって単語 [버스](バス) になります！',
          mn: '[버](beo) ба [스](seu) нийлж [버스](автобус) үг бүтдэг!'
        },
        combination: {
          consonant: '버',
          consonantSound: '버',
          consonantRomaja: '[beo]',
          vowel: '스',
          vowelSound: '스',
          vowelRomaja: '[seu]',
          syllable: '버스',
          syllableSound: '버스',
          syllableRomaja: '[beo-seu]',
          isWordCard: true,
          word: '버스',
          wordMeaning: 'Bus',
          wordRomaja: '[beo-seu]'
        }
      },

      // [6쪽] ㅣ : ㅂ, ㅅ, ㅈ ➔ 가지
      {
        id: 'bs-p6-bi',
        char: '비',
        name: '비',
        romaja: '[bi]',
        sampleWord: '비행기',
        sampleWordRomaja: 'bi-haeng-gi',
        meanings: {
          en: 'airplane',
          vi: 'máy bay',
          bn: 'উড়োজাহাজ',
          zh: '飞机',
          ru: 'самолёт',
          ja: '飛行機',
          mn: 'онгоц'
        },
        tips: {
          en: 'Consonant [ㅂ](b) + Vowel [ㅣ](i) combine horizontally into [비](bi).',
          vi: 'Phụ âm [ㅂ](b) + Nguyên âm [ㅣ](i) kết hợp thành [비](bi).',
          bn: 'ব্যঞ্জনবর্ণ [ㅂ](b) + স্বরবর্ণ [ㅣ](i) পাশাপাশি যুক্ত হয়ে [비](bi) তৈরি হয়।',
          zh: '声母 [ㅂ](b) + 韵母 [ㅣ](i) 左右拼合成 [비](bi)。',
          ru: 'Согласный [ㅂ](b) + гласный [ㅣ](i) соединяются в [비](bi).',
          ja: '子音 [ㅂ](b) + 母音 [ㅣ](i) が合わさって [비](bi) になります。',
          mn: 'Гийгүүлэгч [ㅂ](b) ба эгшиг [ㅣ](i) нийлж [비](bi) болно.'
        },
        combination: {
          consonant: 'ㅂ',
          consonantSound: '브',
          consonantRomaja: '[b]',
          vowel: 'ㅣ',
          vowelSound: '이',
          vowelRomaja: '[i]',
          syllable: '비',
          syllableSound: '비',
          syllableRomaja: '[bi]'
        }
      },
      {
        id: 'bs-p6-si',
        char: '시',
        name: '시',
        romaja: '[si]',
        sampleWord: '시계',
        sampleWordRomaja: 'si-gye',
        meanings: {
          en: 'clock / watch',
          vi: 'đồng hồ',
          bn: 'ঘড়ি',
          zh: '时钟 / 手表',
          ru: 'часы',
          ja: '時計',
          mn: 'цаг'
        },
        tips: {
          en: 'Consonant [ㅅ](s) + Vowel [ㅣ](i) combine horizontally into [시](si).',
          vi: 'Phụ âm [ㅅ](s) + Nguyên âm [ㅣ](i) kết hợp thành [시](si).',
          bn: 'ব্যঞ্জনবর্ণ [ㅅ](s) + স্বরবর্ণ [ㅣ](i) পাশাপাশি যুক্ত হয়ে [시](si) তৈরি হয়।',
          zh: '声母 [ㅅ](s) + 韵母 [ㅣ](i) 左右拼合成 [시](si)。',
          ru: 'Согласный [ㅅ](s) + гласный [ㅣ](i) соединяются в [시](si).',
          ja: '子音 [ㅅ](s) + 母音 [ㅣ](i) が合わさって [시](si) になります。',
          mn: 'Гийгүүлэгч [ㅅ](s) ба эгшиг [ㅣ](i) нийлж [시](si) болно.'
        },
        combination: {
          consonant: 'ㅅ',
          consonantSound: '스',
          consonantRomaja: '[s]',
          vowel: 'ㅣ',
          vowelSound: '이',
          vowelRomaja: '[i]',
          syllable: '시',
          syllableSound: '시',
          syllableRomaja: '[si]'
        }
      },
      {
        id: 'bs-p6-ji',
        char: '지',
        name: '지',
        romaja: '[ji]',
        sampleWord: '지우개',
        sampleWordRomaja: 'ji-u-gae',
        meanings: {
          en: 'eraser',
          vi: 'cục tẩy',
          bn: 'রাবার / ইরেজার',
          zh: '橡皮',
          ru: 'ластик',
          ja: '消しゴム',
          mn: 'баллуур'
        },
        tips: {
          en: 'Consonant [ㅈ](j) + Vowel [ㅣ](i) combine horizontally into [지](ji).',
          vi: 'Phụ âm [ㅈ](j) + Nguyên âm [ㅣ](i) kết hợp thành [지](ji).',
          bn: 'ব্যঞ্জনবর্ণ [ㅈ](j) + স্বরবর্ণ [ㅣ](i) পাশাপাশি যুক্ত হয়ে [지](ji) তৈরি হয়।',
          zh: '声母 [ㅈ](j) + 韵母 [ㅣ](i) 左右拼合成 [지](ji)。',
          ru: 'Согласный [ㅈ](j) + гласный [ㅣ](i) соединяются в [지](ji).',
          ja: '子音 [ㅈ](j) + 母音 [ㅣ](i) が合わさって [지](ji) になります。',
          mn: 'Гийгүүлэгч [ㅈ](j) ба эгшиг [ㅣ](i) нийлж [지](ji) болно.'
        },
        combination: {
          consonant: 'ㅈ',
          consonantSound: '즈',
          consonantRomaja: '[j]',
          vowel: 'ㅣ',
          vowelSound: '이',
          vowelRomaja: '[i]',
          syllable: '지',
          syllableSound: '지',
          syllableRomaja: '[ji]'
        }
      },
      {
        id: 'bs-p6-word-gaji',
        char: '가지',
        name: '가지',
        romaja: '[ga-ji]',
        sampleWord: '가지',
        sampleWordRomaja: 'ga-ji',
        meanings: {
          en: 'Eggplant',
          vi: 'cà tím',
          bn: 'বেগুন',
          zh: '茄子',
          ru: 'баклажан',
          ja: 'なす',
          mn: 'хаш'
        },
        tips: {
          en: '[가](ga) + [지](ji) combine to make the word [가지](Eggplant)!',
          vi: '[가](ga) + [지](ji) kết hợp tạo thành từ [가지](cà tím)!',
          bn: '[가](ga) + [지](ji) যুক্ত হয়ে [가지](বেগুন) শব্দটি গঠিত হয়!',
          zh: '[가](ga) + [지](ji) 组合成单词 [가지](茄子)！',
          ru: '[가](ga) + [지](ji) соединяются и образуют слово [가지](баклажан)!',
          ja: '[가](ga) + [지](ji) が合わさって単語 [가지](なす) になります！',
          mn: '[가](ga) ба [지](ji) нийлж [가지](хаш) үг бүтдэг!'
        },
        combination: {
          consonant: '가',
          consonantSound: '가',
          consonantRomaja: '[ga]',
          vowel: '지',
          vowelSound: '지',
          vowelRomaja: '[ji]',
          syllable: '가지',
          syllableSound: '가지',
          syllableRomaja: '[ga-ji]',
          isWordCard: true,
          word: '가지',
          wordMeaning: 'Eggplant',
          wordRomaja: '[ga-ji]'
        }
      }
    ]
  },

  // 6. 기본글자 만들기 (ㅑㅕㅛㅠ) - 총 16장 플래시카드 (7~10쪽)
  {
    id: 'basic_syllables_p2',
    titleKo: '⑥ 기본글자 만들기 (ㅑㅕㅛㅠ)',
    titleEn: '⑥ Making Basic Syllables (ㅑㅕㅛㅠ)',
    badge: '기본글자',
    cards: [
      // --- [7쪽] ㅑ : ㅇ, ㅋ, ㅊ (야, 캬, 챠) ➔ 단어: 야자 ---
      {
        id: 'bs-p2-ya',
        char: '야',
        name: '야',
        romaja: '[ya]',
        sampleWord: '야구',
        sampleWordRomaja: 'ya-gu',
        meanings: {
          en: 'baseball',
          vi: 'bóng chày',
          bn: 'বেসবল',
          zh: '棒球',
          ru: 'бейсбол',
          ja: '野球',
          mn: 'бэйсбол'
        },
        tips: {
          en: 'Consonant [ㅇ](silent) + Vowel [ㅑ](ya) combine horizontally into [야](ya).',
          vi: 'Phụ âm [ㅇ](câm) + Nguyên âm [ㅑ](ya) kết hợp trái phải thành [야](ya).',
          bn: 'ব্যঞ্জনবর্ণ [ㅇ] + স্বরবর্ণ [ㅑ](ya) পাশাপাশি যুক্ত হয়ে [야](ya) তৈরি হয়।',
          zh: '声母 [ㅇ] + 韵母 [ㅑ](ya) 左右拼合成 [야](ya)。',
          ru: 'Согласный [ㅇ] + гласный [ㅑ](ya) соединяются слева направо в [야](ya).',
          ja: '子音 [ㅇ] + 母音 [ㅑ](ya) が左右に合わさって [야](ya) になります。',
          mn: 'Гийгүүлэгч [ㅇ] ба эгшиг [ㅑ](ya) зүүнээс баруун тийш нийлж [야](ya) болно.'
        },
        combination: {
          consonant: 'ㅇ',
          consonantSound: '으',
          consonantRomaja: '[ - ]',
          vowel: 'ㅑ',
          vowelSound: '야',
          vowelRomaja: '[ya]',
          syllable: '야',
          syllableSound: '야',
          syllableRomaja: '[ya]'
        }
      },
      {
        id: 'bs-p2-kya',
        char: '캬',
        name: '캬',
        romaja: '[kya]',
        sampleWord: '캬',
        sampleWordRomaja: 'kya',
        meanings: {
          en: 'refreshing sound / ahh!',
          vi: 'tiếng cảm thán sảng khoái',
          bn: 'তৃপ্তির শব্দ',
          zh: '畅快感叹声',
          ru: 'возглас удовольствия',
          ja: '爽快な感嘆の声',
          mn: 'сэргэг дуу авиа'
        },
        tips: {
          en: 'Consonant [ㅋ](k) + Vowel [ㅑ](ya) combine horizontally into [캬](kya).',
          vi: 'Phụ âm [ㅋ](k) + Nguyên âm [ㅑ](ya) kết hợp trái phải thành [캬](kya).',
          bn: 'ব্যঞ্জনবর্ণ [ㅋ](k) + স্বরবর্ণ [ㅑ](ya) পাশাপাশি যুক্ত হয়ে [캬](kya) তৈরি হয়।',
          zh: '声母 [ㅋ](k) + 韵母 [ㅑ](ya) 左右拼合成 [캬](kya)。',
          ru: 'Согласный [ㅋ](k) + гласный [ㅑ](ya) соединяются слева направо в [캬](kya).',
          ja: '子音 [ㅋ](k) + 母音 [ㅑ](ya) が左右に合わさって [캬](kya) になります。',
          mn: 'Гийгүүлэгч [ㅋ](k) ба эгшиг [ㅑ](ya) зүүнээс баруун тийш нийлж [캬](kya) болно.'
        },
        combination: {
          consonant: 'ㅋ',
          consonantSound: '크',
          consonantRomaja: '[k]',
          vowel: 'ㅑ',
          vowelSound: '야',
          vowelRomaja: '[ya]',
          syllable: '캬',
          syllableSound: '캬',
          syllableRomaja: '[kya]'
        }
      },
      {
        id: 'bs-p2-chya',
        char: '챠',
        name: '챠',
        romaja: '[chya]',
        sampleWord: '홍차',
        sampleWordRomaja: 'hong-cha',
        meanings: {
          en: 'tea / black tea',
          vi: 'trà đen',
          bn: 'চা',
          zh: '红茶',
          ru: 'чёрный чай',
          ja: '紅茶',
          mn: 'цай'
        },
        tips: {
          en: 'Consonant [ㅊ](ch) + Vowel [ㅑ](ya) combine horizontally into [챠](chya).',
          vi: 'Phụ âm [ㅊ](ch) + Nguyên âm [ㅑ](ya) kết hợp trái phải thành [챠](chya).',
          bn: 'ব্যঞ্জনবর্ণ [ㅊ](ch) + স্বরবর্ণ [ㅑ](ya) পাশাপাশি যুক্ত হয়ে [챠](chya) তৈরি হয়।',
          zh: '声母 [ㅊ](ch) + 韵母 [ㅑ](ya) 左右拼合成 [챠](chya)。',
          ru: 'Согласный [ㅊ](ch) + гласный [ㅑ](ya) соединяются слева направо в [챠](chya).',
          ja: '子音 [ㅊ](ch) + 母音 [ㅑ](ya) が左右に合わさって [챠](chya) になります。',
          mn: 'Гийгүүлэгч [ㅊ](ch) ба эгшиг [ㅑ](ya) зүүнээс баруун тийш нийлж [챠](chya) болно.'
        },
        combination: {
          consonant: 'ㅊ',
          consonantSound: '츠',
          consonantRomaja: '[ch]',
          vowel: 'ㅑ',
          vowelSound: '야',
          vowelRomaja: '[ya]',
          syllable: '챠',
          syllableSound: '챠',
          syllableRomaja: '[chya]'
        }
      },
      {
        id: 'bs-p2-word-yaja',
        char: '야자',
        name: '야자',
        romaja: '[ya-ja]',
        sampleWord: '야자',
        sampleWordRomaja: 'ya-ja',
        meanings: {
          en: 'Palm Tree',
          vi: 'cây dừa / cọ',
          bn: 'পাম গাছ / তালগাছ',
          zh: '椰子树',
          ru: 'пальма',
          ja: 'ヤシの木',
          mn: 'дал мод'
        },
        tips: {
          en: '[야](ya) + [자](ja) combine to make the word [야자](Palm Tree)!',
          vi: '[야](ya) + [자](ja) kết hợp tạo thành từ [야자](cây dừa/cọ)!',
          bn: '[야](ya) + [자](ja) যুক্ত হয়ে [야자](পাম গাছ) শব্দটি গঠিত হয়!',
          zh: '[야](ya) + [자](ja) 组合成单词 [야자](椰子树)！',
          ru: '[야](ya) + [자](ja) соединяются и образуют слово [야자](пальма)!',
          ja: '[야](ya) + [자](ja) が合わさって単語 [야자](ヤシの木) になります！',
          mn: '[야](ya) ба [자](ja) нийлж [야자](дал мод) үг бүтдэг!'
        },
        combination: {
          consonant: '야',
          consonantSound: '야',
          consonantRomaja: '[ya]',
          vowel: '자',
          vowelSound: '자',
          vowelRomaja: '[ja]',
          syllable: '야자',
          syllableSound: '야자',
          syllableRomaja: '[ya-ja]',
          isWordCard: true,
          word: '야자',
          wordMeaning: 'Palm Tree',
          wordRomaja: '[ya-ja]'
        }
      },

      // --- [8쪽] ㅕ : ㅇ, ㄴ, ㄹ (여, 녀, 려) ➔ 단어: 여자 ---
      {
        id: 'bs-p2-yeo',
        char: '여',
        name: '여',
        romaja: '[yeo]',
        sampleWord: '여우',
        sampleWordRomaja: 'yeo-u',
        meanings: {
          en: 'fox',
          vi: 'con cáo',
          bn: 'খেঁকশিয়াল',
          zh: '狐狸',
          ru: 'лиса',
          ja: 'きつね',
          mn: 'үнэг'
        },
        tips: {
          en: 'Consonant [ㅇ](silent) + Vowel [ㅕ](yeo) combine horizontally into [여](yeo).',
          vi: 'Phụ âm [ㅇ](câm) + Nguyên âm [ㅕ](yeo) kết hợp trái phải thành [여](yeo).',
          bn: 'ব্যঞ্জনবর্ণ [ㅇ] + স্বরবর্ণ [ㅕ](yeo) পাশাপাশি যুক্ত হয়ে [여](yeo) তৈরি হয়।',
          zh: '声母 [ㅇ] + 韵母 [ㅕ](yeo) 左右拼合成 [여](yeo)。',
          ru: 'Согласный [ㅇ] + гласный [ㅕ](yeo) соединяются слева направо в [여](yeo).',
          ja: '子音 [ㅇ] + 母音 [ㅕ](yeo) が左右に合わさって [여](yeo) になります。',
          mn: 'Гийгүүлэгч [ㅇ] ба эгшиг [ㅕ](yeo) зүүнээс баруун тийш нийлж [여](yeo) болно.'
        },
        combination: {
          consonant: 'ㅇ',
          consonantSound: '으',
          consonantRomaja: '[ - ]',
          vowel: 'ㅕ',
          vowelSound: '여',
          vowelRomaja: '[yeo]',
          syllable: '여',
          syllableSound: '여',
          syllableRomaja: '[yeo]'
        }
      },
      {
        id: 'bs-p2-nyeo',
        char: '녀',
        name: '녀',
        romaja: '[nyeo]',
        sampleWord: '소녀',
        sampleWordRomaja: 'so-nyeo',
        meanings: {
          en: 'young girl',
          vi: 'thiếu nữ / cô gái',
          bn: 'কিশোরী',
          zh: '少女',
          ru: 'девочка',
          ja: '少女',
          mn: 'охин'
        },
        tips: {
          en: 'Consonant [ㄴ](n) + Vowel [ㅕ](yeo) combine horizontally into [녀](nyeo).',
          vi: 'Phụ âm [ㄴ](n) + Nguyên âm [ㅕ](yeo) kết hợp trái phải thành [녀](nyeo).',
          bn: 'ব্যঞ্জনবর্ণ [ㄴ](n) + স্বরবর্ণ [ㅕ](yeo) পাশাপাশি যুক্ত হয়ে [녀](nyeo) তৈরি হয়।',
          zh: '声母 [ㄴ](n) + 韵母 [ㅕ](yeo) 左右拼合成 [녀](nyeo)。',
          ru: 'Согласный [ㄴ](n) + гласный [ㅕ](yeo) соединяются слева направо в [녀](nyeo).',
          ja: '子音 [ㄴ](n) + 母音 [ㅕ](yeo) が左右に合わさって [녀](nyeo) になります。',
          mn: 'Гийгүүлэгч [ㄴ](n) ба эгшиг [ㅕ](yeo) зүүнээс баруун тийш нийлж [녀](nyeo) болно.'
        },
        combination: {
          consonant: 'ㄴ',
          consonantSound: '느',
          consonantRomaja: '[n]',
          vowel: 'ㅕ',
          vowelSound: '여',
          vowelRomaja: '[yeo]',
          syllable: '녀',
          syllableSound: '녀',
          syllableRomaja: '[nyeo]'
        }
      },
      {
        id: 'bs-p2-ryeo',
        char: '려',
        name: '려',
        romaja: '[ryeo]',
        sampleWord: '배려',
        sampleWordRomaja: 'bae-ryeo',
        meanings: {
          en: 'caring / consideration',
          vi: 'chu đáo / quan tâm',
          bn: 'বিবেচনা / যত্ন',
          zh: '关照 / 体贴',
          ru: 'внимание / забота',
          ja: '配慮 / 気配り',
          mn: 'халамж'
        },
        tips: {
          en: 'Consonant [ㄹ](r) + Vowel [ㅕ](yeo) combine horizontally into [려](ryeo).',
          vi: 'Phụ âm [ㄹ](r) + Nguyên âm [ㅕ](yeo) kết hợp trái phải thành [려](ryeo).',
          bn: 'ব্যঞ্জনবর্ণ [ㄹ](r) + স্বরবর্ণ [ㅕ](yeo) পাশাপাশি যুক্ত হয়ে [려](ryeo) তৈরি হয়।',
          zh: '声母 [ㄹ](r) + 韵母 [ㅕ](yeo) 左右拼合成 [려](ryeo)。',
          ru: 'Согласный [ㄹ](r) + гласный [ㅕ](yeo) соединяются слева направо в [려](ryeo).',
          ja: '子音 [ㄹ](r) + 母音 [ㅕ](yeo) が左右に合わさって [려](ryeo) になります。',
          mn: 'Гийгүүлэгч [ㄹ](r) ба эгшиг [ㅕ](yeo) зүүнээс баруун тийш нийлж [려](ryeo) болно.'
        },
        combination: {
          consonant: 'ㄹ',
          consonantSound: '르',
          consonantRomaja: '[r]',
          vowel: 'ㅕ',
          vowelSound: '여',
          vowelRomaja: '[yeo]',
          syllable: '려',
          syllableSound: '려',
          syllableRomaja: '[ryeo]'
        }
      },
      {
        id: 'bs-p2-word-yeoja',
        char: '여자',
        name: '여자',
        romaja: '[yeo-ja]',
        sampleWord: '여자',
        sampleWordRomaja: 'yeo-ja',
        meanings: {
          en: 'Girl / Woman',
          vi: 'con gái / phụ nữ',
          bn: 'মেয়ে / নারী',
          zh: '女孩 / 女生',
          ru: 'девочка / женщина',
          ja: '女の子 / 女性',
          mn: 'эмэгтэй / охин'
        },
        tips: {
          en: '[여](yeo) + [자](ja) combine to make the word [여자](Girl)!',
          vi: '[여](yeo) + [자](ja) kết hợp tạo thành từ [여자](con gái)!',
          bn: '[여](yeo) + [자](ja) যুক্ত হয়ে [여자](মেয়ে) শব্দটি গঠিত হয়!',
          zh: '[여](yeo) + [자](ja) 组合成单词 [여자](女孩)！',
          ru: '[여](yeo) + [자](ja) соединяются и образуют слово [여자](девочка)!',
          ja: '[여](yeo) + [자](ja) が合わさって単語 [여자](女の子) になります！',
          mn: '[여](yeo) ба [자](ja) нийлж [여자](эмэгтэй) үг бүтдэг!'
        },
        combination: {
          consonant: '여',
          consonantSound: '여',
          consonantRomaja: '[yeo]',
          vowel: '자',
          vowelSound: '자',
          vowelRomaja: '[ja]',
          syllable: '여자',
          syllableSound: '여자',
          syllableRomaja: '[yeo-ja]',
          isWordCard: true,
          word: '여자',
          wordMeaning: 'Girl',
          wordRomaja: '[yeo-ja]'
        }
      },

      // --- [9쪽] ㅛ : ㅍ, ㄱ, ㄹ (표, 교, 료) ➔ 단어: 표 (상하조합) ---
      {
        id: 'bs-p2-pyo',
        char: '표',
        name: '표',
        romaja: '[pyo]',
        sampleWord: '표',
        sampleWordRomaja: 'pyo',
        meanings: {
          en: 'ticket',
          vi: 'vé',
          bn: 'টিকিট',
          zh: '票',
          ru: 'билет',
          ja: '切符',
          mn: 'тасалбар'
        },
        tips: {
          en: 'Consonant [ㅍ](p) + Vowel [ㅛ](yo) combine vertically (top to bottom) into [표](pyo).',
          vi: 'Phụ âm [ㅍ](p) + Nguyên âm [ㅛ](yo) kết hợp trên dưới thành [표](pyo).',
          bn: 'ব্যঞ্জনবর্ণ [ㅍ](p) + স্বরবর্ণ [ㅛ](yo) উপর-নিচে যুক্ত হয়ে [표](pyo) তৈরি হয়।',
          zh: '声母 [ㅍ](p) + 韵母 [ㅛ](yo) 上下拼合成 [표](pyo)。',
          ru: 'Согласный [ㅍ](p) + гласный [ㅛ](yo) соединяются сверху вниз в [표](pyo).',
          ja: '子音 [ㅍ](p) + 母音 [ㅛ](yo) が上下に合わさって [표](pyo) になります。',
          mn: 'Гийгүүлэгч [ㅍ](p) ба эгшиг [ㅛ](yo) дээрээс доош нийлж [표](pyo) болно.'
        },
        combination: {
          consonant: 'ㅍ',
          consonantSound: '프',
          consonantRomaja: '[p]',
          vowel: 'ㅛ',
          vowelSound: '요',
          vowelRomaja: '[yo]',
          syllable: '표',
          syllableSound: '표',
          syllableRomaja: '[pyo]'
        }
      },
      {
        id: 'bs-p2-gyo',
        char: '교',
        name: '교',
        romaja: '[gyo]',
        sampleWord: '교실',
        sampleWordRomaja: 'gyo-sil',
        meanings: {
          en: 'classroom',
          vi: 'lớp học',
          bn: 'শ্রেণিকক্ষ',
          zh: '教室',
          ru: 'класс',
          ja: '教室',
          mn: 'анги танхим'
        },
        tips: {
          en: 'Consonant [ㄱ](g) + Vowel [ㅛ](yo) combine vertically (top to bottom) into [교](gyo).',
          vi: 'Phụ âm [ㄱ](g) + Nguyên âm [ㅛ](yo) kết hợp trên dưới thành [교](gyo).',
          bn: 'ব্যঞ্জনবর্ণ [ㄱ](g) + স্বরবর্ণ [ㅛ](yo) উপর-নিচে যুক্ত হয়ে [교](gyo) তৈরি হয়।',
          zh: '声母 [ㄱ](g) + 韵母 [ㅛ](yo) 上下拼合成 [교](gyo)。',
          ru: 'Согласный [ㄱ](g) + гласный [ㅛ](yo) соединяются сверху вниз в [교](gyo).',
          ja: '子音 [ㄱ](g) + 母音 [ㅛ](yo) が上下に合わさって [교](gyo) になります。',
          mn: 'Гийгүүлэгч [ㄱ](g) ба эгшиг [ㅛ](yo) дээрээс доош нийлж [교](gyo) болно.'
        },
        combination: {
          consonant: 'ㄱ',
          consonantSound: '그',
          consonantRomaja: '[g]',
          vowel: 'ㅛ',
          vowelSound: '요',
          vowelRomaja: '[yo]',
          syllable: '교',
          syllableSound: '교',
          syllableRomaja: '[gyo]'
        }
      },
      {
        id: 'bs-p2-ryo',
        char: '료',
        name: '료',
        romaja: '[ryo]',
        sampleWord: '음료수',
        sampleWordRomaja: 'eum-ryo-su',
        meanings: {
          en: 'beverage / drink',
          vi: 'đồ uống',
          bn: 'পানীয়',
          zh: '饮料',
          ru: 'напиток',
          ja: '飲み物',
          mn: 'ундаа'
        },
        tips: {
          en: 'Consonant [ㄹ](r) + Vowel [ㅛ](yo) combine vertically (top to bottom) into [료](ryo).',
          vi: 'Phụ âm [ㄹ](r) + Nguyên âm [ㅛ](yo) kết hợp trên dưới thành [료](ryo).',
          bn: 'ব্যঞ্জনবর্ণ [ㄹ](r) + স্বরবর্ণ [ㅛ](yo) উপর-নিচে যুক্ত হয়ে [료](ryo) তৈরি হয়।',
          zh: '声母 [ㄹ](r) + 韵母 [ㅛ](yo) 上下拼合成 [료](ryo)。',
          ru: 'Согласный [ㄹ](r) + гласный [ㅛ](yo) соединяются сверху вниз в [료](ryo).',
          ja: '子音 [ㄹ](r) + 母音 [ㅛ](yo) が上下に合わさって [료](ryo) になります。',
          mn: 'Гийгүүлэгч [ㄹ](r) ба эгшиг [ㅛ](yo) дээрээ스 доош нийлж [료](ryo) болно.'
        },
        combination: {
          consonant: 'ㄹ',
          consonantSound: '르',
          consonantRomaja: '[r]',
          vowel: 'ㅛ',
          vowelSound: '요',
          vowelRomaja: '[yo]',
          syllable: '료',
          syllableSound: '료',
          syllableRomaja: '[ryo]'
        }
      },
      {
        id: 'bs-p2-word-pyo',
        char: '표',
        name: '표',
        romaja: '[pyo]',
        sampleWord: '표',
        sampleWordRomaja: 'pyo',
        meanings: {
          en: 'Ticket',
          vi: 'vé vào cửa',
          bn: 'টিকিট',
          zh: '门票 / 车票',
          ru: 'билет',
          ja: '切符 / チケット',
          mn: 'тасалбар'
        },
        tips: {
          en: 'Consonant [ㅍ](p) + Vowel [ㅛ](yo) combine vertically into the word [표](Ticket)!',
          vi: 'Phụ âm [ㅍ](p) + Nguyên âm [ㅛ](yo) kết hợp trên dưới tạo thành từ [표](vé)!',
          bn: 'ব্যঞ্জনবর্ণ [ㅍ](p) + স্বরবর্ণ [ㅛ](yo) উপর-নিচে যুক্ত হয়ে [표](টিকিট) শব্দটি গঠিত হয়!',
          zh: '声母 [ㅍ](p) + 韵母 [ㅛ](yo) 上下组合成单词 [표](门票)！',
          ru: 'Согласный [ㅍ](p) + гласный [ㅛ](yo) соединяются сверху вниз в слово [표](билет)!',
          ja: '子音 [ㅍ](p) + 母音 [ㅛ](yo) が上下に合わさって単語 [표](切符) になります！',
          mn: 'Гийгүүлэгч [ㅍ](p) ба эгшиг [ㅛ](yo) дээрээс доош нийлж [표](тасалбар) үг бүтдэг!'
        },
        combination: {
          consonant: 'ㅍ',
          consonantSound: '프',
          consonantRomaja: '[p]',
          vowel: 'ㅛ',
          vowelSound: '요',
          vowelRomaja: '[yo]',
          syllable: '표',
          syllableSound: '표',
          syllableRomaja: '[pyo]',
          isWordCard: true,
          word: '표',
          wordMeaning: 'Ticket',
          wordRomaja: '[pyo]'
        }
      },

      // --- [10쪽] ㅠ : ㅇ, ㅎ, ㄹ (유, 휴, 류) ➔ 단어: 우유 (상하조합) ---
      {
        id: 'bs-p2-yu',
        char: '유',
        name: '유',
        romaja: '[yu]',
        sampleWord: '유치원',
        sampleWordRomaja: 'yu-chi-won',
        meanings: {
          en: 'kindergarten',
          vi: 'trường mẫu giáo',
          bn: 'কিন্ডারগার্টেন',
          zh: '幼儿园',
          ru: 'детский сад',
          ja: '幼稚園',
          mn: 'цэцэрлэг'
        },
        tips: {
          en: 'Consonant [ㅇ](silent) + Vowel [ㅠ](yu) combine vertically (top to bottom) into [유](yu).',
          vi: 'Phụ âm [ㅇ](câm) + Nguyên âm [ㅠ](yu) kết hợp trên dưới thành [유](yu).',
          bn: 'ব্যঞ্জনবর্ণ [ㅇ] + স্বরবর্ণ [ㅠ](yu) উপর-নিচে যুক্ত হয়ে [유](yu) তৈরি হয়।',
          zh: '声母 [ㅇ] + 韵母 [ㅠ](yu) 上下拼合成 [유](yu)。',
          ru: 'Согласный [ㅇ] + гласный [ㅠ](yu) соединяются сверху вниз в [유](yu).',
          ja: '子音 [ㅇ] + 母音 [ㅠ](yu) が上下に合わさって [유](yu) になります。',
          mn: 'Гийгүүлэгч [ㅇ] ба эгшиг [ㅠ](yu) дээрээс доош нийлж [유](yu) болно.'
        },
        combination: {
          consonant: 'ㅇ',
          consonantSound: '으',
          consonantRomaja: '[ - ]',
          vowel: 'ㅠ',
          vowelSound: '유',
          vowelRomaja: '[yu]',
          syllable: '유',
          syllableSound: '유',
          syllableRomaja: '[yu]'
        }
      },
      {
        id: 'bs-p2-hyu',
        char: '휴',
        name: '휴',
        romaja: '[hyu]',
        sampleWord: '휴지',
        sampleWordRomaja: 'hyu-ji',
        meanings: {
          en: 'tissue / paper',
          vi: 'khăn giấy',
          bn: 'টিস্যু',
          zh: '纸巾',
          ru: 'салфетка',
          ja: 'ティッシュ',
          mn: 'ариун цэврийн цаас'
        },
        tips: {
          en: 'Consonant [ㅎ](h) + Vowel [ㅠ](yu) combine vertically (top to bottom) into [휴](hyu).',
          vi: 'Phụ âm [ㅎ](h) + Nguyên âm [ㅠ](yu) kết hợp trên dưới thành [휴](hyu).',
          bn: 'ব্যঞ্জনবর্ণ [ㅎ](h) + স্বরবর্ণ [ㅠ](yu) উপর-নিচে যুক্ত হয়ে [휴](hyu) তৈরি হয়।',
          zh: '声母 [ㅎ](h) + 韵母 [ㅠ](yu) 上下拼合成 [휴](hyu)。',
          ru: 'Согласный [ㅎ](h) + гласный [ㅠ](yu) соединяются сверху вниз в [휴](hyu).',
          ja: '子音 [ㅎ](h) + 母音 [ㅠ](yu) が上下に合わさって [휴](hyu) になります。',
          mn: 'Гийгүүлэгч [ㅎ](h) ба эгшиг [ㅠ](yu) дээрээ스 доош нийлж [휴](hyu) болно.'
        },
        combination: {
          consonant: 'ㅎ',
          consonantSound: '흐',
          consonantRomaja: '[h]',
          vowel: 'ㅠ',
          vowelSound: '유',
          vowelRomaja: '[yu]',
          syllable: '휴',
          syllableSound: '휴',
          syllableRomaja: '[hyu]'
        }
      },
      {
        id: 'bs-p2-ryu',
        char: '류',
        name: '류',
        romaja: '[ryu]',
        sampleWord: '서류',
        sampleWordRomaja: 'seo-ryu',
        meanings: {
          en: 'documents / papers',
          vi: 'tài liệu',
          bn: 'কাগজপত্র',
          zh: '文件',
          ru: 'документы',
          ja: '書類',
          mn: 'бичиг баримт'
        },
        tips: {
          en: 'Consonant [ㄹ](r) + Vowel [ㅠ](yu) combine vertically (top to bottom) into [류](ryu).',
          vi: 'Phụ âm [ㄹ](r) + Nguyên âm [ㅠ](yu) kết hợp trên dưới thành [류](ryu).',
          bn: 'ব্যঞ্জনবর্ণ [ㄹ](r) + স্বরবর্ণ [ㅠ](yu) উপর-নিচে যুক্ত হয়ে [류](ryu) তৈরি হয়।',
          zh: '声母 [ㄹ](r) + 韵母 [ㅠ](yu) 上下拼合成 [류](ryu)。',
          ru: 'Согласный [ㄹ](r) + гласный [ㅠ](yu) соединяются сверху вниз в [류](ryu).',
          ja: '子音 [ㄹ](r) + 母音 [ㅠ](yu) が上下に合わさって [류](ryu) になります。',
          mn: 'Гийгүүлэгч [ㄹ](r) ба эгшиг [ㅠ](yu) дээрээ스 доош нийлж [류](ryu) болно.'
        },
        combination: {
          consonant: 'ㄹ',
          consonantSound: '르',
          consonantRomaja: '[r]',
          vowel: 'ㅠ',
          vowelSound: '유',
          vowelRomaja: '[yu]',
          syllable: '류',
          syllableSound: '류',
          syllableRomaja: '[ryu]'
        }
      },
      {
        id: 'bs-p2-word-uyu',
        char: '우유',
        name: '우유',
        romaja: '[u-yu]',
        sampleWord: '우유',
        sampleWordRomaja: 'u-yu',
        meanings: {
          en: 'Milk',
          vi: 'sữa',
          bn: 'দুধ',
          zh: '牛奶',
          ru: 'молоко',
          ja: '牛乳 / ミルク',
          mn: 'сүү'
        },
        tips: {
          en: '[우](u) + [유](yu) combine to make the word [우유](Milk)!',
          vi: '[우](u) + [유](yu) kết hợp tạo thành từ [우유](sữa)!',
          bn: '[우](u) + [유](yu) যুক্ত হয়ে [우유](দুধ) শব্দটি গঠিত হয়!',
          zh: '[우](u) + [유](yu) 组合成单词 [우유](牛奶)！',
          ru: '[우](u) + [유](yu) соединяются и образуют слово [우유](молоко)!',
          ja: '[우](u) + [유](yu) が合わさって単語 [우유](牛乳) になります！',
          mn: '[우](u) ба [유](yu) нийлж [우유](сүү) үг бүтдэг!'
        },
        combination: {
          consonant: '우',
          consonantSound: '우',
          consonantRomaja: '[u]',
          vowel: '유',
          vowelSound: '유',
          vowelRomaja: '[yu]',
          syllable: '우유',
          syllableSound: '우유',
          syllableRomaja: '[u-yu]',
          isWordCard: true,
          word: '우유',
          wordMeaning: 'Milk',
          wordRomaja: '[u-yu]'
        }
      }
    ]
  },
  ...HANGEUL_UNITS_7_TO_12
];
