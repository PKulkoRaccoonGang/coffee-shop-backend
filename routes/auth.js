const { Router } = require('express');

const { loginValidation, registerValidation } = require('../utils/validations');
const checkAuth = require('../utils/checkAuth');
const { UserController } = require('../controllers');

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and authorization
 */

/**
 * @swagger
 * /auth/sign-in:
 *   post:
 *     summary: Sign in with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: test@example.com
 *               password: testpassword
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             example:
 *               message: User logged in successfully
 *               token: "your_auth_token_here"
 *       400:
 *         description: Invalid request body or credentials
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid email or password
 */

router.post('/auth/sign-in', loginValidation, UserController.login);
/**
 * @swagger
 * /auth/sign-up:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: test@example.com
 *               password: testpassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               message: User registered successfully
 *       400:
 *         description: Invalid request body or user already exists
 *         content:
 *           application/json:
 *             example:
 *               error: User with this email already exists
 */

router.post('/auth/sign-up', registerValidation, UserController.register);
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get user data for the authenticated user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful retrieval of user data
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: test@example.com
 *       401:
 *         description: Unauthorized, user not authenticated
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized, please log in
 */
router.get('/auth/me', checkAuth, UserController.getUserData);

module.exports = router;
