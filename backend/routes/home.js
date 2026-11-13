const router = require('express').Router();
const { feed } = require('../lib/feed');
router.get('/', feed);
router.get('/:sort(new|top)', feed);
module.exports = router;
