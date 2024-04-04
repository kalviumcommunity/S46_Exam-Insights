import React from "react";
import "./Navbar.css";
import logo2 from "../assets/Asap_Logo2.png";
import change from "../assets/change.png";
import logout from "../assets/logout.png";
import del from "../assets/delete.png";
import { useState } from "react";
import { useEffect } from "react";

function Navbar() {
  const [account, setShowAccount] = useState(false);

  const toggleAccount = () => {
    setShowAccount(!account);
  };


  return (
    <>
      <div id="navbar">
        <img src={logo2} alt="" />
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
        <div id="account">
          <div id="top">
            <p id="name">User</p>
            <p id="email">trial@email.com</p>
          </div>
          <div id="bottom">
            <div id="switch" className="butts">
              <img src={change} alt="switch" />
              <p>Switch</p>
            </div>
            <div id="logout" className="butts">
              <img src={logout} alt="logout" />
              <p>Logout</p>
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