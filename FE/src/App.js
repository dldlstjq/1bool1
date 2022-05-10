import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Store from "./pages/store/Store";

//community
import Community from "./pages/community/Community";
import Articles from "./pages/community/Articles";
import WritingPage from "./pages/community/WritingPage";
import Detail from "./pages/community/Detail";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Main> </Main>} />
      <Route path="/store" element={<Store />}></Route>
      <Route path="community" element={<Community />}>
        <Route path=":category" element={<Articles />}></Route>
        <Route path=":category/:articleId" element={<Detail></Detail>}></Route>
        <Route path="write" element={<WritingPage />} />
        <Route index element={<Articles />} />
      </Route>
    </Routes>
  );
}

export default App;
