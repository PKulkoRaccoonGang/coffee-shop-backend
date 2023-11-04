/* eslint-disable no-console */
const ProductModel = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    console.log('Error: Products list not founded', error);
    res.status(500).json({
      message: 'Products list not founded',
    });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const doc = await ProductModel.findOne({ _id: productId });

    if (!doc) {
      res.status(404).json({
        message: 'Product not founded',
      });
    }

    res.json(doc);
  } catch (error) {
    console.log('Product not founded', error);
    res.status(500).json({
      message: 'Product not founded',
    });
  }
};

module.exports = { getOneProduct, getAllProducts };
