"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          category_id: 1,
          title: "Tour 1",
          content: "Content of tour 1",
          schegule: "Schedule 1",
          duration: "Duration 1",
          start_time: "Start time 1",
          guide_id: 1,
          number_of_tour_participants: 10,
          cost: 100,
          city_id: 1,
          views: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_id: 2,
          title: "Tour 2",
          content: "Content of tour 2",
          schegule: "Schedule 2",
          duration: "Duration 2",
          start_time: "Start time 2",
          guide_id: 2,
          number_of_tour_participants: 20,
          cost: 200,
          city_id: 2,
          views: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_id: 1,
          title: "Tour 2",
          content: "Content of tour 2",
          schegule: "Schedule 2",
          duration: "Duration 2",
          start_time: "Start time 2",
          guide_id: 2,
          number_of_tour_participants: 20,
          cost: 200,
          city_id: 2,
          views: 0,
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
