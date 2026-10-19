export interface Track {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
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
  crypto: {
    usdtTron: {
      label: string;
      network: string;
      address: string;
      buttonText: string;
      active: boolean;
      qrCodeData?: string;
      instructions: string;
    };
    ethereum: {
      label: string;
      network: string;
      address: string;
      buttonText: string;
      active: boolean;
      qrCodeData?: string;
      instructions: string;
    };
    solana: {
      label: string;
      network: string;
      address: string;
      buttonText: string;
      active: boolean;
      qrCodeData?: string;
      instructions: string;
    };
  };
  otherMethods: {
    skrill: {
      label: string;
      account: string;
      instructions: string;
      active: boolean;
    };
    payoneer: {
      label: string;
      account: string;
      instructions: string;
      active: boolean;
    };
    redotpay: {
      label: string;
      account: string;
      beneficiaryName?: string;
      instructions: string;
      active: boolean;
    };
  };
  adminPasswordHash: string; // Plain or hashed in local storage
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
