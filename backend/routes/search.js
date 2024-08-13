const express = require('express');
const { performSearch } = require('../controller/search');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, performSearch);

module.exports = router;

