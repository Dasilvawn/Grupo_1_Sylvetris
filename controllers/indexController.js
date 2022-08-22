const {categorias, instagram, productos} = require('../data/data')

module.exports = {
  index: (req, res) => {
    return res.render("index", {
      title: "Sylvestris | Home", 
      categorias,
      instagram,
      productos
    });
  },
};