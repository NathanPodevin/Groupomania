'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        foreignKey : 'userId',
        onDelete: 'CASCADE',
      });

      models.Post.hasMany(models.Comment, {
        onDelete: 'CASCADE',
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    media: DataTypes.STRING,
    like: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};