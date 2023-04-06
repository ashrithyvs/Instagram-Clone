const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;
const connectDB = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    });
};

module.exports = connectDB;
