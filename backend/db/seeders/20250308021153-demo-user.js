'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const seedData = [
  {
    email: "demo@user.io",
    username: "Demo-lition",
    firstName: "Demo",
    lastName: "Lition",
    hashedPassword: bcrypt.hashSync("password"),
  },
  {
    email: "user1@user.io",
    username: "FakeUser1",
    firstName: "Ariana",
    lastName: "Anaya",
    hashedPassword: bcrypt.hashSync("password2"),
  },
  {
    email: "user2@user.io",
    username: "FakeUser2",
    firstName: "Zack",
    lastName: "Haley",
    hashedPassword: bcrypt.hashSync("password3"),
  },
  {
    email: "ariana@user.io",
    username: "ariana2395",
    firstName: "Ari",
    lastName: "Ana",
    hashedPassword: bcrypt.hashSync("password4"),
  },
  {
    email: "squirrel@gmail.com",
    username: "squirrelgirl",
    firstName: "Doreen",
    lastName: "Grey",
    hashedPassword: bcrypt.hashSync("stampede1"),
  },
  {
    email: "Daniel@hotmail.com",
    username: "Laniel",
    firstName: "Daniel",
    lastName: "Lan",
    hashedPassword: bcrypt.hashSync("rocketleague4"),
  },
  {
    email: "Tony@wiseguy.com",
    username: "TonySop",
    firstName: "Tony",
    lastName: "Soprano",
    hashedPassword: bcrypt.hashSync("gabagool99"),
  },
  {
    email: "Larry@gmail.com",
    username: "SeinfeldLover",
    firstName: "Larry",
    lastName: "David",
    hashedPassword: bcrypt.hashSync("festivus22"),
  },
  {
    email: "simpson@gmail.com",
    username: "ElBarto",
    firstName: "Bart",
    lastName: "Simpson",
    hashedPassword: bcrypt.hashSync("Simpson22"),
  },
  {
    email: "Kramer@gmail.com",
    username: "Kramer",
    firstName: "Cosmo",
    lastName: "Kramer",
    hashedPassword: bcrypt.hashSync("Kman1234"),
  },
  
]


module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(seedData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: seedData.map((user) => {
            return user.username;
          }),
        },
      },
      {}
    );
  },
};
