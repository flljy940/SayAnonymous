const express = require('express');
const { recordActivity } = require('../controller/exp');

const router = express.Router();

router.post('/activity/:userId', recordActivity);

module.exports = router;
