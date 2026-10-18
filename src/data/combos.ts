export interface WomboCombo {
  id: string;
  name: string;
  tagline: string;
  heroIds: string[]; // 2 or 3 hero IDs
  heroNames: string[];
  type: 'wombo_combo' | 'sustain_engine' | 'hyper_dive' | 'pickoff_cc' | 'artillery_siege';
  difficulty: 'Beginner' | 'Intermediate' | 'Master' | 'Pro Tournament';
  executionSteps: string[];
  strategicValue: string;
  counterTactics: string[];
  recommendedSpells?: string[];
}

export const ICONIC_COMBOS: WomboCombo[] = [
  {
    id: 'cosmic_implosion',
    name: 'Cosmic Implosion',
    tagline: 'Instant 5-man crowd control wipeout with global artillery follow-up.',
    heroIds: ['tigreal', 'xavier', 'claude'],
    heroNames: ['Tigreal', 'Xavier', 'Claude'],
    type: 'wombo_combo',
    difficulty: 'Pro Tournament',
    executionSteps: [
      '1. Tigreal activates Conceal & Flicker into Skill 2 Sacred Hammer -> Ultimate Implosion pull.',
      '2. Xavier instantly casts Skill 2 Mystic Field + Skill 1 Infinite Extension stun, into Ultimate Dawning Light.',
      '3. Claude casts Battle Mirror Image forward and channels Ultimate Blazing Duet with Golden Staff & DHS.'
    ],
    strategicValue: 'Capable of turning around 10k gold deficit matches in a single Lord pit choke engagement.',
    counterTactics: [
      'Draft Diggie to cleanse Tigreal Implosion with Time Journey.',
      'Equip Purify or Winter Crown on priority backline carries.',
      'Build Radiant Armor to nullify Claude Blazing Duet continuous ticks.'
    ],
    recommendedSpells: ['Flicker (Tigreal)', 'Flicker (Xavier)', 'Vengeance / Purify (Claude)']
  },
  {
    id: 'shadow_symbiosis',
    name: 'Shadow Symbiosis',
    tagline: 'Untargetable hypercarry assassin diving deep past inner towers.',
    heroIds: ['angela', 'ling'],
    heroNames: ['Angela', 'Ling'],
    type: 'hyper_dive',
    difficulty: 'Intermediate',
    executionSteps: [
      '1. Ling vaults across walls with Finch Poise and engages isolated backline.',
      '2. Angela channels Ultimate Heartguard onto Ling providing massive shield & movement speed.',
      '3. Angela casts Puppet-on-a-String immobilize while Ling triggers Tempest of Blades sword collection.'
    ],
    strategicValue: 'Eliminates enemy mage and marksman in the first 2 seconds of combat before tanks can peel.',
    counterTactics: [
      'Draft Khufra to bounce Ling mid-dash with Bouncing Ball.',
      'Pick Saber or Franco for instant suppression CC before Angela shield activates.',
      'Carries must purchase Wind of Nature for physical immunity during Tempest.'
    ],
    recommendedSpells: ['Retribution (Ling)', 'Flicker / Revitalize (Angela)']
  },
  {
    id: 'abyssal_collision',
    name: 'Abyssal Crash Express',
    tagline: 'Global vehicular strike leading to instant burst liquidation.',
    heroIds: ['johnson', 'kadita'],
    heroNames: ['Johnson', 'Kadita'],
    type: 'pickoff_cc',
    difficulty: 'Beginner',
    executionSteps: [
      '1. Johnson triggers Ultimate Rapid Touchdown and boards Kadita.',
      '2. Johnson rams into clustered enemies causing AoE stun and electro-field.',
      '3. Kadita immediately casts Skill 1 Ocean Oddity + Skill 2 Breath of the Ocean knockup -> Ultimate Rough Waves.'
    ],
    strategicValue: 'Creates terrifying map-wide pressure; forces opponents to forfeit lane pushes without vision.',
    counterTactics: [
      'Draft Grock to erect Guardian Barrier walls blocking Johnson paths.',
      'Position tanks ahead of squishy carries to absorb crash impacts.',
      'Carry Athena Shield + Rose Gold Meteor to survive Rough Waves burst.'
    ],
    recommendedSpells: ['Flicker (Johnson)', 'Petrify (Kadita)']
  },
  {
    id: 'guiding_wind_tempest',
    name: 'Guiding Wind Tempest',
    tagline: 'Ultra-fast hyper-dive taxi delivering brutal wolf form execution.',
    heroIds: ['mathilda', 'roger'],
    heroNames: ['Mathilda', 'Roger'],
    type: 'hyper_dive',
    difficulty: 'Master',
    executionSteps: [
      '1. Mathilda triggers Ultimate Circling Eagle onto priority target and casts Skill 2 Guiding Wind.',
      '2. Roger in Human form pokes with Skill 1 Full Bore, then flies to Mathilda using Guiding Wind.',
      '3. Roger morphs into Wolf form with Wolf Transformation, leaping with Lycan Pounce for execute resets.'
    ],
    strategicValue: 'High tempo early-to-mid game aggression that snowball leads across Turtle and outer turrets.',
    counterTactics: [
      'Draft Baxia to reduce Roger continuous lifesteal sustain by 50%.',
      'Build Antique Cuirass on frontliners to shred Roger wolf physical attack.',
      'Use heavy ground CC (Minotaur, Belerick) to intercept the dive.'
    ],
    recommendedSpells: ['Flicker (Mathilda)', 'Retribution (Roger)']
  },
  {
    id: 'resurrection_fortress',
    name: 'Resurrection Fortress',
    tagline: 'Immortal death-defying sustain ball that cannot be wiped in 5v5.',
    heroIds: ['faramis', 'estes', 'ruby'],
    heroNames: ['Faramis', 'Estes', 'Ruby'],
    type: 'sustain_engine',
    difficulty: 'Pro Tournament',
    executionSteps: [
      '1. Ruby hooks and gathers enemy clump with Be Good! and Ultimate I\'m Offended!.',
      '2. Estes casts Moonlight Immersion and channels Blessing of Moon Goddess for team-wide HP surge.',
      '3. Faramis pops Cult Altar Nether Realm giving every ally an extra life bar upon lethal damage.'
    ],
    strategicValue: 'Deters enemy burst comps; thrives against assassin and dive compositions in 5v5 teamfights.',
    counterTactics: [
      'Mandatory Sea Halberd, Dominance Ice, or Glowing Wand on 3+ heroes for 50% anti-heal.',
      'Draft Valentina to steal Faramis Cult Altar and turn the fight against them.',
      'Draft Luo Yi or Carmilla to punish tight clump positioning.'
    ],
    recommendedSpells: ['Flicker (Ruby)', 'Revitalize / Purify (Estes)', 'Purify / Flicker (Faramis)']
  },
  {
    id: 'dimensional_vortex',
    name: 'Dimensional Gravity Vortex',
    tagline: 'Fatal Chains vortex pulled directly into long-range airstrike barrage.',
    heroIds: ['atlas', 'pharsa'],
    heroNames: ['Atlas', 'Pharsa'],
    type: 'wombo_combo',
    difficulty: 'Intermediate',
    executionSteps: [
      '1. Atlas activates Perfect Match eject, Flickers in, and casts Ultimate Fatal Chains.',
      '2. Atlas slams all caught enemies onto a designated target point.',
      '3. Pharsa sets up Feathered Air Strike and drops 4 consecutive artillery rounds into the slam zone.'
    ],
    strategicValue: 'Dominates objective teamfights around Turtle and Lord pits with zero escape opportunity.',
    counterTactics: [
      'Draft Diggie for Time Journey crowd control immunity.',
      'Carries must use Winter Crown during Fatal Chains airborne duration.',
      'Flank Pharsa with high-mobility assassins (Ling, Hayabusa) while she is stationary in ultimate.'
    ],
    recommendedSpells: ['Flicker (Atlas)', 'Flicker (Pharsa)']
  },
  {
    id: 'dragon_cataclysm',
    name: 'Yin-Yang Dragon Cataclysm',
    tagline: 'Black Dragon dive creating chaotic enemy clumps for Luo Yi dual dispersion.',
    heroIds: ['yu_zhong', 'luo_yi'],
    heroNames: ['Yu Zhong', 'Luo Yi'],
    type: 'wombo_combo',
    difficulty: 'Pro Tournament',
    executionSteps: [
      '1. Luo Yi casts Ultimate Diversion behind enemy defensive line to teleport Yu Zhong and allies.',
      '2. Yu Zhong transforms with Black Dragon Form, disrupting formation and knocking back carries.',
      '3. Luo Yi alternates Yin/Yang skills triggers continuous Duality reaction explosions in the brawl.'
    ],
    strategicValue: 'Devastates traditional front-to-back turtle defensive formations with backline teleportation.',
    counterTactics: [
      'Anticipate Luo Yi Diversion portal circle and place trap CC or burst onto the arrival point.',
      'Keep team spread apart by 4+ yards to prevent Yin/Yang magnetic reaction pulls.',
      'Pick Baxia or build Dominance Ice against Yu Zhong Sha Residue regeneration.'
    ],
    recommendedSpells: ['Petrify / Vengeance (Yu Zhong)', 'Flicker (Luo Yi)']
  },
  {
    id: 'midnight_requiem',
    name: 'Midnight Blood Requiem',
    tagline: 'Curse of Blood chains linking all enemies to share Cecilion apocalyptic burst.',
    heroIds: ['carmilla', 'cecilion'],
    heroNames: ['Carmilla', 'Cecilion'],
    type: 'wombo_combo',
    difficulty: 'Intermediate',
    executionSteps: [
      '1. Carmilla dives front-to-back and casts Ultimate Curse of Blood, tethering up to 3 enemy heroes.',
      '2. Carmilla uses Crimson Flower slow and Bloodbath stun.',
      '3. Cecilion casts Bat Impact and Sanguine Claws; 100% of damage and CC is shared across all linked targets!'
    ],
    strategicValue: 'Tanks cannot protect their squishies—hitting the frontliner damages the backline carries equally.',
    counterTactics: [
      'Linked heroes must scatter outward immediately to break the Curse of Blood tether radius.',
      'Athena Shield and Radiant Armor severely dampen Cecilion Bat Impact burst.',
      'End game before minute 14 before Cecilion stacks hit 250+ mana.'
    ],
    recommendedSpells: ['Vengeance / Revitalize (Carmilla)', 'Sprint / Purify (Cecilion)']
  },
  {
    id: 'knockup_blender',
    name: 'Knockup Blender',
    tagline: 'Unbreakable airborne lock-on chain keeping victims helpless for 4.5 seconds.',
    heroIds: ['minotaur', 'guinevere'],
    heroNames: ['Minotaur', 'Guinevere'],
    type: 'wombo_combo',
    difficulty: 'Intermediate',
    executionSteps: [
      '1. Minotaur enters Enraged mode and casts Minoan Fury (3 ground smashes with airborne effect).',
      '2. Guinevere jumps with Skill 2 Spatial Migration onto knocked-up targets.',
      '3. Guinevere triggers Ultimate Violet Requiem extending the airborne state for 11 consecutive hits.'
    ],
    strategicValue: 'Zero counterplay once the first airborne lands—enemies cannot cast spells, attack, or reposition.',
    counterTactics: [
      'Purify cannot be used while airborne; must be cast BEFORE Minotaur smash lands.',
      'Pick Diggie or Akai to push away Guinevere before she channels Violet Requiem.',
      'Avoid choking inside jungle narrow corridors.'
    ],
    recommendedSpells: ['Flicker (Minotaur)', 'Execute / Purify (Guinevere)']
  },
  {
    id: 'suppression_death_row',
    name: 'Suppression Death Row',
    tagline: 'Instant single-target deletion that ignores all tenacity and Purify spells.',
    heroIds: ['franco', 'saber'],
    heroNames: ['Franco', 'Saber'],
    type: 'pickoff_cc',
    difficulty: 'Beginner',
    executionSteps: [
      '1. Franco hooks target with Iron Hook or Flickers in with Ultimate Bloody Hunt suppression.',
      '2. Saber dashes in with Charge and executes Triple Sweep airborne combo with Orbiting Swords.',
      '3. The victim is deleted with 0 opportunity for counter-reaction.'
    ],
    strategicValue: 'Guarantees 5v4 number advantage before major Lord or Turtle fights begin.',
    counterTactics: [
      'Roamers must body-block Franco hooks and scout bushes.',
      'Carries should build Antique Cuirass or Dreadnaught Armor early against Saber.',
      'Keep team tight so allies can interrupt Franco channel.'
    ],
    recommendedSpells: ['Flicker (Franco)', 'Retribution / Execute (Saber)']
  },
  {
    id: 'sniper_highground_siege',
    name: 'Sniper High-Ground Siege',
    tagline: 'Map vision revelation paired with instant off-screen sniper execution.',
    heroIds: ['novaria', 'beatrix'],
    heroNames: ['Novaria', 'Beatrix'],
    type: 'artillery_siege',
    difficulty: 'Master',
    executionSteps: [
      '1. Novaria casts Ultimate Astral Echo revealing all enemy locations and increasing their hitboxes by 2.5x.',
      '2. Novaria lands Skill 2 Astral Recall snipe from 2 screens away for 60% HP chunk.',
      '3. Beatrix equips Renner sniper rifle and lands Renner\'s Apathy bullet to finish the target.'
    ],
    strategicValue: 'Enemies cannot defend turrets or contest objectives without taking massive poke damage.',
    counterTactics: [
      'Draft flanking assassins (Ling, Fanny, Hayabusa) to bypass frontline and kill the snipers.',
      'Stack Athena Shield and Twilight Armor to resist single-shot burst.',
      'Use Conceal engage to rush down snipers before they set up.'
    ],
    recommendedSpells: ['Flameshot / Flicker (Novaria)', 'Flicker (Beatrix)']
  },
  {
    id: 'heavy_taunt_pin',
    name: 'Spike Thorns & Heavy Taunt',
    tagline: 'Massive frontliner taunt grouping enemies directly into relentless Gatling fire.',
    heroIds: ['belerick', 'ixia'],
    heroNames: ['Belerick', 'Ixia'],
    type: 'wombo_combo',
    difficulty: 'Intermediate',
    executionSteps: [
      '1. Belerick casts Skill 2 Nature\'s Strike -> Ultimate Wrath of Dryads taunting all surrounding enemies.',
      '2. Ixia positions safely and opens Full Barrage fan-shaped ultimate field.',
      '3. Belerick thorns reflect damage while Ixia triggers double Starlium siphon damage on all taunted targets.'
    ],
    strategicValue: 'Ultimate counter to heavy dive and basic-attack reliant heroes.',
    counterTactics: [
      'Avoid high-attack-speed marksmen directly attacking Belerick during ultimate.',
      'Draft long-range mages (Pharsa, Yve, Xavier) to interrupt Ixia channel.',
      'Disengage immediately when Belerick casts Wrath of Dryads.'
    ],
    recommendedSpells: ['Flicker (Belerick)', 'Flicker (Ixia)']
  }
];

