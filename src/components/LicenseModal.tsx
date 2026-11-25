import React, { useState } from 'react';
import { X, ShieldCheck, Check, Ban, Sparkles, FileText, ExternalLink, ShoppingCart } from 'lucide-react';
import { CREEM_CONFIG, CREEM_PRODUCTS_LIST } from '../config/creem';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'released' | 'unreleased';
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'released' | 'unreleased'>('comparison');

  if (!isOpen) return null;

  const { releasedMp3, unreleasedWav, unreleasedPack10 } = CREEM_CONFIG.products;

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
                License Terms &amp; Pricing
              </h2>
              <p className="text-xs text-neutral-400 font-medium">
                {CREEM_CONFIG.brandName} • {CREEM_CONFIG.siteDomain} • Creem Checkout
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
            <span>All 3 Licenses Comparison</span>
          </button>
          <button
            onClick={() => setActiveTab('released')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'released'
                ? 'bg-[#121522] text-rose-400 border-t-2 border-rose-400 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
            }`}
          >
            <span>RELEASED MP3 ({releasedMp3.priceFormatted})</span>
          </button>
          <button
            onClick={() => setActiveTab('unreleased')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'unreleased'
                ? 'bg-[#121522] text-emerald-400 border-t-2 border-emerald-400 shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
            }`}
          >
            <span>UNRELEASED WAV ({unreleasedWav.priceFormatted} / {unreleasedPack10.priceFormatted})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-neutral-200">
          {/* TAB 1: COMPARISON */}
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CREEM_PRODUCTS_LIST.map((product) => {
                  const isReleased = product.id === 'releasedMp3';
                  const isWav = product.id === 'unreleasedWav';
                  return (
                    <div
                      key={product.id}
                      className={`rounded-2xl border p-4 flex flex-col justify-between gap-3 ${
                        isReleased
                          ? 'border-rose-500/40 bg-rose-950/20'
                          : isWav
                          ? 'border-emerald-500/50 bg-emerald-950/25 shadow-lg shadow-emerald-950/30'
                          : 'border-amber-500/40 bg-amber-950/15'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-extrabold border ${
                              isReleased
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            }`}
                          >
                            {product.status}
                          </span>
                          <span className="font-mono text-lg font-black text-white">
                            {product.priceFormatted}
                          </span>
                        </div>
                        <h3 className="text-sm font-black text-white">{product.licenseName}</h3>
                        <p className="text-xs text-neutral-300 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-extrabold transition-all ${
                          isWav
                            ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                            : isReleased
                            ? 'bg-amber-500 hover:bg-amber-400 text-black'
                            : 'border border-amber-500/50 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300'
                        }`}
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                        <span>{product.buttonText}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Detailed Comparative Table */}
              <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#090a10]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#121522] text-neutral-300 uppercase tracking-wider text-[11px] font-bold border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">Rights &amp; Features</th>
                      <th className="p-3.5 text-rose-300">MP3 ({releasedMp3.priceFormatted})</th>
                      <th className="p-3.5 text-emerald-300">WAV ({unreleasedWav.priceFormatted})</th>
                      <th className="p-3.5 text-amber-300">10-Track Pack ({unreleasedPack10.priceFormatted})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 font-medium">
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Track Status</td>
                      <td className="p-3.5 text-neutral-300">Released (Already distributed)</td>
                      <td className="p-3.5 text-emerald-300">Unreleased (Never released)</td>
                      <td className="p-3.5 text-emerald-300">10 Unreleased Beats</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Audio Format</td>
                      <td className="p-3.5 text-neutral-300 font-mono">MP3</td>
                      <td className="p-3.5 text-emerald-300 font-mono font-bold">24-bit WAV</td>
                      <td className="p-3.5 text-amber-300 font-mono font-bold">MP3 + 24-bit WAV (x10)</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Personal Use, Social Media, Parties, Personal Videos</td>
                      <td className="p-3.5 text-emerald-400 font-bold">Allowed</td>
                      <td className="p-3.5 text-emerald-400 font-bold">Allowed</td>
                      <td className="p-3.5 text-emerald-400 font-bold">Allowed</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30">
                      <td className="p-3.5 font-bold text-white">Streaming Release on Your Name &amp; Music Video</td>
                      <td className="p-3.5 text-rose-400 font-bold">Not allowed (Re-distribution)</td>
                      <td className="p-3.5 text-emerald-300 font-bold">1 Streaming Release + 1 Music Video</td>
                      <td className="p-3.5 text-emerald-300 font-bold">Per beat: 1 First Streaming Release + 1 Music Video</td>
                    </tr>
                    <tr className="hover:bg-neutral-800/30 bg-rose-950/10">
                      <td className="p-3.5 font-bold text-white">Resale / Commercial Sync</td>
                      <td className="p-3.5 text-rose-400 font-bold">Not allowed</td>
                      <td className="p-3.5 text-rose-400 font-bold">Not allowed</td>
                      <td className="p-3.5 text-rose-400 font-bold">Not allowed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 font-medium">
                <strong>Checkout note:</strong> {CREEM_CONFIG.checkoutNote}
              </div>
            </div>
          )}

          {/* TAB 2: RELEASED MP3 */}
          {activeTab === 'released' && (
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div className="rounded-2xl border border-rose-500/40 bg-gradient-to-r from-rose-950/40 to-neutral-900 p-5">
                <div className="flex items-center justify-between gap-2 text-rose-300 font-black text-base">
                  <span>{releasedMp3.licenseName} — {releasedMp3.priceFormatted}</span>
                  <a
                    href={releasedMp3.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-1.5 text-xs"
                  >
                    {releasedMp3.buttonText}
                  </a>
                </div>
                <p className="mt-2 text-neutral-300 text-xs sm:text-sm">
                  {releasedMp3.description}
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-neutral-800 bg-[#0d0f18] p-5">
                <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Allowed</span>
                </h4>
                <ul className="space-y-1.5 text-neutral-300 pl-4 list-disc marker:text-emerald-400">
                  <li>Personal use</li>
                  <li>Social media</li>
                  <li>Parties</li>
                  <li>Personal videos</li>
                </ul>
              </div>

              <div className="space-y-3 rounded-2xl border border-neutral-800 bg-[#0d0f18] p-5">
                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wide flex items-center gap-2">
                  <Ban className="h-4 w-4 text-rose-400" />
                  <span>Not Allowed</span>
                </h4>
                <ul className="space-y-1.5 text-neutral-300 pl-4 list-disc marker:text-rose-400">
                  <li>Re-distribution</li>
                  <li>Commercial sync</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: UNRELEASED WAV & 10-TRACK PACK */}
          {activeTab === 'unreleased' && (
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
              <div className="rounded-2xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/50 to-neutral-900 p-5 space-y-2">
                <div className="flex items-center justify-between gap-2 text-emerald-300 font-black text-base">
                  <span>{unreleasedWav.licenseName} — {unreleasedWav.priceFormatted}</span>
                  <a
                    href={unreleasedWav.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-4 py-1.5 text-xs"
                  >
                    {unreleasedWav.buttonText}
                  </a>
                </div>
                <p className="text-neutral-200 text-xs sm:text-sm">{unreleasedWav.description}</p>
              </div>

              <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/40 to-neutral-900 p-5 space-y-2">
                <div className="flex items-center justify-between gap-2 text-amber-300 font-black text-base">
                  <span>{unreleasedPack10.licenseName} — {unreleasedPack10.priceFormatted}</span>
                  <a
                    href={unreleasedPack10.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-4 py-1.5 text-xs"
                  >
                    {unreleasedPack10.buttonText}
                  </a>
                </div>
                <p className="text-neutral-200 text-xs sm:text-sm">{unreleasedPack10.description}</p>
              </div>

              <div className="space-y-3 rounded-2xl border border-neutral-800 bg-[#0d0f18] p-5">
                <h4 className="text-sm font-bold text-rose-400 uppercase tracking-wide flex items-center gap-2">
                  <Ban className="h-4 w-4 text-rose-400" />
                  <span>Not Allowed</span>
                </h4>
                <ul className="space-y-1.5 text-neutral-300 pl-4 list-disc marker:text-rose-400">
                  <li>Resale</li>
                  <li>Commercial sync</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-neutral-800/80 px-6 py-4 bg-[#0a0b12]">
          <div className="text-xs text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>{CREEM_CONFIG.brandName} • {CREEM_CONFIG.siteDomain}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold px-6 py-2.5 text-xs transition-all shadow-md cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
