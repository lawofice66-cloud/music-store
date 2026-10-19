// Cloudflare Pages Function: /api/media/:key -> Streams directly from Cloudflare R2
interface Env {
  R2_BUCKET?: any;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params, request } = context;
  const key = params.key as string;

  if (!env.R2_BUCKET) {
    return new Response('Cloudflare R2 Bucket non configuré', { status: 503 });
  }

  try {
    const rangeHeader = request.headers.get('range');
    const options: any = {};

    if (rangeHeader) {
      // Parse Range: bytes=start-end
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : undefined;
      options.range = { offset: start, length: end ? end - start + 1 : undefined };
    }

    const object = await env.R2_BUCKET.get(key, options);

    if (!object) {
      return new Response('Fichier introuvable', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    if (object.range) {
      headers.set('Content-Range', `bytes ${object.range.offset}-${object.range.offset + object.size - 1}/${object.size}`);
      return new Response(object.body, {
        status: 206,
        headers,
      });
    }

    return new Response(object.body, {
      status: 200,
      headers,
    });
  } catch (err: any) {
    return new Response('Erreur lecture media: ' + err.message, { status: 500 });
  }
};
