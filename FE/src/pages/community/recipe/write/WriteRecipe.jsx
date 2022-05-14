/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useInputs } from "../../common/hooks";

import axios from "axios";

import Upper from "./Upper";
import Steps from "./Steps";
import IngredientSelect from "./IngredientSelect";

function WriteRecipe() {
  const [dialog, setDialog] = useState(false);
  const [selected, setSelected] = useState([]);
  const navi = useNavigate();
  const { state } = useLocation();
  let content = "",
    description = "",
    minute = "",
    nickname = "",
    password = "",
    star = "",
    title = "";
  if (state)
    ({ content, description, minute, nickname, password, star, title } = state);

  const handleCancel = useCallback(() => {
    navi("/community/recipe");
  }, [navi]);

  function handleSubmit(e) {
    // put or post
    e.preventDefault();
    if (selected.length === 0) {
      alert("재료를 추가해주세요");
      return;
    }
    const form = new FormData(e.target);
    form.delete("conv");
    let content = "";
    for (const x of form) {
      if (x[0] === "step") {
        content = content.concat(`<s>${x[1]}`);
      }
    }
    content = content.concat("<s>");
    form.append("content", content);
    form.delete("step");
    form.append("goodsId", selected.map(({ goodsId }) => goodsId).join(","));
    if (state) {
      form.append("id", state.id);
      axios({
        method: "put",
        url: "recipe",
        data: form,
      })
        .then(setTimeout(() => navi("/community/recipe"), 1000))
        .catch((err) => console.log(err));
    } else {
      axios({
        method: "post",
        url: "recipe",
        data: form,
      })
        .then(setTimeout(() => navi("/community/recipe"), 1000))
        .catch((err) => console.log(err));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Upper
        nickname={nickname}
        password={password}
        description={description}
        minute={minute}
        star={star}
        title={title}
      />

      <IngredientSelect selected={selected} setSelected={setSelected} />
      <Steps content={content} />
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
    </form>
  );
}

export default WriteRecipe;
