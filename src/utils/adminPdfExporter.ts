import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { toPng } from 'html-to-image';
import { getLocalFontEmbedCSS, ensureCaptureFontsReady } from '../components/AdminCaptureCards';

export interface PdfExportOptions {
  fileName: string;
  orientation?: 'landscape' | 'portrait';
  onProgress?: (done: number, total: number) => void;
}

export interface PngZipItem {
  node: HTMLElement;
  fileName: string;
}

export interface PngZipExportOptions {
  zipFileName: string;
  pixelRatio?: number;
  onProgress?: (done: number, total: number) => void;
}

const loadImageDimensions = (dataUrl: string): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth || 1, height: img.naturalHeight || 1 });
    img.onerror = () => reject(new Error('Failed to measure rendered sheet image'));
    img.src = dataUrl;
  });

async function waitForNodeImagesReady(node: HTMLElement): Promise<void> {
  const imgs = Array.from(node.querySelectorAll('img'));
  if (imgs.length === 0) return;
  const tasks = imgs.map((img) => {
    if (img.loading === 'lazy') img.loading = 'eager';
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
  await Promise.race([
    Promise.allSettled(tasks),
    new Promise<void>((r) => window.setTimeout(r, 400)),
  ]);
}

/**
 * Renders an array of off-screen A4 worksheet DOM elements into a crisp multi-page PDF
 * using cached local .woff2 fonts (avoiding cross-origin CSS stylesheet SecurityError).
 */
export async function exportNodesToPdf(
  nodes: HTMLElement[],
  options: PdfExportOptions
): Promise<void> {
  if (!nodes || nodes.length === 0) {
    throw new Error('PDF로 변환할 학습지 페이지가 없습니다.');
  }

  await ensureCaptureFontsReady();
  const fontEmbedCSS = await getLocalFontEmbedCSS();
  const orientation = options.orientation || 'landscape';

  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidthMm = pdf.internal.pageSize.getWidth(); // 297mm (landscape)
  const pageHeightMm = pdf.internal.pageSize.getHeight(); // 210mm (landscape)
  const marginX = 5;
  const marginY = 4;
  const maxContentW = pageWidthMm - marginX * 2;
  const maxContentH = pageHeightMm - marginY * 2;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    await waitForNodeImagesReady(node);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const captureW = Math.ceil(Math.max(node.offsetWidth, node.scrollWidth));
    const captureH = Math.ceil(Math.max(node.offsetHeight, node.scrollHeight));

    const dataUrl = await toPng(node, {
      pixelRatio: nodes.length > 15 ? 1.85 : 2.15,
      cacheBust: false,
      fontEmbedCSS,
      backgroundColor: '#ffffff',
      width: captureW > 0 ? captureW : undefined,
      height: captureH > 0 ? captureH : undefined,
    });

    const { width: pxW, height: pxH } = await loadImageDimensions(dataUrl);
    const ratio = pxW / pxH;

    let drawW = maxContentW;
    let drawH = drawW / ratio;
    if (drawH > maxContentH) {
      drawH = maxContentH;
      drawW = drawH * ratio;
    }

    const offsetX = (pageWidthMm - drawW) / 2;
    const offsetY = (pageHeightMm - drawH) / 2;

    if (i > 0) {
      pdf.addPage('a4', orientation);
    }

    pdf.addImage(dataUrl, 'PNG', offsetX, offsetY, drawW, drawH, undefined, 'FAST');
    options.onProgress?.(i + 1, nodes.length);
  }

  pdf.save(options.fileName);
}

/**
 * Captures multiple off-screen worksheet DOM nodes as high-resolution PNG images
 * and bundles them into a single downloadable .zip archive.
 */
export async function exportNodesToPngZip(
  items: PngZipItem[],
  options: PngZipExportOptions
): Promise<void> {
  if (!items || items.length === 0) {
    throw new Error('PNG로 저장할 학습지 페이지가 없습니다.');
  }

  await ensureCaptureFontsReady();
  const fontEmbedCSS = await getLocalFontEmbedCSS();
  const zip = new JSZip();
  const pixelRatio = options.pixelRatio ?? (items.length > 15 ? 2.0 : 2.3);

  for (let i = 0; i < items.length; i++) {
    const { node, fileName } = items[i];
    await waitForNodeImagesReady(node);
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });

    const captureW = Math.ceil(Math.max(node.offsetWidth, node.scrollWidth));
    const captureH = Math.ceil(Math.max(node.offsetHeight, node.scrollHeight));

    const dataUrl = await toPng(node, {
      pixelRatio,
      cacheBust: false,
      fontEmbedCSS,
      backgroundColor: '#ffffff',
      width: captureW > 0 ? captureW : undefined,
      height: captureH > 0 ? captureH : undefined,
    });

    const base64 = dataUrl.split(',')[1];
    if (base64) {
      zip.file(fileName, base64, { base64: true });
    }
    options.onProgress?.(i + 1, items.length);
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const blobUrl = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = options.zipFileName.endsWith('.zip')
    ? options.zipFileName
    : `${options.zipFileName}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
}
