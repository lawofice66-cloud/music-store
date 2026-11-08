import React, { useState } from 'react';
import { X, ShieldCheck, Check, Ban, Sparkles, FileText, Download, Disc, HelpCircle, ExternalLink } from 'lucide-react';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'released' | 'unreleased';
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'released',
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'comparison' | 'released' | 'unreleased'>('comparison');

  return (
    <div
      id="license-terms-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl border border-neutral-800 bg-[#0c0e17] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-6 py-4 bg-[#0a0b12]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-wide">
                Conditions des 2 Types de Licence
              </h2>
              <p className="text-xs text-neutral-400 font-medium">
                FALLEN 75 FRANCE • Droits d'exploitation officiels avant achat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-[#090a0f] px-6 pt-3 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'comparison'
                ? 'bg-[#121522] text-amber-400 border-t-2 border-amber-400 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Tableau Comparatif des 2 Licences</span>
          </button>
          <button
            onClick={() => setActiveTab('released')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'released'
                ? 'bg-[#121522] text-rose-400 border-t-2 border-rose-400 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
            }`}
          >
            <span>🔴 Licence Released ($0.99 USD)</span>
          </button>
          <button
            onClick={() => setActiveTab('unreleased')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'unreleased'
                ? 'bg-[#121522] text-emerald-400 border-t-2 border-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
            }`}
          >
            <span>🟢 Licence Inédite ($2.49 USD)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-neutral-200">
          {/* TAB 1: COMPARATIVE TABLE */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              {/* Highlight summary card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Released Card */}
                <div className="rounded-2xl border border-rose-500/40 bg-rose-950/20 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-extrabold text-rose-300 border border-rose-500/30">
                      🔴 MORCEAUX SORTIS (RELEASED)
                    </span>
                    <span className="font-mono text-lg font-black text-white">$0.99 USD</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Idéal pour les créateurs de contenu, vidéos sociales et fêtes privées.
                  </p>
                  <div className="text-xs space-y-1.5 pt-2 border-t border-rose-500/20">
                    <div className="flex items-center gap-2 text-rose-300 font-bold">
                      <Ban className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>Distribution streaming INTERDITE (Spotify, Apple...)</span>
                    </div>
                    <div className="flex items-center gap-2 text-rose-300 font-bold">
                      <Ban className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>Synchronisation audiovisuelle INTERDITE (Films, Pubs, TV)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>Tout le reste AUTORISÉ (TikTok, YouTube, Facebook, DJ, Soirées)</span>
                    </div>
                  </div>
                </div>

                {/* Unreleased Card */}
                <div className="rounded-2xl border border-emerald-500/50 bg-emerald-950/25 p-4 space-y-2 shadow-lg shadow-emerald-950/30">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-extrabold text-emerald-300 border border-emerald-500/40">
                      🟢 MORCEAUX INÉDITS (UNRELEASED)
                    </span>
                    <span className="font-mono text-lg font-black text-emerald-300">$2.49 USD</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Production studio inédite complète avec droits commerciaux intégraux.
                  </p>
                  <div className="text-xs space-y-1.5 pt-2 border-t border-emerald-500/20">
                    <div className="flex items-center gap-2 text-emerald-300 font-black">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>TOUT EST 100% AUTORISÉ SANS RESTRICTION</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>Distribution streaming AUTORISÉE (Spotify, Apple, Deezer)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>Synchronisation complète AUTORISÉE (Films, Séries, TV, Pubs)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Comparative Table */}
              <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#090a10]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121522] text-neutral-300 uppercase tracking-wider text-[11px] font-bold border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">Droits &amp; Utilisations</th>
                      <th className="p-3.5 text-rose-300">🔴 Released ($0.99 USD)</th>
                      <th className="p-3.5 text-emerald-300 font-black">🟢 Inédites ($2.49 USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 font-medium">
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Fichiers Audio Livrés</td>
                      <td className="p-3.5 text-neutral-300 font-mono">HQ MP3 320kbps</td>
                      <td className="p-3.5 text-emerald-300 font-mono font-bold">24-bit WAV Master + MP3 320k</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Réseaux Sociaux (TikTok, Reels, Shorts)</td>
                      <td className="p-3.5 text-emerald-400 font-bold">✅ Autorisé (Monétisation 100%)</td>
                      <td className="p-3.5 text-emerald-400 font-bold">✅ Autorisé (Monétisation 100%)</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">YouTube &amp; Vidéos Web</td>
                      <td className="p-3.5 text-emerald-400 font-bold">✅ Autorisé (Toutes vidéos)</td>
                      <td className="p-3.5 text-emerald-400 font-bold">✅ Autorisé (Toutes vidéos)</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Soirées, DJ Sets, Clubs &amp; Événements</td>
                      <td className="p-3.5 text-emerald-400 font-bold">✅ Autorisé</td>
                      <td className="p-3.5 text-emerald-400 font-bold">✅ Autorisé</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30 bg-rose-950/10">
                      <td className="p-3.5 font-bold text-white">
                        Distribution Plateformes (Spotify, Apple, Deezer...)
                      </td>
                      <td className="p-3.5 text-rose-400 font-extrabold flex items-center gap-1.5">
                        <Ban className="h-4 w-4 shrink-0 text-rose-400" />
                        <span>INTERDIT</span>
                      </td>
                      <td className="p-3.5 text-emerald-300 font-extrabold">
                        ✅ AUTORISÉ (Illimité)
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30 bg-rose-950/10">
                      <td className="p-3.5 font-bold text-white">
                        Synchronisation Audiovisuelle (Films, TV, Pubs, Cinéma)
                      </td>
                      <td className="p-3.5 text-rose-400 font-extrabold flex items-center gap-1.5">
                        <Ban className="h-4 w-4 shrink-0 text-rose-400" />
                        <span>INTERDIT</span>
                      </td>
                      <td className="p-3.5 text-emerald-300 font-extrabold">
                        ✅ AUTORISÉ (Tous médias)
                      </td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Enregistrement Vocal &amp; Radio Broadcast</td>
                      <td className="p-3.5 text-neutral-400">Non inclus</td>
                      <td className="p-3.5 text-emerald-300 font-bold">✅ 100% Inclus</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Durée &amp; Territoire de la Licence</td>
                      <td className="p-3.5 text-neutral-300">Monde entier • Perpétuel (À vie)</td>
                      <td className="p-3.5 text-emerald-300 font-bold">Monde entier • Perpétuel (À vie)</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Certificat Officiel PDF</td>
                      <td className="p-3.5 text-neutral-300">✅ Certificat PDF Standard</td>
                      <td className="p-3.5 text-emerald-300 font-bold">✅ Certificat Master Commercial PDF</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED RELEASED LICENSE */}
          {activeTab === 'released' && (
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 to-neutral-900 p-5">
                <div className="flex items-center gap-2 text-rose-300 font-black text-base">
                  <span>🔴 LICENCE MORCEAU SORTI (RELEASED TRACK) — $0.99 USD</span>
                </div>
                <p className="mt-2 text-neutral-300 text-xs sm:text-sm">
                  Cette licence s'applique à tous les morceaux du catalogue <strong>Released (89 titres)</strong>. Elle est conçue pour les créateurs de contenu indépendants, vidéastes et DJs souhaitant utiliser des productions de haute qualité sans payer de frais de synchronisation élevés.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-neutral-800 bg-[#0d0f18] p-5">
                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wide flex items-center gap-2">
                  <Ban className="h-4 w-4 text-rose-400" />
                  <span>Ce qui est STRICTEMENT INTERDIT sous cette licence ($0.99 USD) :</span>
                </h4>
                <ul className="space-y-2 text-neutral-300 pl-4 list-disc marker:text-rose-400">
                  <li>
                    <strong className="text-rose-300">Interdiction de Distribution :</strong> Vous n'avez pas le droit de distribuer ou publier le titre tel quel sur les plateformes de streaming musical (Spotify, Apple Music, Deezer, Tidal, Amazon Music, etc.).
                  </li>
                  <li>
                    <strong className="text-rose-300">Interdiction de Synchronisation Commerciale :</strong> La synchronisation audiovisuelle avec des films de cinéma, des séries télévisées, des documentaires à diffusion nationale/internationale ou des publicités de marque est interdite.
                  </li>
                </ul>
              </div>

              <div className="space-y-3 rounded-2xl border border-neutral-800 bg-[#0d0f18] p-5">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Tout le reste est 100% AUTORISÉ :</span>
                </h4>
                <ul className="space-y-2 text-neutral-300 pl-4 list-disc marker:text-emerald-400">
                  <li>
                    <strong className="text-white">Réseaux Sociaux :</strong> Utilisation et monétisation complète sur TikTok, Instagram Reels, Facebook, YouTube Shorts, vlogs et podcasts.
                  </li>
                  <li>
                    <strong className="text-white">Événements &amp; DJs :</strong> Diffusion en direct autorisée lors de soirées, clubs, sets DJ, festivals, mariages et célébrations.
                  </li>
                  <li>
                    <strong className="text-white">Usage Personnel &amp; Créatif :</strong> Écoute haute fidélité, projets étudiants, vidéos personnelles non commerciales.
                  </li>
                  <li>
                    <strong className="text-white">Garantie :</strong> Licence mondiale à vie (perpétuelle), sans redevance supplémentaire.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: DETAILED UNRELEASED / INÉDITE LICENSE */}
          {activeTab === 'unreleased' && (
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div className="rounded-2xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/50 to-neutral-900 p-5 shadow-lg shadow-emerald-950/20">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-base">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  <span>🟢 LICENCE MORCEAU INÉDIT (UNRELEASED MASTER) — $2.49 USD</span>
                </div>
                <p className="mt-2 text-neutral-200 text-xs sm:text-sm">
                  Cette licence s'applique aux <strong>51 morceaux inédits</strong> du catalogue. Ces productions n'ont jamais été publiées ni commercialisées ailleurs. Sous cette licence, <strong>TOUT EST 100% AUTORISÉ</strong>.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-emerald-500/30 bg-[#0d0f18] p-5">
                <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>TOUT EST 100% AUTORISÉ (Droits Commerciaux Complets) :</span>
                </h4>
                <ul className="space-y-2.5 text-neutral-300 pl-4 list-disc marker:text-emerald-400">
                  <li>
                    <strong className="text-emerald-300">Distribution Mondiale Autorisée :</strong> Vous pouvez enregistrer votre voix et distribuer librement votre chanson sur Spotify, Apple Music, Deezer, YouTube Music, Amazon, Tidal et toutes plateformes sans aucune restriction.
                  </li>
                  <li>
                    <strong className="text-emerald-300">Synchronisation Audiovisuelle Totale :</strong> Utilisation commerciale illimitée pour films de cinéma, séries TV, publicités, jeux vidéo, documentaires et plateformes de streaming (Netflix, Prime Video, etc.).
                  </li>
                  <li>
                    <strong className="text-emerald-300">Monétisation Intégrale :</strong> 100% des revenus publicitaires, royalties de streaming et cachets de synchronisation vous reviennent.
                  </li>
                  <li>
                    <strong className="text-emerald-300">Diffusion &amp; Concerts :</strong> Passages radio FM/Web, concerts, tournées et diffusion télévisée autorisés mondialement.
                  </li>
                  <li>
                    <strong className="text-emerald-300">Fichiers Fournis :</strong> Master Studio non compressé 24-Bit / 48kHz WAV + MP3 320kbps haute résolution + Certificat officiel de licence PDF délivré immédiatement.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-800/80 px-6 py-4 bg-[#0a0b12]">
          <div className="text-xs text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Contrat de licence certifié par FALLEN 75 FRANCE (AA2026)</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold px-6 py-2.5 text-xs transition-all shadow-md cursor-pointer"
          >
            J'ai compris &amp; Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
