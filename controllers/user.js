/* eslint-disable no-console, no-console */
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const regEmail = require('../emails/registration');

const { UserModel } = require('../models');
const { SALT_ROUNDS, transporter, EXPIRES_IN_DATE } = require('./constants');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const {
      password, email, fullName, avatarUrl,
    } = req.body;

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email,
      fullName,
      password,
      avatarUrl,
      passwordHash: hash,
    });

    await transporter.sendMail(regEmail(email));

    const user = await doc.save();

    const token = jwt.sign({
      _id: user._id,
    }, 'secret', {
      expiresIn: EXPIRES_IN_DATE,
    });

    const { passwordHash, ...userData } = user._doc;
    return res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log('Error: Failed to registration', error);
    return res.status(500).json({
      message: 'Failed to registration',
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'User not founded',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Wrong login or password',
      });
    }

    const token = jwt.sign({
      _id: user._id,
    }, 'secret', {
      expiresIn: '30d',
    });

    const { passwordHash, ...userData } = user._doc;

    return res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log('Error: Failed to authorization', error);
    return res.status(500).json({
      message: 'Failed to authorization',
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not founded',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    return res.json(userData);
  } catch (error) {
    console.log('Error retrieving user data', error);
    return res.status(500).json({
      message: 'No access',
    });
  }
};

module.exports = { register, login, getUserData };
