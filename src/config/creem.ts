// ============================================================================
// fallen75.com - EDITABLE CREEM PAYMENT CONFIGURATION
// Edit all 3 prices and all 3 Creem links here in one place.
// ============================================================================

export interface CreemProduct {
  id: 'releasedMp3' | 'unreleasedWav' | 'unreleasedPack10';
  status: 'RELEASED' | 'UNRELEASED';
  licenseName: string;
  price: number;
  priceFormatted: string;
  buttonText: string;
  link: string;
  description: string;
}

export const CREEM_CONFIG = {
  brandName: 'FALLEN75',
  siteDomain: 'fallen75.com',
  checkoutNote: 'After payment, write the Beat Name / Beat Names at checkout on Creem.',
  products: {
    releasedMp3: {
      id: 'releasedMp3',
      status: 'RELEASED',
      licenseName: 'RELEASED - MP3 License',
      price: 1.0,
      priceFormatted: '$1.00',
      buttonText: 'Buy MP3 - $1.00',
      link: 'https://www.creem.io/payment/prod_35P7g5itdW4ytsIHc9vgBZ',
      description:
        'Released track - Already distributed. Allowed: personal use, social media, parties, personal videos. Not allowed: re-distribution, commercial sync.',
    },
    unreleasedWav: {
      id: 'unreleasedWav',
      status: 'UNRELEASED',
      licenseName: 'UNRELEASED - WAV License',
      price: 2.45,
      priceFormatted: '$2.45',
      buttonText: 'Buy WAV - $2.45',
      link: 'https://www.creem.io/payment/prod_5E701tbx3wXcTie3aCMtrk',
      description:
        'Unreleased 24-bit WAV - Never distributed, never released. Allowed: 1 streaming release on your name, 1 music video, social media, parties, personal videos. Not allowed: resale, commercial sync.',
    },
    unreleasedPack10: {
      id: 'unreleasedPack10',
      status: 'UNRELEASED',
      licenseName: 'UNRELEASED - 10-Track Pack',
      price: 30.0,
      priceFormatted: '$30.00',
      buttonText: 'Buy 10-Track Pack - $30.00',
      link: 'https://www.creem.io/payment/prod_7kcKZnJ8lwBorM0zHm5DLg',
      description:
        '10 Unreleased beats - MP3 + 24-bit WAV. Never distributed, never released. Allowed per beat: 1 first streaming release on your name, 1 music video, social media. Not allowed: resale, commercial sync.',
    },
  } as Record<'releasedMp3' | 'unreleasedWav' | 'unreleasedPack10', CreemProduct>,
};

export const CREEM_PRODUCTS_LIST: CreemProduct[] = [
  CREEM_CONFIG.products.releasedMp3,
  CREEM_CONFIG.products.unreleasedWav,
  CREEM_CONFIG.products.unreleasedPack10,
];
