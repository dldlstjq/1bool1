import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Articles from "./pages/Community/Articles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="article" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
