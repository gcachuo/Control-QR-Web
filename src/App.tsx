import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Users from "./screens/Users";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        marginLeft: { md: "200px" },
        paddingLeft: "30px",
        backgroundColor: "#f0f0f0",
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
