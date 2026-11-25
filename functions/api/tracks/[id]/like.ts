// Cloudflare Pages Function: /api/tracks/:id/like
interface Env {
  DB?: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const trackId = params.id as string;

  try {
    let delta = 1;
    try {
      const body = (await request.json()) as any;
      if (typeof body?.delta === 'number') delta = body.delta;
    } catch {}

    let newLikes = 0;
    if (env.DB) {
      await env.DB.prepare(
        'UPDATE tracks SET likes = MAX(0, COALESCE(likes, 0) + ?) WHERE id = ?'
      )
        .bind(delta, trackId)
        .run();

      const updated = await env.DB.prepare('SELECT likes FROM tracks WHERE id = ?')
        .bind(trackId)
        .first();
      newLikes = updated?.likes ?? 0;
    }

    return new Response(JSON.stringify({ success: true, id: trackId, likes: newLikes }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
