import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MenuBar from "./components/MenuBar";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import PostsPage from "./components/PostsPage";
import PostDetails from "./components/PostDetails";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MenuBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
