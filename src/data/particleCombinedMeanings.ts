import { SupportedLanguage } from '../types';
import { ParticleColsItem } from './particleWorksheetData';

export type ParticleMeaningMap = Record<SupportedLanguage, string>;

/**
 * 조사 결합 단어형(cols5) 22단원 · 110항목의 '명사 단독 뜻(base)' 보정 맵.
 * (기존 item.meanings에 결합형 뜻이 들어있던 5, 10, 14-5, 16~29단원 및 '13-3' 표기 정리용)
 */
export const PARTICLE_COLS_BASE_OVERRIDES: Record<string, ParticleMeaningMap> = {
  // 5단원: 나, 너, 저, 누구, 이것
  'particle-u5-1': { en: 'I / Me (plain)', vi: 'Tôi / Mình', bn: 'আমি', zh: '我', ru: 'Я', ja: '私 / ぼく', mn: 'Би' },
  'particle-u5-2': { en: 'You', vi: 'Bạn / Cậu', bn: 'তুমি', zh: '你', ru: 'Ты', ja: 'きみ / あなた', mn: 'Чи' },
  'particle-u5-3': { en: 'I / Me (polite)', vi: 'Em / Tôi (lịch sự)', bn: 'আমি (বিনীত)', zh: '我（谦称）', ru: 'Я (вежл.)', ja: '私（丁寧）', mn: 'Би (хүндэт)' },
  'particle-u5-4': { en: 'Who', vi: 'Ai', bn: 'কে', zh: '谁', ru: 'Кто', ja: '誰', mn: 'Хэн' },
  'particle-u5-5': { en: 'This thing', vi: 'Cái này', bn: 'এটি', zh: '这个', ru: 'Это', ja: 'これ', mn: 'Энэ' },

  // 10단원: 저희, 친구, 물, 사과, 우산
  'particle-u10-1': { en: 'We / Us (polite)', vi: 'Chúng em / Chúng tôi', bn: 'আমরা (বিনীত)', zh: '我们（谦称）', ru: 'Мы (вежл.)', ja: '私たち（丁寧）', mn: 'Бид (хүндэт)' },
  'particle-u10-2': { en: 'Friend', vi: 'Bạn bè', bn: 'বন্ধু', zh: '朋友', ru: 'Друг', ja: '友達', mn: 'Найз' },
  'particle-u10-3': { en: 'Water', vi: 'Nước', bn: 'পানি', zh: '水', ru: 'Вода', ja: 'お水', mn: 'Ус' },
  'particle-u10-4': { en: 'Apple', vi: 'Quả táo', bn: 'আপেল', zh: '苹果', ru: 'Яблоко', ja: 'りんご', mn: 'Алим' },
  'particle-u10-5': { en: 'Umbrella', vi: 'Cái ô / dù', bn: 'ছাতা', zh: '雨伞', ru: 'Зонт', ja: '傘', mn: 'Шүхэр' },

  // 13-3: 괄호 문법 메모 제거한 순수 명사 뜻
  'particle-u13-3': { en: 'Pencil', vi: 'Bút chì', bn: 'পেন্সিল', zh: '铅笔', ru: 'Карандаш', ja: '鉛筆', mn: 'Харандаа' },

  // 14-5: 누구
  'particle-u14-5': { en: 'Who', vi: 'Ai', bn: 'কে', zh: '谁', ru: 'Кто', ja: '誰', mn: 'Хэн' },

  // 16단원: 아침, 언제, 저녁, 몇 시, 몇 쪽
  'particle-u16-1': { en: 'Morning', vi: 'Buổi sáng', bn: 'সকাল', zh: '早上', ru: 'Утро', ja: '朝', mn: 'Өглөө' },
  'particle-u16-2': { en: 'When', vi: 'Khi nào / Bao giờ', bn: 'কখন / কবে', zh: '什么时候', ru: 'Когда', ja: 'いつ', mn: 'Хэзээ' },
  'particle-u16-3': { en: 'Evening', vi: 'Buổi tối', bn: 'সন্ধ্যা', zh: '晚上', ru: 'Вечер', ja: '夕方', mn: 'Орой' },
  'particle-u16-4': { en: 'What time', vi: 'Mấy giờ', bn: 'কয়টা', zh: '几点', ru: 'Который час', ja: '何時', mn: 'Хэдэн цаг' },
  'particle-u16-5': { en: 'Which page', vi: 'Trang mấy', bn: 'কত পৃষ্ঠা', zh: '第几页', ru: 'Какая страница', ja: '何ページ', mn: 'Хэддүгээр хуудас' },

  // 17단원: 빵, 물, 책, 사과, 버스
  'particle-u17-1': { en: 'Bread', vi: 'Bánh mì', bn: 'রুটি', zh: '面包', ru: 'Хлеб', ja: 'パン', mn: 'Талх' },
  'particle-u17-2': { en: 'Water', vi: 'Nước', bn: 'পানি', zh: '水', ru: 'Вода', ja: 'お水', mn: 'Ус' },
  'particle-u17-3': { en: 'Book', vi: 'Sách', bn: 'বই', zh: '书', ru: 'Книга', ja: '本', mn: 'Ном' },
  'particle-u17-4': { en: 'Apple', vi: 'Quả táo', bn: 'আপেল', zh: '苹果', ru: 'Яблоко', ja: 'りんご', mn: 'Алим' },
  'particle-u17-5': { en: 'Bus', vi: 'Xe buýt', bn: 'বাস', zh: '公交车', ru: 'Автобус', ja: 'バス', mn: 'Автобус' },

  // 18단원: 날, 아침, 주말, 교실, 사람
  'particle-u18-1': { en: 'Day', vi: 'Ngày', bn: 'দিন', zh: '天 / 日', ru: 'День', ja: '日', mn: 'Өдөр' },
  'particle-u18-2': { en: 'Morning', vi: 'Buổi sáng', bn: 'সকাল', zh: '早上', ru: 'Утро', ja: '朝', mn: 'Өглөө' },
  'particle-u18-3': { en: 'Weekend', vi: 'Cuối tuần', bn: 'সপ্তাহান্ত', zh: '周末', ru: 'Выходные', ja: '週末', mn: 'Амралтын өдөр' },
  'particle-u18-4': { en: 'Classroom', vi: 'Lớp học', bn: 'শ্রেণিকক্ষ', zh: '教室', ru: 'Класс', ja: '教室', mn: 'Анги' },
  'particle-u18-5': { en: 'Person', vi: 'Người', bn: 'মানুষ', zh: '人', ru: 'Человек', ja: '人', mn: 'Хүн' },

  // 20단원: 물, 나, 하나, 오늘, 사과
  'particle-u20-1': { en: 'Water', vi: 'Nước', bn: 'পানি', zh: '水', ru: 'Вода', ja: 'お水', mn: 'Ус' },
  'particle-u20-2': { en: 'I / Me', vi: 'Tôi / Mình', bn: 'আমি', zh: '我', ru: 'Я', ja: '私', mn: 'Би' },
  'particle-u20-3': { en: 'One', vi: 'Một', bn: 'একটি', zh: '一个', ru: 'Один', ja: '一つ', mn: 'Нэг' },
  'particle-u20-4': { en: 'Today', vi: 'Hôm nay', bn: 'আজ', zh: '今天', ru: 'Сегодня', ja: '今日', mn: 'Өнөөдөр' },
  'particle-u20-5': { en: 'Apple', vi: 'Quả táo', bn: 'আপেল', zh: '苹果', ru: 'Яблоко', ja: 'りんご', mn: 'Алим' },

  // 21단원: 하나, 주스, 나, 시간, 빵
  'particle-u21-1': { en: 'One', vi: 'Một', bn: 'একটি', zh: '一个', ru: 'Один', ja: '一つ', mn: 'Нэг' },
  'particle-u21-2': { en: 'Juice', vi: 'Nước ép', bn: 'জুস', zh: '果汁', ru: 'Сок', ja: 'ジュース', mn: 'Жүүс' },
  'particle-u21-3': { en: 'I / Me', vi: 'Tôi / Mình', bn: 'আমি', zh: '我', ru: 'Я', ja: '私', mn: 'Би' },
  'particle-u21-4': { en: 'Time', vi: 'Thời gian', bn: 'সময়', zh: '时间', ru: 'Время', ja: '時間', mn: 'Цаг хугацаа' },
  'particle-u21-5': { en: 'Bread', vi: 'Bánh mì', bn: 'রুটি', zh: '面包', ru: 'Хлеб', ja: 'パン', mn: 'Талх' },

  // 22단원: 형, 어제, 버스, 사과, 누구
  'particle-u22-1': { en: 'Older brother', vi: 'Anh trai', bn: 'বড় ভাই', zh: '哥哥', ru: 'Старший брат', ja: 'お兄さん', mn: 'Ах' },
  'particle-u22-2': { en: 'Yesterday', vi: 'Hôm qua', bn: 'গতকাল', zh: '昨天', ru: 'Вчера', ja: '昨日', mn: 'Өчигдөр' },
  'particle-u22-3': { en: 'Bus', vi: 'Xe buýt', bn: 'বাস', zh: '公交车', ru: 'Автобус', ja: 'バス', mn: 'Автобус' },
  'particle-u22-4': { en: 'Apple', vi: 'Quả táo', bn: 'আপেল', zh: '苹果', ru: 'Яблоко', ja: 'りんご', mn: 'Алим' },
  'particle-u22-5': { en: 'Who / Anyone', vi: 'Ai', bn: 'কে', zh: '谁', ru: 'Кто', ja: '誰', mn: 'Хэн' },

  // 24단원: 토끼, 구름, 인형, 눈, 별
  'particle-u24-1': { en: 'Rabbit', vi: 'Con thỏ', bn: 'খরগোশ', zh: '兔子', ru: 'Кролик', ja: 'うさぎ', mn: 'Туулай' },
  'particle-u24-2': { en: 'Cloud', vi: 'Đám mây', bn: 'মেঘ', zh: '云朵', ru: 'Облако', ja: '雲', mn: 'Үүл' },
  'particle-u24-3': { en: 'Doll / Plush toy', vi: 'Búp bê / Thú bông', bn: 'পুতুল', zh: '娃娃 / 玩偶', ru: 'Кукла / Игрушка', ja: '人形', mn: 'Хүүхэлдэй' },
  'particle-u24-4': { en: 'Snow', vi: 'Tuyết', bn: 'তুষার', zh: '雪', ru: 'Снег', ja: '雪', mn: 'Цас' },
  'particle-u24-5': { en: 'Star', vi: 'Ngôi sao', bn: 'তারা', zh: '星星', ru: 'Звезда', ja: '星', mn: 'Од' },

  // 25단원: 친구, 선생님, 나, 너, 저
  'particle-u25-1': { en: 'Friend', vi: 'Bạn bè', bn: 'বন্ধু', zh: '朋友', ru: 'Друг', ja: '友達', mn: 'Найз' },
  'particle-u25-2': { en: 'Teacher', vi: 'Thầy/Cô giáo', bn: 'শিক্ষক', zh: '老师', ru: 'Учитель', ja: '先生', mn: 'Багш' },
  'particle-u25-3': { en: 'I / Me (plain)', vi: 'Tôi / Mình', bn: 'আমি', zh: '我', ru: 'Я', ja: '私 / ぼく', mn: 'Би' },
  'particle-u25-4': { en: 'You', vi: 'Bạn / Cậu', bn: 'তুমি', zh: '你', ru: 'Ты', ja: 'きみ', mn: 'Чи' },
  'particle-u25-5': { en: 'I / Me (polite)', vi: 'Em / Tôi (lịch sự)', bn: 'আমি (বিনীত)', zh: '我（谦称）', ru: 'Я (вежл.)', ja: '私（丁寧）', mn: 'Би (хүндэт)' },

  // 26단원: 친구, 우리, 남자, 여자, 학생
  'particle-u26-1': { en: 'Friend', vi: 'Bạn bè', bn: 'বন্ধু', zh: '朋友', ru: 'Друг', ja: '友達', mn: 'Найз' },
  'particle-u26-2': { en: 'We / Us', vi: 'Chúng mình', bn: 'আমরা', zh: '我们', ru: 'Мы', ja: '私たち', mn: 'Бид' },
  'particle-u26-3': { en: 'Boy / Man', vi: 'Con trai / Nam', bn: 'ছেলে / পুরুষ', zh: '男生 / 男人', ru: 'Мальчик / Мужчина', ja: '男の子 / 男性', mn: 'Эрэгтэй' },
  'particle-u26-4': { en: 'Girl / Woman', vi: 'Con gái / Nữ', bn: 'মেয়ে / নারী', zh: '女生 / 女人', ru: 'Девочка / Женщина', ja: '女の子 / 女性', mn: 'Эмэгтэй' },
  'particle-u26-5': { en: 'Student', vi: 'Học sinh', bn: 'ছাত্রছাত্রী', zh: '学生', ru: 'Ученик', ja: '生徒', mn: 'Сурагч' },

  // 28단원: 할머니, 선생님, 부모님, 할아버지, 어른
  'particle-u28-1': { en: 'Grandmother', vi: 'Bà', bn: 'দাদিমা / নানিমা', zh: '奶奶 / 外婆', ru: 'Бабушка', ja: 'おばあさん', mn: 'Эмээ' },
  'particle-u28-2': { en: 'Teacher', vi: 'Thầy/Cô giáo', bn: 'শিক্ষক', zh: '老师', ru: 'Учитель', ja: '先生', mn: 'Багш' },
  'particle-u28-3': { en: 'Parents', vi: 'Bố mẹ', bn: 'বাবা-মা', zh: '父母', ru: 'Родители', ja: 'ご両親', mn: 'Эцэг эх' },
  'particle-u28-4': { en: 'Grandfather', vi: 'Ông', bn: 'দাদা / নানা', zh: '爷爷 / 外公', ru: 'Дедушка', ja: 'おじいさん', mn: 'Өвөө' },
  'particle-u28-5': { en: 'Elder / Adult', vi: 'Người lớn', bn: 'বড়রা / মুরব্বি', zh: '长辈', ru: 'Старший / Взрослый', ja: '目上の人', mn: 'Ахмад хүн' },

  // 29단원: 민수, 수진, 강아지, 친구, 동생
  'particle-u29-1': { en: 'Minsu (name)', vi: 'Minsu (tên)', bn: 'মিনসু (নাম)', zh: '敏洙（名字）', ru: 'Минсу (имя)', ja: 'ミンス（名前）', mn: 'Минсү (нэр)' },
  'particle-u29-2': { en: 'Sujin (name)', vi: 'Sujin (tên)', bn: 'সুজিন (নাম)', zh: '秀珍（名字）', ru: 'Суджин (имя)', ja: 'スジン（名前）', mn: 'Сүжин (нэр)' },
  'particle-u29-3': { en: 'Puppy', vi: 'Cún con', bn: 'কুকুরছানা', zh: '小狗', ru: 'Щенок', ja: '子犬', mn: 'Гөлөг' },
  'particle-u29-4': { en: 'Friend', vi: 'Bạn bè', bn: 'বন্ধু', zh: '朋友', ru: 'Друг', ja: '友達', mn: 'Найз' },
  'particle-u29-5': { en: 'Younger sibling', vi: 'Em', bn: 'ছোট ভাই/বোন', zh: '弟弟/妹妹', ru: 'Младший брат/сестра', ja: '弟 / 妹', mn: 'Дүү' },
};

