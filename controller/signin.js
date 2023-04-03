const LogIn = require("../models/user.js");
const bcrypt = require("bcryptjs");

// const session = require("express-session");
// const jwt = require("jsonwebtoken");
// const user = require("../models/user");

const login_get = (req, res) => {
  res.render("auth/login.ejs", { name: "form" });
};

const login_post = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    const usernamee = await LogIn.findOne({ email: username });
    const all = await LogIn.find();
    console.log(all);
    console.log("U", usernamee.firstname);
    const password_match = await bcrypt.compare(
      password,
      usernamee.Confirmpassword
    );
    console.log(password_match);
    if (usernamee) {
      console.log("Inside nameeee...");
      if (password_match) {
        const em = usernamee.email;
        const id = usernamee._id;

        // res.send("success");

        req.session.user = req.body.username;
        req.session.role = usernamee.role;
        // console.log(req.session.user);

        console.log("Password Match..");

        res.status(202).redirect("/");
        // res.render("/");
        // res.json({ msg: "Logged in succesful" });
      } else {
        // res.status(400).redirect("/auth/login");
        res.render("/auth/login", { error: "Invalid email or password!" });
      }
    }
  } catch (error) {
    // res.status(400).send({ error: `Invalid  ${error}` });
    res.render("auth/login.ejs", { error: "Invalid email or password!" });
  }
};

// const login_post = (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
//     if (err) {
//       res.json({
//         error: err,
//       });
//     }
//   });
//   let user = new LogIn({
//     username: req.body.username,
//     Email: req.body.Email,
//     password: hashedPass,
//   });
//   user
//     .save()
//     .then((user) => {
//       res.json({
//         message: "User Added Successfully!",
//       });
//     })
//     .catch((error) => {
//       res.json({
//         message: "An Error Occured!",
//       });
//     });
// };

const logout = (req, res) => {
  // req.session.destroy();
  delete req.session.user;
  console.log(req.session);
  res.redirect("/auth/login");
};

// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

module.exports = {
  login_get,
  login_post,
  logout,
};
