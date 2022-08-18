const fs = require("fs");
const path = require("path");
const { formatPrice } = require("../utils/moneda");

const productsFilePath = path.join(__dirname, "../data/products.json");

module.exports = {
  products: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    return res.render("products/products", {
      title: "Sylvestris | Productos",
      products,
      formatPrice,
    });
  },

  productDetail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    const product = products.find((product) => product.id === +req.params.id);
    
    return res.render("products/productDetail", {
      title: `Sylvestris | Detalle producto X`,
      product,
      formatPrice,
    });
  },
  productCart: (req, res) => {
    return res.render("products/productCart", {
      title: "Sylvestris | Carrito",
    });
  },
};
