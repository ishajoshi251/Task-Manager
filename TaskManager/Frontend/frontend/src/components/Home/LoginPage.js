import React from "react";
import "./login_signup_style.css";
import "font-awesome/css/font-awesome.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(`http://127.0.0.1:8000/${user_name}`, {
        user_name: user_name,
        password: password,
      });
      setUserName("");
      setPassword("");
    
      if (res.data.success) {
        navigate(`/${user_name}/dashboard`, {
          state: { user_name: user_name }
        });
      } else {
        alert("Invalid Credentials !");
        navigate("/");
      }
    } catch (e) {
      alert("Invalid Credentials !");
      navigate("/");
    }
  };
  return (
    <div className="inner-wrapper">
      <h2 className="text-center mt-4">Login</h2>
      <form className="p-3 mt-3" onSubmit={handleSubmit}>
        <div className="form-field d-flex align-items-center">
          <i className="fa fa-user-circle"></i>
          <input
            value={user_name}
            type="text"
            name="user_name"
            id="user_name"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-field d-flex align-items-center">
          <i className="fa fa-key"></i>
          <input
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn mt-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
