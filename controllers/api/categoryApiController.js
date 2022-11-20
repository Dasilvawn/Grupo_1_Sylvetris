const { validationResult } = require("express-validator");
const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const getCategoriesApi = async (req, res) => {
      
 try {
  const categories = await db.Category.findAll({
      
    attributes: ['id','name']
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
};

    // const id = req.session.userLogin?.id;
    // let categories = db.Category.findAll();
    // let user = db.User.findByPk(id); git 

    // Promise.all([categories, user])
    //   .then(([categories, user]) => {
    //     return res.status(200).json({
    //         meta: {
    //           ok: true,
    //           status: 200,
    //           count: categories.length,
    //         },
    //         data: {
    //             categories,
    //         },
    //       });
    //   })
    //   .catch((error) => console.log(error));
       

const getCategoryApi = (req, res) => {
    const id = req.session.userLogin?.id;
    let categories = db.Category.findAll();
    let user = db.User.findByPk(id);

    Promise.all([categories, user])
      .then(([categories, user]) => {
        return res.status(200).json({
            meta: {
              ok: true,
              status: 200,
              count: categories.length,
            },
            data: {
                categories,
            },
          });
      })
      .catch((error) => console.log(error));
  };

const postCreateCategoryApi = (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Category.create({
        name: req.body.name.trim(),
      })
        .then((category) => {
          res.redirect("/admin/categories");
        })
        .catch((error) => console.log(error));
    } else {
      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
          count: categories.length,
        },
        data: {
            errors: errors.mapped(),
            old: req.body,
        },
      });
    }
  };

const putEditCategoryApi = (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Category.update(
        {
          name: req.body.name.trim(),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
        .then((category) => {
          res.redirect("/admin/categories");
        })
        .catch((error) => console.log(error));
    } else {
      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
          count: categories.length,
        },
        data: {
            errors: errors.mapped(),
            old: req.body,
        },
      });
    }
  };

const deleteCategoryApi = (req, res) => {
    db.Category.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/admin/categories");
  };
  
  module.exports = {
    getCategoriesApi,
    getCategoryApi,
    postCreateCategoryApi,
    putEditCategoryApi,
    deleteCategoryApi,
  };