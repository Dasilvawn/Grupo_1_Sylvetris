const { validationResult } = require("express-validator");
const db = require("../../database/models");

const getCategoriesApi = (req, res) => {
  db.Category.findAll()
    .then(([categories]) => {
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
const getCreateCategory = (req, res) => {
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
const getEditCategoryApi = (req, res) => {
  const id = req.session.userLogin?.id;
  let category = db.Category.findByPk(req.params.id);
  let user = db.User.findByPk(id);

  Promise.all([category, user])
    .then(([category, user]) => {
      return res.status(200).json({
        meta: {
          ok: true,
          status: 200,
          count: categories.length,
        },
        data: {
          category,
        },
      });
    })
    .catch((error) => console.log(error));
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
  getCreateCategory,
  postCreateCategoryApi,
  getEditCategoryApi,
  putEditCategoryApi,
  deleteCategoryApi,
};
