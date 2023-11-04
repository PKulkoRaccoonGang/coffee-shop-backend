const { Router } = require('express');

const { ProductController } = require('../controllers');

const router = Router();

router.get('/products', ProductController.getAll);
router.get('/products/:id', ProductController.getOne);

module.exports = router;
