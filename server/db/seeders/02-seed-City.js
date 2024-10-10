"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cities",
      [
        {
          title: "Багратионовск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Балтийск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Гвардейск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Гурьевск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Гусев",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Зеленоградск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Калининград",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Краснознаменск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Ладушкин",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Мамоново",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Неман",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Нестеров",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Озёрск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Пионерский",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Полесск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Правдинск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Приморск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Светлогорск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Светлый",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Славск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Советск",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Черняховск",
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
