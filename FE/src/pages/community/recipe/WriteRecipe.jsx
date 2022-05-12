/* eslint-disable no-unused-vars */
import { useState, useCallback } from "react";

import { Searchbar } from "../common/Searchbar";
import { storeOptions } from "../common/Searchbar";
import Step from "./Write/Step";

function WriteRecipe() {
  const [filter, setFilter] = useState({ category: "cu", content: "" });
  const [steps, setSteps] = useState([1]);
  const [dialog, setDialog] = useState(false);

  const handleCancel = useCallback(() => {
    setDialog(true);
  }, []);

  return (
    <div>
      <dialog open={dialog}>
        <p>Greetings, one and all!</p>
        <form method="dialog">
          <button onClick={() => setDialog(false)}>OK</button>
        </form>
      </dialog>
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
        <h1 className="text-lg">재료</h1>
        <Searchbar options={storeOptions} setFilter={setFilter} />
      </div>
      <div className=" p-4 bg-green-100 ">
        <h1 className="text-lg">요리순서</h1>
        {Array.from(steps, (x) => (
          <Step step={x} key={x} />
        ))}
        <button
          className="h-10 w-20 mt-5 bg-lime-500 rounded text-white"
          onClick={() => setSteps([...steps, steps.length + 1])}
        >
          Step 추가
        </button>
        <button
          className="h-10 w-20 mt-5 bg-red-500 rounded text-white ml-2"
          onClick={() => setSteps(steps.slice(0, -1))}
        >
          Step 제거
        </button>
      </div>
      <div className="flex gap-2 mt-5">
        <button
          className="h-10  bg-lime-500 rounded text-white w-1/2"
          type="submit"
        >
          작성완료
        </button>
        <button
          className="h-10  bg-red-500 rounded text-white w-1/2"
          onClick={handleCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default WriteRecipe;
