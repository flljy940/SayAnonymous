const express = require('express');
const router = express.Router();
const { getSuggestedPeople, getSuggestedTopics, getSuggestions } = require('../controller/suggestion');
const { auth } = require('../middleware/auth');

router.get('/people', auth, getSuggestedPeople);
router.get('/topics', auth, getSuggestedTopics);
router.get('/', auth, getSuggestions);

module.exports = router;
