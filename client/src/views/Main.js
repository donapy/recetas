import Navibar from "../components/Navbar";
// import SweetWhimsicalColors from "../components/Colors";
import SearchBar from "../components/SearchBar";
// import ListRecipes from "../components/ListRecipes";
// import { useState } from "react";

function Main() {
  //const [searchResults, setSearchResults] = useState([]);

  // const handleSearch = (term) => {
  //   setSearchResults(term);
  // };
  return (
    <div>
      <Navibar />
      {/* <SweetWhimsicalColors /> */}
      {/* <SearchBar onSearch={handleSearch} /> */}
      <SearchBar />
      {/* <ListRecipes searchResults={searchResults} /> */}
    </div>
  );
}

export default Main;
