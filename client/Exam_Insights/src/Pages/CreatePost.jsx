import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CreatePost.css";
import logo from "../assets/Asap_Logo.png";
import { getCookie } from "../Components/Cookies";

function CreatePost() {
  const [element, setElement] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [expectation, setExpectation] = useState("");
  const [category, setCategory] = useState("");
  const [quote, setQuote] = useState("");
  const jwtToken = getCookie("jwtToken");
  const postedBy = getCookie("username");


  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "posts",
        {
          element,
          imageLink,
          expectation,
          category,
          quote,
          postedBy: postedBy
        },
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      );
      nav("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleClick = () => {
    nav("/home");
  };

  return (
    <>
      <div id="container">
        <Link to="/home">
          <img id="logo" src={logo} alt="red" onClick={handleClick} />
        </Link>
        <div className="form">
          <div id="form-head">
            <span>Create Your Own Post!</span>
          </div>

          <div>
            <div className="input">
              <label className="input__label">Post Title</label>
              <input
                className="input__field"
                type="text"
                value={element}
                onChange={(e) => setElement(e.target.value)}
              />
            </div>

            <div className="input">
              <label className="input__label">Image Link</label>
              <input
                className="input__field"
                type="text"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </div>

            <div className="input">
              <label className="input__label">Expectation</label>
              <input
                className="input__field"
                type="text"
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
              ></input>
            </div>

            <div className="input">
              <label className="input__label">Category</label>
              <input
                className="input__field"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="input">
              <label className="input__label">Quote</label>
              <input
                className="input__field"
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
            </div>
          </div>

          <div id="bot-butt">
            <Link to="/home">
              <button id="can" onClick={handleClick}>
                Cancel
              </button>
            </Link>
            <button id="cre" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
