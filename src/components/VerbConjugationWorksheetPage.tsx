import React from 'react';
import { SupportedLanguage } from '../types';
import { speakKorean, playCutePop } from '../utils/audio';
import {
  BADA_YO_NOTEBOOK_SVG,
  MEOK_EO_YO_SVG
} from '../data/chapterIllustrations6to10';
import {
  ALAYO_SVG,
  SSISEOYO_SVG,
  ILGEO_YO_SVG
} from '../data/chapterIllustrations2to5';
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
} from '../data/verbWorksheetIllustrations';
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
} from '../data/verbPastTenseIllustrations';
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
} from '../data/verbUnits11to15Illustrations';
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
} from '../data/verbUnits16to20Illustrations';
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
} from '../data/verbUnits12to20Illustrations';
import {
  GEONNEODA_SVG,
  NALDA_SVG,
  JEOPDA_SVG,
  NAMGIDA_SVG,
  SUYEONGHADA_SVG,
  JOSIMHADA_SVG,
  NAMDA_SVG,
  KKEONAEDA_SVG,
  JIKIDA_SVG,
  JAREUDA_SVG
} from '../data/verbUnits21to25Illustrations';
import {
  MOIDA_SVG,
  MEOLDA_SVG,
  TEULLIDA_SVG,
  BALPYOHADA_SVG
} from '../data/verbUnits26to30Illustrations';
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
} from '../data/verbUnits21to30Illustrations';
import {
  ULDA_U11_SVG,
  SSOTDA_U11_SVG,
  CHAMDA_U11_SVG,
  DEONJIDA_U11_SVG
} from '../data/verbUnit11Illustrations';
import { ManduMascot } from './ManduMascot';
import { getBaseWordParts, getOptionBCharMapping } from '../utils/verbConjugationUtils';
import { getVerbConjugatedMeaning } from '../data/verbConjugatedMeanings';

export interface VerbWorksheetItem {
  id: string;
  badge: string;
  stem: string;
  ending: string;
  conjugatedEnding: string;
  conjugatedStem?: string;
  conjugatedStemColor?: string;
  baseWord: string;
  conjugatedWord: string;
  illustrationSvg: string;
  meanings: Record<SupportedLanguage, string> & { ko?: string };
  conjugatedMeanings?: Record<SupportedLanguage, string> & { ko?: string };
  sentencePrefix: string;
  sentenceHighlight: string;
  sentenceSuffix: string;
  tracingText: string;
}

// 1~10단원 목록
export const VERB_UNIT_1_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '1-1', badge: '1-1', stem: '받', ending: '다', conjugatedEnding: '아요', baseWord: '받다', conjugatedWord: '받아요', illustrationSvg: BADA_YO_NOTEBOOK_SVG,
    meanings: { en: 'to receive', vi: 'nhận', bn: 'নেওয়া', zh: '接收', ru: 'получать', ja: '受け取る', mn: 'авах' },
    sentencePrefix: '공책을 ', sentenceHighlight: '받아요', sentenceSuffix: '.', tracingText: '받아요'
  },
  {
    id: '1-2', badge: '1-2', stem: '찾', ending: '다', conjugatedEnding: '아요', baseWord: '찾다', conjugatedWord: '찾아요', illustrationSvg: CHAJAYO_DESK_PENCIL_SVG,
    meanings: { en: 'to find', vi: 'tìm kiếm', bn: 'খোঁজা', zh: '寻找', ru: 'искать', ja: '見つける', mn: 'хайх' },
    sentencePrefix: '연필을 ', sentenceHighlight: '찾아요', sentenceSuffix: '.', tracingText: '찾아요'
  },
  {
    id: '1-3', badge: '1-3', stem: '놀', ending: '다', conjugatedEnding: '아요', baseWord: '놀다', conjugatedWord: '놀아요', illustrationSvg: NOLAYO_KIDS_OUTDOOR_SVG,
    meanings: { en: 'to play', vi: 'chơi', bn: 'খেলা করা', zh: '玩耍', ru: 'играть', ja: '遊ぶ', mn: 'тоглох' },
    sentencePrefix: '친구랑 ', sentenceHighlight: '놀아요', sentenceSuffix: '.', tracingText: '놀아요'
  },
  {
    id: '1-4', badge: '1-4', stem: '알', ending: '다', conjugatedEnding: '아요', baseWord: '알다', conjugatedWord: '알아요', illustrationSvg: ALAYO_SVG,
    meanings: { en: 'to know', vi: 'biết', bn: 'জানা', zh: '知道', ru: 'знать', ja: '知る / わかる', mn: 'мэдэх' },
    sentencePrefix: '답을 ', sentenceHighlight: '알아요', sentenceSuffix: '.', tracingText: '알아요'
  },
  {
    id: '1-5', badge: '1-5', stem: '닫', ending: '다', conjugatedEnding: '아요', baseWord: '닫다', conjugatedWord: '닫아요', illustrationSvg: DADAYO_DOOR_SVG,
    meanings: { en: 'to close', vi: 'đóng', bn: 'বন্ধ করা', zh: '关闭', ru: 'закрывать', ja: '閉める', mn: 'хаах' },
    sentencePrefix: '문을 ', sentenceHighlight: '닫아요', sentenceSuffix: '.', tracingText: '닫아요'
  }
];

export const VERB_UNIT_2_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '2-1', badge: '2-1', stem: '먹', ending: '다', conjugatedEnding: '어요', baseWord: '먹다', conjugatedWord: '먹어요', illustrationSvg: MEOK_EO_YO_SVG,
    meanings: { en: 'to eat', vi: 'ăn', bn: 'খাওয়া', zh: '吃', ru: 'кушать / есть', ja: '食べる', mn: 'идэх' },
    sentencePrefix: '밥을 ', sentenceHighlight: '먹어요', sentenceSuffix: '.', tracingText: '먹어요'
  },
  {
    id: '2-2', badge: '2-2', stem: '씻', ending: '다', conjugatedEnding: '어요', baseWord: '씻다', conjugatedWord: '씻어요', illustrationSvg: SSISEOYO_SVG,
    meanings: { en: 'to wash', vi: 'rửa', bn: 'ধোয়া', zh: '洗', ru: 'мыть', ja: '洗う', mn: 'угаах' },
    sentencePrefix: '손을 ', sentenceHighlight: '씻어요', sentenceSuffix: '.', tracingText: '씻어요'
  },
  {
    id: '2-3', badge: '2-3', stem: '입', ending: '다', conjugatedEnding: '어요', baseWord: '입다', conjugatedWord: '입어요', illustrationSvg: IPEOYO_CLOTHES_SVG,
    meanings: { en: 'to wear', vi: 'mặc (quần áo)', bn: 'জামা পরা', zh: '穿（衣服）', ru: 'надевать', ja: '着る', mn: 'өмсөх' },
    sentencePrefix: '옷을 ', sentenceHighlight: '입어요', sentenceSuffix: '.', tracingText: '입어요'
  },
  {
    id: '2-4', badge: '2-4', stem: '읽', ending: '다', conjugatedEnding: '어요', baseWord: '읽다', conjugatedWord: '읽어요', illustrationSvg: ILGEO_YO_SVG,
    meanings: { en: 'to read', vi: 'đọc (sách)', bn: 'পড়া', zh: '读 / 阅读', ru: 'читать', ja: '読む', mn: 'унших' },
    sentencePrefix: '책을 ', sentenceHighlight: '읽어요', sentenceSuffix: '.', tracingText: '읽어요'
  },
  {
    id: '2-5', badge: '2-5', stem: '열', ending: '다', conjugatedEnding: '어요', baseWord: '열다', conjugatedWord: '열어요', illustrationSvg: YEOL_EO_YO_WINDOW_SVG,
    meanings: { en: 'to open', vi: 'mở', bn: 'খোলা', zh: '打开', ru: 'открывать', ja: '開ける', mn: 'нээх' },
    sentencePrefix: '창문을 ', sentenceHighlight: '열어요', sentenceSuffix: '.', tracingText: '열어요'
  }
];

export const VERB_UNIT_3_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '3-1', badge: '3-1', stem: '공부', ending: '하다', conjugatedEnding: '해요', baseWord: '공부하다', conjugatedWord: '공부해요', illustrationSvg: GONGBU_HAEYO_SVG,
    meanings: { en: 'to study', vi: 'học', bn: 'পড়াশোনা করা', zh: '学习', ru: 'учиться', ja: '勉強する', mn: 'сурах' },
    sentencePrefix: '한국어를 ', sentenceHighlight: '공부해요', sentenceSuffix: '.', tracingText: '공부해요'
  },
  {
    id: '3-2', badge: '3-2', stem: '청소', ending: '하다', conjugatedEnding: '해요', baseWord: '청소하다', conjugatedWord: '청소해요', illustrationSvg: CHEONGSO_HAEYO_SVG,
    meanings: { en: 'to clean', vi: 'dọn dẹp', bn: 'পরিষ্কার করা', zh: '打扫', ru: 'убирать', ja: '掃除する', mn: 'цэвэрлэх' },
    sentencePrefix: '교실을 ', sentenceHighlight: '청소해요', sentenceSuffix: '.', tracingText: '청소해요'
  },
  {
    id: '3-3', badge: '3-3', stem: '숙제', ending: '하다', conjugatedEnding: '해요', baseWord: '숙제하다', conjugatedWord: '숙제해요', illustrationSvg: SUKJE_HAEYO_SVG,
    meanings: { en: 'to do homework', vi: 'làm bài tập', bn: 'বাড়ির কাজ করা', zh: '做作业', ru: 'делать уроки', ja: '宿題をする', mn: 'даалгавар хийх' },
    sentencePrefix: '지금 ', sentenceHighlight: '숙제해요', sentenceSuffix: '.', tracingText: '숙제해요'
  },
  {
    id: '3-4', badge: '3-4', stem: '질문', ending: '하다', conjugatedEnding: '해요', baseWord: '질문하다', conjugatedWord: '질문해요', illustrationSvg: JILMUN_HAEYO_SVG,
    meanings: { en: 'to ask', vi: 'hỏi', bn: 'প্রশ্ন করা', zh: '提问', ru: 'спрашивать', ja: '質問する', mn: 'асуух' },
    sentencePrefix: '손들고 ', sentenceHighlight: '질문해요', sentenceSuffix: '.', tracingText: '질문해요'
  },
  {
    id: '3-5', badge: '3-5', stem: '인사', ending: '하다', conjugatedEnding: '해요', baseWord: '인사하다', conjugatedWord: '인사해요', illustrationSvg: INSA_HAEYO_SVG,
    meanings: { en: 'to greet', vi: 'chào', bn: 'সালাম দেওয়া', zh: '打招呼', ru: 'здороваться', ja: '挨拶する', mn: 'мэндлэх' },
    sentencePrefix: '선생님께 ', sentenceHighlight: '인사해요', sentenceSuffix: '.', tracingText: '인사해요'
  }
];

export const VERB_UNIT_4_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '4-1', badge: '4-1', stem: '오', ending: '다', conjugatedEnding: '요', conjugatedStem: '와', conjugatedStemColor: 'text-red-600', baseWord: '오다', conjugatedWord: '와요', illustrationSvg: ODA_WAYO_SVG,
    meanings: { en: 'to come', vi: 'đến', bn: 'আসা', zh: '来', ru: 'приходить', ja: '来る', mn: 'ирэх' },
    sentencePrefix: '학교에 ', sentenceHighlight: '와요', sentenceSuffix: '.', tracingText: '와요'
  },
  {
    id: '4-2', badge: '4-2', stem: '보', ending: '다', conjugatedEnding: '요', conjugatedStem: '봐', conjugatedStemColor: 'text-red-600', baseWord: '보다', conjugatedWord: '봐요', illustrationSvg: BODA_BWAYO_SVG,
    meanings: { en: 'to see / to look', vi: 'nhìn / xem', bn: 'দেখা', zh: '看', ru: 'смотреть / видеть', ja: '見る', mn: 'үзэх / харах' },
    sentencePrefix: '칠판을 ', sentenceHighlight: '봐요', sentenceSuffix: '.', tracingText: '봐요'
  },
  {
    id: '4-3', badge: '4-3', stem: '가', ending: '다', conjugatedEnding: '요', conjugatedStem: '가', baseWord: '가다', conjugatedWord: '가요', illustrationSvg: GADA_GAYO_SVG,
    meanings: { en: 'to go', vi: 'đi', bn: 'যাওয়া', zh: '去 / 走', ru: 'идти / уходить', ja: '行く', mn: 'явах' },
    sentencePrefix: '집에 ', sentenceHighlight: '가요', sentenceSuffix: '.', tracingText: '가요'
  },
  {
    id: '4-4', badge: '4-4', stem: '아프', ending: '다', conjugatedEnding: '파요', conjugatedStem: '아', baseWord: '아프다', conjugatedWord: '아파요', illustrationSvg: APEUDA_APAYO_SVG,
    meanings: { en: 'to hurt / to be sick', vi: 'đau / ốm', bn: 'ব্যথা করা / অসুস্থ হওয়া', zh: '疼 / 痛', ru: 'болеть', ja: '痛い', mn: 'өвдөх' },
    sentencePrefix: '머리가 ', sentenceHighlight: '아파요', sentenceSuffix: '.', tracingText: '아파요'
  },
  {
    id: '4-5', badge: '4-5', stem: '돕', ending: '다', conjugatedEnding: '와요', conjugatedStem: '도', baseWord: '돕다', conjugatedWord: '도와요', illustrationSvg: DOPDA_DOWAYO_SVG,
    meanings: { en: 'to help', vi: 'giúp đỡ', bn: 'সাহায্য করা', zh: '帮 / 帮助', ru: 'помогать', ja: '助ける / 手伝う', mn: 'туслах' },
    sentencePrefix: '친구를 ', sentenceHighlight: '도와요', sentenceSuffix: '.', tracingText: '도와요'
  }
];

export const VERB_UNIT_5_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '5-1', badge: '5-1', stem: '주', ending: '다', conjugatedEnding: '요', conjugatedStem: '줘', conjugatedStemColor: 'text-red-600', baseWord: '주다', conjugatedWord: '줘요', illustrationSvg: JUDA_JWOYO_SVG,
    meanings: { en: 'to give', vi: 'cho / tặng', bn: 'দেওয়া', zh: '给', ru: 'давать', ja: 'あげる / くれる', mn: 'өгөх' },
    sentencePrefix: '연필을 ', sentenceHighlight: '줘요', sentenceSuffix: '.', tracingText: '줘요'
  },
  {
    id: '5-2', badge: '5-2', stem: '마시', ending: '다', conjugatedEnding: '셔요', conjugatedStem: '마', baseWord: '마시다', conjugatedWord: '마셔요', illustrationSvg: MASIDA_MASYEOYO_SVG,
    meanings: { en: 'to drink', vi: 'uống', bn: 'পান করা', zh: '喝', ru: 'пить', ja: '飲む', mn: 'уух' },
    sentencePrefix: '물을 ', sentenceHighlight: '마셔요', sentenceSuffix: '.', tracingText: '마셔요'
  },
  {
    id: '5-3', badge: '5-3', stem: '쓰', ending: '다', conjugatedEnding: '요', conjugatedStem: '써', conjugatedStemColor: 'text-red-600', baseWord: '쓰다', conjugatedWord: '써요', illustrationSvg: SSEUDA_SSEOYO_SVG,
    meanings: { en: 'to write', vi: 'viết', bn: 'লেখা', zh: '写', ru: 'писать', ja: '書く', mn: 'бичих' },
    sentencePrefix: '글씨를 ', sentenceHighlight: '써요', sentenceSuffix: '.', tracingText: '써요'
  },
  {
    id: '5-4', badge: '5-4', stem: '듣', ending: '다', conjugatedEnding: '어요', conjugatedStem: '들', baseWord: '듣다', conjugatedWord: '들어요', illustrationSvg: DEUTDA_DEUREOYO_SVG,
    meanings: { en: 'to listen', vi: 'nghe', bn: 'শোনা', zh: '听', ru: 'слушать', ja: '聞く', mn: 'сонсох' },
    sentencePrefix: '음악을 ', sentenceHighlight: '들어요', sentenceSuffix: '.', tracingText: '들어요'
  },
  {
    id: '5-5', badge: '5-5', stem: '부르', ending: '다', conjugatedEnding: '러요', conjugatedStem: '불', baseWord: '부르다', conjugatedWord: '불러요', illustrationSvg: BUREUDA_BULLEOYO_SVG,
    meanings: { en: 'to sing / to call', vi: 'hát / gọi', bn: 'গান গাওয়া / ডাকা', zh: '唱 / 叫', ru: 'петь / звать', ja: '歌う / 呼ぶ', mn: 'дуулах / дуудах' },
    sentencePrefix: '노래를 ', sentenceHighlight: '불러요', sentenceSuffix: '.', tracingText: '불러요'
  }
];

export const VERB_UNIT_6_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '6-1', badge: '6-1', stem: '맞', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '맞', baseWord: '맞다', conjugatedWord: '맞았어요', illustrationSvg: MATDA_MAJASSEOYO_SVG,
    meanings: { en: 'to be correct', vi: 'đúng', bn: 'সঠিক হওয়া', zh: '对 / 正确', ru: 'правильно / верно', ja: '合っている', mn: 'зөв байх' },
    sentencePrefix: '답이 ', sentenceHighlight: '맞았어요', sentenceSuffix: '.', tracingText: '맞았어요'
  },
  {
    id: '6-2', badge: '6-2', stem: '닦', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '닦', baseWord: '닦다', conjugatedWord: '닦았어요', illustrationSvg: DAKDA_DAKKASSEOYO_SVG,
    meanings: { en: 'to wipe / to brush', vi: 'lau / đánh răng', bn: 'মোছা / ব্রাশ করা', zh: '擦 / 刷', ru: 'чистить / вытирать', ja: '磨く / 拭く', mn: 'угаах / арчих' },
    sentencePrefix: '이를 ', sentenceHighlight: '닦았어요', sentenceSuffix: '.', tracingText: '닦았어요'
  },
  {
    id: '6-3', badge: '6-3', stem: '앉', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '앉', baseWord: '앉다', conjugatedWord: '앉았어요', illustrationSvg: ANJDA_ANJASSEOYO_SVG,
    meanings: { en: 'to sit', vi: 'ngồi', bn: 'বসা', zh: '坐', ru: 'сидеть / садиться', ja: '座る', mn: 'suuh' },
    sentencePrefix: '자리에 ', sentenceHighlight: '앉았어요', sentenceSuffix: '.', tracingText: '앉았어요'
  },
  {
    id: '6-4', badge: '6-4', stem: '잡', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '잡', baseWord: '잡다', conjugatedWord: '잡았어요', illustrationSvg: JAPDA_JABASSEOYO_SVG,
    meanings: { en: 'to catch / to hold', vi: 'bắt / nắm', bn: 'ধরা', zh: '抓 / 接', ru: 'ловить / держать', ja: 'つかむ / 捕まえる', mn: 'барих' },
    sentencePrefix: '공을 ', sentenceHighlight: '잡았어요', sentenceSuffix: '.', tracingText: '잡았어요'
  },
  {
    id: '6-5', badge: '6-5', stem: '좋', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '좋', baseWord: '좋다', conjugatedWord: '좋았어요', illustrationSvg: JOTDA_JOHASSEOYO_SVG,
    meanings: { en: 'to be good / to feel good', vi: 'tốt / thích', bn: 'ভালো লাগা', zh: '好 / 舒服', ru: 'хорошо / нравиться', ja: '良い / 気分が良い', mn: 'сайхан байх' },
    sentencePrefix: '기분이 ', sentenceHighlight: '좋았어요', sentenceSuffix: '.', tracingText: '좋았어요'
  }
];

