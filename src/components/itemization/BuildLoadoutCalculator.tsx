import React, { useState, useMemo } from 'react';
import { Hero, Item, Lane } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';
import { ITEMS } from '../../data/items';
import { soundManager } from '../../services/sound';
import { 
  Shield, Sword, Sparkles, Heart, Activity, Zap, Crosshair, 
  Trash2, Plus, Target, Flame, ArrowUpRight, RotateCcw 
} from 'lucide-react';

interface BuildLoadoutCalculatorProps {
  blueTeam: Record<Lane, string | null>;
  redTeam: Record<Lane, string | null>;
}

// Quick build presets for testing
const BUILD_PRESETS = [
  {
    name: 'Trinity Attack Speed',
    role: 'Marksman',
    itemIds: ['swift_boots', 'corrosion_scythe', 'demon_hunter_sword', 'golden_staff', 'wind_of_nature', 'malefic_roar'],
  },
  {
    name: 'Burst Assassin One-Shot',
    role: 'Assassin',
    itemIds: ['tough_boots', 'blade_of_the_heptaseas', 'hunter_strike', 'blade_of_despair', 'malefic_roar', 'immortality'],
  },
  {
    name: 'Apocalyptic Magic Nuke',
    role: 'Mage',
    itemIds: ['arcane_boots', 'clock_of_destiny', 'lightning_truncheon', 'holy_crystal', 'divine_glaive', 'blood_wings'],
  },
  {
    name: 'Immortal Behemoth Tank',
    role: 'Tank',
    itemIds: ['tough_boots', 'dominance_ice', 'athenas_shield', 'radiant_armor', 'antique_cuirass', 'immortality'],
  },
  {
    name: 'Sustain Spellvamp Bruiser',
    role: 'Fighter',
    itemIds: ['warrior_boots', 'war_axe', 'brute_force_breastplate', 'queens_wings', 'oracle', 'blade_of_despair'],
  }
];

// Target dummy presets for 1v1 duel sim
interface TargetDummy {
  name: string;
  type: string;
  hp: number;
  physDef: number;
  magicDef: number;
}

const TARGET_DUMMIES: TargetDummy[] = [
  { name: 'Squishy Marksman / Mage', type: 'Carry', hp: 3400, physDef: 35, magicDef: 30 },
  { name: 'Balanced Fighter / Bruiser', type: 'Fighter', hp: 5800, physDef: 105, magicDef: 75 },
  { name: 'Full Behemoth Frontliner', type: 'Tank', hp: 9500, physDef: 210, magicDef: 160 },
];

