const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { rateLimit } = require('express-rate-limit');
const path = require('node:path');
const { existsSync } = require('node:fs');
require('./db');
const { optionalAuth } = require('./middleware/auth');
const { production } = require('./lib/config');
function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(helmet({ contentSecurityPolicy: production ? undefined : false, strictTransportSecurity: production ? undefined : false }));
  app.use(express.json({ limit: '32kb' }));
  app.use(cookieParser());
  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 1000, standardHeaders: 'draft-8', legacyHeaders: false }));
  app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false, message: { message: 'Too many sign-in attempts. Try again in 15 minutes.' } }));
  app.use('/api', (req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method) || !req.headers.origin) return next();
    const allowed = [`${req.protocol}://${req.get('host')}`];
    if (!production) allowed.push('http://127.0.0.1:5173', 'http://localhost:5173');
    if (!allowed.includes(req.headers.origin)) return res.status(403).json({ message: 'Request origin is not allowed.' });
    next();
  });
  app.use(optionalAuth);
  app.get('/api/health', (req, res) => res.json({ status: 'ok', storage: 'sqlite' }));
  app.use('/api', require('./routes'));
  app.use('/api', (req, res) => res.status(404).json({ message: 'This endpoint does not exist.' }));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads'), { dotfiles: 'deny', setHeaders: res => res.setHeader('X-Content-Type-Options', 'nosniff') }));
  const dist = path.join(__dirname, '..', 'frontend', 'dist');
  if (existsSync(path.join(dist, 'index.html'))) {
    app.use(express.static(dist));
    app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
  }
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : error instanceof require('multer').MulterError ? 400 : error.status || 500;
    if (status >= 500) console.error(error);
    res.status(status).json({ message: status === 413 ? 'Images must be smaller than 5 MB.' : status >= 500 ? 'Something went wrong. Please try again.' : error.message });
  });
  return app;
}
module.exports = createApp;
