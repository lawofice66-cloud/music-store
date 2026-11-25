import { Track, PaymentConfig, Order } from '../types';
import { GLOBAL_TRACKS_CATALOG } from './tracksData';
import { CREEM_CONFIG } from '../config/creem';

export const INITIAL_PAYMENT_CONFIG: PaymentConfig = {
  creem: {
    releasedMp3Link: CREEM_CONFIG.products.releasedMp3.link,
    releasedMp3Price: CREEM_CONFIG.products.releasedMp3.price,
    unreleasedWavLink: CREEM_CONFIG.products.unreleasedWav.link,
    unreleasedWavPrice: CREEM_CONFIG.products.unreleasedWav.price,
    unreleasedPack10Link: CREEM_CONFIG.products.unreleasedPack10.link,
    unreleasedPack10Price: CREEM_CONFIG.products.unreleasedPack10.price,
  },
  adminPasswordHash: 'FALLEN2026AA',
  contactEmail: 'contact@fallen75.com',
  contactAddress: 'fallen75.com Official Studio',
  contactCity: '',
  contactCountry: '',
  contactPhone: '',
  socialLinks: {
    youtube: 'https://www.youtube.com/channel/UCAROXprR9QaUS2WBRMCM2dA',
    instagram: 'https://www.instagram.com/',
    twitter: 'https://x.com/fallen75',
    soundcloud: 'https://soundcloud.com/fallen75',
    spotify: 'https://open.spotify.com/artist/5iiVHI32IvfzR5QmE9FOoh',
    telegram: 'https://t.me/fallen75',
  },
};

export const INITIAL_TRACKS: Track[] = GLOBAL_TRACKS_CATALOG;

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'F75-ORD-9021',
    trackId: 'track-1',
    trackTitle: '75 SHADOWS',
    licenseType: `${CREEM_CONFIG.products.unreleasedWav.licenseName} (${CREEM_CONFIG.products.unreleasedWav.priceFormatted})`,
    price: CREEM_CONFIG.products.unreleasedWav.price,
    currency: '$',
    clientEmail: 'artist@example.com',
    paymentMethod: 'Creem Checkout',
    txHashOrRef: 'CREEM-9021',
    clientNotes: 'Beat Name submitted at Creem checkout.',
    status: 'confirmed',
    createdAt: '2026-09-13T14:22:00Z',
    confirmedAt: '2026-09-13T14:45:00Z',
    downloadToken: 'dl_tok_75shadows_9021',
  },
  {
    id: 'F75-ORD-9022',
    trackId: 'track-2',
    trackTitle: 'AFTER THE STORM',
    licenseType: `${CREEM_CONFIG.products.releasedMp3.licenseName} (${CREEM_CONFIG.products.releasedMp3.priceFormatted})`,
    price: CREEM_CONFIG.products.releasedMp3.price,
    currency: '$',
    clientEmail: 'creator@example.com',
    paymentMethod: 'Creem Checkout',
    txHashOrRef: 'CREEM-9022',
    clientNotes: 'Beat Name submitted at Creem checkout.',
    status: 'pending',
    createdAt: '2026-09-14T06:15:00Z',
    downloadToken: 'dl_tok_afterstorm_9022',
  },
];
