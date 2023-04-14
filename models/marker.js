const mongoose = require("mongoose");

const markerSchema = new mongoose.Schema({
  markercolor: {
    type: String,
    require: true,
  },
  markersize: {
    type: String,
    require: true,
  },

  coordinates: {
    type: String,
    require: true,
  },

  type: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Marker", markerSchema);
