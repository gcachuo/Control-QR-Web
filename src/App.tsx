import "./configs/firebaseConfig";

import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  NavigateFunction,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Box } from "@mui/material";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Users from "./screens/Users";
import AccessLog from "./screens/AccessLog";

import { AuthProvider, useAuth } from "./hooks/useAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(getAuth(), async (userAuth) => {
      try {
        if (userAuth) {
          setLoggedIn(!!userAuth);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.warn(error);
      }
    });
  }, []);

  const Router = () => {
    const { user } = useAuth();
    const isLoggedIn = !!user;
    const navigation: NavigateFunction = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!isLoggedIn) {
        navigation("/login");
      } else if (location.pathname === "/login") {
        navigation("/home");
      }
    }, [isLoggedIn, location.pathname, navigation]);

    return (
      <Routes>
        {!isLoggedIn && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
          </>
        )}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="access-log" element={<AccessLog />} />
            <Route path="users" element={<Users />} />
          </>
        )}
      </Routes>
    );
  };

  return (
    <AuthProvider>
      <Box
        sx={{
          marginLeft: { md: isLoggedIn ? "225px" : 0 },
          backgroundColor: "#f0f0f0",
          height: "100vh",
        }}
      >
        <Box
          style={{
            backgroundColor: "white",
          }}
        >
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Box>
      </Box>
    </AuthProvider>
  );
}

export default App;
