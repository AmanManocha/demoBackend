require('dotenv').config()
const mongoose = require('mongoose')

const connectionUrl = 'mongodb://127.0.0.1:27017/demo';
mongoose.connect(connectionUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db;