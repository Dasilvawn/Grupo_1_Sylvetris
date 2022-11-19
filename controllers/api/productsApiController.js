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
  try { 
    const product = await db.Product.findByPk(req.params.id, {      
      attributes : {
        exclude:[
            'createdAt',
            'updatedAt',
            'deletedAt'
        ],
      },
    });
     res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        //  count: product ,//count: Devuelve el número total de objetos de una colección de propiedades del elemento web.
      },
      data:{ product 
      }    
    });
 
  } catch (error) {
    return res.status(500).json({ 
        ok: false,
        status: 500,
        msg: 'comuniquese con el Administrador del sitio'
   });
  }  
   
  }

  const postApiProduct  = async (req, res) =>{
   // return res. send(req.body)
   try {
     const {
      id,
      nombre,
      sub_titulo,
      slug,
      stock,
      destacado,
      descripcion,
      precio,
      cuidados
    } = req.body;

      
     let newProduct = await db.Product.create({
      id: id,
      nombre: nombre.trim(),
      sub_titulo: sub_titulo.trim(),
      slug: slug,
      stock: stock?stock:null,
      destacado: destacado?destacado:null,
      descripcion:descripcion.trim(),
      precio: precio?precio:null,
      cuidados: cuidados.trim(),
     });

     res.render(200).json({
      meta:{
        ok: true,
        status: 200,
        url: '/api/products'
      },
      date:{
      product: {id: newProduct.id}
     }  
   });

   } catch (error) {
    return res.status(500).json({
      ok:false,
      status: 500,
      msg: 'Comuniquese con el Administrador'
    });
   }

  }
  const putApiProduct  = async (req, res) =>{
    // return res.send('put')  
    try {
      const product = await db.Product.findByPk(id, {
        include: [
          {
            association: "images",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
          {
            association: "category",
            attributes: {
              exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
          },
        ],
      });

      product.name = name?.trim() || product.name;
      product.price = +price || product.price;
      product.discount = +discount || product.discount;
      product.description = description?.trim() || product.description;
      product.categoryId = +categoryId || product.categoryId;

      await product.save();

      if (+deletePreviousImages === 1) {
        product.images.forEach(async (img) => {
          await img.destroy();
          unlinkSync(
            path.join(__dirname, `../../public/images/products/${img.file}`)
          );
        });
      }

      if (req.files?.length) {
        const images = req.files.map((file) => {
          return {
            file: file.filename,
            productId: product.id,
        }}
        );

        await db.Image.bulkCreate(images);
      }

      res.status(200).json({
        ok: true,
        status: 200,
        /* data: await product.reload() */
        url: `${req.protocol}://${req.get("host")}/products/${product.id}`,
      });
    } catch (error) {
      sendJsonError(error, res);
    }
  }













    // try { 
    //   const product = await db.Product.findByPk(req.params.id, {      
    //     attributes : {
    //       exclude:[
    //           'createdAt',
    //           'updatedAt',
    //           'deletedAt'
    //       ],
    //     },
    //   });
    //    res.status(200).json({
    //     meta: {
    //       ok: true,
    //       status: 200,
    //       //  count: product ,//count: Devuelve el número total de objetos de una colección de propiedades del elemento web.
    //     },
    //     data:{ product 
    //     }    
    //   });
   
    // } catch (error) {
    //   return res.status(500).json({ 
    //       ok: false,
    //       status: 500,
    //       msg: 'comuniquese con el Administrador del sitio'
    //  });
    // }  
  

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
