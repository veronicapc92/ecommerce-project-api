const Joi = require("joi");
const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 50 },
});

const ProductType = mongoose.model("ProductType", productTypeSchema);

function validateProductType(productType) {
  const schema = {
    name: Joi.string().min(1).max(50).required(),
  };

  return Joi.validate(productType, schema);
}

exports.productTypeSchema = productTypeSchema;
exports.ProductType = ProductType;
exports.validate = validateProductType;
