const { loadProducts, storeProducts, loadUsers } = require("../../data/db");
const { validationResult } = require("express-validator");
//const products = require('../../data/products.json');

module.exports = {
  getProducts: (req, res) => {
    const productos = loadProducts();
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("adm/products", {
      title: "Sylvestris | Lista de Productos",
      productos,
      user
    });
  },

  getCreateProduct: (req, res) => {
    const users = loadUsers();
    const id = req.session.userLogin?.id;
    const user = users.find((user) => user.id === +id);
    return res.render("adm/createProduct", {
      title: "Sylvestris | Crear producto",
      user
    });
  },
  postCreateProducts: (req, res, next) => { 
    let errors = validationResult(req);
    
    if (errors.isEmpty()) {
      let images = req.files.map(file => file.filename);
      const {
        nombre,
        sub_titulo,
        slug,
        categoria,
        stock,
        destacado,
        descripcion,
        descripcion_altura,
        descripcion_maceta,
        precio,
        cuidados,
        agua,
        luz,
      } = req.body;
      const products = loadProducts();
  
      const newProduct = {
        id: products[products.length - 1].id + 1,
        nombre: nombre.trim(),
        sub_titulo: sub_titulo.trim(),
        slug: slug.trim(),
        categoria: categoria.trim(),
        stock: +stock,
        destacado: destacado === "true" ? true : false,
        descripcion: descripcion.trim(),
        descripcion_altura: descripcion_altura.trim(),
        descripcion_maceta: descripcion_maceta.trim(),
        precio: +precio,
        cuidados: cuidados.trim(),
        agua: +agua,
        luz: +luz,
        imagen: images ? images : [
          "https://ik.imagekit.io/lg7lefujn/default-product-image_Ls9VPJ06t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661146388770",
          "https://ik.imagekit.io/lg7lefujn/default-product-image_Ls9VPJ06t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661146388770",
        ],
      };
  
      let productsNew = [...products, newProduct];
      storeProducts(productsNew);
      return res.redirect("/admin/products");
    } 
    else {
         const users = loadUsers();
         const id = req.session.userLogin?.id;
         const user = users.find((user) => user.id === +id);
      return res.render("adm/createProduct", {
        title: "Sylvestris | Crear Producto",
        errors: errors.mapped(),
        old: req.body,
        user,
      });
    }
 },

 getEditProducts: (req, res) => {
  const productos = loadProducts();
  const users = loadUsers();
  const id = req.session.userLogin?.id;
  const user = users.find((user) => user.id === +id);
  const producto = productos.find(
    (producto) => producto.id === +req.params.id
  );

  return res.render("adm/editProduct", {
    producto,
    title: "Sylvestris | Editar producto",
    user
  });
},
    
  putEditProducts: (req, res) => {
    const {
      id,
      nombre,
      sub_titulo,
      slug,
      categoria,
      stock,
      destacado,
      descripcion,
      descripcion_altura,
      descripcion_maceta,
      precio,
      cuidados,
      agua,
      luz,
    } = req.body;
    let images = req.files.map(file => file.filename);
    const productos = loadProducts();
    const productoOriginal = productos.find((producto) => producto.id === +req.params.id);
    //return res.send(images);
    const editProducto = productos.map((producto) => {
      if (producto.id === +req.params.id) {
        return {
          id: producto.id,
          nombre: nombre.trim(),
          sub_titulo: sub_titulo.trim(),
          slug: slug.trim(),
          categoria: categoria.trim(),
          stock: +stock,
          destacado: destacado,
          descripcion: descripcion.trim(),
          descripcion_altura: descripcion_altura.trim(),
          descripcion_maceta: descripcion_maceta.trim(),
          precio: +precio,
          cuidados: cuidados.trim(),
          agua: +agua,
          luz: +luz,
          imagen: images.length === 0 ? productoOriginal.imagen : images,
        };
      } else {
        return producto;
      }
    });
    storeProducts(editProducto);
    return res.redirect("/admin/products");
  },
  deleteProducts: (req, res) => {
    const productos = loadProducts();

    const productFilter = productos.filter(
      (product) => product.id !== +req.params.id
    );

    storeProducts(productFilter);

    return res.redirect("/admin/products");
  },
};
