/* eslint-disable no-console */
const { ProductModel } = require('../models');
const { mapBasketItems } = require('./utils');

const getBasketData = async (req, res) => {
  try {
    if (req.user) {
      const user = await req.user.populate('basket.items.productId').execPopulate();
      const products = mapBasketItems(user.basket);
      return res.json(products);
    }

    return res.status(404).json({
      error: 'User not found',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

const addProductToBasket = async (req, res) => {
  try {
    const product = await ProductModel.findOne({ _id: req.body._id });
    return await req.user.addToBasket(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Error while adding item to basket',
    });
  }
};

module.exports = { getBasketData, addProductToBasket };
