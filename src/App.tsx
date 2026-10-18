import React, { useState, useEffect, useCallback } from 'react';
import { Lane, DraftMetrics } from './types/mlbb';
import { Header } from './components/layout/Header';
import { Navigation, ActiveModule } from './components/layout/Navigation';
import { DraftBoard } from './components/draft/DraftBoard';
import { EquipmentMatrix } from './components/itemization/EquipmentMatrix';
import { EmblemBuilder } from './components/emblems/EmblemBuilder';
import { DawnOracleChat } from './components/oracle/DawnOracleChat';
import { evaluateDraft } from './services/api';
import { PresetDraft } from './data/tacticalKnowledge';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

const initialDraft: Record<Lane, string | null> = {
  EXP: null,
  Jungle: null,
  Mid: null,
  Gold: null,
  Roam: null,
};

// Default starter draft matching the prompt's required heroes
const defaultStarterBlue: Record<Lane, string | null> = {
  EXP: 'ruby',
  Jungle: 'fanny',
  Mid: 'change',
  Gold: 'claude',
  Roam: 'estes',
};

const defaultStarterRed: Record<Lane, string | null> = {
  EXP: 'terizla',
  Jungle: 'baxia',
  Mid: 'pharsa',
  Gold: 'beatrix',
  Roam: 'khufra',
};

