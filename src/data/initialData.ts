import { Track, PaymentConfig, Order } from '../types';
import { GLOBAL_TRACKS_CATALOG } from './tracksData';

export const INITIAL_PAYMENT_CONFIG: PaymentConfig = {
  crypto: {
    usdtTron: {
      label: 'USDT (TRC20)',
      network: 'TRON Network (TRC20)',
      address: 'TGCFdvC4qCJNUJpt31TyxuVCM1doERyJAe',
      buttonText: 'Copy USDT Address',
      active: true,
      instructions: 'Send only USDT via the TRON network (TRC20). Any transfer via another network (ERC20, BSC) will be permanently lost.',
    },
    ethereum: {
      label: 'Ethereum (ETH)',
      network: 'Ethereum Mainnet (ERC20)',
      address: '0x983dA5413e8755f027DaF36611f1D98Ecfce0300',
      buttonText: 'Copy Ethereum Address',
      active: true,
      instructions: 'Send ETH or ERC20 tokens strictly on the Ethereum Mainnet.',
    },
    solana: {
      label: 'Solana (SOL)',
      network: 'Solana Network (SOL)',
      address: 'HkxrjqehskPQy5HPw5zYKtQo877ntWScffMCHgXphW72',
      buttonText: 'Copy Solana Address',
      active: true,
      instructions: 'Send SOL strictly on the native Solana Mainnet.',
    },
  },
  otherMethods: {
    skrill: {
      label: 'Skrill',
      account: 'azzoulaali@hotmail.com',
      instructions: 'Send a direct Skrill transfer to azzoulaali@hotmail.com with the beat title as transaction reference.',
      active: true,
    },
    payoneer: {
      label: 'Payoneer',
      account: 'azzoulaali@hotmail.com',
      instructions: 'Use the fee-free "Pay another Payoneer user" feature to azzoulaali@hotmail.com and include the beat title.',
      active: true,
    },
    redotpay: {
      label: 'RedotPay (Visa Card)',
      account: 'lawofice66@gmail.com',
      beneficiaryName: 'Azzoula Ali',
      instructions: 'Transfer to RedotPay account / Redot Visa card using email lawofice66@gmail.com (Cardholder: Azzoula Ali). Include the beat title.',
      active: true,
    },
  },
  adminPasswordHash: 'FALLEN2026AA',
  contactEmail: 'lawofice66@gmail.com',
  contactAddress: '75 Rue de Paris, 75000 Paris, France',
  contactCity: 'Paris',
  contactCountry: 'France',
  contactPhone: '+33 1 42 68 75 00',
  socialLinks: {
    youtube: 'https://youtube.com/@fallen75france',
    instagram: 'https://instagram.com/fallen75france',
    twitter: 'https://x.com/fallen75france',
    soundcloud: 'https://soundcloud.com/fallen75france',
    spotify: 'https://open.spotify.com/artist/fallen75france',
    telegram: 'https://t.me/fallen75france',
  },
};

export const INITIAL_TRACKS: Track[] = GLOBAL_TRACKS_CATALOG;

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'F75-ORD-9021',
    trackId: 'track-1',
    trackTitle: '75 SHADOWS',
    licenseType: 'WAV ($2.49)',
    price: 2.49,
    currency: '$',
    clientEmail: 'producer.paris@gmail.com',
    paymentMethod: 'USDT (TRC20)',
    txHashOrRef: 'e6a8f172b83491c3d90284716281746281927391746291028374619284716291',
    clientNotes: 'Payment sent for WAV Master package.',
    status: 'confirmed',
    createdAt: '2026-09-13T14:22:00Z',
    confirmedAt: '2026-09-13T14:45:00Z',
    downloadToken: 'dl_tok_75shadows_demo9021',
  },
  {
    id: 'F75-ORD-9022',
    trackId: 'track-2',
    trackTitle: 'PARIS NOIR 2026',
    licenseType: 'MP3 ($0.99)',
    price: 0.99,
    currency: '$',
    clientEmail: 'studio.records@outlook.fr',
    paymentMethod: 'Solana',
    txHashOrRef: '4k8W9xLpQ2vNm7ZtJ1cE6uF8hR4dY3aT9sP5oM2wX7yU1',
    clientNotes: 'MP3 License purchased via Phantom Wallet.',
    status: 'pending',
    createdAt: '2026-09-14T06:15:00Z',
    downloadToken: 'dl_tok_parisnoir_demo9022',
  },
];
