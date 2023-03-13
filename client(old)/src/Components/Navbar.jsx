import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = new useNavigate();
  const { data, isLoading, isError } = useQuery(["isLogged"], async () => {
    let data = await fetchLogginStatus();
    // console.log(data);
    return data;
  });

  const fetchLogginStatus = async () => {
    try {
      const result = await Axios.get(
        "http://localhost:8000/api/user/isLogged",
        {
          withCredentials: true,
        }
      );
      console.log(result);
      if (result.status === 200) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      return result.data;
    } catch (error) {
      setIsLogged(false);
      return false;
    }
  };

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <img
          src="https://i.giphy.com/media/8L0Pky6C83SzkzU55a/200w.gif"
          alt="error"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="loading"
        />
      </div>
    );
  }

  if (isLogged) {
    return (
      <>
        {/* Logueado */}
        <div className="navbar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1939/1939873.png"
            alt="logo"
            style={{
              width: "40px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <button onClick={() => navigate("recipes/saved")}>
            RECETAS GUARDADAS
          </button>
          <button onClick={() => navigate("myrecipes/new")}>
            CREAR RECETA
          </button>
          <button
            onClick={() => navigate("myrecipes/edit/640a89b18734d5a8c2b92cd1")}
          >
            MIS RECETAS
          </button>
          <button onClick={() => navigate("/")}>LOG OUT</button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* No Logueado */}
        <div className="navbar">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1939/1939873.png"
            alt="logo"
            style={{
              width: "40px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <button onClick={() => navigate("/register")}>REGISTER</button>
          <button onClick={() => navigate("/login")}>LOG IN</button>
        </div>
      </>
    );
  }
};
