const fs = require('fs');
const path = require('path');
// const { isModuleNamespaceObject } = require('util/types');

let adminis = ['Hernan', 'Jon', 'Marcos', 'Walter'];
              

const admMiddlewares = (req,res,next)=>{
    if(adminis.includes(req.query.user)){
        next()    
    }else{
        res.redirect('/');
    }
}// SI SOS ADM PASA, SINO AL HOME.

module.exports = {
    admMiddlewares
}
