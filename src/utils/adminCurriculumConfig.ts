import { useState, useEffect, useCallback } from 'react';
import { HANGEUL_GROUP_META, HangeulGroupMetaItem } from '../data/hangeulGroupMeta';
import { CHAPTER_META_LIST, ChapterMetaItem } from '../data/chapterMeta';
import { VERB_UNIT_META, VerbUnitMetaItem, VerbUnitType } from '../data/verbUnitMeta';
import { PARTICLE_UNIT_META, ParticleUnitMetaItem, ParticleUnitId } from '../data/particleUnitMeta';

export type AdminTrackId = 'hangeul' | 'classroom' | 'verb' | 'particle';

/**
 * 전체 합본 PDF를 배포할 대표 블로그 주소 기본값.
 * 모든 방문자에게 영구 표시하려면 여기에 블로그 주소를 넣거나,
 * 관리자 스튜디오 > [인쇄 · PDF 센터] 상단에서 먼저 테스트·설정할 수 있습니다.
 */
export const DEFAULT_BLOG_BUNDLE_URL = '';

export interface AdminCurriculumConfig {
  version: 1;
  updatedAt: string;
  /** Map of `${track}:${unitId}` -> true when locked (준비중) */
  lockedUnits: Record<string, boolean>;
  /** Custom unit order per track */
  unitOrder: {
    hangeul: string[];
    classroom: number[];
    verb: VerbUnitType[];
    particle: ParticleUnitId[];
  };
  /** Menu-level lock switches (e.g. 'menu:exam', 'menu:play') */
  lockedMenus: Record<string, boolean>;
  /** Optional blog URL for full bundled PDF free sharing */
  blogBundleUrl: string;
}

export const ADMIN_CONFIG_STORAGE_KEY = 'haebol_admin_curriculum_config_v1';
export const ADMIN_CONFIG_EVENT = 'haebol-admin-curriculum-config-changed';

export function makeUnitKey(track: AdminTrackId, id: string | number): string {
  return `${track}:${String(id)}`;
}

export function getDefaultAdminCurriculumConfig(): AdminCurriculumConfig {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    lockedUnits: {},
    unitOrder: {
      hangeul: HANGEUL_GROUP_META.map((g) => g.id),
      classroom: CHAPTER_META_LIST.map((c) => c.ch),
      verb: VERB_UNIT_META.map((u) => u.id),
      particle: PARTICLE_UNIT_META.map((u) => u.id),
    },
    lockedMenus: {
      'menu:exam': true,
      'menu:play': true,
    },
    blogBundleUrl: DEFAULT_BLOG_BUNDLE_URL,
  };
}

function reconcileOrder<T extends string | number>(
  savedOrder: unknown,
  defaultOrder: T[],
  coerce: (val: unknown) => T | null
): T[] {
  const validSet = new Set<T>(defaultOrder);
  const result: T[] = [];
  const seen = new Set<T>();

  if (Array.isArray(savedOrder)) {
    for (const raw of savedOrder) {
      const val = coerce(raw);
      if (val !== null && validSet.has(val) && !seen.has(val)) {
        result.push(val);
        seen.add(val);
      }
    }
  }
  for (const def of defaultOrder) {
    if (!seen.has(def)) {
      result.push(def);
      seen.add(def);
    }
  }
  return result;
}

export function normalizeAdminCurriculumConfig(raw: unknown): AdminCurriculumConfig {
  const def = getDefaultAdminCurriculumConfig();
  if (!raw || typeof raw !== 'object') return def;
  const obj = raw as Record<string, unknown>;

  const lockedUnits: Record<string, boolean> = {};
  if (obj.lockedUnits && typeof obj.lockedUnits === 'object') {
    for (const [k, v] of Object.entries(obj.lockedUnits as Record<string, unknown>)) {
      if (v === true) lockedUnits[k] = true;
    }
  }

  const lockedMenus: Record<string, boolean> = { ...def.lockedMenus };
  if (obj.lockedMenus && typeof obj.lockedMenus === 'object') {
    for (const [k, v] of Object.entries(obj.lockedMenus as Record<string, unknown>)) {
      if (typeof v === 'boolean') lockedMenus[k] = v;
    }
  }

  const rawOrder = (obj.unitOrder && typeof obj.unitOrder === 'object'
    ? obj.unitOrder
    : {}) as Record<string, unknown>;

  const rawBlogUrl =
    typeof obj.blogBundleUrl === 'string' ? obj.blogBundleUrl.trim() : def.blogBundleUrl;
  const safeBlogUrl =
    rawBlogUrl && /^https?:\/\//i.test(rawBlogUrl) ? rawBlogUrl : def.blogBundleUrl;

  return {
    version: 1,
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : new Date().toISOString(),
    lockedUnits,
    unitOrder: {
      hangeul: reconcileOrder(rawOrder.hangeul, def.unitOrder.hangeul, (v) =>
        typeof v === 'string' ? v : null
      ),
      classroom: reconcileOrder(rawOrder.classroom, def.unitOrder.classroom, (v) => {
        const n = Number(v);
        return Number.isInteger(n) ? n : null;
      }),
      verb: reconcileOrder(rawOrder.verb, def.unitOrder.verb, (v) =>
        typeof v === 'string' ? (v as VerbUnitType) : null
      ),
      particle: reconcileOrder(rawOrder.particle, def.unitOrder.particle, (v) =>
        typeof v === 'string' ? (v as ParticleUnitId) : null
      ),
    },
    lockedMenus,
    blogBundleUrl: safeBlogUrl,
  };
}

