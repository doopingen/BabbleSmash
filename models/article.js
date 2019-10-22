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
  };
  return article;
};