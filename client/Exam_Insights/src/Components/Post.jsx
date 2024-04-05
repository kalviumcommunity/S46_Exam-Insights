import React from "react";
import "./Post.css";
import demo from "../assets/demo-image.png";
import like from "../assets/Like.png";

function Post({
  category,
  element,
  expectation,
  imageLink,
  likes,
  postedBy,
  quote,
  _id}
) {
  return (
    <div id="gallery">
      <div className="card"></div>
      <div className="bg">
        <p id="title">{element}</p>
        <div id="creator">
          - <span>{postedBy}</span>
        </div>
        <div id="img-con">
          <img id="post-img" src={imageLink} alt="demo" />
        </div>
        <div id="quote">
          <p>
            "{" "}
            <span>
              {quote}
            </span>{" "}
            "
          </p>
        </div>
        <div id="expect">
          <p>Expectation : </p>
          <span>{expectation}</span>
        </div>

        <div id="cat">
          <p>Category : &nbsp; </p>
          <span>{category}</span>
        </div>
        <div id="flex-con">
          <div id="like-con">
            <img id="like" src={like} alt="like" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
