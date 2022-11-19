const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const newUserValidator = require("../../validations/newUserValidator");

  const getApiProducts  = async (req, res) => {  

    try { 
      const products = await db.Product.findAll({      
        attributes : ['id','nombre','sub_titulo','slug','stock','destacado','descripcion','precio','cuidados'],
      });
       res.status(200).json({
        meta: {
          ok: true,
          status: 200,
          count: products.length ,//count: Devuelve el número total de objetos de una colección de propiedades del elemento web.
        },
        data: {products
        },
      });
   
    } catch (error) {
      return res.status(500).json({ 
          ok: false,
          status: 500,
          msg: 'comuniquese con el Administrador del sitio'
     });
    }  
  } 
  
  const getApiProduct  = async (req, res) =>{
  //  return res.send('geApiProducts')
   
  }
  const postApiProduct  = async (req, res) =>{
  
    // return res. send(req.body)
  }
  const putApiProduct  = async (req, res) =>{
    // return res.send('put')
  }
  const deleteApiProduct  = async (req, res) =>{
    return res.send('delete')
  } 


  module.exports= {
    getApiProducts,
    getApiProduct,
    postApiProduct,
    putApiProduct,
    deleteApiProduct,
    }
  