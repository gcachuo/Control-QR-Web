import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Users from "./screens/Users";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
