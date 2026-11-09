import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  Send,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  Download,
  ArrowLeft,
  Ban,
} from 'lucide-react';
import { Track, PaymentConfig, Order } from '../types';
import { generateWalletQrSvg } from '../utils/qrCode';

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

type TabType = 'nowpayments' | 'crypto' | 'other';
type CryptoKey = 'usdtTron' | 'ethereum' | 'solana';
type OtherKey = 'skrill' | 'redotpay';

export const PaymentModal: React.FC<PaymentModalProps> = ({
  track,
  paymentConfig,
  isOpen,
  onClose,
  onSubmitOrder,
  onViewOrder,
  onOpenLicenses,
}) => {
  const isUnreleased = track.status === 'unreleased';
  const [selectedFormat, setSelectedFormat] = useState<'mp3' | 'wav'>(isUnreleased ? 'wav' : 'mp3');
  const [activeTab, setActiveTab] = useState<TabType>('nowpayments');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoKey>('usdtTron');
  const [selectedOther, setSelectedOther] = useState<OtherKey>('skrill');
  const [showWidget, setShowWidget] = useState<boolean>(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const currentPrice = isUnreleased ? 2.49 : 0.99;
  const currentCurrency = track.currency === '€' ? '$' : (track.currency || '$');
  const licenseLabel = isUnreleased
    ? 'Inédite WAV Master ($2.49) • Full Sync & Streaming'
    : 'MP3 Social Monetization ($0.99) • Sync & Dist. Interdits';

  // Form states
  const [clientEmail, setClientEmail] = useState('');
  const [txHashOrRef, setTxHashOrRef] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleCopy = (text: string, keyName: string, customMsg?: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setCopiedMessage(customMsg || '✓ Address copied! You can now proceed with your payment.');
    setTimeout(() => {
      setCopiedMessage(null);
      setCopiedKey(null);
    }, 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!clientEmail.trim() || !clientEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address to receive your files.');
      return;
    }

    if (!txHashOrRef.trim()) {
      setErrorMsg('Please provide the transaction hash (TxID) or payment reference.');
      return;
    }

    setSubmitting(true);

    const paymentMethodLabel =
      activeTab === 'nowpayments'
        ? 'NOWPayments (Card & 300+ Crypto)'
        : activeTab === 'crypto'
        ? paymentConfig.crypto[selectedCrypto].label
        : paymentConfig.otherMethods[selectedOther]?.label || 'Skrill/RedotPay';

    setTimeout(() => {
      const newOrder = onSubmitOrder({
        clientEmail: clientEmail.trim(),
        paymentMethod: `${paymentMethodLabel} • ${selectedFormat.toUpperCase()}`,
        txHashOrRef: txHashOrRef.trim(),
        clientNotes: clientNotes.trim()
          ? `[Format: ${selectedFormat.toUpperCase()} - $${currentPrice.toFixed(2)}] ${clientNotes.trim()}`
          : `Format: ${selectedFormat.toUpperCase()} - $${currentPrice.toFixed(2)}`,
        price: currentPrice,
        currency: currentCurrency,
        licenseType: licenseLabel,
      });
      setSubmittedOrder(newOrder);
      setSubmitting(false);
    }, 400);
  };

  const currentCrypto = paymentConfig.crypto[selectedCrypto];
  const currentOther = paymentConfig.otherMethods[selectedOther] || {
    label: selectedOther === 'redotpay' ? 'RedotPay (Visa Card)' : 'Skrill',
    account: selectedOther === 'redotpay' ? 'lawofice66@gmail.com' : 'azzoulaali@hotmail.com',
    instructions: '',
    active: true,
  };

  const nowPaymentsIid = selectedFormat === 'wav' ? '5007760299' : '5645678673';
  const nowPaymentsPayUrl = `https://nowpayments.io/payment/?iid=${nowPaymentsIid}&source=button`;
  const nowPaymentsWidgetUrl = `https://nowpayments.io/embeds/payment-widget?iid=${nowPaymentsIid}`;
  const nowPaymentsDirectUrl = `https://nowpayments.io/payment/?iid=${nowPaymentsIid}`;

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
        {/* Header with clear Return to Store & Close actions */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-4 sm:px-6 py-3.5 sm:py-4 bg-[#141724]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              id="back-to-store-header-btn"
              className="flex items-center gap-1.5 rounded-xl border border-neutral-700/80 bg-neutral-800/80 px-3 py-1.5 text-xs font-bold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-all cursor-pointer shrink-0"
              title="Return to store"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden xs:inline">Back to Store</span>
            </button>

            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 shrink-0">
              <img
                src={track.coverImage}
                alt={track.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Secure Checkout
                </span>
                <span className="text-neutral-500">•</span>
                <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                  {track.bpm} BPM / {track.key}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide truncate max-w-[160px] sm:max-w-xs">
                {track.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase font-bold block">
                Total Due ({selectedFormat.toUpperCase()})
              </span>
              <span className="text-base sm:text-xl font-mono font-black text-amber-400">
                ${currentPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onClose}
              id="close-payment-modal-x-btn"
              className="flex items-center justify-center rounded-xl p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors cursor-pointer border border-neutral-800 hover:border-neutral-700"
              aria-label="Close and return to store"
              title="Close (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {submittedOrder ? (
          /* POST-PAYMENT SUCCESS SCREEN */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Check className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans']">
                Thank you for your purchase!
              </h3>
              <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                Your payment declaration has been recorded for <span className="font-bold text-amber-400">{submittedOrder.licenseType || licenseLabel}</span>. The producer <span className="font-bold text-amber-400">FALLEN 75 FRANCE</span> manually confirms payments on the blockchain or platform before releasing your studio package.
              </p>
            </div>

            <div className="rounded-xl border border-neutral-800 bg-[#0a0b10] p-4 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Order ID:</span>
                <span className="font-bold text-amber-400">{submittedOrder.id}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Beat Title:</span>
                <span className="text-white">{submittedOrder.trackTitle}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">License / Format:</span>
                <span className="font-bold text-amber-300">{submittedOrder.licenseType || licenseLabel}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Amount:</span>
                <span className="font-bold text-white font-mono">${currentPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Payment Method:</span>
                <span className="text-white">{submittedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800 pb-2">
                <span className="text-neutral-400">Client Email:</span>
                <span className="text-white">{submittedOrder.clientEmail}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Payment Status:</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/40">
                  <Clock className="h-3 w-3 animate-spin" />
                  Awaiting administrator verification
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 text-xs text-amber-200/90 text-left flex gap-2.5">
              <Info className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
              <div>
                <strong>Instant access after validation:</strong> As soon as the administrator confirms your transfer in the console, your download unlocks immediately in the <strong>"Track Order"</strong> window using your Order ID.
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                id="view-order-status-btn"
                onClick={() => {
                  onClose();
                  onViewOrder(submittedOrder.id);
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <span>Check Order Status & Downloads</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onClose}
                className="rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-3 text-sm font-semibold text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT SELECTION & PROOF FORM */
          <div className="p-5 sm:p-6 space-y-6">
            {/* Step 1: License Format Choice */}
            <div className="space-y-3">
              {isUnreleased ? (
                <>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Step 1: Licence Morceau Inédit (Unreleased)</span>
                    </label>
                    <span className="text-[11px] font-mono text-emerald-300">
                      Tarif Inédite: <span className="font-bold text-white font-mono">$2.49 USD</span>
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-emerald-500/50 bg-gradient-to-r from-emerald-950/40 to-emerald-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-emerald-950/20">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">🟢 Inédite Studio Master Package</span>
                        <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/40">
                          24-bit Lossless WAV + MP3 320kbps
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-200/80 leading-snug">
                        Production inédite non parue sur les plateformes. Droit d'utilisation complet (Streaming, YouTube, Radio, TV).
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black font-mono text-emerald-300">$2.49</div>
                      <div className="text-[10px] text-neutral-400 font-mono">~2.49 USDT</div>
                    </div>
                  </div>

                  {/* Permissions Banner Unreleased */}
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-emerald-300 flex items-center gap-1.5 text-xs">
                        <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>TOUT EST 100% AUTORISÉ pour ce morceau Inédit ($2.49)</span>
                      </span>
                      {onOpenLicenses && (
                        <button
                          type="button"
                          onClick={() => onOpenLicenses('unreleased')}
                          className="text-amber-400 hover:text-amber-300 underline font-bold text-[11px] cursor-pointer"
                        >
                          📄 Voir le contrat complet
                        </button>
                      )}
                    </div>
                    <p className="text-neutral-300 text-[11px] leading-relaxed">
                      ✅ Distribution streaming autorisée (Spotify, Apple Music, Deezer, etc.) • ✅ Synchronisation complète (Films, Séries, TV, Pubs) • ✅ Utilisation commerciale illimitée.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                      <span>Étape 1 : Licence Morceau Sorti (Released)</span>
                    </label>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Tarif Unique Released : <span className="font-bold text-amber-400 font-mono">$0.99 USD</span>
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-amber-500/50 bg-gradient-to-r from-amber-950/40 to-amber-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-amber-950/20">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">🟢 Licence MP3 : Social Monetization</span>
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-400 border border-amber-500/40">
                          HQ 320 kbps MP3
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-200/80 leading-snug">
                        Morceau déjà sorti. Monétisation 100% autorisée sur TikTok, YouTube, DJ sets et usage personnel.
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black font-mono text-amber-400">$0.99</div>
                      <div className="text-[10px] text-neutral-400 font-mono">~0.99 USDT</div>
                    </div>
                  </div>

                  {/* Permissions Banner Released ($0.99) */}
                  <div className="rounded-xl border border-rose-500/40 bg-rose-950/25 p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-rose-300 flex items-center gap-1.5 text-xs">
                        <Ban className="h-4 w-4 text-rose-400 shrink-0" />
                        <span>Licence Released ($0.99 USD) : Restrictions Importantes</span>
                      </span>
                      {onOpenLicenses && (
                        <button
                          type="button"
                          onClick={() => onOpenLicenses('released')}
                          className="text-amber-400 hover:text-amber-300 underline font-bold text-[11px] cursor-pointer"
                        >
                          📄 Comparer les 2 licences
                        </button>
                      )}
                    </div>
                    <p className="text-neutral-300 text-[11px] leading-relaxed">
                      <strong className="text-rose-400">❌ INTERDIT :</strong> Distribution sur plateformes de streaming (Spotify, Apple Music, Deezer...) et synchronisation TV/Cinéma.
                    </p>
                    <p className="text-emerald-400 text-[11px] leading-relaxed">
                      <strong>✅ AUTORISÉ :</strong> TikTok, YouTube, Facebook, DJ sets, clubs, fêtes, et projets personnels non-sync.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Step 2: Payment Method */}
            <div className="pt-2 border-t border-neutral-800/80">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Step 2: Select Payment Method
              </label>
            </div>

            {/* Category Tabs: NOWPayments vs Crypto vs Other */}
            <div className="flex flex-wrap gap-1.5 rounded-xl bg-[#0a0b10] p-1 border border-neutral-800">
              <button
                type="button"
                id="tab-btn-nowpayments"
                onClick={() => setActiveTab('nowpayments')}
                className={`flex-1 min-w-[140px] rounded-lg py-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'nowpayments'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                ⚡ NOWPayments (Card &amp; 300+ Crypto)
              </button>
              <button
                type="button"
                id="tab-btn-crypto"
                onClick={() => setActiveTab('crypto')}
                className={`flex-1 min-w-[140px] rounded-lg py-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'crypto'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                💰 Direct Crypto (USDT, ETH, SOL)
              </button>
              <button
                type="button"
                id="tab-btn-other"
                onClick={() => setActiveTab('other')}
                className={`flex-1 min-w-[140px] rounded-lg py-2 px-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'other'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                💳 Skrill &amp; RedotPay Visa
              </button>
            </div>

            {/* NOWPAYMENTS TAB CONTENT */}
            {activeTab === 'nowpayments' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-amber-500/40 bg-gradient-to-b from-[#131522] to-[#0a0c14] p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 border-b border-neutral-800 pb-3">
                    <div>
                      <b className="text-amber-300 text-sm sm:text-base font-extrabold flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        <span>NOWPayments Instant Gateway</span>
                      </b>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        Accepts Credit Card (Visa/Mastercard) + 300+ Cryptos (BTC, ETH, USDT, SOL, LTC, DOGE...)
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold">
                      Instant Live Rates
                    </span>
                  </div>

                  {/* Selected Format & Price recap */}
                  <div className="flex items-center justify-between rounded-lg bg-black/60 border border-neutral-800 p-3">
                    <div>
                      <span className="text-[11px] text-neutral-400 block">Selected Studio Master:</span>
                      <strong className="text-xs sm:text-sm text-white font-semibold">{track.title}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-neutral-400 block">{selectedFormat.toUpperCase()} License</span>
                      <span className="text-base sm:text-lg font-black text-amber-400 font-mono">${currentPrice.toFixed(2)} USD</span>
                    </div>
                  </div>

                  {/* Official NOWPayments Pay Buttons (White & Black) */}
                  <div className="text-center rounded-xl bg-[#07080d] border border-neutral-800 p-4 space-y-3">
                    <div className="text-xs font-bold text-neutral-300">
                      Click below to pay via NOWPayments official gateway:
                    </div>
                    <div className="flex items-center justify-center flex-wrap gap-4 py-1">
                      {/* White button */}
                      <a
                        href={nowPaymentsPayUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-block transition-transform hover:scale-105 active:scale-95"
                      >
                        <img
                          src="https://nowpayments.io/images/embeds/payments-button-white.svg"
                          alt="Crypto payment button by NOWPayments"
                          className="h-11 sm:h-12 rounded-lg shadow-lg"
                        />
                      </a>
                      {/* Black button */}
                      <a
                        href={nowPaymentsPayUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-block transition-transform hover:scale-105 active:scale-95"
                      >
                        <img
                          src="https://nowpayments.io/images/embeds/payments-button-black.svg"
                          alt="Crypto payment button by NOWPayments"
                          className="h-11 sm:h-12 rounded-lg shadow-lg"
                        />
                      </a>
                    </div>

                    {/* Direct Link + Copy button */}
                    <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                      <input
                        readOnly
                        value={nowPaymentsDirectUrl}
                        className="rounded-lg border border-neutral-800 bg-black/80 px-3 py-2 text-xs font-mono text-amber-300 select-all w-64 text-center"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(nowPaymentsDirectUrl, 'np-link', '✓ NOWPayments payment link copied!')}
                        className="flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-3 py-2 text-xs font-bold text-white transition-all cursor-pointer border border-neutral-700"
                      >
                        <Copy className="h-3.5 w-3.5 text-amber-400" />
                        <span>Copy Link</span>
                      </button>
                      <a
                        href={nowPaymentsDirectUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3 py-2 text-xs font-extrabold text-black transition-all shadow-md"
                      >
                        <span>🚀 Open Gateway</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    {copiedMessage && copiedKey === 'np-link' && (
                      <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-1.5 text-center text-xs font-bold text-emerald-300">
                        {copiedMessage}
                      </div>
                    )}
                  </div>

                  {/* Interactive Widget section */}
                  <div className="rounded-xl bg-[#07080d] border border-neutral-800 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-300">
                        📱 Embedded NOWPayments Widget:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowWidget(!showWidget)}
                        className="text-[11px] text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                      >
                        {showWidget ? 'Collapse Widget 🔼' : 'Expand Widget 🔽'}
                      </button>
                    </div>
                    {showWidget && (
                      <div className="flex justify-center overflow-hidden rounded-lg bg-black border border-neutral-800 p-2">
                        <iframe
                          src={nowPaymentsWidgetUrl}
                          width="410"
                          height="640"
                          frameBorder="0"
                          scrolling="no"
                          style={{ overflowY: 'hidden', maxWidth: '100%', border: 'none', borderRadius: '8px' }}
                          title="NOWPayments Widget"
                        >
                          Can't load widget
                        </iframe>
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-neutral-400 text-center">
                    💡 After completing payment on NOWPayments, copy your Payment ID or Transaction Hash (TXID) and paste it into Step 3 below.
                  </p>
                </div>
              </div>
            )}

            {/* CRYPTO TAB CONTENT */}
            {activeTab === 'crypto' && (
              <div className="space-y-4">
                {/* Crypto Selectors */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('usdtTron')}
                    className={`rounded-xl p-2.5 text-center border transition-all ${
                      selectedCrypto === 'usdtTron'
                        ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">USDT</div>
                    <div className="text-[10px] font-mono mt-0.5">TRON (TRC20)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('ethereum')}
                    className={`rounded-xl p-2.5 text-center border transition-all ${
                      selectedCrypto === 'ethereum'
                        ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">Ethereum</div>
                    <div className="text-[10px] font-mono mt-0.5">ETH (ERC20)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCrypto('solana')}
                    className={`rounded-xl p-2.5 text-center border transition-all ${
                      selectedCrypto === 'solana'
                        ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-black">Solana</div>
                    <div className="text-[10px] font-mono mt-0.5">SOL Native</div>
                  </button>
                </div>

                {/* Network Warning Banner */}
                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-amber-300 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                  <div>
                    <strong className="text-amber-200">⚠️ VERIFY THE NETWORK:</strong>{' '}
                    You must send funds strictly on the{' '}
                    <span className="font-mono font-bold underline decoration-amber-400 underline-offset-2">
                      {currentCrypto.network}
                    </span>
                    . Never send funds over an unsupported network, as they cannot be recovered.
                  </div>
                </div>

                {/* Wallet Details with Copy and QR Code */}
                <div className="rounded-2xl border border-neutral-800 bg-[#090a0f] p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    {/* QR Code */}
                    <div
                      className="shrink-0 flex flex-col items-center"
                      dangerouslySetInnerHTML={{
                        __html: generateWalletQrSvg(currentCrypto.address, 130),
                      }}
                    />

                    {/* Address Details & Copy Button */}
                    <div className="w-full space-y-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                          Wallet Address {currentCrypto.label} ({currentCrypto.network})
                        </span>
                        <div className="mt-1 rounded-lg border border-neutral-800 bg-black/60 p-2.5 font-mono text-xs sm:text-sm text-neutral-200 break-all select-all font-semibold">
                          {currentCrypto.address}
                        </div>
                      </div>

                      {/* Required Button specified in prompt */}
                      <button
                        type="button"
                        id={`copy-${selectedCrypto}-btn`}
                        onClick={() => handleCopy(currentCrypto.address, selectedCrypto)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 border border-neutral-700 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer shadow-md"
                      >
                        {copiedKey === selectedCrypto ? (
                          <>
                            <Check className="h-4 w-4 text-emerald-400" />
                            <span>✓ {currentCrypto.buttonText} (Copied)</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 text-amber-400" />
                            <span>📋 {currentCrypto.buttonText}</span>
                          </>
                        )}
                      </button>

                      {/* Specific user prompt feedback message */}
                      {copiedMessage && copiedKey === selectedCrypto && (
                        <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-2 text-center text-xs font-bold text-emerald-300 animate-fade-in">
                          {copiedMessage}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OTHER PAYMENT METHODS TAB */}
            {activeTab === 'other' && (
              <div className="space-y-4">
                {/* Method selector */}
                <div className="grid grid-cols-2 gap-2">
                  {(['skrill', 'redotpay'] as OtherKey[]).map((key) => {
                    const method = paymentConfig.otherMethods[key];
                    if (!method) return null;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedOther(key)}
                        className={`rounded-xl p-2.5 text-center border transition-all cursor-pointer ${
                          selectedOther === key
                            ? 'border-amber-400 bg-amber-500/15 text-amber-300 font-bold'
                            : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-black">{method.label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* Details Box */}
                <div className="rounded-2xl border border-neutral-800 bg-[#090a0f] p-4 sm:p-5 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                    <span className="text-xs text-neutral-400 font-medium">
                      Selected Method:
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {currentOther.label}
                      </span>
                      {selectedOther === 'redotpay' && (
                        <span className="rounded bg-amber-500/15 text-amber-400 text-[10px] font-bold px-2 py-0.5 border border-amber-500/30">
                          Visa Card
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Account / Email */}
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400">
                      {selectedOther === 'redotpay'
                        ? 'RedotPay Payment Email (Visa Card):'
                        : `Receiving Email for ${currentOther.label}:`}
                    </span>
                    <div className="mt-1 flex items-center justify-between rounded-lg border border-neutral-800 bg-black/60 p-2.5 font-mono text-xs sm:text-sm text-amber-300">
                      <span className="break-all font-semibold">{currentOther.account}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            currentOther.account,
                            selectedOther,
                            `✓ Email ${currentOther.account} copied!`
                          )
                        }
                        className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold ml-2 shrink-0 cursor-pointer"
                      >
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Email</span>
                      </button>
                    </div>
                  </div>

                  {/* Beneficiary Name if present */}
                  {currentOther.beneficiaryName && (
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400">
                        Official Beneficiary / Account Holder:
                      </span>
                      <div className="mt-1 flex items-center justify-between rounded-lg border border-neutral-800 bg-black/60 p-2.5 font-mono text-xs sm:text-sm text-white">
                        <span className="font-bold text-neutral-100">{currentOther.beneficiaryName}</span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              currentOther.beneficiaryName!,
                              `${selectedOther}_name`,
                              `✓ Beneficiary name (${currentOther.beneficiaryName}) copied!`
                            )
                          }
                          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold ml-2 shrink-0 cursor-pointer"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Name</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {copiedMessage &&
                    (copiedKey === selectedOther || copiedKey === `${selectedOther}_name`) && (
                      <div className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-2.5 text-center text-xs font-bold text-emerald-300 animate-fade-in">
                        {copiedMessage}
                      </div>
                    )}

                  <div className="rounded-xl bg-neutral-900/80 p-3 text-xs text-neutral-300 leading-relaxed border border-neutral-800">
                    <span className="font-bold text-amber-400">Transfer Instructions: </span>
                    {currentOther.instructions}
                  </div>

                  <p className="text-[11px] text-neutral-500 italic">
                    Note: No confidential passwords or keys required. Simply submit the payment from your regular app and enter your transaction proof below.
                  </p>
                </div>
              </div>
            )}

            {/* CONFIRMATION / PROOF SUBMISSION FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <ShieldCheck className="h-4 w-4" />
                <span>Payment Confirmation Form</span>
              </div>

              {errorMsg && (
                <div className="rounded-lg bg-red-500/20 border border-red-500/40 p-2.5 text-xs font-bold text-red-300">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Your Email Address <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. artist@gmail.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-[#090a0f] px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                  />
                  <span className="text-[10px] text-neutral-500">
                    For license receipt and studio download delivery
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Transaction Hash (TxID) or Reference <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0x9f... or Transfer Ref ID"
                    value={txHashOrRef}
                    onChange={(e) => setTxHashOrRef(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-[#090a0f] px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none font-mono"
                  />
                  <span className="text-[10px] text-neutral-500">
                    Allows the producer to verify your payment immediately
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Notes or message (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sent via Trust Wallet / Phantom, thank you!"
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-[#090a0f] px-3 py-2 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Submit & Cancel Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  id="submit-payment-proof-btn"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3.5 px-4 text-sm font-bold text-black shadow-lg shadow-amber-500/25 hover:from-amber-400 hover:to-amber-300 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      <span>Recording your order...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Confirm Payment & Submit Order</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  id="cancel-and-return-to-store-btn"
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-[#12141f] py-2.5 px-4 text-xs font-bold text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Just Browsing — Return to Store</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
