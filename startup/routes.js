const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const productTypes = require("../routes/productTypes");
const customers = require("../routes/customers");
const products = require("../routes/products");
const users = require("../routes/users");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/productTypes", productTypes);
  app.use("/api/customers", customers);
  app.use("/api/products", products);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
