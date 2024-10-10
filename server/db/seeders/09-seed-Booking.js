"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Bookings",
      [
        {
          tour_id: 1,
          user_id: 1,
          date: new Date(),
          number_of_booking_participants: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 2,
          user_id: 1,
          date: new Date(),
          number_of_booking_participants: 9,
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
