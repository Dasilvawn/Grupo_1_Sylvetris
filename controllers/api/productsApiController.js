const { validationResult } = require("express-validator");
const db = require("../../database/models");

const getApiProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: ["images", "category"],
    });
    res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        count: products.length, //count: Devuelve el número total de objetos de una colección de propiedades del elemento web.
      },
      data: { products },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Comuníquese con el Administrador del sitio",
    });
  }
};

const getApiProduct = async (req, res) => {
  //  return res.send('geApiProducts')
  try {
    const product = await db.Product.findByPk(req.params.id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        //  count: product ,//count: Devuelve el número total de objetos de una colección de propiedades del elemento web.
      },
      data: { product },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "comuniquese con el Administrador del sitio",
    });
  }
};

const postApiProduct = async (req, res) => {
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
  try {
    const createProduct = await db.Product.create({
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
    });
    /*  if (req?.files?.length) {
      let images = req.files.map(({ filename }) => {
        return {
          filename,
          productId: product.id,
        };
      });
      await db.Image.bulkCreate(images, {
        validate: true,
      });
    } */
    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
      },
      product: createProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Comuníquese con el Administrador del sitio",
    });
  }
};

const putApiProduct = async (req, res) => {
  // return res.send('put')

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

    let producto = await db.Product.findByPk(req.params.id);

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

    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
      },
      product: await producto.reload(),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Comuníquese con el Administrador del sitio",
    });
  }
};

const deleteApiProduct = async (req, res) => {
  try {
    const productDelete = await db.Product.findByPk(req.params.id, {
      include: ["images"],
    });
    
    if (productDelete.images.length) {
      productDelete.images.forEach(async (image) => {
        fs.unlink(`./public/images/products/${image.filename}`);

        await db.Image.destroy({
          where: {
            filename: image.filename,
          },
        });
      });
    }

    await productDelete.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      msg: "Producto eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "comuniquese con el Administrador del sitio",
    });
  }
};

module.exports = {
  getApiProducts,
  getApiProduct,
  postApiProduct,
  putApiProduct,
  deleteApiProduct,
};
