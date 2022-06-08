const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postsCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.get('/', auth, postsCtrl.getAllPost);
router.post('/', auth, multer, postsCtrl.createPost);
router.delete('/:id', auth, postsCtrl.deletePost);

module.exports = router;