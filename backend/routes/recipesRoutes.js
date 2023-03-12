const express = require("express");
const router = express.Router();
const {
  newRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipesController-Diana");

const { protect } = require("../middlewares/authMiddleware");

router.get("/getRecipes", getRecipes);

router.get("/getRecipe/:id", getRecipe);

router.post("/newRecipe", newRecipe);

router.put("/updateRecipe/:id", updateRecipe);

router.delete("/deleteRecipe/:id", deleteRecipe);

module.exports = router;
