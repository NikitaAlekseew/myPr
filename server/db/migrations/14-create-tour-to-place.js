"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tour_to_places", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tour_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tours",
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
    await queryInterface.dropTable("Tour_to_places");
  },
};
