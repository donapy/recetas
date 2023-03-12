import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const Homepage = () => {
  const navigate = new useNavigate();
  const {
    data: listRecipes,
    isLoading,
    isError,
    refetch,
  } = useQuery(["listrecipes"], async () => {
    let data = await fetchListRecipes();
    // console.log(data);
    return data;
  });

  const fetchListRecipes = async () => {
    try {
      const result = await Axios.get("http://localhost:8000/api/recipes");
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
      <div>Cauldron Cuisine</div>
      <div>{/* LOGO - BUSCADOR */}</div>
      <div>{/* FILTROS */}</div>
      <div>
        {/* MAPEO DE DATOS DE LA BD */}
        {listRecipes.map((item, key) => {
          return (
            <div key={key}>
              <div>
                <img
                  src={item.image}
                  alt="imgrecipe"
                  style={{
                    width: "200px",
                  }}
                />
              </div>
              <div>
                <h3>{item.name}</h3>
                <p>Tags : {/* item.tags */}</p>
                <p>Preparacion: {item.cookingTime}</p>
                <p>Calificacion: {/* item.??? */}</p>
                <p>
                  Ingredientes:
                  {/* mapear item.importantIngredients y item.secondaryIngredients */}
                </p>
              </div>
              <div>
                <button onClick={() => navigate("/recipes/" + item._id)}>
                  VER
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
