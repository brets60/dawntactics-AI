import React, { useState, useEffect } from 'react';
import { 
  Download, Smartphone, Monitor, CheckCircle, Copy, 
  Sparkles, Shield, X, ArrowDownToLine, Package, Apple, Share2, PlusSquare
} from 'lucide-react';
import { soundManager } from '../../services/sound';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedIosLink, setCopiedIosLink] = useState(false);

  const isIos = typeof navigator !== 'undefined' && (
    /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );

  // Listen for native PWA install prompt
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsPwaInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsPwaInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    soundManager.playLockIn();
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsPwaInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instruction for browsers without active prompt
      alert('To install on Desktop or Mobile:\n\n• On iPhone/iPad (Safari): Tap Share ➔ "Add to Home Screen".\n• On Chrome/Edge: Click the install icon (⊕) on the right side of your address bar or press Menu (⋮) -> "Install DawnTactics AI".');
    }
  };

  const handleCopyLink = () => {
    soundManager.playClick();
    const downloadUrl = window.location.origin + '/DawnTactics.apk';
    navigator.clipboard.writeText(downloadUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyIosLink = () => {
    soundManager.playClick();
    const appUrl = window.location.origin + '/';
    navigator.clipboard.writeText(appUrl);
    setCopiedIosLink(true);
    setTimeout(() => setCopiedIosLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-surface border border-gold-500/50 rounded-2xl w-full max-w-2xl shadow-mythic-glow overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-surface-border bg-gradient-to-r from-surface to-surface-elevated flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 via-gold-500 to-amber-700 flex items-center justify-center shadow-mythic-gold border border-gold-300/40 p-2 shrink-0">
              <img src="/icon-192.png" alt="DawnTactics Icon" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-100 font-['Cinzel',serif] tracking-wider">
                  Download Standalone App
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                  IPHONE & ANDROID READY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Official DawnTactics AI Standalone App for iPhone, Android & Desktop
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-surface-elevated hover:bg-surface text-slate-400 hover:text-slate-100 flex items-center justify-center font-bold transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 scrollbar-thin">
          
          {/* Apple iPhone & iPad Section */}
          <div className={`rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all ${
            isIos 
              ? 'bg-surface-elevated border-2 border-sky-400/80' 
              : 'bg-surface-subtle border border-sky-500/30 hover:border-sky-500/50'
          }`}>
            <div className="absolute top-0 right-0 bg-sky-500 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-bl-lg shadow">
              {isIos ? 'DETECTED ON IPHONE' : 'APPLE IPHONE & IPAD'}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm font-['Cinzel',serif]">
                  <Apple className="w-4 h-4 text-sky-400" />
                  <span>Apple iPhone & iPad (iOS App)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Install directly on iPhone & iPad without the App Store. Runs in full-screen native mode, works offline, and features the Flora-style DawnOracle AI.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
                  <span className="px-2 py-0.5 rounded bg-canvas border border-sky-500/30 text-sky-300 font-bold">
                    iOS 14.0+
                  </span>
                  <span>•</span>
                  <span>Safari PWA & Apple Profile</span>
                  <span>•</span>
                  <span className="text-emerald-400">100% Offline</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href="/DawnTactics.mobileconfig"
                  download="DawnTactics.mobileconfig"
                  onClick={() => soundManager.playLockIn()}
                  className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02] text-center"
                >
                  <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
                  <span>DOWNLOAD IOS PROFILE</span>
                </a>

                <button
                  onClick={handleCopyIosLink}
                  className="px-3 py-1.5 rounded-lg bg-canvas hover:bg-surface text-slate-300 hover:text-sky-300 border border-surface-border text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  {copiedIosLink ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIosLink ? 'iPhone Link Copied!' : 'Copy iPhone Link'}</span>
                </button>
              </div>
            </div>

            {/* iOS Safari Install Steps */}
            <div className="mt-3.5 pt-3 border-t border-sky-500/20 text-[11px] text-slate-300 space-y-1">
              <strong className="text-sky-300 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> How to install on your iPhone via Safari:
              </strong>
              <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-400">
                <li>Open this site in <strong className="text-slate-200">Safari</strong> on your iPhone.</li>
                <li>Tap the <strong className="text-slate-200">Share button</strong> (square box with up arrow at the bottom).</li>
                <li>Scroll down and tap <strong className="text-slate-200">"Add to Home Screen"</strong>.</li>
                <li>Tap <strong className="text-slate-200">Add</strong> — the DawnTactics icon installs immediately on your iPhone!</li>
              </ol>
            </div>
          </div>

          {/* Android APK Section */}
          <div className="bg-surface-elevated border-2 border-gold-500/60 rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-gold-500 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-0.5 rounded-bl-lg shadow">
              FOR ANDROID
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center space-x-2 text-gold-400 font-bold text-sm font-['Cinzel',serif]">
                  <Smartphone className="w-4 h-4 text-gold-400" />
                  <span>DawnTactics Android APK (144.5 MB)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full standalone Android application. Includes offline draft engine, sound effects, esports announcer, and itemization database.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
                  <span className="px-2 py-0.5 rounded bg-canvas border border-surface-border text-emerald-400 font-bold">
                    File: DawnTactics.apk
                  </span>
                  <span>•</span>
                  <span>Size: 144.5 MB</span>
                  <span>•</span>
                  <span>Android 7.0+</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <a
                  href="/DawnTactics.apk"
                  download="DawnTactics.apk"
                  onClick={() => soundManager.playLockIn()}
                  className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs tracking-wider shadow-mythic-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.02] text-center"
                >
                  <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
                  <span>DOWNLOAD APK</span>
                </a>

                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-canvas hover:bg-surface text-slate-300 hover:text-gold-400 border border-surface-border text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  {copiedLink ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Link'}</span>
                </button>
              </div>
            </div>

            {/* Android Install Instructions accordion */}
            <div className="mt-3.5 pt-3 border-t border-surface-border/60 text-[11px] text-slate-400 space-y-1">
              <strong className="text-slate-300">Quick Android install:</strong>
              <ol className="list-decimal list-inside space-y-0.5 pl-1 text-slate-400">
                <li>Tap <strong>Download APK</strong> above on your Android phone.</li>
                <li>Tap <strong>Open</strong> in notifications when download completes.</li>
                <li>Allow <em>"Install unknown apps"</em> if prompted, then tap <strong>Install</strong>.</li>
              </ol>
            </div>
          </div>

          {/* Windows & Desktop App Section */}
          <div className="bg-surface-subtle border border-surface-border hover:border-gold-500/40 rounded-xl p-4 sm:p-5 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2 text-sky-400 font-bold text-sm font-['Cinzel',serif]">
                  <Monitor className="w-4 h-4 text-sky-400" />
                  <span>Windows & Mac Desktop App (PWA)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Install as a standalone native-style desktop app on Windows, macOS, Chrome, or Edge. Runs in its own dedicated window without browser bars.
                </p>
              </div>

              <button
                onClick={handleInstallPWA}
                disabled={isPwaInstalled}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shrink-0 ${
                  isPwaInstalled
                    ? 'bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 cursor-default'
                    : 'bg-surface-elevated hover:bg-gold-500/20 text-slate-200 hover:text-gold-300 border border-surface-borderLight hover:border-gold-500/50 shadow-sm'
                }`}
              >
                {isPwaInstalled ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>APP INSTALLED</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-gold-400" />
                    <span>INSTALL DESKTOP APP</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-subtle/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Shield className="w-4 h-4 text-gold-400" />
            <span>Multi-Platform: iOS Safari PWA + Android APK + Desktop</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface text-slate-300 hover:text-slate-100 font-semibold border border-surface-border transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
