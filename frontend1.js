/*const { response, Router } = require("express");*/
const { urlencoded } = require("express");
const express = require("express");

/*const router = express.Router();
const path = require("path");*/

const app = express();
app.use(express.json());
app.use(express.urlencoded()); // to decode data send through html form
//app.use(express.static("public")); //to serve the static files
require("./db/conn");
const LogIn = require("./models/user");

app.use("/public", express.static("public"));
app.set("engine", "ejs");
app.get("/", function (req, res) {
  res.render("frontend.ejs", { name: "Lilesh" });
});
app.get("/LogIn", function (req, res) {
  res.render("login form.ejs", { name: "form" });
});

app.post("/LogIn", async (req, res) => {
  try {
    //if (req.body.Email) {
    // if there is email in req.body then we consider it as registration request and proceed by saving the credentails in data base
    // console.log("Its registration Page....");
    // console.log(req.body);
    // res.send(req.body);
    // } else {
    // if no email in req,body then we consider it as login request
    // console.log("Its login Page");
    // console.log(req.body);
    //res.send(req.body);
    // }
    const password = req.body.Password;
    const cpassword = req.body.Confirmpassword;

    if (password === cpassword) {
      const login = new LogIn({
        username: req.body.username,
        Email: req.body.Email,
        Password: password,
        Confirmpassword: cpassword,
      });
      const Register = await login.save();
      res.status(201).render("frontend.ejs");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
// login
app.post("/LogIn", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const useremail = await Register.findOne({ username: username });
    if (username.password === password) {
      res.status(201).render(frontend1.ejs);
    } else {
      res.send("invalid credential");
    }
  } catch (error) {
    res.status(400).send("invalid credential");
  }
});

app.get("/aboutus", function (req, res) {
  res.render("aboutus.ejs", { name: "aboutus" });
});

app.post("/test", function (req, res) {
  let name = req.body.name;
  console.log(name);
  res.send(name);
  // res.send("Hello world");
});

//app.get("/test", function (req, res) {
// let name = req.body.name;
// console.log(name);
// res.status(200).send({ name: "Rupoesh" });
// res.send("Hello world");
//});

/*module.exports = router;

app.use("/api", AuthRoute);*/

app.listen(3000);
