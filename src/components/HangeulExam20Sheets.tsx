import React, { useState } from 'react';
import { Volume2, CheckCircle2, Eye, RotateCcw } from 'lucide-react';
import { BASIC_LETTERS_ILLUSTRATIONS } from '../data/basicLettersIllustrations';
import { MiniJollaman } from './HangeulJollaQuizAndGameSheets';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';

export type HangeulExamPartId = 'jamo' | 'basic' | 'batchim1' | 'batchim2';

export interface HangeulExamQuestion {
  id: number;
  tag: string;
  prefix?: string;
  optionA: string;
  optionB: string;
  suffix?: string;
  answer: 'A' | 'B';
  audioText: string;
  basicIllustKey?: string;
  hint?: string;
}

export interface HangeulExamPartMeta {
  id: HangeulExamPartId;
  partNumber: string;
  shortLabel: string;
  fullTitle: string;
  accentHex: string;
  accentDarkHex: string;
  tintBgHex: string;
  borderHex: string;
}

export interface HangeulExamLesson {
  /** 0 ~ 19 */
  globalIndex: number;
  id: string;
  partId: HangeulExamPartId;
  lessonNo: number; // 1 ~ 5
  circledNo: string; // ① ~ ⑤
  title: string;
  subtitle: string;
  dropdownLabel: string;
  previewMain: string;
  previewChips: string[];
  sectionLabels: [string, string];
  questions: HangeulExamQuestion[];
}

export const HANGEUL_EXAM_PARTS: HangeulExamPartMeta[] = [
  {
    id: 'jamo',
    partNumber: 'PART 1',
    shortLabel: '자음모음',
    fullTitle: '자음·모음 (1~5강)',
    accentHex: '#D97706',
    accentDarkHex: '#92400E',
    tintBgHex: '#FFFBEB',
    borderHex: '#F59E0B',
  },
  {
    id: 'basic',
    partNumber: 'PART 2',
    shortLabel: '기본글자',
    fullTitle: '기본글자 (1~5강)',
    accentHex: '#EA580C',
    accentDarkHex: '#9A3412',
    tintBgHex: '#FFF7ED',
    borderHex: '#FB923C',
  },
  {
    id: 'batchim1',
    partNumber: 'PART 3',
    shortLabel: '받침1 (대표·가족)',
    fullTitle: '받침1 · 대표받침과 받침가족 (1~5강)',
    accentHex: '#0284C7',
    accentDarkHex: '#075985',
    tintBgHex: '#F0F9FF',
    borderHex: '#38BDF8',
  },
  {
    id: 'batchim2',
    partNumber: 'PART 4',
    shortLabel: '받침2 (겹받침)',
    fullTitle: '받침2 · 겹받침 (1~5강)',
    accentHex: '#7C3AED',
    accentDarkHex: '#5B21B6',
    tintBgHex: '#F5F3FF',
    borderHex: '#A78BFA',
  },
];

export const HANGEUL_EXAM_PART_MAP: Record<HangeulExamPartId, HangeulExamPartMeta> =
  HANGEUL_EXAM_PARTS.reduce((acc, part) => {
    acc[part.id] = part;
    return acc;
  }, {} as Record<HangeulExamPartId, HangeulExamPartMeta>);

/**
 * 100% 해볼 한국어 기존 데이터(자음모음표, BASIC_LETTERS_DATA 21쪽, BATCHIM_PAGES_DATA 1~15쪽)만
 * 사용하여 구성한 한글 ( / ) 고르기 쪽지시험 4파트 × 5강 = 총 20강 (200문항)
 */