export const VERB_UNIT_7_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '7-1', badge: '7-1', stem: '있', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '있', baseWord: '있다', conjugatedWord: '있었어요', illustrationSvg: ITDA_ISSEOSSEOYO_SVG,
    meanings: { en: 'to exist / to have', vi: 'có / ở', bn: 'থাকা', zh: '有 / 在', ru: 'быть / иметься', ja: 'あった / いた', mn: 'байсан' },
    sentencePrefix: '나비가 ', sentenceHighlight: '있었어요', sentenceSuffix: '.', tracingText: '있었어요'
  },
  {
    id: '7-2', badge: '7-2', stem: '신', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '신', baseWord: '신다', conjugatedWord: '신었어요', illustrationSvg: SINDA_SINEOSSEOYO_SVG,
    meanings: { en: 'to wear (shoes)', vi: 'đi (giày / tất)', bn: 'জুতো পরা', zh: '穿(鞋/袜)', ru: 'надевать (обувь)', ja: '履く', mn: 'өмсөх(гутал)' },
    sentencePrefix: '신발을 ', sentenceHighlight: '신었어요', sentenceSuffix: '.', tracingText: '신었어요'
  },
  {
    id: '7-3', badge: '7-3', stem: '웃', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '웃', baseWord: '웃다', conjugatedWord: '웃었어요', illustrationSvg: UTDA_USEOSSEOYO_SVG,
    meanings: { en: 'to smile / to laugh', vi: 'cười', bn: 'হাসা', zh: '笑', ru: 'улыбаться / смеяться', ja: '笑う', mn: 'инээх' },
    sentencePrefix: '누나가 ', sentenceHighlight: '웃었어요', sentenceSuffix: '.', tracingText: '웃었어요'
  },
  {
    id: '7-4', badge: '7-4', stem: '쉬', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '쉬', baseWord: '쉬다', conjugatedWord: '쉬었어요', illustrationSvg: SWIDA_SWIEOSSEOYO_SVG,
    meanings: { en: 'to rest', vi: 'nghỉ ngơi', bn: 'বিশ্রাম নেওয়া', zh: '休息', ru: 'отдыхать', ja: '休む', mn: 'амрах' },
    sentencePrefix: '집에서 ', sentenceHighlight: '쉬었어요', sentenceSuffix: '.', tracingText: '쉬었어요'
  },
  {
    id: '7-5', badge: '7-5', stem: '만들', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '만들', baseWord: '만들다', conjugatedWord: '만들었어요', illustrationSvg: MANDEULDA_MANDEULEOSSEOYO_SVG,
    meanings: { en: 'to make', vi: 'làm / chế tạo', bn: 'তৈরি করা', zh: '做 / 制作', ru: 'делать / создавать', ja: '作る', mn: 'хийх' },
    sentencePrefix: '빵을 ', sentenceHighlight: '만들었어요', sentenceSuffix: '.', tracingText: '만들었어요'
  }
];

export const VERB_UNIT_8_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '8-1', badge: '8-1', stem: '시작', ending: '하다', conjugatedEnding: '했어요', conjugatedStem: '시작', baseWord: '시작하다', conjugatedWord: '시작했어요', illustrationSvg: SIJAK_HAEYO_SVG,
    meanings: { en: 'to start', vi: 'bắt đầu', bn: 'শুরু করা', zh: '开始', ru: 'начинать', ja: '始める', mn: 'эхлэх' },
    sentencePrefix: '수업을 ', sentenceHighlight: '시작했어요', sentenceSuffix: '.', tracingText: '시작했어요'
  },
  {
    id: '8-2', badge: '8-2', stem: '대답', ending: '하다', conjugatedEnding: '했어요', conjugatedStem: '대답', baseWord: '대답하다', conjugatedWord: '대답했어요', illustrationSvg: DAEDAP_HAEYO_SVG,
    meanings: { en: 'to answer', vi: 'trả lời', bn: 'উত্তর দেওয়া', zh: '回答', ru: 'отвечать', ja: '答える', mn: 'хариулах' },
    sentencePrefix: '질문에 ', sentenceHighlight: '대답했어요', sentenceSuffix: '.', tracingText: '대답했어요'
  },
  {
    id: '8-3', badge: '8-3', stem: '정리', ending: '하다', conjugatedEnding: '했어요', conjugatedStem: '정리', baseWord: '정리하다', conjugatedWord: '정리했어요', illustrationSvg: JEONGRI_HAEYO_SVG,
    meanings: { en: 'to organize', vi: 'dọn dẹp / sắp xếp', bn: 'গোছানো', zh: '整理', ru: 'наводить порядок', ja: '整理する / 片付ける', mn: 'цэгцлэх' },
    sentencePrefix: '책상을 ', sentenceHighlight: '정리했어요', sentenceSuffix: '.', tracingText: '정리했어요'
  },
  {
    id: '8-4', badge: '8-4', stem: '운동', ending: '하다', conjugatedEnding: '했어요', conjugatedStem: '운동', baseWord: '운동하다', conjugatedWord: '운동했어요', illustrationSvg: UNDONG_HAEYO_SVG,
    meanings: { en: 'to exercise', vi: 'tập thể dục', bn: 'ব্যায়াম করা', zh: '运动', ru: 'заниматься спортом', ja: '運動する', mn: 'дасгал хийх' },
    sentencePrefix: '아빠랑 ', sentenceHighlight: '운동했어요', sentenceSuffix: '.', tracingText: '운동했어요'
  },
  {
    id: '8-5', badge: '8-5', stem: '양보', ending: '하다', conjugatedEnding: '했어요', conjugatedStem: '양보', baseWord: '양보하다', conjugatedWord: '양보했어요', illustrationSvg: YANGBO_HAEYO_PAST_SVG,
    meanings: { en: 'to yield / to concede', vi: 'nhường nhịn', bn: 'ছাড় দেওয়া', zh: '让 / 谦让', ru: 'уступать', ja: '譲る', mn: 'буулт хийх / зай тавих' },
    sentencePrefix: '동생에게 ', sentenceHighlight: '양보했어요', sentenceSuffix: '.', tracingText: '양보했어요'
  }
];

export const VERB_UNIT_9_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '9-1', badge: '9-1', stem: '타', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '탔', baseWord: '타다', conjugatedWord: '탔어요', illustrationSvg: TADA_TASS_EOYO_SVG,
    meanings: { en: 'to ride', vi: 'đi / lên (xe)', bn: 'চড়া', zh: '乘 / 坐(车)', ru: 'ехать / садиться', ja: '乗る', mn: 'суух(унаанд)' },
    sentencePrefix: '버스를 ', sentenceHighlight: '탔어요', sentenceSuffix: '.', tracingText: '탔어요'
  },
  {
    id: '9-2', badge: '9-2', stem: '자', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '잤', baseWord: '자다', conjugatedWord: '잤어요', illustrationSvg: JADA_JASS_EOYO_SVG,
    meanings: { en: 'to sleep', vi: 'ngủ', bn: 'ঘুমানো', zh: '睡 / 睡觉', ru: 'спать', ja: '寝る', mn: 'унтах' },
    sentencePrefix: '9시에 ', sentenceHighlight: '잤어요', sentenceSuffix: '.', tracingText: '잤어요'
  },
  {
    id: '9-3', badge: '9-3', stem: '싸', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '쌌', baseWord: '싸다', conjugatedWord: '쌌어요', illustrationSvg: SSADA_SSASS_EOYO_SVG,
    meanings: { en: 'to pack', vi: 'gói / đóng gói', bn: 'প্যাক করা', zh: '包 / 整理(行李)', ru: 'упаковывать / собирать', ja: '包む / (荷物を)まとめる', mn: 'боох / цүнхлэх' },
    sentencePrefix: '가방을 ', sentenceHighlight: '쌌어요', sentenceSuffix: '.', tracingText: '쌌어요'
  },
  {
    id: '9-4', badge: '9-4', stem: '모르', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '몰랐', baseWord: '모르다', conjugatedWord: '몰랐어요', illustrationSvg: MOREUDA_MOLLASS_EOYO_SVG,
    meanings: { en: 'to not know', vi: 'không biết', bn: 'না জানা', zh: '不知道', ru: 'не знать', ja: '知らなかった', mn: 'мэдэхгүй байх' },
    sentencePrefix: '그건 ', sentenceHighlight: '몰랐어요', sentenceSuffix: '.', tracingText: '몰랐어요'
  },
  {
    id: '9-5', badge: '9-5', stem: '낫', ending: '다', conjugatedEnding: '았어요', conjugatedStem: '나았', baseWord: '낫다', conjugatedWord: '나았어요', illustrationSvg: NATDA_NAASSEOYO_SVG,
    meanings: { en: 'to recover', vi: 'khỏi (bệnh)', bn: 'সেরে ওঠা', zh: '痊愈 / 好转', ru: 'выздоравливать', ja: '治る', mn: 'эдгэх' },
    sentencePrefix: '감기가 ', sentenceHighlight: '나았어요', sentenceSuffix: '.', tracingText: '나았어요'
  }
];

export const VERB_UNIT_10_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '10-1', badge: '10-1', stem: '그리', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '그렸', baseWord: '그리다', conjugatedWord: '그렸어요', illustrationSvg: GEURIDA_GEURYEOSSEOYO_SVG,
    meanings: { en: 'to draw', vi: 'vẽ', bn: 'আঁকা', zh: '画', ru: 'рисовать', ja: '描く', mn: 'зурах' },
    sentencePrefix: '그림을 ', sentenceHighlight: '그렸어요', sentenceSuffix: '.', tracingText: '그렸어요'
  },
  {
    id: '10-2', badge: '10-2', stem: '붙이', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '붙였', baseWord: '붙이다', conjugatedWord: '붙였어요', illustrationSvg: BUTIDA_BUTYEOSSEOYO_SVG,
    meanings: { en: 'to stick / to attach', vi: 'dán', bn: 'আটকানো', zh: '贴 / 粘', ru: 'приклеивать', ja: '貼る', mn: 'наах' },
    sentencePrefix: '스티커를 ', sentenceHighlight: '붙였어요', sentenceSuffix: '.', tracingText: '붙였어요'
  },
  {
    id: '10-3', badge: '10-3', stem: '까맣', ending: '다', conjugatedEnding: '어요', conjugatedStem: '까맸', baseWord: '까맣다', conjugatedWord: '까맸어요', illustrationSvg: KKAMATDA_KKAMAESSEOYO_SVG,
    meanings: { en: 'to be black', vi: 'đen', bn: 'কালো হওয়া', zh: '黑 / 漆黑', ru: 'быть чёрным', ja: '真っ黒だ', mn: 'хар байх' },
    sentencePrefix: '손이 ', sentenceHighlight: '까맸어요', sentenceSuffix: '.', tracingText: '까맸어요'
  },
  {
    id: '10-4', badge: '10-4', stem: '예쁘', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '예뻤', baseWord: '예쁘다', conjugatedWord: '예뻤어요', illustrationSvg: YEPPEUDA_YEPPEOSSEOYO_SVG,
    meanings: { en: 'to be pretty', vi: 'đẹp / xinh', bn: 'সুন্দর হওয়া', zh: '漂亮 / 美丽', ru: 'красивый', ja: 'きれい / 可愛い', mn: 'хөөрхөн байх' },
    sentencePrefix: '꽃이 ', sentenceHighlight: '예뻤어요', sentenceSuffix: '.', tracingText: '예뻤어요'
  },
  {
    id: '10-5', badge: '10-5', stem: '춥', ending: '다', conjugatedEnding: '었어요', conjugatedStem: '추웠', baseWord: '춥다', conjugatedWord: '추웠어요', illustrationSvg: CHUPDA_CHUWOSSEOYO_SVG,
    meanings: { en: 'to be cold', vi: 'lạnh', bn: 'ঠান্ডা লাগা', zh: '冷', ru: 'холодно', ja: '寒い', mn: 'хүйтэн байх' },
    sentencePrefix: '날씨가 ', sentenceHighlight: '추웠어요', sentenceSuffix: '.', tracingText: '추웠어요'
  }
];

// ============================================================================
// ============================================================================
// 제11단원: 부정1 (안 [용언], 못 [용언])
// ============================================================================
export const VERB_UNIT_11_DATA = {
  id: 11,
  title: {
    ko: "⑪ 부정1 (안 [용언], 못 [용언])",
    en: "⑪ Negation 1 (안 [Verb], 못 [Verb])",
    vi: "⑪ Phủ định 1 (안 [Động từ], 못 [Động từ])",
    bn: "⑪ নেতিবাচক ১ (안 [ক্রিয়া], 못 [ক্রিয়া])",
    zh: "⑪ 否定1 (안 [谓词], 못 [谓词])",
    ru: "⑪ Отрицание 1 (안 [Глагол], 못 [Глагол])",
    ja: "⑪ 否定1 (안 [用言], 못 [用言])",
    mn: "⑪ Үгүйсгэл 1 (안 [Үйл үг], 못 [Үйл үг])"
  },
  haebolTip: {
    ko: "내 의지로 하지 않을 때는 ‘안 + [용언]’, 능력이 부족하거나 상황상 못 할 때는 ‘못 + [용언]’을 써요. (예: 안 남겨요(의지), 못 던져요(능력), 못 참아요(상황)) 단순 부정(안)과 상황/능력 부정(못)의 차이를 구별하여 표현해요.",
    en: "Use '안 + [Verb]' when you choose not to do something (intention), and '못 + [Verb]' when you can't do it due to lack of ability or circumstances. (e.g., 안 남겨요 (intention), 못 던져요 (ability), 못 참아요 (situation)). Learn to distinguish between simple negation (안) and inability/situational negation (못).",
    vi: "Dùng '안 + [Động từ]' khi bạn chủ ý không làm việc gì đó (ý chí), và '못 + [Động từ]' khi bạn không thể làm được do thiếu khả năng hoặc hoàn cảnh không cho phép. (Ví dụ: 안 남겨요 (ý chí), 못 던져요 (khả năng), 못 참아요 (hoàn cảnh)). Hãy phân biệt sự khác nhau giữa phủ định đơn thuần (안) và phủ định do hoàn cảnh/khả năng (못).",
    bn: "যখন আপনার ইচ্ছায় কিছু করবেন না তখন '안 + [ক্রিয়া]' ব্যবহার করুন, এবং ক্ষমতা বা পরিস্থিতির কারণে কিছু করতে না পারলে '못 + [ক্রিয়া]' ব্যবহার করুন। (যেমন: 안 남겨요 (ইচ্ছা), 못 던져요 (ক্ষমতা), 못 참아요 (পরিস্থিতি))। সাধারণ নেতিবাচক (안) এবং পরিস্থিতি/ক্ষমতার নেতিবাচক (못) এর পার্থক্য বুঝতে চেষ্টা করুন।",
    zh: "当你主观上不想做某事时，用“안 + [谓词]”；当因为能力不足或客观情况做不到时，用“못 + [谓词]”。（例如：안 남겨요（主观意愿），못 던져요（能力），못 참아요（客观情况））。请区分单纯否定（안）和情况/能力否定（못）的区别。",
    ru: "Используйте «안 + [Глагол]», когда вы по своей воле не делаете чего-либо, и «못 + [Глагол]», когда вы не можете этого сделать из-за нехватки способностей или обстоятельств. (Например: 안 남겨요 (воля), 못 던져요 (способность), 못 참아요 (ситуация)). Различайте простое отрицание (안) и отрицание из-за невозможности/обстоятельств (못).",
    ja: "自分の意思で「しない」時は『안 + [用言]』、能力不足や状況的に「できない」時は『못 + [用言]』を使います。（例：안 남겨요（意思）、못 던져요（能力）、못 참아요（状況））。単純な否定（안）と、状況・能力による否定（못）の違いを区別して表現しましょう。",
    mn: "Өөрийн хүслээр хийхгүй байх үед ‘안 + [Үйл үг]’-ийг, чадвар дутмаг эсвэл нөхцөл байдлаас болоод хийж чадахгүй үед ‘못 + [Үйл үг]’-ийг ашиглана. (Жнь: 안 남겨요 (хүсэл), 못 던져요 (чадвар), 못 참아요 (нөхцөл байдал)). Энгийн үгүйсгэл (안) болон нөхцөл байдал/чадварын үгүйсгэл (못)-ийн ялгааг салгаж ойлгоорой."
  },
  detectiveChance: {
    ko: "🤫 하기 싫은 거니?\n[안]을 앞에 놔!\n😟 어쩔 수 없는 거니?\n[못]을 앞에 놔!!",
    en: "🤫 You just don't want to?\nPut [안] in front!\n😟 You can't help it?\nPut [못] in front!!",
    vi: "🤫 Bạn không muốn làm?\nĐặt [안] ở phía trước!\n😟 Hoàn cảnh bắt buộc không thể làm?\nĐặt [못] ở phía trước!!",
    bn: "🤫 তুমি কি এটা করতে চাও না?\nতাহলে সামনে [안] বসাও!\n😟 তোমার কি কিছু করার নেই?\nতাহলে সামনে [못] বসাও!!",
    zh: "🤫 只是不想做吗？\n把 [안] 放在前面！\n😟 实在没办法吗？\n把 [못] 放在前面！！",
    ru: "🤫 Просто не хочешь?\nСтавь впереди [안]!\n😟 Ничего не можешь поделать?\nСтавь впереди [못]!!",
    ja: "🤫 やりたくないだけ？\n前に [안] を置いて！\n😟 どうしようもないの？\n前に [못] を置いて！！",
    mn: "🤫 Зүгээр л хиймээргүй байна уу?\nУрд нь [안] тавь!\n😟 Өөр аргагүй байна уу?\nУрд нь [못] тавь!!"
  }
};

export const VERB_UNIT_11_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '11-1', badge: '11-1', stem: '울', ending: '다', conjugatedEnding: '안 울어요', baseWord: '울다', conjugatedWord: '안 울어요', illustrationSvg: ULDA_U11_SVG,
    meanings: { ko: '울다', en: 'Cry', vi: 'Khóc', bn: 'কাঁদা', zh: '哭', ru: 'Плакать', ja: '泣く', mn: 'Уйлах' },
    conjugatedMeanings: { ko: '안 울어요', en: "Don't cry", vi: 'Không khóc', bn: 'কাঁদি না', zh: '不哭', ru: 'Не плачу', ja: '泣きません', mn: 'Уйлахгүй' },
    sentencePrefix: '저는 ', sentenceHighlight: '안 울어요', sentenceSuffix: '.', tracingText: '안 울어요'
  },
  {
    id: '11-2', badge: '11-2', stem: '쏟', ending: '다', conjugatedEnding: '안 쏟아요', baseWord: '쏟다', conjugatedWord: '안 쏟아요', illustrationSvg: SSOTDA_U11_SVG,
    meanings: { ko: '쏟다', en: 'Spill', vi: 'Đổ, làm tràn', bn: 'ঢালা', zh: '洒', ru: 'Проливать', ja: 'こぼす', mn: 'Асгах' },
    conjugatedMeanings: { ko: '안 쏟아요', en: "Don't spill", vi: 'Không đổ', bn: 'ফেলি না', zh: '不洒', ru: 'Не проливаю', ja: 'こぼしません', mn: 'Асгахгүй' },
    sentencePrefix: '물을 ', sentenceHighlight: '안 쏟아요', sentenceSuffix: '.', tracingText: '안 쏟아요'
  },
  {
    id: '11-3', badge: '11-3', stem: '남기', ending: '다', conjugatedEnding: '안 남겨요', conjugatedStem: '남겨', baseWord: '남기다', conjugatedWord: '안 남겨요', illustrationSvg: NAMGIDA_SVG,
    meanings: { ko: '남기다', en: 'Leave (food)', vi: 'Để lại (thức ăn)', bn: 'ফেলে রাখা', zh: '剩下', ru: 'Оставлять (еду)', ja: '残す', mn: 'Үлдээх' },
    conjugatedMeanings: { ko: '안 남겨요', en: "Don't leave", vi: 'Không để lại', bn: 'রাখি না', zh: '不剩', ru: 'Не оставляю', ja: '残しません', mn: 'Үлдээхгүй' },
    sentencePrefix: '반찬을 ', sentenceHighlight: '안 남겨요', sentenceSuffix: '.', tracingText: '안 남겨요'
  },
  {
    id: '11-4', badge: '11-4', stem: '참', ending: '다', conjugatedEnding: '못 참아요', baseWord: '참다', conjugatedWord: '못 참아요', illustrationSvg: CHAMDA_U11_SVG,
    meanings: { ko: '참다', en: 'Hold back', vi: 'Nhịn', bn: 'সহ্য করা', zh: '忍', ru: 'Терпеть', ja: '我慢する', mn: 'Тэвчих' },
    conjugatedMeanings: { ko: '못 참아요', en: "Can't hold back", vi: 'Không thể nhịn', bn: 'পারি না', zh: '忍不住', ru: 'Не могу терпеть', ja: '我慢できません', mn: 'Тэвчиж чадахгүй' },
    sentencePrefix: '웃음을 ', sentenceHighlight: '못 참아요', sentenceSuffix: '.', tracingText: '못 참아요'
  },
  {
    id: '11-5', badge: '11-5', stem: '던지', ending: '다', conjugatedEnding: '못 던져요', conjugatedStem: '던져', baseWord: '던지다', conjugatedWord: '못 던져요', illustrationSvg: DEONJIDA_U11_SVG,
    meanings: { ko: '던지다', en: 'Throw', vi: 'Ném', bn: 'ছোঁড়া', zh: '扔', ru: 'Бросать', ja: '投げる', mn: 'Шидэх' },
    conjugatedMeanings: { ko: '못 던져요', en: "Can't throw", vi: 'Không thể ném', bn: 'ছুঁড়তে পারি না', zh: '扔不了', ru: 'Не могу бросить', ja: '投げられません', mn: 'Шидэж чадахгүй' },
    sentencePrefix: '공을 멀리 ', sentenceHighlight: '못 던져요', sentenceSuffix: '.', tracingText: '못 던져요'
  }
];

