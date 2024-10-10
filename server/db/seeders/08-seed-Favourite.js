"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Favourites",
      [
        {
          tour_id: 1,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 2,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 1,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 2,
          user_id: 2,
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
