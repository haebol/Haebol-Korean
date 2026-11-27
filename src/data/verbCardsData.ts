import type { VerbUnitType, VerbCardItem } from './verbUnitMeta';
import {
  MEOK_EO_YO_SVG,
  BADA_YO_NOTEBOOK_SVG
} from './chapterIllustrations6to10';
import {
  ALAYO_SVG,
  SSISEOYO_SVG,
  ILGEO_YO_SVG
} from './chapterIllustrations2to5';
import {
  CHAJAYO_DESK_PENCIL_SVG,
  NOLAYO_KIDS_OUTDOOR_SVG,
  DADAYO_DOOR_SVG,
  IPEOYO_CLOTHES_SVG,
  YEOL_EO_YO_WINDOW_SVG,
  GONGBU_HAEYO_SVG,
  CHEONGSO_HAEYO_SVG,
  SUKJE_HAEYO_SVG,
  JILMUN_HAEYO_SVG,
  INSA_HAEYO_SVG,
  ODA_WAYO_SVG,
  BODA_BWAYO_SVG,
  GADA_GAYO_SVG,
  APEUDA_APAYO_SVG,
  DOPDA_DOWAYO_SVG,
  JUDA_JWOYO_SVG,
  MASIDA_MASYEOYO_SVG,
  SSEUDA_SSEOYO_SVG,
  DEUTDA_DEUREOYO_SVG,
  BUREUDA_BULLEOYO_SVG
} from './verbWorksheetIllustrations';
import {
  MATDA_MAJASSEOYO_SVG,
  DAKDA_DAKKASSEOYO_SVG,
  ANJDA_ANJASSEOYO_SVG,
  JAPDA_JABASSEOYO_SVG,
  JOTDA_JOHASSEOYO_SVG,
  ITDA_ISSEOSSEOYO_SVG,
  SINDA_SINEOSSEOYO_SVG,
  UTDA_USEOSSEOYO_SVG,
  SWIDA_SWIEOSSEOYO_SVG,
  MANDEULDA_MANDEULEOSSEOYO_SVG,
  SIJAK_HAEYO_SVG,
  DAEDAP_HAEYO_SVG,
  JEONGRI_HAEYO_SVG,
  UNDONG_HAEYO_SVG,
  YANGBO_HAEYO_PAST_SVG,
  TADA_TASS_EOYO_SVG,
  JADA_JASS_EOYO_SVG,
  SSADA_SSASS_EOYO_SVG,
  MOREUDA_MOLLASS_EOYO_SVG,
  NATDA_NAASSEOYO_SVG,
  GEURIDA_GEURYEOSSEOYO_SVG,
  BUTIDA_BUTYEOSSEOYO_SVG,
  KKAMATDA_KKAMAESSEOYO_SVG,
  YEPPEUDA_YEPPEOSSEOYO_SVG,
  CHUPDA_CHUWOSSEOYO_SVG
} from './verbPastTenseIllustrations';
import {
  NAMGIDA_SVG,
  JOSIMHADA_SVG,
  NAMDA_SVG,
  KKEONAEDA_SVG,
  JIKIDA_SVG,
  GEONNEODA_SVG,
  NALDA_SVG,
  JEOPDA_SVG,
  SUYEONGHADA_SVG,
  JAREUDA_SVG
} from './verbUnits21to25Illustrations';
import {
  MANNADA_SVG,
  GIDARIDA_SVG,
  SEOLMYEONGHADA_SVG,
  KKAKDA_SVG,
  KYEODA_SVG,
  KKEUDA_SVG,
  MALHADA_SVG,
  SEODA_SVG,
  NEOTDA_SVG,
  GEOTDA_SVG,
  PULDA_SVG,
  TTWIDA_SVG,
  MANJIDA_SVG,
  SSAUDA_SVG,
  TTEODEULDA_SVG,
  BEORIDA_SVG,
  ILHADA_SVG,
  IYAGIHADA_SVG,
  JUNBIHADA_SVG,
  JITDA_SVG,
  MUREOBODA_SVG
} from './verbUnits11to15Illustrations';
import {
  GAJYEO_ODA_SVG,
  KKEUTNADA_SVG,
  SALDA_SVG,
  NOTDA_SVG,
  IREONADA_SVG,
  DEUREOGADA_SVG,
  NAGADA_SVG,
  SAYONGHADA_SVG,
  CHIUDA_SVG,
  BAEGOPEUDA_SVG,
  NEUTDA_SVG,
  DACHIDA_SVG,
  PIRLYOHADA_SVG,
  HIMDEULDA_SVG,
  JAKDA_SVG
} from './verbUnits16to20Illustrations';
import {
  ULDA_U11_SVG,
  SSOTDA_U11_SVG,
  CHAMDA_U11_SVG,
  DEONJIDA_U11_SVG
} from './verbUnit11Illustrations';
import {
  GEIMHADA_SVG,
  JULNEOMGIHADA_SVG,
  YORIHADA_SVG,
  UNJEONHADA_SVG,
  SHAWEOHADA_SVG,
  BAEUDA_U13_SVG,
  SADA_U13_SVG,
  YEOHAENGHADA_U13_SVG,
  JALHADA_SVG,
  BILLIDA_U19_SVG,
  UMJIGIDA_SVG,
  BAREUDA_U20_SVG
} from './verbUnits12to20Illustrations';
import {
  MOIDA_SVG,
  MEOLDA_SVG,
  TEULLIDA_SVG,
  BALPYOHADA_SVG
} from './verbUnits26to30Illustrations';
import {
  BALBDA_U21_SVG,
  OLLIDA_U21_SVG,
  NANUUDA_U22_SVG,
  BAKKUDA_U22_SVG,
  DEOHADA_SVG,
  PPAEDA_SVG,
  SESUHADA_U23_SVG,
  PYEODA_SVG,
  CHAENG_GIDA_U23_SVG,
  JOAHADA_U23_SVG,
  EORYEOPDA_U24_SVG,
  SEULPEUDA_U24_SVG,
  MUGEOPDA_U24_SVG,
  DEOPDA_U25_SVG,
  PPAREUDA_U25_SVG,
  GEUREOTA_GEUREOMYEON_SVG,
  GUNGGUMHADA_SVG,
  CHULBALHADA_SVG,
  JOLLIDA_U27_SVG,
  BEOTDA_U27_SVG,
  HONNADA_SVG,
  GUGYEONGHADA_U28_SVG,
  SANCHAEKHADA_SVG,
  BANNAPHADA_SVG,
  SIMDA_SVG,
  YANGCHIHADA_U29_SVG,
  MOEUDA_U29_SVG,
  YEONSEUPHADA_SVG,
  SEOKDA_SVG,
  ANDA_U30_SVG,
  CHUMCHUDA_SVG,
  OE_UDA_U30_SVG,
  DOJEONHADA_U30_SVG,
  MUTDA_U30_SVG
} from './verbUnits21to30Illustrations';

// 1단원: [-아요] 5장
const UNIT_1_CARDS: VerbCardItem[] = [
  {
    id: 'u1-1',
    stem: '받',
    ending: '다',
    conjugatedEnding: '아요',
    baseWord: '받다',
    conjugatedWord: '받아요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to receive / to take',
      vi: 'nhận / lấy',
      bn: 'নেওয়া / গ্রহণ করা',
      zh: '领 / 接收',
      ru: 'получать / брать',
      ja: '受け取る / もらう',
      mn: 'авах',
    },
    sampleSentence: '공책을 받아요.',
    illustrationSvg: BADA_YO_NOTEBOOK_SVG,
    emojiIcon: '📖'
  },
  {
    id: 'u1-2',
    stem: '찾',
    ending: '다',
    conjugatedEnding: '아요',
    baseWord: '찾다',
    conjugatedWord: '찾아요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to find / to look for',
      vi: 'tìm / tìm kiếm',
      bn: 'খোঁজা',
      zh: '找 / 寻找',
      ru: 'искать / находить',
      ja: 'さがす / 見つける',
      mn: 'хайх / олох',
    },
    sampleSentence: '연필을 찾아요.',
    illustrationSvg: CHAJAYO_DESK_PENCIL_SVG,
    emojiIcon: '🔎'
  },
  {
    id: 'u1-3',
    stem: '놀',
    ending: '다',
    conjugatedEnding: '아요',
    baseWord: '놀다',
    conjugatedWord: '놀아요',
    vowelHint: 'ㅗ 발견!',
    meanings: {
      en: 'to play',
      vi: 'chơi',
      bn: 'খেলা করা',
      zh: '玩耍',
      ru: 'играть',
      ja: '遊ぶ',
      mn: 'тоглох',
    },
    sampleSentence: '친구랑 놀아요.',
    illustrationSvg: NOLAYO_KIDS_OUTDOOR_SVG,
    emojiIcon: '🎈'
  },
  {
    id: 'u1-4',
    stem: '알',
    ending: '다',
    conjugatedEnding: '아요',
    baseWord: '알다',
    conjugatedWord: '알아요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to know',
      vi: 'biết',
      bn: 'জানা',
      zh: '知道',
      ru: 'знать',
      ja: '知る / わかる',
      mn: 'мэдэх',
    },
    sampleSentence: '답을 알아요.',
    illustrationSvg: ALAYO_SVG,
    emojiIcon: '💡'
  },
  {
    id: 'u1-5',
    stem: '닫',
    ending: '다',
    conjugatedEnding: '아요',
    baseWord: '닫다',
    conjugatedWord: '닫아요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to close',
      vi: 'đóng lại',
      bn: 'বন্ধ করা',
      zh: '关 / 关闭',
      ru: 'закрывать',
      ja: 'しめる (閉める)',
      mn: 'хаах',
    },
    sampleSentence: '문을 닫아요.',
    illustrationSvg: DADAYO_DOOR_SVG,
    emojiIcon: '🚪'
  }
];

// 2단원: [-어요] 5장
const UNIT_2_CARDS: VerbCardItem[] = [
  {
    id: 'u2-1',
    stem: '먹',
    ending: '다',
    conjugatedEnding: '어요',
    baseWord: '먹다',
    conjugatedWord: '먹어요',
    vowelHint: 'ㅓ 발견',
    meanings: {
      en: 'to eat',
      vi: 'ăn',
      bn: 'খাওয়া',
      zh: '吃',
      ru: 'кушать / есть',
      ja: 'たべる (食べる)',
      mn: 'идэх',
    },
    sampleSentence: '밥을 먹어요.',
    illustrationSvg: MEOK_EO_YO_SVG,
    emojiIcon: '🍽️'
  },
  {
    id: 'u2-2',
    stem: '씻',
    ending: '다',
    conjugatedEnding: '어요',
    baseWord: '씻다',
    conjugatedWord: '씻어요',
    vowelHint: 'ㅣ 발견',
    meanings: {
      en: 'to wash',
      vi: 'rửa',
      bn: 'ধোয়া',
      zh: '洗',
      ru: 'мыть / умывать',
      ja: 'あらう (洗う)',
      mn: 'угаах',
    },
    sampleSentence: '손을 씻어요.',
    illustrationSvg: SSISEOYO_SVG,
    emojiIcon: '🧼'
  },
  {
    id: 'u2-3',
    stem: '입',
    ending: '다',
    conjugatedEnding: '어요',
    baseWord: '입다',
    conjugatedWord: '입어요',
    vowelHint: 'ㅣ 발견',
    meanings: {
      en: 'to wear / to put on',
      vi: 'mặc (quần áo)',
      bn: 'জামা পরা',
      zh: '穿（衣服）',
      ru: 'надевать / носить',
      ja: 'きる (着る)',
      mn: 'өмсөх',
    },
    sampleSentence: '옷을 입어요.',
    illustrationSvg: IPEOYO_CLOTHES_SVG,
    emojiIcon: '👕'
  },
  {
    id: 'u2-4',
    stem: '읽',
    ending: '다',
    conjugatedEnding: '어요',
    baseWord: '읽다',
    conjugatedWord: '읽어요',
    vowelHint: 'ㅣ 발견',
    meanings: {
      en: 'to read',
      vi: 'đọc (sách)',
      bn: 'পড়া',
      zh: '读 / 阅读',
      ru: 'читать',
      ja: 'よむ (読む)',
      mn: 'унших',
    },
    sampleSentence: '책을 읽어요.',
    illustrationSvg: ILGEO_YO_SVG,
    emojiIcon: '📚'
  },
  {
    id: 'u2-5',
    stem: '열',
    ending: '다',
    conjugatedEnding: '어요',
    baseWord: '열다',
    conjugatedWord: '열어요',
    vowelHint: 'ㅕ 발견',
    meanings: {
      en: 'to open',
      vi: 'mở ra',
      bn: 'খোলা',
      zh: '开 / 打开',
      ru: 'открывать',
      ja: 'あける (開ける)',
      mn: 'нээх',
    },
    sampleSentence: '창문을 열어요.',
    illustrationSvg: YEOL_EO_YO_WINDOW_SVG,
    emojiIcon: '🪟'
  }
];

