const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const newUserValidator = require("../../validations/newUserValidator");


module.exports = {
  products: async (req, res) => {
    const products = loadProducts();
    try {
      const{page = 1, limit= 5, offset= 0} = req.query()

      limit = +limit > 10 ? 10 : +10;

      page = +page <= 0 || isNaN(page) ? 1 : +page;
      page-=1;

      offset = page * limit;

      // console.log (offset);     
      
      const {count, rows:Products} = await db.product.findAndCountAll({
        limit,
          offset,
        include:[{
          association: 'images',
        attributes: {
            include: [[ literal(`CONCAT('${req.protocol}://${req.get("host")}/product/image/', images.nombre)`),
            'nombre' ]],
        }
      },{
         association: "category",
         attributes: {
          exclude: ['updatedAt', 'cratedAt'],
         }
      }],
      attributes: {
        exclude: ['updatedAt', 'cratedAt', 'deleteAt'],
      }
    });

    const ExistPrev = git 

      return res.status(200).json({
        meta:{
          ok:true,
          status:200,
        },
        data:{
          totalProducts : count,
          prev:`${req.protocol}://${req.get('host')}${req.baseUrl}?page=${1}`,
          next:`${req.protocol}://${req.get('host')}${req.baseUrl}?page=${2}`,
        data:this.products,
        }         
      })
    }catch (error) {
      sendJsonError(error,res)
    };
  }}
   