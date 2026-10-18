import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Lane } from '../../types/mlbb';
import { TOURNAMENT_SEQUENCE, DraftTurn, computeAiDecision } from './TournamentDraftEngine';
import { HEROES } from '../../data/heroes';
import { soundManager } from '../../services/sound';
import { 
  Trophy, Play, Pause, RotateCcw, Bot, User, Clock, ChevronRight, 
  Volume2, VolumeX, ShieldAlert, Sparkles, AlertCircle 
} from 'lucide-react';

interface TournamentDraftBarProps {
  isActive: boolean;
  onToggleActive: () => void;
  blueTeam: Record<Lane, string | null>;
  redTeam: Record<Lane, string | null>;
  bansBlue: (string | null)[];
  bansRed: (string | null)[];
  onUpdateSlot: (team: 'blue' | 'red', lane: Lane, heroId: string | null) => void;
  onUpdateBan: (team: 'blue' | 'red', index: number, heroId: string | null) => void;
  onResetDraft: () => void;
  onRequestSelect: (target: { type: 'slot'; team: 'blue' | 'red'; lane: Lane } | { type: 'ban'; team: 'blue' | 'red'; index: number }) => void;
}

export type AiMode = 'none' | 'ai_red' | 'ai_blue';

export const TournamentDraftBar: React.FC<TournamentDraftBarProps> = ({
  isActive,
  onToggleActive,
  blueTeam,
  redTeam,
  bansBlue,
  bansRed,
  onUpdateSlot,
  onUpdateBan,
  onResetDraft,
  onRequestSelect,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [aiMode, setAiMode] = useState<AiMode>('ai_red'); // Default: User plays Blue, AI plays Red
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  const currentTurn: DraftTurn | undefined = TOURNAMENT_SEQUENCE[currentStepIndex];
  const isDraftComplete = currentStepIndex >= TOURNAMENT_SEQUENCE.length;

  const isCurrentTurnAi = useCallback(() => {
    if (!currentTurn) return false;
    if (aiMode === 'none') return false;
    if (aiMode === 'ai_red' && currentTurn.team === 'red') return true;
    if (aiMode === 'ai_blue' && currentTurn.team === 'blue') return true;
    return false;
  }, [currentTurn, aiMode]);

  // Announce turn changes
  useEffect(() => {
    if (!isActive || isDraftComplete || !currentTurn) return;

    soundManager.playTurnBeep();
    if (voiceEnabled) {
      const teamName = currentTurn.team === 'blue' ? 'Blue team' : 'Red team';
      const actionName = currentTurn.action === 'ban' ? 'ban a hero' : 'make your pick';
      soundManager.voiceAnnounce(`${teamName}, ${actionName}.`);
    }
    setSecondsRemaining(30);
  }, [currentStepIndex, isActive, isDraftComplete]);

  // Advance step helper
  const advanceStep = useCallback(() => {
    if (currentStepIndex < TOURNAMENT_SEQUENCE.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setCurrentStepIndex(TOURNAMENT_SEQUENCE.length);
      soundManager.playGoldChime();
      if (voiceEnabled) {
        soundManager.voiceAnnounce('Tournament draft complete. Prepare for battle!');
      }
    }
  }, [currentStepIndex, voiceEnabled]);

  // Handle AI turn execution
  const executeAiTurn = useCallback(() => {
    if (!currentTurn || !isCurrentTurnAi() || isAiThinking) return;

    setIsAiThinking(true);
    // Simulate AI thinking time (1.2s)
    setTimeout(() => {
      const currentTeamData = currentTurn.team === 'blue' ? blueTeam : redTeam;
      const enemyTeamData = currentTurn.team === 'blue' ? redTeam : blueTeam;

      const decision = computeAiDecision(
        currentTurn,
        currentTeamData,
        enemyTeamData,
        bansBlue,
        bansRed
      );

      const hero = HEROES.find((h) => h.id === decision.heroId);

      if (currentTurn.action === 'ban') {
        const banIdx = currentTurn.banIndex ?? 0;
        onUpdateBan(currentTurn.team, banIdx, decision.heroId);
        soundManager.playBanStrike();
        if (voiceEnabled && hero) {
          soundManager.voiceAnnounce(`${currentTurn.team === 'blue' ? 'Blue' : 'Red'} team banned ${hero.name}.`);
        }
      } else {
        const targetLane = decision.targetLane || 'Mid';
        onUpdateSlot(currentTurn.team, targetLane, decision.heroId);
        soundManager.playLockIn();
        if (voiceEnabled && hero) {
          soundManager.voiceAnnounce(`${currentTurn.team === 'blue' ? 'Blue' : 'Red'} team selected ${hero.name}.`);
        }
      }

      setIsAiThinking(false);
      advanceStep();
    }, 1200);
  }, [
    currentTurn,
    isCurrentTurnAi,
    isAiThinking,
    blueTeam,
    redTeam,
    bansBlue,
    bansRed,
    onUpdateBan,
    onUpdateSlot,
    voiceEnabled,
    advanceStep,
  ]);

  // Trigger AI turn if applicable
  useEffect(() => {
    if (isActive && !isPaused && !isDraftComplete && isCurrentTurnAi() && !isAiThinking) {
      executeAiTurn();
    }
  }, [isActive, isPaused, isDraftComplete, currentTurn, isCurrentTurnAi, executeAiTurn, isAiThinking]);

  // Timer countdown interval
  useEffect(() => {
    if (!isActive || isPaused || isDraftComplete || isAiThinking) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          // Time expired! Auto advance with random or best available pick
          if (currentTurn) {
            const currentTeamData = currentTurn.team === 'blue' ? blueTeam : redTeam;
            const enemyTeamData = currentTurn.team === 'blue' ? redTeam : blueTeam;
            const decision = computeAiDecision(
              currentTurn,
              currentTeamData,
              enemyTeamData,
              bansBlue,
              bansRed
            );
            if (currentTurn.action === 'ban') {
              onUpdateBan(currentTurn.team, currentTurn.banIndex ?? 0, decision.heroId);
              soundManager.playBanStrike();
            } else {
              onUpdateSlot(currentTurn.team, decision.targetLane || 'Mid', decision.heroId);
              soundManager.playLockIn();
            }
          }
          advanceStep();
          return 30;
        }

        if (prev <= 6 && prev > 1) {
          soundManager.playTimerTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    isActive,
    isPaused,
    isDraftComplete,
    isAiThinking,
    currentTurn,
    blueTeam,
    redTeam,
    bansBlue,
    bansRed,
    onUpdateBan,
    onUpdateSlot,
    advanceStep,
  ]);

  // Reset tournament draft
  const handleReset = () => {
    soundManager.playClick();
    setCurrentStepIndex(0);
    setSecondsRemaining(30);
    setIsPaused(false);
    setIsAiThinking(false);
    onResetDraft();
  };

  // When human player clicks "Lock In / Pick Hero"
  const handleHumanActionClick = () => {
    if (!currentTurn) return;
    soundManager.playClick();
    if (currentTurn.action === 'ban') {
      onRequestSelect({
        type: 'ban',
        team: currentTurn.team,
        index: currentTurn.banIndex ?? 0,
      });
    } else {
      // Find first empty lane on human team
      const teamData = currentTurn.team === 'blue' ? blueTeam : redTeam;
      const emptyLane = (['EXP', 'Jungle', 'Mid', 'Gold', 'Roam'] as Lane[]).find((l) => !teamData[l]) || 'Mid';
      onRequestSelect({
        type: 'slot',
        team: currentTurn.team,
        lane: emptyLane,
      });
    }
  };

  if (!isActive) {
    return (
      <div className="bg-surface border border-surface-border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Trophy className="w-5 h-5 text-gold-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-['Cinzel',serif] tracking-wide flex items-center gap-2">
              <span>Tournament Draft Simulator</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                Official 20-Turn Mode
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience authentic M-Series & MPL draft phases with 30s countdown, AI bot opponents, and esports announcer.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onToggleActive();
            setCurrentStepIndex(0);
            setSecondsRemaining(30);
          }}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs tracking-wider shadow-mythic-glow transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>Launch Tournament Simulator</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-gold-500/40 rounded-2xl p-4 shadow-mythic-glow space-y-3.5 transition-all">
      {/* Simulator Top Control Strip */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 border-b border-surface-border/60 pb-3">
        {/* Step info & Status */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-100 font-['Cinzel',serif]">
                Tournament Mode
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-surface-elevated text-gold-400 border border-gold-500/30">
                {isDraftComplete ? 'COMPLETED' : `Step ${currentStepIndex + 1} / 20`}
              </span>
              {currentTurn && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Phase {currentTurn.phase}
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {isDraftComplete
                ? 'All 10 heroes drafted and 10 heroes banned.'
                : `Currently: ${currentTurn?.label} (${currentTurn?.team === 'blue' ? 'Blue Team' : 'Red Team'})`}
            </p>
          </div>
        </div>

        {/* AI Mode Selector & Voice Toggle */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          {/* Opponent selector */}
          <div className="flex items-center bg-canvas p-1 rounded-lg border border-surface-border text-[11px]">
            <button
              onClick={() => {
                soundManager.playClick();
                setAiMode('ai_red');
              }}
              className={`px-2.5 py-1 rounded font-bold transition-all flex items-center gap-1 ${
                aiMode === 'ai_red'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="You play Blue, AI plays Red"
            >
              <Bot className="w-3 h-3" />
              <span>AI Red</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setAiMode('ai_blue');
              }}
              className={`px-2.5 py-1 rounded font-bold transition-all flex items-center gap-1 ${
                aiMode === 'ai_blue'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="You play Red, AI plays Blue"
            >
              <Bot className="w-3 h-3" />
              <span>AI Blue</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setAiMode('none');
              }}
              className={`px-2.5 py-1 rounded font-bold transition-all flex items-center gap-1 ${
                aiMode === 'none'
                  ? 'bg-surface-elevated text-gold-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Both sides controlled manually"
            >
              <User className="w-3 h-3" />
              <span>2P Manual</span>
            </button>
          </div>

          {/* Voice Announcer Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              setVoiceEnabled(!voiceEnabled);
              soundManager.voiceEnabled = !voiceEnabled;
            }}
            className={`p-1.5 rounded-lg border transition-all ${
              voiceEnabled
                ? 'bg-gold-500/20 border-gold-500/50 text-gold-400'
                : 'bg-canvas border-surface-border text-slate-500'
            }`}
            title={voiceEnabled ? 'Announcer voice ON' : 'Announcer voice OFF'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Pause / Resume */}
          <button
            onClick={() => {
              soundManager.playClick();
              setIsPaused(!isPaused);
            }}
            className="p-1.5 rounded-lg bg-surface-elevated hover:bg-surface-border text-slate-300 border border-surface-borderLight transition-all"
            title={isPaused ? 'Resume Timer' : 'Pause Timer'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-surface-elevated hover:bg-surface-border text-slate-300 border border-surface-borderLight transition-all"
            title="Reset Draft Simulator"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Exit Simulator */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleActive();
            }}
            className="px-2.5 py-1 rounded-lg bg-canvas hover:bg-surface text-slate-400 hover:text-slate-200 text-xs border border-surface-border"
          >
            Exit Sim
          </button>
        </div>
      </div>

      {/* Live Turn Action Center */}
      {!isDraftComplete && currentTurn ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-canvas/70 p-3 rounded-xl border border-surface-border">
          {/* Active Turn Team & Action */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div
              className={`px-3 py-1.5 rounded-lg font-mono font-bold text-sm flex items-center gap-1.5 shadow-sm ${
                currentTurn.team === 'blue'
                  ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                  : 'bg-red-600/30 text-red-300 border border-red-500/50'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  currentTurn.team === 'blue' ? 'bg-blue-400 shadow-blue-glow' : 'bg-red-400 shadow-red-glow'
                }`}
              />
              <span>{currentTurn.label.toUpperCase()}</span>
            </div>

            <div className="text-xs">
              {isAiThinking ? (
                <span className="text-gold-400 flex items-center gap-1.5 font-bold animate-pulse">
                  <Bot className="w-3.5 h-3.5" /> AI is evaluating tactical counter-pick...
                </span>
              ) : isCurrentTurnAi() ? (
                <span className="text-slate-400 font-medium">AI Bot Turn</span>
              ) : (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> YOUR TURN: Select {currentTurn.action === 'ban' ? 'Ban' : 'Hero Pick'}
                </span>
              )}
            </div>
          </div>

          {/* Right Action: Countdown Timer + Select/Advance Button */}
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {/* Timer visual */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface border border-surface-border">
              <Clock className={`w-3.5 h-3.5 ${secondsRemaining <= 5 ? 'text-red-500 animate-bounce' : 'text-gold-400'}`} />
              <span
                className={`text-sm font-mono font-black ${
                  secondsRemaining <= 5 ? 'text-red-500 animate-pulse' : 'text-slate-100'
                }`}
              >
                00:{secondsRemaining < 10 ? '0' : ''}{secondsRemaining}
              </span>
            </div>

            {/* Human Action Button */}
            {!isCurrentTurnAi() && (
              <button
                onClick={handleHumanActionClick}
                className="px-4 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs tracking-wider shadow-mythic-glow transition-all flex items-center gap-1.5"
              >
                <span>{currentTurn.action === 'ban' ? 'Choose Ban' : 'Choose Hero'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Advance Step Manually */}
            <button
              onClick={() => {
                soundManager.playClick();
                advanceStep();
              }}
              className="px-2.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-border text-slate-300 text-xs font-semibold border border-surface-borderLight transition-all"
              title="Skip or pass turn"
            >
              Skip Step
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 bg-emerald-950/20 border border-emerald-500/40 rounded-xl">
          <span className="text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 font-['Cinzel',serif]">
            <Trophy className="w-4 h-4 text-gold-400" /> TOURNAMENT DRAFT PHASE COMPLETE! Ready for Land of Dawn.
          </span>
        </div>
      )}

      {/* 20-Turn Progress Dots Strip */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pt-1">
        {TOURNAMENT_SEQUENCE.map((turn, i) => {
          const isCurrent = i === currentStepIndex;
          const isPast = i < currentStepIndex;

          return (
            <div
              key={i}
              onClick={() => {
                soundManager.playClick();
                setCurrentStepIndex(i);
                setSecondsRemaining(30);
              }}
              title={`Step ${i + 1}: ${turn.label}`}
              className={`flex-1 min-w-[12px] h-2 rounded-full cursor-pointer transition-all ${
                isCurrent
                  ? 'bg-gold-400 ring-2 ring-gold-400 shadow-mythic-glow scale-125'
                  : isPast
                  ? turn.team === 'blue'
                    ? 'bg-blue-500/80'
                    : 'bg-red-500/80'
                  : 'bg-surface-border/60 hover:bg-surface-border'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
