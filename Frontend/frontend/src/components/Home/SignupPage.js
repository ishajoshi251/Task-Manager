import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignupPage() { 
  const navigate=useNavigate();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [user_email, setUserEmail] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    try{
      axios.post("http://127.0.0.1:8000/",{
        first_name:first_name,
        last_name: last_name,
        user_email: user_email,
        user_name: user_name,
        password: password
      })
      setFirstName("");
      setLastName("");
      setUserEmail("");
      setUserName("");
      setPassword("");
      alert("Successfully Registered ! ");
    }
    catch(e){
      navigate("/");
    }
    
  }
  return (
      <div className="inner-wrapper">
          <h2 className="text-center">Sign Up</h2>
          <form className="p-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
              <i className="fa fa-user"></i>
              <input
                value={first_name}
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-field d-flex align-items-center">
              <i className="fa fa-user"></i>
              <input
              value={last_name}
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
              <i className="fa fa-envelope"></i>
              <input
                value={user_email}
                type="text"
                name="user_email"
                id="user_email"
                placeholder="Email Address"
                onChange={(e) => setUserEmail(e.target.value)}
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
            <button className="btn mt-3" type="submit" >Register</button>
          </form>
      </div>
  );
}

export default SignupPage;