require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  invalidPathHandler,
  errorResponseHandler,
} = require("./middleware/errorHandler");

const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const categoryRouter = require("./routes/categoryRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

// MONGODB SETUP
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  return await mongoose.connect(process.env.MONGODB_URI);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ hello: "Hi" });
});

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);

app.use(invalidPathHandler);
app.use(errorResponseHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
