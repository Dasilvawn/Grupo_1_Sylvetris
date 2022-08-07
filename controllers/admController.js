module.exports = {
  
    editProduct : (req, res) => {
      //let product = products.find((product) => product.slug === req.params.slug);
  
      return res.render("adm/editProduct", {
        title: "Sylvestris | Editar producto",
      });
    },
    createProduct: (req, res) => {
      return res.render("adm/createProduct", {
        title: "Sylvestris | Crear producto",
      });
    },
  };
  