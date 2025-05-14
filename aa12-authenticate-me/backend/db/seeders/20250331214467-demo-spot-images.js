"use strict";

const { SpotImage } = require("../models");

const spotImageData = [
  {
    spotId: 1,
    url: "/assets/images/yard.png",
    preview: true,
  },

  {
    spotId: 1,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 1,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 1,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 1,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/treehouse1.jpg",
    preview: true,
  },

  {
    spotId: 2,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 2,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/treehouse2.jpg",
    preview: true,
  },

  {
    spotId: 3,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 3,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/treehouse3.jpg",
    preview: true,
  },

  {
    spotId: 4,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 4,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/treehouse4.jpg",
    preview: true,
  },

  {
    spotId: 5,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 5,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/treehouse5.jpg",
    preview: true,
  },

  {
    spotId: 6,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 6,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/treehouse6.jpg",
    preview: true,
  },

  {
    spotId: 7,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 7,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/treehouse7.jpg",
    preview: true,
  },

  {
    spotId: 8,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 8,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/treehouse8.jpg",
    preview: true,
  },

  {
    spotId: 9,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 9,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/treehouse9.jpg",
    preview: true,
  },

  {
    spotId: 10,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 10,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/treehouse10.jpg",
    preview: true,
  },

  {
    spotId: 11,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 11,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/treehouse11.jpg",
    preview: true,
  },

  {
    spotId: 12,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 12,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/treehouse12.jpg",
    preview: true,
  },

  {
    spotId: 13,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 13,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/treehouse13.jpg",
    preview: true,
  },

  {
    spotId: 14,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 14,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/treehouse14.jpg",
    preview: true,
  },

  {
    spotId: 15,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 15,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/treehouse15.jpg",
    preview: true,
  },

  {
    spotId: 16,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 16,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/treehouse16.jpg",
    preview: true,
  },

  {
    spotId: 17,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 17,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/treehouse17.jpg",
    preview: true,
  },

  {
    spotId: 18,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 18,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/treehouse18.jpg",
    preview: true,
  },

  {
    spotId: 19,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 19,
    url: "/assets/images/kitchen.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/treehouse20.jpg",
    preview: true,
  },

  {
    spotId: 20,
    url: "/assets/images/livingroom.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/deck.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/hammock.jpg",
  },

  {
    spotId: 20,
    url: "/assets/images/kitchen.jpg",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImageData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    for (let spotImage of spotImageData) {
      await SpotImage.destroy({
        where: spotImage,
      });
    }
  },
};
