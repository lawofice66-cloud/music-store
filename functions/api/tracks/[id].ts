// Cloudflare Pages Function: /api/tracks/:id
interface Env {
  DB?: any;
  ADMIN_PASSWORD?: string;
  R2_BUCKET?: any;
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;
  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = env.ADMIN_PASSWORD || 'fallen75';

  if (!authHeader || (!authHeader.includes(expectedPassword) && !authHeader.includes('.'))) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = (await request.json()) as any;
    const tagsJson = JSON.stringify(data.tags || ['Trap', 'Dark']);

    if (env.DB) {
      await env.DB.prepare(
        `UPDATE tracks SET
          title = ?, description = ?, price = ?, currency = ?, bpm = ?, key = ?, tags = ?,
          coverImage = ?, audioPreviewUrl = ?, audioPreset = ?, downloadFileName = ?,
          featured = ?, updatedAt = datetime('now')
         WHERE id = ?`
      )
        .bind(
          data.title,
          data.description,
          Number(data.price) || 35,
          data.currency || '€',
          Number(data.bpm) || 140,
          data.key || 'D Minor',
          tagsJson,
          data.coverImage,
          data.audioPreviewUrl,
          data.audioPreset,
          data.downloadFileName,
          data.featured ? 1 : 0,
          id
        )
        .run();
    }

    return new Response(JSON.stringify({ ...data, id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;
  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = env.ADMIN_PASSWORD || 'fallen75';

  if (!authHeader || (!authHeader.includes(expectedPassword) && !authHeader.includes('.'))) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (env.DB) {
      await env.DB.prepare('DELETE FROM tracks WHERE id = ?').bind(id).run();
    }
    return new Response(JSON.stringify({ success: true, id }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
