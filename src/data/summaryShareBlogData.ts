import { AdminSummaryLang, ADMIN_SUMMARY_LANGUAGES } from './summaryTranslations';

export interface SummaryShareCoverCopy {
  langBadge: string;
  mainTitle: string;
  subTitle: string;
  packBadge: string;
  sheetLabels: [string, string, string, string, string, string];
  classroomPagesBadge: string;
  footerLeft: string;
}

export interface SummaryShareBlogDraft {
  title: string;
  body: string;
  tags: string;
  updatedAt?: number;
}

export type SummaryShareDraftMap = Partial<Record<AdminSummaryLang, SummaryShareBlogDraft>>;

export const SUMMARY_SHARE_DRAFTS_STORAGE_KEY = 'haebol_summary_share_blog_drafts_v1';

export const SUMMARY_SHARE_COVER_COPY: Record<AdminSummaryLang, SummaryShareCoverCopy> = {
  ko: {
    langBadge: '🇰🇷 한국어 원판 (교사용)',
    mainTitle: '한국어 기초 총정리표 6종',
    subTitle: '자음·모음·받침·용언·조사·필수 교실 한국어 300',
    packBadge: '총 6종 · A4 13장',
    sheetLabels: [
      '01 한국어 자음',
      '02 한국어 모음',
      '03 한국어 받침',
      '04 용언 활용 (2장)',
      '05 조사 결합 규칙 (2장)',
      '06 필수 교실 한국어 300',
    ],
    classroomPagesBadge: '6장 세트',
    footerLeft: '본문 PNG 이미지 + A4 인쇄용 PDF 무료 나눔',
  },
  en: {
    langBadge: '🇺🇸 영어 버전 · English Ver.',
    mainTitle: '한국어 기초 총정리표 6종 (영어)',
    subTitle: 'Korean Master Charts · 6 Types (13 A4 Pages · English)',
    packBadge: '6 Types · 13 Pages',
    sheetLabels: [
      '01 Consonants · 자음',
      '02 Vowels · 모음',
      '03 Batchim · 받침',
      '04 Verb Conjugation (2p)',
      '05 Particles (2p)',
      '06 Classroom Korean 300',
    ],
    classroomPagesBadge: '6 Pages',
    footerLeft: 'Free PNG Preview + Printable A4 PDF Download',
  },
  vi: {
    langBadge: '🇻🇳 베트남어 버전 · Tiếng Việt',
    mainTitle: '한국어 기초 총정리표 6종 (베트남어)',
    subTitle: 'Bộ 6 Bảng Tổng Hợp Tiếng Hàn (13 Trang A4 · Tiếng Việt)',
    packBadge: '6 Loại · 13 Trang',
    sheetLabels: [
      '01 Phụ âm · 자음',
      '02 Nguyên âm · 모음',
      '03 Batchim · 받침',
      '04 Chia động từ (2 trang)',
      '05 Tiểu từ (2 trang)',
      '06 Tiếng Hàn Lớp Học 300',
    ],
    classroomPagesBadge: '6 Trang',
    footerLeft: 'Tải miễn phí ảnh PNG + file PDF khổ A4',
  },
  bn: {
    langBadge: '🇧🇩 벵골어 버전 · বাংলা',
    mainTitle: '한국어 기초 총정리표 6종 (벵골어)',
    subTitle: 'কোরিয়ান ভাষার ৬টি সম্পূর্ণ চার্ট (১৩ পৃষ্ঠা A4 · বাংলা)',
    packBadge: '৬ ধরন · ১৩ পৃষ্ঠা',
    sheetLabels: [
      '01 ব্যঞ্জনবর্ণ · 자음',
      '02 স্বরবর্ণ · 모음',
      '03 বাচ্ছিম · 받침',
      '04 ক্রিয়া রূপ (২ পৃষ্ঠা)',
      '05 অব্যয় (২ পৃষ্ঠা)',
      '06 শ্রেণিকক্ষ কোরিয়ান ৩০০',
    ],
    classroomPagesBadge: '৬ পৃষ্ঠা',
    footerLeft: 'ফ্রি PNG ছবি + A4 প্রিন্টযোগ্য PDF ডাউনলোড',
  },
  zh: {
    langBadge: '🇨🇳 중국어 버전 · 中文版',
    mainTitle: '한국어 기초 총정리표 6종 (중국어)',
    subTitle: '韩语基础总整理表 6种套装 (A4 共13页 · 中文版)',
    packBadge: '6种 · 共13页',
    sheetLabels: [
      '01 韩语辅音 · 자음',
      '02 韩语元音 · 모음',
      '03 韩语收音 · 받침',
      '04 谓词活用 (2页)',
      '05 助词结合 (2页)',
      '06 教室必学韩语 300',
    ],
    classroomPagesBadge: '共6页',
    footerLeft: '高清 PNG 预览图 + A4 打印版 PDF 免费分享',
  },
  ru: {
    langBadge: '🇷🇺 러시아어 버전 · Русский',
    mainTitle: '한국어 기초 총정리표 6종 (러시아어)',
    subTitle: 'Сводные таблицы корейского языка · 6 видов (13 стр. A4)',
    packBadge: '6 видов · 13 стр.',
    sheetLabels: [
      '01 Согласные · 자음',
      '02 Гласные · 모음',
      '03 Патчим · 받침',
      '04 Спряжение (2 стр.)',
      '05 Частицы (2 стр.)',
      '06 Школьный корейский 300',
    ],
    classroomPagesBadge: '6 стр.',
    footerLeft: 'Бесплатные PNG-карточки + A4 PDF для печати',
  },
  ja: {
    langBadge: '🇯🇵 일본어 버전 · 日本語版',
    mainTitle: '한국어 기초 총정리표 6종 (일본어)',
    subTitle: '韓国語基礎まとめ表 6種セット (A4 全13枚 · 日本語版)',
    packBadge: '6種 · 全13枚',
    sheetLabels: [
      '01 韓国語子音 · 자음',
      '02 韓国語母音 · 모음',
      '03 パッチム · 받침',
      '04 用言活用 (2枚)',
      '05 助詞結合 (2枚)',
      '06 教室韓国語 300表現',
    ],
    classroomPagesBadge: '6枚セット',
    footerLeft: 'PNG画像プレビュー + A4印刷用PDF 無料配布',
  },
  mn: {
    langBadge: '🇲🇳 몽골어 버전 · Монгол',
    mainTitle: '한국어 기초 총정리표 6종 (몽골어)',
    subTitle: 'Солонгос хэлний 6 төрлийн хураангуй хүснэгт (A4 · 13 хуудас)',
    packBadge: '6 төрөл · 13 хуудас',
    sheetLabels: [
      '01 Гийгүүлэгч · 자음',
      '02 Эгшиг · 모음',
      '03 Дэвсгэр үсэг · 받침',
      '04 Үйл үг хувиргалт (2 х.)',
      '05 Нөхцөл (2 х.)',
      '06 Ангийн солонгос хэл 300',
    ],
    classroomPagesBadge: '6 хуудас',
    footerLeft: 'Үнэгүй PNG зураг + A4 хэвлэх PDF татах',
  },
};

