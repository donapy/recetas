import { useState } from "react";
import axios from "axios";
import { TextInput, Label, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [servings, setServings] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [importantIngredients, setImportantIngredients] = useState([]);
  const [secondaryIngredients, setSecondaryIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState([]);

  // const [errors, setErrors] = useState({});
  const Navigate = useNavigate();

  const handleAddImportantIngredient = () => {
    setImportantIngredients([...importantIngredients, ""]);
  };

  const handleImportantIngredientChange = (event, index) => {
    const newImportantIngredients = [...importantIngredients];
    newImportantIngredients[index] = event.target.value;
    setImportantIngredients(newImportantIngredients);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form...");
    axios
      .post(
        " http://localhost:8000/api/recipe/newRecipe2",
        {
          name: title,
          image,
          portions: servings,
          cookingTime: cookTime,
          importantIngredients,
          secondaryIngredients,
          steps,
          tags,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log("Recipe added successfully!");
        Navigate("/");
      })
      .catch((err) => {
        console.log("Error adding recipe!");
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen mx-auto py-auto">
      <form onSubmit={handleSubmit} className="register-container">
        <h1 className="text-2xl font-bold text-center py-4">Add a Recipe</h1>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label htmlFor="title" value="Title" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label htmlFor="image" value="Image" />
          </div>
          <input
            id="image"
            type="url"
            placeholder="Show us your food!"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label htmlFor="servings" value="Servings" />
          </div>
          <TextInput
            id="servings"
            type="number"
            placeholder="Servings"
            required={true}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label htmlFor="cookTime" value="Cook Time" />
          </div>
          <TextInput
            id="cookTime"
            type="number"
            placeholder="Cook Time"
            required={true}
            onChange={(e) => setCookTime(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label
              htmlFor="importantIngredients"
              value="Important Ingredients"
            />
          </div>
          {importantIngredients.map((ingredient, index) => (
            <TextInput
              key={index}
              id="importantIngredients"
              type="text"
              placeholder="Important Ingredient"
              required={true}
              onChange={(e) => handleImportantIngredientChange(e, index)}
            />
          ))}
          <Button type="button" onClick={handleAddImportantIngredient}>
            Add Ingredient
          </Button>
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label
              htmlFor="secondaryIngredients"
              value="Secondary Ingredients"
            />
          </div>
          <TextInput
            id="secondaryIngredients"
            type="text"
            placeholder="salt, pepper, etc."
            required={true}
            onChange={(e) => setSecondaryIngredients(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label htmlFor="steps" value="Steps" />
          </div>
          <TextInput
            id="steps"
            type="text"
            placeholder="Tell us how to make it!"
            required={true}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label htmlFor="tags" value="Tags" />
          </div>
          <TextInput
            id="tags"
            type="text"
            placeholder="List your tags here separated by commas"
            required={true}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;
