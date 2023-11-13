/* eslint-disable no-console */
const { OrderModel } = require('../models');
const { calculateTotalProductPrice } = require('./utils');

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      'user.userId': req.user._id,
    }).populate('user.userId');

    return res.json({
      orders: orders.map((order) => ({
        ...order._doc,
        price: () => calculateTotalProductPrice(order),
      })),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error receiving all orders',
    });
  }
};

const getOneOrder = async (req, res) => {
  try {
    const user = await req.user.populate('basket.items.productId').execPopulate();
    const products = user.basket.items.map((item) => ({
      count: item.count, ...item.productId._doc,
    }));

    const order = new OrderModel({
      user: {
        name: req.user.fullName,
        userId: req.user,
      },
      products,
    });

    await order.save();
    await req.user.clearBasket();
    return res.json();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error receiving one order',
    });
  }
};

module.exports = { getAllOrders, getOneOrder };