// 3단원: [-해요] 5장 (하다 동사)
const UNIT_3_CARDS: VerbCardItem[] = [
  {
    id: 'u3-1',
    stem: '공부',
    ending: '하다',
    conjugatedEnding: '해요',
    baseWord: '공부하다',
    conjugatedWord: '공부해요',
    vowelHint: '‘하다’ 발견!',
    meanings: {
      en: 'to study',
      vi: 'học',
      bn: 'পড়াশোনা করা',
      zh: '学习',
      ru: 'учиться',
      ja: '勉強する',
      mn: 'сурах',
    },
    sampleSentence: '한국어를 공부해요.',
    illustrationSvg: GONGBU_HAEYO_SVG,
    emojiIcon: '📖'
  },
  {
    id: 'u3-2',
    stem: '청소',
    ending: '하다',
    conjugatedEnding: '해요',
    baseWord: '청소하다',
    conjugatedWord: '청소해요',
    vowelHint: '‘하다’ 발견!',
    meanings: {
      en: 'to clean',
      vi: 'dọn dẹp',
      bn: 'পরিষ্কার করা',
      zh: '打扫',
      ru: 'убирать',
      ja: '掃除する',
      mn: 'цэвэрлэх',
    },
    sampleSentence: '교실을 청소해요.',
    illustrationSvg: CHEONGSO_HAEYO_SVG,
    emojiIcon: '🧹'
  },
  {
    id: 'u3-3',
    stem: '숙제',
    ending: '하다',
    conjugatedEnding: '해요',
    baseWord: '숙제하다',
    conjugatedWord: '숙제해요',
    vowelHint: '‘하다’ 발견!',
    meanings: {
      en: 'to do homework',
      vi: 'làm bài tập',
      bn: 'বাড়ির কাজ করা',
      zh: '做作业',
      ru: 'делать уроки',
      ja: '宿題をする',
      mn: 'даалгавар хийх',
    },
    sampleSentence: '지금 숙제해요.',
    illustrationSvg: SUKJE_HAEYO_SVG,
    emojiIcon: '📝'
  },
  {
    id: 'u3-4',
    stem: '질문',
    ending: '하다',
    conjugatedEnding: '해요',
    baseWord: '질문하다',
    conjugatedWord: '질문해요',
    vowelHint: '‘하다’ 발견!',
    meanings: {
      en: 'to ask',
      vi: 'hỏi',
      bn: 'প্রশ্ন করা',
      zh: '提问',
      ru: 'спрашивать',
      ja: '質問する',
      mn: 'асуух',
    },
    sampleSentence: '손들고 질문해요.',
    illustrationSvg: JILMUN_HAEYO_SVG,
    emojiIcon: '🙋'
  },
  {
    id: 'u3-5',
    stem: '인사',
    ending: '하다',
    conjugatedEnding: '해요',
    baseWord: '인사하다',
    conjugatedWord: '인사해요',
    vowelHint: '‘하다’ 발견!',
    meanings: {
      en: 'to greet',
      vi: 'chào',
      bn: 'সালাম দেওয়া',
      zh: '打招呼',
      ru: 'здороваться',
      ja: '挨拶する',
      mn: 'мэндлэх',
    },
    sampleSentence: '선생님께 인사해요.',
    illustrationSvg: INSA_HAEYO_SVG,
    emojiIcon: '🙇'
  }
];

// 4단원: [-아요 ★] 5장 (축약·탈락·불규칙)
const UNIT_4_CARDS: VerbCardItem[] = [
  {
    id: 'u4-1',
    stem: '오',
    ending: '다',
    conjugatedEnding: '요',
    conjugatedStem: '와',
    conjugatedStemColor: 'text-red-600',
    baseWord: '오다',
    conjugatedWord: '와요',
    vowelHint: '모음 축약 (오+아=와)',
    meanings: {
      en: 'to come',
      vi: 'đến',
      bn: 'আসা',
      zh: '来',
      ru: 'приходить',
      ja: '来る',
      mn: 'ирэх',
    },
    sampleSentence: '학교에 와요.',
    illustrationSvg: ODA_WAYO_SVG,
    emojiIcon: '🎒'
  },
  {
    id: 'u4-2',
    stem: '보',
    ending: '다',
    conjugatedEnding: '요',
    conjugatedStem: '봐',
    conjugatedStemColor: 'text-red-600',
    baseWord: '보다',
    conjugatedWord: '봐요',
    vowelHint: '모음 축약 (보+아=봐)',
    meanings: {
      en: 'to see / to look',
      vi: 'nhìn / xem',
      bn: 'দেখা',
      zh: '看',
      ru: 'смотреть / видеть',
      ja: '見る',
      mn: 'үзэх / харах',
    },
    sampleSentence: '칠판을 봐요.',
    illustrationSvg: BODA_BWAYO_SVG,
    emojiIcon: '👀'
  },
  {
    id: 'u4-3',
    stem: '가',
    ending: '다',
    conjugatedEnding: '요',
    conjugatedStem: '가',
    baseWord: '가다',
    conjugatedWord: '가요',
    vowelHint: '모음 탈락 (가+아=가)',
    meanings: {
      en: 'to go',
      vi: 'đi',
      bn: 'যাওয়া',
      zh: '去 / 走',
      ru: 'идти / уходить',
      ja: '行く',
      mn: 'явах',
    },
    sampleSentence: '집에 가요.',
    illustrationSvg: GADA_GAYO_SVG,
    emojiIcon: '👋'
  },
  {
    id: 'u4-4',
    stem: '아프',
    ending: '다',
    conjugatedEnding: '파요',
    conjugatedStem: '아',
    baseWord: '아프다',
    conjugatedWord: '아파요',
    vowelHint: 'ㅡ 탈락 (프+아=파)',
    meanings: {
      en: 'to hurt / to be sick',
      vi: 'đau / ốm',
      bn: 'ব্যথা করা / অসুস্থ হওয়া',
      zh: '疼 / 痛',
      ru: 'болеть',
      ja: '痛い',
      mn: 'өвдөх',
    },
    sampleSentence: '머리가 아파요.',
    illustrationSvg: APEUDA_APAYO_SVG,
    emojiIcon: '🤕'
  },
  {
    id: 'u4-5',
    stem: '돕',
    ending: '다',
    conjugatedEnding: '와요',
    conjugatedStem: '도',
    baseWord: '돕다',
    conjugatedWord: '도와요',
    vowelHint: 'ㅂ 불규칙 (돕+아=도와)',
    meanings: {
      en: 'to help',
      vi: 'giúp đỡ',
      bn: 'সাহায্য করা',
      zh: '帮 / 帮助',
      ru: 'помогать',
      ja: '助ける / 手伝う',
      mn: 'туслах',
    },
    sampleSentence: '친구를 도와요.',
    illustrationSvg: DOPDA_DOWAYO_SVG,
    emojiIcon: '🤝'
  }
];

// 5단원: [-어요 ★] 5장 (축약·탈락·불규칙)
const UNIT_5_CARDS: VerbCardItem[] = [
  {
    id: 'u5-1',
    stem: '주',
    ending: '다',
    conjugatedEnding: '요',
    conjugatedStem: '줘',
    conjugatedStemColor: 'text-red-600',
    baseWord: '주다',
    conjugatedWord: '줘요',
    vowelHint: '모음 축약 (주+어=줘)',
    meanings: {
      en: 'to give',
      vi: 'cho / tặng',
      bn: 'দেওয়া',
      zh: '给',
      ru: 'давать',
      ja: 'あげる / くれる',
      mn: 'өгөх',
    },
    sampleSentence: '연필을 줘요.',
    illustrationSvg: JUDA_JWOYO_SVG,
    emojiIcon: '🎁'
  },
  {
    id: 'u5-2',
    stem: '마시',
    ending: '다',
    conjugatedEnding: '셔요',
    conjugatedStem: '마',
    baseWord: '마시다',
    conjugatedWord: '마셔요',
    vowelHint: '모음 축약 (시+어=셔)',
    meanings: {
      en: 'to drink',
      vi: 'uống',
      bn: 'পান করা',
      zh: '喝',
      ru: 'пить',
      ja: '飲む',
      mn: 'уух',
    },
    sampleSentence: '물을 마셔요.',
    illustrationSvg: MASIDA_MASYEOYO_SVG,
    emojiIcon: '🥛'
  },
  {
    id: 'u5-3',
    stem: '쓰',
    ending: '다',
    conjugatedEnding: '요',
    conjugatedStem: '써',
    conjugatedStemColor: 'text-red-600',
    baseWord: '쓰다',
    conjugatedWord: '써요',
    vowelHint: 'ㅡ 탈락 (쓰+어=써)',
    meanings: {
      en: 'to write',
      vi: 'viết',
      bn: 'লেখা',
      zh: '写',
      ru: 'писать',
      ja: '書く',
      mn: 'бичих',
    },
    sampleSentence: '글씨를 써요.',
    illustrationSvg: SSEUDA_SSEOYO_SVG,
    emojiIcon: '✏️'
  },
  {
    id: 'u5-4',
    stem: '듣',
    ending: '다',
    conjugatedEnding: '어요',
    conjugatedStem: '들',
    baseWord: '듣다',
    conjugatedWord: '들어요',
    vowelHint: 'ㄷ 불규칙 (듣->들)',
    meanings: {
      en: 'to listen',
      vi: 'nghe',
      bn: 'শোনা',
      zh: '听',
      ru: 'слушать',
      ja: '聞く',
      mn: 'сонсох',
    },
    sampleSentence: '음악을 들어요.',
    illustrationSvg: DEUTDA_DEUREOYO_SVG,
    emojiIcon: '🎧'
  },
  {
    id: 'u5-5',
    stem: '부르',
    ending: '다',
    conjugatedEnding: '러요',
    conjugatedStem: '불',
    baseWord: '부르다',
    conjugatedWord: '불러요',
    vowelHint: '르 불규칙 (부르->불러)',
    meanings: {
      en: 'to sing / to call',
      vi: 'hát / gọi',
      bn: 'গান গাওয়া / ডাকা',
      zh: '唱 / 叫',
      ru: 'петь / звать',
      ja: '歌う / 呼ぶ',
      mn: 'дуулах / дуудах',
    },
    sampleSentence: '노래를 불러요.',
    illustrationSvg: BUREUDA_BULLEOYO_SVG,
    emojiIcon: '🎤'
  }
];

const UNIT_6_CARDS: VerbCardItem[] = [
  {
    id: 'u6-1',
    stem: '맞',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '맞다',
    conjugatedWord: '맞았어요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to be correct',
      vi: 'đúng',
      bn: 'সঠিক হওয়া',
      zh: '正确',
      ru: 'быть правильным',
      ja: '合っている',
      mn: 'зөв байх',
      ko: '맞다'
    },
    sampleSentence: '답이 맞았어요.',
    illustrationSvg: MATDA_MAJASSEOYO_SVG,
    emojiIcon: '⭕'
  },
  {
    id: 'u6-2',
    stem: '닦',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '닦다',
    conjugatedWord: '닦았어요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to wipe / to brush',
      vi: 'lau / đánh (răng)',
      bn: 'মোছা / মাজা',
      zh: '擦 / 刷',
      ru: 'вытирать / чистить',
      ja: '磨く / 拭く',
      mn: 'арчих / угаах',
      ko: '닦다'
    },
    sampleSentence: '이를 닦았어요.',
    illustrationSvg: DAKDA_DAKKASSEOYO_SVG,
    emojiIcon: '🪥'
  },
  {
    id: 'u6-3',
    stem: '앉',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '앉다',
    conjugatedWord: '앉았어요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to sit',
      vi: 'ngồi',
      bn: 'বসা',
      zh: '坐',
      ru: 'сидеть',
      ja: '座る',
      mn: 'суух',
      ko: '앉다'
    },
    sampleSentence: '자리에 앉았어요.',
    illustrationSvg: ANJDA_ANJASSEOYO_SVG,
    emojiIcon: '🪑'
  },
  {
    id: 'u6-4',
    stem: '잡',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '잡다',
    conjugatedWord: '잡았어요',
    vowelHint: 'ㅏ 발견',
    meanings: {
      en: 'to catch / to hold',
      vi: 'bắt / nắm',
      bn: 'ধরা',
      zh: '抓 / 拿',
      ru: 'ловить / держать',
      ja: 'つかむ / 捕まえる',
      mn: 'барих',
      ko: '잡다'
    },
    sampleSentence: '공을 잡았어요.',
    illustrationSvg: JAPDA_JABASSEOYO_SVG,
    emojiIcon: '⚾'
  },
  {
    id: 'u6-5',
    stem: '좋',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '좋다',
    conjugatedWord: '좋았어요',
    vowelHint: 'ㅗ 발견',
    meanings: {
      en: 'to be good / to feel good',
      vi: 'tốt / thích',
      bn: 'ভালো হওয়া',
      zh: '好 / 喜欢',
      ru: 'быть хорошим',
      ja: '良い / うれしい',
      mn: 'сайн байх',
      ko: '좋다'
    },
    sampleSentence: '기분이 좋았어요.',
    illustrationSvg: JOTDA_JOHASSEOYO_SVG,
    emojiIcon: '😊'
  }
];

