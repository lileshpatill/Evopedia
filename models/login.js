const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    Password: {
      type: String,
      require: true,
    },
  },

  { timestamps: true }
);
const LogIn = mongoose.model("Login", UserSchema);
module.exports = LogIn;
