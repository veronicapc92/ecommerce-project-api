const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  })
);

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(customers);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.post("/", async (req, res) => {
  // Create new customer
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  customer = await customer.save();

  res.send(customer);
});

router.put("/:id", async (req, res) => {
  // Modify customer information
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { username: req.body.username, name: req.body.name, email: req.body.email },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

router.delete(":id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  res.send(customer);
});

validateCustomer = (customer) => {
  const schema = {
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
  };

  return Joi.validate(customer, schema);
};

module.exports = router;
