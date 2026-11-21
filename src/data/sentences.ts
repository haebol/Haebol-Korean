export interface ClassroomPhrase {
  id: string;
  category: 'student_talk' | 'teacher_command';
  icon: string;
  ko: string;
  pronounceKo?: string;
  en: string;
  vi: string;
  bn: string;
  situation: string;
}

export const CLASSROOM_PHRASES: ClassroomPhrase[] = [
  // Student Expressions (선생님 & 친구에게 말해요)
  {
    id: 'st-1',
    category: 'student_talk',
    icon: '✨',
    ko: '선생님, 다 했어요!',
    en: "Teacher, I'm finished!",
    vi: 'Thầy/Cô ơi, em làm xong rồi ạ!',
    bn: 'শিক্ষক, আমার করা শেষ হয়েছে!',
    situation: '문제나 과제를 다 풀었을 때 (When finished with work)'
  },
  {
    id: 'st-2',
    category: 'student_talk',
    icon: '❓',
    ko: '선생님, 몇 쪽이에요?',
    en: 'Teacher, which page is it?',
    vi: 'Thầy/Cô ơi, trang bao nhiêu ạ?',
    bn: 'শিক্ষক, কত পৃষ্ঠা খুলব?',
    situation: '교과서 쪽수를 모를 때 (When unsure of the page)'
  },
  {
    id: 'st-3',
    category: 'student_talk',
    icon: '✏️',
    ko: '지우개 빌려줄 수 있어?',
    en: 'Can you lend me an eraser?',
    vi: 'Cậu cho tớ mượn cục tẩy được không?',
    bn: 'আমাকে কি একটি ইরেজার ধার দেবে?',
    situation: '친구에게 학용품을 빌릴 때 (Borrowing from a classmate)'
  },
  {
    id: 'st-4',
    category: 'student_talk',
    icon: '🔁',
    ko: '선생님, 다시 말씀해 주세요.',
    en: 'Teacher, please say it again.',
    vi: 'Thầy/Cô ơi, xin nhắc lại giúp em với ạ.',
    bn: 'শিক্ষক, দয়া করে আরেকবার বলুন।',
    situation: '선생님 말씀을 잘 못 들었을 때 (When you missed the teacher\'s words)'
  },
  {
    id: 'st-5',
    category: 'student_talk',
    icon: '🍱',
    ko: '더 먹어도 돼요?',
    en: 'May I have seconds for lunch?',
    vi: 'Em lấy thêm thức ăn được không ạ?',
    bn: 'আমি কি আরও খাবার নিতে পারি?',
    situation: '급식실에서 반찬이나 밥을 더 받고 싶을 때 (Asking for more food at lunch)'
  },
  {
    id: 'st-6',
    category: 'student_talk',
    icon: '🤝',
    ko: '나도 같이 놀아도 돼?',
    en: 'Can I play with you too?',
    vi: 'Tớ chơi cùng các cậu được không?',
    bn: 'আমিও কি তোমাদের সাথে খেলতে পারি?',
    situation: '친구들 놀이에 참여하고 싶을 때 (Joining friends in play)'
  },
  {
    id: 'st-7',
    category: 'student_talk',
    icon: '🎒',
    ko: '연필을 집에 두고 왔어요.',
    en: 'I left my pencil at home.',
    vi: 'Em quên bút chì ở nhà rồi ạ.',
    bn: 'আমি পেন্সিল বাড়িতে ফেলে এসেছি।',
    situation: '준비물을 깜빡했을 때 (When you forgot school supplies)'
  },
  {
    id: 'st-8',
    category: 'student_talk',
    icon: '🙋',
    ko: '제가 발표해 볼게요!',
    en: 'I will try to present / answer!',
    vi: 'Em xin phép được phát biểu ạ!',
    bn: 'আমি উত্তর বলতে চাই!',
    situation: '수업 시간에 손들고 발표할 때 (Volunteering to answer in class)'
  },

  // Teacher Commands (선생님 말씀 듣기)
  {
    id: 'tc-1',
    category: 'teacher_command',
    icon: '🪑',
    ko: '제자리에 앉으세요.',
    en: 'Please sit in your seat.',
    vi: 'Các em hãy về chỗ ngồi.',
    bn: 'সবাই নিজ নিজ আসনে বসো।',
    situation: '수업 시작 종이 울렸을 때 (When the class bell rings)'
  },
  {
    id: 'tc-2',
    category: 'teacher_command',
    icon: '📖',
    ko: '교과서 10쪽을 펴세요.',
    en: 'Open your textbook to page 10.',
    vi: 'Hãy mở sách giáo khoa trang 10.',
    bn: 'পাঠ্যবইয়ের ১০ পৃষ্ঠা খোলো।',
    situation: '교과서로 공부를 시작할 때 (Starting study with textbook)'
  },
  {
    id: 'tc-3',
    category: 'teacher_command',
    icon: '👀',
    ko: '칠판과 앞을 보세요.',
    en: 'Look at the board and the front.',
    vi: 'Nhìn lên bảng và chú ý lên phía trước.',
    bn: 'বোর্ডের দিকে এবং সামনের দিকে তাকাও।',
    situation: '선생님이 설명하실 때 (When teacher is explaining)'
  },
  {
    id: 'tc-4',
    category: 'teacher_command',
    icon: '🤫',
    ko: '조용히 하고 귀를 기울여요.',
    en: 'Be quiet and listen carefully.',
    vi: 'Trật tự và chú ý lắng nghe nào.',
    bn: 'শান্ত হয়ে মনোযোগ দিয়ে শোনো।',
    situation: '교실이 시끄러울 때 (When the classroom is loud)'
  },
  {
    id: 'tc-5',
    category: 'teacher_command',
    icon: '🚶‍♂️',
    ko: '복도에서 뛰지 말고 걸어요.',
    en: "Don't run in the hallway, walk safely.",
    vi: 'Không chạy ở hành lang, hãy đi bộ cẩn thận.',
    bn: 'করিডোরে দৌড়াদৌড়ি না করে হেঁটে চলো।',
    situation: '이동하거나 쉬는 시간에 (During passing period or break)'
  },
  {
    id: 'tc-6',
    category: 'teacher_command',
    icon: '👫',
    ko: '키 순서대로 줄을 서세요.',
    en: 'Please line up in order.',
    vi: 'Các em xếp hàng theo thứ tự nhé.',
    bn: 'সবাই ক্রমানুসারে লাইনে দাঁড়াও।',
    situation: '급식실이나 강당으로 갈 때 (Lining up for lunch or auditorium)'
  },
  {
    id: 'tc-7',
    category: 'teacher_command',
    icon: '📥',
    ko: '학습지를 앞으로 내세요.',
    en: 'Pass your worksheets to the front.',
    vi: 'Thu phiếu học tập nộp lên bàn đầu.',
    bn: 'ওয়ার্কশিটগুলো সামনের দিকে জমা দাও।',
    situation: '활동이 끝나고 종이를 걷을 때 (Collecting worksheets)'
  },
  {
    id: 'tc-8',
    category: 'teacher_command',
    icon: '🎒',
    ko: '책상을 정리하고 가방을 싸세요.',
    en: 'Clean your desk and pack your bags.',
    vi: 'Dọn dẹp bàn học và thu dọn cặp sách.',
    bn: 'টেবিল গুছিয়ে ব্যাগ তৈরি করো।',
    situation: '학교가 끝날 때 (At the end of the school day)'
  }
];
