const { database } = require('../db');
function people(viewer) {
  return database.prepare('SELECT pseudonym AS username, avatar FROM users WHERE id != ? ORDER BY exp DESC, id ASC LIMIT 5').all(viewer || 0);
}
function topics() { return database.prepare('SELECT topic AS name, COUNT(*) AS posts FROM posts GROUP BY topic ORDER BY posts DESC').all(); }
module.exports = {
  getSuggestedPeople: (req, res) => res.json(people(req.user?.id)),
  getSuggestedTopics: (req, res) => res.json(topics()),
  getSuggestions: (req, res) => res.json({ suggestedPeople: people(req.user?.id), suggestedTopics: topics() }),
};
