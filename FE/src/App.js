import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main"
import Store from './pages/store/Store';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/store/:word" element={<Store/>}></Route>
    </Routes>
  );
}

export default App;
