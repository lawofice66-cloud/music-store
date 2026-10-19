// Cloudflare Pages Function: /api/auth
interface Env {
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const configuredPassword = (env.ADMIN_PASSWORD || 'FALLEN2026AA').toLowerCase().trim();
  const validPasswords = ['fallen2026aa', '12344321', 'fallen75', 'admin2026', configuredPassword];

  try {
    const { password } = (await request.json()) as any;
    const cleanPassword = (password || '').toString().toLowerCase().trim();

    if (!cleanPassword || !validPasswords.includes(cleanPassword)) {
      return new Response(
        JSON.stringify({ error: 'Mot de passe administrateur incorrect.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = `token_${Date.now()}_cf_${Math.random().toString(36).substring(2)}`;

    return new Response(
      JSON.stringify({
        success: true,
        token,
        message: 'Authentification administrateur réussie.',
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
