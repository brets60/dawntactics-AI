import { BattleSpell, WaveManagementRule, ObjectiveTimer } from '../types/mlbb';

export const BATTLE_SPELLS: BattleSpell[] = [
  {
    id: "flicker",
    name: "Flicker",
    cooldown: 120,
    description: "Teleports a short distance in the specified direction. After teleporting, increases Physical and Magic Defense by 5 (+1*Hero Level) for 1s.",
    tactical_use: "Essential mobility tool for immobile mages, marksmen, and surprise CC initiation tanks (Tigreal, Ruby, Khufra). Track this 120s cooldown religiously.",
    best_roles: ["Mid", "Gold", "Roam", "EXP"]
  },
  {
    id: "purify",
    name: "Purify",
    cooldown: 90,
    description: "Immediately removes all crowd control effects and debuffs (excluding suppression), becomes CC immune for 1.2s, and gains 15% Movement Speed.",
    tactical_use: "Mandatory defensive spell against heavy hard CC (Tigreal, Atlas, Guinevere). NOTE: Cannot remove Suppression from Franco or Kaja!",
    best_roles: ["Gold", "Mid"]
  },
  {
    id: "retribution",
    name: "Retribution",
    cooldown: 35,
    description: "Deals 2100-3400 True Damage to Creeps and Minions. Upgrades into Flame, Ice, or Bloody Retribution after killing 5 creeps with Jungling Footwear.",
    tactical_use: "Mandatory for Junglers to secure Turtle/Lord and clear jungle camps. Save Retribution until HP bar reaches exact True Damage execute threshold!",
    best_roles: ["Jungle"]
  },
  {
    id: "petrify",
    name: "Petrify",
    cooldown: 90,
    description: "Petrifies nearby enemy heroes for 0.8s and deals 100 (+15*Hero Level) Magic Damage.",
    tactical_use: "Combo extender for assassins and dive fighters (Kadita, Yu Zhong, Arlott) to guarantee full skill hit without enemy dodging.",
    best_roles: ["EXP", "Mid"]
  },
  {
    id: "aegis",
    name: "Aegis",
    cooldown: 90,
    description: "Instantly gains a 750 (+90*Hero Level) shield lasting 5s. An allied hero with the lowest HP nearby also receives 70% of the shield value.",
    tactical_use: "Prevents instant burst execution from assassins like Saber, Hayabusa, or Harley in the early and mid-game.",
    best_roles: ["Gold", "Roam"]
  },
  {
    id: "vengeance",
    name: "Vengeance",
    cooldown: 75,
    description: "For 3s, whenever taking damage, reflects 35% of the incoming damage as Magic Damage back to the attacker and gains 35% Damage Reduction.",
    tactical_use: "Hard counter against high attack speed marksmen (Claude, Miya, Bruno) and rapid multi-hit assassins. Popular on Gatotkaca, Belerick, and Ruby.",
    best_roles: ["EXP", "Roam"]
  },
  {
    id: "sprint",
    name: "Sprint",
    cooldown: 100,
    description: "Increases Movement Speed by 50% (decaying over 6s) and gains continuous slow immunity for the full duration.",
    tactical_use: "Dominates matches against heavy slow compositions (Yve, Valir, Chang'e) where gap closing or kiting is mandatory.",
    best_roles: ["Gold", "EXP", "Mid"]
  },
  {
    id: "inspire",
    name: "Inspire",
    cooldown: 60,
    description: "Next 8 Basic Attacks gain +400% Attack Speed cap (up to 500%), ignore 8 (+1*Hero Level) Physical Defense, and restore 60 (+20% Total Physical Attack) HP on hit.",
    tactical_use: "Powers up attack speed hypercarries (Moskov, Miya, Sun, Freya) to duel frontlines and burst objectives in 2 seconds.",
    best_roles: ["Gold", "EXP"]
  },
  {
    id: "revitalize",
    name: "Revitalize",
    cooldown: 100,
    description: "Summons a Healing Spring for 5s, restoring 2.5% Max HP every 0.4s to allies within it and increasing shield & HP regen received by 25%.",
    tactical_use: "Ideal for deathball compositions featuring Estes, Rafaela, or heavy bruisers holding choke points around Turtle/Lord pits.",
    best_roles: ["Roam"]
  },
  {
    id: "arrival",
    name: "Arrival",
    cooldown: 75,
    description: "Channels for 3s to teleport to an allied turret or minion. Turret becomes invulnerable for the duration. On arrival, gains 60% decaying Movement Speed.",
    tactical_use: "Macro split-push tool (Zilong, Sun, Uranus) or surprise defensive play to halt backdoors and create 4-1 lane pressure.",
    best_roles: ["EXP", "Roam"]
  },
  {
    id: "flameshot",
    name: "Flameshot",
    cooldown: 50,
    description: "Fires a flaming shot dealing 200-400 (+40%-80% Total Magic Power) to 400-800 Magic Damage based on distance. Knocks back nearby enemies.",
    tactical_use: "Long-range snipe execute or defensive disengage peel for mages (Novaria, Nana, Chang'e) without Flicker.",
    best_roles: ["Mid", "Support"]
  }
];

