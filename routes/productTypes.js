const { ProductType, validate } = require("../models/productType");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const productTypes = await ProductType.find();
  res.send(productTypes);
});

router.get("/:id", async (req, res) => {
  const productType = ProductType.findById(req.params.id);

  if (!productType)
    return res.status(404).send("The product with the given ID was not found");

  res.send(productType);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let productType = new ProductType({ name: req.body.name });
  productType = await productType.save();

  res.send(productType);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const productType = await ProductType.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!productType)
    return res.status(404).send("The product with the given ID was not found");

  res.send(productType);
});

router.delete("/:id", async (req, res) => {
  const productType = await ProductType.findByIdAndRemove(req.params.id);

  if (!productType)
    return res.status(404).send("The product with the given ID was not found");

  res.send(productType);
});

module.exports = router;
