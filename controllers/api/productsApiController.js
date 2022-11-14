const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const newUserValidator = require("../../validations/newUserValidator");

  const getApiProducts  = async (req, res) =>{
    

    try {
      const{page = 1, limit= 5, offset= 0} = req.query()

      limit = +limit > 10 ? 10 : +10;

      page = +page <= 0 || isNaN(page) ? 1 : +page;
      page-=1;

      offset = page * limit;
      return res.send
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

    const existPrev = page > 0 && offset <= count
    const existNext = Math.floor ( count/limit )  >= ( page +1 ) && limit !== count

    let urlPrev=null;
    let urlNext=null;

    if(existNext){
        urlNext= `${req.protocol}://${req.get('host')}${req.baseUrl}?page=${page + 2}`
    }
    
    if (existPrev) {
        urlPrev = `${req.protocol}://${req.get("host")}${
          req.baseUrl
        }?page=${page}${urlQuery}`;
      }

      return res.status(200).json({
        meta:{
          ok:true,
          status:200,
        },
        data:{
          totalProducts : count,
          prev: urlPrev,
          next: urlNext,
        data:this.products,
        }         
      })
    }catch (error) {
      sendJsonError(error,res)
    };
  }
  const getApiProduct  = async (req, res) =>{

  }
  const postApiProduct  = async (req, res) =>{

  }
  const putApiProduct  = async (req, res) =>{

  }
  const deleteApiProduct  = async (req, res) =>{

  } 


  module.exports= {
    getApiProducts,
    getApiProduct,
    postApiProduct,
    putApiProduct,
    deleteApiProduct,
    }
  