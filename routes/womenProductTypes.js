const { WomenProductType, validate } = require("../models/womenProductTypes");
const express = require("express");
const router = express.Router();

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
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let womenProductType = new WomenProductType({ name: req.body.name });
  womenProductType = await womenProductType.save();

  res.send(womenProductType);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
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

module.exports = router;
