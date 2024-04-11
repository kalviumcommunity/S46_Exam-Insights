import React, { useState } from "react";
import "./Account.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Asap_Logo.png";
import { setCookie } from "../Components/Cookies";
import axios from "axios";

const AuthComponent = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "users",
        {
          username: data.Username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirm,
        }
      );
      setCookie("username", data.Username, 1);
      setCookie("email", data.Email, 1);

      navigate("/home");
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "login",
        {
          username: data.Username,
          password: data.password,
        }
      );
      console.log("Login Successful");
      setCookie("username", data.Username, 1);
      setCookie("email", response.data.email, 1);
      navigate("/home");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="holder">
      <img id="logo" src={logo} alt="logo" />

      <div className="wrapper">
        <div
          className={`input-box ${!isSignIn ? "form-horizontal" : ""}`}
          id="form1"
        >
          <div
            className="title-name"
            onClick={() => {
              if (!isSignIn) {
                toggleForm();
              }
            }}
          >
            Login
          </div>
          <form
            action="#"
            class="loginForm"
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                Username: e.target.username.value,
                password: e.target.pwd.value,
              };
              handleLogin(data);
            }}
          >
            <div className="profileImage">
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: "6rem" }}
              />
            </div>
            <div id="spacing">
              <div className="form-group">
                <FontAwesomeIcon icon={faUser} className="form-icon bugg" />
                <input
                  className="form-control"
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <FontAwesomeIcon icon={faLock} className="form-icon" />
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Password"
                />
              </div>
              <button type="submit" class="btn btn-default">
                login
              </button>
            </div>
          </form>
        </div>

        <div
          className={`input-box ${isSignIn ? "form-horizontal" : ""}`}
          id="form2"
        >
          <div
            className="title-name"
            onClick={() => {
              if (isSignIn) {
                toggleForm();
              }
            }}
          >
            Sign Up
          </div>
          <form
            action="#"
            class="signupForm"
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                Username: e.target.username.value,
                email: e.target.emaill.value,
                password: e.target.pwd.value,
                confirm: e.target.repwd.value,
              };
              handleSignup(data);
            }}
          >
            <div className="profileImage">
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ fontSize: "6rem" }}
              />
            </div>
            <div id="spaceings">
              <div className="form-group">
                <FontAwesomeIcon icon={faEnvelope} className="form-icon bugg" />
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="form-icon bugg"
                />
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <FontAwesomeIcon icon={faEnvelope} className="form-icon bugg" />
                <input
                  type="email"
                  className="form-control"
                  id="emaill"
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <FontAwesomeIcon
                  icon={faLock}
                  className="form-icon"
                  id="pass"
                />
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <FontAwesomeIcon icon={faLock} className="form-icon" />
                <input
                  type="password"
                  className="form-control"
                  id="repwd"
                  placeholder="Retype-Password"
                />
              </div>
              <button type="submit" class="btn btn-default">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
