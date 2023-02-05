const mongoose = require("mongoose");
const schema = mongoose.schema;

const userschema = new schema(
  {
    username: {
      type: String,
    },
    Email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);
const user = mongoose.model("user", userschema);
module.exports = user;
