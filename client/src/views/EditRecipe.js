// import {useState} from "react";
import Navibar from "../components/Navbar";
import EditForm from "../components/EditForm";

function EditRecipe() {
  return (
    <>
      <Navibar />
      <br />
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        Edit Recipe
      </h1>
      <br />
      <EditForm />
    </>
  );
}

export default EditRecipe;