export function loadAdminCurriculumConfig(): AdminCurriculumConfig {
  try {
    const raw = localStorage.getItem(ADMIN_CONFIG_STORAGE_KEY);
    if (!raw) return getDefaultAdminCurriculumConfig();
    return normalizeAdminCurriculumConfig(JSON.parse(raw));
  } catch {
    return getDefaultAdminCurriculumConfig();
  }
}

export function saveAdminCurriculumConfig(config: AdminCurriculumConfig): void {
  const next: AdminCurriculumConfig = {
    ...config,
    version: 1,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(ADMIN_CONFIG_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore localStorage quota errors
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ADMIN_CONFIG_EVENT, { detail: next }));
  }
}

export function useAdminCurriculumConfig(): [
  AdminCurriculumConfig,
  (updater: AdminCurriculumConfig | ((prev: AdminCurriculumConfig) => AdminCurriculumConfig)) => void
] {
  const [config, setConfigState] = useState<AdminCurriculumConfig>(() =>
    loadAdminCurriculumConfig()
  );

  useEffect(() => {
    const handleCustom = (e: Event) => {
      const detail = (e as CustomEvent<AdminCurriculumConfig>).detail;
      if (detail) {
        setConfigState(normalizeAdminCurriculumConfig(detail));
      } else {
        setConfigState(loadAdminCurriculumConfig());
      }
    };
    const handleStorage = (e: StorageEvent) => {
      if (e.key === ADMIN_CONFIG_STORAGE_KEY) {
        setConfigState(loadAdminCurriculumConfig());
      }
    };
    window.addEventListener(ADMIN_CONFIG_EVENT, handleCustom);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener(ADMIN_CONFIG_EVENT, handleCustom);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const updateConfig = useCallback(
    (updater: AdminCurriculumConfig | ((prev: AdminCurriculumConfig) => AdminCurriculumConfig)) => {
      setConfigState((prev) => {
        const next = normalizeAdminCurriculumConfig(
          typeof updater === 'function' ? updater(prev) : updater
        );
        saveAdminCurriculumConfig(next);
        return next;
      });
    },
    []
  );

  return [config, updateConfig];
}

export function isUnitLocked(
  config: AdminCurriculumConfig,
  track: AdminTrackId,
  id: string | number
): boolean {
  return Boolean(config.lockedUnits[makeUnitKey(track, id)]);
}

export function toggleUnitLocked(
  config: AdminCurriculumConfig,
  track: AdminTrackId,
  id: string | number
): AdminCurriculumConfig {
  const key = makeUnitKey(track, id);
  const nextLocked = { ...config.lockedUnits };
  if (nextLocked[key]) {
    delete nextLocked[key];
  } else {
    nextLocked[key] = true;
  }
  return { ...config, lockedUnits: nextLocked };
}

export function setUnitsBulkLocked(
  config: AdminCurriculumConfig,
  keys: string[],
  locked: boolean
): AdminCurriculumConfig {
  const nextLocked = { ...config.lockedUnits };
  for (const key of keys) {
    if (locked) {
      nextLocked[key] = true;
    } else {
      delete nextLocked[key];
    }
  }
  return { ...config, lockedUnits: nextLocked };
}

export function moveUnitInTrack(
  config: AdminCurriculumConfig,
  track: AdminTrackId,
  id: string | number,
  direction: 'up' | 'down'
): AdminCurriculumConfig {
  const list = [...config.unitOrder[track]] as Array<string | number>;
  const idx = list.findIndex((item) => String(item) === String(id));
  if (idx < 0) return config;
  const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= list.length) return config;

  [list[idx], list[targetIdx]] = [list[targetIdx], list[idx]];

  return {
    ...config,
    unitOrder: {
      ...config.unitOrder,
      [track]: list,
    },
  };
}

export function getOrderedHangeulMeta(config: AdminCurriculumConfig): HangeulGroupMetaItem[] {
  const map = new Map(HANGEUL_GROUP_META.map((item) => [item.id, item]));
  return config.unitOrder.hangeul
    .map((id) => map.get(id))
    .filter((item): item is HangeulGroupMetaItem => Boolean(item));
}

export function getOrderedChapterMeta(config: AdminCurriculumConfig): ChapterMetaItem[] {
  const map = new Map(CHAPTER_META_LIST.map((item) => [item.ch, item]));
  return config.unitOrder.classroom
    .map((ch) => map.get(ch))
    .filter((item): item is ChapterMetaItem => Boolean(item));
}

export function getOrderedVerbMeta(config: AdminCurriculumConfig): VerbUnitMetaItem[] {
  const map = new Map(VERB_UNIT_META.map((item) => [item.id, item]));
  return config.unitOrder.verb
    .map((id) => map.get(id))
    .filter((item): item is VerbUnitMetaItem => Boolean(item));
}

export function getOrderedParticleMeta(config: AdminCurriculumConfig): ParticleUnitMetaItem[] {
  const map = new Map(PARTICLE_UNIT_META.map((item) => [item.id, item]));
  return config.unitOrder.particle
    .map((id) => map.get(id))
    .filter((item): item is ParticleUnitMetaItem => Boolean(item));
}

export interface TrackCountSummary {
  total: number;
  published: number;
  locked: number;
}

export interface CurriculumStats {
  total: number;
  published: number;
  locked: number;
  byTrack: Record<AdminTrackId, TrackCountSummary>;
}

export function getCurriculumStats(config: AdminCurriculumConfig): CurriculumStats {
  const calc = (track: AdminTrackId, ids: Array<string | number>): TrackCountSummary => {
    let locked = 0;
    for (const id of ids) {
      if (isUnitLocked(config, track, id)) locked += 1;
    }
    return {
      total: ids.length,
      published: ids.length - locked,
      locked,
    };
  };

  const hangeul = calc('hangeul', config.unitOrder.hangeul);
  const classroom = calc('classroom', config.unitOrder.classroom);
  const verb = calc('verb', config.unitOrder.verb);
  const particle = calc('particle', config.unitOrder.particle);

  const total = hangeul.total + classroom.total + verb.total + particle.total;
  const locked = hangeul.locked + classroom.locked + verb.locked + particle.locked;
  return {
    total,
    published: total - locked,
    locked,
    byTrack: { hangeul, classroom, verb, particle },
  };
}

export function exportAdminConfigJson(config: AdminCurriculumConfig): string {
  return JSON.stringify(
    {
      version: 1,
      updatedAt: new Date().toISOString(),
      lockedUnits: config.lockedUnits,
      unitOrder: config.unitOrder,
      lockedMenus: config.lockedMenus,
      blogBundleUrl: config.blogBundleUrl,
    },
    null,
    2
  );
}

export function parseAdminConfigJson(rawText: string): {
  ok: true;
  config: AdminCurriculumConfig;
  stats: CurriculumStats;
} | {
  ok: false;
  error: string;
} {
  try {
    const parsed = JSON.parse(rawText);
    if (!parsed || typeof parsed !== 'object') {
      return { ok: false, error: '유효한 JSON 객체 형식이 아닙니다.' };
    }
    const obj = parsed as Record<string, unknown>;
    if (!obj.lockedUnits && !obj.unitOrder && !obj.lockedMenus && !obj.blogBundleUrl) {
      return {
        ok: false,
        error: '해볼한국어 관리자 설정 형식(lockedUnits / unitOrder)을 찾을 수 없습니다.',
      };
    }
    const normalized = normalizeAdminCurriculumConfig(obj);
    return {
      ok: true,
      config: normalized,
      stats: getCurriculumStats(normalized),
    };
  } catch {
    return { ok: false, error: 'JSON 문법 오류입니다. 복사한 전체 텍스트를 확인해 주세요.' };
  }
}
