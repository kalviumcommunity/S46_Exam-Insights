import React from "react";
import "./Post.css";
import demo from "../assets/demo-image.png";
import like from "../assets/Like.png";

function Post() {
  return (
    <div id="gallery">
      <div className="card"></div>
      <div class="bg">
        <p id="title">Searching Previous Year Question Papers</p>
        <div id="creator">
          - <span>Aaryan Panda</span>
        </div>
        <div id="img-con">
          <img id="post-img" src={demo} alt="" />
        </div>
        <div id="quote">
          <p>
            "{" "}
            <span>
              I used to think myself oversmart ! I had a feeling to top the exam
              !
            </span>{" "}
            "
          </p>
        </div>
        <div id="expect">
          <p>Expectation : </p>
          <span>Repeatation of Same Question in Exam.</span>
        </div>

        <div id="cat">
          <p>Category : &nbsp; </p>
          <span> Action</span>
        </div>
        <div id="flex-con">
          <div id="like-con">
            <img id="like" src={like} alt="" />
            <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
