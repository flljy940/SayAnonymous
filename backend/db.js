const { DatabaseSync } = require('node:sqlite');
const { mkdirSync, readFileSync } = require('node:fs');
const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });
const databasePath = process.env.DATABASE_PATH || path.join(__dirname, 'data', 'sayanonymous.sqlite');
if (databasePath !== ':memory:') mkdirSync(path.dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
database.exec(readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));

// Preserve the original controllers' query interface with a self-contained local database.
async function execute(sql, values = []) {
  const statement = database.prepare(sql);
  const bindings = Array.isArray(values) ? values : [values];
  if (/^\s*(SELECT|WITH|PRAGMA)\b/i.test(sql)) return [statement.all(...bindings)];
  const result = statement.run(...bindings);
  return [{ insertId: Number(result.lastInsertRowid), affectedRows: Number(result.changes) }];
}
module.exports = { execute, query: execute, database };
