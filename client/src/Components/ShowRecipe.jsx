import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, Badge } from "flowbite-react";

function ShowRecipe() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/getRecipe/" + id)
      .then((response) => {
        console.log(response.data);
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Card className="max-w-screen-md mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white text-center">
        {recipe.name}
      </h1>
      <img src={recipe.image} alt={recipe.name} className="rounded-lg" />
      <p className="font-bold text-lg">Servings: {recipe.servings} portions</p>
      <p className="font-bold text-lg">
        Cooking Time: {recipe.cookingTime} minutes
      </p>
      <div>
        <h2 className="text-lg font-bold">Core ingredients</h2>
        <p> These are the ingredients that make this recipe magical!</p>
        <ul>
          {recipe.importantIngredients?.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">Secondary ingredients</h2>
        <p> These are funtamental for the flavors</p>
        <ul>
          {recipe.secondaryIngredients?.map((ingredient) => {
            return <li>{ingredient}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">How to make it</h2>
        <ul>
          {recipe.steps?.map((step) => {
            return <li>{step}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">Tags:</h2>
        <Badge color="success" size="sm" className="lg:w-1/12">
          <ul className="text-center">
            {recipe.tags?.map((tag) => {
              return <li>{tag}</li>;
            })}
          </ul>
        </Badge>
      </div>
      <Button
        color="success"
        className="lg:w-1/3 mx-auto"
        onClick={() => Navigate("/my-recipes/edit/" + id)}
      >
        Edit
      </Button>
    </Card>
  );
}

export default ShowRecipe;
