// backend/db/models/spot.js
'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      // define association here
     //Spot belongs to User through ownerId (as Owner)
     Spot.belongsTo(models.User, {
      foreignKey: 'ownerId',
      as: 'Owner',
    });

    // - Spot has many SpotImages through spotId
    Spot.hasMany(models.SpotImage, {
      foreignKey: 'spotId',
      as: 'SpotImages',
    });

    //-Spot has many Reviews through spotId
    Spot.hasMany(models.Review, {
      foreignKey: 'spotId',
      as: 'Reviews',
    });

    // Spot has many Bookings through spotId
    Spot.hasMany(models.Booking, {
      foreignKey: 'spotId',
      as: 'Bookings',
    });
  }
}

  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
      
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Adress cannot be empty',
        },
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'City cannot be empty',
        },
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'State cannot be empty',
        },
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Country cannot be empty',
        },
      },
    },
    lat: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false,
      validate: {
        min: -90,
        max: 90,
        isDecimal: {
          msg: 'Lattitude must be valid decimal',
        },
      },
    },
    lng: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false,
      validate: {
        min: -180,
        max: 180,
        isDecimal: {
          msg: 'Longitude must be valid decimal',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        notEmpty: {
          msg: 'Name cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty',
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false,
      validate: {
        min: 1,
        isDecimal: {
          msg: 'Price must be valid decimal',
        },
      },
    },
  }, {
    sequelize,
      modelName: 'Spot',
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );
  return Spot;
};