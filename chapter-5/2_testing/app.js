var express = require("express");
var logger = require("morgan");

var usersRouter = require("./routes/users.routes");
var articlesRouter = require("./routes/articles.routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/articles", articlesRouter);

module.exports = app;
