import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const Register = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await Axios.post(
        `http://localhost:8000/api/user/newUsuario/`,
        inputs
      );
      if (result.status === 201) {
        alert("The user has been registered");
        setInputs({});
        navigate("/login");
      }
    } catch (error) {
      error.response && alert(error.response.data.message);
    }
  };

  return (
    <div id="register-div">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Ex: email@email.com"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Ex: Juan Perez"
              className="form-control"
              value={inputs.name || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              className="form-control"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmpassword"
              value={inputs.confirmpassword || ""}
              onChange={handleChange}
            />
          </label>
        </div>

        <button>Register</button>
      </form>
    </div>
  );
};
