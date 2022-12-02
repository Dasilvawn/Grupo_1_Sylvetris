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
  const errors = validationResult(req);
  let errorsMapped = errors?.mapped() || {};

  if (req.fileValidationError) {
    errorsMapped = {
      ...errorsMapped,
      imagen: { msg: req.fileValidationError },
    };

    Promise.all(
      req.files.map(({ filename }) =>
        fs.unlink(
          path.join(__dirname, `../../public/images/products/${filename}`)
        )
      )
    );
  }

  //return res.send(errorsMapped)

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
    if (req?.files?.length) {
      let images = req.files.map(({ filename }) => {
        return {
          filename,
          productId: product.id,
        };
      });
      await db.Image.bulkCreate(images, {
        validate: true,
      });
    }
    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
      },
      product: createProduct,
    });
  } catch (error) {
    console.log(error)
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
    const product = await db.Product.findByPk(req.params.id, {
      //params o query?
      include: [
        {
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ], // desp de esto no va product.nombre=nombre...???
    });
    product.nombre = nombre?.trim() || product.nombre;
    product.precio = +precio || product.precio;
    product.descripcion = descripcion?.trim() || product.descripcion;
    product.categoryId = +categoryId || product.categoryId;

    await product.save(); //guardamos el elemento secundario

    res.status(200).json({
      ok: true,
      status: 200,
      data: await product.reload(), //provocará que el navegador muestre de nuevo la página actual, haciendo una recarga de la misma en la que te encuentres en este momento.
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "comuniquese con el Administrador del sitio",
    });
  }
};

const deleteApiProduct = async (req, res) => {
  try {
    await db.Product.destroy({ where: { id } });

    const options = {
      include: [
        {
          association: "categoryId",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
    };
    const product = await db.Product.findByPk(id, options);

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
