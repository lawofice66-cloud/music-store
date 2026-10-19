import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Cloudflare R2 Client configuration (if environment variables are provided)
function getR2Client(): { client: S3Client; bucket: string; publicUrl?: string } | null {
  const accountId = process.env.CF_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CF_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CF_R2_SECRET_ACCESS_KEY;
  const bucket = process.env.CF_R2_BUCKET_NAME || 'music-2026';
  const publicUrl = process.env.CF_R2_PUBLIC_URL || '';

  if (accountId && accessKeyId && secretAccessKey) {
    const client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    return { client, bucket, publicUrl };
  }
  return null;
}

export interface UploadResult {
  url: string;
  key: string;
  size: number;
  mimeType: string;
  storage: 'r2' | 'local';
}

/**
 * Save file buffer either to Cloudflare R2 or to local persistent storage
 */
export async function saveUploadedFile(
  buffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<UploadResult> {
  const ext = path.extname(originalFilename).toLowerCase() || (mimeType.startsWith('image/') ? '.jpg' : '.mp3');
  const cleanName = path.basename(originalFilename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const key = `${Date.now()}_${cleanName}${ext}`;

  const r2 = getR2Client();

  if (r2) {
    // Upload to Cloudflare R2 bucket
    try {
      await r2.client.send(
        new PutObjectCommand({
          Bucket: r2.bucket,
          Key: key,
          Body: buffer,
          ContentType: mimeType,
          Metadata: {
            originalName: encodeURIComponent(originalFilename),
          },
        })
      );

      const url = r2.publicUrl
        ? `${r2.publicUrl.replace(/\/$/, '')}/${key}`
        : `/api/media/${key}`;

      return {
        url,
        key,
        size: buffer.length,
        mimeType,
        storage: 'r2',
      };
    } catch (err) {
      console.error('Failed to upload to Cloudflare R2, falling back to local storage:', err);
    }
  }

  // Fallback: Save to local persistent uploads directory
  const filePath = path.join(UPLOADS_DIR, key);
  fs.writeFileSync(filePath, buffer);

  return {
    url: `/api/media/${key}`,
    key,
    size: buffer.length,
    mimeType,
    storage: 'local',
  };
}

/**
 * Delete a media file from R2 or local disk
 */
export async function deleteMediaFile(key: string): Promise<boolean> {
  const cleanKey = path.basename(key);
  const r2 = getR2Client();

  if (r2) {
    try {
      await r2.client.send(
        new DeleteObjectCommand({
          Bucket: r2.bucket,
          Key: cleanKey,
        })
      );
    } catch (err) {
      console.warn(`Could not delete from R2 bucket (${cleanKey}):`, err);
    }
  }

  // Also remove local copy if it exists
  const localPath = path.join(UPLOADS_DIR, cleanKey);
  if (fs.existsSync(localPath)) {
    try {
      fs.unlinkSync(localPath);
      return true;
    } catch (e) {
      console.warn(`Could not delete local file (${cleanKey}):`, e);
    }
  }

  return true;
}

/**
 * Get readable stream and content info for /api/media/:key
 */
export async function getMediaStream(
  key: string
): Promise<{ stream: NodeJS.ReadableStream; contentType: string; contentLength?: number } | null> {
  const cleanKey = path.basename(key);
  const localPath = path.join(UPLOADS_DIR, cleanKey);

  // Check local disk first
  if (fs.existsSync(localPath)) {
    const stats = fs.statSync(localPath);
    const ext = path.extname(cleanKey).toLowerCase();
    const contentType = getContentType(ext);
    const stream = fs.createReadStream(localPath);
    return { stream, contentType, contentLength: stats.size };
  }

  // Otherwise try fetching from R2
  const r2 = getR2Client();
  if (r2) {
    try {
      const response = await r2.client.send(
        new GetObjectCommand({
          Bucket: r2.bucket,
          Key: cleanKey,
        })
      );
      if (response.Body) {
        const stream = response.Body as unknown as Readable;
        return {
          stream,
          contentType: response.ContentType || 'application/octet-stream',
          contentLength: response.ContentLength,
        };
      }
    } catch (e) {
      console.error(`Media key ${cleanKey} not found in R2:`, e);
    }
  }

  return null;
}

function getContentType(ext: string): string {
  switch (ext) {
    case '.mp3':
      return 'audio/mpeg';
    case '.wav':
      return 'audio/wav';
    case '.ogg':
      return 'audio/ogg';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.zip':
      return 'application/zip';
    default:
      return 'application/octet-stream';
  }
}
