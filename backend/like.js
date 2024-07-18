const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');  // Correct path to database.js
const Post = require('./post');

class Like extends Model {}

Like.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'Like',
});

Like.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
Post.hasMany(Like, { foreignKey: 'postId', onDelete: 'CASCADE' });

module.exports = Like;
