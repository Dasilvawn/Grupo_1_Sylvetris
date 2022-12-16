"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Rol, {
        as: "rol",
        foreignKey: "rolId",
      });

      User.hasMany(models.Address, {
        as: "address",
        foreignKey: "userId",
      });
      User.hasMany(models.Order, {
        as: "orders",
        foreignKey: "userId",
      });

      User.belongsToMany(models.Product, {
        as: "products",
        through: "cart",
        foreignKey: "userId",
        otherKey: "productId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      dni: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      rolId: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      id_social:  DataTypes.STRING,
      social_provider:  DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
