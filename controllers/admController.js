const fs = require("fs");
const path = require("path");

const productosFilePath = path.join(__dirname, "..", "data", "products.json");

module.exports = {
  editProduct: (req, res) => {
    //let product = products.find((product) => product.slug === req.params.slug);

    return res.render("adm/editProduct", {
      title: "Sylvestris | Editar producto",
    });
  },
  createProduct: (req, res) => {
    return res.render("adm/createProduct", {
      title: "Sylvestris | Crear producto",
    });
  },
  getProducts: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    return res.render("adm/products", {
      title: "Sylvestris | Lista de Productos",
      productos,
    });
  },
  deleteProducts: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

    const productFilter = productos.filter(
      (product) => product.id !== +req.params.id
    );

    fs.writeFileSync(
      path.join(__dirname, "..", "data", "products.json"),
      JSON.stringify(productFilter, null, 3),
      "utf-8"
    );

    return res.redirect("/admin/products");
  },
};
