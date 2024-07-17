const express = require('express');
const Post = require('./post');
const authenticate = require('./authMiddleware');
const upload = require('./upload');  // Ensure this line is present

const router = express.Router();

// Create with image
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { content, tags } = req.body;
    const post = await Post.create({
      content,
      author: req.user.userId,
      tags,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read with pagination
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const posts = await Post.findAndCountAll({ limit, offset });
    res.status(200).json({
      totalItems: posts.count,
      totalPages: Math.ceil(posts.count / limit),
      currentPage: page,
      data: posts.rows
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update
router.put('/:id', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const { content, tags } = req.body;
      const post = await Post.findByPk(id);
      if (!post) {
        console.log(`Post with ID ${id} not found`);
        return res.status(404).json({ error: 'Post not found' });
      }
      console.log('Post author:', post.author, 'User ID:', req.user.userId);
      if (String(post.author) === String(req.user.userId)) {  // Ensure type match
        post.content = content;
        post.tags = tags;
        await post.save();
        res.status(200).json(post);
      } else {
        console.log('User not authorized to update this post');
        res.status(403).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error updating post:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete
  router.delete('/:id', authenticate, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (!post) {
        console.log(`Post with ID ${id} not found`);
        return res.status(404).json({ error: 'Post not found' });
      }
      console.log('Post author:', post.author, 'User ID:', req.user.userId);
      if (String(post.author) === String(req.user.userId)) {  // Ensure type match
        await post.destroy();
        res.status(204).json({ message: 'Post deleted successfully.' });
      } else {
        console.log('User not authorized to delete this post');
        res.status(403).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error deleting post:', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;