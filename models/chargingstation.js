const mongoose = require("mongoose");
const StationSchema = new mongoose.Schema({
  station: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  chargeType: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  pay: {
    type: String,
    require: true,
  },
});
const Chargingstation = mongoose.model("Station", StationSchema);
module.exports = Chargingstation;
