import React from "react";
import "./Post.css";
import like from "../assets/Like.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getCookie } from "../Components/Cookies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [postLikes, setPostLikes] = useState(likes);

  const jwtToken = getCookie("jwtToken");
  const username = getCookie("username");

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

  const handleLike = (_id) => {
    axios
      .patch(
        `${import.meta.env.VITE_API_URL}posts/${_id}/like`,
        {},
        {
          headers: { authorization: `Bearer ${jwtToken}` },
        }
      )
      .then((response) => {
        setPostLikes(response.data.likes);
        toast.success("Post liked!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Delete button
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch updated list of posts when called
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}posts`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        toast.error("Failed to fetch posts");
      });
  };

  const handleDelete = (postId) => {
    axios
      .delete(`${import.meta.env.VITE_API_URL}posts/${postId}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
      .then(() => {
        // After deleting, fetch the updated list of posts
        fetchPosts();
        toast.success("Post deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        toast.error("Failed to delete post");
      });
  };
  
  

  const isCurrentUser = postedBy === username;

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

        {isCurrentUser && (
          <div id="up-del-butts">
            <Link to={`/posts/${_id}`}>
              <button id="up">Update</button>
            </Link>
            <button id="del" onClick={() => handleDelete(_id)}>
              Delete
            </button>
          </div>
        )}
        <div id="flex-con" onClick={(e) => handleLike(_id)}>
          <div id="like-con" onClick={toggleRotation}>
            <img
              className={rotate ? "rotate" : ""}
              id="like"
              src={like}
              alt="like"
            />
            <span>{postLikes ? postLikes : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
