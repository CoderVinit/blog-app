import Header from "./components/Header";
import React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UerBlogs"
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <React.Fragment>
      <header style={{ position: "sticky", top: '0', overflow: "hidden", zIndex: "999" }}>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? <Route path="/login" element={<Login />} />
            :
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} /></>}
        </Routes>
      </main>
    </React.Fragment>

  );
}

export default App;
