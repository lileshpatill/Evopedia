/*const { response, Router } = require("express");*/
const { urlencoded } = require("express");
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const LogIn = require("./models/user.js");
const Chargingstation = require("./models/chargingstation.js");
const userRouter = require("./routes/auth.js");
const chargingRouter = require("./routes/charging.js");
const roleRouter = require("./routes/roles.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const roleCheck = require("./middleware/auth.js");
var bodyParser = require("body-parser");

/*const router = express.Router();
const path = require("path");*/

const app = express();
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

//  app.use(express.urlencoded()); // to decode data send through html form
//app.use(express.static("public")); //to serve the static files
require("./db/conn");
const User = require("./models/user");

app.use("/public", express.static("public"));
app.set("engine", "ejs");

app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    key: "user_sid",
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { expires: oneDay },
    resave: true,
  })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});

app.get("/", (req, res) => {
  console.log(req.session);
  // res.redirect("/auth/login/");
  res.render("frontend.ejs", { user: req.session.user });
});
app.get("/demo", roleCheck.roleCheck("user"), function (req, res) {
  res.json({ role: "Some basic !" });
});

// app.get("/login", function (req, res) {
//   res.render("auth/login.ejs", { name: "form" });
// });

// app.get("/register", function (req, res) {
//   res.render("auth/register.ejs", { name: "form" });
// });
// app.post("/register", async (req, res) => {
//   try {
//     const password = req.body.Password;
//     const cpassword = req.body.Confirmpassword;

//     if (password === cpassword) {
//       const User = new LogIn({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         username: req.body.username,
//         Email: req.body.Email,
//         Password: password,
//         Confirmpassword: cpassword,
//       });

//       console.log(User);
//       const LogIn_Save = User.save();
//       console.log(LogIn_Save);
//       res.status(201).redirect("/login");
//     } else {
//       res.send("password are not matching");
//     }
//   } catch (error) {
//     res.status(400).send({ error: `Invalid  ${error}` });
//   }
// });

// app.post("/login", async (req, res) => {
//   try {
//     const username = req.body.username;
//     const password = req.body.Password;
//     const usernamee = await User.findOne({ username: username });
//     // console.log(usernamee);
//     const password_match = await bcrypt.compare(
//       password,
//       usernamee.Confirmpassword
//     );
//     if (usernamee) {
//       if (password_match) {
//         res.status(202).redirect("/");
//       } else {
//         res.status(400).redirect("/login");
//       }
//     }
//   } catch (error) {
//     res.status(400).send({ error: `Invalid  ${error}` });
//   }
// });

app.get("/aboutus", function (req, res) {
  res.render("aboutus.ejs", { name: "aboutus" });
});

//let name = req.body.name;
//console.log(name);
//res.send(name);
//});

app.use("/auth", userRouter);
app.use("/role", roleRouter);
app.use("/", chargingRouter);
console.log("Went in router");

app.all("*", function (_, res) {
  res.render("404.ejs");
});

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }));

// passport.serializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, {
//       id: user.id,
//       username: user.username,
//       picture: user.picture
//     });
//   });
// });

// passport.deserializeUser(function(user, cb) {
//   process.nextTick(function() {
//     return cb(null, user);
//   });
// });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = { app };
