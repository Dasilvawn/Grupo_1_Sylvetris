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
    return res.status(200).json({
      meta: {
        ok: false,
        status: 500,
        msg: error.message,
      },
    });
  }
}

const getCategoryApi = async (req,res) =>{

}

const postCategoryApi = async (req,res) =>{
  
}

const putCategoryApi = async (req,res) =>{
  
}

const deleteCategoryApi = async (req,res) =>{
  
}
  
  module.exports = {
    getCategoriesApi,
    getCategoryApi,
    postCategoryApi,
    putCategoryApi,
    deleteCategoryApi,
  };