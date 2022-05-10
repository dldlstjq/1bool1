/* eslint-disable no-unused-vars */
import { useState } from "react";

import { Searchbar } from "../common/Searchbar";
import { storeOptions } from "../common/Searchbar";

function WriteRecipe() {
  const [filter, setFilter] = useState({ category: "cu", content: "" });

  return (
    <div>
      <h1 className="text-xl text-center my-8">| 레시피 등록 |</h1>
      <div className="grid grid-cols-2 gap-2 border-b border-slate-300 p-4 bg-green-100 ">
        <input
          type="text"
          className=" bg-slate-200 border border-slate-300 h-12 rounded col-span-2 focus:bg-white"
          placeholder="레시피 제목"
        />
        <textarea
          name=""
          className="bg-slate-200 border border-slate-300 h-24 rounded col-span-2 focus:bg-white"
          placeholder="요리소개"
        ></textarea>
        <input
          type="text"
          className=" bg-slate-200 border border-slate-300 h-12 rounded focus:bg-white"
          placeholder="요리시간(분)"
        />
        <select
          className="text-slate-400 bg-slate-200 border border-slate-300 h-12 rounded focus:bg-white"
          placeholder="난이도"
        >
          <option value="">난이도</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <div className="bg-green-200 p-4">
        <h1 className="text-gray-500 text-center">재료</h1>
        <Searchbar options={storeOptions} setFilter={setFilter} />
      </div>
    </div>
  );
}

export default WriteRecipe;
