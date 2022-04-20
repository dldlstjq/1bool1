import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Articles from "./pages/community/Articles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="community" element={<Articles />} />
    </Routes>
  );
}

export default App;
