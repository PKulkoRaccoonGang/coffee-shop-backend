const { Router } = require('express');

const { ProductController } = require('../controllers');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful retrieval of products
 *         content:
 *           application/json:
 *             example:
 *               products:
 *                 - id: 1
 *                   name: Product 1
 *                   price: 19.99
 *                 - id: 2
 *                   name: Product 2
 *                   price: 29.99
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, please log in
 */
router.get('/products', ProductController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get details of a specific product
 *     tags: [Products]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful retrieval of product details
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: Product 1
 *               price: 19.99
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               error: Product not found
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, please log in
 */
router.get('/products/:id', ProductController.getOneProduct);

module.exports = router;
