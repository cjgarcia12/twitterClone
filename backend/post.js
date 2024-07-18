const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const User = require('./user');

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
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tags: {
    type: DataTypes.STRING
  },
});
Post.belongsTo(User, { foreignKey: 'author' });

module.exports = Post;
