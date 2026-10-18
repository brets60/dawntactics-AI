export type Lane = 'EXP' | 'Jungle' | 'Mid' | 'Gold' | 'Roam';
export type Role = 'Assassin' | 'Fighter' | 'Mage' | 'Marksman' | 'Tank' | 'Support' | 'Fighter/Tank' | 'Mage/Assassin' | 'Tank/Support' | 'Support/Mage';
export type DamageType = 'Physical' | 'Magic' | 'Mixed' | 'True';
export type MobilityTier = 'S+' | 'High' | 'Medium' | 'Low';

export interface Hero {
  id: string;
  name: string;
  role: string;
  primary_lane: Lane;
  damage_type: DamageType;
  mobility_tier: MobilityTier;
  hard_counters: string[];
  counters_to: string[];
  synergies?: string[];
  threat_profile: string;
  durability: number; // 1-10
  cc_lockdown: number; // 1-10
  early_game: number; // 1-10
  mid_game: number; // 1-10
  late_game: number; // 1-10
  avatar_color?: string;
  difficulty?: 'Low' | 'Medium' | 'High' | 'Very High';
}

export type ItemCategory = 'Physical' | 'Magic' | 'Defense' | 'Core Boots' | 'Roam Boots' | 'Movement' | 'Attack';

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  subcategory?: 'Core Boots' | 'Roam Boots' | 'Physical' | 'Magic' | 'Defense';
  cost: number;
  stats: string;
  passive: string;
  counter_tags: string[];
  trigger_condition?: string;
  recommended_against?: string[];
  icon_symbol?: string;
}

export interface BaseEmblem {
  id: string;
  name: string;
  attributes: Record<string, string>;
  icon_color: string;
  best_for: string;
}

export interface Talent {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  category: 'Stats' | 'Combat Utility' | 'Core Passive';
  effect: string;
  cooldown?: string;
  recommended_roles: string[];
  icon: string;
}

export interface EmblemPreset {
  hero_id: string;
  base_emblem: string;
  tier_1: string;
  tier_2: string;
  tier_3: string;
  synergy_rationale: string;
  situational_alternative?: string;
}

export interface DraftSlot {
  lane: Lane;
  heroId: string | null;
  team: 'blue' | 'red';
}

export interface DraftMetrics {
  physical_ratio: number;
  magic_ratio: number;
  true_ratio: number;
  cc_score: number;
  early_curve: number;
  mid_curve: number;
  late_curve: number;
  durability_score: number;
  predicted_win_rate: number; // Blue team win %
  key_strengths: string[];
  vulnerabilities: string[];
}

export interface CounterRecommendation {
  enemy_hero: Hero;
  hard_counters: {
    hero: Hero;
    rationale: string;
    lane_matchup?: string;
  }[];
  synergy_partners: {
    hero: Hero;
    rationale: string;
  }[];
  ban_recommendations: {
    hero: Hero;
    urgency: 'Critical' | 'High' | 'Medium';
    reason: string;
  }[];
}

export interface BattleSpell {
  id: string;
  name: string;
  cooldown: number; // in seconds
  description: string;
  tactical_use: string;
  best_roles: string[];
}

export interface WaveManagementRule {
  technique: string;
  when_to_use: string;
  execution_steps: string[];
  risk_factors: string;
}

export interface ObjectiveTimer {
  objective: string;
  spawn_time: string;
  respawn_interval: string;
  tactical_priority: string;
}

export interface OracleChatMessage {
  id: string;
  sender: 'user' | 'oracle';
  text: string;
  timestamp: string;
  isRejected?: boolean;
  tactical_tags?: string[];
  table_data?: { headers: string[]; rows: string[][] };
}
