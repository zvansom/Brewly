'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
    style: DataTypes.STRING,
    batchSize: DataTypes.INTEGER,
    abv: DataTypes.FLOAT,
    ibu: DataTypes.INTEGER,
    srm: DataTypes.INTEGER,
    ebc: DataTypes.INTEGER,
    targetOg: DataTypes.STRING,
    targetFg: DataTypes.STRING,
    mashTemp: DataTypes.INTEGER,
    fermTemp: DataTypes.INTEGER,
    ingredients: DataTypes.TEXT,
    punkId: DataTypes.INTEGER
  }, {});
  recipe.associate = function(models) {
    // associations can be defined here
  };
  return recipe;
};