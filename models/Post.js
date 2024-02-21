const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, require: true },
  content: { type: String, require: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: "65d62f41a3ebb8f0d23c0ebc",
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

PostSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.created).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Post", PostSchema);
