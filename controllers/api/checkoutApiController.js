const db = require("../../database/models");

const getOrders = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      include: ["carts"],
    });
    res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        count: orders.length, 
      },
      data: { orders },
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
const getOrder = async (req, res) => {
  const {id} = req.params
  try {
    const order = await db.Order.findByPk(id);
    res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        
      },
      data: { order },
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Comuníquese con el Administrador del sitio",
    });
  }
};
const postOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;
    const order = await db.Order.create({
      userId,
      status: 'pending'
    });

    const newOrder = products.map(product => {
      return {
        ...product,
        orderId: order.id,
        
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
const putOrder = async (req, res) => {
  const {id} = req.params
  const {status } = req.body
  try {
    const order = await db.Order.update(id, {
      status
    });
    res.status(200).json({
      meta: {
        ok: true,
        status: 200,
        msg: 'Orden editada con éxito'
      },
      
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Comuníquese con el Administrador del sitio",
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.id, {
      include: ["carts"],
    });

    if (order.carts.length) {
      order.carts.forEach(async (cart) => {
        await db.Cart.destroy({
          where: {
            id: cart.id,
          },
        });
      });
    }

    await order.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      msg: "Orden eliminada",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      status: 500,
      msg: "Comuníquese con el Administrador del sitio",
    });
  }
};


module.exports = {
  postOrder,
  getOrders,
  getOrder,
  putOrder,
  deleteOrder

};
