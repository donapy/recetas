import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Toast } from "flowbite-react";
import logo from "../assets/logo.png";
import axios from "axios";
import { HiExclamation } from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = { email, password };
    // axios
    //   .post("http://localhost:8000/api/login", user, {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res);

    const validationErrors = {};
    if (!email) {
      validationErrors.email = { message: "Email is required" };
    }
    if (!password) {
      validationErrors.password = { message: "Password is required" };
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await axios.post(
        `http://localhost:8000/api/user/loginUsuario/`,
        inputs,
        {
          withCredentials: true,
        }
      );
      if (result.status === 200) {
        alert(`Login Successful`);
        navigate("/");
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
    // setErrors({});

    // setTimeout(() => {
    //   navigate(`/`);
    // }, 2000); // wait for 2 seconds before navigating to the main page
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data);
    //     setErrors(err.response.data.errors);
    //   });
  };

  return (
    <>
      <div className="flex justify-evenly items-center h-screen mx-auto py-auto">
        <div>
          <img src={logo} alt="logo" height="300px" />
          <h1 className="font-bold text-4xl"> Cauldron Cuisine</h1>
        </div>
        <form onSubmit={handleSubmit} className="register-container">
          <h1 className="text-2xl font-bold text-center py-4">Log In</h1>
          <div className="text-1xl pb-2">
            <div className="mb-1 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@mail.com"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email ? (
              <div className="space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
                <Toast>
                  <HiExclamation className="h-5 w-5" />
                  <div className="pl-4 text-sm font-normal">
                    {errors.email.message}
                  </div>
                </Toast>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="text-1xl pb-2 pt-2">
            <div className="mb-1 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password ? (
              <div className="space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
                <Toast>
                  <HiExclamation className="h-5 w-5" />
                  <div className="pl-4 text-sm font-normal">
                    {errors.password.message}
                  </div>
                </Toast>
              </div>
            ) : (
              ""
            )}
          </div>
          <Button
            color="success"
            className="mx-auto w-3/4 font-semibold pt-4"
            type="submit"
          >
            Log In
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
