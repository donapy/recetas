const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipes.model");
const upload = require("../configs/multer.config");

// @desc    New Recipe with Multer
// @route   GET /api/recipe/newRecipe
// @access  Private
const newRecipe = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const {
      name,
      //image, ???
      portions,
      cookingTime,
      importantIngredients,
      secondaryIngredients,
      steps,
      tags,
    } = req.body;

    // use multer to upload the image
    upload.single("image")(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      await Recipe.create({
        name,
        //image, ???
        portions,
        cookingTime,
        importantIngredients,
        secondaryIngredients,
        steps,
        tags,
        // save the image name in the database
        image: req.file.filename,
        //_user: req.params.id,
        _user: req.params.id,
      })
        .then((newRecipe) => res.json(newRecipe))
        .catch((err) => {
          console.log(err);
          res.status(500).json({ message: "Something went wrong", error: err });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    New Recipe without Multer
// @route   GET /api/recipe/newRecipe2
// @access  Private
const newRecipe2 = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const {
      name,
      image,
      portions,
      cookingTime,
      importantIngredients,
      secondaryIngredients,
      steps,
      tags,
    } = req.body;

    const recipe = await Recipe.create({
      name,
      image,
      portions,
      cookingTime,
      importantIngredients,
      secondaryIngredients,
      steps,
      tags,
      user: id,
    });

    if (recipe) {
      return res.status(201).json({
        success: true,
        _id: recipe.id,
      });
    } else {
      return res
        .status(400)
        .send({ message: "Error creating the recipe, try again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Get Recipes
// @route   GET /api/recipe/getRecipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Get Recipe
// @route   GET /api/user/getRecipe/:id
// @access  Public
const getRecipe = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.find({ _id: req.params.id });

    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Get My Recipes
// @route   GET /api/user/getMyRecipes/
// @access  Private
const getMyRecipes = asyncHandler(async (req, res) => {
  try {
    const { id: iduser } = req.user;
    console.log(id);
    const recipe = await Recipe.find({ user: iduser });

    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Update Recipe
// @route   PUT /api/recipe/updateRecipe/:id
// @access  Private
const updateRecipe = asyncHandler(async (req, res) => {
  try {
    const { id: iduser } = req.user;
    const id = req.params.id;

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      res.status(400).json({ message: "Recipe not found" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params, req.body, {
      new: true,
    });

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Delete Recipe
// @route   DELETE /api/recipe/deleteRecipe/:id
// @access  Private
const deleteRecipe = asyncHandler(async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params);

    if (!recipe) {
      res.status(400).json({ message: "Recipe not found" });
    }

    await recipe.remove();

    res.status(200).json({ id: req.params });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

// @desc    Get Like Recipes for Search Recipes
// @route   POST /api/recipe/getLikeRecipes
// @access  Public
const getLikeRecipes = asyncHandler(async (req, res) => {
  try {
    let search = req.body.search;
    // console.log(search);
    // search.length === 0 && (search = "c");
    // console.log(search);
    const recipes = await Recipe.find({
      name: { $regex: search, $options: "i" },
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Error" });
  }
});

module.exports = {
  newRecipe,
  newRecipe2,
  getRecipes,
  getRecipe,
  getMyRecipes,
  updateRecipe,
  deleteRecipe,
  getLikeRecipes,
};
