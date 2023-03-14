import Navibar from "../components/Navbar";
import RecipeForm from "../components/RecipeForm";

function NewRecipe() {
  return (
    <div>
      <Navibar />
      <br />
      <h1 className="text-2xl font-bold text-center py-4">Add a Recipe</h1>
      <br />
      <RecipeForm />
    </div>
  );
}

export default NewRecipe;
