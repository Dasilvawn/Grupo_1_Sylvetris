const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const newUserValidator = require("../../validations/newUserValidator");

  const getApiProducts  = async (req, res) =>{
   

    try {
   
      const product = await db.Product.findAll({
        
            attributes: ['id', 'name', 'lastname', 'email']
      });
  
      const productsResp = product.map(product => {
        return {
          ...product.dataValues,
          urlData: `${req.protocol}://${req.get("host")}${req.baseUrl}/${product.id}`,
        }
      })
  
      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
          count: users.length
        },
        data: {
          
        products: userResp
        },
      });
    } catch (error) {
      return res.status(200).json({
        meta: {
          ok: false,
          status: 500,
          msg: error.message,
        },
      });
    }
    // try{
    //     const products = await db.products.findAll({

    //       attributes: ['id', 'name', 'lastname', 'email']
    //     });

    //     return res.send('holalala')
          
    //   }catch (err){
    //     console.log(err)
    //   }
       
    
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
  