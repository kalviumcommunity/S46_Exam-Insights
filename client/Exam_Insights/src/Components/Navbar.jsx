import React from "react";
import "./Navbar.css";
import logo2 from "../assets/Asap_Logo2.png";
import change from "../assets/change.png";
import logout from "../assets/logout.png";
import del from "../assets/delete.png";
import { useState, useEffect, useRef } from "react";
import { getCookie } from "./Cookies";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const [account, setShowAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const accountRef = useRef(null);

  useEffect(() => {
    const usernameFromCookie = getCookie("username");
    if (usernameFromCookie) {
      setUsername(usernameFromCookie);
    }
    const email = getCookie("email");
    if (email) {
      setEmail(email);
    }
  }, []);

  function handleLogout() {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUsername("");
    setEmail("");
    nav("/");
  }

  const toggleAccount = () => {
    setShowAccount(!account);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowAccount(false);
      }
    };

    const handleScroll = () => {
      setShowAccount(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [account]);

  return (
    <>
      <div id="navbar">
        <img src={logo2} alt="logo" />

        <div id="navigation">
          <a
            className="button"
            href="https://nta.ac.in/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            About
          </a>
          <a
            className="button"
            href="https://www.google.com/maps/dir/11.1017984,76.9851392/5QM9%2B58C+Mahakaleshwar+Jyotirlinga,+inside+Mahankal+Mandir,+Jaisinghpura,+Ujjain,+Madhya+Pradesh+456001/@17.073599,70.7583651,6z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x3963743638ffffff:0x3024e4d1bd13cc22!2m2!1d75.768291!2d23.182905?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contacts
          </a>
          <div id="user" onClick={toggleAccount}></div>
        </div>
      </div>
      {account && (
        <div id="account" ref={accountRef}>
          <div id="top">
            <p id="name">{username}</p>
            <p id="email">{email}</p>
          </div>
          <div id="bottom">
            <div id="switch" className="butts">
              <img src={change} alt="switch" />
              <p>Switch</p>
            </div>
            <div id="logout" className="butts">
              <img src={logout} alt="logout" />
              <p onClick={handleLogout}>Logout</p>
            </div>
            <div id="delete" className="butts">
              <img src={del} alt="switch" />
              <p>Delete</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
