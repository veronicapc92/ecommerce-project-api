const mongoose = require("mongoose");
const productTypes = require("./routes/productTypes");
const customers = require("./routes/customers");
const products = require("./routes/products");
const users = require("./routes/users");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/gosha", {
    useUnifiedTopology: true, // double check once I install the latest mongoose version
    useNewUrlParser: true, // double check once I install the latest mongoose version
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.err("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/womenProductTypes", productTypes);
app.use("/api/customers", customers);
app.use("/api/womeProducts", products);
app.use("/api/users", users);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
