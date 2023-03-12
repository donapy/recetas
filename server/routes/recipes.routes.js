const recipeController = require("../controllers/recipes.controllers");
const upload = require("../config/multer.config");
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/recipes", recipeController.getAllRecipes);
  app.get("/api/recipes/:id", recipeController.getOneRecipe);
  app.post(
    "/api/recipes/new/:id",
    authenticate,
    upload.single("image"),
    recipeController.createRecipe
  );
  // app.post("/api/recipes/new/:id", authenticate, recipeController.createRecipe);
  app.put("/api/recipes/:id", authenticate, recipeController.updateRecipe);
  app.delete("/api/recipes/:id", authenticate, recipeController.deleteRecipe);
};
