const express = require('express');
const Like = require('./like');
const Post = require('./post');
const authenticate = require('./authMiddleware');

const router = express.Router();

// Like a post
router.post('/:postId', authenticate, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;
    await Like.create({ userId, postId });

    const likesCount = await Like.count({ where: { postId } });
    res.status(201).json({ likesCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Unlike a post
router.delete('/:postId', authenticate, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;
    const like = await Like.findOne({ where: { userId, postId } });
    if (like) {
      await like.destroy();

      const likesCount = await Like.count({ where: { postId } });
      res.status(200).json({ likesCount });
    } else {
      res.status(404).json({ error: 'Like not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
