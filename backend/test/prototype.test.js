const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, rmSync, existsSync } = require('node:fs');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const directory = mkdtempSync(path.join(tmpdir(), 'sayanonymous-test-'));
process.env.DATABASE_PATH = path.join(directory, 'test.sqlite');
process.env.JWT_SECRET = 'isolated-test-secret-with-at-least-32-characters';
process.env.NODE_ENV = 'test';
process.env.SEED_DEMO = 'false';
const createApp = require('../app');
const { database } = require('../db');
let server, base, alice, bob, aliceId, bobId, postId, commentId, imagePostId, imagePath;
async function request(endpoint, { cookie, body, method = 'GET', headers = {} } = {}) {
  const response = await fetch(base + endpoint, {
    method, headers: { ...(cookie ? { Cookie: cookie } : {}), ...(body && !(body instanceof FormData) ? { 'Content-Type': 'application/json' } : {}), ...headers },
    body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();
  return { status: response.status, data, cookie: response.headers.get('set-cookie'), headers: response.headers };
}
before(async () => {
  server = createApp().listen(0, '127.0.0.1');
  await new Promise((resolve, reject) => { server.once('listening', resolve); server.once('error', reject); });
  base = `http://127.0.0.1:${server.address().port}/api`;
});
after(async () => {
  if (server?.listening) await new Promise(resolve => server.close(resolve));
  if (imagePath && existsSync(imagePath)) require('node:fs').unlinkSync(imagePath);
  database.close();
  rmSync(directory, { recursive: true, force: true });
});
test('an empty community returns promptly and reports real zero counts', async () => {
  assert.deepEqual((await request('/home/new')).data, []);
  assert.deepEqual((await request('/home/top')).data, []);
  assert.equal((await request('/stats/general')).data.post_count, 0);
  assert.equal((await request('/health')).data.status, 'ok');
});
test('accounts validate input and issue HttpOnly sessions without returning credentials', async () => {
  assert.equal((await request('/auth/register', { method: 'POST', body: { email: 'bad', password: 'x', username: ' ' } })).status, 400);
  const result = await request('/auth/register', { method: 'POST', body: { email: 'alice@example.test', password: 'ExamplePass123!', username: 'AliceFox' } });
  assert.equal(result.status, 201); assert.match(result.cookie, /HttpOnly/); assert.match(result.cookie, /SameSite=Strict/);
  assert.equal(result.data.token, undefined); alice = result.cookie.split(';')[0];
  aliceId = (await request('/profile', { cookie: alice })).data.id;
  const second = await request('/auth/register', { method: 'POST', body: { email: 'bob@example.test', password: 'ExamplePass123!', username: 'BobOwl' } });
  assert.equal(second.status, 201); bob = second.cookie.split(';')[0];
  bobId = (await request('/profile', { cookie: bob })).data.id;
  const stored = database.prepare('SELECT password FROM users WHERE id = ?').get(aliceId).password;
  assert.match(stored, /^\$2/); assert.notEqual(stored, 'ExamplePass123!');
});
test('duplicate emails and bad passwords return useful failures', async () => {
  assert.equal((await request('/auth/register', { method: 'POST', body: { email: 'ALICE@example.test', password: 'ExamplePass123!', username: 'Copy' } })).status, 409);
  assert.equal((await request('/auth/login', { method: 'POST', body: { email: 'alice@example.test', password: 'wrong-password' } })).status, 401);
  assert.equal((await request('/auth/login', { method: 'POST', body: { email: 'alice@example.test', password: 'ExamplePass123!' } })).status, 200);
});
test('signed-out visitors can browse but cannot publish', async () => {
  assert.equal((await request('/post/create', { method: 'POST', body: { content: 'No session' } })).status, 401);
  assert.equal((await request('/profile', { cookie: 'sa_session=forged' })).status, 401);
  assert.equal((await request('/activity', { method: 'POST', cookie: alice, body: {} })).status, 404);
});
test('post validation rejects whitespace, long content, and invalid topics', async () => {
  for (const body of [{ content: '  ' }, { content: 'x'.repeat(1201) }, { content: 'Hello', topic: 'bad topic' }]) assert.equal((await request('/post/create', { method: 'POST', cookie: alice, body })).status, 400);
});
test('a created thought appears with correct ownership and no private account fields', async () => {
  const created = await request('/post/create', { method: 'POST', cookie: alice, body: { content: 'I am 100% proud of this little prototype.', topic: 'Small wins' } });
  assert.equal(created.status, 201); postId = created.data.postId;
  const publicPost = (await request('/home/new')).data[0];
  assert.equal(publicPost.id, postId); assert.equal(publicPost.isOwner, false);
  assert.deepEqual(publicPost.user, { username: 'AliceFox', avatar: publicPost.user.avatar });
  assert.equal(publicPost.author_id, undefined); assert.equal(publicPost.user.email, undefined); assert.equal(publicPost.user.password, undefined);
  assert.equal((await request('/post/' + postId, { cookie: alice })).data.isOwner, true);
});
test('search treats wildcard symbols literally, and topics filter correctly', async () => {
  assert.equal((await request('/home/new?q=' + encodeURIComponent('100%'))).data.length, 1);
  assert.equal((await request('/home/new?q=' + encodeURIComponent('_'))).data.length, 0);
  assert.equal((await request('/home/new?q=' + encodeURIComponent("' OR 1=1 --"))).data.length, 0);
  assert.equal((await request('/home/new?topic=Academics')).data.length, 0);
  assert.equal((await request('/home/new?topic=Small%20wins')).data.length, 1);
});
test('likes are idempotent and isolated per account', async () => {
  for (let i = 0; i < 2; i++) assert.equal((await request('/like/' + postId, { method: 'POST', cookie: bob })).data.likes, 1);
  assert.equal((await request('/post/' + postId, { cookie: bob })).data.isLikedByUser, true);
  assert.equal((await request('/post/' + postId, { cookie: alice })).data.isLikedByUser, false);
  assert.equal((await request('/post/' + postId)).data.likes, 1);
});
test('saved thoughts are private and repeated saves do not duplicate them', async () => {
  for (let i = 0; i < 2; i++) assert.equal((await request('/post/save/' + postId, { method: 'POST', cookie: bob })).status, 200);
  assert.equal((await request('/post/posts/saved', { cookie: bob })).data.length, 1);
  assert.equal((await request('/post/posts/saved', { cookie: alice })).data.length, 0);
  assert.equal((await request('/post/posts/saved')).status, 401);
});
test('replies update counts and include the public nickname', async () => {
  const result = await request('/comments/' + postId, { method: 'POST', cookie: bob, body: { comment: 'A little kindness goes a long way.' } });
  assert.equal(result.status, 201); commentId = result.data.id;
  const replies = (await request('/comments/' + postId, { cookie: bob })).data;
  assert.equal(replies[0].username, 'BobOwl'); assert.equal(replies[0].isOwner, true);
  assert.equal((await request('/post/' + postId)).data.comments, 1);
  assert.equal((await request('/comments/' + postId, { method: 'POST', cookie: bob, body: { comment: ' ' } })).status, 400);
});
test('users cannot edit or delete someone else’s posts or replies', async () => {
  assert.equal((await request('/post/edit/' + postId, { method: 'PUT', cookie: bob, body: { content: 'hijacked' } })).status, 403);
  assert.equal((await request('/post/' + postId, { method: 'DELETE', cookie: bob })).status, 403);
  assert.equal((await request('/comments/' + commentId, { method: 'PUT', cookie: alice, body: { comment: 'hijacked' } })).status, 403);
  assert.equal((await request('/comments/delete/' + commentId, { method: 'DELETE', cookie: alice })).status, 403);
  assert.match((await request('/post/' + postId)).data.content, /100%/);
});
test('owners can edit their content and missing resources are explicit', async () => {
  assert.equal((await request('/post/edit/' + postId, { method: 'PUT', cookie: alice, body: { content: 'A working prototype, one small win at a time.' } })).status, 200);
  assert.equal((await request('/comments/' + commentId, { method: 'PUT', cookie: bob, body: { comment: 'An edited reply.' } })).status, 200);
  assert.equal((await request('/post/99999')).status, 404);
  assert.equal((await request('/like/99999', { method: 'POST', cookie: bob })).status, 404);
  assert.equal((await request('/post/nope')).status, 400);
});
test('notifications belong to their recipient and mark-read enforces ownership', async () => {
  const rows = (await request('/notifications', { cookie: alice })).data;
  assert.equal(rows.length, 2); assert.equal(rows[0].is_read, 0);
  assert.equal((await request('/notifications/' + rows[0].id + '/read', { method: 'PUT', cookie: bob })).status, 404);
  assert.equal((await request('/notifications/' + rows[0].id + '/read', { method: 'PUT', cookie: alice })).status, 200);
  assert.equal((await request('/notifications', { cookie: alice })).data[0].is_read, 1);
});
test('profile changes update public aliases without exposing email or password', async () => {
  const result = await request('/profile', { method: 'PUT', cookie: alice, body: { pseudonym: 'NewFox', avatar: 3, description: 'Just looking around.' } });
  assert.equal(result.status, 200); assert.equal(result.data.username, 'NewFox');
  assert.equal((await request('/post/' + postId)).data.user.username, 'NewFox');
  const profile = (await request('/profile/' + aliceId, { cookie: bob })).data;
  assert.equal(profile.email, undefined); assert.equal(profile.password, undefined); assert.equal(profile.isDemo, undefined);
  assert.equal((await request('/stats/me', { cookie: alice })).data.posts, 1);
});
test('reports and feedback are persisted and feedback remains private', async () => {
  for (let i = 0; i < 2; i++) assert.equal((await request('/post/' + postId + '/report', { method: 'POST', cookie: bob, body: { reason: 'Testing the report workflow.' } })).status, 201);
  assert.equal(database.prepare('SELECT COUNT(*) AS count FROM reports').get().count, 1);
  assert.equal((await request('/feedback', { method: 'POST', cookie: alice, body: { feedback: 'Useful prototype.', rating: 4 } })).status, 201);
  assert.equal((await request('/feedback', { cookie: bob })).data.length, 0);
});
test('cross-origin writes, malformed payloads and invalid pagination fail safely', async () => {
  assert.equal((await request('/like/' + postId, { method: 'POST', cookie: bob, headers: { Origin: 'https://untrusted.example' } })).status, 403);
  assert.equal((await request('/home/new?limit=51')).status, 400);
  assert.equal((await request('/home/new?offset=-1')).status, 400);
  assert.equal((await request('/home/new?q[]=' + 'x')).status, 400);
  const result = await fetch(base + '/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{bad' });
  assert.equal(result.status, 400); assert.match(result.headers.get('content-type'), /json/);
});
test('uploads reject disguised SVGs and oversized files', async () => {
  let data = new FormData(); data.append('content', 'Forged image'); data.append('image', new Blob(['<svg onload="alert(1)"></svg>'], { type: 'image/png' }), 'picture.png');
  assert.equal((await request('/post/create', { method: 'POST', cookie: alice, body: data })).status, 400);
  data = new FormData(); data.append('content', 'Too large'); data.append('image', new Blob([Buffer.alloc(5 * 1024 * 1024 + 1)], { type: 'image/png' }), 'large.png');
  assert.equal((await request('/post/create', { method: 'POST', cookie: alice, body: data })).status, 413);
});
test('real image attachments are served and removed with their thought', async () => {
  const data = new FormData(); data.append('content', 'An image attachment.');
  data.append('image', new Blob([Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jA5kAAAAASUVORK5CYII=', 'base64')], { type: 'image/png' }), '../../unsafe.png');
  const result = await request('/post/create', { method: 'POST', cookie: alice, body: data });
  assert.equal(result.status, 201); imagePostId = result.data.postId;
  const p = (await request('/post/' + imagePostId)).data;
  assert.match(p.image, /^\/uploads\/[a-f0-9-]+\.png$/);
  imagePath = path.join(__dirname, '..', p.image);
  assert.equal((await fetch(base.replace('/api', '') + p.image)).status, 200);
  assert.equal((await request('/post/' + imagePostId, { method: 'DELETE', cookie: alice })).status, 200);
});
test('pagination returns stable, non-overlapping pages', async () => {
  for (let i = 0; i < 22; i++) await request('/post/create', { method: 'POST', cookie: alice, body: { content: 'Pagination thought ' + i } });
  const first = (await request('/home/new?limit=20')).data;
  const second = (await request('/home/new?limit=20&offset=20')).data;
  assert.equal(first.length, 20); assert.equal(second.length, 3);
  assert.equal(new Set([...first, ...second].map(p => p.id)).size, 23);
});
test('stored thoughts survive a new process opening the same database', () => {
  const output = execFileSync(process.execPath, ['-e', "const db=require('./backend/db').database; console.log(db.prepare('SELECT COUNT(*) AS count FROM posts').get().count); db.close()"], { cwd: path.join(__dirname, '..', '..'), env: process.env, encoding: 'utf8' });
  assert.equal(Number(output.trim()), 23);
});
test('deleting a thought cascades its replies, likes, bookmarks and reports', async () => {
  assert.equal((await request('/post/' + postId, { method: 'DELETE', cookie: alice })).status, 200);
  for (const table of ['comments', 'likes', 'saved_posts', 'reports']) assert.equal(database.prepare(`SELECT COUNT(*) AS count FROM ${table} WHERE post_id = ?`).get(postId).count, 0);
});
test('demo sessions are separate identities and logout expires the browser cookie', async () => {
  const a = await request('/auth/demo', { method: 'POST' }), b = await request('/auth/demo', { method: 'POST' });
  const aId = (await request('/profile', { cookie: a.cookie.split(';')[0] })).data.id;
  const bId = (await request('/profile', { cookie: b.cookie.split(';')[0] })).data.id;
  assert.notEqual(aId, bId);
  const result = await request('/auth/logout', { method: 'POST', cookie: alice });
  assert.match(result.cookie, /Expires=Thu, 01 Jan 1970/);
  assert.equal((await request('/profile')).status, 401);
});
test('production refuses to start without a strong signing secret', () => {
  assert.throws(() => execFileSync(process.execPath, ['-e', "require('./backend/lib/config')"], { cwd: path.join(__dirname, '..', '..'), env: { ...process.env, NODE_ENV: 'production', JWT_SECRET: '' }, stdio: 'pipe' }), /Command failed/);
});
