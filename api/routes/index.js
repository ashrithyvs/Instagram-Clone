const postController = require("../controllers").posts;
const authController = require("../controllers").auth;
const upload = require("../utils/upload");
module.exports = (app) => {
  app.get("/health", function (req, res) {
    res.status(200).send("The APIs are up");
  });
  app.post("/register", upload.single("image"), authController.register);
  app.post("/login", authController.login);
  app.get("/posts", postController.getAllPosts);
  app.get("/comments/:id", postController.getAllCommentsByPostId);
  app.get("/posts/:id", postController.getPostById);
  app.get("/image/:filename", postController.getImageByFileId);
  app.patch("/posts/:id", postController.updatePostById);
  app.post("/create-post", upload.single("image"), postController.createPost);
  app.patch("/posts/add-comment/:id", postController.addComment);
  app.delete("/posts/delete-comment/:id", postController.deleteComment);
  app.patch("/posts/like/:id", postController.likePost);
  app.patch("/posts/dislike/:id", postController.dislikePost);
  app.patch("/posts/save/:id", postController.savePost);
  app.patch("/posts/unsave/:id", postController.unSavePost);
};
