import Navibar from "../components/Navbar";
import UserRecipes from "../components/UserRecipes";

function MyRecipes() {
  return (
    <div>
      <Navibar />
      <br />
      <h1 className="font-bold text-3xl text-center py-4">My Recipes</h1>
      <UserRecipes />
    </div>
  );
}

export default MyRecipes;
