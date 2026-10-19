import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  FileCheck,
  Music,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Order, Track } from '../types';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  tracks: Track[];
  initialOrderId?: string;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  orders,
  tracks,
  initialOrderId,
}) => {
  if (!isOpen) return null;

  const [searchTerm, setSearchTerm] = useState(initialOrderId || '');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const matchedOrders = orders.filter((o) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return (
      o.id.toLowerCase().includes(term) ||
      o.clientEmail.toLowerCase().includes(term) ||
      o.trackTitle.toLowerCase().includes(term)
    );
  });

  const handleDownload = (order: Order) => {
    const track = tracks.find((t) => t.id === order.trackId);
    const fileName = track?.downloadFileName || `${order.trackTitle.replace(/\s+/g, '_')}_Master_WAV_Fallen75.zip`;

    // Trigger synthetic file download for instant client gratification
    const dummyContent = `=====================================================
FALLEN 75 FRANCE – AA2026
COMMERCIAL LICENSE & PRODUCTION CERTIFICATE
=====================================================
Track : ${order.trackTitle}
Order ID : ${order.id}
Client : ${order.clientEmail}
Price : ${order.price} ${order.currency}
Confirmation Date : ${order.confirmedAt || new Date().toISOString()}
Producer : FALLEN 75 FRANCE (AA2026)

GRANTED RIGHTS :
- Vocal recording & commercial mixing
- Streaming distribution (Spotify, Apple Music, YouTube)
- Live performances & music videos
- Master 24-bit WAV files + Stems included
- All rights reserved AA2026
=====================================================`;

    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = track?.downloadFileUrl || url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(order.id);
    setTimeout(() => setDownloadSuccess(null), 5000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      id="orders-modal-backdrop"
    >
      <div
        id="orders-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl my-6 rounded-2xl border border-neutral-800 bg-[#0f111a] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#141724]">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              id="back-to-store-orders-header-btn"
              className="flex items-center gap-1.5 rounded-xl border border-neutral-700/80 bg-neutral-800/80 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-all cursor-pointer mr-1"
              title="Return to store"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden xs:inline">Back to Store</span>
            </button>

            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Track Order & Downloads
              </h2>
              <p className="text-xs text-neutral-400">
                Check payment verification status and access your studio masters
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

        {/* Search Bar */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 bg-[#0c0d14]">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by Order ID (e.g., F75-ORD-9021) or by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900/90 pl-10 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        {/* List of Orders */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {matchedOrders.length === 0 ? (
            <div className="text-center py-10 text-neutral-400 space-y-2">
              <Music className="h-10 w-10 mx-auto opacity-40 text-amber-500" />
              <p className="text-sm">No orders found for this search.</p>
              <p className="text-xs text-neutral-500">
                Check the order reference ID provided during checkout or your email address.
              </p>
            </div>
          ) : (
            matchedOrders.map((order) => {
              const track = tracks.find((t) => t.id === order.trackId);
              const isConfirmed = order.status === 'confirmed';
              const isPending = order.status === 'pending';
              const isRejected = order.status === 'rejected';

              return (
                <div
                  key={order.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                    isConfirmed
                      ? 'border-emerald-500/40 bg-emerald-950/10'
                      : isPending
                      ? 'border-amber-500/30 bg-amber-950/10'
                      : 'border-red-500/30 bg-red-950/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      {track?.coverImage && (
                        <img
                          src={track.coverImage}
                          alt={order.trackTitle}
                          className="h-12 w-12 rounded-lg object-cover border border-neutral-700"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">
                            {order.id}
                          </span>
                          <span className="text-neutral-500 text-xs">•</span>
                          <span className="text-xs text-neutral-400 font-mono">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">
                          {order.trackTitle}
                        </h4>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      {isConfirmed && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/40">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Payment Confirmed
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-400 border border-amber-500/40">
                          <Clock className="h-3.5 w-3.5 animate-spin" />
                          Awaiting Verification
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 border border-red-500/40">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Payment Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="rounded-lg bg-neutral-900/70 p-2 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">AMOUNT</span>
                      <span className="font-bold text-white">{order.price} {order.currency}</span>
                    </div>
                    <div className="rounded-lg bg-neutral-900/70 p-2 border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">METHOD</span>
                      <span className="font-bold text-white truncate block">{order.paymentMethod}</span>
                    </div>
                    <div className="rounded-lg bg-neutral-900/70 p-2 border border-neutral-800 col-span-2">
                      <span className="text-neutral-500 block text-[10px]">TX HASH / REF</span>
                      <span className="font-mono text-neutral-300 truncate block">{order.txHashOrRef}</span>
                    </div>
                  </div>

                  {/* Download Action Section */}
                  <div className="mt-4 pt-3 border-t border-neutral-800/80">
                    {isConfirmed ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-500/10 rounded-xl p-3.5 border border-emerald-500/30">
                        <div className="space-y-0.5 text-left w-full sm:w-auto">
                          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                            <Sparkles className="h-3.5 w-3.5" />
                            Access Granted: Studio Master & License
                          </div>
                          <p className="text-[11px] text-neutral-300">
                            File: <span className="font-mono text-white">{track?.downloadFileName || 'Package_WAV_Stems.zip'}</span> (WAV 24-bit Master)
                          </p>
                        </div>

                        <button
                          onClick={() => handleDownload(order)}
                          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download Beat Master</span>
                        </button>
                      </div>
                    ) : isPending ? (
                      <div className="flex items-start gap-2.5 rounded-xl bg-amber-500/10 p-3 text-xs text-amber-300/90 border border-amber-500/20">
                        <Clock className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                        <div>
                          <strong>Payment verification in progress:</strong> The administrator is manually verifying your payment. Your download button will appear here once approved. You can refresh this window at any time.
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-red-500/10 p-3 text-xs text-red-300 border border-red-500/20">
                        The transaction could not be verified by the administrator. Please contact <strong>FALLEN 75 FRANCE</strong> support with your payment receipt.
                      </div>
                    )}

                    {downloadSuccess === order.id && (
                      <div className="mt-2 text-center text-xs font-bold text-emerald-400 animate-fade-in">
                        ✓ Download started successfully!
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
