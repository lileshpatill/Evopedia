const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017/Evopedia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection is successfull");
  })
  .catch((e) => {
    console.log("no connection ");
  });

/*const db = mongoose.connection;*/
