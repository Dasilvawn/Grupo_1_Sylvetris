/* const {loadProducts, storeProducts} = require('../data/productsModule');
const { nextTick } = require('process');
const fs = require("fs");
const path = require("path");

const productosFilePath = path.join(__dirname, "..", "data", "products.json");
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

module.exports = {
  dashboard: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    return res.render("adm/dashboard", {
      title: "Sylvestris | Panel de administracion",
      productos,
    });
  },
    
  edit: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    const producto = productos.find(
      (producto) => producto.id === +req.params.id
    );

    // return res.send(producto)
    return res.render("adm/editProduct", {
      producto,
      title: "Sylvestris | Editar producto",
    });
  },
  update: (req, res) => {
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

    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
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
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "products.json"),
      JSON.stringify(editProducto, null, 3),
      "utf-8"
    );
    return res.redirect("/admin/products");
  },

  createProduct: (req, res) => {
    return res.render("adm/createProduct", {
      title: "Sylvestris | Crear producto",
    });
  },
  getProducts: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));
    return res.render("adm/products", {
      title: "Sylvestris | Lista de Productos",
      productos,
    });
  },
  deleteProducts: (req, res) => {
    const productos = JSON.parse(fs.readFileSync(productosFilePath, "utf-8"));

    const productFilter = productos.filter(
      (product) => product.id !== +req.params.id
    );

    fs.writeFileSync(
      path.join(__dirname, "..", "data", "products.json"),
      JSON.stringify(productFilter, null, 3),
      "utf-8"
    );

    return res.redirect("/admin/products");
  },
  store: (req, res) => {
    const {nombre, sub_titulo, slug, categoria, stock, destacado, descripcion, descripcion_altura, descripcion_maceta, precio, cuidados, agua, luz} = req.body
    const products = loadProducts();
    const newProduct = {
      id : (products[products.length - 1].id + 1),
      nombre : nombre.trim(),
      sub_titulo : sub_titulo.trim(),
      slug : slug.trim(),
      categoria : categoria.trim(),
      stock : +stock,
      destacado : destacado === "true" ? true : false,
      descripcion : descripcion.trim(),
      descripcion_altura : descripcion_altura.trim(),
      descripcion_maceta : descripcion_maceta.trim(),
      precio : +precio,
      cuidados : cuidados.trim(),
      agua : +agua,
      luz : +luz,
      imagen : [
        "https://ik.imagekit.io/lg7lefujn/default-product-image_Ls9VPJ06t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661146388770",
        "https://ik.imagekit.io/lg7lefujn/default-product-image_Ls9VPJ06t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1661146388770"
     ],
    }
    const productsModify = [...products, newProduct];
    storeProducts(productsModify);
    return res.redirect('/admin/products')
  },
  getUsers: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    return res.render("adm/users", {
      title: "Sylvestris | Lista de Usuarios",
      users,
    });
  },
};
 */
  