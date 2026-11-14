import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

// Server-only passcode verification so no password or hash ever ships to browser code.
const INITIAL_PASSCODE = process.env.ADMIN_PASSCODE || 'Altura2240!';
let activePasscodeHash = sha256(INITIAL_PASSCODE);

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function timingSafeEqualsHex(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'hex');
  const bufB = Buffer.from(b, 'hex');
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post('/api/admin/verify', (req, res) => {
    const candidate =
      typeof req.body?.passcode === 'string' ? req.body.passcode : '';
    if (!candidate) {
      res.status(400).json({ ok: false, error: 'Ingresa la contraseña.' });
      return;
    }

    const ok = timingSafeEqualsHex(sha256(candidate), activePasscodeHash);
    if (!ok) {
      res.status(401).json({ ok: false, error: 'Contraseña incorrecta.' });
      return;
    }

    res.json({ ok: true });
  });

  app.post('/api/admin/change-password', (req, res) => {
    const current =
      typeof req.body?.currentPasscode === 'string'
        ? req.body.currentPasscode
        : '';
    const next =
      typeof req.body?.newPasscode === 'string' ? req.body.newPasscode : '';

    if (!timingSafeEqualsHex(sha256(current), activePasscodeHash)) {
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

    activePasscodeHash = sha256(next);
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
