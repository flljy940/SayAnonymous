const { randomBytes } = require('node:crypto');
const { mkdirSync, readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const production = process.env.NODE_ENV === 'production';
let secret = process.env.JWT_SECRET;
if (production && (!secret || secret.length < 32)) throw new Error('Set JWT_SECRET to at least 32 random characters for production.');
if (!secret) {
  const dir = path.join(__dirname, '..', 'data');
  mkdirSync(dir, { recursive: true });
  const file = path.join(dir, '.session-secret');
  try { secret = readFileSync(file, 'utf8'); }
  catch (error) {
    if (error.code !== 'ENOENT') throw error;
    secret = randomBytes(48).toString('hex');
    writeFileSync(file, secret, { mode: 0o600, flag: 'wx' });
  }
}
module.exports = {
  secret, production,
  cookie: { httpOnly: true, sameSite: 'strict', secure: production, path: '/', maxAge: 7 * 24 * 60 * 60 * 1000 },
  topics: ['Campus life', 'Academics', 'Relationships', 'Small wins', 'Just saying'],
};
