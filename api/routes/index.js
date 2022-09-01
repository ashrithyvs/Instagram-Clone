const postController = require("../controllers").posts;
const authController = require("../controllers").auth;
const upload = require("../utils/upload");
module.exports = (app) => {
  app.get("/api/health", function (req, res) {
    res.status(200).send("The APIs are up");
  });
  app.post("/api/register", upload.single("image"), authController.register);
  app.post("/api/login", authController.login);
  app.get("/api/posts", postController.getAllPosts);
  app.get("/api/comments/:id", postController.getAllCommentsByPostId);
  app.get("/api/posts/:id", postController.getPostById);
  app.get("/api/image/:filename", postController.getImageByFileId);
  app.patch("/api/posts/:id", postController.updatePostById);
  app.post(
    "/api/create-post",
    upload.single("image"),
    postController.createPost
  );
  app.patch("/api/posts/add-comment/:id", postController.addComment);
  app.delete("/api/posts/delete-comment/:id", postController.deleteComment);
  app.patch("/api/posts/like/:id", postController.likePost);
  app.patch("/api/posts/dislike/:id", postController.dislikePost);
  app.patch("/api/posts/save/:id", postController.savePost);
  app.patch("/api/posts/unsave/:id", postController.unSavePost);
};
