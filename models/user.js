const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true, minlength: 5, maxlength: 30 },
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

validateUser = (user) => {
  const schema = {
    username: Joi.string().required().min(5).max(30),
    name: Joi.string().required().min(1).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
