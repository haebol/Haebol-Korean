import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const distPath = path.resolve(__dirname, 'dist');
  const indexHtmlPath = path.resolve(distPath, 'index.html');

  app.use(express.json());

  // Health check endpoint for Cloud Run container readiness
  app.get('/health', (_req, res) => {
    res.status(200).send('OK');
  });

  // Server-side password check for hidden teacher admin studio (?teacher=haebol)
  app.post('/api/teacher/verify', (req, res) => {
    const submitted = typeof req.body?.password === 'string' ? req.body.password.trim() : '';
    const expected = (process.env.TEACHER_ADMIN_PASSWORD || 'haebol2026').trim();
    if (submitted && submitted === expected) {
      return res.status(200).json({ ok: true });
    }
    return res.status(401).json({ ok: false, error: '비밀번호가 올바르지 않습니다.' });
  });

  const mountStaticSpa = () => {
    app.use(express.static(distPath));

    app.get('*', (req, res) => {
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ ok: false, error: 'Not Found' });
      }
      if (fs.existsSync(indexHtmlPath)) {
        return res.sendFile(indexHtmlPath);
      }
      return res.status(503).send('Build artifacts not found.');
    });
  };

  // Only mount Vite dev middleware when explicitly running in development mode.
  // In Cloud Run production (where NODE_ENV may be 'production' or unset), always serve prebuilt dist/.
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.error('Vite dev server unavailable, falling back to static dist/:', err);
      mountStaticSpa();
    }
  } else {
    mountStaticSpa();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT} (mode=${isDev ? 'development' : 'production'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
