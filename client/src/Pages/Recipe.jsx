import React from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const Recipe = () => {
  let { id } = useParams();

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery(["recipe"], async () => {
    let data = await fetchRecipe();
    // console.log(data);
    return data;
  });

  const fetchRecipe = async () => {
    try {
      const result = await Axios.get("http://localhost:8000/api/recipes/" + id);
      console.log(`Datos: ${result.data}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <img
          src="https://i.giphy.com/media/8L0Pky6C83SzkzU55a/200w.gif"
          alt="error"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="loading"
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3>{recipe.name}</h3>
        <button>GUARDAR</button>
      </div>
      <div>
        <div>
          <img
            src={recipe.image}
            alt="imgrecipe"
            style={{
              width: "200px",
            }}
          />
          <p>Preparacion: {recipe.cookingTime}</p>
          <p>
            Porciones: <button>+</button> 0 <button>-</button>{" "}
          </p>
          <p>Calificar / Calificacion: {/* recipe.??? */}</p>
          <p>Tags : {/* item.tags */}</p>
        </div>
        <div>
          <h4>Ingredientes:</h4>
          <p>{/* item.importantIngredients ??? item.secondaryIngredients */}</p>
          <h4>Preparacion:</h4>
          <p> {/* item.steps */}</p>
        </div>
      </div>
    </div>
  );
};
