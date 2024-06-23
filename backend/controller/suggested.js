const pool = require('../db');

const getSuggestedPeople = async (req, res) => {
    const { userId } = req.params;

    try {
        // suggest people who have posted similar content or have similar interests
        const userInteractionsQuery = `
        SELECT DISTINCT post_id FROM (
            SELECT post_id FROM likes WHERE user_id = ? 
            UNION
            SELECT post_id FROM comments WHERE user_id = ?
        ) AS user_posts`;
        const [ userPosts ] = await pool.execute(userInteractionsQuery, [userId, userId]);
        const postIds = userPosts.map(row => row.post_id);

        // If the user has no interactions, suggest based on similar content
        if (postIds.length == 0) {
            const similarContentQuery = `
                SELECT DISTINCT u.id, u.avatar, u.description 
                FROM users u
                JOIN posts p ON u.id = p.author_id
                WHERE p.content IN (
                    SELECT content FROM posts WHERE id = ?
                )
                AND u.id != ? LIMIT 10
            `;
            const [ suggestedPeople ] = await pool.execute(similarContentQuery, [userId, userId]);
            return res.status(200).json(suggestedPeople);
        }

        // Query to get users who have liked or commented on the same posts
        const suggestedPeopleQuery = `
            SELECT DISTINCT u.id, u.pseudonym, u.avatar, u.description
            FROM users u
            JOIN (
                SELECT user_id FROM likes WHERE post_id IN (?)
                UNION
                SELECT user_id FROM comments WHERE post_id IN (?)
                UNION SELECT user_id FROM posts WHERE title IN (
                    SELECT title FROM posts WHERE id IN (?)
                )
            ) AS interaction_users ON u.id = interaction_users.user_id
            WHERE u.id != ? LIMIT 10
        `;
        const [suggestedPeople] = await pool.execute(suggestedPeopleQuery, [postIds, postIds, postIds, userId]);
        res.status(200).json(suggestedPeople);
    } catch (error) {
        console.error('Error getting suggested people:', error);
        res.status(500).json({ message: 'Failed to get suggested people' });
    }
};

const getSuggestedTopics = async (req, res) => {
    const { userId } = req.params;

    try {
        const topicsQuery = `
            SELECT t.name FROM topics t
            JOIN post_topics pt ON t.id = pt.topic_id
            JOIN posts p ON pt.post_id = p.id
            WHERE p.user_id = ?
            GROUP BY t.id
            ORDER BY COUNT(t.id) DESC
            LIMIT 10
        `;
        
        const [suggestedTopics] = await pool.execute(topicsQuery, [userId]);
        res.status(200).json(suggestedTopics); 
    } catch (error) {
        console.error('Error getting suggested topics:', error);
        res.status(500).json({ message: 'Failed to get suggested topics' });
    }
};

const getSuggestions = async (req, res) => {
    const { userId } = req.params;

    try {
        const suggestedPeople = await getSuggestedPeople(userId);
        const suggestedTopics = await getSuggestedTopics(userId);

        res.status(200).json({ suggestedPeople, suggestedTopics });
    } catch (error) {
        console.error('Error getting suggestions:', error);
        res.status(500).json({ message: 'Failed to get suggestions' });
    }
};

module.exports = { getSuggestedPeople, getSuggestedTopics, getSuggestions };
