const db = require("../../database/models");

module.exports = {
  getDashboard: (req, res) => {
    const productos = db.Product.findAll({
      include: ["images", "category"],
    });
    const user = db.User.findAll();

    Promise.all([productos, user])

      .then(([productos, user]) => {
        return res.render("adm/dashboard", {
          title: "Sylvestris | Panel de administracion",
          productos,
          user,
        });
      })
      .catch((error) => console.log(error));
  },
};
