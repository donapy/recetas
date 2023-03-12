const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

// Middleware function to verify the token
module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, SECRET, (err, payload) => {
    if (err) {
      res.status(401).json({verified: false});
    } else {
      next();
    }
  });
};
