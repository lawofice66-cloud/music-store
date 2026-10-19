import React from 'react';
import {
  Sparkles,
  Disc3,
  ShieldCheck,
  Zap,
  Radio,
  Search,
  Filter,
  MapPin,
  Mail,
  Youtube,
  Instagram,
  Twitter,
  Send,
  Music,
} from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  availableTags: string[];
  totalTracks: number;
  likedCount?: number;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onTagSelect,
  availableTags,
  totalTracks,
  likedCount = 0,
  onOpenContact,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-800/60 bg-gradient-to-b from-[#0e1017] via-[#090a0f] to-[#090a0f] pt-10 pb-8 px-4 sm:px-6">
      {/* Subtle background glow effect */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Top Brand Tag and Contact Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 border border-amber-500/25">
              <Radio className="h-3.5 w-3.5 animate-pulse text-amber-400" />
              <span>Music Production Studio</span>
            </div>
            <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-amber-400" />
              75 Rue de Paris, Paris, France • AA2026
            </span>
          </div>

          {/* Social Media & Contact Quick Links */}
          <div className="flex items-center gap-2">
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 px-3 py-1 text-xs font-medium text-amber-400 border border-amber-500/30 transition-all hover:scale-105"
              >
                <Mail className="h-3 w-3" />
                <span>Contact Studio</span>
              </button>
            )}
            <div className="flex items-center gap-1 text-neutral-400">
              <a
                href="https://youtube.com/@fallen75france"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-red-400 transition-colors"
                title="YouTube"
              >
                <Youtube className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://instagram.com/fallen75france"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-pink-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com/fallen75france"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-blue-400 transition-colors"
                title="X / Twitter"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://open.spotify.com/artist/fallen75france"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-emerald-400 transition-colors"
                title="Spotify"
              >
                <Music className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://t.me/fallen75france"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:text-sky-400 transition-colors"
                title="Telegram"
              >
                <Send className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Hero Title & Subheading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
              FALLEN 75 FRANCE
            </h1>
            <p className="mt-2 text-base sm:text-lg font-medium text-amber-400/90 tracking-wide">
              Global Catalogue of 90+ Beats & Instrumentals
            </p>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-xl">
              Official music production catalogue. Stream studio previews live, purchase your license directly via crypto (USDT TRC20, ETH, SOL) or fiat solutions (Skrill, Payoneer, RedotPay), and instantly unlock your uncompressed 24-bit WAV master files.
            </p>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-neutral-800 bg-[#12141f]/70 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Zap className="h-4 w-4" />
                <span>24-bit WAV</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Master Studio Quality</p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#12141f]/70 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>Direct Crypto</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">TRC20, ETH, SOL</p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#12141f]/70 p-3 backdrop-blur-sm col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Disc3 className="h-4 w-4" />
                <span>{totalTracks} Tracks</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-1">Ready for Recording</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-neutral-800/80">
          {/* Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => onTagSelect('all')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                selectedTag === 'all'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              All Beats ({totalTracks})
            </button>

            <button
              onClick={() => onTagSelect('favorites')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedTag === 'favorites'
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <span className="text-red-400">♥</span> Favoris ({likedCount})
            </button>

            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagSelect(tag)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedTag === tag
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by beat title, BPM, genre..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-[#12141f] pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
