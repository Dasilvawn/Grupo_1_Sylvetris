const db = require("../../database/models");

const postCart = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = await db.Order.create({
      userId,
    });

    const newOrder = products.map(product => {
      return {
        ...product,
        orderId: order.id,
        status: 'pending'
      }
    })

    await db.Cart.bulkCreate(newOrder);

    return res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        msg: 'Orden creada!'
      },
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

module.exports = {
  postCart,
};
