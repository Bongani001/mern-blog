const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

CategorySchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.created).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Category", CategorySchema);