/**
 * 조사 결합 단어형(cols5)에서 명사 단독 뜻만 들어있던 단원(1, 2, 4, 6, 8, 9, 12, 13, 14)의
 * '조사 결합 후 뜻(combined)' 보정 맵 (+ 26-4 중국어 오역 보정).
 */
export const PARTICLE_COLS_COMBINED_OVERRIDES: Record<string, ParticleMeaningMap> = {
  // 1단원: 은/는 (주제)
  'particle-u1-1': { en: 'As for me (topic)', vi: 'Về phần tôi / Mình thì', bn: 'আমি (বিষয়)', zh: '我（话题）', ru: 'Что касается меня', ja: '私は / ぼくは', mn: 'Би бол' },
  'particle-u1-2': { en: 'As for a friend (topic)', vi: 'Còn bạn thì', bn: 'বন্ধু (বিষয়)', zh: '朋友（话题）', ru: 'А друг / Друг (тема)', ja: '友達は', mn: 'Найз бол' },
  'particle-u1-3': { en: 'As for sibling (topic)', vi: 'Còn em thì', bn: 'ছোট ভাই/বোন (বিষয়)', zh: '弟弟/妹妹（话题）', ru: 'Младший (тема)', ja: '弟/妹は', mn: 'Дүү бол' },
  'particle-u1-4': { en: 'As for teacher (topic)', vi: 'Còn thầy/cô thì', bn: 'শিক্ষক (বিষয়)', zh: '老师（话题）', ru: 'Учитель (тема)', ja: '先生は', mn: 'Багш бол' },
  'particle-u1-5': { en: 'As for the bag (topic)', vi: 'Còn cặp sách thì', bn: 'ব্যাগটি (বিষয়)', zh: '书包（话题）', ru: 'А рюкзак (тема)', ja: 'かばんは', mn: 'Цүнх бол' },

  // 2단원: 이에요/예요 (소개: ~입니다)
  'particle-u2-1': { en: 'am/is a student', vi: 'là học sinh ạ', bn: 'ছাত্র/ছাত্রী (হয়)', zh: '是学生', ru: 'является учеником', ja: '学生です', mn: 'сурагч юм' },
  'particle-u2-2': { en: 'is a pencil', vi: 'là bút chì ạ', bn: 'পেন্সিল (হয়)', zh: '是铅笔', ru: 'это карандаш', ja: '鉛筆です', mn: 'харандаа юм' },
  'particle-u2-3': { en: 'is that thing', vi: 'là cái kia ạ', bn: 'ওটা (হয়)', zh: '是那个', ru: 'это то', ja: 'あれです', mn: 'тэр юм' },
  'particle-u2-4': { en: 'is a chair', vi: 'là cái ghế ạ', bn: 'চেয়ার (হয়)', zh: '是椅子', ru: 'это стул', ja: 'いすです', mn: 'сандал юм' },
  'particle-u2-5': { en: 'is an eraser', vi: 'là cục tẩy ạ', bn: 'ইরেজার (হয়)', zh: '是橡皮', ru: 'это ластик', ja: '消しゴムです', mn: 'баллуур юм' },

  // 4단원: 이/가 (주격)
  'particle-u4-1': { en: 'Water (subject)', vi: 'Nước (chủ ngữ)', bn: 'পানি (কর্তা)', zh: '水（主语）', ru: 'Вода (подл.)', ja: 'お水が', mn: 'Ус (нэрлэх)' },
  'particle-u4-2': { en: 'Book (subject)', vi: 'Sách (chủ ngữ)', bn: 'বই (কর্তা)', zh: '书（主语）', ru: 'Книга (подл.)', ja: '本が', mn: 'Ном (нэрлэх)' },
  'particle-u4-3': { en: 'Medicine (subject)', vi: 'Thuốc (chủ ngữ)', bn: 'ওষুধ (কর্তা)', zh: '药（主语）', ru: 'Лекарство (подл.)', ja: 'お薬が', mn: 'Эм (нэрлэх)' },
  'particle-u4-4': { en: 'Stomach (subject)', vi: 'Bụng (chủ ngữ)', bn: 'পেট (কর্তা)', zh: '肚子（主语）', ru: 'Живот (подл.)', ja: 'お腹が', mn: 'Гэдэс (нэрлэх)' },
  'particle-u4-5': { en: 'Soap (subject)', vi: 'Xà phòng (chủ ngữ)', bn: 'সাবান (কর্তা)', zh: '肥皂（主语）', ru: 'Мыло (подл.)', ja: '石けんが', mn: 'Саван (нэрлэх)' },

  // 6단원: 을/를 (목적격)
  'particle-u6-1': { en: 'Rice / meal (object)', vi: 'Cơm (tân ngữ)', bn: 'ভাত (কর্ম)', zh: '米饭（宾语）', ru: 'Рис / еду (вин.)', ja: 'ご飯を', mn: 'Будааг / Хоолыг' },
  'particle-u6-2': { en: 'Hand (object)', vi: 'Tay (tân ngữ)', bn: 'হাত (কর্ম)', zh: '手（宾语）', ru: 'Руку (вин.)', ja: '手を', mn: 'Гарыг' },
  'particle-u6-3': { en: 'What (object)', vi: 'Cái gì (tân ngữ)', bn: 'কী (কর্ম)', zh: '什么（宾语）', ru: 'Что (вин.)', ja: '何を', mn: 'Юуг' },
  'particle-u6-4': { en: 'Milk (object)', vi: 'Sữa (tân ngữ)', bn: 'দুধ (কর্ম)', zh: '牛奶（宾语）', ru: 'Молоко (вин.)', ja: '牛乳を', mn: 'Сүүг' },
  'particle-u6-5': { en: 'Apple (object)', vi: 'Quả táo (tân ngữ)', bn: 'আপেল (কর্ম)', zh: '苹果（宾语）', ru: 'Яблоко (вин.)', ja: 'りんごを', mn: 'Алимыг' },

  // 8단원: 에 (장소·시간)
  'particle-u8-1': { en: 'Here / to here', vi: 'Ở đây / vào đây', bn: 'এখানে', zh: '在这里 / 往这里', ru: 'Здесь / Сюда', ja: 'ここに', mn: 'Энд' },
  'particle-u8-2': { en: 'At / to home', vi: 'Ở / về nhà', bn: 'বাড়িতে', zh: '在 / 回家', ru: 'Дома / Домой', ja: '家に', mn: 'Гэрт / Гэр лүү' },
  'particle-u8-3': { en: 'To / at where', vi: 'Đi / ở đâu', bn: 'কোথায়', zh: '去 / 在哪里', ru: 'Куда / Где', ja: 'どこに', mn: 'Хаашаа / Хаана' },
  'particle-u8-4': { en: 'In the morning', vi: 'Vào buổi sáng', bn: 'সকালে', zh: '在早上', ru: 'Утром', ja: '朝に', mn: 'Өглөө нь' },
  'particle-u8-5': { en: 'At lunchtime / noon', vi: 'Vào buổi trưa', bn: 'দুপুরে', zh: '在中午', ru: 'В обед / Днём', ja: '昼に', mn: 'Өдөр нь' },

  // 9단원: 에서 (동작 장소·출발)
  'particle-u9-1': { en: 'In the classroom', vi: 'Ở trong lớp học', bn: 'শ্রেণিকক্ষে', zh: '在教室里', ru: 'В классе', ja: '教室で', mn: 'Ангид' },
  'particle-u9-2': { en: 'At the playground', vi: 'Ở sân trường', bn: 'খেলার মাঠে', zh: '在操场上', ru: 'На спортплощадке', ja: '運動場で', mn: 'Талбайд' },
  'particle-u9-3': { en: 'At the library', vi: 'Ở thư viện', bn: 'গ্রন্থাগারে', zh: '在图书馆里', ru: 'В библиотеке', ja: '図書館で', mn: 'Номын санд' },
  'particle-u9-4': { en: 'From which country', vi: 'Từ nước nào', bn: 'কোন দেশ থেকে', zh: '从哪个国家', ru: 'Из какой страны', ja: 'どこの国から', mn: 'Аль улсаас' },
  'particle-u9-5': { en: 'There (at that place)', vi: 'Ở chỗ đó', bn: 'সেখানে', zh: '在那里', ru: 'Там', ja: 'そこで', mn: 'Тэнд' },

  // 12단원: 와, 과, 하고, 이랑, 랑 (동반·나열)
  'particle-u12-1': { en: 'With Mom', vi: 'Cùng với mẹ', bn: 'মায়ের সাথে', zh: '和妈妈一起', ru: 'С мамой', ja: 'お母さんと', mn: 'Ээжтэй хамт' },
  'particle-u12-2': { en: 'Milk and...', vi: 'Sữa và...', bn: 'দুধ এবং...', zh: '牛奶和…', ru: 'Молоко и...', ja: '牛乳と…', mn: 'Сүү болон...' },
  'particle-u12-3': { en: 'Pencil and...', vi: 'Bút chì và...', bn: 'পেন্সিল এবং...', zh: '铅笔和…', ru: 'Карандаш и...', ja: '鉛筆と…', mn: 'Харандаа ба...' },
  'particle-u12-4': { en: 'Book and...', vi: 'Sách và...', bn: 'বই এবং...', zh: '书和…', ru: 'Книга и...', ja: '本と…', mn: 'Ном ба...' },
  'particle-u12-5': { en: 'With a friend', vi: 'Cùng với bạn', bn: 'বন্ধুর সাথে', zh: '和朋友一起', ru: 'С другом', ja: '友達と', mn: 'Найзтай хамт' },

  // 13단원: 으로, 로 (방향·수단)
  'particle-u13-1': { en: 'Toward school', vi: 'Hướng tới trường', bn: 'স্কুলের দিকে', zh: '往学校去', ru: 'В сторону школы', ja: '学校へ', mn: 'Сургууль руу' },
  'particle-u13-2': { en: 'Out to the playground', vi: 'Ra sân trường', bn: 'মাঠের দিকে', zh: '向操场去', ru: 'На спортплощадку', ja: '運動場へ', mn: 'Талбай руу' },
  'particle-u13-3': { en: 'With a pencil', vi: 'Bằng bút chì', bn: 'পেন্সিল দিয়ে', zh: '用铅笔', ru: 'Карандашом', ja: '鉛筆で', mn: 'Харандаагаар' },
  'particle-u13-4': { en: 'By bus', vi: 'Bằng xe buýt', bn: 'বাসে করে', zh: '乘公交车', ru: 'На автобусе', ja: 'バスで', mn: 'Автобусаар' },
  'particle-u13-5': { en: 'With a spoon', vi: 'Bằng thìa', bn: 'চামচ দিয়ে', zh: '用勺子', ru: 'Ложкой', ja: 'スプーンで', mn: 'Халбагаар' },

  // 14단원: 에게, 한테 (대상)
  'particle-u14-1': { en: 'To my partner', vi: 'Cho/Với bạn cùng bàn', bn: 'সহপাঠীকে', zh: '向/给同桌', ru: 'Соседу по парте', ja: '隣の友達に', mn: 'Ширээний найзад' },
  'particle-u14-2': { en: 'To a friend', vi: 'Cho bạn', bn: 'বন্ধুকে', zh: '给朋友', ru: 'Другу', ja: '友達に', mn: 'Найзад' },
  'particle-u14-3': { en: 'To younger sibling', vi: 'Cho/Với em', bn: 'ছোট ভাই/বোনকে', zh: '给/对弟弟妹妹', ru: 'Младшему', ja: '弟/妹に', mn: 'Дүүд' },
  'particle-u14-4': { en: 'To us', vi: 'Cho chúng mình', bn: 'আমাদেরকে', zh: '给我们', ru: 'Нам', ja: '私たちに', mn: 'Бидэнд' },
};

export function getParticleBaseMeaning(item: ParticleColsItem, lang: SupportedLanguage): string {
  const override = PARTICLE_COLS_BASE_OVERRIDES[item.id];
  if (override) return override[lang] || override.en;
  return item.meanings[lang] || item.meanings.en;
}

export function getParticleCombinedMeaning(item: ParticleColsItem, lang: SupportedLanguage): string {
  const override = PARTICLE_COLS_COMBINED_OVERRIDES[item.id];
  if (override) return override[lang] || override.en;
  return item.meanings[lang] || item.meanings.en;
}