export type SummaryShareEdition = 'expanded' | 'compact';

export const SUMMARY_SHARE_COMPACT_COVER_COPY: Record<'ko' | 'en', SummaryShareCoverCopy> = {
  ko: {
    langBadge: '🇰🇷 한국어 원판 · 압축판',
    mainTitle: '한국어 기초 총정리표 6종 (압축판)',
    subTitle: '자음·모음·받침·용언·조사·필수 교실 한국어 300',
    packBadge: '총 6종 · A4 8장',
    sheetLabels: [
      '01 한국어 자음',
      '02 한국어 모음',
      '03 한국어 받침',
      '04 용언 활용 (1장 압축)',
      '05 조사 결합 규칙 (1장 압축)',
      '06 필수 교실 한국어 300',
    ],
    classroomPagesBadge: '3장 압축',
    footerLeft: '한 장에 꽉 담은 압축 8장 · PNG + A4 PDF 무료 나눔',
  },
  en: {
    langBadge: '🇺🇸 영어 압축판 · Compact Ver.',
    mainTitle: '한국어 기초 총정리표 6종 (영어 압축판)',
    subTitle: 'Korean Master Charts · 6 Types (Compact 8 A4 Pages)',
    packBadge: '6 Types · 8 Pages',
    sheetLabels: [
      '01 Consonants · 자음',
      '02 Vowels · 모음',
      '03 Batchim · 받침',
      '04 Verb Conjugation (1p)',
      '05 Particles (1p)',
      '06 Classroom Korean 300',
    ],
    classroomPagesBadge: '3 Pages',
    footerLeft: 'Compact 8-Page Edition · Free PNG + Printable A4 PDF',
  },
};

