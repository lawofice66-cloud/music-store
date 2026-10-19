/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Track, PaymentConfig, Order } from './types';
import {
  getStoredTracks,
  saveStoredTracks,
  getStoredPaymentConfig,
  saveStoredPaymentConfig,
  getStoredOrders,
  saveStoredOrders,
  exportBackupJson,
  importBackupJson,
  resetAllData,
} from './utils/storage';
import {
  apiFetchTracks,
  apiFetchPaymentConfig,
  apiFetchOrders,
  apiSubmitOrder,
  getLocalLikedTrackIds,
  saveLocalLikedTrackId,
  apiToggleLike,
  apiRecordPlay,
} from './utils/api';
import { audioEngine } from './utils/audioSynth';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrackCard } from './components/TrackCard';
import { BottomPlayer } from './components/BottomPlayer';
import { PaymentModal } from './components/PaymentModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import { AdminPanel } from './components/AdminPanel';
import { CloudflareGuideModal } from './components/CloudflareGuideModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { Music, Disc3, Sparkles, Heart, Flame, ArrowUpDown } from 'lucide-react';

export default function App() {
  // Application Data State
  const [tracks, setTracks] = useState<Track[]>(() => getStoredTracks());
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => getStoredPaymentConfig());
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());

  // User Likes & Sorting State
  const [likedTrackIds, setLikedTrackIds] = useState<Set<string>>(() => getLocalLikedTrackIds());
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'likes' | 'priceAsc' | 'priceDesc'>('featured');

  // Views & Modals
  const [activeView, setActiveView] = useState<'store' | 'admin'>('store');
  const [selectedTrackForBuy, setSelectedTrackForBuy] = useState<Track | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>(undefined);

  // Store Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Audio Playback Engine State
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 30,
    trackId: null as string | null,
  });
  const [volume, setVolume] = useState(0.8);

  // Subscribe to Audio Engine events
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((state) => {
      setAudioState({ ...state });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Fetch initial tracks, payment config and orders from backend API (D1 / Server)
  useEffect(() => {
    let mounted = true;

    async function loadBackendData() {
      try {
        const [fetchedTracks, fetchedConfig, fetchedOrders] = await Promise.all([
          apiFetchTracks(),
          apiFetchPaymentConfig(),
          apiFetchOrders(),
        ]);

        if (!mounted) return;

        if (fetchedTracks && fetchedTracks.length > 0) {
          setTracks(fetchedTracks);
          saveStoredTracks(fetchedTracks);
        }
        if (fetchedConfig) {
          setPaymentConfig(fetchedConfig);
          saveStoredPaymentConfig(fetchedConfig);
        }
        if (fetchedOrders && fetchedOrders.length > 0) {
          setOrders(fetchedOrders);
          saveStoredOrders(fetchedOrders);
        }
      } catch (err) {
        // Keep using local state if offline or during local boot
        console.warn('Backend sync in progress:', err);
      }
    }

    loadBackendData();

    return () => {
      mounted = false;
    };
  }, []);

  // Currently playing track object
  const currentPlayingTrack = useMemo(() => {
    if (!audioState.trackId) return null;
    return tracks.find((t) => t.id === audioState.trackId) || null;
  }, [audioState.trackId, tracks]);

  // Extract all unique tags
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    tracks.forEach((t) => {
      t.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [tracks]);

  // Filtered & Sorted tracks
  const filteredTracks = useMemo(() => {
    const list = tracks.filter((t) => {
      let matchesTag = false;
      if (selectedTag === 'all') {
        matchesTag = true;
      } else if (selectedTag === 'favorites') {
        matchesTag = likedTrackIds.has(t.id);
      } else {
        matchesTag = !!t.tags?.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase());
      }

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.bpm.toString().includes(q) ||
        t.key.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });

    // Apply sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.plays || 0) - (a.plays || 0);
      }
      if (sortBy === 'likes') {
        return (b.likes || 0) - (a.likes || 0);
      }
      if (sortBy === 'priceAsc') {
        return a.price - b.price;
      }
      if (sortBy === 'priceDesc') {
        return b.price - a.price;
      }
      // 'featured' (HOT tracks first)
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [tracks, selectedTag, searchQuery, likedTrackIds, sortBy]);

  // Likes Handler
  const handleToggleLike = async (track: Track) => {
    const isCurrentlyLiked = likedTrackIds.has(track.id);
    const newSet = saveLocalLikedTrackId(track.id, !isCurrentlyLiked);
    setLikedTrackIds(new Set(newSet));

    // Update track in local state
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id === track.id) {
          const delta = !isCurrentlyLiked ? 1 : -1;
          return { ...t, likes: Math.max(0, (t.likes || 0) + delta) };
        }
        return t;
      })
    );

    // Sync to backend D1 / server
    await apiToggleLike(track.id, !isCurrentlyLiked);
  };

  // Audio Handlers with Play count recording
  const handleTogglePlay = (track: Track) => {
    const isSameTrack = audioState.trackId === track.id;
    if (!isSameTrack || !audioState.isPlaying) {
      // Record play count
      setTracks((prev) =>
        prev.map((t) => (t.id === track.id ? { ...t, plays: (t.plays || 0) + 1 } : t))
      );
      apiRecordPlay(track.id).catch(() => {});
    }
    audioEngine.playTrack(track);
  };

  const handleSeek = (seconds: number) => {
    audioEngine.seek(seconds);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  // Order Submission (from Payment Modal)
  const handleSubmitOrder = (orderData: {
    clientEmail: string;
    paymentMethod: string;
    txHashOrRef: string;
    clientNotes: string;
    price?: number;
    currency?: string;
    licenseType?: string;
  }): Order => {
    if (!selectedTrackForBuy) throw new Error('No track selected');

    const newOrder: Order = {
      id: `F75-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      trackId: selectedTrackForBuy.id,
      trackTitle: selectedTrackForBuy.title,
      licenseType: orderData.licenseType || 'MP3 License ($0.99)',
      price: orderData.price ?? selectedTrackForBuy.price ?? 0.99,
      currency: orderData.currency || selectedTrackForBuy.currency || '$',
      clientEmail: orderData.clientEmail,
      paymentMethod: orderData.paymentMethod,
      txHashOrRef: orderData.txHashOrRef,
      clientNotes: orderData.clientNotes,
      status: 'pending',
      createdAt: new Date().toISOString(),
      downloadToken: `dl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveStoredOrders(updatedOrders);

    // Asynchronously persist to Cloudflare D1 / database
    apiSubmitOrder(newOrder).catch((err) => {
      console.warn('Could not persist order to server API:', err);
    });

    return newOrder;
  };

  // Admin Data Updaters
  const handleUpdateTracks = (newTracks: Track[]) => {
    setTracks(newTracks);
    saveStoredTracks(newTracks);
  };

  const handleUpdatePaymentConfig = (newConfig: PaymentConfig) => {
    setPaymentConfig(newConfig);
    saveStoredPaymentConfig(newConfig);
  };

  const handleUpdateOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    saveStoredOrders(newOrders);
  };

  const handleExportBackup = () => {
    const jsonStr = exportBackupJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FALLEN_75_FRANCE_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (jsonStr: string) => {
    const success = importBackupJson(jsonStr);
    if (success) {
      setTracks(getStoredTracks());
      setPaymentConfig(getStoredPaymentConfig());
      setOrders(getStoredOrders());
    }
    return success;
  };

  const handleResetData = () => {
    resetAllData();
    setTracks(getStoredTracks());
    setPaymentConfig(getStoredPaymentConfig());
    setOrders(getStoredOrders());
  };

  const handleViewOrder = (orderId: string) => {
    setTrackingOrderId(orderId);
    setIsOrdersModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-neutral-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-amber-500 selection:text-black">
      {/* Header Navigation */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
        onOpenOrders={() => {
          setTrackingOrderId(undefined);
          setIsOrdersModalOpen(true);
        }}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
        orders={orders}
      />

      {/* Main View Router */}
      {activeView === 'admin' ? (
        <main className="flex-1">
          <AdminPanel
            tracks={tracks}
            paymentConfig={paymentConfig}
            orders={orders}
            onUpdateTracks={handleUpdateTracks}
            onUpdatePaymentConfig={handleUpdatePaymentConfig}
            onUpdateOrders={handleUpdateOrders}
            onExportBackup={handleExportBackup}
            onImportBackup={handleImportBackup}
            onResetData={handleResetData}
            onOpenStore={() => setActiveView('store')}
          />
        </main>
      ) : (
        <main className="flex-1 pb-32">
          {/* Public Store Hero Banner */}
          <Hero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            availableTags={availableTags}
            totalTracks={tracks.length}
            likedCount={likedTrackIds.size}
            onOpenContact={() => setIsContactModalOpen(true)}
          />

          {/* Beats Grid Catalogue */}
          <section id="catalogue" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2">
                  <span>Catalogue des Morceaux & Beats</span>
                  {selectedTag === 'favorites' && (
                    <span className="text-sm font-semibold text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
                      ♥ Mes Favoris ({likedTrackIds.size})
                    </span>
                  )}
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Écoutez les extraits studio en direct et obtenez vos licences de production avec téléchargement immédiat.
                </p>
              </div>

              {/* Sorting and count controls */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-[#12141f] border border-neutral-800 rounded-xl px-2.5 py-1 text-xs">
                  <ArrowUpDown className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-neutral-400 text-[11px] font-medium hidden sm:inline">Trier par :</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-[#12141f] text-white">⭐ Recommandés (HOT)</option>
                    <option value="popular" className="bg-[#12141f] text-white">🎧 Plus Écoutés (Plays)</option>
                    <option value="likes" className="bg-[#12141f] text-white">❤️ Plus Aimés (Likes)</option>
                    <option value="priceAsc" className="bg-[#12141f] text-white">💰 Prix croissant</option>
                    <option value="priceDesc" className="bg-[#12141f] text-white">💎 Prix décroissant</option>
                  </select>
                </div>

                <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800">
                  {filteredTracks.length} beat{filteredTracks.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {filteredTracks.length === 0 ? (
              <div className="text-center py-20 rounded-3xl border border-neutral-800 bg-[#0f111a] p-8 space-y-3">
                <Disc3 className="h-12 w-12 mx-auto text-amber-500 opacity-40 animate-spin" />
                <h3 className="text-lg font-bold text-white">
                  {selectedTag === 'favorites' ? 'Aucun coup de cœur pour le moment' : 'Aucun morceau trouvé'}
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  {selectedTag === 'favorites'
                    ? 'Cliquez sur le cœur ❤️ sur les cartes des morceaux pour ajouter vos productions préférées à vos favoris.'
                    : `Aucun beat ne correspond à "${searchQuery || selectedTag}". Essayez de modifier vos filtres ou parcourez tout le catalogue.`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('all');
                  }}
                  className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400 transition-all cursor-pointer"
                >
                  Afficher tout le catalogue
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTracks.map((track) => (
                  <TrackCard
                    key={track.id}
                    track={track}
                    isPlaying={audioState.isPlaying && audioState.trackId === track.id}
                    currentTime={audioState.trackId === track.id ? audioState.currentTime : 0}
                    duration={audioState.trackId === track.id ? audioState.duration : 30}
                    isLiked={likedTrackIds.has(track.id)}
                    onTogglePlay={handleTogglePlay}
                    onToggleLike={handleToggleLike}
                    onBuy={(t) => setSelectedTrackForBuy(t)}
                  />
                ))}
              </div>
            )}
          </section>
        </main>
      )}

      {/* Footer */}
      <Footer
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenAdmin={() => setActiveView('admin')}
        onOpenOrders={() => {
          setTrackingOrderId(undefined);
          setIsOrdersModalOpen(true);
        }}
        onOpenContact={() => setIsContactModalOpen(true)}
        config={paymentConfig}
      />

      {/* Persistent Bottom Audio Player */}
      {currentPlayingTrack && (
        <BottomPlayer
          track={currentPlayingTrack}
          isPlaying={audioState.isPlaying}
          currentTime={audioState.currentTime}
          duration={audioState.duration}
          volume={volume}
          isLiked={likedTrackIds.has(currentPlayingTrack.id)}
          onToggleLike={handleToggleLike}
          onTogglePlay={() => {
            if (audioState.isPlaying) {
              audioEngine.pause();
            } else {
              audioEngine.resume();
            }
          }}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onBuy={(t) => setSelectedTrackForBuy(t)}
          onClose={() => audioEngine.stop()}
        />
      )}

      {/* Payment Checkout Modal */}
      {selectedTrackForBuy && (
        <PaymentModal
          track={selectedTrackForBuy}
          paymentConfig={paymentConfig}
          isOpen={true}
          onClose={() => setSelectedTrackForBuy(null)}
          onSubmitOrder={handleSubmitOrder}
          onViewOrder={(orderId) => {
            setSelectedTrackForBuy(null);
            handleViewOrder(orderId);
          }}
        />
      )}

      {/* Order Status & Download Modal */}
      <OrderStatusModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        orders={orders}
        tracks={tracks}
        initialOrderId={trackingOrderId}
      />

      {/* Cloudflare & GitHub Deployment Guide Modal */}
      <CloudflareGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      {/* Official Studio & Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        config={paymentConfig}
      />
    </div>
  );
}
