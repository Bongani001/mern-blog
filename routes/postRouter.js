const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const postController = require("../controllers/postController");

router.get("/", postController.post_getAll);

router.get("/:id", postController.post_getSpecific);

router.get("/authors/:authorid", postController.post_getUserPosts);

router.post("/create", verifyToken, postController.post_create);

router.post("/update/:id", verifyToken, postController.post_update);

router.delete("/delete/:id", verifyToken, postController.post_delete);

module.exports = router;
