import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Toast, Card, Alert } from "flowbite-react";
import full from "../assets/full.png";
import wide from "../assets/wide.png";
import axios from "axios";
import {
  HiExclamation,
  HiInformationCircle,
  HiCheckCircle,
} from "react-icons/hi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const [alerta, setAlerta] = useState(0);
  const [errorloguin, setErrorloguin] = useState("");

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
        setAlerta(200);

        setTimeout(() => {
          navigate(`/`);
        }, 1500);
      }
    } catch (error) {
      setAlerta(404);
      setErrorloguin(error.response.data.message);
      // error.response; //&& alert(error.response.data.message);
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
      <div class="flex flex-col md:flex-row items-center h-screen mx-auto py-auto">
        <div class="w-full md:w-1/2">
          <div className="w-2/3 mx-auto ">
            <img
              className="hidden w-full mx-auto md:block"
              src={full}
              alt="logo"
            />
            <img className="w-full mx-auto md:hidden" src={wide} alt="logo" />
          </div>
        </div>
        <div class="md:w-full lg:w-1/2 mx-auto">
          <Card className="md:w-2/3 lg:max-w-sm text-center">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center my-4">Log In</h1>
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
                className="mx-auto w-3/4 font-semibold my-4"
                type="submit"
              >
                Log In
              </Button>

              {alerta === 0 ? (
                <div></div>
              ) : alerta === 200 ? (
                <Alert color="success" icon={HiCheckCircle}>
                  <span>
                    <span className="font-medium">Login Successful!! </span> You
                    will be redirected ...
                  </span>
                </Alert>
              ) : (
                <Alert color="failure" icon={HiInformationCircle}>
                  <span>
                    <span className="font-medium">{errorloguin}</span>
                  </span>
                </Alert>
              )}
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
