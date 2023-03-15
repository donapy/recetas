import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Navbar} from "flowbite-react";
import icon from "../assets/icon.png";

export const Navibar = () => {
  const [isLogged, setIsLogged] = useState(true);
  const navigate = useNavigate();

  function handleClick() {
    setIsLogged(false);
    setTimeout(() => {
      navigate(`/`);
    }, 2000);
  }

  if (isLogged) {
    return (
      <>
        {/* Logueado */}
        <Navbar fluid={true} rounded={false} className="my-navbar">
          <Navbar.Brand href="/">
            <img src={icon} className="mr-3 icon" alt="CC icon" />
            <span className="self-center whitespace-nowrap font-bold dark:text-white">
              Cauldron Cuisine
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link className="nav-text" href="/my-recipes">
              My Recipes
            </Navbar.Link>
            <Navbar.Link className="nav-text" href="/recipes/new">
              New Recipe
            </Navbar.Link>
            <Navbar.Link className="nav-text" href="/saved-recipes">
              Saved Recipes
            </Navbar.Link>
            <Navbar.Link className="nav-text" onClick={handleClick}>
              Log Out
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  } else {
    return (
      <>
        {/* No Logueado */}
        <Navbar fluid={true} rounded={false} className="my-navbar">
          <Navbar.Brand href="/">
            <img src={icon} className="mr-3 icon" alt="CC icon" />
            <span className="self-center whitespace-nowrap font-bold dark:text-white">
              Cauldron Cuisine
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link className="nav-text" href="/register">
              Register
            </Navbar.Link>
            <Navbar.Link className="nav-text" href="/login">
              Log In
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
};

export default Navibar;
