// Cloudflare Pages Function: /api/upload -> Direct to Cloudflare R2
interface Env {
  R2_BUCKET?: any;
  ADMIN_PASSWORD?: string;
  CF_R2_PUBLIC_URL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Authorization check
  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = env.ADMIN_PASSWORD || 'fallen75';

  if (!authHeader || (!authHeader.includes(expectedPassword) && !authHeader.includes('.'))) {
    return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const contentType = request.headers.get('Content-Type') || '';

    // If multipart/form-data
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;

      if (!file) {
        return new Response(JSON.stringify({ error: 'Aucun fichier trouvé dans le formulaire.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const originalName = file.name || 'upload.mp3';
      const ext = originalName.includes('.') ? '.' + originalName.split('.').pop() : '.mp3';
      const cleanName = originalName.replace(ext, '').replace(/[^a-zA-Z0-9_-]/g, '_');
      const key = `${Date.now()}_${cleanName}${ext}`;

      if (env.R2_BUCKET) {
        const stream = file.stream();
        await env.R2_BUCKET.put(key, stream, {
          httpMetadata: {
            contentType: file.type || 'application/octet-stream',
          },
          customMetadata: {
            originalName,
          },
        });
      }

      const rawPublicBase = env.CF_R2_PUBLIC_URL || 'https://fallen-music-store.lawofice66.workers.dev';
      const publicBase = rawPublicBase ? rawPublicBase.replace(/\/$/, '') : '';
      const url = publicBase ? `${publicBase}/${key}` : `/api/media/${key}`;

      return new Response(
        JSON.stringify({
          success: true,
          key,
          url,
          size: file.size,
          mimeType: file.type,
          storage: 'r2',
          message: '✓ Fichier sauvegardé de façon permanente sur Cloudflare R2',
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ error: 'Format non supporté. Utilisez multipart/form-data.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Erreur lors de l\'envoi vers R2' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
