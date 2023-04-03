const express = require("express");
const router = express.Router();

const roles = require("../controller/roles");

router.get("/", roles.roles_get);
router.post("/", roles.roles_post);

module.exports = router;
