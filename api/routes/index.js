const postController = require("../controllers").posts;
const authController = require("../controllers").auth;

module.exports = (app) => {
  app.get("/health", function (req, res) {
    res.status(200).send("The APIs are up");
  });

  app.post("/register", authController.register);
  app.post("/login", authController.login);

  app.get("/posts", postController.getAllPosts);
  app.get("/comments/:id", postController.getAllCommentsByPostId);
  app.get("/posts/:id", postController.getPostById);
  app.put("/posts/:id", postController.updatePostById);
  app.post("/create-post", postController.createPost);
  app.put("/posts/add-comment/:id", postController.addComment);
  app.delete("/posts/delete-comment/:id", postController.deleteComment);
  app.put("/posts/like/:id", postController.likePost);
  app.put("/posts/dislike/:id", postController.dislikePost);
  app.put("/posts/save/:id", postController.savePost);
  app.put("/posts/unsave/:id", postController.unSavePost);
};
