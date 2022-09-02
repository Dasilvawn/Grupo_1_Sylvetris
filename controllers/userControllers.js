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
    let errors = validationResult(req);
    // return res.send(errors)
    if (errors.isEmpty()) {
      let {
        id,
        name,
        lastname,
        email,
        state,
        country,
        address,
        city,
        gender,
        image,
        cp,
      } = loadUsers().find((user) => user.email === req.body.email);

      const firstLetterName = name.split(" ")[0]?.charAt(0);

      req.session.userLogin = {
        id,
        name,
        lastname,
        email,
        state,
        country,
        address,
        city,
        gender,
        image,
        cp,
        iconNavbar: firstLetterName,
      };
      //  return res.send(req.session.userLogin)
      if (req.body.remember) {
        res.cookie("Sylvestris", req.session.userLogin, {
          maxAge: 1000 * 60 * 60 * 24,
        });
      }
      res.locals.userLogin = req.session.userLogin;
      return res.redirect("/");
    } else {
      return res.render("users/login", {
        title: "Sylvestris | Login",
        errors: errors.mapped(),
      });
    }
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
        image: ["user_default.png"],
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
        session: req.session,
      });
    }
  },
  profile: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/profile", {
      title: "Sylvestris | Mi perfil",
      user,
      session: req.session,
    });
  },

  rename: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/rename", {
      title: "Sylvestris | Cambiar nombre",
      user,
      session: req.session,
    });
  },
  putRename: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin.id;
    const user = users.find((user) => user.id === +id);
    

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const { id } = req.params;
      let { name, lastname } = req.body;
      let image = req.files.map((file) => file.filename);
      console.log(req.body)

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
      console.log(userModify)
      storeUsers(userModify);
      return res.redirect("/usuario/perfil");
    } else {
      return res.render("users/rename", {
        title: "Sylvestris | Cambiar nombre",
        old: req.body,
        id: req.params.id,
        errors: errors.mapped(),
        user,
        session: req.session,
      });
    }
  },

  change_password: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/change_password", {
      title: "Sylvestris | Cambiar contraseña",
      user,
      session: req.session,
    });
  },
  putChange_password: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);

    let errors = validationResult(req);

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
      return res.redirect("/usuario/perfil" );
    } else {
      return res.render("users/change_password", {
        title: "Sylvestris | Cambiar contraseña",
        old: req.body,
        id: req.params.id,
        errors: errors.mapped(),
        user,
        session: req.session,
      });
    }
  },
  address: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/address", {
      title: "Sylvestris | Mi direccion",
      user,
      session: req.session,
    });
  },
  change_address: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/change_address", {
      title: "Sylvestris | Cambiar direccion",
      user,
      session: req.session,
    });
  },
  putChange_address: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const { id } = req.params;
      let {
        name,
        lastname,
        phone,
        dni,
        address,
        floor,
        dpto,
        state,
        city,
        cp,
      } = req.body;

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
            cp,
          };
        } else {
          return user;
        }
      });

      storeUsers(userModify);
      return res.redirect(`/usuario/perfil/direccion`);
    } else {
      return res.render("users/change_address", {
        title: "Sylvestris | Cambiar direccion",
        old: req.body,
        id: req.params.id,
        errors: errors.mapped(),
        user,
        session: req.session,
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("sylvestris", null, { maxAge: -1 });
    return res.redirect("/");
  },
};
