const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, min: 3, max: 100 },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Category", CategorySchema);
