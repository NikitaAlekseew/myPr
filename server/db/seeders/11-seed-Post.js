"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Posts",
      [
        {
          title: "Post 1",
          content: "Content of post 1",
          created_by: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Post 2",
          content: "Content of post 2",
          created_by: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Добавьте еще три записи по аналогии
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
