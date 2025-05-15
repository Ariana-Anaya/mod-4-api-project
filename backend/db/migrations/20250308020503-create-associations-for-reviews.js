"use strict";

let options = {};
options.tableName = "Reviews";
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

    if (!tableInfo.userId) {
      await queryInterface.addColumn(options, "userId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Users" },
        onDelete: "CASCADE",
      });
    }

    if (!tableInfo.spotId) {
      await queryInterface.addColumn(options, "spotId", {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Spots" },
        onDelete: "CASCADE",
      });
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const tableInfo = await queryInterface.describeTable({
      tableName: options.tableName,
      schema: options.schema,
    });
    if (tableInfo.userId) {
      await queryInterface.removeColumn(options, "userId");
    }
    if (tableInfo.spotId) {
      await queryInterface.removeColumn(options, "spotId");
    }
  },
};