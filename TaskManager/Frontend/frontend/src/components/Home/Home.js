import React, { useState } from "react";
import "./homestyle.css";
import "./login_signup_style.css";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

function Home() {
  const [title, setTitle] = useState("LoginPage");
  
  const handleSwitch = (title) => {
    if (title === "LoginPage") {
      setTitle("LoginPage");
    } else setTitle("SignupPage");
  };

  return (
    <div id="Home">
      <nav>
        <div className="nav-right">
          <button
            className="btn shadow-sm"
            onClick={() => handleSwitch("SignupPage")}
          >
            Sign Up
          </button>
          <button
            className="btn shadow-sm"
            onClick={() => handleSwitch("LoginPage")}
          >
            Log In
          </button>
        </div>
      </nav>
      <section id="Home_body" className="d-flex align-items-center">
        <div className="row mx-2 p-0 h-100">
          <div className="col-lg-6 p-3 d-flex justify-content-center align-items-center flex-column">
            <h1 className="mb-4 text-center">Task Manager</h1>
            <h2 className="mb-2 text-center">Project management made easy</h2>
            <p className="text-center mx-5 my-3">
              Manage simple to complex projects and everything in between with
              Task Manager
            </p>
          </div>
          <div className="col-lg-6 p-3 d-flex justify-content-center align-items-center flex-column">
            <div className="wrapper w-75">
              {title === "LoginPage" ? (
                <div>
                  <LoginPage />
                  <div className="text-center last_login fs-6">
                    <button className="last_login_btn">Forgot password?</button>
                    <p className="m-0 fs-6">or</p>
                    <div>
                      <span>Not an existing User ? </span>
                    </div>
                    <button
                      className="last_login_btn"
                      onClick={() => handleSwitch("SignupPage")}
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <SignupPage />
                  <div className="text-center last_login">
                    <span>Already a User ? </span>
                    <button
                      className="last_login_btn"
                      onClick={() => handleSwitch("LoginPage")}
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
