import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Card } from "flowbite-react";
import full from "../assets/full.png";
import wide from "../assets/wide.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password, confirmPassword };
    await axios
      .post(
        "http://localhost:8000/api/user/newUsuario",
        newUser //, {withCredentials: true}
      )
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <div class="flex flex-col md:flex-row items-center h-screen mx-auto py-auto">
        <div class="w-full md:w-1/2">
          <div className="w-2/3 mx-auto ">
            <img
              className="hidden w-full mx-auto md:block cursor-pointer"
              src={full}
              alt="logo"
              onClick={() => navigate("/")}
            />
            <img className="w-full mx-auto md:hidden" src={wide} alt="logo" />
          </div>
        </div>
        <div class="md:w-full lg:w-1/2 mx-auto">
          <Card className="md:w-2/3 lg:max-w-sm text-center">
            <form onSubmit={handleSubmit}>
              <h1 className="text-2xl font-bold text-center py-4">Register</h1>
              {/* Name */}
              <div className="text-1xl pb-2">
                <div className="mb-1 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Enter your name here"
                  required={true}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name ? <p>{errors.name.message}</p> : ""}
              </div>
              {/* email */}
              <div className="text-1xl pb-2">
                <div className="mb-1 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="your@mail.com"
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email ? <p>{errors.email.message}</p> : ""}
              </div>
              {/* password */}
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
                {errors.password ? <p>{errors.password.message}</p> : ""}
              </div>
              {/* confirm password */}
              <div className="text-1xl pb-2 pt-2">
                <div className="mb-1 block">
                  <Label htmlFor="password1" value="Confirm password" />
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  required={true}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword ? (
                  <p>{errors.confirmPassword.message}</p>
                ) : (
                  ""
                )}
              </div>
              <Button
                color="success"
                className="mx-auto w-3/4 font-semibold my-4"
                type="submit"
              >
                Register
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
