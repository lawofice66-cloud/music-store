import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  getTracks,
  getTrackById,
  createTrack,
  updateTrack,
  deleteTrack,
  likeTrack,
  recordTrackPlay,
  getPaymentConfig,
  updatePaymentConfig,
  getOrders,
  createOrder,
  updateOrderStatus,
} from './server/db';
import { saveUploadedFile, getMediaStream, deleteMediaFile } from './server/storage';
import { generateToken, verifyToken, requireAdmin } from './server/auth';

const PORT = 3000;

// Configure multer for memory storage so we can stream to Cloudflare R2 or persistent disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 60 * 1024 * 1024, // 60MB max for high-quality audio / WAV / MP3 / images
  },
});

async function startServer() {
  const app = express();

  // Basic middlewares
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      cloudflareR2Configured: !!(
        process.env.CF_R2_ACCOUNT_ID &&
        process.env.CF_R2_ACCESS_KEY_ID &&
        process.env.CF_R2_SECRET_ACCESS_KEY
      ),
    });
  });

  // Admin Auth routes
  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body || {};
    if (!password) {
      return res.status(400).json({ error: 'Mot de passe requis.' });
    }
    const token = generateToken(password);
    if (!token) {
      return res.status(401).json({ error: 'Mot de passe administrateur incorrect.' });
    }
    return res.json({
      success: true,
      token,
      message: 'Connexion administrateur réussie.',
    });
  });

  app.get('/api/auth/verify', (req, res) => {
    const authHeader = req.headers.authorization || (req.headers['x-admin-key'] as string);
    const isValid = verifyToken(authHeader);
    return res.json({ valid: isValid });
  });

  // Tracks API
  app.get('/api/tracks', (_req, res) => {
    try {
      const tracks = getTracks();
      res.json(tracks);
    } catch (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des morceaux.' });
    }
  });

  app.get('/api/tracks/:id', (req, res) => {
    const track = getTrackById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Morceau introuvable.' });
    }
    res.json(track);
  });

  app.post('/api/tracks', requireAdmin, (req, res) => {
    try {
      const trackData = req.body;
      if (!trackData.title || !trackData.title.trim()) {
        return res.status(400).json({ error: 'Le titre du morceau est obligatoire.' });
      }
      const newTrack = createTrack(trackData);
      res.status(201).json(newTrack);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur lors de la création du morceau.' });
    }
  });

  app.put('/api/tracks/:id', requireAdmin, (req, res) => {
    try {
      const updated = updateTrack(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Morceau non trouvé.' });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur lors de la mise à jour.' });
    }
  });

  app.delete('/api/tracks/:id', requireAdmin, async (req, res) => {
    try {
      const track = getTrackById(req.params.id);
      const deleted = deleteTrack(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Morceau non trouvé.' });
      }

      // If track had an uploaded media preview, clean up
      if (track?.audioPreviewUrl && track.audioPreviewUrl.startsWith('/api/media/')) {
        const key = track.audioPreviewUrl.replace('/api/media/', '');
        await deleteMediaFile(key);
      }

      res.json({ success: true, message: 'Morceau supprimé avec succès.' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur lors de la suppression.' });
    }
  });

  // Track Social Stats: Likes and Plays
  app.post('/api/tracks/:id/like', (req, res) => {
    const { delta } = req.body || {};
    const track = likeTrack(req.params.id, typeof delta === 'number' ? delta : 1);
    if (!track) {
      return res.status(404).json({ error: 'Morceau introuvable.' });
    }
    res.json({ success: true, id: track.id, likes: track.likes });
  });

  app.post('/api/tracks/:id/play', (req, res) => {
    const track = recordTrackPlay(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Morceau introuvable.' });
    }
    res.json({ success: true, id: track.id, plays: track.plays });
  });

  // Media Upload Route (MP3, WAV, Image) -> Cloudflare R2 / Local permanent storage
  app.post('/api/upload', requireAdmin, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Aucun fichier reçu.' });
      }

      const result = await saveUploadedFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype
      );

      res.json({
        success: true,
        ...result,
        message:
          result.storage === 'r2'
            ? '✓ Fichier sauvegardé de façon permanente sur Cloudflare R2'
            : '✓ Fichier sauvegardé de façon permanente sur le serveur',
      });
    } catch (err: any) {
      console.error('Upload error:', err);
      res.status(500).json({ error: err.message || 'Erreur lors du téléversement du fichier.' });
    }
  });

  // Media Streaming Route with HTTP Range support for audio player scrubbing
  app.get('/api/media/:key', async (req, res) => {
    try {
      const media = await getMediaStream(req.params.key);
      if (!media) {
        return res.status(404).send('Fichier introuvable');
      }

      res.setHeader('Content-Type', media.contentType);
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

      if (media.contentLength) {
        res.setHeader('Content-Length', media.contentLength);
      }

      media.stream.pipe(res);
    } catch (err) {
      console.error('Media stream error:', err);
      res.status(500).send('Erreur lors de la lecture du fichier');
    }
  });

  // Payment Configuration API
  app.get('/api/payment-config', (_req, res) => {
    try {
      const config = getPaymentConfig();
      res.json(config);
    } catch (err) {
      res.status(500).json({ error: 'Erreur de configuration paiement.' });
    }
  });

  app.post('/api/payment-config', requireAdmin, (req, res) => {
    try {
      const updated = updatePaymentConfig(req.body);
      res.json({
        success: true,
        config: updated,
        message: 'Paramètres de paiement mis à jour.',
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur lors de la sauvegarde.' });
    }
  });

  // Orders API
  app.get('/api/orders', (req, res) => {
    const { orderId } = req.query;
    const authHeader = req.headers.authorization || (req.headers['x-admin-key'] as string);
    const isAdmin = verifyToken(authHeader);

    const allOrders = getOrders();

    // If client queries specific order ID (for public status lookup modal)
    if (orderId && typeof orderId === 'string') {
      const matched = allOrders.filter(
        (o) =>
          o.id.toLowerCase() === orderId.toLowerCase() ||
          o.txHashOrRef?.toLowerCase() === orderId.toLowerCase()
      );
      return res.json(matched);
    }

    // Only admin can view all orders
    if (!isAdmin) {
      return res.status(401).json({
        error: 'Accès réservé. Fournissez un identifiant de commande ou connectez-vous.',
      });
    }

    res.json(allOrders);
  });

  app.post('/api/orders', (req, res) => {
    try {
      const orderData = req.body;
      if (!orderData.trackId || !orderData.customerEmail) {
        return res.status(400).json({ error: 'Données de commande incomplètes.' });
      }
      const newOrder = createOrder(orderData);
      res.status(201).json({
        success: true,
        order: newOrder,
        message: 'Commande enregistrée avec succès.',
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur enregistrement commande.' });
    }
  });

  app.put('/api/orders/:id/status', requireAdmin, (req, res) => {
    try {
      const { status, notes } = req.body;
      if (!['pending', 'confirmed', 'rejected'].includes(status)) {
        return res.status(400).json({ error: 'Statut invalide.' });
      }
      const updated = updateOrderStatus(req.params.id, status, notes);
      if (!updated) {
        return res.status(404).json({ error: 'Commande introuvable.' });
      }
      res.json({
        success: true,
        order: updated,
        message: `Commande passée à l'état "${status}".`,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur mise à jour commande.' });
    }
  });

  // --- CLOUDFLARE PAGES EXPORT & ZIP DOWNLOAD ENDPOINTS ---
  app.get('/api/download/cloudflare-zip', (_req, res) => {
    const primaryPath = path.join(process.cwd(), 'public', 'fallen75france-cloudflare-pages.zip');
    const fallbackPath = path.join(process.cwd(), 'dist', 'fallen75france-cloudflare-pages.zip');
    const zipPath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;

    if (!fs.existsSync(zipPath)) {
      return res.status(404).json({
        error: 'Le fichier ZIP Cloudflare Pages est en cours de préparation. Veuillez réessayer dans quelques secondes.',
      });
    }

    res.setHeader('Content-Disposition', 'attachment; filename="fallen75france-cloudflare-pages.zip"');
    res.setHeader('Content-Type', 'application/zip');
    const fileStream = fs.createReadStream(zipPath);
    fileStream.pipe(res);
  });

  app.get('/api/download/source-zip', (_req, res) => {
    const primaryPath = path.join(process.cwd(), 'public', 'fallen75france-full-source.zip');
    const fallbackPath = path.join(process.cwd(), 'dist', 'fallen75france-full-source.zip');
    const zipPath = fs.existsSync(primaryPath) ? primaryPath : fallbackPath;

    if (!fs.existsSync(zipPath)) {
      return res.status(404).json({
        error: 'Le fichier ZIP source est en cours de préparation. Veuillez réessayer dans quelques secondes.',
      });
    }

    res.setHeader('Content-Disposition', 'attachment; filename="fallen75france-full-source.zip"');
    res.setHeader('Content-Type', 'application/zip');
    const fileStream = fs.createReadStream(zipPath);
    fileStream.pipe(res);
  });

  // --- VITE & STATIC FILES SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FALLEN 75 Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
