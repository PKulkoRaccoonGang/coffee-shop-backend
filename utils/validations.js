const { body } = require('express-validator');

const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Minimum password length 5 characters').isLength({ min: 5 }),
];

const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Minimum password length 5 characters').isLength({ min: 5 }),
  body('fullName', 'Minimum name length 3 characters').isLength({ min: 3 }),
  body('avatarUrl', 'Avatar must be a link').optional().isURL(),
];

module.exports = { loginValidation, registerValidation };
