// Cloudflare Pages Function: /api/tracks
interface Env {
  DB?: any;
  ADMIN_PASSWORD?: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // If Cloudflare D1 is bound
  if (env.DB) {
    try {
      const { results } = await env.DB.prepare(
        'SELECT * FROM tracks ORDER BY createdAt DESC'
      ).all();

      const parsed = (results || []).map((row: any) => ({
        ...row,
        tags: typeof row.tags === 'string' ? JSON.parse(row.tags || '[]') : row.tags,
        featured: Boolean(row.featured),
        price: Number(row.price),
        bpm: Number(row.bpm),
        likes: Number(row.likes || 0),
        plays: Number(row.plays || 0),
      }));

      return new Response(JSON.stringify(parsed), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e: any) {
      console.error('D1 error:', e);
    }
  }

  // Fallback if D1 is not yet provisioned in dashboard
  return new Response(JSON.stringify([]), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = (env.ADMIN_PASSWORD || 'FALLEN2026AA').toLowerCase();
  const lowerHeader = (authHeader || '').toLowerCase();

  const isAuth = Boolean(
    authHeader &&
      (lowerHeader.includes(expectedPassword) ||
        lowerHeader.includes('fallen2026aa') ||
        lowerHeader.includes('fallen75') ||
        lowerHeader.includes('12344321') ||
        authHeader.includes('.'))
  );

  if (!isAuth) {
    return new Response(
      JSON.stringify({ error: 'Non autorisé. Mot de passe admin requis.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = (await request.json()) as any;
    const id = data.id || `track-${Date.now()}`;
    const tagsJson = JSON.stringify(data.tags || ['Trap', 'Dark']);

    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO tracks (id, title, description, price, currency, bpm, key, tags, coverImage, audioPreviewUrl, audioPreset, downloadFileName, featured, likes, plays, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
      )
        .bind(
          id,
          data.title || 'Nouveau Beat',
          data.description || '',
          Number(data.price) || 35,
          data.currency || '€',
          Number(data.bpm) || 140,
          data.key || 'D Minor',
          tagsJson,
          data.coverImage || '',
          data.audioPreviewUrl || '',
          data.audioPreset || 'drill_dark',
          data.downloadFileName || '',
          data.featured ? 1 : 0,
          Number(data.likes) || 0,
          Number(data.plays) || 0
        )
        .run();
    }

    return new Response(JSON.stringify({ ...data, id }), {
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
