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
    const text = `git init\ngit add .\ngit commit -m "FALLEN 75 FRANCE – Storefront AA2026"\ngit branch -M main\ngit remote add origin https://github.com/VOTRE_PSEUDO/fallen-75-france.git\ngit push -u origin main`;
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
              title="Retour à la boutique"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden xs:inline">Retour</span>
            </button>

            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Déploiement Cloudflare Pages & Téléchargement ZIP
              </h2>
              <p className="text-xs text-neutral-400">
                Site complet prêt à l'emploi • Hébergement 100% gratuit & mondial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-xl p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer border border-neutral-800 hover:border-neutral-700"
            aria-label="Fermer"
            title="Fermer (Esc)"
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
                <span>Téléchargement des archives complètes</span>
              </div>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                Full-Stack Pages & D1 / R2
              </span>
            </div>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Téléchargez le package complet prêt pour Cloudflare Pages (Frontend + Pages Functions + D1 + R2 + Schéma SQL des 93 morceaux) :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Option 1: ZIP Complet Cloudflare Pages & Functions */}
              <a
                href="/api/download/cloudflare-zip"
                download="fallen75france-cloudflare-pages.zip"
                id="btn-download-cf-pages-zip"
                className="group flex flex-col justify-between rounded-xl border border-amber-500/60 bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-black shadow-lg shadow-amber-500/20 hover:scale-[1.01] hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between font-black text-sm text-black mb-1">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 fill-black" />
                      Package Cloudflare Full-Stack (ZIP)
                    </span>
                    <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] font-semibold text-black/80 leading-snug">
                    Assets compilés (HTML/JS/CSS) + dossier <code>/functions</code> (API D1/R2, Auth, Upload, Streaming, Download) + <code>schema.sql</code> (93 morceaux) + <code>wrangler.toml</code>.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-black/15 pt-2 text-[10px] font-black text-black/90">
                  <span>Prêt pour Pages Functions & D1</span>
                  <span className="bg-black/20 rounded px-1.5 py-0.5">~370 KB</span>
                </div>
              </a>

              {/* Option 2: Code Source Complet */}
              <a
                href="/api/download/source-zip"
                download="fallen75france-full-source.zip"
                id="btn-download-source-zip"
                className="group flex flex-col justify-between rounded-xl border border-neutral-700 bg-neutral-900/90 p-4 text-white hover:border-amber-400/80 hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between font-bold text-sm text-white mb-1 group-hover:text-amber-400 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <FileCode className="h-4 w-4 text-amber-400" />
                      Code Source Complet (Git Repo)
                    </span>
                    <Download className="h-4 w-4 text-neutral-400 group-hover:text-amber-400 group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-snug">
                    L'intégralité du code source React, TypeScript, Vite, Express, Pages Functions, scripts et configuration pour pousser sur GitHub.
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-2 text-[10px] text-neutral-400">
                  <span>Pour GitHub CI/CD & Dev Local</span>
                  <span className="bg-neutral-800 rounded px-1.5 py-0.5 text-neutral-300">~360 KB</span>
                </div>
              </a>
            </div>
          </div>

          {/* AVERTISSEMENT IMPORTANT: STATIC VS FUNCTIONS D1/R2 */}
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Shield className="h-4 w-4 shrink-0" />
              <span>Précision importante sur l'hébergement Cloudflare</span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Le simple glisser-déposer d'un dossier dans l'interface web de Cloudflare déploie uniquement la couche statique (HTML/CSS/JS). Pour que vos <strong>Pages Functions</strong> avec les bindings <strong>D1 (SQL)</strong> et <strong>R2 (stockage média & downloads)</strong> soient actives en production, vous devez lier votre dépôt via <strong>Git (GitHub/GitLab)</strong> ou utiliser la commande <strong>Wrangler CLI</strong>.
            </p>
          </div>

          {/* METHODE 1: CONNEXION GITHUB AUTOMATIQUE (RECOMMANDÉE POUR FUNCTIONS + D1 + R2) */}
          <div className="rounded-2xl border border-neutral-800 bg-[#090a0f] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black text-xs font-black">
                  1
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Méthode recommandée : Connexion GitHub (Full-Stack avec Functions D1/R2)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-400">Recommandé</span>
            </div>

            <ol className="space-y-3 text-neutral-300">
              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-amber-400 text-xs font-bold mt-0.5">a</span>
                <div>
                  Poussez le code sur votre dépôt GitHub :
                  <div className="relative mt-2">
                    <pre className="rounded-xl bg-black/80 p-3.5 font-mono text-[11px] text-amber-300 overflow-x-auto leading-relaxed border border-neutral-800">