// ============================================================================
// 제12단원: 부정2 ([명사] 안 해요, [명사] 못 해요)
// ============================================================================
export const VERB_UNIT_12_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '12-1', badge: '12-1', stem: '게임', ending: '하다', conjugatedEnding: '안 해요', baseWord: '게임하다', conjugatedWord: '게임 안 해요', illustrationSvg: GEIMHADA_SVG,
    meanings: { ko: '게임하다', en: 'to play a game', vi: 'chơi trò chơi', bn: 'গেম খেলা', zh: '玩游戏', ru: 'играть в игру', ja: 'ゲームをする', mn: 'тоглоом тоглох' },
    sentencePrefix: '게임은 ', sentenceHighlight: '안 해요', sentenceSuffix: '.', tracingText: '게임 안 해요'
  },
  {
    id: '12-2', badge: '12-2', stem: '줄넘기', ending: '하다', conjugatedEnding: '못 해요', baseWord: '줄넘기하다', conjugatedWord: '줄넘기 못 해요', illustrationSvg: JULNEOMGIHADA_SVG,
    meanings: { ko: '줄넘기하다', en: 'to jump rope', vi: 'nhảy dây', bn: 'দড়ি লাফানো', zh: '跳绳', ru: 'прыгать через скакалку', ja: '縄跳びをする', mn: 'дээс тоглох' },
    sentencePrefix: '줄넘기를 ', sentenceHighlight: '못 해요', sentenceSuffix: '.', tracingText: '줄넘기 못 해요'
  },
  {
    id: '12-3', badge: '12-3', stem: '요리', ending: '하다', conjugatedEnding: '못 해요', baseWord: '요리하다', conjugatedWord: '요리 못 해요', illustrationSvg: YORIHADA_SVG,
    meanings: { ko: '요리하다', en: 'to cook', vi: 'nấu ăn', bn: 'রান্না করা', zh: '做饭', ru: 'готовить', ja: '料理する', mn: 'хоол хийх' },
    sentencePrefix: '혼자 ', sentenceHighlight: '요리 못 해요', sentenceSuffix: '.', tracingText: '요리 못 해요'
  },
  {
    id: '12-4', badge: '12-4', stem: '운전', ending: '하다', conjugatedEnding: '못 해요', baseWord: '운전하다', conjugatedWord: '운전 못 해요', illustrationSvg: UNJEONHADA_SVG,
    meanings: { ko: '운전하다', en: 'to drive', vi: 'lái xe', bn: 'গাড়ি চালানো', zh: '开车', ru: 'водить машину', ja: '運転する', mn: 'жолоо барих' },
    sentencePrefix: '아직 ', sentenceHighlight: '운전 못 해요', sentenceSuffix: '.', tracingText: '운전 못 해요'
  },
  {
    id: '12-5', badge: '12-5', stem: '샤워', ending: '하다', conjugatedEnding: '안 해요', baseWord: '샤워하다', conjugatedWord: '샤워 안 해요', illustrationSvg: SHAWEOHADA_SVG,
    meanings: { ko: '샤워하다', en: 'to take a shower', vi: 'tắm vòi hoa sen', bn: 'গোসল করা', zh: '淋浴', ru: 'принимать душ', ja: 'シャワーを浴びる', mn: 'шүршүүрт орох' },
    sentencePrefix: '아침에는 ', sentenceHighlight: '샤워 안 해요', sentenceSuffix: '.', tracingText: '샤워 안 해요'
  }
];

// ============================================================================
// 제13단원: 희망 (-고 싶어요)
// ============================================================================
export const VERB_UNIT_13_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '13-1', badge: '13-1', stem: '배우', ending: '다', conjugatedEnding: '고 싶어요', baseWord: '배우다', conjugatedWord: '배우고 싶어요', illustrationSvg: BAEUDA_U13_SVG,
    meanings: { ko: '배우다', en: 'to learn', vi: 'học', bn: 'শেখা', zh: '学习', ru: 'учить', ja: '習う', mn: 'сурах' },
    sentencePrefix: '태권도를 ', sentenceHighlight: '배우고 싶어요', sentenceSuffix: '.', tracingText: '배우고 싶어요'
  },
  {
    id: '13-2', badge: '13-2', stem: '만나', ending: '다', conjugatedEnding: '고 싶어요', baseWord: '만나다', conjugatedWord: '만나고 싶어요', illustrationSvg: MANNADA_SVG,
    meanings: { ko: '만나다', en: 'to meet', vi: 'gặp gỡ', bn: 'দেখা করা', zh: '见面', ru: 'встречаться', ja: '会う', mn: 'уулзах' },
    sentencePrefix: '친구를 ', sentenceHighlight: '만나고 싶어요', sentenceSuffix: '.', tracingText: '만나고 싶어요'
  },
  {
    id: '13-3', badge: '13-3', stem: '사', ending: '다', conjugatedEnding: '고 싶어요', baseWord: '사다', conjugatedWord: '사고 싶어요', illustrationSvg: SADA_U13_SVG,
    meanings: { ko: '사다', en: 'to buy', vi: 'mua', bn: 'কেনা', zh: '买', ru: 'покупать', ja: '買う', mn: 'худалдан авах' },
    sentencePrefix: '빵을 ', sentenceHighlight: '사고 싶어요', sentenceSuffix: '.', tracingText: '사고 싶어요'
  },
  {
    id: '13-4', badge: '13-4', stem: '여행', ending: '하다', conjugatedEnding: '하고 싶어요', baseWord: '여행하다', conjugatedWord: '여행하고 싶어요', illustrationSvg: YEOHAENGHADA_U13_SVG,
    meanings: { ko: '여행하다', en: 'to travel', vi: 'du lịch', bn: 'ভ্রমণ করা', zh: '旅行', ru: 'путешествовать', ja: '旅行する', mn: 'аялах' },
    sentencePrefix: '바다로 ', sentenceHighlight: '여행하고 싶어요', sentenceSuffix: '.', tracingText: '여행하고 싶어요'
  },
  {
    id: '13-5', badge: '13-5', stem: '잘', ending: '하다', conjugatedEnding: '하고 싶어요', baseWord: '잘하다', conjugatedWord: '잘하고 싶어요', illustrationSvg: JALHADA_SVG,
    meanings: { ko: '잘하다', en: 'to do well', vi: 'làm giỏi', bn: 'ভালো করা', zh: '擅长 / 做好', ru: 'хорошо делать', ja: '上手にする', mn: 'сайн хийх' },
    sentencePrefix: '수학을 ', sentenceHighlight: '잘하고 싶어요', sentenceSuffix: '.', tracingText: '잘하고 싶어요'
  }
];

// ============================================================================
// 제14단원: 진행 (-고 있어요)
// ============================================================================
export const VERB_UNIT_14_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '14-1', badge: '14-1', stem: '일', ending: '하다', conjugatedEnding: '하고 있어요', baseWord: '일하다', conjugatedWord: '일하고 있어요', illustrationSvg: ILHADA_SVG,
    meanings: { ko: '일하다', en: 'to work', vi: 'làm việc', bn: 'কাজ করা', zh: '工作', ru: 'работать', ja: '働く', mn: 'ажиллах' },
    sentencePrefix: '아버지가 ', sentenceHighlight: '일하고 있어요', sentenceSuffix: '.', tracingText: '일하고 있어요'
  },
  {
    id: '14-2', badge: '14-2', stem: '이야기', ending: '하다', conjugatedEnding: '하고 있어요', baseWord: '이야기하다', conjugatedWord: '이야기하고 있어요', illustrationSvg: IYAGIHADA_SVG,
    meanings: { ko: '이야기하다', en: 'to talk / to converse', vi: 'nói chuyện', bn: 'কথা বলা', zh: '谈话 / 聊天', ru: 'разговаривать', ja: '話す', mn: 'ярилцах' },
    sentencePrefix: '친구와 ', sentenceHighlight: '이야기하고 있어요', sentenceSuffix: '.', tracingText: '이야기하고 있어요'
  },
  {
    id: '14-3', badge: '14-3', stem: '준비', ending: '하다', conjugatedEnding: '하고 있어요', baseWord: '준비하다', conjugatedWord: '준비하고 있어요', illustrationSvg: JUNBIHADA_SVG,
    meanings: { ko: '준비하다', en: 'to prepare', vi: 'chuẩn bị', bn: 'প্রস্তুত করা', zh: '准备', ru: 'готовиться', ja: '準備する', mn: 'бэлтгэх' },
    sentencePrefix: '수업을 ', sentenceHighlight: '준비하고 있어요', sentenceSuffix: '.', tracingText: '준비하고 있어요'
  },
  {
    id: '14-4', badge: '14-4', stem: '짓', ending: '다', conjugatedEnding: '고 있어요', baseWord: '짓다', conjugatedWord: '짓고 있어요', illustrationSvg: JITDA_SVG,
    meanings: { ko: '짓다', en: 'to build', vi: 'xây dựng', bn: 'তৈরি করা', zh: '建造', ru: 'строить', ja: '建てる / 造る', mn: 'барих' },
    sentencePrefix: '집을 ', sentenceHighlight: '짓고 있어요', sentenceSuffix: '.', tracingText: '짓고 있어요'
  },
  {
    id: '14-5', badge: '14-5', stem: '물어보', ending: '다', conjugatedEnding: '고 있어요', baseWord: '물어보다', conjugatedWord: '물어보고 있어요', illustrationSvg: MUREOBODA_SVG,
    meanings: { ko: '물어보다', en: 'to ask / to inquire', vi: 'hỏi', bn: 'জিজ্ঞাসা করা', zh: '询问', ru: 'спрашивать', ja: '尋ねる', mn: 'лавлах' },
    sentencePrefix: '선생님께 ', sentenceHighlight: '물어보고 있어요', sentenceSuffix: '.', tracingText: '물어보고 있어요'
  }
];

// ============================================================================
// 제15단원: 요청 (-세요, -으세요)
// ============================================================================
export const VERB_UNIT_15_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '15-1', badge: '15-1', stem: '말', ending: '하다', conjugatedEnding: '하세요', baseWord: '말하다', conjugatedWord: '말하세요', illustrationSvg: MALHADA_SVG,
    meanings: { ko: '말하다', en: 'to speak / to talk', vi: 'nói', bn: 'কথা বলা', zh: '说', ru: 'говорить', ja: '話す', mn: 'ярих' },
    sentencePrefix: '천천히 ', sentenceHighlight: '말하세요', sentenceSuffix: '.', tracingText: '말하세요'
  },
  {
    id: '15-2', badge: '15-2', stem: '서', ending: '다', conjugatedEnding: '세요', baseWord: '서다', conjugatedWord: '서세요', illustrationSvg: SEODA_SVG,
    meanings: { ko: '서다', en: 'to stand', vi: 'đứng', bn: 'দাঁড়ানো', zh: '站', ru: 'стоять', ja: '立つ', mn: 'зогсох' },
    sentencePrefix: '여기에 ', sentenceHighlight: '서세요', sentenceSuffix: '.', tracingText: '서세요'
  },
  {
    id: '15-3', badge: '15-3', stem: '넣', ending: '다', conjugatedEnding: '으세요', baseWord: '넣다', conjugatedWord: '넣으세요', illustrationSvg: NEOTDA_SVG,
    meanings: { ko: '넣다', en: 'to put in', vi: 'bỏ vào / cho vào', bn: 'ঢোকানো', zh: '放进', ru: 'класть внутрь', ja: '入れる', mn: 'хийх / оруулах' },
    sentencePrefix: '책을 ', sentenceHighlight: '넣으세요', sentenceSuffix: '.', tracingText: '넣으세요'
  },
  {
    id: '15-4', badge: '15-4', stem: '걷', ending: '다', conjugatedEnding: '으세요', conjugatedStem: '걸', baseWord: '걷다', conjugatedWord: '걸으세요', illustrationSvg: GEOTDA_SVG,
    meanings: { ko: '걷다', en: 'to walk', vi: 'đi bộ', bn: 'হাঁটা', zh: '走', ru: 'идти пешком', ja: '歩く', mn: 'алхах' },
    sentencePrefix: '복도에서 ', sentenceHighlight: '걸으세요', sentenceSuffix: '.', tracingText: '걸으세요'
  },
  {
    id: '15-5', badge: '15-5', stem: '풀', ending: '다', conjugatedEnding: '세요', conjugatedStem: '푸', baseWord: '풀다', conjugatedWord: '푸세요', illustrationSvg: PULDA_SVG,
    meanings: { ko: '풀다', en: 'to solve', vi: 'giải (bài tập)', bn: 'সমাধান করা', zh: '做 / 解答', ru: 'решать', ja: '解く', mn: 'бодох' },
    sentencePrefix: '문제를 ', sentenceHighlight: '푸세요', sentenceSuffix: '.', tracingText: '푸세요'
  }
];

// ============================================================================
// 제16단원: 금지 (-지 마세요)
// ============================================================================
export const VERB_UNIT_16_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '16-1', badge: '16-1', stem: '뛰', ending: '다', conjugatedEnding: '지 마세요', baseWord: '뛰다', conjugatedWord: '뛰지 마세요', illustrationSvg: TTWIDA_SVG,
    meanings: { ko: '뛰다', en: 'to run', vi: 'chạy', bn: 'দৌড়ানো', zh: '跑', ru: 'бегать', ja: '走る', mn: 'гүйх' },
    sentencePrefix: '계단에서 ', sentenceHighlight: '뛰지 마세요', sentenceSuffix: '.', tracingText: '뛰지 마세요'
  },
  {
    id: '16-2', badge: '16-2', stem: '만지', ending: '다', conjugatedEnding: '지 마세요', baseWord: '만지다', conjugatedWord: '만지지 마세요', illustrationSvg: MANJIDA_SVG,
    meanings: { ko: '만지다', en: 'to touch', vi: 'sờ / chạm', bn: 'স্পর্শ করা', zh: '摸 / 碰', ru: 'трогать', ja: '触る', mn: 'хүрэх' },
    sentencePrefix: '뜨거우니 ', sentenceHighlight: '만지지 마세요', sentenceSuffix: '.', tracingText: '만지지 마세요'
  },
  {
    id: '16-3', badge: '16-3', stem: '싸우', ending: '다', conjugatedEnding: '지 마세요', baseWord: '싸우다', conjugatedWord: '싸우지 마세요', illustrationSvg: SSAUDA_SVG,
    meanings: { ko: '싸우다', en: 'to fight', vi: 'cãi nhau / đánh nhau', bn: 'ঝগড়া করা', zh: '吵架 / 打架', ru: 'драться / ссориться', ja: '喧嘩する', mn: 'хэрэлдэх' },
    sentencePrefix: '친구와 ', sentenceHighlight: '싸우지 마세요', sentenceSuffix: '.', tracingText: '싸우지 마세요'
  },
  {
    id: '16-4', badge: '16-4', stem: '떠들', ending: '다', conjugatedEnding: '지 마세요', baseWord: '떠들다', conjugatedWord: '떠들지 마세요', illustrationSvg: TTEODEULDA_SVG,
    meanings: { ko: '떠들다', en: 'to make noise', vi: 'làm ồn', bn: 'গোলমাল করা', zh: '吵闹', ru: 'шуметь', ja: '騒ぐ', mn: 'шуугих' },
    sentencePrefix: '도서관에서 ', sentenceHighlight: '떠들지 마세요', sentenceSuffix: '.', tracingText: '떠들지 마세요'
  },
  {
    id: '16-5', badge: '16-5', stem: '버리', ending: '다', conjugatedEnding: '지 마세요', baseWord: '버리다', conjugatedWord: '버리지 마세요', illustrationSvg: BEORIDA_SVG,
    meanings: { ko: '버리다', en: 'to throw away', vi: 'vứt (rác)', bn: 'ফেলে দেওয়া', zh: '扔 / 扔掉', ru: 'бросать / выбрасывать', ja: '捨てる', mn: 'хаях' },
    sentencePrefix: '쓰레기를 ', sentenceHighlight: '버리지 마세요', sentenceSuffix: '.', tracingText: '버리지 마세요'
  }
];

// ============================================================================
// 제17단원: 미래 (-ㄹ 거예요, -을 거예요)
// ============================================================================
export const VERB_UNIT_17_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '17-1', badge: '17-1', stem: '가져오', ending: '다', conjugatedEnding: 'ㄹ 거예요', baseWord: '가져오다', conjugatedWord: '가져올 거예요', illustrationSvg: GAJYEO_ODA_SVG,
    meanings: { ko: '가져오다', en: 'to bring', vi: 'mang đến', bn: 'নিয়ে আসা', zh: '带来', ru: 'приносить', ja: '持ってくる', mn: 'авчрах' },
    sentencePrefix: '준비물을 ', sentenceHighlight: '가져올 거예요', sentenceSuffix: '.', tracingText: '가져올 거예요'
  },
  {
    id: '17-2', badge: '17-2', stem: '끝나', ending: '다', conjugatedEnding: 'ㄹ 거예요', baseWord: '끝나다', conjugatedWord: '끝날 거예요', illustrationSvg: KKEUTNADA_SVG,
    meanings: { ko: '끝나다', en: 'to end / to finish', vi: 'kết thúc', bn: 'শেষ হওয়া', zh: '结束', ru: 'заканчиваться', ja: '終わる', mn: 'дуусах' },
    sentencePrefix: '수업이 곧 ', sentenceHighlight: '끝날 거예요', sentenceSuffix: '.', tracingText: '끝날 거예요'
  },
  {
    id: '17-3', badge: '17-3', stem: '살', ending: '다', conjugatedEnding: ' 거예요', conjugatedStem: '살', baseWord: '살다', conjugatedWord: '살 거예요', illustrationSvg: SALDA_SVG,
    meanings: { ko: '살다', en: 'to live', vi: 'sống', bn: 'বাস করা', zh: '居住 / 生活', ru: 'жить', ja: '住む', mn: 'амьдрах' },
    sentencePrefix: '한국에서 ', sentenceHighlight: '살 거예요', sentenceSuffix: '.', tracingText: '살 거예요'
  },
  {
    id: '17-4', badge: '17-4', stem: '놓', ending: '다', conjugatedEnding: '을 거예요', baseWord: '놓다', conjugatedWord: '놓을 거예요', illustrationSvg: NOTDA_SVG,
    meanings: { ko: '놓다', en: 'to put / to place', vi: 'đặt / để', bn: 'রাখা', zh: '放', ru: 'класть', ja: '置く', mn: 'тавих' },
    sentencePrefix: '가방을 ', sentenceHighlight: '놓을 거예요', sentenceSuffix: '.', tracingText: '놓을 거예요'
  },
  {
    id: '17-5', badge: '17-5', stem: '일어나', ending: '다', conjugatedEnding: 'ㄹ 거예요', baseWord: '일어나다', conjugatedWord: '일어날 거예요', illustrationSvg: IREONADA_SVG,
    meanings: { ko: '일어나다', en: 'to wake up / to get up', vi: 'thức dậy', bn: 'ঘুম থেকে ওঠা', zh: '起床', ru: 'вставать / просыпаться', ja: '起きる', mn: 'босох' },
    sentencePrefix: '일찍 ', sentenceHighlight: '일어날 거예요', sentenceSuffix: '.', tracingText: '일어날 거예요'
  }
];

