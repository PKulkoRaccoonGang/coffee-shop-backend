/* eslint-disable no-console, no-underscore-dangle */
const { Router } = require('express');

const Order = require('../models/Order');

const router = Router();

const calculateTotalProductPrice = (order) => {
    order.products.reduce((total, product) => total + product.count * product.price, 0);
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            'user.userId': req.user._id,
        }).populate('user.userId');

        res.json({
            orders: orders.map((order) => ({
                ...order._doc,
                price: () => calculateTotalProductPrice(order),
            })),
        });
    } catch (error) {
        console.log(error);
    }
}

const getOneOrder = async (req, res) => {
    try {
        const user = await req.user.populate('basket.items.productId').execPopulate();
        const products = user.basket.items.map((item) => ({
            count: item.count, ...item.productId._doc,
        }));

        const order = new Order({
            user: {
                name: req.user.fullName,
                userId: req.user,
            },
            products,
        });

        await order.save();
        await req.user.clearBasket();
        res.json();
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllOrders, getOneOrder };
