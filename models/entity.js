'use strict';
module.exports = (sequelize, DataTypes) => {
  const entity = sequelize.define('entity', {
    wikiurl: DataTypes.STRING,
    desc: DataTypes.STRING,
    score: DataTypes.FLOAT,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    articleId: DataTypes.INTEGER
  }, {});
  entity.associate = function(models) {
    // associations can be defined here
  };
  return entity;
};