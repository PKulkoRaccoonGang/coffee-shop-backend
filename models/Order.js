const { model, Schema } = require('mongoose');

const OrderSchema = new Schema({
  courses: [
    {
      count: Number,
      type: Object,
      required: true,
    },
  ],
  user: {
    name: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Order', OrderSchema);
