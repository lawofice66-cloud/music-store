import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || 'Fallen75France_AA2026_Session_Secret_9xK4mP7qL2vR8';
const PRIMARY_PASSWORD = process.env.ADMIN_PASSWORD || 'FALLEN2026AA';
const ACCEPTED_PASSWORDS = [
  'FALLEN2026AA',
  'fallen2026aa',
  '12344321',
  'fallen75',
  'admin2026',
  process.env.ADMIN_PASSWORD,
].filter(Boolean) as string[];

function isPasswordValid(input: string): boolean {
  if (!input) return false;
  const cleaned = input.trim().toLowerCase();
  return ACCEPTED_PASSWORDS.some((p) => p.toLowerCase() === cleaned);
}

// Map of active tokens to expiration timestamp
const validTokens = new Map<string, number>();

export function generateToken(password: string): string | null {
  if (!isPasswordValid(password)) {
    return null;
  }
  const random = crypto.randomBytes(24).toString('hex');
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(random).digest('hex');
  const token = `${random}.${signature}`;
  
  // Valid for 7 days
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  validTokens.set(token, expiresAt);
  return token;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  
  // Clean 'Bearer ' prefix if present
  const cleanToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token.trim();
  
  // Direct master password check for simple API script integration
  if (isPasswordValid(cleanToken)) {
    return true;
  }

  // Check valid signed token
  const parts = cleanToken.split('.');
  if (parts.length !== 2) return false;

  const [random, signature] = parts;
  const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(random).digest('hex');
  if (signature !== expected) return false;

  const expiry = validTokens.get(cleanToken);
  if (expiry && expiry < Date.now()) {
    validTokens.delete(cleanToken);
    return false;
  }

  return true;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || (req.headers['x-admin-key'] as string);
  
  if (!verifyToken(authHeader)) {
    return res.status(401).json({
      error: 'Accès non autorisé. Vous devez être connecté en tant qu\'administrateur.',
      code: 'UNAUTHORIZED',
    });
  }
  next();
}
