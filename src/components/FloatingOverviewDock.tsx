import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, ArrowUp, GripVertical } from 'lucide-react';
import { playCutePop } from '../utils/audio';

interface FloatingOverviewDockProps {
  onOpenOverview: () => void;
  showScrollTop?: boolean;
  onScrollTop?: () => void;
  label?: string;
}

export const FloatingOverviewDock: React.FC<FloatingOverviewDockProps> = ({
  onOpenOverview,
  showScrollTop = false,
  onScrollTop,
  label = '모아보기',
}) => {
  const dockRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStateRef = useRef<{
    active: boolean;
    pointerId: number | null;
    startClientX: number;
    startClientY: number;
    startOffsetX: number;
    startOffsetY: number;
    moved: boolean;
    minDx: number;
    maxDx: number;
    minDy: number;
    maxDy: number;
  }>({
    active: false,
    pointerId: null,
    startClientX: 0,
    startClientY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    moved: false,
    minDx: -1000,
    maxDx: 0,
    minDy: -1000,
    maxDy: 0,
  });

  const suppressClickRef = useRef(false);

  // Keep dock inside viewport when window resizes or showScrollTop toggles
  useEffect(() => {
    const clampToViewport = () => {
      const el = dockRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const margin = 8;

      let fixX = 0;
      let fixY = 0;
      if (rect.left < margin) fixX = margin - rect.left;
      else if (rect.right > vw - margin) fixX = vw - margin - rect.right;

      if (rect.top < margin) fixY = margin - rect.top;
      else if (rect.bottom > vh - margin) fixY = vh - margin - rect.bottom;

      if (fixX !== 0 || fixY !== 0) {
        setOffset((prev) => ({ x: prev.x + fixX, y: prev.y + fixY }));
      }
    };

    window.addEventListener('resize', clampToViewport);
    return () => window.removeEventListener('resize', clampToViewport);
  }, [showScrollTop]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const el = dockRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 8;

    // Natural un-translated position bounds relative to current offset
    const minDx = offset.x + (margin - rect.left);
    const maxDx = offset.x + (vw - margin - rect.right);
    const minDy = offset.y + (margin - rect.top);
    const maxDy = offset.y + (vh - margin - rect.bottom);

    dragStateRef.current = {
      active: true,
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
      moved: false,
      minDx: Math.min(minDx, maxDx),
      maxDx: Math.max(minDx, maxDx),
      minDy: Math.min(minDy, maxDy),
      maxDy: Math.max(minDy, maxDy),
    };
    suppressClickRef.current = false;

    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture is unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragStateRef.current;
    if (!st.active || st.pointerId !== e.pointerId) return;

    const dx = e.clientX - st.startClientX;
    const dy = e.clientY - st.startClientY;

    if (!st.moved && Math.hypot(dx, dy) > 6) {
      st.moved = true;
      suppressClickRef.current = true;
      setIsDragging(true);
    }

    if (st.moved) {
      const nextX = Math.max(st.minDx, Math.min(st.maxDx, st.startOffsetX + dx));
      const nextY = Math.max(st.minDy, Math.min(st.maxDy, st.startOffsetY + dy));
      setOffset({ x: nextX, y: nextY });
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = dragStateRef.current;
    if (!st.active || st.pointerId !== e.pointerId) return;

    st.active = false;
    st.pointerId = null;
    setIsDragging(false);

    if (st.moved) {
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 60);
    }
  };

  const handleOverviewClick = () => {
    if (suppressClickRef.current) return;
    playCutePop();
    onOpenOverview();
  };

  const handleScrollTopClick = () => {
    if (suppressClickRef.current) return;
    onScrollTop?.();
  };

  return (
    <div
      ref={dockRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUpOrCancel}
      onPointerCancel={handlePointerUpOrCancel}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        touchAction: 'none',
      }}
      className={`no-print fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-1 p-1 sm:p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-rose-300 shadow-[0_8px_28px_rgba(217,74,107,0.22)] select-none ${
        isDragging ? 'cursor-grabbing scale-[1.03] shadow-2xl' : 'cursor-grab transition-shadow'
      }`}
      title="드래그하여 원하는 위치로 이동할 수 있어요"
    >
      {/* Drag Handle */}
      <div
        className="flex items-center justify-center pl-1 pr-0.5 text-rose-400 hover:text-rose-600 cursor-grab active:cursor-grabbing shrink-0"
        aria-hidden="true"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* 모아보기 Button */}
      <button
        type="button"
        onClick={handleOverviewClick}
        className="h-9 sm:h-10 px-3 sm:px-3.5 rounded-xl bg-[#D94A6B] hover:bg-[#BE3A58] active:scale-95 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
        aria-label="학습지 모아보기 열기"
        title="학습지/단원 한눈에 모아보기"
      >
        <LayoutGrid className="w-4 h-4 shrink-0" />
        <span>{label}</span>
      </button>

      {/* Optional Scroll-to-Top Button */}
      {showScrollTop && onScrollTop && (
        <button
          type="button"
          onClick={handleScrollTopClick}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-100 hover:bg-rose-200 active:scale-95 text-rose-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 border border-rose-200"
          aria-label="맨 위로 이동"
          title="맨 위로 이동"
        >
          <ArrowUp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </button>
      )}
    </div>
  );
};
