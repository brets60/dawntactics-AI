import { Hero, Lane } from '../types/mlbb';
import { HEROES } from './heroes';

export type CompositionArchetype = 
  | 'Wombo Combo Lockdown'
  | 'High-Mobility Aerial Dive'
  | 'Deathball & Sustain'
  | 'Zone Control & High-Ground Siege'
  | 'Hyper-Carry Peel & Scale'
  | 'Early Aggression & Invade';

export interface TeamComposition {
  id: string;
  name: string;
  tagline: string;
  archetype: CompositionArchetype;
  difficulty: 'Easy' | 'Moderate' | 'Advanced' | 'Pro / Coordinated';
  power_curve: {
    early: number; // 1-10
    mid: number;   // 1-10
    late: number;  // 1-10
  };
  heroes: Record<Lane, string>; // hero IDs
  lane_duties: Record<Lane, string>; // specific tactical duty for this hero in this comp
  explanation: {
    win_condition: string;
    early_game: string;
    mid_game: string;
    late_game: string;
    key_combos: string[];
    counters_opponents: string[];
  };
}

export const META_COMPOSITIONS: TeamComposition[] = [
  {
    id: 'abyssal-cc-lockdown',
    name: 'Abyssal CC Lockdown & True Shred',
    tagline: 'Inescapable Area-of-Effect Crowd Control Chained into Armor-Penetrating Burst',
    archetype: 'Wombo Combo Lockdown',
    difficulty: 'Moderate',
    power_curve: { early: 7, mid: 9, late: 10 },
    heroes: {
      EXP: 'terizla',
      Jungle: 'fredrinn',
      Mid: 'xavier',
      Gold: 'karrie',
      Roam: 'tigreal',
    },
    lane_duties: {
      EXP: 'Zone enemy backlines with Penalty Zone and absorb initial enemy burst damage.',
      Jungle: 'Tank objective damage, contest Retribution smites, and taunt assassins targeting allies.',
      Mid: 'Snip low-health targets from extreme range with Dawning Light and root diving brawlers.',
      Gold: 'Melt high-HP enemy frontliners with Speedy Lightwheel and Demon Hunter Sword true damage.',
      Roam: 'Initiate decisive 5v5 teamfights using Flicker + Implosion combo to clump 3+ enemy heroes.',
    },
    explanation: {
      win_condition: 'Layer Tigreal and Terizla ultimate crowd control to cluster the entire enemy squad, allowing Xavier and Karrie to unleash unanswerable area true damage.',
      early_game: 'Tigreal invades or disrupts the enemy jungler with Sacred Hammer. Fredrinn secures Level 4 before first Turtle. Xavier maintains safe waveclear from tower range.',
      mid_game: 'Group around Turtle/Lord river corridors. Terizla and Tigreal hide in choke brushes. The moment enemy face-checks, chain Implosion into Penalty Zone for an immediate team wipe.',
      late_game: 'Fredrinn and Tigreal form an impenetrable wall around Karrie and Xavier. Even fully-armored enemy tanks melt within 2.5 seconds of Karrie Speedy Lightwheel focus.',
      key_combos: [
        '1. Tigreal: Flicker -> Implosion (groups 3-5 enemies)',
        '2. Terizla: Penalty Zone -> Execution Strike (continuous pull & smash)',
        '3. Xavier: Mystic Field -> Infinite Extension -> Dawning Light (mass beam burst)',
        '4. Fredrinn: Appraiser\'s Wrath (massive AOE true damage finisher)',
        '5. Karrie: Phantom Step -> Speedy Lightwheel (cleans up surviving bruisers)',
      ],
      counters_opponents: [
        'Heavy tank frontlines (Hylos, Belerick, Uranus)',
        'Low-mobility marksmen (Layla, Hanabi, Miya, Lesley)',
        'Dive fighters lacking CC immunity',
      ],
    },
  },
  {
    id: 'celestial-aerial-blitz',
    name: 'Celestial Aerial Blitz & Backline Decapitation',
    tagline: 'High-Tempo Dive Assassination that Deletes Squishy Backlines in Milliseconds',
    archetype: 'High-Mobility Aerial Dive',
    difficulty: 'Pro / Coordinated',
    power_curve: { early: 10, mid: 9, late: 7 },
    heroes: {
      EXP: 'yu_zhong',
      Jungle: 'fanny',
      Mid: 'pharsa',
      Gold: 'beatrix',
      Roam: 'khufra',
    },
    lane_duties: {
      EXP: 'Transform into Black Dragon Form to bypass frontline barriers and terrify opposing marksmen.',
      Jungle: 'Fast clear blue buff and execute high-speed multi-cable dive ganks on Gold and Mid lanes.',
      Mid: 'Rain long-range artillery with Feathered Airstrike while safely hovering near team perimeter.',
      Gold: 'Dominate lane trading with Renner sniper rifle and Wesker shotgun point-blank burst.',
      Roam: 'Deny enemy dashes with Bouncing Ball and set up wall pins using Tyrant\'s Revenge.',
    },
    explanation: {
      win_condition: 'Overwhelm opponents in the first 8 minutes with extreme map rotation speed, suffocating enemy jungle resources and closing before late-game stalling.',
      early_game: 'Fanny rushes level 2 blue buff with Khufra escort. Khufra checks enemy red buff. First Turtle is uncontested due to Fanny and Yu Zhong Level 4 power spikes.',
      mid_game: 'Establish total jungle vision. Yu Zhong flies over walls into enemy mid tier 2 tower, forcing enemy carries to panic-flash into Pharsa Feathered Airstrike radius.',
      late_game: 'Khufra opens with Tyrant\'s Rage against wall. Beatrix unleashes Wesker/Renner burst. Do not allow game to drag past 18 minutes against hypercarries.',
      key_combos: [
        '1. Khufra: Tyrant\'s Revenge (knockup) -> Bouncing Ball (grounds dashes)',
        '2. Yu Zhong: Black Dragon Form (knocks aside, petrifies enemy backline)',
        '3. Pharsa: Feathered Airstrike (4 consecutive high-damage artillery bombardments)',
        '4. Fanny: Steel Cable -> Tornado Strike -> Cut Throat (deletes fleeing carries)',
        '5. Beatrix: Wesker Apex Ammunition (shreds frontline)',
      ],
      counters_opponents: [
        'Immobile backline mages (Xavier, Cecilion, Gord, Eudora)',
        'Dash-reliant hypercarries (Ling, Lancelot, Joy, Harith)',
        'Greedy late-game farming compositions',
      ],
    },
  },
  {
    id: 'dawn-vanguard-deathball',
    name: 'Dawn Vanguard Deathball & Immortality Sustain',
    tagline: 'Indestructible Clustered Formation Boasting Constant Healing and Revive Shields',
    archetype: 'Deathball & Sustain',
    difficulty: 'Moderate',
    power_curve: { early: 7, mid: 9, late: 9 },
    heroes: {
      EXP: 'ruby',
      Jungle: 'baxia',
      Mid: 'faramis',
      Gold: 'harith',
      Roam: 'estes',
    },
    lane_duties: {
      EXP: 'Hook multiple targets with I\'m Offended! and regenerate full HP through Spell Vamp.',
      Jungle: 'Roll into enemy ranks with Baxia-Shield Prowess and apply innate 50% anti-heal to all enemies.',
      Mid: 'Activate Cult Altar inside the deathball to grant entire team temporary immortality and burst.',
      Gold: 'Hop continuously with Chrono Dash inside Zaman Force, dishing out relentless magical crits.',
      Roam: 'Tether to allies with Moonlight Immersion and Blessing of Moon Goddess for limitless heals.',
    },
    explanation: {
      win_condition: 'Group as a cohesive 5-man deathball past minute 6. Estes continuous healing combined with Faramis Cult Altar makes the squad mathematically impossible to burst down.',
      early_game: 'Baxia easily out-rotates enemy junglers. Harith farms safely until Starlium Scythe completion. Estes and Ruby maintain lane priority with infinite sustain.',
      mid_game: 'Deathball pushes outer towers as 5. When enemies try to engage, Faramis pops Cult Altar. Any damage taken is instantly healed by Estes and Ruby.',
      late_game: 'Force Enhanced Lord fights in tight river corridors where Harith and Ruby can hit all 5 enemies simultaneously. Push directly through middle lane inhibitors.',
      key_combos: [
        '1. Baxia: Shield Unity (rolls into enemy frontline to engage and slow)',
        '2. Ruby: Be Good! -> I\'m Offended! (pulls enemy squishies directly into deathball)',
        '3. Faramis: Cult Altar (grants entire squad bonus HP bar and spectral forms)',
        '4. Estes: Blessing of Moon Goddess (radiates mass continuous healing to all 5 members)',
        '5. Harith: Zaman Force -> Chrono Dash spam (endless shielded magic crit barrages)',
      ],
      counters_opponents: [
        'Poke-heavy drafts lacking burst (Novaria, Chang\'e, Kimmy)',
        'Single-target assassin burst (Saber, Natalia, Lesley)',
        'Compositions without anti-heal or heavy true damage',
      ],
    },
  },
  {
    id: 'shadow-protocol-pickoff',
    name: 'Shadow Protocol Vision & Decapitation',
    tagline: 'Omniscient Map Vision Combined with Lightning-Fast Isolation and Flank Murders',
    archetype: 'Early Aggression & Invade',
    difficulty: 'Advanced',
    power_curve: { early: 9, mid: 9, late: 8 },
    heroes: {
      EXP: 'paquito',
      Jungle: 'ling',
      Mid: 'novaria',
      Gold: 'brody',
      Roam: 'arlott',
    },
    lane_duties: {
      EXP: 'Dominate lane skirmishes with Champ Stance and flank enemy squishies with Knockout Strike.',
      Jungle: 'Traverse wall perimeters with Finch Poise and execute Tempest of Blades into pickoffs.',
      Mid: 'Cast Astral Echo to illuminate bushes and snipe targets across two full screen lengths.',
      Gold: 'Stack Abyss Corrosion with heavy basic attacks and execute fleeing low-HP targets with Torn-Apart Memory.',
      Roam: 'Mark targets with Demon Gaze and execute rapid-chain Final Slash displacement stuns.',
    },
    explanation: {
      win_condition: 'Novaria vision removes fog of war across the entire map, allowing Ling and Paquito to assassinate isolated enemies before objective timers start, creating permanent 5v4s.',
      early_game: 'Paquito bullies enemy EXP laner. Brody wins 1v1 trades in Gold lane with physical penetration. Ling farms safely across wall highways.',
      mid_game: 'Novaria shoots Astral Recall into enemy jungle. Once enemy jungler or mage is spotted, Arlott and Ling instantly collapse for an instant pickoff.',
      late_game: 'Never take a fair 5v5 front-to-back teamfight. Bait enemy Lord checks with Novaria vision, execute the carry, then finish Lord 5v4.',
      key_combos: [
        '1. Novaria: Astral Echo (reveals enemy positions across whole jungle)',
        '2. Arlott: Final Slash -> Vengeance (dashes through marked targets, applying CC)',
        '3. Ling: Tempest of Blades -> Defiant Sword sword pickups (invulnerable burst)',
        '4. Paquito: Knockout Strike -> Jab combo (deletes remaining frontliner)',
        '5. Brody: Torn-Apart Memory (shoots lock-on homing spears to finish survivors)',
      ],
      counters_opponents: [
        'Split-push compositions (Zilong, Sun, Argus, Masha)',
        'Bush-camping surprise drafts (Eudora, Aurora, Kadita)',
        'Slow-moving front-to-back comps',
      ],
    },
  },
  {
    id: 'dragon-empress-wombo',
    name: 'Dragon & Empress Imperial Annihilation',
    tagline: 'Imperial Magic Domain Crowd Control Synced with Flying Dragon Chaos and Bullet Duets',
    archetype: 'Wombo Combo Lockdown',
    difficulty: 'Moderate',
    power_curve: { early: 7, mid: 9, late: 10 },
    heroes: {
      EXP: 'yu_zhong',
      Jungle: 'lancelot',
      Mid: 'zetian',
      Gold: 'claude',
      Roam: 'minotaur',
    },
    lane_duties: {
      EXP: 'Fierce dragon dive disrupts backline formation and scatters enemy ranks.',
      Jungle: 'Immunity frames via Thorned Rose and Phantom Execution dodges enemy crowd control.',
      Mid: 'Imperial decree AOE suppression commands mid river and locks clustered enemies in place.',
      Gold: 'Teleport into the heart of clustered foes with Battle Mirror Image and unleash Blazing Duet.',
      Roam: 'Trigger Minoan Fury knockup shockwaves and heal teammates with Despair Stomp roar.',
    },
    explanation: {
      win_condition: 'Minotaur and Yu Zhong dive deep into the enemy team, forcing enemy defense skills. Zetian drops celestial magic domain crowd control, and Claude teleports in with Blazing Duet to execute everyone.',
      early_game: 'Lancelot clears efficiently using Puncture through jungle minions. Zetian maintains mid lane priority with imperial spells. Claude farms stacks on minions.',
      mid_game: 'Claude completes Demon Hunter Sword and Golden Staff. Minotaur builds Rage. When Rage is maxed, team forces fight around Turtle or mid tower.',
      late_game: 'Minotaur Flash + Minoan Fury knocks up 4 enemies. Zetian follows with instant imperial CC. Claude executes Blazing Duet with Vengeance active. Complete clean ace.',
      key_combos: [
        '1. Minotaur: Minoan Fury (3-phase continuous ground pound knockup)',
        '2. Yu Zhong: Soul Grip -> Furious Dive (airborne petrify chain)',
        '3. Zetian: Imperial Decree AOE Domain (celestial burst & suppression)',
        '4. Claude: Battle Mirror Image -> Blazing Duet (massive AOE bullet storm)',
        '5. Lancelot: Phantom Execution (dashes through and executes any remaining targets)',
      ],
      counters_opponents: [
        'Grouped deathball drafts',
        'Immobile marksmen and fighters',
        'Compositions with single-target peeling',
      ],
    },
  },
  {
    id: 'fortress-of-dawn-antidive',
    name: 'Fortress of Dawn Anti-Dive & Objective Bastion',
    tagline: 'Impenetrable Defensive Wall that Shuts Down Aggressive Divers and Dominates Sieges',
    archetype: 'Zone Control & High-Ground Siege',
    difficulty: 'Moderate',
    power_curve: { early: 7, mid: 8, late: 10 },
    heroes: {
      EXP: 'edith',
      Jungle: 'akai',
      Mid: 'yve',
      Gold: 'ixia',
      Roam: 'lolita',
    },
    lane_duties: {
      EXP: 'Absorb incoming enemy damage with Primal Wrath, then eject to dish out massive magic auto-attacks.',
      Jungle: 'Spin with Heavy Spin to pin enemy divers against walls and prevent them from reaching carries.',
      Mid: 'Deploy Real World Manipulation grid across choke points to permanently slow enemy movement.',
      Gold: 'Activate Full Barrage in an expansive fan shape to shred advancing enemies from maximum safety.',
      Roam: 'Raise Guardian\'s Bulwark to block all projectile poke, and cast Noumenon Blast for mass stuns.',
    },
    explanation: {
      win_condition: 'Create an impassable fortification. If enemies try to dive, Akai spins them away and Edith counter-taunts. Ixia and Yve rain down catastrophic zoned damage from total safety.',
      early_game: 'Lolita rotates with Akai to protect jungle buffs. Edith dominates 1v1 lane trades. Yve clears waves in 2 seconds and rotates to Gold lane.',
      mid_game: 'Set up around Lord pit. Lolita deploys shield facing enemy approach path. Any ranged skill (e.g. Chang\'e, Granger, Novaria) is completely blocked.',
      late_game: 'When pushing enemy base or defending high ground, Yve deploys Real World Manipulation while Ixia unleashes Full Barrage. Enemies cannot step forward without dying.',
      key_combos: [
        '1. Lolita: Noumenon Blast (massive cone stun from bush)',
        '2. Akai: Heavy Spin (pins diver or enemy jungler against wall for 3.5s)',
        '3. Yve: Real World Manipulation (creates 7x7 slowing grid across whole lane)',
        '4. Ixia: Full Barrage (relentless high-speed fan-shaped kinetic shred)',
        '5. Edith: Primal Wrath (transforms into high-DPS magic marksman)',
      ],
      counters_opponents: [
        'High-mobility dive assassins (Fanny, Ling, Hayabusa, Lancelot)',
        'Projectile-dependent poke mages & marksmen (Chang\'e, Beatrix, Granger, Novaria)',
        'Aggressive dive bruisers (Yu Zhong, Paquito, Joy)',
      ],
    },
  },
  {
    id: 'temporal-paradox-skirmish',
    name: 'Temporal Paradox & Spell-Steal Domination',
    tagline: 'Extreme Mobility, Shield Repositioning, and Counter-Stealing Game-Changing Ultimates',
    archetype: 'High-Mobility Aerial Dive',
    difficulty: 'Advanced',
    power_curve: { early: 8, mid: 10, late: 8 },
    heroes: {
      EXP: 'cici',
      Jungle: 'nolan',
      Mid: 'valentina',
      Gold: 'roger',
      Roam: 'mathilda',
    },
    lane_duties: {
      EXP: 'Kite melee enemies with Delightful Bounce and Yo-Yo attack range superiority.',
      Jungle: 'Dash through cosmic rifts with Cosmic Cut and trigger fracture explosions for instant burst.',
      Mid: 'Steal high-impact enemy ultimates (like Tigreal, Faramis, or Minotaur) to use against them.',
      Gold: 'Poke with human hunter gun, then transform into Dire Wolf to lunge and execute low-HP targets.',
      Roam: 'Provide free dashes and giant shields to all teammates using Guiding Wind and Circling Eagle.',
    },
    explanation: {
      win_condition: 'Use Mathilda Guiding Wind to give all 4 allies free dashes, repositioning instantly out of enemy skillshots, while Valentina copies the opponent\'s strongest ultimate to dismantle their team.',
      early_game: 'Nolan clears jungle at record speed. Mathilda and Valentina terrorize mid lane. Roger wins early skirmishes with hunter-to-wolf transformations.',
      mid_game: 'Take fast skirmishes in open jungle. Cici kiting draws enemy spells. Valentina turns enemy teamfight ultimates back onto the enemy team.',
      late_game: 'Mathilda initiates with Circling Eagle into enemy backline. Roger and Nolan leap onto carries and shred them before enemy frontliners can react.',
      key_combos: [
        '1. Mathilda: Circling Eagle -> Guiding Wind (pulls ally team directly onto flank)',
        '2. Valentina: I Am You (steals enemy tank/support ultimate and casts it instantly)',
        '3. Nolan: Expansion -> Cutting (triggers planar rifts for instant burst)',
        '4. Roger: Wolf Transformation -> Bloodthirsty Howl (executes bleeding enemies)',
        '5. Cici: Curtain Call (tethers two enemies together, forcing double damage)',
      ],
      counters_opponents: [
        'Teams relying on single big ultimates (Tigreal, Minotaur, Atlas, Faramis)',
        'Slow, kiteable melee fighters (Thamuz, Balmond, Dyrroth)',
        'Skillshot-dependent compositions',
      ],
    },
  },
  {
    id: 'infernal-cataclysm-melt',
    name: 'Infernal Cataclysm & Anti-Heal Melt',
    tagline: 'Continuous Burn, Fire Knockbacks, Wall-Pins, and Deadly Damage Reflection',
    archetype: 'Zone Control & High-Ground Siege',
    difficulty: 'Moderate',
    power_curve: { early: 8, mid: 8, late: 9 },
    heroes: {
      EXP: 'thamuz',
      Jungle: 'joy',
      Mid: 'valir',
      Gold: 'moskov',
      Roam: 'belerick',
    },
    lane_duties: {
      EXP: 'Dominate close-quarters brawls with Molten Scythes and infinite Grand Lord Lava eruptions.',
      Jungle: 'Dance rhythmically with Meow Rhythm to gain CC immunity and electrify enemy backlines.',
      Mid: 'Push away approaching melee enemies with Searing Torrent and chain Burst Fire stuns.',
      Gold: 'Spear through minion waves, stun enemies against walls with Spear of Misery, and scale hard.',
      Roam: 'Taunt attackers with Wrath of Dryad and reflect massive damage back at high attack-speed heroes.',
    },
    explanation: {
      win_condition: 'Valir and Belerick punish any enemy attempting to dive or engage, creating a sea of flames and taunts while Moskov and Thamuz shred frontliners.',
      early_game: 'Valir bullies mid and invades with Valir fireballs. Thamuz easily achieves first blood on EXP lane with Molten Scythes. Joy secures fast neutral creeps.',
      mid_game: 'Belerick walks ahead of the team. Any marksman or assassin that hits Belerick takes devastating reflected magic spikes. Valir pushes enemies into Belerick taunts.',
      late_game: 'Moskov reaches 6 items. Inside Belerick Wrath of Dryad, Moskov pins enemy core to the nearest wall, ending fights in under 3 seconds.',
      key_combos: [
        '1. Belerick: Flicker -> Wrath of Dryad (roots and taunts nearby enemies)',
        '2. Valir: Searing Torrent -> Burst Fire (stuns grouped targets, applies 50% anti-heal burn)',
        '3. Joy: Ha, Electrifying Beats! (dances through rhythm beats with full CC immunity)',
        '4. Moskov: Spear of Misery -> Abyss Walker (wall-pins enemy hypercarry)',
        '5. Thamuz: Cauterant Inferno (erupts into unkillable lava berserker)',
      ],
      counters_opponents: [
        'Attack-speed marksmen (Claude, Miya, Wanwan, Moskov)',
        'Melee brawler dive teams (Alucard, Martis, Leomord, Freya)',
        'Heal-reliant drafts (Estes, Floryn, Rafaela)',
      ],
    },
  },
];

