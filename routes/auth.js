const express = require("express");
const router = express.Router();
// const checkLogin = require("../middleware/auth");
const signin = require("../controller/signin");
const register = require("../controller/register");
const checkLogin = require("../middleware/auth");
// const checkLogin = require("../frontend1");
console.log("====>", register);
// console.log(checkLogin);
console.log("======>");

// const router = require("../frontend1");
router.get("/login", checkLogin.checkLogin, signin.login_get);
router.post("/login", signin.login_post);
router.get("/logout", signin.logout);

router.get("/register", checkLogin.checkLogin, register.register_get);
router.post("/register", register.register_post);

router.get("/register1", (req, res) => {
  res.render("register1.ejs", { name: "form" });
});

module.exports = router;
