const { loadProducts } = require("../../data/db");

module.exports = {
    getDashboard: (req, res) => {
        const productos = loadProducts
        return res.render("adm/dashboard", {
          title: "Sylvestris | Panel de administracion",
          productos,
        });
      },
}