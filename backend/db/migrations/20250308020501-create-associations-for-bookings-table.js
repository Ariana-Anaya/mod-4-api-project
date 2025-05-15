let options = {};
options.tableName = "Bookings";
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable({
      tableName: 'Bookings',
      schema: options.schema
    });
    if (!tableInfo.userId) {
      await queryInterface.addColumn('Bookings', 'userId', {
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
    await queryInterface.removeColumn("Bookings", "userId");
  },
};