"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Image, {
        as: "images",
        foreignKey: "productId",
        onDelete: "cascade",
      });

      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      });
      Product.belongsToMany(models.User, {
        as: "users",
        through: "cart",
        foreignKey: "productId",
        otherKey: "userId"
      });
    }
  }
  Product.init(
    {
      nombre: DataTypes.STRING,
      sub_titulo: DataTypes.STRING,
      slug: DataTypes.STRING,
      stock: DataTypes.INTEGER,
      destacado: DataTypes.BOOLEAN,
      descripcion: DataTypes.TEXT,
      descripcion_altura: DataTypes.STRING,
      descripcion_maceta: DataTypes.STRING,
      precio: DataTypes.DECIMAL,
      cuidados: DataTypes.TEXT,
      agua: DataTypes.INTEGER,
      luz: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      paranoid: true,
    }
  );
  return Product;
};
