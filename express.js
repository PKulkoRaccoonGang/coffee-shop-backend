/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chalk = require('chalk');
const helmet = require('helmet');
const compression = require('compression');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

const { MONGODB_URI, USER_ID } = require('./keys');
const { UserModel } = require('./models');
const {
  productsRoutes, authRoutes, basketRoutes, ordersRoutes,
} = require('./routes');

const PORT = process.env.PORT || 4444;

mongoose.connect(MONGODB_URI).then(() => {
  console.log(chalk.green.bold('Mongo DB has been connected'));
}).catch((error) => console.log(error));

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(async (req, res, next) => {
  try {
    req.user = await UserModel.findById(USER_ID);
    next();
  } catch (error) {
    console.error(error);
  }
});

app.use(productsRoutes);
app.use(authRoutes);
app.use(basketRoutes);
app.use(ordersRoutes);

app.listen(PORT, (error) => {
  if (error) {
    return console.error(error);
  }

  return console.log(chalk.green.bold(`Server listening on port: ${PORT}`));
});
