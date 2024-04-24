import React from "react";
import "./Navbar.css";
import logo2 from "../assets/Asap_Logo2.png";
import change from "../assets/change.png";
import logout from "../assets/logout.png";
import del from "../assets/delete.png";
import { useState, useEffect, useRef } from "react";
import { getCookie } from "./Cookies";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [account, setShowAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const nav = useNavigate();
  const jwtToken = getCookie("jwtToken");

  const accountRef = useRef(null);

  //display name and email from cookies
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

  //get user id from backend to delete account
  useEffect(() => {
    if (jwtToken) {
      axios
        .get(`${import.meta.env.VITE_API_URL}user`, {
          headers: { Authorization: `Bearer ${jwtToken}` },
        })
        .then((response) => {
          const { userId } = response.data;
          if (userId) {
            setUserId(userId);
          } else {
            console.log("User ID not found in response");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      console.log("JWT token not found. User not authenticated.");
    }
  }, [jwtToken]);


  //handle popup closure on click
  const toggleAccount = () => {
    setShowAccount(!account);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById("navbar");
      if (
        navbar &&
        !navbar.contains(event.target) &&
        !accountRef.current.contains(event.target)
      ) {
        setShowAccount(false);
      }
    };

    //handle popup closure on mousedown
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

  
  //delete function
  const handleDelete = (id) => {
    axios
      .delete(import.meta.env.VITE_API_URL + "users/" + id, {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then(() => {
        nav("/");
        toast.success("Account deleted successfully!");
      })
      .catch((err) => console.log(err));
  };

  //logout function
  function handleLogout() {
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUsername("");
    setEmail("");
    toast.success("Logged out successfully");
    nav("/");
  }

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
          <div id="user" onClick={toggleAccount}>
            <img
              id="avatar"
              src={`https://api.dicebear.com/8.x/big-ears/svg?seed=${username}`}
              alt="avatar"
            />
          </div>
        </div>
      </div>
      {account && (
        <div id="account" ref={accountRef}>
          <div id="top">
            <p id="name">{username}</p>
            <p id="email">{email}</p>
          </div>
          <div id="bottom">
            <div id="logout" className="butts" onClick={handleLogout}>
              <img src={logout} alt="logout" />
              <p>Logout</p>
            </div>

            <div
              id="delete"
              className="butts"
              onClick={(e) => {
                handleDelete(userId);
              }}
            >
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
