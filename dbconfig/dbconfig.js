const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL,
  {
    useNewUrlParser: true,
    retryWrites: true,
    w: "majority",
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("DB Connected successfully");
});
