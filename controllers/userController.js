const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = [
  body("email", "Invalid email").trim().isEmail().escape(),
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

    if (userExists) {
      return res.status(400).json({ msg: "Email is already used!" });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors,
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
