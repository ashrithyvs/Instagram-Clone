const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:Qp6idMC5LwCDdDH@cluster0.3x8eb.mongodb.net/?retryWrites=true&w=majority";
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
