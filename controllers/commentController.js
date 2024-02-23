const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.comment_getAll = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find().exec();
  return res.status(200).json({ comments });
});

exports.comment_create = [
  body("content", "Content must not be empty.").trim().isLength({ min: 1 }),

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

    const comment = new Comment({
      postId: req.body.postId,
      authorId: user._id,
      content: req.body.content,
    });

    try {
      const savedComment = await comment.save();
      return res.status(201).json({ savedComment });
    } catch (err) {
      err.message = "Internal server Error, Please try again later.";
      err.statusCode = 500;
      next(err);
    }
  }),
];

exports.comment_delete = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).exec();

  if (comment === null) {
    const error = new Error("Comment Not Found.");
    error.status = 404;
    next(error);
  }
  await Comment.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Comment deleted successfully." });
});

exports.comment_update = [
  body("content", "Content must not be empty.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id).exec();
    const user = await User.findById(req.user._id).exec();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (comment === null) {
      const error = new Error("Post Not Found.");
      error.status = 404;
      return next(error);
    }

    if (user.id != comment.authorId) {
      const error = new Error("Not Authorised.");
      error.status = 403;
      return next(error);
    }

    const newComment = new Comment({
      _id: comment._id,
      authorId: comment.authorId,
      content: req.body.content,
      createdAt: comment.createdAt,
      updatedAt: Date.now(),
    });

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      newComment,
      {
        new: true,
      }
    );
    return res.status(201).json({ updatedComment });
  }),
];
