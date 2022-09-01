const fs = require('fs');

const userJson = require ('../data/users.json');

const middleUser = (req,res,next)=>{
    if(userJson.includes(req.query.user)){
        next('/')    
    }else{
        res.redirect('/register');
    }
}//SI SOS USUARIO PASA(HOME), SINO REGISTRATE

module.exports ={
    middleUser
}