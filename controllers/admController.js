
module.exports = {
  
    editProduct : (req, res) => {
      //let product = products.find((product) => product.slug === req.params.slug);
  
      return res.render("adm/editProduct", {
        title: "Sylvestris | Editar producto",
      });
    },
    // // productCart: (req, res) => {
    // //   return res.render("products/productCart", {
    // //     title: "Sylvestris | Carrito",
    // //   });
    // },
  };
  