const UNIT_7_CARDS: VerbCardItem[] = [
  {
    id: 'u7-1',
    stem: '있',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '있다',
    conjugatedWord: '있었어요',
    vowelHint: 'ㅣ 발견',
    meanings: {
      en: 'to have / to be (exist)',
      vi: 'có / ở',
      bn: 'থাকা / আছে',
      zh: '有 / 在',
      ru: 'быть / иметься',
      ja: 'ある / いる',
      mn: 'байх',
      ko: '있다'
    },
    sampleSentence: '나비가 있었어요.',
    illustrationSvg: ITDA_ISSEOSSEOYO_SVG,
    emojiIcon: '🦋'
  },
  {
    id: 'u7-2',
    stem: '신',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '신다',
    conjugatedWord: '신었어요',
    vowelHint: 'ㅣ 발견',
    meanings: {
      en: 'to put on (shoes)',
      vi: 'đi (giày / dép)',
      bn: 'পায়ে দেওয়া',
      zh: '穿 (鞋 / 袜)',
      ru: 'надевать (обувь)',
      ja: '履く',
      mn: 'өмсөх (гутал)',
      ko: '신다'
    },
    sampleSentence: '신발을 신었어요.',
    illustrationSvg: SINDA_SINEOSSEOYO_SVG,
    emojiIcon: '👟'
  },
  {
    id: 'u7-3',
    stem: '웃',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '웃다',
    conjugatedWord: '웃었어요',
    vowelHint: 'ㅜ 발견',
    meanings: {
      en: 'to laugh / to smile',
      vi: 'cười',
      bn: 'হাসা',
      zh: '笑',
      ru: 'смеяться / улыбаться',
      ja: '笑う',
      mn: 'инээх',
      ko: '웃다'
    },
    sampleSentence: '활짝 웃었어요.',
    illustrationSvg: UTDA_USEOSSEOYO_SVG,
    emojiIcon: '😄'
  },
  {
    id: 'u7-4',
    stem: '쉬',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '쉬다',
    conjugatedWord: '쉬었어요',
    vowelHint: 'ㅟ 발견',
    meanings: {
      en: 'to rest',
      vi: 'nghỉ ngơi',
      bn: 'বিশ্রাম নেওয়া',
      zh: '休息',
      ru: 'отдыхать',
      ja: '休む',
      mn: 'амрах',
      ko: '쉬다'
    },
    sampleSentence: '집에서 쉬었어요.',
    illustrationSvg: SWIDA_SWIEOSSEOYO_SVG,
    emojiIcon: '🛋️'
  },
  {
    id: 'u7-5',
    stem: '만들',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '만들다',
    conjugatedWord: '만들었어요',
    vowelHint: 'ㅡ 발견',
    meanings: {
      en: 'to make',
      vi: 'làm / chế tạo',
      bn: 'তৈরি করা',
      zh: '做 / 制作',
      ru: 'делать / создавать',
      ja: '作る',
      mn: 'хийх / бүтээх',
      ko: '만들다'
    },
    sampleSentence: '빵을 만들었어요.',
    illustrationSvg: MANDEULDA_MANDEULEOSSEOYO_SVG,
    emojiIcon: '🍞'
  }
];

const UNIT_8_CARDS: VerbCardItem[] = [
  {
    id: 'u8-1',
    stem: '시작',
    ending: '하다',
    conjugatedEnding: '했어요',
    baseWord: '시작하다',
    conjugatedWord: '시작했어요',
    vowelHint: "'하다' 발견!",
    meanings: {
      en: 'to start / to begin',
      vi: 'bắt đầu',
      bn: 'শুরু করা',
      zh: '开始',
      ru: 'начинать',
      ja: '始める',
      mn: 'эхлэх',
      ko: '시작하다'
    },
    sampleSentence: '수업을 시작했어요.',
    illustrationSvg: SIJAK_HAEYO_SVG,
    emojiIcon: '🔔'
  },
  {
    id: 'u8-2',
    stem: '대답',
    ending: '하다',
    conjugatedEnding: '했어요',
    baseWord: '대답하다',
    conjugatedWord: '대답했어요',
    vowelHint: "'하다' 발견!",
    meanings: {
      en: 'to answer / to reply',
      vi: 'trả lời',
      bn: 'উত্তর দেওয়া',
      zh: '回答',
      ru: 'отвечать',
      ja: '答える',
      mn: 'хариулах',
      ko: '대답하다'
    },
    sampleSentence: '큰 소리로 대답했어요.',
    illustrationSvg: DAEDAP_HAEYO_SVG,
    emojiIcon: '🙋'
  },
  {
    id: 'u8-3',
    stem: '정리',
    ending: '하다',
    conjugatedEnding: '했어요',
    baseWord: '정리하다',
    conjugatedWord: '정리했어요',
    vowelHint: "'하다' 발견!",
    meanings: {
      en: 'to tidy up / to organize',
      vi: 'dọn dẹp / sắp xếp',
      bn: 'গোছানো',
      zh: '整理',
      ru: 'наводить порядок',
      ja: '片付ける / 整理する',
      mn: 'эмхлэх / цэгцлэх',
      ko: '정리하다'
    },
    sampleSentence: '방을 정리했어요.',
    illustrationSvg: JEONGRI_HAEYO_SVG,
    emojiIcon: '📦'
  },
  {
    id: 'u8-4',
    stem: '운동',
    ending: '하다',
    conjugatedEnding: '했어요',
    baseWord: '운동하다',
    conjugatedWord: '운동했어요',
    vowelHint: "'하다' 발견!",
    meanings: {
      en: 'to exercise / to work out',
      vi: 'tập thể dục',
      bn: 'ব্যায়াম করা',
      zh: '运动',
      ru: 'заниматься спортом',
      ja: '運動する',
      mn: 'дасгал хийх',
      ko: '운동하다'
    },
    sampleSentence: '공원에서 운동했어요.',
    illustrationSvg: UNDONG_HAEYO_SVG,
    emojiIcon: '🏃'
  },
  {
    id: 'u8-5',
    stem: '양보',
    ending: '하다',
    conjugatedEnding: '했어요',
    baseWord: '양보하다',
    conjugatedWord: '양보했어요',
    vowelHint: "'하다' 발견!",
    meanings: {
      en: 'to yield / to give way',
      vi: 'nhường nhịn',
      bn: 'ছাড় দেওয়া',
      zh: '让座 / 让步',
      ru: 'уступать',
      ja: '譲る',
      mn: 'буулт хийх / зай тавьж өгөх',
      ko: '양보하다'
    },
    sampleSentence: '자리를 양보했어요.',
    illustrationSvg: YANGBO_HAEYO_PAST_SVG,
    emojiIcon: '🤝'
  }
];

const UNIT_9_CARDS: VerbCardItem[] = [
  {
    id: 'u9-1',
    stem: '타',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '타다',
    conjugatedWord: '탔어요',
    vowelHint: '모음 탈락 (타+았=탔)',
    meanings: {
      en: 'to ride',
      vi: 'đi (xe) / lên (tàu)',
      bn: 'চড়া',
      zh: '乘坐',
      ru: 'ездить / садиться',
      ja: '乗る',
      mn: 'унах / суух',
      ko: '타다'
    },
    sampleSentence: '버스를 탔어요.',
    illustrationSvg: TADA_TASS_EOYO_SVG,
    emojiIcon: '🚌'
  },
  {
    id: 'u9-2',
    stem: '자',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '자다',
    conjugatedWord: '잤어요',
    vowelHint: '모음 탈락 (자+았=잤)',
    meanings: {
      en: 'to sleep',
      vi: 'ngủ',
      bn: 'ঘুমানো',
      zh: '睡觉',
      ru: 'спать',
      ja: '寝る',
      mn: 'унтах',
      ko: '자다'
    },
    sampleSentence: '일찍 잤어요.',
    illustrationSvg: JADA_JASS_EOYO_SVG,
    emojiIcon: '😴'
  },
  {
    id: 'u9-3',
    stem: '싸',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '싸다',
    conjugatedWord: '쌌어요',
    vowelHint: '모음 탈락 (싸+았=쌌)',
    meanings: {
      en: 'to pack',
      vi: 'gói / đóng gói',
      bn: 'প্যাক করা',
      zh: '打包 / 整理行李',
      ru: 'собирать / паковать',
      ja: '包む / (荷物を)まとめる',
      mn: 'боох / цүнхээ баглах',
      ko: '싸다'
    },
    sampleSentence: '가방을 쌌어요.',
    illustrationSvg: SSADA_SSASS_EOYO_SVG,
    emojiIcon: '🎒'
  },
  {
    id: 'u9-4',
    stem: '모르',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '모르다',
    conjugatedWord: '몰랐어요',
    vowelHint: '르 불규칙 (모르->몰랐)',
    meanings: {
      en: 'not to know',
      vi: 'không biết',
      bn: 'না জানা',
      zh: '不知道',
      ru: 'не знать',
      ja: '知らない',
      mn: 'мэдэхгүй байх',
      ko: '모르다'
    },
    sampleSentence: '그 사실을 몰랐어요.',
    illustrationSvg: MOREUDA_MOLLASS_EOYO_SVG,
    emojiIcon: '❓'
  },
  {
    id: 'u9-5',
    stem: '낫',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '낫다',
    conjugatedWord: '나았어요',
    vowelHint: 'ㅅ 불규칙 (낫->나았)',
    meanings: {
      en: 'to recover / to get better',
      vi: 'khỏi (bệnh) / đỡ hơn',
      bn: 'সেরে ওঠা',
      zh: '痊愈 / 好转',
      ru: 'выздоравливать',
      ja: '治る / 改善する',
      mn: 'эдгэрэх / дээрдэх',
      ko: '낫다'
    },
    sampleSentence: '감기가 다 나았어요.',
    illustrationSvg: NATDA_NAASSEOYO_SVG,
    emojiIcon: '🩹'
  }
];

const UNIT_10_CARDS: VerbCardItem[] = [
  {
    id: 'u10-1',
    stem: '그리',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '그리다',
    conjugatedWord: '그렸어요',
    vowelHint: '리+었=렸',
    meanings: {
      en: 'to draw / to paint',
      vi: 'vẽ',
      bn: 'আঁকা',
      zh: '画',
      ru: 'рисовать',
      ja: '描く',
      mn: 'зурах',
      ko: '그리다'
    },
    sampleSentence: '그림을 그렸어요.',
    illustrationSvg: GEURIDA_GEURYEOSSEOYO_SVG,
    emojiIcon: '🎨'
  },
  {
    id: 'u10-2',
    stem: '붙이',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '붙이다',
    conjugatedWord: '붙였어요',
    vowelHint: '모음 축약 (이+었=였)',
    meanings: {
      en: 'to stick / to attach',
      vi: 'dán',
      bn: 'আটকানো',
      zh: '贴',
      ru: 'клеить / прикреплять',
      ja: '貼る',
      mn: 'наах',
      ko: '붙이다'
    },
    sampleSentence: '스티커를 붙였어요.',
    illustrationSvg: BUTIDA_BUTYEOSSEOYO_SVG,
    emojiIcon: '⭐'
  },
  {
    id: 'u10-3',
    stem: '까맣',
    ending: '다',
    conjugatedEnding: '았어요',
    baseWord: '까맣다',
    conjugatedWord: '까맸어요',
    vowelHint: 'ㅎ 불규칙 (까맣→까매)',
    meanings: {
      en: 'to be black',
      vi: 'đen',
      bn: 'কালো হওয়া',
      zh: '黑 / 漆黑',
      ru: 'быть чёрным',
      ja: '真っ黒だ',
      mn: 'хар байх',
      ko: '까맣다'
    },
    sampleSentence: '손이 까맸어요.',
    illustrationSvg: KKAMATDA_KKAMAESSEOYO_SVG,
    emojiIcon: '🖤'
  },
  {
    id: 'u10-4',
    stem: '예쁘',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '예쁘다',
    conjugatedWord: '예뻤어요',
    vowelHint: 'ㅡ 탈락 (쁘+었=뻤)',
    meanings: {
      en: 'to be pretty',
      vi: 'đẹp / xinh',
      bn: 'সুন্দর হওয়া',
      zh: '漂亮',
      ru: 'быть красивым',
      ja: 'きれいだ / かわいい',
      mn: 'хөөрхөн байх',
      ko: '예쁘다'
    },
    sampleSentence: '꽃이 참 예뻤어요.',
    illustrationSvg: YEPPEUDA_YEPPEOSSEOYO_SVG,
    emojiIcon: '🌸'
  },
  {
    id: 'u10-5',
    stem: '춥',
    ending: '다',
    conjugatedEnding: '었어요',
    baseWord: '춥다',
    conjugatedWord: '추웠어요',
    vowelHint: '춥+어=추워',
    meanings: {
      en: 'to be cold',
      vi: 'lạnh',
      bn: 'ঠান্ডা লাগা',
      zh: '冷',
      ru: 'быть холодным',
      ja: '寒い',
      mn: 'хүйтэн байх',
      ko: '춥다'
    },
    sampleSentence: '어제 날씨가 추웠어요.',
    illustrationSvg: CHUPDA_CHUWOSSEOYO_SVG,
    emojiIcon: '❄️'
  }
];

