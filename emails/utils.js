const fs = require('fs');
const path = require('path');

const readHtmlTemplate = (templateFileName) => {
  const filePath = path.join(__dirname, `templates/${templateFileName}`);
  return fs.readFileSync(filePath, 'utf-8');
};

module.exports = { readHtmlTemplate };
