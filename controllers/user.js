const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      password: req.body.password,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

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
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error: Failed to registration', err);
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
  } catch (err) {
    console.log('Error: Failed to authorization', err);
    return res.status(500).json({
      message: 'Failed to authorization',
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not founded',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    return res.json(userData);
  } catch (err) {
    return res.status(500).json({
      message: 'No access',
    });
  }
};

module.exports = {
  register, login, getMe,
};
