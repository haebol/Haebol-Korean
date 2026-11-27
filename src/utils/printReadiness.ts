export interface WebPrintRequest {
  id: number;
  type: 'current' | 'range' | 'triple';
  /** 0-based inclusive start sheet index (for type === 'range') */
  startIdx?: number;
  /** 0-based inclusive end sheet index (for type === 'range') */
  endIdx?: number;
}

export interface PrintChunkRange {
  label: string;
  subLabel: string;
  startIdx: number;
  endIdx: number;
  count: number;
}

/**
 * Splits a multi-sheet track into fast, Chrome-friendly chunks (default 10 sheets per batch).
 * If the trailing chunk would have <= 2 sheets (e.g. 21 -> 1~10, 11~21), merges it into the previous chunk.
 */
export function buildPrintChunks(
  totalCount: number,
  unitSuffix: string,
  chunkSize = 10
): PrintChunkRange[] {
  if (totalCount <= 0) return [];
  if (totalCount <= chunkSize) {
    return [
      {
        label: `1~${totalCount}${unitSuffix}`,
        subLabel: `${totalCount}장 묶음`,
        startIdx: 0,
        endIdx: totalCount - 1,
        count: totalCount,
      },
    ];
  }

  const ranges: PrintChunkRange[] = [];
  let start = 0;
  while (start < totalCount) {
    let end = Math.min(start + chunkSize - 1, totalCount - 1);
    const remaining = totalCount - 1 - end;
    if (remaining > 0 && remaining <= 2) {
      end = totalCount - 1;
    }
    const count = end - start + 1;
    ranges.push({
      label: `${start + 1}~${end + 1}${unitSuffix}`,
      subLabel: `${count}장`,
      startIdx: start,
      endIdx: end,
      count,
    });
    start = end + 1;
  }
  return ranges;
}

/**
 * Ensures all local web fonts and mounted images (SVG data URIs, etc.) are loaded and decoded
 * before invoking window.print() or html-to-image capture, preventing missing illustrations,
 * fallback font substitution, clipping, or unintended line wrapping in PDFs.
 */
export async function waitForPrintReadiness(
  root: ParentNode = document,
  maxWaitMs = 900
): Promise<void> {
  const fontPromise = (async () => {
    if (typeof document === 'undefined' || !document.fonts) return;
    try {
      await Promise.allSettled([
        document.fonts.load('400 16px "Hakgyoansim Bareondotum"', '가나다'),
        document.fonts.load('700 16px "Hakgyoansim Bareondotum"', '가나다'),
        document.fonts.load('400 20px "Hakgyoansim Badasseugi"', '가나다'),
        document.fonts.load('700 20px "Hakgyoansim Badasseugi"', '가나다'),
        document.fonts.load('400 14px "NanumBarunGothic"', '가나다'),
        document.fonts.load('700 14px "NanumBarunGothic"', '가나다'),
        document.fonts.load('500 14px "Noto Sans Bengali"', 'বাংলা'),
        document.fonts.load('700 14px "Noto Sans Bengali"', 'বাংলা'),
      ]);
      await document.fonts.ready;
    } catch {
      // Ignore font API errors gracefully
    }
  })();

  const imgs = Array.from(root.querySelectorAll('img'));
  const imgPromises = imgs.map((img) => {
    if (img.loading === 'lazy') {
      img.loading = 'eager';
    }
    if (img.complete && img.naturalWidth > 0) {
      return typeof img.decode === 'function'
        ? img.decode().catch(() => undefined)
        : Promise.resolve();
    }
    return new Promise<void>((resolve) => {
      const done = () => resolve();
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    });
  });

  const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, maxWaitMs));
  await Promise.race([Promise.allSettled([fontPromise, ...imgPromises]), timeout]);

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}
