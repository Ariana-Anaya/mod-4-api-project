"use strict";

let options = {};
options.tableName = "SpotImages";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable({
      tableName: 'SpotImages',
      schema: options.schema 
    });
    if (!tableInfo.spotId) {
      await queryInterface.addColumn('SpotImages', 'spotId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Spots',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('SpotImages', 'spotId');
  }
};