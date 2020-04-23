const Joi = require("joi");
const mongoose = require("mongoose");

const WomenProductType = mongoose.model(
  "womenProductType",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
  })
);

function validaProductType(productType) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(productType, schema);
}

exports.WomenProductType = WomenProductType;
exports.validate = validaProductType;
