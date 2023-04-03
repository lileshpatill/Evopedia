const express = require("express");
const router = express.Router();
const roleCheck = require("../middleware/auth");

const charge = require("../controller/charging");

router.get("/charge", roleCheck.roleCheck("user"), charge.charge);

module.exports = router;
