import { Card, Button, Rating } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const ListRecipes = (props) => {
  console.log(props.searchResults);
  return (
    <ul>
    {props.searchResults.map((recipe) => (
      <div key={recipe._id} className="flex flex-col items-center">
<Card 
horizontal={true}
imgSrc={recipe.image}
alt={recipe.name}
className="my-4 w-1/2"
>
<Link to={`/recipeSearch/${recipe._id}`} className="max-w-screen-md mx-auto">
  <h2>
    {recipe.name}
  </h2>
</Link>
<p className="font-normal text-gray-700 dark:text-gray-400">
  Principal Ingredients:
  <span className="font-bold">
    {recipe.importantIngredients.join(", ")}
  </span>
</p>

</Card>

</div>
    ))}
  </ul>
  );
};

export default ListRecipes;
