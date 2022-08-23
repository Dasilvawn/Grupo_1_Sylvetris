const fs = require("fs");
const path = require("path");

const productosFilePath = path.join(__dirname, "..", "data", "products.json");

module.exports = {
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
    return res.redirect("/");
  },

  createProduct: (req, res) => {
    return res.render("adm/createProduct", {
      title: "Sylvestris | Crear producto",
    });
  },

  delete: (req, res) => {
    const { id } = req.params;
    const productos = arrayProducts();
    const productosDelete = productos.filter((producto) => producto.id !== +id);

    guardarProductos(productosDelete);
    return res.redirect("/editProduct");
  },
};
