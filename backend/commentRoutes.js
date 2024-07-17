const express = require('express');
const Comment = require('./comment');
const authenticate = require('./authMiddleware');

const router = express.Router();

// Create a comment
router.post('/:postId', authenticate, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const comment = await Comment.create({
      content,
      author: req.user.userId,
      postId
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({ where: { postId } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


