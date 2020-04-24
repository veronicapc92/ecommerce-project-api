const cors = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const productTypes = require("./routes/productTypes");
const customers = require("./routes/customers");
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");
const express = require("express");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/gosha", {
    useUnifiedTopology: true, // double check once I install the latest mongoose version
    useNewUrlParser: true, // double check once I install the latest mongoose version
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.err("Could not connect to MongoDB...", err));

app.use(express.json());
app.use(cors());
app.use("/api/productTypes", productTypes);
app.use("/api/customers", customers);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