// ============================================================================
// 제18단원: 부탁 (-아 주세요, -어 주세요, -해 주세요)
// ============================================================================
export const VERB_UNIT_18_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '18-1', badge: '18-1', stem: '기다리', ending: '다', conjugatedEnding: ' 주세요', conjugatedStem: '기다려', baseWord: '기다리다', conjugatedWord: '기다려 주세요', illustrationSvg: GIDARIDA_SVG,
    meanings: { ko: '기다리다', en: 'to wait', vi: 'chờ đợi', bn: 'অপেক্ষা করা', zh: '等', ru: 'ждать', ja: '待つ', mn: 'хүлээх' },
    sentencePrefix: '조금 ', sentenceHighlight: '기다려 주세요', sentenceSuffix: '.', tracingText: '기다려 주세요'
  },
  {
    id: '18-2', badge: '18-2', stem: '설명', ending: '하다', conjugatedEnding: '해 주세요', baseWord: '설명하다', conjugatedWord: '설명해 주세요', illustrationSvg: SEOLMYEONGHADA_SVG,
    meanings: { ko: '설명하다', en: 'to explain', vi: 'giải thích', bn: 'ব্যাখ্যা করা', zh: '解释 / 说明', ru: 'объяснять', ja: '説明する', mn: 'тайлбарлах' },
    sentencePrefix: '다시 ', sentenceHighlight: '설명해 주세요', sentenceSuffix: '.', tracingText: '설명해 주세요'
  },
  {
    id: '18-3', badge: '18-3', stem: '깎', ending: '다', conjugatedEnding: '아 주세요', baseWord: '깎다', conjugatedWord: '깎아 주세요', illustrationSvg: KKAKDA_SVG,
    meanings: { ko: '깎다', en: 'to sharpen / to peel', vi: 'gọt (bút chì)', bn: 'ধারালো করা', zh: '削（铅笔）', ru: 'точить (карандаш)', ja: '削る', mn: 'үзүүрлэх' },
    sentencePrefix: '연필을 ', sentenceHighlight: '깎아 주세요', sentenceSuffix: '.', tracingText: '깎아 주세요'
  },
  {
    id: '18-4', badge: '18-4', stem: '켜', ending: '다', conjugatedEnding: ' 주세요', conjugatedStem: '켜', baseWord: '켜다', conjugatedWord: '켜 주세요', illustrationSvg: KYEODA_SVG,
    meanings: { ko: '켜다', en: 'to turn on', vi: 'bật (đèn)', bn: 'চালু করা', zh: '开（灯）', ru: 'включать', ja: 'つける', mn: 'асаах' },
    sentencePrefix: '불을 ', sentenceHighlight: '켜 주세요', sentenceSuffix: '.', tracingText: '켜 주세요'
  },
  {
    id: '18-5', badge: '18-5', stem: '끄', ending: '다', conjugatedEnding: ' 주세요', conjugatedStem: '꺼', baseWord: '끄다', conjugatedWord: '꺼 주세요', illustrationSvg: KKEUDA_SVG,
    meanings: { ko: '끄다', en: 'to turn off', vi: 'tắt (đèn)', bn: 'বন্ধ করা', zh: '关（灯）', ru: 'выключать', ja: '消す', mn: 'унтраах' },
    sentencePrefix: '불을 ', sentenceHighlight: '꺼 주세요', sentenceSuffix: '.', tracingText: '꺼 주세요'
  }
];

// ============================================================================
// 제19단원: 허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?)
// ============================================================================
export const VERB_UNIT_19_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '19-1', badge: '19-1', stem: '들어가', ending: '다', conjugatedEnding: '도 돼요?', baseWord: '들어가다', conjugatedWord: '들어가도 돼요?', illustrationSvg: DEUREOGADA_SVG,
    meanings: { ko: '들어가다', en: 'to enter', vi: 'đi vào', bn: 'ভেতরে যাওয়া', zh: '进去', ru: 'входить', ja: '入る', mn: 'орох' },
    sentencePrefix: '교실에 ', sentenceHighlight: '들어가도 돼요?', sentenceSuffix: '', tracingText: '들어가도 돼요?'
  },
  {
    id: '19-2', badge: '19-2', stem: '나가', ending: '다', conjugatedEnding: '도 돼요?', baseWord: '나가다', conjugatedWord: '나가도 돼요?', illustrationSvg: NAGADA_SVG,
    meanings: { ko: '나가다', en: 'to go out', vi: 'đi ra ngoài', bn: 'বাইরে যাওয়া', zh: '出去', ru: 'выходить', ja: '出る', mn: 'гарах' },
    sentencePrefix: '밖으로 ', sentenceHighlight: '나가도 돼요?', sentenceSuffix: '', tracingText: '나가도 돼요?'
  },
  {
    id: '19-3', badge: '19-3', stem: '빌리', ending: '다', conjugatedEnding: '도 돼요?', conjugatedStem: '빌려', baseWord: '빌리다', conjugatedWord: '빌려도 돼요?', illustrationSvg: BILLIDA_U19_SVG,
    meanings: { ko: '빌리다', en: 'to borrow', vi: 'mượn', bn: 'ধার করা', zh: '借', ru: 'брать взаймы', ja: '借りる', mn: 'зээлэх' },
    sentencePrefix: '색연필을 ', sentenceHighlight: '빌려도 돼요?', sentenceSuffix: '', tracingText: '빌려도 돼요?'
  },
  {
    id: '19-4', badge: '19-4', stem: '사용', ending: '하다', conjugatedEnding: '해도 돼요?', baseWord: '사용하다', conjugatedWord: '사용해도 돼요?', illustrationSvg: SAYONGHADA_SVG,
    meanings: { ko: '사용하다', en: 'to use', vi: 'sử dụng', bn: 'ব্যবহার করা', zh: '使用', ru: 'использовать', ja: '使う', mn: 'хэрэглэх' },
    sentencePrefix: '가위를 ', sentenceHighlight: '사용해도 돼요?', sentenceSuffix: '', tracingText: '사용해도 돼요?'
  },
  {
    id: '19-5', badge: '19-5', stem: '움직이', ending: '다', conjugatedEnding: '도 돼요?', conjugatedStem: '움직여', baseWord: '움직이다', conjugatedWord: '움직여도 돼요?', illustrationSvg: UMJIGIDA_SVG,
    meanings: { ko: '움직이다', en: 'to move', vi: 'di chuyển / cử động', bn: 'নড়াচড়া করা', zh: '动 / 移动', ru: 'двигаться', ja: '動く', mn: 'хөдлөх' },
    sentencePrefix: '자리에서 ', sentenceHighlight: '움직여도 돼요?', sentenceSuffix: '', tracingText: '움직여도 돼요?'
  }
];

// ============================================================================
// 제20단원: 의무 (-아야 돼요, -어야 돼요, -해야 돼요)
// ============================================================================
export const VERB_UNIT_20_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '20-1', badge: '20-1', stem: '조심', ending: '하다', conjugatedEnding: '해야 돼요', baseWord: '조심하다', conjugatedWord: '조심해야 돼요', illustrationSvg: JOSIMHADA_SVG,
    meanings: { ko: '조심하다', en: 'to be careful', vi: 'cẩn thận', bn: 'সাবধান হওয়া', zh: '小心', ru: 'быть осторожным', ja: '気をつける', mn: 'болгоомжлох' },
    sentencePrefix: '계단에서 ', sentenceHighlight: '조심해야 돼요', sentenceSuffix: '.', tracingText: '조심해야 돼요'
  },
  {
    id: '20-2', badge: '20-2', stem: '남', ending: '다', conjugatedEnding: '아야 돼요', baseWord: '남다', conjugatedWord: '남아야 돼요', illustrationSvg: NAMDA_SVG,
    meanings: { ko: '남다', en: 'to stay / to remain', vi: 'ở lại', bn: 'থাকা', zh: '留下', ru: 'оставаться', ja: '残る', mn: 'үлдэн хоцрох' },
    sentencePrefix: '교실에 ', sentenceHighlight: '남아야 돼요', sentenceSuffix: '.', tracingText: '남아야 돼요'
  },
  {
    id: '20-3', badge: '20-3', stem: '꺼내', ending: '다', conjugatedEnding: '야 돼요', baseWord: '꺼내다', conjugatedWord: '꺼내야 돼요', illustrationSvg: KKEONAEDA_SVG,
    meanings: { ko: '꺼내다', en: 'to take out', vi: 'lấy ra', bn: 'বের করা', zh: '拿出', ru: 'доставать', ja: '取り出す', mn: 'гаргах' },
    sentencePrefix: '공책을 ', sentenceHighlight: '꺼내야 돼요', sentenceSuffix: '.', tracingText: '꺼내야 돼요'
  },
  {
    id: '20-4', badge: '20-4', stem: '지키', ending: '다', conjugatedEnding: '야 돼요', conjugatedStem: '지켜', baseWord: '지키다', conjugatedWord: '지켜야 돼요', illustrationSvg: JIKIDA_SVG,
    meanings: { ko: '지키다', en: 'to keep / to follow (rules)', vi: 'tuân thủ / giữ gìn', bn: 'মেনে চলা', zh: '遵守', ru: 'соблюдать', ja: '守る', mn: 'сахих / баримтлах' },
    sentencePrefix: '규칙을 ', sentenceHighlight: '지켜야 돼요', sentenceSuffix: '.', tracingText: '지켜야 돼요'
  },
  {
    id: '20-5', badge: '20-5', stem: '바르', ending: '다', conjugatedEnding: '야 돼요', conjugatedStem: '발라', baseWord: '바르다', conjugatedWord: '발라야 돼요', illustrationSvg: BAREUDA_U20_SVG,
    meanings: { ko: '바르다', en: 'to apply / to put on', vi: 'bôi / thoa (thuốc)', bn: 'লাগানো / মাখা', zh: '涂（药）', ru: 'мазать (лекарство)', ja: '塗る（薬）', mn: 'түрхэх (эм)' },
    sentencePrefix: '손에 약을 ', sentenceHighlight: '발라야 돼요', sentenceSuffix: '.', tracingText: '발라야 돼요'
  }
];

// ============================================================================
// 제21단원: 능력 (-ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요)
// ============================================================================
export const VERB_UNIT_21_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '21-1', badge: '21-1', stem: '건너', ending: '다', conjugatedEnding: 'ㄹ 수 있어요', conjugatedStem: '건널', baseWord: '건너다', conjugatedWord: '건널 수 있어요', illustrationSvg: GEONNEODA_SVG,
    meanings: { ko: '건너다', en: 'to cross', vi: 'băng qua', bn: 'পার হওয়া', zh: '穿过 / 过马路', ru: 'переходить', ja: '渡る', mn: 'гарах' },
    sentencePrefix: '초록불에 ', sentenceHighlight: '건널 수 있어요', sentenceSuffix: '.', tracingText: '건널 수 있어요'
  },
  {
    id: '21-2', badge: '21-2', stem: '날', ending: '다', conjugatedEnding: ' 수 있어요', baseWord: '날다', conjugatedWord: '날 수 있어요', illustrationSvg: NALDA_SVG,
    meanings: { ko: '날다', en: 'to fly', vi: 'bay', bn: 'ওড়া', zh: '飞', ru: 'летать', ja: '飛ぶ', mn: 'нисэх' },
    sentencePrefix: '새가 ', sentenceHighlight: '날 수 있어요', sentenceSuffix: '.', tracingText: '날 수 있어요'
  },
  {
    id: '21-3', badge: '21-3', stem: '접', ending: '다', conjugatedEnding: '을 수 있어요', baseWord: '접다', conjugatedWord: '접을 수 있어요', illustrationSvg: JEOPDA_SVG,
    meanings: { ko: '접다', en: 'to fold', vi: 'gấp', bn: 'ভাঁজ করা', zh: '折 / 叠', ru: 'складывать', ja: '折る', mn: 'эвхэх' },
    sentencePrefix: '종이를 ', sentenceHighlight: '접을 수 있어요', sentenceSuffix: '.', tracingText: '접을 수 있어요'
  },
  {
    id: '21-4', badge: '21-4', stem: '밟', ending: '다', conjugatedEnding: '을 수 없어요', baseWord: '밟다', conjugatedWord: '밟을 수 없어요', illustrationSvg: BALBDA_U21_SVG,
    meanings: { ko: '밟다', en: 'to step on', vi: 'giẫm lên', bn: 'পা দেওয়া', zh: '踩', ru: 'наступать', ja: '踏む', mn: 'гишгэх' },
    sentencePrefix: '잔디를 ', sentenceHighlight: '밟을 수 없어요', sentenceSuffix: '.', tracingText: '밟을 수 없어요'
  },
  {
    id: '21-5', badge: '21-5', stem: '올리', ending: '다', conjugatedEnding: 'ㄹ 수 없어요', conjugatedStem: '올릴', baseWord: '올리다', conjugatedWord: '올릴 수 없어요', illustrationSvg: OLLIDA_U21_SVG,
    meanings: { ko: '올리다', en: 'to raise / to lift', vi: 'giơ lên', bn: 'তোলা', zh: '举起 / 抬起', ru: 'поднимать', ja: '上げる', mn: 'өргөх' },
    sentencePrefix: '팔을 ', sentenceHighlight: '올릴 수 없어요', sentenceSuffix: '.', tracingText: '올릴 수 없어요'
  }
];

// ============================================================================
// 제22단원: 제안 (-ㄹ까요?, -을까요?)
// ============================================================================
export const VERB_UNIT_22_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '22-1', badge: '22-1', stem: '나누', ending: '다', conjugatedEnding: 'ㄹ까요?', conjugatedStem: '나눌', baseWord: '나누다', conjugatedWord: '나눌까요?', illustrationSvg: NANUUDA_U22_SVG,
    meanings: { ko: '나누다', en: 'to divide / to share', vi: 'chia', bn: 'ভাগ করা', zh: '分 / 划分', ru: 'делить', ja: '分ける', mn: 'хуваах' },
    sentencePrefix: '카드를 둘로 ', sentenceHighlight: '나눌까요?', sentenceSuffix: '', tracingText: '나눌까요?'
  },
  {
    id: '22-2', badge: '22-2', stem: '바꾸', ending: '다', conjugatedEnding: 'ㄹ까요?', conjugatedStem: '바꿀', baseWord: '바꾸다', conjugatedWord: '바꿀까요?', illustrationSvg: BAKKUDA_U22_SVG,
    meanings: { ko: '바꾸다', en: 'to change / to swap', vi: 'đổi', bn: 'বদলানো', zh: '换 / 交换', ru: 'менять', ja: '変える', mn: 'солих' },
    sentencePrefix: '자리를 ', sentenceHighlight: '바꿀까요?', sentenceSuffix: '', tracingText: '바꿀까요?'
  },
  {
    id: '22-3', badge: '22-3', stem: '모이', ending: '다', conjugatedEnding: 'ㄹ까요?', conjugatedStem: '모일', baseWord: '모이다', conjugatedWord: '모일까요?', illustrationSvg: MOIDA_SVG,
    meanings: { ko: '모이다', en: 'to gather', vi: 'tập hợp', bn: 'জড়ো হওয়া', zh: '集合 / 聚集', ru: 'собираться', ja: '集まる', mn: 'цугларах' },
    sentencePrefix: '강당에 ', sentenceHighlight: '모일까요?', sentenceSuffix: '', tracingText: '모일까요?'
  },
  {
    id: '22-4', badge: '22-4', stem: '더', ending: '하다', conjugatedEnding: '할까요?', baseWord: '더하다', conjugatedWord: '더할까요?', illustrationSvg: DEOHADA_SVG,
    meanings: { ko: '더하다', en: 'to add', vi: 'cộng thêm', bn: 'যোগ করা', zh: '加 / 加上', ru: 'прибавлять', ja: '足す', mn: 'нэмэх' },
    sentencePrefix: '3을 ', sentenceHighlight: '더할까요?', sentenceSuffix: '', tracingText: '더할까요?'
  },
  {
    id: '22-5', badge: '22-5', stem: '빼', ending: '다', conjugatedEnding: 'ㄹ까요?', conjugatedStem: '뺄', baseWord: '빼다', conjugatedWord: '뺄까요?', illustrationSvg: PPAEDA_SVG,
    meanings: { ko: '빼다', en: 'to subtract', vi: 'trừ đi', bn: 'বিয়োগ করা', zh: '减 / 减去', ru: 'вычитать', ja: '引く', mn: 'хасах' },
    sentencePrefix: '1을 ', sentenceHighlight: '뺄까요?', sentenceSuffix: '', tracingText: '뺄까요?'
  }
];

// ============================================================================
// 제23단원: 나열 (-고)
// ============================================================================
export const VERB_UNIT_23_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '23-1', badge: '23-1', stem: '세수', ending: '하다', conjugatedEnding: '하고', baseWord: '세수하다', conjugatedWord: '세수하고', illustrationSvg: SESUHADA_U23_SVG,
    meanings: { ko: '세수하다', en: 'to wash one’s face', vi: 'rửa mặt', bn: 'মুখ ধোয়া', zh: '洗脸', ru: 'умываться', ja: '顔を洗う', mn: 'нүүрээ угаах' },
    sentencePrefix: '', sentenceHighlight: '세수하고', sentenceSuffix: ' 밥 먹어요.', tracingText: '세수하고'
  },
  {
    id: '23-2', badge: '23-2', stem: '펴', ending: '다', conjugatedEnding: '고', baseWord: '펴다', conjugatedWord: '펴고', illustrationSvg: PYEODA_SVG,
    meanings: { ko: '펴다', en: 'to open / to spread', vi: 'mở ra', bn: 'মেলা / খোলা', zh: '翻开 / 展开', ru: 'открывать', ja: '広げる / 開く', mn: 'дэлгэх' },
    sentencePrefix: '책을 ', sentenceHighlight: '펴고', sentenceSuffix: ' 읽어요.', tracingText: '펴고'
  },
  {
    id: '23-3', badge: '23-3', stem: '챙기', ending: '다', conjugatedEnding: '고', baseWord: '챙기다', conjugatedWord: '챙기고', illustrationSvg: CHAENG_GIDA_U23_SVG,
    meanings: { ko: '챙기다', en: 'to pack / to take along', vi: 'chuẩn bị / mang theo', bn: 'গুছিয়ে নেওয়া', zh: '带上 / 整理', ru: 'собирать', ja: '用意する / 持っていく', mn: 'бэлдэх / авах' },
    sentencePrefix: '물을 ', sentenceHighlight: '챙기고', sentenceSuffix: ' 간식도 챙겨요.', tracingText: '챙기고'
  },
  {
    id: '23-4', badge: '23-4', stem: '치우', ending: '다', conjugatedEnding: '고', baseWord: '치우다', conjugatedWord: '치우고', illustrationSvg: CHIUDA_SVG,
    meanings: { ko: '치우다', en: 'to tidy up / to clean', vi: 'dọn dẹp', bn: 'পরিষ্কার করা', zh: '收拾 / 整理', ru: 'убирать', ja: '片付ける', mn: 'цэвэрлэх' },
    sentencePrefix: '책상을 ', sentenceHighlight: '치우고', sentenceSuffix: ' 공부해요.', tracingText: '치우고'
  },
  {
    id: '23-5', badge: '23-5', stem: '좋아', ending: '하다', conjugatedEnding: '하고', baseWord: '좋아하다', conjugatedWord: '좋아하고', illustrationSvg: JOAHADA_U23_SVG,
    meanings: { ko: '좋아하다', en: 'to like', vi: 'thích', bn: 'পছন্দ করা', zh: '喜欢', ru: 'нравиться / любить', ja: '好きだ', mn: 'дуртай байх' },
    sentencePrefix: '사탕도 ', sentenceHighlight: '좋아하고', sentenceSuffix: ' 젤리도 좋아해요.', tracingText: '좋아하고'
  }
];

