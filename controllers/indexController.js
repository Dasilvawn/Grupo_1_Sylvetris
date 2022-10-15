const { categorias, instagram } = require("../data/data");
const { formatPrice } = require("../utils/moneda");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  index: (req, res) => {
    db.Product.findAll({
      include: ["images"],
      where: {
        destacado: 1,
      },
    }).then((productsByFeatured) => {
      return res.render("index", {
        title: "Sylvestris | Home",
        categorias,
        productsByFeatured,
        formatPrice,
        instagram,
      });
    });
  },
  search: (req, res) => {
    let { keywords } = req.query;
    let result = db.Product.findAll({
      include: ["images"],
      where: {
        nombre: { [Op.like]: `%${keywords}%` },
      },
    });
    let productsByFeatured = db.Product.findAll({
      include: ["images"],
      where: {
        destacado: 1,
      },
    });
    Promise.all([result, productsByFeatured]).then(
      ([result, productsByFeatured]) => {
        res.render("./products/search", {
          title: "Sylvestris | Search",
          keywords,
          result,
          formatPrice,
          productsByFeatured,
        });
      }
    );
  },
};