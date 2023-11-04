const { Router } = require('express');

const Order = require('../models/Order');

const router = Router();

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({ 'user.userId': req.user._id }).populate('user.userId');
    res.json({
      orders: orders.map((o) => ({
        ...o._doc,
        price: o.courses.reduce((total, c) => total += c.count * c.price, 0),
      })),
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/order', async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate();
    const courses = user.cart.items.map((i) => ({
      count: i.count, ...i.courseId._doc,
    }));

    const order = new Order({
      user: {
        name: req.user.fullName,
        userId: req.user,
      },
      courses,
    });

    await order.save();
    await req.user.clearCart();
    res.json();
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
