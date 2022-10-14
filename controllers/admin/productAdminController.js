const { validationResult } = require("express-validator");
const db = require("../../database/models");

const fs = require("fs").promises;
//const products = require('../../data/products.json');

module.exports = {
  getProducts: (req, res) => {
    
    db.Product.findAll({
      include: ["images", "category"]
    })
    .then((productos) => {
      return res.render("./adm/products", {
        title: "Sylvestris | Lista de Productos",
        productos,
      });
    });
  },

  getCreateProduct: (req, res) => {
   
    db.Category.findAll().then((categories) => {
      return res.render("./adm/createProduct", {
        title: "Sylvestris | Crear producto",
        categories,
      });
    });
  },
  postCreateProducts: (req, res) => {
    
    let errors = validationResult(req);
    if (errors.isEmpty()) {
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
      db.Product.create({
        nombre: nombre.trim(),
        sub_titulo: sub_titulo.trim(),
        slug: slug.trim(),
        categoryId: categoria,
        stock: +stock,
        destacado: destacado === "true" ? true : false,
        descripcion: descripcion.trim(),
        descripcion_altura: descripcion_altura.trim(),
        descripcion_maceta: descripcion_maceta.trim(),
        precio: +precio,
        cuidados: cuidados.trim(),
        agua: +agua,
        luz: +luz,
      })
        .then((product) => {
          if (req.files.length) {
            let images = req.files.map(({ filename }) => {
              return {
                filename,
                productId: product.id,
              };
            });
            db.Image.bulkCreate(images, {
              validate: true,
            }).then((result) => console.log(result));
          }
          return res.redirect("/admin/products");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("adm/createProduct", {
        title: "Sylvestris | Crear Producto",
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  getEditProducts: (req, res) => {
   

    const producto = db.Product.findByPk(req.params.id, {
      include: ["images"],
    });
    const categories = db.Category.findAll();

    Promise.all([producto, categories])

      .then(([producto, categories]) => {
        return res.render("adm/editProduct", {
          title: "Sylvestris | Editar producto",
          producto,
          categories,
        });
      })
      .catch((error) => console.log(error));
  },

  putEditProducts: async (req, res) => {
   

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
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

        let producto = await db.Product.findByPk(req.params.id, {
          include: ["images"],
        });

        producto.nombre = nombre.trim();
        producto.sub_titulo = sub_titulo.trim();
        producto.slug = slug.trim();
        producto.categoryId = categoria;
        producto.stock = +stock;
        producto.destacado = destacado;
        producto.descripcion = descripcion.trim();
        producto.descripcion_altura = descripcion_altura.trim();
        producto.descripcion_maceta = descripcion_maceta.trim();
        producto.precio = +precio;
        producto.cuidados = cuidados.trim();
        producto.agua = +agua;
        producto.luz = +luz;

        await producto.save();

        // si se cargan nuevas imagenes
        if (req.files.length) {
          let imagesNew = req.files.map(({ filename }) => {
            return {
              filename,
              productId: producto.id,
            };
          });

          // Se borran las images anteriores
          producto.images.forEach(async (image) => {
            fs.unlink(`./public/images/products/${image.filename}`);

            await db.Image.destroy({
              where: {
                filename: image.filename,
              },
            });
          });

          // guardo en db las nuevas imagenes
          await db.Image.bulkCreate(imagesNew);
        }
        return res.redirect("/admin/products");
      } catch (error) {
        console.log(error);
      }
    } else {
      const producto = db.Product.findByPk(req.params.id, {
        include: ["images"],
      });
      const categories = db.Category.findAll();

      Promise.all([producto, categories])

        .then(([producto, categories]) => {
          return res.render("adm/editProduct", {
            title: "Sylvestris | Editar producto",
            producto,
            categories,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
  },
  deleteProducts: async (req, res) => {
    try {
      const productDelete = await db.Product.findByPk(req.params.id, {
        include: ["images"],
      });

      productDelete.images.forEach(async (image) => {
        fs.unlink(`./public/images/products/${image.filename}`);

        await db.Image.destroy({
          where: {
            filename: image.filename,
          },
        });
      });

      await productDelete.destroy();

      return res.redirect("/admin/products");
    } catch (error) {
      console.log(error);
    }
  },
};
