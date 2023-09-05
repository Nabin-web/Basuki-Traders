"use strict";
require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const httpStatus = require("http-status");
const otherHelpers = require("./helpers/other.helpers");
const path = require("path");
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || "5000";
const appName = process.env.APP_NAME || "Basuki Traders";
const env = process.env.ENV || "Development";

const app = express();

// logger;
app.use(logger("dev"));

// json parser;
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

// url encoded;
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// router;
const routes = require("./routes");
app.use("/api", routes);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  if (err.status == 404) {
    return otherHelpers.sendResponse(
      res,
      httpStatus.NOT_FOUND,
      false,
      null,
      err,
      "Route Not Found.",
      null
    );
  } else {
    console.log("\x1b[41m", err);
    let path = req.baseUrl + req.route && req.route.path;
    if (path.substr(path.length - 1) === "/") {
      path = path.slice(0, path.length - 1);
    }
    err.method = req.method;
    err.path = req.path;
    return otherHelpers.sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      false,
      null,
      err,
      null,
      null
    );
  }
});

app.set("PORT_NUMBER", port);

async function MongoDBConnection() {
  await mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log(`| MongoDB URL  : ${mongoURI}`);
      console.log("| MongoDB Connected");
      console.log("|--------------------------------------------");
    });

  return null;
}

Promise.resolve(app)
  .then(() => {
    MongoDBConnection();
  })
  .catch((err) =>
    console.error.bind(
      console,
      `MongoDB connection error: ${JSON.stringify(err)}`
    )
  );

const server = http.createServer(app);

// start server;
server.listen(port, () => {
  const date = new Date();
  console.log("|------------------------------------");
  console.log("| Server           : " + appName);
  console.log("| Environment      : " + env);
  console.log("| Port             : " + port);
  console.log("| Date             : " + date);
  console.log("| Waiting for Database Connection.");
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
