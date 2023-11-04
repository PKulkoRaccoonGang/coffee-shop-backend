const { Router } = require('express');

const { BasketController } = require('../controllers');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Basket
 *   description: Operations related to the user's shopping basket
 */

/**
 * @swagger
 * /basket:
 *   get:
 *     summary: Get the user's shopping basket data
 *     tags: [Basket]
 *     responses:
 *       200:
 *         description: Successful retrieval of basket data
 *         content:
 *           application/json:
 *             example:
 *               items:
 *                 - product_id: 1
 *                   name: Product 1
 *                   price: 19.99
 *                   quantity: 2
 *                 - product_id: 2
 *                   name: Product 2
 *                   price: 29.99
 *                   quantity: 1
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, please log in
 */
router.get('/basket', BasketController.getBasketData);

/**
 * @swagger
 * /basket/add:
 *   post:
 *     summary: Add a product to the user's shopping basket
 *     tags: [Basket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID of the product to be added
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to be added
 *             example:
 *               product_id: 3
 *               quantity: 1
 *     responses:
 *       200:
 *         description: Product added to the basket successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product added to the basket successfully
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
router.post('/add', BasketController.addProductToBasket);

module.exports = router;
