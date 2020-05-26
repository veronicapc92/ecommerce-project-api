const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/gosha", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => winston.info("Connected to MongoDB..."));
};
