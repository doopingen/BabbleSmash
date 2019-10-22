'use strict';
module.exports = (sequelize, DataTypes) => {
  const keyword = sequelize.define('keyword', {
    score: DataTypes.FLOAT,
    name: DataTypes.STRING,
    articleId: DataTypes.INTEGER
  }, {});
  keyword.associate = function(models) {
    // associations can be defined here
  };
  return keyword;
};