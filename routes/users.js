const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.email,
  });

  await user.save();

  res.send({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
