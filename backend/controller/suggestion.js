const pool = require('../db');

const getSuggestedPeople = async (req, res) => {
    const userId = req.user.id;

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

        let suggestedPeople = [];

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
            [ suggestedPeople ] = await pool.execute(similarContentQuery, [userId, userId]);
        } else {
            const suggestedPeopleQuery = `
                SELECT DISTINCT u.id, u.pseudonym, u.avatar, u.description
                FROM users u
                JOIN (
                    SELECT user_id FROM likes WHERE post_id IN (?)
                    UNION
                    SELECT user_id FROM comments WHERE post_id IN (?)
                    UNION SELECT author_id FROM posts WHERE title IN (
                        SELECT title FROM posts WHERE id IN (?)
                    )
                ) AS interaction_users ON u.id = interaction_users.user_id
                WHERE u.id != ? LIMIT 10
            `;
            [suggestedPeople] = await pool.execute(suggestedPeopleQuery, [postIds, postIds, postIds, userId]);
        }

        const formattedSuggestion = suggestedPeople.map(s => ({
            id: s.id,
            avatar: s.avatar,
            username: s.pseudonym,
        }));

        res.status(200).json(formattedSuggestion);
    } catch (error) {
        console.error('Error getting suggested people:', error);
        res.status(500).json({ message: 'Failed to get suggested people' });
    }
};

const getSuggestedTopics = async (req, res) => {
    const userId = req.user.id;

    try {
        const topicsQuery = `
            SELECT t.id, t.name FROM topics t
            JOIN posts p ON t.id = p.id
            WHERE p.author_id = ?
            GROUP BY t.id
            ORDER BY COUNT(t.id) DESC
            LIMIT 10
        `;
        
        const [suggestedTopics] = await pool.execute(topicsQuery, [userId]);
        if (suggestedTopics.length > 0) {
            const formattedSuggestion = suggestedTopics.map(s => ({
                id: s.id,
                name: s.name,
                members: s.members,
            }));
            
            res.status(200).json(formattedSuggestion);
        } 
    } catch (error) {
        console.error('Error getting suggested topics:', error);
        res.status(500).json({ message: 'Failed to get suggested topics' });
    }
};

const getSuggestions = async (req, res) => {
    const userId = req.user.id;

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