function buildForeignLanguageDraft(params: {
  lang: AdminSummaryLang;
  langKo: string;
  nativeName: string;
  nativeTitle: string;
  nativeIntro: string;
  nativeItems: [string, string, string, string, string, string];
  nativeDownloadNote: string;
  extraTags: string;
}): SummaryShareBlogDraft {
  const {
    langKo,
    nativeName,
    nativeTitle,
    nativeIntro,
    nativeItems,
    nativeDownloadNote,
    extraTags,
  } = params;

  return {
    title: `[무료 나눔] ${langKo}(${nativeName}) 한국어 기초 총정리표 6종(13장) PNG · PDF | ${nativeTitle}`,
    body: [
      `안녕하세요, 해볼쌤입니다!`,
      `다문화 학생, 외국인 초급 학습자, 한국어 교실 수업을 위해 직접 정리한`,
      `「한국어 기초 총정리표 6종 (총 13장) — ${langKo}(${nativeName}) 버전」을 무료로 나눕니다.`,
      ``,
      `글자가 잘리지 않고 시원하게 읽히도록 A4 가로 맞춤 판형으로 구성해, 인쇄·코팅하거나 파일철에 끼워 두고 바로 참고하기 좋습니다.`,
      ``,
      `[${nativeName}]`,
      nativeIntro,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `■ 총정리표 구성 안내 (총 6종 · A4 13장)`,
      `━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `1. 한국어 자음 총정리표 (1장)`,
      `   - 기본 자음 14자 + 쌍자음 5자, 자음 이름과 [앞 / 뒤] 로마자 발음 안내`,
      `   - ${nativeItems[0]}`,
      `   [여기에 ${langKo} 자음 총정리표 PNG 첨부]`,
      ``,
      `2. 한국어 모음 총정리표 (1장)`,
      `   - 기본 모음 10자 + 복합 모음 11자, 이름·로마자 및 유사 소리 발음 팁`,
      `   - ${nativeItems[1]}`,
      `   [여기에 ${langKo} 모음 총정리표 PNG 첨부]`,
      ``,
      `3. 한국어 받침 총정리표 (1장)`,
      `   - 7개 대표 받침 소리와 받침 가족, 겹받침 11자 한눈에 정리`,
      `   - ${nativeItems[2]}`,
      `   [여기에 ${langKo} 받침 총정리표 PNG 첨부]`,
      ``,
      `4. 한국어 용언(규칙·불규칙) 활용 총정리표 (2장 세트)`,
      `   - ① 현재·과거 핵심 활용형 + 30단원 문형 5×4 카드표 / ② 규칙 활용 3가지 + 7대 불규칙 정리`,
      `   - ${nativeItems[3]}`,
      `   [여기에 ${langKo} 용언 활용 총정리표 PNG 1~2쪽 첨부]`,
      ``,
      `5. 한국어 조사(명사와 결합 규칙 포함) 총정리표 (2장 세트)`,
      `   - ① 필수 조사 30단원 4×6 와이드 카드표 / ② 받침 O/X/ㄹ 짝꿍 결합표 + ★ 변신 예외 정리`,
      `   - ${nativeItems[4]}`,
      `   [여기에 ${langKo} 조사 결합 총정리표 PNG 1~2쪽 첨부]`,
      ``,
      `6. 필수 교실 한국어 표현 300 (6장 세트)`,
      `   - 학교·교실 생활 핵심 어휘·표현 300개 (5단원씩 6쪽: 1~5 / 6~10 / 11~15 / 16~20 / 21~25 / 26~30단원)`,
      `   - ${nativeItems[5]}`,
      `   [여기에 ${langKo} 교실 한국어 300 총정리표 PNG 1~6쪽 첨부]`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `■ 고화질 PDF 다운로드 & 활용 팁`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `• 위 PNG 이미지를 저장해 스마트폰·태블릿으로 보시거나, 아래 A4 인쇄용 PDF 파일을 내려받아 출력해 사용해 주세요.`,
      `• ${nativeDownloadNote}`,
      `[여기에 ${langKo} 총정리표 6종(13장) 통합 PDF 파일 첨부]`,
      ``,
      `• 인쇄 시 'A4 가로 방향 / 용지에 맞춤' 옵션을 선택하면 가장 깔끔합니다.`,
      `• 학교 수업, 방과후 한국어 교실, 가정 학습 등 비상업적 교육 목적으로 자유롭게 활용하실 수 있습니다. (무단 재배포 및 상업적 판매 금지)`,
      ``,
      `도움이 되셨다면 공감과 댓글로 응원해 주세요! 다른 언어 버전 총정리표도 차례대로 이어서 공유할게요 :)`,
    ].join('\n'),
    tags: `#해볼한국어 #한국어총정리표 #한국어무료학습지 #${langKo}한국어 #다문화한국어 #한국어기초 #한국어자음모음 #한국어받침 #한국어용언활용 #한국어조사 #교실한국어300 ${extraTags}`,
  };
}

