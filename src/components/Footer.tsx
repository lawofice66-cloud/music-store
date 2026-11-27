import React, { useState } from 'react';
import {
  Music2,
  Lock,
  Cloud,
  CheckCircle2,
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
import { CREEM_CONFIG } from '../config/creem';

interface FooterProps {
  onOpenGuide: () => void;
  onOpenAdmin: () => void;
  onOpenOrders: () => void;
  onOpenContact?: () => void;
  onOpenLicenses?: () => void;
  onNavigateLegal?: (page: 'privacy' | 'terms') => void;
  config?: PaymentConfig;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGuide,
  onOpenAdmin,
  onOpenOrders,
  onOpenContact,
  onOpenLicenses,
  onNavigateLegal,
  config,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = config?.contactEmail || 'contact@fallen75.com';
  const socials = config?.socialLinks || {
    youtube: 'https://www.youtube.com/channel/UCAROXprR9QaUS2WBRMCM2dA',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://x.com/fallen75',
    soundcloud: 'https://soundcloud.com/fallen75',
    spotify: 'https://open.spotify.com/artist/5iiVHI32IvfzR5QmE9FOoh',
    telegram: 'https://t.me/fallen75',
  };

  const { releasedMp3, unreleasedWav, unreleasedPack10, exclusiveLicense } = CREEM_CONFIG.products;

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleLegalClick = (e: React.MouseEvent<HTMLAnchorElement>, page: 'privacy' | 'terms') => {
    if (onNavigateLegal) {
      e.preventDefault();
      onNavigateLegal(page);
    }
  };

  return (
    <footer className="border-t border-neutral-800/80 bg-[#07080c] py-14 px-4 sm:px-6 text-neutral-400">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/60">
          {/* Col 1: Brand Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Music2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">
                {CREEM_CONFIG.brandName}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-neutral-400">
              Independent beat catalog on {CREEM_CONFIG.siteDomain}. Released MP3 licenses, Unreleased 24-bit WAV licenses, and 10-Track Packs powered by Creem checkout.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] font-mono text-neutral-400">
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-amber-500/30 text-amber-300 font-bold">
                Creem Checkout
              </span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">
                MP3 {releasedMp3.priceFormatted}
              </span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">
                WAV {unreleasedWav.priceFormatted}
              </span>
              <span className="rounded bg-neutral-900 px-2 py-0.5 border border-neutral-800">
                10-Pack {unreleasedPack10.priceFormatted}
              </span>
            </div>
          </div>

          {/* Col 2: Official Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-amber-400" />
              Official Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="overflow-hidden">
                  <span className="text-neutral-300 font-medium block">Support &amp; Inquiries:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-amber-400 hover:underline text-xs break-all"
                    >
                      {contactEmail}
                    </a>
                    <button
                      onClick={copyEmail}
                      className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
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

              <p className="text-[11px] text-neutral-400 leading-relaxed">
                {CREEM_CONFIG.checkoutNote}
              </p>

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="mt-1 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-[11px] font-semibold text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="h-3 w-3 text-amber-400" />
                  Open Contact Form
                </button>
              )}
            </div>
          </div>

          {/* Col 3: Social Media Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 text-pink-400" />
              Social Media &amp; Streaming
            </h4>
            <p className="text-[11px] text-neutral-400">
              Connect with {CREEM_CONFIG.brandName} across official channels:
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

          {/* Col 4: Navigation & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation &amp; Legal
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="/#catalogue" className="hover:text-amber-400 transition-colors">
                  Full Beat Catalog
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenOrders}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Track Order &amp; Downloads
                </button>
              </li>
              {onOpenLicenses && (
                <li>
                  <button
                    onClick={onOpenLicenses}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1 text-amber-300 font-bold"
                  >
                    License Terms ({releasedMp3.priceFormatted} / {unreleasedWav.priceFormatted} / {unreleasedPack10.priceFormatted} / {exclusiveLicense.priceFormatted})
                  </button>
                </li>
              )}
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleLegalClick(e, 'privacy')}
                  className="hover:text-amber-400 transition-colors text-neutral-200 font-semibold"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLegalClick(e, 'terms')}
                  className="hover:text-amber-400 transition-colors text-neutral-200 font-semibold"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenGuide}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1"
                >
                  <Cloud className="h-3 w-3 text-amber-500" />
                  Cloudflare Deployment Info
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1 text-neutral-400 hover:text-white"
                >
                  <Lock className="h-3 w-3" />
                  Admin Console
                </button>
              </li>
            </ul>

            <div className="pt-2 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>24-bit WAV &amp; MP3 delivery</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400">
                <span className="text-amber-400 font-bold">Google AI Studio</span>
                <span>• App Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal links bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-neutral-300">{CREEM_CONFIG.brandName}</span>
            <span>•</span>
            <span>{CREEM_CONFIG.siteDomain}</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <a
              href="/privacy"
              onClick={(e) => handleLegalClick(e, 'privacy')}
              className="text-neutral-300 hover:text-amber-400 transition-colors font-semibold"
            >
              Privacy Policy
            </a>
            <span className="text-neutral-700">•</span>
            <a
              href="/terms"
              onClick={(e) => handleLegalClick(e, 'terms')}
              className="text-neutral-300 hover:text-amber-400 transition-colors font-semibold"
            >
              Terms of Service
            </a>
            <span className="text-neutral-700 hidden sm:inline">•</span>
            <span className="font-mono text-[11px] text-neutral-500">
              Secure Checkout via Creem
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
