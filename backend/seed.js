const { database: db } = require('./db');
function seed() {
  if (process.env.SEED_DEMO === 'false' || process.env.NODE_ENV === 'production' || db.prepare('SELECT COUNT(*) AS count FROM users').get().count) return;
  const users = ['OrangeFox', 'CloudWanderer', 'LittleSprout', 'PeachyDays', 'MoonMochi', 'SleepyOwl'];
  const posts = [
    ['Campus life', 'A small appreciation post for the uncle at the canteen who remembers my order. Some days, “the usual?” is all the comfort you need.', 0, 45],
    ['Academics', 'Does anyone else feel like everyone has their five-year plan sorted while you’re just trying to sort out your sleep schedule? Asking for a friend. The friend is me.', 1, 82],
    ['Small wins', 'I finally asked a question in a lecture today. My voice shook, but I did it. Counting that as a win.', 2, 140],
    ['Relationships', 'Growing apart from a friend doesn’t mean the friendship wasn’t real. Still learning to be okay with that.', 3, 210],
    ['Campus life', 'Looking for a quiet study spot with actual power sockets. Bonus points if there’s good coffee nearby. Drop your hidden gems?', 4, 330],
    ['Just saying', 'A reminder from a stranger: you’re allowed to have a slow day. Not every moment needs to become something productive.', 5, 460],
    ['Small wins', 'Cooked something that wasn’t instant noodles today. It was only fried rice but my mum got a photo anyway.', 0, 720],
    ['Academics', 'What’s one thing you wish someone had told you before your first group project?', 2, 960],
  ];
  db.exec('BEGIN');
  try {
    const ids = users.map((name, i) => Number(db.prepare('INSERT INTO users (email, password, username, pseudonym, avatar, is_demo) VALUES (?, ?, ?, ?, ?, 1)').run(`seed${i}@demo.invalid`, 'disabled', name, name, i + 1).lastInsertRowid));
    posts.forEach(([topic, content, author, minutes], i) => {
      const postId = Number(db.prepare('INSERT INTO posts (author_id, content, topic, created_at) VALUES (?, ?, ?, ?)').run(ids[author], content, topic, new Date(Date.now() - minutes * 60000).toISOString()).lastInsertRowid);
      ids.forEach((uid, j) => { if (j !== author && j <= (i % 5) + 1) db.prepare('INSERT INTO likes (user_id, post_id) VALUES (?, ?)').run(uid, postId); });
      if (i === 0) {
        db.prepare('INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)').run(postId, ids[2], 'The little things really do make campus feel like home.');
        db.prepare('INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)').run(postId, ids[4], 'Mine always sneaks in an extra spoonful. Absolute legend.');
      }
      if (i === 2) db.prepare('INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)').run(postId, ids[1], 'That is a win. Proud of you, stranger!');
    });
    db.exec('COMMIT');
  } catch (error) { db.exec('ROLLBACK'); throw error; }
}
module.exports = seed;
