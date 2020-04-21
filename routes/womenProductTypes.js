const Joi = require("joi");
const express = require("express");
const router = express.Router();

const womenProductTypes = [
  { id: 1, name: "trousers" },
  { id: 2, name: "jeans" },
  { id: 3, name: "blazers" },
  { id: 4, name: "sweatshirts" },
  { id: 5, name: "dresses" },
  { id: 6, name: "shirts" },
  { id: 7, name: "tops" },
  { id: 8, name: "cardigans" },
  { id: 9, name: "skirts" },
  { id: 10, name: "test" },
];

router.get("/", (req, res) => {
  res.send(womenProductTypes);
});

router.get("/:id", (req, res) => {
  const womenProductType = TypeTypes.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!womenProductType)
    return res.status(404).send("The product with the given ID was not found");

  res.send(womenProductType);
});

router.post("/", (req, res) => {
  const { error } = validateProductType(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const womenProductType = {
    id: womenProductTypes.length + 1,
    name: req.body.name,
  };

  womenProductTypes.push(womenProductType);
  res.send(womenProductType);
});

router.put("/:id", (req, res) => {
  const womenProductType = womenProductTypes.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!womenProductType)
    return res.status(404).send("The product with the given ID was not found");

  const { error } = validateProductType(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  womenProductType.name = req.body.name;
  res.send(womenProductType);
});

router.delete("/:id", (req, res) => {
  const womenProductType = womenProductTypes.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!womenProductType)
    return res.status(404).send("The product with the given ID was not found");

  const index = womenProductTypes.indexOf(womenProductType);
  womenProductTypes.splice(index, 1);

  res.send(womenProductType);
});

function validateProductType(productType) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(productType, schema);
}

module.exports = router;
