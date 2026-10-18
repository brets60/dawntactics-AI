import React, { useState } from 'react';
import { Shield, Sparkles, Volume2, VolumeX, RotateCcw, Swords, ChevronDown, Check, Smartphone, Download, HelpCircle, BookOpen } from 'lucide-react';
import { soundManager } from '../../services/sound';
import { PRESET_DRAFTS, PresetDraft } from '../../data/tacticalKnowledge';
import { DownloadAppModal } from './DownloadAppModal';
import { QuickGuideModal } from './QuickGuideModal';
import { GeminiKeyModal } from './GeminiKeyModal';
import { GeminiService } from '../../services/gemini';
import { Key } from 'lucide-react';

interface HeaderProps {
  onLoadPreset: (preset: PresetDraft) => void;
  onResetDraft: () => void;
  serverOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onLoadPreset, onResetDraft, serverOnline }) => {
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [presetDropdownOpen, setPresetDropdownOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [quickGuideOpen, setQuickGuideOpen] = useState(false);
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);
  const [hasGeminiKey, setHasGeminiKey] = useState(GeminiService.hasKey());

  const toggleSfx = () => {
    soundManager.enabled = !sfxEnabled;
    setSfxEnabled(!sfxEnabled);
    if (!sfxEnabled) {
      soundManager.playClick();
    }
  };

  return (
    <header className="border-b border-surface-border bg-surface-subtle/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shadow-mythic-gold border border-gold-400/50 shrink-0 bg-surface-elevated p-0.5">
            <img src="/icon-192.png" alt="DawnTactics AI Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-400 to-amber-500 font-['Cinzel',serif]">
                DAWNTACTICS AI
              </span>
              <span className="hidden xs:inline-flex px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider bg-gold-500/20 text-gold-400 rounded border border-gold-500/30 items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Mythic Engine
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden md:block">
              Land of Dawn Draft Intelligence, Reactive Itemization & Emblem Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2.5">
          {/* Quick Guide Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setQuickGuideOpen(true);
            }}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm"
            title="How to Use DawnTactics AI (Easy 4-Step Guide)"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Quick Guide</span>
          </button>

          {/* Preset Drafts Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playClick();
                setPresetDropdownOpen(!presetDropdownOpen);
              }}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-surface border border-surface-border hover:border-gold-500/50 text-xs font-semibold text-slate-200 hover:text-gold-400 transition-colors shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-gold-400" />
              <span className="hidden md:inline">Preset Drafts ({PRESET_DRAFTS.length})</span>
              <span className="md:hidden hidden sm:inline">Presets</span>
              <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${presetDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {presetDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-elevated border border-surface-borderLight rounded-xl shadow-2xl z-50 p-2 max-h-[75vh] overflow-y-auto scrollbar-thin">
                <div className="px-3 py-2 text-[11px] font-bold text-gold-400 uppercase tracking-wider flex items-center justify-between border-b border-surface-border">
                  <span>Tournament & Meta Presets (5 Bans)</span>
                  <span className="text-[10px] text-slate-500 font-mono">10 Scenarios</span>
                </div>
                <div className="py-1 space-y-1">
                  {PRESET_DRAFTS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        soundManager.playLockIn();
                        onLoadPreset(preset);
                        setPresetDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-surface text-xs text-slate-200 hover:text-gold-400 flex flex-col group transition-all border border-transparent hover:border-surface-border"
                    >
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <span className="font-bold group-hover:text-gold-300 truncate text-slate-100">
                          {preset.name}
                        </span>
                        {preset.category && (
                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30 shrink-0">
                            {preset.category}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {preset.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Google Gemini AI Settings Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setGeminiModalOpen(true);
            }}
            className={`flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm border ${
              hasGeminiKey
                ? 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border-cyan-500/40 shadow-cyan-900/30'
                : 'bg-surface hover:bg-surface-elevated text-slate-300 hover:text-cyan-300 border-surface-border hover:border-cyan-500/40'
            }`}
            title="Configure Google Gemini AI Key"
          >
            <Sparkles className={`w-3.5 h-3.5 ${hasGeminiKey ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">Gemini AI</span>
            <span className={`w-1.5 h-1.5 rounded-full ${hasGeminiKey ? 'bg-cyan-400' : 'bg-slate-500'}`} />
          </button>

          {/* Download Standalone App Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              setDownloadModalOpen(true);
            }}
            className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-slate-950 border border-gold-500/40 hover:border-gold-400 text-xs font-bold transition-all shadow-sm group"
            title="Download Standalone Android APK & Install Desktop App"
          >
            <Smartphone className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Download App</span>
          </button>

          {/* Reset Draft */}
          <button
            onClick={() => {
              soundManager.playClick();
              onResetDraft();
            }}
            title="Reset All Draft Picks"
            className="p-1.5 sm:p-2 rounded-lg bg-surface border border-surface-border hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-colors text-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Reset</span>
          </button>

          {/* SFX Toggle */}
          <button
            onClick={toggleSfx}
            title={sfxEnabled ? "Mute SFX" : "Unmute SFX"}
            className="p-1.5 sm:p-2 rounded-lg bg-surface border border-surface-border hover:border-gold-500/40 text-slate-400 hover:text-gold-400 transition-colors"
          >
            {sfxEnabled ? <Volume2 className="w-4 h-4 text-gold-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Engine Status indicator */}
          <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-surface border border-surface-border text-[11px] font-medium text-slate-300">
            <span className={`w-2 h-2 rounded-full ${hasGeminiKey ? 'bg-cyan-400' : 'bg-emerald-500'} animate-pulse`} />
            <span className="hidden lg:inline">{hasGeminiKey ? 'Gemini AI Live' : 'Offline Engine'}</span>
          </div>
        </div>
      </div>

      {/* Standalone App Download & Installation Modal */}
      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Beginner & Quick Guide Modal */}
      <QuickGuideModal
        isOpen={quickGuideOpen}
        onClose={() => setQuickGuideOpen(false)}
        onSelectPreset={onLoadPreset}
      />

      {/* Google Gemini AI Key Modal */}
      <GeminiKeyModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        onKeyUpdated={() => setHasGeminiKey(GeminiService.hasKey())}
      />
    </header>
  );
};
