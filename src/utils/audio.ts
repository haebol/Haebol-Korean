// Audio helper using Web Speech API & Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playCutePop(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // Ignore audio errors
  }
}

/**
 * 종이 넘기는 소리 (샤륵 / 스륵 하는 부드러운 아날로그 페이퍼 플립/슬라이드 사운드)
 */
export function playPaperFlipSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const duration = 0.14; // 140ms
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    // Textured noise mimicking friction of paper sliding
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555;
      b1 = 0.99332 * b1 + white * 0.0750;
      b2 = 0.96900 * b2 + white * 0.1538;
      const pink = b0 + b1 + b2 + white * 0.5362;
      output[i] = pink * 0.12;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Dual bandpass sweep: frequency sweep mimics paper brush ("샤-륵")
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(2800, now + 0.06);
    filter.frequency.exponentialRampToValueAtTime(1600, now + duration);
    filter.Q.setValueAtTime(1.9, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.26, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + duration + 0.01);
  } catch {
    // Ignore audio errors
  }
}

export function playSuccessChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + idx * 0.09);
      gain.gain.setValueAtTime(0, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.36);
    });
  } catch {
    // Ignore audio errors
  }
}

/**
 * 숏폼 밈 사운드 효과음 (초등학생들이 유튜브 쇼츠/릴스에서 친숙하게 듣는 짧고 경쾌한 8비트 아이템 획득 & 팡파레 밈 사운드)
 */
export function playMemeSuccessSfx(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. 8-Bit Retro Coin / Power-up Arpeggio (B4 -> E5 -> G#5 -> B5 -> E6)
    const arpeggio = [493.88, 659.25, 830.61, 987.77, 1318.51, 1661.22];
    arpeggio.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square'; // 8-bit game meme signature
      const startTime = now + idx * 0.045;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.22, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.13);
    });

    // 2. Cheerful Viral "Tada! Ding-Ding!" Meme Chime Accent (High Triangles)
    const memeBells = [
      { f: 1046.5, t: 0.28, d: 0.25 }, // C6
      { f: 1567.98, t: 0.38, d: 0.45 }, // G6 (sparkle ding)
    ];
    memeBells.forEach(b => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const startTime = now + b.t;
      osc.frequency.setValueAtTime(b.f, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + b.d);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + b.d + 0.02);
    });

    // 3. Cute Sub-Bass Boing Pop
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(220, now);
    bassOsc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
    bassGain.gain.setValueAtTime(0.25, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    bassOsc.connect(bassGain);
    bassGain.connect(ctx.destination);
    bassOsc.start(now);
    bassOsc.stop(now + 0.16);
  } catch {
    // Ignore audio errors
  }
}

export function playApplauseFanfare(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Fanfare chords
    const notes = [
      { f: 523.25, time: 0 },    // C5
      { f: 659.25, time: 0.12 }, // E5
      { f: 783.99, time: 0.24 }, // G5
      { f: 1046.5, time: 0.38 }, // C6
      { f: 1318.5, time: 0.52 }, // E6
      { f: 1567.98, time: 0.68 } // G6
    ];
    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.time);
      gain.gain.setValueAtTime(0, now + n.time);
      gain.gain.linearRampToValueAtTime(0.28, now + n.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.time + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.time);
      osc.stop(now + n.time + 0.52);
    });

    // Rhythmic clap noise bursts
    for (let i = 0; i < 8; i++) {
      const clapTime = now + 0.3 + i * 0.13;
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        data[j] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000 + (i % 3) * 200, clapTime);
      filter.Q.setValueAtTime(1.5, clapTime);

      const clapGain = ctx.createGain();
      clapGain.gain.setValueAtTime(0.2, clapTime);
      clapGain.gain.exponentialRampToValueAtTime(0.01, clapTime + 0.05);

      noise.connect(filter);
      filter.connect(clapGain);
      clapGain.connect(ctx.destination);
      noise.start(clapTime);
      noise.stop(clapTime + 0.06);
    }
  } catch {
    // Ignore audio errors
  }
}

