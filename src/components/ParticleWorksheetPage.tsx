import React from 'react';
import { SupportedLanguage } from '../types';
import { speakKorean, playCutePop } from '../utils/audio';
import { ManduMascot } from './ManduMascot';
import {
  ParticleUnitId,
  ParticleColsItem,
  ParticleRowsItem,
  PARTICLE_UNIT_META,
  PARTICLE_COLS_BY_UNIT,
  PARTICLE_ROWS_BY_UNIT,
} from '../data/particleWorksheetData';
import {
  getParticleBaseMeaning,
  getParticleCombinedMeaning,
} from '../data/particleCombinedMeanings';

interface ParticleWorksheetPageProps {
  lang: SupportedLanguage;
  unit?: ParticleUnitId;
  className?: string;
  interactiveAudio?: boolean;
  renderOnly?: 'detective' | 'tip';
}

const FONT_HAND = "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif";

export const ParticleWorksheetPage: React.FC<ParticleWorksheetPageProps> = ({
  lang,
  unit = 'unit1',
  className = '',
  interactiveAudio = true,
  renderOnly,
}) => {
  const unitMeta = PARTICLE_UNIT_META.find((m) => m.id === unit) || PARTICLE_UNIT_META[0];
  const colsItems: ParticleColsItem[] = PARTICLE_COLS_BY_UNIT[unit] || [];
  const rowsItems: ParticleRowsItem[] = PARTICLE_ROWS_BY_UNIT[unit] || [];

  const handleColItemClick = (item: ParticleColsItem) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(`${item.baseNoun}, ${item.combinedWord}`, 0.85);
  };

  const handleRowItemClick = (row: ParticleRowsItem) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(row.fullSentence, 0.85);
  };

  const renderDetectiveHint = () => {
    switch (unit) {
      case 'unit2':
        return (
          <>
            <p className="font-normal text-slate-800">명사 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[이에요]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[예요]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ (친구예요 ○ / 친구에요 ×)
            </p>
          </>
        );
      case 'unit4':
        return (
          <>
            <p className="font-normal text-slate-800">명사 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[이]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[가]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 누가·무엇이 그러는지 알려 줘!
            </p>
          </>
        );
      case 'unit5':
        return (
          <>
            <p className="font-normal text-slate-800">‘나·너·저·누구·이것’의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              뒤에 <span style={{ color: '#D97706', fontWeight: 800 }}>[이/가]</span>가 오면 모양이 변신해!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#9333EA', fontWeight: 800 }}>[내가·네가·제가·누가·이게]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ <span style={{ color: '#9333EA', fontWeight: 800 }}>★</span> ‘나가·저가·누구가’는 안 돼요!
            </p>
          </>
        );
      case 'unit6':
        return (
          <>
            <p className="font-normal text-slate-800">명사 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[을]</span>을 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[를]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 말할 땐 ‘무엇을 → 뭐를·뭘’로 줄여 써요!
            </p>
          </>
        );
      case 'unit8':
        return (
          <>
            <p className="font-normal text-slate-800">어디에 있거나 가는지, 언제인지 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[에]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[에]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 있는 곳·가는 곳·시간에 모두 [에]를 써요!
            </p>
          </>
        );
      case 'unit9':
        return (
          <>
            <p className="font-normal text-slate-800">어디에서 행동하는지, 어디에서 왔는지 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[에서]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[에서]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 행동 장소와 ‘어느 나라에서 왔어요?’(출신)에 써요!
            </p>
          </>
        );
      case 'unit10':
        return (
          <>
            <p className="font-normal text-slate-800">앞에 말한 것에 “역시·같이”를 더해 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[도]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[도]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘은/는, 이/가, 을/를’ 자리에 [도]가 쏙 들어가요!
            </p>
          </>
        );
      case 'unit12':
        return (
          <>
            <p className="font-normal text-slate-800">명사 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span> 있어? <span style={{ color: '#E03131', fontWeight: 800 }}>[과 · 이랑]</span> / 없어? <span style={{ color: '#E03131', fontWeight: 800 }}>[와 · 랑]</span>
            </p>
            <p className="font-normal text-slate-800">
              받침 상관없이 두루 붙이려면 <span style={{ color: '#E03131', fontWeight: 800 }}>[하고]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 둘 이상을 나열하거나 함께할 때 써요!
            </p>
          </>
        );
      case 'unit13':
        return (
          <>
            <p className="font-normal text-slate-800">명사 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[으로]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’</span> 받침? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[로]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘연필로·교실로’처럼 ‘ㄹ’ 받침 뒤엔 꼭 [로]예요!
            </p>
          </>
        );
      case 'unit14':
        return (
          <>
            <p className="font-normal text-slate-800">명사 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[에게 / 한테]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[에게 / 한테]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘에게’는 글·말, ‘한테’는 말할 때! 어른껜 ‘께’도 써요!
            </p>
          </>
        );
      case 'unit16':
        return (
          <>
            <p className="font-normal text-slate-800">시간이나 거리의 시작과 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              시작하는 곳·시간엔 <span style={{ color: '#E03131', fontWeight: 800 }}>[부터]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              끝나는 시간·도착점엔 <span style={{ color: '#E03131', fontWeight: 800 }}>[까지]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘아침부터 저녁까지’처럼 짝꿍으로 잘 써요!
            </p>
          </>
        );
      case 'unit17':
        return (
          <>
            <p className="font-normal text-slate-800">명사 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[이나]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[나]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 여러 개 중에서 하나를 고를 때(선택) 써요!
            </p>
          </>
        );
      case 'unit18':
        return (
          <>
            <p className="font-normal text-slate-800">빠짐없이 반복되거나 나누는 말을 봐!</p>
            <p className="font-normal text-slate-800">
              매번 반복될 땐 받침 무관 <span style={{ color: '#E03131', fontWeight: 800 }}>[마다]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              수량을 나누어 말할 땐 <span style={{ color: '#E03131', fontWeight: 800 }}>[-씩]</span>을 붙여 봐!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘날마다(=매일)’, ‘하나씩·조금씩’처럼 써요!
            </p>
          </>
        );
      case 'unit20':
        return (
          <>
            <p className="font-normal text-slate-800">다른 것은 빼고 딱 하나만 고를 때를 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[만]</span>을 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[만]</span>을 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘은/는, 이/가, 을/를’ 자리에 [만]을 바로 써요!
            </p>
          </>
        );
      case 'unit21':
        return (
          <>
            <p className="font-normal text-slate-800">뒤에 ‘없어요·안~’ 부정 말이 오는지 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span> 있든 없든 <span style={{ color: '#E03131', fontWeight: 800 }}>[밖에]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              뒤 문장 끝엔 꼭 <span style={{ color: '#9333EA', fontWeight: 800 }}>[없어요 / 안 ~]</span>가 와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ <span style={{ color: '#9333EA', fontWeight: 800 }}>★</span> (하나밖에 있어요 × / 하나밖에 없어요 ○)
            </p>
          </>
        );
      case 'unit22':
        return (
          <>
            <p className="font-normal text-slate-800">두 대상을 나란히 비교하는 기준을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[보다]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[보다]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 비교하는 기준 명사 바로 뒤에 [보다]를 붙여요!
            </p>
          </>
        );
      case 'unit24':
        return (
          <>
            <p className="font-normal text-slate-800">무엇과 모양·모습이 비슷한지 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[처럼 / 같이]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[처럼 / 같이]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘토끼같이, 구름같이, 별처럼’ 비유 조사일 땐 항상 붙여 써요!
            </p>
          </>
        );
      case 'unit25':
        return (
          <>
            <p className="font-normal text-slate-800">누구의 물건인지 앞말의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              일반 명사엔 <span style={{ color: '#E03131', fontWeight: 800 }}>[의]</span> (발음은 [에]로도 해요)!
            </p>
            <p className="font-normal text-slate-800">
              ‘나·너·저+의’는 <span style={{ color: '#9333EA', fontWeight: 800 }}>[내·네·제]</span>로 변신해!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ <span style={{ color: '#9333EA', fontWeight: 800 }}>★</span> ‘나의 책 → 내 책’, ‘저의 우산 → 제 우산’!
            </p>
          </>
        );
      case 'unit26':
        return (
          <>
            <p className="font-normal text-slate-800">같은 무리의 사람들이 함께 모였는지 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[끼리]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어도 <span style={{ color: '#E03131', fontWeight: 800 }}>[끼리]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ ‘친구끼리, 우리끼리’처럼 무리·함께의 뜻이에요!
            </p>
          </>
        );
      case 'unit28':
        return (
          <>
            <p className="font-normal text-slate-800">높여야 할 어른이 주어인지 대상인지 봐!</p>
            <p className="font-normal text-slate-800">
              어른이 행동할 땐(주어) <span style={{ color: '#E03131', fontWeight: 800 }}>[께서]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              어른에게 드릴 땐(대상) <span style={{ color: '#E03131', fontWeight: 800 }}>[께]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 어른 뒤엔 ‘이/가 → 께서’, ‘에게/한테 → 께’예요!
            </p>
          </>
        );
      case 'unit29':
        return (
          <>
            <p className="font-normal text-slate-800">부르는 이름 마지막 글자의 끝을 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[아]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span>이 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[야]</span>를 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 친구나 동생을 부를 때만 써요! (어른껜 쓰지 않아요)
            </p>
          </>
        );
      case 'unit1':
      default:
        return (
          <>
            <p className="font-normal text-slate-800">끝 글자를 봐!</p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span> 있어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[은]</span>을 가져와!
            </p>
            <p className="font-normal text-slate-800">
              <span style={{ color: '#D97706', fontWeight: 800 }}>받침</span> 없어? 그럼 <span style={{ color: '#E03131', fontWeight: 800 }}>[는]</span>을 가져와!
            </p>
            <p className="font-normal text-slate-700 text-[12px] sm:text-[13px] pt-0.5">
              ※ 주제·대조·강조의 뜻이 있어.
            </p>
          </>
        );
    }
  };

  const renderTeacherTip = () => {
    switch (unit) {
      case 'unit2':
        return (
          <>
            <p className="font-normal text-slate-800">
              사람이나 사물이 무엇인지 나타낼 때, 명사 끝 <span style={{ color: '#D97706', fontWeight: 800 }}>받침이 있으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-이에요’</span>, <span style={{ color: '#D97706', fontWeight: 800 }}>없으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-예요’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 O</span> → 학생<span style={{ color: '#E03131', fontWeight: 800 }}>이에요</span>, 연필<span style={{ color: '#E03131', fontWeight: 800 }}>이에요</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 X</span> → 의자<span style={{ color: '#E03131', fontWeight: 800 }}>예요</span>, 지우개<span style={{ color: '#E03131', fontWeight: 800 }}>예요</span> (친구예요 ○ / 친구에요 ×)
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              받침이 없는 말 뒤에 ‘예요’ 대신 ‘에요’로 쓰기 쉬우니, 손으로 짚어 확인하며 정확히 소리 내어 보세요.
            </p>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              기본형은 <span style={{ color: '#D97706', fontWeight: 800 }}>‘-이다’</span>인데 변신한 거예요. (예: 학생이다 → 학생<span style={{ color: '#E03131', fontWeight: 800 }}>이에요</span>)
            </p>
          </>
        );
      case 'unit4':
        return (
          <>
            <p className="font-normal text-slate-800">
              어떤 일의 주인공이나 대상이 있음을 말할 때, <span style={{ color: '#D97706', fontWeight: 800 }}>받침이 있으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-이’</span>, <span style={{ color: '#D97706', fontWeight: 800 }}>받침이 없으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-가’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 O</span> → 물<span style={{ color: '#E03131', fontWeight: 800 }}>이</span>, 책<span style={{ color: '#E03131', fontWeight: 800 }}>이</span>, 약<span style={{ color: '#E03131', fontWeight: 800 }}>이</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 X</span> → 배<span style={{ color: '#E03131', fontWeight: 800 }}>가</span>, 비누<span style={{ color: '#E03131', fontWeight: 800 }}>가</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘물이 있어요’, ‘배가 아파요’처럼 학교와 생활 속에서 필요한 물건이나 상태를 말할 때 자주 써요.
            </p>
          </>
        );
      case 'unit5':
        return (
          <>
            <p className="font-normal text-slate-800">
              ‘나, 너, 저, 누구’ 뒤에 주격 조사 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-가’</span>가 오면 앞말이 보라색처럼 바뀌고, ‘이것+이’는 줄어서 <span style={{ color: '#9333EA', fontWeight: 800 }}>‘이게’</span>가 돼요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                나+가 → <span style={{ color: '#9333EA', fontWeight: 800 }}>내</span><span style={{ color: '#E03131', fontWeight: 800 }}>가</span>
              </span>
              <span>
                너+가 → <span style={{ color: '#9333EA', fontWeight: 800 }}>네</span><span style={{ color: '#E03131', fontWeight: 800 }}>가</span>
              </span>
              <span>
                저+가 → <span style={{ color: '#9333EA', fontWeight: 800 }}>제</span><span style={{ color: '#E03131', fontWeight: 800 }}>가</span>
              </span>
              <span>
                누구+가 → <span style={{ color: '#9333EA', fontWeight: 800 }}>누</span><span style={{ color: '#E03131', fontWeight: 800 }}>가</span>
              </span>
              <span>
                이것+이 → 이<span style={{ color: '#9333EA', fontWeight: 800 }}>게</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘나가, 저가, 누구가’가 되지 않도록 보라색 변화형 5가지를 소리 내어 입에 붙여 익혀 보세요.
            </p>
          </>
        );
      case 'unit6':
        return (
          <>
            <p className="font-normal text-slate-800">
              어떤 행동의 대상(목적어)을 나타낼 때, <span style={{ color: '#D97706', fontWeight: 800 }}>받침이 있으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-을’</span>, <span style={{ color: '#D97706', fontWeight: 800 }}>없으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-를’</span>을 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 O</span> → 밥<span style={{ color: '#E03131', fontWeight: 800 }}>을</span>, 손<span style={{ color: '#E03131', fontWeight: 800 }}>을</span>, 무엇<span style={{ color: '#E03131', fontWeight: 800 }}>을</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 X</span> → 우유<span style={{ color: '#E03131', fontWeight: 800 }}>를</span>, 사과<span style={{ color: '#E03131', fontWeight: 800 }}>를</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘무엇을’은 말할 때 줄여서 <span style={{ color: '#E03131', fontWeight: 800 }}>‘뭐를’</span>이나 <span style={{ color: '#E03131', fontWeight: 800 }}>‘뭘’</span>로도 자주 써요. (예: 무엇을 먹어요? → 뭐를 먹어요?)
            </p>
          </>
        );
      case 'unit8':
        return (
          <>
            <p className="font-normal text-slate-800">
              사람이나 물건이 <span style={{ color: '#D97706', fontWeight: 800 }}>있는 곳, 가는 곳, 또는 시간</span>을 말할 때 받침과 상관없이 명사 뒤에 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-에’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>장소·질문</span> → 학교<span style={{ color: '#E03131', fontWeight: 800 }}>에</span>, 집<span style={{ color: '#E03131', fontWeight: 800 }}>에</span>, 어디<span style={{ color: '#E03131', fontWeight: 800 }}>에</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>시간</span> → 아침<span style={{ color: '#E03131', fontWeight: 800 }}>에</span>, 점심<span style={{ color: '#E03131', fontWeight: 800 }}>에</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘학교에 가요’, ‘집에 있어요’, ‘어디에 가요?’처럼 어디로 가는지, 언제인지 함께 말해 보세요.
            </p>
          </>
        );
      case 'unit9':
        return (
          <>
            <p className="font-normal text-slate-800">
              어떤 <span style={{ color: '#D97706', fontWeight: 800 }}>행동이 일어나는 장소</span>나 <span style={{ color: '#D97706', fontWeight: 800 }}>출발점·출신</span>을 나타낼 때 받침과 상관없이 명사 뒤에 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-에서’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                교실<span style={{ color: '#E03131', fontWeight: 800 }}>에서</span> 공부해요
              </span>
              <span>
                운동장<span style={{ color: '#E03131', fontWeight: 800 }}>에서</span> 놀아요
              </span>
              <span>
                어느 나라<span style={{ color: '#E03131', fontWeight: 800 }}>에서</span> 왔어요?
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘어디에 있어요(위치)’는 ‘-에’, ‘어디에서 공부해요·어느 나라에서 왔어요(행동·출신)’는 ‘-에서’를 써요.
            </p>
          </>
        );
      case 'unit10':
        return (
          <>
            <p className="font-normal text-slate-800">
              이미 이야기한 것에 다른 대상을 <span style={{ color: '#D97706', fontWeight: 800 }}>똑같이 더하거나 보탤 때</span> 받침과 상관없이 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-도’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                나<span style={{ color: '#E03131', fontWeight: 800 }}>도</span> 갈래요
              </span>
              <span>
                물<span style={{ color: '#E03131', fontWeight: 800 }}>도</span> 주세요
              </span>
              <span>
                우산<span style={{ color: '#E03131', fontWeight: 800 }}>도</span> 있어요 (나는도 × → 나<span style={{ color: '#E03131', fontWeight: 800 }}>도</span> ○)
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘은/는, 이/가, 을/를’ 뒤에 붙이지 않고 그 자리에 바로 ‘-도’를 바꿔 넣어요.
            </p>
          </>
        );
      case 'unit12':
        return (
          <>
            <p className="font-normal text-slate-800">
              둘 이상의 명사를 나열하거나 <span style={{ color: '#D97706', fontWeight: 800 }}>함께 행동하는 사람</span>을 나타낼 때 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-와/-과’, ‘-하고’, ‘-이랑/-랑’</span>을 써요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 O</span> → 책<span style={{ color: '#E03131', fontWeight: 800 }}>과</span>, 연필<span style={{ color: '#E03131', fontWeight: 800 }}>이랑</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 X</span> → 우유<span style={{ color: '#E03131', fontWeight: 800 }}>와</span>, 친구<span style={{ color: '#E03131', fontWeight: 800 }}>랑</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 무관</span> → 엄마<span style={{ color: '#E03131', fontWeight: 800 }}>하고</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘-와/-과’는 글과 말에서 두루 쓰고, 대화에서는 ‘-하고’, ‘-이랑/-랑’을 더 자주 써요.
            </p>
          </>
        );
      case 'unit13':
        return (
          <>
            <p className="font-normal text-slate-800">
              가는 <span style={{ color: '#D97706', fontWeight: 800 }}>방향</span>이나 <span style={{ color: '#D97706', fontWeight: 800 }}>수단·도구</span>를 나타낼 때, 받침이 있으면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-으로’</span>, 받침이 없거나 <span style={{ color: '#D97706', fontWeight: 800 }}>‘ㄹ’ 받침</span>이면 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-로’</span>를 써요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 X·ㄹ 받침</span> → 학교<span style={{ color: '#E03131', fontWeight: 800 }}>로</span>, 버스<span style={{ color: '#E03131', fontWeight: 800 }}>로</span>, 연필<span style={{ color: '#E03131', fontWeight: 800 }}>로</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 O</span> → 운동장<span style={{ color: '#E03131', fontWeight: 800 }}>으로</span>, 숟가락<span style={{ color: '#E03131', fontWeight: 800 }}>으로</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘연필로 써요’, ‘교실로 가요’처럼 끝 받침이 ‘ㄹ’일 때는 ‘으로’가 아니라 ‘-로’를 붙이는 점에 주의하세요.
            </p>
          </>
        );
      case 'unit14':
        return (
          <>
            <p className="font-normal text-slate-800">
              말하거나 물건을 주는 <span style={{ color: '#D97706', fontWeight: 800 }}>행동의 대상(사람·동물)</span>을 나타낼 때 받침과 상관없이 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-에게’</span>나 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-한테’</span>를 써요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>글·말</span> → 짝꿍<span style={{ color: '#E03131', fontWeight: 800 }}>에게</span>, 친구<span style={{ color: '#E03131', fontWeight: 800 }}>에게</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>말할 때</span> → 동생<span style={{ color: '#E03131', fontWeight: 800 }}>한테</span>, 우리<span style={{ color: '#E03131', fontWeight: 800 }}>한테</span>, 누구<span style={{ color: '#E03131', fontWeight: 800 }}>한테</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              선생님이나 부모님처럼 높여야 하는 어른께 말씀드릴 때는 ‘선생님께 드려요’처럼 ‘-께’를 써요.
            </p>
          </>
        );
      case 'unit16':
        return (
          <>
            <p className="font-normal text-slate-800">
              시간이나 순서가 <span style={{ color: '#D97706', fontWeight: 800 }}>시작되는 지점</span>에는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-부터’</span>, <span style={{ color: '#D97706', fontWeight: 800 }}>끝이나 도착점</span>에는 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-까지’</span>를 받침과 상관없이 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>시작</span> → 아침<span style={{ color: '#E03131', fontWeight: 800 }}>부터</span>, 월요일<span style={{ color: '#E03131', fontWeight: 800 }}>부터</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>끝·도착</span> → 저녁<span style={{ color: '#E03131', fontWeight: 800 }}>까지</span>, 학교<span style={{ color: '#E03131', fontWeight: 800 }}>까지</span>, 어디<span style={{ color: '#E03131', fontWeight: 800 }}>까지</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              시간은 ‘아침부터 저녁까지’, 거리는 ‘집에서 학교까지’처럼 시작과 끝을 짝지어 쓰면 아주 자연스러워요.
            </p>
          </>
        );
      case 'unit17':
        return (
          <>
            <p className="font-normal text-slate-800">
              둘 이상의 대상 중 <span style={{ color: '#D97706', fontWeight: 800 }}>하나를 선택</span>할 때, 명사 끝 <span style={{ color: '#D97706', fontWeight: 800 }}>받침이 있으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-이나’</span>, <span style={{ color: '#D97706', fontWeight: 800 }}>없으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-나’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 O</span> → 빵<span style={{ color: '#E03131', fontWeight: 800 }}>이나</span>, 물<span style={{ color: '#E03131', fontWeight: 800 }}>이나</span>, 책<span style={{ color: '#E03131', fontWeight: 800 }}>이나</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 X</span> → 사과<span style={{ color: '#E03131', fontWeight: 800 }}>나</span>, 버스<span style={{ color: '#E03131', fontWeight: 800 }}>나</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘빵이나 밥을 먹어요’처럼 여러 가지 중에서 하나를 고르거나 가볍게 권유할 때 자주 써요.
            </p>
          </>
        );
      case 'unit18':
        return (
          <>
            <p className="font-normal text-slate-800">
              일정한 시간·대상이 <span style={{ color: '#D97706', fontWeight: 800 }}>빠짐없이 반복</span>됨은 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-마다’</span>, 수량을 나누어 거듭함은 <span style={{ color: '#D97706', fontWeight: 800 }}>접미사</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-씩’</span>으로 나타내요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>조사 -마다</span> → 날<span style={{ color: '#E03131', fontWeight: 800 }}>마다</span>(=매일), 아침<span style={{ color: '#E03131', fontWeight: 800 }}>마다</span>, 사람<span style={{ color: '#E03131', fontWeight: 800 }}>마다</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>접미사 -씩</span> → 하나<span style={{ color: '#E03131', fontWeight: 800 }}>씩</span>, 두 개<span style={{ color: '#E03131', fontWeight: 800 }}>씩</span>, 하루<span style={{ color: '#E03131', fontWeight: 800 }}>씩</span>, 조금<span style={{ color: '#E03131', fontWeight: 800 }}>씩</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              접미사 ‘-씩’은 명사·수사·부사 뒤에 붙어 ‘하루마다 한 번씩’처럼 같은 분량이 반복·분배됨을 뜻해요.
            </p>
          </>
        );
      case 'unit20':
        return (
          <>
            <p className="font-normal text-slate-800">
              다른 것은 제외하고 <span style={{ color: '#D97706', fontWeight: 800 }}>그것 하나뿐</span>임을 나타낼 때 받침과 상관없이 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-만’</span>을 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                물<span style={{ color: '#E03131', fontWeight: 800 }}>만</span> 마셔요
              </span>
              <span>
                나<span style={{ color: '#E03131', fontWeight: 800 }}>만</span> 알아요
              </span>
              <span>
                사탕을 하나<span style={{ color: '#E03131', fontWeight: 800 }}>만</span> 먹어요
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘이/가, 을/를’ 자리에 ‘-만’을 바로 넣어 말하면 뜻이 또렷해져요.
            </p>
          </>
        );
      case 'unit21':
        return (
          <>
            <p className="font-normal text-slate-800">
              ‘그것뿐이고 더 이상 없다’는 뜻으로, <span style={{ color: '#E03131', fontWeight: 800 }}>‘-밖에’</span> 뒤에는 반드시 <span style={{ color: '#9333EA', fontWeight: 800 }}>부정 표현(없어요·안 ~)</span>이 와요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                하나<span style={{ color: '#E03131', fontWeight: 800 }}>밖에</span> <span style={{ color: '#9333EA', fontWeight: 800 }}>없어요</span> ○
              </span>
              <span>
                빵<span style={{ color: '#E03131', fontWeight: 800 }}>밖에</span> <span style={{ color: '#9333EA', fontWeight: 800 }}>안 먹어요</span> ○
              </span>
              <span>
                (물밖에 있어요 × → 물<span style={{ color: '#E03131', fontWeight: 800 }}>만</span> 있어요 ○)
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              긍정 문장에는 ‘-만’, 부정 문장(‘없어요/안 먹어요’)에는 ‘-밖에’가 짝꿍이라는 점을 기억하세요.
            </p>
          </>
        );
      case 'unit22':
        return (
          <>
            <p className="font-normal text-slate-800">
              두 대상의 크기·속도·날씨 등을 견줄 때 <span style={{ color: '#D97706', fontWeight: 800 }}>비교의 기준</span>이 되는 명사 뒤에 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-보다’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                동생이 형<span style={{ color: '#E03131', fontWeight: 800 }}>보다</span> 빨라요
              </span>
              <span>
                오늘이 어제<span style={{ color: '#E03131', fontWeight: 800 }}>보다</span> 따뜻해요
              </span>
              <span>
                누구<span style={{ color: '#E03131', fontWeight: 800 }}>보다</span> 빨라요
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘수박이 사과보다 커요’처럼 먼저 말한 주어와 ‘명사+보다’가 서로 비교돼요.
            </p>
          </>
        );
      case 'unit24':
        return (
          <>
            <p className="font-normal text-slate-800">
              어떤 대상과 <span style={{ color: '#D97706', fontWeight: 800 }}>모양·성질·행동이 닮았음</span>을 비유할 때 받침과 상관없이 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-처럼, -같이’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                토끼<span style={{ color: '#E03131', fontWeight: 800 }}>같이</span> 껑충 뛰어요
              </span>
              <span>
                구름<span style={{ color: '#E03131', fontWeight: 800 }}>같이</span> 하얘요
              </span>
              <span>
                별<span style={{ color: '#E03131', fontWeight: 800 }}>처럼</span> 반짝여요
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              비유의 뜻을 나타내는 조사 ‘-처럼, -같이’는 앞 명사에 꼭 붙여 쓰며, ‘같이 가다(함께)’일 때는 띄어 써요.
            </p>
          </>
        );
      case 'unit25':
        return (
          <>
            <p className="font-normal text-slate-800">
              앞 명사가 뒤 명사의 <span style={{ color: '#D97706', fontWeight: 800 }}>주인·소속</span>임을 나타낼 때 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-의’</span>를 쓰고, ‘나·너·저’는 보라색처럼 줄어들어요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                친구<span style={{ color: '#E03131', fontWeight: 800 }}>의</span> 가방
              </span>
              <span>
                나+의 → <span style={{ color: '#9333EA', fontWeight: 800 }}>내</span>
              </span>
              <span>
                너+의 → <span style={{ color: '#9333EA', fontWeight: 800 }}>네</span>
              </span>
              <span>
                저+의 → <span style={{ color: '#9333EA', fontWeight: 800 }}>제</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              조사 ‘-의’는 말할 때 [에]로 발음되기도 해요. (예: 친구의 [친구의 / 친구에])
            </p>
          </>
        );
      case 'unit26':
        return (
          <>
            <p className="font-normal text-slate-800">
              같은 무리나 비슷한 대상끼리 <span style={{ color: '#D97706', fontWeight: 800 }}>여럿이 함께 어울림</span>을 나타낼 때 받침과 상관없이 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-끼리’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                친구<span style={{ color: '#E03131', fontWeight: 800 }}>끼리</span> 놀아요
              </span>
              <span>
                우리<span style={{ color: '#E03131', fontWeight: 800 }}>끼리</span> 이야기해요
              </span>
              <span>
                남자<span style={{ color: '#E03131', fontWeight: 800 }}>끼리</span> · 여자<span style={{ color: '#E03131', fontWeight: 800 }}>끼리</span> · 학생<span style={{ color: '#E03131', fontWeight: 800 }}>끼리</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              혼자 쓰는 것이 아니라 ‘우리·친구·학생’처럼 여럿을 뜻하는 말 뒤에 붙어 ‘그들만의 모임’을 나타내요.
            </p>
          </>
        );
      case 'unit28':
        return (
          <>
            <p className="font-normal text-slate-800">
              어른을 높여 말할 때 주어 ‘이/가’ 대신 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-께서’</span>, 행동 대상 ‘에게/한테’ 대신 <span style={{ color: '#E03131', fontWeight: 800 }}>‘-께’</span>를 써요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>어른 주어</span> → 할머니<span style={{ color: '#E03131', fontWeight: 800 }}>께서</span> 웃으세요
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>어른 대상</span> → 부모님<span style={{ color: '#E03131', fontWeight: 800 }}>께</span> 인사해요
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘께서’가 올 때는 뒤의 동사도 ‘웃으세요, 말씀하세요’처럼 높임말로 짝을 맞춰요.
            </p>
          </>
        );
      case 'unit29':
        return (
          <>
            <p className="font-normal text-slate-800">
              친구나 동생, 동물 등을 다정하게 부를 때 이름 끝 <span style={{ color: '#D97706', fontWeight: 800 }}>받침이 있으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-아’</span>, <span style={{ color: '#D97706', fontWeight: 800 }}>없으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘-야’</span>를 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 O</span> → 수진<span style={{ color: '#E03131', fontWeight: 800 }}>아</span>, 동생<span style={{ color: '#E03131', fontWeight: 800 }}>아</span>
              </span>
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침 X</span> → 민수<span style={{ color: '#E03131', fontWeight: 800 }}>야</span>, 강아지<span style={{ color: '#E03131', fontWeight: 800 }}>야</span>, 친구<span style={{ color: '#E03131', fontWeight: 800 }}>야</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              이름 뒤에는 쉼표(,)를 찍고, 선생님이나 어른을 부를 때는 ‘선생님!’처럼 ‘아/야’를 붙이지 않아요.
            </p>
          </>
        );
      case 'unit1':
      default:
        return (
          <>
            <p className="font-normal text-slate-800">
              명사의 끝음절에 <span style={{ color: '#D97706', fontWeight: 800 }}>받침이 있으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘은’</span>을, <span style={{ color: '#D97706', fontWeight: 800 }}>없으면</span> <span style={{ color: '#E03131', fontWeight: 800 }}>‘는’</span>을 붙여요.
            </p>
            <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-0.5 font-normal text-slate-800 py-0.5">
              <span>
                <span style={{ color: '#D97706', fontWeight: 800 }}>받침X</span> → 나<span style={{ color: '#E03131', fontWeight: 800 }}>는</span>, <span style={{ color: '#D97706', fontWeight: 800 }}>받침O</span> → 동생<span style={{ color: '#E03131', fontWeight: 800 }}>은</span>
              </span>
            </div>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              ‘은1’은 주제를 나타내거나 대조 및 강조의 뜻을 나타내는 보조사이다. 주격조사 ‘이’와 보조사 ‘은’을 헷갈리는 것은 ‘은’이 주어 자리에 자주 나타나기 때문이다. 그러나 ‘은’은 목적어, 부사어 자리에도 온다. -국립국어원
            </p>
            <p className="font-normal text-slate-700 text-[11px] sm:text-[12px]">
              4단원에서 주격조사 ‘이’를 더 자세히 배워요.
            </p>
          </>
        );
    }
  };

  if (renderOnly === 'detective') {
    if (unitMeta.layoutType === 'rows5') return null;
    return (
      <div
        style={{ fontFamily: "'NanumBarunGothic', 'NanumSquare', 'Pretendard', sans-serif" }}
        className={`w-full bg-white rounded-2xl border-2 border-emerald-300 p-5 sm:p-6 text-slate-900 select-none ${className}`}
      >
        <div className="flex items-center gap-2 pb-2.5 mb-3 border-b border-emerald-200">
          <span className="text-xl">😎</span>
          <span className="font-black text-lg text-slate-950 tracking-tight">
            탐정 찬스 · {unitMeta.circled} {unitMeta.title}
          </span>
        </div>
        <div className="space-y-1.5 text-slate-800 text-[14px] sm:text-[15px] leading-relaxed break-keep">
          {renderDetectiveHint()}
        </div>
      </div>
    );
  }

  if (renderOnly === 'tip') {
    if (unitMeta.layoutType === 'rows5') return null;
    return (
      <div
        style={{ fontFamily: "'NanumBarunGothic', 'NanumSquare', 'Pretendard', sans-serif" }}
        className={`w-full bg-white rounded-2xl border-2 border-emerald-300 p-5 sm:p-6 text-slate-900 select-none ${className}`}
      >
        <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-emerald-200">
          <ManduMascot size="xs" interactive={false} />
          <span className="font-black text-lg text-slate-950 tracking-tight">
            {unitMeta.tipHeaderTitle}
          </span>
        </div>
        <div className="space-y-2 text-slate-800 text-[13.5px] sm:text-[14.5px] leading-relaxed break-keep">
          {renderTeacherTip()}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`verb-worksheet-page printable-a4-page print:m-0 print:p-1.5 print:shadow-none print:border-none w-full max-w-[1040px] mx-auto bg-white rounded-2xl shadow-md border-2 border-emerald-300 p-2 sm:p-2.5 text-slate-900 flex flex-col justify-between font-korean-gothic select-none ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* 1. HEADER ROW */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b-2 border-emerald-600 pb-0.5 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <ManduMascot size="xs" interactive={false} />
          <h1 className="text-xs sm:text-sm md:text-base font-black text-emerald-950 font-korean-gothic tracking-tight break-keep">
            {unitMeta.sheetHeaderTitle}
          </h1>
        </div>

        <div className="text-[11px] sm:text-xs font-extrabold text-slate-800 flex items-center gap-3 sm:gap-6 font-korean-gothic shrink-0">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 2. MAIN WORKSHEET BODY: cols5 vs rows5 */}
      {unitMeta.layoutType === 'cols5' ? (
        <div className="verb-cards-grid grid grid-cols-5 print:grid-cols-5 gap-1.5 sm:gap-2 mb-1 flex-1 items-stretch">
          {colsItems.map((item) => {
            const baseTranslation = getParticleBaseMeaning(item, lang);
            const combinedTranslation = getParticleCombinedMeaning(item, lang);
            const isLongMainWord =
              item.baseNoun.length >= 7 || item.combinedWord.length >= 7;
            const mainWordClass = isLongMainWord
              ? 'text-[17px] sm:text-[18.5px]'
              : 'text-[20px] sm:text-[22px]';

            return (
              <div
                key={item.id}
                onClick={() => handleColItemClick(item)}
                className={`relative border-2 border-dashed border-emerald-300 hover:border-emerald-400 bg-white rounded-xl p-2 sm:p-2.5 pb-4 sm:pb-5 flex flex-col transition-all group ${
                  interactiveAudio
                    ? 'cursor-pointer hover:shadow-md hover:bg-emerald-50/20 active:scale-[0.99]'
                    : ''
                }`}
                title={interactiveAudio ? `클릭하여 발음 듣기: "${item.baseNoun}, ${item.combinedWord}"` : undefined}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-1 shrink-0">
                  <span className="bg-emerald-100 text-emerald-950 px-1.5 py-0.2 rounded font-black text-[9.5px] sm:text-[10px] font-korean-gothic border border-emerald-200 shadow-2xs">
                    {item.badge}
                  </span>
                  {interactiveAudio && (
                    <span className="text-[9px] text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      🔊
                    </span>
                  )}
                </div>

                {/* Equal vertical spacing stack for 5 core card blocks */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* 1. 일러스트 그림 */}
                  <div className="flex items-center justify-center shrink-0 h-[62px] sm:h-[72px]">
                    <img
                      src={item.illustrationSvg}
                      alt={`${item.baseNoun} 일러스트`}
                      className="w-[58px] h-[58px] sm:w-[70px] sm:h-[70px] object-contain drop-shadow-2xs select-none pointer-events-none"
                      loading="lazy"
                    />
                  </div>

                  {/* 2. 다국어 뜻 번역 (기본 명사 뜻 + 결합형 뜻) */}
                  <div className="flex flex-col items-center justify-center text-center min-h-[30px] sm:min-h-[34px] shrink-0 gap-0.5 px-0.5">
                    <span className="text-[11px] sm:text-[12px] font-semibold text-slate-600 leading-tight block truncate max-w-full">
                      {baseTranslation}
                    </span>
                    <span className="text-[11.5px] sm:text-[12.5px] font-black text-emerald-900 leading-tight block truncate max-w-full">
                      → {combinedTranslation}
                    </span>
                  </div>

                  {/* 3 & 4. 기본 명사 & 결합형 (1행·2행 동일 크기 유지) */}
                  <div className="w-full flex items-center justify-center select-none shrink-0">
                    <div className="inline-flex flex-col items-start text-left max-w-full">
                      {/* 기본 명사 */}
                      <div className={`${mainWordClass} font-black leading-[1.12] flex items-baseline tracking-normal whitespace-nowrap`}>
                        <span
                          style={{
                            fontFamily: FONT_HAND,
                            fontWeight: 900,
                            WebkitTextStroke: '0.8px currentColor',
                            color: '#1E293B',
                          }}
                        >
                          {item.baseNoun}
                        </span>
                      </div>

                      {/* 결합형 */}
                      <div className={`${mainWordClass} font-black leading-[1.12] flex items-baseline tracking-normal whitespace-nowrap`}>
                        {item.combinedSegments.map((seg, segIdx) => (
                          <span
                            key={segIdx}
                            style={{
                              fontFamily: FONT_HAND,
                              fontWeight: 900,
                              WebkitTextStroke: '0.8px currentColor',
                              color: seg.color,
                            }}
                          >
                            {seg.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 5. 예문 */}
                  <div className="flex items-center justify-center text-center min-h-[24px] shrink-0">
                    <p
                      style={{ fontFamily: FONT_HAND }}
                      className="text-[17px] sm:text-[19px] text-black leading-[1.1] font-badasseugi break-keep"
                    >
                      <span className="font-normal text-black">{item.sentencePrefix}</span>
                      <span
                        style={{
                          fontWeight: 900,
                          WebkitTextStroke: '0.45px currentColor',
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
                            fontFamily: FONT_HAND,
                            fontWeight: 700,
                            color: '#888888',
                            letterSpacing: '0.03em',
                          }}
                          className={`relative z-10 leading-none select-none tracking-normal font-badasseugi whitespace-nowrap ${
                            item.baseNoun.length >= 6 ? 'text-[17px] sm:text-[19px]' : 'text-[20px] sm:text-[22.5px]'
                          }`}
                        >
                          {item.baseNoun}
                        </span>
                      </div>

                      <div className="w-full h-[38px] sm:h-[40px] relative flex items-center px-1.5">
                        <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-200 pointer-events-none" />
                        <span
                          style={{
                            fontFamily: FONT_HAND,
                            fontWeight: 700,
                            color: '#888888',
                            letterSpacing: '0.02em',
                          }}
                          className={`relative z-10 leading-none select-none tracking-normal font-badasseugi whitespace-nowrap ${
                            item.combinedWord.length >= 7
                              ? 'text-[14.5px] sm:text-[16.5px]'
                              : item.combinedWord.length >= 5
                              ? 'text-[16.5px] sm:text-[18px]'
                              : 'text-[19.5px] sm:text-[21.5px]'
                          }`}
                        >
                          {item.combinedWord}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 5행 가로형 문장 만들기 레이아웃 (하단 탐정찬스·해볼쌤 팁 제외, 5행 풀사이즈 확장) */
        <div className="particle-rows-grid grid grid-rows-5 print:grid-rows-5 gap-2 sm:gap-2.5 mb-1 flex-1 items-stretch">
          {rowsItems.map((row) => {
            const currentTranslation = row.meanings[lang] || row.meanings.en;
            const formulaTextClass =
              row.blocks.length >= 4
                ? 'text-[17.5px] sm:text-[20px]'
                : row.blocks.length >= 3
                ? 'text-[20px] sm:text-[23px]'
                : 'text-[22px] sm:text-[25px]';
            const tracingTextClass =
              row.fullSentence.length >= 16
                ? 'text-[19px] sm:text-[23.5px]'
                : 'text-[22px] sm:text-[26px]';

            return (
              <div
                key={row.id}
                onClick={() => handleRowItemClick(row)}
                className={`relative border-2 border-dashed border-emerald-300 hover:border-emerald-400 bg-white rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-3 sm:gap-4 transition-all group ${
                  interactiveAudio
                    ? 'cursor-pointer hover:shadow-md hover:bg-emerald-50/20 active:scale-[0.995]'
                    : ''
                }`}
                title={interactiveAudio ? `클릭하여 문장 듣기: "${row.fullSentence}"` : undefined}
              >
                {/* Badge + Audio Icon (문장번호 크기 기존 유지) */}
                <div className="w-[40px] sm:w-[44px] shrink-0 flex flex-col items-center justify-center gap-0.5">
                  <span className="bg-emerald-100 text-emerald-950 px-1.5 py-0.2 rounded font-black text-[9.5px] sm:text-[10.5px] font-korean-gothic border border-emerald-200 shadow-2xs">
                    {row.badge}
                  </span>
                  {interactiveAudio && (
                    <span className="text-[10px] text-emerald-600 opacity-30 group-hover:opacity-100 transition-opacity font-bold">
                      🔊
                    </span>
                  )}
                </div>

                {/* Scene Illustration */}
                <div className="w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] shrink-0 flex items-center justify-center">
                  <img
                    src={row.illustrationSvg}
                    alt={`${row.fullSentence} 일러스트`}
                    className="w-[62px] h-[62px] sm:w-[72px] sm:h-[72px] object-contain drop-shadow-2xs select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Formula Blocks + Translation */}
                <div className="w-[320px] sm:w-[375px] shrink-0 flex flex-col justify-center gap-1 min-w-0">
                  <div className={`${formulaTextClass} font-black leading-[1.12] flex items-baseline flex-wrap gap-x-1`}>
                    {row.blocks.map((block, bIdx) => (
                      <React.Fragment key={bIdx}>
                        {bIdx > 0 && (
                          <span className="text-slate-400 font-black text-[15px] sm:text-[17px] mx-0.5 font-korean-gothic">
                            +
                          </span>
                        )}
                        <span className="inline-block whitespace-nowrap">
                          {block.segments.map((seg, sIdx) => (
                            <span
                              key={sIdx}
                              className="whitespace-pre"
                              style={{
                                fontFamily: FONT_HAND,
                                fontWeight: 900,
                                WebkitTextStroke: '0.6px currentColor',
                                color: seg.color,
                              }}
                            >
                              {seg.text}
                            </span>
                          ))}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="text-[13px] sm:text-[14.5px] font-bold text-slate-600 leading-tight truncate">
                    {currentTranslation}
                  </span>
                </div>

                {/* Single-line Full Sentence Tracing Box */}
                <div className="flex-1 min-w-0">
                  <div className="w-full h-[56px] sm:h-[64px] border border-dashed border-slate-400 bg-white rounded-none relative flex items-center px-3.5 overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-slate-200 pointer-events-none" />
                    <span
                      style={{
                        fontFamily: FONT_HAND,
                        fontWeight: 700,
                        color: '#888888',
                        letterSpacing: '0.02em',
                      }}
                      className={`relative z-10 leading-none select-none font-badasseugi whitespace-nowrap ${tracingTextClass}`}
                    >
                      {row.fullSentence}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. 하단 팁 영역 (문장 만들기 rows5 학습지에서는 제외) */}
      {unitMeta.layoutType === 'cols5' && (
        <div
          style={{
            fontFamily: "'NanumBarunGothic', 'NanumSquare', 'Pretendard', sans-serif",
          }}
          className="w-full pt-2.5 pb-2 sm:pt-3 sm:pb-2.5 border-t-2 border-emerald-600 shrink-0 select-none"
        >
          <div className="verb-tips-grid grid grid-cols-[15fr_33fr] print:grid-cols-[15fr_33fr] gap-2.5 sm:gap-3.5 items-stretch">
            {/* [왼쪽 영역: 탐정 찬스] */}
            <div className="border-r border-emerald-200 pb-0 pr-2.5 sm:pr-3 flex flex-col justify-start gap-1 min-w-0">
              <div className="flex items-center gap-1.5 text-slate-900">
                <span className="text-sm sm:text-base">😎</span>
                <span className="font-black text-[15px] sm:text-[16px] text-emerald-950 tracking-tight">
                  탐정 찬스
                </span>
              </div>

              <div className="pl-4 sm:pl-5 space-y-1 text-slate-800 text-[13px] sm:text-[14px] leading-snug break-keep">
                {renderDetectiveHint()}
              </div>
            </div>

            {/* [오른쪽 영역: 해볼쌤 팁] */}
            <div className="pl-1 sm:pl-2 flex flex-col justify-start gap-1 min-w-0">
              <div className="flex items-center gap-1.5 text-slate-900">
                <ManduMascot size="xs" interactive={false} />
                <span className="font-black text-[15px] sm:text-[16px] text-emerald-950 tracking-tight">
                  {unitMeta.tipHeaderTitle}
                </span>
              </div>

              <div className="pl-8 sm:pl-9 space-y-1 text-slate-800 text-[12.5px] sm:text-[13.5px] leading-snug">
                {renderTeacherTip()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SHEET FOOTER */}
      <div className="mt-0.5 pt-0.5 border-t border-emerald-200 flex items-center justify-start text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic font-bold">
        <span>
          해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};
