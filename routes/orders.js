const { Router } = require('express');

const { OrdersController } = require('../controllers');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get a list of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successful retrieval of orders
 *         content:
 *           application/json:
 *             example:
 *               orders:
 *                 - id: 1
 *                   product: Product 1
 *                   quantity: 2
 *                 - id: 2
 *                   product: Product 2
 *                   quantity: 1
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, please log in
 */
router.get('/orders', OrdersController.getAllOrders);

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Name of the product to be ordered
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to be ordered
 *             example:
 *               product: Product 1
 *               quantity: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Order created successfully
 *       400:
 *         description: Invalid request or product not available
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid request or product not available
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, please log in
 */
router.post('/order', OrdersController.getOneOrder);

module.exports = router;