export const HANGEUL_EXAM_LESSONS: HangeulExamLesson[] = [
  // =========================================================================
  // PART 1. 자음·모음 (1강 ~ 5강)
  // =========================================================================
  {
    globalIndex: 0,
    id: 'exam_jamo_1',
    partId: 'jamo',
    lessonNo: 1,
    circledNo: '①',
    title: '자음·모음 1강 · 기본자음 ① (ㄱ~ㅅ)',
    subtitle: '기본자음 ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ의 이름과 순서, 소리에 ○ 표 하세요.',
    dropdownLabel: '[자음모음 1강] 기본자음 ① (ㄱ~ㅅ)',
    previewMain: 'ㄱ~ㅅ',
    previewChips: ['ㄱㄴㄷㄹ', 'ㅁㅂㅅ', '10문항'],
    sectionLabels: ['1~5번 · 자음 이름과 모양 고르기', '6~10번 · 자음 순서와 ㅏ 합체 고르기'],
    questions: [
      { id: 1, tag: '자음 이름', prefix: 'ㄱ 의 이름은?', optionA: '기역', optionB: '니은', answer: 'A', audioText: '기역', hint: 'ㄱ [g/k]' },
      { id: 2, tag: '자음 이름', prefix: 'ㄴ 의 이름은?', optionA: '디귿', optionB: '니은', answer: 'B', audioText: '니은', hint: 'ㄴ [n]' },
      { id: 3, tag: '자음 이름', prefix: 'ㄷ 의 이름은?', optionA: '디귿', optionB: '리을', answer: 'A', audioText: '디귿', hint: 'ㄷ [d/t]' },
      { id: 4, tag: '자음 이름', prefix: 'ㅁ 의 이름은?', optionA: '비읍', optionB: '미음', answer: 'B', audioText: '미음', hint: 'ㅁ [m]' },
      { id: 5, tag: '자음 이름', prefix: 'ㅅ 의 이름은?', optionA: '시옷', optionB: '비읍', answer: 'A', audioText: '시옷', hint: 'ㅅ [s]' },
      { id: 6, tag: '자음 순서', prefix: 'ㄱ → ㄴ → (  ) → ㄹ', optionA: 'ㄷ', optionB: 'ㅁ', answer: 'A', audioText: '디귿', hint: '순서 찾기' },
      { id: 7, tag: '자음 순서', prefix: 'ㄹ → ㅁ → (  ) → ㅅ', optionA: 'ㄱ', optionB: 'ㅂ', answer: 'B', audioText: '비읍', hint: '순서 찾기' },
      { id: 8, tag: 'ㅏ 합체', prefix: 'ㄱ + ㅏ =', optionA: '가', optionB: '나', answer: 'A', audioText: '가', hint: '자모표' },
      { id: 9, tag: 'ㅏ 합체', prefix: 'ㅁ + ㅏ =', optionA: '바', optionB: '마', answer: 'B', audioText: '마', hint: '자모표' },
      { id: 10, tag: 'ㅏ 합체', prefix: 'ㅅ + ㅏ =', optionA: '사', optionB: '다', answer: 'A', audioText: '사', hint: '자모표' },
    ],
  },
  {
    globalIndex: 1,
    id: 'exam_jamo_2',
    partId: 'jamo',
    lessonNo: 2,
    circledNo: '②',
    title: '자음·모음 2강 · 기본자음 ② (ㅇ~ㅎ)',
    subtitle: '기본자음 ㅇ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ의 이름과 순서, 소리에 ○ 표 하세요.',
    dropdownLabel: '[자음모음 2강] 기본자음 ② (ㅇ~ㅎ)',
    previewMain: 'ㅇ~ㅎ',
    previewChips: ['ㅇㅈㅊㅋ', 'ㅌㅍㅎ', '10문항'],
    sectionLabels: ['1~5번 · 자음 이름과 모양 고르기', '6~10번 · 자음 순서와 기본 합체 고르기'],
    questions: [
      { id: 1, tag: '자음 이름', prefix: 'ㅇ 의 이름은?', optionA: '이응', optionB: '히읗', answer: 'A', audioText: '이응', hint: 'ㅇ [ng/무음]' },
      { id: 2, tag: '자음 이름', prefix: 'ㅈ 의 이름은?', optionA: '치읓', optionB: '지읒', answer: 'B', audioText: '지읒', hint: 'ㅈ [j]' },
      { id: 3, tag: '자음 이름', prefix: 'ㅋ 의 이름은?', optionA: '키읔', optionB: '티읕', answer: 'A', audioText: '키읔', hint: 'ㅋ [k]' },
      { id: 4, tag: '자음 이름', prefix: 'ㅍ 의 이름은?', optionA: '티읕', optionB: '피읖', answer: 'B', audioText: '피읖', hint: 'ㅍ [p]' },
      { id: 5, tag: '자음 이름', prefix: 'ㅎ 의 이름은?', optionA: '히읗', optionB: '이응', answer: 'A', audioText: '히읗', hint: 'ㅎ [h]' },
      { id: 6, tag: '자음 순서', prefix: 'ㅇ → ㅈ → (  ) → ㅋ', optionA: 'ㅊ', optionB: 'ㅌ', answer: 'A', audioText: '치읓', hint: '순서 찾기' },
      { id: 7, tag: '자음 순서', prefix: 'ㅋ → ㅌ → (  ) → ㅎ', optionA: 'ㅈ', optionB: 'ㅍ', answer: 'B', audioText: '피읖', hint: '순서 찾기' },
      { id: 8, tag: 'ㅏ 합체', prefix: 'ㅇ + ㅏ =', optionA: '아', optionB: '하', answer: 'A', audioText: '아', hint: '자모표' },
      { id: 9, tag: 'ㅏ 합체', prefix: 'ㅈ + ㅏ =', optionA: '차', optionB: '자', answer: 'B', audioText: '자', hint: '자모표' },
      { id: 10, tag: 'ㅏ 합체', prefix: 'ㅎ + ㅏ =', optionA: '하', optionB: '파', answer: 'A', audioText: '하', hint: '자모표' },
    ],
  },
  {
    globalIndex: 2,
    id: 'exam_jamo_3',
    partId: 'jamo',
    lessonNo: 3,
    circledNo: '③',
    title: '자음·모음 3강 · 쌍자음 5자 & 자음 가족',
    subtitle: '쌍자음 ㄲ, ㄸ, ㅃ, ㅆ, ㅉ과 짝꿍 자음 소리에 ○ 표 하세요.',
    dropdownLabel: '[자음모음 3강] 쌍자음 5자 (ㄲ~ㅉ)',
    previewMain: 'ㄲㄸㅃㅆㅉ',
    previewChips: ['쌍자음5', '예사·거센', '10문항'],
    sectionLabels: ['1~5번 · 쌍자음 5자 모양과 이름', '6~10번 · 쌍자음 구별 & 소리 합체'],
    questions: [
      { id: 1, tag: '쌍자음', prefix: 'ㄱ 이 두 개 모이면?', optionA: 'ㄲ', optionB: 'ㅋ', answer: 'A', audioText: '쌍기역', hint: '쌍기역' },
      { id: 2, tag: '쌍자음', prefix: 'ㄷ 이 두 개 모이면?', optionA: 'ㅌ', optionB: 'ㄸ', answer: 'B', audioText: '쌍디귿', hint: '쌍디귿' },
      { id: 3, tag: '쌍자음', prefix: 'ㅂ 이 두 개 모이면?', optionA: 'ㅃ', optionB: 'ㅍ', answer: 'A', audioText: '쌍비읍', hint: '쌍비읍' },
      { id: 4, tag: '쌍자음', prefix: 'ㅅ 이 두 개 모이면?', optionA: 'ㅉ', optionB: 'ㅆ', answer: 'B', audioText: '쌍시옷', hint: '쌍시옷' },
      { id: 5, tag: '쌍자음', prefix: 'ㅈ 이 두 개 모이면?', optionA: 'ㅉ', optionB: 'ㅊ', answer: 'A', audioText: '쌍지읒', hint: '쌍지읒' },
      { id: 6, tag: '자음 가족', prefix: 'ㄱ · ㅋ 와 가족인 쌍자음은?', optionA: 'ㄲ', optionB: 'ㄸ', answer: 'A', audioText: '쌍기역', hint: 'ㄱ 가족' },
      { id: 7, tag: '자음 가족', prefix: 'ㅂ · ㅍ 와 가족인 쌍자음은?', optionA: 'ㅆ', optionB: 'ㅃ', answer: 'B', audioText: '쌍비읍', hint: 'ㅂ 가족' },
      { id: 8, tag: '쌍자음 합체', prefix: 'ㄲ + ㅏ =', optionA: '까', optionB: '카', answer: 'A', audioText: '까', hint: '된소리' },
      { id: 9, tag: '쌍자음 합체', prefix: 'ㅃ + ㅏ =', optionA: '파', optionB: '빠', answer: 'B', audioText: '빠', hint: '된소리' },
      { id: 10, tag: '쌍자음 합체', prefix: 'ㅉ + ㅏ =', optionA: '짜', optionB: '차', answer: 'A', audioText: '짜', hint: '된소리' },
    ],
  },
  {
    globalIndex: 3,
    id: 'exam_jamo_4',
    partId: 'jamo',
    lessonNo: 4,
    circledNo: '④',
    title: '자음·모음 4강 · 기본모음 10자 (ㅏ~ㅣ)',
    subtitle: '기본모음 ㅏ, ㅑ, ㅓ, ㅕ, ㅗ, ㅛ, ㅜ, ㅠ, ㅡ, ㅣ에 알맞게 ○ 표 하세요.',
    dropdownLabel: '[자음모음 4강] 기본모음 10자 (ㅏ~ㅣ)',
    previewMain: 'ㅏ~ㅣ',
    previewChips: ['ㅏㅑㅓㅕ', 'ㅗㅛㅜㅠㅡㅣ', '10문항'],
    sectionLabels: ['1~5번 · 기본모음 짝꿍과 모양', '6~10번 · 자음+기본모음 합체 고르기'],
    questions: [
      { id: 1, tag: '세로 모음', prefix: 'ㅏ 에 짧은 획을 하나 더하면?', optionA: 'ㅑ', optionB: 'ㅓ', answer: 'A', audioText: '야', hint: 'ㅏ → ㅑ' },
      { id: 2, tag: '세로 모음', prefix: 'ㅓ 에 짧은 획을 하나 더하면?', optionA: 'ㅑ', optionB: 'ㅕ', answer: 'B', audioText: '여', hint: 'ㅓ → ㅕ' },
      { id: 3, tag: '가로 모음', prefix: 'ㅗ 에 짧은 획을 하나 더하면?', optionA: 'ㅛ', optionB: 'ㅜ', answer: 'A', audioText: '요', hint: 'ㅗ → ㅛ' },
      { id: 4, tag: '가로 모음', prefix: 'ㅜ 에 짧은 획을 하나 더하면?', optionA: 'ㅛ', optionB: 'ㅠ', answer: 'B', audioText: '유', hint: 'ㅜ → ㅠ' },
      { id: 5, tag: '천지인', prefix: '길게 옆으로 긋는 모음은?', optionA: 'ㅡ', optionB: 'ㅣ', answer: 'A', audioText: '으', hint: 'ㅡ vs ㅣ' },
      { id: 6, tag: '모음 순서', prefix: 'ㅏ · ㅑ · ㅓ · ㅕ 다음은?', optionA: 'ㅗ', optionB: 'ㅜ', answer: 'A', audioText: '오', hint: '모음 순서' },
      { id: 7, tag: '좌우 합체', prefix: 'ㄴ + ㅓ =', optionA: '나', optionB: '너', answer: 'B', audioText: '너', hint: '자모표' },
      { id: 8, tag: '상하 합체', prefix: 'ㄷ + ㅗ =', optionA: '도', optionB: '두', answer: 'A', audioText: '도', hint: '자모표' },
      { id: 9, tag: '상하 합체', prefix: 'ㅁ + ㅜ =', optionA: '모', optionB: '무', answer: 'B', audioText: '무', hint: '자모표' },
      { id: 10, tag: '좌우 합체', prefix: 'ㅅ + ㅣ =', optionA: '시', optionB: '스', answer: 'A', audioText: '시', hint: '자모표' },
    ],
  },
  {
    globalIndex: 4,
    id: 'exam_jamo_5',
    partId: 'jamo',
    lessonNo: 5,
    circledNo: '⑤',
    title: '자음·모음 5강 · 복합모음 11자 (ㅐ~ㅢ)',
    subtitle: '두 모음이 만나 만들어진 복합모음 11자에 알맞게 ○ 표 하세요.',
    dropdownLabel: '[자음모음 5강] 복합모음 11자 (ㅐ~ㅢ)',
    previewMain: 'ㅐ~ㅢ',
    previewChips: ['ㅐㅒㅔㅖ', 'ㅘㅝㅚㅟㅢ', '10문항'],
    sectionLabels: ['1~5번 · ㅣ 결합 복합모음 (ㅐ, ㅒ, ㅔ, ㅖ, ㅢ)', '6~10번 · ㅗ/ㅜ 결합 복합모음 (ㅘ, ㅝ, ㅚ, ㅟ, ㅙ, ㅞ)'],
    questions: [
      { id: 1, tag: 'ㅣ 결합', prefix: 'ㅏ + ㅣ =', optionA: 'ㅐ', optionB: 'ㅔ', answer: 'A', audioText: '애', hint: 'ㅏ + ㅣ' },
      { id: 2, tag: 'ㅣ 결합', prefix: 'ㅓ + ㅣ =', optionA: 'ㅐ', optionB: 'ㅔ', answer: 'B', audioText: '에', hint: 'ㅓ + ㅣ' },
      { id: 3, tag: 'ㅣ 결합', prefix: 'ㅑ + ㅣ =', optionA: 'ㅒ', optionB: 'ㅖ', answer: 'A', audioText: '얘', hint: 'ㅑ + ㅣ' },
      { id: 4, tag: 'ㅣ 결합', prefix: 'ㅕ + ㅣ =', optionA: 'ㅒ', optionB: 'ㅖ', answer: 'B', audioText: '예', hint: 'ㅕ + ㅣ' },
      { id: 5, tag: 'ㅣ 결합', prefix: 'ㅡ + ㅣ =', optionA: 'ㅢ', optionB: 'ㅟ', answer: 'A', audioText: '의', hint: 'ㅡ + ㅣ' },
      { id: 6, tag: 'ㅗ 결합', prefix: 'ㅗ + ㅏ =', optionA: 'ㅘ', optionB: 'ㅝ', answer: 'A', audioText: '와', hint: 'ㅗ + ㅏ' },
      { id: 7, tag: 'ㅜ 결합', prefix: 'ㅜ + ㅓ =', optionA: 'ㅘ', optionB: 'ㅝ', answer: 'B', audioText: '워', hint: 'ㅜ + ㅓ' },
      { id: 8, tag: 'ㅗ/ㅜ+ㅣ', prefix: 'ㅗ + ㅣ =', optionA: 'ㅚ', optionB: 'ㅟ', answer: 'A', audioText: '외', hint: 'ㅗ + ㅣ' },
      { id: 9, tag: 'ㅗ/ㅜ+ㅣ', prefix: 'ㅜ + ㅣ =', optionA: 'ㅚ', optionB: 'ㅟ', answer: 'B', audioText: '위', hint: 'ㅜ + ㅣ' },
      { id: 10, tag: '삼총사', prefix: 'ㅗ + ㅐ =', optionA: 'ㅙ', optionB: 'ㅞ', answer: 'A', audioText: '왜', hint: 'ㅗ + ㅐ' },
    ],
  },

  // =========================================================================
  // PART 2. 기본글자 (1강 ~ 5강) — BASIC_LETTERS_DATA 21쪽 데이터 100% 기반
  // =========================================================================
  {
    globalIndex: 5,
    id: 'exam_basic_1',
    partId: 'basic',
    lessonNo: 1,
    circledNo: '①',
    title: '기본글자 1강 · ㅏ·ㅓ·ㅗ·ㅜ·ㅡ·ㅣ (1~6쪽)',
    subtitle: '그림과 글자 합체를 보고 알맞은 글자·낱말에 ○ 표 하세요.',
    dropdownLabel: '[기본글자 1강] ㅏㅓㅗㅜㅡㅣ (사자~가지)',
    previewMain: '사자·포도',
    previewChips: ['사자·버터', '포도·구두', '버스·가지'],
    sectionLabels: ['1~5번 · 그림 보고 낱말 고르기', '6~10번 · 기본글자 합체 & 낱말 확인'],
    questions: [
      { id: 1, tag: '① ㅏ', basicIllustKey: '사자', optionA: '사자', optionB: '자사', answer: 'A', audioText: '사자' },
      { id: 2, tag: '② ㅓ', basicIllustKey: '버터', optionA: '터버', optionB: '버터', answer: 'B', audioText: '버터' },
      { id: 3, tag: '③ ㅗ', basicIllustKey: '포도', optionA: '포도', optionB: '도포', answer: 'A', audioText: '포도' },
      { id: 4, tag: '④ ㅜ', basicIllustKey: '구두', optionA: '두구', optionB: '구두', answer: 'B', audioText: '구두' },
      { id: 5, tag: '⑤ ㅡ', basicIllustKey: '버스', optionA: '버스', optionB: '바스', answer: 'A', audioText: '버스' },
      { id: 6, tag: '⑥ ㅣ', basicIllustKey: '가지', optionA: '가시', optionB: '가지', answer: 'B', audioText: '가지' },
      { id: 7, tag: '① ㅏ 합체', prefix: 'ㄱ + ㅏ =', optionA: '가', optionB: '거', answer: 'A', audioText: '가', hint: '좌우조합' },
      { id: 8, tag: '② ㅓ 합체', prefix: 'ㅁ + ㅓ =', optionA: '모', optionB: '머', answer: 'B', audioText: '머', hint: '좌우조합' },
      { id: 9, tag: '③ ㅗ 합체', prefix: 'ㅌ + ㅗ =', optionA: '토', optionB: '트', answer: 'A', audioText: '토', hint: '상하조합' },
      { id: 10, tag: '⑤ ㅡ 합체', prefix: 'ㅋ + ㅡ =', optionA: '구', optionB: '크', answer: 'B', audioText: '크', hint: '상하조합' },
    ],
  },
  {
    globalIndex: 6,
    id: 'exam_basic_2',
    partId: 'basic',
    lessonNo: 2,
    circledNo: '②',
    title: '기본글자 2강 · ㅑ·ㅕ·ㅛ·ㅠ (7~10쪽)',
    subtitle: 'ㅑ, ㅕ, ㅛ, ㅠ가 들어간 그림 낱말과 합체 글자에 ○ 표 하세요.',
    dropdownLabel: '[기본글자 2강] ㅑㅕㅛㅠ (야자~우유)',
    previewMain: '야자·우유',
    previewChips: ['야자·여자', '표·우유', '10문항'],
    sectionLabels: ['1~5번 · 그림 낱말 & 대표 글자 고르기', '6~10번 · ㅑ·ㅕ·ㅛ·ㅠ 글자 합체 고르기'],
    questions: [
      { id: 1, tag: '⑦ ㅑ', basicIllustKey: '야자', optionA: '야자', optionB: '아자', answer: 'A', audioText: '야자' },
      { id: 2, tag: '⑧ ㅕ', basicIllustKey: '여자', optionA: '어자', optionB: '여자', answer: 'B', audioText: '여자' },
      { id: 3, tag: '⑨ ㅛ', basicIllustKey: '표', optionA: '표', optionB: '포', answer: 'A', audioText: '표' },
      { id: 4, tag: '⑩ ㅠ', basicIllustKey: '우유', optionA: '유우', optionB: '우유', answer: 'B', audioText: '우유' },
      { id: 5, tag: '⑦ ㅑ 합체', prefix: 'ㅋ + ㅑ =', optionA: '캬', optionB: '카', answer: 'A', audioText: '캬', hint: '7쪽 ㅑ' },
      { id: 6, tag: '⑦ ㅑ 합체', prefix: 'ㅊ + ㅑ =', optionA: '차', optionB: '챠', answer: 'B', audioText: '챠', hint: '7쪽 ㅑ' },
      { id: 7, tag: '⑧ ㅕ 합체', prefix: 'ㄴ + ㅕ =', optionA: '녀', optionB: '너', answer: 'A', audioText: '녀', hint: '8쪽 ㅕ' },
      { id: 8, tag: '⑧ ㅕ 합체', prefix: 'ㄹ + ㅕ =', optionA: '료', optionB: '려', answer: 'B', audioText: '려', hint: '8쪽 ㅕ' },
      { id: 9, tag: '⑨ ㅛ 합체', prefix: 'ㄱ + ㅛ =', optionA: '교', optionB: '고', answer: 'A', audioText: '교', hint: '9쪽 ㅛ' },
      { id: 10, tag: '⑩ ㅠ 합체', prefix: 'ㅎ + ㅠ =', optionA: '후', optionB: '휴', answer: 'B', audioText: '휴', hint: '10쪽 ㅠ' },
    ],
  },
  {
    globalIndex: 7,
    id: 'exam_basic_3',
    partId: 'basic',
    lessonNo: 3,
    circledNo: '③',
    title: '기본글자 3강 · ㅐ·ㅔ·ㅒ·ㅖ (11~14쪽)',
    subtitle: 'ㅐ, ㅔ, ㅒ, ㅖ가 들어간 그림 낱말과 글자 합체에 ○ 표 하세요.',
    dropdownLabel: '[기본글자 3강] ㅐㅔㅒㅖ (배~시계)',
    previewMain: '제비·시계',
    previewChips: ['배·제비', '얘·시계', '10문항'],
    sectionLabels: ['1~5번 · 그림 낱말 & 대표 글자 고르기', '6~10번 · ㅐ·ㅔ·ㅒ·ㅖ 글자 합체 고르기'],
    questions: [
      { id: 1, tag: '⑪ ㅐ', basicIllustKey: '배', optionA: '배', optionB: '바', answer: 'A', audioText: '배' },
      { id: 2, tag: '⑫ ㅔ', basicIllustKey: '제비', optionA: '저비', optionB: '제비', answer: 'B', audioText: '제비' },
      { id: 3, tag: '⑬ ㅒ', basicIllustKey: '얘', optionA: '얘', optionB: '야', answer: 'A', audioText: '얘' },
      { id: 4, tag: '⑭ ㅖ', basicIllustKey: '시계', optionA: '시겨', optionB: '시계', answer: 'B', audioText: '시계' },
      { id: 5, tag: '⑪ ㅐ 합체', prefix: 'ㅉ + ㅐ =', optionA: '째', optionB: '짜', answer: 'A', audioText: '째', hint: '11쪽 ㅐ' },
      { id: 6, tag: '⑪ ㅐ 합체', prefix: 'ㅃ + ㅐ =', optionA: '빠', optionB: '빼', answer: 'B', audioText: '빼', hint: '11쪽 ㅐ' },
      { id: 7, tag: '⑫ ㅔ 합체', prefix: 'ㅊ + ㅔ =', optionA: '체', optionB: '처', answer: 'A', audioText: '체', hint: '12쪽 ㅔ' },
      { id: 8, tag: '⑫ ㅔ 합체', prefix: 'ㄴ + ㅔ =', optionA: '너', optionB: '네', answer: 'B', audioText: '네', hint: '12쪽 ㅔ' },
      { id: 9, tag: '⑬ ㅒ 합체', prefix: 'ㄱ + ㅒ =', optionA: '걔', optionB: '계', answer: 'A', audioText: '걔', hint: '13쪽 ㅒ' },
      { id: 10, tag: '⑭ ㅖ 합체', prefix: 'ㅇ + ㅖ =', optionA: '얘', optionB: '예', answer: 'B', audioText: '예', hint: '14쪽 ㅖ' },
    ],
  },
  {
    globalIndex: 8,
    id: 'exam_basic_4',
    partId: 'basic',
    lessonNo: 4,
    circledNo: '④',
    title: '기본글자 4강 · ㅘ·ㅝ·ㅚ·ㅟ (15~18쪽)',
    subtitle: '복합모음 ㅘ, ㅝ, ㅚ, ㅟ 그림 낱말과 합체 글자에 ○ 표 하세요.',
    dropdownLabel: '[기본글자 4강] ㅘㅝㅚㅟ (사과~가위)',
    previewMain: '사과·가위',
    previewChips: ['사과·뭐', '회사·가위', '10문항'],
    sectionLabels: ['1~5번 · 그림 낱말 & 대표 글자 고르기', '6~10번 · ㅘ·ㅝ·ㅚ·ㅟ 복합 합체 고르기'],
    questions: [
      { id: 1, tag: '⑮ ㅘ', basicIllustKey: '사과', optionA: '사과', optionB: '사가', answer: 'A', audioText: '사과' },
      { id: 2, tag: '⑯ ㅝ', basicIllustKey: '뭐', optionA: '모', optionB: '뭐', answer: 'B', audioText: '뭐' },
      { id: 3, tag: '⑰ ㅚ', basicIllustKey: '회사', optionA: '회사', optionB: '호사', answer: 'A', audioText: '회사' },
      { id: 4, tag: '⑱ ㅟ', basicIllustKey: '가위', optionA: '가우', optionB: '가위', answer: 'B', audioText: '가위' },
      { id: 5, tag: '⑮ ㅘ 합체', prefix: 'ㅎ + ㅘ =', optionA: '화', optionB: '하', answer: 'A', audioText: '화', hint: 'ㅗ + ㅏ' },
      { id: 6, tag: '⑮ ㅘ 합체', prefix: 'ㄴ + ㅘ =', optionA: '누', optionB: '놔', answer: 'B', audioText: '놔', hint: 'ㅗ + ㅏ' },
      { id: 7, tag: '⑯ ㅝ 합체', prefix: 'ㅈ + ㅝ =', optionA: '줘', optionB: '조', answer: 'A', audioText: '줘', hint: 'ㅜ + ㅓ' },
      { id: 8, tag: '⑰ ㅚ 합체', prefix: 'ㅌ + ㅚ =', optionA: '토', optionB: '퇴', answer: 'B', audioText: '퇴', hint: 'ㅗ + ㅣ' },
      { id: 9, tag: '⑱ ㅟ 합체', prefix: 'ㄱ + ㅟ =', optionA: '귀', optionB: '구', answer: 'A', audioText: '귀', hint: 'ㅜ + ㅣ' },
      { id: 10, tag: '⑱ ㅟ 합체', prefix: 'ㄸ + ㅟ =', optionA: '뚜', optionB: '뛰', answer: 'B', audioText: '뛰', hint: 'ㅜ + ㅣ' },
    ],
  },
  {
    globalIndex: 9,
    id: 'exam_basic_5',
    partId: 'basic',
    lessonNo: 5,
    circledNo: '⑤',
    title: '기본글자 5강 · ㅙ·ㅞ·ㅢ & 기본글자 총정리 (19~21쪽)',
    subtitle: 'ㅙ, ㅞ, ㅢ 그림 낱말과 기본글자 전체 복습 문제에 ○ 표 하세요.',
    dropdownLabel: '[기본글자 5강] ㅙㅞㅢ & 총정리 (돼지~의사)',
    previewMain: '돼지·의사',
    previewChips: ['돼지·스웨터', '의사', '총정리'],
    sectionLabels: ['1~5번 · 그림 보고 알맞은 낱말 고르기', '6~10번 · ㅙ·ㅞ·ㅢ 합체 & 기본글자 총복습'],
    questions: [
      { id: 1, tag: '⑲ ㅙ', basicIllustKey: '돼지', optionA: '돼지', optionB: '도지', answer: 'A', audioText: '돼지' },
      { id: 2, tag: '⑳ ㅞ', basicIllustKey: '스웨터', optionA: '스우터', optionB: '스웨터', answer: 'B', audioText: '스웨터' },
      { id: 3, tag: '㉑ ㅢ', basicIllustKey: '의사', optionA: '의사', optionB: '으사', answer: 'A', audioText: '의사' },
      { id: 4, tag: '총복습 ⑩', basicIllustKey: '우유', optionA: '오유', optionB: '우유', answer: 'B', audioText: '우유' },
      { id: 5, tag: '총복습 ⑭', basicIllustKey: '시계', optionA: '시계', optionB: '시게', answer: 'A', audioText: '시계' },
      { id: 6, tag: '⑲ ㅙ 합체', prefix: 'ㅇ + ㅙ =', optionA: '왜', optionB: '웨', answer: 'A', audioText: '왜', hint: 'ㅗ + ㅐ' },
      { id: 7, tag: '⑲ ㅙ 합체', prefix: 'ㅎ + ㅙ =', optionA: '회', optionB: '홰', answer: 'B', audioText: '홰', hint: 'ㅗ + ㅐ' },
      { id: 8, tag: '⑳ ㅞ 합체', prefix: 'ㅊ + ㅞ =', optionA: '췌', optionB: '취', answer: 'A', audioText: '췌', hint: 'ㅜ + ㅔ' },
      { id: 9, tag: '㉑ ㅢ 합체', prefix: 'ㅎ + ㅢ =', optionA: '히', optionB: '희', answer: 'B', audioText: '희', hint: 'ㅡ + ㅣ' },
      { id: 10, tag: '㉑ ㅢ 합체', prefix: 'ㄸ + ㅢ =', optionA: '띄', optionB: '뛰', answer: 'A', audioText: '띄', hint: 'ㅡ + ㅣ' },
    ],
  },

  // =========================================================================
  // PART 3. 받침1 · 대표받침과 받침가족 (1강 ~ 5강) — BATCHIM_PAGES_DATA 1~11쪽
  // =========================================================================
  {
    globalIndex: 10,
    id: 'exam_batchim1_1',
    partId: 'batchim1',
    lessonNo: 1,
    circledNo: '①',
    title: '받침1 · 1강 · 대표받침 ① (ㅁ, ㅂ, ㅇ)',
    subtitle: '대표받침 ㅁ, ㅂ, ㅇ가 들어간 글자 합체와 받침 고르기에 ○ 표 하세요.',
    dropdownLabel: '[받침1 1강] 대표받침 ① (ㅁ, ㅂ, ㅇ)',
    previewMain: '곰·집·공',
    previewChips: ['곰·남·밤', '밥·집·입', '강·방·공'],
    sectionLabels: ['1~5번 · 글자 + 받침 합치기 (ㅁ, ㅂ, ㅇ)', '6~10번 · 받침 구별 & 알맞은 낱말 고르기'],
    questions: [
      { id: 1, tag: '① 받침 ㅁ', prefix: '고 + ㅁ =', optionA: '곰', optionB: '공', answer: 'A', audioText: '곰', hint: '입술 닫기 [m]' },
      { id: 2, tag: '① 받침 ㅁ', prefix: '바 + ㅁ =', optionA: '밥', optionB: '밤', answer: 'B', audioText: '밤', hint: '받침 ㅁ' },
      { id: 3, tag: '② 받침 ㅂ', prefix: '바 + ㅂ =', optionA: '밥', optionB: '방', answer: 'A', audioText: '밥', hint: '받침 ㅂ' },
      { id: 4, tag: '② 받침 ㅂ', prefix: '지 + ㅂ =', optionA: '짐', optionB: '집', answer: 'B', audioText: '집', hint: '받침 ㅂ' },
      { id: 5, tag: '③ 받침 ㅇ', prefix: '고 + ㅇ =', optionA: '공', optionB: '곰', answer: 'A', audioText: '공', hint: '콧소리 [ng]' },
      { id: 6, tag: '① 받침 ㅁ', prefix: '나 + ㅁ =', optionA: '납', optionB: '남', answer: 'B', audioText: '남', hint: '받침 ㅁ' },
      { id: 7, tag: '② 받침 ㅂ', prefix: '이 + ㅂ =', optionA: '입', optionB: '임', answer: 'A', audioText: '입', hint: '받침 ㅂ' },
      { id: 8, tag: '③ 받침 ㅇ', prefix: '가 + ㅇ =', optionA: '감', optionB: '강', answer: 'B', audioText: '강', hint: '받침 ㅇ' },
      { id: 9, tag: '③ 받침 ㅇ', prefix: '바 + ㅇ =', optionA: '방', optionB: '밤', answer: 'A', audioText: '방', hint: '받침 ㅇ' },
      { id: 10, tag: '받침 찾기', prefix: '"집" 의 받침은?', optionA: 'ㅁ', optionB: 'ㅂ', answer: 'B', audioText: '집', hint: '대표받침' },
    ],
  },
  {
    globalIndex: 11,
    id: 'exam_batchim1_2',
    partId: 'batchim1',
    lessonNo: 2,
    circledNo: '②',
    title: '받침1 · 2강 · 대표받침 ② (ㄱ, ㄴ, ㄹ, ㄷ)',
    subtitle: '대표받침 ㄱ, ㄴ, ㄹ, ㄷ 글자 합체와 낱말에 ○ 표 하세요.',
    dropdownLabel: '[받침1 2강] 대표받침 ② (ㄱ, ㄴ, ㄹ, ㄷ)',
    previewMain: '목·손·물',
    previewChips: ['숙·박·목', '눈·문·손', '달·불·물·숟가락'],
    sectionLabels: ['1~5번 · 글자 + 받침 합치기 (ㄱ, ㄴ)', '6~10번 · 글자 + 받침 합치기 (ㄹ, ㄷ)'],
    questions: [
      { id: 1, tag: '④ 받침 ㄱ', prefix: '모 + ㄱ =', optionA: '목', optionB: '몸', answer: 'A', audioText: '목', hint: '받침 ㄱ' },
      { id: 2, tag: '④ 받침 ㄱ', prefix: '수 + ㄱ =', optionA: '순', optionB: '숙', answer: 'B', audioText: '숙', hint: '받침 ㄱ' },
      { id: 3, tag: '④ 받침 ㄱ', prefix: '바 + ㄱ =', optionA: '박', optionB: '발', answer: 'A', audioText: '박', hint: '받침 ㄱ' },
      { id: 4, tag: '⑤ 받침 ㄴ', prefix: '누 + ㄴ =', optionA: '눌', optionB: '눈', answer: 'B', audioText: '눈', hint: '받침 ㄴ' },
      { id: 5, tag: '⑤ 받침 ㄴ', prefix: '소 + ㄴ =', optionA: '손', optionB: '속', answer: 'A', audioText: '손', hint: '받침 ㄴ' },
      { id: 6, tag: '⑤ 받침 ㄴ', prefix: '무 + ㄴ =', optionA: '물', optionB: '문', answer: 'B', audioText: '문', hint: '받침 ㄴ' },
      { id: 7, tag: '⑥ 받침 ㄹ', prefix: '다 + ㄹ =', optionA: '달', optionB: '단', answer: 'A', audioText: '달', hint: '받침 ㄹ' },
      { id: 8, tag: '⑥ 받침 ㄹ', prefix: '부 + ㄹ =', optionA: '분', optionB: '불', answer: 'B', audioText: '불', hint: '받침 ㄹ' },
      { id: 9, tag: '⑥ 받침 ㄹ', prefix: '무 + ㄹ =', optionA: '물', optionB: '문', answer: 'A', audioText: '물', hint: '받침 ㄹ' },
      { id: 10, tag: '⑦ 받침 ㄷ', prefix: '수 + ㄷ =', optionA: '숙', optionB: '숟', answer: 'B', audioText: '숟가락', hint: '숟가락의 숟' },
    ],
  },
  {
    globalIndex: 12,
    id: 'exam_batchim1_3',
    partId: 'batchim1',
    lessonNo: 3,
    circledNo: '③',
    title: '받침1 · 3강 · 받침 가족 ① (ㅂ가족 ㅍ · ㄱ가족 ㅋ, ㄲ)',
    subtitle: 'ㅂ 가족(ㅍ)과 ㄱ 가족(ㅋ, ㄲ)의 대표 소리와 바른 표기에 ○ 표 하세요.',
    dropdownLabel: '[받침1 3강] 받침 가족 ① (ㅍ / ㅋ, ㄲ)',
    previewMain: '숲·밖',
    previewChips: ['앞·옆·숲', '부엌·밖·꺾', '[ㅂ]·[ㄱ]소리'],
    sectionLabels: ['1~5번 · ㅂ 가족 (ㅍ → [ㅂ] 소리)', '6~10번 · ㄱ 가족 (ㅋ, ㄲ → [ㄱ] 소리)'],
    questions: [
      { id: 1, tag: '⑧ ㅂ가족 ㅍ', prefix: '"숲" 의 받침 소리는?', optionA: '[숩]', optionB: '[숙]', answer: 'A', audioText: '숲', hint: 'ㅍ → [ㅂ]' },
      { id: 2, tag: '⑧ ㅂ가족 ㅍ', prefix: '"앞" 의 받침 소리는?', optionA: '[안]', optionB: '[압]', answer: 'B', audioText: '앞', hint: 'ㅍ → [ㅂ]' },
      { id: 3, tag: '⑧ ㅂ가족 ㅍ', prefix: '"옆" 의 받침 소리는?', optionA: '[엽]', optionB: '[염]', answer: 'A', audioText: '옆', hint: 'ㅍ → [ㅂ]' },
      { id: 4, tag: '⑧ 표기 확인', prefix: '아 + ㅍ =', optionA: '압', optionB: '앞', answer: 'B', audioText: '앞', hint: '받침 ㅍ' },
      { id: 5, tag: '⑧ 가족 찾기', prefix: '받침 ㅂ 과 소리가 같은 가족은?', optionA: 'ㅍ', optionB: 'ㅋ', answer: 'A', audioText: '피읖', hint: 'ㅂ 가족' },
      { id: 6, tag: '⑨ ㄱ가족 ㅋ', prefix: '"부엌" 의 "엌" 소리는?', optionA: '[업]', optionB: '[억]', answer: 'B', audioText: '부엌', hint: 'ㅋ → [ㄱ]' },
      { id: 7, tag: '⑨ ㄱ가족 ㄲ', prefix: '"밖" 의 받침 소리는?', optionA: '[박]', optionB: '[밥]', answer: 'A', audioText: '밖', hint: 'ㄲ → [ㄱ]' },
      { id: 8, tag: '⑨ ㄱ가족 ㄲ', prefix: '"꺾" 의 받침 소리는?', optionA: '[껌]', optionB: '[꺽]', answer: 'B', audioText: '꺾', hint: 'ㄲ → [ㄱ]' },
      { id: 9, tag: '⑨ 표기 확인', prefix: '바 + ㄲ =', optionA: '밖', optionB: '박', answer: 'A', audioText: '밖', hint: '받침 ㄲ' },
      { id: 10, tag: '⑨ 가족 찾기', prefix: '받침 ㄱ 의 가족이 아닌 것은?', optionA: 'ㅋ', optionB: 'ㅍ', answer: 'B', audioText: '피읖', hint: 'ㄱ 가족: ㄱ, ㅋ, ㄲ' },
    ],
  },
  {
    globalIndex: 13,
    id: 'exam_batchim1_4',
    partId: 'batchim1',
    lessonNo: 4,
    circledNo: '④',
    title: '받침1 · 4강 · 받침 가족 ② (ㄷ가족 ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ)',
    subtitle: 'ㄷ 가족 받침 6개(ㅅ, ㅆ, ㅈ, ㅊ, ㅌ, ㅎ)의 대표 소리 [ㄷ]과 글자에 ○ 표 하세요.',
    dropdownLabel: '[받침1 4강] 받침 가족 ② (ㄷ 가족 6자)',
    previewMain: '옷·꽃·밭',
    previewChips: ['옷·있·낮', '꽃·밭·읗', '[ㄷ]소리'],
    sectionLabels: ['1~5번 · ㄷ 가족 ① (ㅅ, ㅆ, ㅈ → [ㄷ])', '6~10번 · ㄷ 가족 ② (ㅊ, ㅌ, ㅎ → [ㄷ])'],
    questions: [
      { id: 1, tag: '⑩ ㄷ가족 ㅅ', prefix: '"옷" 의 받침 소리는?', optionA: '[옫]', optionB: '[옴]', answer: 'A', audioText: '옷', hint: 'ㅅ → [ㄷ]' },
      { id: 2, tag: '⑩ ㄷ가족 ㅆ', prefix: '"있" 의 받침 소리는?', optionA: '[입]', optionB: '[읻]', answer: 'B', audioText: '있', hint: 'ㅆ → [ㄷ]' },
      { id: 3, tag: '⑩ ㄷ가족 ㅈ', prefix: '"낮" 의 받침 소리는?', optionA: '[낟]', optionB: '[낙]', answer: 'A', audioText: '낮', hint: 'ㅈ → [ㄷ]' },
      { id: 4, tag: '⑩ 표기 확인', prefix: '오 + ㅅ =', optionA: '옫', optionB: '옷', answer: 'B', audioText: '옷', hint: '받침 ㅅ' },
      { id: 5, tag: '⑩ 표기 확인', prefix: '나 + ㅈ =', optionA: '낮', optionB: '낫', answer: 'A', audioText: '낮', hint: '받침 ㅈ' },
      { id: 6, tag: '⑪ ㄷ가족 ㅊ', prefix: '"꽃" 의 받침 소리는?', optionA: '[꼭]', optionB: '[꼳]', answer: 'B', audioText: '꽃', hint: 'ㅊ → [ㄷ]' },
      { id: 7, tag: '⑪ ㄷ가족 ㅌ', prefix: '"밭" 의 받침 소리는?', optionA: '[받]', optionB: '[밥]', answer: 'A', audioText: '밭', hint: 'ㅌ → [ㄷ]' },
      { id: 8, tag: '⑪ ㄷ가족 ㅎ', prefix: '"읗" 의 받침 소리는?', optionA: '[윽]', optionB: '[읃]', answer: 'B', audioText: '읗', hint: 'ㅎ → [ㄷ]' },
      { id: 9, tag: '⑪ 표기 확인', prefix: '꼬 + ㅊ =', optionA: '꽃', optionB: '꼳', answer: 'A', audioText: '꽃', hint: '받침 ㅊ' },
      { id: 10, tag: '⑪ 가족 정리', prefix: 'ㅅ, ㅈ, ㅊ, ㅌ, ㅎ 받침의 대표 소리는?', optionA: '[ㄱ]', optionB: '[ㄷ]', answer: 'B', audioText: '디귿', hint: 'ㄷ 가족' },
    ],
  },
  {
    globalIndex: 14,
    id: 'exam_batchim1_5',
    partId: 'batchim1',
    lessonNo: 5,
    circledNo: '⑤',
    title: '받침1 · 5강 · 대표받침 7개 & 받침가족 총정리',
    subtitle: '7개 대표 소리(ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ)와 받침 가족을 한 번에 확인해요.',
    dropdownLabel: '[받침1 5강] 대표받침 & 받침가족 총정리',
    previewMain: '7대표 소리',
    previewChips: ['ㄱㄴㄷㄹㅁㅂㅇ', '숲·밖·옷·꽃', '총정리'],
    sectionLabels: ['1~5번 · 대표받침 7소리 구별하기', '6~10번 · 받침 가족 같은 소리 짝짓기'],
    questions: [
      { id: 1, tag: '7대표 소리', prefix: '받침 대표 소리는 모두 몇 개?', optionA: '7개', optionB: '14개', answer: 'A', audioText: '일곱 개', hint: 'ㄱㄴㄷㄹㅁㅂㅇ' },
      { id: 2, tag: '대표받침', prefix: '"숟가락" 의 "숟" 받침은?', optionA: 'ㅅ', optionB: 'ㄷ', answer: 'B', audioText: '숟가락', hint: '7쪽 ㄷ' },
      { id: 3, tag: '대표받침', prefix: '"곧" 과 "믿" 의 공통 받침은?', optionA: 'ㄷ', optionB: 'ㄹ', answer: 'A', audioText: '곧, 믿', hint: '7쪽 ㄷ' },
      { id: 4, tag: '대표받침', prefix: '"곰 · 남 · 밤" 의 공통 받침은?', optionA: 'ㅂ', optionB: 'ㅁ', answer: 'B', audioText: '곰, 남, 밤', hint: '1쪽 ㅁ' },
      { id: 5, tag: '대표받침', prefix: '"달 · 불 · 물" 의 공통 받침은?', optionA: 'ㄹ', optionB: 'ㄴ', answer: 'A', audioText: '달, 불, 물', hint: '6쪽 ㄹ' },
      { id: 6, tag: '소리 짝꿍', prefix: '"숲" 과 받침 소리가 같은 글자는?', optionA: '숙', optionB: '집', answer: 'B', audioText: '숲, 집', hint: '둘 다 [ㅂ]' },
      { id: 7, tag: '소리 짝꿍', prefix: '"밖" 과 받침 소리가 같은 글자는?', optionA: '박', optionB: '밭', answer: 'A', audioText: '밖, 박', hint: '둘 다 [ㄱ]' },
      { id: 8, tag: '소리 짝꿍', prefix: '"옷" 과 받침 소리가 같은 글자는?', optionA: '공', optionB: '꽃', answer: 'B', audioText: '옷, 꽃', hint: '둘 다 [ㄷ]' },
      { id: 9, tag: '소리 짝꿍', prefix: '"부엌" 의 "엌" 과 같은 받침 소리는?', optionA: '목', optionB: '문', answer: 'A', audioText: '부엌, 목', hint: '둘 다 [ㄱ]' },
      { id: 10, tag: '소리 짝꿍', prefix: '"낮 · 밭" 의 공통 받침 소리는?', optionA: '[ㅂ]', optionB: '[ㄷ]', answer: 'B', audioText: '낮, 밭', hint: 'ㄷ 가족' },
    ],
  },

  // =========================================================================
  // PART 4. 받침2 · 겹받침 (1강 ~ 5강) — BATCHIM_PAGES_DATA 12~15쪽 100% 기반
  // =========================================================================
  {
    globalIndex: 15,
    id: 'exam_batchim2_1',
    partId: 'batchim2',
    lessonNo: 1,
    circledNo: '①',
    title: '받침2 · 1강 · 겹받침 앞 자음 발음 ① (ㄳ, ㄵ, ㄼ)',
    subtitle: '앞 자음으로 소리 나는 ㄳ, ㄵ, ㄼ과 예외(밟다, 넓죽하다)에 ○ 표 하세요.',
    dropdownLabel: '[받침2 1강] 앞 자음 ① (ㄳ, ㄵ, ㄼ)',
    previewMain: '몫·앉다·여덟',
    previewChips: ['ㄳ·ㄵ·ㄼ', '예외 밟다', '10문항'],
    sectionLabels: ['1~5번 · ㄳ, ㄵ, ㄼ 앞 자음 소리 고르기', '6~10번 · 낱말 발음 & 예외 규칙 확인'],
    questions: [
      { id: 1, tag: '⑫ 겹받침 ㄳ', prefix: '겹받침 ㄳ 에서 소리 나는 자음은?', optionA: 'ㄱ', optionB: 'ㅅ', answer: 'A', audioText: '몫', hint: '앞 자음' },
      { id: 2, tag: '⑫ 겹받침 ㄵ', prefix: '겹받침 ㄵ 에서 소리 나는 자음은?', optionA: 'ㅈ', optionB: 'ㄴ', answer: 'B', audioText: '앉다', hint: '앞 자음' },
      { id: 3, tag: '⑫ 겹받침 ㄼ', prefix: '겹받침 ㄼ 의 기본 발음 자음은?', optionA: 'ㄹ', optionB: 'ㅂ', answer: 'A', audioText: '여덟', hint: '앞 자음' },
      { id: 4, tag: '⑫ ㄳ 발음', prefix: '"몫" 의 알맞은 발음은?', optionA: '[못]', optionB: '[목]', answer: 'B', audioText: '몫', hint: 'ㄳ → [ㄱ]' },
      { id: 5, tag: '⑫ ㄵ 발음', prefix: '"앉다" 의 알맞은 발음은?', optionA: '[안따]', optionB: '[앋따]', answer: 'A', audioText: '앉다', hint: 'ㄵ → [ㄴ]' },
      { id: 6, tag: '⑫ ㄼ 발음', prefix: '"여덟" 의 알맞은 발음은?', optionA: '[여덥]', optionB: '[여덜]', answer: 'B', audioText: '여덟', hint: 'ㄼ → [ㄹ]' },
      { id: 7, tag: '⑫ 예외 ★', prefix: '"밟다" 의 알맞은 발음은?', optionA: '[밥따]', optionB: '[발따]', answer: 'A', audioText: '밟다', hint: 'ㄼ 예외 → [ㅂ]' },
      { id: 8, tag: '⑫ 예외 ★', prefix: '"넓죽하다" 의 "넓" 발음은?', optionA: '[널]', optionB: '[넙]', answer: 'B', audioText: '넓죽하다', hint: 'ㄼ 예외 → [ㅂ]' },
      { id: 9, tag: '⑫ 글자 합체', prefix: '모 + ㄳ =', optionA: '몫', optionB: '목', answer: 'A', audioText: '몫', hint: '겹받침 ㄳ' },
      { id: 10, tag: '⑫ 글자 합체', prefix: '아 + ㄵ =', optionA: '안', optionB: '앉', answer: 'B', audioText: '앉다', hint: '앉다의 앉' },
    ],
  },
  {
    globalIndex: 16,
    id: 'exam_batchim2_2',
    partId: 'batchim2',
    lessonNo: 2,
    circledNo: '②',
    title: '받침2 · 2강 · 겹받침 앞 자음 발음 ② (ㄽ, ㄾ, ㅄ)',
    subtitle: '앞 자음으로 소리 나는 ㄽ, ㄾ, ㅄ의 구성과 발음에 ○ 표 하세요.',
    dropdownLabel: '[받침2 2강] 앞 자음 ② (ㄽ, ㄾ, ㅄ)',
    previewMain: '곬·핥다·없다',
    previewChips: ['ㄽ·ㄾ·ㅄ', '앞자음 발음', '10문항'],
    sectionLabels: ['1~5번 · ㄽ, ㄾ, ㅄ 앞 자음과 글자 합체', '6~10번 · 곬, 핥다, 없다 발음 고르기'],
    questions: [
      { id: 1, tag: '⑬ 겹받침 ㄽ', prefix: '겹받침 ㄽ 에서 소리 나는 자음은?', optionA: 'ㄹ', optionB: 'ㅅ', answer: 'A', audioText: '곬', hint: '앞 자음' },
      { id: 2, tag: '⑬ 겹받침 ㄾ', prefix: '겹받침 ㄾ 에서 소리 나는 자음은?', optionA: 'ㅌ', optionB: 'ㄹ', answer: 'B', audioText: '핥다', hint: '앞 자음' },
      { id: 3, tag: '⑬ 겹받침 ㅄ', prefix: '겹받침 ㅄ 에서 소리 나는 자음은?', optionA: 'ㅂ', optionB: 'ㅅ', answer: 'A', audioText: '없다', hint: '앞 자음' },
      { id: 4, tag: '⑬ 글자 합체', prefix: '고 + ㄽ =', optionA: '골', optionB: '곬', answer: 'B', audioText: '곬', hint: '겹받침 ㄽ' },
      { id: 5, tag: '⑬ 글자 합체', prefix: '하 + ㄾ =', optionA: '핥', optionB: '할', answer: 'A', audioText: '핥다', hint: '핥다의 핥' },
      { id: 6, tag: '⑬ 글자 합체', prefix: '어 + ㅄ =', optionA: '업', optionB: '없', answer: 'B', audioText: '없다', hint: '없다의 없' },
      { id: 7, tag: '⑬ ㄽ 발음', prefix: '"곬" 의 알맞은 발음은?', optionA: '[골]', optionB: '[곧]', answer: 'A', audioText: '곬', hint: 'ㄽ → [ㄹ]' },
      { id: 8, tag: '⑬ ㄾ 발음', prefix: '"핥다" 의 알맞은 발음은?', optionA: '[핟따]', optionB: '[할따]', answer: 'B', audioText: '핥다', hint: 'ㄾ → [ㄹ]' },
      { id: 9, tag: '⑬ ㅄ 발음', prefix: '"없다" 의 알맞은 발음은?', optionA: '[업따]', optionB: '[얻따]', answer: 'A', audioText: '없다', hint: 'ㅄ → [ㅂ]' },
      { id: 10, tag: '⑬ 규칙 확인', prefix: 'ㄽ · ㄾ · ㅄ 은 어느 쪽 자음을 읽나요?', optionA: '뒤 자음', optionB: '앞 자음', answer: 'B', audioText: '앞 자음', hint: '앞 자음 6개 중 3개' },
    ],
  },
  {
    globalIndex: 17,
    id: 'exam_batchim2_3',
    partId: 'batchim2',
    lessonNo: 3,
    circledNo: '③',
    title: '받침2 · 3강 · 겹받침 뒤 자음 발음 (ㄺ, ㄻ, ㄿ)',
    subtitle: '뒤 자음으로 소리 나는 ㄺ, ㄻ, ㄿ과 예외(읽고, 맑게)에 ○ 표 하세요.',
    dropdownLabel: '[받침2 3강] 뒤 자음 (ㄺ, ㄻ, ㄿ)',
    previewMain: '닭·삶·읊다',
    previewChips: ['ㄺ·ㄻ·ㄿ', '예외 읽고·맑게', '10문항'],
    sectionLabels: ['1~5번 · ㄺ, ㄻ, ㄿ 뒤 자음 소리 고르기', '6~10번 · 낱말 발음 & ㄱ 앞 예외 확인'],
    questions: [
      { id: 1, tag: '⑭ 겹받침 ㄺ', prefix: '겹받침 ㄺ 에서 기본 발음 자음은?', optionA: 'ㄱ', optionB: 'ㄹ', answer: 'A', audioText: '닭', hint: '뒤 자음' },
      { id: 2, tag: '⑭ 겹받침 ㄻ', prefix: '겹받침 ㄻ 에서 소리 나는 자음은?', optionA: 'ㄹ', optionB: 'ㅁ', answer: 'B', audioText: '삶', hint: '뒤 자음' },
      { id: 3, tag: '⑭ 겹받침 ㄿ', prefix: '겹받침 ㄿ 의 받침 대표 소리는?', optionA: '[ㅂ]', optionB: '[ㄹ]', answer: 'A', audioText: '읊다', hint: '뒤 자음 ㅍ → [ㅂ]' },
      { id: 4, tag: '⑭ ㄺ 발음', prefix: '"닭" 의 알맞은 발음은?', optionA: '[달]', optionB: '[닥]', answer: 'B', audioText: '닭', hint: 'ㄺ → [ㄱ]' },
      { id: 5, tag: '⑭ ㄻ 발음', prefix: '"삶" 의 알맞은 발음은?', optionA: '[삼]', optionB: '[살]', answer: 'A', audioText: '삶', hint: 'ㄻ → [ㅁ]' },
      { id: 6, tag: '⑭ ㄿ 발음', prefix: '"읊다" 의 알맞은 발음은?', optionA: '[을따]', optionB: '[읍따]', answer: 'B', audioText: '읊다', hint: 'ㄿ → [ㅂ]' },
      { id: 7, tag: '⑭ 예외 ★', prefix: '"읽고" (ㄱ 앞 ㄺ) 의 발음은?', optionA: '[일꼬]', optionB: '[익꼬]', answer: 'A', audioText: '읽고', hint: 'ㄱ 앞에서 [ㄹ]' },
      { id: 8, tag: '⑭ 예외 ★', prefix: '"맑게" (ㄱ 앞 ㄺ) 의 발음은?', optionA: '[막께]', optionB: '[말께]', answer: 'B', audioText: '맑게', hint: 'ㄱ 앞에서 [ㄹ]' },
      { id: 9, tag: '⑭ 글자 합체', prefix: '다 + ㄺ =', optionA: '닭', optionB: '달', answer: 'A', audioText: '닭', hint: '겹받침 ㄺ' },
      { id: 10, tag: '⑭ 글자 합체', prefix: '사 + ㄻ =', optionA: '삼', optionB: '삶', answer: 'B', audioText: '삶', hint: '겹받침 ㄻ' },
    ],
  },
  {
    globalIndex: 18,
    id: 'exam_batchim2_4',
    partId: 'batchim2',
    lessonNo: 4,
    circledNo: '④',
    title: '받침2 · 4강 · ㅎ이 있는 겹받침 (ㄶ, ㅀ)',
    subtitle: 'ㅎ 겹받침 ㄶ, ㅀ의 거센소리 되기(ㅌ, ㅋ, ㅊ)와 ㅎ 탈락에 ○ 표 하세요.',
    dropdownLabel: '[받침2 4강] ㅎ 겹받침 (ㄶ, ㅀ)',
    previewMain: '많다·싫다',
    previewChips: ['많다·많아', '싫다·싫어·잃다', '10문항'],
    sectionLabels: ['1~5번 · ㄶ (많다, 많고, 많아) 발음 고르기', '6~10번 · ㅀ (싫다, 싫지, 싫어, 잃다) 발음 고르기'],
    questions: [
      { id: 1, tag: '⑮ ㄶ 거센소리', prefix: '"많다" (ㅎ+ㄷ) 의 발음은?', optionA: '[만타]', optionB: '[만다]', answer: 'A', audioText: '많다', hint: 'ㅎ + ㄷ → ㅌ' },
      { id: 2, tag: '⑮ ㄶ 거센소리', prefix: '"많고" (ㅎ+ㄱ) 의 발음은?', optionA: '[만고]', optionB: '[만코]', answer: 'B', audioText: '많고', hint: 'ㅎ + ㄱ → ㅋ' },
      { id: 3, tag: '⑮ ㄶ ㅎ탈락', prefix: '"많아" (모음 앞) 의 발음은?', optionA: '[마나]', optionB: '[만하]', answer: 'A', audioText: '많아', hint: 'ㅎ 사라짐' },
      { id: 4, tag: '⑮ 글자 합체', prefix: '마 + ㄶ =', optionA: '만', optionB: '많', answer: 'B', audioText: '많다', hint: '많다의 많' },
      { id: 5, tag: '⑮ ㅎ 규칙', prefix: 'ㅎ + ㄷ 이 만나면 어떤 소리?', optionA: 'ㅌ', optionB: 'ㄸ', answer: 'A', audioText: '티읕', hint: '거센소리 되기' },
      { id: 6, tag: '⑮ ㅀ 거센소리', prefix: '"싫다" (ㅎ+ㄷ) 의 발음은?', optionA: '[실다]', optionB: '[실타]', answer: 'B', audioText: '싫다', hint: 'ㅎ + ㄷ → ㅌ' },
      { id: 7, tag: '⑮ ㅀ 거센소리', prefix: '"싫지" (ㅎ+ㅈ) 의 발음은?', optionA: '[실치]', optionB: '[실지]', answer: 'A', audioText: '싫지', hint: 'ㅎ + ㅈ → ㅊ' },
      { id: 8, tag: '⑮ ㅀ ㅎ탈락', prefix: '"싫어" (모음 앞) 의 발음은?', optionA: '[실허]', optionB: '[시러]', answer: 'B', audioText: '싫어', hint: 'ㅎ 사라짐' },
      { id: 9, tag: '⑮ ㅀ 거센소리', prefix: '"잃다" (ㅎ+ㄷ) 의 발음은?', optionA: '[일타]', optionB: '[일다]', answer: 'A', audioText: '잃다', hint: 'ㅎ + ㄷ → ㅌ' },
      { id: 10, tag: '⑮ 글자 합체', prefix: '시 + ㅀ =', optionA: '실', optionB: '싫', answer: 'B', audioText: '싫다', hint: '싫다의 싫' },
    ],
  },
  {
    globalIndex: 19,
    id: 'exam_batchim2_5',
    partId: 'batchim2',
    lessonNo: 5,
    circledNo: '⑤',
    title: '받침2 · 5강 · 겹받침 11자 종합 평가',
    subtitle: '앞 자음(6개) · 뒤 자음(3개) · ㅎ 받침(2개) 겹받침 전체를 총복습해요.',
    dropdownLabel: '[받침2 5강] 겹받침 11자 종합 평가',
    previewMain: '겹받침 11자',
    previewChips: ['앞6 · 뒤3 · ㅎ2', '예외 포함', '총정리'],
    sectionLabels: ['1~5번 · 앞 자음 vs 뒤 자음 구별하기', '6~10번 · 겹받침 대표 낱말 & 예외 총복습'],
    questions: [
      { id: 1, tag: '앞 vs 뒤', prefix: '뒤 자음으로 소리 나는 겹받침은?', optionA: 'ㄺ', optionB: 'ㅄ', answer: 'A', audioText: '닭', hint: '뒤 자음: ㄺ, ㄻ, ㄿ' },
      { id: 2, tag: '앞 vs 뒤', prefix: '앞 자음으로 소리 나는 겹받침은?', optionA: 'ㄻ', optionB: 'ㄵ', answer: 'B', audioText: '앉다', hint: '앞 자음 6개' },
      { id: 3, tag: '앞 자음', prefix: '"몫 · 앉다 · 없다" 의 공통점은?', optionA: '앞 자음 발음', optionB: '뒤 자음 발음', answer: 'A', audioText: '몫, 앉다, 없다', hint: 'ㄳ, ㄵ, ㅄ' },
      { id: 4, tag: '뒤 자음', prefix: '"닭 · 삶 · 읊다" 의 공통점은?', optionA: '앞 자음 발음', optionB: '뒤 자음 발음', answer: 'B', audioText: '닭, 삶, 읊다', hint: 'ㄺ, ㄻ, ㄿ' },
      { id: 5, tag: 'ㅎ 받침', prefix: '뒤에 모음이 오면 ㅎ이 사라지는 것은?', optionA: '많아 [마나]', optionB: '많다 [만타]', answer: 'A', audioText: '많아', hint: 'ㅎ 탈락' },
      { id: 6, tag: '종합 발음', prefix: '"여덟" 의 알맞은 발음은?', optionA: '[여덥]', optionB: '[여덜]', answer: 'B', audioText: '여덟', hint: 'ㄼ 앞 자음' },
      { id: 7, tag: '예외 복습', prefix: '"밟다" 의 알맞은 발음은?', optionA: '[밥따]', optionB: '[발따]', answer: 'A', audioText: '밟다', hint: 'ㄼ 예외' },
      { id: 8, tag: '종합 발음', prefix: '"없다" 의 알맞은 발음은?', optionA: '[얻따]', optionB: '[업따]', answer: 'B', audioText: '없다', hint: 'ㅄ → [ㅂ]' },
      { id: 9, tag: '예외 복습', prefix: '"읽고" 의 알맞은 발음은?', optionA: '[일꼬]', optionB: '[익꼬]', answer: 'A', audioText: '읽고', hint: 'ㄱ 앞 ㄺ 예외' },
      { id: 10, tag: '종합 발음', prefix: '"싫어" 의 알맞은 발음은?', optionA: '[실허]', optionB: '[시러]', answer: 'B', audioText: '싫어', hint: 'ㅀ ㅎ 탈락' },
    ],
  },
];

