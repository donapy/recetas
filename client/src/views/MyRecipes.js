import Navibar from "../components/Navbar";
import UserRecipes from "../components/UserRecipes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

function MyRecipes() {
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
        <h1 className="font-bold text-3xl text-center py-4">My Recipes</h1>
        <UserRecipes />
      </div>
    );
  }
}

export default MyRecipes;