git init{'\n'}
git add .{'\n'}
git commit -m "FALLEN 75 FRANCE – Storefront AA2026"{'\n'}
git branch -M main{'\n'}
git remote add origin https://github.com/VOTRE_PSEUDO/fallen-75-france.git{'\n'}
git push -u origin main
                    </pre>
                    <button
                      onClick={copyGitCommand}
                      className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-neutral-800/90 border border-neutral-700 px-2.5 py-1 text-[10px] font-bold text-neutral-200 hover:text-white hover:bg-neutral-700 transition-all cursor-pointer"
                    >
                      {copiedCmd ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span>Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-neutral-400" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-amber-400 text-xs font-bold mt-0.5">b</span>
                <div>
                  Sur <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">dash.cloudflare.com</a>, cliquez sur <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong> &gt; <strong>Connect to Git</strong>.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-amber-400 text-xs font-bold mt-0.5">c</span>
                <div>
                  Paramètres de build : Framework = <code className="text-amber-300">Vite</code>, Build command = <code className="text-amber-300 font-mono">npm run build</code>, Output directory = <code className="text-amber-300 font-mono">dist</code>.
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-amber-400 text-xs font-bold mt-0.5">d</span>
                <div>
                  <strong>Liez vos ressources D1 et R2</strong> dans <strong>Settings &gt; Functions</strong> :
                  <ul className="list-disc list-inside mt-1 space-y-0.5 text-neutral-400">
                    <li><strong className="text-white">D1 database bindings</strong> : Variable = <code className="text-amber-300 font-mono">DB</code>, Base = <code className="text-amber-300 font-mono">fallen75-db</code></li>
                    <li><strong className="text-white">R2 bucket bindings</strong> : Variable = <code className="text-amber-300 font-mono">R2_BUCKET</code>, Bucket = <code className="text-amber-300 font-mono">music-2026</code></li>
                    <li><strong className="text-white">Variables d'environnement</strong> : <code className="text-amber-300 font-mono">ADMIN_PASSWORD = 12344321</code></li>
                  </ul>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold mt-0.5">e</span>
                <div>
                  <strong>Initialisez la base D1 avec les 93 morceaux</strong> en lançant dans votre terminal :
                  <pre className="mt-1.5 rounded-lg bg-black/60 p-2 font-mono text-[11px] text-emerald-300 border border-neutral-800">
npx wrangler d1 execute fallen75-db --file=./schema.sql
                  </pre>
                </div>
              </li>
            </ol>
          </div>

          {/* METHODE 2: DEPLOIEMENT DIRECT VIA WRANGLER CLI */}
          <div className="rounded-2xl border border-neutral-800 bg-[#090a0f] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 text-xs font-bold">
                  2
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Méthode alternative : Déploiement direct via Wrangler CLI
                </h3>
              </div>
              <span className="text-[11px] text-neutral-400">Ligne de commande sans Git</span>
            </div>

            <p className="text-neutral-400">
              Décompressez le ZIP et déployez directement le frontend et les Pages Functions :
            </p>

            <pre className="rounded-xl bg-black/80 p-3.5 font-mono text-[11px] text-amber-300 overflow-x-auto leading-relaxed border border-neutral-800">
# 1. Installer wrangler et se connecter{'\n'}
npm install -g wrangler{'\n'}
wrangler login{'\n\n'}
# 2. Initialiser la base D1 avec le schéma et les 93 morceaux{'\n'}
npx wrangler d1 execute fallen75-db --file=./schema.sql{'\n\n'}
# 3. Déployer sur Cloudflare Pages avec Functions{'\n'}
npx wrangler pages deploy dist --project-name=fallen-75-france
            </pre>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div className="text-[11px] text-neutral-400">
              Un guide détaillé complet est également disponible dans le fichier <code className="text-amber-300 font-mono">DEPLOY_CLOUDFLARE.md</code> inclus dans l'archive.
            </div>
            <button
              onClick={onClose}
              className="rounded-xl bg-neutral-800 hover:bg-neutral-700 px-5 py-2.5 text-xs font-bold text-white transition-all cursor-pointer border border-neutral-700"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