export interface ActiveComboResult {
  combo: WomboCombo;
  matchedHeroIds: string[];
  missingHeroIds: string[];
  matchCount: number;
  totalCount: number;
  completionPercentage: number;
  isComplete: boolean;
}

/**
 * Detects all active and partial synergies given a list of hero IDs for a team
 */
export function detectTeamCombos(teamHeroIds: (string | null)[]): ActiveComboResult[] {
  const validIds = new Set(teamHeroIds.filter((id): id is string => Boolean(id)));

  const results: ActiveComboResult[] = [];

  for (const combo of ICONIC_COMBOS) {
    const matched: string[] = [];
    const missing: string[] = [];

    for (const reqId of combo.heroIds) {
      if (validIds.has(reqId)) {
        matched.push(reqId);
      } else {
        missing.push(reqId);
      }
    }

    if (matched.length >= 1) {
      const completionPercentage = Math.round((matched.length / combo.heroIds.length) * 100);
      results.push({
        combo,
        matchedHeroIds: matched,
        missingHeroIds: missing,
        matchCount: matched.length,
        totalCount: combo.heroIds.length,
        completionPercentage,
        isComplete: matched.length === combo.heroIds.length,
      });
    }
  }

  // Sort by complete combos first, then highest completion percentage
  results.sort((a, b) => {
    if (a.isComplete && !b.isComplete) return -1;
    if (!a.isComplete && b.isComplete) return 1;
    return b.completionPercentage - a.completionPercentage;
  });

  return results;
}
