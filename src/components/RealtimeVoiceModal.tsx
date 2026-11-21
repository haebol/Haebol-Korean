import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  Maximize2,
  Minimize2,
  X,
  Send,
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  MessageSquareHeart,
  Globe
} from 'lucide-react';
import { SupportedLanguage, getLanguageMeta } from '../types';
import { speakKorean, playCutePop, playSuccessChime, playGentleBoop } from '../utils/audio';
import { ManduMascot } from './ManduMascot';

interface RealtimeVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: SupportedLanguage;
}

interface QuickNeed {
  icon: string;
  ko: string;
  en: string;
  vi: string;
  bn: string;
  zh: string;
  ru: string;
  ja: string;
  mn: string;
  politeKo: string;
}

const QUICK_NEEDS: QuickNeed[] = [
  {
    icon: '🚽',
    ko: '화장실 가고 싶어요',
    en: 'I need to use the restroom',
    vi: 'Em muốn đi vệ sinh ạ',
    bn: 'আমি বাথরুমে যেতে চাই',
    zh: '我想去洗手间',
    ru: 'Я хочу в туалет',
    ja: 'トイレに行きたいです',
    mn: 'Би нойл ормоор байна',
    politeKo: '선생님, 화장실에 다녀와도 될까요? 🚽'
  },
  {
    icon: '🏥',
    ko: '배가 아파요 (보건실)',
    en: 'Stomach hurts (Nurse office)',
    vi: 'Em bị đau bụng (Phòng y tế)',
    bn: 'আমার পেট ব্যথা করছে (স্বাস্থ্য কক্ষ)',
    zh: '我肚子疼 (保健室)',
    ru: 'Болит живот (медпункт)',
    ja: 'お腹が痛いです (保健室)',
    mn: 'Хэвлий өвдөж байна (эмчийн өрөө)',
    politeKo: '선생님, 배가 많이 아파서 보건실에 가고 싶어요. 🏥'
  },
  {
    icon: '🤒',
    ko: '머리가 아파요 (열나요)',
    en: 'Headache or fever',
    vi: 'Em bị đau đầu hoặc sốt',
    bn: 'মাথা ব্যথা বা জ্বর এসেছে',
    zh: '我头疼 (发烧了)',
    ru: 'Болит голова (жар)',
    ja: '頭が痛いです (熱があります)',
    mn: 'Толгой өвдөж байна (халуурч байна)',
    politeKo: '선생님, 머리가 아프고 열이 나는 것 같아요. 🤒'
  },
  {
    icon: '🙋',
    ko: '질문이 있어요 (이해 안 돼요)',
    en: "I don't understand, have question",
    vi: 'Em chưa hiểu bài, có câu hỏi ạ',
    bn: 'আমি বুঝতে পারিনি, প্রশ্ন আছে',
    zh: '我有问题 (听不懂)',
    ru: 'У меня вопрос (не понимаю)',
    ja: '質問があります (わかりません)',
    mn: 'Асуулт байна (ойлгомжгүй байна)',
    politeKo: '선생님, 설명이 어려워서 잘 이해가 안 돼요. 다시 알려주세요. 🙋'
  },
  {
    icon: '✏️',
    ko: '연필/지우개가 없어요',
    en: 'Forgot pencil / eraser',
    vi: 'Em quên bút chì / tẩy',
    bn: 'পেন্সিল বা রবার আনিনি',
    zh: '我没有铅笔/橡皮',
    ru: 'Нет карандаша/ластика',
    ja: '鉛筆/消しゴムがありません',
    mn: 'Харандаа/баллуур байхгүй',
    politeKo: '선생님, 연필과 지우개를 안 가져왔어요. 빌려주실 수 있나요? ✏️'
  },
  {
    icon: '💧',
    ko: '물 마시고 올게요',
    en: 'May I drink water?',
    vi: 'Em xin phép đi uống nước ạ',
    bn: 'একটু পানি খেয়ে আসতে পারি?',
    zh: '我去喝口水',
    ru: 'Я попью воды',
    ja: 'お水を飲んできます',
    mn: 'Ус уучихаад ирье',
    politeKo: '선생님, 목이 말라서 물을 마시고 와도 될까요? 💧'
  },
  {
    icon: '🍱',
    ko: '급식이 너무 매워요',
    en: 'School lunch is too spicy',
    vi: 'Cơm trưa cay quá em không ăn được',
    bn: 'দুপুরের খাবার খুব ঝাল',
    zh: '学校午餐太辣了',
    ru: 'Обед слишком острый',
    ja: '給食が辛すぎます',
    mn: 'Хоол хэтэрхий халуун ногоотой байна',
    politeKo: '선생님, 급식이 너무 매워서 다 먹기가 힘들어요. 🍱'
  },
  {
    icon: '🤝',
    ko: '친구랑 다퉜어요 (도와주세요)',
    en: 'Had dispute with friend (help)',
    vi: 'Em có chuyện với bạn bè (giúp em với)',
    bn: 'বন্ধুর সাথে সমস্যা হয়েছে (সাহায্য করুন)',
    zh: '我和同学吵架了 (请帮帮我)',
    ru: 'Поссорился с другом (помогите)',
    ja: '友達と喧嘩しました (助けてください)',
    mn: 'Найзтайгаа маргалдсан (тусална уу)',
    politeKo: '선생님, 친구와 다툼이 생겼어요. 도와주세요. 🤝'
  }
];

