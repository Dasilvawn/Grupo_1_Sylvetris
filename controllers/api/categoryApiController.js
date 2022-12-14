const { validationResult } = require("express-validator");
const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const getCategoriesApi = async (req,res) =>{
 
  try {
   
    const categories = await db.Category.findAll({
      
          attributes: ['id', 'name']
    });

    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        count: categories.length
      },
      data: {
        categories
      },
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
}

const getCategoryApi = async (req,res) =>{
  try {
   
    const category = await db.Category.findByPk(req.params.id,{
        attributes:{ 
          exclude: ['createdAt', 'updatedAt']
        }
           
          
    });
    
    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
      },
      data: {
        category
      },
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
}

const postCategoryApi = async (req,res) =>{
  return res.send('hoola')
  try {

    const {
      id,
      name
    } = req.body;

    // let [image] = req.files.map((file) => file.filename);

    let newCategory = await db.Category.create({
      id: id,
      name: name.trim(),
       
    })


    return res.status(201).json({
      ok: true,
      status: 201,
      data: {
      category: {id : newCategory.id },
      
      }
    });
    
  } catch (error) {
    
    return res.status(500).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
}

const putCategoryApi = async (req,res) =>{
  //  return res.send('put')  
 
   try {
    const category = await db.Category.findByPk(req.query.id, { //params, body o query?
      include:[
        { 
        attributes: { 
        exclude: ["createdAt", "updatedAt"]
       }} 
    ]  // desp de esto no va product.nombre=nombre...???
  });
  category.nombre = nombre ?.trim() || category.nombre;
 

  await category.save(); //guardamos el elemento secundario 

  res.status(200).json({
          ok: true,
          status: 200,
          data: await category.reload()  //provocará que el navegador muestre de nuevo la página actual, haciendo una recarga de la misma en la que te encuentres en este momento.
  })

  } catch (error) {
  return res.status(500).json({ 
  ok: false,
  status: 500,
  msg: 'comuniquese con el Administrador del sitio'
  })
  }
}

const deleteCategoryApi = async (req,res) =>{
  // return res.send('delete') 
  try {
           
    await db.Category.destroy({ where: { id } }); 
                     
    const options = {
      include: [
        {
          association: "categoryId",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    }
    const category = await db.Category.findByPk(id,options );

 res.status(200).json({
  ok:true,
  status:200,
  msg:'Categoria eliminada'
})

    } catch (error) {
      return res.status(500).json({ 
        ok: false,
        status: 500,
        msg: 'comuniquese con el Administrador del sitio'
        })
                  }

}
  
  module.exports = {
    getCategoriesApi,
    getCategoryApi,
    postCategoryApi,
    putCategoryApi,
    deleteCategoryApi,
  };