export function playGentleBoop(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(240, now + 0.15);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  } catch {
    // Ignore audio errors
  }
}

const COMBO_SCALE_FREQS = [
  523.25, // C5 도
  587.33, // D5 레
  659.25, // E5 미
  698.46, // F5 파
  783.99, // G5 솔
  880.0,  // A5 라
  987.77, // B5 시
  1046.5, // C6 높은 도
  1174.66 // D6
];

export function playBalloonPopSound(combo: number = 1): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const scaleIdx = Math.min(COMBO_SCALE_FREQS.length - 1, Math.max(0, combo - 1));
    const noteFreq = COMBO_SCALE_FREQS[scaleIdx];

    // 1. Crisp air snap noise burst ("팡!")
    const duration = 0.085;
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1900, now);
    filter.frequency.exponentialRampToValueAtTime(520, now + duration);
    filter.Q.setValueAtTime(1.1, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.45, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.005, now + duration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + duration + 0.01);

    // 2. Bouncy rubber pop thump
    const thumpOsc = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thumpOsc.type = 'sine';
    thumpOsc.frequency.setValueAtTime(500 + scaleIdx * 35, now);
    thumpOsc.frequency.exponentialRampToValueAtTime(115, now + 0.075);
    thumpGain.gain.setValueAtTime(0.32, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.005, now + 0.08);
    thumpOsc.connect(thumpGain);
    thumpGain.connect(ctx.destination);
    thumpOsc.start(now);
    thumpOsc.stop(now + 0.09);

    // 3. Combo-ascending musical pitch ping (도→레→미→파→솔→라→시→도)
    const pingOsc = ctx.createOscillator();
    const pingGain = ctx.createGain();
    pingOsc.type = 'triangle';
    pingOsc.frequency.setValueAtTime(noteFreq, now + 0.025);
    pingOsc.frequency.exponentialRampToValueAtTime(noteFreq * 1.12, now + 0.16);
    pingGain.gain.setValueAtTime(0.001, now);
    pingGain.gain.linearRampToValueAtTime(Math.min(0.32, 0.22 + scaleIdx * 0.012), now + 0.04);
    pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    pingOsc.connect(pingGain);
    pingGain.connect(ctx.destination);
    pingOsc.start(now + 0.02);
    pingOsc.stop(now + 0.26);
  } catch {
    // Ignore audio errors
  }
}

export function playWindGustSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const dur = 0.55;
    const bufSize = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      const env = Math.sin((i / bufSize) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * env * 0.6;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(380, now);
    filter.frequency.exponentialRampToValueAtTime(980, now + dur * 0.45);
    filter.frequency.exponentialRampToValueAtTime(320, now + dur);
    filter.Q.setValueAtTime(2.2, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + dur + 0.02);
  } catch {
    // Ignore audio errors
  }
}

export function playComicWrongSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Playful two-step descending "뿌~잉 / 띠용~" comic slide
    const notes = [
      { startFreq: 350, endFreq: 270, start: 0, dur: 0.13 },
      { startFreq: 260, endFreq: 135, start: 0.13, dur: 0.28 },
    ];

    notes.forEach((n) => {
      const startTime = now + n.start;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(n.endFreq, startTime + n.dur);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + n.dur + 0.02);
    });
  } catch {
    // Ignore audio errors
  }
}

/**
 * 베토벤 운명 교향곡 5번 도입부 밈 사운드 (짜-잔-잔-잔~~, Da-da-da-dum~~)
 * 오답 선택 시 극적인 절망과 유쾌한 웃음을 유발하는 1~1.5초 클래식 밈 사운드
 */
