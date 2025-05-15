"use strict";

let options = {};
options.tableName = "ReviewImages";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable({
      tableName: options.tableName,
      schema: options.schema,
    });

    if (!tableInfo.reviewId) {
      await queryInterface.addColumn(options, "reviewId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Reviews" },
        onDelete: "CASCADE",
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable({
      tableName: options.tableName,
      schema: options.schema,
    });
    if (tableInfo.reviewId) {
      await queryInterface.removeColumn(options, "reviewId");
    }
  },
};