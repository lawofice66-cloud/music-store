import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  ArrowLeft,
  ShoppingCart,
  FileText,
  Info,
} from 'lucide-react';
import { Track, PaymentConfig, Order } from '../types';
import { CREEM_CONFIG, CREEM_PRODUCTS_LIST } from '../config/creem';

interface PaymentModalProps {
  track: Track;
  paymentConfig: PaymentConfig;
  isOpen: boolean;
  onClose: () => void;
  onSubmitOrder: (orderData: {
    clientEmail: string;
    paymentMethod: string;
    txHashOrRef: string;
    clientNotes: string;
    price?: number;
    currency?: string;
    licenseType?: string;
  }) => Order;
  onViewOrder: (orderId: string) => void;
  onOpenLicenses?: (status?: 'released' | 'unreleased') => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  track,
  isOpen,
  onClose,
  onOpenLicenses,
}) => {
  const [copiedTitle, setCopiedTitle] = useState(false);

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

  const handleCopyBeatName = () => {
    navigator.clipboard.writeText(track.title);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      id="payment-modal-backdrop"
    >
      <div
        id="payment-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl my-6 rounded-2xl border border-neutral-800 bg-[#0f111a] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#141724]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              id="back-to-store-header-btn"
              className="flex items-center gap-1.5 rounded-xl border border-neutral-700/80 bg-neutral-800/80 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-all cursor-pointer shrink-0"
              title="Return to store"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden xs:inline">Back</span>
            </button>

            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
              <img
                src={
                  track.coverImage ||
                  (track as any).cover ||
                  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600'
                }
                alt={track.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  {CREEM_CONFIG.brandName} • Creem Checkout
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                  {track.bpm || 120} BPM / {track.key || 'Am'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide truncate max-w-[180px] sm:max-w-xs">
                {track.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-payment-modal-x-btn"
            className="flex items-center justify-center rounded-xl p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer border border-neutral-800 hover:border-neutral-700"
            aria-label="Close"
            title="Close (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Beat Name Reminder Banner */}
          <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-xs text-amber-200">
              <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300">
                  {CREEM_CONFIG.checkoutNote}
                </p>
                <p className="text-[11px] text-neutral-300 mt-0.5">
                  Selected beat: <span className="font-mono font-bold text-white">{track.title}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyBeatName}
              className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-500/40 bg-black/50 hover:bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-300 transition-colors cursor-pointer"
            >
              {copiedTitle ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Beat Name</span>
                </>
              )}
            </button>
          </div>

          {/* 3 Creem License Options */}
          <div className="space-y-3">
            {CREEM_PRODUCTS_LIST.map((product) => {
              const isReleased = product.id === 'releasedMp3';
              const isWav = product.id === 'unreleasedWav';
              return (
                <div
                  key={product.id}
                  className={`rounded-2xl border p-4 transition-all ${
                    isWav
                      ? 'border-emerald-500/45 bg-emerald-950/20'
                      : isReleased
                      ? 'border-amber-500/35 bg-[#12141f]'
                      : 'border-neutral-700 bg-[#12141f]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-black tracking-wider ${
                            isReleased
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          }`}
                        >
                          {product.status}
                        </span>
                        <h3 className="text-sm font-black text-white">
                          {product.licenseName}
                        </h3>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all active:scale-95 shadow-lg ${
                        isWav
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:from-emerald-400 hover:to-emerald-300 shadow-emerald-500/20'
                          : isReleased
                          ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black hover:from-amber-400 hover:to-amber-300 shadow-amber-500/20'
                          : 'border border-amber-500/50 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                      }`}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      <span>{product.buttonText}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-neutral-800/80 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Secure checkout powered by Creem • {CREEM_CONFIG.siteDomain}</span>
            </div>
            {onOpenLicenses && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenLicenses(track.status === 'unreleased' ? 'unreleased' : 'released');
                }}
                className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Full License Comparison</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
