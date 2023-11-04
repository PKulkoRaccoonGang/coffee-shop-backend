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
  cart: {
    items: [{
      count: {
        type: Number,
        required: true,
        default: 1,
      },
      courseId: {
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

UserSchema.methods.addToCart = function (course) {
  const items = [...this.cart.items];
  const idx = items.findIndex((c) => c.courseId.toString() === course._id.toString());

  if (idx >= 0) {
    items[idx].count += 1;
  } else {
    items.push({
      courseId: course._id,
      count: 1,
    });
  }

  this.cart = { items };

  return this.save();
};

UserSchema.methods.removeFromCart = function (id) {
  let items = [...this.cart.items];
  const idx = items.findIndex((c) => c.courseId.toString() === id.toString());

  if (items[idx].count === 1) {
    items = items.filter((c) => c.courseId.toString() !== id.toString());
  } else {
    items[idx].count--;
  }

  this.cart = { items };
  return this.save();
};

UserSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = model('User', UserSchema);
