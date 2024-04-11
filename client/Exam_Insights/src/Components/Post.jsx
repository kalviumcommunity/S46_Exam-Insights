import React from "react";
import "./Post.css";
import like from "../assets/Like.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

function Post({
  category,
  element,
  expectation,
  imageLink,
  likes,
  postedBy,
  quote,
  _id,
}) {
  

  const [rotate, setRotate] = useState(false);

  // Function to toggle rotation
  const toggleRotation = () => {
    if (!rotate) {
      setRotate(true);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (rotate) {
      timeoutId = setTimeout(() => setRotate(false), 500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [rotate]);



  // Delete button
  const handleDelete = (id) => {
    axios.delete(import.meta.env.VITE_API_URL+ "posts/" + id)
    .then(() => window.location.reload())
    .catch(err => console.log(err))
  }


  return (
    <div id="gallery">
      <div className="card"></div>
      <div className="bg">
        <p id="title">{element}</p>
        <div id="creator">
          - <span>{postedBy}</span>
        </div>
        <div id="img-con">
          <img id="post-img" src={imageLink} alt="Link not defined!" />
        </div>
        <div id="quote">
          <p>
            " <span>{quote}</span> "
          </p>
        </div>
        <div id="expect">
          <p className="line1">Expectation</p>
          <p className="line2">:</p>
          <p className="line3">{expectation}</p>
        </div>

        <div id="cat">
          <p className="line1">Category</p>
          <p className="line2">:</p>
          <p className="line3">{category}</p>
        </div>

        <div id="up-del-butts">
          <Link to={`/posts/${_id}`}>
            <button id="up">Update</button>
          </Link>
            <button id="del" onClick={() => handleDelete(_id)}>Delete</button>
        </div>
        <div id="flex-con">
          <div id="like-con" onClick={toggleRotation}>
            <img
              className={rotate ? "rotate" : ""}
              id="like"
              src={like}
              alt="like"
            />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
