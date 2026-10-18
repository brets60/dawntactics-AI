import { BaseEmblem, Talent, EmblemPreset } from '../types/mlbb';

export const BASE_EMBLEMS: BaseEmblem[] = [
  {
    id: "assassin",
    name: "Assassin",
    icon_color: "#A855F7",
    best_for: "Burst assassins, physical duelists, and roam killers needing high penetration",
    attributes: {
      "Adaptive Penetration": "+16",
      "Adaptive Attack": "+10",
      "Movement Speed": "+3%"
    }
  },
  {
    id: "fighter",
    name: "Fighter",
    icon_color: "#EF4444",
    best_for: "Bruisers, sustain duelists, and frontline skirmishers",
    attributes: {
      "Spell Vamp": "+10%",
      "Adaptive Attack": "+22",
      "Hybrid Defense": "+6"
    }
  },
  {
    id: "mage",
    name: "Mage",
    icon_color: "#3B82F6",
    best_for: "Burst and continuous magic damage dealers",
    attributes: {
      "Magic Power": "+30",
      "Cooldown Reduction": "+5%",
      "Magic Penetration": "+8"
    }
  },
  {
    id: "tank",
    name: "Tank",
    icon_color: "#10B981",
    best_for: "Heavy frontline, engage tanks, and sustain roams",
    attributes: {
      "HP": "+500",
      "Hybrid Defense": "+10",
      "HP Regen": "+4"
    }
  },
  {
    id: "marksman",
    name: "Marksman",
    icon_color: "#F59E0B",
    best_for: "Attack speed, crit, and long-range DPS carries",
    attributes: {
      "Attack Speed": "+15%",
      "Adaptive Attack": "+5",
      "Lifesteal": "+5%"
    }
  },
  {
    id: "support",
    name: "Support",
    icon_color: "#06B6D4",
    best_for: "Healers, enablers, utility roams, and team buffers",
    attributes: {
      "Healing Effect": "+12%",
      "Cooldown Reduction": "+10%",
      "Movement Speed": "+6%"
    }
  },
  {
    id: "common",
    name: "Common",
    icon_color: "#9CA3AF",
    best_for: "Mana-hungry or hybrid champions needing well-rounded sustain",
    attributes: {
      "Hybrid Regen": "+12",
      "HP": "+275",
      "Adaptive Attack": "+22"
    }
  }
];

export const TALENTS_TIER_1: Talent[] = [
  {
    id: "thrill",
    name: "Thrill",
    tier: 1,
    category: "Stats",
    effect: "Gains 16 Adaptive Attack (increases physical attack or magic power based on highest extra stat).",
    recommended_roles: ["Assassin", "Fighter", "Mage", "Marksman"],
    icon: "🗡️"
  },
  {
    id: "swift",
    name: "Swift",
    tier: 1,
    category: "Stats",
    effect: "Gains +10% Attack Speed bonus.",
    recommended_roles: ["Marksman", "Fighter"],
    icon: "🏹"
  },
  {
    id: "vitality",
    name: "Vitality",
    tier: 1,
    category: "Stats",
    effect: "Gains +225 Max HP bonus permanently.",
    recommended_roles: ["Tank", "Support", "Fighter"],
    icon: "❤️"
  },
  {
    id: "rupture",
    name: "Rupture",
    tier: 1,
    category: "Stats",
    effect: "Gains 5 Adaptive Penetration (scales Physical or Magic Penetration).",
    recommended_roles: ["Assassin", "Mage", "Fighter"],
    icon: "🪓"
  },
  {
    id: "inspire",
    name: "Inspire",
    tier: 1,
    category: "Stats",
    effect: "Gains 5% extra Cooldown Reduction.",
    recommended_roles: ["Mage", "Support", "Tank"],
    icon: "⏳"
  },
  {
    id: "firmness",
    name: "Firmness",
    tier: 1,
    category: "Stats",
    effect: "Gains 6 Physical Defense and 6 Magic Defense.",
    recommended_roles: ["Tank", "Fighter", "Support"],
    icon: "🛡️"
  },
  {
    id: "agility",
    name: "Agility",
    tier: 1,
    category: "Stats",
    effect: "Gains +4% Movement Speed bonus.",
    recommended_roles: ["Support", "Assassin", "Mage"],
    icon: "👟"
  },
  {
    id: "fatal",
    name: "Fatal",
    tier: 1,
    category: "Stats",
    effect: "Gains +5% Critical Chance and +10% Critical Damage.",
    recommended_roles: ["Marksman", "Assassin"],
    icon: "🎯"
  }
];

