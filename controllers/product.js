const ProductModel = require('../models/Product');

const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.json(products);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error: Products list not founded', err);
    res.status(500).json({
      message: 'Products list not founded',
    });
  }
};

const getOne = async (req, res) => {
  try {
    const productId = req.params.id;
    const doc = await ProductModel.findOne({ _id: productId });

    if (!doc) {
      return res.status(404).json({
        message: 'Product not founded',
      });
    }

    res.json(doc);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Product not founded', err);
    res.status(500).json({
      message: 'Product not founded',
    });
  }
};

module.exports = { getOne, getAll };
