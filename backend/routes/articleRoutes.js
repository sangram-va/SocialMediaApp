const express = require('express');
const authMiddleware = require('../middleware/auth');
const { createArticle, likeArticle, addComment, getFollowingArticles } = require('../controllers/articleController');
const router = express.Router();

router.post('/', authMiddleware, createArticle);
router.get('/', authMiddleware, getFollowingArticles);
router.put('/:articleId/like', authMiddleware, likeArticle);
router.post('/:articleId/comment', authMiddleware, addComment);

module.exports = router;
