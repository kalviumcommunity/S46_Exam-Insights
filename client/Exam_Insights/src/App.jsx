import "./App.css";
import CreatePost from "./Pages/CreatePost";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
      </Routes>
    </>
  );
}

export default App;
