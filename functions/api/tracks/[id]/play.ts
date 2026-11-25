// Cloudflare Pages Function: /api/tracks/:id/play
interface Env {
  DB?: any;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  const trackId = params.id as string;

  try {
    let newPlays = 0;
    if (env.DB) {
      await env.DB.prepare(
        'UPDATE tracks SET plays = COALESCE(plays, 0) + 1 WHERE id = ?'
      )
        .bind(trackId)
        .run();

      const updated = await env.DB.prepare('SELECT plays FROM tracks WHERE id = ?')
        .bind(trackId)
        .first();
      newPlays = updated?.plays ?? 0;
    }

    return new Response(JSON.stringify({ success: true, id: trackId, plays: newPlays }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
