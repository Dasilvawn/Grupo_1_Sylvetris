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

    if (errors.isEmpty()) {
      let {
        id,
        name,
        lastname,
        email,
        rol,
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
        rol,
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

    if (errors.isEmpty()) {
      const { name, lastname, email, password } = req.body;
      let users = loadUsers();

      let newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        dni: null,
        rol: "usuario",
        address: "",
        country: "",
        state: "",
        city: "",
        cp: null,
        image: ["user_default.png"],
      };

      // inicio session una vez creado el usuario
      req.session.userLogin = {
        id: newUser.id,
        name: newUser.name,
        lastname: newUser.lastname,
        dni: newUser.dni,
        rol: newUser.rol,
        address: newUser.address,
        country: newUser.country,
        state: newUser.state,
        city: newUser.city,
        cp: newUser.cp,
        image: newUser.login,
        iconNavbar: newUser.name.split(" ")[0]?.charAt(0),
      };

      res.cookie("sylvestris", req.session.userLogin, {
        maxAge: 1000 * 60 * 60 * 24,
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
    });
  },

  rename: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/rename", {
      title: "Sylvestris | Cambiar nombre",
      user,
    });
  },

  putRename: (req, res) => {
    const users = loadUsers(); // cargo los usarios de json
    const id = req.session.userLogin.id; // cargo el id de la session
    const user = users.find((user) => user.id === +id); // busco al usuario a modificar

    let errors = validationResult(req); // traigo los errores del validador

    if (errors.isEmpty()) {
      // traigo la los datos del formulario
      let { name, lastname } = req.body;

      // traigo la imagen de multer
      let image = req.files.map((file) => file.filename);

      // genero un nuevo array con el usuario modificado
      const usersModify = users.map((user) => {
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

      // guardo en session los datos actualizados
      req.session.userLogin = {
        ...req.session.userLogin,
        name,
        lastname,
        iconNavbar: name.split(" ")[0]?.charAt(0),
        image: image ? image : user.image[0],
      };

      //actualizo la cookie
      req.cookies.sylvestris &&
        res.cookie("sylvestris", req.session.userLogin, {
          maxAge: 1000 * 60 * 60 * 24,
        });

      // actualizo el json
      storeUsers(usersModify);
      return res.redirect("/usuario/perfil");
    } else {
      return res.render("users/rename", {
        title: "Sylvestris | Cambiar nombre",
        old: req.body,
        errors: errors.mapped(),
        user,
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
    const id = req.session.userLogin.id;
    const user = users.find((user) => user.id === +id);

    let errors = validationResult(req);

    if (errors.isEmpty()) {
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
      // no hay cambios en la session ni en la cookie, solo en el json
      storeUsers(userModify);
      return res.redirect("/usuario/perfil");
    } else {
      return res.render("users/change_password", {
        title: "Sylvestris | Cambiar contraseña",
        old: req.body,
        errors: errors.mapped(),
        user,
      });
    }
  },
  address: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/address", {
      title: "Sylvestris | Mi direccion",
      user,
    });
  },
  change_address: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("users/change_address", {
      title: "Sylvestris | Cambiar direccion",
      user,
    });
  },
  putChange_address: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin.id;
    const user = users.find((user) => user.id === +id);

    let errors = validationResult(req);

    if (errors.isEmpty()) {
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
      // guardo en session los datos actualizados
      req.session.userLogin = {
        ...req.session.userLogin,
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
        iconNavbar: name.split(" ")[0]?.charAt(0),
      };

      //actualizo la cookie
      req.cookies.sylvestris &&
        res.cookie("sylvestris", req.session.userLogin, {
          maxAge: 1000 * 60 * 60 * 24,
        });

      storeUsers(userModify);
      return res.redirect(`/usuario/perfil/direccion`);
    } else {
      return res.render("users/change_address", {
        title: "Sylvestris | Cambiar direccion",
        old: req.body,
        errors: errors.mapped(),
        user,
      });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("sylvestris", null, { maxAge: -1 });
    return res.redirect("/");
  },
};
