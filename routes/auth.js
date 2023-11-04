const { Router } = require('express');

const { UserController } = require('../controllers');
const { loginValidation, registerValidation } = require('../utils/validations');
const checkAuth = require('../utils/checkAuth');

const router = Router();

router.post('/auth/sign-in', loginValidation, UserController.login);
router.post('/auth/sign-up', registerValidation, UserController.register);
router.get('/auth/me', checkAuth, UserController.getUserData);

module.exports = router;
