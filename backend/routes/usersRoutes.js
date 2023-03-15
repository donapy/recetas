const express = require("express");
const router = express.Router();
const {
  getUser,
  newUser,
  deleteUser,
  updateUser,
  loginUser,
  getUsers,
  isLogged,
  logOut,
  getSavedRecipes,
  saveNewRecipe,
  deleteSavedRecipe,
} = require("../controllers/usersController");

const { protect } = require("../middlewares/authMiddleware");

router.get("/getUsuarios", protect, getUsers);

router.get("/getUsuario/", protect, getUser);

router.post("/newUsuario", newUser);

router.put("/updateUsuario/", protect, updateUser);

router.delete("/deleteUsuario/", protect, deleteUser);

router.post("/loginUsuario", loginUser);

router.get("/isLogged", protect, isLogged);

router.get("/logOut", protect, logOut);

router.get("/getSavedRecipes", protect, getSavedRecipes);

router.post("/saveNewRecipe", protect, saveNewRecipe);

router.post("/deleteSavedRecipe", protect, deleteSavedRecipe);

module.exports = router;
