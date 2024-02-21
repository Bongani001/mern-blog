const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Category = require("../models/category");

exports.category_create = [
  body("name", "Category name must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const categoryCheck = await Category.findOne({
      name: req.body.name,
    }).exec();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (categoryCheck !== null) {
      return res.status(400).json({ errors: [{ msg: "Category exists." }] });
    }
    const category = new Category({
      name: req.body.name,
    });

    const savedCategory = await category.save();
    return res.status(201).json({ savedCategory });
  }),
];

exports.category_delete = async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  if (category == null) {
    const error = new Error("Category does not exist.");
    error.status = 404;
    next(error);
  }

  await Category.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "Category deleted." });
};
