const { loadProducts, loadUsers } = require("../../data/db");

module.exports = {
    getDashboard: (req, res) => {
        const productos = loadProducts();
        const users = loadUsers();
        const id = req.session.userLogin?.id;
        const user = users.find((user) => user.id === +id);
        return res.render("adm/dashboard", {
          title: "Sylvestris | Panel de administracion",
          productos,
          user
        });
      },
}