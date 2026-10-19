import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Music,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Save,
  Wallet,
  Coins,
  CreditCard,
  FileCode,
  Download,
  Upload,
  RefreshCw,
  Search,
  ExternalLink,
  DollarSign,
  Clock,
  Sparkles,
  Key,
  ShieldCheck,
  Cloud,
  Database,
  HardDrive,
  Check,
  Play,
  Pause,
  MapPin,
  Mail,
  Phone,
  Share2,
  Youtube,
  Instagram,
  Twitter,
  Send,
} from 'lucide-react';
import { Track, PaymentConfig, Order } from '../types';
import {
  apiAdminLogin,
  apiVerifyAdmin,
  removeAdminToken,
  apiSaveTrack,
  apiDeleteTrack,
  apiUploadMedia,
  apiSavePaymentConfig,
  apiUpdateOrderStatus,
} from '../utils/api';

interface AdminPanelProps {
  tracks: Track[];
  paymentConfig: PaymentConfig;
  orders: Order[];
  onUpdateTracks: (tracks: Track[]) => void;
  onUpdatePaymentConfig: (config: PaymentConfig) => void;
  onUpdateOrders: (orders: Order[]) => void;
  onExportBackup: () => void;
  onImportBackup: (json: string) => boolean;
  onResetData: () => void;
  onOpenStore: () => void;
}

