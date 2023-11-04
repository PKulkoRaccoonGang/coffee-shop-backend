const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = model('Product', ProductSchema);
