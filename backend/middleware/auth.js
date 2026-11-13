const jwt = require('jsonwebtoken');
const { secret } = require('../lib/config');
const { database } = require('../db');
function optionalAuth(req, res, next) {
  const token = req.cookies?.sa_session || req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, secret, { algorithms: ['HS256'] });
      if (Number.isSafeInteger(decoded.id) && database.prepare('SELECT id FROM users WHERE id = ?').get(decoded.id)) req.user = { id: decoded.id };
    } catch { /* Expired or invalid sessions are treated as signed out. */ }
  }
  next();
}
function auth(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Please sign in to continue.' });
  next();
}
module.exports = { auth, optionalAuth };
