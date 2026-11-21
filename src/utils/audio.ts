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

    // Replace slashes with a pause (comma) so '일 / 하나' is read as '일, 하나' instead of pronouncing '슬래시'
    let spokenText = text.replace(/\s*\/\s*/g, ', ');

    // For single hangul jamo consonants, speak clear pronunciation name for child learning
    const jamoNames: Record<string, string> = {
      'ㄱ': '기역', 'ㄴ': '니은', 'ㄷ': '디귿', 'ㄹ': '리을',
      'ㅁ': '미음', 'ㅂ': '비읍', 'ㅅ': '시옷', 'ㅇ': '이응',
      'ㅈ': '지읒', 'ㅊ': '치읓', 'ㅋ': '키읔', 'ㅌ': '티읕',
      'ㅍ': '피읖', 'ㅎ': '히읗'
    };
    if (jamoNames[spokenText.trim()]) {
      spokenText = jamoNames[spokenText.trim()];
    }

    // For single hangul jamo vowels (ㅏ, ㅓ, ㅗ, ㅜ, etc.), map to full syllable block ('아', '어', '오', '우'...)
    // because isolated jamo causes TTS engines to glitch or spell-pronounce
    const vowelPronunciations: Record<string, string> = {
      'ㅏ': '아', 'ㅓ': '어', 'ㅗ': '오', 'ㅜ': '우', 'ㅡ': '으', 'ㅣ': '이',
      'ㅑ': '야', 'ㅕ': '여', 'ㅛ': '요', 'ㅠ': '유',
      'ㅐ': '애', 'ㅔ': '에', 'ㅒ': '얘', 'ㅖ': '예',
      'ㅘ': '와', 'ㅝ': '워', 'ㅚ': '외', 'ㅟ': '위', 'ㅢ': '의',
      'ㅙ': '왜', 'ㅞ': '웨'
    };
    if (vowelPronunciations[spokenText.trim()]) {
      spokenText = vowelPronunciations[spokenText.trim()];
    }

    // Specific pronunciation overrides for Korean TTS
    // 1. 'ㄹ' 받침 어간 + '-다' 동사/형용사는 표준발음법상 [다](예사소리)이지만 모바일 TTS가 [따]로 잘못 된소리 발음하는 경우가 많아 '어간 + 다'로 띄어 예사소리 발음을 유도함
    // 2. '앉다' standard pronunciation is [안따] (어간 ㄵ 받침 뒤 된소리), but TTS reads [안다]. Replacing with '안따'.
    // 3. '신다' standard pronunciation is [신따] (어간 끝 ㄴ 받침 뒤 된소리), but TTS reads [신다]. Replacing with '신따'.
    // 4. '나중에요' / '나중에': Ensure clear ㅇ 받침 pronunciation [나중엥요], [나중엥] instead of slurred [나주에요]
    // 5. '신었어요': Pronounce as [시넏써요] instead of incorrect [시녔어요]
    const rieulDaVerbs = [
      '놀다', '알다', '열다', '살다', '울다', '풀다',
      '날다', '멀다', '만들다', '떠들다', '힘들다',
      '걸다', '물다', '불다', '길다', '달다', '밀다', '팔다', '갈다', '돌다', '말다'
    ];
    for (const verb of rieulDaVerbs) {
      const stem = verb.slice(0, -1);
      const regex = new RegExp(`(^|[^가-힣])${verb}(?=[^가-힣]|$)`, 'g');
      spokenText = spokenText.replace(regex, `$1${stem} 다`);
    }
    spokenText = spokenText.replace(/(^|[^가-힣])앉다(?=[^가-힣]|$)/g, '$1안따');
    spokenText = spokenText.replace(/(^|[^가-힣])신다(?=[^가-힣]|$)/g, '$1신따');
    spokenText = spokenText.replace(/(^|[^가-힣])나중에요(?=[^가-힣]|$)/g, '$1나중엥요');
    spokenText = spokenText.replace(/(^|[^가-힣])나중에(?=[^가-힣]|$)/g, '$1나중엥');
    spokenText = spokenText.replace(/(^|[^가-힣])신었어요(?=[^가-힣]|$)/g, '$1시넏써요');
    spokenText = spokenText.replace(/(^|[^가-힣])신었다(?=[^가-힣]|$)/g, '$1시넏따');
    // 6. Page 12 뒤 자음 발음 (ㄺ, ㄻ, ㄿ): ㄺ=[ㄱ], ㄻ=[ㅁ], ㄿ=[ㅂ], (예외) ㄺ+ㄱ=[ㄹ]
    spokenText = spokenText.replace(/(^|[^가-힣])읽다(?=[^가-힣]|$)/g, '$1익따');
    spokenText = spokenText.replace(/(^|[^가-힣])닮다(?=[^가-힣]|$)/g, '$1담따');
    spokenText = spokenText.replace(/(^|[^가-힣])읊다(?=[^가-힣]|$)/g, '$1읍따');
    spokenText = spokenText.replace(/(^|[^가-힣])닭(?=[^가-힣]|$)/g, '$1닥');
    spokenText = spokenText.replace(/(^|[^가-힣])읽고(?=[^가-힣]|$)/g, '$1일꼬');
    // 7. Pages 13-15 앞 자음 발음 (ㄳ, ㄵ, ㄶ, ㄼ, ㄾ, ㅀ, ㅄ)
    spokenText = spokenText.replace(/(^|[^가-힣])몫(?=[^가-힣]|$)/g, '$1목');
    spokenText = spokenText.replace(/(^|[^가-힣])앉(?=[^가-힣]|$)/g, '$1안');
    spokenText = spokenText.replace(/(^|[^가-힣])많(?=[^가-힣]|$)/g, '$1만');
    spokenText = spokenText.replace(/(^|[^가-힣])많다(?=[^가-힣]|$)/g, '$1만타');
    spokenText = spokenText.replace(/(^|[^가-힣])끊다(?=[^가-힣]|$)/g, '$1끈타');
    spokenText = spokenText.replace(/(^|[^가-힣])끊어(?=[^가-힣]|$)/g, '$1끄너');
    spokenText = spokenText.replace(/(^|[^가-힣])끊(?=[^가-힣]|$)/g, '$1끈');
    spokenText = spokenText.replace(/(^|[^가-힣])넓다(?=[^가-힣]|$)/g, '$1널따');
    spokenText = spokenText.replace(/(^|[^가-힣])넓(?=[^가-힣]|$)/g, '$1널');
    spokenText = spokenText.replace(/(^|[^가-힣])짧다(?=[^가-힣]|$)/g, '$1짤따');
    spokenText = spokenText.replace(/(^|[^가-힣])짧(?=[^가-힣]|$)/g, '$1짤');
    spokenText = spokenText.replace(/(^|[^가-힣])핥다(?=[^가-힣]|$)/g, '$1할따');
    spokenText = spokenText.replace(/(^|[^가-힣])핥(?=[^가-힣]|$)/g, '$1할');
    spokenText = spokenText.replace(/(^|[^가-힣])밟다(?=[^가-힣]|$)/g, '$1밥따');
    spokenText = spokenText.replace(/(^|[^가-힣])여덟(?=[^가-힣]|$)/g, '$1여덜');
    spokenText = spokenText.replace(/(^|[^가-힣])덟(?=[^가-힣]|$)/g, '$1덜');
    spokenText = spokenText.replace(/(^|[^가-힣])싫다(?=[^가-힣]|$)/g, '$1실타');
    spokenText = spokenText.replace(/(^|[^가-힣])싫(?=[^가-힣]|$)/g, '$1실');
    spokenText = spokenText.replace(/(^|[^가-힣])잃다(?=[^가-힣]|$)/g, '$1일타');
    spokenText = spokenText.replace(/(^|[^가-힣])잃(?=[^가-힣]|$)/g, '$1일');
    spokenText = spokenText.replace(/(^|[^가-힣])없다(?=[^가-힣]|$)/g, '$1업따');
    spokenText = spokenText.replace(/(^|[^가-힣])없(?=[^가-힣]|$)/g, '$1업');
    spokenText = spokenText.replace(/(^|[^가-힣])뚫다(?=[^가-힣]|$)/g, '$1뚤타');
    spokenText = spokenText.replace(/(^|[^가-힣])뚫어(?=[^가-힣]|$)/g, '$1뚜러');
    spokenText = spokenText.replace(/(^|[^가-힣])뚫(?=[^가-힣]|$)/g, '$1뚤');

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

