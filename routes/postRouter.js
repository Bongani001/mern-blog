const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const postController = require("../controllers/postController");

router.get("/", postController.post_getAll);

router.post("/create", verifyToken, postController.post_create);

module.exports = router;
