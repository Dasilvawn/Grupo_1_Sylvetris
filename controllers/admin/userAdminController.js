const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { loadUsers, storeUsers } = require("../../data/db");

module.exports = {
  getUsers: (req, res) => {
    const users = loadUsers();
    return res.render("adm/users", {
      title: "Sylvestris | Lista de Usuarios",
      users,
    });
  },
  getCreateUsers: (req, res) => {
    const users = loadUsers();
    return res.render("adm/createUser", {
      title: "Sylvestris | Crear Usuario",
      users,
    });
  },
  postCreateUsers: (req, res) => {
    let errors = validationResult(req);
    

    if (errors.isEmpty()) {
      const {
        name,
        lastname,
        email,
        password,
        rol,
        address,
        country,
        state,
        city,
        cp,
        phone,
        dni
      } = req.body;
      const users = loadUsers();

      let image = req.files.map((file) => file.filename);

      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        rol: rol,
        address: address ? address.trim() : "",
        country: country ? country.trim() : "",
        state: state ? state : "",
        city: city ? city.trim() : "",
        cp: +cp,
        image: image ? [...user.image, image] : "user_default.png",
        phone: phone,
        dni
      };
      let usersModify = [...users, newUser];
      storeUsers(usersModify);
      return res.redirect("/admin/users");
    } else {
      return res.render("adm/createUser", {
        title: "Sylvestris | Crear Usuario",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  getEditUsers: (req, res) => {
    const users = loadUsers();

    const user = users.find((user) => user.id === +req.params.id);
    return res.render("adm/editUser", {
      title: "Sylvestris | Editar usuario",
      user,
    });
  },
  putEditUsers: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const {
        name,
        lastname,
        email,
        password,
        rol,
        address,
        country,
        state,
        city,
        cp,
        phone,
      } = req.body;
      const users = loadUsers();

      const userOriginal = users.find((user) => user.id === +req.params.id);

      
      let image = req.files.map((file) => file.filename);
      const editUser = users.map((user) => {
        if (user.id === +req.params.id) {
          return {
            id: user.id,
            name: name.trim(),
            lastname: lastname.trim(),
            email: email.trim(),
            password: bcryptjs.hashSync(password, 12),
            rol: rol,
            address: address ? address.trim() : "",
            country: country ? country.trim() : "",
            state: state ? state : "",
            city: city ? city.trim() : "",
            cp: +cp,
            image: image ? image : userOriginal.image,
            phone: phone,
          };
        } else {
          return user;
        }
      });
      storeUsers(editUser);
      return res.redirect("/admin/users");
    } else {
      return res.render("adm/editUser", {
        title: "Sylvestris | Editar Usuario",
        errors: errors.mapped(),
        old: req.body,
        id: req.params.id,
        user: req.body,
      });
    }
  },
  deleteUsers: (req, res) => {
    const users = loadUsers();

    const usersFilter = users.filter((user) => user.id !== +req.params.id);

    storeUsers(usersFilter);

    return res.redirect("/admin/users");
  },
};
