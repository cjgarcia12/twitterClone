const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');  // Correct path to database.js

class Post extends Model {}

Post.init({
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Post',
});

module.exports = Post;
