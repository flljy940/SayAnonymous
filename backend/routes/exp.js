const express = require('express');
const { recordActivity } = require('../controller/exp');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post('/activity', auth, recordActivity);

module.exports = router;
