const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/users.model");

// @desc    Get User
// @route   GET /api/user/getUser/
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    //console.log(id);
    const user = await User.find(id, { password: 0 });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Get Users
// @route   POST /api/user/getUsers
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Create User
// @route   POST /api/user/newUser
// @access  Public
const newUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "Error, the user/email already exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        success: true,
        _id: user.id,
      });
    } else {
      return res
        .status(400)
        .send({ message: "Error creating the user, try again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Update User
// @route   PUT /api/user/updateUser/
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    //console.log(id);
    const user = await User.findById(id, { password: 0 });

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Delete User
// @route   DELETE /api/user/deleteUser/
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    //console.log(id);
    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    await user.remove();

    res.status(200).json({ id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Login User
// @route   POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }, {});

    //check password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await generateToken(user.id);
      // res.cookie("token", token, { httpOnly: true });
      return res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(
            Date.now() + 1500 * 60 * 60 * parseInt(process.env.JWT_EXPIRES_IN)
          ),
        })
        .json({
          // success: true,
          token,
          // _id: user._id,
          // fullname: user.fullname,
          // email: user.email,
        });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    isLogged User
// @route   GET /api/user/isLogged
// @access  Private
const isLogged = asyncHandler(async (req, res) => {
  try {
    res.status(200).json({ active: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    logOut User
// @route   GET /api/user/logOut
// @access  Private
const logOut = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ active: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    GetSavedRecipes User
// @route   GET /api/user/getSavedRecipes
// @access  Private
const getSavedRecipes = asyncHandler(async (req, res) => {
  try {
    const iduser = req.user._id;
    const user = await User.findById(iduser, {
      _id: 0,
      name: 0,
      password: 0,
      email: 0,
    }).populate("savedrecipes");
    //console.log(`id: ${iduser}\nUserData: ${user}`);
    res.status(200).json(user.savedrecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    saveNewRecipe User
// @route   POST /api/user/saveNewRecipe
// @access  Private
const saveNewRecipe = asyncHandler(async (req, res) => {
  try {
    const iduser = req.user._id;
    //console.log(iduser);
    const user = await User.findById(iduser, { id: 0, password: 0 });
    if (user.savedrecipes.includes(req.body.id)) {
      res.status(200).json({ message: "Recipe is already saved" });
    } else {
      user.savedrecipes.push(req.body.id);
      //console.log(user);
      const updatedUser = await User.findByIdAndUpdate(iduser, user, {
        new: true,
      });
      if (updatedUser) {
        res.status(200).json({ message: "Saved Recipe" });
      } else {
        res.status(400).json({
          message: "Error trying to save the Recipe",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    deleteSavedRecipe User
// @route   POST /api/user/deleteSavedRecipe
// @access  Private
const deleteSavedRecipe = asyncHandler(async (req, res) => {
  try {
    const iduser = req.user._id;
    //console.log(iduser);
    const user = await User.findById(iduser, { id: 0, password: 0 });
    if (user.savedrecipes.includes(req.body.id)) {
      let newArr = [];
      for (let i = 0; i < user.savedrecipes.length; i++) {
        if (req.body.id != user.savedrecipes[i]) {
          newArr.push(user.savedrecipes[i]);
        }
      }
      user.savedrecipes = newArr;
      const updatedUser = await User.findByIdAndUpdate(iduser, user, {
        new: true,
      });
      if (updatedUser) {
        res.status(200).json({ message: "Saved Recipe was deleted" });
      } else {
        res.status(400).json({
          message: "Error trying to delete the saved recipe",
        });
      }
    } else {
      res.status(400).json({
        message: "The user doesnt have this recipe saved",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  getUser,
  newUser,
  updateUser,
  deleteUser,
  loginUser,
  getUsers,
  isLogged,
  logOut,
  getSavedRecipes,
  saveNewRecipe,
  deleteSavedRecipe,
};
