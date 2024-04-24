import "./App.css";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import { Routes, Route } from "react-router-dom";
import Account from "./Pages/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer/>

      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/posts/:id" element={<UpdatePost />}></Route>
        <Route path="/" element={<Account />}></Route>
      </Routes>
    </>
  );
}

export default App;
