import { Card, Button, Rating } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const ListRecipes = (props) => {
  console.log(props.searchResults);
  return (
    <>
      <div className="max-w-lg items-center mx-auto">
        {props.searchResults.map((recipe) => (
          <div key={recipe._id}>
            <Link
              to={`/recipeSearch/${recipe._id}`}
            >
              <Card
                horizontal={true}
                imgSrc={recipe.image}
                alt={recipe.name}
                className="my-4 w-1/"
              >
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{recipe.name}</h2>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Principal Ingredients:
                  <span className="font-bold">
                    {recipe.importantIngredients.join(", ")}
                  </span>
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Recipe by: {recipe.user.name}
                </p>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListRecipes;
