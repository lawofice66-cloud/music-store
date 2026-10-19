import React from 'react';
import { Play, Pause, Volume2, VolumeX, ShoppingCart, Music, X, Heart, Headphones } from 'lucide-react';
import { Track } from '../types';

interface BottomPlayerProps {
  track: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLiked?: boolean;
  onTogglePlay: () => void;
  onToggleLike?: (track: Track) => void;
  onSeek: (seconds: number) => void;
  onVolumeChange: (val: number) => void;
  onBuy: (track: Track) => void;
  onClose: () => void;
}

export const BottomPlayer: React.FC<BottomPlayerProps> = ({
  track,
  isPlaying,
  currentTime,
  duration,
  volume,
  isLiked = false,
  onTogglePlay,
  onToggleLike,
  onSeek,
  onVolumeChange,
  onBuy,
  onClose,
}) => {
  if (!track) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * duration);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-800 bg-[#090a0f]/95 backdrop-blur-xl px-4 py-3 sm:px-6 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Track info & Like button */}
        <div className="flex items-center gap-3 min-w-0 max-w-[220px] sm:max-w-[320px]">
          <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-neutral-700 bg-neutral-900">
            <img
              src={track.coverImage}
              alt={track.title}
              className="h-full w-full object-cover"
            />
            {isPlaying && (
              <span className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Music className="h-4 w-4 text-amber-400 animate-pulse" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-white truncate">
                {track.title}
              </h4>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                {track.bpm} BPM
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
              <span className="truncate">{track.key}</span>
              <span className="text-neutral-600">•</span>
              <span className="flex items-center gap-0.5 text-[11px] font-mono text-neutral-400 shrink-0">
                <Headphones className="h-3 w-3 text-amber-400" />
                {(track.plays || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Quick like button in player */}
          <button
            type="button"
            onClick={() => onToggleLike?.(track)}
            className={`p-1.5 rounded-full transition-all active:scale-90 cursor-pointer ${
              isLiked
                ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            title={isLiked ? 'Je n\'aime plus ce morceau' : 'Aimer ce morceau'}
            aria-label="Like track"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Center: Play controls & Seek bar */}
        <div className="flex flex-1 flex-col items-center max-w-xl px-2">
          <div className="flex items-center gap-4 mb-1.5">
            <button
              onClick={onTogglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-black hover:bg-amber-400 active:scale-95 transition-all shadow-md shadow-amber-500/20"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex w-full items-center gap-2 text-[11px] font-mono text-neutral-400">
            <span>{formatTime(currentTime)}</span>
            <div
              onClick={handleSliderClick}
              className="group relative h-2 flex-1 rounded-full bg-neutral-800 cursor-pointer overflow-hidden"
            >
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right side: Volume & Buy Now button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Volume slider (desktop) */}
          <div className="hidden md:flex items-center gap-2 text-neutral-400">
            {volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="h-1.5 w-20 cursor-pointer accent-amber-500"
            />
          </div>

          <button
            onClick={() => onBuy(track)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 px-3.5 py-2 text-xs sm:text-sm font-bold text-black hover:from-amber-400 hover:to-amber-300 active:scale-95 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <ShoppingCart className="h-4 w-4 fill-black/20" />
            <span className="hidden sm:inline">Buy</span>
            <span>From $0.99</span>
          </button>

          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-neutral-300 transition-colors"
            title="Close player"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
