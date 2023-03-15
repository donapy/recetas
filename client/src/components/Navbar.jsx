import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "flowbite-react";
import mini_wide from "../assets/mini_wide.png";
import axios from "axios";

export const Navibar = (props) => {
  //const [isLogged, setIsLogged] = useState(props.isLogged.active);
  const navigate = useNavigate();
  //console.log(props.isLogged);
  const handleClick = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/user/logOut", {
        withCredentials: true,
      });
      if (result.status === 200) {
        //setIsLogged(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }

    // setIsLogged(false);
    // setTimeout(() => {
    //   navigate(`/`);
    // }, 2000);
  };

  if (props.isLogged.active === true) {
    return (
      <>
        {/* Logueado */}
        <Navbar fluid={true} rounded={false} className="my-navbar">
          <Navbar.Brand href="/">
            <img src={mini_wide} className="mr-3 icon" alt="CC icon" />
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
            <img src={mini_wide} className="mr-3 icon" alt="CC icon" />
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
