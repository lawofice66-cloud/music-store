import React from 'react';
import { Music2, ShoppingBag, ShieldCheck, Sparkles, Terminal, FileCode, CheckCircle2, Mail } from 'lucide-react';
import { Order } from '../types';

interface NavbarProps {
  activeView: 'store' | 'admin';
  onNavigate: (view: 'store' | 'admin') => void;
  onOpenOrders: () => void;
  onOpenGuide: () => void;
  onOpenContact?: () => void;
  orders: Order[];
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onOpenOrders,
  onOpenGuide,
  onOpenContact,
  orders,
}) => {
  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#090a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('store')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 text-amber-400 shadow-inner group-hover:border-amber-400/60 transition-all">
            <Music2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-lg text-white font-['Plus_Jakarta_Sans'] group-hover:text-amber-400 transition-colors">
                FALLEN 75 FRANCE
              </span>
              <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/20">
                AA2026
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium tracking-wide">
              Instrumentals & Exclusive Beats
            </p>
          </div>
        </button>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Store button */}
          <button
            id="nav-store-btn"
            onClick={() => onNavigate('store')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
              activeView === 'store'
                ? 'bg-neutral-800 text-amber-400 border border-amber-500/30'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Store</span>
          </button>

          {/* Contact & Studio button */}
          {onOpenContact && (
            <button
              id="nav-contact-btn"
              onClick={onOpenContact}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-amber-400 hover:bg-neutral-800/50 border border-neutral-800 transition-all"
            >
              <Mail className="h-4 w-4 text-amber-400" />
              <span className="hidden sm:inline">Contact &</span> Studio
            </button>
          )}

          {/* Track order button */}
          <button
            id="nav-orders-btn"
            onClick={onOpenOrders}
            className="relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800/50 border border-neutral-800 transition-all"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">Track</span> Order
            {orders.length > 0 && (
              <span className="ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                {orders.length}
              </span>
            )}
          </button>

          {/* Guide Cloudflare / ZIP Download */}
          <button
            id="nav-guide-btn"
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded-lg px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all cursor-pointer"
            title="Télécharger ZIP & Déploiement Cloudflare Pages"
          >
            <FileCode className="h-4 w-4 text-amber-400" />
            <span className="hidden sm:inline">Cloudflare</span>
            <span className="rounded bg-amber-400 text-black text-[10px] font-black px-1.5 py-0.2">ZIP</span>
          </button>

          {/* Admin link */}
          <button
            id="nav-admin-btn"
            onClick={() => onNavigate('admin')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
              activeView === 'admin'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Admin</span>
            {pendingCount > 0 && activeView !== 'admin' && (
              <span className="ml-1 rounded-full bg-amber-400 px-1.5 py-0.2 text-[10px] font-black text-black animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