export const BuildLoadoutCalculator: React.FC<BuildLoadoutCalculatorProps> = ({
  blueTeam,
  redTeam,
}) => {
  // Selected Hero
  const [selectedHeroId, setSelectedHeroId] = useState<string>(() => {
    return Object.values(blueTeam).find(Boolean) || 'claude';
  });

  // 6 Item Slots
  const [slots, setSlots] = useState<(Item | null)[]>([
    ITEMS.find(i => i.id === 'swift_boots') || null,
    ITEMS.find(i => i.id === 'demon_hunter_sword') || null,
    ITEMS.find(i => i.id === 'golden_staff') || null,
    ITEMS.find(i => i.id === 'corrosion_scythe') || null,
    ITEMS.find(i => i.id === 'wind_of_nature') || null,
    ITEMS.find(i => i.id === 'malefic_roar') || null,
  ]);

  // Active slot for item picker modal
  const [pickerSlotIndex, setPickerSlotIndex] = useState<number | null>(null);
  const [pickerCategory, setPickerCategory] = useState<string>('All');
  const [pickerSearch, setPickerSearch] = useState<string>('');

  // 1v1 Target Dummy
  const [selectedDummyIndex, setSelectedDummyIndex] = useState<number>(0);

  const hero = HEROES.find(h => h.id === selectedHeroId) || HEROES[0];
  const targetDummy = TARGET_DUMMIES[selectedDummyIndex];

  // Base Stats for Hero (approximate MLBB level 15 stats based on durability & role)
  const baseStats = useMemo(() => {
    const isTank = hero.role.includes('Tank');
    const isFighter = hero.role.includes('Fighter');
    const isMage = hero.role.includes('Mage');
    const isMM = hero.role.includes('Marksman');
    const isAssassin = hero.role.includes('Assassin');

    let baseHp = 3200 + hero.durability * 260; // 3200 to 5800
    let basePhysAtk = isMage ? 115 : 125 + (10 - hero.durability) * 7;
    let basePhysDef = 30 + hero.durability * 5;
    let baseMagicDef = 30;
    let baseAtkSpeed = isMM ? 1.25 : 1.05;

    return {
      hp: baseHp,
      physAtk: basePhysAtk,
      magicPower: 0,
      physDef: basePhysDef,
      magicDef: baseMagicDef,
      atkSpeed: baseAtkSpeed,
      cdr: 0,
      physPen: 0,
      magicPen: 0,
      critChance: 0,
    };
  }, [hero]);

  // Aggregate Stats from equipped items
  const calculatedStats = useMemo(() => {
    let bonusHp = 0;
    let bonusPhysAtk = 0;
    let bonusMagicPower = 0;
    let bonusPhysDef = 0;
    let bonusMagicDef = 0;
    let bonusAtkSpeedPct = 0;
    let bonusCdr = 0;
    let bonusPhysPen = 0;
    let bonusMagicPen = 0;
    let totalCost = 0;

    slots.forEach((item) => {
      if (!item) return;
      totalCost += item.cost;
      const desc = item.stats + ' ' + item.passive;

      // Extract HP
      const hpMatch = desc.match(/\+(\d+)\s*HP/i);
      if (hpMatch) bonusHp += parseInt(hpMatch[1], 10);

      // Extract Physical Attack
      const physMatch = desc.match(/\+(\d+)\s*Physical Attack/i);
      if (physMatch) bonusPhysAtk += parseInt(physMatch[1], 10);

      // Extract Magic Power
      const magicMatch = desc.match(/\+(\d+)\s*Magic Power/i);
      if (magicMatch) bonusMagicPower += parseInt(magicMatch[1], 10);

      // Extract Physical Defense
      const pDefMatch = desc.match(/\+(\d+)\s*Physical Defense/i);
      if (pDefMatch) bonusPhysDef += parseInt(pDefMatch[1], 10);

      // Extract Magic Defense
      const mDefMatch = desc.match(/\+(\d+)\s*Magic Defense/i);
      if (mDefMatch) bonusMagicDef += parseInt(mDefMatch[1], 10);

      // Extract Attack Speed
      const asMatch = desc.match(/\+(\d+)%\s*Attack Speed/i);
      if (asMatch) bonusAtkSpeedPct += parseInt(asMatch[1], 10);

      // Extract CDR
      const cdrMatch = desc.match(/\+(\d+)%\s*Cooldown Reduction/i);
      if (cdrMatch) bonusCdr += parseInt(cdrMatch[1], 10);

      // Extract Physical PEN
      const pPenMatch = desc.match(/\+(\d+)\s*Physical PEN/i);
      if (pPenMatch) bonusPhysPen += parseInt(pPenMatch[1], 10);

      // Extract Magic PEN
      const mPenMatch = desc.match(/\+(\d+)\s*Magic PEN/i);
      if (mPenMatch) bonusMagicPen += parseInt(mPenMatch[1], 10);
    });

    // Handle Holy Crystal +35% Magic Power passive if equipped
    const hasHolyCrystal = slots.some(i => i?.id === 'holy_crystal');
    if (hasHolyCrystal) {
      bonusMagicPower = Math.round(bonusMagicPower * 1.35);
    }

    const totalHp = baseStats.hp + bonusHp;
    const totalPhysAtk = Math.round(baseStats.physAtk + bonusPhysAtk);
    const totalMagicPower = Math.round(baseStats.magicPower + bonusMagicPower);
    const totalPhysDef = baseStats.physDef + bonusPhysDef;
    const totalMagicDef = baseStats.magicDef + bonusMagicDef;
    const totalCdr = Math.min(40, bonusCdr); // MLBB cap 40%
    const totalAtkSpeed = Number((baseStats.atkSpeed * (1 + bonusAtkSpeedPct / 100)).toFixed(2));

    // Damage Reduction Percentages
    const physDmgReduction = Math.round((totalPhysDef / (totalPhysDef + 120)) * 100);
    const magicDmgReduction = Math.round((totalMagicDef / (totalMagicDef + 120)) * 100);

    // Effective HP (EHP)
    const physicalEHP = Math.round(totalHp * (1 + totalPhysDef / 120));
    const magicEHP = Math.round(totalHp * (1 + totalMagicDef / 120));

    return {
      totalHp,
      bonusHp,
      totalPhysAtk,
      bonusPhysAtk,
      totalMagicPower,
      bonusMagicPower,
      totalPhysDef,
      bonusPhysDef,
      totalMagicDef,
      bonusMagicDef,
      totalCdr,
      totalAtkSpeed,
      totalPhysPen: bonusPhysPen,
      totalMagicPen: bonusMagicPen,
      physDmgReduction,
      magicDmgReduction,
      physicalEHP,
      magicEHP,
      totalCost,
    };
  }, [baseStats, slots]);

  // 1v1 Duel Simulation calculation
  const duelSimulation = useMemo(() => {
    const isMagicHero = hero.damage_type === 'Magic';
    const enemyHp = targetDummy.hp;

    // Defense calculation factoring flat penetration
    let effectiveEnemyDef = isMagicHero
      ? Math.max(0, targetDummy.magicDef - calculatedStats.totalMagicPen)
      : Math.max(0, targetDummy.physDef - calculatedStats.totalPhysPen);

    // Malefic Roar passive: +0.12% per enemy defense, max 40%
    const hasMaleficRoar = slots.some(i => i?.id === 'malefic_roar');
    if (!isMagicHero && hasMaleficRoar) {
      const penPercent = Math.min(0.40, effectiveEnemyDef * 0.0012);
      effectiveEnemyDef = Math.round(effectiveEnemyDef * (1 - penPercent));
    }

    // Divine Glaive passive: +0.1% per enemy magic defense, max 40%
    const hasDivineGlaive = slots.some(i => i?.id === 'divine_glaive');
    if (isMagicHero && hasDivineGlaive) {
      const magicPenPercent = Math.min(0.40, effectiveEnemyDef * 0.001);
      effectiveEnemyDef = Math.round(effectiveEnemyDef * (1 - magicPenPercent));
    }

    const enemyDamageMitigation = effectiveEnemyDef / (effectiveEnemyDef + 120);

    // Raw basic attack or skill attack
    let rawAttackDamage = isMagicHero
      ? calculatedStats.totalMagicPower * 0.9 + 180
      : calculatedStats.totalPhysAtk;

    // Demon Hunter Sword on-hit (8% of target current HP)
    const hasDHS = slots.some(i => i?.id === 'demon_hunter_sword');
    if (hasDHS) {
      rawAttackDamage += enemyHp * 0.08 * 0.6; // Average 4.8% on-hit
    }

    // Blade of Despair execute (+25% when target below 50%)
    const hasBOD = slots.some(i => i?.id === 'blade_of_despair');
    if (hasBOD) {
      rawAttackDamage *= 1.125; // Averaged over full HP bar
    }

    const netDamagePerHit = Math.max(50, Math.round(rawAttackDamage * (1 - enemyDamageMitigation)));
    const dps = Math.round(netDamagePerHit * calculatedStats.totalAtkSpeed);

    // Full Combo Burst (Skills + 3 hits)
    const comboBurst = Math.round(
      (isMagicHero
        ? calculatedStats.totalMagicPower * 2.8 + 1400
        : calculatedStats.totalPhysAtk * 3.2 + 900) * (1 - enemyDamageMitigation)
    );

    // Time to Kill (TTK in seconds)
    const ttk = Number((enemyHp / Math.max(1, dps)).toFixed(2));

    return {
      netDamagePerHit,
      dps,
      comboBurst,
      ttk,
      effectiveEnemyDef,
      enemyDamageMitigationPct: Math.round(enemyDamageMitigation * 100),
    };
  }, [hero, targetDummy, calculatedStats, slots]);

  const handleApplyPreset = (preset: typeof BUILD_PRESETS[0]) => {
    soundManager.playLockIn();
    const newSlots = preset.itemIds.map(id => ITEMS.find(i => i.id === id) || null);
    setSlots(newSlots);
  };

  const handleEquipItem = (item: Item) => {
    if (pickerSlotIndex === null) return;
    soundManager.playLockIn();
    const updated = [...slots];
    updated[pickerSlotIndex] = item;
    setSlots(updated);
    setPickerSlotIndex(null);
  };

  const handleClearSlot = (index: number) => {
    soundManager.playClick();
    const updated = [...slots];
    updated[index] = null;
    setSlots(updated);
  };

  const filteredPickerItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchesCat =
        pickerCategory === 'All' ||
        item.category === pickerCategory ||
        item.subcategory === pickerCategory;
      const q = pickerSearch.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.stats.toLowerCase().includes(q) ||
        item.passive.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [pickerCategory, pickerSearch]);

  return (
    <div className="space-y-6">
      {/* Top Controls: Hero Selector & Build Presets */}
      <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-surface-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-gold-500/40 bg-slate-900 shrink-0">
              <img
                src={`/heroes/${hero.id}.png`}
                alt={hero.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif]">
                  {hero.name}
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-elevated text-gold-400 border border-gold-500/30">
                  {hero.role} • {hero.damage_type}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Switch hero to calculate exact baseline and full equipment scaling
              </div>
            </div>
          </div>

          {/* Hero Select Dropdown */}
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-slate-400">Select Hero:</label>
            <select
              value={selectedHeroId}
              onChange={(e) => {
                soundManager.playClick();
                setSelectedHeroId(e.target.value);
              }}
              className="bg-surface-elevated border border-surface-border rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-gold-500 font-bold"
            >
              {HEROES.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.role} - {h.primary_lane})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Build Presets Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Meta Presets:
          </span>
          {BUILD_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-gold-500/20 text-slate-300 hover:text-gold-300 border border-surface-borderLight text-xs font-medium transition-all"
            >
              {p.name}
            </button>
          ))}
          <button
            onClick={() => {
              soundManager.playClick();
              setSlots([null, null, null, null, null, null]);
            }}
            className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-surface-borderLight text-xs font-medium transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Clear All
          </button>
        </div>

        {/* 6 Interactive Item Slots Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {slots.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                soundManager.playClick();
                setPickerSlotIndex(idx);
              }}
              className={`relative rounded-xl border p-3 cursor-pointer transition-all flex flex-col justify-between h-36 group ${
                item
                  ? 'bg-surface-elevated border-gold-500/30 hover:border-gold-400 shadow-md'
                  : 'bg-canvas/80 border-dashed border-surface-border hover:border-gold-500/50 hover:bg-gold-500/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                  Slot #{idx + 1}
                </span>
                {item && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearSlot(idx);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>

              {item ? (
                <div className="flex flex-col items-center text-center my-auto space-y-1.5">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-gold-500/50 bg-slate-950 shrink-0 group-hover:scale-105 transition-transform shadow-md">
                    <img
                      src={`/items/${item.id}.png`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0 w-full">
                    <h5 className="text-xs font-bold text-slate-100 truncate group-hover:text-gold-300">
                      {item.name}
                    </h5>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      {item.cost}g
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center my-auto text-slate-500 group-hover:text-gold-400 space-y-1">
                  <Plus className="w-6 h-6" />
                  <span className="text-[10px] font-bold">Equip Item</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-surface-border">
          <span>Click any slot to swap or change equipment</span>
          <span className="font-mono text-emerald-400 font-bold">
            Total Build Cost: {calculatedStats.totalCost} Gold
          </span>
        </div>
      </div>

      {/* Live Calculated Stats & 1v1 Duel Simulation Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Real-Time Stats Matrix (7 Cols) */}
        <div className="lg:col-span-7 bg-surface border border-surface-border rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-gold-400" />
              <h4 className="text-sm font-bold text-slate-100 font-['Cinzel',serif]">
                Level 15 Live Stat Sheet
              </h4>
            </div>
            <span className="text-xs font-mono text-gold-400 font-bold">
              Base + Item Scaling
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Total HP & EHP */}
            <div className="p-3 rounded-xl bg-canvas border border-surface-border space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold">
                <Heart className="w-3.5 h-3.5" />
                <span>Max HP</span>
              </div>
              <div className="text-lg font-mono font-black text-slate-100">
                {calculatedStats.totalHp}
              </div>
              <div className="text-[10px] text-slate-400">
                +{calculatedStats.bonusHp} from items
              </div>
            </div>

            {/* Physical Attack */}
            <div className="p-3 rounded-xl bg-canvas border border-surface-border space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-red-400 font-bold">
                <Sword className="w-3.5 h-3.5" />
                <span>Physical ATK</span>
              </div>
              <div className="text-lg font-mono font-black text-slate-100">
                {calculatedStats.totalPhysAtk}
              </div>
              <div className="text-[10px] text-slate-400">
                +{calculatedStats.bonusPhysAtk} from items
              </div>
            </div>

            {/* Magic Power */}
            <div className="p-3 rounded-xl bg-canvas border border-surface-border space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-purple-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Magic Power</span>
              </div>
              <div className="text-lg font-mono font-black text-slate-100">
                {calculatedStats.totalMagicPower}
              </div>
              <div className="text-[10px] text-slate-400">
                +{calculatedStats.bonusMagicPower} from items
              </div>
            </div>

            {/* Physical Defense & Reduction */}
            <div className="p-3 rounded-xl bg-canvas border border-surface-border space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-sky-400 font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Physical DEF</span>
              </div>
              <div className="text-lg font-mono font-black text-slate-100">
                {calculatedStats.totalPhysDef}
              </div>
              <div className="text-[10px] text-sky-300">
                {calculatedStats.physDmgReduction}% Damage Mitigation
              </div>
            </div>

            {/* Magic Defense & Reduction */}
            <div className="p-3 rounded-xl bg-canvas border border-surface-border space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-indigo-400 font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>Magic DEF</span>
              </div>
              <div className="text-lg font-mono font-black text-slate-100">
                {calculatedStats.totalMagicDef}
              </div>
              <div className="text-[10px] text-indigo-300">
                {calculatedStats.magicDmgReduction}% Damage Mitigation
              </div>
            </div>

            {/* Attack Speed */}
            <div className="p-3 rounded-xl bg-canvas border border-surface-border space-y-1">
              <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Attack Speed</span>
              </div>
              <div className="text-lg font-mono font-black text-slate-100">
                {calculatedStats.totalAtkSpeed} /s
              </div>
              <div className="text-[10px] text-slate-400">
                CDR: {calculatedStats.totalCdr}% (Cap 40%)
              </div>
            </div>
          </div>

          {/* Effective HP Gauges */}
          <div className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">Effective Physical HP (EHP):</span>
              <span className="font-mono font-bold text-sky-400">
                {calculatedStats.physicalEHP.toLocaleString()} EHP
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (calculatedStats.physicalEHP / 25000) * 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="font-bold text-slate-300">Effective Magic HP (EHP):</span>
              <span className="font-mono font-bold text-indigo-400">
                {calculatedStats.magicEHP.toLocaleString()} EHP
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (calculatedStats.magicEHP / 25000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: 1v1 Live Duel Simulator (5 Cols) */}
        <div className="lg:col-span-5 bg-surface border border-surface-border rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center space-x-2">
              <Crosshair className="w-4 h-4 text-red-400" />
              <h4 className="text-sm font-bold text-slate-100 font-['Cinzel',serif]">
                1v1 Duel Simulator
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-red-400">
              Combat Math
            </span>
          </div>

          {/* Opponent Dummy Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-gold-400" /> Select Target Dummy:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {TARGET_DUMMIES.map((dummy, idx) => (
                <button
                  key={dummy.name}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedDummyIndex(idx);
                  }}
                  className={`p-2 rounded-xl text-left border transition-all ${
                    selectedDummyIndex === idx
                      ? 'bg-gold-500/20 border-gold-500/60 shadow-sm'
                      : 'bg-canvas/70 border-surface-border text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[11px] font-bold text-slate-200 truncate">{dummy.type}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{dummy.hp} HP</div>
                </button>
              ))}
            </div>
          </div>

          {/* Simulation Output Cards */}
          <div className="space-y-2.5 pt-1">
            {/* Time to Kill (TTK) */}
            <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-300 tracking-wider">
                  Time To Kill (TTK)
                </span>
                <div className="text-xl font-mono font-black text-red-100">
                  {duelSimulation.ttk}s
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                {duelSimulation.ttk <= 1.2 ? '⚡ INSTA-BURST' : duelSimulation.ttk <= 3.5 ? '⚔️ FAST DUEL' : '🛡️ EXTENDED FIGHT'}
              </span>
            </div>

            {/* DPS & Hit Damage */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-canvas border border-surface-border space-y-0.5">
                <span className="text-slate-400 text-[10px]">Net Damage / Hit:</span>
                <div className="font-mono font-bold text-slate-100 text-sm">
                  {duelSimulation.netDamagePerHit}
                </div>
                <div className="text-[9px] text-slate-500">
                  vs {duelSimulation.effectiveEnemyDef} Enemy Armor
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-canvas border border-surface-border space-y-0.5">
                <span className="text-slate-400 text-[10px]">Basic Attack DPS:</span>
                <div className="font-mono font-bold text-amber-400 text-sm">
                  {duelSimulation.dps} /sec
                </div>
                <div className="text-[9px] text-slate-500">
                  Mitigation: {duelSimulation.enemyDamageMitigationPct}%
                </div>
              </div>
            </div>

            {/* Full Combo Burst */}
            <div className="p-3 rounded-xl bg-canvas border border-surface-border flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Full Combo Rotation Burst
                </span>
                <div className="text-base font-mono font-bold text-gold-400">
                  {duelSimulation.comboBurst} Total Damage
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">
                {Math.round((duelSimulation.comboBurst / targetDummy.hp) * 100)}% of Max HP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Item Picker Modal when clicking slot */}
      {pickerSlotIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-gold-500/40 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-mythic-glow overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-100 font-['Cinzel',serif]">
                  Equip Item into Slot #{pickerSlotIndex + 1}
                </h4>
                <p className="text-xs text-slate-400">
                  Choose from verified MLBB physical, magic, defense, or boot equipment
                </p>
              </div>
              <button
                onClick={() => setPickerSlotIndex(null)}
                className="w-8 h-8 rounded-lg bg-surface-elevated text-slate-400 hover:text-slate-100 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Search & Category Filter */}
            <div className="p-3 border-b border-surface-border bg-surface-subtle flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Search item name, stats, passive..."
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                className="w-full sm:w-64 px-3 py-1.5 rounded-lg bg-canvas border border-surface-border text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
              />
              <div className="flex items-center gap-1 overflow-x-auto w-full text-xs">
                {['All', 'Physical', 'Magic', 'Defense', 'Core Boots', 'Roam Boots'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPickerCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                      pickerCategory === cat
                        ? 'bg-gold-500 text-slate-950 font-bold'
                        : 'bg-surface text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Items Grid */}
            <div className="p-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-2.5 flex-1">
              {filteredPickerItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleEquipItem(item)}
                  className="p-2 rounded-xl bg-canvas hover:bg-surface-elevated border border-surface-border hover:border-gold-500/60 transition-all cursor-pointer flex items-center space-x-2.5 group"
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold-500/40 bg-slate-950 shrink-0">
                    <img
                      src={`/items/${item.id}.png`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h6 className="text-xs font-bold text-slate-200 group-hover:text-gold-300 truncate">
                      {item.name}
                    </h6>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {item.cost}g
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
