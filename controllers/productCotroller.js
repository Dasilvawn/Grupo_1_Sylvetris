const db = require("../database/models");
const { formatPrice } = require("../utils/moneda");

module.exports = {
  products: (req, res) => {
    db.Product.findAll({ include: ["images"] }).then((products) => {
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
  productApiDetail: async (req, res) => {
    const id = req.params.id;
    let product = await db.Product.findByPk(id, {
      include: ["images", "category"],
    });
    return res.status(200).json({
      product,
    });
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
  checkout: (req, res) => {
    if (!req.session.userLogin) {
      return res.redirect("/usuario/login");
    }

    return res.render("products/checkout", {
      title: "Sylvestris | Finaliza compra",
    });
  },
  finish: async (req, res) => {
    const id = req.session.userLogin?.id;
    const user = await db.User.findByPk(id)
    
    return res.render("products/finish", {
      title: "Sylvestris | Finaliza compra",
      user
    });
  },
};
