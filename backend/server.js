const express = require('express');
const sequelize = require('./database');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');  // Add this line
const likeRoutes = require('./likeRoutes');
const authRoutes = require('./authRoutes');
const User = require('./user');  // Ensure User model is imported

const app = express();

app.use(express.json());
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);  // Add this line
app.use('/likes', likeRoutes);
app.use('/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await sequelize.sync({ force: true });  // For development, change to false in production
  console.log('Database synced');
});
