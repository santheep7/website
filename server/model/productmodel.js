const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDescription: { type: String, required: true },
  productQuantity: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
