/*const { response, Router } = require("express");*/
const { urlencoded } = require("express");
const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const LogIn = require("./models/user.js");
const feedBack = require("./models/feedback.js");
const feedChargingstationBack = require("./models/chargingstation.js");
const Chargingstation = require("./models/chargingstation.js");
const data = require("./public/location.json");
// const mongo = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
// var jsonfile = require("jsonfile");
const fs = require("fs");
//console.log(data);

const userRouter = require("./routes/auth.js");
const chargingRouter = require("./routes/charging.js");
const roleRouter = require("./routes/roles.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const roleCheck = require("./middleware/auth.js");
const checkLogin = require("./middleware/auth.js");
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
const router = require("./routes/auth.js");

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
app.get("/", async (req, res) => {
  if (req.session.firstName) {
    const userAdmin = await LogIn.find({ firstname: req.session.firstName });

    var is_admin = null;
    if (userAdmin[0].role == "admin") {
      is_admin = "admin";
    } else {
      is_admin = "user";
    }
  }
  res.render("frontend.ejs", {
    user: req.session.firstName,
    admin: is_admin,
  });
});
app.get("/demo", roleCheck.roleCheck("user"), function (req, res) {
  res.json({ role: "Some basic !" });
});

app.get("/aboutus", function (req, res) {
  res.render("aboutus.ejs", { name: "aboutus" });
});

app.get("/feedback", checkLogin.LoggedInUser, function (req, res) {
  res.render("feedback.ejs", {
    firstName: req.session.firstName,
    lastName: req.session.lasttName,
    email: req.session.Email,
    user: req.session.firstName,
  });
});

app.post("/feedback", function (req, res) {
  console.log(req.body);
  (firstname = req.body.firstname),
    (lastname = req.body.lastname),
    (email = req.body.email),
    (state = req.body.state),
    (subject = req.body.subject),
    (feedback = new feedBack({
      firstname: firstname,
      lastname: lastname,
      email: email,
      state: state,
      subject: subject,
    }));
  const feedBack_Save = feedback.save();
  console.log(feedBack_Save);
  res.status(201).redirect("/");
});

app.get("/charger/add", checkLogin.LoggedInUser, async (req, res) => {
  res.render("charger.ejs", {
    firstName: req.session.firstName,
    lastName: req.session.lasttName,
    email: req.session.Email,
    user: req.session.firstName,
  });
});

app.post("/charger/add", checkLogin.LoggedInUser, (req, res) => {
  const station = req.body.station;
  const phone = req.body.phone;
  const pay = req.body.pay;
  const city = req.body.city;
  const address = req.body.address;
  const description = req.body.description;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const flexRadioDefault = req.body.flexRadioDefault;
  console.log(req.body);
  charger = new Chargingstation({
    station: station,
    city: city,
    address: address,
    phone: phone,
    pay: pay,
    description: description,
    chargeType: flexRadioDefault,
    latitude: latitude,
    longitude: longitude,
  });
  const charger_Save = charger.save();
  console.log(charger_Save);
  res.status(201).redirect("/");
});

app.get("/charger", async (req, res) => {
  const charge = await Chargingstation.find({ latitude: { $exists: true } });
  if (req.session.firstName) {
    const userAdmin = await LogIn.find({ firstname: req.session.firstName });

    var is_admin = null;
    if (userAdmin[0].role == "admin") {
      is_admin = "admin";
    } else {
      is_admin = "user";
    }
  }
  res.render("admin-list.ejs", {
    obj: charge,
    user: req.session.firstName,
    admin: is_admin,
  });
});

app.get("/admin/feedback", checkLogin.roleCheck("admin"), async (req, res) => {
  const feedback = await feedBack.find({ _id: { $exists: true } });
  const userAdmin = await LogIn.find({ firstname: req.session.firstName });

  var is_admin = null;
  if (userAdmin[0].role == "admin") {
    is_admin = "admin";
  } else {
    is_admin = "user";
  }
  res.render("admin-feedback.ejs", {
    obj: feedback,
    user: req.session.firstName,
    admin: is_admin,
  });
});

app.get("/admin/users", checkLogin.roleCheck("admin"), async (req, res) => {
  const users = await LogIn.find({ _id: { $exists: true } });
  // console.log(users);
  const userAdmin = await LogIn.find({ firstname: req.session.firstName });

  var is_admin = null;
  if (userAdmin[0].role == "admin") {
    is_admin = "admin";
  } else {
    is_admin = "user";
  }
  res.render("admin-users.ejs", {
    obj: users,
    user: req.session.firstName,
    admin: is_admin,
  });
});

app.get("/charger/delete/:id", checkLogin.roleCheck("admin"), (req, res) => {
  let id = req.params.id;
  Chargingstation.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/charger");
    } else {
      console.log(err);
    }
  });
});

app.get("/feedback/delete/:id", checkLogin.roleCheck("admin"), (req, res) => {
  let id = req.params.id;
  feedBack.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/admin/feedback");
    } else {
      console.log(err);
    }
  });
});

app.get("/user/delete/:id", checkLogin.roleCheck("admin"), (req, res) => {
  let id = req.params.id;
  LogIn.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/admin/users");
    } else {
      console.log(err);
    }
  });
});

app.use("/auth", userRouter);
app.use("/role", roleRouter);
app.use("/", chargingRouter);
console.log("Went in router");

app.all("*", function (_, res) {
  res.render("404.ejs");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = { app };
