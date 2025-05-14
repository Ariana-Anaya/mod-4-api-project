"use strict";

let options = {};
options.tableName = "Spots";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable({
      tableName: 'Spots',
      schema: options.schema
    });
    if (!tableInfo.ownerId) {
      await queryInterface.addColumn('Spots', 'ownerId', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Spots", "ownerId");
  },
};