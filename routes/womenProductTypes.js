const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const WomenProductType = mongoose.model(
  "womenProductType",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
  })
);

router.get("/", async (req, res) => {
  const womenProductTypes = await WomenProductType.find();
  res.send(womenProductTypes);
});

router.get("/:id", async (req, res) => {
  const womenProductType = WomenProductType.findById(req.params.id);

  if (!womenProductType)
    return res.status(404).send("The product with the given ID was not found");

  res.send(womenProductType);
});

router.post("/", async (req, res) => {
  const { error } = validateProductType(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let womenProductType = new WomenProductType({ name: req.body.name });
  womenProductType = await womenProductType.save();

  res.send(womenProductType);
});

router.put("/:id", async (req, res) => {
  const { error } = validateProductType(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const womenProductType = await WomenProductType.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!womenProductType)
    return res.status(404).send("The product with the given ID was not found");

  res.send(womenProductType);
});

router.delete("/:id", async (req, res) => {
  const womenProductType = await WomenProductType.findByIdAndRemove(
    req.params.id
  );

  if (!womenProductType)
    return res.status(404).send("The product with the given ID was not found");

  res.send(womenProductType);
});

function validateProductType(productType) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(productType, schema);
}

module.exports = router;
