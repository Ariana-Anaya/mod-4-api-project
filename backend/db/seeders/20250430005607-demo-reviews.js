"use strict";

const { Review } = require("../models");

const reviewsData = [
  {
    userId: 2,
    spotId: 1,
    review:
      "Super cool place. The view from the balcony was great and the host was super sweet",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 1,
    review:
      "While the place was gorgeous I had a few issues with faulty aplliances.",
    stars: 3,
  },
  {
    userId: 4,
    spotId: 2,
    review:
      "Wow. I had the best time. The amenities were amazing, the host was suoer, informative and the family had a great time",
    stars: 5,
  },
  {
    userId: 5,
    spotId: 2,
    review:
      "I felt like the pictures were a bit misleading, the place was a lot smaller than expected",
    stars: 2,
  },
  {
    userId: 1,
    spotId: 3,
    review:
      "If I'm ever in the area again I would love to rebook. The place was beautiful and the location was super convenient",
    stars: 5,
  },
  {
    userId: 3,
    spotId: 3,
    review:
      "I thought everything was just about average. Nothing was necessarily bad but nothing was great either",
    stars: 1,
  },
  {
    userId: 6,
    spotId: 4,
    review:
      "What a calming place. Had a great time experiencing nature, loved the amenities",
    stars: 5,
  },
  {
    userId: 4,
    spotId: 4,
    review:
      "The home was pretty great but we had an issue with the air conditioning which made for a very uncomfortable time",
    stars: 3,
  },
  {
    userId: 5,
    spotId: 5,
    review:
      "I hated the lackluster amenities and the unresponsiveness of the host",
    stars: 1,
  },
  {
    userId: 6,
    spotId: 5,
    review:
      "While I thought the decor was a little childish my kids loved it and had the best time of their life. Great place for little ones",
    stars: 5,
  },
  {
    userId: 7,
    spotId: 6,
    review:
      "While I get that is is a cozy smaller destination I felt like the lack of amenities took away from the experience",
    stars: 2,
  },
  
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(reviewsData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    for (let review of reviewsData) {
      await Review.destroy({
        where: review,
      });
    }
  },
};
