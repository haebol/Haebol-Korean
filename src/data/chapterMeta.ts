import { getCircledNumber, SupportedLanguage } from '../types';

export interface ChapterMetaItem {
  ch: number;
  theme: string;
  circledTitle: string;
  icon: string;
  itemCount: number;
  previewWords: string[];
}

export const CHAPTER_THEME_TRANSLATIONS: Record<number, { ko: string; trans: Record<SupportedLanguage, string> }> = {
  1: { ko: "기본", trans: { en: "Basic Expressions", vi: "Câu cơ bản", bn: "মৌলিক কথা", zh: "基础表达", ru: "Базовые фразы", ja: "きほん表現", mn: "Энгийн үг хэллэг" } },
  2: { ko: "생존", trans: { en: "Survival", vi: "Nhu cầu thiết yếu", bn: "জরুরি কথা", zh: "校园生活必需", ru: "Самое необходимое", ja: "学校生活のことば", mn: "Нэн чухал үгс" } },
  3: { ko: "건강", trans: { en: "Health", vi: "Sức khỏe", bn: "স্বাস্থ্য", zh: "身体健康", ru: "Здоровье", ja: "健康・からだ", mn: "Эрүүл мэнд" } },
  4: { ko: "교실", trans: { en: "Classroom", vi: "Lớp học", bn: "শ্রেণিকক্ষ", zh: "教室", ru: "Класс", ja: "教室", mn: "Анги танхим" } },
  5: { ko: "학습", trans: { en: "Learning", vi: "Học tập", bn: "পড়াশোনা", zh: "学习", ru: "Учёба", ja: "勉強・学習", mn: "Хичээл сурлага" } },
  6: { ko: "규칙", trans: { en: "Rules", vi: "Nội quy trường", bn: "নিয়ম", zh: "班级规则", ru: "Правила", ja: "学校のルール", mn: "Сургуулийн дүрэм" } },
  7: { ko: "급식", trans: { en: "Lunch", vi: "Bữa trưa trường", bn: "দুপুরের খাবার", zh: "学校供餐", ru: "Школьный обед", ja: "給食", mn: "Сургуулийн хоол" } },
  8: { ko: "맛", trans: { en: "Taste", vi: "Mùi vị", bn: "স্বাদ", zh: "口味 / 味道", ru: "Вкус", ja: "味", mn: "Амт" } },
  9: { ko: "친구", trans: { en: "Friends", vi: "Bạn bè", bn: "বন্ধু", zh: "朋友", ru: "Друзья", ja: "友達", mn: "Найзууд" } },
  10: { ko: "방과후", trans: { en: "After School", vi: "Sau giờ học", bn: "স্কুলের পরে", zh: "放学后 / 课后", ru: "После уроков", ja: "放課後", mn: "Хичээлийн дараа" } },
  11: { ko: "국어", trans: { en: "Korean Language", vi: "Tiếng Hàn", bn: "কোরিয়ান ভাষা", zh: "语文 / 韩国语", ru: "Корейский язык", ja: "国語 (韓国語)", mn: "Солонгос хэл" } },
  12: { ko: "수학", trans: { en: "Math", vi: "Toán học", bn: "গণিত", zh: "数学", ru: "Математика", ja: "算数", mn: "Математик" } },
  13: { ko: "미술", trans: { en: "Art", vi: "Mỹ thuật", bn: "চারুকলা", zh: "美术", ru: "ИЗО / Рисование", ja: "図工", mn: "Урлаг" } },
  14: { ko: "체육", trans: { en: "PE / Sports", vi: "Thể dục", bn: "শারীরিক শিক্ষা", zh: "体育", ru: "Физкультура", ja: "体育", mn: "Биеийн тамир" } },
  15: { ko: "음악", trans: { en: "Music", vi: "Âm nhạc", bn: "সঙ্গীত", zh: "音乐", ru: "Музыка", ja: "音楽", mn: "Хөгжим" } },
  16: { ko: "안전", trans: { en: "Safety", vi: "An toàn học đường", bn: "নিরাপত্তা", zh: "校园安全", ru: "Безопасность", ja: "安全", mn: "Аюулгүй байдал" } },
  17: { ko: "일상", trans: { en: "Daily Life", vi: "Sinh hoạt thường ngày", bn: "প্রতিদিনের জীবন", zh: "日常生活", ru: "Повседневная жизнь", ja: "日常", mn: "Өдөр тутмын амьдрал" } },
  18: { ko: "공간", trans: { en: "Space & Location", vi: "Không gian & Vị trí", bn: "স্থান ও অবস্থান", zh: "空间与位置", ru: "Пространство и место", ja: "ばしょ・空間", mn: "Орон зай ба байршил" } },
  19: { ko: "시간", trans: { en: "Time", vi: "Thời gian", bn: "সময়", zh: "时间", ru: "Время", ja: "じかん (時間)", mn: "Цаг хугацаа" } },
  20: { ko: "요일", trans: { en: "Days of the Week", vi: "Các thứ trong tuần", bn: "সপ্তাহের দিনগুলো", zh: "星期与日子", ru: "Дни недели", ja: "ようび (曜日)", mn: "Гарагууд" } },
  21: { ko: "숫자", trans: { en: "Numbers", vi: "Số đếm", bn: "সংখ্যা", zh: "数字", ru: "Числа и счёт", ja: "かず (数字)", mn: "Тоо" } },
  22: { ko: "협동", trans: { en: "Cooperation", vi: "Hợp tác & Giúp đỡ", bn: "সহযোগিতা", zh: "合作与友爱", ru: "Сотрудничество и дружба", ja: "きょうりょく (協力)", mn: "Хамтын ажиллагаа" } },
  23: { ko: "감정", trans: { en: "Emotions", vi: "Cảm xúc & Tâm trạng", bn: "অনুভূতি ও আবেগ", zh: "心情与感受", ru: "Эмоции и чувства", ja: "きもち (気持ち)", mn: "Сэтгэл хөдлөл" } },
  24: { ko: "색깔", trans: { en: "Colors", vi: "Màu sắc", bn: "রং", zh: "颜色", ru: "Цвета", ja: "いろ (色)", mn: "Өнгө" } },
  25: { ko: "가족", trans: { en: "Family & Self", vi: "Gia đình & Bản thân", bn: "পরিবার ও পরিচয়", zh: "家庭与自我", ru: "Семья и я", ja: "かぞく (家族)", mn: "Гэр бүл" } },
  26: { ko: "사람·학교", trans: { en: "People & School", vi: "Con người & Trường học", bn: "মানুষ ও স্কুল", zh: "人物与学校", ru: "Люди и школа", ja: "ひと・学校", mn: "Хүмүүс ба сургууль" } },
  27: { ko: "교통·길", trans: { en: "Transport & Places", vi: "Giao thông & Đường đi", bn: "যানবাহন ও রাস্তা", zh: "交通与场所", ru: "Транспорт и дорога", ja: "のりもの・道", mn: "Тээвэр ба зам" } },
  28: { ko: "의문사", trans: { en: "Question Words", vi: "Từ để hỏi", bn: "প্রশ্নবোধক শব্দ", zh: "疑问词", ru: "Вопросительные слова", ja: "ぎもんし (疑問詞)", mn: "Асуух үгс" } },
  29: { ko: "지시·수량", trans: { en: "Which & How Much", vi: "Chỉ định & Số lượng", bn: "নির্দেশক ও পরিমাণ", zh: "指示与数量", ru: "Указание и количество", ja: "これ・どれ・いくら", mn: "Заах ба хэмжээ" } },
  30: { ko: "접속·부사", trans: { en: "Connectors & Adverbs", vi: "Từ nối & Trạng từ", bn: "সংযোজক ও ক্রিয়াবিশেষণ", zh: "连词与副词", ru: "Союзы и наречия", ja: "せつぞく・ふくし", mn: "Холбоос ба дайвар үг" } },
};

