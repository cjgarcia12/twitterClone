const express = require('express');
const Post = require('./post');
const User = require('./user');
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

// Read with pagination and user info
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const posts = await Post.findAndCountAll({
      limit,
      offset,
      include: [{ model: User, attributes: ['username'] }],
    });
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

// Fetch single post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{ model: User, attributes: ['username'] }]
    });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    if (String(post.author) === String(req.user.userId)) {
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
    if (String(post.author) === String(req.user.userId)) {
      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully.' });
    } else {
      console.log('User not authorized to delete this post');
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
      return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
      const posts = await sequelize.query(
          'SELECT * FROM Posts WHERE content LIKE :searchValue OR tags LIKE :searchValue',
          {
              replacements: { searchValue: `%${q}%` },
              type: sequelize.QueryTypes.SELECT,
          }
      );
      res.status(200).json(posts);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


module.exports = router;
