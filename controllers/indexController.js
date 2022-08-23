const { categorias, instagram } = require("../data/data");
const fs = require("fs");
const path = require("path");
const { formatPrice } = require("../utils/moneda");

const productsFilePath = path.join(__dirname, "../data/products.json");

module.exports = {
  index: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const productsByFeatured = products.filter((product) => product.destacado);

    return res.render("index", {
      title: "Sylvestris | Home",
      categorias,

      productsByFeatured,
      formatPrice,
      instagram,
    });
  },
  search: (req, res) => {
    let { keywords } = req.query;
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    const productsByFeatured = products.filter((product) => product.destacado);

    let result = products.filter((product) =>
      product.nombre.toLowerCase().includes(keywords.toLowerCase() ) || product.categoria.toLowerCase().includes(keywords.toLowerCase() )
    );
    //console.log(result);
    //return res.send(result)

    return res.render("./products/search", {
      title: "Sylvestris | Search",
      keywords,
      result,
      formatPrice,
      productsByFeatured
    });
  },
};
