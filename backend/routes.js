const express = require('express');

const auth = require('./routes/auth');
const profile = require('./routes/profile');
const exp = require('./routes/exp');
const post = require('./routes/post');
const trending = require('./routes/trending');
const search = require('./routes/search');
const suggested = require('./routes/suggested');
const notifications = require('./routes/notifications');
const comments = require('./routes/comments');
const likes = require('./routes/likes');
const stats = require('./routes/stats');
const feedback = require('./routes/feedback');
const homePage = require('./routes/home');
const { createPool } = require('mysql2');

const router = express.Router();

router.use('/auth', auth);
router.use('/profile', profile);
router.use('/', exp);
router.use('/post', post);
router.use('/trending', trending);
router.use('/search', search);
router.use('/', suggested);
router.use('/notifications', notifications);
router.use('/comments', comments);
router.use('/', likes);
router.use('/stats', stats);
router.use('/feedback', feedback);
router.use('/home', homePage);

/**
 * File upload
 */

const {Storage} = require('@google-cloud/storage');
const crypto = require('crypto');

const storage = new Storage({
    projectId: process.env.PROJECT_ID, 
    keyFilename: process.env.KEY_PATH
});

const bucket = storage.bucket(process.env.PROJECT_ID);

router.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
  
    let File = req.files.file;
  
    const name = crypto.randomBytes(20).toString('hex') + File.name;

    try {
        let file = bucket.file('data/images/' + name);
        console.log(file);
        await file.save(File.data);
        await file.makePublic();
        res.json({
            path : `https://storage.googleapis.com/${process.env.PROJECT_ID}/data/images/${name}`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Failed to upload file');
    }
});

module.exports = router;
