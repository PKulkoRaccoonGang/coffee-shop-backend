const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const keys = require('../keys');

const transporter = nodemailer.createTransport(sendgrid({
  auth: { api_key: keys.SEND_GRID_API_KEY },
}));

const SALT_ROUNDS = 10;

const EXPIRES_IN_DATE = '30d';

module.exports = { transporter, SALT_ROUNDS, EXPIRES_IN_DATE };
