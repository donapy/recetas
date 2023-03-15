import Navibar from "../components/Navbar";
// import SweetWhimsicalColors from "../components/Colors";
import SearchBar from "../components/SearchBar";
// import ListRecipes from "../components/ListRecipes";
// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";

function Main() {
  //const [searchResults, setSearchResults] = useState([]);

  const {
    data: logged,
    isLoading,
    //isError,
    //refetch,
  } = useQuery(["getLoggInfo"], async () => {
    let data = await fetchLogged();
    //console.log(data);
    return data;
  });

  const fetchLogged = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8000/api/user/isLogged",
        { withCredentials: true }
      );
      //console.log(`InfoLogged: ${result.data}`);
      return result.data;
    } catch (error) {
      return { active: false };
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Navibar isLogged={logged} />
      {/* <SweetWhimsicalColors /> */}
      {/* <SearchBar onSearch={handleSearch} /> */}
      <SearchBar />
      {/* <ListRecipes searchResults={searchResults} /> */}
    </div>
  );
}

export default Main;
