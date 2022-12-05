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
      include: ["images", "category"],
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
  console.log(req.body);

  const {
    nombre,
    sub_titulo,
    categoria,
    stock,
    destacado,
    descripcion,
    descripcion_altura,
    descripcion_maceta,
    precio,
    cuidados,
    image1,
    image2,
  } = req.body;
  try {
    const createProduct = await db.Product.create({
      nombre: nombre.trim(),
      sub_titulo: sub_titulo.trim(),
      categoryId: categoria,
      stock: +stock,
      destacado: destacado === "true" ? true : false,
      descripcion: descripcion.trim(),
      descripcion_altura: descripcion_altura.trim(),
      descripcion_maceta: descripcion_maceta.trim(),
      precio: +precio,
      cuidados: cuidados.trim(),
    });

    const images = [image1, image2];

    let imagesMap = images.map((filename) => {
      return {
        filename,
        productId: createProduct.id,
      };
    });

    await db.Image.bulkCreate(imagesMap, {
      validate: true,
    });

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
      categoria,
      stock,
      destacado,
      descripcion,
      descripcion_altura,
      descripcion_maceta,
      precio,
      cuidados,
      image1,
      image2,
    } = req.body;

    let producto = await db.Product.findByPk(req.params.id, {
      include: ["images"],
    });

    producto.nombre = nombre.trim();
    producto.sub_titulo = sub_titulo.trim();
    producto.categoryId = categoria;
    producto.stock = +stock;
    producto.destacado = destacado;
    producto.descripcion = descripcion.trim();
    producto.descripcion_altura = descripcion_altura.trim();
    producto.descripcion_maceta = descripcion_maceta.trim();
    producto.precio = +precio;
    producto.cuidados = cuidados.trim();
  
    await producto.save();

    
    const images = [image1, image2];

    let imagesMap = images.map((filename) => {
      return {
        filename,
        productId: producto.id,
      };
    });

    producto.images.forEach(async (image) => {
      await db.Image.destroy({
        where: {
          filename: image.filename,
        },
      });
    })

    await db.Image.bulkCreate(imagesMap);

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

// images
const getApiProductsImages = async (req, res) => {};
const getApiProductImage = async (req, res) => {};
const postApiProductImage = async (req, res) => {};
const putApiProductImage = async (req, res) => {};
const deleteApiProductImage = async (req, res) => {};

module.exports = {
  getApiProducts,
  getApiProduct,
  postApiProduct,
  putApiProduct,
  deleteApiProduct,
  getApiProductsImages,
  getApiProductImage,
  postApiProductImage,
  putApiProductImage,
  deleteApiProductImage,
};