interface HangeulExamSheetProps {
  lesson: HangeulExamLesson;
}

export const HangeulExamSheet: React.FC<HangeulExamSheetProps> = ({ lesson }) => {
  const part = HANGEUL_EXAM_PART_MAP[lesson.partId];
  const [selected, setSelected] = useState<Record<number, 'A' | 'B'>>({});
  const [isGraded, setIsGraded] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const handleChoose = (qId: number, choice: 'A' | 'B') => {
    playCutePop();
    setSelected((prev) => ({ ...prev, [qId]: choice }));
    if (isGraded) setIsGraded(false);
  };

  const handleGrade = () => {
    playSuccessChime();
    setIsGraded(true);
  };

  const handleReset = () => {
    playCutePop();
    setSelected({});
    setIsGraded(false);
    setShowAnswerKey(false);
  };

  const correctCount = lesson.questions.reduce(
    (acc, q) => acc + (selected[q.id] === q.answer ? 1 : 0),
    0
  );

  const leftQuestions = lesson.questions.slice(0, 5);
  const rightQuestions = lesson.questions.slice(5, 10);

  const renderQuestionRow = (q: HangeulExamQuestion) => {
    const userChoice = selected[q.id];
    const basicIllust = q.basicIllustKey
      ? BASIC_LETTERS_ILLUSTRATIONS[q.basicIllustKey]
      : undefined;

    const getOptionCircleStyle = (optKey: 'A' | 'B') => {
      const isChosen = userChoice === optKey;
      const isCorrectOpt = q.answer === optKey;

      if (showAnswerKey && isCorrectOpt) {
        return 'border-[2.5px] border-rose-500 bg-rose-50 text-rose-800 rounded-full';
      }
      if (isGraded) {
        if (isChosen && isCorrectOpt) {
          return 'border-[2.5px] border-emerald-500 bg-emerald-50 text-emerald-900 rounded-full';
        }
        if (isChosen && !isCorrectOpt) {
          return 'border-[2.5px] border-rose-500 bg-rose-50 text-rose-700 line-through rounded-full';
        }
        if (!isChosen && isCorrectOpt) {
          return 'border-2 border-dashed border-emerald-500 text-emerald-800 rounded-full';
        }
      } else if (isChosen) {
        return 'border-[2.5px] border-rose-500 bg-rose-50/60 text-slate-900 rounded-full';
      }
      return 'border-2 border-transparent hover:border-slate-300 hover:bg-slate-50 rounded-full text-slate-900';
    };

    return (
      <div
        key={q.id}
        className="rounded-xl border-[1.5px] border-slate-200 bg-white px-3 py-2 flex items-center justify-between gap-2 min-h-[82px]"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
            style={{ backgroundColor: part.accentHex }}
          >
            {q.id}
          </div>

          {basicIllust && (
            <div className="w-14 h-14 rounded-lg border border-amber-200 bg-amber-50/40 flex items-center justify-center shrink-0 overflow-hidden [&>svg]:w-12 [&>svg]:h-12">
              {basicIllust}
            </div>
          )}

          <div className="flex flex-col justify-center min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="text-[10px] font-black px-1.5 py-[1px] rounded"
                style={{
                  backgroundColor: part.tintBgHex,
                  color: part.accentDarkHex,
                }}
              >
                {q.tag}
              </span>
              {q.hint && (
                <span className="text-[10.5px] font-bold text-slate-500">[{q.hint}]</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[16px] font-black text-slate-900 leading-snug">
              {q.prefix && <span className="mr-0.5">{q.prefix}</span>}
              <span className="inline-flex items-center font-black tracking-tight">
                <span className="text-slate-400 font-bold mr-0.5">(</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => handleChoose(q.id, 'A')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleChoose(q.id, 'A');
                    }
                  }}
                  className={`inline-block px-2 py-0.5 transition-all cursor-pointer select-none font-black text-[16px] leading-tight ${getOptionCircleStyle('A')}`}
                >
                  {q.optionA}
                </span>
                <span className="text-slate-400 font-extrabold mx-1">/</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => handleChoose(q.id, 'B')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleChoose(q.id, 'B');
                    }
                  }}
                  className={`inline-block px-2 py-0.5 transition-all cursor-pointer select-none font-black text-[16px] leading-tight ${getOptionCircleStyle('B')}`}
                >
                  {q.optionB}
                </span>
                <span className="text-slate-400 font-bold ml-0.5">)</span>
              </span>
              {q.suffix && <span>{q.suffix}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isGraded && userChoice && (
            <span
              className={`no-print text-xs font-black px-1.5 py-0.5 rounded ${
                userChoice === q.answer
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {userChoice === q.answer ? '○' : '×'}
            </span>
          )}
          <button
            type="button"
            onClick={() => speakKorean(q.audioText)}
            className="no-print w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            title="발음 듣기"
            aria-label={`${q.id}번 발음 듣기`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[3px] shadow-md mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{
        minHeight: '690px',
        borderColor: part.accentHex,
        padding: '16px 24px 14px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b-2 border-slate-200 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="px-2.5 py-1 rounded-lg text-white text-xs font-black shrink-0"
            style={{ backgroundColor: part.accentHex }}
          >
            {part.partNumber} · {lesson.lessonNo}강
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[19px] font-black text-slate-900 leading-tight truncate">
                {lesson.title}
              </h2>
              <span
                className="text-[10.5px] font-black px-2 py-0.5 rounded border shrink-0"
                style={{
                  backgroundColor: part.tintBgHex,
                  borderColor: part.borderHex,
                  color: part.accentDarkHex,
                }}
              >
                {lesson.globalIndex + 1} / 20
              </span>
            </div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">
              ✏️ {lesson.subtitle}
            </p>
          </div>
        </div>

        {/* Name & Score Strip */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="rounded-lg border-2 border-slate-300 px-3 py-1.5 bg-slate-50/60 flex items-center gap-3 text-xs font-black text-slate-700">
            <span>학년·반: ______</span>
            <span>이름: __________</span>
            <span
              className="px-2 py-0.5 rounded bg-white border"
              style={{ borderColor: part.borderHex, color: part.accentDarkHex }}
            >
              점수: {isGraded ? `${correctCount}` : '   '} / 10
            </span>
          </div>
          <div className="shrink-0 -my-1">
            <MiniJollaman pose="cheer" size={36} teamColor={part.accentHex} />
          </div>
        </div>
      </div>

      {/* Web-only Interactive Controls */}
      <div className="no-print flex items-center justify-between mb-2.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
        <span className="text-xs font-bold text-slate-600">
          💡 화면에서 직접 <strong className="text-slate-900">( A / B )</strong> 보기를 눌러 풀어보거나, 인쇄해서 종이 쪽지시험으로 활용하세요.
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handleGrade}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-black text-white cursor-pointer transition-opacity hover:opacity-90"
            style={{ backgroundColor: part.accentHex }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            채점하기
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setShowAnswerKey((v) => !v);
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-black border cursor-pointer transition-colors ${
              showAnswerKey
                ? 'bg-rose-50 border-rose-400 text-rose-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {showAnswerKey ? '정답 숨기기' : '정답 보기'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            초기화
          </button>
        </div>
      </div>

      {/* 2 Columns × 5 Questions Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <div
            className="px-3 py-1 rounded-lg text-xs font-black border"
            style={{
              backgroundColor: part.tintBgHex,
              borderColor: part.borderHex,
              color: part.accentDarkHex,
            }}
          >
            {lesson.sectionLabels[0]}
          </div>
          <div className="flex flex-col gap-2 flex-1 justify-between">
            {leftQuestions.map(renderQuestionRow)}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="px-3 py-1 rounded-lg text-xs font-black border"
            style={{
              backgroundColor: part.tintBgHex,
              borderColor: part.borderHex,
              color: part.accentDarkHex,
            }}
          >
            {lesson.sectionLabels[1]}
          </div>
          <div className="flex flex-col gap-2 flex-1 justify-between">
            {rightQuestions.map(renderQuestionRow)}
          </div>
        </div>
      </div>

      {/* Bottom Footer & Teacher Answer Key */}
      <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-500">
        <span>
          해볼 한국어 · 한글 쪽지시험 · {part.fullTitle} 중 {lesson.lessonNo}강
        </span>
        <span className="text-[10px] font-extrabold text-slate-400">
          {showAnswerKey
            ? `정답: ${lesson.questions
                .map((q) => `${q.id}.${q.answer === 'A' ? q.optionA : q.optionB}`)
                .join(' / ')}`
            : '참 잘했어요! ★ ★ ★'}
        </span>
      </div>
    </div>
  );
};
