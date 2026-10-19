// Cloudflare Pages Function: /api/orders
interface Env {
  DB?: any;
  ADMIN_PASSWORD?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const orderId = url.searchParams.get('orderId');
  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = env.ADMIN_PASSWORD || 'fallen75';
  const isAdmin = authHeader && (authHeader.includes(expectedPassword) || authHeader.includes('.'));

  if (!env.DB) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (orderId) {
      const { results } = await env.DB.prepare(
        'SELECT * FROM orders WHERE id = ? OR transactionRef = ?'
      ).bind(orderId, orderId).all();
      return new Response(JSON.stringify(results || []), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: 'Accès non autorisé.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { results } = await env.DB.prepare(
      'SELECT * FROM orders ORDER BY createdAt DESC'
    ).all();

    return new Response(JSON.stringify(results || []), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  try {
    const data = (await request.json()) as any;
    const id = data.id || `order-${Date.now()}`;

    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO orders (id, trackId, trackTitle, amount, currency, method, cryptoNetwork, transactionRef, customerEmail, customerName, status, createdAt, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'), ?)`
      )
        .bind(
          id,
          data.trackId,
          data.trackTitle,
          Number(data.amount) || 0,
          data.currency || '€',
          data.method,
          data.cryptoNetwork || '',
          data.transactionRef || '',
          data.customerEmail,
          data.customerName || '',
          data.notes || ''
        )
        .run();
    }

    return new Response(JSON.stringify({ success: true, order: { ...data, id, status: 'pending' } }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
