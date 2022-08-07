const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, "Please enter body of the post"],
  },
  commentBy: {
    type: String,
    required: [true, "Please provide a User"],
  },
  postId: {
    type: String,
    required: [true, "Please provide a User"],
  },
  likes: {
    type: Number,
    default: 0,
  },
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: new Date() },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
