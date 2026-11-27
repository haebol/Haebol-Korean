import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, BookOpen, ChevronRight } from 'lucide-react';
import { playCutePop } from '../utils/audio';

export interface DesktopTocItem {
  id: string | number;
  pageLabel?: string;
  title: string;
  subtitle?: string;
  isActive?: boolean;
}

interface DesktopTocSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: DesktopTocItem[];
  onSelectItem: (item: DesktopTocItem, index: number) => void;
}

export const DesktopTocSidebar: React.FC<DesktopTocSidebarProps> = ({
  isOpen,
  onClose,
  title,
  items,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.map((item, idx) => ({ item, idx }));
    return items
      .map((item, idx) => ({ item, idx }))
      .filter(({ item }) => {
        const hay = `${item.pageLabel || ''} ${item.title} ${item.subtitle || ''}`.toLowerCase();
        return hay.includes(q);
      });
  }, [items, query]);

  if (!isOpen) return null;

  return (
    <div className="hidden lg:block no-print font-korean-gothic">
      {/* Subtle backdrop */}
      <div
        className="fixed inset-0 z-[70] bg-[#1E0B36]/20 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Left PDF Bookmark / TOC Drawer */}
      <aside
        role="dialog"
        aria-label={`${title} 목차`}
        className="fixed top-0 left-0 bottom-0 z-[75] w-[320px] xl:w-[340px] bg-white border-r border-purple-200 shadow-[12px_0_36px_rgba(59,22,104,0.16)] flex flex-col animate-in slide-in-from-left duration-150"
      >
        {/* Top Purple Header */}
        <div className="px-4 h-[56px] bg-[#3B1668] text-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className="w-4 h-4 text-purple-200 shrink-0" />
            <h2 className="text-[14.5px] font-black tracking-tight truncate">{title}</h2>
            <span className="px-1.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold text-purple-100 tabular-nums shrink-0">
              {items.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-white/12 hover:bg-white/22 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="목차 닫기"
            title="목차 닫기 (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-purple-100 bg-[#FAF7FF] shrink-0">
          <div className="h-9 px-2.5 rounded-lg bg-white border border-purple-200 focus-within:border-[#5B21B6] flex items-center gap-2 transition-colors">
            <Search className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="단원 · 페이지 검색..."
              className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
              aria-label="목차 검색"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="검색어 지우기"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bookmark List */}
        <div className="flex-1 overflow-y-auto py-1.5 divide-y divide-purple-50">
          {filteredItems.length > 0 ? (
            filteredItems.map(({ item, idx }) => (
              <button
                key={`${item.id}-${idx}`}
                type="button"
                onClick={() => {
                  playCutePop();
                  onSelectItem(item, idx);
                }}
                className={`w-full px-3.5 py-2.5 text-left flex items-center justify-between gap-2.5 transition-colors cursor-pointer ${
                  item.isActive
                    ? 'bg-purple-100/80 text-[#3B1668] border-l-4 border-[#3B1668] pl-2.5'
                    : 'hover:bg-purple-50/70 text-slate-700 border-l-4 border-transparent pl-2.5'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {item.pageLabel && (
                      <span
                        className={`text-[10.5px] font-extrabold px-1.5 py-0.5 rounded-md tabular-nums shrink-0 ${
                          item.isActive
                            ? 'bg-[#3B1668] text-white'
                            : 'bg-purple-100/70 text-purple-800'
                        }`}
                      >
                        {item.pageLabel}
                      </span>
                    )}
                    <span
                      className={`text-[13px] truncate ${
                        item.isActive ? 'font-black text-[#2E1052]' : 'font-bold text-slate-800'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  {item.subtitle && (
                    <p className="mt-0.5 text-[11px] font-medium text-slate-500 truncate">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 shrink-0 ${
                    item.isActive ? 'text-[#3B1668]' : 'text-purple-300'
                  }`}
                />
              </button>
            ))
          ) : (
            <div className="py-12 text-center text-xs font-bold text-slate-400">
              검색 결과가 없습니다
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
