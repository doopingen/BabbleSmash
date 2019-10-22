'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    name: DataTypes.STRING,
    articleId: DataTypes.INTEGER
  }, {});
  tag.associate = function(models) {
    // associations can be defined here
    models.tag.belongsTo(models.article);
  };
  return tag;
};