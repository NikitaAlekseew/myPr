"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tours", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tour_categories",
          key: "id",
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      schegule: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.STRING,
      },
      start_time: {
        type: Sequelize.STRING,
      },
      guide_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      number_of_tour_participants: {
        type: Sequelize.INTEGER,
      },
      cost: {
        type: Sequelize.INTEGER,
      },
      city_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      views: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Tours");
  },
};
