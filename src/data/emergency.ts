import { EmergencyCardData } from '../types';

export const EMERGENCY_CARDS: EmergencyCardData[] = [
  {
    id: 'toilet',
    titleKo: '화장실',
    icon: '🚽',
    mainSentenceKo: '선생님, 화장실에 다녀와도 될까요?',
    translations: {
      en: 'Teacher, may I please go to the restroom?',
      vi: 'Thầy/Cô ơi, cho em xin phép đi vệ sinh được không ạ?',
      bn: 'শিক্ষক, আমি কি বাথরুমে যেতে পারি?',
      zh: '老师，我可以去洗手间吗？',
      ru: 'Учитель, можно выйти в туалет?',
      ja: '先生、トイレに行ってもいいですか？',
      mn: 'Багшаа, би бие засаад ирж болох уу?'
    },
    subOptions: [
      {
        ko: '화장실이 급해요!',
        icon: '⏳',
        translations: {
          en: "It's urgent!",
          vi: 'Em đang rất gấp ạ!',
          bn: 'খুব জরুরি!',
          zh: '很急！',
          ru: 'Мне срочно!',
          ja: 'とても急いでいます！',
          mn: 'Маш яаралтай байна!'
        }
      },
      {
        ko: '휴지가 필요해요.',
        icon: '🧻',
        translations: {
          en: 'I need toilet paper.',
          vi: 'Em cần giấy vệ sinh ạ.',
          bn: 'আমার টিস্যু প্রয়োজন।',
          zh: '我需要卫生纸。',
          ru: 'Мне нужна туалетная бумага.',
          ja: 'トイレットペーパーが必要です。',
          mn: 'Надад ариун цэврийн цаас хэрэгтэй байна.'
        }
      },
      {
        ko: '손 씻고 올게요.',
        icon: '🧼',
        translations: {
          en: 'I will go wash my hands.',
          vi: 'Em đi rửa tay rồi vào ạ.',
          bn: 'আমি হাত ধুয়ে আসব।',
          zh: '我去洗个手就回来。',
          ru: 'Я помою руки и вернусь.',
          ja: '手を洗ってきます。',
          mn: 'Би гараа угаачихаад ирье.'
        }
      }
    ],
    teacherResponses: [
      {
        ko: '네, 조심히 얼른 다녀오세요! 👍',
        translations: {
          en: 'Yes, go ahead quickly and be careful!',
          vi: 'Được chứ, em đi nhanh rồi về nhé!',
          bn: 'হ্যাঁ, সাবধানে তাড়াতাড়ি যেয়ে আসো!',
          zh: '好的，小心快去快回！👍',
          ru: 'Да, аккуратно и быстро возвращайся! 👍',
          ja: 'はい、気をつけて早く行ってきてね！👍',
          mn: 'Тэг тэг, болгоомжтой хурдан яваад ирээрэй! 👍'
        }
      },
      {
        ko: '휴지 챙겨서 다녀오세요. 🧻',
        translations: {
          en: 'Take some tissue with you.',
          vi: 'Nhớ mang theo giấy vệ sinh nhé.',
          bn: 'সাথে টিস্যু নিয়ে যাও।',
          zh: '带上卫生纸再去哦。🧻',
          ru: 'Возьми с собой салфетки. 🧻',
          ja: 'ティッシュを持って行ってね。🧻',
          mn: 'Цаас аваад яваарай. 🧻'
        }
      },
      {
        ko: '선생님 설명 끝나고 1분만 기다려줄래요? ⏳',
        translations: {
          en: 'Can you wait 1 minute until teacher finishes explaining?',
          vi: 'Em đợi cô giải thích xong 1 phút được không?',
          bn: 'শিক্ষকের কথা শেষ হওয়া পর্যন্ত ১ মিনিট অপেক্ষা করবে?',
          zh: '老师讲完后等一分钟可以吗？⏳',
          ru: 'Подождешь одну минутку, пока учитель закончит? ⏳',
          ja: '先生の説明が終わるまで1分待てるかな？⏳',
          mn: 'Багшийн тайлбар дуустал 1 минут хүлээж чадах уу? ⏳'
        }
      }
    ]
  },
  {
    id: 'water',
    titleKo: '물',
    icon: '💧',
    mainSentenceKo: '선생님, 물 마시고 와도 될까요?',
    translations: {
      en: 'Teacher, may I please go drink some water?',
      vi: 'Thầy/Cô ơi, cho em xin phép đi uống nước được không ạ?',
      bn: 'শিক্ষক, আমি কি পানি খেয়ে আসতে পারি?',
      zh: '老师，我可以去喝水吗？',
      ru: 'Учитель, можно попить воды?',
      ja: '先生、水を飲んできてもいいですか？',
      mn: 'Багшаа, ус уучхаад ирж болох уу?'
    },
    subOptions: [
      {
        ko: '목이 너무 말라요.',
        icon: '🥤',
        translations: {
          en: "I'm very thirsty.",
          vi: 'Em khát nước quá ạ.',
          bn: 'আমার খুব তৃষ্ণা পেয়েছে।',
          zh: '我太渴了。',
          ru: 'Я очень хочу пить.',
          ja: '喉がとても渇きました。',
          mn: 'Ам маш их цангаж байна.'
        }
      },
      {
        ko: '물통에 물 담아와도 돼요?',
        icon: '🍶',
        translations: {
          en: 'May I fill my water bottle?',
          vi: 'Em lấy nước vào bình được không ạ?',
          bn: 'আমি কি পানির বোতল ভরে আনতে পারি?',
          zh: '我可以往水壶里装水吗？',
          ru: 'Можно набрать воды в бутылку?',
          ja: '水筒に水を入れてきてもいいですか？',
          mn: 'Усны савандаа ус хийгээд ирж болох уу?'
        }
      },
      {
        ko: '물을 쏟았어요. 도와주세요.',
        icon: '🧻',
        translations: {
          en: 'I spilled water. Please help.',
          vi: 'Em làm đổ nước rồi, giúp em với ạ.',
          bn: 'পানি পড়ে গেছে। দয়া করে সাহায্য করুন।',
          zh: '水洒了，请帮帮我。',
          ru: 'Я разлил(а) воду, помогите, пожалуйста.',
          ja: '水をこぼしてしまいました。手伝ってください。',
          mn: 'Ус асгачихлаа, туслаарай.'
        }
      }
    ],
    teacherResponses: [
      {
        ko: '네, 복도 정수기에서 마시고 오세요! 💧',
        translations: {
          en: 'Yes, go drink from the water dispenser in hallway!',
          vi: 'Được chứ, em ra cây nước ở hành lang uống nhé!',
          bn: 'হ্যাঁ, করিডোরের ডিসপেনসার থেকে খেয়ে এসো!',
          zh: '好的，去走廊饮水机喝吧！💧',
          ru: 'Да, попей из кулера в коридоре! 💧',
          ja: 'はい、廊下の給水機で飲んできてね！💧',
          mn: 'Тэг тэг, коридорын ус түгээгчээс уугаад ирээрэй! 💧'
        }
      },
      {
        ko: '천천히 마시고 들어오세요. 😊',
        translations: {
          en: 'Drink slowly and come back.',
          vi: 'Uống từ từ rồi vào lớp nhé.',
          bn: 'আস্তে পানি খেয়ে ক্লাসে ফিরে এসো।',
          zh: '慢慢喝，然后再回教室哦。😊',
          ru: 'Пей спокойно и возвращайся. 😊',
          ja: 'ゆっくり飲んで戻ってきてね。😊',
          mn: 'Тайван уугаад ороод ирээрэй. 😊'
        }
      }
    ]
  },
  {
    id: 'sick',
    titleKo: '아파요',
    icon: '🤕',
    mainSentenceKo: '선생님, 몸이 아파요. 보건실에 가고 싶어요.',
    translations: {
      en: "Teacher, I feel sick. I want to go to the nurse's office.",
      vi: 'Thầy/Cô ơi, em thấy không khỏe. Em muốn xuống phòng y tế ạ.',
      bn: 'শিক্ষক, আমার শরীর খারাপ লাগছে। আমি নার্স রুমে যেতে চাই।',
      zh: '老师，我不舒服，想去医务室。',
      ru: 'Учитель, мне плохо. Я хочу в медкабинет.',
      ja: '先生、具合が悪いです。保健室に行きたいです。',
      mn: 'Багшаа, бие өвдөөд байна. Эмчийн өрөө орж болох уу?'
    },
    subOptions: [
      {
        ko: '배가 많이 아파요.',
        icon: '🤰',
        translations: {
          en: 'My stomach hurts a lot.',
          vi: 'Em bị đau bụng nhiều ạ.',
          bn: 'আমার পেটে খুব ব্যথা করছে।',
          zh: '肚子很痛。',
          ru: 'У меня сильно болит живот.',
          ja: 'お腹がとても痛いです。',
          mn: 'Гэдэс их өвдөж байна.'
        }
      },
      {
        ko: '머리가 어지럽고 열나요.',
        icon: '🌡️',
        translations: {
          en: 'My head is dizzy and I have a fever.',
          vi: 'Em bị đau đầu và sốt ạ.',
          bn: 'আমার মাথা ঘুরছে এবং জ্বর এসেছে।',
          zh: '头晕发烧。',
          ru: 'Кружится голова и температура.',
          ja: '頭がクラクラして熱があります。',
          mn: 'Толгой эргээд халуурч байна.'
        }
      },
      {
        ko: '넘어져서 다쳤어요.',
        icon: '🩹',
        translations: {
          en: 'I fell down and got hurt.',
          vi: 'Em bị ngã trầy xước ạ.',
          bn: 'আমি পড়ে গিয়ে আঘাত পেয়েছি।',
          zh: '摔倒受伤了。',
          ru: 'Я упал(а) и ушибся/поранился.',
          ja: '転んで怪我をしました。',
          mn: 'Унаад бэртчихлээ.'
        }
      },
      {
        ko: '토할 것 같아요.',
        icon: '🤢',
        translations: {
          en: 'I feel like throwing up.',
          vi: 'Em cảm thấy buồn nôn ạ.',
          bn: 'আমার বমি বমি ভাব হচ্ছে।',
          zh: '我想吐。',
          ru: 'Меня тошнит.',
          ja: '吐き気がします。',
          mn: 'Бөөлжих гээд байна.'
        }
      }
    ],
    teacherResponses: [
      {
        ko: '선생님이랑 지금 같이 보건실 가자! 🏥',
        translations: {
          en: "Let's go to the nurse's office together right now!",
          vi: 'Cô/Thầy dẫn em xuống phòng y tế ngay nhé!',
          bn: 'চলো এখনই একসাথে নার্স রুমে যাই!',
          zh: '老师现在陪你一起去医务室！🏥',
          ru: 'Пойдем со мной в медкабинет прямо сейчас! 🏥',
          ja: '先生と今すぐ一緒に保健室に行こう！🏥',
          mn: 'Багш нь одоо чамтай хамт эмчийн өрөө рүү явъя! 🏥'
        }
      },
      {
        ko: '보건실 다녀와서 잠깐 엎드려 쉴까요? 🛌',
        translations: {
          en: "After the nurse's office, rest your head on the desk.",
          vi: 'Đi phòng y tế về rồi nằm nghỉ một lát nhé.',
          bn: 'নার্স রুম থেকে এসে টেবিলে মাথা রেখে একটু বিশ্রাম নাও।',
          zh: '从医务室回来后趴在桌上休息一下好吗？🛌',
          ru: 'Сходишь в медкабинет и немного полежишь на парте? 🛌',
          ja: '保健室から戻ったら少し机に伏せて休もうか？🛌',
          mn: 'Эмчийн өрөө орчихоод ширээгээ дэрлээд амрах уу? 🛌'
        }
      },
      {
        ko: '부모님께 연락드릴게요. 걱정 마세요. 📱',
        translations: {
          en: "I will call your parents. Don't worry.",
          vi: 'Thầy/Cô sẽ gọi điện cho bố mẹ em, đừng lo nhé.',
          bn: 'আমি তোমার বাবা-মাকে ফোন করছি। চিন্তা করো না।',
          zh: '老师会联系家长的，别担心。📱',
          ru: 'Я позвоню родителям. Не переживай. 📱',
          ja: '保護者の方に連絡するから心配しないでね。📱',
          mn: 'Аав ээжид чинь мэдэгдье, санаа бүү зовоорой. 📱'
        }
      }
    ]
  },
  {
    id: 'help',
    titleKo: '도와주세요',
    icon: '🙋',
    mainSentenceKo: '선생님, 잘 모르겠어요. 도와주세요!',
    translations: {
      en: "Teacher, I don't understand. Please help me!",
      vi: 'Thầy/Cô ơi, em chưa hiểu. Xin giúp em với ạ!',
      bn: 'শিক্ষক, আমি বুঝতে পারছি না। দয়া করে সাহায্য করুন!',
      zh: '老师，我不太懂，请帮帮我！',
      ru: 'Учитель, я не понимаю. Помогите, пожалуйста!',
      ja: '先生、よくわかりません。手伝ってください！',
      mn: 'Багшаа, сайн ойлгохгүй байна, туслаарай!'
    },
    subOptions: [
      {
        ko: '어떻게 하는지 모르겠어요.',
        icon: '❓',
        translations: {
          en: "I don't know how to do this.",
          vi: 'Em không biết làm như thế nào ạ.',
          bn: 'আমি বুঝতে পারছি না কীভাবে করতে হবে।',
          zh: '我不知道该怎么做。',
          ru: 'Я не знаю, как это делать.',
          ja: 'どうすればいいかわかりません。',
          mn: 'Хэрхэн хийхийг мэдэхгүй байна.'
        }
      },
      {
        ko: '준비물(연필/지우개)이 없어요.',
        icon: '✏️',
        translations: {
          en: "I don't have my supplies (pencil/eraser).",
          vi: 'Em không mang đồ dùng học tập ạ.',
          bn: 'আমার কাছে পেন্সিল বা ইরেজার নেই।',
          zh: '我没有学习用品（铅笔/橡皮）。',
          ru: 'У меня нет принадлежностей (карандаша/ластика).',
          ja: '持ち物（鉛筆や消しゴム）がありません。',
          mn: 'Хичээлийн хэрэгсেল (харандаа/баллуур) байхгүй байна.'
        }
      },
      {
        ko: '다시 한 번 말씀해 주세요.',
        icon: '🔁',
        translations: {
          en: 'Please explain one more time.',
          vi: 'Xin thầy/cô giảng lại một lần nữa ạ.',
          bn: 'দয়া করে আরেকবার বলুন।',
          zh: '请再说一遍。',
          ru: 'Повторите, пожалуйста, еще раз.',
          ja: 'もう一度言ってください。',
          mn: 'Дахин нэг удаа хэлж өгнө үү.'
        }
      },
      {
        ko: '친구가 나를 괴롭혀요.',
        icon: '😢',
        translations: {
          en: 'A classmate is bothering/teasing me.',
          vi: 'Bạn trêu chọc em ạ.',
          bn: 'একজন বন্ধু আমাকে বিরক্ত করছে।',
          zh: '有同学欺负我。',
          ru: 'Меня обижает одноклассник.',
          ja: '友達にいじわるされます。',
          mn: 'Найз маань намайг дээрэлхээд байна.'
        }
      }
    ],
    teacherResponses: [
      {
        ko: '그래, 선생님이 쉽게 다시 알려줄게! 😊',
        translations: {
          en: 'Okay, I will explain it again simply!',
          vi: 'Được rồi, để cô giảng lại thật dễ hiểu nhé!',
          bn: 'ঠিক আছে, শিক্ষক তোমাকে সহজ করে আবার বুঝিয়ে দিচ্ছেন!',
          zh: '好的，老师会简单地重新教你！😊',
          ru: 'Хорошо, учитель объяснит еще раз понятно! 😊',
          ja: 'いいよ、先生がわかりやすくもう一度教えるね！😊',
          mn: 'Тэгэлгүй яахав, багш нь дахиад амархнаар зааж өгье! 😊'
        }
      },
      {
        ko: '선생님 연필 빌려줄게요. 자 여기! ✏️',
        translations: {
          en: "I'll lend you a pencil. Here you go!",
          vi: 'Cô cho em mượn bút chì nhé, đây này!',
          bn: 'আমি তোমাকে পেন্সিল ধার দিচ্ছি। এই নাও!',
          zh: '老师借你铅笔，给你！✏️',
          ru: 'Я одолжу тебе карандаш. Держи! ✏️',
          ja: '先生の鉛筆を貸してあげるね。はいどうぞ！✏️',
          mn: 'Багш нь харандаагаа зээлье, май энийг ав! ✏️'
        }
      },
      {
        ko: '선생님한테 다 이야기해줘서 고마워요. 🤝',
        translations: {
          en: 'Thank you for telling me. Teacher will help.',
          vi: 'Cảm ơn em đã nói với thầy/cô, thầy/cô sẽ giải quyết.',
          bn: 'আমাকে জানানোর জন্য ধন্যবাদ। আমি সাহায্য করছি।',
          zh: '谢谢你告诉老师，老师会帮你的。🤝',
          ru: 'Спасибо, что рассказал(а) мне. Я разберусь. 🤝',
          ja: '先生にお話ししてくれてありがとう。助けるからね。🤝',
          mn: 'Багшдаа хэлсэнд баярлалаа, багш нь тусална аа. 🤝'
        }
      }
    ]
  }
];
