import Navibar from "../components/Navbar";
import SavedByUser from "../components/SavedRecipes";

const SavedRecipes = () => {
  return (
    <div>
      <Navibar />
      <br />
      <h1 className="text-3xl font-bold text-center">Saved Recipes</h1>
      <br />
      <SavedByUser />
    </div>
  );
};

export default SavedRecipes;
