'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      //- User has many Spots through ownerId with cascade delete
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        as: 'Spots',
        onDelete: 'CASCADE', 
      });
      //- User has many Reviews through userId with cascade delete
      User.hasMany(models.Reviews, {
        foreignKey: 'userId',
        as: 'Reviews',
        onDelete: 'CASCADE', 
      });
      //- User has many Bookings through userId with cascade delete
      User.hasMany(models.Bookings, {
        foreignKey: 'userId',
        as: 'Bookings',
        onDelete: 'CASCADE', 
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
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return User;
};