export const WAVE_MANAGEMENT: WaveManagementRule[] = [
  {
    technique: "Wave Freezing",
    when_to_use: "When you have a lane advantage or 1v1 matchup dominance in EXP Lane or Gold Lane.",
    execution_steps: [
      "Only last-hit enemy minions at the very last HP sliver. Do NOT auto-attack or use AOE skills on the wave.",
      "Position aggressively in front of the enemy minion wave (between the enemy hero and their minions) to zone them out of EXP and Gold range.",
      "If the enemy wave is pushing toward you, hold 3 enemy minions outside your turret range so the lane never crashes into your tower."
    ],
    risk_factors: "Leaves you vulnerable to multi-man ganks if enemy Roamer and Mid rotate without vision."
  },
  {
    technique: "Slow Push",
    when_to_use: "1 minute before Turtle or Lord spawns on the opposite side of the map.",
    execution_steps: [
      "Clear only the enemy ranged caster/siege minions, leaving the melee front minions alive.",
      "Your wave will slowly build a stacked super-wave of 2-3 waves combined as it pushes down the lane.",
      "Rotate to the Lord/Turtle pit immediately. The enemy team must send someone to defend the huge tower-destroying wave, forcing a 5v4 contest."
    ],
    risk_factors: "Requires 45-60 seconds of setup time; timing must sync precisely with objective spawn."
  },
  {
    technique: "Fast Crash / Hard Shove",
    when_to_use: "Immediately before recalling, rotating to Mid/Turtle, or invading enemy jungle.",
    execution_steps: [
      "Use all high-damage AOE skills to wipe the entire enemy wave in under 3 seconds.",
      "Force your wave under the enemy turret. While the opponent is forced to clear under tower, you gain a 20-30 second rotation window."
    ],
    risk_factors: "Exposes your lane if you roam and fail to achieve an objective or kill."
  }
];

export const OBJECTIVE_TIMERS: ObjectiveTimer[] = [
  {
    objective: "Lithowanderer",
    spawn_time: "0:45",
    respawn_interval: "2:00 after death",
    tactical_priority: "Crucial early-game vision in the river and mana/HP regen for Jungler/Mid."
  },
  {
    objective: "Turtle (3x Max)",
    spawn_time: "2:00",
    respawn_interval: "2:00 (Despawns permanently at 8:00)",
    tactical_priority: "Grants teamwide gold, EXP, and individual shield + attack power buffs. Priority #1 early game."
  },
  {
    objective: "Standard Lord",
    spawn_time: "8:00",
    respawn_interval: "3:00 after death",
    tactical_priority: "Marches down the lane with lowest turret HP. Summons Lord charge to decimate inner turrets."
  },
  {
    objective: "Evolved Lord",
    spawn_time: "12:00",
    respawn_interval: "3:00 after death",
    tactical_priority: "Gains damage reduction against heroes and charges through turrets with heavy true damage."
  },
  {
    objective: "Enhanced / Twilight Lord",
    spawn_time: "18:00",
    respawn_interval: "3:00 after death",
    tactical_priority: "Empowers all allied minions with damage resistance and radiates continuous lightning true damage aura."
  },
  {
    objective: "Jungle Buffs (Blue & Red)",
    spawn_time: "0:30",
    respawn_interval: "1:30 (90 seconds)",
    tactical_priority: "Blue Buff gives 10% CD reduction and -60% Energy/Mana cost. Red Buff gives slow and true damage burn."
  }
];

