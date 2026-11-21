import { SupportedLanguage } from '../types';
import { SitcomSfxType } from '../utils/audio';
import {
  NA_STUDENT_SVG,
  CHINGU_SOCCER_SVG,
  DONGSAENG_CUTE_SVG,
  SEONSAENGNIM_KIND_SVG,
  GABANG_PRETTY_SVG,
} from './particleWorksheetIllustrations';

export type BlunderAnimKind =
  | 'bandage'        // 1-1 나 + 은 -> 나은? (병원 반창고·청진기)
  | 'kickout'        // 1-1 나 + 가 -> 나가! (빨간 문 뻥 퇴장)
  | 'medicine'       // 1-1 나 + 을 -> 나을? (약병 우르르 쏟아짐)
  | 'silvermedal'    // 1-2 친구 + 은 -> 친구은? (은메달 묵직하게 쿵)
  | 'soccerfriend'   // 1-2 친구 + 를 -> 친구를 축구를?! (친구가 축구공처럼 말려 날아감)
  | 'headride'       // 1-2 친구 + 에 -> 친구에 축구를?! (친구 머리 위 무등 드리블)
  | 'rolling_o'      // 1-3 동생 + 는 -> 동생는? (ㅇ 받침이 공처럼 굴러 도망)
  | 'dizzy_spin'     // 1-3 동생 + 를 -> 동생을 귀여워요?! (문장이 어지러워 빙글빙글)
  | 'bouncer_o'      // 1-3 동생 + 야 -> 동생야?! (ㅇ 받침 문지기가 '야'를 튕겨냄)
  | 'square_squash'  // 1-4 선생님 + 는 -> 선생님는? (무거운 ㅁ 받침이 만두를 납작 프레스)
  | 'thunder_kneel'  // 1-4 선생님 + 아 -> 선생님아?! (천둥번개 치며 무릎 꿇고 반성)
  | 'robot_smoke'    // 1-4 선생님 + 을 -> 선생님을 친절해요?! (문법 로봇 과열 연기 폭발)
  | 'zipper_burst'   // 1-5 가방 + 는 -> 가방는? (지퍼 퍽 터져 학용품 분수)
  | 'bag_monster'    // 1-5 가방 + 을 -> 가방을 예뻐요?! (가방 괴물이 리본 꿀꺽)
  | 'self_talk';     // 1-5 가방 + 야 -> 가방야?! (만두가 가방에게 장미 들고 혼잣말)

export interface SitcomBlunderItem {
  id: string;
  cardNumber: number; // 1 ~ 15
  particle: string;
  wrongWord: string;
  wrongSentence: string;
  ttsText: string;
  titleKo: string;
  reactionQuote: string;
  whyFunnyKo: string;
  animKind: BlunderAnimKind;
  sfx: SitcomSfxType;
  cardTheme: {
    bg: string;
    border: string;
    tagBg: string;
    tagText: string;
  };
}

export interface SitcomEpisodeItem {
  id: string;
  unitBadge: string;
  baseNoun: string;
  hasBatchim: boolean;
  batchimChar?: string;
  batchimHintKo: string;
  correctParticle: '은' | '는';
  correctWord: string;
  sentenceSuffix: string;
  fullCorrectSentence: string;
  illustrationSvg: string;
  meanings: Record<SupportedLanguage, string>;
  sentenceTranslations: Record<SupportedLanguage, string>;
  ruleWhyKo: string;
  blunders: [SitcomBlunderItem, SitcomBlunderItem, SitcomBlunderItem];
}

