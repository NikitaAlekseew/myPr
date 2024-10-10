"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        require: true,
      },
      email: {
        type: Sequelize.STRING,
        require: true,
      },
      password: {
        type: Sequelize.STRING,
        require: true,
      },
      is_activated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      activation_link: {
        type: Sequelize.STRING,
        require: true,
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      image: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.TEXT,
      },
      phone: {
        type: Sequelize.STRING,
      },
      city_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
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
    await queryInterface.dropTable("Users");
  },
};
