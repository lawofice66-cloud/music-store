import React from 'react';
import { Shield, FileText, ArrowLeft, Mail, Lock, Ban } from 'lucide-react';
import { CREEM_CONFIG } from '../config/creem';

interface LegalPageProps {
  page: 'privacy' | 'terms';
  onNavigate: (view: 'store' | 'admin' | 'privacy' | 'terms') => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ page, onNavigate }) => {
  const isPrivacy = page === 'privacy';

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 pb-24">
      <div className="mx-auto max-w-3xl">
        {/* Back button */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('store');
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 px-4 py-2 text-xs font-bold text-neutral-300 hover:border-amber-500/40 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to {CREEM_CONFIG.siteDomain} Store</span>
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('privacy');
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold border transition-colors ${
                isPrivacy
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('terms');
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold border transition-colors ${
                !isPrivacy
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              Terms of Service
            </a>
          </div>
        </div>

        {/* Main Card */}
        <article className="rounded-3xl border border-neutral-800 bg-[#0f111a] p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-start gap-4 border-b border-neutral-800/80 pb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              {isPrivacy ? <Shield className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
                {CREEM_CONFIG.brandName} • {CREEM_CONFIG.siteDomain}
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isPrivacy
                  ? 'Privacy Policy - FALLEN75 - fallen75.com'
                  : 'Terms of Service - FALLEN75 - fallen75.com'}
              </h1>
            </div>
          </div>

          {isPrivacy ? (
            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 text-neutral-200 leading-relaxed">
                We collect only: name, email, order info, Beat Name(s) for delivery. We use Creem for payments, we do not store card data. Contact:{' '}
                <a href="mailto:contact@fallen75.com" className="text-amber-400 font-semibold hover:underline">
                  contact@fallen75.com
                </a>
                . We do not sell personal data.
              </div>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-400" />
                  1. Information We Collect
                </h2>
                <p className="text-neutral-400">
                  We collect only: name, email, order info, Beat Name(s) for delivery. This information is used strictly to fulfill your beat license order and deliver your audio files.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  2. Payment Processing via Creem
                </h2>
                <p className="text-neutral-400">
                  We use Creem for payments, we do not store card data. All payment details are processed securely by Creem at checkout.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">3. Data Sharing &amp; Protection</h2>
                <p className="text-neutral-400">
                  We do not sell personal data. Your order information is kept strictly confidential and used solely for order fulfillment and customer support.
                </p>
              </section>

              <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>
                    Contact:{' '}
                    <a href="mailto:contact@fallen75.com" className="text-amber-400 font-bold hover:underline">
                      contact@fallen75.com
                    </a>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  {CREEM_CONFIG.brandName} • {CREEM_CONFIG.siteDomain}
                </span>
              </section>
            </div>
          ) : (
            <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 text-neutral-200 leading-relaxed">
                All beats are licensed, not sold. Buyer gets license as described on product. Prohibited: No NSFW uses. No sexually explicit content, no nudity, no adult material. No resale, no commercial sync (film/TV/ads) unless stated. No re-distribution of Released tracks. No claiming beats as yours. Violation voids license, no refund. Support:{' '}
                <a href="mailto:contact@fallen75.com" className="text-amber-400 font-semibold hover:underline">
                  contact@fallen75.com
                </a>
              </div>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-amber-400" />
                  1. License Grant
                </h2>
                <p className="text-neutral-400">
                  All beats are licensed, not sold. Buyer gets license as described on product. Ownership and copyright of the underlying compositions remain with {CREEM_CONFIG.brandName}.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Ban className="h-4 w-4 text-rose-400" />
                  2. Prohibited Uses
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                  <li>No NSFW uses. No sexually explicit content, no nudity, no adult material.</li>
                  <li>No resale, no commercial sync (film/TV/ads) unless stated.</li>
                  <li>No re-distribution of Released tracks.</li>
                  <li>No claiming beats as yours.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-base font-bold text-white">3. License Violations &amp; Refunds</h2>
                <p className="text-neutral-400">
                  Violation voids license, no refund.
                </p>
              </section>

              <section className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>
                    Support:{' '}
                    <a href="mailto:contact@fallen75.com" className="text-amber-400 font-bold hover:underline">
                      contact@fallen75.com
                    </a>
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  {CREEM_CONFIG.brandName} • {CREEM_CONFIG.siteDomain}
                </span>
              </section>
            </div>
          )}
        </article>
      </div>
    </main>
  );
};
