'use strict';
module.exports = (sequelize, DataTypes) => {
  const reaction = sequelize.define('reaction', {
    score: DataTypes.FLOAT,
    reaction: DataTypes.STRING,
    articleId: DataTypes.INTEGER
  }, {});
  reaction.associate = function(models) {
    // associations can be defined here
  };
  return reaction;
};