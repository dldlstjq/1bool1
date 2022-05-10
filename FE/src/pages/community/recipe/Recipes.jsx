/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import Recipe from "./Recipe";
import { BASE_URL } from "../../..";

import { Searchbar, articleOptions } from "../common/Searchbar";
import { Pagination } from "../common/Pagination";
import { useFetch } from "../common/hooks";

function Recipes() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [filter, setFilter] = useState({ category: "title", content: "" });
  const { category, content } = filter;

  const page = searchParams.get("page");

  const recipes = useFetch("recipe", page, 10);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: BASE_URL + "recipe",
  //     params: { page: page - 1, size: 5 },
  //   }).then((res) => {
  //     if (res.data.object?.length) setrecipes(res.data.object);
  //   });
  // }, [page]);

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
        >
          <option value="recent"> 최신순 </option>
          <option value="popular"> 인기순 </option>
        </select>
        {recipes
          .filter((recipe) => {
            return recipe[category]?.search(content) > -1;
          })
          .map((data, idx) => {
            return <Recipe key={idx} data={data} />;
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

      <Searchbar setFilter={setFilter} options={articleOptions} />
    </div>
  );
}

export default Recipes;
