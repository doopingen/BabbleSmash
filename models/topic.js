'use strict';
module.exports = (sequelize, DataTypes) => {
  const topic = sequelize.define('topic', {
    category: DataTypes.STRING,
    score: DataTypes.FLOAT,
    level: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  topic.associate = function(models) {
    // associations can be defined here
  };
  return topic;
};