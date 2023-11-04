// eslint-disable no-console
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MONGODB_URI, PORT, USER_ID } = require('./constants');
const User = require('./models/User');
const {
  productsRoutes, authRoutes, basketRoutes, ordersRoutes,
} = require('./routes');

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Mongo DB has been connected');
}).catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
  try {
    req.user = await User.findById(USER_ID);
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(productsRoutes);
app.use(authRoutes);
app.use(basketRoutes);
app.use(ordersRoutes);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.error(err);
  }

  return console.log(`Server listening on port ${PORT}!`);
});