// 11단원: [부정1 (안 [용언], 못 [용언])] 5장
const UNIT_11_CARDS: VerbCardItem[] = [
  {
    id: 'u11-1',
    stem: '울',
    ending: '다',
    conjugatedEnding: '어요',
    baseWord: '울다',
    conjugatedWord: '안 울어요',
    vowelHint: '의지 부정 [안] + 어요',
    meanings: {
      en: 'to cry',
      vi: 'khóc',
      bn: 'কাঁদা',
      zh: '哭',
      ru: 'плакать',
      ja: '泣く',
      mn: 'уйлах',
      ko: '울다'
    },
    sampleSentence: '저는 안 울어요.',
    illustrationSvg: ULDA_U11_SVG,
    emojiIcon: '🥲'
  },
  {
    id: 'u11-2',
    stem: '쏟',
    ending: '다',
    conjugatedEnding: '아요',
    baseWord: '쏟다',
    conjugatedWord: '안 쏟아요',
    vowelHint: '의지 부정 [안] + 아요',
    meanings: {
      en: 'to spill',
      vi: 'làm đổ / làm tràn',
      bn: 'ফেলে দেওয়া',
      zh: '洒',
      ru: 'проливать',
      ja: 'こぼす',
      mn: 'асгах',
      ko: '쏟다'
    },
    sampleSentence: '물을 안 쏟아요.',
    illustrationSvg: SSOTDA_U11_SVG,
    emojiIcon: '🥛'
  },
  {
    id: 'u11-3',
    stem: '남기',
    ending: '다',
    conjugatedEnding: '어요',
    conjugatedStem: '남겨',
    baseWord: '남기다',
    conjugatedWord: '안 남겨요',
    vowelHint: '의지 부정 [안] (기+어=겨)',
    meanings: {
      en: 'to leave (food)',
      vi: 'để lại (thức ăn)',
      bn: 'ফেলে রাখা',
      zh: '剩下',
      ru: 'оставлять (еду)',
      ja: '残す',
      mn: 'үлдээх',
      ko: '남기다'
    },
    sampleSentence: '반찬을 안 남겨요.',
    illustrationSvg: NAMGIDA_SVG,
    emojiIcon: '🍱'
  },
  {
    id: 'u11-4',
    stem: '참',
    ending: '다',
    conjugatedEnding: '아요',
    baseWord: '참다',
    conjugatedWord: '못 참아요',
    vowelHint: '상황 부정 [못] + 아요',
    meanings: {
      en: 'to hold back / to endure',
      vi: 'nhịn / chịu đựng',
      bn: 'সহ্য করা',
      zh: '忍',
      ru: 'терпеть',
      ja: '我慢する',
      mn: 'тэвчих',
      ko: '참다'
    },
    sampleSentence: '웃음을 못 참아요.',
    illustrationSvg: CHAMDA_U11_SVG,
    emojiIcon: '🤭'
  },
  {
    id: 'u11-5',
    stem: '던지',
    ending: '다',
    conjugatedEnding: '어요',
    conjugatedStem: '던져',
    baseWord: '던지다',
    conjugatedWord: '못 던져요',
    vowelHint: '능력 부정 [못] (지+어=져)',
    meanings: {
      en: 'to throw',
      vi: 'ném',
      bn: 'ছোঁড়া',
      zh: '扔',
      ru: 'бросать',
      ja: '投げる',
      mn: 'шидэх',
      ko: '던지다'
    },
    sampleSentence: '공을 멀리 못 던져요.',
    illustrationSvg: DEONJIDA_U11_SVG,
    emojiIcon: '⚾'
  }
];

// 12단원: [부정2 ([명사] 안 해요, [명사] 못 해요)] 5장
const UNIT_12_CARDS: VerbCardItem[] = [
  {
    id: 'u12-1',
    stem: '게임',
    ending: '하다',
    conjugatedEnding: '안 해요',
    baseWord: '게임하다',
    conjugatedWord: '게임 안 해요',
    vowelHint: '의지 부정 [명사] 안 해요',
    meanings: { en: 'to play a game', vi: 'chơi trò chơi', bn: 'গেম খেলা', zh: '玩游戏', ru: 'играть в игру', ja: 'ゲームをする', mn: 'тоглоом тоглох', ko: '게임하다' },
    sampleSentence: '게임은 안 해요.',
    illustrationSvg: GEIMHADA_SVG,
    emojiIcon: '🎮'
  },
  {
    id: 'u12-2',
    stem: '줄넘기',
    ending: '하다',
    conjugatedEnding: '못 해요',
    baseWord: '줄넘기하다',
    conjugatedWord: '줄넘기 못 해요',
    vowelHint: '능력 부정 [명사] 못 해요',
    meanings: { en: 'to jump rope', vi: 'nhảy dây', bn: 'দড়ি লাফানো', zh: '跳绳', ru: 'прыгать через скакалку', ja: '縄跳びをする', mn: 'дээс тоглох', ko: '줄넘기하다' },
    sampleSentence: '줄넘기를 못 해요.',
    illustrationSvg: JULNEOMGIHADA_SVG,
    emojiIcon: '🤸'
  },
  {
    id: 'u12-3',
    stem: '요리',
    ending: '하다',
    conjugatedEnding: '못 해요',
    baseWord: '요리하다',
    conjugatedWord: '요리 못 해요',
    vowelHint: '능력 부정 [명사] 못 해요',
    meanings: { en: 'to cook', vi: 'nấu ăn', bn: 'রান্না করা', zh: '做饭', ru: 'готовить', ja: '料理する', mn: 'хоол хийх', ko: '요리하다' },
    sampleSentence: '혼자 요리 못 해요.',
    illustrationSvg: YORIHADA_SVG,
    emojiIcon: '🍳'
  },
  {
    id: 'u12-4',
    stem: '운전',
    ending: '하다',
    conjugatedEnding: '못 해요',
    baseWord: '운전하다',
    conjugatedWord: '운전 못 해요',
    vowelHint: '상황 부정 [명사] 못 해요',
    meanings: { en: 'to drive', vi: 'lái xe', bn: 'গাড়ি চালানো', zh: '开车', ru: 'водить машину', ja: '運転する', mn: 'жолоо барих', ko: '운전하다' },
    sampleSentence: '아직 운전 못 해요.',
    illustrationSvg: UNJEONHADA_SVG,
    emojiIcon: '🚗'
  },
  {
    id: 'u12-5',
    stem: '샤워',
    ending: '하다',
    conjugatedEnding: '안 해요',
    baseWord: '샤워하다',
    conjugatedWord: '샤워 안 해요',
    vowelHint: '의지 부정 [명사] 안 해요',
    meanings: { en: 'to take a shower', vi: 'tắm vòi hoa sen', bn: 'গোসল করা', zh: '淋浴', ru: 'принимать душ', ja: 'シャワーを浴びる', mn: 'шүршүүрт орох', ko: '샤워하다' },
    sampleSentence: '아침에는 샤워 안 해요.',
    illustrationSvg: SHAWEOHADA_SVG,
    emojiIcon: '🚿'
  }
];

// 13단원: [희망 (-고 싶어요)] 5장
const UNIT_13_CARDS: VerbCardItem[] = [
  {
    id: 'u13-1',
    stem: '배우',
    ending: '다',
    conjugatedEnding: '고 싶어요',
    baseWord: '배우다',
    conjugatedWord: '배우고 싶어요',
    vowelHint: '받침 상관없이 [-고 싶어요]',
    meanings: { en: 'to learn', vi: 'học', bn: 'শেখা', zh: '学习', ru: 'учить', ja: '習う', mn: 'сурах', ko: '배우다' },
    sampleSentence: '태권도를 배우고 싶어요.',
    illustrationSvg: BAEUDA_U13_SVG,
    emojiIcon: '🥋'
  },
  {
    id: 'u13-2',
    stem: '만나',
    ending: '다',
    conjugatedEnding: '고 싶어요',
    baseWord: '만나다',
    conjugatedWord: '만나고 싶어요',
    vowelHint: '받침 상관없이 [-고 싶어요]',
    meanings: { en: 'to meet', vi: 'gặp gỡ', bn: 'দেখা করা', zh: '见面', ru: 'встречаться', ja: '会う', mn: 'уулзах', ko: '만나다' },
    sampleSentence: '친구를 만나고 싶어요.',
    illustrationSvg: MANNADA_SVG,
    emojiIcon: '🤝'
  },
  {
    id: 'u13-3',
    stem: '사',
    ending: '다',
    conjugatedEnding: '고 싶어요',
    baseWord: '사다',
    conjugatedWord: '사고 싶어요',
    vowelHint: '받침 상관없이 [-고 싶어요]',
    meanings: { en: 'to buy', vi: 'mua', bn: 'কেনা', zh: '买', ru: 'покупать', ja: '買う', mn: 'худалдан авах', ko: '사다' },
    sampleSentence: '빵을 사고 싶어요.',
    illustrationSvg: SADA_U13_SVG,
    emojiIcon: '🥐'
  },
  {
    id: 'u13-4',
    stem: '여행',
    ending: '하다',
    conjugatedEnding: '하고 싶어요',
    baseWord: '여행하다',
    conjugatedWord: '여행하고 싶어요',
    vowelHint: '‘하다’ + [-고 싶어요]',
    meanings: { en: 'to travel', vi: 'du lịch', bn: 'ভ্রমণ করা', zh: '旅行', ru: 'путешествовать', ja: '旅行する', mn: 'аялах', ko: '여행하다' },
    sampleSentence: '바다로 여행하고 싶어요.',
    illustrationSvg: YEOHAENGHADA_U13_SVG,
    emojiIcon: '🧳'
  },
  {
    id: 'u13-5',
    stem: '잘',
    ending: '하다',
    conjugatedEnding: '하고 싶어요',
    baseWord: '잘하다',
    conjugatedWord: '잘하고 싶어요',
    vowelHint: '‘하다’ + [-고 싶어요]',
    meanings: { en: 'to do well', vi: 'làm giỏi', bn: 'ভালো করা', zh: '擅长 / 做好', ru: 'хорошо делать', ja: '上手にする', mn: 'сайн хийх', ko: '잘하다' },
    sampleSentence: '수학을 잘하고 싶어요.',
    illustrationSvg: JALHADA_SVG,
    emojiIcon: '💯'
  }
];

// 14단원: [진행 (-고 있어요)] 5장
const UNIT_14_CARDS: VerbCardItem[] = [
  {
    id: 'u14-1',
    stem: '일',
    ending: '하다',
    conjugatedEnding: '하고 있어요',
    baseWord: '일하다',
    conjugatedWord: '일하고 있어요',
    vowelHint: '지금 하는 중 [-고 있어요]',
    meanings: { en: 'to work', vi: 'làm việc', bn: 'কাজ করা', zh: '工作', ru: 'работать', ja: '働く', mn: 'ажиллах', ko: '일하다' },
    sampleSentence: '아버지가 일하고 있어요.',
    illustrationSvg: ILHADA_SVG,
    emojiIcon: '💼'
  },
  {
    id: 'u14-2',
    stem: '이야기',
    ending: '하다',
    conjugatedEnding: '하고 있어요',
    baseWord: '이야기하다',
    conjugatedWord: '이야기하고 있어요',
    vowelHint: '지금 하는 중 [-고 있어요]',
    meanings: { en: 'to talk', vi: 'nói chuyện', bn: 'কথা বলা', zh: '谈话', ru: 'разговаривать', ja: '話す', mn: 'ярилцах', ko: '이야기하다' },
    sampleSentence: '친구와 이야기하고 있어요.',
    illustrationSvg: IYAGIHADA_SVG,
    emojiIcon: '💬'
  },
  {
    id: 'u14-3',
    stem: '준비',
    ending: '하다',
    conjugatedEnding: '하고 있어요',
    baseWord: '준비하다',
    conjugatedWord: '준비하고 있어요',
    vowelHint: '지금 하는 중 [-고 있어요]',
    meanings: { en: 'to prepare', vi: 'chuẩn bị', bn: 'প্রস্তুত করা', zh: '准备', ru: 'готовить', ja: '準備する', mn: 'бэлтгэх', ko: '준비하다' },
    sampleSentence: '수업을 준비하고 있어요.',
    illustrationSvg: JUNBIHADA_SVG,
    emojiIcon: '🎒'
  },
  {
    id: 'u14-4',
    stem: '짓',
    ending: '다',
    conjugatedEnding: '고 있어요',
    baseWord: '짓다',
    conjugatedWord: '짓고 있어요',
    vowelHint: '자음 뒤에도 [-고 있어요]',
    meanings: { en: 'to build', vi: 'xây', bn: 'তৈরি করা', zh: '建造', ru: 'строить', ja: '建てる', mn: 'барих', ko: '짓다' },
    sampleSentence: '집을 짓고 있어요.',
    illustrationSvg: JITDA_SVG,
    emojiIcon: '🏠'
  },
  {
    id: 'u14-5',
    stem: '물어보',
    ending: '다',
    conjugatedEnding: '고 있어요',
    baseWord: '물어보다',
    conjugatedWord: '물어보고 있어요',
    vowelHint: '지금 하는 중 [-고 있어요]',
    meanings: { en: 'to ask', vi: 'hỏi', bn: 'জিজ্ঞাসা করা', zh: '询问', ru: 'спрашивать', ja: '尋ねる', mn: 'асуух', ko: '물어보다' },
    sampleSentence: '선생님께 물어보고 있어요.',
    illustrationSvg: MUREOBODA_SVG,
    emojiIcon: '🙋'
  }
];

