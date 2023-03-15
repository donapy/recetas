// import {useState} from "react";
import Navibar from "../components/Navbar";
import EditForm from "../components/EditForm";
import Loading from "../components/Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function EditRecipe() {
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Edit Recipe
        </h1>
        <br />
        <EditForm />
      </>
    );
  }
}

export default EditRecipe;
