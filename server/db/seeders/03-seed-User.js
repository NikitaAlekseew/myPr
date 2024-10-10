"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "john@example.com",
          password: "password123",
          is_activated: true,
          activation_link: "some_link",
          role_id: 1,
          image: "image_path",
          about: "About John",
          phone: "1234567890",
          city_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jane Smith",
          email: "jane@example.com",
          password: "password123",
          is_activated: true,
          activation_link: "some_link",
          role_id: 2,
          image: "image_path",
          about: "About Jane",
          phone: "1234567890",
          city_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