export function playBeethovenFateMemeSound(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // G4 = 392.00 Hz, Eb4 = 311.13 Hz
    const fateNotes = [
      { f: 392.00, start: 0, dur: 0.13 },       // 짜 (G4)
      { f: 392.00, start: 0.16, dur: 0.13 },    // 잔 (G4)
      { f: 392.00, start: 0.32, dur: 0.13 },    // 잔 (G4)
      { f: 311.13, start: 0.48, dur: 1.15 },    // 잔~~~ (Eb4 fermata)
    ];

    fateNotes.forEach(note => {
      const startTime = now + note.start;
      const endTime = startTime + note.dur;

      // 1. Sawtooth / Brass layer
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(note.f, startTime);

      // 2. Octave Sub Bass (G3 / Eb3)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(note.f / 2, startTime);

      // Lowpass filter for warm orchestral body
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, startTime);

      gain1.gain.setValueAtTime(0, startTime);
      gain1.gain.linearRampToValueAtTime(0.24, startTime + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.001, endTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(startTime);
      osc1.stop(endTime + 0.02);
      osc2.start(startTime);
      osc2.stop(endTime + 0.02);
    });
  } catch {
    // Ignore audio errors
  }
}

export function playEmergencyAlert(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [587.33, 880]; // D5, A5
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.12);
      gain.gain.setValueAtTime(0.25, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.12 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.26);
    });
  } catch {
    // Ignore audio errors
  }
}

// Speech synthesis voice cache and state
let cachedKoreanVoice: SpeechSynthesisVoice | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

function findBestKoreanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Filter Korean voices
  const koreanVoices = voices.filter(v => 
    v.lang.toLowerCase().startsWith('ko') || 
    v.lang.toLowerCase().includes('kr') || 
    v.name.toLowerCase().includes('korean') ||
    v.name.includes('한국어')
  );

  if (koreanVoices.length === 0) return null;

  // Score each voice: strictly prioritize natural, friendly female teacher voices (Microsoft SunHi on Edge, Google 한국어 on Chrome/Android, Yuna on Apple) and completely exclude male/robotic voices
  const scoreVoice = (v: SpeechSynthesisVoice): number => {
    let score = 0;
    const name = v.name.toLowerCase();

    // 1. Strictly eliminate male voices (e.g. InJoon, Minho, male, 남성) to guarantee a friendly female teacher voice
    if (
      name.includes('injoon') ||
      name.includes('minho') ||
      name.includes('male') ||
      name.includes('남성')
    ) {
      return -500;
    }

    // 2. Penalize robotic desktop SAPI voices (e.g. Heami Desktop)
    if (name.includes('desktop') || name.includes('sapi')) {
      score -= 200;
    }

    // 3. Microsoft SunHi (the warm, clear, friendly female teacher voice in Microsoft Edge on Windows)
    if (name.includes('sunhi')) {
      score += 260;
    }

    // 4. Google 한국어 (standard mobile Android / Chrome friendly female teacher voice)
    if (name.includes('google') || name.includes('ko-kr-x-ism') || name.includes('한국어')) {
      score += 240;
    }

    // 5. Apple Yuna / Sora / Seoyeon (iOS / Mac friendly female teacher voice)
    if (name.includes('yuna')) score += 230;
    if (name.includes('sora') || name.includes('seoyeon')) score += 210;

    // 6. Explicit female identifiers
    if (name.includes('female') || name.includes('여성')) score += 100;

    // 7. Natural / Online / Neural enhancement
    if (name.includes('natural') || name.includes('online')) score += 80;
    if (name.includes('neural') || name.includes('enhanced') || name.includes('premium')) score += 50;

    // Mobile default voice bonus
    if (v.default) score += 20;

    return score;
  };

  koreanVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a));
  return koreanVoices[0];
}

// Ensure voices are loaded even if getVoices() is initially empty on page load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedKoreanVoice = findBestKoreanVoice();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedKoreanVoice = findBestKoreanVoice();
  };
}

