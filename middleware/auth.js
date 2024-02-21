require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
}

exports.verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  
  if (token === undefined)
    return res.status(401).json({ errors: [{ msg: "Unauthorized user" }] });

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(_id).select("-password").exec();
    next();
  } catch (e) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Token expired, Please Login Again." }] });
  }
};

