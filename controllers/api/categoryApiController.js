const db = require("../../database/models");

const getCategoriesApi = (req, res) => {
    const id = req.session.userLogin?.id;
    let categories = db.Category.findAll();
    let user = db.User.findByPk(id);
  
    Promise.all([categories, user])
      .then(([categories, user]) => {
        return res.json({
          categories
        });
      })
      .catch((error) => {
        return res.status(500).json({
            meta: {
              ok: false,
              status: 500,
              msg: error.message,
            },
          });
      });
};
const getCategoryApi = (req, res) => {
  const id = req.session.userLogin?.id;
  let categories = db.Category.findAll();
  let user = db.User.findByPk(id);

  Promise.all([categories, user])
    .then(([categories, user]) => {
      return res.json({
        categories,
      });
    })
    .catch((error) => console.log(error));
};
const postCategoryApi = (req, res) => {
  return res.status(200).json({
    status: 200,
    msg: "post",
  });
};
const putCategoryApi = (req, res) => {
  return res.status(200).json({
    status: 200,
    msg: "put",
  });
};
const deleteCategoryApi = (req, res) => {
  return res.status(200).json({
    status: 200,
    msg: "delete",
  });
};

module.exports = {
  getCategoriesApi,
  getCategoryApi,
  postCategoryApi,
  putCategoryApi,
  deleteCategoryApi,
};