const JAMO_CONSONANT_NAMES: Record<string, string> = {
  'ㄱ': '기역', 'ㄴ': '니은', 'ㄷ': '디귿', 'ㄹ': '리을',
  'ㅁ': '미음', 'ㅂ': '비읍', 'ㅅ': '시옷', 'ㅇ': '이응',
  'ㅈ': '지읒', 'ㅊ': '치읓', 'ㅋ': '키읔', 'ㅌ': '티읕',
  'ㅍ': '피읖', 'ㅎ': '히읗'
};

const JAMO_VOWEL_PRONUNCIATIONS: Record<string, string> = {
  'ㅏ': '아', 'ㅓ': '어', 'ㅗ': '오', 'ㅜ': '우', 'ㅡ': '으', 'ㅣ': '이',
  'ㅑ': '야', 'ㅕ': '여', 'ㅛ': '요', 'ㅠ': '유',
  'ㅐ': '애', 'ㅔ': '에', 'ㅒ': '얘', 'ㅖ': '예',
  'ㅘ': '와', 'ㅝ': '워', 'ㅚ': '외', 'ㅟ': '위', 'ㅢ': '의',
  'ㅙ': '왜', 'ㅞ': '웨'
};

// 'ㄹ' 받침 어간 + '-다' 동사/형용사는 표준발음법상 [다](예사소리)이지만
// 모바일 TTS가 [따]로 잘못 된소리 발음하는 경우가 많아 '어간 + 다'로 띄어 예사소리 발음을 유지함
const RIEUL_DA_VERBS = new Set([
  '놀다', '알다', '열다', '살다', '울다', '풀다',
  '날다', '멀다', '만들다', '떠들다', '힘들다',
  '걸다', '물다', '불다', '길다', '달다', '밀다', '팔다', '갈다', '돌다', '말다',
  '들다', '줄다'
]);

