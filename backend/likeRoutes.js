const express = require('express');
const Like = require('./like');
const authenticate = require('./authMiddleware');

const router = express.Router();

// Like a post
router.post('/:postId', authenticate, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;
    const like = await Like.create({ userId, postId });
    res.status(201).json(like);
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
      res.status(200).json({ message: 'Like removed successfully.' });  // Change status to 200
    } else {
      res.status(404).json({ error: 'Like not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
