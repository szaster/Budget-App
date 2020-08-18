const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let uri = "mongodb://localhost/budget";
if (process.env.NODE_ENV === "production") {
  uri = process.env.MONGODB_URI;
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(
    "App running on port 3000! Visit http://localhost:3000/ in your browser."
  );
});
