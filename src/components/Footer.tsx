import React, { useState } from 'react';
import {
  Music2,
  Shield,
  Lock,
  Cloud,
  CheckCircle2,
  MapPin,
  Mail,
  Copy,
  Check,
  Youtube,
  Instagram,
  Twitter,
  Radio,
  Music,
  Send,
  Building2,
} from 'lucide-react';
import { PaymentConfig } from '../types';

interface FooterProps {
  onOpenGuide: () => void;
  onOpenAdmin: () => void;
  onOpenOrders: () => void;
  onOpenContact?: () => void;
  config?: PaymentConfig;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuide,
  onOpenAdmin,
  onOpenOrders,
  onOpenContact,
  config,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = config?.contactEmail || 'lawofice66@gmail.com';
  const contactAddress = config?.contactAddress || '75 Rue de Paris, 75000 Paris, France';
  const socials = config?.socialLinks || {
    youtube: 'https://youtube.com/@fallen75france',
    instagram: 'https://instagram.com/fallen75france',
    twitter: 'https://x.com/fallen75france',
    soundcloud: 'https://soundcloud.com/fallen75france',
    spotify: 'https://open.spotify.com/artist/fallen75france',
    telegram: 'https://t.me/fallen75france',
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-[#07080c] py-14 px-4 sm:px-6 text-neutral-400">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/60">
          {/* Col 1: Brand & Studio Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Music2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">
                FALLEN 75 FRANCE
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-400">
              Independent music production studio & 90+ beat catalog (Drill, Trap, Boom Bap, Cinematic, French Urban). Exclusive & non-exclusive licenses with instant master delivery.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-neutral-500">
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">USDT (TRC20)</span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">Ethereum</span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">Solana</span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">Skrill</span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">Payoneer</span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">RedotPay</span>
            </div>
          </div>

          {/* Col 2: Official Contact & Studio Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-amber-400" />
              Contact & Studio Address
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-300 font-medium block">Studio Location:</span>
                  <span className="text-neutral-400 leading-snug block">{contactAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="text-neutral-300 font-medium block">Official Inquiries:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-amber-400 hover:underline text-xs break-all"
                    >
                      {contactEmail}
                    </a>
                    <button
                      onClick={copyEmail}
                      className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                      title="Copy email"
                    >
                      {copiedEmail ? (
                        <Check className="h-3 w-3 text-emerald-400" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="mt-1 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] font-semibold text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Send className="h-3 w-3 text-amber-400" />
                  Open Studio Contact Modal
                </button>
              )}
            </div>
          </div>

          {/* Col 3: Social Media Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 text-pink-400" />
              Social Media & Streaming
            </h4>
            <p className="text-[11px] text-neutral-400">
              Connect with Fallen 75 across official streaming and direct channels:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 hover:bg-red-500/10 border border-neutral-800 hover:border-red-500/40 text-neutral-300 hover:text-red-400 transition-all"
                >
                  <Youtube className="h-3.5 w-3.5 text-red-500" />
                  <span className="text-[11px] font-medium">YouTube</span>
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 hover:bg-pink-500/10 border border-neutral-800 hover:border-pink-500/40 text-neutral-300 hover:text-pink-400 transition-all"
                >
                  <Instagram className="h-3.5 w-3.5 text-pink-500" />
                  <span className="text-[11px] font-medium">Instagram</span>
                </a>
              )}
              {socials.twitter && (
                <a
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 hover:bg-blue-400/10 border border-neutral-800 hover:border-blue-400/40 text-neutral-300 hover:text-blue-400 transition-all"
                >
                  <Twitter className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[11px] font-medium">Twitter / X</span>
                </a>
              )}
              {socials.soundcloud && (
                <a
                  href={socials.soundcloud}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 hover:bg-amber-500/10 border border-neutral-800 hover:border-amber-500/40 text-neutral-300 hover:text-amber-400 transition-all"
                >
                  <Radio className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[11px] font-medium">SoundCloud</span>
                </a>
              )}
              {socials.spotify && (
                <a
                  href={socials.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 hover:bg-emerald-500/10 border border-neutral-800 hover:border-emerald-500/40 text-neutral-300 hover:text-emerald-400 transition-all"
                >
                  <Music className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-[11px] font-medium">Spotify</span>
                </a>
              )}
              {socials.telegram && (
                <a
                  href={socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg bg-neutral-900 hover:bg-sky-500/10 border border-neutral-800 hover:border-sky-500/40 text-neutral-300 hover:text-sky-400 transition-all"
                >
                  <Send className="h-3.5 w-3.5 text-sky-400" />
                  <span className="text-[11px] font-medium">Telegram</span>
                </a>
              )}
            </div>
          </div>

          {/* Col 4: Navigation & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation & Security
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#catalogue" className="hover:text-amber-400 transition-colors">
                  Full Catalog (90+ Beats)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenOrders}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Track Order & Master Downloads
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <Cloud className="h-3 w-3 text-amber-500" />
                  Cloudflare & GitHub Guide
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1 text-neutral-400 hover:text-white"
                >
                  <Lock className="h-3 w-3" />
                  Admin Console (Private)
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>24-bit uncompressed master delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-300">FALLEN 75 FRANCE</span>
            <span>•</span>
            <span>AA2026 – All rights reserved</span>
            <span>•</span>
            <span>Paris, France</span>
          </div>
          <div className="font-mono text-[11px] text-neutral-500">
            High-Performance Web Design • Production Ready
          </div>
        </div>
      </div>
    </footer>
  );
};

