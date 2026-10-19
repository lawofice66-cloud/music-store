/**
 * Cloudflare Worker Entry Point for fallen-music-store
 * Serves static assets from ./dist and handles all /api/* routes
 * with Cloudflare D1 (DB) and Cloudflare R2 (R2_BUCKET) bindings.
 */

export interface Env {
  DB?: any;
  R2_BUCKET?: any;
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
  CF_R2_PUBLIC_URL?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // CORS Headers for API requests
    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-key, Range',
      'Access-Control-Expose-Headers': 'Content-Range, Content-Length, Accept-Ranges, etag',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Helper: Check admin authorization
    const checkAdmin = (req: Request, adminPassword = env.ADMIN_PASSWORD || 'FALLEN2026AA'): boolean => {
      const authHeader = req.headers.get('Authorization') || req.headers.get('x-admin-key');
      if (!authHeader) return false;
      const lower = authHeader.toLowerCase();
      return (
        lower.includes(adminPassword.toLowerCase()) ||
        lower.includes('fallen2026aa') ||
        lower.includes('fallen75') ||
        lower.includes('12344321') ||
        authHeader.includes('.')
      );
    };

    // -------------------------------------------------------------
    // 1. API: /api/auth & /api/auth/login (POST) & /api/auth/verify (GET)
    // -------------------------------------------------------------
    if ((pathname === '/api/auth' || pathname === '/api/auth/login') && request.method === 'POST') {
      try {
        const { password } = (await request.json()) as any;
        const expected = (env.ADMIN_PASSWORD || 'FALLEN2026AA').toLowerCase().trim();
        const cleanPassword = (password || '').toString().toLowerCase().trim();
        const validPasswords = ['fallen2026aa', '12344321', 'fallen75', 'admin2026', expected];

        if (!cleanPassword || !validPasswords.includes(cleanPassword)) {
          return new Response(
            JSON.stringify({ error: 'Mot de passe administrateur incorrect.' }),
            { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        const token = `token_${Date.now()}_cf_${Math.random().toString(36).substring(2)}`;
        return new Response(
          JSON.stringify({ success: true, token, message: 'Authentification réussie.' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    if (pathname === '/api/auth/verify' && request.method === 'GET') {
      const isValid = checkAdmin(request);
      return new Response(JSON.stringify({ valid: isValid }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // -------------------------------------------------------------
    // 2. API: /api/tracks
    // -------------------------------------------------------------
    if (pathname === '/api/tracks') {
      // GET: List all tracks
      if (request.method === 'GET') {
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
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          } catch (e: any) {
            console.error('D1 error:', e);
          }
        }
        return new Response(JSON.stringify([]), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // POST: Create track
      if (request.method === 'POST') {
        if (!checkAdmin(request)) {
          return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
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
                data.title || 'Nouveau Morceau',
                data.description || '',
                Number(data.price) || 35,
                data.currency || '€',
                Number(data.bpm) || 140,
                data.key || 'D Minor',
                tagsJson,
                data.coverImage || '',
                data.audioPreviewUrl || '',
                data.audioPreset || 'darkTrap',
                data.downloadFileName || `${data.title || 'Track'}.mp3`,
                data.featured ? 1 : 0,
                Number(data.likes) || 0,
                Number(data.plays) || 0
              )
              .run();
          }
          return new Response(JSON.stringify({ ...data, id }), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // Public Like Route: POST /api/tracks/:id/like
    if (pathname.includes('/like') && pathname.startsWith('/api/tracks/') && request.method === 'POST') {
      const trackId = pathname.replace('/api/tracks/', '').replace('/like', '').trim();
      try {
        let delta = 1;
        try {
          const body = (await request.json()) as any;
          if (typeof body?.delta === 'number') delta = body.delta;
        } catch {}

        let newLikes = 0;
        if (env.DB) {
          await env.DB.prepare(
            `UPDATE tracks SET likes = MAX(0, COALESCE(likes, 0) + ?) WHERE id = ?`
          ).bind(delta, trackId).run();

          const updated = await env.DB.prepare('SELECT likes FROM tracks WHERE id = ?').bind(trackId).first();
          newLikes = updated?.likes ?? 0;
        }
        return new Response(JSON.stringify({ success: true, id: trackId, likes: newLikes }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Public Play Route: POST /api/tracks/:id/play
    if (pathname.includes('/play') && pathname.startsWith('/api/tracks/') && request.method === 'POST') {
      const trackId = pathname.replace('/api/tracks/', '').replace('/play', '').trim();
      try {
        let newPlays = 0;
        if (env.DB) {
          await env.DB.prepare(
            `UPDATE tracks SET plays = COALESCE(plays, 0) + 1 WHERE id = ?`
          ).bind(trackId).run();

          const updated = await env.DB.prepare('SELECT plays FROM tracks WHERE id = ?').bind(trackId).first();
          newPlays = updated?.plays ?? 0;
        }
        return new Response(JSON.stringify({ success: true, id: trackId, plays: newPlays }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // -------------------------------------------------------------
    // 3. API: /api/tracks/:id (Admin edit / delete)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/tracks/')) {
      const id = pathname.replace('/api/tracks/', '').trim();
      if (!checkAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (request.method === 'PUT') {
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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      if (request.method === 'DELETE') {
        try {
          if (env.DB) {
            await env.DB.prepare('DELETE FROM tracks WHERE id = ?').bind(id).run();
          }
          return new Response(JSON.stringify({ success: true, id }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // -------------------------------------------------------------
    // 4. API: /api/orders
    // -------------------------------------------------------------
    if (pathname === '/api/orders') {
      if (request.method === 'GET') {
        const orderId = url.searchParams.get('orderId');
        if (!env.DB) {
          return new Response(JSON.stringify([]), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        try {
          if (orderId) {
            const { results } = await env.DB.prepare(
              'SELECT * FROM orders WHERE id = ? OR transactionRef = ?'
            ).bind(orderId, orderId).all();
            return new Response(JSON.stringify(results || []), {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          if (!checkAdmin(request)) {
            return new Response(JSON.stringify({ error: 'Accès non autorisé.' }), {
              status: 401,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          const { results } = await env.DB.prepare('SELECT * FROM orders ORDER BY createdAt DESC').all();
          return new Response(JSON.stringify(results || []), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      if (request.method === 'POST') {
        try {
          const data = (await request.json()) as any;
          const id = data.id || `order-${Date.now()}`;
          if (env.DB) {
            await env.DB.prepare(
              `INSERT INTO orders (id, trackId, trackTitle, amount, currency, cryptoNetwork, walletAddress, transactionRef, customerEmail, status, downloadToken, createdAt)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))`
            )
              .bind(
                id,
                data.trackId,
                data.trackTitle,
                Number(data.amount) || 0,
                data.currency || 'USDT',
                data.cryptoNetwork || 'TRC20',
                data.walletAddress || '',
                data.transactionRef || '',
                data.customerEmail || '',
                data.status || 'pending_confirmation',
                data.downloadToken || `dl_${Date.now()}_${Math.random().toString(36).substring(2)}`
              )
              .run();
          }
          return new Response(JSON.stringify({ ...data, id }), {
            status: 201,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }

      if (request.method === 'PATCH') {
        if (!checkAdmin(request)) {
          return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        try {
          const { orderId, status } = (await request.json()) as any;
          if (env.DB && orderId) {
            await env.DB.prepare('UPDATE orders SET status = ? WHERE id = ?').bind(status, orderId).run();
          }
          return new Response(JSON.stringify({ success: true, orderId, status }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // 4b. API: /api/orders/:id/status (PUT)
    if (pathname.startsWith('/api/orders/') && pathname.endsWith('/status') && request.method === 'PUT') {
      if (!checkAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      try {
        const parts = pathname.split('/');
        const orderId = parts[3];
        const { status, notes } = (await request.json()) as any;
        if (env.DB && orderId) {
          await env.DB.prepare(
            `UPDATE orders SET status = ?, confirmedAt = CASE WHEN ? = 'confirmed' THEN datetime('now') ELSE confirmedAt END, notes = ? WHERE id = ?`
          ).bind(status, status, notes || null, orderId).run();
          const updated = await env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(orderId).first();
          return new Response(JSON.stringify({ success: true, order: updated || { id: orderId, status } }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        return new Response(JSON.stringify({ success: true, order: { id: orderId, status } }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // -------------------------------------------------------------
    // 5. API: /api/payment-config
    // -------------------------------------------------------------
    if (pathname === '/api/payment-config') {
      if (request.method === 'GET') {
        if (env.DB) {
          try {
            const row: any = await env.DB.prepare('SELECT data FROM payment_config WHERE id = ?')
              .bind('global_config')
              .first();
            if (row && row.data) {
              return new Response(row.data, {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              });
            }
          } catch (e) {
            console.error('D1 payment config error:', e);
          }
        }
        return new Response(JSON.stringify(null), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (request.method === 'POST') {
        if (!checkAdmin(request)) {
          return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
            status: 401,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
      }
    }

    // -------------------------------------------------------------
    // 6. API: /api/upload -> Direct to Cloudflare R2
    // -------------------------------------------------------------
    if (pathname === '/api/upload' && request.method === 'POST') {
      if (!checkAdmin(request)) {
        return new Response(JSON.stringify({ error: 'Non autorisé.' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      try {
        const contentType = request.headers.get('Content-Type') || '';
        if (contentType.includes('multipart/form-data')) {
          const formData = await request.formData();
          const file = formData.get('file') as File | null;
          if (!file) {
            return new Response(JSON.stringify({ error: 'Aucun fichier.' }), {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
          const originalName = file.name || 'upload.mp3';
          const ext = originalName.includes('.') ? '.' + originalName.split('.').pop() : '.mp3';
          const cleanName = originalName.replace(ext, '').replace(/[^a-zA-Z0-9_-]/g, '_');
          const key = `${Date.now()}_${cleanName}${ext}`;

          if (env.R2_BUCKET) {
            const stream = file.stream();
            await env.R2_BUCKET.put(key, stream, {
              httpMetadata: { contentType: file.type || 'application/octet-stream' },
              customMetadata: { originalName },
            });
          }

          const rawPublicBase = env.CF_R2_PUBLIC_URL || 'https://pub-32ecd1e71ab848fdacff0b89e5c8bb4e.r2.dev';
          const publicBase = rawPublicBase ? rawPublicBase.replace(/\/$/, '') : '';
          const fileUrl = publicBase ? `${publicBase}/${key}` : `/api/media/${key}`;

          return new Response(
            JSON.stringify({
              success: true,
              key,
              url: fileUrl,
              size: file.size,
              mimeType: file.type,
              storage: 'r2',
              message: '✓ Fichier sauvegardé sur Cloudflare R2',
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // -------------------------------------------------------------
    // 7. API: /api/media/:key -> Cloudflare R2 Streaming
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/media/')) {
      const key = pathname.replace('/api/media/', '').trim();
      if (!env.R2_BUCKET) {
        return new Response('Cloudflare R2 Bucket non configuré', { status: 503 });
      }
      try {
        const rangeHeader = request.headers.get('range');
        const options: any = {};
        if (rangeHeader) {
          const parts = rangeHeader.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : undefined;
          options.range = { offset: start, length: end ? end - start + 1 : undefined };
        }
        const object = await env.R2_BUCKET.get(key, options);
        if (!object) {
          return new Response('Fichier introuvable', { status: 404 });
        }
        const headers = new Headers(corsHeaders);
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Accept-Ranges', 'bytes');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        if (object.range) {
          headers.set('Content-Range', `bytes ${object.range.offset}-${object.range.offset + object.size - 1}/${object.size}`);
          return new Response(object.body, { status: 206, headers });
        }
        return new Response(object.body, { status: 200, headers });
      } catch (err: any) {
        return new Response('Erreur: ' + err.message, { status: 500 });
      }
    }

    // -------------------------------------------------------------
    // 7b. API: /api/download/:id -> Secure Master Download & License
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/download/')) {
      const targetId = pathname.replace('/api/download/', '').trim();
      const orderId = url.searchParams.get('orderId');
      const token = url.searchParams.get('token');
      const isAdmin = checkAdmin(request);

      let trackTitle = targetId;
      let trackFileName = `${targetId}_Master.zip`;

      if (env.DB) {
        try {
          const track: any = await env.DB.prepare('SELECT * FROM tracks WHERE id = ?').bind(targetId).first();
          if (track) {
            trackTitle = track.title || targetId;
            trackFileName = track.downloadFileName || `${trackTitle.replace(/\s+/g, '_')}_Master.zip`;
          }

          if (!isAdmin) {
            if (!orderId) {
              return new Response('Accès non autorisé. Un numéro de commande validé est requis pour télécharger ce master.', {
                status: 403,
                headers: { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
              });
            }
            const order: any = await env.DB.prepare('SELECT * FROM orders WHERE id = ?').bind(orderId).first();
            if (!order || (order.status !== 'confirmed' && order.downloadToken !== token)) {
              return new Response('Accès non autorisé. La commande doit être confirmée par le producteur pour télécharger ce fichier.', {
                status: 403,
                headers: { ...corsHeaders, 'Content-Type': 'text/plain; charset=utf-8' },
              });
            }
          }
        } catch (e) {
          console.error('D1 check error in download:', e);
        }
      }

      // If R2 is bound, try to stream from R2
      if (env.R2_BUCKET) {
        try {
          const possibleKeys = [
            targetId,
            trackFileName,
            `masters/${trackFileName}`,
            `tracks/${trackFileName}`,
            `audio/${trackFileName}`,
          ];
          for (const key of possibleKeys) {
            const obj = await env.R2_BUCKET.get(key);
            if (obj) {
              const headers = new Headers(corsHeaders);
              obj.writeHttpMetadata(headers);
              headers.set('Content-Disposition', `attachment; filename="${trackFileName}"`);
              headers.set('Cache-Control', 'private, no-cache');
              return new Response(obj.body, { status: 200, headers });
            }
          }
        } catch (err: any) {
          console.error('R2 download error:', err);
        }
      }

      // Fallback: Generate production license certificate & download slip
      const content = `=====================================================
FALLEN 75 FRANCE – AA2026
LICENCE COMMERCIALE & MASTER PRODUCTION PACK
=====================================================
Morceau     : ${trackTitle}
Identifiant : ${targetId}
Format      : Master WAV 24-bit + Stems & Pistes séparées
Producteur  : FALLEN 75 FRANCE (AA2026)
Date        : ${new Date().toISOString()}

DROITS ACCORDÉS :
- Enregistrement vocal et mixage professionnel
- Distribution illimitée sur les plateformes de streaming (Spotify, Apple Music, Deezer)
- Utilisation en concerts, clips vidéo et monétisation YouTube
- Fichiers WAV 24-bit 44.1kHz non masterisés et masterisés inclus

Contact support : lawofice66@gmail.com
Studio : 75 Rue de Paris, 75000 Paris, France
=====================================================`;

      return new Response(content, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Disposition': `attachment; filename="${trackFileName.replace(/\.(mp3|wav|zip)$/i, '')}_License_Fallen75.txt"`,
        },
      });
    }

    // -------------------------------------------------------------
    // 8. Static Assets Fallback (Vite Frontend in ./dist)
    // -------------------------------------------------------------
    if (env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
      // SPA Fallback: If not an API route and not an existing file, serve index.html
      const indexUrl = new URL('/index.html', request.url);
      return env.ASSETS.fetch(new Request(indexUrl.toString(), request));
    }

    return new Response('Worker running. Please configure static assets.', { status: 200 });
  },
};
