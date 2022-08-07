const mongoose = require("mongoose");
const userSchema = require("./User");
const commentSchema = require("./Comment");

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    unique: true,
    required: true,
  },
  body: {
    type: String,
    required: [true, "Please enter body of the post"],
  },
  comments: {
    type: Array,
  },
  postedBy: {
    type: String,
    required: [true, "Please provide a User"],
  },
  likes: {
    type: Array,
  },
  saves: { type: Array },
  image: {
    type: String,
    // required: [true, "Please provide a Last Name"],
  },
  createdAt: { type: Date, default: new Date() },
  modifiedAt: { type: Date, default: new Date() },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
