const mongoose = require("mongoose");
const { type } = require("os");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  headerImg: { type: String, required: true },
  imgId: { type: String, required: true },
  content: { type: String, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: "65d62f41a3ebb8f0d23c0ebc",
  },
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  views: { type: Number, default: 0 },
});

PostSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.created).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Post", PostSchema);
