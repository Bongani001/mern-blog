const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const categoryController = require("../controllers/categoryController");

router.post("/create", verifyToken, categoryController.category_create);

router.delete("/delete/:id", verifyToken, categoryController.category_delete);

module.exports = router;
