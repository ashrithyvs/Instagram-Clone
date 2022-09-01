const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:Qp6idMC5LwCDdDH@cluster0.3x8eb.mongodb.net/?retryWrites=true&w=majority";

const connectDB = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  posts: require("./posts.controller.js")(connectDB),
  auth: require("./auth.controller.js")(connectDB),
};
