const express = require('express');
const router = express.Router();
const { getSuggestedPeople, getSuggestedTopics, getSuggestions } = require('../controller/suggested');
const { authenticate } = require('../middleware/authenticate');

router.get('/people/:userId', authenticate, getSuggestedPeople);
router.get('/topics/:userId', authenticate, getSuggestedTopics);
router.get('/:userId', authenticate, getSuggestions);

module.exports = router;
