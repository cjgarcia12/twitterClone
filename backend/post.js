const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  author: {
    type: DataTypes.STRING, // Ensure this matches the type of user ID
    allowNull: false
  },
  tags: {
    type: DataTypes.STRING
  }
});

module.exports = Post;

