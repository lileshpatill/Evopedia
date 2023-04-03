const mongoose = require("mongoose");
const StationSchema = new mongoose.Schema({
  chargingstationname: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  phoneno: {
    type: String,
  },
  description: {
    type: String,
  },
  cost: {
    type: String,
  },
  amenities: {
    type: String,
  },
  plug: {
    type: String,
    require: true,
  },
  reviews: {
    type: String,
  },
  photos: {
    type: Buffer,
  },
});
const Chargingstation = mongoose.model("Station", StationSchema);
module.exports = Chargingstation;
