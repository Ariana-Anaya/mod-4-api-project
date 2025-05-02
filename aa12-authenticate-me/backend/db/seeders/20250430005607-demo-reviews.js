'use strict';
const { Spot, User, Review, ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';

    const user1 = await User.findOne({ where: { email: 'demo@user.io' } });
    const user2 = await User.findOne({ where: { email: 'user1@user.io' } });
    const demoUser = await User.findOne({ where: { email: 'demo@user.io' } });

    const spot1 = await Spot.findOne({ where: { address: '123 Disney Lane' } });
    const spot2 = await Spot.findOne({ where: { address: 'One N 19th St' } });
    const spot3 = await Spot.findOne({ where: { address: '310 W Broadway' } });

    if (!user1 || !user2 || !demoUser || !spot1 || !spot2 || !spot3) {
      throw new Error('Seed dependencies missing: Check Users and Spots exist first.');
    }

    const reviews = await Review.bulkCreate([
      {
        spotId: spot1.id,
        userId: user1.id,
        review: "Fantastic place to stay! Would recommend",
        stars: 5,
      },
      {
        spotId: spot1.id,
        userId: user2.id,
        review: "Great experience, but loud at night",
        stars: 4,
      },
      {
        spotId: spot2.id,
        userId: demoUser.id,
        review: "Great location and host!",
        stars: 5,
      },
      {
        spotId: spot2.id,
        userId: user2.id,
        review: "A bit lacking in amenities",
        stars: 3,
      },
      {
        spotId: spot3.id,
        userId: user1.id,
        review: "Great place with cool views",
        stars: 5,
      },
    ], { ...options, returning: true });

    await ReviewImage.bulkCreate([
      {
        reviewId: reviews[0].id,
        url: "https://example.com/review1-image1.jpg",
      },
      {
        reviewId: reviews[0].id,
        url: "https://example.com/review1-image2.jpg",
      },
      {
        reviewId: reviews[2].id,
        url: "https://example.com/review3-image1.jpg",
      },
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, null, {});
  }
};
