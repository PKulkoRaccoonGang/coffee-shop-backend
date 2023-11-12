const keys = require('../keys');
const { readHtmlTemplate } = require('./utils');

// eslint-disable-next-line func-names
module.exports = function (recipientsEmail) {
  const htmlTemplate = readHtmlTemplate('registration.html');

  return {
    to: recipientsEmail,
    from: keys.EMAIL_FROM,
    subject: 'Account has been created!',
    html: htmlTemplate,
  };
};