interface TeacherReply {
  icon: string;
  ko: string;
  en: string;
  vi: string;
  bn: string;
  zh: string;
  ru: string;
  ja: string;
  mn: string;
}

const TEACHER_REPLIES: TeacherReply[] = [
  {
    icon: '👍',
    ko: '그래, 얼른 다녀오렴!',
    en: 'Sure, go ahead quickly!',
    vi: 'Được rồi, em đi nhanh rồi về nhé!',
    bn: 'ঠিক আছে, তাড়াতাড়ি গিয়ে এসো!',
    zh: '好，快去快回吧！',
    ru: 'Да, конечно, иди быстрее!',
    ja: 'いいよ、早く行ってきてね！',
    mn: 'Тэг дээ, хурдан яваад ир!'
  },
  {
    icon: '🏥',
    ko: '선생님이랑 보건실에 같이 가자.',
    en: "Let's go to the nurse's room together.",
    vi: 'Thầy/Cô sẽ đưa em xuống phòng y tế nhé.',
    bn: 'চলো, শিক্ষকের সাথে স্বাস্থ্য কক্ষে যাই।',
    zh: '跟老师一起去保健室吧。',
    ru: 'Пойдём вместе в медпункт.',
    ja: '先生と一緒に保健室に行こう。',
    mn: 'Багштайгаа хамт эмчийн өрөө оръё.'
  },
  {
    icon: '💛',
    ko: '괜찮아, 천천히 다시 설명해줄게.',
    en: "It's okay, I will explain again slowly.",
    vi: 'Không sao đâu, thầy/cô sẽ giảng lại từ từ nhé.',
    bn: 'কোনো সমস্যা নেই, আস্তে আস্তে আবার বুঝিয়ে দিচ্ছি।',
    zh: '没关系，老师慢慢再讲一遍。',
    ru: 'Всё в порядке, я объясню ещё раз медленно.',
    ja: '大丈夫だよ、ゆっくり説明し直すね。',
    mn: 'Зүгээр ээ, тайван дахин тайлбарлаж өгье.'
  },
  {
    icon: '✏️',
    ko: '선생님이 빌려줄게, 걱정하지 마.',
    en: "I'll lend you one, don't worry.",
    vi: 'Thầy/Cô cho em mượn nhé, đừng lo.',
    bn: 'আমি ধার দিচ্ছি, চিন্তা করো না।',
    zh: '老师借给你，别担心。',
    ru: 'Я одолжу тебе, не переживай.',
    ja: '先生が貸してあげるから、心配しないで。',
    mn: 'Багш нь зээлдүүлнэ ээ, санаа зоволтгүй.'
  },
  {
    icon: '⏳',
    ko: '조금만 기다려주렴, 곧 도와줄게.',
    en: "Please wait a moment, I'll help you soon.",
    vi: 'Chờ thầy/cô một chút nhé, cô sẽ giúp ngay.',
    bn: 'একটু অপেক্ষা করো, শীঘ্রই সাহায্য করছি।',
    zh: '请等一下，马上来帮你。',
    ru: 'Подожди немного, я скоро помогу.',
    ja: '少し待ってね、すぐ手伝うよ。',
    mn: 'Түр хүлээгээрэй, удахгүй тусална аа.'
  }
];

