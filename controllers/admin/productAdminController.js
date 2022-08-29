const { loadProducts, storeProducts } = require("../../data/db");
const { validationResult } = require("express-validator");

module.exports = {
  getProducts: (req, res) => {
    const productos = loadProducts();
    return res.render("adm/products", {
      title: "Sylvestris | Lista de Productos",
      productos,
    });
  },

  getCreateProduct: (req, res) => {
    return res.render("adm/createProduct", {
      title: "Sylvestris | Crear producto",
    });
  },
  postCreateProducts: (req, res) => {
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
      imagen: [
        "https://ik.imagekit.io/lg7lefujn/default-product-image_Ls9VPJ06t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661146388770",
        "https://ik.imagekit.io/lg7lefujn/default-product-image_Ls9VPJ06t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661146388770",
      ],
    };

    storeProducts(newProduct);
    return res.redirect("/admin/products");
  },
  getEditProducts: (req, res) => {
    const productos = loadProducts();
    const producto = productos.find(
      (producto) => producto.id === +req.params.id
    );

    return res.render("adm/editProduct", {
      producto,
      title: "Sylvestris | Editar producto",
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
      imagen,
    } = req.body;

    const productos = loadProducts();
    const producto = productos.find(
      (producto) => producto.id === +req.params.id
    );

    const editImagen = producto.imagen;

    if (imagen) {
      editImagen = [...editImagen, imagen];
    }

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
          imagen: editImagen,
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
