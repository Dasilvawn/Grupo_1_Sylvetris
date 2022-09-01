const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { loadUsers, storeUsers } = require("../data/db");

module.exports = {
  login: (req, res) => {
    return res.render("users/login", {
      title: "Sylvestris | Login",
    });
  },
  postLogin: (req,res) => {
      let errors = validationResult(req);
      // return res.send(errors) 
      if(errors.isEmpty()){

      let {id,firstname,lastname,email,state,country,address,city,gender,image,cp} = loadUsers().find(user => user.email === req.body.email);
        //  return res.send(req.body)
      req.session.userLogin ={
          id,
          firstname,
          lastname,
          email,
          state,
          country,
          address,
          city,
          gender,
          image,
          cp,          
      };
      //  return res.send(req.session.userLogin)
      if(req.body.remember){
          res.cookie('Sylvestris',req.session.userLogin, {
              maxAge : 1000 * 60 *60 *24
          })
      }
          return res.redirect('/')
      }else {
          return res.render("users/login",{
              title: 'Sylvestris | Login',
              errors : errors.mapped()
          })
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
        image: 'user_default.png',
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
        iconNavbar: firstLetterName 
      };

      res.cookie('sylvestris',req.session.userLogin,{
        maxAge : 1000 * 60 * 60
    })

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
};
