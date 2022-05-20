/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Appbar from "./components/main/Appbar";
import Main from "./pages/main/Main";
import Store from "./pages/store/Store";
import StoreDetail from "./pages/store/StoreDetail";


import Articles from "./pages/community/free/Articles";
import WriteFree from "./pages/community/free/WriteFree";
import Detail from "./pages/community/free/Detail";
import WriteRecipe from "./pages/community/recipe/write/WriteRecipe";
import Recipes from "./pages/community/recipe/Recipes";
import RecipeDetail from "./pages/community/recipe/detail/Detail";
import KakaoMap from "./pages/kakaomap/KakaoMap";

import Kakao from "./pages/user/KakaoLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main></Main>} />
      <Route path="signin" element={<Kakao />}></Route>

      <Route path="/store" element={<Store />}></Route>
      <Route path="/store/:goodsId" element={<StoreDetail />}></Route>
      <Route path="community" element={<Articles />} />
      <Route path="community/:articleId" element={<Detail />}></Route>
      <Route path="community/write" element={<WriteFree />} />
      <Route path="recipe" element={<Recipes />} />
      <Route path="recipe/:recipeId" element={<RecipeDetail />} />
      <Route path="recipe/write" element={<WriteRecipe />} />
      <Route path="/map" element={<KakaoMap/>}></Route>
    </Routes>
  );
}

export default App;
