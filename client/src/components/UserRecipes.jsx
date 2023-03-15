import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal } from "flowbite-react";

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const [disable, setDisable] = useState(false);
  const [setAlerta] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recipe/getMyRecipes/", {
        withCredentials: true,
      })
      .then((response) => {
        // if (response.data.deleteStatus !== true) {
        setRecipes(response.data);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDelete = async (id) => {
    // let confirm = window.confirm(
    //   "Are you sure you want to delete this recipe?"
    // );
    // if (confirm) {
    try {
      const response = await axios.delete(
        "http://localhost:8000/api/recipe/deleteRecipe/" + id,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
        // response.data.deleteStatus = true;
        // alert("Recipe deleted");
        setDisable(false);

        setAlerta(200);

        setTimeout(() => {
          navigate(`/`);
        }, 1500);
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
    // }
  };

  const modal = (valor) => {
    valor === "Cancelar" ? setDisable(false) : setDisable(true);
  };

  return (
    <div className="max-w-lg items-center mx-auto">
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          {/* <Link to={`/recipes/${recipe._id}`}> */}
          <Card
            horizontal={true}
            imgSrc={recipe.image}
            alt={recipe.name}
            className="my-4"
          >
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {recipe.name}
            </h2>

            <p className="font-normal text-gray-700 dark:text-gray-400">
              Principal Ingredients:
              <span className="font-bold">
                {recipe.importantIngredients.join(", ")}
              </span>
            </p>
            {/*               <Rating>
                  <Rating.Star />
                  <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                    4.7
                  </p>
                  <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                  >
                    12 reviews
                  </a>
                </Rating> */}

            <Link to={`/my-recipes/edit/${recipe._id}`}>
              <Button color="success" className="w-full">
                Edit
              </Button>
            </Link>
            <React.Fragment>
              <Button
                color="failure"
                //onClick={() => handleDelete(recipe._id)}
                onClick={modal}
                //onClick={() => handleDelete(recipe._id)}
              >
                Delete
              </Button>

              <Modal
                show={disable}
                size="md"
                popup={true}
                onClose={() => modal("Cancelar")}
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this product?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        color="failure"
                        onClick={() => handleDelete(recipe._id)}
                      >
                        Yes, I'm sure
                      </Button>
                      <Button color="gray" onClick={() => modal("Cancelar")}>
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </React.Fragment>
          </Card>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
};

export default UserRecipes;
