const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

CommentSchema.virtual("formatted_date").get(function () {
  return DateTime.fromJSDate(this.created).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model("Comment", CommentSchema);
