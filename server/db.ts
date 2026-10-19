import fs from 'fs';
import path from 'path';
import { Track, PaymentConfig, Order } from '../src/types';
import { INITIAL_TRACKS, INITIAL_PAYMENT_CONFIG, INITIAL_ORDERS } from '../src/data/initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  tracks: Track[];
  paymentConfig: PaymentConfig;
  orders: Order[];
  version: number;
}

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadDatabase(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      const data = JSON.parse(content);
      if (data && Array.isArray(data.tracks)) {
        let changed = false;

        // Upgrade track list if older small list is found (< 50 tracks)
        if (data.tracks.length < INITIAL_TRACKS.length) {
          const existingIds = new Set(data.tracks.map((t: Track) => t.id));
          const existingTitles = new Set(data.tracks.map((t: Track) => t.title.toLowerCase().trim()));
          
          // Add all missing tracks from the global catalog
          for (const catalogTrack of INITIAL_TRACKS) {
            if (!existingIds.has(catalogTrack.id) && !existingTitles.has(catalogTrack.title.toLowerCase().trim())) {
              data.tracks.push(catalogTrack);
              changed = true;
            }
          }
        }

        // Ensure every track has likes and plays defined
        const catalogMap = new Map(INITIAL_TRACKS.map((t) => [t.id, t]));
        for (const t of data.tracks) {
          if (t.likes === undefined || t.plays === undefined) {
            const cat = catalogMap.get(t.id);
            if (t.likes === undefined) t.likes = cat?.likes || 42;
            if (t.plays === undefined) t.plays = cat?.plays || 750;
            changed = true;
          }
        }

        // Ensure contact details & social links exist in paymentConfig
        if (!data.paymentConfig?.socialLinks || !data.paymentConfig?.contactAddress) {
          data.paymentConfig = {
            ...INITIAL_PAYMENT_CONFIG,
            ...data.paymentConfig,
            contactAddress: data.paymentConfig?.contactAddress || INITIAL_PAYMENT_CONFIG.contactAddress,
            contactCity: data.paymentConfig?.contactCity || INITIAL_PAYMENT_CONFIG.contactCity,
            contactCountry: data.paymentConfig?.contactCountry || INITIAL_PAYMENT_CONFIG.contactCountry,
            contactPhone: data.paymentConfig?.contactPhone || INITIAL_PAYMENT_CONFIG.contactPhone,
            socialLinks: {
              ...INITIAL_PAYMENT_CONFIG.socialLinks,
              ...(data.paymentConfig?.socialLinks || {}),
            },
          };
          changed = true;
        }

        // Ensure RedotPay, Skrill, Payoneer have correct details if older default was stored
        if (
          !data.paymentConfig?.otherMethods?.redotpay?.beneficiaryName ||
          data.paymentConfig?.otherMethods?.redotpay?.account === 'ID: 752026889'
        ) {
          data.paymentConfig = {
            ...INITIAL_PAYMENT_CONFIG,
            ...data.paymentConfig,
            otherMethods: {
              ...INITIAL_PAYMENT_CONFIG.otherMethods,
              ...(data.paymentConfig?.otherMethods || {}),
              redotpay: INITIAL_PAYMENT_CONFIG.otherMethods.redotpay,
              skrill: INITIAL_PAYMENT_CONFIG.otherMethods.skrill,
              payoneer: INITIAL_PAYMENT_CONFIG.otherMethods.payoneer,
            },
          };
          changed = true;
        }

        if (changed || (data.version || 1) < 2) {
          data.version = 2;
          saveDatabase(data);
        }
        return data;
      }
    }
  } catch (err) {
    console.error('Failed to load db.json, re-initializing default schema:', err);
  }

  const initialDb: DatabaseSchema = {
    tracks: INITIAL_TRACKS,
    paymentConfig: INITIAL_PAYMENT_CONFIG,
    orders: INITIAL_ORDERS,
    version: 2,
  };
  saveDatabase(initialDb);
  return initialDb;
}

function saveDatabase(data: DatabaseSchema) {
  try {
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('Failed to save db.json:', err);
  }
}

// Track operations
export function getTracks(): Track[] {
  const db = loadDatabase();
  return db.tracks;
}

export function getTrackById(id: string): Track | undefined {
  const db = loadDatabase();
  return db.tracks.find((t) => t.id === id);
}

export function createTrack(trackData: Omit<Track, 'id'> & { id?: string }): Track {
  const db = loadDatabase();
  const id = trackData.id || `track-${Date.now()}`;
  const newTrack: Track = {
    ...trackData,
    id,
    tags: Array.isArray(trackData.tags) ? trackData.tags : ['Beat', 'Trap'],
    price: Number(trackData.price) || 35,
    currency: trackData.currency || '€',
  };

  db.tracks = [newTrack, ...db.tracks];
  saveDatabase(db);
  return newTrack;
}

export function updateTrack(id: string, updates: Partial<Track>): Track | null {
  const db = loadDatabase();
  const index = db.tracks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  db.tracks[index] = {
    ...db.tracks[index],
    ...updates,
    id, // protect id
  };
  saveDatabase(db);
  return db.tracks[index];
}

export function deleteTrack(id: string): boolean {
  const db = loadDatabase();
  const initialLength = db.tracks.length;
  db.tracks = db.tracks.filter((t) => t.id !== id);
  if (db.tracks.length !== initialLength) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function likeTrack(id: string, delta = 1): Track | null {
  const db = loadDatabase();
  const track = db.tracks.find((t) => t.id === id);
  if (!track) return null;
  track.likes = Math.max(0, (track.likes || 0) + delta);
  saveDatabase(db);
  return track;
}

export function recordTrackPlay(id: string): Track | null {
  const db = loadDatabase();
  const track = db.tracks.find((t) => t.id === id);
  if (!track) return null;
  track.plays = (track.plays || 0) + 1;
  saveDatabase(db);
  return track;
}
export function getPaymentConfig(): PaymentConfig {
  const db = loadDatabase();
  return db.paymentConfig;
}

export function updatePaymentConfig(newConfig: PaymentConfig): PaymentConfig {
  const db = loadDatabase();
  db.paymentConfig = newConfig;
  saveDatabase(db);
  return db.paymentConfig;
}

// Order operations
export function getOrders(): Order[] {
  const db = loadDatabase();
  return db.orders;
}

export function createOrder(order: Order): Order {
  const db = loadDatabase();
  db.orders = [order, ...db.orders];
  saveDatabase(db);
  return order;
}

export function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'confirmed' | 'rejected',
  notes?: string
): Order | null {
  const db = loadDatabase();
  const index = db.orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  db.orders[index] = {
    ...db.orders[index],
    status,
    confirmedAt: status === 'confirmed' ? new Date().toISOString() : db.orders[index].confirmedAt,
    clientNotes: notes !== undefined ? notes : db.orders[index].clientNotes,
  };

  saveDatabase(db);
  return db.orders[index];
}
