const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;
const connectDB = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  posts: require("./posts.controller.js")(connectDB),
  auth: require("./auth.controller.js")(connectDB),
};