export const RealtimeVoiceModal: React.FC<RealtimeVoiceModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [spokenText, setSpokenText] = useState('');
  const [textInput, setTextInput] = useState('');
  const [politeKoreanText, setPoliteKoreanText] = useState<string>('');
  const [originalSourceText, setOriginalSourceText] = useState<string>('');
  const [isFullScreenCard, setIsFullScreenCard] = useState(false);
  const [selectedTeacherReply, setSelectedTeacherReply] = useState<TeacherReply | null>(null);
  const [activeSpeechLang, setActiveSpeechLang] = useState<SupportedLanguage | 'ko'>(lang);

  const recognitionRef = useRef<any>(null);

  const labelsDict: Record<SupportedLanguage, {
    modalTitle: string;
    listeningBadge: string;
    clickMicToStart: string;
    clickMicToStop: string;
    inputPlaceholder: string;
    translateBtn: string;
    quickNeedTitle: string;
    teacherCardTitle: string;
    listenAudio: string;
    fullscreenBtn: string;
    minimizeBtn: string;
    resetBtn: string;
    teacherRepliesHeader: string;
    speechNotSupported: string;
  }> = {
    en: {
      modalTitle: 'Talk to Teacher in Real-time',
      listeningBadge: 'Listening... Please speak comfortably! 🎧',
      clickMicToStart: 'Tap microphone to speak',
      clickMicToStop: 'Listening active! Tap to stop',
      inputPlaceholder: 'Or type what you want to say in English, Vietnamese, Bengali, or Korean...',
      translateBtn: 'Translate to Korean',
      quickNeedTitle: '⚡ Quick 1-Touch Classroom Needs',
      teacherCardTitle: 'Card to show to Teacher',
      listenAudio: 'Listen Voice',
      fullscreenBtn: 'Show Big to Teacher',
      minimizeBtn: 'Exit Big View',
      resetBtn: 'New Message',
      teacherRepliesHeader: '👩‍🏫 Teacher Quick Response Buttons (선생님 빠른 응답)',
      speechNotSupported: 'Microphone speech recognition is not supported in this browser. You can type or use the quick buttons below!'
    },
    vi: {
      modalTitle: 'Giao tiếp tức thì với Thầy/Cô',
      listeningBadge: 'Đang lắng nghe... Em cứ nói tự nhiên nhé! 🎧',
      clickMicToStart: 'Chạm vào micro để nói',
      clickMicToStop: 'Đang nghe! Chạm để dừng',
      inputPlaceholder: 'Hoặc gõ điều em muốn nói bằng tiếng Việt, tiếng Anh, hoặc tiếng Hàn...',
      translateBtn: 'Chuyển sang tiếng Hàn',
      quickNeedTitle: '⚡ Nhu cầu khẩn cấp chạm 1 lần',
      teacherCardTitle: 'Thẻ kính ngữ đưa Thầy/Cô xem',
      listenAudio: 'Nghe phát âm',
      fullscreenBtn: 'Chiếu to cho Thầy/Cô',
      minimizeBtn: 'Thu nhỏ lại',
      resetBtn: 'Nói câu khác',
      teacherRepliesHeader: '👩‍🏫 Thầy/Cô phản hồi nhanh (선생님 빠른 응답)',
      speechNotSupported: 'Trình duyệt chưa hỗ trợ nhận diện giọng nói. Em hãy gõ chữ 또는 chọn các nút nhanh bên dưới nhé!'
    },
    bn: {
      modalTitle: 'শিক্ষকের সাথে তাৎক্ষণিক কথা বলুন',
      listeningBadge: 'শুনছি... নির্ভয়ে কথা বলুন! 🎧',
      clickMicToStart: 'কথা বলতে মাইক্রোফোন স্পর্শ করুন',
      clickMicToStop: 'শোনা হচ্ছে! থামাতে স্পর্শ করুন',
      inputPlaceholder: 'অথবা বাংলা, ইংরেজি বা কোরিয়ান ভাষায় লিখে দিন...',
      translateBtn: 'কোরিয়ানে অনুবাদ করুন',
      quickNeedTitle: '⚡ ১-স্পর্শে জরুরি প্রয়োজন',
      teacherCardTitle: 'শিক্ষককে দেখানোর বিনম্র কার্ড',
      listenAudio: 'উচ্চারণ শুনুন',
      fullscreenBtn: 'শিক্ষককে বড় করে দেখান',
      minimizeBtn: 'ছোট করুন',
      resetBtn: 'নতুন বাক্য',
      teacherRepliesHeader: '👩‍🏫 শিক্ষকের তাৎক্ষণিক উত্তর (선생님 빠른 응답)',
      speechNotSupported: 'এই ব্রাউজারে ভয়েস সাপোর্ট নেই। নিচের বোতাম বা লিখে জানান!'
    },
    zh: {
      modalTitle: '与老师实时交流',
      listeningBadge: '正在聆听... 请自然说话！🎧',
      clickMicToStart: '点击麦克风开始说话',
      clickMicToStop: '正在录音！点击停止',
      inputPlaceholder: '或者用中文、韩文输入你想对老师说的话...',
      translateBtn: '翻译为敬语韩语',
      quickNeedTitle: '⚡ 常用1触急需表达',
      teacherCardTitle: '给老师出示的敬语卡片',
      listenAudio: '听发音',
      fullscreenBtn: '大字给老师看',
      minimizeBtn: '退出大字视图',
      resetBtn: '新的一句',
      teacherRepliesHeader: '👩‍🏫 老师快速回应按钮 (선생님 빠른 응답)',
      speechNotSupported: '当前浏览器不支持语音麦克风。请直接打字或点击下方快捷按钮！'
    },
    ru: {
      modalTitle: 'Разговор с учителем в реальном времени',
      listeningBadge: 'Слушаю... Говорите свободно! 🎧',
      clickMicToStart: 'Нажмите микрофон, чтобы говорить',
      clickMicToStop: 'Запись активна! Нажмите для остановки',
      inputPlaceholder: 'Или введите то, что хотите сказать, на русском или корейском...',
      translateBtn: 'Перевести на вежливый корейский',
      quickNeedTitle: '⚡ Быстрые нужды в 1 касание',
      teacherCardTitle: 'Карточка для учителя',
      listenAudio: 'Слушать',
      fullscreenBtn: 'Показать крупно учителю',
      minimizeBtn: 'Уменьшить',
      resetBtn: 'Новая фраза',
      teacherRepliesHeader: '👩‍🏫 Быстрые ответы учителя (선생님 빠른 응답)',
      speechNotSupported: 'Распознавание речи не поддерживается в этом браузере. Вы можете напечатать текст или выбрать кнопку!'
    },
    ja: {
      modalTitle: '先生とリアルタイムで会話',
      listeningBadge: '聴いています... 気軽に話してね！🎧',
      clickMicToStart: 'マイクをタップして話す',
      clickMicToStop: '録音中！タップして停止',
      inputPlaceholder: 'または日本語や韓国語で言いたいことを入力...',
      translateBtn: '丁寧な韓国語に翻訳',
      quickNeedTitle: '⚡ 1タップですぐ伝える',
      teacherCardTitle: '先生に見せる丁寧カード',
      listenAudio: '発音を聞く',
      fullscreenBtn: '先生に大きく見せる',
      minimizeBtn: '元のサイズに戻す',
      resetBtn: '新しいメッセージ',
      teacherRepliesHeader: '👩‍🏫 先生のクイック返答ボタン (선생님 빠른 응답)',
      speechNotSupported: 'このブラウザは音声認識に対応していません。文字を入力するかボタンを押してね！'
    },
    mn: {
      modalTitle: 'Багштай шууд ярилцах',
      listeningBadge: 'Сонсож байна... Чөлөөтэй яриарай! 🎧',
      clickMicToStart: 'Микрофон дээр дарж ярих',
      clickMicToStop: 'Сонсож байна! Дарж зогсоох',
      inputPlaceholder: 'Эсвэл монгол, солонгосоор бичиж болно...',
      translateBtn: 'Хүндэтгэлийн солонгос хэл рүү орчуулах',
      quickNeedTitle: '⚡ 1 товшилтоор хэлэх яаралтай хэрэгцээ',
      teacherCardTitle: 'Багшид үзүүлэх хүндэтгэлийн карт',
      listenAudio: 'Сонсох',
      fullscreenBtn: 'Багшид томоор харуулах',
      minimizeBtn: 'Буцаах',
      resetBtn: 'Шинэ өгүүлбэр',
      teacherRepliesHeader: '👩‍🏫 Багшийн хурдан хариултын товчлуур (선생님 빠른 응답)',
      speechNotSupported: 'Энэ хөтөч дуу хоолой таних боломжгүй байна. Та бичих эсвэл товчлуур ашиглана уу!'
    }
  };

  const labels = labelsDict[lang] || labelsDict.en;

  // Map user speech or input to smart polite elementary Korean
  const convertToPoliteKorean = (input: string) => {
    const text = input.trim();
    if (!text) return;

    setOriginalSourceText(text);
    const lower = text.toLowerCase();

    // Check against elementary school keywords
    if (
      lower.includes('toilet') ||
      lower.includes('restroom') ||
      lower.includes('bathroom') ||
      lower.includes('wc') ||
      lower.includes('pee') ||
      lower.includes('vệ sinh') ||
      lower.includes('đi tiểu') ||
      lower.includes('বাথরুম') ||
      lower.includes('পায়খানা') ||
      lower.includes('화장실')
    ) {
      setPoliteKoreanText('선생님, 화장실에 다녀와도 될까요? 🚽');
      return;
    }

    if (
      lower.includes('stomach') ||
      lower.includes('belly') ||
      lower.includes('tummy') ||
      lower.includes('đau bụng') ||
      lower.includes('পেট') ||
      lower.includes('nurse') ||
      lower.includes('y tế') ||
      lower.includes('보건실') ||
      lower.includes('배 아파')
    ) {
      setPoliteKoreanText('선생님, 배가 많이 아파서 보건실에 가고 싶어요. 🏥');
      return;
    }

    if (
      lower.includes('head') ||
      lower.includes('fever') ||
      lower.includes('dizzy') ||
      lower.includes('đau đầu') ||
      lower.includes('sốt') ||
      lower.includes('মাথা') ||
      lower.includes('জ্বর') ||
      lower.includes('머리 아파') ||
      lower.includes('열나')
    ) {
      setPoliteKoreanText('선생님, 머리가 아프고 열이 나는 것 같아요. 🤒');
      return;
    }

    if (
      lower.includes('water') ||
      lower.includes('drink') ||
      lower.includes('thirsty') ||
      lower.includes('nước') ||
      lower.includes('uống') ||
      lower.includes('পানি') ||
      lower.includes('물 마')
    ) {
      setPoliteKoreanText('선생님, 목이 말라서 물을 마시고 와도 될까요? 💧');
      return;
    }

    if (
      lower.includes('pencil') ||
      lower.includes('eraser') ||
      lower.includes('pen') ||
      lower.includes('bút') ||
      lower.includes('tẩy') ||
      lower.includes('পেন্সিল') ||
      lower.includes('রবার') ||
      lower.includes('연필') ||
      lower.includes('지우개')
    ) {
      setPoliteKoreanText('선생님, 연필(지우개)을 안 가져왔어요. 빌려주실 수 있나요? ✏️');
      return;
    }

    if (
      lower.includes('don\'t understand') ||
      lower.includes('not understand') ||
      lower.includes('question') ||
      lower.includes('explain') ||
      lower.includes('không hiểu') ||
      lower.includes('câu hỏi') ||
      lower.includes('বুঝতে') ||
      lower.includes('প্রশ্ন') ||
      lower.includes('모르겠') ||
      lower.includes('이해')
    ) {
      setPoliteKoreanText('선생님, 설명이 어려워서 잘 이해가 안 돼요. 다시 알려주세요. 🙋');
      return;
    }

    if (
      lower.includes('spicy') ||
      lower.includes('cay') ||
      lower.includes('ঝাল') ||
      lower.includes('lunch') ||
      lower.includes('급식') ||
      lower.includes('매워')
    ) {
      setPoliteKoreanText('선생님, 급식이 너무 매워서 다 먹기가 힘들어요. 🍱');
      return;
    }

    if (
      lower.includes('fight') ||
      lower.includes('hit') ||
      lower.includes('push') ||
      lower.includes('cãi nhau') ||
      lower.includes('đánh') ||
      lower.includes('বন্ধু') ||
      lower.includes('মারামারি') ||
      lower.includes('다퉜') ||
      lower.includes('때렸')
    ) {
      setPoliteKoreanText('선생님, 친구와 문제가 생겼어요. 도와주세요. 🤝');
      return;
    }

    if (
      lower.includes('home') ||
      lower.includes('finish') ||
      lower.includes('leave') ||
      lower.includes('về nhà') ||
      lower.includes('ছুটি') ||
      lower.includes('집에')
    ) {
      setPoliteKoreanText('선생님, 오늘은 몇 시에 집에 가나요? 🏫');
      return;
    }

    // Generic polite Korean wrapper
    setPoliteKoreanText(`선생님, "${text}" 말씀드려요. 도와주세요. 🌟`);
  };

  // Start speech recognition
  const startListening = () => {
    setSpeechError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(labels.speechNotSupported);
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;

      // Set recognition language
      const langCodeMap: Record<string, string> = {
        en: 'en-US',
        vi: 'vi-VN',
        bn: 'bn-BD',
        zh: 'zh-CN',
        ru: 'ru-RU',
        ja: 'ja-JP',
        mn: 'mn-MN',
        ko: 'ko-KR'
      };
      recognition.lang = langCodeMap[activeSpeechLang] || 'ko-KR';

      recognition.onstart = () => {
        setIsListening(true);
        playCutePop();
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setSpokenText(transcript);
        setTextInput(transcript);

        if (event.results[0].isFinal) {
          convertToPoliteKorean(transcript);
          playSuccessChime();
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('마이크 사용 권한을 허용해주세요. (Please allow microphone access)');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
      setSpeechError(labels.speechNotSupported);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Auto-start listening when modal opens
  useEffect(() => {
    if (isOpen) {
      setPoliteKoreanText('');
      setSpokenText('');
      setTextInput('');
      setSelectedTeacherReply(null);
      setIsFullScreenCard(false);
      startListening();
    } else {
      stopListening();
    }
    return () => {
      stopListening();
    };
  }, [isOpen, activeSpeechLang]);

  const handleSelectQuickNeed = (need: QuickNeed) => {
    playCutePop();
    setOriginalSourceText(need[lang]);
    setPoliteKoreanText(need.politeKo);
    setTimeout(() => {
      speakKorean(need.politeKo, 0.85);
    }, 200);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    playCutePop();
    convertToPoliteKorean(textInput);
    setTimeout(() => {
      speakKorean(politeKoreanText || textInput, 0.85);
    }, 200);
  };

  const handleSpeakText = (rate: number = 0.85) => {
    if (politeKoreanText) {
      playCutePop();
      speakKorean(politeKoreanText, rate);
    }
  };

  const handleTeacherReplyClick = (reply: TeacherReply) => {
    playCutePop();
    setSelectedTeacherReply(reply);
    // Speak in Korean so student and teacher hear it
    speakKorean(reply.ko, 0.85);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className={`bg-[#FFFDF5] w-full max-w-2xl rounded-lg shadow-2xl border-4 border-amber-400 flex flex-col overflow-hidden relative transition-all ${
            isFullScreenCard ? 'max-w-4xl min-h-[85vh]' : 'max-h-[92vh]'
          }`}
        >
          {/* Top Bar with Title, Language Switch, Close Button */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 p-3 sm:p-4 text-white flex items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-white/20 flex items-center justify-center text-2xl">
                🎙️
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-black font-['Jua',sans-serif] leading-tight drop-shadow-xs">
                  선생님과 이야기해요 🎙️
                </h3>
                <p className="text-xs font-bold text-amber-100">
                  {labels.modalTitle} • 음성 및 텍스트 번역 소통
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice recognition language toggle */}
              <div className="flex items-center bg-white/20 rounded-md p-0.5 border border-white/30 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveSpeechLang(lang)}
                  className={`px-2 py-1 rounded-sm transition-colors flex items-center gap-1 ${
                    activeSpeechLang === lang ? 'bg-white text-orange-600 font-extrabold shadow-xs' : 'text-white'
                  }`}
                  title="모국어로 말하기"
                >
                  <span>{getLanguageMeta(lang).flag}</span>
                  <span>{getLanguageMeta(lang).nativeName || lang.toUpperCase()}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpeechLang('ko')}
                  className={`px-2 py-1 rounded-sm transition-colors ${
                    activeSpeechLang === 'ko' ? 'bg-white text-orange-600 font-extrabold shadow-xs' : 'text-white'
                  }`}
                  title="한국어로 말하기"
                >
                  한국어
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 rounded-md bg-white/20 hover:bg-white/30 active:scale-95 text-white flex items-center justify-center transition-transform"
                aria-label="창 닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4">
            {/* 1. Large Interactive Microphone Section */}
            <div className="bg-gradient-to-b from-amber-50 to-orange-50/60 rounded-lg p-4 sm:p-5 border-2 border-amber-200 flex flex-col items-center text-center relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-3 h-3 rounded-xs ${isListening ? 'bg-rose-500 animate-ping' : 'bg-slate-300'}`} />
                <span className="text-xs sm:text-sm font-extrabold text-amber-950">
                  {isListening ? labels.listeningBadge : labels.clickMicToStart}
                </span>
              </div>

              {/* Big Mic Button with Pulsing Wave Rings */}
              <div className="relative my-2">
                {isListening && (
                  <>
                    <span className="absolute -inset-4 rounded-lg bg-orange-400/30 animate-ping opacity-75" />
                    <span className="absolute -inset-8 rounded-lg bg-amber-300/20 animate-pulse" />
                  </>
                )}

                <button
                  type="button"
                  onClick={handleToggleListening}
                  className={`relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-lg flex flex-col items-center justify-center shadow-xl transition-transform active:scale-95 border-4 ${
                    isListening
                      ? 'bg-rose-500 text-white border-rose-200 animate-pulse'
                      : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white border-amber-200 hover:scale-105'
                  }`}
                  aria-label={isListening ? '음성인식 중지' : '음성인식 시작'}
                >
                  {isListening ? (
                    <>
                      <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
                      <span className="text-[10px] font-black mt-1">STOP</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-10 h-10 sm:w-12 sm:h-12" />
                      <span className="text-[10px] font-black mt-1">말하기</span>
                    </>
                  )}
                </button>
              </div>

              {/* Speech Error Warning if any */}
              {speechError && (
                <p className="text-xs text-rose-600 font-bold mt-2 bg-rose-50 px-3 py-1.5 rounded-md border border-rose-200">
                  ⚠️ {speechError}
                </p>
              )}

              {/* Real-time transcribed text display */}
              {spokenText && (
                <div className="mt-3 px-4 py-2 bg-white rounded-md border border-amber-300 shadow-sm max-w-md w-full">
                  <p className="text-xs font-bold text-slate-400 mb-0.5">인식된 음성 (Heard):</p>
                  <p className="text-base sm:text-lg font-black text-slate-800 font-['Jua',sans-serif]">
                    "{spokenText}"
                  </p>
                </div>
              )}

              {/* Text Input Keyboard Fallback Form */}
              <form onSubmit={handleManualSubmit} className="w-full max-w-lg mt-3 flex items-center gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={e => setTextInput(e.target.value)}
                  placeholder={labels.inputPlaceholder}
                  className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-white border-2 border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 font-medium"
                />
                <button
                  type="submit"
                  className="min-h-[44px] px-4 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-black text-xs sm:text-sm rounded-md shadow-sm flex items-center gap-1.5 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>변환</span>
                </button>
              </form>
            </div>

            {/* 2. Primary Converted Korean Card for the Teacher */}
            {politeKoreanText ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-white rounded-lg p-5 sm:p-7 shadow-xl border-4 border-emerald-400 relative flex flex-col justify-between ${
                  isFullScreenCard ? 'p-8 sm:p-12 min-h-[400px]' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-900 font-extrabold text-xs sm:text-sm px-3 py-1 rounded-sm flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>{labels.teacherCardTitle}</span>
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      선생님께 이 화면을 보여주세요!
                    </span>
                  </div>

                  {/* Toggle Fullscreen Presentation */}
                  <button
                    type="button"
                    onClick={() => setIsFullScreenCard(!isFullScreenCard)}
                    className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                    title={isFullScreenCard ? labels.minimizeBtn : labels.fullscreenBtn}
                  >
                    {isFullScreenCard ? (
                      <>
                        <Minimize2 className="w-4 h-4" />
                        <span>{labels.minimizeBtn}</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-4 h-4" />
                        <span>{labels.fullscreenBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* The Big Polite Korean Sentence */}
                <div className="my-auto py-2 text-center">
                  <h2
                    className={`font-black text-slate-950 font-['Jua',sans-serif] tracking-tight leading-snug drop-shadow-xs ${
                      isFullScreenCard ? 'text-4xl sm:text-6xl md:text-7xl' : 'text-2xl sm:text-4xl md:text-5xl'
                    }`}
                  >
                    "{politeKoreanText}"
                  </h2>

                  {/* Original Student Text Hint */}
                  {originalSourceText && (
                    <p className="text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 inline-block px-3 py-1 rounded-sm mt-3 border border-emerald-200">
                      원문 ({lang.toUpperCase()}): {originalSourceText}
                    </p>
                  )}
                </div>

                {/* Card Action Controls: TTS Normal / Slow / Reset */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSpeakText(0.85)}
                    className="min-h-[48px] px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold rounded-md shadow-md flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>{labels.listenAudio} 🔊</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setPoliteKoreanText('');
                      setSpokenText('');
                      setTextInput('');
                      setSelectedTeacherReply(null);
                    }}
                    className="min-h-[48px] px-4 py-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold rounded-md flex items-center gap-1.5 text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{labels.resetBtn}</span>
                  </button>
                </div>
              </motion.div>
            ) : null}

            {/* 3. Quick 1-Touch Urgent Needs Chips (When no text is formulated yet) */}
            {!politeKoreanText && (
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-slate-700 flex items-center gap-1.5">
                    <span>{labels.quickNeedTitle}</span>
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {QUICK_NEEDS.map((need, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectQuickNeed(need)}
                      className="min-h-[58px] p-2.5 bg-white hover:bg-amber-50 active:scale-95 rounded-md border-2 border-amber-200 hover:border-orange-400 shadow-sm flex items-center gap-2 text-left transition-all"
                    >
                      <span className="text-2xl flex-shrink-0">{need.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-black text-slate-900 font-['Jua',sans-serif] truncate">
                          {need.ko}
                        </p>
                        <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                          <span>{getLanguageMeta(lang).flag}</span>
                          <span>{(need as any)[lang] || need.en}</span>
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Teacher's Quick Response Section (Interactive Two-Way Reply) */}
            <div className="bg-amber-100/60 rounded-lg p-3.5 sm:p-4 border-2 border-amber-300">
              <div className="flex items-center justify-between gap-2 mb-2 px-1">
                <div className="flex items-center gap-1.5">
                  <MessageSquareHeart className="w-4 h-4 text-orange-600" />
                  <span className="text-xs sm:text-sm font-black text-amber-950 font-['Jua',sans-serif]">
                    {labels.teacherRepliesHeader}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-sm">
                  선생님이 누르면 학생 모국어로 소리가 나요!
                </span>
              </div>

              {/* 5 Quick Teacher Answer Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TEACHER_REPLIES.map((reply, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTeacherReplyClick(reply)}
                    className="min-h-[48px] p-2.5 bg-white hover:bg-orange-50 active:scale-95 rounded-md border border-amber-200 hover:border-orange-400 shadow-xs flex items-center justify-between gap-2 text-left transition-all"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xl flex-shrink-0">{reply.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-black text-slate-900 font-['Jua',sans-serif] truncate">
                          {reply.ko}
                        </p>
                        <p className="text-[11px] font-medium text-emerald-700 truncate flex items-center gap-1">
                          <span>{getLanguageMeta(lang).flag}</span>
                          <span>{(reply as any)[lang] || reply.en}</span>
                        </p>
                      </div>
                    </div>
                    <Volume2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  </button>
                ))}
              </div>

              {/* Selected Teacher Feedback Alert Display */}
              {selectedTeacherReply && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-white rounded-md border-2 border-emerald-400 shadow-sm flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-2xl">{selectedTeacherReply.icon}</span>
                    <div>
                      <p className="text-sm sm:text-base font-black text-slate-900 font-['Jua',sans-serif]">
                        선생님 답변: "{selectedTeacherReply.ko}"
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-emerald-700 flex items-center gap-1">
                        <span>{getLanguageMeta(lang).flag}</span>
                        <span>{(selectedTeacherReply as any)[lang] || selectedTeacherReply.en}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakKorean(selectedTeacherReply.ko, 0.85)}
                    className="min-h-[40px] px-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs font-bold flex items-center gap-1 flex-shrink-0 shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>다시 듣기</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