// 정확한 단어 단위 표준발음 TTS 치환 테이블 (표시 텍스트는 절대 변경하지 않음)
const EXACT_WORD_TTS_MAP: Record<string, string> = {
  // 1) 표준발음법 제24항: 어간 받침 ㄴ(ㄵ), ㅁ(ㄻ) 뒤 어미 첫소리 ㄱ·ㄷ·ㅅ·ㅈ 된소리되기
  // (주의: 사동 접미사 '-기-'가 붙는 '남기다' 등은 된소리되지 않으므로 제외)
  '앉다': '안따', '앉고': '안꼬', '앉지': '안찌',
  '안다': '안따', '안고': '안꼬', '안지': '안찌',
  '신다': '신따', '신고': '신꼬', '신지': '신찌',
  '남다': '남따', '남고': '남꼬', '남지': '남찌',
  '참다': '참따', '참고': '참꼬', '참지': '참찌',
  '심다': '심따', '심고': '심꼬', '심지': '심찌',
  '닮다': '담따', '닮고': '담꼬', '닮지': '담찌',

  // 2) 표준발음법 제23항: 받침 ㄱ(ㄲ,ㅋ,ㄳ,ㄺ), ㄷ(ㅅ,ㅆ,ㅈ,ㅊ,ㅌ), ㅂ(ㅍ,ㄼ,ㄿ,ㅄ) 뒤 된소리되기
  // ㄱ·ㄲ·ㄺ 받침 용언
  '먹다': '먹따', '먹고': '먹꼬', '먹지': '먹찌',
  '닦다': '닥따', '닦고': '닥꼬', '닦지': '닥찌',
  '깎다': '깍따', '깎고': '깍꼬', '깎지': '깍찌',
  '꺾다': '꺽따', '꺾고': '꺽꼬', '꺾지': '꺽찌',
  '작다': '작따', '작고': '작꼬', '작지': '작찌',
  '섞다': '석따', '섞고': '석꼬', '섞지': '석찌',
  '읽다': '익따', '읽고': '일꼬', '읽지': '익찌',

  // ㄷ·ㅅ·ㅆ·ㅈ 받침 용언
  '받다': '받따', '받고': '받꼬', '받지': '받찌',
  '닫다': '닫따', '닫고': '닫꼬', '닫지': '닫찌',
  '듣다': '듣따', '듣고': '듣꼬', '듣지': '듣찌',
  '걷다': '걷따', '걷고': '걷꼬', '걷지': '걷찌',
  '묻다': '묻따', '묻고': '묻꼬', '묻지': '묻찌',
  '믿다': '믿따', '믿고': '믿꼬', '믿지': '믿찌',
  '쏟다': '쏟따', '쏟고': '쏟꼬', '쏟지': '쏟찌',
  '찾다': '찯따', '찾고': '찯꼬', '찾지': '찯찌',
  '맞다': '맏따', '맞고': '맏꼬', '맞지': '맏찌',
  '늦다': '늗따', '늦고': '늗꼬', '늦지': '늗찌',
  '씻다': '씯따', '씻고': '씯꼬', '씻지': '씯찌',
  '웃다': '욷따', '웃고': '욷꼬', '웃지': '욷찌',
  '낫다': '낟따', '낫고': '낟꼬', '낫지': '낟찌',
  '짓다': '짇따', '짓고': '짇꼬', '짓지': '짇찌',
  '벗다': '벋따', '벗고': '벋꼬', '벗지': '벋찌',
  '있다': '읻따', '있고': '읻꼬', '있지': '읻찌',

  // ㅂ·ㄼ·ㄿ·ㅄ·ㄾ 받침 용언
  '입다': '입따', '입고': '입꼬', '입지': '입찌',
  '돕다': '돕따', '돕고': '돕꼬', '돕지': '돕찌',
  '잡다': '잡따', '잡고': '잡꼬', '잡지': '잡찌',
  '접다': '접따', '접고': '접꼬', '접지': '접찌',
  '춥다': '춥따', '춥고': '춥꼬', '춥지': '춥찌',
  '덥다': '덥따', '덥고': '덥꼬', '덥지': '덥찌', '덥지만': '덥찌만',
  '어렵다': '어렵따', '어렵고': '어렵꼬', '어렵지': '어렵찌', '어렵지만': '어렵찌만',
  '무겁다': '무겁따', '무겁고': '무겁꼬', '무겁지': '무겁찌', '무겁지만': '무겁찌만',
  '밟다': '밥따', '밟고': '밥꼬', '밟지': '밥찌',
  '넓다': '널따', '짧다': '짤따', '핥다': '할따',
  '없다': '업따', '없고': '업꼬', '없지': '업찌',
  '읊다': '읍따',

  // 3) 표준발음법 제12항: ㅎ(ㄶ, ㅀ) 받침 거센소리되기(격음화) 및 탈락
  '좋다': '조타', '좋고': '조코', '좋지': '조치', '좋았어요': '조아써요',
  '까맣다': '까마타',
  '넣다': '너타', '넣고': '너코', '넣지': '너치', '넣으세요': '너으세요',
  '놓다': '노타', '놓고': '노코', '놓지': '노치', '놓을': '노을',
  '그렇다': '그러타', '그렇지만': '그러치만', '어떻게': '어떠케',
  '많다': '만타', '많지': '만치',
  '끊다': '끈타', '끊어': '끄너',
  '싫다': '실타', '싫지': '실치',
  '잃다': '일타',
  '뚫다': '뚤타', '뚫어': '뚜러',
  '급해요': '그패요',

  // 4) 구개음화 · 비음화 · 유음화 · 겹받침 연음 · 기존 세부 발음 보정
  '붙이다': '부치다', '붙였어요': '부쳐써요', '붙여요': '부쳐요',
  '끝나다': '끈나다', '끝날': '끈날', '끝났어요': '끈나써요', '끝나고': '끈나고',
  '앉았어요': '안자써요', '앉아요': '안자요', '앉으세요': '안즈세요',
  '읽어요': '일거요', '읽으세요': '일그세요',
  '밟을': '발블',
  '없어요': '업써요', '없었어요': '업써써요',
  '있어요': '이써요', '있었어요': '이써써요', '있어': '이써',
  '맛있어요': '마시써요', '재미있어요': '재미이써요', '재밌어요': '재미써요',
  '쉽게': '쉽께',
  '신었어요': '시넏써요', '신었다': '시넏따',
  '나중에요': '나중엥요', '나중에': '나중엥',
  '연락해요': '열라캐요', '연락드릴게요': '열락뜨릴께요',
  '실내화': '실래화',
  '낱말': '난말',
  '앞으로': '아프로',
  '엎드려': '업뜨려',
  '깎아': '까까',
  '닦았어요': '다까써요',
  '섞은': '서끈',
  '알겠어요': '알게써요', '모르겠어요': '모르게써요',

  // 5) -(으)ㄹ게(요) 된소리되기 (표준발음법 제27항)
  '그릴게': '그릴께', '도와줄게': '도와줄께', '알려줄게': '알려줄께',
  '갈게': '갈께', '올게': '올께', '볼게': '볼께', '열게': '열께', '할게': '할께', '줄게': '줄께',

  // 6) 교실한국어 · 조사 어휘 내 된소리 명사
  '식판': '식빤', '식당': '식땅', '숫자': '숟짜', '박수': '박쑤', '악기': '악끼',
  '색종이': '색쫑이', '과학실': '과학씰', '신발장': '신발짱', '책과': '책꽈', '걱정': '걱쩡',

  // 7) 한글 겹받침 · 단독 음절 발음 (Pages 12-15)
  '닭': '닥', '몫': '목', '곬': '골', '삶': '삼', '여덟': '여덜', '덟': '덜',
  '밖': '박', '숲': '숩',
  '앉': '안', '많': '만', '끊': '끈', '넓': '널', '짧': '짤',
  '핥': '할', '싫': '실', '잃': '일', '없': '업', '뚫': '뚤'
};