// ============================================================================
// 제24단원: 대조 (-지만)
// ============================================================================
export const VERB_UNIT_24_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '24-1', badge: '24-1', stem: '어렵', ending: '다', conjugatedEnding: '지만', baseWord: '어렵다', conjugatedWord: '어렵지만', illustrationSvg: EORYEOPDA_U24_SVG,
    meanings: { ko: '어렵다', en: 'to be difficult', vi: 'khó', bn: 'কঠিন', zh: '难', ru: 'трудный', ja: '難しい', mn: 'хэцүү' },
    sentencePrefix: '수학은 ', sentenceHighlight: '어렵지만', sentenceSuffix: ' 재미있어요.', tracingText: '어렵지만'
  },
  {
    id: '24-2', badge: '24-2', stem: '슬프', ending: '다', conjugatedEnding: '지만', baseWord: '슬프다', conjugatedWord: '슬프지만', illustrationSvg: SEULPEUDA_U24_SVG,
    meanings: { ko: '슬프다', en: 'to be sad', vi: 'buồn', bn: 'দুঃখিত', zh: '伤心 / 难过', ru: 'грустный', ja: '悲しい', mn: 'гунигтай' },
    sentencePrefix: '', sentenceHighlight: '슬프지만', sentenceSuffix: ' 꾹 참아요.', tracingText: '슬프지만'
  },
  {
    id: '24-3', badge: '24-3', stem: '무겁', ending: '다', conjugatedEnding: '지만', baseWord: '무겁다', conjugatedWord: '무겁지만', illustrationSvg: MUGEOPDA_U24_SVG,
    meanings: { ko: '무겁다', en: 'to be heavy', vi: 'nặng', bn: 'ভারী', zh: '重', ru: 'тяжёлый', ja: '重い', mn: 'хүнд' },
    sentencePrefix: '이 가방은 ', sentenceHighlight: '무겁지만', sentenceSuffix: ' 예뻐요.', tracingText: '무겁지만'
  },
  {
    id: '24-4', badge: '24-4', stem: '멀', ending: '다', conjugatedEnding: '지만', baseWord: '멀다', conjugatedWord: '멀지만', illustrationSvg: MEOLDA_SVG,
    meanings: { ko: '멀다', en: 'to be far', vi: 'xa', bn: 'দূরে', zh: '远', ru: 'далёкий', ja: '遠い', mn: 'хол' },
    sentencePrefix: '학교는 ', sentenceHighlight: '멀지만', sentenceSuffix: ' 재밌어요.', tracingText: '멀지만'
  },
  {
    id: '24-5', badge: '24-5', stem: '틀리', ending: '다', conjugatedEnding: '지만', baseWord: '틀리다', conjugatedWord: '틀리지만', illustrationSvg: TEULLIDA_SVG,
    meanings: { ko: '틀리다', en: 'to be wrong', vi: 'sai', bn: 'ভুল হওয়া', zh: '错', ru: 'ошибаться', ja: '間違える', mn: 'буруу хийх' },
    sentencePrefix: '자주 ', sentenceHighlight: '틀리지만', sentenceSuffix: ' 괜찮아요.', tracingText: '틀리지만'
  }
];

// ============================================================================
// 제25단원: 이유 (-아서, -어서, -해서)
// ============================================================================
export const VERB_UNIT_25_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '25-1', badge: '25-1', stem: '배고프', ending: '다', conjugatedEnding: '서', conjugatedStem: '배고파', baseWord: '배고프다', conjugatedWord: '배고파서', illustrationSvg: BAEGOPEUDA_SVG,
    meanings: { ko: '배고프다', en: 'to be hungry', vi: 'đói bụng', bn: 'ক্ষুধার্ত', zh: '饿', ru: 'голодный', ja: 'お腹が空く', mn: 'өлсөх' },
    sentencePrefix: '', sentenceHighlight: '배고파서', sentenceSuffix: ' 많이 먹었어요.', tracingText: '배고파서'
  },
  {
    id: '25-2', badge: '25-2', stem: '늦', ending: '다', conjugatedEnding: '어서', baseWord: '늦다', conjugatedWord: '늦어서', illustrationSvg: NEUTDA_SVG,
    meanings: { ko: '늦다', en: 'to be late', vi: 'muộn', bn: 'দেরি হওয়া', zh: '迟到 / 晚', ru: 'опаздывать', ja: '遅れる', mn: 'хоцрох' },
    sentencePrefix: '', sentenceHighlight: '늦어서', sentenceSuffix: ' 뛰었어요.', tracingText: '늦어서'
  },
  {
    id: '25-3', badge: '25-3', stem: '덥', ending: '다', conjugatedEnding: '서', conjugatedStem: '더워', baseWord: '덥다', conjugatedWord: '더워서', illustrationSvg: DEOPDA_U25_SVG,
    meanings: { ko: '덥다', en: 'to be hot', vi: 'nóng', bn: 'গরম লাগা', zh: '热', ru: 'жарко', ja: '暑い', mn: 'халуун байх' },
    sentencePrefix: '', sentenceHighlight: '더워서', sentenceSuffix: ' 에어컨을 켰어요.', tracingText: '더워서'
  },
  {
    id: '25-4', badge: '25-4', stem: '빠르', ending: '다', conjugatedEnding: '서', conjugatedStem: '빨라', baseWord: '빠르다', conjugatedWord: '빨라서', illustrationSvg: PPAREUDA_U25_SVG,
    meanings: { ko: '빠르다', en: 'to be fast', vi: 'nhanh', bn: 'দ্রুত', zh: '快', ru: 'быстрый', ja: '速い', mn: 'хурдан' },
    sentencePrefix: '기차는 ', sentenceHighlight: '빨라서', sentenceSuffix: ' 좋아요.', tracingText: '빨라서'
  },
  {
    id: '25-5', badge: '25-5', stem: '다치', ending: '다', conjugatedEnding: '서', conjugatedStem: '다쳐', baseWord: '다치다', conjugatedWord: '다쳐서', illustrationSvg: DACHIDA_SVG,
    meanings: { ko: '다치다', en: 'to get hurt', vi: 'bị thương', bn: 'আঘাত পাওয়া', zh: '受伤', ru: 'пораниться', ja: '怪我をする', mn: 'бэртэх' },
    sentencePrefix: '', sentenceHighlight: '다쳐서', sentenceSuffix: ' 보건실에 갔어요.', tracingText: '다쳐서'
  }
];

// ============================================================================
// 제26단원: 조건 (-면, -으면)
// ============================================================================
export const VERB_UNIT_26_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '26-1', badge: '26-1', stem: '필요', ending: '하다', conjugatedEnding: '하면', baseWord: '필요하다', conjugatedWord: '필요하면', illustrationSvg: PIRLYOHADA_SVG,
    meanings: { ko: '필요하다', en: 'to need', vi: 'cần', bn: 'প্রয়োজন হওয়া', zh: '需要', ru: 'быть нужным', ja: '必要だ', mn: 'хэрэгтэй байх' },
    sentencePrefix: '도움이 ', sentenceHighlight: '필요하면', sentenceSuffix: ' 말하세요.', tracingText: '필요하면'
  },
  {
    id: '26-2', badge: '26-2', stem: '그렇', ending: '다', conjugatedEnding: '면', conjugatedStem: '그러', baseWord: '그렇다', conjugatedWord: '그러면', illustrationSvg: GEUREOTA_GEUREOMYEON_SVG,
    meanings: { ko: '그렇다', en: 'to be so / like that', vi: 'như thế / vậy', bn: 'তেমন হওয়া', zh: '那样', ru: 'быть таким', ja: 'そうだ', mn: 'тийм байх' },
    sentencePrefix: '', sentenceHighlight: '그러면', sentenceSuffix: ' 안 돼요.', tracingText: '그러면'
  },
  {
    id: '26-3', badge: '26-3', stem: '궁금', ending: '하다', conjugatedEnding: '하면', baseWord: '궁금하다', conjugatedWord: '궁금하면', illustrationSvg: GUNGGUMHADA_SVG,
    meanings: { ko: '궁금하다', en: 'to be curious', vi: 'tò mò / thắc mắc', bn: 'জানতে ইচ্ছে হওয়া', zh: '好奇', ru: 'любопытно', ja: '気になる', mn: 'сонирхох' },
    sentencePrefix: '', sentenceHighlight: '궁금하면', sentenceSuffix: ' 물어보세요.', tracingText: '궁금하면'
  },
  {
    id: '26-4', badge: '26-4', stem: '힘들', ending: '다', conjugatedEnding: '면', baseWord: '힘들다', conjugatedWord: '힘들면', illustrationSvg: HIMDEULDA_SVG,
    meanings: { ko: '힘들다', en: 'to be hard / tired', vi: 'mệt / vất vả', bn: 'কষ্টকর', zh: '累 / 辛苦', ru: 'трудно / тяжело', ja: '大変だ', mn: 'ядрах / хэцүү' },
    sentencePrefix: '', sentenceHighlight: '힘들면', sentenceSuffix: ' 쉬어요.', tracingText: '힘들면'
  },
  {
    id: '26-5', badge: '26-5', stem: '작', ending: '다', conjugatedEnding: '으면', baseWord: '작다', conjugatedWord: '작으면', illustrationSvg: JAKDA_SVG,
    meanings: { ko: '작다', en: 'to be small', vi: 'nhỏ', bn: 'ছোট', zh: '小', ru: 'маленький', ja: '小さい', mn: 'жижиг' },
    sentencePrefix: '', sentenceHighlight: '작으면', sentenceSuffix: ' 이걸로 바꿔요.', tracingText: '작으면'
  }
];

// ============================================================================
// 제27단원: 시간 (-ㄹ 때, -을 때)
// ============================================================================
export const VERB_UNIT_27_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '27-1', badge: '27-1', stem: '발표', ending: '하다', conjugatedEnding: '할 때', baseWord: '발표하다', conjugatedWord: '발표할 때', illustrationSvg: BALPYOHADA_SVG,
    meanings: { ko: '발표하다', en: 'to present', vi: 'phát biểu', bn: 'উপস্থাপন করা', zh: '发言 / 发表', ru: 'выступать', ja: '発表する', mn: 'илтгэх' },
    sentencePrefix: '', sentenceHighlight: '발표할 때', sentenceSuffix: ' 손들어요.', tracingText: '발표할 때'
  },
  {
    id: '27-2', badge: '27-2', stem: '출발', ending: '하다', conjugatedEnding: '할 때', baseWord: '출발하다', conjugatedWord: '출발할 때', illustrationSvg: CHULBALHADA_SVG,
    meanings: { ko: '출발하다', en: 'to depart', vi: 'xuất phát', bn: 'রওনা হওয়া', zh: '出发', ru: 'отправляться', ja: '出発する', mn: 'хөдлөх' },
    sentencePrefix: '', sentenceHighlight: '출발할 때', sentenceSuffix: ' 연락해요.', tracingText: '출발할 때'
  },
  {
    id: '27-3', badge: '27-3', stem: '졸리', ending: '다', conjugatedEnding: 'ㄹ 때', conjugatedStem: '졸릴', baseWord: '졸리다', conjugatedWord: '졸릴 때', illustrationSvg: JOLLIDA_U27_SVG,
    meanings: { ko: '졸리다', en: 'to be sleepy', vi: 'buồn ngủ', bn: 'ঘুম পাওয়া', zh: '困', ru: 'хотеть спать', ja: '眠い', mn: 'нойр хүрэх' },
    sentencePrefix: '', sentenceHighlight: '졸릴 때', sentenceSuffix: ' 하품이 나요.', tracingText: '졸릴 때'
  },
  {
    id: '27-4', badge: '27-4', stem: '벗', ending: '다', conjugatedEnding: '을 때', baseWord: '벗다', conjugatedWord: '벗을 때', illustrationSvg: BEOTDA_U27_SVG,
    meanings: { ko: '벗다', en: 'to take off', vi: 'cởi ra', bn: 'খুলে ফেলা', zh: '脱掉', ru: 'снимать', ja: '脱ぐ', mn: 'тайлах' },
    sentencePrefix: '옷을 ', sentenceHighlight: '벗을 때', sentenceSuffix: ' 바로 정리해요.', tracingText: '벗을 때'
  },
  {
    id: '27-5', badge: '27-5', stem: '혼나', ending: '다', conjugatedEnding: 'ㄹ 때', conjugatedStem: '혼날', baseWord: '혼나다', conjugatedWord: '혼날 때', illustrationSvg: HONNADA_SVG,
    meanings: { ko: '혼나다', en: 'to be scolded', vi: 'bị mắng', bn: 'বকা খাওয়া', zh: '挨骂', ru: 'получать выговор', ja: '叱られる', mn: 'загнуулах' },
    sentencePrefix: '', sentenceHighlight: '혼날 때', sentenceSuffix: '는 슬퍼요.', tracingText: '혼날 때'
  }
];

// ============================================================================
// 제28단원: 목적 (-러 가요, -으러 가요 / -러 와요, -으러 와요)
// ============================================================================
export const VERB_UNIT_28_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '28-1', badge: '28-1', stem: '구경', ending: '하다', conjugatedEnding: '하러 가요', baseWord: '구경하다', conjugatedWord: '구경하러 가요', illustrationSvg: GUGYEONGHADA_U28_SVG,
    meanings: { ko: '구경하다', en: 'to look around / watch', vi: 'ngắm / xem', bn: 'ঘুরে দেখা', zh: '观赏 / 参观', ru: 'любоваться', ja: '見物する', mn: 'үзэж сонирхох' },
    sentencePrefix: '꽃을 ', sentenceHighlight: '구경하러 가요', sentenceSuffix: '.', tracingText: '구경하러 가요'
  },
  {
    id: '28-2', badge: '28-2', stem: '산책', ending: '하다', conjugatedEnding: '하러 가요', baseWord: '산책하다', conjugatedWord: '산책하러 가요', illustrationSvg: SANCHAEKHADA_SVG,
    meanings: { ko: '산책하다', en: 'to take a walk', vi: 'đi dạo', bn: 'হাঁটতে যাওয়া', zh: '散步', ru: 'гулять', ja: '散歩する', mn: 'зугаалах' },
    sentencePrefix: '공원에 ', sentenceHighlight: '산책하러 가요', sentenceSuffix: '.', tracingText: '산책하러 가요'
  },
  {
    id: '28-3', badge: '28-3', stem: '반납', ending: '하다', conjugatedEnding: '하러 와요', baseWord: '반납하다', conjugatedWord: '반납하러 와요', illustrationSvg: BANNAPHADA_SVG,
    meanings: { ko: '반납하다', en: 'to return (an item)', vi: 'trả lại', bn: 'ফেরত দেওয়া', zh: '归还', ru: 'возвращать', ja: '返却する', mn: 'буцааж өгөх' },
    sentencePrefix: '책 ', sentenceHighlight: '반납하러 와요', sentenceSuffix: '.', tracingText: '반납하러 와요'
  },
  {
    id: '28-4', badge: '28-4', stem: '심', ending: '다', conjugatedEnding: '으러 가요', baseWord: '심다', conjugatedWord: '심으러 가요', illustrationSvg: SIMDA_SVG,
    meanings: { ko: '심다', en: 'to plant', vi: 'trồng', bn: 'রোপণ করা', zh: '种 / 栽', ru: 'сажать', ja: '植える', mn: 'тарих' },
    sentencePrefix: '나무를 ', sentenceHighlight: '심으러 가요', sentenceSuffix: '.', tracingText: '심으러 가요'
  },
  {
    id: '28-5', badge: '28-5', stem: '수영', ending: '하다', conjugatedEnding: '하러 가요', baseWord: '수영하다', conjugatedWord: '수영하러 가요', illustrationSvg: SUYEONGHADA_SVG,
    meanings: { ko: '수영하다', en: 'to swim', vi: 'bơi lội', bn: 'সাঁতার কাটা', zh: '游泳', ru: 'плавать', ja: '泳ぐ', mn: 'сэлэх' },
    sentencePrefix: '아빠랑 ', sentenceHighlight: '수영하러 가요', sentenceSuffix: '.', tracingText: '수영하러 가요'
  }
];

// ============================================================================
// 제29단원: 순서 (-기 전에, -ㄴ 후에, -은 후에)
// ============================================================================
export const VERB_UNIT_29_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '29-1', badge: '29-1', stem: '양치', ending: '하다', conjugatedEnding: '하기 전에', baseWord: '양치하다', conjugatedWord: '양치하기 전에', illustrationSvg: YANGCHIHADA_U29_SVG,
    meanings: { ko: '양치하다', en: 'to brush one’s teeth', vi: 'đánh răng', bn: 'দাঁত মাজা', zh: '刷牙', ru: 'чистить зубы', ja: '歯を磨く', mn: 'шүдээ угаах' },
    sentencePrefix: '', sentenceHighlight: '양치하기 전에', sentenceSuffix: ' 세수해요.', tracingText: '양치하기 전에'
  },
  {
    id: '29-2', badge: '29-2', stem: '자르', ending: '다', conjugatedEnding: '기 전에', baseWord: '자르다', conjugatedWord: '자르기 전에', illustrationSvg: JAREUDA_SVG,
    meanings: { ko: '자르다', en: 'to cut', vi: 'cắt', bn: 'কাটা', zh: '剪 / 切', ru: 'резать', ja: '切る', mn: 'хайчлах' },
    sentencePrefix: '', sentenceHighlight: '자르기 전에', sentenceSuffix: ' 색칠해요.', tracingText: '자르기 전에'
  },
  {
    id: '29-3', badge: '29-3', stem: '모으', ending: '다', conjugatedEnding: 'ㄴ 후에', conjugatedStem: '모은', baseWord: '모으다', conjugatedWord: '모은 후에', illustrationSvg: MOEUDA_U29_SVG,
    meanings: { ko: '모으다', en: 'to collect / gather', vi: 'thu gom', bn: 'জমা করা', zh: '收集 / 聚拢', ru: 'собирать', ja: '集める', mn: 'цуглуулах' },
    sentencePrefix: '쓰레기를 ', sentenceHighlight: '모은 후에', sentenceSuffix: ' 버려요.', tracingText: '모은 후에'
  },
  {
    id: '29-4', badge: '29-4', stem: '연습', ending: '하다', conjugatedEnding: '한 후에', baseWord: '연습하다', conjugatedWord: '연습한 후에', illustrationSvg: YEONSEUPHADA_SVG,
    meanings: { ko: '연습하다', en: 'to practice', vi: 'luyện tập', bn: 'অনুশীলন করা', zh: '练习', ru: 'тренироваться', ja: '練習する', mn: 'дасгал хийх' },
    sentencePrefix: '', sentenceHighlight: '연습한 후에', sentenceSuffix: ' 모여요.', tracingText: '연습한 후에'
  },
  {
    id: '29-5', badge: '29-5', stem: '섞', ending: '다', conjugatedEnding: '은 후에', baseWord: '섞다', conjugatedWord: '섞은 후에', illustrationSvg: SEOKDA_SVG,
    meanings: { ko: '섞다', en: 'to mix / shuffle', vi: 'trộn / xáo', bn: 'মেশানো', zh: '混 / 洗（牌）', ru: 'смешивать', ja: '混ぜる', mn: 'холих' },
    sentencePrefix: '카드를 ', sentenceHighlight: '섞은 후에', sentenceSuffix: ' 게임해요.', tracingText: '섞은 후에'
  }
];

