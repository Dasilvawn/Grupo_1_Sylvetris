'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasMany(models.Cart, {
        as: "carts",
        foreignKey: "orderId",
      });
      Order.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });

    }
  }
  Order.init({
   
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    totalOrder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    paranoid : true
  });
  return Order;
};