const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  })
);

validateCustomer = (customer) => {
  const schema = {
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
  };

  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
