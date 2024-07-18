const express = require('express');
const Post = require('./post');  // Correct path
const Like = require('./like');  // Correct path
const authenticate = require('./authMiddleware');
const upload = require('./upload');
const sequelize = require('./database');

const router = express.Router();

// Fetch all posts with like counts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{
        model: Like,
        attributes: [],
        required: false  // Include posts even if they have no likes
      }],
      attributes: {
        include: [
          [sequelize.fn('COUNT', sequelize.col('Likes.id')), 'likesCount']
        ],
      },
      group: ['Post.id'],
    });
    res.json(posts);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create a post with optional image
router.post('/', authenticate, upload.single('image'), async (req, res) => {
  try {
    const { content, tags } = req.body;
    const author = req.user.userId;

    // Basic validation
    if (!content || !author) {
      return res.status(400).json({ error: 'Content and author are required.' });
    }

    const post = await Post.create({
      content,
      author,
      tags,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      date: new Date()
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ error: error.message });
  }
});

// Read posts with pagination
router.get('/paginated', async (req, res) => {
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
    console.error('Error fetching paginated posts:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update a post
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, tags } = req.body;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (String(post.author) === String(req.user.userId)) {
      post.content = content;
      post.tags = tags;
      await post.save();
      res.status(200).json(post);
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error updating post:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (String(post.author) === String(req.user.userId)) {
      await post.destroy();
      res.status(200).json({ message: 'Post deleted successfully.' });
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error deleting post:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
