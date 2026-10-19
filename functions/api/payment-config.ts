// Cloudflare Pages Function: /api/payment-config
interface Env {
  DB?: any;
  ADMIN_PASSWORD?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  if (env.DB) {
    try {
      const row = await env.DB.prepare(
        'SELECT data FROM payment_config WHERE id = ?'
      ).bind('global_config').first();

      if (row && row.data) {
        return new Response(row.data, {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (e) {
      console.error('D1 payment config error:', e);
    }
  }

  // Return initial payment configuration if not yet set in D1
  const defaultConfig = {
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
    adminPasswordHash: 'fallen75',
    contactEmail: 'lawofice66@gmail.com',
    contactAddress: '75 Rue de Paris, 75000 Paris, France',
    contactCity: 'Paris',
    contactCountry: 'France',
    contactPhone: '+33 1 42 68 75 00',
    socialLinks: {
      youtube: 'https://youtube.com/@fallen75france',
      instagram: 'https://instagram.com/fallen75france',
      twitter: 'https://twitter.com/fallen75france',
      soundcloud: 'https://soundcloud.com/fallen75france',
    },
    cryptoWallets: {
      usdtTron: 'TGCFdvC4qCJNUJpt31TyxuVCM1doERyJAe',
      ethereum: '0x983dA5413e8755f027DaF36611f1D98Ecfce0300',
      solana: 'HkxrjqehskPQy5HPw5zYKtQo877ntWScffMCHgXphW72',
    },
  };

  return new Response(JSON.stringify(defaultConfig), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = env.ADMIN_PASSWORD || 'fallen75';

  if (!authHeader || (!authHeader.includes(expectedPassword) && !authHeader.includes('.'))) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await request.json();
    const dataStr = JSON.stringify(data);

    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO payment_config (id, data, updatedAt) VALUES (?, ?, datetime('now'))
         ON CONFLICT(id) DO UPDATE SET data = excluded.data, updatedAt = datetime('now')`
      )
        .bind('global_config', dataStr)
        .run();
    }

    return new Response(JSON.stringify({ success: true, config: data }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
