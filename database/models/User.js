const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  firstName: {
    type: String,
    required: [true, "Please provide a First Name"],
  },
  middleName: {
    type: String,
    required: [true, "Please provide a Middle Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a Last Name"],
  },
  dob: {
    type: Date,
    required: [true, "Please provide a DOB"],
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: [true, "Please provide a Phone Number"],
  },
  saved: {
    type: Array,
  },
  profilePicture: {
    type: String,
  },
  followers: { type: Array },
  following: { type: Array },
  posts: { type: Array },
  comments: { type: Array },
  likes: { type: Array },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Please provide a valid email",
    ],
  },
  status: {
    type: Boolean,
    default: false,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10min",
  });
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
