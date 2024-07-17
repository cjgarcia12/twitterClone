const express = require('express');
const Comment = require('./comment');
const Post = require('./post');  // Ensure Post model is imported
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

// Delete a comment
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      console.log(`Comment with ID ${id} not found`);
      return res.status(404).json({ error: 'Comment not found' });
    }
    console.log('Comment author:', comment.author, 'User ID:', req.user.userId);
    if (String(comment.author) === String(req.user.userId)) {  // Ensure type match
      await comment.destroy();
      res.status(200).json({ message: 'Comment deleted successfully.' });  // Change status to 200 and add message
    } else {
      console.log('User not authorized to delete this comment');
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting comment:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