export const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ActiveModule>('draft');
  const [serverOnline, setServerOnline] = useState<boolean>(false);

  // Draft State (5 Bans per team matching official MLBB tournament rules)
  const [blueTeam, setBlueTeam] = useState<Record<Lane, string | null>>(defaultStarterBlue);
  const [redTeam, setRedTeam] = useState<Record<Lane, string | null>>(defaultStarterRed);
  const [bansBlue, setBansBlue] = useState<(string | null)[]>([
    'saber', 'franco', 'kadita', 'fanny', 'nolan'
  ]);
  const [bansRed, setBansRed] = useState<(string | null)[]>([
    'ling', 'angela', 'mathilda', 'cici', 'joy'
  ]);

  // Real-time Metrics State
  const [blueMetrics, setBlueMetrics] = useState<DraftMetrics>({
    physical_ratio: 60,
    magic_ratio: 40,
    true_ratio: 0,
    cc_score: 65,
    early_curve: 75,
    mid_curve: 85,
    late_curve: 80,
    durability_score: 65,
    predicted_win_rate: 54,
    key_strengths: ["High sustain with Estes & Ruby", "Heavy aerial dive with Fanny"],
    vulnerabilities: ["Vulnerable to Baxia anti-heal"]
  });

  const [redMetrics, setRedMetrics] = useState<DraftMetrics>({
    physical_ratio: 40,
    magic_ratio: 60,
    true_ratio: 0,
    cc_score: 75,
    early_curve: 70,
    mid_curve: 85,
    late_curve: 75,
    durability_score: 80,
    predicted_win_rate: 46,
    key_strengths: ["Massive teamfight lockdown with Khufra & Terizla"],
    vulnerabilities: ["Lack of instant disengage against dive"]
  });

  // Check engine health (local engine is always ready; check backend when on web)
  useEffect(() => {
    if (window.location.hostname === 'appassets.androidplatform.net' || window.location.protocol === 'file:') {
      setServerOnline(true);
      return;
    }
    fetch('/api/health')
      .then((res) => res.ok ? res.json() : Promise.reject())
      .then(() => setServerOnline(true))
      .catch(() => setServerOnline(false));
  }, []);

  // Update evaluation whenever draft changes
  const updateMetrics = useCallback(async (
    bTeam: Record<Lane, string | null>,
    rTeam: Record<Lane, string | null>,
    bBans: (string | null)[],
    rBans: (string | null)[]
  ) => {
    const validBlueBans = bBans.filter((id): id is string => Boolean(id));
    const validRedBans = rBans.filter((id): id is string => Boolean(id));
    const result = await evaluateDraft(bTeam, rTeam, { blue: validBlueBans, red: validRedBans });
    setBlueMetrics(result.blue);
    setRedMetrics(result.red);
  }, []);

  useEffect(() => {
    updateMetrics(blueTeam, redTeam, bansBlue, bansRed);
  }, [blueTeam, redTeam, bansBlue, bansRed, updateMetrics]);

  const handleUpdateSlot = (team: 'blue' | 'red', lane: Lane, heroId: string | null) => {
    if (team === 'blue') {
      const updated = { ...blueTeam, [lane]: heroId };
      setBlueTeam(updated);
      updateMetrics(updated, redTeam, bansBlue, bansRed);
    } else {
      const updated = { ...redTeam, [lane]: heroId };
      setRedTeam(updated);
      updateMetrics(blueTeam, updated, bansBlue, bansRed);
    }
  };

  const handleUpdateBan = (team: 'blue' | 'red', index: number, heroId: string | null) => {
    if (team === 'blue') {
      const updated = [...bansBlue];
      while (updated.length <= index) updated.push(null);
      updated[index] = heroId;
      setBansBlue(updated);
      updateMetrics(blueTeam, redTeam, updated, bansRed);
    } else {
      const updated = [...bansRed];
      while (updated.length <= index) updated.push(null);
      updated[index] = heroId;
      setBansRed(updated);
      updateMetrics(blueTeam, redTeam, bansBlue, updated);
    }
  };

  const handleApplyComposition = (team: 'blue' | 'red', comp: Record<Lane, string>) => {
    if (team === 'blue') {
      setBlueTeam({ ...comp });
      updateMetrics(comp, redTeam, bansBlue, bansRed);
    } else {
      setRedTeam({ ...comp });
      updateMetrics(blueTeam, comp, bansBlue, bansRed);
    }
  };

  const handleLoadPreset = (preset: PresetDraft) => {
    setBlueTeam(preset.blue as Record<Lane, string | null>);
    setRedTeam(preset.red as Record<Lane, string | null>);
    setBansBlue(preset.bans_blue);
    setBansRed(preset.bans_red);
  };

  const handleResetDraft = () => {
    setBlueTeam({ ...initialDraft });
    setRedTeam({ ...initialDraft });
    setBansBlue([null, null, null, null, null]);
    setBansRed([null, null, null, null, null]);
  };

  const [showFriendlyTip, setShowFriendlyTip] = useState(true);
  const [showIosPrompt, setShowIosPrompt] = useState(false);

  useEffect(() => {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
    if (isIos && !isStandalone) {
      setShowIosPrompt(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-slate-100 flex flex-col selection:bg-gold-500 selection:text-slate-950">
      {/* Top Header */}
      <Header
        onLoadPreset={handleLoadPreset}
        onResetDraft={handleResetDraft}
        serverOnline={serverOnline}
      />

      {/* Top Navigation Bar (Desktop & Tablet) */}
      <Navigation
        activeModule={activeModule}
        onChangeModule={setActiveModule}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6 pb-24 lg:pb-8">
        {/* Friendly Beginner Helper Banner */}
        {showFriendlyTip && (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-surface-elevated via-surface to-surface-elevated border border-gold-500/30 flex items-center justify-between gap-3 shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <span className="text-base">💡</span>
              <div>
                <strong className="text-gold-300 font-['Cinzel',serif]">Beginner Friendly:</strong>{' '}
                <span>Tap any hero slot below to pick champions, or tap </span>
                <span className="text-cyan-400 font-semibold">"Quick Guide"</span>
                <span> in the top bar to load 1-tap pro tournament compositions!</span>
              </div>
            </div>
            <button
              onClick={() => setShowFriendlyTip(false)}
              className="p-1 rounded-md text-slate-500 hover:text-slate-300 hover:bg-surface text-xs shrink-0"
              title="Dismiss Tip"
            >
              ✕
            </button>
          </div>
        )}

        {activeModule === 'draft' && (
          <DraftBoard
            blueTeam={blueTeam}
            redTeam={redTeam}
            bansBlue={bansBlue}
            bansRed={bansRed}
            blueMetrics={blueMetrics}
            redMetrics={redMetrics}
            onUpdateSlot={handleUpdateSlot}
            onUpdateBan={handleUpdateBan}
            onApplyComposition={handleApplyComposition}
            onResetDraft={handleResetDraft}
          />
        )}

        {activeModule === 'itemization' && (
          <EquipmentMatrix
            blueTeam={blueTeam}
            redTeam={redTeam}
          />
        )}

        {activeModule === 'emblems' && (
          <EmblemBuilder />
        )}

        {activeModule === 'oracle' && (
          <DawnOracleChat />
        )}
      </main>

      {/* Mobile iOS Safari Install Prompt Banner */}
      {showIosPrompt && (
        <div className="fixed bottom-16 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-40 bg-surface-elevated/95 border-2 border-sky-400/80 rounded-2xl p-3 shadow-2xl backdrop-blur-md animate-slideUp flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0 text-sky-400 text-lg">
            📲
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center justify-between">
              <strong className="text-sky-300 font-bold">Install on iPhone (Full Screen):</strong>
              <button
                onClick={() => setShowIosPrompt(false)}
                className="text-slate-400 hover:text-slate-200 text-sm px-1 leading-none"
                title="Dismiss"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-300 mt-1 leading-relaxed">
              Tap the Safari <strong>Share</strong> button (box with up arrow), then tap <strong>"Add to Home Screen"</strong> to run DawnTactics as a full-screen app!
            </p>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeModule={activeModule}
        onChangeModule={setActiveModule}
      />

      {/* Footer */}
      <footer className="border-t border-surface-border bg-surface-subtle/80 py-6 text-center text-xs text-slate-400 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-gold-400 font-['Cinzel',serif]">DAWNTACTICS AI</span>
            <span>• Land of Dawn Competitive Strategy Engine</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Dedicated to high-rank Mythical Immortal & MPL competitive drafting excellence.
          </p>
        </div>
      </footer>
    </div>
  );
};
