const mongoose = require("mongoose");

const connectDB = async () => {
  const uri =
    "mongodb+srv://admin:Qp6idMC5LwCDdDH@cluster0.3x8eb.mongodb.net/?retryWrites=true&w=majority";
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected");
};

module.exports = connectDB;
