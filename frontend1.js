const { response, Router } = require("express");
const express = require("express");

/*const router = express.Router();
const path = require("path");*/
/*const { db } = require("./models/user");*/
const app = express();
require("./db/conn");

app.use("/public", express.static("public"));
app.set("engine", "ejs");
app.get("/", function (req, res) {
  res.render("frontend.ejs", { name: "Lilesh" });
});
app.get("/LogIn", function (req, res) {
  res.render("login form.ejs", { name: "form" });
});
app.get("/aboutus", function (req, res) {
  res.render("aboutus.ejs", { name: "aboutus" });
});

/*module.exports = router;

app.use("/api", AuthRoute);*/
app.listen(3000);
