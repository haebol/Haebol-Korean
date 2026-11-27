export type ParticleUnitId =
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

export interface ParticleUnitMetaItem {
  id: ParticleUnitId;
  circled: string;
  layoutType: 'cols5' | 'rows5';
  title: string;
  sheetHeaderTitle: string;
  grammar: string;
  tipHeaderTitle: string;
  keywords: string[];
}

export const PARTICLE_UNIT_1_TO_15_META: ParticleUnitMetaItem[] = [
  {
    id: 'unit1',
    circled: '①',
    layoutType: 'cols5',
    title: '주제 (은, 는)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ① 주제 (은, 는)',
    grammar: '-은, -는',
    tipHeaderTitle: '해볼쌤 팁 | -은, -는',
    keywords: ['나', '친구', '동생', '선생님', '가방'],
  },
  {
    id: 'unit2',
    circled: '②',
    layoutType: 'cols5',
    title: '소개 (이에요, 예요)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ② 소개 (이에요, 예요)',
    grammar: '-이에요, -예요',
    tipHeaderTitle: '해볼쌤 팁 | -이에요, -예요',
    keywords: ['학생', '연필', '저것', '의자', '지우개'],
  },
  {
    id: 'unit3',
    circled: '③',
    layoutType: 'rows5',
    title: '문장 만들기 1 (은, 는, 이에요, 예요)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ③ 문장 만들기 1 (은, 는, 이에요, 예요)',
    grammar: '주어 + 신분 문장',
    tipHeaderTitle: '해볼쌤 팁 | [주어+은/는] + [명사+이에요/예요]',
    keywords: ['나는 남자예요', '너는 여자예요', '친구는 학생이에요'],
  },
  {
    id: 'unit4',
    circled: '④',
    layoutType: 'cols5',
    title: '주격 (이, 가)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ④ 주격 (이, 가)',
    grammar: '-이, -가',
    tipHeaderTitle: '해볼쌤 팁 | -이, -가',
    keywords: ['물', '책', '약', '배', '비누'],
  },
  {
    id: 'unit5',
    circled: '⑤',
    layoutType: 'cols5',
    title: '주격 ★ (내가, 네가, 제가, 누가, 이게)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑤ 주격 ★ (내가, 네가, 제가, 누가, 이게)',
    grammar: '-이, -가 ★',
    tipHeaderTitle: '해볼쌤 팁 | -이, -가 ★ (변화형)',
    keywords: ['나(내가)', '너(네가)', '저(제가)', '누구(누가)', '이것(이게)'],
  },
  {
    id: 'unit6',
    circled: '⑥',
    layoutType: 'cols5',
    title: '목적격 (을, 를)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑥ 목적격 (을, 를)',
    grammar: '-을, -를',
    tipHeaderTitle: '해볼쌤 팁 | -을, -를',
    keywords: ['밥', '손', '무엇', '우유', '사과'],
  },
  {
    id: 'unit7',
    circled: '⑦',
    layoutType: 'rows5',
    title: '문장 만들기 2 (이, 가, 을, 를)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑦ 문장 만들기 2 (이, 가, 을, 를)',
    grammar: '3어절 문장 완성',
    tipHeaderTitle: '해볼쌤 팁 | [주어] + [목적어] + [동사]',
    keywords: ['제가 창문을 열게요', '내가 그림을 그릴게', '누가 노래를 불러요'],
  },
  {
    id: 'unit8',
    circled: '⑧',
    layoutType: 'cols5',
    title: '장소·시간 (에)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑧ 장소·시간 (에)',
    grammar: '-에',
    tipHeaderTitle: '해볼쌤 팁 | -에',
    keywords: ['여기', '집', '어디', '아침', '점심'],
  },
  {
    id: 'unit9',
    circled: '⑨',
    layoutType: 'cols5',
    title: '동작 장소 (에서)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑨ 동작 장소 (에서)',
    grammar: '-에서',
    tipHeaderTitle: '해볼쌤 팁 | -에서',
    keywords: ['교실', '운동장', '도서관', '어느 나라', '거기'],
  },
  {
    id: 'unit10',
    circled: '⑩',
    layoutType: 'cols5',
    title: '추가 (도)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑩ 추가 (도)',
    grammar: '-도',
    tipHeaderTitle: '해볼쌤 팁 | -도',
    keywords: ['저희', '친구', '물', '사과', '우산'],
  },
  {
    id: 'unit11',
    circled: '⑪',
    layoutType: 'rows5',
    title: '문장 만들기 3 (에, 에서, 도)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑪ 문장 만들기 3 (에, 에서, 도)',
    grammar: '장소·시간·추가 문장',
    tipHeaderTitle: '해볼쌤 팁 | [시간/추가] + [장소+에/에서] + [동사]',
    keywords: ['나도 학교에 가요', '점심에 운동장에서 놀아요', '집에서 사과도 먹어요'],
  },
  {
    id: 'unit12',
    circled: '⑫',
    layoutType: 'cols5',
    title: '나열·동반 (와, 과, 하고, 이랑, 랑)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑫ 나열·동반 (와, 과, 하고, 이랑, 랑)',
    grammar: '-와, -과, -하고, -이랑, -랑',
    tipHeaderTitle: '해볼쌤 팁 | -와, -과, -하고, -이랑, -랑',
    keywords: ['엄마', '우유', '연필', '책', '친구'],
  },
  {
    id: 'unit13',
    circled: '⑬',
    layoutType: 'cols5',
    title: '방향·수단 (으로, 로)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑬ 방향·수단 (으로, 로)',
    grammar: '-으로, -로',
    tipHeaderTitle: '해볼쌤 팁 | -으로, -로',
    keywords: ['학교', '운동장', '연필', '버스', '숟가락'],
  },
  {
    id: 'unit14',
    circled: '⑭',
    layoutType: 'cols5',
    title: '행동 대상 (에게, 한테)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑭ 행동 대상 (에게, 한테)',
    grammar: '-에게, -한테',
    tipHeaderTitle: '해볼쌤 팁 | -에게, -한테',
    keywords: ['짝꿍', '친구', '동생', '우리', '누구'],
  },
  {
    id: 'unit15',
    circled: '⑮',
    layoutType: 'rows5',
    title: '문장 만들기 4 (와, 과, 하고, 이랑, 랑, 으로, 로, 에게, 한테)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑮ 문장 만들기 4 (와, 과, 하고, 이랑, 랑, 으로, 로, 에게, 한테)',
    grammar: '동반·수단·대상 문장',
    tipHeaderTitle: '해볼쌤 팁 | [동반] + [방향/수단/대상] + [동사]',
    keywords: ['친구랑 운동장으로 가요', '동생이랑 기차로 가요', '책과 공책으로 공부해요'],
  },
];

