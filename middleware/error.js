module.exports = function (errr, req, res, next) {
  res.status(500).send("Something failed.");
};