// 15단원: [요청 (-세요, -으세요)] 5장
const UNIT_15_CARDS: VerbCardItem[] = [
  {
    id: 'u15-1',
    stem: '말',
    ending: '하다',
    conjugatedEnding: '하세요',
    baseWord: '말하다',
    conjugatedWord: '말하세요',
    vowelHint: '받침 없음 → [-세요]',
    meanings: { en: 'to speak', vi: 'nói', bn: 'বলা', zh: '说', ru: 'говорить', ja: '話す', mn: 'ярих', ko: '말하다' },
    sampleSentence: '천천히 말하세요.',
    illustrationSvg: MALHADA_SVG,
    emojiIcon: '🗣️'
  },
  {
    id: 'u15-2',
    stem: '서',
    ending: '다',
    conjugatedEnding: '세요',
    baseWord: '서다',
    conjugatedWord: '서세요',
    vowelHint: '받침 없음 → [-세요]',
    meanings: { en: 'to stand', vi: 'đứng', bn: 'দাঁড়ানো', zh: '站', ru: 'стоять', ja: '立つ', mn: 'зогсох', ko: '서다' },
    sampleSentence: '여기에 서세요.',
    illustrationSvg: SEODA_SVG,
    emojiIcon: '🧍'
  },
  {
    id: 'u15-3',
    stem: '넣',
    ending: '다',
    conjugatedEnding: '으세요',
    baseWord: '넣다',
    conjugatedWord: '넣으세요',
    vowelHint: '받침(ㅎ) 있음 → [-으세요]',
    meanings: { en: 'to put in', vi: 'cho vào', bn: 'ভেতরে রাখা', zh: '放进', ru: 'класть', ja: '入れる', mn: 'хийх', ko: '넣다' },
    sampleSentence: '책을 넣으세요.',
    illustrationSvg: NEOTDA_SVG,
    emojiIcon: '📥'
  },
  {
    id: 'u15-4',
    stem: '걷',
    ending: '다',
    conjugatedEnding: '으세요',
    conjugatedStem: '걸',
    baseWord: '걷다',
    conjugatedWord: '걸으세요',
    vowelHint: 'ㄷ 불규칙 (걷→걸) + [-으세요]',
    meanings: { en: 'to walk', vi: 'đi bộ', bn: 'হাঁটা', zh: '走', ru: 'идти пешком', ja: '歩く', mn: 'алхах', ko: '걷다' },
    sampleSentence: '복도에서 걸으세요.',
    illustrationSvg: GEOTDA_SVG,
    emojiIcon: '🚶'
  },
  {
    id: 'u15-5',
    stem: '풀',
    ending: '다',
    conjugatedEnding: '세요',
    conjugatedStem: '푸',
    baseWord: '풀다',
    conjugatedWord: '푸세요',
    vowelHint: 'ㄹ 탈락 (풀→푸) + [-세요]',
    meanings: { en: 'to solve', vi: 'giải (bài)', bn: 'সমাধান করা', zh: '解答', ru: 'решать', ja: '解く', mn: 'бодох', ko: '풀다' },
    sampleSentence: '문제를 푸세요.',
    illustrationSvg: PULDA_SVG,
    emojiIcon: '✏️'
  }
];

// 16단원: [금지 (-지 마세요)] 5장
const UNIT_16_CARDS: VerbCardItem[] = [
  {
    id: 'u16-1',
    stem: '뛰',
    ending: '다',
    conjugatedEnding: '지 마세요',
    baseWord: '뛰다',
    conjugatedWord: '뛰지 마세요',
    vowelHint: '금지 요청 [-지 마세요]',
    meanings: { en: 'to run', vi: 'chạy', bn: 'দৌড়ানো', zh: '跑', ru: 'бегать', ja: '走る', mn: 'гүйх', ko: '뛰다' },
    sampleSentence: '계단에서 뛰지 마세요.',
    illustrationSvg: TTWIDA_SVG,
    emojiIcon: '🏃'
  },
  {
    id: 'u16-2',
    stem: '만지',
    ending: '다',
    conjugatedEnding: '지 마세요',
    baseWord: '만지다',
    conjugatedWord: '만지지 마세요',
    vowelHint: '금지 요청 [-지 마세요]',
    meanings: { en: 'to touch', vi: 'chạm vào', bn: 'স্পর্শ করা', zh: '摸', ru: 'трогать', ja: '触る', mn: 'хүрэх', ko: '만지다' },
    sampleSentence: '뜨거우니 만지지 마세요.',
    illustrationSvg: MANJIDA_SVG,
    emojiIcon: '✋'
  },
  {
    id: 'u16-3',
    stem: '싸우',
    ending: '다',
    conjugatedEnding: '지 마세요',
    baseWord: '싸우다',
    conjugatedWord: '싸우지 마세요',
    vowelHint: '금지 요청 [-지 마세요]',
    meanings: { en: 'to fight', vi: 'đánh nhau', bn: 'ঝগড়া করা', zh: '吵架', ru: 'ссориться', ja: '喧嘩する', mn: 'хэрэлдэх', ko: '싸우다' },
    sampleSentence: '친구와 싸우지 마세요.',
    illustrationSvg: SSAUDA_SVG,
    emojiIcon: '💢'
  },
  {
    id: 'u16-4',
    stem: '떠들',
    ending: '다',
    conjugatedEnding: '지 마세요',
    baseWord: '떠들다',
    conjugatedWord: '떠들지 마세요',
    vowelHint: 'ㄹ 유지 + [-지 마세요]',
    meanings: { en: 'to make noise', vi: 'làm ồn', bn: 'গোলমাল করা', zh: '吵闹', ru: 'шуметь', ja: '騒ぐ', mn: 'шуугих', ko: '떠들다' },
    sampleSentence: '도서관에서 떠들지 마세요.',
    illustrationSvg: TTEODEULDA_SVG,
    emojiIcon: '🤫'
  },
  {
    id: 'u16-5',
    stem: '버리',
    ending: '다',
    conjugatedEnding: '지 마세요',
    baseWord: '버리다',
    conjugatedWord: '버리지 마세요',
    vowelHint: '금지 요청 [-지 마세요]',
    meanings: { en: 'to throw away', vi: 'vứt bỏ', bn: 'ফেলে দেওয়া', zh: '扔掉', ru: 'выбрасывать', ja: '捨てる', mn: 'хаях', ko: '버리다' },
    sampleSentence: '쓰레기를 버리지 마세요.',
    illustrationSvg: BEORIDA_SVG,
    emojiIcon: '🗑️'
  }
];

// 17단원: [미래 (-ㄹ 거예요, -을 거예요)] 5장
const UNIT_17_CARDS: VerbCardItem[] = [
  {
    id: 'u17-1',
    stem: '가져오',
    ending: '다',
    conjugatedEnding: 'ㄹ 거예요',
    baseWord: '가져오다',
    conjugatedWord: '가져올 거예요',
    vowelHint: '받침 없음 (오+ㄹ=올) 거예요',
    meanings: { en: 'to bring', vi: 'mang đến', bn: 'নিয়ে আসা', zh: '带来', ru: 'приносить', ja: '持ってくる', mn: 'авчрах', ko: '가져오다' },
    sampleSentence: '준비물을 가져올 거예요.',
    illustrationSvg: GAJYEO_ODA_SVG,
    emojiIcon: '🎒'
  },
  {
    id: 'u17-2',
    stem: '끝나',
    ending: '다',
    conjugatedEnding: 'ㄹ 거예요',
    baseWord: '끝나다',
    conjugatedWord: '끝날 거예요',
    vowelHint: '받침 없음 (나+ㄹ=날) 거예요',
    meanings: { en: 'to finish', vi: 'kết thúc', bn: 'শেষ হওয়া', zh: '结束', ru: 'заканчиваться', ja: '終わる', mn: 'дуусах', ko: '끝나다' },
    sampleSentence: '수업이 곧 끝날 거예요.',
    illustrationSvg: KKEUTNADA_SVG,
    emojiIcon: '⏰'
  },
  {
    id: 'u17-3',
    stem: '살',
    ending: '다',
    conjugatedEnding: ' 거예요',
    baseWord: '살다',
    conjugatedWord: '살 거예요',
    vowelHint: 'ㄹ 받침 그대로 [살 거예요]',
    meanings: { en: 'to live', vi: 'sống', bn: 'বাস করা', zh: '居住', ru: 'жить', ja: '住む', mn: 'амьдрах', ko: '살다' },
    sampleSentence: '한국에서 살 거예요.',
    illustrationSvg: SALDA_SVG,
    emojiIcon: '🏡'
  },
  {
    id: 'u17-4',
    stem: '놓',
    ending: '다',
    conjugatedEnding: '을 거예요',
    baseWord: '놓다',
    conjugatedWord: '놓을 거예요',
    vowelHint: '받침(ㅎ) 있음 → [-을 거예요]',
    meanings: { en: 'to put / to place', vi: 'đặt / để', bn: 'রাখা', zh: '放', ru: 'класть', ja: '置く', mn: 'тавих', ko: '놓다' },
    sampleSentence: '가방을 놓을 거예요.',
    illustrationSvg: NOTDA_SVG,
    emojiIcon: '👜'
  },
  {
    id: 'u17-5',
    stem: '일어나',
    ending: '다',
    conjugatedEnding: 'ㄹ 거예요',
    baseWord: '일어나다',
    conjugatedWord: '일어날 거예요',
    vowelHint: '받침 없음 (나+ㄹ=날) 거예요',
    meanings: { en: 'to wake up', vi: 'thức dậy', bn: 'ঘুম থেকে ওঠা', zh: '起床', ru: 'вставать', ja: '起きる', mn: 'босох', ko: '일어나다' },
    sampleSentence: '일찍 일어날 거예요.',
    illustrationSvg: IREONADA_SVG,
    emojiIcon: '🌅'
  }
];

// 18단원: [부탁 (-아 주세요, -어 주세요, -해 주세요)] 5장
const UNIT_18_CARDS: VerbCardItem[] = [
  {
    id: 'u18-1',
    stem: '기다리',
    ending: '다',
    conjugatedEnding: ' 주세요',
    baseWord: '기다리다',
    conjugatedWord: '기다려 주세요',
    vowelHint: '모음 축약 (리+어=려) 주세요',
    meanings: { en: 'to wait', vi: 'chờ đợi', bn: 'অপেক্ষা করা', zh: '等', ru: 'ждать', ja: '待つ', mn: 'хүлээх', ko: '기다리다' },
    sampleSentence: '조금 기다려 주세요.',
    illustrationSvg: GIDARIDA_SVG,
    emojiIcon: '⏳'
  },
  {
    id: 'u18-2',
    stem: '설명',
    ending: '하다',
    conjugatedEnding: '해 주세요',
    baseWord: '설명하다',
    conjugatedWord: '설명해 주세요',
    vowelHint: '‘하다’ → [-해 주세요]',
    meanings: { en: 'to explain', vi: 'giải thích', bn: 'ব্যাখ্যা করা', zh: '解释', ru: 'объяснять', ja: '説明する', mn: 'тайлбарлах', ko: '설명하다' },
    sampleSentence: '다시 설명해 주세요.',
    illustrationSvg: SEOLMYEONGHADA_SVG,
    emojiIcon: '👩‍🏫'
  },
  {
    id: 'u18-3',
    stem: '깎',
    ending: '다',
    conjugatedEnding: '아 주세요',
    baseWord: '깎다',
    conjugatedWord: '깎아 주세요',
    vowelHint: 'ㅏ 발견 → [-아 주세요]',
    meanings: { en: 'to sharpen', vi: 'gọt', bn: 'ধারালো করা', zh: '削', ru: 'точить', ja: '削る', mn: 'үзүүрлэх', ko: '깎다' },
    sampleSentence: '연필을 깎아 주세요.',
    illustrationSvg: KKAKDA_SVG,
    emojiIcon: '✏️'
  },
  {
    id: 'u18-4',
    stem: '켜',
    ending: '다',
    conjugatedEnding: ' 주세요',
    baseWord: '켜다',
    conjugatedWord: '켜 주세요',
    vowelHint: 'ㅓ 계열(켜) + [ 주세요]',
    meanings: { en: 'to turn on', vi: 'bật', bn: 'চালু করা', zh: '开', ru: 'включать', ja: 'つける', mn: 'асаах', ko: '켜다' },
    sampleSentence: '불을 켜 주세요.',
    illustrationSvg: KYEODA_SVG,
    emojiIcon: '💡'
  },
  {
    id: 'u18-5',
    stem: '끄',
    ending: '다',
    conjugatedEnding: ' 주세요',
    baseWord: '끄다',
    conjugatedWord: '꺼 주세요',
    vowelHint: 'ㅡ 탈락 (끄+어=꺼) 주세요',
    meanings: { en: 'to turn off', vi: 'tắt', bn: 'বন্ধ করা', zh: '关', ru: 'выключать', ja: '消す', mn: 'унтраах', ko: '끄다' },
    sampleSentence: '불을 꺼 주세요.',
    illustrationSvg: KKEUDA_SVG,
    emojiIcon: '🌙'
  }
];

