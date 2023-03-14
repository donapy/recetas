const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us the name of this recipe"],
  },
  image: {
    type: String,
    required: true,
  },
  portions: {
    type: Number,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: [true, "Please tell us how long this recipe takes to cook"],
  },
  importantIngredients: {
    type: [String],
    required: true,
  },
  secondaryIngredients: {
    type: [String],
  },
  steps: {
    type: [String],
    required: true,
  },
  tags: {
    type: [String],
    enum: [
      "breakfast",
      "lunch",
      "dinner",
      "dessert",
      "appetizer",
      "snack",
      "drink",
      "sauce",
      "side dish",
      "soup",
      "salad",
      "vegan",
      "vegetarian",
      "gluten free",
      "dairy free",
      "paleo",
      "keto",
      "whole30",
      "low carb",
    ],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
