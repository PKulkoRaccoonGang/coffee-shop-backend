function mapBasketItems(basket) {
  return basket.items.map((product) => ({
    ...product.productId._doc, count: product.count,
  }));
}

function calculateTotalProductPrice(order) {
  return order.products.reduce((total, product) => total + product.count * product.price, 0);
}

module.exports = { mapBasketItems, calculateTotalProductPrice };