// 19단원: [허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?)] 5장
const UNIT_19_CARDS: VerbCardItem[] = [
  {
    id: 'u19-1',
    stem: '들어가',
    ending: '다',
    conjugatedEnding: '도 돼요?',
    baseWord: '들어가다',
    conjugatedWord: '들어가도 돼요?',
    vowelHint: 'ㅏ 포함 → [가도 돼요?]',
    meanings: { en: 'to enter', vi: 'đi vào', bn: 'ভেতরে যাওয়া', zh: '进去', ru: 'входить', ja: '入る', mn: 'орох', ko: '들어가다' },
    sampleSentence: '교실에 들어가도 돼요?',
    illustrationSvg: DEUREOGADA_SVG,
    emojiIcon: '🚪'
  },
  {
    id: 'u19-2',
    stem: '나가',
    ending: '다',
    conjugatedEnding: '도 돼요?',
    baseWord: '나가다',
    conjugatedWord: '나가도 돼요?',
    vowelHint: 'ㅏ 포함 → [가도 돼요?]',
    meanings: { en: 'to go out', vi: 'đi ra', bn: 'বাইরে যাওয়া', zh: '出去', ru: 'выходить', ja: '出る', mn: 'гарах', ko: '나가다' },
    sampleSentence: '밖으로 나가도 돼요?',
    illustrationSvg: NAGADA_SVG,
    emojiIcon: '🚶‍♂️'
  },
  {
    id: 'u19-3',
    stem: '빌리',
    ending: '다',
    conjugatedEnding: '도 돼요?',
    baseWord: '빌리다',
    conjugatedWord: '빌려도 돼요?',
    vowelHint: '모음 축약 (리+어=려) 도 돼요?',
    meanings: { en: 'to borrow', vi: 'mượn', bn: 'ধার করা', zh: '借', ru: 'одалживать', ja: '借りる', mn: 'зээлэх', ko: '빌리다' },
    sampleSentence: '색연필을 빌려도 돼요?',
    illustrationSvg: BILLIDA_U19_SVG,
    emojiIcon: '🖍️'
  },
  {
    id: 'u19-4',
    stem: '사용',
    ending: '하다',
    conjugatedEnding: '해도 돼요?',
    baseWord: '사용하다',
    conjugatedWord: '사용해도 돼요?',
    vowelHint: '‘하다’ → [-해도 돼요?]',
    meanings: { en: 'to use', vi: 'sử dụng', bn: 'ব্যবহার করা', zh: '使用', ru: 'использовать', ja: '使う', mn: 'хэрэглэх', ko: '사용하다' },
    sampleSentence: '가위를 사용해도 돼요?',
    illustrationSvg: SAYONGHADA_SVG,
    emojiIcon: '✂️'
  },
  {
    id: 'u19-5',
    stem: '움직이',
    ending: '다',
    conjugatedEnding: '도 돼요?',
    baseWord: '움직이다',
    conjugatedWord: '움직여도 돼요?',
    vowelHint: '모음 축약 (이+어=여) 도 돼요?',
    meanings: { en: 'to move', vi: 'di chuyển / cử động', bn: 'নড়াচড়া করা', zh: '动 / 移动', ru: 'двигаться', ja: '動く', mn: 'хөдлөх', ko: '움직이다' },
    sampleSentence: '자리에서 움직여도 돼요?',
    illustrationSvg: UMJIGIDA_SVG,
    emojiIcon: '🪑'
  }
];

// 20단원: [의무 (-아야 돼요, -어야 돼요, -해야 돼요)] 5장
const UNIT_20_CARDS: VerbCardItem[] = [
  {
    id: 'u20-1',
    stem: '조심',
    ending: '하다',
    conjugatedEnding: '해야 돼요',
    baseWord: '조심하다',
    conjugatedWord: '조심해야 돼요',
    vowelHint: '‘하다’ → [-해야 돼요]',
    meanings: { en: 'to be careful', vi: 'cẩn thận', bn: 'সাবধান হওয়া', zh: '小心', ru: 'быть осторожным', ja: '気をつける', mn: 'болгоомжлох', ko: '조심하다' },
    sampleSentence: '계단에서 조심해야 돼요.',
    illustrationSvg: JOSIMHADA_SVG,
    emojiIcon: '⚠️'
  },
  {
    id: 'u20-2',
    stem: '남',
    ending: '다',
    conjugatedEnding: '아야 돼요',
    baseWord: '남다',
    conjugatedWord: '남아야 돼요',
    vowelHint: 'ㅏ 발견 → [-아야 돼요]',
    meanings: { en: 'to stay', vi: 'ở lại', bn: 'থাকা', zh: '留下', ru: 'оставаться', ja: '残る', mn: 'үлдэх', ko: '남다' },
    sampleSentence: '교실에 남아야 돼요.',
    illustrationSvg: NAMDA_SVG,
    emojiIcon: '🏫'
  },
  {
    id: 'u20-3',
    stem: '꺼내',
    ending: '다',
    conjugatedEnding: '야 돼요',
    baseWord: '꺼내다',
    conjugatedWord: '꺼내야 돼요',
    vowelHint: 'ㅐ(ㅏ/ㅗ 아님) → [-야 돼요]',
    meanings: { en: 'to take out', vi: 'lấy ra', bn: 'বের করা', zh: '拿出', ru: 'доставать', ja: '取り出す', mn: 'гаргах', ko: '꺼내다' },
    sampleSentence: '공책을 꺼내야 돼요.',
    illustrationSvg: KKEONAEDA_SVG,
    emojiIcon: '📓'
  },
  {
    id: 'u20-4',
    stem: '지키',
    ending: '다',
    conjugatedEnding: '야 돼요',
    baseWord: '지키다',
    conjugatedWord: '지켜야 돼요',
    vowelHint: '모음 축약 (키+어=켜) 야 돼요',
    meanings: { en: 'to keep / to follow', vi: 'tuân thủ', bn: 'মেনে চলা', zh: '遵守', ru: 'соблюдать', ja: '守る', mn: 'сахих', ko: '지키다' },
    sampleSentence: '규칙을 지켜야 돼요.',
    illustrationSvg: JIKIDA_SVG,
    emojiIcon: '🚦'
  },
  {
    id: 'u20-5',
    stem: '바르',
    ending: '다',
    conjugatedEnding: '야 돼요',
    baseWord: '바르다',
    conjugatedWord: '발라야 돼요',
    vowelHint: '르 불규칙 (바르+아=발라) 야 돼요',
    meanings: { en: 'to apply (ointment)', vi: 'bôi (thuốc)', bn: 'মাখা / লাগানো', zh: '涂抹', ru: 'мазать', ja: '塗る', mn: 'түрхэх', ko: '바르다' },
    sampleSentence: '손에 약을 발라야 돼요.',
    illustrationSvg: BAREUDA_U20_SVG,
    emojiIcon: '🩹'
  }
];

// 21단원: [능력 (-ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요)] 5장
const UNIT_21_CARDS: VerbCardItem[] = [
  {
    id: 'u21-1',
    stem: '건너',
    ending: '다',
    conjugatedEnding: 'ㄹ 수 있어요',
    baseWord: '건너다',
    conjugatedWord: '건널 수 있어요',
    vowelHint: '받침 없음 → [-ㄹ 수 있어요]',
    meanings: { en: 'to cross', vi: 'băng qua', bn: 'পার হওয়া', zh: '穿过 / 过马路', ru: 'переходить', ja: '渡る', mn: 'гарах', ko: '건너다' },
    sampleSentence: '초록불에 건널 수 있어요.',
    illustrationSvg: GEONNEODA_SVG,
    emojiIcon: '🚦'
  },
  {
    id: 'u21-2',
    stem: '날',
    ending: '다',
    conjugatedEnding: ' 수 있어요',
    baseWord: '날다',
    conjugatedWord: '날 수 있어요',
    vowelHint: 'ㄹ 받침 → [- 수 있어요]',
    meanings: { en: 'to fly', vi: 'bay', bn: 'ওড়া', zh: '飞', ru: 'летать', ja: '飛ぶ', mn: 'нисэх', ko: '날다' },
    sampleSentence: '새가 날 수 있어요.',
    illustrationSvg: NALDA_SVG,
    emojiIcon: '🕊️'
  },
  {
    id: 'u21-3',
    stem: '접',
    ending: '다',
    conjugatedEnding: '을 수 있어요',
    baseWord: '접다',
    conjugatedWord: '접을 수 있어요',
    vowelHint: 'ㅂ 받침 → [-을 수 있어요]',
    meanings: { en: 'to fold', vi: 'gấp', bn: 'ভাঁজ করা', zh: '折 / 叠', ru: 'складывать', ja: '折る', mn: 'эвхэх', ko: '접다' },
    sampleSentence: '종이를 접을 수 있어요.',
    illustrationSvg: JEOPDA_SVG,
    emojiIcon: '📄'
  },
  {
    id: 'u21-4',
    stem: '밟',
    ending: '다',
    conjugatedEnding: '을 수 없어요',
    baseWord: '밟다',
    conjugatedWord: '밟을 수 없어요',
    vowelHint: 'ㄼ 받침 → [-을 수 없어요]',
    meanings: { en: 'to step on', vi: 'giẫm lên', bn: 'পা দেওয়া', zh: '踩', ru: 'наступать', ja: '踏む', mn: 'гишгэх', ko: '밟다' },
    sampleSentence: '잔디를 밟을 수 없어요.',
    illustrationSvg: BALBDA_U21_SVG,
    emojiIcon: '🌱'
  },
  {
    id: 'u21-5',
    stem: '올리',
    ending: '다',
    conjugatedEnding: 'ㄹ 수 없어요',
    baseWord: '올리다',
    conjugatedWord: '올릴 수 없어요',
    vowelHint: '받침 없음 → [-ㄹ 수 없어요]',
    meanings: { en: 'to raise / to lift', vi: 'giơ lên', bn: 'তোলা', zh: '举起 / 抬起', ru: 'поднимать', ja: '上げる', mn: 'өргөх', ko: '올리다' },
    sampleSentence: '팔을 올릴 수 없어요.',
    illustrationSvg: OLLIDA_U21_SVG,
    emojiIcon: '🙋'
  }
];

// 22단원: [제안 (-ㄹ까요?, -을까요?)] 5장
const UNIT_22_CARDS: VerbCardItem[] = [
  {
    id: 'u22-1',
    stem: '나누',
    ending: '다',
    conjugatedEnding: 'ㄹ까요?',
    baseWord: '나누다',
    conjugatedWord: '나눌까요?',
    vowelHint: '받침 없음 → [-ㄹ까요?]',
    meanings: { en: 'to divide / to share', vi: 'chia', bn: 'ভাগ করা', zh: '分 / 划分', ru: 'делить', ja: '分ける', mn: 'хуваах', ko: '나누다' },
    sampleSentence: '카드를 둘로 나눌까요?',
    illustrationSvg: NANUUDA_U22_SVG,
    emojiIcon: '🃏'
  },
  {
    id: 'u22-2',
    stem: '바꾸',
    ending: '다',
    conjugatedEnding: 'ㄹ까요?',
    baseWord: '바꾸다',
    conjugatedWord: '바꿀까요?',
    vowelHint: '받침 없음 → [-ㄹ까요?]',
    meanings: { en: 'to change / to swap', vi: 'đổi', bn: 'বদলানো', zh: '换 / 交换', ru: 'менять', ja: '変える', mn: 'солих', ko: '바꾸다' },
    sampleSentence: '자리를 바꿀까요?',
    illustrationSvg: BAKKUDA_U22_SVG,
    emojiIcon: '🔄'
  },
  {
    id: 'u22-3',
    stem: '모이',
    ending: '다',
    conjugatedEnding: 'ㄹ까요?',
    baseWord: '모이다',
    conjugatedWord: '모일까요?',
    vowelHint: '받침 없음 → [-ㄹ까요?]',
    meanings: { en: 'to gather', vi: 'tập hợp', bn: 'জড়ো হওয়া', zh: '集合 / 聚集', ru: 'собираться', ja: '集まる', mn: 'цугларах', ko: '모이다' },
    sampleSentence: '강당에 모일까요?',
    illustrationSvg: MOIDA_SVG,
    emojiIcon: '🏫'
  },
  {
    id: 'u22-4',
    stem: '더',
    ending: '하다',
    conjugatedEnding: '할까요?',
    baseWord: '더하다',
    conjugatedWord: '더할까요?',
    vowelHint: '‘하다’ → [-할까요?]',
    meanings: { en: 'to add', vi: 'cộng thêm', bn: 'যোগ করা', zh: '加 / 加上', ru: 'прибавлять', ja: '足す', mn: 'нэмэх', ko: '더하다' },
    sampleSentence: '3을 더할까요?',
    illustrationSvg: DEOHADA_SVG,
    emojiIcon: '➕'
  },
  {
    id: 'u22-5',
    stem: '빼',
    ending: '다',
    conjugatedEnding: 'ㄹ까요?',
    baseWord: '빼다',
    conjugatedWord: '뺄까요?',
    vowelHint: '받침 없음 → [-ㄹ까요?]',
    meanings: { en: 'to subtract', vi: 'trừ đi', bn: 'বিয়োগ করা', zh: '减 / 减去', ru: 'вычитать', ja: '引く', mn: 'хасах', ko: '빼다' },
    sampleSentence: '1을 뺄까요?',
    illustrationSvg: PPAEDA_SVG,
    emojiIcon: '➖'
  }
];

