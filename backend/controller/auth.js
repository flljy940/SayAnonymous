const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomUUID, randomInt } = require('node:crypto');
const pool = require('../db');
const { secret, cookie, production } = require('../lib/config');
const { text } = require('../lib/validation');
function session(res, userId, status = 200) {
  const token = jwt.sign({ id: userId }, secret, { expiresIn: '7d', algorithm: 'HS256' });
  res.cookie('sa_session', token, cookie).status(status).json({ message: 'Signed in.' });
}
async function login(req, res, next) {
  const { email, password } = req.body;
  if (!text(email, 254) || !text(password, 72)) return res.status(400).json({ message: 'Enter your email and password.' });
  try {
    const [rows] = await pool.execute('SELECT id, password FROM users WHERE email = ?', [email.trim().toLowerCase()]);
    if (!rows[0] || !await bcrypt.compare(password, rows[0].password)) return res.status(401).json({ message: 'Email or password is incorrect.' });
    await pool.execute("UPDATE users SET last_login = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = ?", [rows[0].id]);
    session(res, rows[0].id);
  } catch (error) { next(error); }
}
async function register(req, res, next) {
  const { email, password, username } = req.body;
  if (!text(email, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !text(username, 24) || typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password) > 72) {
    return res.status(400).json({ message: 'Use a valid email, a nickname of 1–24 characters, and a password of 8–72 bytes.' });
  }
  try {
    const hashed = await bcrypt.hash(password, 12);
    const [result] = await pool.execute('INSERT INTO users (email, password, username, pseudonym, avatar) VALUES (?, ?, ?, ?, ?)', [email.trim().toLowerCase(), hashed, username.trim(), username.trim(), randomInt(1, 7)]);
    session(res, result.insertId, 201);
  } catch (error) {
    if (error.message.includes('UNIQUE')) return res.status(409).json({ message: 'An account with that email already exists.' });
    next(error);
  }
}
async function demo(req, res, next) {
  if (production) return res.status(404).json({ message: 'Demo access is disabled.' });
  try {
    const nickname = `QuietFox${randomInt(100, 1000)}`;
    const [result] = await pool.execute('INSERT INTO users (email, password, username, pseudonym, avatar, is_demo) VALUES (?, ?, ?, ?, ?, 1)', [`${randomUUID()}@demo.invalid`, 'disabled', nickname, nickname, 1]);
    session(res, result.insertId, 201);
  } catch (error) { next(error); }
}
function logout(req, res) { res.clearCookie('sa_session', { ...cookie, maxAge: undefined }).json({ message: 'Signed out.' }); }
module.exports = { login, register, demo, logout };
