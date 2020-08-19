const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

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

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
// });

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(
    `App running on port ${PORT}! Visit http://localhost:3000/ in your browser.`
  );
});
