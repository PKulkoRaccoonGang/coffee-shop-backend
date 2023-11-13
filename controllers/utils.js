/**
 * Maps basket items to a new array with specific properties.
 *
 * @param {Object} basket - The basket object containing items.
 * @param {Array} basket.items - An array of items in the basket.
 * @returns {Array} An array of mapped items with additional properties.
 */
function mapBasketItems(basket) {
  return basket.items.map((product) => ({
    ...product.productId._doc, count: product.count,
  }));
}

/**
 * Calculates the total price of products in an order.
 *
 * @param {Object} order - The order object containing products.
 * @param {Array} order.products - An array of products in the order.
 * @returns {number} The total price of all products in the order.
 */
function calculateTotalProductPrice(order) {
  return order.products.reduce((total, product) => total + product.count * product.price, 0);
}

module.exports = { mapBasketItems, calculateTotalProductPrice };
