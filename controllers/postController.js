const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

exports.post_getAll = asyncHandler(async (req, res, next) => {
  let posts = [];
  if (req.query.views) {
    // Get the most viewed posts
    const limit = Number(req.query.limit);
    posts = await Post.find({ published: { $eq: true } })
      .populate({ path: "authorId categoryId", select: "username name" })
      .sort({ views: -1 })
      .limit(limit)
      .exec();
  } else if (req.query.limit) {
    // Get limited posts
    const limit = Number(req.query.limit);
    posts = await Post.find({ published: { $eq: true } })
      .populate({ path: "authorId", select: "username" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  } else {
    posts = await Post.find({ published: { $eq: true } }).exec();
  }
  return res.status(200).json(posts);
});

exports.post_getUserPosts = asyncHandler(async (req, res, next) => {
  let posts = [];
  if (req.query.views) {
    // Get the most viewed posts
    const limit = Number(req.query.limit);
    posts = await Post.find({ authorId: req.params.authorid })
      .populate({ path: "authorId", select: "username" })
      .populate("categoryId")
      .sort({ views: -1 })
      .limit(limit)
      .exec();
  } else if (req.query.limit) {
    // Get limited posts
    const limit = Number(req.query.limit);
    posts = await Post.find({ authorId: req.params.authorid })
      .populate({ path: "authorId categoryId", select: "username name" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  } else {
    posts = await Post.find({ authorId: req.params.authorid })
      .populate({ path: "authorId categoryId", select: "username name" })
      .exec();
  }
  return res.status(200).json(posts);
});

exports.post_getSpecific = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { views: post.views + 1 },
    {
      new: true,
    }
  ).populate({ path: "authorId", select: "username" });

  return res.status(200).json(updatedPost);
});

exports.post_create = [
  upload.single("image"),

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

    const result = await cloudinary.uploader.upload(req.file?.path, {
      folder: "blog",
    });
    const post = new Post({
      authorId: user._id,
      title: req.body.title,
      headerImg: result.secure_url,
      imgId: result.public_id,
      content: req.body.content,
      categoryId: req.body.category,
      createdAt: Date.now(),
      published: req.body.published,
      updatedAt: Date.now(),
    });

    const savedPost = await post.save();
    return res.status(201).json(savedPost);
  }),
];

exports.post_update = [
  upload.single("image"),
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
      return next(error);
    }

    if (user.id != post.authorId && !user.admin) {
      const error = new Error("Not Authorised.");
      error.status = 403;
      return next(error);
    }

    let result;
    if (req.file) {
      // Delete old image from cloudinary
      await cloudinary.uploader.destroy(post.imgId);
      // Save image to cloudinary
      result = await cloudinary.uploader.upload(req.file?.path, {
        folder: "blog",
      });
    }

    const newPost = new Post({
      _id: post._id,
      authorId: post.authorId,
      title: req.body.title,
      headerImg: result?.secure_url || post.headerImg,
      imgId: result?.public_id || post.imgId,
      content: req.body.content,
      published: req.body.published,
      categoryId: req.body.category,
      createdAt: post.createdAt,
      updatedAt: Date.now(),
    });

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, newPost, {
      new: true,
    });
    return res.status(201).json(updatedPost);
  }),
];

exports.post_delete = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (post === null) {
    const error = new Error("Post Not Found.");
    error.status = 404;
    return next(error);
  }

  await Comment.deleteMany({ postId: req.params.id });
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Post deleted successfully." });
});
