"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
const spotsData = [
  {
    ownerId: 1,
    address: "4 Privet Drive",
    city: "San Francisco",
    state: "California",
    country: "United States of America",
    lat: 37.2798729,
    lng: -122.234897234,
    name: "Rustic Barnhouse Escape",
    description:
      "A charming barnhouse. A great blend of comfort living with modern amenities. SUper cozy with a beautiful farmland attached.",
    price: 120,
  },
  {
    ownerId: 1,
    address: "1235 Grove Street",
    city: "Denver",
    state: "Colorado",
    country: "United States of America",
    lat: 40.238479,
    lng: -58.38648276,
    name: "Rocky Retreat",
    description: "A super cool dwelling in the rocky mountains. Hip asthetic and great amenitites. Keep warm during your expiditions.",
    price: 155,
  },
  {
    ownerId: 2,
    address: "678 Liars Lane",
    city: "Los Angeles",
    state: "Califronia",
    country: "United States of America",
    lat: 74,
    lng: -24.34787384,
    name: "Influencer Sanctuary",
    description:
      "Super flashy mansion home in the hear of LA. Top of the line decor and amenities. With many photo ops and a dazzling asthetic which includes the pool grotto in the backyard",
    price: 245,
  },
  {
    ownerId: 2,
    address: "7880 Evergreen Lane",
    city: "Springfield",
    state: "Oregon",
    country: "United States of America",
    lat: 54.38497987324,
    lng: -123,
    name: "Family Home",
    description: "A family retreat inspired by the simpsons home. An almost exact replica of one of the most famous homes on telivision. Fun for the whole family",
    price: 230,
  },
  {
    ownerId: 3,
    address: "202 Pearl Street",
    city: "Long Beach",
    state: "California",
    country: "United States of America",
    lat: 45.48329749,
    lng: -134.3247987,
    name: "Beachside Haven",
    description:"Experience everything Long Beach has to offer at this awesome beachfront home. Access to a surfer paradise, the aquarium and other aquatic adventures. The home is a beach lovers pardise",
    price: 280,
  },
  {
    ownerId: 1,
    address: "4255 Clark Street",
    city: "Rochester",
    state: "New York",
    country: "United States of America",
    lat: 45.82739487234,
    lng: -134.2837928734,
    name: "Art Lovers Escape",
    description: "This is the place to stay if you love art. Decorated with local artist painting and sculptures as well as replicas of familiar favorites. Modern upscale living",
    price: 345,
  },
  {
    ownerId: 7,
    address: "567 Laurel St",
    city: "Santa Barbara",
    state: "California",
    country: "United States of America",
    lat: 23.238497293,
    lng: -101.283947982374,
    name: "Architectural Delight",
    description: "This beautiful Spanish Home was built at the heart of Santa Barbara. With dazzling archetecture and great amenities, make your trip to this beautiful town extra special",
    price: 320,
  },
  {
    ownerId: 8,
    address: "213 Firefly Lane",
    city: "Seattle",
    state: "Washington",
    country: "United States of America",
    lat: 77.2348978,
    lng: -162.2384798,
    name: "Coffee Cove",
    description: "This cozy townhome is inspired by Seattles rich coffee history. With included coffee amenities for a true coffee lover as well as cofee inspired decor.",
    price: 89,
  },
  
];

module.exports = {
  async up(queryInterface, Sequelize) {

    await Spot.bulkCreate(spotsData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        address: {
          [Op.in]: spotsData.map((spot) => {
            return spot.address;
          }),
        },
      },
      {}
    );
  },
};
