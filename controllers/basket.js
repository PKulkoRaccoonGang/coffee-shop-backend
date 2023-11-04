const ProductModel = require('../models/Product');

function mapBasketItems(cart) {
  return cart.items.map((c) => ({
    ...c.courseId._doc, count: c.count,
  }));
}

const getBasketData = async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate();
    const courses = mapBasketItems(user.cart);
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addProductToBasket = async (req) => {
  const course = await ProductModel.findOne({ _id: req.body._id });
  await req.user.addToCart(course);
};

module.exports = { getBasketData, addProductToBasket };
