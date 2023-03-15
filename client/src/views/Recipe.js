import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navibar from "../components/Navbar";
import ShowRecipe from "../components/ShowRecipe";

function RecipeView() {
  const navigate = useNavigate();
  const {
    data: logged,
    isLoading,
    //isError,
    //refetch,
  } = useQuery(["getLoggInfo"], async () => {
    let data = await fetchLogged();
    console.log(data);
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

  if (logged.active === false) {
    navigate("/login");
  } else {
    return (
      <>
        <Navibar isLogged={logged} />
        <br />
        <br />
        <ShowRecipe />
      </>
    );
  }
}

export default RecipeView;
