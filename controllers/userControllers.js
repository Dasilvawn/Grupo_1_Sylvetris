const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const fs = require("fs").promises;
const db = require("../database/models");


module.exports = {
  login: (req, res) => {
    return res.render("users/login", {
      title: "Sylvestris | Login",
    });
  },
  postLogin: (req, res) => {
    /////////////////////Login db/////////////////////////
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        const firstLetterName = user.name.split(" ")[0]?.charAt(0);
        req.session.userLogin = {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          rol: user.rolId,
          avatar: user.avatar,
          iconNavbar: firstLetterName,
        };
        if (req.body.remember) {
          res.cookie("sylvestris", req.session.userLogin, {
            maxAge: 1000 * 60 * 60 * 24,
          });
        }
        res.locals.user = req.session.userLogin;

        res.redirect("/");
      });
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
    //////////////////////////Register DB//////////////////////////////
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { name, lastname, email, password } = req.body;
      db.User.create({
        name: name.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 12),
        rolId: 2,
        avatar: "user_default.png",
        dni: null,
        phone: null,
      })
        .then((user) => {
          db.Address.create({
            userId: user.id,
          });
          // inicio session una vez creado el usuario
          req.session.userLogin = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            rol: user.rolId,
            avatar: user.avatar,
            iconNavbar: user.name.split(" ")[0]?.charAt(0),
          };

          res.cookie("sylvestris", req.session.userLogin, {
            maxAge: 1000 * 60 * 60 * 24,
          });

          res.redirect("/");
        })
        .catch((err) => console.log(err));
    } else {
      res.render("users/register", {
        title: "Sylvestris | Register",
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  profile: (req, res) => {
    const id = req.session.userLogin?.id;
    db.User.findByPk(id)
      .then((user) => {
        return res.render("users/profile", {
          title: "Sylvestris | Mi perfil",
          user,
        });
      })
      .catch((err)=>console.log(err));
  },
  rename: async (req, res) => {
    const id = req.session.userLogin?.id;
    db.User.findByPk(id)
      .then((user) => {
        return res.render("users/rename", {
          title: "Sylvestris | Cambiar nombre",
          user,
      });
    })
    .catch((err)=>console.log(err));
  },

  putRename: async (req, res) => {

    let errors = validationResult(req); // traigo los errores del validador
    const id = req.session.userLogin.id; // cargo el id de la session


    if (errors.isEmpty()) {
      // traigo la los datos del formulario
      try{
      const { name, lastname } = req.body;

      // traigo la imagen de multer
      const [image] = req.files.map((file) => file.filename);

      // genero un nuevo array con el usuario modificado
      let user = await db.User.findByPk(id);
      user.name = name.trim();
      user.lastname = lastname.trim();
      
      
      
      //si se envia un nuevo avatar, se borra el anterior
      if(image){
        fs.unlink(`./public/images/avatars/${user.avatar}`);
        user.avatar = image ;
      }else{
        user.avatar = user.avatar;
      }

      await user.save();

      // guardo en session los datos actualizados
      req.session.userLogin = {
        ...req.session.userLogin,
        name: user.name,
        lastname: user.lastname,
        iconNavbar: user.name.split(" ")[0]?.charAt(0),
        avatar: user.avatar,
      };

      //actualizo la cookie
      req.cookies.sylvestris &&
        res.cookie("sylvestris", req.session.userLogin, {
          maxAge: 1000 * 60 * 60 * 24,
        });
        res.redirect("/usuario/perfil");
      }catch(error){
        console.log(error);
      }
    } else {
      db.User.findByPk(id)
        .then((user) => {
          return res.render("users/rename", {
            title: "Sylvestris | Cambiar nombre",
            old: req.body,
            errors: errors.mapped(),
            user,
        });
      })
      .catch((err) => console.log(err));
    }
  },
  change_password: (req, res) => {
    const id = req.session.userLogin?.id;
    db.User.findByPk(id)
      .then((user) => {
        return res.render("users/change_password", {
          title: "Sylvestris | Cambiar contraseña",
          user,
      });
    })
    .catch((err) => console.log(err));
  },
  putChange_password: (req, res) => {
    const id = req.session.userLogin.id;
    let errors = validationResult(req);
    
    if (errors.isEmpty()) {
      let { password } = req.body;
      db.User.update(
        {
          password: bcryptjs.hashSync(password, 12),
        },
        {
          where: {
            id: req.session.userLogin.id,
          },
        }
      )
        .then(() => {
          res.redirect("/usuario/perfil");
        })
        .catch((err) => console.log(err));
      } else {
        db.User.findByPk(id)
          .then((user) => {
            return res.render("users/change_password", {
              title: "Sylvestris | Cambiar contraseña",
              old: req.body,
              errors: errors.mapped(),
              user,
          });
      })
      .catch((err) => console.log(err));
    }
  },
  address: (req, res) => {
    const id = req.session.userLogin?.id;
    db.User.findByPk(id, {
      include: ['address']
    })
      .then((user) => {

       
        return res.render("users/address", {
          title: "Sylvestris | Mi direccion",
          user,
      });
    })
    .catch((err) => console.log(err));
  },
  change_address: (req, res) => {
    const id = req.session.userLogin?.id;
    db.User.findByPk(id, {
      include: ["address"]
    })
    .then((user) => {
      return res.render("users/change_address", {
        title: "Sylvestris | Cambiar direccion",
        user,
      });
    })
    .catch((err) => console.log(err));
  },
  putChange_address: (req, res) => {
    let id = req.session.userLogin.id;
    let errors = validationResult(req);
    
    if (errors.isEmpty()) {
      // guardo en session los datos actualizados
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

      req.session.userLogin = {
        ...req.session.userLogin,
        name,
        lastname,
        iconNavbar: name.split(" ")[0]?.charAt(0),
      };

      //actualizo la cookie
      req.cookies.sylvestris &&
        res.cookie("sylvestris", req.session.userLogin, {
          maxAge: 1000 * 60 * 60 * 24,
        });

      db.User.update(
        {
          name: name.trim(),
          lastname: lastname.trim(),
          phone: phone.trim(),
          dni,
        },
        {
          where: {
            id: req.session.userLogin.id,
          },
        }
      ).then(() => {
        db.Address.update({
          address: address.trim(),
          floor: floor ? floor.trim() : null,
          dpto: dpto ? dpto.trim() : null,
          state: state.trim(),
          city: city.trim(),
          cp,
        },{
          where: {
            userId: req.session.userLogin.id,
          },
        }
      ).then(() => {
        res.redirect(`/usuario/perfil/direccion`);
      });
      });
    } else {
      db.User.findByPk(id, {
        include: ["address"]
      })
        .then((user) => {
          return res.render("users/change_address", {
            title: "Sylvestris | Cambiar direccion",
            old: req.body,
            errors: errors.mapped(),
            user,
        });
      })
      .catch((err) => console.log(err));
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("sylvestris", null, { maxAge: -1 });
    return res.redirect("/");
  },
  
  
  googleSignin: async (req, res = response) => {
    const firstLetterName = req.session.passport.user.name.split(" ")[0]?.charAt(0);
    
    req.session.userLogin = {
      id: req.session.passport.user.id,
      name: req.session.passport.user.name,
      lastname: req.session.passport.user.lastname,
      email: req.session.passport.user.email,
      id_social: req.session.passport.user.id_social,
      rol: 2,
      social_provider: req.session.passport.user.social_provider,
      avatar: req.session.passport.user.avatar,
      iconNavbar: firstLetterName,
    };
    res.cookie("sylvestris", req.session.userLogin, {
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.redirect("/");
  },
};
