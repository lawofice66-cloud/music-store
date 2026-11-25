import React, { useEffect, useState } from 'react';
import {
  X,
  Cloud,
  Shield,
  ArrowLeft,
  Download,
  FolderArchive,
  ExternalLink,
  Zap,
  CheckCircle2,
  FileCode,
  Copy,
  Check,
} from 'lucide-react';

interface CloudflareGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareGuideModal: React.FC<CloudflareGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedCmd, setCopiedCmd] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const copyGitCommand = () => {
    const text = `git init\ngit add .\ngit commit -m "FALLEN75 - fallen75.com storefront"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USER/fallen75.git\ngit push -u origin main`;
    navigator.clipboard.writeText(text);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      id="guide-modal-backdrop"
    >
      <div
        id="guide-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl my-6 rounded-2xl border border-neutral-800 bg-[#0f111a] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#141724]">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              id="back-to-store-guide-header-btn"
              className="flex items-center gap-1.5 rounded-xl border border-neutral-700/80 bg-neutral-800/80 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-all cursor-pointer mr-1"
              title="Back to store"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden xs:inline">Back</span>
            </button>

            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Cloudflare Deployment & Source Archive
              </h2>
              <p className="text-xs text-neutral-400">
                fallen75.com • Single Cloudflare deployment ready
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-xl p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer border border-neutral-800 hover:border-neutral-700"
            aria-label="Close"
            title="Close (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-5 sm:p-6 space-y-6 text-xs text-neutral-300 max-h-[80vh] overflow-y-auto">
          
          {/* SECTION TÉLÉCHARGEMENT DIRECT DES PACKAGES ZIP */}
          <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-[#12141f] to-[#0c0d14] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <FolderArchive className="h-5 w-5" />
                <span>Download Full Archives</span>
              </div>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                Cloudflare Workers &amp; Assets
              </span>
            </div>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Download the complete deployment package for fallen75.com:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <a
                href="/api/download/cloudflare-zip"
                download="fallen75-cloudflare.zip"
                id="btn-download-cf-pages-zip"
                className="group flex flex-col justify-between rounded-xl border border-amber-500/60 bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-black shadow-lg shadow-amber-500/20 hover:scale-[1.01] hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between font-black text-sm text-black mb-1">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 fill-black" />
                      Cloudflare Full-Stack Package (ZIP)
                    </span>
                    <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] font-semibold text-black/80 leading-snug">
                    Compiled assets + Worker + D1/R2 schema + <code>wrangler.toml</code>.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-black/15 pt-2 text-[10px] font-black text-black/90">
                  <span>Ready for Cloudflare</span>
                  <span className="bg-black/20 rounded px-1.5 py-0.5">ZIP</span>
                </div>
              </a>

              <a
                href="/api/download/source-zip"
                download="fallen75-source.zip"
                id="btn-download-source-zip"
                className="group flex flex-col justify-between rounded-xl border border-neutral-700 bg-neutral-900/90 p-4 text-white hover:border-amber-400/80 hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between font-bold text-sm text-white mb-1 group-hover:text-amber-400 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <FileCode className="h-4 w-4 text-amber-400" />
                      Complete Source Code (Git Repo)
                    </span>
                    <Download className="h-4 w-4 text-neutral-400 group-hover:text-amber-400 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug">
                    Full React, TypeScript, Vite, Worker, and Creem configuration source code.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-2 text-[10px] text-neutral-400">
                  <span>For GitHub CI/CD &amp; Local Dev</span>
                  <span className="bg-neutral-800 rounded px-1.5 py-0.5 text-neutral-300">ZIP</span>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-[#090a0f] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black text-xs font-black">
                  1
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Deploy via GitHub &amp; Wrangler
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-400">Recommended</span>
            </div>

            <div className="relative">
              <pre className="rounded-xl bg-black/80 p-3.5 font-mono text-[11px] text-amber-300 overflow-x-auto leading-relaxed border border-neutral-800">
git init{'\n'}
git add .{'\n'}
git commit -m "FALLEN75 - fallen75.com storefront"{'\n'}
git branch -M main{'\n'}
git remote add origin https://github.com/YOUR_USER/fallen75.git{'\n'}
git push -u origin main
              </pre>
              <button
                onClick={copyGitCommand}
                className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-neutral-800/90 border border-neutral-700 px-2.5 py-1 text-[10px] font-bold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-all cursor-pointer"
              >
                {copiedCmd ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 text-neutral-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div className="text-[11px] text-neutral-400">
              Single deployment for <code className="text-amber-300 font-mono">fallen75.com</code> via Cloudflare Workers.
            </div>
            <button
              onClick={onClose}
              className="rounded-xl bg-neutral-800 hover:bg-neutral-700 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer border border-neutral-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