export const UNIT1_SITCOM_EPISODES: SitcomEpisodeItem[] = [
  {
    id: 'ep-u1-1',
    unitBadge: '1-1',
    baseNoun: '나',
    hasBatchim: false,
    batchimHintKo: '받침 X → 뒤에는 가벼운 「는」!',
    correctParticle: '는',
    correctWord: '나는',
    sentenceSuffix: '학생이에요.',
    fullCorrectSentence: '나는 학생이에요.',
    illustrationSvg: NA_STUDENT_SVG,
    meanings: {
      en: 'I / Me',
      vi: 'Tôi / Mình',
      bn: 'আমি',
      zh: '我',
      ru: 'Я',
      ja: '私 / ぼく',
      mn: 'Би',
    },
    sentenceTranslations: {
      en: 'I am a student.',
      vi: 'Tôi là học sinh.',
      bn: 'আমি একজন ছাত্র।',
      zh: '我是学生。',
      ru: 'Я ученик.',
      ja: '私は学生です。',
      mn: 'Би сурагч.',
    },
    ruleWhyKo: '「나」는 받침이 없어서 부드러운 「는」을 붙여 「나는 학생이에요.」가 정답!',
    blunders: [
      {
        id: 'u1-na-eun',
        cardNumber: 1,
        particle: '은',
        wrongWord: '나은',
        wrongSentence: '나은 학생이에요?!',
        ttsText: '나은 학생이에요? 병이 다 나은 거예요?',
        titleKo: '병이 다 나은 학생?!',
        reactionQuote: '어? 감기가 다 나은 학생이래요!',
        whyFunnyKo: '「나」에 받침이 없는데 「은」을 붙이니 "병이 낫다(나은)"가 되어 구급대가 출동했어요!',
        animKind: 'bandage',
        sfx: 'slap',
        cardTheme: {
          bg: 'bg-rose-50',
          border: 'border-rose-300',
          tagBg: 'bg-rose-600',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-na-ga',
        cardNumber: 2,
        particle: '가',
        wrongWord: '나가',
        wrongSentence: '나가 학생이에요?!',
        ttsText: '나가! 당장 교실 밖으로 나가!',
        titleKo: '나가!! 교실 퇴장 만두',
        reactionQuote: '으악! 나 학생인데 왜 밖으로 쫓아내요?!',
        whyFunnyKo: '「나」 뒤에 「가」를 붙이면 "나가!(Get out!)"가 되어 스프링 발에 차여 쫓겨납니다!',
        animKind: 'kickout',
        sfx: 'kick',
        cardTheme: {
          bg: 'bg-orange-50',
          border: 'border-orange-300',
          tagBg: 'bg-orange-600',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-na-eul',
        cardNumber: 3,
        particle: '을',
        wrongWord: '나을',
        wrongSentence: '나을 학생이에요?!',
        ttsText: '나을 학생이에요? 약 먹고 빨리 나을 거예요!',
        titleKo: '약 먹고 나을 학생?!',
        reactionQuote: '콜록콜록! 공부해야 하는데 약병이 우르르~',
        whyFunnyKo: '「나을」은 "병이 앞으로 나을"처럼 들려서 책가방 대신 약병이 쏟아졌어요!',
        animKind: 'medicine',
        sfx: 'drop',
        cardTheme: {
          bg: 'bg-sky-50',
          border: 'border-sky-300',
          tagBg: 'bg-sky-600',
          tagText: 'text-white',
        },
      },
    ],
  },
  {
    id: 'ep-u1-2',
    unitBadge: '1-2',
    baseNoun: '친구',
    hasBatchim: false,
    batchimHintKo: '「구」에 받침 X → 「는」이 짝꿍!',
    correctParticle: '는',
    correctWord: '친구는',
    sentenceSuffix: '축구를 해요.',
    fullCorrectSentence: '친구는 축구를 해요.',
    illustrationSvg: CHINGU_SOCCER_SVG,
    meanings: {
      en: 'Friend',
      vi: 'Bạn bè',
      bn: 'বন্ধু',
      zh: '朋友',
      ru: 'Друг',
      ja: '友達',
      mn: 'Найз',
    },
    sentenceTranslations: {
      en: 'My friend plays soccer.',
      vi: 'Bạn tôi chơi bóng đá.',
      bn: 'আমার বন্ধু ফুটবল খেলে।',
      zh: '朋友踢足球。',
      ru: 'Друг играет в футбол.',
      ja: '友達はサッカーをします。',
      mn: 'Найз хөлбөмбөг тоглодог.',
    },
    ruleWhyKo: '「친구」의 마지막 글자 「구」에 받침이 없으니 「는」을 붙여 「친구는 축구를 해요.」!',
    blunders: [
      {
        id: 'u1-chingu-eun',
        cardNumber: 4,
        particle: '은',
        wrongWord: '친구은',
        wrongSentence: '친구은 축구를 해요?!',
        ttsText: '친구은? 혀가 꼬여서 은메달이 쿵!',
        titleKo: '혀 꼬인 은메달 쿵!',
        reactionQuote: '으앗! 발음하다가 무거운 은메달에 깔렸어요!',
        whyFunnyKo: '「구」에 받침이 없는데 무거운 「은」을 억지로 달아 진짜 은메달이 머리 위로 쿵!',
        animKind: 'silvermedal',
        sfx: 'drop',
        cardTheme: {
          bg: 'bg-slate-100',
          border: 'border-slate-300',
          tagBg: 'bg-slate-700',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-chingu-reul',
        cardNumber: 5,
        particle: '를',
        wrongWord: '친구를',
        wrongSentence: '친구를 축구를 해요?!',
        ttsText: '친구를 축구를 해요? 친구를 뻥 차버렸네!',
        titleKo: '친구를 뻥?! 인간 축구공',
        reactionQuote: '살려줘어어! 공 대신 나를 차면 어떡해!!',
        whyFunnyKo: '「친구를」을 쓰면 친구가 공이 되어 버려요! 축구공 대신 친구가 골대로 날아갔습니다!',
        animKind: 'soccerfriend',
        sfx: 'kick',
        cardTheme: {
          bg: 'bg-emerald-50',
          border: 'border-emerald-300',
          tagBg: 'bg-emerald-700',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-chingu-e',
        cardNumber: 6,
        particle: '에',
        wrongWord: '친구에',
        wrongSentence: '친구에 축구를 해요?!',
        ttsText: '친구에 축구를 해요? 친구 머리 위에서 드리블!',
        titleKo: '친구 머리 위 드리블?!',
        reactionQuote: '어이쿠! 내 머리는 축구장이 아니라고!!',
        whyFunnyKo: '장소 조사 「에」를 쓰니 만두가 친구를 운동장 삼아 머리 위에서 축구를 시작했어요!',
        animKind: 'headride',
        sfx: 'slap',
        cardTheme: {
          bg: 'bg-amber-50',
          border: 'border-amber-300',
          tagBg: 'bg-amber-600',
          tagText: 'text-white',
        },
      },
    ],
  },
  {
    id: 'ep-u1-3',
    unitBadge: '1-3',
    baseNoun: '동생',
    hasBatchim: true,
    batchimChar: 'ㅇ',
    batchimHintKo: '「생」에 받침(ㅇ) O → 「은」이 찰떡!',
    correctParticle: '은',
    correctWord: '동생은',
    sentenceSuffix: '귀여워요.',
    fullCorrectSentence: '동생은 귀여워요.',
    illustrationSvg: DONGSAENG_CUTE_SVG,
    meanings: {
      en: 'Younger sibling',
      vi: 'Em',
      bn: 'ছোট ভাই/বোন',
      zh: '弟弟/妹妹',
      ru: 'Младший брат/сестра',
      ja: '弟 / 妹',
      mn: 'Дүү',
    },
    sentenceTranslations: {
      en: 'My younger sibling is cute.',
      vi: 'Em của tôi dễ thương.',
      bn: 'আমার ছোট ভাই/বোন কিউট।',
      zh: '弟弟/妹妹很可爱。',
      ru: 'Младший брат милый.',
      ja: '弟（妹）はかわいいです。',
      mn: 'Дүү минь хөөрхөн.',
    },
    ruleWhyKo: '「동생」의 「생」 아래에 받침 「ㅇ」이 있으므로 「은」이 와서 「동생은 귀여워요.」!',
    blunders: [
      {
        id: 'u1-dongsaeng-neun',
        cardNumber: 7,
        particle: '는',
        wrongWord: '동생는',
        wrongSentence: '동생는 귀여워요?!',
        ttsText: '동생는? 동그란 이응 받침이 데구루루 도망갔어요!',
        titleKo: '이응(ㅇ) 받침 대탈출!',
        reactionQuote: '잡아라~! 「는」이 오니까 ㅇ 받침이 굴러 도망가 버렸어!',
        whyFunnyKo: '받침 「ㅇ」이 있는 「동생」에 받침 없는 척 「는」을 붙이자 ㅇ 받침이 삐져서 굴러갔어요!',
        animKind: 'rolling_o',
        sfx: 'roll',
        cardTheme: {
          bg: 'bg-violet-50',
          border: 'border-violet-300',
          tagBg: 'bg-violet-600',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-dongsaeng-reul',
        cardNumber: 8,
        particle: '를',
        wrongWord: '동생을',
        wrongSentence: '동생을 귀여워요?!',
        ttsText: '동생을 귀여워요? 문장이 꼬여서 어지러워요!',
        titleKo: '어질어질 문장 대혼란',
        reactionQuote: '빙글빙글~ "귀여워요"는 형용사라 「를」을 못 먹어요!',
        whyFunnyKo: '동작 동사가 아닌 "귀여워요" 앞에 「를」을 붙여서 만두 머리가 빙글빙글 어지러워요!',
        animKind: 'dizzy_spin',
        sfx: 'roll',
        cardTheme: {
          bg: 'bg-pink-50',
          border: 'border-pink-300',
          tagBg: 'bg-pink-600',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-dongsaeng-ya',
        cardNumber: 9,
        particle: '야',
        wrongWord: '동생야',
        wrongSentence: '동생야 귀여워요?!',
        ttsText: '동생야? 받침 문지기가 야를 튕겨냈어요!',
        titleKo: '문지기 이응(ㅇ) 튕기기!',
        reactionQuote: '통과 불가! 받침이 있으면 「야」 말고 「아」를 데려와!',
        whyFunnyKo: '부르는 말도 받침이 있으면 「아」(동생아)! 받침 ㅇ 문지기가 「야」를 튕겨냈어요!',
        animKind: 'bouncer_o',
        sfx: 'slap',
        cardTheme: {
          bg: 'bg-indigo-50',
          border: 'border-indigo-300',
          tagBg: 'bg-indigo-600',
          tagText: 'text-white',
        },
      },
    ],
  },
  {
    id: 'ep-u1-4',
    unitBadge: '1-4',
    baseNoun: '선생님',
    hasBatchim: true,
    batchimChar: 'ㅁ',
    batchimHintKo: '「님」에 받침(ㅁ) O → 든든한 「은」!',
    correctParticle: '은',
    correctWord: '선생님은',
    sentenceSuffix: '친절해요.',
    fullCorrectSentence: '선생님은 친절해요.',
    illustrationSvg: SEONSAENGNIM_KIND_SVG,
    meanings: {
      en: 'Teacher',
      vi: 'Giáo viên',
      bn: 'শিক্ষক',
      zh: '老师',
      ru: 'Учитель',
      ja: '先生',
      mn: 'Багш',
    },
    sentenceTranslations: {
      en: 'The teacher is kind.',
      vi: 'Giáo viên rất tốt bụng.',
      bn: 'শিক্ষক খুব দয়ালু।',
      zh: '老师很亲切。',
      ru: 'Учитель добрый.',
      ja: '先生は親切です。',
      mn: 'Багш эелдэг.',
    },
    ruleWhyKo: '「선생님」의 마지막 글자 「님」에 받침 「ㅁ」이 있어 「은」을 붙여 「선생님은 친절해요.」!',
    blunders: [
      {
        id: 'u1-teacher-neun',
        cardNumber: 10,
        particle: '는',
        wrongWord: '선생님는',
        wrongSentence: '선생님는 친절해요?!',
        ttsText: '선생님는? 무거운 미음 받침에 만두가 납작 찌부러졌어요!',
        titleKo: '거대 ㅁ 받침 납작 프레스!',
        reactionQuote: '으억! 네모난 「ㅁ」 받침이 너무 무거워서 납작 만두가 됐어!',
        whyFunnyKo: '「님」 아래 묵직한 「ㅁ」 받침을 무시하고 「는」을 끼워 넣다 찌부러졌어요!',
        animKind: 'square_squash',
        sfx: 'squash',
        cardTheme: {
          bg: 'bg-amber-50',
          border: 'border-amber-400',
          tagBg: 'bg-amber-700',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-teacher-a',
        cardNumber: 11,
        particle: '아',
        wrongWord: '선생님아',
        wrongSentence: '선생님아 친절해요?!',
        ttsText: '선생님아?! 허걱! 선생님한테 반말했다가 천둥번개!',
        titleKo: '선생님아?! 천둥번개 반성문',
        reactionQuote: '잘못했습니다!! 선생님한테 "선생님아"라니 죄송해요!!',
        whyFunnyKo: '친구 부를 때 쓰는 「아」를 선생님께 붙였다가 교실에 천둥번개가 치고 무릎 꿇었어요!',
        animKind: 'thunder_kneel',
        sfx: 'thunder',
        cardTheme: {
          bg: 'bg-purple-50',
          border: 'border-purple-300',
          tagBg: 'bg-purple-700',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-teacher-eul',
        cardNumber: 12,
        particle: '을',
        wrongWord: '선생님을',
        wrongSentence: '선생님을 친절해요?!',
        ttsText: '선생님을 친절해요? 삐빅! 문법 회로 과열 연기 폭발!',
        titleKo: '문법 로봇 과열 펑!',
        reactionQuote: '삐빅- 오류! "친절해요"와 「을」이 충돌해 연기가 나요!',
        whyFunnyKo: '「선생님을 (좋아해요)」는 되지만 「친절해요」에는 주어 「은」만 올 수 있어서 로봇이 펑!',
        animKind: 'robot_smoke',
        sfx: 'explode',
        cardTheme: {
          bg: 'bg-red-50',
          border: 'border-red-300',
          tagBg: 'bg-red-600',
          tagText: 'text-white',
        },
      },
    ],
  },
  {
    id: 'ep-u1-5',
    unitBadge: '1-5',
    baseNoun: '가방',
    hasBatchim: true,
    batchimChar: 'ㅇ',
    batchimHintKo: '「방」에 받침(ㅇ) O → 어울리는 「은」!',
    correctParticle: '은',
    correctWord: '가방은',
    sentenceSuffix: '예뻐요.',
    fullCorrectSentence: '가방은 예뻐요.',
    illustrationSvg: GABANG_PRETTY_SVG,
    meanings: {
      en: 'Bag / Backpack',
      vi: 'Cặp sách',
      bn: 'ব্যাগ',
      zh: '书包',
      ru: 'Рюкзак',
      ja: 'かばん',
      mn: 'Цүнх',
    },
    sentenceTranslations: {
      en: 'The bag is pretty.',
      vi: 'Cái cặp thật đẹp.',
      bn: 'ব্যাগটি সুন্দর।',
      zh: '书包很漂亮。',
      ru: 'Рюкзак красивый.',
      ja: 'かばんはきれいです。',
      mn: 'Цүнх хөөрхөн байна.',
    },
    ruleWhyKo: '「가방」의 「방」 아래에 받침 「ㅇ」이 있으므로 「은」을 붙여 「가방은 예뻐요.」가 정답!',
    blunders: [
      {
        id: 'u1-bag-neun',
        cardNumber: 13,
        particle: '는',
        wrongWord: '가방는',
        wrongSentence: '가방는 예뻐요?!',
        ttsText: '가방는? 가방 지퍼가 퍽 터져서 연필이 하늘로!',
        titleKo: '지퍼 퍽! 학용품 분수쇼',
        reactionQuote: '와장창! 받침 ㅇ 자리까지 억지로 넣었더니 가방이 터졌어!',
        whyFunnyKo: '「가방」의 받침 ㅇ 때문에 자리가 꽉 찼는데 「는」을 욱여넣어 가방 지퍼가 퍽 터졌어요!',
        animKind: 'zipper_burst',
        sfx: 'explode',
        cardTheme: {
          bg: 'bg-yellow-50',
          border: 'border-yellow-400',
          tagBg: 'bg-amber-600',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-bag-eul',
        cardNumber: 14,
        particle: '을',
        wrongWord: '가방을',
        wrongSentence: '가방을 예뻐요?!',
        ttsText: '가방을 예뻐요? 배고픈 가방 괴물이 리본을 꿀꺽!',
        titleKo: '리본 꿀꺽! 배고픈 가방 괴물',
        reactionQuote: '옴뇸뇸! 「을」을 줬더니 가방이 입을 벌려 리본을 먹어 치웠어!',
        whyFunnyKo: '「예뻐요」는 목적어 「을」이 필요 없어요! 엉뚱하게 나온 「을」을 가방 괴물이 꿀꺽 삼켰어요!',
        animKind: 'bag_monster',
        sfx: 'chomp',
        cardTheme: {
          bg: 'bg-fuchsia-50',
          border: 'border-fuchsia-300',
          tagBg: 'bg-fuchsia-700',
          tagText: 'text-white',
        },
      },
      {
        id: 'u1-bag-ya',
        cardNumber: 15,
        particle: '야',
        wrongWord: '가방야',
        wrongSentence: '가방야 예뻐요?!',
        ttsText: '가방야? 가방한테 장미꽃 주면서 사랑 고백 중!',
        titleKo: '가방에게 장미꽃 고백?!',
        reactionQuote: '어? 가방아… 아니 가방야?! 내 고백을 받아줘!',
        whyFunnyKo: '사람도 아닌 가방을 「야」로 부르다 받침 ㅇ 규칙까지 틀려, 가방에게 어색한 고백을 하고 말았어요!',
        animKind: 'self_talk',
        sfx: 'slap',
        cardTheme: {
          bg: 'bg-teal-50',
          border: 'border-teal-300',
          tagBg: 'bg-teal-700',
          tagText: 'text-white',
        },
      },
    ],
  },
];

export const SITCOM_LOCAL_STORAGE_KEY = 'haebol_particle_u1_sitcom_album_v1';

export interface SitcomUiLocaleStrings {
  gameTitle: string;
  unitPill: string;
  leftGuide: string;
  rightGuide: string;
  hintBtn: string;
  albumBtn: string;
  newEpisodeBtn: string;
  listenBtn: string;
  retryPrompt: string;
  chooseParticlePrompt: string;
  correctStamp: string;
  nextEpisodeBtn: string;
  albumUnlockedToast: string;
  albumAlreadyToast: string;
  albumModalTitle: string;
  albumModalSub: string;
  albumReplayHint: string;
  albumLockedLabel: string;
  albumClose: string;
  summaryTitle: string;
  summarySub: string;
  playAgainBtn: string;
  openAlbumBtn: string;
  firstTryBadge: string;
  blunderBadge: string;
}

export const SITCOM_UI_STRINGS: Record<SupportedLanguage, SitcomUiLocaleStrings> = {
  en: {
    gameTitle: 'Particle Sitcom Theater',
    unitPill: 'Unit 1 · Topic (은, 는)',
    leftGuide: 'Pick the wrong particle & watch the comedy disaster!',
    rightGuide: 'Collect 15 Funny Photo Cards',
    hintBtn: 'Batchim Hint',
    albumBtn: 'Photo Album',
    newEpisodeBtn: 'Restart',
    listenBtn: 'Listen',
    retryPrompt: 'Pick the right particle now!',
    chooseParticlePrompt: 'Tap a particle card or press 1–4',
    correctStamp: 'PASS!',
    nextEpisodeBtn: 'Next Scene',
    albumUnlockedToast: 'NEW Photo Card Saved!',
    albumAlreadyToast: 'Photo Card in Album',
    albumModalTitle: 'Comedy Blunder Photo Album',
    albumModalSub: 'Collect all 15 funny particle disasters from Unit 1 (은/는)!',
    albumReplayHint: 'Tap an unlocked card to replay its sitcom scene!',
    albumLockedLabel: 'Make this blunder to unlock!',
    albumClose: 'Close',
    summaryTitle: 'Unit 1 Sitcom Filming Complete!',
    summarySub: 'You mastered all 5 scenes of 은/는!',
    playAgainBtn: 'Film Again',
    openAlbumBtn: 'View Photo Album',
    firstTryBadge: 'One-Take Star',
    blunderBadge: 'Comedy Blunders',
  },
  vi: {
    gameTitle: 'Nhà hát hài hước Trợ từ',
    unitPill: 'Bài 1 · Chủ đề (은, 는)',
    leftGuide: 'Chọn nhầm trợ từ sẽ xảy ra tình huống dở khóc dở cười!',
    rightGuide: 'Sưu tầm 15 thẻ ảnh hài',
    hintBtn: 'Gợi ý Patchim',
    albumBtn: 'Bộ sưu tập',
    newEpisodeBtn: 'Chơi lại',
    listenBtn: 'Nghe',
    retryPrompt: 'Giờ hãy chọn trợ từ đúng nhé!',
    chooseParticlePrompt: 'Chạm thẻ trợ từ hoặc bấm 1–4',
    correctStamp: 'CHUẨN!',
    nextEpisodeBtn: 'Cảnh tiếp theo',
    albumUnlockedToast: 'Đã lưu thẻ ảnh MỚI!',
    albumAlreadyToast: 'Đã có trong bộ sưu tập',
    albumModalTitle: 'Album Ảnh Tình Huống Hài',
    albumModalSub: 'Thu thập đủ 15 cảnh nói nhầm hài hước của Bài 1 (은/는)!',
    albumReplayHint: 'Chạm thẻ đã mở để xem lại cảnh hài!',
    albumLockedLabel: 'Hãy thử chọn nhầm để mở khóa!',
    albumClose: 'Đóng',
    summaryTitle: 'Hoàn thành quay Sitcom Bài 1!',
    summarySub: 'Bạn đã chinh phục cả 5 cảnh 은/는!',
    playAgainBtn: 'Quay lại từ đầu',
    openAlbumBtn: 'Mở Album Ảnh',
    firstTryBadge: 'Một đúp ăn ngay',
    blunderBadge: 'Cảnh hài đã gặp',
  },
  bn: {
    gameTitle: 'পার্টিকেল সিটকম থিয়েটার',
    unitPill: 'অধ্যায় ১ · বিষয় (은, 는)',
    leftGuide: 'ভুল পার্টিকেল বেছে নিলে মজার কাণ্ড ঘটবে!',
    rightGuide: '১৫টি মজার ফটোকার্ড সংগ্রহ করুন',
    hintBtn: 'বাচ্চিম ইঙ্গিত',
    albumBtn: 'ফটো অ্যালবাম',
    newEpisodeBtn: 'আবার শুরু',
    listenBtn: 'শুনুন',
    retryPrompt: 'এবার সঠিক পার্টিকেল বেছে নিন!',
    chooseParticlePrompt: 'কার্ডে ট্যাপ করুন বা ১–৪ চাপুন',
    correctStamp: 'সঠিক!',
    nextEpisodeBtn: 'পরবর্তী দৃশ্য',
    albumUnlockedToast: 'নতুন ফটোকার্ড সেভ হয়েছে!',
    albumAlreadyToast: 'অ্যালবামে আছে',
    albumModalTitle: 'মজার ভুল ফটোকার্ড অ্যালবাম',
    albumModalSub: 'অধ্যায় ১ (은/는)-এর সব ১৫টি মজার ভুল দৃশ্য সংগ্রহ করুন!',
    albumReplayHint: 'আনলক করা কার্ডে ট্যাপ করে দৃশ্যটি আবার দেখুন!',
    albumLockedLabel: 'এই ভুলটি করে আনলক করুন!',
    albumClose: 'বন্ধ করুন',
    summaryTitle: 'অধ্যায় ১ শুটিং সম্পন্ন!',
    summarySub: 'আপনি 은/는-এর ৫টি দৃশ্যই জয় করেছেন!',
    playAgainBtn: 'আবার খেলুন',
    openAlbumBtn: 'অ্যালবাম দেখুন',
    firstTryBadge: 'এক শটেই সেরা',
    blunderBadge: 'মজার ভুল',
  },
  zh: {
    gameTitle: '助词爆笑情景剧',
    unitPill: '第1课 · 主题 (은, 는)',
    leftGuide: '选错助词，舞台上就会上演爆笑闹剧！',
    rightGuide: '收集15张爆笑卡片',
    hintBtn: '收音提示',
    albumBtn: '搞笑图鉴',
    newEpisodeBtn: '重新开始',
    listenBtn: '听发音',
    retryPrompt: '现在选出正确的助词吧！',
    chooseParticlePrompt: '点击助词卡或按 1–4 键',
    correctStamp: '过关!',
    nextEpisodeBtn: '下一幕',
    albumUnlockedToast: '新搞笑卡片已收藏！',
    albumAlreadyToast: '图鉴中已有此卡片',
    albumModalTitle: '爆笑口误照片图鉴',
    albumModalSub: '收集第1课 (은/는) 全部15张搞笑失误场面！',
    albumReplayHint: '点击已解锁卡片可重温爆笑名场面！',
    albumLockedLabel: '触发该口误即可解锁！',
    albumClose: '关闭',
    summaryTitle: '第1课情景剧拍摄杀青！',
    summarySub: '你已掌握 은/는 的全部5个场景！',
    playAgainBtn: '再演一遍',
    openAlbumBtn: '查看图鉴',
    firstTryBadge: '一条过达人',
    blunderBadge: '爆笑失误',
  },
  ru: {
    gameTitle: 'Ситком-театр частиц',
    unitPill: 'Урок 1 · Тема (은, 는)',
    leftGuide: 'Ошибётесь в частице — на сцене случится комедия!',
    rightGuide: 'Собери 15 фотокарточек',
    hintBtn: 'Подсказка патчима',
    albumBtn: 'Фотоальбом',
    newEpisodeBtn: 'Заново',
    listenBtn: 'Слушать',
    retryPrompt: 'Теперь выберите правильную частицу!',
    chooseParticlePrompt: 'Нажмите карточку или клавишу 1–4',
    correctStamp: 'ВЕРНО!',
    nextEpisodeBtn: 'Следующая сцена',
    albumUnlockedToast: 'НОВАЯ фотокарточка сохранена!',
    albumAlreadyToast: 'Уже в альбоме',
    albumModalTitle: 'Альбом смешных ошибок',
    albumModalSub: 'Соберите все 15 комедийных сцен Урока 1 (은/는)!',
    albumReplayHint: 'Нажмите на открытую карточку, чтобы пересмотреть сцену!',
    albumLockedLabel: 'Совершите эту ошибку, чтобы открыть!',
    albumClose: 'Закрыть',
    summaryTitle: 'Съёмки Урока 1 завершены!',
    summarySub: 'Вы освоили все 5 сцен с 은/는!',
    playAgainBtn: 'Сыграть ещё раз',
    openAlbumBtn: 'Открыть альбом',
    firstTryBadge: 'С первого дубля',
    blunderBadge: 'Смешные ляпы',
  },
  ja: {
    gameTitle: '助詞ドタバタ・コント劇場',
    unitPill: '第1課 · 主題 (은, 는)',
    leftGuide: '助詞を間違えると、舞台で大爆笑ハプニングが発生！',
    rightGuide: 'おもしろカード15枚を集めよう',
    hintBtn: 'パッチムヒント',
    albumBtn: '写真図鑑',
    newEpisodeBtn: '最初から',
    listenBtn: '聞く',
    retryPrompt: '正しい助詞を選んでね！',
    chooseParticlePrompt: 'カードをタップか 1〜4 キーを押してね',
    correctStamp: '合格!',
    nextEpisodeBtn: '次のシーン',
    albumUnlockedToast: '新しいカードを獲得！',
    albumAlreadyToast: '図鑑に保存済み',
    albumModalTitle: 'ドタバタ言い間違い図鑑',
    albumModalSub: '第1課 (은/는) の全15種の爆笑シーンを集めよう！',
    albumReplayHint: '解放されたカードを押すとシーンを再生できます！',
    albumLockedLabel: 'この間違いをすると解放されます！',
    albumClose: '閉じる',
    summaryTitle: '第1課 コント撮影クランクアップ！',
    summarySub: '은/는 の5つのシーンをすべてクリア！',
    playAgainBtn: 'もう一度遊ぶ',
    openAlbumBtn: '図鑑を見る',
    firstTryBadge: '一発OKスター',
    blunderBadge: '爆笑NG集',
  },
  mn: {
    gameTitle: 'Нөхцөлийн хошин театр',
    unitPill: '1-р хичээл · Сэдэв (은, 는)',
    leftGuide: 'Буруу нөхцөл сонговол тайзан дээр хөгжилтэй явдал болно!',
    rightGuide: '15 хошин карт цуглуул',
    hintBtn: 'Дэвсгэрийн сэжүүр',
    albumBtn: 'Зургийн цомог',
    newEpisodeBtn: 'Дахин эхлэх',
    listenBtn: 'Сонсох',
    retryPrompt: 'Одоо зөв нөхцөлийг сонгоорой!',
    chooseParticlePrompt: 'Карт дээр дарах эсвэл 1–4 дарна уу',
    correctStamp: 'ЗӨВ!',
    nextEpisodeBtn: 'Дараагийн үзэгдэл',
    albumUnlockedToast: 'ШИНЭ карт хадгалагдлаа!',
    albumAlreadyToast: 'Цомогт хадгалагдсан',
    albumModalTitle: 'Хошин алдааны зургийн цомог',
    albumModalSub: '1-р хичээл (은/는)-ийн бүх 15 хошин үзэгдлийг цуглуулаарай!',
    albumReplayHint: 'Нээгдсэн карт дээр дарж үзэгдлийг дахин үзээрэй!',
    albumLockedLabel: 'Энэ алдааг хийж нээнэ үү!',
    albumClose: 'Хаах',
    summaryTitle: '1-р хичээлийн зураг авалт дууслаа!',
    summarySub: 'Та 은/는-ийн бүх 5 үзэгдлийг эзэмшлээ!',
    playAgainBtn: 'Дахин тоглох',
    openAlbumBtn: 'Цомог харах',
    firstTryBadge: 'Нэг удаагийн од',
    blunderBadge: 'Хошин алдаа',
  },
};
