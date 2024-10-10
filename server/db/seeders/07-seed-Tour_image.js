"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tour_images",
      [
        {
          tour_id: 1,
          image: "tour1_img1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 1,
          image: "tour1_img2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 2,
          image: "tour2_img1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 2,
          image: "tour2_img2.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tour_id: 1,
          image: "tour3_img1.jpg",
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
