const express = require("express");
const admController = require("../controllers/admController");
const router = express.Router();
const { edit, update, createProduct } = require("../controllers/admController");


/* /admin */
router.get("/createProduct/", createProduct);


/*** editar productos***/ 
router.get('/editProduct/:id', edit); 
router.put('/update/:id', update); 

// /* eliminar productos*/ 
// router.delete('/delete/:id', admController.delete); 

module.exports = router;
