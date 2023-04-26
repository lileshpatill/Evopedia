const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
});
const feedBack = mongoose.model("feedback", FeedbackSchema);
module.exports = feedBack;
