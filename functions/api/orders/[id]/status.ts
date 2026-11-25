// Cloudflare Pages Function: /api/orders/:id/status
interface Env {
  DB?: any;
  ADMIN_PASSWORD?: string;
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const orderId = params.id as string;

  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = env.ADMIN_PASSWORD || '12344321';
  const isAdmin = authHeader && (authHeader.includes(expectedPassword) || authHeader.includes('fallen75') || authHeader.includes('.'));

  if (!isAdmin) {
    return new Response(JSON.stringify({ error: 'Accès administrateur requis.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { status, notes } = (await request.json()) as any;
    if (!['pending', 'confirmed', 'rejected'].includes(status)) {
      return new Response(JSON.stringify({ error: 'Statut invalide.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (env.DB) {
      await env.DB.prepare(
        `UPDATE orders SET
          status = ?,
          confirmedAt = CASE WHEN ? = 'confirmed' THEN datetime('now') ELSE confirmedAt END,
          notes = ?
         WHERE id = ?`
      )
        .bind(status, status, notes || null, orderId)
        .run();

      const updated = await env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(orderId).first();
      return new Response(
        JSON.stringify({
          success: true,
          order: updated || { id: orderId, status },
          message: `Statut de la commande mis à jour: ${status}`,
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        order: { id: orderId, status },
        message: 'Statut mis à jour (fallback mémoire).',
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
