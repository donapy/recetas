import React, { useState } from "react";
// import {useNavigate} from "react-router-dom";
import axios from "axios";
import { TextInput, Button } from "flowbite-react";
import ListRecipes from "./ListRecipes";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //   const navigate = useNavigate();

  //console.log(searchResults);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:8000/api/recipe/getLikeRecipes`, {
        search: searchTerm,
      })
      .then((response) => {
        //props.onSearch(response.data);
        //console.log(response.data);
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form
        className="search-bar flex gap-4 justify-center mx-auto py-6"
        onSubmit={handleSubmit}
      >
        <TextInput
          className="min-w-fit"
          id="searchbar"
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={handleChange}
        />
        <Button type="submit" className="text-lg font-bold" color="success">
          Search
        </Button>
      </form>
      <ListRecipes searchResults={searchResults} />
    </>
  );
};

export default SearchBar;
