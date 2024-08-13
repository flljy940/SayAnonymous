const express = require('express');
const { search } = require('../controller/search');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, search);

module.exports = router;