export const DEFAULT_SUMMARY_SHARE_DRAFTS: Record<AdminSummaryLang, SummaryShareBlogDraft> = {
  ko: {
    title: '[무료 나눔] 한국어 기초 총정리표 6종(총 13장) A4 PDF · PNG | 자음·모음·받침·용언·조사·교실한국어 300',
    body: [
      `안녕하세요, 해볼쌤입니다!`,
      `한국어 교실 수업과 초급 학습자 지도를 위해 한 장씩 깔끔하게 정리한`,
      `「해볼 한국어 기초 총정리표 6종 (A4 총 13장) — 한국어 교사용 원판」을 무료로 나눕니다.`,
      ``,
      `한글 기초(자음·모음·받침)부터 학습자들이 가장 어려워하는 용언 규칙·불규칙 활용, 조사와 명사 결합 규칙, 그리고 학교 생활에 꼭 필요한 교실 한국어 300표현까지 시원한 A4 가로 판형으로 모아 두었습니다.`,
      `앞으로 한국어 원판을 시작으로 영어·베트남어·벵골어·중국어·러시아어·일본어·몽골어까지 총 8개 언어 버전을 하나씩 무료 나눔할 예정입니다!`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `■ 총정리표 구성 안내 (총 6종 · A4 13장)`,
      `━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `1. 한국어 자음 총정리표 (1장)`,
      `   - 기본 자음 14자 + 쌍자음 5자, 한글 이름과 발음 로마자 [앞 / 뒤] 읽는 법 정리`,
      `   [여기에 한국어 자음 총정리표 PNG 첨부]`,
      ``,
      `2. 한국어 모음 총정리표 (1장)`,
      `   - 기본 모음 10자 + 복합 모음 11자, 이름·로마자 표기와 소리가 비슷한 복합 모음 발음 팁`,
      `   [여기에 한국어 모음 총정리표 PNG 첨부]`,
      ``,
      `3. 한국어 받침 총정리표 (1장)`,
      `   - 7개 대표 받침 소리, 받침 가족 묶음, 겹받침 11자 대표 발음 총정리`,
      `   [여기에 한국어 받침 총정리표 PNG 첨부]`,
      ``,
      `4. 한국어 용언(규칙·불규칙) 활용 총정리표 (2장 세트)`,
      `   - ① 현재·과거 핵심 활용 + 5×4 필수 문형 20종 / ② 규칙 활용 3가지 + 7대 불규칙 활용 정리`,
      `   [여기에 한국어 용언 활용 총정리표 PNG 1~2쪽 첨부]`,
      ``,
      `5. 한국어 조사(명사와 결합 규칙 포함) 총정리표 (2장 세트)`,
      `   - ① 필수 조사 30단원 4×6 와이드 카드표 / ② 받침 O/X/ㄹ 짝꿍 결합표 + ★ 변화형 예외 정리`,
      `   [여기에 한국어 조사 결합 총정리표 PNG 1~2쪽 첨부]`,
      ``,
      `6. 필수 교실 한국어 표현 300 (6장 세트)`,
      `   - 초등·한국어 교실에서 매일 쓰는 필수 어휘·표현 300개 (5단원씩 6쪽: 1~5 / 6~10 / 11~15 / 16~20 / 21~25 / 26~30단원)`,
      `   [여기에 교실 한국어 300 총정리표 PNG 1~6쪽 첨부]`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `■ 고화질 PDF 다운로드 & 활용 팁`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `• 화면으로 바로 보실 분은 본문 PNG 이미지를 참고하시고, 출력용은 아래 PDF 파일을 다운로드해 주세요.`,
      `[여기에 한국어 교사용 원판 총정리표 6종(13장) 통합 PDF 파일 첨부]`,
      ``,
      `• A4 가로 방향으로 출력해 코팅하거나 학생 클리어파일 맨 앞·뒷장에 끼워 두면 수업 중 참고표로 활용도가 아주 높습니다.`,
      `• 학교 수업, 한국어 학급, 가정 지도 등 비상업적 교육 목적으로 자유롭게 사용하실 수 있습니다. (무단 재배포·상업적 이용 금지)`,
      ``,
      `현장에서 아이들과 한국어 공부하는 데 작은 보탬이 되길 바랍니다. 필요하신 언어 버전이 있다면 댓글로 남겨 주세요 :)`,
    ].join('\n'),
    tags: '#해볼한국어 #한국어총정리표 #한국어학습지무료나눔 #한글자음모음표 #한국어받침표 #한국어용언활용 #한국어불규칙활용 #한국어조사정리 #교실한국어300 #다문화한국어교육 #한국어교사자료',
  },
  en: buildForeignLanguageDraft({
    lang: 'en',
    langKo: '영어',
    nativeName: 'English',
    nativeTitle: 'Free Korean Master Charts (6 Types · 13 A4 Pages)',
    nativeIntro:
      'Free printable Korean study reference set in English! All 6 essential Korean master charts (13 A4 landscape pages) designed for beginners, students, and classrooms.',
    nativeItems: [
      '14 basic + 5 double consonants with Korean names & [Initial / Final] pronunciation guide',
      '10 basic + 11 compound vowels with romanization & similar-sound tips',
      '7 representative final consonant (Batchim) sounds & 11 double batchim rules',
      'Present/past conjugation, 20 essential patterns & 7 irregular verb rules (2 A4 sheets)',
      '30 essential particles with noun-combination rules & exceptions (2 A4 sheets)',
      '300 essential classroom & school Korean words/expressions across 6 A4 sheets',
    ],
    nativeDownloadNote:
      'Download the printable A4 landscape PDF file attached below for crisp classroom or home study use.',
    extraTags: '#LearnKorean #KoreanCharts #HangulChart #KoreanGrammarPDF',
  }),
  vi: buildForeignLanguageDraft({
    lang: 'vi',
    langKo: '베트남어',
    nativeName: 'Tiếng Việt',
    nativeTitle: 'Bộ 6 Bảng Tổng Hợp Tiếng Hàn (13 Trang A4)',
    nativeIntro:
      'Chia sẻ miễn phí bộ 6 bảng tổng hợp tiếng Hàn cơ bản bằng tiếng Việt (gồm 13 trang A4 ngang) dành cho học sinh và người mới học tiếng Hàn.',
    nativeItems: [
      '14 phụ âm cơ bản + 5 phụ âm đôi và cách đọc [Âm đầu / Âm cuối]',
      '10 nguyên âm cơ bản + 11 nguyên âm ghép cùng mẹo phân biệt âm giống nhau',
      '7 âm cuối đại diện (Batchim) và 11 phụ âm cuối kép dễ nhớ',
      'Cách chia động từ/tính từ (20 mẫu câu & 7 quy tắc bất quy tắc — 2 trang A4)',
      '30 bài tiểu từ tiếng Hàn và quy tắc kết hợp với danh từ (2 trang A4)',
      '300 từ vựng & biểu hiện tiếng Hàn thiết yếu trong lớp học (6 trang A4)',
    ],
    nativeDownloadNote:
      'Bạn có thể xem trước ảnh PNG trong bài hoặc tải tệp PDF khổ A4 ngang bên dưới để in ra học.',
    extraTags: '#HocTiengHan #BangChuCaiTiengHan #NguPhapTiengHan #베트남어한국어',
  }),
  bn: buildForeignLanguageDraft({
    lang: 'bn',
    langKo: '벵골어',
    nativeName: 'বাংলা',
    nativeTitle: 'কোরিয়ান ভাষার ৬টি সম্পূর্ণ চার্ট (১৩ পৃষ্ঠা A4)',
    nativeIntro:
      'বাংলা ভাষায় কোরিয়ান শেখার জন্য ৬ ধরনের সম্পূর্ণ রেফারেন্স চার্ট (মোট ১৩টি A4 পৃষ্ঠা) একদম ফ্রি শেয়ার করা হলো।',
    nativeItems: [
      '১৪টি মৌলিক ও ৫টি যুগ্ম ব্যঞ্জনবর্ণ এবং [শুরু / শেষ] উচ্চারণ গাইড',
      '১০টি মৌলিক ও ১১টি যৌগিক স্বরবর্ণ এবং উচ্চারণের সহজ টিপস',
      '৭টি মূল বাচ্ছিম (Batchim) শব্দ এবং ১১টি যুগ্ম বাচ্ছিমের নিয়ম',
      'ক্রিয়া ও বিশেষণের রূপান্তর (নিয়মিত ও ৭টি অনিয়মিত নিয়ম — ২ পৃষ্ঠা)',
      '৩০টি প্রয়োজনীয় কোরিয়ান অব্যয় (조사) ও বিশেষ্যের সাথে যুক্ত হওয়ার নিয়ম (২ পৃষ্ঠা)',
      'শ্রেণিকক্ষের ৩০০টি প্রয়োজনীয় কোরিয়ান শব্দ ও বাক্য (৬ পৃষ্ঠা)',
    ],
    nativeDownloadNote:
      'প্রিন্ট করে পড়ার জন্য নিচে সংযুক্ত উচ্চমানের A4 PDF ফাইলটি ডাউনলোড করুন।',
    extraTags: '#BanglaKorean #LearnKoreanBangla #벵골어한국어',
  }),
  zh: buildForeignLanguageDraft({
    lang: 'zh',
    langKo: '중국어',
    nativeName: '中文',
    nativeTitle: '韩语基础总整理表 6种套装 (A4 共13页)',
    nativeIntro:
      '免费分享中文版《韩语基础总整理表》6种完整套装（共13页A4横向），涵盖韩语发音、收音、谓词活用、助词结合规则与300个教室必学表达。',
    nativeItems: [
      '14个基本辅音 + 5个紧音（双辅音），附首音/收音发音指南',
      '10个基本元音 + 11个复合元音，附相似发音辨析小贴士',
      '7个代表收音发音规律与11个双收音一页整理',
      '韩语谓词规则活用、20个核心句型与7大不规则活用总表（共2页A4）',
      '30个核心助词及与名词结合规则（有/无收音及特殊变化，共2页A4）',
      '学校与课堂必学韩语300词与实用表达（共6页A4）',
    ],
    nativeDownloadNote:
      '正文附有高清 PNG 预览图，如需打印学习请下载下方 A4 横向整合版 PDF 文件。',
    extraTags: '#韩语学习 #韩语语法整理 #韩语发音表 #중국어한국어',
  }),
  ru: buildForeignLanguageDraft({
    lang: 'ru',
    langKo: '러시아어',
    nativeName: 'Русский',
    nativeTitle: 'Сводные таблицы корейского языка · 6 видов (13 стр. A4)',
    nativeIntro:
      'Делимся бесплатно комплектом из 6 сводных таблиц по базовому корейскому языку на русском языке (всего 13 страниц A4 альбомного формата).',
    nativeItems: [
      '14 базовых + 5 сдвоенных согласных и чтение [в начале / в конце слога]',
      '10 базовых + 11 составных гласных и подсказки по схожим звукам',
      '7 базовых звуков патчима (подслога) и 11 двойных патчимов',
      'Спряжение глаголов и прилагательных: 20 моделей и 7 исключений (2 стр. A4)',
      '30 основных частиц и правила их присоединения к существительным (2 стр. A4)',
      '300 нужных школьных слов и выражений на корейском языке (6 листов A4)',
    ],
    nativeDownloadNote:
      'Ниже прикреплён PDF-файл формата A4 в высоком качестве — скачивайте и печатайте для занятий.',
    extraTags: '#КорейскийЯзык #Хангыль #ГрамматикаКорейского #러시아어한국어',
  }),
  ja: buildForeignLanguageDraft({
    lang: 'ja',
    langKo: '일본어',
    nativeName: '日本語',
    nativeTitle: '韓国語基礎まとめ表 6種セット (A4 全13枚)',
    nativeIntro:
      '韓国語初級学習者・教室授業向けに整理した「韓国語基礎まとめ表 6種セット（A4横・全13枚）日本語版」を無料配布します。',
    nativeItems: [
      '基本子音14文字＋濃音5文字、文字名と［語頭／パッチム］発音ガイド',
      '基本母音10文字＋合成母音11文字、似た発音の区別ポイント',
      '7つの代表パッチム発音と11個の二重パッチム一覧',
      '用言（動詞・形容詞）の規則活用・必須文型20種・7大不規則活用まとめ（2枚セット）',
      '必須助詞30単元と名詞結合ルール（パッチム有無・例外変化・2枚セット）',
      '学校・教室で毎日使う必須韓国語300表現（6枚セット）',
    ],
    nativeDownloadNote:
      'スマホ閲覧用のPNG画像と、印刷に最適なA4横向きPDFファイルを添付しています。',
    extraTags: '#韓国語勉強 #ハングル一覧表 #韓国語文法 #일본어한국어',
  }),
  mn: buildForeignLanguageDraft({
    lang: 'mn',
    langKo: '몽골어',
    nativeName: 'Монгол',
    nativeTitle: 'Солонгос хэлний 6 төрлийн хураангуй хүснэгт (A4 · 13 хуудас)',
    nativeIntro:
      'Солонгос хэл анхлан суралцагчид болон сурагчдад зориулсан 6 төрлийн хураангуй хүснэгтийг (нийт 13 хуудас A4, Монгол хэлээр) үнэгүй хуваалцаж байна.',
    nativeItems: [
      '14 үндсэн гийгүүлэгч + 5 давхар гийгүүлэгч ба [эхэн / адаг] дуудлага',
      '10 үндсэн эгшиг + 11 нийлмэл эгшиг ба ижил дуудлагын зөвлөмж',
      '7 үндсэн дэвсгэр үсгийн (Batchim) дуудлага ба 11 давхар дэвсгэр үсэг',
      'Үйл үг, тэмдэг нэрийн хувиргалт ба 7 дүрэм бус хувиргалт (2 хуудас A4)',
      'Солонгос хэлний 30 нөхцөл ба нэр үгтэй залгах дүрэм (2 хуудас A4)',
      'Сургууль, ангид хэрэглэгдэх 300 чухал үг хэллэг (6 хуудас A4)',
    ],
    nativeDownloadNote:
      'Доор хавсаргасан өндөр нягтралтай A4 PDF файлыг татан авч хэвлэн ашиглаарай.',
    extraTags: '#СолонгосХэл #Хангыл #몽골어한국어',
  }),
};

export function loadSummaryShareDrafts(): SummaryShareDraftMap {
  try {
    const raw = localStorage.getItem(SUMMARY_SHARE_DRAFTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveSummaryShareDraft(lang: AdminSummaryLang, draft: SummaryShareBlogDraft): SummaryShareDraftMap {
  const current = loadSummaryShareDrafts();
  const next: SummaryShareDraftMap = {
    ...current,
    [lang]: {
      title: draft.title,
      body: draft.body,
      tags: draft.tags,
      updatedAt: Date.now(),
    },
  };
  try {
    localStorage.setItem(SUMMARY_SHARE_DRAFTS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore storage quota errors
  }
  return next;
}

export function resetSummaryShareDraft(lang: AdminSummaryLang): SummaryShareDraftMap {
  const current = loadSummaryShareDrafts();
  const next: SummaryShareDraftMap = { ...current };
  delete next[lang];
  try {
    localStorage.setItem(SUMMARY_SHARE_DRAFTS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function getSummaryLangOption(lang: AdminSummaryLang) {
  return ADMIN_SUMMARY_LANGUAGES.find((l) => l.code === lang) || ADMIN_SUMMARY_LANGUAGES[0];
}
