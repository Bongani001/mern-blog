const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");

exports.post_create = [
  body("title", "Title field must be at least 5 characters long.")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("content", "Content field must be at least 80 characters long.")
    .trim()
    .isLength({ min: 80 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).exec();
    const errors = validationResult(req);

    if (user === null) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Login first to create a post." }] });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = new Post({
      author: user._id,
      title: req.body.title,
      content: req.body.content,
      category: req.body.category || "General",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const savedPost = await post.save();
    return res.status(201).json({ savedPost });
  }),
];
