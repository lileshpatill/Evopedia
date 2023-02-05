const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const LogIn = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
  });
  let user = new user({
    username: req.body.username,
    Email: req.body.Email,
    password: hashedPass,
  });
  user
    .save()
    .then((user) => {
      res.json({
        message: "User Added Successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An Error Occured!",
      });
    });
};
module.exports = {
  LogIn,
};
