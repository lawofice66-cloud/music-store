import { Track, PaymentConfig, Order } from '../types';
import { INITIAL_TRACKS, INITIAL_PAYMENT_CONFIG, INITIAL_ORDERS } from '../data/initialData';

const TRACKS_KEY = 'fallen75_tracks_v1';
const PAYMENT_CONFIG_KEY = 'fallen75_payment_config_v1';
const ORDERS_KEY = 'fallen75_orders_v1';

export function getStoredTracks(): Track[] {
  try {
    const raw = localStorage.getItem(TRACKS_KEY);
    if (!raw) {
      saveStoredTracks(INITIAL_TRACKS);
      return INITIAL_TRACKS;
    }
    let parsed: Track[] = JSON.parse(raw);
    let needsMigration = false;
    parsed = parsed.map((track) => {
      if (track.currency === '€' || track.price === 35 || !track.mp3Price) {
        needsMigration = true;
        return {
          ...track,
          price: 0.99,
          mp3Price: 0.99,
          wavPrice: 2.49,
          currency: '$',
        };
      }
      return track;
    });
    // If the cached list has fewer tracks than the global catalog, upgrade seamlessly
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
    if (needsMigration) { saveStoredTracks(parsed); }
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
    let changed = false;

    // Ensure contact details & social links exist in stored paymentConfig
    if (!config.socialLinks || !config.contactAddress) {
      config.contactAddress = config.contactAddress || INITIAL_PAYMENT_CONFIG.contactAddress;
      config.contactCity = config.contactCity || INITIAL_PAYMENT_CONFIG.contactCity;
      config.contactCountry = config.contactCountry || INITIAL_PAYMENT_CONFIG.contactCountry;
      config.contactPhone = config.contactPhone || INITIAL_PAYMENT_CONFIG.contactPhone;
      config.socialLinks = {
        ...INITIAL_PAYMENT_CONFIG.socialLinks!,
        ...(config.socialLinks || {}),
      };
      changed = true;
    }

    // Auto-migrate if older placeholder accounts were in localStorage
    if (
      config.otherMethods?.redotpay?.account === 'ID: 752026889' ||
      config.otherMethods?.skrill?.account === 'contact@fallen75france.com' ||
      !config.otherMethods?.redotpay?.beneficiaryName
    ) {
      config.otherMethods = {
        ...INITIAL_PAYMENT_CONFIG.otherMethods,
        ...config.otherMethods,
        skrill: INITIAL_PAYMENT_CONFIG.otherMethods.skrill,
        payoneer: INITIAL_PAYMENT_CONFIG.otherMethods.payoneer,
        redotpay: INITIAL_PAYMENT_CONFIG.otherMethods.redotpay,
      };
      changed = true;
    }

    if (changed) {
      saveStoredPaymentConfig(config);
    }
    return config;
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
    app: 'FALLEN 75 FRANCE',
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