export const TALENTS_TIER_2: Talent[] = [
  {
    id: "seasoned_hunter",
    name: "Seasoned Hunter",
    tier: 2,
    category: "Combat Utility",
    effect: "Increases damage to Lord and Turtle by 15%. Damage taken from Lord/Turtle reduced by 15%.",
    recommended_roles: ["Jungle", "Assassin", "Tank"],
    icon: "🐉"
  },
  {
    id: "tenacity",
    name: "Tenacity",
    tier: 2,
    category: "Combat Utility",
    effect: "When HP drops below 50%, gains 15 Physical Defense and 15 Magic Defense.",
    recommended_roles: ["Tank", "Fighter", "EXP"],
    icon: "🏰"
  },
  {
    id: "master_assassin",
    name: "Master Assassin",
    tier: 2,
    category: "Combat Utility",
    effect: "Increases damage dealt by 7% when there is only one enemy hero nearby.",
    recommended_roles: ["Assassin", "EXP", "Fighter"],
    icon: "👤"
  },
  {
    id: "bargain_hunter",
    name: "Bargain Hunter",
    tier: 2,
    category: "Combat Utility",
    effect: "Equipment can be purchased for 95% of its original cost (5% discount on all items).",
    recommended_roles: ["Marksman", "Mage"],
    icon: "💰"
  },
  {
    id: "festival_of_blood",
    name: "Festival of Blood",
    tier: 2,
    category: "Combat Utility",
    effect: "Gains 6% Spell Vamp. Each hero kill or assist grants +0.5% extra Spell Vamp (up to 8 stacks, +10% total).",
    recommended_roles: ["Fighter", "Ruby", "Yu Zhong", "Terizla"],
    icon: "🩸"
  },
  {
    id: "pull_yourself_together",
    name: "Pull Yourself Together",
    tier: 2,
    category: "Combat Utility",
    effect: "Reduces the cooldown of Battle Spells and active equipment skills by 15%.",
    recommended_roles: ["Support", "Tank", "Roam"],
    icon: "🔄"
  },
  {
    id: "weapons_master",
    name: "Weapons Master",
    tier: 2,
    category: "Combat Utility",
    effect: "Physical Attack and Magic Power gained from equipment, emblems, and talents increased by 5%.",
    recommended_roles: ["Marksman", "Mage"],
    icon: "⚔️"
  },
  {
    id: "wilderness_blessing",
    name: "Wilderness Blessing",
    tier: 2,
    category: "Combat Utility",
    effect: "Increases Movement Speed in the Jungle and River by 10% (halved in combat).",
    recommended_roles: ["Roam", "Jungle"],
    icon: "🌿"
  }
];

export const TALENTS_TIER_3: Talent[] = [
  {
    id: "killing_spree",
    name: "Killing Spree",
    tier: 3,
    category: "Core Passive",
    effect: "Restores 15% HP and gains 20% Movement Speed for 3 seconds upon killing an enemy hero.",
    cooldown: "Passive on Kill",
    recommended_roles: ["Assassin", "Fanny", "Hayabusa", "Ling"],
    icon: "☠️"
  },
  {
    id: "brave_smite",
    name: "Brave Smite",
    tier: 3,
    category: "Core Passive",
    effect: "Dealing skill damage restores 5% Max HP. Cooldown: 6 seconds.",
    cooldown: "6s",
    recommended_roles: ["Ruby", "Terizla", "Fredrinn", "Yu Zhong"],
    icon: "🛡️"
  },
  {
    id: "impure_rage",
    name: "Impure Rage",
    tier: 3,
    category: "Core Passive",
    effect: "Dealing skill damage deals extra Adaptive Damage (44-240 + 4% Total Adaptive Attack) and restores 2% Mana (or 1% HP if no Mana). Cooldown: 5s.",
    cooldown: "5s",
    recommended_roles: ["Mage", "Chang'e", "Yve", "Pharsa"],
    icon: "🔮"
  },
  {
    id: "quantum_charge",
    name: "Quantum Charge",
    tier: 3,
    category: "Core Passive",
    effect: "Dealing damage with Basic Attacks increases Movement Speed by 30% for 1.5s and restores 75-180 HP. Cooldown: 8s.",
    cooldown: "8s",
    recommended_roles: ["Claude", "Marksman", "Brody"],
    icon: "⚡"
  },
  {
    id: "concussive_blast",
    name: "Concussive Blast",
    tier: 3,
    category: "Core Passive",
    effect: "After next basic attack, deals Magic Damage to nearby enemies based on Max HP (100 + 7% Total HP). Cooldown: 15s.",
    cooldown: "15s",
    recommended_roles: ["Tank", "Baxia", "Tigreal", "Khufra"],
    icon: "💥"
  },
  {
    id: "temporal_reign",
    name: "Temporal Reign",
    tier: 3,
    category: "Core Passive",
    effect: "Casting Ultimate grants 1.5x CD reduction to ordinary skills for 4s, immediately shaving off active cooldowns. Cooldown: 20s.",
    cooldown: "20s",
    recommended_roles: ["Valentina", "Nolan", "Kadita", "Terizla"],
    icon: "⌛"
  },
  {
    id: "lethal_ignition",
    name: "Lethal Ignition",
    tier: 3,
    category: "Core Passive",
    effect: "Dealing damage greater than 7% of enemy Max HP 3 times within 5s burns the target for extra Adaptive Damage. Cooldown: 15s.",
    cooldown: "15s",
    recommended_roles: ["Kadita", "Paquito", "Pharsa", "Lancelot"],
    icon: "🔥"
  },
  {
    id: "focus_mark",
    name: "Focus Mark",
    tier: 3,
    category: "Core Passive",
    effect: "Dealing damage to an enemy hero marks them; allied heroes deal 6% increased damage to the marked target for 3s. Cooldown: 6s.",
    cooldown: "6s",
    recommended_roles: ["Support", "Estes", "Angela", "Mathilda"],
    icon: "👁️"
  },
  {
    id: "war_cry",
    name: "War Cry",
    tier: 3,
    category: "Core Passive",
    effect: "After 3 consecutive basic attacks or skills hit enemy heroes, all damage dealt increased by 8% for 6s. Cooldown: 6s.",
    cooldown: "6s",
    recommended_roles: ["Fighter", "Marksman", "Beatrix", "Thamuz"],
    icon: "📣"
  },
  {
    id: "weakness_finder",
    name: "Weakness Finder",
    tier: 3,
    category: "Core Passive",
    effect: "Basic attacks have a 20% chance to reduce enemy's Movement Speed by 90% and Attack Speed by 50% for 0.5s. Cooldown: 2s.",
    cooldown: "2s",
    recommended_roles: ["Marksman", "Karrie", "Bruno"],
    icon: "🎯"
  }
];

