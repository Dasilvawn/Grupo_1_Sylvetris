const { validationResult } = require("express-validator");
const db = require("../../database/models");

module.exports = {
  getCategories: (req, res) => {
    const id = req.session.userLogin?.id;
    let categories = db.Category.findAll();
    let user = db.User.findByPk(id);

    Promise.all([categories, user])
      .then(([categories, user]) => {
        return res.render("adm/categories", {
          title: "Sylvestris | Lista de Categorias",
          user,
          categories,
        });
      })
      .catch((error) => console.log(error));
  },
  getCreateCategory: (req, res) => {
    const id = req.session.userLogin?.id;
    let categories = db.Category.findAll();
    let user = db.User.findByPk(id);

    Promise.all([categories, user])
      .then(([categories, user]) => {
        return res.render("adm/createCategory", {
          title: "Sylvestris | Crear Categoria",
          user,
          categories,
        });
      })
      .catch((error) => console.log(error));
  },
  postCreateCategory: (req, res) => {
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
      return res.render("adm/createUser", {
        title: "Sylvestris | Crear Usuario",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  getEditCategory: (req, res) => {
    const id = req.session.userLogin?.id;
    let category = db.Category.findByPk(req.params.id);
    let user = db.User.findByPk(id);

    Promise.all([category, user])
      .then(([category, user]) => {
        return res.render("adm/editCategory", {
          title: "Sylvestris | Editar Categoria",
          user,
          category,
        });
      })
      .catch((error) => console.log(error));
  },
  putEditCategory: (req, res) => {
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
      return res.render("adm/editCategory", {
        title: "Sylvestris | Editar Categoria",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
  deleteCategory: (req, res) => {
    db.Category.destroy({
      where: { id: req.params.id },
    });
    res.redirect("/admin/categories");
  },
};