/**
 * Dynamically builds a counter 5-man composition against the opponent's current draft
 */
export function generateDynamicCounterComposition(
  enemyTeam: Record<Lane, string | null>,
  bans: string[],
  allyTeam: Record<Lane, string | null>
): TeamComposition {
  // Collect all currently unavailable heroes
  const bannedOrPickedIds = new Set<string>([
    ...Object.values(enemyTeam).filter(Boolean),
    ...Object.values(allyTeam).filter(Boolean),
    ...bans.filter(Boolean),
  ] as string[]);

  const enemyHeroes = Object.values(enemyTeam)
    .filter(Boolean)
    .map(id => HEROES.find(h => h.id === id))
    .filter((h): h is Hero => Boolean(h));

  // Determine enemy traits
  const hasHighMobility = enemyHeroes.some(h => h.mobility_tier === 'S+' || h.mobility_tier === 'High');
  const hasHeavySustain = enemyHeroes.some(h => 
    ['estes', 'angela', 'floryn', 'rafaela', 'ruby', 'uranus', 'yu-zhong'].includes(h.id)
  );
  const hasHeavyTanks = enemyHeroes.filter(h => h.durability >= 8).length >= 2;
  const hasBacklinePoke = enemyHeroes.some(h => 
    ['pharsa', 'novaria', 'yve', 'xavier', 'beatrix', 'lesley', 'layla', 'cecilion'].includes(h.id)
  );

  // Strategic determination
  let archetype: CompositionArchetype = 'Wombo Combo Lockdown';
  let titlePrefix = 'Aegis Vanguard';
  let titleSuffix = 'Strategic Overwhelm';
  let winCondition = '';
  let earlyFocus = '';
  let midFocus = '';
  let lateFocus = '';

  if (hasHighMobility) {
    archetype = 'Wombo Combo Lockdown';
    titlePrefix = 'Operation Ground Zero';
    titleSuffix = 'Anti-Mobility Suppression';
    winCondition = `Directly neutralize high-mobility threats (${enemyHeroes.filter(h => h.mobility_tier === 'S+' || h.mobility_tier === 'High').map(h => h.name).join(', ')}) with guaranteed lock-on crowd control and anti-dash mechanics.`;
    earlyFocus = 'Establish lane priority and invade enemy purple/blue buff to starve mobility cooldowns.';
    midFocus = 'Wait in ambush near objective choke points; ground diving enemies the second they engage.';
    lateFocus = 'Force front-to-back teamfights at Lord pit where mobile assassins have zero flanking space.';
  } else if (hasHeavySustain) {
    archetype = 'Zone Control & High-Ground Siege';
    titlePrefix = 'Soul-Severing Strike';
    titleSuffix = 'Anti-Heal Annihilation';
    winCondition = `Apply overwhelming anti-heal and true damage to dismantle sustain engines (${enemyHeroes.filter(h => ['estes', 'angela', 'floryn', 'rafaela', 'ruby', 'uranus'].includes(h.id)).map(h => h.name).join(', ')}), rendering their regeneration useless.`;
    earlyFocus = 'Rush early Sea Halberd / Glowing Wand / Dominance Ice components before first Turtle fight.';
    midFocus = 'Focus down healing anchors before switching targets to ensure enemies cannot reset HP bars.';
    lateFocus = 'Burst enemy sustain champions in under 2 seconds during grouped engagements.';
  } else if (hasHeavyTanks) {
    archetype = 'Hyper-Carry Peel & Scale';
    titlePrefix = 'Titan-Shatter Vanguard';
    titleSuffix = 'True Damage Shred';
    winCondition = `Melt massive frontline tanks with % Max HP true damage and high physical penetration, peeling for the hypercarry.`;
    earlyFocus = 'Farm marksman and mage safely while tanks clear frontline waves.';
    midFocus = 'Bait out enemy tank initiations, absorb their crowd control, then counter-engage.';
    lateFocus = 'Hypercarry shreds tanks within 3 seconds, leaving squishy enemy backliners exposed.';
  } else if (hasBacklinePoke) {
    archetype = 'High-Mobility Aerial Dive';
    titlePrefix = 'Phantom Infiltration';
    titleSuffix = 'Backline Decapitation';
    winCondition = `Flank and assassinate vulnerable enemy backline artillery (${enemyHeroes.filter(h => ['pharsa', 'novaria', 'yve', 'xavier', 'beatrix', 'lesley'].includes(h.id)).map(h => h.name).join(', ')}).`;
    earlyFocus = 'Aggressive jungle invades and fast Level 4 spikes on EXP and Jungle.';
    midFocus = 'Use vision wards and deep flanks to bypass enemy frontliners and assassinate mages.';
    lateFocus = 'Assassinate the primary carry before teamfights even start, securing easy 5v4 Lord captures.';
  } else {
    archetype = 'Wombo Combo Lockdown';
    titlePrefix = 'Dawn Sovereign Vanguard';
    titleSuffix = 'Championship Dominance';
    winCondition = 'Execute balanced high-tier competitive synergies across all 5 lanes with superior teamfight coordination.';
    earlyFocus = 'Control first Turtle with high-impact level 4 spikes and lane dominance.';
    midFocus = 'Maintain objective vision and push outer turrets through synchronized 4-man rotations.';
    lateFocus = 'Initiate clean 5v5 teamfight combo chains and push Lord through high-ground inhibitors.';
  }

  // Helper to pick best available hero for a lane
  const pickHeroForLane = (lane: Lane, candidates: string[]): Hero => {
    // First try candidate list
    for (const candId of candidates) {
      if (!bannedOrPickedIds.has(candId)) {
        const found = HEROES.find(h => h.id === candId);
        if (found) {
          bannedOrPickedIds.add(found.id);
          return found;
        }
      }
    }
    // Fallback: search any hero of that lane not picked or banned
    const fallback = HEROES.filter(h => h.primary_lane === lane && !bannedOrPickedIds.has(h.id))
      .sort((a, b) => (b.cc_lockdown + b.durability) - (a.cc_lockdown + a.durability))[0];
    
    if (fallback) {
      bannedOrPickedIds.add(fallback.id);
      return fallback;
    }
    // Final fallback to any hero of that lane
    return HEROES.find(h => h.primary_lane === lane) || HEROES[0];
  };

  let expCandidates = ['terizla', 'ruby', 'yu_zhong', 'edith', 'paquito', 'thamuz', 'cici', 'lapu_lapu', 'dyrroth'];
  let jungleCandidates = ['fredrinn', 'baxia', 'ling', 'fanny', 'nolan', 'lancelot', 'akai', 'joy', 'martis', 'hayabusa'];
  let midCandidates = ['xavier', 'pharsa', 'zetian', 'valentina', 'yve', 'novaria', 'valir', 'kadita', 'lunox', 'cew'];
  let goldCandidates = ['karrie', 'claude', 'beatrix', 'brody', 'harith', 'ixia', 'moskov', 'roger', 'bruno', 'wanwan'];
  let roamCandidates = ['tigreal', 'khufra', 'minotaur', 'lolita', 'mathilda', 'belerick', 'arlott', 'akai', 'estes', 'franco'];

  // Tailor candidates based on enemy traits
  if (hasHighMobility) {
    roamCandidates = ['khufra', 'phoveus', 'minsitthar', 'franco', 'kaja', ...roamCandidates];
    expCandidates = ['phoveus', 'ruby', 'edith', ...expCandidates];
    midCandidates = ['valir', 'eudora', 'kadita', ...midCandidates];
  } else if (hasHeavySustain) {
    jungleCandidates = ['baxia', 'dyrroth', ...jungleCandidates];
    goldCandidates = ['karrie', 'lunox', 'claude', ...goldCandidates];
    midCandidates = ['valir', 'luo_yi', 'lunox', ...midCandidates];
  } else if (hasBacklinePoke) {
    expCandidates = ['yu_zhong', 'paquito', 'lapu_lapu', ...expCandidates];
    jungleCandidates = ['ling', 'lancelot', 'fanny', 'hayabusa', ...jungleCandidates];
    roamCandidates = ['mathilda', 'khufra', 'jawhead', ...roamCandidates];
  }

  const expHero = pickHeroForLane('EXP', expCandidates);
  const jgHero = pickHeroForLane('Jungle', jungleCandidates);
  const midHero = pickHeroForLane('Mid', midCandidates);
  const goldHero = pickHeroForLane('Gold', goldCandidates);
  const roamHero = pickHeroForLane('Roam', roamCandidates);

  const heroComp: Record<Lane, string> = {
    EXP: expHero.id,
    Jungle: jgHero.id,
    Mid: midHero.id,
    Gold: goldHero.id,
    Roam: roamHero.id,
  };

  return {
    id: `counter-comp-${Date.now()}`,
    name: `${titlePrefix}: ${titleSuffix}`,
    tagline: `Engineered Custom 5-Man Strategy Specifically Countering Opposing Lineup`,
    archetype,
    difficulty: 'Moderate',
    power_curve: {
      early: Math.round((expHero.early_game + jgHero.early_game + midHero.early_game + goldHero.early_game + roamHero.early_game) / 5),
      mid: Math.round((expHero.mid_game + jgHero.mid_game + midHero.mid_game + goldHero.mid_game + roamHero.mid_game) / 5),
      late: Math.round((expHero.late_game + jgHero.late_game + midHero.late_game + goldHero.late_game + roamHero.late_game) / 5),
    },
    heroes: heroComp,
    lane_duties: {
      EXP: `${expHero.name}: Control minion lane wave equilibrium and initiate counter-flanks.`,
      Jungle: `${jgHero.name}: Secure neutral objectives, contest Retribution smites, and apply early gank pressure.`,
      Mid: `${midHero.name}: Clear mid waves rapidly to assist side lanes and command objective choke points.`,
      Gold: `${goldHero.name}: Farm core equipment safely and provide sustained damage in 5v5 teamfights.`,
      Roam: `${roamHero.name}: Scout enemy jungle paths, provide bushes vision, and set up teamfight initiation.`,
    },
    explanation: {
      win_condition: winCondition || 'Maintain objective control and win key 5v5 teamfights through coordinated synergy.',
      early_game: earlyFocus || 'Rotate to secure first Turtle and gain early gold lead.',
      mid_game: midFocus || 'Take down enemy outer turrets and maintain river vision control.',
      late_game: lateFocus || 'Set up around Enhanced Lord pit and execute decisive teamfight initiation.',
      key_combos: [
        `1. ${roamHero.name}: Initiates crowd control to start engagement`,
        `2. ${expHero.name}: Follows up with secondary frontline lockdown`,
        `3. ${midHero.name}: Layers magical area-of-effect damage`,
        `4. ${jgHero.name}: Bursts down critical enemy carry`,
        `5. ${goldHero.name}: Cleans up surviving enemy frontliners with sustained DPS`,
      ],
      counters_opponents: enemyHeroes.length > 0 
        ? enemyHeroes.map(h => `${h.name} (${h.role}): Kit countered by ${roamHero.name} & ${goldHero.name}`)
        : ['Generic opposing team compositions'],
    },
  };
}
