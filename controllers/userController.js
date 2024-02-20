const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require("../middleware/auth");
const User = require("../models/User");

exports.register = [
  body("email", "Please enter a valid email address.")
    .trim()
    .isEmail()
    .escape(),
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match.")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const userExists = await User.findOne({ email: req.body.email }).exec();

    const errors = validationResult(req);

    if (userExists !== null) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already used!" }] });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        admin: false,
      });
      const newUser = await user.save();
      return res.status(201).json(newUser);
    } catch (err) {
      return next(err);
    }
  }),
];

exports.login = [
  body("email", "Please enter a valid email address.")
    .trim()
    .isEmail()
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).exec();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    if (user === null) {
      return res
        .status(404)
        .json({ errors: [{ msg: "User with email address does not exist." }] });
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).json({ errors: [{ msg: "Incorrect password." }] });
    }

    const verifiedUser = {
      email: user.email,
      username: user.username,
      admin: user.admin,
      _id: user._id,
    };

    const token = generateToken(verifiedUser);
    res.status(200).json({ ...verifiedUser, token });
  }),
];
