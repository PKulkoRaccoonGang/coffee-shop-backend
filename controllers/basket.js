/* eslint-disable no-console, no-underscore-dangle */
const ProductModel = require('../models/Product');

function mapBasketItems(basket) {
  return basket.items.map((product) => ({
    ...product.productId._doc, count: product.count,
  }));
}

const getBasketData = async (req, res) => {
  try {
    if (req.user) {
      const user = await req.user.populate('basket.items.productId').execPopulate();
      const products = mapBasketItems(user.basket);

      res.json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addProductToBasket = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.body._id });
    await req.user.addToBasket(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while adding item to basket' });
  }
};

module.exports = { getBasketData, addProductToBasket };
