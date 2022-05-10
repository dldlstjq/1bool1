/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Main from './pages/main/Main';
import Store from './pages/store/Store';

//community
import Community from './pages/community/Community';
import Articles from './pages/community/free/Articles';
import WriteFree from './pages/community/free/WriteFree';
import Detail from './pages/community/free/Detail';
import WriteRecipe from './pages/community/Recipe/WriteRecipe';
import Recipes from './pages/community/Recipe/Recipes';
import RecipeDetail from './pages/community/Recipe/Detail';

// signin, signup
import Signin from './pages/user/Signin';
import Signup from './pages/user/Signup';
import Kakao from './pages/user/KakaoLogin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main></Main>} />
      <Route path='signin' element={<Kakao />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='/store/:word' element={<Store />}></Route>
      <Route path='community' element={<Navigate replace to='free' />} />
      <Route path='community' element={<Community></Community>}>
        <Route path='free' element={<Articles />}></Route>
        <Route path='free/:articleId' element={<Detail />}></Route>
        <Route path='free/write' element={<WriteFree />} />
        <Route path='recipe' element={<Recipes />} />
        <Route path='recipe/:recipeId' element={<RecipeDetail />} />
        <Route path='recipe/write' element={<WriteRecipe />} />
      <Route path="/store" element={<Store />}></Route>
      {/* <Route path="community" element={<Community />}> */}
        {/* <Route path=":category" element={<Articles />}></Route> */}
        {/* <Route path=":category/:articleId" element={<Detail></Detail>}></Route> */}
        {/* <Route path="write" element={<WritingPage />} /> */}
        {/* <Route index element={<Articles />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