export const getChapterCircledTitle = (ch: number, lang: SupportedLanguage): string => {
  const circled = getCircledNumber(ch);
  const data = CHAPTER_THEME_TRANSLATIONS[ch];
  if (!data) return `${circled} ${ch}단원`;
  const translated = data.trans[lang] || data.trans.en;
  return `${circled} ${data.ko} (${translated})`;
};

export const CHAPTER_META_LIST: ChapterMetaItem[] = [
  { ch: 1, theme: "기본 (Basic Expressions)", circledTitle: "① 기본 (Basic Expressions)", icon: "👋", itemCount: 10, previewWords: ["안녕하세요", "이거", "저거"] },
  { ch: 2, theme: "생존 (Survival)", circledTitle: "② 생존 (Survival)", icon: "🚽", itemCount: 10, previewWords: ["화장실", "물", "휴지"] },
  { ch: 3, theme: "건강 (Health)", circledTitle: "③ 건강 (Health)", icon: "🏥", itemCount: 10, previewWords: ["보건실", "약", "아파요"] },
  { ch: 4, theme: "교실 (Classroom)", circledTitle: "④ 교실 (Classroom)", icon: "👩‍🏫", itemCount: 10, previewWords: ["선생님", "칠판", "자리"] },
  { ch: 5, theme: "학습 (Learning)", circledTitle: "⑤ 학습 (Learning)", icon: "📖", itemCount: 10, previewWords: ["책", "교과서", "연필"] },
  { ch: 6, theme: "규칙 (Rules)", circledTitle: "⑥ 규칙 (Rules)", icon: "📅", itemCount: 10, previewWords: ["시간표", "알림장", "줄"] },
  { ch: 7, theme: "급식 (Lunch)", circledTitle: "⑦ 급식 (Lunch)", icon: "🍱", itemCount: 10, previewWords: ["식판", "숟가락", "젓가락"] },
  { ch: 8, theme: "맛 (Taste)", circledTitle: "⑧ 맛 (Taste)", icon: "➕", itemCount: 10, previewWords: ["더 주세요", "배불러요", "매워요"] },
  { ch: 9, theme: "친구 (Friends)", circledTitle: "⑨ 친구 (Friends)", icon: "🤝", itemCount: 10, previewWords: ["같이 놀자", "고마워요", "미안해요"] },
  { ch: 10, theme: "방과후 (After School)", circledTitle: "⑩ 방과후 (After School)", icon: "🏫", itemCount: 10, previewWords: ["방과후", "교실", "이동해요"] },
  { ch: 11, theme: "국어 (Korean Language)", circledTitle: "⑪ 국어 (Korean Language)", icon: "🔤", itemCount: 10, previewWords: ["글자", "낱말", "소리 내요"] },
  { ch: 12, theme: "수학 (Math)", circledTitle: "⑫ 수학 (Math)", icon: "🔢", itemCount: 10, previewWords: ["숫자", "커요", "작아요"] },
  { ch: 13, theme: "미술 (Art)", circledTitle: "⑬ 미술 (Art)", icon: "🖍️", itemCount: 10, previewWords: ["색연필", "싸인펜", "네임펜"] },
  { ch: 14, theme: "체육 (PE / Sports)", circledTitle: "⑭ 체육 (PE / Sports)", icon: "🏃", itemCount: 10, previewWords: ["운동장", "체육관", "공"] },
  { ch: 15, theme: "음악 (Music)", circledTitle: "⑮ 음악 (Music)", icon: "🎵", itemCount: 10, previewWords: ["노래", "불러요", "악기"] },
  { ch: 16, theme: "안전 (Safety)", circledTitle: "⑯ 안전 (Safety)", icon: "🏢", itemCount: 10, previewWords: ["교무실", "도서관", "과학실"] },
  { ch: 17, theme: "일상 (Daily Life)", circledTitle: "⑰ 일상 (Daily Life)", icon: "🙇", itemCount: 10, previewWords: ["안녕히 계세요", "안녕히 가세요", "네"] },
  { ch: 18, theme: "공간 (Space)", circledTitle: "⑱ 공간 (Space)", icon: "📍", itemCount: 10, previewWords: ["여기", "저기", "위"] },
  { ch: 19, theme: "시간 (Time)", circledTitle: "⑲ 시간 (Time)", icon: "◀️", itemCount: 10, previewWords: ["어제", "오늘", "내일"] },
  { ch: 20, theme: "요일 (Days & Week)", circledTitle: "⑳ 요일 (Days & Week)", icon: "🌙", itemCount: 10, previewWords: ["월요일", "화요일", "수요일"] },
  { ch: 21, theme: "숫자 (Numbers)", circledTitle: "㉑ 숫자 (Numbers)", icon: "1️⃣", itemCount: 10, previewWords: ["하나/둘", "셋/넷", "다섯/여섯"] },
  { ch: 22, theme: "협동 (Cooperation)", circledTitle: "㉒ 협동 (Cooperation)", icon: "🙋", itemCount: 10, previewWords: ["나", "너", "같이"] },
  { ch: 23, theme: "감정 (Emotions)", circledTitle: "㉓ 감정 (Emotions)", icon: "😄", itemCount: 10, previewWords: ["기뻐요", "슬퍼요", "화나요"] },
  { ch: 24, theme: "색깔 (Colors)", circledTitle: "㉔ 색깔 (Colors)", icon: "🔴", itemCount: 10, previewWords: ["빨강", "주황", "노랑"] },
  { ch: 25, theme: "가족 (Family)", circledTitle: "㉕ 가족 (Family)", icon: "🙋‍♂️", itemCount: 10, previewWords: ["저", "우리", "가족"] },
  { ch: 26, theme: "사람·학교 (People & School)", circledTitle: "㉖ 사람·학교 (People & School)", icon: "🏫", itemCount: 10, previewWords: ["학교", "남자", "여자"] },
  { ch: 27, theme: "교통·길 (Transport & Places)", circledTitle: "㉗ 교통·길 (Transport & Places)", icon: "🚗", itemCount: 10, previewWords: ["차", "버스", "지하철"] },
  { ch: 28, theme: "의문사 (Question Words)", circledTitle: "㉘ 의문사 (Question Words)", icon: "🧑", itemCount: 10, previewWords: ["누구", "무엇", "어디"] },
  { ch: 29, theme: "지시·수량 (Which & How Much)", circledTitle: "㉙ 지시·수량 (Which & How Much)", icon: "👉", itemCount: 10, previewWords: ["그거", "거기", "어느"] },
  { ch: 30, theme: "접속·부사 (Connectors & Adverbs)", circledTitle: "㉚ 접속·부사 (Connectors & Adverbs)", icon: "➕", itemCount: 10, previewWords: ["그리고", "그래서", "하지만"] },
];