type AdminTab = 'tracks' | 'payments' | 'orders' | 'deployment' | 'backup';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  tracks,
  paymentConfig,
  orders,
  onUpdateTracks,
  onUpdatePaymentConfig,
  onUpdateOrders,
  onExportBackup,
  onImportBackup,
  onResetData,
  onOpenStore,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('fallen75_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [currentTab, setCurrentTab] = useState<AdminTab>('tracks');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Upload States for Cloudflare R2 / Permanent Server Storage
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [audioUploadProgress, setAudioUploadProgress] = useState<number>(0);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [coverUploadProgress, setCoverUploadProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [audioStorageType, setAudioStorageType] = useState<'r2' | 'local' | null>(null);

  // Track Form State (for Add / Edit)
  const [isEditingTrack, setIsEditingTrack] = useState(false);
  const [editingTrackId, setEditingTrackId] = useState<string | null>(null);
  const [trackForm, setTrackForm] = useState<Partial<Track>>({
    title: '',
    description: '',
    price: 0.99,
    mp3Price: 0.99,
    wavPrice: 2.49,
    currency: '$',
    bpm: 140,
    key: 'D Minor',
    tags: ['Trap', 'Dark'],
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    audioPreviewUrl: '',
    audioPreset: 'drill_dark',
    downloadFileName: 'Fallen75_Beat_Master_WAV.zip',
    featured: false,
  });

  // Verify stored session on mount
  useEffect(() => {
    apiVerifyAdmin().then((valid) => {
      if (valid) {
        setIsAuthenticated(true);
        sessionStorage.setItem('fallen75_admin_auth', 'true');
      }
    });
  }, []);

  // Local copy of Payment Config for editing
  const [editablePaymentConfig, setEditablePaymentConfig] = useState<PaymentConfig>(paymentConfig);

  // Orders Filter
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'confirmed'>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Authentication logic via secure backend API + client-side fallback
  const performLogin = async (pw: string) => {
    setAuthError('');
    const clean = (pw || '').trim();
    if (!clean) {
      setAuthError('Veuillez entrer le mot de passe.');
      return;
    }
    const result = await apiAdminLogin(clean);
    if (result.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('fallen75_admin_auth', 'true');
      localStorage.setItem('fallen75_admin_auth', 'true');
      triggerSuccessMessage('✓ Connexion administrateur établie avec succès.');
    } else {
      setAuthError(result.error || 'Mot de passe incorrect. Le mot de passe par défaut est FALLEN2026AA.');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await performLogin(passwordInput);
  };

  const handleLogout = () => {
    removeAdminToken();
    setIsAuthenticated(false);
    sessionStorage.removeItem('fallen75_admin_auth');
  };

  const triggerSuccessMessage = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 4500);
  };

  // Track Management
  const handleOpenAddTrack = () => {
    setEditingTrackId(null);
    setTrackForm({
      title: '',
      description: '',
      price: 0.99,
      mp3Price: 0.99,
      wavPrice: 2.49,
      currency: '$',
      bpm: 140,
      key: 'D Minor',
      tags: ['Trap', 'Dark'],
      coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      audioPreviewUrl: '',
      audioPreset: 'drill_dark',
      downloadFileName: 'Fallen75_NewBeat_Master_WAV.zip',
      featured: false,
    });
    setAudioStorageType(null);
    setUploadError(null);
    setIsEditingTrack(true);
  };

  const handleOpenEditTrack = (track: Track) => {
    setEditingTrackId(track.id);
    setTrackForm({ ...track });
    setAudioStorageType(track.audioPreviewUrl?.startsWith('/api/media/') ? 'r2' : null);
    setUploadError(null);
    setIsEditingTrack(true);
  };

  const handleDeleteTrack = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this track (D1 database and R2 storage files)?')) {
      await apiDeleteTrack(id);
      const updated = tracks.filter((t) => t.id !== id);
      onUpdateTracks(updated);
      triggerSuccessMessage('✓ Track and media files permanently deleted from database and cloud storage.');
    }
  };

  const handleSaveTrackForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackForm.title?.trim()) {
      alert('Please enter a track title.');
      return;
    }

    const isEdit = !!editingTrackId;
    const trackToSave: Track = {
      id: editingTrackId || `track-${Date.now()}`,
      title: trackForm.title || 'New Beat',
      description: trackForm.description || '',
      price: trackForm.price !== undefined ? Number(trackForm.price) : 0.99,
      mp3Price: trackForm.mp3Price !== undefined ? Number(trackForm.mp3Price) : (trackForm.price !== undefined ? Number(trackForm.price) : 0.99),
      wavPrice: trackForm.wavPrice !== undefined ? Number(trackForm.wavPrice) : 2.49,
      currency: trackForm.currency || '$',
      bpm: Number(trackForm.bpm) || 140,
      key: trackForm.key || 'D Minor',
      tags: Array.isArray(trackForm.tags) ? trackForm.tags : ['Beat', 'Trap'],
      coverImage:
        trackForm.coverImage ||
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      audioPreviewUrl: trackForm.audioPreviewUrl || '',
      audioPreset: trackForm.audioPreset || 'drill_dark',
      downloadFileName: trackForm.downloadFileName || `${trackForm.title?.replace(/\s+/g, '_')}_Master.zip`,
      featured: !!trackForm.featured,
    };

    // Save to permanent backend (Cloudflare D1 / Database)
    const result = await apiSaveTrack(trackToSave, isEdit);
    const finalTrack = result.success && result.track ? result.track : trackToSave;

    if (isEdit) {
      const updated = tracks.map((t) => (t.id === editingTrackId ? finalTrack : t));
      onUpdateTracks(updated);
      triggerSuccessMessage(`✓ Track "${finalTrack.title}" updated and saved permanently!`);
    } else {
      onUpdateTracks([finalTrack, ...tracks]);
      triggerSuccessMessage(`✓ New track "${finalTrack.title}" added and saved permanently in D1 database!`);
    }

    setIsEditingTrack(false);
  };

  // Image Upload helper -> Sends directly to permanent storage (Cloudflare R2 / Server)
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploadingCover(true);
    setCoverUploadProgress(20);

    try {
      const result = await apiUploadMedia(file, (p) => setCoverUploadProgress(p));
      if (result.success && result.url) {
        setTrackForm((prev) => ({
          ...prev,
          coverImage: result.url,
        }));
        triggerSuccessMessage('✓ Cover artwork uploaded and saved permanently!');
      } else {
        setUploadError(result.error || 'Error uploading cover artwork.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload image.');
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Audio Upload helper -> Sends MP3/WAV directly to Cloudflare R2 / Server storage
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setIsUploadingAudio(true);
    setAudioUploadProgress(15);

    try {
      const result = await apiUploadMedia(file, (p) => setAudioUploadProgress(p));
      if (result.success && result.url) {
        setTrackForm((prev) => ({
          ...prev,
          audioPreviewUrl: result.url,
          downloadFileName: file.name,
        }));
        setAudioStorageType(result.storage || 'r2');
        triggerSuccessMessage(
          result.storage === 'r2'
            ? `✓ Audio file "${file.name}" permanently stored on Cloudflare R2!`
            : `✓ Audio file "${file.name}" permanently stored on server!`
        );
      } else {
        setUploadError(result.error || 'Error uploading audio file.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload audio file.');
    } finally {
      setIsUploadingAudio(false);
    }
  };

  // Payment Config Saving
  const handleSavePayments = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiSavePaymentConfig(editablePaymentConfig);
    onUpdatePaymentConfig(editablePaymentConfig);
    triggerSuccessMessage('✓ Payment settings and crypto wallets saved permanently!');
  };

  // Order status actions
  const handleConfirmOrder = async (orderId: string) => {
    await apiUpdateOrderStatus(orderId, 'confirmed');
    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status: 'confirmed' as const,
            confirmedAt: new Date().toISOString(),
          }
        : o
    );
    onUpdateOrders(updated);
    triggerSuccessMessage(`✓ Payment confirmed for order ${orderId}! Download access is now unlocked.`);
  };

  const handleRejectOrder = async (orderId: string) => {
    await apiUpdateOrderStatus(orderId, 'rejected');
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: 'rejected' as const } : o
    );
    onUpdateOrders(updated);
    triggerSuccessMessage(`✕ Order ${orderId} marked as rejected.`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('Permanently delete this order?')) {
      const updated = orders.filter((o) => o.id !== orderId);
      onUpdateOrders(updated);
      triggerSuccessMessage(`Order ${orderId} deleted.`);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== 'all' && o.status !== orderFilter) return false;
    if (orderSearch.trim()) {
      const s = orderSearch.toLowerCase();
      return (
        o.id.toLowerCase().includes(s) ||
        o.clientEmail.toLowerCase().includes(s) ||
        o.trackTitle.toLowerCase().includes(s) ||
        o.txHashOrRef.toLowerCase().includes(s)
      );
    }
    return true;
  });

  // Calculate order stats
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const confirmedCount = orders.filter((o) => o.status === 'confirmed').length;
  const totalRevenue = orders
    .filter((o) => o.status === 'confirmed')
    .reduce((sum, o) => sum + o.price, 0);

  // If not logged in, show Password Screen
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-[#0f111a] p-6 sm:p-8 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Lock className="h-7 w-7" />
            </div>
            <h2 className="text-2xl font-black text-white">Administrator Portal</h2>
            <p className="text-xs text-neutral-400">
              FALLEN 75 FRANCE – Storefront Management AA2026
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {authError && (
              <div className="rounded-xl bg-red-500/20 border border-red-500/40 p-3 text-xs font-bold text-red-300">
                {authError}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-neutral-300">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {showPassword ? 'Masquer' : 'Afficher'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="FALLEN2026AA"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-400">
                <span>
                  Mot de passe : <strong className="font-mono text-amber-400">FALLEN2026AA</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPasswordInput('FALLEN2026AA');
                    performLogin('FALLEN2026AA');
                  }}
                  className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20"
                >
                  ⚡ Déverrouiller en 1 clic
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 py-3 text-sm font-bold text-black hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              Sign In to Console
            </button>

            <button
              type="button"
              onClick={onOpenStore}
              className="w-full text-center text-xs text-neutral-400 hover:text-white pt-2 block"
            >
              ← Return to public storefront
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen pb-24">
      {/* Top Admin Header */}
      <div className="border-b border-neutral-800 bg-[#0c0d14] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-amber-500/20 p-2 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white tracking-wide">
                  Admin Console
                </h1>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                  CONNECTED
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                FALLEN 75 FRANCE – AA2026 • Cloudflare Pages & GitHub Ready
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenStore}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-700 bg-neutral-800/80 px-3.5 py-2 text-xs font-semibold text-neutral-200 hover:bg-neutral-700 hover:text-white transition-all"
            >
              <span>View Storefront</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="mx-auto mt-4 max-w-7xl">
          <div className="flex flex-wrap gap-1 rounded-xl bg-neutral-900/80 p-1 border border-neutral-800">
            <button
              onClick={() => setCurrentTab('tracks')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'tracks'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Music className="h-4 w-4" />
              <span>Tracks & Beats ({tracks.length})</span>
            </button>

            <button
              onClick={() => setCurrentTab('payments')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'payments'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Wallet className="h-4 w-4" />
              <span>Payment Methods & Wallets</span>
            </button>

            <button
              onClick={() => setCurrentTab('orders')}
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'orders'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <DollarSign className="h-4 w-4" />
              <span>Orders & Validations</span>
              {pendingCount > 0 && (
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-black ${
                  currentTab === 'orders' ? 'bg-black text-amber-400' : 'bg-amber-500 text-black animate-pulse'
                }`}>
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('deployment')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'deployment'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileCode className="h-4 w-4" />
              <span>Cloudflare & GitHub Guide</span>
            </button>

            <button
              onClick={() => setCurrentTab('backup')}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                currentTab === 'backup'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Save className="h-4 w-4" />
              <span>Backup & System</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Success Toast */}
      {saveSuccessMsg && (
        <div className="fixed top-20 right-4 z-50 rounded-xl bg-emerald-500/95 px-4 py-3 text-sm font-bold text-black shadow-2xl backdrop-blur-md animate-fade-in border border-emerald-400">
          {saveSuccessMsg}
        </div>
      )}

      {/* TAB CONTENT AREA */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* TAB 1: TRACKS MANAGEMENT */}
        {currentTab === 'tracks' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Tracks & Beats Management</h2>
                <p className="text-xs text-neutral-400">
                  Add, edit, or remove your instrumentals. Changes are immediately visible on the public storefront.
                </p>
              </div>

              <button
                id="add-new-track-btn"
                onClick={handleOpenAddTrack}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-amber-400 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Track</span>
              </button>
            </div>

            {/* Track Modal / Form */}
            {isEditingTrack && (
              <div className="rounded-2xl border border-amber-500/40 bg-[#12141f] p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                  <h3 className="text-lg font-bold text-white">
                    {editingTrackId ? 'Edit Track' : 'Add New Track'}
                  </h3>
                  <button
                    onClick={() => setIsEditingTrack(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    ✕ Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveTrackForm} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Track Title <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 75 SHADOWS"
                        value={trackForm.title || ''}
                        onChange={(e) => setTrackForm({ ...trackForm, title: e.target.value })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          MP3 Price <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          min="0.1"
                          value={trackForm.price ?? 0.99}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setTrackForm({ ...trackForm, price: val, mp3Price: val });
                          }}
                          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          WAV Price <span className="text-amber-400">*</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          min="0.1"
                          value={trackForm.wavPrice ?? 2.49}
                          onChange={(e) => setTrackForm({ ...trackForm, wavPrice: parseFloat(e.target.value) })}
                          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Currency
                        </label>
                        <select
                          value={trackForm.currency || '$'}
                          onChange={(e) => setTrackForm({ ...trackForm, currency: e.target.value })}
                          className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                        >
                          <option value="$">$ (USD)</option>
                          <option value="€">€ (EUR)</option>
                          <option value="USDT">USDT</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Tempo (BPM)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 140"
                        value={trackForm.bpm || 140}
                        onChange={(e) => setTrackForm({ ...trackForm, bpm: parseInt(e.target.value) })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Key / Scale
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. D Minor, F# Minor"
                        value={trackForm.key || ''}
                        onChange={(e) => setTrackForm({ ...trackForm, key: e.target.value })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="Trap, Drill, 808"
                        value={Array.isArray(trackForm.tags) ? trackForm.tags.join(', ') : ''}
                        onChange={(e) =>
                          setTrackForm({
                            ...trackForm,
                            tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                          })
                        }
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Track Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Describe mood, instruments, energy level..."
                      value={trackForm.description || ''}
                      onChange={(e) => setTrackForm({ ...trackForm, description: e.target.value })}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  {uploadError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {/* Cover Image */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start rounded-2xl border border-neutral-800 bg-[#0a0b12] p-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-neutral-300">
                          Cover Artwork
                        </label>
                        <span className="text-[10px] font-mono text-neutral-500">
                          R2 / Permanent
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="https://... or upload below"
                        value={trackForm.coverImage || ''}
                        onChange={(e) => setTrackForm({ ...trackForm, coverImage: e.target.value })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none mb-2 font-mono"
                      />

                      {/* Upload Button & Progress */}
                      {isUploadingCover ? (
                        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-300 space-y-1.5">
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1.5">
                              <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
                              Uploading to Cloudflare R2...
                            </span>
                            <span>{coverUploadProgress}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 transition-all duration-300"
                              style={{ width: `${coverUploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-neutral-700 bg-neutral-800/80 px-4 py-2.5 text-xs font-semibold text-amber-400 hover:bg-neutral-800 hover:text-amber-300 transition-all">
                          <Upload className="h-4 w-4" />
                          <span>Upload artwork to Cloudflare R2</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {trackForm.coverImage ? (
                      <div className="flex items-center gap-3 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                        <img
                          src={trackForm.coverImage}
                          alt="Preview"
                          className="h-20 w-20 rounded-xl object-cover border border-neutral-700 shadow-md shrink-0"
                        />
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Artwork configured</span>
                          </div>
                          <p className="text-[10px] text-neutral-400 truncate font-mono">
                            {trackForm.coverImage}
                          </p>
                          <button
                            type="button"
                            onClick={() => setTrackForm((p) => ({ ...p, coverImage: '' }))}
                            className="text-[10px] text-red-400 hover:underline"
                          >
                            Remove image
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-20 rounded-xl border border-dashed border-neutral-800 flex items-center justify-center text-xs text-neutral-500">
                        No image selected
                      </div>
                    )}
                  </div>

                  {/* Audio File / Synth Preset */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-neutral-800 bg-[#0a0b12] p-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold text-neutral-300">
                          Audio Preview File MP3 / WAV
                        </label>
                        <span className="rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 border border-amber-500/20">
                          Cloudflare R2 Permanent Storage
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="https://...mp3 or upload below"
                        value={trackForm.audioPreviewUrl || ''}
                        onChange={(e) => setTrackForm({ ...trackForm, audioPreviewUrl: e.target.value })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none mb-2 font-mono"
                      />

                      {/* Upload Button & Progress */}
                      {isUploadingAudio ? (
                        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-300 space-y-1.5">
                          <div className="flex items-center justify-between font-bold">
                            <span className="flex items-center gap-1.5">
                              <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
                              Uploading MP3 file to Cloudflare R2...
                            </span>
                            <span>{audioUploadProgress}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                            <div
                              className="h-full bg-amber-400 transition-all duration-300"
                              style={{ width: `${audioUploadProgress}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-neutral-400">
                            The audio file is stored permanently and retained across restarts.
                          </p>
                        </div>
                      ) : (
                        <label className="flex items-center justify-center gap-2 cursor-pointer rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition-all shadow-sm">
                          <Upload className="h-4 w-4" />
                          <span>Upload MP3 / WAV to Cloudflare R2</span>
                          <input
                            type="file"
                            accept="audio/mp3,audio/wav,audio/mpeg,audio/*"
                            onChange={handleAudioUpload}
                            className="hidden"
                          />
                        </label>
                      )}

                      {trackForm.audioPreviewUrl && (
                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Permanent MP3 file registered
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setTrackForm((p) => ({
                                  ...p,
                                  audioPreviewUrl: '',
                                }))
                              }
                              className="text-[10px] text-red-400 hover:underline"
                            >
                              Remove file
                            </button>
                          </div>
                          {/* Audio element preview */}
                          <audio
                            controls
                            src={trackForm.audioPreviewUrl}
                            className="w-full h-8 rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Fallback Web Synthesizer Preset
                      </label>
                      <select
                        value={trackForm.audioPreset || 'trap_808'}
                        onChange={(e) => setTrackForm({ ...trackForm, audioPreset: e.target.value as any })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="drill_dark">French Drill / 808 Glides (Dark & Aggressive)</option>
                        <option value="trap_808">Modern Trap / Flute & Heavy Sub</option>
                        <option value="cinematic_noir">Cinematic Noir / Brass Orchestra</option>
                        <option value="ambient_dusk">Ambient Dusk / Vintage Rhodes</option>
                        <option value="boombap_gritty">Boom Bap Bastille / Jazz Piano & Breakbeat</option>
                      </select>
                      <p className="mt-2 text-[11px] text-neutral-400 leading-relaxed">
                        If no MP3 file is uploaded, the web player will generate this procedural soundscape. If an MP3 is uploaded, it takes full precedence.
                      </p>
                    </div>
                  </div>

                  {/* Master Download Package Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Delivered Package Filename (After Payment Confirmation)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Fallen75_75_SHADOWS_Master_WAV.zip"
                      value={trackForm.downloadFileName || ''}
                      onChange={(e) => setTrackForm({ ...trackForm, downloadFileName: e.target.value })}
                      className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none font-mono"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="flex justify-end gap-3 pt-3 border-t border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setIsEditingTrack(false)}
                      className="rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-semibold text-neutral-300 hover:bg-neutral-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingTrackId ? 'Save Changes' : 'Create Track'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of existing tracks in admin */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0f111a] p-4 hover:border-neutral-700 transition-all"
                >
                  <div className="flex gap-3">
                    <img
                      src={track.coverImage}
                      alt={track.title}
                      className="h-16 w-16 rounded-xl object-cover border border-neutral-700 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white truncate text-sm">
                          {track.title}
                        </h4>
                        <span className="font-mono font-bold text-amber-400 text-sm">
                          {track.price} {track.currency}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                        {track.bpm} BPM • {track.key}
                      </p>
                      <p className="text-[11px] text-neutral-500 line-clamp-2 mt-1">
                        {track.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-neutral-800/80 pt-3">
                    <span className="text-[10px] font-mono text-neutral-500">
                      ID: {track.id}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditTrack(track)}
                        className="flex items-center gap-1 rounded-lg border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-700"
                      >
                        <Edit2 className="h-3 w-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteTrack(track.id)}
                        className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENTS & CRYPTO WALLETS */}
        {currentTab === 'payments' && (
          <form onSubmit={handleSavePayments} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Payment Methods & Wallet Addresses
                </h2>
                <p className="text-xs text-neutral-400">
                  Directly modify cryptocurrency deposit addresses and Skrill, Payoneer, and RedotPay account details.
                </p>
              </div>

              <button
                type="submit"
                id="save-payments-btn"
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save All Payment Methods</span>
              </button>
            </div>

            {/* Crypto Wallets Section */}
            <div className="rounded-2xl border border-neutral-800 bg-[#0f111a] p-5 sm:p-6 space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider">
                <Coins className="h-5 w-5" />
                <span>1. Cryptocurrency Wallets</span>
              </div>

              {/* USDT TRC20 */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    USDT – TRON Network (TRC20)
                  </span>
                  <span className="text-xs font-mono text-amber-400">Button: 📋 Copy USDT Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      USDT Wallet Address
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.crypto.usdtTron.address}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          crypto: {
                            ...editablePaymentConfig.crypto,
                            usdtTron: {
                              ...editablePaymentConfig.crypto.usdtTron,
                              address: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Displayed Network
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.crypto.usdtTron.network}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          crypto: {
                            ...editablePaymentConfig.crypto,
                            usdtTron: {
                              ...editablePaymentConfig.crypto.usdtTron,
                              network: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Ethereum */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    Ethereum (ETH) – ERC20 Network
                  </span>
                  <span className="text-xs font-mono text-amber-400">Button: 📋 Copy Ethereum Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Ethereum Wallet Address
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.crypto.ethereum.address}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          crypto: {
                            ...editablePaymentConfig.crypto,
                            ethereum: {
                              ...editablePaymentConfig.crypto.ethereum,
                              address: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Displayed Network
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.crypto.ethereum.network}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          crypto: {
                            ...editablePaymentConfig.crypto,
                            ethereum: {
                              ...editablePaymentConfig.crypto.ethereum,
                              network: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Solana */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    Solana (SOL) – Native Network
                  </span>
                  <span className="text-xs font-mono text-amber-400">Button: 📋 Copy Solana Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Solana Wallet Address
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.crypto.solana.address}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          crypto: {
                            ...editablePaymentConfig.crypto,
                            solana: {
                              ...editablePaymentConfig.crypto.solana,
                              address: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Displayed Network
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.crypto.solana.network}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          crypto: {
                            ...editablePaymentConfig.crypto,
                            solana: {
                              ...editablePaymentConfig.crypto.solana,
                              network: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Other Payment Methods Section (Skrill, Payoneer, RedotPay) */}
            <div className="rounded-2xl border border-neutral-800 bg-[#0f111a] p-5 sm:p-6 space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider">
                <CreditCard className="h-5 w-5" />
                <span>2. Other Payment Methods (Skrill, Payoneer, RedotPay)</span>
              </div>

              {/* Skrill */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
                <span className="font-bold text-white text-sm">Skrill</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Email or Skrill ID
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.otherMethods.skrill.account}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          otherMethods: {
                            ...editablePaymentConfig.otherMethods,
                            skrill: {
                              ...editablePaymentConfig.otherMethods.skrill,
                              account: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Customer Instructions
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.otherMethods.skrill.instructions}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          otherMethods: {
                            ...editablePaymentConfig.otherMethods,
                            skrill: {
                              ...editablePaymentConfig.otherMethods.skrill,
                              instructions: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payoneer */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
                <span className="font-bold text-white text-sm">Payoneer</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Email or Payoneer ID
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.otherMethods.payoneer.account}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          otherMethods: {
                            ...editablePaymentConfig.otherMethods,
                            payoneer: {
                              ...editablePaymentConfig.otherMethods.payoneer,
                              account: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Customer Instructions
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.otherMethods.payoneer.instructions}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          otherMethods: {
                            ...editablePaymentConfig.otherMethods,
                            payoneer: {
                              ...editablePaymentConfig.otherMethods.payoneer,
                              instructions: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* RedotPay */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
                <span className="font-bold text-white text-sm">RedotPay (Redot Visa Card)</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Email / RedotPay Account
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.otherMethods.redotpay.account}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          otherMethods: {
                            ...editablePaymentConfig.otherMethods,
                            redotpay: {
                              ...editablePaymentConfig.otherMethods.redotpay,
                              account: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="Azzoula Ali"
                      value={editablePaymentConfig.otherMethods.redotpay.beneficiaryName || ''}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          otherMethods: {
                            ...editablePaymentConfig.otherMethods,
                            redotpay: {
                              ...editablePaymentConfig.otherMethods.redotpay,
                              beneficiaryName: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                      Customer Instructions
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.otherMethods.redotpay.instructions}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          otherMethods: {
                            ...editablePaymentConfig.otherMethods,
                            redotpay: {
                              ...editablePaymentConfig.otherMethods.redotpay,
                              instructions: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* STUDIO CONTACT INFORMATION & SOCIAL MEDIA */}
              <div className="rounded-2xl border border-neutral-800 bg-[#0f111a] p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <MapPin className="h-5 w-5" />
                  <h3 className="text-base font-bold text-white">Studio Contact Information</h3>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  These details are displayed on the public storefront footer, hero section, and contact modal.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Official Studio Address
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.contactAddress || ''}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          contactAddress: e.target.value,
                        })
                      }
                      placeholder="75 Rue de Paris, 75000 Paris, France"
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Official Studio Email
                    </label>
                    <input
                      type="email"
                      value={editablePaymentConfig.contactEmail || ''}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          contactEmail: e.target.value,
                        })
                      }
                      placeholder="lawofice66@gmail.com"
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Studio Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="text"
                      value={editablePaymentConfig.contactPhone || ''}
                      onChange={(e) =>
                        setEditablePaymentConfig({
                          ...editablePaymentConfig,
                          contactPhone: e.target.value,
                        })
                      }
                      placeholder="+33 1 40 00 00 00"
                      className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-800/80">
                  <div className="flex items-center gap-2 text-amber-400 mb-3">
                    <Share2 className="h-4 w-4" />
                    <h4 className="text-sm font-bold text-white">Social Media & Streaming Channels</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        YouTube Channel
                      </label>
                      <input
                        type="url"
                        value={editablePaymentConfig.socialLinks?.youtube || ''}
                        onChange={(e) =>
                          setEditablePaymentConfig({
                            ...editablePaymentConfig,
                            socialLinks: {
                              ...editablePaymentConfig.socialLinks,
                              youtube: e.target.value,
                            },
                          })
                        }
                        placeholder="https://youtube.com/@fallen75france"
                        className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Instagram Profile
                      </label>
                      <input
                        type="url"
                        value={editablePaymentConfig.socialLinks?.instagram || ''}
                        onChange={(e) =>
                          setEditablePaymentConfig({
                            ...editablePaymentConfig,
                            socialLinks: {
                              ...editablePaymentConfig.socialLinks,
                              instagram: e.target.value,
                            },
                          })
                        }
                        placeholder="https://instagram.com/fallen75france"
                        className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        X / Twitter Profile
                      </label>
                      <input
                        type="url"
                        value={editablePaymentConfig.socialLinks?.twitter || ''}
                        onChange={(e) =>
                          setEditablePaymentConfig({
                            ...editablePaymentConfig,
                            socialLinks: {
                              ...editablePaymentConfig.socialLinks,
                              twitter: e.target.value,
                            },
                          })
                        }
                        placeholder="https://x.com/fallen75france"
                        className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        SoundCloud Profile
                      </label>
                      <input
                        type="url"
                        value={editablePaymentConfig.socialLinks?.soundcloud || ''}
                        onChange={(e) =>
                          setEditablePaymentConfig({
                            ...editablePaymentConfig,
                            socialLinks: {
                              ...editablePaymentConfig.socialLinks,
                              soundcloud: e.target.value,
                            },
                          })
                        }
                        placeholder="https://soundcloud.com/fallen75france"
                        className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Spotify Artist
                      </label>
                      <input
                        type="url"
                        value={editablePaymentConfig.socialLinks?.spotify || ''}
                        onChange={(e) =>
                          setEditablePaymentConfig({
                            ...editablePaymentConfig,
                            socialLinks: {
                              ...editablePaymentConfig.socialLinks,
                              spotify: e.target.value,
                            },
                          })
                        }
                        placeholder="https://open.spotify.com/artist/fallen75france"
                        className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-400 mb-1">
                        Telegram Channel / Contact
                      </label>
                      <input
                        type="url"
                        value={editablePaymentConfig.socialLinks?.telegram || ''}
                        onChange={(e) =>
                          setEditablePaymentConfig({
                            ...editablePaymentConfig,
                            socialLinks: {
                              ...editablePaymentConfig.socialLinks,
                              telegram: e.target.value,
                            },
                          })
                        }
                        placeholder="https://t.me/fallen75france"
                        className="w-full rounded-xl border border-neutral-700 bg-black/60 px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 shadow-xl shadow-amber-500/20 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Payment Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 3: ORDERS MANAGEMENT & VALIDATION */}
        {currentTab === 'orders' && (
          <div className="space-y-6">
            {/* Header & Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-neutral-800 bg-[#0f111a] p-4">
                <span className="text-xs font-mono text-neutral-400 block">TOTAL ORDERS</span>
                <span className="text-2xl font-black text-white font-mono mt-1 block">
                  {orders.length}
                </span>
              </div>

              <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-4">
                <span className="text-xs font-mono text-amber-400 block">PENDING VERIFICATION</span>
                <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
                  {pendingCount}
                </span>
              </div>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/10 p-4">
                <span className="text-xs font-mono text-emerald-400 block">CONFIRMED REVENUE</span>
                <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
                  {totalRevenue} €
                </span>
              </div>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex rounded-xl bg-neutral-900 p-1 border border-neutral-800">
                <button
                  onClick={() => setOrderFilter('all')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    orderFilter === 'all' ? 'bg-amber-500 text-black' : 'text-neutral-400'
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setOrderFilter('pending')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    orderFilter === 'pending' ? 'bg-amber-500 text-black' : 'text-neutral-400'
                  }`}
                >
                  Pending ({pendingCount})
                </button>
                <button
                  onClick={() => setOrderFilter('confirmed')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    orderFilter === 'confirmed' ? 'bg-amber-500 text-black' : 'text-neutral-400'
                  }`}
                >
                  Confirmed ({confirmedCount})
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by ID, email, TxID..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full sm:w-64 rounded-xl border border-neutral-800 bg-neutral-900/90 pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#0f111a]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141724] text-neutral-400 uppercase font-mono text-[10px] border-b border-neutral-800">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Client</th>
                    <th className="p-3.5">Track</th>
                    <th className="p-3.5">Method & TxHash</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Verification Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-mono">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-neutral-500 font-sans">
                        No orders matching the criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const isPending = order.status === 'pending';
                      const isConfirmed = order.status === 'confirmed';

                      return (
                        <tr
                          key={order.id}
                          className={`hover:bg-neutral-900/40 transition-colors ${
                            isPending ? 'bg-amber-500/5' : ''
                          }`}
                        >
                          <td className="p-3.5 font-bold text-amber-400">{order.id}</td>
                          <td className="p-3.5 text-neutral-400">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="p-3.5 font-sans">
                            <span className="font-semibold text-white block">{order.clientEmail}</span>
                            {order.clientNotes && (
                              <span className="text-[10px] text-neutral-400 italic block">
                                "{order.clientNotes}"
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 font-sans font-bold text-white">
                            {order.trackTitle}
                          </td>
                          <td className="p-3.5 max-w-[200px]">
                            <span className="font-bold text-amber-300 block">{order.paymentMethod}</span>
                            <span className="text-[10px] text-neutral-400 truncate block font-mono" title={order.txHashOrRef}>
                              {order.txHashOrRef}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-white">
                            {order.price} {order.currency}
                          </td>
                          <td className="p-3.5 font-sans">
                            {isConfirmed && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                                <CheckCircle2 className="h-3 w-3" />
                                Verified (Download active)
                              </span>
                            )}
                            {isPending && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30 animate-pulse">
                                <Clock className="h-3 w-3" />
                                Pending
                              </span>
                            )}
                            {order.status === 'rejected' && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 border border-red-500/30">
                                <XCircle className="h-3 w-3" />
                                Rejected
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-right font-sans">
                            <div className="flex items-center justify-end gap-1.5">
                              {isPending && (
                                <button
                                  onClick={() => handleConfirmOrder(order.id)}
                                  className="flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1 text-xs font-bold text-black hover:bg-emerald-400 transition-all cursor-pointer shadow"
                                  title="Confirm payment and authorize download"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  <span>Verify payment</span>
                                </button>
                              )}

                              {isConfirmed && (
                                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                  Active Link
                                </span>
                              )}

                              {isPending && (
                                <button
                                  onClick={() => handleRejectOrder(order.id)}
                                  className="rounded-lg border border-neutral-700 bg-neutral-800 p-1 text-neutral-400 hover:text-red-400"
                                  title="Reject"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                              )}

                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="rounded-lg p-1 text-neutral-500 hover:text-red-400"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: DEPLOYMENT GUIDE (CLOUDFLARE PAGES, R2 & D1) */}
        {currentTab === 'deployment' && (
          <div className="space-y-6">
            {/* Cloudflare Architecture Banner */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-[#0f111a] to-[#141824] p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/20 p-2.5 text-amber-400 border border-amber-500/30">
                  <Cloud className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">
                    Cloudflare Architecture: Pages + Workers + R2 + D1
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Permanent storage for your audio files, cover art, and global SQL database.
                  </p>
                </div>
              </div>

              {/* Architecture 4-pillar diagram */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <Cloud className="h-4 w-4" />
                    <span>Cloudflare Pages</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Ultra-fast public storefront hosting with worldwide CDN and automated SSL certificate.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                    <FileCode className="h-4 w-4" />
                    <span>Cloudflare Functions</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Secure API in <code className="text-amber-300">/functions/api</code> managing uploads and orders.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <HardDrive className="h-4 w-4" />
                    <span>Cloudflare R2</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Permanent storage for all your MP3 audio files and artworks with zero egress bandwidth fees.
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <Database className="h-4 w-4" />
                    <span>Cloudflare D1</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Persistent relational SQL database to store tracks, prices, and orders.
                  </p>
                </div>
              </div>

              {/* Step by step deployment */}
              <div className="space-y-4 pt-4">
                {/* Step 1 */}
                <div className="rounded-xl border border-neutral-800 bg-[#090a0f] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black text-xs font-black">
                      1
                    </span>
                    <span>Create D1 Database and R2 Bucket on Cloudflare</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    In your terminal using Cloudflare Wrangler:
                  </p>
                  <div className="rounded-lg bg-black/80 p-3 font-mono text-xs text-amber-300 select-all overflow-x-auto space-y-1">
                    <div className="text-neutral-500"># 1. Configured D1 Database: fallen75-db (ID: 812c3d47-fcbe-44fa-91ab-e5514cc5c7e5)</div>
                    <div className="text-neutral-500 pt-1"># 2. Initialize SQL tables on your production database:</div>
                    <div className="text-white">npx wrangler d1 execute fallen75-db --remote --file=./schema.sql</div>
                    <div className="text-neutral-500 pt-1"># 3. Configured R2 audio storage bucket:</div>
                    <div className="text-emerald-400">music-2026</div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="rounded-xl border border-neutral-800 bg-[#090a0f] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black text-xs font-black">
                      2
                    </span>
                    <span>Deploy with Cloudflare Pages</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    Deploy your storefront in a single command or via GitHub:
                  </p>
                  <div className="rounded-lg bg-black/80 p-3 font-mono text-xs text-amber-300 select-all overflow-x-auto space-y-1">
                    <div>npm run build</div>
                    <div>npx wrangler pages deploy dist --project-name fallen75-france</div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="rounded-xl border border-neutral-800 bg-[#090a0f] p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-black text-xs font-black">
                      3
                    </span>
                    <span>Bind variables in Cloudflare Dashboard</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    On <strong>dash.cloudflare.com</strong> &gt; Your Pages project &gt; <strong>Settings</strong> &gt; <strong>Functions</strong>:
                  </p>
                  <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1 font-mono">
                    <li><strong className="text-amber-300">D1 Database bindings</strong>: Variable = <code className="text-white">DB</code>, Database = <code className="text-white">fallen75-db</code></li>
                    <li><strong className="text-amber-300">R2 Bucket bindings</strong>: Variable = <code className="text-white">R2_BUCKET</code>, Bucket = <code className="text-white">music-2026</code></li>
                    <li><strong className="text-amber-300">Environment variable</strong>: <code className="text-white">ADMIN_PASSWORD</code> = <code className="text-emerald-400">fallen75</code> (Secret)</li>
                    <li><strong className="text-amber-300">R2 Public URL</strong>: <code className="text-sky-400 text-[11px]">https://fallen-music-store.lawofice66.workers.dev</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BACKUP & SYSTEM SETTINGS */}
        {currentTab === 'backup' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="rounded-2xl border border-neutral-800 bg-[#0f111a] p-6 space-y-4">
              <h3 className="text-lg font-bold text-white">Backup & Data Export</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Export all your tracks, crypto wallet addresses, and order history into a JSON file to prevent any data loss and easily transfer your store across devices.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onExportBackup}
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-black hover:bg-amber-400 cursor-pointer shadow"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Backup (.JSON)</span>
                </button>

                <label className="flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-neutral-700 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span>Restore a Backup</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const content = event.target?.result as string;
                          if (content && onImportBackup(content)) {
                            triggerSuccessMessage('✓ Data restored successfully!');
                          } else {
                            alert('Invalid JSON file.');
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Reset to defaults */}
            <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 space-y-3">
              <h3 className="text-sm font-bold text-red-400">Factory Reset</h3>
              <p className="text-xs text-neutral-400">
                Restore the original catalog of beats and initial crypto wallet addresses (TGCFdvC4qCJNUJpt31TyxuVCM1doERyJAe, 0x983d..., Hkxr...).
              </p>
              <button
                onClick={() => {
                  if (window.confirm('Do you want to reset all data to default values?')) {
                    onResetData();
                    triggerSuccessMessage('✓ Catalog and wallets reset to default values.');
                  }
                }}
                className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/20 px-4 py-2 text-xs font-bold text-red-300 hover:bg-red-500/30 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Reset to default data</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
