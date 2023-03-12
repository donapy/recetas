import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const isLogged = true;

  const navigate = new useNavigate();

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
