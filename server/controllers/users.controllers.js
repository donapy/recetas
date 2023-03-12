const Usuario = require("../models/users.model");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

module.exports = {
  // register
  register: async (req, res) => {
    try {
      const newUser = await Usuario.create(req.body);
      const userToken = jwt.sign({_id: newUser._id}, SECRET);
      res
        .status(201)
        .cookie("userToken", userToken, {
          httpOnly: true,
          expires: new Date(Date.now()),
        })
        .json({successMessage: "user registered", user: newUser});
    } catch (error) {
      res.status(401).json(error);
    }
  },

  // login
  login: async (req, res) => {
    const user = await Usuario.findOne({email: req.body.email});
    // console.log("user", user);
    if (!user) {
      return res
        .status(400)
        .json({errorMessage: "email or password is incorrect"});
    }
    try {
      const valid = await bcrypt.compare(req.body.password, user.password);
      console.log("password valid?", valid);
      if (!valid) {
        return res
          .status(400)
          .json({errorMessage: "email or password is incorrect"});
      } else {
        const userToken = jwt.sign({_id: user._id}, SECRET);
        // console.log("userToken", userToken);
        res
          .status(201)
          .cookie("userToken", userToken, {
            httpOnly: true,
            expires: new Date(Date.now()),
          })
          .json({});
        console.log("the user is logged in");
      }
    } catch (error) {
      res.status(401).json({errorMessage: "email or password is incorrect"});
      // console.log("error", error);
    }
  },

  // check if the user is logged in
  isLoggedIn: async (req, res) => {
    // console.log("is logged", req.cookies);
    res.json({message: "ok", active: true});
  },

  // logout
  logOutUser: (req, res) => {
    res.clearCookie("userToken");
    res.json({message: "Usuario salio", active: false});
  },
};
