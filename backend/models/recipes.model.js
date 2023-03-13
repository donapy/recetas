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
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    // enum: [
    //   "breakfast",
    //   "lunch",
    //   "dinner",
    //   "dessert",
    //   "snack",
    //   "vegan",
    //   "lactose-free",
    //   "gluten-free",
    //   "vegetarian",
    //   "paleo",
    //   "low-carb",
    //   "low-fat",
    //   "low-calorie",
    //   "high-protein",
    //   "high-fiber",
    //   "high-carb",
    //   "high-fat",
    //   "high-calorie",
    //   "low-protein",
    //   "low-fiber",
    //   "keto",
    //   "pescetarian",
    //   "soy-free",
    //   "mediterranean",
    // ],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
