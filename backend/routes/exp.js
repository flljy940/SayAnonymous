const express = require('express');
const { recordActivity } = require('../controllers/expController');

const router = express.Router();

router.post('/activity', recordActivity);

module.exports = router;
