const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Post = require('./post');  // Import the Post model if there is a relationship

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id'
    }
  }
});

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

module.exports = Comment;