export type SitcomSfxType =
  | 'slap'
  | 'kick'
  | 'drop'
  | 'roll'
  | 'squash'
  | 'thunder'
  | 'explode'
  | 'chomp';

export function playCameraShutterSfx(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Two-stage mechanical shutter snap
    [0, 0.06].forEach((offset, idx) => {
      const dur = 0.032;
      const bufSize = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.35));
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;

      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(idx === 0 ? 1800 : 2400, now + offset);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.28, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.005, now + offset + dur);

      src.connect(hp);
      hp.connect(gain);
      gain.connect(ctx.destination);
      src.start(now + offset);
      src.stop(now + offset + dur + 0.01);
    });

    // Sparkle ping right after shutter
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1174.66, now + 0.11); // D6
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.24); // A6
    g.gain.setValueAtTime(0.001, now + 0.11);
    g.gain.linearRampToValueAtTime(0.18, now + 0.13);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(now + 0.11);
    osc.stop(now + 0.33);
  } catch {
    // Ignore audio errors
  }
}

export function playSitcomBlunderSfx(sfx: SitcomSfxType): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (sfx === 'kick') {
      // Swoop -> comic punch -> falling slide whistle
      const punch = ctx.createOscillator();
      const punchGain = ctx.createGain();
      punch.type = 'triangle';
      punch.frequency.setValueAtTime(190, now);
      punch.frequency.exponentialRampToValueAtTime(55, now + 0.14);
      punchGain.gain.setValueAtTime(0.45, now);
      punchGain.gain.exponentialRampToValueAtTime(0.005, now + 0.15);
      punch.connect(punchGain);
      punchGain.connect(ctx.destination);
      punch.start(now);
      punch.stop(now + 0.16);

      const whistle = ctx.createOscillator();
      const wGain = ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(980, now + 0.1);
      whistle.frequency.exponentialRampToValueAtTime(220, now + 0.62);
      wGain.gain.setValueAtTime(0.001, now + 0.1);
      wGain.gain.linearRampToValueAtTime(0.22, now + 0.14);
      wGain.gain.exponentialRampToValueAtTime(0.001, now + 0.64);
      whistle.connect(wGain);
      wGain.connect(ctx.destination);
      whistle.start(now + 0.1);
      whistle.stop(now + 0.66);
      return;
    }

    if (sfx === 'thunder') {
      // High zap + deep thunder rumble
      const zap = ctx.createOscillator();
      const zGain = ctx.createGain();
      zap.type = 'sawtooth';
      zap.frequency.setValueAtTime(920, now);
      zap.frequency.exponentialRampToValueAtTime(140, now + 0.18);
      zGain.gain.setValueAtTime(0.3, now);
      zGain.gain.exponentialRampToValueAtTime(0.005, now + 0.2);
      zap.connect(zGain);
      zGain.connect(ctx.destination);
      zap.start(now);
      zap.stop(now + 0.21);

      const dur = 0.7;
      const bufSize = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.45));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(260, now + 0.05);
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.45, now + 0.05);
      nGain.gain.exponentialRampToValueAtTime(0.005, now + 0.05 + dur);
      noise.connect(lp);
      lp.connect(nGain);
      nGain.connect(ctx.destination);
      noise.start(now + 0.05);
      noise.stop(now + 0.06 + dur);
      return;
    }

    if (sfx === 'squash') {
      // Heavy brick drop + low cartoon accordion squish
      const thud = ctx.createOscillator();
      const tGain = ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(180, now);
      thud.frequency.exponentialRampToValueAtTime(48, now + 0.22);
      tGain.gain.setValueAtTime(0.45, now);
      tGain.gain.exponentialRampToValueAtTime(0.005, now + 0.24);
      thud.connect(tGain);
      tGain.connect(ctx.destination);
      thud.start(now);
      thud.stop(now + 0.25);

      const squish = ctx.createOscillator();
      const sGain = ctx.createGain();
      squish.type = 'sawtooth';
      squish.frequency.setValueAtTime(280, now + 0.08);
      squish.frequency.linearRampToValueAtTime(110, now + 0.38);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(750, now + 0.08);
      sGain.gain.setValueAtTime(0.2, now + 0.08);
      sGain.gain.exponentialRampToValueAtTime(0.005, now + 0.4);
      squish.connect(lp);
      lp.connect(sGain);
      sGain.connect(ctx.destination);
      squish.start(now + 0.08);
      squish.stop(now + 0.42);
      return;
    }

    if (sfx === 'roll') {
      // Rapid bouncy comic footsteps / rolling hops
      const freqs = [340, 420, 500, 390, 470, 580];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        const t = now + idx * 0.075;
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f * 1.28, t + 0.06);
        g.gain.setValueAtTime(0.2, t);
        g.gain.exponentialRampToValueAtTime(0.005, t + 0.065);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.07);
      });
      return;
    }

    if (sfx === 'explode') {
      // Pop burst + descending sputter
      const dur = 0.35;
      const bufSize = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.setValueAtTime(900, now);
      bp.frequency.exponentialRampToValueAtTime(220, now + dur);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.38, now);
      g.gain.exponentialRampToValueAtTime(0.005, now + dur);
      noise.connect(bp);
      bp.connect(g);
      g.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + dur + 0.01);

      const beep = ctx.createOscillator();
      const bGain = ctx.createGain();
      beep.type = 'square';
      beep.frequency.setValueAtTime(640, now + 0.14);
      beep.frequency.setValueAtTime(320, now + 0.24);
      bGain.gain.setValueAtTime(0.14, now + 0.14);
      bGain.gain.exponentialRampToValueAtTime(0.005, now + 0.38);
      beep.connect(bGain);
      bGain.connect(ctx.destination);
      beep.start(now + 0.14);
      beep.stop(now + 0.39);
      return;
    }

    if (sfx === 'chomp') {
      // Two snappy cartoon bites
      [0, 0.18].forEach((offset) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(420, now + offset);
        osc.frequency.exponentialRampToValueAtTime(110, now + offset + 0.11);
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.setValueAtTime(1100, now + offset);
        g.gain.setValueAtTime(0.28, now + offset);
        g.gain.exponentialRampToValueAtTime(0.005, now + offset + 0.12);
        osc.connect(lp);
        lp.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.13);
      });
      return;
    }

    if (sfx === 'drop') {
      // Slide down + bouncy bonk
      const slide = ctx.createOscillator();
      const sGain = ctx.createGain();
      slide.type = 'sine';
      slide.frequency.setValueAtTime(780, now);
      slide.frequency.exponentialRampToValueAtTime(180, now + 0.26);
      sGain.gain.setValueAtTime(0.26, now);
      sGain.gain.exponentialRampToValueAtTime(0.005, now + 0.28);
      slide.connect(sGain);
      sGain.connect(ctx.destination);
      slide.start(now);
      slide.stop(now + 0.29);

      const bonk = ctx.createOscillator();
      const bGain = ctx.createGain();
      bonk.type = 'triangle';
      bonk.frequency.setValueAtTime(220, now + 0.24);
      bonk.frequency.exponentialRampToValueAtTime(420, now + 0.36);
      bGain.gain.setValueAtTime(0.25, now + 0.24);
      bGain.gain.exponentialRampToValueAtTime(0.005, now + 0.4);
      bonk.connect(bGain);
      bGain.connect(ctx.destination);
      bonk.start(now + 0.24);
      bonk.stop(now + 0.42);
      return;
    }

    // Default 'slap': Bandage snap + boing!
    const snap = ctx.createOscillator();
    const nGain = ctx.createGain();
    snap.type = 'triangle';
    snap.frequency.setValueAtTime(520, now);
    snap.frequency.exponentialRampToValueAtTime(260, now + 0.08);
    snap.frequency.exponentialRampToValueAtTime(620, now + 0.26);
    nGain.gain.setValueAtTime(0.28, now);
    nGain.gain.exponentialRampToValueAtTime(0.005, now + 0.32);
    snap.connect(nGain);
    nGain.connect(ctx.destination);
    snap.start(now);
    snap.stop(now + 0.33);
  } catch {
    // Ignore audio errors
  }
}

