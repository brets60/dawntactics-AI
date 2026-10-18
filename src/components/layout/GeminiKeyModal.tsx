import React, { useState, useEffect } from 'react';
import { 
  Key, Sparkles, CheckCircle2, AlertCircle, X, ExternalLink, 
  Trash2, ShieldCheck, Cpu, RefreshCw, Eye, EyeOff 
} from 'lucide-react';
import { GeminiService } from '../../services/gemini';
import { soundManager } from '../../services/sound';

interface GeminiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: () => void;
}

export const GeminiKeyModal: React.FC<GeminiKeyModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated
}) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(GeminiService.getApiKey());
      setStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setStatusMessage({ success: false, text: 'Please enter a Gemini API key first.' });
      return;
    }
    setTesting(true);
    setStatusMessage(null);
    soundManager.playClick();

    const result = await GeminiService.testConnection(apiKey);
    setTesting(false);
    if (result.success) {
      soundManager.playLockIn();
      setStatusMessage({ success: true, text: 'Connection Verified! Google Gemini is ready.' });
    } else {
      setStatusMessage({ success: false, text: result.message });
    }
  };

  const handleSave = () => {
    soundManager.playLockIn();
    GeminiService.setApiKey(apiKey);
    setStatusMessage({ success: true, text: 'API Key saved successfully!' });
    if (onKeyUpdated) onKeyUpdated();
    setTimeout(() => {
      onClose();
    }, 700);
  };

  const handleClear = () => {
    soundManager.playClick();
    GeminiService.setApiKey('');
    setApiKey('');
    setStatusMessage({ success: true, text: 'API Key removed. Switched to offline heuristic engine.' });
    if (onKeyUpdated) onKeyUpdated();
  };

  const hasActiveKey = GeminiService.hasKey();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface border border-gold-500/50 rounded-2xl w-full max-w-lg shadow-mythic-glow overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 border-b border-surface-border bg-gradient-to-r from-surface to-surface-elevated flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg border border-cyan-400/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif] tracking-wider">
                  Google Gemini AI Engine
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  hasActiveKey
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {hasActiveKey ? 'ONLINE ACTIVE' : 'OFFLINE MODE'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Grandmaster-Tier Live Tactical Coaching & Esports Intelligence
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-surface text-slate-400 hover:text-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed">
            <p className="flex items-center gap-1.5 font-semibold text-gold-300 mb-1">
              <Cpu className="w-4 h-4 text-gold-400" />
              <span>Hybrid Intelligence System</span>
            </p>
            DawnTactics works <strong>100% offline</strong> by default using its internal matrix engine. Adding your free <strong>Google Gemini API key</strong> unlocks live Grandmaster tactical breakdowns, deep draft explanations, and conversational esports coaching.
          </div>

          {/* Key Input Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-gold-400" />
                <span>Google Gemini API Key</span>
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline underline-offset-2"
              >
                <span>Get Free Key at AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-canvas border border-surface-border focus:border-gold-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none pr-10 font-mono tracking-wide"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
              statusMessage.success
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/30 border-red-500/40 text-red-300'
            }`}>
              {statusMessage.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Instructions Box */}
          <div className="bg-canvas/60 border border-surface-border rounded-xl p-3 text-[11px] text-slate-400 space-y-1">
            <strong className="text-slate-300">How to get your free Gemini Key:</strong>
            <ol className="list-decimal list-inside space-y-0.5 pl-1">
              <li>Visit <span className="text-cyan-400">aistudio.google.com/app/apikey</span></li>
              <li>Sign in with your Google Account</li>
              <li>Click <strong>Create API Key</strong></li>
              <li>Copy and paste the key here</li>
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-subtle/80 flex items-center justify-between gap-2">
          {hasActiveKey ? (
            <button
              onClick={handleClear}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-transparent hover:border-rose-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Key</span>
            </button>
          ) : (
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Stored locally on device</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={testing || !apiKey.trim()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-surface-elevated hover:bg-surface text-slate-300 hover:text-cyan-300 border border-surface-border hover:border-cyan-500/40 disabled:opacity-40 transition-colors flex items-center gap-1.5"
            >
              {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gold-500 hover:bg-gold-400 text-slate-950 shadow-mythic-gold transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save Key</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
