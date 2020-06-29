const express = require("express");
const mongoose = require("mongoose");
let os = require("os");
let env = require('node-env-file'); // .env file
env(__dirname + '/.env');

const app = express();
let ipName;
if (os.type() === "Linux") {
    ipName = "localhost";
} else {
    ipName = os.hostname();
}

let urlDB;
let opDB;
if (process.env.NODE_ENV != 'test') {
  urlDB = `mongodb://${ipName}:27017,${ipName}:27018,${ipName}:27019/practice`;
  opDB = {
    replicaSet: "rs",
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  mongoose.connect(urlDB, {...opDB, useCreateIndex: true});
  mongoose.connection.once("open", () => {
      console.log("connected to database");
  });
} 

module.exports = app