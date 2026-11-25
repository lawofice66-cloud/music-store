export interface Track {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  status?: 'released' | 'unreleased';
  category?: string;
  type?: string;
  mp3Price?: number;
  wavPrice?: number;
  bpm: number;
  key: string;
  tags: string[];
  coverImage: string;
  audioPreviewUrl?: string;
  audioPreset?: 'drill_dark' | 'trap_808' | 'cinematic_noir' | 'ambient_dusk' | 'boombap_gritty';
  downloadFileUrl?: string; // High-res WAV/MP3 link or data URI
  downloadFileName?: string;
  fileSize?: string; // e.g. "3 MB", "47 MB"
  likes?: number;
  plays?: number;
  isExclusiveAvailable?: boolean;
  exclusivePrice?: number;
  featured?: boolean;
}

export interface SocialLinks {
  youtube: string;
  instagram: string;
  twitter: string;
  soundcloud: string;
  spotify: string;
  telegram: string;
}

export interface PaymentConfig {
  creem?: {
    releasedMp3Link: string;
    releasedMp3Price: number;
    unreleasedWavLink: string;
    unreleasedWavPrice: number;
    unreleasedPack10Link: string;
    unreleasedPack10Price: number;
  };
  adminPasswordHash: string;
  contactEmail: string;
  contactAddress?: string;
  contactCity?: string;
  contactCountry?: string;
  contactPhone?: string;
  socialLinks?: SocialLinks;
}

export type OrderStatus = 'pending' | 'confirmed' | 'rejected';

export interface Order {
  id: string;
  trackId: string;
  trackTitle: string;
  licenseType?: string;
  price: number;
  currency: string;
  clientEmail: string;
  paymentMethod: string;
  txHashOrRef: string;
  clientNotes?: string;
  status: OrderStatus;
  createdAt: string;
  confirmedAt?: string;
  downloadToken: string;
}
