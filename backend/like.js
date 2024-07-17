const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const Post = require('./post');  // Import the Post model

const Like = sequelize.define('Like', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Like.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
Post.hasMany(Like, { foreignKey: 'postId' });

module.exports = Like;
