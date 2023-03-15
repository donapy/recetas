// this component is the main component in the saved recipes page. It is a child of the SavedRecipes component. It is responsible for displaying the saved recipes of the user.

import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Card, Button, Rating} from "flowbite-react";

const SavedByUser = () => {
  // Mostrar todas las recetas guardadas por el usuario
  const recipes = [
    {
      _id: 1,
      name: "Pasta with tomato sauce",
      image:
        "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/75c25eb5538b4b3c91fdf71e747c1e84/BFV44742_PantryPasta_FB_Final.jpg",
      importantIngredients: ["pasta", "tomato sauce"],
      rating: 4.5,
    },
    {
      _id: 2,
      name: "Ceasar salad",
      image:
        "https://amandacooksandstyles.com/wp-content/uploads/2021/04/20210329_173814.jpg",
      importantIngredients: [
        "lettuce",
        "chicken",
        "croutons",
        "caesar dressing",
      ],
      rating: 4.3,
    },
  ];

  return (
    <>
      <div className="max-w-lg items-center mx-auto">
        {recipes.map((recipe) => (
          <div key={recipe._id}>
            <Card
              horizontal={true}
              imgSrc={recipe.image}
              alt={recipe.name}
              className="my-4"
            >
              <Link to={`/recipes/${recipe._id}`}>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {recipe.name}
                </h2>
              </Link>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Principal Ingredients:
                <span className="font-bold">
                  {recipe.importantIngredients.join(", ")}
                </span>
              </p>
              <Rating>
                <Rating.Star />
                <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                  {recipe.rating}
                </p>
                <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                <a
                  href="#"
                  className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                >
                  no reviews yet
                </a>
              </Rating>
              <Button color="success" onClick="#">
                Go to Recipe
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedByUser;
