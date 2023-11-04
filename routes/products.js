const { Router } = require('express');

const { ProductController } = require('../controllers');

const router = Router();

router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getOneProduct);

module.exports = router;
