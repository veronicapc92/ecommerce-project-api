const Joi = require("joi");
const mongoose = require("mongoose");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    price: { type: Number, required: true, minlength: 1, maxlength: 4 },
    liked: { type: Boolean, required: true },
    link: { type: String, required: true },
    type: { type: String, required: true },
  })
);

async function createProduct(name, price, liked, link, type) {
  const product = new Product({
    name,
    price,
    liked,
    link,
    type,
  });

  await product.save();
}

// async function addProductType(productId, productType) {
//   const womenProduct = await WomenProduct.findById(productId);
//   womenProduct.productType =
// }

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
    price: Joi.number().min(1).max(4).required(),
    liked: Joi.boolean().required(),
    link: Joi.string().required(),
    typeId: Joi.string().required(),
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