// 23단원: [나열 (-고)] 5장
const UNIT_23_CARDS: VerbCardItem[] = [
  {
    id: 'u23-1',
    stem: '세수',
    ending: '하다',
    conjugatedEnding: '하고',
    baseWord: '세수하다',
    conjugatedWord: '세수하고',
    vowelHint: '‘하다’ → [-하고]',
    meanings: { en: 'to wash one’s face', vi: 'rửa mặt', bn: 'মুখ ধোয়া', zh: '洗脸', ru: 'умываться', ja: '顔を洗う', mn: 'нүүрээ угаах', ko: '세수하다' },
    sampleSentence: '세수하고 밥 먹어요.',
    illustrationSvg: SESUHADA_U23_SVG,
    emojiIcon: '🧼'
  },
  {
    id: 'u23-2',
    stem: '펴',
    ending: '다',
    conjugatedEnding: '고',
    baseWord: '펴다',
    conjugatedWord: '펴고',
    vowelHint: '모음/받침 무관 → [-고]',
    meanings: { en: 'to open / to spread', vi: 'mở ra', bn: 'মেলা / খোলা', zh: '翻开 / 展开', ru: 'открывать', ja: '広げる / 開く', mn: 'дэлгэх', ko: '펴다' },
    sampleSentence: '책을 펴고 읽어요.',
    illustrationSvg: PYEODA_SVG,
    emojiIcon: '📖'
  },
  {
    id: 'u23-3',
    stem: '챙기',
    ending: '다',
    conjugatedEnding: '고',
    baseWord: '챙기다',
    conjugatedWord: '챙기고',
    vowelHint: '모음/받침 무관 → [-고]',
    meanings: { en: 'to pack / to take along', vi: 'chuẩn bị / mang theo', bn: 'গুছিয়ে নেওয়া', zh: '带上 / 整理', ru: 'собирать', ja: '用意する / 持っていく', mn: 'бэлдэх / авах', ko: '챙기다' },
    sampleSentence: '물을 챙기고 간식도 챙겨요.',
    illustrationSvg: CHAENG_GIDA_U23_SVG,
    emojiIcon: '🎒'
  },
  {
    id: 'u23-4',
    stem: '치우',
    ending: '다',
    conjugatedEnding: '고',
    baseWord: '치우다',
    conjugatedWord: '치우고',
    vowelHint: '모음/받침 무관 → [-고]',
    meanings: { en: 'to tidy up / to clean', vi: 'dọn dẹp', bn: 'পরিষ্কার করা', zh: '收拾 / 整理', ru: 'убирать', ja: '片付ける', mn: 'цэвэрлэх', ko: '치우다' },
    sampleSentence: '책상을 치우고 공부해요.',
    illustrationSvg: CHIUDA_SVG,
    emojiIcon: '🧹'
  },
  {
    id: 'u23-5',
    stem: '좋아',
    ending: '하다',
    conjugatedEnding: '하고',
    baseWord: '좋아하다',
    conjugatedWord: '좋아하고',
    vowelHint: '‘하다’ → [-하고]',
    meanings: { en: 'to like', vi: 'thích', bn: 'পছন্দ করা', zh: '喜欢', ru: 'нравиться / любить', ja: '好きだ', mn: 'дуртай байх', ko: '좋아하다' },
    sampleSentence: '사탕도 좋아하고 젤리도 좋아해요.',
    illustrationSvg: JOAHADA_U23_SVG,
    emojiIcon: '🍬'
  }
];

// 24단원: [대조 (-지만)] 5장
const UNIT_24_CARDS: VerbCardItem[] = [
  {
    id: 'u24-1',
    stem: '어렵',
    ending: '다',
    conjugatedEnding: '지만',
    baseWord: '어렵다',
    conjugatedWord: '어렵지만',
    vowelHint: '모음/받침 무관 → [-지만]',
    meanings: { en: 'to be difficult', vi: 'khó', bn: 'কঠিন', zh: '难', ru: 'трудный', ja: '難しい', mn: 'хэцүү', ko: '어렵다' },
    sampleSentence: '수학은 어렵지만 재미있어요.',
    illustrationSvg: EORYEOPDA_U24_SVG,
    emojiIcon: '🧮'
  },
  {
    id: 'u24-2',
    stem: '슬프',
    ending: '다',
    conjugatedEnding: '지만',
    baseWord: '슬프다',
    conjugatedWord: '슬프지만',
    vowelHint: '모음/받침 무관 → [-지만]',
    meanings: { en: 'to be sad', vi: 'buồn', bn: 'দুঃখিত', zh: '伤心 / 难过', ru: 'грустный', ja: '悲しい', mn: 'гунигтай', ko: '슬프다' },
    sampleSentence: '슬프지만 꾹 참아요.',
    illustrationSvg: SEULPEUDA_U24_SVG,
    emojiIcon: '😢'
  },
  {
    id: 'u24-3',
    stem: '무겁',
    ending: '다',
    conjugatedEnding: '지만',
    baseWord: '무겁다',
    conjugatedWord: '무겁지만',
    vowelHint: '모음/받침 무관 → [-지만]',
    meanings: { en: 'to be heavy', vi: 'nặng', bn: 'ভারী', zh: '重', ru: 'тяжёлый', ja: '重い', mn: 'хүнд', ko: '무겁다' },
    sampleSentence: '이 가방은 무겁지만 예뻐요.',
    illustrationSvg: MUGEOPDA_U24_SVG,
    emojiIcon: '🎒'
  },
  {
    id: 'u24-4',
    stem: '멀',
    ending: '다',
    conjugatedEnding: '지만',
    baseWord: '멀다',
    conjugatedWord: '멀지만',
    vowelHint: '모음/받침 무관 → [-지만]',
    meanings: { en: 'to be far', vi: 'xa', bn: 'দূরে', zh: '远', ru: 'далёкий', ja: '遠い', mn: 'хол', ko: '멀다' },
    sampleSentence: '학교는 멀지만 재밌어요.',
    illustrationSvg: MEOLDA_SVG,
    emojiIcon: '🏫'
  },
  {
    id: 'u24-5',
    stem: '틀리',
    ending: '다',
    conjugatedEnding: '지만',
    baseWord: '틀리다',
    conjugatedWord: '틀리지만',
    vowelHint: '모음/받침 무관 → [-지만]',
    meanings: { en: 'to be wrong', vi: 'sai', bn: 'ভুল হওয়া', zh: '错', ru: 'ошибаться', ja: '間違える', mn: 'буруу хийх', ko: '틀리다' },
    sampleSentence: '자주 틀리지만 괜찮아요.',
    illustrationSvg: TEULLIDA_SVG,
    emojiIcon: '✏️'
  }
];

// 25단원: [이유 (-아서, -어서, -해서)] 5장
const UNIT_25_CARDS: VerbCardItem[] = [
  {
    id: 'u25-1',
    stem: '배고프',
    ending: '다',
    conjugatedEnding: '아서',
    baseWord: '배고프다',
    conjugatedWord: '배고파서',
    vowelHint: 'ㅡ 탈락 + ㅏ 발견 → [배고파]서',
    meanings: { en: 'to be hungry', vi: 'đói bụng', bn: 'ক্ষুধার্ত', zh: '饿', ru: 'голодный', ja: 'お腹が空く', mn: 'өлсөх', ko: '배고프다' },
    sampleSentence: '배고파서 많이 먹었어요.',
    illustrationSvg: BAEGOPEUDA_SVG,
    emojiIcon: '🍚'
  },
  {
    id: 'u25-2',
    stem: '늦',
    ending: '다',
    conjugatedEnding: '어서',
    baseWord: '늦다',
    conjugatedWord: '늦어서',
    vowelHint: 'ㅡ(ㅏ/ㅗ 아님) → [-어서]',
    meanings: { en: 'to be late', vi: 'muộn', bn: 'দেরি হওয়া', zh: '迟到 / 晚', ru: 'опаздывать', ja: '遅れる', mn: 'хоцрох', ko: '늦다' },
    sampleSentence: '늦어서 뛰었어요.',
    illustrationSvg: NEUTDA_SVG,
    emojiIcon: '⏰'
  },
  {
    id: 'u25-3',
    stem: '덥',
    ending: '다',
    conjugatedEnding: '어서',
    baseWord: '덥다',
    conjugatedWord: '더워서',
    vowelHint: 'ㅂ 불규칙 (덥+어=더워) 서',
    meanings: { en: 'to be hot', vi: 'nóng', bn: 'গরম লাগা', zh: '热', ru: 'жарко', ja: '暑い', mn: 'халуун байх', ko: '덥다' },
    sampleSentence: '더워서 에어컨을 켰어요.',
    illustrationSvg: DEOPDA_U25_SVG,
    emojiIcon: '☀️'
  },
  {
    id: 'u25-4',
    stem: '빠르',
    ending: '다',
    conjugatedEnding: '아서',
    baseWord: '빠르다',
    conjugatedWord: '빨라서',
    vowelHint: '르 불규칙 (빠르+아=빨라) 서',
    meanings: { en: 'to be fast', vi: 'nhanh', bn: 'দ্রুত', zh: '快', ru: 'быстрый', ja: '速い', mn: 'хурдан', ko: '빠르다' },
    sampleSentence: '기차는 빨라서 좋아요.',
    illustrationSvg: PPAREUDA_U25_SVG,
    emojiIcon: '🚄'
  },
  {
    id: 'u25-5',
    stem: '다치',
    ending: '다',
    conjugatedEnding: '어서',
    baseWord: '다치다',
    conjugatedWord: '다쳐서',
    vowelHint: '모음 축약 (치+어=쳐) 서',
    meanings: { en: 'to get hurt', vi: 'bị thương', bn: 'আঘাত পাওয়া', zh: '受伤', ru: 'пораниться', ja: '怪我をする', mn: 'бэртэх', ko: '다치다' },
    sampleSentence: '다쳐서 보건실에 갔어요.',
    illustrationSvg: DACHIDA_SVG,
    emojiIcon: '🩹'
  }
];

// 26단원: [조건 (-면, -으면)] 5장
const UNIT_26_CARDS: VerbCardItem[] = [
  {
    id: 'u26-1',
    stem: '필요',
    ending: '하다',
    conjugatedEnding: '하면',
    baseWord: '필요하다',
    conjugatedWord: '필요하면',
    vowelHint: '‘하다’ → [-하면]',
    meanings: { en: 'to need', vi: 'cần', bn: 'প্রয়োজন হওয়া', zh: '需要', ru: 'нуждаться', ja: '必要だ', mn: 'хэрэгтэй байх', ko: '필요하다' },
    sampleSentence: '도움이 필요하면 말하세요.',
    illustrationSvg: PIRLYOHADA_SVG,
    emojiIcon: '🤝'
  },
  {
    id: 'u26-2',
    stem: '그렇',
    ending: '다',
    conjugatedEnding: '면',
    baseWord: '그렇다',
    conjugatedWord: '그러면',
    vowelHint: 'ㅎ 불규칙 (ㅎ과 으 탈락)',
    meanings: { en: 'to be so / like that', vi: 'như thế / vậy', bn: 'তেমন হওয়া', zh: '那样', ru: 'быть таким', ja: 'そうだ', mn: 'тийм байх', ko: '그렇다' },
    sampleSentence: '그러면 안 돼요.',
    illustrationSvg: GEUREOTA_GEUREOMYEON_SVG,
    emojiIcon: '🙅'
  },
  {
    id: 'u26-3',
    stem: '궁금',
    ending: '하다',
    conjugatedEnding: '하면',
    baseWord: '궁금하다',
    conjugatedWord: '궁금하면',
    vowelHint: '‘하다’ → [-하면]',
    meanings: { en: 'to be curious', vi: 'tò mò / thắc mắc', bn: 'কৌতূহলী হওয়া', zh: '好奇 / 想知道', ru: 'любопытствовать', ja: '気になる', mn: 'сонирхох', ko: '궁금하다' },
    sampleSentence: '궁금하면 물어보세요.',
    illustrationSvg: GUNGGUMHADA_SVG,
    emojiIcon: '❓'
  },
  {
    id: 'u26-4',
    stem: '힘들',
    ending: '다',
    conjugatedEnding: '면',
    baseWord: '힘들다',
    conjugatedWord: '힘들면',
    vowelHint: 'ㄹ 받침 → [-면]',
    meanings: { en: 'to be tired / hard', vi: 'mệt / vất vả', bn: 'কষ্টকর / ক্লান্ত', zh: '累 / 辛苦', ru: 'уставать / тяжело', ja: '大変だ / 疲れる', mn: 'ядрах / хэцүү', ko: '힘들다' },
    sampleSentence: '힘들면 쉬어요.',
    illustrationSvg: HIMDEULDA_SVG,
    emojiIcon: '😮‍💨'
  },
  {
    id: 'u26-5',
    stem: '작',
    ending: '다',
    conjugatedEnding: '으면',
    baseWord: '작다',
    conjugatedWord: '작으면',
    vowelHint: 'ㄱ 받침 → [-으면]',
    meanings: { en: 'to be small', vi: 'nhỏ', bn: 'ছোট', zh: '小', ru: 'маленький', ja: '小さい', mn: 'жижиг', ko: '작다' },
    sampleSentence: '작으면 이걸로 바꿔요.',
    illustrationSvg: JAKDA_SVG,
    emojiIcon: '👕'
  }
];