export interface PresetDraft {
  name: string;
  category?: string;
  description: string;
  blue: Record<string, string>; // lane -> heroId
  red: Record<string, string>;
  bans_blue: string[]; // 5 bans (Phase 1: 3, Phase 2: 2)
  bans_red: string[];  // 5 bans (Phase 1: 3, Phase 2: 2)
}

export const PRESET_DRAFTS: PresetDraft[] = [
  {
    name: "M5 Finals: AP.Bren vs ONIC (Game 7 Decider)",
    category: "World Championship",
    description: "Iconic M5 deciding match. Bren drafted teamfight initiation with Minotaur & Fredrinn; ONIC answered with Terizla & Baxia frontline control.",
    blue: {
      EXP: "arlott",
      Jungle: "fredrinn",
      Mid: "gord",
      Gold: "claude",
      Roam: "minotaur"
    },
    red: {
      EXP: "terizla",
      Jungle: "baxia",
      Mid: "novaria",
      Gold: "wanwan",
      Roam: "tigreal"
    },
    bans_blue: ["fanny", "joy", "guinevere", "valentina", "faramis"],
    bans_red: ["nolan", "bruno", "mathilda", "diggie", "angela"]
  },
  {
    name: "M6 World Championship: S-Tier Priority Clash",
    category: "World Championship",
    description: "S-Tier clash featuring Zetian imperial decree mid-lane control and Suyou jungle burst versus Ling mobility and Pharsa artillery.",
    blue: {
      EXP: "yu_zhong",
      Jungle: "suyou",
      Mid: "zetian",
      Gold: "beatrix",
      Roam: "mathilda"
    },
    red: {
      EXP: "cici",
      Jungle: "ling",
      Mid: "pharsa",
      Gold: "harith",
      Roam: "khufra"
    },
    bans_blue: ["fanny", "diggie", "angela", "hayabusa", "zhuxin"],
    bans_red: ["nolan", "fredrinn", "tigreal", "claude", "karrie"]
  },
  {
    name: "MPL PH Sustain Deathball vs Anti-Heal Siege",
    category: "MPL Pro Meta",
    description: "Blue runs an unkillable Estes + Fredrinn + Ruby sustain core; Red counters with Baxia anti-heal, Yve slowing domain, and Karrie % HP shred.",
    blue: {
      EXP: "ruby",
      Jungle: "fredrinn",
      Mid: "faramis",
      Gold: "harith",
      Roam: "estes"
    },
    red: {
      EXP: "terizla",
      Jungle: "baxia",
      Mid: "yve",
      Gold: "karrie",
      Roam: "lolita"
    },
    bans_blue: ["luo_yi", "diggie", "karrie", "belerick", "valir"],
    bans_red: ["fanny", "angela", "mathilda", "floryn", "rafaela"]
  },
  {
    name: "MPL ID High-Tempo Dive Assassin Blitz",
    category: "MPL Pro Meta",
    description: "Blue executes a lethal high-tempo dive comp centered on Fanny & Paquito; Red drafts heavy anti-dash and CC lock with Khufra and Fredrinn.",
    blue: {
      EXP: "paquito",
      Jungle: "fanny",
      Mid: "kadita",
      Gold: "brody",
      Roam: "arlott"
    },
    red: {
      EXP: "edith",
      Jungle: "fredrinn",
      Mid: "valir",
      Gold: "claude",
      Roam: "khufra"
    },
    bans_blue: ["khufra", "saber", "diggie", "minsitthar", "franco"],
    bans_red: ["ling", "claude", "angela", "joy", "lancelot"]
  },
  {
    name: "Wombo Combo Area Denial & Annihilation",
    category: "Tournament Scenarios",
    description: "Massive Tigreal Implosion chained into Xavier Dawning Light and Claude Blazing Duet; Red counters with Minotaur Minoan Fury knockups.",
    blue: {
      EXP: "terizla",
      Jungle: "lancelot",
      Mid: "xavier",
      Gold: "claude",
      Roam: "tigreal"
    },
    red: {
      EXP: "lapu_lapu",
      Jungle: "martis",
      Mid: "vexana",
      Gold: "moskov",
      Roam: "minotaur"
    },
    bans_blue: ["diggie", "valentina", "belerick", "franco", "faramis"],
    bans_red: ["fanny", "estes", "ruby", "mathilda", "novaria"]
  },
  {
    name: "High-Ground Siege & Poke Artillery",
    category: "Competitive Archetypes",
    description: "Long-range dominance with Novaria Astral Echo and Ixia Full Barrage behind Lolita shields; Red initiates with Yu Zhong dragon flanks.",
    blue: {
      EXP: "edith",
      Jungle: "hayabusa",
      Mid: "novaria",
      Gold: "ixia",
      Roam: "lolita"
    },
    red: {
      EXP: "yu_zhong",
      Jungle: "nolan",
      Mid: "pharsa",
      Gold: "beatrix",
      Roam: "chou"
    },
    bans_blue: ["ling", "fanny", "mathilda", "kadita", "paquito"],
    bans_red: ["diggie", "angela", "floryn", "estes", "faramis"]
  },
  {
    name: "Hypercarry Protect & Late-Game Scale",
    category: "Competitive Archetypes",
    description: "Blue surrounds hypercarry Bruno with Diggie Time Journey CC immunity and Fredrinn taunts; Red counters with Dyrroth armor-break and Ling.",
    blue: {
      EXP: "uranus",
      Jungle: "fredrinn",
      Mid: "valentina",
      Gold: "bruno",
      Roam: "diggie"
    },
    red: {
      EXP: "dyrroth",
      Jungle: "ling",
      Mid: "nana",
      Gold: "karrie",
      Roam: "belerick"
    },
    bans_blue: ["fanny", "khufra", "claude", "atlas", "tigreal"],
    bans_red: ["angela", "mathilda", "estes", "beatrix", "brody"]
  },
  {
    name: "Early Jungle Invade & Snowball Blitz",
    category: "Aggressive Tempo",
    description: "Aggressive level-1 jungle invade with Grock and Thamuz, chaining continuous burn into Joy electrical backline dives.",
    blue: {
      EXP: "thamuz",
      Jungle: "joy",
      Mid: "valir",
      Gold: "roger",
      Roam: "grock"
    },
    red: {
      EXP: "benedetta",
      Jungle: "baxia",
      Mid: "cecilion",
      Gold: "lesley",
      Roam: "rafaela"
    },
    bans_blue: ["diggie", "estes", "mathilda", "floryn", "angela"],
    bans_red: ["fanny", "ling", "nolan", "hayabusa", "lancelot"]
  },
  {
    name: "Anti-Dive Bastion & Armor Shred Protocol",
    category: "Counter Strategy",
    description: "Hard anti-dive fortress featuring Akai Heavy Spin and Belerick damage reflection, peeling for Karrie % HP true damage shred.",
    blue: {
      EXP: "edith",
      Jungle: "akai",
      Mid: "luo_yi",
      Gold: "karrie",
      Roam: "belerick"
    },
    red: {
      EXP: "paquito",
      Jungle: "fanny",
      Mid: "kagura",
      Gold: "claude",
      Roam: "mathilda"
    },
    bans_blue: ["khufra", "diggie", "valentina", "novaria", "pharsa"],
    bans_red: ["baxia", "estes", "ruby", "angela", "floryn"]
  },
  {
    name: "Imperial Empress Magic Supremacy (Zetian Showcase)",
    category: "Empress Strategy",
    description: "Celestial Empress Zetian dominates mid lane teamfights with devastating area-of-effect suppression alongside Yu Zhong and Tigreal.",
    blue: {
      EXP: "yu_zhong",
      Jungle: "fredrinn",
      Mid: "zetian",
      Gold: "beatrix",
      Roam: "tigreal"
    },
    red: {
      EXP: "terizla",
      Jungle: "lancelot",
      Mid: "xavier",
      Gold: "brody",
      Roam: "khufra"
    },
    bans_blue: ["fanny", "joy", "diggie", "angela", "mathilda"],
    bans_red: ["nolan", "claude", "karrie", "faramis", "estes"]
  }
];