// ============================================================================
// 제30단원: 경험 (-아 봤어요, -어 봤어요, -해 봤어요)
// ============================================================================
export const VERB_UNIT_30_WORKSHEET_ITEMS: VerbWorksheetItem[] = [
  {
    id: '30-1', badge: '30-1', stem: '안', ending: '다', conjugatedEnding: '아 봤어요', baseWord: '안다', conjugatedWord: '안아 봤어요', illustrationSvg: ANDA_U30_SVG,
    meanings: { ko: '안다', en: 'to hug', vi: 'ôm', bn: 'জড়িয়ে ধরা', zh: '抱', ru: 'обнимать', ja: '抱く', mn: 'тэврэх' },
    sentencePrefix: '동생을 ', sentenceHighlight: '안아 봤어요', sentenceSuffix: '.', tracingText: '안아 봤어요'
  },
  {
    id: '30-2', badge: '30-2', stem: '춤추', ending: '다', conjugatedEnding: ' 봤어요', conjugatedStem: '춤춰', baseWord: '춤추다', conjugatedWord: '춤춰 봤어요', illustrationSvg: CHUMCHUDA_SVG,
    meanings: { ko: '춤추다', en: 'to dance', vi: 'nhảy múa', bn: 'নাচা', zh: '跳舞', ru: 'танцевать', ja: '踊る', mn: 'бүжиглэх' },
    sentencePrefix: '학교에서 ', sentenceHighlight: '춤춰 봤어요', sentenceSuffix: '.', tracingText: '춤춰 봤어요'
  },
  {
    id: '30-3', badge: '30-3', stem: '외우', ending: '다', conjugatedEnding: ' 봤어요', conjugatedStem: '외워', baseWord: '외우다', conjugatedWord: '외워 봤어요', illustrationSvg: OE_UDA_U30_SVG,
    meanings: { ko: '외우다', en: 'to memorize', vi: 'học thuộc', bn: 'মুখস্থ করা', zh: '背诵', ru: 'выучить наизусть', ja: '暗記する', mn: 'цээжлэх' },
    sentencePrefix: '구구단을 ', sentenceHighlight: '외워 봤어요', sentenceSuffix: '.', tracingText: '외워 봤어요'
  },
  {
    id: '30-4', badge: '30-4', stem: '도전', ending: '하다', conjugatedEnding: '해 봤어요', baseWord: '도전하다', conjugatedWord: '도전해 봤어요', illustrationSvg: DOJEONHADA_U30_SVG,
    meanings: { ko: '도전하다', en: 'to challenge / try', vi: 'thử thách', bn: 'চেষ্টা করা', zh: '挑战', ru: 'пробовать силы', ja: '挑戦する', mn: 'сорих' },
    sentencePrefix: '1등에 ', sentenceHighlight: '도전해 봤어요', sentenceSuffix: '.', tracingText: '도전해 봤어요'
  },
  {
    id: '30-5', badge: '30-5', stem: '묻', ending: '다', conjugatedEnding: '어 봤어요', conjugatedStem: '물', baseWord: '묻다', conjugatedWord: '물어봤어요', illustrationSvg: MUTDA_U30_SVG,
    meanings: { ko: '묻다', en: 'to ask', vi: 'hỏi', bn: 'জিজ্ঞাসা করা', zh: '问', ru: 'спрашивать', ja: '尋ねる', mn: 'асуух' },
    sentencePrefix: '모르는 단어를 ', sentenceHighlight: '물어봤어요', sentenceSuffix: '.', tracingText: '물어봤어요'
  }
];

interface VerbConjugationWorksheetPageProps {
  lang: SupportedLanguage;
  unit?:
    | 'unit1'
    | 'unit2'
    | 'unit3'
    | 'unit4'
    | 'unit5'
    | 'unit6'
    | 'unit7'
    | 'unit8'
    | 'unit9'
    | 'unit10'
    | 'unit11'
    | 'unit12'
    | 'unit13'
    | 'unit14'
    | 'unit15'
    | 'unit16'
    | 'unit17'
    | 'unit18'
    | 'unit19'
    | 'unit20'
    | 'unit21'
    | 'unit22'
    | 'unit23'
    | 'unit24'
    | 'unit25'
    | 'unit26'
    | 'unit27'
    | 'unit28'
    | 'unit29'
    | 'unit30';
  className?: string;
  interactiveAudio?: boolean;
  renderOnly?: 'detective' | 'tip';
}

