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
  ArrowLeft
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
}

type TabType = 'crypto' | 'other';
type CryptoKey = 'usdtTron' | 'ethereum' | 'solana';
type OtherKey = 'skrill' | 'payoneer' | 'redotpay';

export const PaymentModal: React.FC<PaymentModalProps> = ({
  track,
  paymentConfig,
  isOpen,
  onClose,
  onSubmitOrder,
  onViewOrder,
}) => {
  if (!isOpen) return null;

  const [selectedFormat, setSelectedFormat] = useState<'mp3' | 'wav'>('mp3');
  const [activeTab, setActiveTab] = useState<TabType>('crypto');
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoKey>('usdtTron');
  const [selectedOther, setSelectedOther] = useState<OtherKey>('skrill');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState<string | null>(null);

  const currentPrice = selectedFormat === 'wav' ? (track.wavPrice || 2.49) : (track.mp3Price || track.price || 0.99);
  const currentCurrency = track.currency === '€' ? '$' : (track.currency || '$');
  const licenseLabel = selectedFormat === 'wav' ? 'WAV Studio Master ($2.49)' : 'MP3 License ($0.99)';

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
      activeTab === 'crypto'
        ? paymentConfig.crypto[selectedCrypto].label
        : paymentConfig.otherMethods[selectedOther].label;

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
  const currentOther = paymentConfig.otherMethods[selectedOther];

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
            {/* Step 1: License Format Choice (MP3 $0.99 vs WAV $2.49) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Step 1: Choose License Format</span>
                </label>
                <span className="text-[11px] font-mono text-neutral-400">
                  Selected: <span className="font-bold text-white">{selectedFormat.toUpperCase()} (${currentPrice.toFixed(2)})</span>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* MP3 Option */}
                <button
                  type="button"
                  id="select-format-mp3"
                  onClick={() => setSelectedFormat('mp3')}
                  className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedFormat === 'mp3'
                      ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10'
                      : 'border-neutral-800 bg-[#0d0f17] hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">MP3 License</span>
                      <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-amber-400 border border-amber-500/30">
                        320 kbps
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug">
                      High-quality MP3 for streaming, YouTube & mixtapes
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-lg font-black font-mono text-amber-400">$0.99</div>
                    <div className="text-[10px] text-neutral-400 font-mono">~0.99 USDT</div>
                  </div>
                </button>

                {/* WAV Option */}
                <button
                  type="button"
                  id="select-format-wav"
                  onClick={() => setSelectedFormat('wav')}
                  className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedFormat === 'wav'
                      ? 'border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                      : 'border-neutral-800 bg-[#0d0f17] hover:border-neutral-700 hover:bg-neutral-900'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">WAV Studio Master</span>
                      <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/30">
                        24-bit Lossless
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug">
                      Uncompressed studio master for radio & professional mastering
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-lg font-black font-mono text-cyan-400">$2.49</div>
                    <div className="text-[10px] text-neutral-400 font-mono">~2.49 USDT</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="pt-2 border-t border-neutral-800/80">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Step 2: Select Payment Method
              </label>
            </div>

            {/* Category Tabs: Crypto vs Other */}
            <div className="flex rounded-xl bg-[#0a0b10] p-1 border border-neutral-800">
              <button
                type="button"
                onClick={() => setActiveTab('crypto')}
                className={`flex-1 rounded-lg py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'crypto'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                1. Crypto Payment (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('other')}
                className={`flex-1 rounded-lg py-2 text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'other'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                2. Other Methods (Skrill, Payoneer, RedotPay)
              </button>
            </div>

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
                <div className="grid grid-cols-3 gap-2">
                  {(['skrill', 'payoneer', 'redotpay'] as OtherKey[]).map((key) => {
                    const method = paymentConfig.otherMethods[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedOther(key)}
                        className={`rounded-xl p-2.5 text-center border transition-all ${
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
