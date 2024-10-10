"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Custom_tour_to_places", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      custom_tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Custom_tours",
          key: "id",
        },
      },
      place_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Places",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Custom_tour_to_places");
  },
};
