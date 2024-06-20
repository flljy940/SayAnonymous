const express = require('express');
const router = express.Router();
const { getSuggestedPeople, getSuggestedTopics } = require('../controller/suggested');

router.get('/suggestedPeople/:userId', getSuggestedPeople);
router.get('/suggestedTopics/:userId', getSuggestedTopics);

module.exports = router;
