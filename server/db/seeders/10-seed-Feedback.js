"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Feedbacks",
      [
        {
          user_id: 1,
          tour_id: 1,
          content: "Нормас!",
          score: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          tour_id: 2,
          content: "Пойдет",
          score: 4,
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
