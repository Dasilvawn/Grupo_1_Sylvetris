//const products = require("../data/products");

module.exports = {
  
  productDetail: (req, res) => {
    //let product = products.find((product) => product.slug === req.params.slug);

    return res.render("products/productDetail", {
      title: "Sylvestris | Detalle producto X",
    });
  },
  productCart: (req, res) => {
    return res.render("products/productCart", {
      title: "Sylvestris | Carrito",
    });
  },
};
