const express = require('express');
const { setupProfile, getProfile, deleteUser } = require('../controller/profile');

const router = express.Router();

router.put('/setup/:userId', setupProfile);
router.get('/:userId', getProfile);
router.delete('/delete/:userId', deleteUser);
// router.get('/rewards/:userId', getUserRewards);

module.exports = router;
