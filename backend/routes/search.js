const router = require('express').Router();
router.get('/', require('../controller/search').search);
module.exports = router;
