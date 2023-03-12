const Recipe = require("../models/recipes.model");
const upload = require("../configs/multer.config");

module.exports = {
  // Create a new recipe
  createRecipe: (req, res) => {
    const {
      title,
      description,
      cookTime,
      prepTime,
      servings,
      importantIngredients,
      secondaryIngredients,
      steps,
      tags,
    } = req.body;

    // use multer to upload the image
    upload.single("image")(req, res, function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      Recipe.create({
        title,
        description,
        cookTime,
        prepTime,
        servings,
        importantIngredients,
        secondaryIngredients,
        steps,
        tags,
        // save the image name in the database
        image: req.file.filename,
        _user: req.params.id,
      })
        .then((newRecipe) => res.json(newRecipe))
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Something went wrong", error: err });
        });
    });
  },

  // Get all recipes
  getAllRecipes: (req, res) => {
    Recipe.find()
      .then((allRecipes) => res.json(allRecipes))
      .catch((err) => res.json(err));
  },

  // Get one recipe
  getOneRecipe: (req, res) => {
    Recipe.findOne({ _id: req.params.id })
      .then((oneRecipe) => res.json(oneRecipe))
      .catch((err) => res.json(err));
  },

  // Update a recipe
  updateRecipe: (req, res) => {
    // if there is a new image uploaded, update the recipe with the new image
    if (req.file) {
      Recipe.findOneAndUpdate(
        { _id: req.params.id },
        // update the image filename
        { ...req.body, image: req.file.filename },
        { new: true, runValidators: true }
      )
        .then((updatedRecipe) => res.json(updatedRecipe))
        .catch((err) => res.status(400).json(err));
    } else {
      // if no new image was uploaded, update the recipe without changing the image
      Recipe.findOneAndUpdate(
        { _id: req.params.id },
        // don't update the image
        req.body,
        { new: true, runValidators: true }
      )
        .then((updatedRecipe) => res.json(updatedRecipe))
        .catch((err) => res.status(400).json(err));
    }
  },

  // Delete a recipe
  deleteRecipe: (req, res) => {
    Recipe.deleteOne({ _id: req.params.id })
      .then((deleteConfirmation) => res.json(deleteConfirmation))
      .catch((err) => res.json(err));
  },
};
