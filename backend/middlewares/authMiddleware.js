const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   try {
  //     // Get token from header
  //     token = req.headers.authorization.split(" ")[1]; //Bearer(0) token(1)
  if (req.cookies.token) {
    try {
      // Get token from header
      // token = req.headers.authorization.split(" ")[1]; //Bearer(0) token(1)
      token = req.cookies.token;
      // Verify token and get the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user data from the id in the token and store the data in req.user without the password
      req.user = await User.findById(decoded.id).select("-password");

      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorized" });
    }
  } else {
    res.status(401).json({ message: "Not Authorized, need token" });
  }
});

module.exports = { protect };
