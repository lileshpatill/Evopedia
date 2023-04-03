const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  role_name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Role = mongoose.model("Role", RoleSchema);
module.exports = Role;
