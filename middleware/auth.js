require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
}

function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token)
    return res.status(401).json({ errors: [{ msg: "Unauthorize user" }] });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Token expired, Please Login Again." }] });
  }
}

module.exports = { generateToken, verifyToken };
