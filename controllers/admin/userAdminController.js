const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../../database/models");
const fs = require("fs").promises;

module.exports = {
  getUsers: (req, res) => {
    /* const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("adm/users", {
      title: "Sylvestris | Lista de Usuarios",
      users,
      user,
    }); */
    db.User.findAll({ include: ["rol"] }).then((users) => {
      return res.render("./adm/users", {
        title: "Sylvestris | Lista de Usuarios",
        users,
      });
    });
  },
  getCreateUsers: (req, res) => {
    /* const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("adm/", {
      title: "Sylvestris | Crear Usuario",
      users,
      user,
    }); */
    db.User.findAll().then((users) => {
      return res.render("./adm/createUser", {
        title: "Sylvestris | Crear Usuario",
        users,
      });
    });
  },
  postCreateUsers: (req, res) => {
    /* let errors = validationResult(req);

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
        dni,
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
        dni,
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
    } */
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
        dni,
      } = req.body;

      let [image] = req.files.map((file) => file.filename);

      db.User.create({
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        rolId: rol,
        phone: phone ? phone : null,
        dni: dni ? dni : null,
        avatar: image ? image : "user_default.png",
      })
        .then((user) => {
          db.Address.create({
            address: address ? address.trim() : null,
            country: country ? country.trim() : null,
            state: state ? state.trim() : null,
            city: city ? city.trim() : null,
            cp: cp ? cp : null,
            userId: user.id,
          });
          return res.redirect("/admin/users");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("./adm/createUser", {
        title: "Sylvestris | Crear Usuario",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  getEditUsers: (req, res) => {
    /*  const users = loadUsers();
    const id = req.session.userLogin?.id;
    const userAdmin = users.find((user) => user.id === +id);

    const user = users.find((user) => user.id === +req.params.id);
    return res.render("adm/editUser", {
      title: "Sylvestris | Editar usuario",
      user,
      userAdmin,
    }); */
    db.User.findByPk(req.params.id, {
      include: ["address"],
    }).then((user) => {
      return res.render("adm/editUser", {
        title: "Sylvestris | Editar usuario",
        user,
      });
    });
  },
  putEditUsers: async (req, res) => {
    /*  let errors = validationResult(req);

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
            image: image.length === 0 ? userOriginal.image : image,
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
    } */
    try {
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
          dni,
        } = req.body;
        let editUser = await db.User.findByPk(req.params.id, {
          include: ["address"],
        });
        let editAddress = await db.Address.findByPk(
          (id = editUser.address[0].id)
        );
        let [image] = req.files.map((file) => file.filename);

        editUser.name = name.trim();
        editUser.lastname = lastname.trim();
        editUser.email = email.trim();
        editUser.password = bcryptjs.hashSync(password, 12);
        editUser.rolId = +rol;
        editUser.phone = phone ? phone : null;
        editUser.dni = dni ? dni : null;
        editUser.avatar = image ? image : editUser.avatar;
        await editUser.save();

        editAddress.address = address ? address.trim() : null;
        editAddress.country = country ? country.trim() : null;
        editAddress.state = state ? state.trim() : null;
        editAddress.city = city ? city.trim() : null;
        editAddress.cp = cp ? cp : null;

        await editAddress.save();

        return res.redirect("/admin/users");
      } else {
        db.User.findByPk(req.params.id, {
          include: ["address"],
        }).then((user) => {
          return res.render("adm/editUser", {
            title: "Sylvestris | Editar Usuario",
            errors: errors.mapped(),
            old: req.body,
            user,
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteUsers: async (req, res) => {
    /*  const users = loadUsers();

    const usersFilter = users.filter((user) => user.id !== +req.params.id);

    storeUsers(usersFilter);

    return res.redirect("/admin/users"); */
    try {
      const userDelete = await db.User.findByPk(req.params.id, {
        include: ["address"],
      });

      const addressDelete = await db.Address.findByPk(userDelete.address[0].id);
      if (userDelete.avatar !== "user_default.png") {
        fs.unlink(`./public/images/avatars/${userDelete.avatar}`);
      }

      await addressDelete.destroy();
      await userDelete.destroy();

      return res.redirect("/admin/users");
    } catch (error) {
      console.log(error);
    }
  },
};