const express = require("express");
const rouoter = express.Router();

const AuthController = require("../controller/AuthController");
const router = require("../frontend1");
router.post("/LogIn", AuthController.register);
module.exports = rouoter;
