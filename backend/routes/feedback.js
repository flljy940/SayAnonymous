const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedback } = require('../controller/feedback');
const { auth } = require('../middleware/auth');

router.post('/', auth, submitFeedback);
router.get('/', auth, getFeedback);

module.exports = router;
