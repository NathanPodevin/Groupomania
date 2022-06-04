const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentsCtrl = require('../controllers/comment');

router.post('/', commentsCtrl.createComment);

module.exports = router;