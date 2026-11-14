import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const PASSCODE_FILE = path.resolve(__dirname, '.altura-admin.json');

const DEFAULT_PASSCODES = ['Altura2240', 'Altura2240!'];

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function timingSafeEqualsHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function loadCustomHash(): string | null {
  try {
    if (!fs.existsSync(PASSCODE_FILE)) return null;
    const raw = fs.readFileSync(PASSCODE_FILE, 'utf8');
    const parsed = JSON.parse(raw) as { hash?: string };
    return typeof parsed.hash === 'string' && parsed.hash.length === 64
      ? parsed.hash
      : null;
  } catch {
    return null;
  }
}

function saveCustomHash(hash: string): void {
  fs.writeFileSync(PASSCODE_FILE, JSON.stringify({ hash }), 'utf8');
}

let customPasscodeHash: string | null = loadCustomHash();
const defaultHashes = DEFAULT_PASSCODES.map(sha256);

function isPasscodeValid(candidate: string): boolean {
  const candidateHash = sha256(candidate);
  if (customPasscodeHash) {
    return timingSafeEqualsHex(candidateHash, customPasscodeHash);
  }
  return defaultHashes.some((h) => timingSafeEqualsHex(candidateHash, h));
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/admin/verify', (req, res) => {
    const candidate =
      typeof req.body?.passcode === 'string' ? req.body.passcode.trim() : '';
    if (!candidate) {
      res.status(400).json({ ok: false, error: 'Ingresa la contraseña.' });
      return;
    }

    if (!isPasscodeValid(candidate)) {
      res.status(401).json({ ok: false, error: 'Contraseña incorrecta.' });
      return;
    }

    res.json({ ok: true });
  });

  app.post('/api/admin/change-password', (req, res) => {
    const current =
      typeof req.body?.currentPasscode === 'string'
        ? req.body.currentPasscode.trim()
        : '';
    const next =
      typeof req.body?.newPasscode === 'string'
        ? req.body.newPasscode.trim()
        : '';

    if (!isPasscodeValid(current)) {
      res.status(401).json({
        ok: false,
        error: 'La contraseña actual no es correcta.',
      });
      return;
    }

    if (next.length < 6) {
      res.status(400).json({
        ok: false,
        error: 'La nueva contraseña debe tener al menos 6 caracteres.',
      });
      return;
    }

    const nextHash = sha256(next);
    customPasscodeHash = nextHash;
    saveCustomHash(nextHash);
    res.json({ ok: true });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Altura BC server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
