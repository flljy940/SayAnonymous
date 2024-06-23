const express = require('express');
const router = express.Router();
const { search } = require('../controller/search');
const { authenticate } = require('../middleware/authenticate');

router.get('/', authenticate, search);

module.exports = router;