// 조사가 붙어 활용되는 대표 된소리/비음화/구개음화 명사 어근 보정
const SAFE_COMPOUND_TTS_RULES: Array<[RegExp, string]> = [
  [/학교/g, '학꾜'],
  [/책상/g, '책쌍'],
  [/복도/g, '복또'],
  [/숙제/g, '숙쩨'],
  [/학생/g, '학쌩'],
  [/학습지/g, '학씁찌'],
  [/숟가락/g, '숟까락'],
  [/젓가락/g, '젇까락'],
  [/색연필/g, '생년필'],
  [/초록불/g, '초록뿔'],
  [/학년/g, '항년'],
  [/밖에/g, '바께'],
  [/같이/g, '가치'],
  [/줄넘기/g, '줄럼끼']
];

function hasRieulBatchim(char: string): boolean {
  const code = char.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 === 8; // ㄹ 받침
}

export function normalizeKoreanForTts(text: string): string {
  // Replace slashes with a pause (comma) so '일 / 하나' is read as '일, 하나' instead of pronouncing '슬래시'
  let spokenText = text.replace(/\s*\/\s*/g, ', ');

  const trimmed = spokenText.trim();
  if (JAMO_CONSONANT_NAMES[trimmed]) {
    return JAMO_CONSONANT_NAMES[trimmed];
  }
  if (JAMO_VOWEL_PRONUNCIATIONS[trimmed]) {
    return JAMO_VOWEL_PRONUNCIATIONS[trimmed];
  }

  // 1) 다어절 구문 발음 보정 (표준발음법 제23항·제18항·제12항)
  spokenText = spokenText
    .replace(/(^|[^가-힣])못(\s+)해요(?=[^가-힣]|$)/g, '$1모태요')
    .replace(/(^|[^가-힣])못(\s+)던져요(?=[^가-힣]|$)/g, '$1몯$2떤져요')
    .replace(/(^|[^가-힣])못(\s+)참아요(?=[^가-힣]|$)/g, '$1몯$2차마요')
    .replace(/(^|[^가-힣])몇(\s+)개/g, '$1멷$2깨')
    .replace(/(^|[^가-힣])몇(\s+)시/g, '$1멷$2씨')
    .replace(/(^|[^가-힣])몇(\s+)쪽/g, '$1멷$2쪽')
    .replace(/(^|[^가-힣])몇(\s+)명/g, '$1면$2명')
    .replace(/(^|[^가-힣])몇(\s+)학년/g, '$1며탕년')
    .replace(/(^|[^가-힣])백(\s+)점(?=[^가-힣]|$)/g, '$1백$2쩜')
    .replace(/(^|[^가-힣])토할(\s+)것(\s+)같아요(?=[^가-힣]|$)/g, '$1토할$2껃$3까타요');

  // 2) 관형사형 '-(으)ㄹ' 뒤 의존명사 '거예요 / 수 / 것' 된소리되기 (표준발음법 제27항)
  spokenText = spokenText.replace(/([가-힣])(\s+)거예요(?=[^가-힣]|$)/g, (m, prev, sp) =>
    hasRieulBatchim(prev) ? `${prev}${sp}꺼예요` : m
  );
  spokenText = spokenText.replace(/([가-힣])(\s+)수(\s+)(있|없)/g, (m, prev, sp1, sp2, next) =>
    hasRieulBatchim(prev) ? `${prev}${sp1}쑤${sp2}${next}` : m
  );

  // 3) 정확한 한글 어절 단위 1-pass 치환 (겹치환·부분문자열 오치환 원천 차단)
  spokenText = spokenText.replace(/[가-힣]+/g, (word) => {
    if (RIEUL_DA_VERBS.has(word)) {
      return `${word.slice(0, -1)} 다`;
    }
    if (EXACT_WORD_TTS_MAP[word]) {
      return EXACT_WORD_TTS_MAP[word];
    }
    // 어미 '-(으)ㄹ게요' (올게요, 열게요, 볼게요, 드릴게요, 빌려줄게요 등)는 항상 [께요]
    if (word.length >= 3 && word.endsWith('게요') && hasRieulBatchim(word[word.length - 3])) {
      return `${word.slice(0, -2)}께요`;
    }
    let adjusted = word;
    for (const [pattern, replacement] of SAFE_COMPOUND_TTS_RULES) {
      adjusted = adjusted.replace(pattern, replacement);
    }
    return adjusted;
  });

  return spokenText;
}

