import React, { useLayoutEffect, useRef, useState } from 'react';

interface MobileScaledWorksheetWrapperProps {
  children: React.ReactNode;
  desktopWidth?: number;
}

/**
 * 모바일(768px 미만) 화면에서 A4 데스크톱 학습지를 한눈에 볼 수 있도록
 * 화면 폭에 맞춰 비율(scale)을 자동 축소해 렌더링하는 래퍼.
 * - 데스크톱(>= 768px) 및 인쇄(@media print) 시에는 원본 크기 그대로 렌더링됩니다.
 */
export const MobileScaledWorksheetWrapper: React.FC<MobileScaledWorksheetWrapperProps> = ({
  children,
  desktopWidth = 990,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scaleState, setScaleState] = useState<{
    isMobile: boolean;
    scale: number;
    scaledHeight: number | null;
  }>({
    isMobile: false,
    scale: 1,
    scaledHeight: null,
  });

  useLayoutEffect(() => {
    const updateMetrics = () => {
      const outerEl = outerRef.current;
      const innerEl = innerRef.current;
      if (!outerEl) return;

      const availableWidth = outerEl.clientWidth;
      if (!availableWidth) return;

      const shouldScale = availableWidth < desktopWidth;
      if (!shouldScale) {
        setScaleState((prev) =>
          prev.isMobile ? { isMobile: false, scale: 1, scaledHeight: null } : prev
        );
        return;
      }

      const nextScale = Math.min(1, availableWidth / desktopWidth);
      const rawHeight = innerEl ? innerEl.offsetHeight : 0;
      const nextHeight = rawHeight > 0 ? Math.ceil(rawHeight * nextScale) : null;

      setScaleState((prev) => {
        if (
          prev.isMobile === true &&
          Math.abs(prev.scale - nextScale) < 0.0005 &&
          prev.scaledHeight === nextHeight
        ) {
          return prev;
        }
        return {
          isMobile: true,
          scale: nextScale,
          scaledHeight: nextHeight,
        };
      });
    };

    updateMetrics();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            updateMetrics();
          })
        : null;

    if (resizeObserver) {
      if (outerRef.current) resizeObserver.observe(outerRef.current);
      if (innerRef.current) resizeObserver.observe(innerRef.current);
    }

    window.addEventListener('resize', updateMetrics);
    return () => {
      window.removeEventListener('resize', updateMetrics);
      resizeObserver?.disconnect();
    };
  }, [desktopWidth, children]);

  return (
    <div
      ref={outerRef}
      className="mobile-scaled-outer w-full flex justify-center print:block"
      style={
        scaleState.isMobile
          ? {
              position: 'relative',
              overflow: 'hidden',
              height: scaleState.scaledHeight ? `${scaleState.scaledHeight}px` : 'auto',
            }
          : undefined
      }
    >
      <div
        ref={innerRef}
        className={
          scaleState.isMobile
            ? 'mobile-scaled-inner print:static print:transform-none'
            : 'w-full flex flex-col items-center'
        }
        style={
          scaleState.isMobile
            ? {
                position: scaleState.scaledHeight ? 'absolute' : 'relative',
                top: 0,
                left: 0,
                width: `${desktopWidth}px`,
                transform: `scale(${scaleState.scale})`,
                transformOrigin: 'top left',
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
};
