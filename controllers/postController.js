const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");

exports.post_getAll = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().exec();
  return res.status(200).json({ posts });
});

exports.post_create = [
  body("title", "Title field must be at least 5 characters long.")
    .trim()
    .isLength({ min: 5 }),
  body("content", "Content field must be at least 80 characters long.")
    .trim()
    .isLength({ min: 80 }),
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
      authorId: user._id,
      title: req.body.title,
      content: req.body.content,
      categoryId: req.body.category,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const savedPost = await post.save();
    return res.status(201).json({ savedPost });
  }),
];

exports.post_update = [
  body("title", "Title field must be at least 5 characters long.")
    .trim()
    .isLength({ min: 5 }),
  body("content", "Content field must be at least 80 characters long.")
    .trim()
    .isLength({ min: 80 }),

  asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
    const user = await User.findById(req.user._id).exec();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (post === null) {
      const error = new Error("Post Not Found.");
      error.status = 404;
      next(error);
    }

    const newPost = new Post({
      _id: post._id,
      authorId: post.authorId,
      title: req.body.title,
      content: req.body.content,
      categoryId: post.categoryId,
      createdAt: post.createdAt,
      updatedAt: Date.now(),
    });

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, newPost, {
      new: true,
    });
    return res.status(201).json({ updatedPost });
  }),
];

exports.post_delete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (post === null) {
    const error = new Error("Post Not Found.");
    error.status = 404;
    next(error);
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Post deleted successfully." });
});
