import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Badge, Alert } from "flowbite-react";
import Loading from "./Loading";
import Navibar from "./Navbar";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";

function ShowSearchRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [alerta, setAlerta] = useState(0);
  const [disable, setDisable] = React.useState(false);

  const {
    data: recipe,
    isLoading,
    //isError,
  } = useQuery(["showRecipe"], async () => {
    let data = await fetchListRecipes();
    console.log(data);
    return data;
  });

  const fetchListRecipes = async () => {
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

  const handleAddFav = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/user/saveNewRecipe",
        { id },
        { withCredentials: true }
      );
      if (result.status === 200) {
        // alert("Added Recipe to Favorites");
        // navigate("/saved-recipes");
        setAlerta(200);

        setDisable(true);

        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      }
    } catch (error) {
      setAlerta(404);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navibar />
      <Card className="max-w-screen-md mx-auto mt-3">
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white text-center">
          {recipe.name}
        </h1>
        <img src={recipe.image} alt={recipe.name} className="rounded-lg" />
        <p className="font-bold text-lg">
          Servings: {recipe.portions} portions
        </p>
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

        {alerta === 0 ? (
          <div></div>
        ) : alerta === 200 ? (
          <Alert color="success" icon={HiCheckCircle} withBorderAccent={true}>
            <span>
              <span className="font-medium"> Added Recipe to Favorites ! </span>{" "}
              You will be redirected ...
            </span>
          </Alert>
        ) : (
          <>
            <div></div>
            <Alert color="failure" icon={HiInformationCircle}>
              <span>
                <span className="font-medium">
                  {" "}
                  Something went wrong, try again!
                </span>
              </span>
            </Alert>
          </>
        )}

        <Button
          color="success"
          className="lg:w-1/3 mx-auto"
          //onClick={() => Navigate("/my-recipes/Favorite/" + id)}
          onClick={handleAddFav}
          disabled={disable}
        >
          Save Recipe
        </Button>
      </Card>
    </>
  );
}

export default ShowSearchRecipe;
