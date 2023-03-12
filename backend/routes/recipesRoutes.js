const express = require("express");
const router = express.Router();
const {
  newRecipe,
  newRecipe2,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes,
  getLikeRecipes,
} = require("../controllers/recipesController");

const { protect } = require("../middlewares/authMiddleware");

router.get("/getRecipes", getRecipes);

router.get("/getRecipe/:id", getRecipe);

router.get("/getMyRecipes", protect, getMyRecipes);

router.post("/getLikeRecipes", getLikeRecipes);

router.post("/newRecipe", protect, newRecipe);

router.post("/newRecipe2", protect, newRecipe2);

router.put("/updateRecipe/:id", protect, updateRecipe);

router.delete("/deleteRecipe/:id", protect, deleteRecipe);

module.exports = router;
