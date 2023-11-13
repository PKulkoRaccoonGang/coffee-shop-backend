const fs = require('fs');
const path = require('path');

/**
 * Reads the content of an HTML template from a file.
 *
 * @param {string} templateFileName - The name of the HTML template file.
 * @returns {string} - The content of the HTML template as a string.
 * @throws {Error} - If the file is not found or an error occurs during reading.
 */
const readHtmlTemplate = (templateFileName) => {
  const filePath = path.join(__dirname, `templates/${templateFileName}`);
  return fs.readFileSync(filePath, 'utf-8');
};

module.exports = { readHtmlTemplate };
