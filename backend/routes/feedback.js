const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedback } = require('../controller/feedback');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, submitFeedback);
router.get('/', getFeedback);

module.exports = router;
