const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.cookie;
  //console.log(req.headers.cookie);

  console.log(token);
  if (token !== undefined) {
    try {
      token = req.headers.cookie.split("token=")[1];
      // Verify token and get the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user data from the id in the token and store the data in req.user without the password
      req.user = await User.findById(decoded.id).select("-password");

      //console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorized" });
    }
  } else {
    res.status(401).json({ message: "Not Authorized, need token" });
  }
});

module.exports = { protect };
