const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const commentController = require("../controllers/commentController");

router.get("/", commentController.comment_getAll);

router.post("/create", verifyToken, commentController.comment_create);

router.patch("/update/:id", verifyToken, commentController.comment_update);

router.delete("/delete/:id", verifyToken, commentController.comment_delete);

module.exports = router;
