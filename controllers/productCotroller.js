const db = require("../database/models");
const { formatPrice } = require("../utils/moneda");

module.exports = {
  products: (req, res) => {
    db.Product.findAll({ include: ["images"] })
      .then((products) => {
        return res.render("./products/products", {
          title: "Sylvestris | Productos",
          products,
          formatPrice,
        });
      });
  },

  productDetail: (req, res) => {
    const id = req.params.id;
    let product = db.Product.findByPk(id, {
      include: ["images", "category"],
    });
    let productsByFeatured = db.Product.findAll({
      include: ["images"],
      where: {
        destacado: 1,
      },
    });
    Promise.all([product, productsByFeatured]).then(
      ([product, productsByFeatured]) => {
        res.render("./products/productDetail", {
          title: `Sylvestris | ${product.name}`,
          product,
          formatPrice,
          productsByFeatured,
        });
      }
    );
  },
  productCategory: (req, res) => {
    db.Product.findAll({
      where: {
        categoryId: req.params.id,
      },
      include: [{ association: "category" }, { association: "images" }],
    }).then((products) => {
      const categoria = products[0].category.name;
      res.render("products/categories", {
        title: `Sylvestris | ${categoria}`,
        products,
        formatPrice,
        categoria,
      });
    });
  },
  productCart: (req, res) => {
    return res.render("products/productCart", {
      title: "Sylvestris | Carrito",
    });
  },
};
