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
      style: {
        type: Sequelize.STRING
      },
      batchSize: {
        type: Sequelize.INTEGER
      },
      abv: {
        type: Sequelize.FLOAT
      },
      ibu: {
        type: Sequelize.INTEGER
      },
      srm: {
        type: Sequelize.INTEGER
      },
      ebc: {
        type: Sequelize.INTEGER
      },
      targetOg: {
        type: Sequelize.STRING
      },
      targetFg: {
        type: Sequelize.STRING
      },
      mashTemp: {
        type: Sequelize.INTEGER
      },
      fermTemp: {
        type: Sequelize.INTEGER
      },
      ingredients: {
        type: Sequelize.TEXT
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