import React, { useState, useEffect } from "react";
import "./UpdatePost.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/Asap_Logo.png";

function UpdatePost() {
  const { id } = useParams();
  const [element, setElement] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [expectation, setExpectation] = useState();
  const [category, setCategory] = useState();
  const [quote, setQuote] = useState();

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "posts/" + id)
      .then((post) => {
        setElement(post.data.element);
        setImageLink(post.data.imageLink);
        setExpectation(post.data.expectation);
        setCategory(post.data.category);
        setQuote(post.data.quote);
      })
      .catch((err) => {
        console.log("axios fail");
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .patch(import.meta.env.VITE_API_URL + "posts/" + id, {
        element,
        imageLink,
        expectation,
        category,
        quote,
      })
      .then(() => {
        nav("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    nav("/");
  };

  return (
    <>
      <div id="container">
        <Link to="/">
          <img id="logo" src={logo} alt="red" onClick={handleClick} />
        </Link>
        <div className="form border" >
          <div id="form-head">
            <span>Update Your Post!</span>
          </div>

          <div className="body">
            <div className="input">
              <label className="input__label color">Post Title</label>
              <input
                className="input__field bg-color"
                type="text"
                value={element}
                onChange={(e) => setElement(e.target.value)}
              />
            </div>

            <div className="input">
              <label className="input__label color">Image Link</label>
              <input
                className="input__field bg-color"
                type="text"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </div>

            <div className="input">
              <label className="input__label color">Expectation</label>
              <input
                className="input__field bg-color"
                type="text"
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
              ></input>
            </div>

            <div className="input">
              <label className="input__label color">Category</label>
              <input
                className="input__field bg-color"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="input">
              <label className="input__label color">Quote</label>
              <input
                className="input__field bg-color"
                type="text"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
            </div>
          </div>

          <div id="bot-butt">
            <Link to="/">
              <button className="can" onClick={handleClick}>
                Cancel
              </button>
            </Link>
            <button className="up" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePost;