export const EMBLEM_PRESETS: EmblemPreset[] = [
  // Required in prompt
  {
    hero_id: "ruby",
    base_emblem: "Fighter",
    tier_1: "Thrill (+16 Adaptive Attack)",
    tier_2: "Festival of Blood (+Spell Vamp scaling with kills)",
    tier_3: "Brave Smite (Dealing skill damage restores 5% Max HP)",
    synergy_rationale: "Amplifies Ruby's passive lifesteal and guarantees continuous lane recovery.",
    situational_alternative: "Swap Tier 1 to Firmness (+6 Hybrid Defense) against heavy poke laners like Thamuz or Dyrroth."
  },
  {
    hero_id: "fanny",
    base_emblem: "Assassin",
    tier_1: "Rupture (+5 Adaptive Penetration)",
    tier_2: "Seasoned Hunter (+Damage against Lord/Turtle)",
    tier_3: "Killing Spree (Restores 15% HP & gains 20% Move Speed on kill)",
    synergy_rationale: "Ensures Retribution objective priority and resets health to escape after diving the backline.",
    situational_alternative: "Swap Tier 1 to Thrill if playing aggressive early invade against weak junglers."
  },
  {
    hero_id: "estes",
    base_emblem: "Support",
    tier_1: "Inspire (+5% CD Reduction)",
    tier_2: "Pull Yourself Together (-15% Battle Spell & Active Cooldown)",
    tier_3: "Focus Mark (Marks targets so allies deal +6% damage)",
    synergy_rationale: "Maximizes healing frequency with 22% total cooldown reduction and allows Revitalize/Flicker to come back faster.",
    situational_alternative: "Take Vitality (+225 HP) in Tier 1 if enemy team has heavy dive burst."
  },
  {
    hero_id: "claude",
    base_emblem: "Marksman",
    tier_1: "Swift (+10% Attack Speed)",
    tier_2: "Bargain Hunter (5% Equipment Cost Discount)",
    tier_3: "Quantum Charge (+30% Move Speed & HP restore on basic attack)",
    synergy_rationale: "Accelerates early Demon Hunter Sword power spike via Bargain Hunter while Quantum Charge enables evasive kiting.",
    situational_alternative: "Swap Tier 3 to Weakness Finder if locking down mobile assassin dives."
  },
  {
    hero_id: "change",
    base_emblem: "Mage",
    tier_1: "Thrill (+16 Adaptive Attack)",
    tier_2: "Bargain Hunter (5% Equipment Cost Discount)",
    tier_3: "Impure Rage (Bonus skill damage & 2% Mana restore)",
    synergy_rationale: "Supplies endless mana sustain for non-stop Meteor Shower wave clears and accelerates core Glowing Wand timing.",
    situational_alternative: "Swap Tier 2 to Weapons Master for maximum late-game magic power scaling."
  },
  {
    hero_id: "khufra",
    base_emblem: "Tank",
    tier_1: "Firmness (+6 Hybrid Defense)",
    tier_2: "Tenacity (Gains +15 Hybrid Defense below 50% HP)",
    tier_3: "Concussive Blast (Max HP Magic Damage explosion)",
    synergy_rationale: "Turns Khufra into an immovable lockdown sponge, surviving deep dives to slam enemies into terrain.",
    situational_alternative: "Swap Tier 2 to Pull Yourself Together to lower Flicker cooldown for surprise initiates."
  }
];
