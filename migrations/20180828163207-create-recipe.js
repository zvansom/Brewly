'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      abv: {
        type: Sequelize.INTEGER
      },
      ibu: {
        type: Sequelize.INTEGER
      },
      target_og: {
        type: Sequelize.INTEGER
      },
      target_fg: {
        type: Sequelize.INTEGER
      },
      ebc: {
        type: Sequelize.INTEGER
      },
      srm: {
        type: Sequelize.INTEGER
      },
      batch_size: {
        type: Sequelize.INTEGER
      },
      mash_temp: {
        type: Sequelize.INTEGER
      },
      fermentation_temp: {
        type: Sequelize.INTEGER
      },
      ingredients: {
        type: Sequelize.TEXT
      },
      brewing_notes: {
        type: Sequelize.TEXT
      },
      hop_notes: {
        type: Sequelize.TEXT
      },
      yeast_notes: {
        type: Sequelize.TEXT
      },
      fermentation_notes: {
        type: Sequelize.TEXT
      },
      hydrometer_readings: {
        type: Sequelize.STRING
      },
      kegging_notes: {
        type: Sequelize.TEXT
      },
      tasting_notes: {
        type: Sequelize.TEXT
      },
      punk_id: {
        type: Sequelize.INTEGER
      },
      batch_number: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('recipes');
  }
};