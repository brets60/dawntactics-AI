import { Lane, DraftMetrics, Item, Hero, EmblemPreset, OracleChatMessage } from '../types/mlbb';
import { HEROES } from '../data/heroes';
import { ITEMS } from '../data/items';
import { BASE_EMBLEMS, TALENTS_TIER_1, TALENTS_TIER_2, TALENTS_TIER_3, EMBLEM_PRESETS } from '../data/emblems';
import { evaluateDraftLocally } from './draftEngine';
import { solveOracleQueryLocally } from './oracleEngine';

// Standalone offline detection:
// When running in Android WebView, file://, or with no internet connection,
// all operations resolve instantaneously from local client-side engines.
const isOfflineOrApp = typeof window !== 'undefined' && (
  window.location.hostname === 'appassets.androidplatform.net' ||
  window.location.protocol === 'file:' ||
  window.location.protocol === 'capacitor:' ||
  !navigator.onLine
);

const API_BASE = '/api';

export async function fetchHeroes(): Promise<Hero[]> {
  if (isOfflineOrApp) return HEROES;
  try {
    const res = await fetch(`${API_BASE}/heroes`);
    if (res.ok) return await res.json();
  } catch {
    // Silent offline fallback
  }
  return HEROES;
}

export async function fetchItems(): Promise<Item[]> {
  if (isOfflineOrApp) return ITEMS;
  try {
    const res = await fetch(`${API_BASE}/items`);
    if (res.ok) return await res.json();
  } catch {
    // Silent offline fallback
  }
  return ITEMS;
}

export async function fetchEmblems() {
  if (isOfflineOrApp) {
    return {
      base_emblems: BASE_EMBLEMS,
      tier_1: TALENTS_TIER_1,
      tier_2: TALENTS_TIER_2,
      tier_3: TALENTS_TIER_3,
      presets: EMBLEM_PRESETS,
    };
  }
  try {
    const res = await fetch(`${API_BASE}/emblems`);
    if (res.ok) return await res.json();
  } catch {
    // Silent offline fallback
  }
  return {
    base_emblems: BASE_EMBLEMS,
    tier_1: TALENTS_TIER_1,
    tier_2: TALENTS_TIER_2,
    tier_3: TALENTS_TIER_3,
    presets: EMBLEM_PRESETS,
  };
}

export async function evaluateDraft(
  blueTeam: Record<Lane, string | null>,
  redTeam: Record<Lane, string | null>,
  _bans: { blue: string[]; red: string[] }
): Promise<{ blue: DraftMetrics; red: DraftMetrics }> {
  // Always evaluate locally in 0ms for instant real-time UI response
  return evaluateDraftLocally(blueTeam, redTeam);
}

export async function recommendItems(allyHeroId: string, enemyHeroIds: string[]) {
  const allyHero = HEROES.find(h => h.id === allyHeroId);
  const enemyHeroes = enemyHeroIds.map(id => HEROES.find(h => h.id === id)).filter(Boolean) as Hero[];
  
  const rulesTriggered: string[] = [];
  const recItems: Item[] = [];

  const hasSustain = enemyHeroes.some(e => ['estes', 'ruby', 'yu_zhong', 'thamuz', 'uranus', 'cici', 'angela'].includes(e.id));
  if (hasSustain) {
    if (allyHero?.primary_lane === 'Roam' || allyHero?.role.includes('Tank')) {
      const item = ITEMS.find(i => i.id === 'dominance_ice');
      if (item) recItems.push(item);
      rulesTriggered.push("Dominance Ice is MANDATORY: 50% Life Drain aura + attack speed reduction against sustain targets.");
    } else if (allyHero?.damage_type === 'Magic') {
      const item = ITEMS.find(i => i.id === 'glowing_wand');
      if (item) recItems.push(item);
      rulesTriggered.push("Glowing Wand triggers 50% Life Drain anti-heal + % Max HP burn on magic damage.");
    } else {
      const item = ITEMS.find(i => i.id === 'sea_halberd');
      if (item) recItems.push(item);
      rulesTriggered.push("Sea Halberd applies 50% Life Drain + bonus Punish damage against high HP targets.");
    }
  }

  const hasContinuousMagic = enemyHeroes.some(e => ['change', 'yve', 'valir', 'kimmy'].includes(e.id));
  if (hasContinuousMagic) {
    const item = ITEMS.find(i => i.id === 'radiant_armor');
    if (item) recItems.push(item);
    rulesTriggered.push("Radiant Armor reduces continuous tick magic damage with stacking Holy Blessing defense.");
  }

  const hasBurstMagic = enemyHeroes.some(e => ['kadita', 'pharsa', 'valentina', 'luo_yi', 'novaria'].includes(e.id));
  if (hasBurstMagic && !hasContinuousMagic) {
    const item = ITEMS.find(i => i.id === 'athenas_shield');
    if (item) recItems.push(item);
    rulesTriggered.push("Athena's Shield absorbs 25% of incoming magic burst upon first hit.");
  }

  const hasTanks = enemyHeroes.filter(e => e.durability >= 8).length >= 2;
  if (hasTanks) {
    if (allyHero?.damage_type === 'Physical') {
      const item = ITEMS.find(i => i.id === 'malefic_roar');
      if (item) recItems.push(item);
      rulesTriggered.push("Malefic Roar scales physical penetration dynamically against stacked enemy armor.");
    } else {
      const item = ITEMS.find(i => i.id === 'divine_glaive');
      if (item) recItems.push(item);
      rulesTriggered.push("Divine Glaive scales magic penetration against stacked magic defense.");
    }
  }

  const imm = ITEMS.find(i => i.id === 'immortality');
  const win = ITEMS.find(i => i.id === 'winter_crown');
  if (imm) recItems.push(imm);
  if (win) recItems.push(win);

  return {
    allyHero,
    recommended_items: recItems.filter(Boolean),
    rules_triggered: rulesTriggered,
    swapping_sequence: ["immortality", "winter_crown", allyHero?.role.includes("Marksman") ? "wind_of_nature" : "rose_gold_meteor"]
  };
}

import { GeminiService } from './gemini';

export async function askDawnOracle(
  query: string,
  context?: { blueHeroes?: string[]; redHeroes?: string[] }
): Promise<OracleChatMessage> {
  // If user configured Google Gemini API and is online, query Gemini
  if (GeminiService.hasKey() && (typeof navigator === 'undefined' || navigator.onLine)) {
    try {
      return await GeminiService.askOracle(query, context);
    } catch (err) {
      console.warn('[Gemini AI] Offline or request failed, using local heuristic matrix fallback:', err);
    }
  }

  // 100% offline instant fallback
  return solveOracleQueryLocally(query);
}
