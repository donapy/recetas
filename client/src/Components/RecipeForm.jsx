import { useState } from "react";
import axios from "axios";
import { TextInput, Label, Button, Card, Textarea } from "flowbite-react";
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
    <Card className="max-w-screen-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label className="font-bold" htmlFor="title" value="Title" />
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
            <Label className="font-bold" htmlFor="image" value="Image" />
          </div>
          <TextInput
            id="image"
            type="text"
            placeholder="Show us your food!"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label className="font-bold" htmlFor="servings" value="Servings" />
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
            <Label
              className="font-bold"
              htmlFor="cookTime"
              value="Cooking Time in minutes"
            />
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
              className="font-bold"
              htmlFor="importantIngredients"
              value="Core Ingredients"
            />
          </div>
          {importantIngredients?.map((ingredient, index) => (
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
              className="font-bold"
              htmlFor="secondaryIngredients"
              value="Other Ingredients"
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
            <Label
              className="font-bold"
              htmlFor="steps"
              value="How to make it"
            />
          </div>
          <Textarea
            id="steps"
            type="textarea"
            placeholder="Tell us how to make it!"
            required={true}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>
        <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label className="font-bold" htmlFor="tags" value="Tags" />
          </div>
          <TextInput
            id="tags"
            type="text"
            placeholder="List your tags here separated by commas"
            required={true}
            value={tags.join(", ")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
          />
        </div>
        {/* <div className="text-1xl pb-2">
          <div className="mb-1 block">
            <Label className="font-bold" htmlFor="tags" value="Tags" />
          </div>
          <TextInput
            id="tags"
            type="text"
            placeholder="List your tags here separated by commas"
            required={true}
            onChange={(e) => setTags(e.target.value)}
          />
        </div> */}
        <div className="text-1xl pb-2">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default RecipeForm;
