const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  // .connect("mongodb://localhost/gosha", {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // })
  mongoose.connect(db).then(() => winston.info("Connected to MongoDB..."));
};
