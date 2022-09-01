const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { loadUsers, storeUsers } = require("../data/db");

module.exports = {
  login: (req, res) => {
    return res.render("users/login", {
      title: "Sylvestris | Login",
    });
  },
  postLogin: (req, res) => {
    //codigo de walter
  },

  register: (req, res) => {
    return res.render("users/register", {
      title: "Sylvestris | Register",
    });
  },
  postRegister: (req, res) => {
    let errors = validationResult(req);
    //return res.send(errors)
    if (errors.isEmpty()) {
      const { name, lastname, email, password } = req.body;
      let users = loadUsers();

      let newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        rol: "usuario",
        address: "",
        country: "",
        state: "",
        city: "",
        cp: null,
        image: "user_default.png",
      };

      const firstLetterName = newUser.name.split(" ")[0]?.charAt(0);
      const firstLetterLastname = newUser.lastname.split(" ")[0]?.charAt(0);

      // inicio session una vez creado el usuario
      req.session.userLogin = {
        id: newUser.id,
        name: newUser.name,
        lastname: newUser.lastname,
        rol: newUser.rol,
        image: newUser.login,
        iconNavbar: firstLetterName,
      };

      res.cookie("sylvestris", req.session.userLogin, {
        maxAge: 1000 * 60 * 60,
      });

      let usersModify = [...users, newUser];

      storeUsers(usersModify);

      return res.redirect("/");
    } else {
      return res.render("users/register", {
        title: "Sylvestris | Register",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  profile: (req, res) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === +req.params.id);
    return res.render("users/profile", {
      title: "Sylvestris | Mi perfil",
      user,
    });
  },

  rename: (req, res) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === +req.params.id);
    return res.render("users/rename", {
      title: "Sylvestris | Cambiar nombre",
      user,
    });
  },
  putRename: (req, res) => {
    const users = loadUsers();

    const errors = validationResult(req);
    const user = users.find((user) => user.id === +req.params.id);

    if (errors.isEmpty()) {
      const { id } = req.params;
      let { name, lastname } = req.body;
      let image = req.files.map((file) => file.filename);

      const userModify = users.map((user) => {
        if (user.id === +id) {
          return {
            ...user,
            name,
            lastname,
            image: image ? image : user.image[0],
          };
        } else {
          return user;
        }
      });

      storeUsers(userModify);
      return res.redirect("/usuario/perfil/" + id);
    } else {
      return res.render("users/rename", {
        title: "Sylvestris | Cambiar nombre",
        old: req.body,
        id: req.params.id,
        errors: errors.mapped(),
        user,
      });
    }
  },

  change_password: (req, res) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === +req.params.id);
    return res.render("users/change_password", {
      title: "Sylvestris | Cambiar contraseña",
      user,
    });
  },
  putChange_password: (req, res) => {
    const users = loadUsers();

    const errors = validationResult(req);
    const user = users.find((user) => user.id === +req.params.id);

    if (errors.isEmpty()) {
      const { id } = req.params;
      let { password } = req.body;

      const userModify = users.map((user) => {
        if (user.id === +id) {
          return {
            ...user,
            password: bcryptjs.hashSync(password, 12),
          };
        } else {
          return user;
        }
      });

      storeUsers(userModify);
      return res.redirect("/usuario/perfil/" + id);
    } else {
      return res.render("users/change_password", {
        title: "Sylvestris | Cambiar contraseña",
        old: req.body,
        id: req.params.id,
        errors: errors.mapped(),
        user,
      });
    }
  },
  address: (req, res) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === +req.params.id);
    return res.render("users/address", {
      title: "Sylvestris | Mi direccion",
      user,
    });
  },
  change_address: (req, res) => {
    const users = loadUsers();
    const user = users.find((user) => user.id === +req.params.id);
    return res.render("users/change_address", {
      title: "Sylvestris | Cambiar direccion",
      user,
    });
  },
  putChange_address: (req, res) => {
    const users = loadUsers();

    const errors = validationResult(req);
    const user = users.find((user) => user.id === +req.params.id);

    if (errors.isEmpty()) {
      const { id } = req.params;
      let { name, lastname, phone, dni, address, floor, dpto, state, city, cp } = req.body;

      const userModify = users.map((user) => {
        if (user.id === +id) {
          return {
            ...user,
            name: name.trim(),
            lastname: lastname.trim(),
            phone: phone.trim(),
            dni,
            address: address.trim(),
            floor: floor ? floor.trim() : "",
            dpto: dpto ? dpto.trim() : "",
            state: state.trim(),
            city: city.trim(),
            cp
          };
        } else {
          return user;
        }
      });

      storeUsers(userModify);
      return res.redirect(`/usuario/perfil/${id}/direccion`);
    } else {
      return res.render("users/change_address", {
        title: "Sylvestris | Cambiar direccion",
        old: req.body,
        id: req.params.id,
        errors: errors.mapped(),
        user,
      });
    }
  },
};
