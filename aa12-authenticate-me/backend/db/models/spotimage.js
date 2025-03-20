// backend/db/models/spotimage.js
'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
   
    static associate(models) {
      // define association here
      //   - SpotImage belongs to Spot through spotId
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: 'Spot',
      });
    }
  }
  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          msg: 'Must be in Url format',
        }
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
  }, 
}, {
    sequelize,
    modelName: 'SpotImage',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  }
);
  return SpotImage;
};