// Speak text using Web Speech API with advanced natural Korean voice
export function speakKorean(
  text: string,
  rate: number = 1.0,
  pitch: number = 1.0,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    // Unpause if speech synthesis is paused/stuck
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel(); // Cancel current playing

    // Normalize text strictly for Korean TTS pronunciation (displayed text is never modified)
    const spokenText = normalizeKoreanForTts(text);

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.lang = 'ko-KR';
    utterance.rate = rate; // 1.0 standard natural tempo without time-stretching artifacts
    utterance.pitch = pitch; // 1.0 pristine unmodulated pitch bypassing browser DSP warble

    // Always select the best bright, friendly female teacher voice (Microsoft SunHi on Edge, Google 한국어 on Chrome/Android, Yuna on Apple)
    const bestVoice = findBestKoreanVoice();
    if (bestVoice) {
      cachedKoreanVoice = bestVoice;
      utterance.voice = bestVoice;
    } else if (cachedKoreanVoice) {
      utterance.voice = cachedKoreanVoice;
    }

    // Keep reference on module scope to prevent Chrome garbage-collection bug mid-utterance
    activeUtterance = utterance;

    const cleanup = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onend = cleanup;
    utterance.onerror = cleanup;

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('SpeechSynthesis error:', err);
    if (onEnd) onEnd();
    return false;
  }
}

