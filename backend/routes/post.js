const router = require('express').Router();
const multer = require('multer');
const path = require('node:path');
const { mkdirSync, readFileSync, unlinkSync } = require('node:fs');
const { randomUUID } = require('node:crypto');
const controller = require('../controller/post');
const { auth } = require('../middleware/auth');
const { feed, requirePost } = require('../lib/feed');
const directory = path.join(__dirname, '..', 'uploads');
mkdirSync(directory, { recursive: true });
const extensions = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif' };
const upload = multer({
  storage: multer.diskStorage({ destination: directory, filename: (req, file, cb) => cb(null, randomUUID() + extensions[file.mimetype]) }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 2 },
  fileFilter: (req, file, cb) => cb(extensions[file.mimetype] ? null : Object.assign(new Error('Choose a JPG, PNG, WebP or GIF image.'), { status: 400 }), !!extensions[file.mimetype]),
});
function verifyImage(req, res, next) {
  if (!req.file) return next();
  const bytes = readFileSync(req.file.path).subarray(0, 12);
  const valid = {
    'image/jpeg': bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255,
    'image/png': bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])),
    'image/gif': ['GIF87a', 'GIF89a'].includes(bytes.toString('ascii', 0, 6)),
    'image/webp': bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP',
  }[req.file.mimetype];
  if (valid) return next();
  unlinkSync(req.file.path);
  res.status(400).json({ message: 'The file is not a valid image.' });
}
router.post('/create', auth, upload.single('image'), verifyImage, controller.createPost);
router.get('/posts', feed);
router.get('/posts/saved', auth, controller.getSavedPosts);
router.get('/:postId', requirePost, controller.getPost);
router.put('/edit/:postId', auth, requirePost, controller.editPost);
router.delete('/:postId', auth, requirePost, controller.deletePost);
router.post('/save/:postId', auth, requirePost, controller.savePost);
router.delete('/unsave/:postId', auth, requirePost, controller.unsavePost);
router.post('/:postId/report', auth, requirePost, controller.reportPost);
module.exports = router;
