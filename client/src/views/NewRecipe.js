import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navibar from "../components/Navbar";
import RecipeForm from "../components/RecipeForm";

function NewRecipe() {
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
      <div>
        <Navibar isLogged={logged} />
        <br />
        <h1 className="text-2xl font-bold text-center py-4">Add a Recipe</h1>
        <br />
        <RecipeForm />
      </div>
    );
  }
}

export default NewRecipe;
