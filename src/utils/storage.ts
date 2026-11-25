import { Track, PaymentConfig, Order } from '../types';
import { INITIAL_TRACKS, INITIAL_PAYMENT_CONFIG, INITIAL_ORDERS } from '../data/initialData';
import { CREEM_CONFIG } from '../config/creem';

const TRACKS_KEY = 'fallen75_tracks_v2';
const PAYMENT_CONFIG_KEY = 'fallen75_payment_config_v2';
const ORDERS_KEY = 'fallen75_orders_v1';

export function getStoredTracks(): Track[] {
  try {
    const raw = localStorage.getItem(TRACKS_KEY);
    if (!raw) {
      saveStoredTracks(INITIAL_TRACKS);
      return INITIAL_TRACKS;
    }
    let parsed: Track[] = JSON.parse(raw);
    parsed = parsed.map((track) => {
      const isUnreleased = track.status === 'unreleased';
      return {
        ...track,
        price: isUnreleased
          ? CREEM_CONFIG.products.unreleasedWav.price
          : CREEM_CONFIG.products.releasedMp3.price,
        mp3Price: CREEM_CONFIG.products.releasedMp3.price,
        wavPrice: CREEM_CONFIG.products.unreleasedWav.price,
        currency: '$',
        status: isUnreleased ? 'unreleased' : 'released',
        tags:
          Array.isArray(track.tags) && track.tags.length > 0
            ? track.tags
            : [track.category || 'Beat', 'Studio Master'],
        bpm: track.bpm || 120,
        key: track.key || 'Am',
        coverImage:
          track.coverImage ||
          (track as any).cover ||
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      };
    });
    if (parsed.length < INITIAL_TRACKS.length) {
      const existingIds = new Set(parsed.map((t) => t.id));
      const existingTitles = new Set(parsed.map((t) => t.title.toLowerCase().trim()));
      const merged = [...parsed];
      for (const track of INITIAL_TRACKS) {
        if (!existingIds.has(track.id) && !existingTitles.has(track.title.toLowerCase().trim())) {
          merged.push(track);
        }
      }
      saveStoredTracks(merged);
      return merged;
    }
    saveStoredTracks(parsed);
    return parsed;
  } catch (e) {
    console.error('Error reading tracks from storage', e);
    return INITIAL_TRACKS;
  }
}

export function saveStoredTracks(tracks: Track[]): void {
  try {
    localStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
  } catch (e) {
    console.error('Error saving tracks to storage', e);
  }
}

export function getStoredPaymentConfig(): PaymentConfig {
  try {
    const raw = localStorage.getItem(PAYMENT_CONFIG_KEY);
    if (!raw) {
      saveStoredPaymentConfig(INITIAL_PAYMENT_CONFIG);
      return INITIAL_PAYMENT_CONFIG;
    }
    const config: PaymentConfig = JSON.parse(raw);
    const merged: PaymentConfig = {
      ...INITIAL_PAYMENT_CONFIG,
      ...config,
      creem: {
        ...INITIAL_PAYMENT_CONFIG.creem!,
        ...(config.creem || {}),
      },
      socialLinks: {
        ...INITIAL_PAYMENT_CONFIG.socialLinks!,
        ...(config.socialLinks || {}),
      },
    };
    return merged;
  } catch (e) {
    console.error('Error reading payment config from storage', e);
    return INITIAL_PAYMENT_CONFIG;
  }
}

export function saveStoredPaymentConfig(config: PaymentConfig): void {
  try {
    localStorage.setItem(PAYMENT_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving payment config to storage', e);
  }
}

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      saveStoredOrders(INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading orders from storage', e);
    return INITIAL_ORDERS;
  }
}

export function saveStoredOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Error saving orders to storage', e);
  }
}

export function exportBackupJson(): string {
  const data = {
    app: 'FALLEN75',
    domain: 'fallen75.com',
    exportedAt: new Date().toISOString(),
    tracks: getStoredTracks(),
    paymentConfig: getStoredPaymentConfig(),
    orders: getStoredOrders(),
  };
  return JSON.stringify(data, null, 2);
}

export function importBackupJson(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (data.tracks && Array.isArray(data.tracks)) {
      saveStoredTracks(data.tracks);
    }
    if (data.paymentConfig) {
      saveStoredPaymentConfig(data.paymentConfig);
    }
    if (data.orders && Array.isArray(data.orders)) {
      saveStoredOrders(data.orders);
    }
    return true;
  } catch (e) {
    console.error('Invalid backup JSON format', e);
    return false;
  }
}

export function resetAllData(): void {
  saveStoredTracks(INITIAL_TRACKS);
  saveStoredPaymentConfig(INITIAL_PAYMENT_CONFIG);
  saveStoredOrders(INITIAL_ORDERS);
}
