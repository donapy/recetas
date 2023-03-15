//import React, { useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Badge } from "flowbite-react";
import Loading from "./Loading";

function ShowRecipe() {
  //const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const Navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/api/user/getRecipe/" + id)
  //     .then((response) => {
  //       console.log(response.data);
  //       setRecipe(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);

  const {
    data: recipe,
    isLoading,
    //isError,
  } = useQuery(["showRecipe"], async () => {
    let data = await fetchListaUsuarios();
    console.log(data);
    return data;
  });

  const fetchListaUsuarios = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8000/api/recipe/getRecipe/" + id
      );
      // console.log(`Datos: ${result.data}`);
      return result.data[0];
    } catch (error) {
      return error;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card className="max-w-screen-md mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white text-center">
        {recipe.name}
      </h1>
      <img src={recipe.image} alt={recipe.name} className="rounded-lg" />
      <p className="font-bold text-lg">Servings: {recipe.portions} portions</p>
      <p className="font-bold text-lg">
        Cooking Time: {recipe.cookingTime} minutes
      </p>
      <div>
        <h2 className="text-lg font-bold">Core ingredients</h2>
        <p> These are the ingredients that make this recipe magical!</p>
        <ul>
          {recipe.importantIngredients?.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">Secondary ingredients</h2>
        <p> These are funtamental for the flavors</p>
        <ul>
          {recipe.secondaryIngredients?.map((ingredient, index) => {
            return <li key={index}>{ingredient}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">How to make it</h2>
        <ul>
          {recipe.steps?.map((step, index) => {
            return <li key={index}>{step}</li>;
          })}
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold">Tags:</h2>
        <Badge color="success" size="sm" className="lg:w-1/12">
          <ul className="text-center">
            {recipe.tags?.map((tag, index) => {
              return <li key={index}>{tag}</li>;
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
