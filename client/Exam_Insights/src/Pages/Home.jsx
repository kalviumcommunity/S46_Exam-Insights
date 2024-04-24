import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
import Post from "../Components/Post";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCookie } from "../Components/Cookies";
import { toast } from "react-toastify";

export function getData(setData) {
  const jwtToken = getCookie("jwtToken");

  axios
    .get(import.meta.env.VITE_API_URL + "posts", {
      headers: { authorization: `Bearer ${jwtToken}` },
    })
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
}

function Home() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("All Users");

  const jwtToken = getCookie("jwtToken");

  useEffect(() => {
    getData(setData);
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "users", {
        headers: { authorization: `Bearer ${jwtToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  const Posts = data.filter((posts) => {
    if (selected === "All Users") {
      return posts;
    } else {
      return posts.postedBy === selected;
    }
  });

  const handeSelection = (e) => {
    setSelected(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div id="aligner-div">
        <div id="top-butt-div">
          <select
            name="users"
            className="select-container"
            onChange={handeSelection}
          >
            <option value="All Users">All Users</option>
            {users &&
              users.map((user) => (
                <option
                  value={user.username}
                  className="options"
                  key={user._id}
                >
                  {user.username}
                </option>
              ))}
          </select>

          <div id="create">
            <Link to="/create">
              <button className="continue-application">
                <div>
                  <div className="pencil"></div>
                  <div className="folder">
                    <div className="top">
                      <svg viewBox="0 0 24 27">
                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                      </svg>
                    </div>
                    <div className="paper"></div>
                  </div>
                </div>
                Create Post
              </button>
            </Link>
          </div>

          <div className="mock-div"></div>
        </div>
      </div>

      <div className="postContainer">
        {Posts && Posts.map((post) => <Post setData={setData} {...post} key={post._id} />)}
      </div>
    </>
  );
}

export default Home;
