import React, { useState } from "react";
// import {useNavigate} from "react-router-dom";
import axios from "axios";
import { TextInput, Button } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import ListRecipes from "./ListRecipes";
import Loading from "./Loading";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = useState([]);
  //   const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  //console.log(searchResults);
  const {
    data: recipes,
    isLoading,
    //isError,
    refetch,
  } = useQuery(["listRecipesMain"], async () => {
    let data = await fetchListaRecipes();
    //console.log(data);
    return data;
  });

  const fetchListaRecipes = async () => {
    try {
      const result = await axios.post(
        `http://localhost:8000/api/recipe/getLikeRecipes`,
        {
          search: searchTerm,
        }
      );
      // console.log(`Datos: ${result.data}`);
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const handleRefetch = (event) => {
    event.preventDefault();
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post(`http://localhost:8000/api/recipe/getLikeRecipes`, {
  //       search: searchTerm,
  //     })
  //     .then((response) => {
  //       //props.onSearch(response.data);
  //       //console.log(response.data);
  //       setSearchResults(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <form
        className="search-bar flex gap-4 justify-center mx-auto py-6"
        //onSubmit={handleSubmit}
        onSubmit={handleRefetch}
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
      {/* <ListRecipes searchResults={searchResults} /> */}
      <ListRecipes searchResults={recipes} />
    </>
  );
};

export default SearchBar;
