const mongoose = require("mongoose");
/*const AuthRoute = require("./route/auth");*/
mongoose
  .connect("mongodb://localhost:27017/Evopedia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((e) => {
    console.log("no connection");
  });
/*const db = mongoose.connection;*/
