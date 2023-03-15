import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Navibar from "../components/Navbar";
import SavedByUser from "../components/SavedRecipes";

const SavedRecipes = () => {
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
        <h1 className="text-3xl font-bold text-center">Saved Recipes</h1>
        <br />
        <SavedByUser />
      </div>
    );
  }
};

export default SavedRecipes;
