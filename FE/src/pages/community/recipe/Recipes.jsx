/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import Recipe from "./Recipe";

import { Searchbar, articleOptions } from "../common/Searchbar";
import { Pagination } from "../common/Pagination";
import { useFetchPage } from "../common/hooks";

function Recipes() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [filter, applyFilter] = useState({ category: "title", content: "" });
  const [size, setSize] = useState(10);
  const { category, content } = filter;

  const page = searchParams.get("page") ? searchParams.get("page") - 1 : 0;

  const recipes = useFetchPage("recipe", page, size);

  function handleClick({ target }) {
    if (target.matches(".main-photo") || target.matches(".keep-all")) {
      navigate(target.id);
    } else if (target.matches("#write")) {
      navigate("write");
    }
  }

  return (
    <div onClick={handleClick}>
      <div id="category" className="pb-10">
        <h1 className="text-2xl text-center">| USER RECIPES |</h1>
        <h2 className="mt-1 text-center">유저들이 공유하는 레시피</h2>
      </div>

      <div
        id="recipes-box"
        className="grid gap-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      >
        <button
          className="h-10 border-b border-slate-300 bg-slate-100 sm:col-span-2"
          id="write"
        >
          작성하기
        </button>
        <select
          name="order"
          id="order"
          className="h-10 border-b border-slate-300 bg-slate-100 text-center lg:col-span-2"
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">목록개수</option>
          <option value="10"> 10개씩 </option>
          <option value="20"> 20개씩 </option>
          <option value="30"> 30개씩 </option>
          <option value="40"> 40개씩 </option>
          <option value="50"> 50개씩 </option>
        </select>
        {recipes
          ?.filter((recipe) => {
            return recipe[category]?.search(content) > -1;
          })
          .map((recipe, idx) => {
            return <Recipe key={idx} recipe={recipe} />;
          })}
        <Pagination
          cols="col-span-2 sm:col-span-3 lg:col-span-4"
          my="my-5"
          setSearchParams={setSearchParams}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="h-11 w-1/3 border-b border-slate-300 bg-slate-300 mx-auto"
          id="write"
        >
          작성하기
        </button>
      </div>

      <Searchbar applyFilter={applyFilter} options={articleOptions} />
    </div>
  );
}

export default Recipes;
