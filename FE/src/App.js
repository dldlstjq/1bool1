import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="article" element={<Articles />} />
    </Routes>
  );
}

export default App;
