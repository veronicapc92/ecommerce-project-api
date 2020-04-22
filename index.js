const mongoose = require("mongoose");
const womenProductTypes = require("./routes/womenProductTypes");
const customers = require("./routes/customers");
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
app.use("/api/womenProductTypes", womenProductTypes);
app.use("/api/customers", customers);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
