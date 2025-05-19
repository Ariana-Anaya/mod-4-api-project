"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: "userId",
      });

      Review.belongsTo(models.Spot, {
        foreignKey: "spotId",
      });

      Review.hasMany(models.ReviewImage, {
        foreignKey: "reviewId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Review.init(
    {
      review: {
        type: DataTypes.STRING,
      },
      stars: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
