const {validationResult} =require('express-validator');
const bcryptjs = require('bcryptjs');
const {loadUsers, storeUsers} = require('../data/db');

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
    
    if(errors.isEmpty()){
        const {name,surname,email,password,username} = req.body;
        let users = loadUsers();

        let newUser = {
            id : users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name :name.trim(),
            surname : surname.trim(),
            email : email.trim(),
            password : bcryptjs.hashSync(password,12),
            username : username.trim(),
            rol : 'user',
            avatar : null
        }

        let usersModify = [...users, newUser];

        storeUsers(usersModify);

        return res.redirect('/users/login');
    }else{
        return res.render('register',{
            title: 'Register',
            errors : errors.mapped(),
            old : req.body
        })
    }
  
  },
};