// 27단원: [시간 (-ㄹ 때, -을 때)] 5장
const UNIT_27_CARDS: VerbCardItem[] = [
  {
    id: 'u27-1',
    stem: '발표',
    ending: '하다',
    conjugatedEnding: '할 때',
    baseWord: '발표하다',
    conjugatedWord: '발표할 때',
    vowelHint: '‘하다’ → [-할 때]',
    meanings: { en: 'to present', vi: 'phát biểu', bn: 'উপস্থাপন করা', zh: '发言 / 发表', ru: 'выступать', ja: '発表する', mn: 'илтгэх', ko: '발표하다' },
    sampleSentence: '발표할 때 손들어요.',
    illustrationSvg: BALPYOHADA_SVG,
    emojiIcon: '🙋'
  },
  {
    id: 'u27-2',
    stem: '출발',
    ending: '하다',
    conjugatedEnding: '할 때',
    baseWord: '출발하다',
    conjugatedWord: '출발할 때',
    vowelHint: '‘하다’ → [-할 때]',
    meanings: { en: 'to depart', vi: 'xuất phát', bn: 'রওনা হওয়া', zh: '出发', ru: 'отправляться', ja: '出発する', mn: 'хөдлөх', ko: '출발하다' },
    sampleSentence: '출발할 때 연락해요.',
    illustrationSvg: CHULBALHADA_SVG,
    emojiIcon: '🚌'
  },
  {
    id: 'u27-3',
    stem: '졸리',
    ending: '다',
    conjugatedEnding: 'ㄹ 때',
    baseWord: '졸리다',
    conjugatedWord: '졸릴 때',
    vowelHint: '받침 없음 → [-ㄹ 때]',
    meanings: { en: 'to feel sleepy', vi: 'buồn ngủ', bn: 'ঘুম পাওয়া', zh: '困', ru: 'хотеть спать', ja: '眠い', mn: 'нойр хүрэх', ko: '졸리다' },
    sampleSentence: '졸릴 때 하품이 나요.',
    illustrationSvg: JOLLIDA_U27_SVG,
    emojiIcon: '🥱'
  },
  {
    id: 'u27-4',
    stem: '벗',
    ending: '다',
    conjugatedEnding: '을 때',
    baseWord: '벗다',
    conjugatedWord: '벗을 때',
    vowelHint: 'ㅅ 받침 → [-을 때]',
    meanings: { en: 'to take off (clothes)', vi: 'cởi (quần áo)', bn: 'খোলা', zh: '脱（衣服）', ru: 'снимать (одежду)', ja: '脱ぐ', mn: 'тайлах', ko: '벗다' },
    sampleSentence: '옷을 벗을 때 바로 정리해요.',
    illustrationSvg: BEOTDA_U27_SVG,
    emojiIcon: '🧥'
  },
  {
    id: 'u27-5',
    stem: '혼나',
    ending: '다',
    conjugatedEnding: 'ㄹ 때',
    baseWord: '혼나다',
    conjugatedWord: '혼날 때',
    vowelHint: '받침 없음 → [-ㄹ 때]',
    meanings: { en: 'to get scolded', vi: 'bị mắng', bn: 'বকা খাওয়া', zh: '挨骂 / 被批评', ru: 'получить выговор', ja: '叱られる', mn: 'загнуулах', ko: '혼나다' },
    sampleSentence: '혼날 때는 슬퍼요.',
    illustrationSvg: HONNADA_SVG,
    emojiIcon: '🥺'
  }
];

// 28단원: [목적 (-러 가요, -으러 가요 / -러 와요, -으러 와요)] 5장
const UNIT_28_CARDS: VerbCardItem[] = [
  {
    id: 'u28-1',
    stem: '구경',
    ending: '하다',
    conjugatedEnding: '하러 가요',
    baseWord: '구경하다',
    conjugatedWord: '구경하러 가요',
    vowelHint: '‘하다’ → [-하러 가요]',
    meanings: { en: 'to look around / watch', vi: 'ngắm / xem', bn: 'দেখা / ঘোরা', zh: '参观 / 赏', ru: 'смотреть', ja: '見物する', mn: 'үзэх / сонирхох', ko: '구경하다' },
    sampleSentence: '꽃을 구경하러 가요.',
    illustrationSvg: GUGYEONGHADA_U28_SVG,
    emojiIcon: '🌸'
  },
  {
    id: 'u28-2',
    stem: '산책',
    ending: '하다',
    conjugatedEnding: '하러 가요',
    baseWord: '산책하다',
    conjugatedWord: '산책하러 가요',
    vowelHint: '‘하다’ → [-하러 가요]',
    meanings: { en: 'to take a walk', vi: 'đi dạo', bn: 'হাঁটাহাঁটি করা', zh: '散步', ru: 'гулять', ja: '散歩する', mn: 'зугаалах', ko: '산책하다' },
    sampleSentence: '공원에 산책하러 가요.',
    illustrationSvg: SANCHAEKHADA_SVG,
    emojiIcon: '🌳'
  },
  {
    id: 'u28-3',
    stem: '반납',
    ending: '하다',
    conjugatedEnding: '하러 와요',
    baseWord: '반납하다',
    conjugatedWord: '반납하러 와요',
    vowelHint: '‘하다’ → [-하러 와요]',
    meanings: { en: 'to return (a book)', vi: 'trả lại (sách)', bn: 'ফেরত দেওয়া', zh: '归还', ru: 'возвращать', ja: '返却する', mn: 'буцааж өгөх', ko: '반납하다' },
    sampleSentence: '책 반납하러 와요.',
    illustrationSvg: BANNAPHADA_SVG,
    emojiIcon: '📚'
  },
  {
    id: 'u28-4',
    stem: '심',
    ending: '다',
    conjugatedEnding: '으러 가요',
    baseWord: '심다',
    conjugatedWord: '심으러 가요',
    vowelHint: 'ㅁ 받침 → [-으러 가요]',
    meanings: { en: 'to plant', vi: 'trồng (cây)', bn: 'রোপণ করা', zh: '种（树）', ru: 'сажать', ja: '植える', mn: 'тарих', ko: '심다' },
    sampleSentence: '나무를 심으러 가요.',
    illustrationSvg: SIMDA_SVG,
    emojiIcon: '🌱'
  },
  {
    id: 'u28-5',
    stem: '수영',
    ending: '하다',
    conjugatedEnding: '하러 가요',
    baseWord: '수영하다',
    conjugatedWord: '수영하러 가요',
    vowelHint: '‘하다’ → [-하러 가요]',
    meanings: { en: 'to swim', vi: 'bơi', bn: 'সাঁতার কাটা', zh: '游泳', ru: 'плавать', ja: '泳ぐ', mn: 'сэлэх', ko: '수영하다' },
    sampleSentence: '아빠랑 수영하러 가요.',
    illustrationSvg: SUYEONGHADA_SVG,
    emojiIcon: '🏊'
  }
];

// 29단원: [순서 (-기 전에, -ㄴ 후에, -은 후에)] 5장
const UNIT_29_CARDS: VerbCardItem[] = [
  {
    id: 'u29-1',
    stem: '양치',
    ending: '하다',
    conjugatedEnding: '하기 전에',
    baseWord: '양치하다',
    conjugatedWord: '양치하기 전에',
    vowelHint: '‘하다’ + 이전 → [-하기 전에]',
    meanings: { en: 'to brush teeth', vi: 'đánh răng', bn: 'দাঁত মাজা', zh: '刷牙', ru: 'чистить зубы', ja: '歯を磨く', mn: 'шүд угаах', ko: '양치하다' },
    sampleSentence: '양치하기 전에 세수해요.',
    illustrationSvg: YANGCHIHADA_U29_SVG,
    emojiIcon: '🪥'
  },
  {
    id: 'u29-2',
    stem: '자르',
    ending: '다',
    conjugatedEnding: '기 전에',
    baseWord: '자르다',
    conjugatedWord: '자르기 전에',
    vowelHint: '이전 행동 → [-기 전에]',
    meanings: { en: 'to cut', vi: 'cắt', bn: 'কাটা', zh: '剪 / 切', ru: 'резать', ja: '切る', mn: 'хайчлах', ko: '자르다' },
    sampleSentence: '자르기 전에 색칠해요.',
    illustrationSvg: JAREUDA_SVG,
    emojiIcon: '✂️'
  },
  {
    id: 'u29-3',
    stem: '모으',
    ending: '다',
    conjugatedEnding: 'ㄴ 후에',
    baseWord: '모으다',
    conjugatedWord: '모은 후에',
    vowelHint: '‘모으다’ 예외 활용 → [모은 후에]',
    meanings: { en: 'to gather / collect', vi: 'thu gom', bn: 'জড়ো করা', zh: '收集', ru: 'собирать', ja: '集める', mn: 'цуглуулах', ko: '모으다' },
    sampleSentence: '쓰레기를 모은 후에 버려요.',
    illustrationSvg: MOEUDA_U29_SVG,
    emojiIcon: '🗑️'
  },
  {
    id: 'u29-4',
    stem: '연습',
    ending: '하다',
    conjugatedEnding: '한 후에',
    baseWord: '연습하다',
    conjugatedWord: '연습한 후에',
    vowelHint: '‘하다’ + 이후 → [-한 후에]',
    meanings: { en: 'to practice', vi: 'luyện tập', bn: 'অনুশীলন করা', zh: '练习', ru: 'тренироваться', ja: '練習する', mn: 'дасгал хийх', ko: '연습하다' },
    sampleSentence: '연습한 후에 모여요.',
    illustrationSvg: YEONSEUPHADA_SVG,
    emojiIcon: '🎵'
  },
  {
    id: 'u29-5',
    stem: '섞',
    ending: '다',
    conjugatedEnding: '은 후에',
    baseWord: '섞다',
    conjugatedWord: '섞은 후에',
    vowelHint: 'ㄲ 받침 + 이후 → [-은 후에]',
    meanings: { en: 'to mix / to shuffle', vi: 'trộn / xào bài', bn: 'মেশানো', zh: '洗（牌）/ 混合', ru: 'перемешивать', ja: '混ぜる / 切る', mn: 'холих', ko: '섞다' },
    sampleSentence: '카드를 섞은 후에 게임해요.',
    illustrationSvg: SEOKDA_SVG,
    emojiIcon: '🃏'
  }
];

// 30단원: [경험 (-아 봤어요, -어 봤어요, -해 봤어요)] 5장
const UNIT_30_CARDS: VerbCardItem[] = [
  {
    id: 'u30-1',
    stem: '안',
    ending: '다',
    conjugatedEnding: '아 봤어요',
    baseWord: '안다',
    conjugatedWord: '안아 봤어요',
    vowelHint: 'ㅏ 발견 → [-아 봤어요]',
    meanings: { en: 'to hug / to hold', vi: 'ôm', bn: 'জড়িয়ে ধরা', zh: '抱', ru: 'обнимать', ja: '抱く', mn: 'тэврэх', ko: '안다' },
    sampleSentence: '동생을 안아 봤어요.',
    illustrationSvg: ANDA_U30_SVG,
    emojiIcon: '🤗'
  },
  {
    id: 'u30-2',
    stem: '춤추',
    ending: '다',
    conjugatedEnding: '어 봤어요',
    baseWord: '춤추다',
    conjugatedWord: '춤춰 봤어요',
    vowelHint: '모음 축약 (추+어=춰) 봤어요',
    meanings: { en: 'to dance', vi: 'nhảy múa', bn: 'নাচা', zh: '跳舞', ru: 'танцевать', ja: '踊る', mn: 'бүжиглэх', ko: '춤추다' },
    sampleSentence: '학교에서 춤춰 봤어요.',
    illustrationSvg: CHUMCHUDA_SVG,
    emojiIcon: '💃'
  },
  {
    id: 'u30-3',
    stem: '외우',
    ending: '다',
    conjugatedEnding: '어 봤어요',
    baseWord: '외우다',
    conjugatedWord: '외워 봤어요',
    vowelHint: '모음 축약 (우+어=워) 봤어요',
    meanings: { en: 'to memorize', vi: 'học thuộc', bn: 'মুখস্থ করা', zh: '背诵', ru: 'учить наизусть', ja: '覚える', mn: 'цээжлэх', ko: '외우다' },
    sampleSentence: '구구단을 외워 봤어요.',
    illustrationSvg: OE_UDA_U30_SVG,
    emojiIcon: '🧠'
  },
  {
    id: 'u30-4',
    stem: '도전',
    ending: '하다',
    conjugatedEnding: '해 봤어요',
    baseWord: '도전하다',
    conjugatedWord: '도전해 봤어요',
    vowelHint: '‘하다’ → [-해 봤어요]',
    meanings: { en: 'to challenge / to try', vi: 'thử thách', bn: 'চেষ্টা করা', zh: '挑战', ru: 'пробовать', ja: '挑戦する', mn: 'сорих', ko: '도전하다' },
    sampleSentence: '1등에 도전해 봤어요.',
    illustrationSvg: DOJEONHADA_U30_SVG,
    emojiIcon: '🏆'
  },
  {
    id: 'u30-5',
    stem: '묻',
    ending: '다',
    conjugatedEnding: '어봤어요',
    baseWord: '묻다',
    conjugatedWord: '물어봤어요',
    vowelHint: 'ㄷ 불규칙 (묻+어=물어) 봤어요',
    meanings: { en: 'to ask', vi: 'hỏi', bn: 'জিজ্ঞাসা করা', zh: '问', ru: 'спрашивать', ja: '尋ねる', mn: 'асуух', ko: '묻다' },
    sampleSentence: '모르는 단어를 물어봤어요.',
    illustrationSvg: MUTDA_U30_SVG,
    emojiIcon: '🙋'
  }
];

export const VERB_CARDS_BY_UNIT: Record<VerbUnitType, VerbCardItem[]> = {
  unit1: UNIT_1_CARDS,
  unit2: UNIT_2_CARDS,
  unit3: UNIT_3_CARDS,
  unit4: UNIT_4_CARDS,
  unit5: UNIT_5_CARDS,
  unit6: UNIT_6_CARDS,
  unit7: UNIT_7_CARDS,
  unit8: UNIT_8_CARDS,
  unit9: UNIT_9_CARDS,
  unit10: UNIT_10_CARDS,
  unit11: UNIT_11_CARDS,
  unit12: UNIT_12_CARDS,
  unit13: UNIT_13_CARDS,
  unit14: UNIT_14_CARDS,
  unit15: UNIT_15_CARDS,
  unit16: UNIT_16_CARDS,
  unit17: UNIT_17_CARDS,
  unit18: UNIT_18_CARDS,
  unit19: UNIT_19_CARDS,
  unit20: UNIT_20_CARDS,
  unit21: UNIT_21_CARDS,
  unit22: UNIT_22_CARDS,
  unit23: UNIT_23_CARDS,
  unit24: UNIT_24_CARDS,
  unit25: UNIT_25_CARDS,
  unit26: UNIT_26_CARDS,
  unit27: UNIT_27_CARDS,
  unit28: UNIT_28_CARDS,
  unit29: UNIT_29_CARDS,
  unit30: UNIT_30_CARDS,
};
