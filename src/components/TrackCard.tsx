import React from 'react';
import { Play, Pause, ShoppingCart, Activity, Disc, Sparkles, Volume2, Heart, Headphones } from 'lucide-react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLiked?: boolean;
  onTogglePlay: (track: Track) => void;
  onToggleLike?: (track: Track) => void;
  onBuy: (track: Track) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({
  track,
  isPlaying,
  currentTime,
  duration,
  isLiked = false,
  onTogglePlay,
  onToggleLike,
  onBuy,
}) => {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const formatPlays = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div
      id={`track-card-${track.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800/80 bg-gradient-to-b from-[#12141d] to-[#0c0d14] p-5 shadow-xl transition-all duration-300 hover:border-amber-500/40 hover:shadow-amber-500/5 hover:-translate-y-1"
    >
      {/* Top Header with Image & Play Overlay */}
      <div>
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800">
          <img
            src={track.coverImage}
            alt={track.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge BPM, Key & File Size */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="rounded-md bg-black/75 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-amber-400 border border-amber-500/30">
              {track.bpm} BPM
            </span>
            <span className="rounded-md bg-black/75 backdrop-blur-md px-2 py-1 text-xs font-mono font-semibold text-neutral-300 border border-neutral-700">
              {track.key}
            </span>
            {track.fileSize && (
              <span className="rounded-md bg-black/75 backdrop-blur-md px-2 py-1 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/30">
                {track.fileSize}
              </span>
            )}
          </div>

          {/* Top Right Badges: HOT & Like Button */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
            {track.featured && (
              <div className="flex items-center gap-1 rounded-md bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-black shadow-md">
                <Sparkles className="h-3 w-3" />
                HOT
              </div>
            )}
            <button
              type="button"
              id={`like-btn-${track.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike?.(track);
              }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-mono font-semibold backdrop-blur-md transition-all shadow-md active:scale-90 cursor-pointer ${
                isLiked
                  ? 'bg-red-500/90 text-white shadow-red-500/30 ring-2 ring-red-400/50'
                  : 'bg-black/75 text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-700/80'
              }`}
              title={isLiked ? 'Je retire ce morceau de mes favoris' : 'Ajouter à mes favoris'}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className={`h-3.5 w-3.5 transition-transform ${isLiked ? 'fill-current text-white scale-110' : 'text-neutral-400 hover:text-red-400'}`} />
              <span>{track.likes || 0}</span>
            </button>
          </div>

          {/* Center Play Button Overlay */}
          <button
            id={`play-btn-${track.id}`}
            onClick={() => onTogglePlay(track)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 focus:opacity-100 focus:outline-none cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play preview'}
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 text-black ring-4 ring-amber-500/40'
                : 'bg-white/90 text-black hover:bg-amber-400'
            }`}>
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <Play className="h-6 w-6 fill-current ml-1" />
              )}
            </div>
          </button>

          {/* Bottom Left: Play Count Badge */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[11px] font-mono text-neutral-300 border border-neutral-700/80">
            <Headphones className="h-3 w-3 text-amber-400" />
            <span>{formatPlays(track.plays || 0)} écoutes</span>
          </div>

          {/* Playing wave animated indicator */}
          {isPlaying && (
            <div className="absolute bottom-3 right-3 z-10 flex items-end gap-1 rounded-md bg-black/85 px-2 py-1 border border-amber-500/40">
              <span className="h-3 w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="h-5 w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              <span className="h-2 w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="h-4 w-1 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] font-mono text-amber-300 ml-1">EN LECTURE</span>
            </div>
          )}
        </div>

        {/* Title and Tags */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors tracking-wide">
              {track.title}
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              FALLEN 75
            </span>
          </div>

          <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed min-h-[32px]">
            {track.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {track.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded bg-neutral-800/80 px-2 py-0.5 text-[11px] font-medium text-neutral-300 border border-neutral-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Audio Player Preview Bar & Bottom Purchase */}
      <div className="mt-5 space-y-3 pt-3 border-t border-neutral-800/80">
        {/* Audio scrubber & preview info */}
        <div className="rounded-xl bg-[#090a0f] p-2.5 border border-neutral-800">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
            <span className="flex items-center gap-1 text-amber-400/90 font-semibold">
              <Disc className={`h-3 w-3 ${isPlaying ? 'animate-spin' : ''}`} />
              Audio Preview
            </span>
            <span>
              {isPlaying ? formatTime(currentTime) : '0:00'} / {formatTime(duration || 30)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-800 cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100"
              style={{ width: `${isPlaying ? progressPercent : 0}%` }}
            />
          </div>
        </div>

        {/* Price & Buy Now Button */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 block mb-0.5">
              Available Formats
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center text-xs sm:text-sm font-extrabold font-mono text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-lg border border-amber-500/30">
                MP3 $0.99
              </span>
              <span className="text-neutral-500 text-xs">•</span>
              <span className="inline-flex items-center text-xs sm:text-sm font-extrabold font-mono text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded-lg border border-cyan-500/30">
                WAV $2.49
              </span>
            </div>
          </div>
          <button
            id={`buy-btn-${track.id}`}
            onClick={() => onBuy(track)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-4 py-2.5 text-xs sm:text-sm font-bold text-black shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <ShoppingCart className="h-4 w-4 fill-black/30" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
