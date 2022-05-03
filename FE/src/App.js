/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Main from "./pages/main/Main";
import Store from "./pages/store/Store";

//community
import Community from "./pages/community/Community";
import Articles from "./pages/community/Articles";
import WritingPage from "./pages/community/WritingPage";
import Detail from "./pages/community/Detail";
import WriteRecipePage from "./pages/community/Recipe/WriteRecipePage";
import Recipes from "./pages/community/Recipe/Recipes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>} />
      <Route path="/store/:word" element={<Store />}></Route>
      <Route path="community" element={<Navigate replace to="free" />} />
      <Route path="community" element={<Community></Community>}>
        <Route path="free" element={<Articles />}>
          <Route path="write" element={<WritingPage />} />
          <Route path=":articleId" element={<Detail />}></Route>
        </Route>
        <Route path="recipe" element={<Recipes />}>
          <Route path="write" element={<WriteRecipePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