export const PARTICLE_UNIT_16_TO_30_META: ParticleUnitMetaItem[] = [
  {
    id: 'unit16',
    circled: '⑯',
    layoutType: 'cols5',
    title: '시작과 끝 (부터, 까지)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑯ 시작과 끝 (부터, 까지)',
    grammar: '-부터, -까지',
    tipHeaderTitle: '해볼쌤 팁 | -부터, -까지',
    keywords: ['아침', '언제', '저녁', '몇 시', '몇 쪽'],
  },
  {
    id: 'unit17',
    circled: '⑰',
    layoutType: 'cols5',
    title: '선택 (이나, 나)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑰ 선택 (이나, 나)',
    grammar: '-이나, -나',
    tipHeaderTitle: '해볼쌤 팁 | -이나, -나',
    keywords: ['빵', '물', '책', '사과', '버스'],
  },
  {
    id: 'unit18',
    circled: '⑱',
    layoutType: 'cols5',
    title: '반복 (마다 · -씩)',
    sheetHeaderTitle: "해볼한국어 [조사 결합] ⑱ 반복 (마다 · 접미사 '-씩')",
    grammar: '-마다 (접미사 -씩)',
    tipHeaderTitle: "해볼쌤 팁 | -마다 · 접미사 '-씩'",
    keywords: ['날', '아침', '주말', '교실', '사람'],
  },
  {
    id: 'unit19',
    circled: '⑲',
    layoutType: 'rows5',
    title: '문장 만들기 5 (부터, 까지, 이나, 나, 마다)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑲ 문장 만들기 5 (부터, 까지, 이나, 나, 마다)',
    grammar: '범위·선택·반복 문장',
    tipHeaderTitle: '해볼쌤 팁 | [시작/반복] + [끝/선택] + [동사]',
    keywords: ['아침부터 저녁까지 공부해요', '아침마다 빵이나 우유를 먹어요', '주말마다 사과나 포도를 먹어요'],
  },
  {
    id: 'unit20',
    circled: '⑳',
    layoutType: 'cols5',
    title: '한정 (만)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ⑳ 한정 (만)',
    grammar: '-만',
    tipHeaderTitle: '해볼쌤 팁 | -만',
    keywords: ['물', '나', '하나', '오늘', '사과'],
  },
  {
    id: 'unit21',
    circled: '㉑',
    layoutType: 'cols5',
    title: '부정 한정 ★ (밖에)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉑ 부정 한정 ★ (밖에)',
    grammar: '-밖에 (+없다/안)',
    tipHeaderTitle: '해볼쌤 팁 | -밖에 + 부정 표현',
    keywords: ['하나', '주스', '나', '시간', '빵'],
  },
  {
    id: 'unit22',
    circled: '㉒',
    layoutType: 'cols5',
    title: '비교 (보다)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉒ 비교 (보다)',
    grammar: '-보다',
    tipHeaderTitle: '해볼쌤 팁 | -보다',
    keywords: ['형', '어제', '버스', '사과', '누구'],
  },
  {
    id: 'unit23',
    circled: '㉓',
    layoutType: 'rows5',
    title: '문장 만들기 6 (만, 밖에, 보다)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉓ 문장 만들기 6 (만, 밖에, 보다)',
    grammar: '한정·비교 문장',
    tipHeaderTitle: '해볼쌤 팁 | [비교/장소] + [한정+만/밖에] + [서술어]',
    keywords: ['나는 너만 보여', '너밖에 안 보여', '어제보다 오늘 더 네가 좋아'],
  },
  {
    id: 'unit24',
    circled: '㉔',
    layoutType: 'cols5',
    title: '비유 (처럼, 같이)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉔ 비유 (처럼, 같이)',
    grammar: '-처럼, -같이',
    tipHeaderTitle: '해볼쌤 팁 | -처럼, -같이',
    keywords: ['토끼', '구름', '인형', '눈', '별'],
  },
  {
    id: 'unit25',
    circled: '㉕',
    layoutType: 'cols5',
    title: '소유 ★ (의, 내, 네, 제)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉕ 소유 ★ (의, 내, 네, 제)',
    grammar: '-의 ★ (내·네·제)',
    tipHeaderTitle: '해볼쌤 팁 | -의 ★ (소유 변화형)',
    keywords: ['친구(친구의)', '선생님(선생님의)', '나(내)', '너(네)', '저(제)'],
  },
  {
    id: 'unit26',
    circled: '㉖',
    layoutType: 'cols5',
    title: '무리·함께 (끼리)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉖ 무리·함께 (끼리)',
    grammar: '-끼리',
    tipHeaderTitle: '해볼쌤 팁 | -끼리',
    keywords: ['친구', '우리', '남자', '여자', '학생'],
  },
  {
    id: 'unit27',
    circled: '㉗',
    layoutType: 'rows5',
    title: '문장 만들기 7 (처럼, 같이, 의, 내, 네, 제, 끼리)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉗ 문장 만들기 7 (처럼, 같이, 의, 내, 네, 제, 끼리)',
    grammar: '소유·비유·무리 문장',
    tipHeaderTitle: '해볼쌤 팁 | [주어/소유/무리] + [대상] + [동사]',
    keywords: ['친구의 가방이 예뻐요', '제 공책을 찾아요', '친구끼리 운동장에서 놀아요'],
  },
  {
    id: 'unit28',
    circled: '㉘',
    layoutType: 'cols5',
    title: '높임 (께서, 께)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉘ 높임 (께서, 께)',
    grammar: '-께서, -께',
    tipHeaderTitle: '해볼쌤 팁 | -께서, -께',
    keywords: ['할머니', '선생님', '부모님', '할아버지', '어른'],
  },
  {
    id: 'unit29',
    circled: '㉙',
    layoutType: 'cols5',
    title: '부름 (아, 야)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉙ 부름 (아, 야)',
    grammar: '-아, -야',
    tipHeaderTitle: '해볼쌤 팁 | -아, -야',
    keywords: ['민수', '수진', '강아지', '친구', '동생'],
  },
  {
    id: 'unit30',
    circled: '㉚',
    layoutType: 'rows5',
    title: '문장 만들기 8 (께서, 께, 아, 야)',
    sheetHeaderTitle: '해볼한국어 [조사 결합] ㉚ 문장 만들기 8 (께서, 께, 아, 야)',
    grammar: '높임·부름 문장',
    tipHeaderTitle: '해볼쌤 팁 | [높임 주어/부름] + [높임 대상] + [동사]',
    keywords: ['할머니께서 선물을 주셨어요', '선생님께서 책을 읽으세요', '민수야, 부모님께 인사해!'],
  },
];

export const PARTICLE_UNIT_META: ParticleUnitMetaItem[] = [
  ...PARTICLE_UNIT_1_TO_15_META,
  ...PARTICLE_UNIT_16_TO_30_META,
];
