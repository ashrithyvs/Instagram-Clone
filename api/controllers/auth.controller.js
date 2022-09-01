const User = require("../database/models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const mongoose = require("mongoose");

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};

module.exports = (connectDB) => {
  var gfs;
  connectDB.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(connectDB.db, {
      bucketName: "uploads",
    });
    console.log("GFS Connected");
  });
  return {
    async register(req, res, next) {
      const {
        username,
        firstName,
        middleName,
        lastName,
        dob,
        phoneNumber,
        email,
        password,
      } = req.body;
      const imageId = req.file.filename;
      try {
        const user = await User.create({
          username,
          firstName,
          middleName,
          lastName,
          dob,
          phoneNumber,
          email,
          password,
          profilePicture: imageId,
        });
        sendToken(user, 201, res);
      } catch (err) {
        next(err);
      }
    },
    async login(req, res, next) {
      const { email, password } = req.body;

      console.log(email, password);
      if (!email || !password) {
        return next(
          new ErrorResponse("Please provide an email and password", 400)
        );
      }
      try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorResponse("Invalid credentials", 401));
        const isMatch = await user.matchPassword(password);

        if (!isMatch) return next(new ErrorResponse("Invalid password", 401));

        sendToken(user, 200, res);
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
      }
    },
    async forgotPassword(req, res, next) {
      const { email } = req.body;
      if (!email) {
        return next(
          new ErrorResponse("Please provide an email and password", 400)
        );
      }
      try {
        const user = await User.findOne({ email });
        if (!user) return next(new ErrorResponse("User not found", 404));
        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `https://advanced-auth-mern.vercel.app/passwordreset/${resetToken}`;
        const message = `<h1>You have requested a new password reset</h1><p>Please go to this link to reset your password</p><a href=${resetUrl} clicktracking=off>${resetUrl}</a>`;

        try {
          await sendEmail({
            to: user.email,
            subject: "Password reset request",
            text: message,
          });
          res.status(200).json({ success: true, data: "Email sent" });
        } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;

          await user.save();
          return next(new ErrorResponse("Email couldn't be sent to user", 404));
        }
      } catch (error) {
        next(error);
      }
    },
    async resetPassword(req, res, next) {
      // Compare token in URL params to hashed token
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

      try {
        const user = await User.findOne({
          resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
          return next(new ErrorResponse("Invalid Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
          success: true,
          data: "Password Updated Success",
        });
      } catch (err) {
        next(err);
      }
    },
  };
};
