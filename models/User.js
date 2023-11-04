/* eslint-disable no-underscore-dangle */
const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  basket: {
    items: [{
      count: {
        type: Number,
        required: true,
        default: 1,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    }],
  },
  avatarUrl: String,
}, {
  timestamps: true,
});

UserSchema.methods.addToBasket = function (product) {
  const items = [...this.basket.items];
  const productIndex = items
      .findIndex((currentProduct) => currentProduct.productId.toString() === product._id.toString());
  const SINGLE_PRODUCT_COUNT = 0;

  if (productIndex >= SINGLE_PRODUCT_COUNT) {
    items[productIndex].count += 1;
  } else {
    items.push({
      productId: product._id,
      count: 1,
    });
  }

  this.basket = { items };

  return this.save();
};

UserSchema.methods.clearBasket = function () {
  this.basket = { items: [] };
  return this.save();
};

module.exports = model('User', UserSchema);
