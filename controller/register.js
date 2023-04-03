const LogIn = require("../models/user.js");
const jwt = require("jsonwebtoken");
// const express = require("express");
// const router = express.Router();

// router.get("/register", function (req, res) {
//   res.render("auth/register.ejs", { name: "form" });
// });

const register_get = (req, res) => {
  console.log(req.session.user);
  res.render("auth/register.ejs", { name: "form" });
};

const register_get1 = (req, res) => {
  res.render("register1.ejs", { name: "form" });
};

//   router.post("/register",

const register_post = (req, res) => {
  try {
    const password = req.body.Password;
    const cpassword = req.body.Confirmpassword;

    if (password === cpassword) {
      const User = new LogIn({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.Email,
        Password: password,
        Confirmpassword: cpassword,
        role: "user",
      });

      console.log(User);
      const LogIn_Save = User.save();
      console.log(LogIn_Save);
      res.status(201).redirect("/auth/login");
    } else {
      // res.send("password are not matching");
      res.render("auth/register", {
        error: "Password & Confirmpassowrd are not matching!",
      });
    }
  } catch (error) {
    res.status(400).send({ error: `Invalid  ${error}` });
  }
};

module.exports = { register_get, register_post, register_get1 };
