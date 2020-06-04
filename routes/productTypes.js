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

module.exports = router;
