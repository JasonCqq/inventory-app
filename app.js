var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var catalogRouter = require("./routes/catalog");

var app = express();

//MONGODB DATABASE CONNECTION
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb://jasoncqhuang:WI62VpVxRtiVnk5a@ac-rpnjmlj-shard-00-00.ld1s5vi.mongodb.net:27017,ac-rpnjmlj-shard-00-01.ld1s5vi.mongodb.net:27017,ac-rpnjmlj-shard-00-02.ld1s5vi.mongodb.net:27017/?ssl=true&replicaSet=atlas-hb7y3u-shard-0&authSource=admin&retryWrites=true&w=majority";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
