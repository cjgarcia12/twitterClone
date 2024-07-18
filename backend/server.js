const express = require('express');
const cors = require('cors');  // Import the cors module
const sequelize = require('./database');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');
const authRoutes = require('./authRoutes');
const User = require('./user');

const app = express();

// Enable CORS for all routes
app.use(cors())

app.use(express.json());
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

app.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const posts = await sequelize.query(
      `SELECT Posts.*, Users.username 
       FROM Posts 
       JOIN Users ON Posts.author = Users.id 
       WHERE Posts.content LIKE :searchValue OR Posts.tags LIKE :searchValue`,
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync( );  // For development, change to false in production
  console.log('Database synced');
});
