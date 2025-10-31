import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthContext from "./components/providers/AuthContext";
import ThemeContext from "./components/providers/ThemeContext";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/Profile";

import "./App.css";

function App() {

  const [userAuth, setUserAuth] = useState("");


  return (
    <AuthContext>
      <ThemeContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pages/:id" element={<ProductPage />} />
            <Route path="/pages/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext>
    </AuthContext>
  );
}

export default App;
