import { Lane } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';

export interface DraftTurn {
  stepNumber: number; // 1 to 20
  team: 'blue' | 'red';
  action: 'ban' | 'pick';
  banIndex?: number; // 0 to 4
  phase: 1 | 2;
  label: string;
}

export const TOURNAMENT_SEQUENCE: DraftTurn[] = [
  // Phase 1 Bans (3 each)
  { stepNumber: 1, team: 'blue', action: 'ban', banIndex: 0, phase: 1, label: 'Blue Ban 1' },
  { stepNumber: 2, team: 'red', action: 'ban', banIndex: 0, phase: 1, label: 'Red Ban 1' },
  { stepNumber: 3, team: 'blue', action: 'ban', banIndex: 1, phase: 1, label: 'Blue Ban 2' },
  { stepNumber: 4, team: 'red', action: 'ban', banIndex: 1, phase: 1, label: 'Red Ban 2' },
  { stepNumber: 5, team: 'blue', action: 'ban', banIndex: 2, phase: 1, label: 'Blue Ban 3' },
  { stepNumber: 6, team: 'red', action: 'ban', banIndex: 2, phase: 1, label: 'Red Ban 3' },

  // Phase 1 Picks (3 each)
  { stepNumber: 7, team: 'blue', action: 'pick', phase: 1, label: 'Blue Pick 1' },
  { stepNumber: 8, team: 'red', action: 'pick', phase: 1, label: 'Red Pick 1' },
  { stepNumber: 9, team: 'red', action: 'pick', phase: 1, label: 'Red Pick 2' },
  { stepNumber: 10, team: 'blue', action: 'pick', phase: 1, label: 'Blue Pick 2' },
  { stepNumber: 11, team: 'blue', action: 'pick', phase: 1, label: 'Blue Pick 3' },
  { stepNumber: 12, team: 'red', action: 'pick', phase: 1, label: 'Red Pick 3' },

  // Phase 2 Bans (2 each, Red first!)
  { stepNumber: 13, team: 'red', action: 'ban', banIndex: 3, phase: 2, label: 'Red Ban 4' },
  { stepNumber: 14, team: 'blue', action: 'ban', banIndex: 3, phase: 2, label: 'Blue Ban 4' },
  { stepNumber: 15, team: 'red', action: 'ban', banIndex: 4, phase: 2, label: 'Red Ban 5' },
  { stepNumber: 16, team: 'blue', action: 'ban', banIndex: 4, phase: 2, label: 'Blue Ban 5' },

  // Phase 2 Picks (2 each, Red first!)
  { stepNumber: 17, team: 'red', action: 'pick', phase: 2, label: 'Red Pick 4' },
  { stepNumber: 18, team: 'blue', action: 'pick', phase: 2, label: 'Blue Pick 4' },
  { stepNumber: 19, team: 'blue', action: 'pick', phase: 2, label: 'Blue Pick 5' },
  { stepNumber: 20, team: 'red', action: 'pick', phase: 2, label: 'Red Pick 5' },
];

const HIGH_PRIORITY_BANS = [
  'fanny', 'ling', 'nolan', 'angela', 'mathilda', 'joy', 'suyou', 'cici',
  'valentina', 'claude', 'tigreal', 'chou', 'harith', 'roger', 'estes'
];

const LANES_ORDER: Lane[] = ['Jungle', 'Roam', 'Mid', 'EXP', 'Gold'];

/**
 * AI Drafting Bot Logic
 * Intelligently computes the best ban or best pick for the current turn.
 */
export function computeAiDecision(
  turn: DraftTurn,
  currentTeam: Record<Lane, string | null>,
  enemyTeam: Record<Lane, string | null>,
  bansBlue: (string | null)[],
  bansRed: (string | null)[]
): { heroId: string; targetLane?: Lane } {
  const usedHeroes = new Set<string>([
    ...Object.values(currentTeam).filter(Boolean),
    ...Object.values(enemyTeam).filter(Boolean),
    ...bansBlue.filter(Boolean),
    ...bansRed.filter(Boolean),
  ] as string[]);

  const availableHeroes = HEROES.filter((h) => !usedHeroes.has(h.id));

  // 1. If Action is BAN
  if (turn.action === 'ban') {
    // Check if enemy has already picked strong cores (e.g. if enemy picked Claude, ban Tigreal)
    const enemyHeroes = Object.values(enemyTeam).filter(Boolean) as string[];
    
    // Check high priority ban list first
    for (const heroId of HIGH_PRIORITY_BANS) {
      if (!usedHeroes.has(heroId)) {
        return { heroId };
      }
    }

    // Otherwise ban highest win rate / tier hero available
    const fallbackBan = availableHeroes.sort((a, b) => (b.late_game + b.cc_lockdown) - (a.late_game + a.cc_lockdown))[0];
    return { heroId: fallbackBan?.id || availableHeroes[0].id };
  }

  // 2. If Action is PICK
  // Find open lanes on AI's team
  const openLanes = LANES_ORDER.filter((lane) => !currentTeam[lane]);
  const chosenLane = openLanes[0] || 'Mid';

  // Find candidate heroes suitable for this lane
  const laneCandidates = availableHeroes.filter((h) => h.primary_lane === chosenLane);
  const candidatesPool = laneCandidates.length > 0 ? laneCandidates : availableHeroes;

  // Counter enemy pick in that lane if enemy already picked that lane
  const enemyLaneHeroId = enemyTeam[chosenLane];
  if (enemyLaneHeroId) {
    const enemyHero = HEROES.find((h) => h.id === enemyLaneHeroId);
    if (enemyHero && enemyHero.hard_counters.length > 0) {
      const counterPick = candidatesPool.find((c) =>
        enemyHero.hard_counters.some((hc) => hc.toLowerCase().includes(c.id.replace('_', ' ')))
      );
      if (counterPick) {
        return { heroId: counterPick.id, targetLane: chosenLane };
      }
    }
  }

  // Otherwise pick highest overall rated hero for that lane
  const bestCandidate = candidatesPool.sort((a, b) => {
    const scoreA = a.early_game + a.mid_game + a.late_game + a.cc_lockdown;
    const scoreB = b.early_game + b.mid_game + b.late_game + b.cc_lockdown;
    return scoreB - scoreA;
  })[0];

  return {
    heroId: bestCandidate ? bestCandidate.id : availableHeroes[0].id,
    targetLane: chosenLane,
  };
}
