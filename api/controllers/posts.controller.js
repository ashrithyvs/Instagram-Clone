const Comment = require("../database/models/Comment");
const Post = require("../database/models/Post");
const User = require("../database/models/User");
const Util = require("../helpers/utils");
const { v4: uuidv4 } = require("uuid");

const util = new Util();

module.exports = {
  //posts
  async getAllPosts(req, res) {
    try {
      const posts = await Post.find();
      util.setSuccess(200, "Success", posts);
      return util.send(res);
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
  async createPost(req, res, next) {
    const { body, postedBy } = req.body;
    try {
      const user = await User.findOne({ username: { $eq: postedBy } });
      if (user) {
        const post = await Post.create({
          postId: uuidv4(),
          body,
          postedBy,
          modifiedAt: new Date(),
        });
        util.setSuccess(200, "Success", post);
        return util.send(res);
      } else {
        util.setError(500, "User not found");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
  async getPostById(req, res) {
    try {
      const post = await Post.findOne({ postId: req.params.id });
      if (post) {
        util.setSuccess(200, "Success", post);
      } else {
        util.setError(500, error);
      }
      return util.send(res);
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
  async updatePostById(req, res) {
    try {
      const { newBody, updateBy } = req.body;
      const post = await Post.findOneAndUpdate(
        { postId: { $eq: req.params.id }, postedBy: { $eq: updateBy } },
        { $set: { body: newBody } }
      );
      if (post) {
        util.setSuccess(200, "Success", post);
        return util.send(res);
      } else {
        util.setError(500, "Unable to find the post");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },

  //comments
  async getAllCommentsByPostId(req, res) {
    try {
      const comments = await Comment.find({ postId: { $eq: req.params.id } });
      util.setSuccess(200, "Success", comments);
      return util.send(res);
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
  async addComment(req, res) {
    try {
      const { comment, commentBy } = req.body;
      const commentId = uuidv4();
      const commentRef = await Comment.create({
        commentId: commentId,
        body: comment,
        commentBy,
        postId: req.params.id,
      });
      const post = await Post.findOneAndUpdate(
        { postId: { $eq: req.params.id } },
        { $push: { comments: commentRef.commentId } }
      );
      if (post) {
        util.setSuccess(200, "Success", post);
        return util.send(res);
      } else {
        Comment.findOneAndDelete({ commentId: { $eq: commentId } });
        util.setError(500, "Unable to find the post");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
  async deleteComment(req, res) {
    try {
      const post = await Post.findOne({
        postId: { $eq: req.params.id },
        commentBy: { $eq: req.body.deleteBy },
      });
      if (post) {
        util.setSuccess(200, "Success");
        return util.send(res);
      } else {
        util.setError(500, "Unable to find the post");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },

  //likes
  async likePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        {
          postId: { $eq: req.params.id },
          likes: { $nin: req.body.username },
        },
        { $push: { likes: req.body.username } }
      );
      const user = await User.findOneAndUpdate(
        {
          username: { $eq: req.body.username },
          likes: { $nin: req.params.id },
        },
        { $push: { likes: req.params.id } }
      );
      if (post && user) {
        util.setSuccess(200, "Success", post);
        return util.send(res);
      } else {
        util.setError(500, "Unable to find the post/like the post");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
  async dislikePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { postId: req.params.id },
        { $pull: { likes: req.body.username } }
      );
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { likes: req.params.id } }
      );
      if (post && user) {
        util.setSuccess(200, "Success", post);
        return util.send(res);
      } else {
        util.setError(500, "Unable to find the post/dislike the post");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },

  //save
  async savePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        {
          postId: { $eq: req.params.id },
          saves: { $nin: req.body.username },
        },
        { $push: { saves: req.body.username } }
      );
      const user = await User.findOneAndUpdate(
        {
          username: { $eq: req.body.username },
          saved: { $nin: req.params.id },
        },
        { $push: { saved: req.params.id } }
      );
      if (post && user) {
        util.setSuccess(200, "Success", post);
        return util.send(res);
      } else {
        util.setError(500, "Unable to find the post/like the post");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
  async unSavePost(req, res) {
    try {
      const post = await Post.findOneAndUpdate(
        { postId: req.params.id },
        { $pull: { saves: req.body.username } }
      );
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $pull: { saved: req.params.id } }
      );
      if (post && user) {
        util.setSuccess(200, "Success", post);
        return util.send(res);
      } else {
        util.setError(500, "Unable to find the post/dislike the post");
        return util.send(res);
      }
    } catch (error) {
      util.setError(500, error);
      return util.send(res);
    }
  },
};
