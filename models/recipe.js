'use strict';
module.exports = (sequelize, DataTypes) => {
  var recipe = sequelize.define('recipe', {
    name: DataTypes.STRING,
    abv: DataTypes.INTEGER,
    ibu: DataTypes.INTEGER,
    target_og: DataTypes.INTEGER,
    target_fg: DataTypes.INTEGER,
    ebc: DataTypes.INTEGER,
    srm: DataTypes.INTEGER,
    batch_size: DataTypes.INTEGER,
    mash_temp: DataTypes.INTEGER,
    fermentation_temp: DataTypes.INTEGER,
    ingredients: DataTypes.TEXT,
    brewing_notes: DataTypes.TEXT,
    hop_notes: DataTypes.TEXT,
    yeast_notes: DataTypes.TEXT,
    fermentation_notes: DataTypes.TEXT,
    hydrometer_readings: DataTypes.STRING,
    kegging_notes: DataTypes.TEXT,
    tasting_notes: DataTypes.TEXT,
    punk_id: DataTypes.INTEGER,
    batch_number: DataTypes.INTEGER
  }, {});
  recipe.associate = function(models) {
    // associations can be defined here
  };
  return recipe;
};