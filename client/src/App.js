import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Main from "./views/Main";
import Recipe from "./views/Recipe";
import SavedRecipes from "./views/SavedRecipes";
import MyRecipes from "./views/MyRecipes";
import NewRecipe from "./views/NewRecipe";
import EditRecipe from "./views/EditRecipe";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        {/* // page to display a single recipe - view */}
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        {/* // page to display all recipes saved by the logged in user - view */}
        <Route path="/my-recipes" element={<MyRecipes />} />
        {/* // page to display all recipes created by the logged in user - view */}
        <Route path="/recipes/new" element={<NewRecipe />} />
        {/* // page to create a new recipe -view */}
        <Route path="/my-recipes/edit/:id" element={<EditRecipe />} />
        {/* // page to edit a recipe - view */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
