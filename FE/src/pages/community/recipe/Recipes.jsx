/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Recipe from "./Recipe";
import { BASE_URL } from "../../..";

import Searchbar from "../common/Searchbar";
// const categories = ["모두보기", "메인요리", "간식", "도시락", "분식"];

function Recipes() {
  const [recipes, setrecipes] = useState([]);
  // const [recipes, setrecipes] = useState(Array(10).fill(0));
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: BASE_URL + "recipe",
      params: { page: 0, size: 10 },
    }).then((res) => {
      // console.log(res.data.object);
      setrecipes(res.data.object);
    });
  }, []);

  function handleClick({ target }) {
    if (target.matches(".main-photo") || target.matches(".keep-all")) {
      navigate(target.id);
    }
  }

  return (
    <div onClick={handleClick}>
      <div id="category" className="pb-10 mb-12 border-b border-slate-300">
        <h1 className="text-2xl text-center">| USER RECIPES |</h1>
        <h2 className="mt-1 text-center">유저들이 공유하는 레시피</h2>
      </div>
      <div className="relative">
        <select
          name="order"
          id="order"
          className="absolute right-2 top-[-30px]"
        >
          <option value="recent"> 최신순 </option>
          <option value="popular"> 인기순 </option>
        </select>
      </div>
      <div
        id="recipes-box"
        className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      >
        {recipes.map((data, idx) => {
          return <Recipe key={idx} data={data} />;
        })}
      </div>
      <Searchbar />
    </div>
  );
}

export default Recipes;