export const VerbConjugationWorksheetPage: React.FC<VerbConjugationWorksheetPageProps> = ({
  lang,
  unit = 'unit1',
  className = '',
  interactiveAudio = true,
  renderOnly,
}) => {
  const getItems = () => {
    switch (unit) {
      case 'unit30': return VERB_UNIT_30_WORKSHEET_ITEMS;
      case 'unit29': return VERB_UNIT_29_WORKSHEET_ITEMS;
      case 'unit28': return VERB_UNIT_28_WORKSHEET_ITEMS;
      case 'unit27': return VERB_UNIT_27_WORKSHEET_ITEMS;
      case 'unit26': return VERB_UNIT_26_WORKSHEET_ITEMS;
      case 'unit25': return VERB_UNIT_25_WORKSHEET_ITEMS;
      case 'unit24': return VERB_UNIT_24_WORKSHEET_ITEMS;
      case 'unit23': return VERB_UNIT_23_WORKSHEET_ITEMS;
      case 'unit22': return VERB_UNIT_22_WORKSHEET_ITEMS;
      case 'unit21': return VERB_UNIT_21_WORKSHEET_ITEMS;
      case 'unit20': return VERB_UNIT_20_WORKSHEET_ITEMS;
      case 'unit19': return VERB_UNIT_19_WORKSHEET_ITEMS;
      case 'unit18': return VERB_UNIT_18_WORKSHEET_ITEMS;
      case 'unit17': return VERB_UNIT_17_WORKSHEET_ITEMS;
      case 'unit16': return VERB_UNIT_16_WORKSHEET_ITEMS;
      case 'unit15': return VERB_UNIT_15_WORKSHEET_ITEMS;
      case 'unit14': return VERB_UNIT_14_WORKSHEET_ITEMS;
      case 'unit13': return VERB_UNIT_13_WORKSHEET_ITEMS;
      case 'unit12': return VERB_UNIT_12_WORKSHEET_ITEMS;
      case 'unit11': return VERB_UNIT_11_WORKSHEET_ITEMS;
      case 'unit10': return VERB_UNIT_10_WORKSHEET_ITEMS;
      case 'unit9': return VERB_UNIT_9_WORKSHEET_ITEMS;
      case 'unit8': return VERB_UNIT_8_WORKSHEET_ITEMS;
      case 'unit7': return VERB_UNIT_7_WORKSHEET_ITEMS;
      case 'unit6': return VERB_UNIT_6_WORKSHEET_ITEMS;
      case 'unit5': return VERB_UNIT_5_WORKSHEET_ITEMS;
      case 'unit4': return VERB_UNIT_4_WORKSHEET_ITEMS;
      case 'unit3': return VERB_UNIT_3_WORKSHEET_ITEMS;
      case 'unit2': return VERB_UNIT_2_WORKSHEET_ITEMS;
      case 'unit1':
      default:
        return VERB_UNIT_1_WORKSHEET_ITEMS;
    }
  };

  const items = getItems();

  const handleWordClick = (item: VerbWorksheetItem) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(`${item.baseWord}, ${item.conjugatedWord}`, 0.85);
  };

  const getUnitTitle = () => {
    switch (unit) {
      case 'unit30': return '해볼 한국어 [용언 활용] ㉚ 경험 (-아 봤어요, -어 봤어요, -해 봤어요)';
      case 'unit29': return '해볼 한국어 [용언 활용] ㉙ 순서 (-기 전에, -ㄴ 후에, -은 후에)';
      case 'unit28': return '해볼 한국어 [용언 활용] ㉘ 목적 (-러 가요, -으러 가요 / -러 와요, -으러 와요)';
      case 'unit27': return '해볼 한국어 [용언 활용] ㉗ 시간 (-ㄹ 때, -을 때)';
      case 'unit26': return '해볼 한국어 [용언 활용] ㉖ 조건 (-면, -으면)';
      case 'unit25': return '해볼 한국어 [용언 활용] ㉕ 이유 (-아서, -어서, -해서)';
      case 'unit24': return '해볼 한국어 [용언 활용] ㉔ 대조 (-지만)';
      case 'unit23': return '해볼 한국어 [용언 활용] ㉓ 나열 (-고)';
      case 'unit22': return '해볼 한국어 [용언 활용] ㉒ 제안 (-ㄹ까요?, -을까요?)';
      case 'unit21': return '해볼 한국어 [용언 활용] ㉑ 능력 (-ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요)';
      case 'unit20': return '해볼 한국어 [용언 활용] ⑳ 의무 (-아야 돼요, -어야 돼요, -해야 돼요)';
      case 'unit19': return '해볼 한국어 [용언 활용] ⑲ 허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?)';
      case 'unit18': return '해볼 한국어 [용언 활용] ⑱ 부탁 (-아 주세요, -어 주세요, -해 주세요)';
      case 'unit17': return '해볼 한국어 [용언 활용] ⑰ 미래 (-ㄹ 거예요, -을 거예요)';
      case 'unit16': return '해볼 한국어 [용언 활용] ⑯ 금지 (-지 마세요)';
      case 'unit15': return '해볼 한국어 [용언 활용] ⑮ 요청 (-세요, -으세요)';
      case 'unit14': return '해볼 한국어 [용언 활용] ⑭ 진행 (-고 있어요)';
      case 'unit13': return '해볼 한국어 [용언 활용] ⑬ 희망 (-고 싶어요)';
      case 'unit12': return '해볼 한국어 [용언 활용] ⑫ 부정2 ([명사] 안 해요, [명사] 못 해요)';
      case 'unit11': return `해볼 한국어 [용언 활용] ${VERB_UNIT_11_DATA.title[lang] || VERB_UNIT_11_DATA.title.ko}`;
      case 'unit10': return '해볼 한국어 [용언 활용] ⑩ 과거형 (-었어요 ★)';
      case 'unit9': return '해볼 한국어 [용언 활용] ⑨ 과거형 (-았어요 ★)';
      case 'unit8': return '해볼 한국어 [용언 활용] ⑧ 과거형 (-했어요)';
      case 'unit7': return '해볼 한국어 [용언 활용] ⑦ 과거형 (-었어요)';
      case 'unit6': return '해볼 한국어 [용언 활용] ⑥ 과거형 (-았어요)';
      case 'unit5': return '해볼 한국어 [용언 활용] ⑤ 현재형 (-어요 ★)';
      case 'unit4': return '해볼 한국어 [용언 활용] ④ 현재형 (-아요 ★)';
      case 'unit3': return '해볼 한국어 [용언 활용] ③ 현재형 (-해요)';
      case 'unit2': return '해볼 한국어 [용언 활용] ② 현재형 (-어요)';
      case 'unit1':
      default:
        return '해볼 한국어 [용언 활용] ① 현재형 (-아요)';
    }
  };

  return (
    <div
      className={
        renderOnly
          ? `w-full bg-white rounded-2xl border-2 border-purple-200 p-5 sm:p-6 text-slate-900 font-korean-gothic select-none ${className}`
          : `verb-worksheet-page printable-a4-page print:m-0 print:p-1.5 print:shadow-none print:border-none w-full max-w-[1040px] mx-auto bg-white rounded-2xl shadow-md border-2 border-slate-300 p-2 sm:p-2.5 text-slate-900 flex flex-col justify-between font-korean-gothic select-none ${className}`
      }
      style={renderOnly ? undefined : { minHeight: '620px' }}
    >
      {!renderOnly && (
        <>
          {/* 1. HEADER ROW */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b-2 border-slate-700 pb-0.5 mb-1 text-slate-900 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <ManduMascot size="xs" interactive={false} />
              <h1 className="text-xs sm:text-sm md:text-base font-black text-slate-950 font-korean-gothic tracking-tight break-keep">
                {getUnitTitle()}
              </h1>
            </div>

            <div className="text-[11px] sm:text-xs font-extrabold text-slate-800 flex items-center gap-3 sm:gap-6 font-korean-gothic shrink-0">
              <span>학년: ________</span>
              <span>이름: ________________</span>
            </div>
          </div>

          {/* 2. MAIN 5-COLUMNS CARDS GRID */}
          <div className="verb-cards-grid grid grid-cols-5 print:grid-cols-5 gap-1.5 sm:gap-2 mb-1 flex-1 items-stretch">
        {items.map((item) => {
          const currentTranslation = item.meanings[lang] || item.meanings.en;
          const conjugatedTranslation =
            getVerbConjugatedMeaning(item.id, lang) ||
            item.conjugatedMeanings?.[lang] ||
            currentTranslation;
          const baseWordClass =
            item.baseWord.length >= 8
              ? 'text-[15.5px] sm:text-[17.5px]'
              : item.baseWord.length >= 6
              ? 'text-[17.5px] sm:text-[19.5px]'
              : 'text-[20px] sm:text-[22px]';
          const conjWordClass =
            item.conjugatedWord.length >= 8
              ? 'text-[15.5px] sm:text-[17.5px]'
              : item.conjugatedWord.length >= 6
              ? 'text-[17.5px] sm:text-[19.5px]'
              : 'text-[20px] sm:text-[22px]';

          return (
            <div
              key={item.id}
              onClick={() => handleWordClick(item)}
              className={`relative border-2 border-dashed border-purple-300 hover:border-purple-400 bg-white rounded-xl p-2 sm:p-2.5 pb-4 sm:pb-5 flex flex-col transition-all group ${
                interactiveAudio
                  ? 'cursor-pointer hover:shadow-md hover:bg-purple-50/20 active:scale-[0.99]'
                  : ''
              }`}
              title={interactiveAudio ? `클릭하여 발음 듣기: "${item.baseWord}, ${item.conjugatedWord}"` : undefined}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-1 shrink-0">
                <span className="bg-purple-100 text-purple-950 px-1.5 py-0.2 rounded font-black text-[9.5px] sm:text-[10px] font-korean-gothic border border-purple-200 shadow-2xs">
                  {item.badge}
                </span>
                {interactiveAudio && (
                  <span className="text-[9px] text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    🔊
                  </span>
                )}
              </div>

              {/* Equal vertical spacing stack matching ParticleWorksheetPage */}
              <div className="flex-1 flex flex-col justify-between">
                {/* 1. 일러스트 그림 */}
                <div className="flex items-center justify-center shrink-0 h-[62px] sm:h-[72px]">
                  <img
                    src={item.illustrationSvg}
                    alt={`${item.baseWord} 일러스트`}
                    className="w-[58px] h-[58px] sm:w-[70px] sm:h-[70px] object-contain drop-shadow-2xs select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* 2. 다국어 뜻 번역 (기본형 뜻 + 활용형 뜻) */}
                <div className="flex flex-col items-center justify-center text-center min-h-[30px] sm:min-h-[34px] shrink-0 gap-0.5 px-0.5">
                  <span className="text-[11px] sm:text-[12px] font-semibold text-slate-600 leading-tight block truncate max-w-full">
                    {currentTranslation}
                  </span>
                  <span className="text-[11.5px] sm:text-[12.5px] font-black text-purple-900 leading-tight block truncate max-w-full">
                    → {conjugatedTranslation}
                  </span>
                </div>

                {/* 3 & 4. 기본형 & 활용형 단어 */}
                <div className="w-full flex items-center justify-center select-none shrink-0">
                  <div className="inline-flex flex-col items-start text-left max-w-full">
                    {/* 기본형 단어 */}
                    {(() => {
                      const baseParts = getBaseWordParts(item.baseWord, unit);
                      return (
                        <div className={`${baseWordClass} font-black leading-[1.12] flex items-baseline tracking-normal flex-wrap break-keep`}>
                          <span
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif",
                              fontWeight: 900,
                              WebkitTextStroke: '0.8px currentColor',
                              color: '#1E293B'
                            }}
                          >
                            {baseParts.stem}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif",
                              fontWeight: 900,
                              WebkitTextStroke: '0.8px currentColor',
                              color: '#2563EB'
                            }}
                          >
                            {baseParts.ending}
                          </span>
                        </div>
                      );
                    })()}

                    {/* 활용형 단어 */}
                    <div className={`${conjWordClass} font-black leading-[1.12] flex items-baseline tracking-normal flex-wrap break-keep`}>
                      {getOptionBCharMapping(item.baseWord, item.conjugatedWord, unit).map((charInfo, charIdx) => (
                        <span
                          key={charIdx}
                          style={{
                            fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif",
                            fontWeight: 900,
                            WebkitTextStroke: '0.8px currentColor',
                            color: charInfo.color
                          }}
                        >
                          {charInfo.char === ' ' ? '\u00A0' : charInfo.char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. 예문 - 전체 검정색 & 균형 잡힌 줄간격 */}
                <div className="flex items-center justify-center text-center min-h-[24px] shrink-0">
                  <p
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif"
                    }}
                    className="text-[17px] sm:text-[19px] text-black leading-[1.1] font-badasseugi break-keep"
                  >
                    <span className="font-normal text-black">{item.sentencePrefix}</span>
                    <span
                      style={{
                        fontWeight: 900,
                        WebkitTextStroke: '0.45px currentColor'
                      }}
                      className="font-black text-black"
                    >
                      {item.sentenceHighlight}
                    </span>
                    <span className="font-normal text-black">{item.sentenceSuffix}</span>
                  </p>
                </div>

                {/* 6. 따라 쓰기 칸 */}
                <div className="w-full shrink-0">
                  <div className="w-full border border-dashed border-slate-400 bg-white rounded-none overflow-hidden">
                    <div className="w-full h-[38px] sm:h-[40px] relative flex items-center px-1.5 border-b border-dashed border-slate-300">
                      <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-200 pointer-events-none" />
                      <span
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif",
                          fontWeight: 700,
                          color: '#888888',
                          letterSpacing: '0.03em'
                        }}
                        className={`relative z-10 leading-none select-none tracking-normal font-badasseugi truncate ${
                          item.baseWord.length >= 6 ? 'text-[17.5px] sm:text-[19.5px]' : 'text-[20.5px] sm:text-[23px]'
                        }`}
                      >
                        {item.baseWord}
                      </span>
                    </div>

                    <div className="w-full h-[38px] sm:h-[40px] relative flex items-center px-1.5">
                      <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-200 pointer-events-none" />
                      <span
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif",
                          fontWeight: 700,
                          color: '#888888',
                          letterSpacing: '0.02em'
                        }}
                        className={`relative z-10 leading-none select-none tracking-normal font-badasseugi truncate ${
                          item.conjugatedWord.length >= 8
                            ? 'text-[15.5px] sm:text-[17.5px]'
                            : item.conjugatedWord.length >= 6
                            ? 'text-[17.5px] sm:text-[19.5px]'
                            : 'text-[20.5px] sm:text-[23px]'
                        }`}
                      >
                        {item.conjugatedWord}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        </>
      )}

      {/* 3. 하단 팁 영역 - 불필요한 하단 공백 없이 위 5열과 균형 배치 */}
      <div
        style={{
          fontFamily: "'NanumBarunGothic', 'NanumSquare', 'Pretendard', sans-serif"
        }}
        className={renderOnly ? 'w-full select-none' : 'w-full pt-2.5 pb-2 sm:pt-3 sm:pb-2.5 border-t-2 border-slate-700 shrink-0 select-none'}
      >
        <div className={renderOnly ? 'w-full' : 'verb-tips-grid grid grid-cols-[15fr_33fr] print:grid-cols-[15fr_33fr] gap-2.5 sm:gap-3.5 items-stretch'}>
          
          {/* [왼쪽 영역: 탐정 찬스] */}
          {renderOnly !== 'tip' && (
          <div className={renderOnly ? 'flex flex-col justify-start gap-2 min-w-0' : 'border-r border-slate-300 pb-0 pr-2.5 sm:pr-3 flex flex-col justify-start gap-1 min-w-0'}>
            <div className={renderOnly ? 'flex items-center gap-2 pb-2 mb-1 border-b border-purple-200 text-slate-900' : 'flex items-center gap-1.5 text-slate-900'}>
              <span className={renderOnly ? 'text-xl' : 'text-sm sm:text-base'}>😎</span>
              <span className={renderOnly ? 'font-black text-lg text-slate-950 tracking-tight' : 'font-black text-[15px] sm:text-[16px] text-slate-950 tracking-tight'}>
                {renderOnly ? `${getUnitTitle().replace('해볼 한국어 [용언 활용] ', '')} · 탐정 찬스` : '탐정 찬스'}
              </span>
            </div>

            <div className={renderOnly ? 'space-y-1.5 text-slate-800 text-[14px] sm:text-[15px] leading-relaxed break-keep' : 'pl-4 sm:pl-5 space-y-1 text-slate-800 text-[12px] sm:text-[13px] leading-snug break-keep'}>
              {unit === 'unit30' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 있어요? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[아 봤어요]</span>!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 없어요? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[어 봤어요]</span>!</p>
                  <p className="font-normal text-slate-800 pt-0.5">‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>[해 봤어요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit29' ? (
                <>
                  <p className="font-normal text-slate-800">행동의 순서를 말해요.</p>
                  <p className="font-normal text-slate-800">하기 앞서서는 <span style={{ color: '#E03131', fontWeight: 800 }}>[-기 전에]</span>!</p>
                  <p className="font-normal text-slate-800">마치고 나선 받침 확인!</p>
                  <p className="font-normal text-slate-800 pt-0.5">없으면 <span style={{ color: '#E03131', fontWeight: 800 }}>[-ㄴ 후에]</span>, 있으면 <span style={{ color: '#E03131', fontWeight: 800 }}>[-은 후에]</span>!</p>
                </>
              ) : unit === 'unit28' ? (
                <>
                  <p className="font-normal text-slate-800">어떤 일을 하러 가거나 올 때!</p>
                  <p className="font-normal text-slate-800">받침 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span>? <span style={{ color: '#E03131', fontWeight: 800 }}>[러 가요/와요]</span>!</p>
                  <p className="font-normal text-slate-800">‘ㄹ’ 제외 받침이 있으면?</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#E03131', fontWeight: 800 }}>[으러 가요/와요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit27' ? (
                <>
                  <p className="font-normal text-slate-800">어떤 일이 일어나는 순간이나 시간!</p>
                  <p className="font-normal text-slate-800">받침 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span>이면? <span style={{ color: '#E03131', fontWeight: 800 }}>[ㄹ 때]</span>!</p>
                  <p className="font-normal text-slate-800">‘ㄹ’ 제외 받침이 있으면?</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#E03131', fontWeight: 800 }}>[을 때]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit26' ? (
                <>
                  <p className="font-normal text-slate-800">어떤 조건이나 가정을 말할 때!</p>
                  <p className="font-normal text-slate-800">받침 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span>이면? <span style={{ color: '#E03131', fontWeight: 800 }}>[면]</span>!</p>
                  <p className="font-normal text-slate-800">‘ㄹ’ 제외 받침이 있으면?</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#E03131', fontWeight: 800 }}>[으면]</span>을 가져와!!</p>
                </>
              ) : unit === 'unit25' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 있어요? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[아서]</span>!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 없어요? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[어서]</span>!</p>
                  <p className="font-normal text-slate-800 pt-0.5">‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>[해서]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit24' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’ 앞의 받침? 안 봐도 돼!</p>
                  <p className="font-normal text-slate-800">앞뒤 내용이 서로 반대될 땐?</p>
                  <p className="font-normal text-slate-800">ㅂ·ㄹ 불규칙도 변신 없이!</p>
                  <p className="font-normal text-slate-800 pt-0.5">어간 뒤에 <span style={{ color: '#E03131', fontWeight: 800 }}>[-지만]</span>을 붙여!!</p>
                </>
              ) : unit === 'unit23' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’ 앞의 받침? 안 봐도 돼!</p>
                  <p className="font-normal text-slate-800">두 행동을 순서대로 잇거나</p>
                  <p className="font-normal text-slate-800">여러 가지를 함께 나열할 땐?</p>
                  <p className="font-normal text-slate-800 pt-0.5">어간 뒤에 <span style={{ color: '#E03131', fontWeight: 800 }}>[-고]</span>를 붙여!!</p>
                </>
              ) : unit === 'unit22' ? (
                <>
                  <p className="font-normal text-slate-800">상대의 생각이나 제안을 물을 때!</p>
                  <p className="font-normal text-slate-800">받침 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span>이면? <span style={{ color: '#E03131', fontWeight: 800 }}>[ㄹ까요?]</span>!</p>
                  <p className="font-normal text-slate-800">‘ㄹ’ 제외 받침이 있으면?</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#E03131', fontWeight: 800 }}>[을까요?]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit21' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800">받침 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span>? <span style={{ color: '#E03131', fontWeight: 800 }}>[ㄹ 수 있어요]</span>!</p>
                  <p className="font-normal text-slate-800">다른 받침 있으면? <span style={{ color: '#E03131', fontWeight: 800 }}>[을 수 있어요]</span>!</p>
                  <p className="font-normal text-slate-800 pt-0.5">못 할 땐 <span style={{ color: '#E03131', fontWeight: 800 }}>[없어요]</span>로 바꿔요!</p>
                </>
              ) : unit === 'unit20' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 있어요? <span style={{ color: '#E03131', fontWeight: 800 }}>[아야 돼요]</span>!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 없어요? <span style={{ color: '#E03131', fontWeight: 800 }}>[어야 돼요]</span>!</p>
                  <p className="font-normal text-slate-800 pt-0.5">‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>[해야 돼요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit19' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 있어요? <span style={{ color: '#E03131', fontWeight: 800 }}>[아도 돼요?]</span>!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 없어요? <span style={{ color: '#E03131', fontWeight: 800 }}>[어도 돼요?]</span>!</p>
                  <p className="font-normal text-slate-800 pt-0.5">‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>[해도 돼요?]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit18' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 있어요? <span style={{ color: '#E03131', fontWeight: 800 }}>[아 주세요]</span>!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 없어요? <span style={{ color: '#E03131', fontWeight: 800 }}>[어 주세요]</span>!</p>
                  <p className="font-normal text-slate-800 pt-0.5">‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>[해 주세요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit17' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800">받침 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span>이면? <span style={{ color: '#E03131', fontWeight: 800 }}>[ㄹ 거예요]</span>!</p>
                  <p className="font-normal text-slate-800">‘ㄹ’ 제외 받침이 있으면?</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#E03131', fontWeight: 800 }}>[을 거예요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit16' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자? 안 봐도 돼!</p>
                  <p className="font-normal text-slate-800">‘하지 말라고 약속’할 땐?</p>
                  <p className="font-normal text-slate-800">‘다’ 빼고 모양 그대로,</p>
                  <p className="font-normal text-slate-800 pt-0.5">그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[-지 마세요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit15' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자를 봐요.</p>
                  <p className="font-normal text-slate-800">받침 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span>이면? <span style={{ color: '#E03131', fontWeight: 800 }}>[세요]</span>!</p>
                  <p className="font-normal text-slate-800">‘ㄹ’ 제외 받침이 있으면?</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#E03131', fontWeight: 800 }}>[으세요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit14' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자? 안 봐도 돼!</p>
                  <p className="font-normal text-slate-800">‘지금 하고 있는 중’이야?</p>
                  <p className="font-normal text-slate-800">‘다’ 빼고 모양 그대로,</p>
                  <p className="font-normal text-slate-800 pt-0.5">그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[-고 있어요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit13' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’의 앞 글자? 안 봐도 돼!</p>
                  <p className="font-normal text-slate-800">‘하고 싶은 마음’이야?</p>
                  <p className="font-normal text-slate-800">‘다’ 빼고 모양 그대로,</p>
                  <p className="font-normal text-slate-800 pt-0.5">그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[-고 싶어요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit12' ? (
                <>
                  <p className="font-normal text-slate-800">🤫 하기 싫은 거니?</p>
                  <p className="font-normal text-slate-800">OO <span style={{ color: '#16A34A', fontWeight: 800 }}>[안]</span> <span style={{ color: '#E03131', fontWeight: 800 }}>[해요]</span></p>
                  <p className="font-normal text-slate-800">😟 어쩔 수 없는 거니?</p>
                  <p className="font-normal text-slate-800 pt-0.5">OO <span style={{ color: '#16A34A', fontWeight: 800 }}>[못]</span> <span style={{ color: '#E03131', fontWeight: 800 }}>[해요]</span></p>
                </>
              ) : unit === 'unit11' ? (
                <>
                  <p className="font-normal text-slate-800">🤫 하기 싫은 거니?</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#16A34A', fontWeight: 800 }}>[안]</span>을 앞에 놔!</p>
                  <p className="font-normal text-slate-800">😟 어쩔 수 없는 거니?</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#16A34A', fontWeight: 800 }}>[못]</span>을 앞에 놔!!</p>
                </>
              ) : unit === 'unit10' ? (
                <>
                  <p className="font-normal text-slate-800">과거 일! ‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[었어요]</span>!</p>
                  <p className="font-normal text-slate-800">근데 모음이 합쳐지거나 ‘ㅡ’가 빠지고,</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#9333EA', fontWeight: 800 }}>모양이 살짝 바뀌기도 해! ★</span></p>
                </>
              ) : unit === 'unit9' ? (
                <>
                  <p className="font-normal text-slate-800">과거 일! ‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[았어요]</span>!</p>
                  <p className="font-normal text-slate-800">근데 글자가 합쳐지거나,</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#9333EA', fontWeight: 800 }}>‘르’나 받침이 살짝 바뀌기도 해! ★</span></p>
                </>
              ) : unit === 'unit8' ? (
                <>
                  <p className="font-normal text-slate-800">과거 일! 단어 끝을 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>‘하다’</span>가 있어?</p>
                  <p className="font-normal text-slate-800">‘하였어요’가 짧아져서,</p>
                  <p className="font-normal text-slate-800 pt-0.5">‘하다’ 빼고 <span style={{ color: '#E03131', fontWeight: 800 }}>[했어요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit7' ? (
                <>
                  <p className="font-normal text-slate-800">과거 일! ‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ</span> 없어?</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅗ</span> 없어?</p>
                  <p className="font-normal text-slate-800 pt-0.5">그럼 쌍시옷(ㅆ) 챙겨 <span style={{ color: '#E03131', fontWeight: 800 }}>[었어요]</span>!!</p>
                </>
              ) : unit === 'unit6' ? (
                <>
                  <p className="font-normal text-slate-800">과거 일! ‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ</span> 있어?</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅗ</span> 있어?</p>
                  <p className="font-normal text-slate-800 pt-0.5">그럼 쌍시옷(ㅆ) 챙겨 <span style={{ color: '#E03131', fontWeight: 800 }}>[았어요]</span>!!</p>
                </>
              ) : unit === 'unit5' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[어요]</span>!</p>
                  <p className="font-normal text-slate-800">근데 ‘ㅡ’가 빠지거나 모음이 줄고,</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#9333EA', fontWeight: 800 }}>받침·‘르’가 살짝 바뀌기도 해! ★</span></p>
                </>
              ) : unit === 'unit4' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span> 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[아요]</span>!</p>
                  <p className="font-normal text-slate-800">근데 모음이 만나 합체하거나,</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#9333EA', fontWeight: 800 }}>글자 모양이 살짝 바뀌기도 해! ★</span></p>
                </>
              ) : unit === 'unit3' ? (
                <>
                  <p className="font-normal text-slate-800">단어 끝을 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>‘하다’</span>가 있어?</p>
                  <p className="font-normal text-slate-800">그럼 <span style={{ color: '#1D70B8', fontWeight: 800 }}>‘하다’</span>를 쏙 빼고,</p>
                  <p className="font-normal text-slate-800 pt-0.5"><span style={{ color: '#E03131', fontWeight: 800 }}>[해요]</span>를 가져와!!</p>
                </>
              ) : unit === 'unit2' ? (
                <>
                  <p className="font-normal text-slate-800">‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ</span> 없어?</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅗ</span> 없어?</p>
                  <p className="font-normal text-slate-800 pt-0.5">그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[어요]</span>를 가져와!!</p>
                </>
              ) : (
                <>
                  <p className="font-normal text-slate-800">‘다’ 앞 글자를 봐!</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ</span> 있어?</p>
                  <p className="font-normal text-slate-800"><span style={{ color: '#D97706', fontWeight: 800 }}>ㅗ</span> 있어?</p>
                  <p className="font-normal text-slate-800 pt-0.5">그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[아요]</span>를 가져와!!</p>
                </>
              )}
            </div>
          </div>
          )}

          {/* [오른쪽 영역: 해볼쌤 팁] */}
          {renderOnly !== 'detective' && (
          <div className={renderOnly ? 'flex flex-col justify-start gap-2 min-w-0' : 'pl-1 sm:pl-2 flex flex-col justify-start gap-1 min-w-0'}>
            <div className={renderOnly ? 'flex items-center gap-2.5 pb-2.5 mb-1 border-b border-purple-200 text-slate-900' : 'flex items-center gap-1.5 text-slate-900'}>
              <ManduMascot size="xs" interactive={false} />
              <span className={renderOnly ? 'font-black text-lg text-slate-950 tracking-tight' : 'font-black text-[15px] sm:text-[16px] text-slate-950 tracking-tight'}>
                {unit === 'unit30'
                  ? '해볼쌤 팁 | -아 봤어요, -어 봤어요, -해 봤어요'
                  : unit === 'unit29'
                  ? '해볼쌤 팁 | -기 전에, -ㄴ 후에, -은 후에'
                  : unit === 'unit28'
                  ? '해볼쌤 팁 | -러(으러) 가요, -러(으러) 와요'
                  : unit === 'unit27'
                  ? '해볼쌤 팁 | -ㄹ 때, -을 때'
                  : unit === 'unit26'
                  ? '해볼쌤 팁 | -면, -으면'
                  : unit === 'unit25'
                  ? '해볼쌤 팁 | -아서, -어서, -해서'
                  : unit === 'unit24'
                  ? '해볼쌤 팁 | -지만'
                  : unit === 'unit23'
                  ? '해볼쌤 팁 | -고'
                  : unit === 'unit22'
                  ? '해볼쌤 팁 | -ㄹ까요?, -을까요?'
                  : unit === 'unit21'
                  ? '해볼쌤 팁 | -ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요'
                  : unit === 'unit20'
                  ? '해볼쌤 팁 | -아야 돼요, -어야 돼요, -해야 돼요'
                  : unit === 'unit19'
                  ? '해볼쌤 팁 | -아도 돼요?, -어도 돼요?, -해도 돼요?'
                  : unit === 'unit18'
                  ? '해볼쌤 팁 | -아 주세요, -어 주세요, -해 주세요'
                  : unit === 'unit17'
                  ? '해볼쌤 팁 | -ㄹ 거예요, -을 거예요'
                  : unit === 'unit16'
                  ? '해볼쌤 팁 | -지 마세요'
                  : unit === 'unit15'
                  ? '해볼쌤 팁 | -세요, -으세요'
                  : unit === 'unit14'
                  ? '해볼쌤 팁 | -고 있어요'
                  : unit === 'unit13'
                  ? '해볼쌤 팁 | -고 싶어요'
                  : unit === 'unit12'
                  ? '해볼쌤 팁 | [명사] 안 해요, [명사] 못 해요'
                  : unit === 'unit11'
                  ? '해볼쌤 팁 | 안 [용언], 못 [용언]'
                  : unit === 'unit10'
                  ? '해볼쌤 팁 | -었어요 ★'
                  : unit === 'unit9'
                  ? '해볼쌤 팁 | -았어요 ★'
                  : unit === 'unit8'
                  ? '해볼쌤 팁 | -했어요'
                  : unit === 'unit7'
                  ? '해볼쌤 팁 | -었어요'
                  : unit === 'unit6'
                  ? '해볼쌤 팁 | -았어요'
                  : unit === 'unit5'
                  ? '해볼쌤 팁 | -어요 ★'
                  : unit === 'unit4'
                  ? '해볼쌤 팁 | -아요 ★'
                  : unit === 'unit3'
                  ? '해볼쌤 팁 | -해요'
                  : unit === 'unit2'
                  ? '해볼쌤 팁 | -어요'
                  : '해볼쌤 팁 | -아요'}
              </span>
            </div>

            <div className={renderOnly ? 'space-y-2 text-slate-800 text-[13.5px] sm:text-[14.5px] leading-relaxed break-keep' : 'pl-8 sm:pl-9 pr-4 sm:pr-8 space-y-1 text-slate-800 text-[12.5px] sm:text-[13.5px] leading-snug break-keep'}>
              {unit === 'unit30' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝 모음이 ‘ㅏ, ㅗ’면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아 봤어요’</span>, 아니면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-어 봤어요’</span>, ‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-해 봤어요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>안다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>안</span><span style={{ color: '#E03131', fontWeight: 800 }}>아 봤어요</span></span>
                    <span>춤추다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>춤</span><span style={{ color: '#9333EA', fontWeight: 800 }}>춰</span> <span style={{ color: '#E03131', fontWeight: 800 }}>봤어요</span> (축약)</span>
                    <span>묻다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>물</span><span style={{ color: '#E03131', fontWeight: 800 }}>어봤어요</span> (ㄷ 불규칙)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    과거에 어떤 일을 직접 시도하거나 경험해 본 적이 있음을 말할 때 써요.
                  </p>
                </>
              ) : unit === 'unit29' ? (
                <>
                  <p className="font-normal text-slate-800">
                    먼저 하는 일 앞에는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-기 전에’</span>, 앞의 일을 마친 뒤에는 받침 없으면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-ㄴ 후에’</span>, 받침 있으면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-은 후에’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>양치하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>양치</span><span style={{ color: '#E03131', fontWeight: 800 }}>하기 전에</span></span>
                    <span>모으다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>모</span><span style={{ color: '#9333EA', fontWeight: 800 }}>은</span> <span style={{ color: '#E03131', fontWeight: 800 }}>후에</span></span>
                    <span>섞다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>섞</span><span style={{ color: '#E03131', fontWeight: 800 }}>은 후에</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    두 가지 이상의 행동이 일어나는 앞뒤 시간 순서를 분명하게 연결해 말할 때 써요.
                  </p>
                </>
              ) : unit === 'unit28' ? (
                <>
                  <p className="font-normal text-slate-800">
                    받침이 없거나 ‘ㄹ’ 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-러 가요/와요’</span>, ‘ㄹ’ 제외 자음 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-으러 가요/와요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>구경하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>구경</span><span style={{ color: '#E03131', fontWeight: 800 }}>하러 가요</span></span>
                    <span>반납하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>반납</span><span style={{ color: '#E03131', fontWeight: 800 }}>하러 와요</span></span>
                    <span>심다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>심</span><span style={{ color: '#E03131', fontWeight: 800 }}>으러 가요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    어떤 행동을 하려는 목적을 가지고 다른 장소로 가거나 올 때 사용해요.
                  </p>
                </>
              ) : unit === 'unit27' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝에 받침이 없거나 ‘ㄹ’ 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-ㄹ 때’</span>, ‘ㄹ’ 제외 자음 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-을 때’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>발표하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>발표</span><span style={{ color: '#E03131', fontWeight: 800 }}>할 때</span></span>
                    <span>졸리다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>졸</span><span style={{ color: '#9333EA', fontWeight: 800 }}>릴</span> <span style={{ color: '#E03131', fontWeight: 800 }}>때</span></span>
                    <span>벗다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>벗</span><span style={{ color: '#E03131', fontWeight: 800 }}>을 때</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    어떤 행동이나 상태가 일어나는 특정 시간이나 순간을 나타낼 때 사용해요.
                  </p>
                </>
              ) : unit === 'unit26' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝에 받침이 없거나 ‘ㄹ’ 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-면’</span>, 그 외 자음 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-으면’</span>을 써요. (‘그렇다’는 ㅎ·으 탈락!)
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>그렇다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>그</span><span style={{ color: '#9333EA', fontWeight: 800 }}>러</span><span style={{ color: '#E03131', fontWeight: 800 }}>면</span> (ㅎ 불규칙)</span>
                    <span>힘들다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>힘들</span><span style={{ color: '#E03131', fontWeight: 800 }}>면</span> (‘ㄹ’ 유지)</span>
                    <span>작다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>작</span><span style={{ color: '#E03131', fontWeight: 800 }}>으면</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    어떤 조건이나 상황이 되었을 때 뒤의 일이나 행동이 이어짐을 말할 때 써요.
                  </p>
                </>
              ) : unit === 'unit25' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝 모음이 ‘ㅏ, ㅗ’면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아서’</span>, 아니면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-어서’</span>, ‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-해서’</span>로 이유를 말해요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>배고프다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>배고</span><span style={{ color: '#9333EA', fontWeight: 800 }}>파</span><span style={{ color: '#E03131', fontWeight: 800 }}>서</span> (ㅡ 탈락)</span>
                    <span>덥다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>더</span><span style={{ color: '#9333EA', fontWeight: 800 }}>워</span><span style={{ color: '#E03131', fontWeight: 800 }}>서</span> (ㅂ 불규칙)</span>
                    <span>빠르다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>빨라</span><span style={{ color: '#E03131', fontWeight: 800 }}>서</span> (르 불규칙)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    앞의 내용이 뒤의 일에 대한 이유나 원인일 때 자연스럽게 이어 주는 표현이에요.
                  </p>
                </>
              ) : unit === 'unit24' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간의 받침이나 모음 종류에 관계없이 어간 모양 그대로 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-지만’</span>을 붙여요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>어렵다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>어렵</span><span style={{ color: '#E03131', fontWeight: 800 }}>지만</span></span>
                    <span>무겁다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>무겁</span><span style={{ color: '#E03131', fontWeight: 800 }}>지만</span></span>
                    <span>멀다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>멀</span><span style={{ color: '#E03131', fontWeight: 800 }}>지만</span> (변화 없음)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    앞의 내용과 반대되거나 다른 사실을 서로 대조하여 연결할 때 사용해요.
                  </p>
                </>
              ) : unit === 'unit23' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝의 받침이나 모음에 상관없이 어간 뒤에 그대로 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-고’</span>를 붙여 연결해요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>세수하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>세수</span><span style={{ color: '#E03131', fontWeight: 800 }}>하고</span></span>
                    <span>펴다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>펴</span><span style={{ color: '#E03131', fontWeight: 800 }}>고</span></span>
                    <span>챙기다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>챙기</span><span style={{ color: '#E03131', fontWeight: 800 }}>고</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    앞 행동을 한 뒤 다음 행동을 이어서 하거나, 여러 가지를 나열할 때 써요.
                  </p>
                </>
              ) : unit === 'unit22' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝에 받침이 없거나 ‘ㄹ’ 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-ㄹ까요?’</span>, ‘ㄹ’ 제외 자음 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-을까요?’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>나누다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>나</span><span style={{ color: '#9333EA', fontWeight: 800 }}>눌</span><span style={{ color: '#E03131', fontWeight: 800 }}>까요?</span></span>
                    <span>더하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>더</span><span style={{ color: '#E03131', fontWeight: 800 }}>할까요?</span></span>
                    <span>빼다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>뺄</span><span style={{ color: '#E03131', fontWeight: 800 }}>까요?</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    상대방에게 함께 하자고 제안하거나 의견을 정중하게 물어볼 때 사용해요.
                  </p>
                </>
              ) : unit === 'unit21' ? (
                <>
                  <p className="font-normal text-slate-800">
                    받침이 없거나 ‘ㄹ’ 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-ㄹ 수 있어요’</span>, ‘ㄹ’ 제외 자음 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-을 수 있어요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>건너다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>건</span><span style={{ color: '#9333EA', fontWeight: 800 }}>널</span> <span style={{ color: '#E03131', fontWeight: 800 }}>수 있어요</span></span>
                    <span>날다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>날</span> <span style={{ color: '#E03131', fontWeight: 800 }}>수 있어요</span> (‘ㄹ’ 유지)</span>
                    <span>밟다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>밟</span><span style={{ color: '#E03131', fontWeight: 800 }}>을 수 없어요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    어떤 일을 할 수 있는 능력·가능성은 ‘있어요’, 할 수 없을 때는 ‘없어요’를 써요.
                  </p>
                </>
              ) : unit === 'unit20' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝 모음이 ‘ㅏ, ㅗ’면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아야 돼요’</span>, 아니면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-어야 돼요’</span>, ‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-해야 돼요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>조심하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>조심</span><span style={{ color: '#E03131', fontWeight: 800 }}>해야 돼요</span></span>
                    <span>지키다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>지</span><span style={{ color: '#9333EA', fontWeight: 800 }}>켜</span><span style={{ color: '#E03131', fontWeight: 800 }}>야 돼요</span> (모음 축약)</span>
                    <span>바르다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>발라</span><span style={{ color: '#E03131', fontWeight: 800 }}>야 돼요</span> (르 불규칙)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    학교와 생활에서 꼭 해야 하는 일이나 지켜야 할 규칙·의무를 말할 때 써요.
                  </p>
                </>
              ) : unit === 'unit19' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝 모음이 ‘ㅏ, ㅗ’면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아도 돼요?’</span>, 아니면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-어도 돼요?’</span>, ‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-해도 돼요?’</span>로 허락을 구해요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>들어가다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>들어가</span><span style={{ color: '#E03131', fontWeight: 800 }}>도 돼요?</span></span>
                    <span>빌리다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>빌</span><span style={{ color: '#9333EA', fontWeight: 800 }}>려</span><span style={{ color: '#E03131', fontWeight: 800 }}>도 돼요?</span> (모음 축약)</span>
                    <span>움직이다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>움직</span><span style={{ color: '#9333EA', fontWeight: 800 }}>여</span><span style={{ color: '#E03131', fontWeight: 800 }}>도 돼요?</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    어떤 행동을 해도 괜찮은지 상대방에게 공손하게 허락을 물어볼 때 사용해요.
                  </p>
                </>
              ) : unit === 'unit18' ? (
                <>
                  <p className="font-normal text-slate-800">
                    어간 끝 모음이 ‘ㅏ, ㅗ’면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아 주세요’</span>, 아니면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-어 주세요’</span>, ‘하다’는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-해 주세요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>기다리다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>기다</span><span style={{ color: '#9333EA', fontWeight: 800 }}>려</span> <span style={{ color: '#E03131', fontWeight: 800 }}>주세요</span></span>
                    <span>깎다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>깎</span><span style={{ color: '#E03131', fontWeight: 800 }}>아 주세요</span></span>
                    <span>끄다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>꺼</span> <span style={{ color: '#E03131', fontWeight: 800 }}>주세요</span> (ㅡ 탈락)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    다른 사람에게 어떤 행동을 해 달라고 공손하게 부탁하거나 도움을 요청할 때 써요.
                  </p>
                </>
              ) : unit === 'unit17' ? (
                <>
                  <p className="font-normal text-slate-800">
                    받침이 없거나 ‘ㄹ’ 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-ㄹ 거예요’</span>, 그 외 자음 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-을 거예요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>가져오다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>가져</span><span style={{ color: '#9333EA', fontWeight: 800 }}>올</span> <span style={{ color: '#E03131', fontWeight: 800 }}>거예요</span></span>
                    <span>살다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>살</span> <span style={{ color: '#E03131', fontWeight: 800 }}>거예요</span> (‘ㄹ’ 유지)</span>
                    <span>놓다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>놓</span><span style={{ color: '#E03131', fontWeight: 800 }}>을 거예요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    앞으로 할 계획이나 미래에 일어날 일을 말할 때 사용해요.
                  </p>
                </>
              ) : unit === 'unit16' ? (
                <>
                  <p className="font-normal text-slate-800">
                    동사 어간 뒤에 받침 유무에 상관없이 그대로 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-지 마세요’</span>를 붙여요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>뛰다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>뛰</span><span style={{ color: '#E03131', fontWeight: 800 }}>지 마세요</span></span>
                    <span>떠들다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>떠들</span><span style={{ color: '#E03131', fontWeight: 800 }}>지 마세요</span></span>
                    <span>버리다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>버리</span><span style={{ color: '#E03131', fontWeight: 800 }}>지 마세요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    공공장소나 학교에서 위험하거나 하면 안 되는 행동을 정중하게 금지할 때 써요.
                  </p>
                </>
              ) : unit === 'unit15' ? (
                <>
                  <p className="font-normal text-slate-800">
                    받침이 없거나 ‘ㄹ’ 받침이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-세요’</span>, ‘ㄹ’ 제외 받침이 있으면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-으세요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>서다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>서</span><span style={{ color: '#E03131', fontWeight: 800 }}>세요</span></span>
                    <span>걷다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>걸</span><span style={{ color: '#E03131', fontWeight: 800 }}>으세요</span> (ㄷ 불규칙)</span>
                    <span>풀다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>푸</span><span style={{ color: '#E03131', fontWeight: 800 }}>세요</span> (ㄹ 탈락)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    상대방에게 어떤 행동을 정중하게 요청하거나 안내할 때 써요.
                  </p>
                </>
              ) : unit === 'unit14' ? (
                <>
                  <p className="font-normal text-slate-800">
                    동사 어간 뒤에 받침 유무에 상관없이 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-고 있어요’</span>를 붙여 지금 하는 중임을 말해요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>일하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>일</span><span style={{ color: '#E03131', fontWeight: 800 }}>하고 있어요</span></span>
                    <span>짓다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>짓</span><span style={{ color: '#E03131', fontWeight: 800 }}>고 있어요</span></span>
                    <span>물어보다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>물어보</span><span style={{ color: '#E03131', fontWeight: 800 }}>고 있어요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    어떤 동작이 바로 지금 진행되고 있을 때 사용해요.
                  </p>
                </>
              ) : unit === 'unit13' ? (
                <>
                  <p className="font-normal text-slate-800">
                    동사 어간 뒤에 받침 유무에 상관없이 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-고 싶어요’</span>를 붙여 바라는 마음을 말해요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>배우다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>배우</span><span style={{ color: '#E03131', fontWeight: 800 }}>고 싶어요</span></span>
                    <span>만나다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>만나</span><span style={{ color: '#E03131', fontWeight: 800 }}>고 싶어요</span></span>
                    <span>잘하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>잘</span><span style={{ color: '#E03131', fontWeight: 800 }}>하고 싶어요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    내가 하고 싶은 희망이나 소망을 나타낼 때 자주 쓰는 표현이에요.
                  </p>
                </>
              ) : unit === 'unit12' ? (
                <>
                  <p className="font-normal text-slate-800">
                    ‘[명사] + 하다’ 동사는 <span style={{ color: '#16A34A', fontWeight: 800 }}>‘안/못’</span>이 명사와 <span style={{ color: '#E03131', fontWeight: 800 }}>‘해요’</span> 사이에 들어가요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>게임하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>게임</span> <span style={{ color: '#16A34A', fontWeight: 800 }}>안</span> <span style={{ color: '#E03131', fontWeight: 800 }}>해요</span>(의지)</span>
                    <span>줄넘기하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>줄넘기</span> <span style={{ color: '#16A34A', fontWeight: 800 }}>못</span> <span style={{ color: '#E03131', fontWeight: 800 }}>해요</span>(능력)</span>
                    <span>운전하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>운전</span> <span style={{ color: '#16A34A', fontWeight: 800 }}>못</span> <span style={{ color: '#E03131', fontWeight: 800 }}>해요</span>(상황)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    의지 부정은 ‘명사 안 해요’, 능력·상황 부정은 ‘명사 못 해요’로 구분해 말해요.
                  </p>
                </>
              ) : unit === 'unit11' ? (
                <>
                  <p className="font-normal text-slate-800">
                    내 의지로 하지 않을 때는 <span style={{ color: '#16A34A', fontWeight: 800 }}>‘안 + [용언]’</span>, 능력이 부족하거나 상황상 못 할 때는 <span style={{ color: '#16A34A', fontWeight: 800 }}>‘못 + [용언]’</span>을 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>
                      예: <span style={{ color: '#16A34A', fontWeight: 800 }}>안</span> <span style={{ color: '#1E293B', fontWeight: 800 }}>남</span><span style={{ color: '#9333EA', fontWeight: 800 }}>겨</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span>(의지)
                    </span>
                    <span>
                      <span style={{ color: '#16A34A', fontWeight: 800 }}>못</span> <span style={{ color: '#1E293B', fontWeight: 800 }}>던</span><span style={{ color: '#9333EA', fontWeight: 800 }}>져</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span>(능력)
                    </span>
                    <span>
                      <span style={{ color: '#16A34A', fontWeight: 800 }}>못</span> <span style={{ color: '#1E293B', fontWeight: 800 }}>참</span><span style={{ color: '#E03131', fontWeight: 800 }}>아요</span>(상황)
                    </span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    {lang !== 'ko' && VERB_UNIT_11_DATA.haebolTip[lang]
                      ? VERB_UNIT_11_DATA.haebolTip[lang]
                      : '단순 부정(안)과 상황/능력 부정(못)의 차이를 구별하여 표현해요.'}
                  </p>
                </>
              ) : unit === 'unit10' ? (
                <>
                  <p className="font-normal text-slate-800">
                    과거형 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-었어요’</span>를 만날 때 모음이 합쳐지거나 ‘ㅡ’ 탈락, 받침 ‘ㅎ·ㅂ’이 변하기도 해요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>그리다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>그</span><span style={{ color: '#9333EA', fontWeight: 800 }}>렸</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span> (축약)</span>
                    <span>까맣다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>까</span><span style={{ color: '#9333EA', fontWeight: 800 }}>맸</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span> (ㅎ 불규칙)</span>
                    <span>춥다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>추</span><span style={{ color: '#9333EA', fontWeight: 800 }}>웠</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span> (ㅂ 불규칙)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    줄어들거나 모양이 바뀐 보라색 부분을 입으로 소리 내어 익혀 보세요.
                  </p>
                </>
              ) : unit === 'unit9' ? (
                <>
                  <p className="font-normal text-slate-800">
                    과거형 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-았어요’</span>를 만날 때 같은 모음 ‘ㅏ’가 합쳐지거나, ‘르→ㄹ라’, 받침 ‘ㅅ’ 탈락이 일어나요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>타다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>탔</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span> (모음 합체)</span>
                    <span>모르다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>몰랐</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span> (르→ㄹ라 변신)</span>
                    <span>낫다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>나</span><span style={{ color: '#9333EA', fontWeight: 800 }}>았</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span> (‘ㅅ’ 탈락)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    보라색 글자처럼 모음이 합쳐지거나 ‘르/ㅅ’이 바뀌는 특별한 과거 변화를 눈여겨보세요.
                  </p>
                </>
              ) : unit === 'unit8' ? (
                <>
                  <p className="font-normal text-slate-800">
                    ‘하다’가 붙은 단어가 이미 끝난 일을 나타낼 때는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-했어요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>시작하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>시작</span><span style={{ color: '#E03131', fontWeight: 800 }}>했어요</span></span>
                    <span>대답하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>대답</span><span style={{ color: '#E03131', fontWeight: 800 }}>했어요</span></span>
                    <span>양보하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>양보</span><span style={{ color: '#E03131', fontWeight: 800 }}>했어요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    원래 ‘-하였어요’ 형태이지만 줄여서 ‘-했어요’로 써요. ‘하다’ 자리에 ‘했어요’를 쏙 바꿔 넣어 보세요.
                  </p>
                </>
              ) : unit === 'unit7' ? (
                <>
                  <p className="font-normal text-slate-800">
                    이미 지나간 일(과거)이고 어간 끝음절 모음이 <span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ가 아니면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-었어요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>신다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>신</span><span style={{ color: '#E03131', fontWeight: 800 }}>었어요</span></span>
                    <span>웃다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>웃</span><span style={{ color: '#E03131', fontWeight: 800 }}>었어요</span></span>
                    <span>만들다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>만들</span><span style={{ color: '#E03131', fontWeight: 800 }}>었어요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    ‘-어요’ 자리에 과거를 나타내는 쌍시옷(ㅆ) 받침을 넣어 ‘-었어요’로 말해 보세요.
                  </p>
                </>
              ) : unit === 'unit6' ? (
                <>
                  <p className="font-normal text-slate-800">
                    이미 지나간 일(과거)이고 어간 끝음절 모음이 <span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span>이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-았어요’</span>를 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>닦다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>닦</span><span style={{ color: '#E03131', fontWeight: 800 }}>았어요</span></span>
                    <span>앉다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>앉</span><span style={{ color: '#E03131', fontWeight: 800 }}>았어요</span></span>
                    <span>좋다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>좋</span><span style={{ color: '#E03131', fontWeight: 800 }}>았어요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    과거를 나타내는 쌍시옷(ㅆ) 받침에 주의하며 ‘-았어요’ 형태를 익혀 보세요.
                  </p>
                </>
              ) : unit === 'unit5' ? (
                <>
                  <p className="font-normal text-slate-800">
                    <span style={{ color: '#E03131', fontWeight: 800 }}>‘-어요’</span>를 붙일 때 모음이 줄어들거나(‘우+어→워’), ‘ㅡ’ 탈락, 받침 ‘ㄷ→ㄹ’, ‘르→ㄹ러’ 변신이 일어나요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>주다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>줘</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span> (축약)</span>
                    <span>쓰다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>써</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span> (‘ㅡ’ 탈락)</span>
                    <span>듣다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>들</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span> (ㄷ→ㄹ)</span>
                    <span>부르다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>불러</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span> (르→ㄹ러)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    보라색으로 바뀐 글자를 눈으로 짚어 보며 소리 내어 익혀 보세요.
                  </p>
                </>
              ) : unit === 'unit4' ? (
                <>
                  <p className="font-normal text-slate-800">
                    <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아요’</span>를 붙일 때 모음이 합쳐지거나(‘오+아→와’), ‘ㅡ’ 탈락, 받침 ‘ㅂ→우(와)’ 변신이 일어나요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>오다 → <span style={{ color: '#9333EA', fontWeight: 800 }}>와</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span> (축약)</span>
                    <span>가다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>가</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span> (탈락)</span>
                    <span>아프다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>아</span><span style={{ color: '#9333EA', fontWeight: 800 }}>파</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span> (‘ㅡ’ 탈락)</span>
                    <span>돕다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>도</span><span style={{ color: '#9333EA', fontWeight: 800 }}>와</span><span style={{ color: '#E03131', fontWeight: 800 }}>요</span> (ㅂ→와)</span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    소리 내어 빠르게 읽으면 자연스럽게 줄어드는 모습을 보라색과 함께 익혀 보세요.
                  </p>
                </>
              ) : unit === 'unit3' ? (
                <>
                  <p className="font-normal text-slate-800">
                    <span style={{ color: '#D97706', fontWeight: 800 }}>‘-하다’</span>가 붙은 동사와 형용사는 ‘-여요’를 붙이며, 일상에서는 줄여서 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-해요’</span>라고 써요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>공부하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>공부</span><span style={{ color: '#E03131', fontWeight: 800 }}>해요</span></span>
                    <span>청소하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>청소</span><span style={{ color: '#E03131', fontWeight: 800 }}>해요</span></span>
                    <span>숙제하다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>숙제</span><span style={{ color: '#E03131', fontWeight: 800 }}>해요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    ‘하여요’보다 ‘해요’ 형태를 일상생활에서 흔히 사용해요. ‘하다’ 자리에 ‘해요’를 쏙 바꿔 넣어 보세요.
                  </p>
                </>
              ) : unit === 'unit2' ? (
                <>
                  <p className="font-normal text-slate-800">
                    동사나 형용사의 어간 끝음절 모음이 <span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ가 아니면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-어요’</span>를 붙여요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>먹다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>먹</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span></span>
                    <span>씻다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>씻</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span></span>
                    <span>열다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>열</span><span style={{ color: '#E03131', fontWeight: 800 }}>어요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
                    ‘다’를 빼고 ‘-어요’를 붙이는 기본 형태를 익혀 보세요.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-normal text-slate-800">
                    동사나 형용사의 어간 끝음절 모음이 <span style={{ color: '#D97706', fontWeight: 800 }}>ㅏ, ㅗ</span>이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아요’</span>를 붙여요.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
                    <span>받다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>받</span><span style={{ color: '#E03131', fontWeight: 800 }}>아요</span></span>
                    <span>놀다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>놀</span><span style={{ color: '#E03131', fontWeight: 800 }}>아요</span></span>
                    <span>좋다 → <span style={{ color: '#1E293B', fontWeight: 800 }}>좋</span><span style={{ color: '#E03131', fontWeight: 800 }}>아요</span></span>
                  </div>
                  <p className="font-normal text-slate-700 text-[11px] sm:text-[12px] leading-relaxed pr-4 sm:pr-10 break-keep">
                    ‘-어1’는 동사나 형용사, ‘이다, 아니다′ 뒤에 붙어 생각을 말하거나 설명할 때 사용하는 종결어미이다.
                    <br />
                    높임 표현으로는 ‘-요’가 결합한 ‘-어요’의 형태로 사용한다. -국립국어원
                  </p>
                </>
              )}
            </div>
          </div>
          )}

        </div>
      </div>

      {/* 4. SHEET FOOTER */}
      {!renderOnly && (
        <div className="mt-0.5 pt-0.5 border-t border-slate-300 flex items-center justify-start text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic font-bold">
          <span>
            해볼 한국어(hbkorean.ai.studio) | 다문화·초등 한국어 맞춤형 학습 교구
          </span>
        </div>
      )}

    </div>
  );
};
