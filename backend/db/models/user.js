"use strict";

const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot, {
        foreignKey: "ownerId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Booking, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });

      User.hasMany(models.Review, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["email", "hashedPassword", "createdAt", "updatedAt"],
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
