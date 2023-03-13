import React, {useState} from "react";
// import {useNavigate} from "react-router-dom";
import axios from "axios";
import {TextInput, Button} from "flowbite-react";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  //   const navigate = useNavigate();

  console.log(searchResults);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`/api/recipes/search/${searchTerm}`)
      .then((response) => {
        props.onSearch(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form
        className="search-bar flex gap-4 justify-center mx-auto"
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
    </>
  );
};

export default SearchBar;
