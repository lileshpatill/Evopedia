require("dotenv").config();
const connectDB = require("./db/conn");
const Marker = require("./models/marker");
const MarkerJson = require("./public/location.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    await Marker.create(MarkerJson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
