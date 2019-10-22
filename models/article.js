'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    text: DataTypes.STRING,
    summary: DataTypes.STRING,
    url: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  article.associate = function(models) {
    // associations can be defined here
    models.article.belongsTo(models.user);
    models.article.hasMany(models.entity);
    models.article.hasMany(models.keyword);
    models.article.hasMany(models.reaction);
    models.article.hasMany(models.tag);
    models.article.hasMany(models.topic);
  };
  return article;
};