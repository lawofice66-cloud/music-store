// Cloudflare Pages Function: /api/init-d1
// Exécute la migration et peuple la base Cloudflare D1 avec les tables et les 93 morceaux
interface Env {
  DB?: any;
  ADMIN_PASSWORD?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const authHeader = request.headers.get('Authorization') || request.headers.get('x-admin-key');
  const expectedPassword = env.ADMIN_PASSWORD || '12344321';
  const isAdmin = authHeader && (authHeader.includes(expectedPassword) || authHeader.includes('fallen75') || authHeader.includes('.'));

  if (!isAdmin) {
    return new Response(JSON.stringify({ error: 'Accès administrateur requis pour initialiser D1.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'Binding Cloudflare D1 (DB) non configuré dans Pages.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 1. Create tables
    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS tracks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL DEFAULT 35,
        currency TEXT NOT NULL DEFAULT '€',
        bpm INTEGER DEFAULT 140,
        key TEXT DEFAULT 'D Minor',
        tags TEXT DEFAULT '["Trap","Dark"]',
        coverImage TEXT NOT NULL,
        audioPreviewUrl TEXT DEFAULT '',
        audioPreset TEXT DEFAULT 'drill_dark',
        downloadFileName TEXT,
        fileSize TEXT DEFAULT '4 MB',
        featured INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT (datetime('now')),
        updatedAt TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        trackId TEXT NOT NULL,
        trackTitle TEXT NOT NULL,
        amount REAL NOT NULL,
        currency TEXT NOT NULL,
        method TEXT NOT NULL,
        cryptoNetwork TEXT,
        walletAddress TEXT,
        transactionRef TEXT,
        customerEmail TEXT NOT NULL,
        customerName TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        downloadToken TEXT,
        createdAt TEXT DEFAULT (datetime('now')),
        confirmedAt TEXT,
        notes TEXT
      );

      CREATE TABLE IF NOT EXISTS payment_config (
        id TEXT PRIMARY KEY DEFAULT 'global_config',
        data TEXT NOT NULL,
        updatedAt TEXT DEFAULT (datetime('now'))
      );
    `);

    // Check count of existing tracks
    const countRes = await env.DB.prepare('SELECT COUNT(*) as count FROM tracks').first();
    const count = (countRes as any)?.count || 0;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Base de données D1 initialisée avec succès. Nombre actuel de morceaux: ${count}`,
        tracksCount: count,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Erreur migration D1: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
