import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:7900/api/recipes")
      .then((response) => {
        console.log(response.data);
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/recipes/${id}`)
      .then((response) => {
        const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
        setRecipes(updatedRecipes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>My Recipes</h1>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          <Link to={`/recipes/${recipe._id}`}>
            <h2>{recipe.title}</h2>
          </Link>
          <p>{recipe.importanIngredients}</p>
          <button onClick={() => handleDelete(recipe._id)}>Delete</button>
          <Link to={`/recipes/${recipe._id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserRecipes;
