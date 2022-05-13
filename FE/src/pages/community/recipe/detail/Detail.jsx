/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { useFetchListAndUpdate } from "../../common/hooks";

import Step from "./Step";
import Star from "../../common/Star";
import Goods from "./Goods";
import { DeleteOrUpdate } from "./DeleteOrUpdate";

function Detail() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [inputPassword, setInputPassword] = useState("");

  const {
    photo,
    title,
    nickname,
    password,
    modifiedDate,
    content,
    star,
    minute,
    description,
  } = recipe;
  const re = /(?<=<s>).+?(?=<s>)/g;
  const steps = content && content?.match(re);

  const photos = photo?.split(",");
  useEffect(() => {
    axios({
      method: "get",
      url: "recipe/" + recipeId,
    })
      .then((res) => {
        setRecipe(res.data.object);
      })
      .catch((err) => console.log(err));
  }, [recipeId]);

  const goods = useFetchListAndUpdate("recipe/goods/" + recipeId);

  return (
    <div>
      <img src={photos && photos[0]} alt="" />
      <div className="flex justify-between mb-3">
        <div>
          <h1>{nickname}님의 </h1>
          <h1 className="keep-all font-bold text-xl mt-1">{title}</h1>
        </div>
        <div id="icons" className="flex justify-end items-center">
          <div className="w-7">
            <img src="/bookmark.png" alt="" />
          </div>
          <div className="w-10">
            <img src="/share.png" alt="" />
          </div>
        </div>
      </div>
      <div className="inline-block w-1/2">
        난이도
        {[...Array(star)].map((e, i) => (
          <Star key={i} />
        ))}
      </div>
      소요시간 : {minute}분<p> 수정일자 {modifiedDate?.split(".")[0]}</p>
      <div id="main" className="mt-5 border-t border-stone-400">
        <h1 className="text-xl"> 이 요리는...</h1>
        <p> {description}</p>
        <Goods goods={goods} />
        {steps?.map((step, idx) => (
          <Step key={idx} step={step} img={photos[idx + 1]} />
        ))}
      </div>
      <DeleteOrUpdate
        setPassword={setInputPassword}
        inputPassword={inputPassword}
        afterUrl="/community/recipe"
        params={{ nickname, password }}
        password={password}
        state={recipe}
        updatePageUrl="/community/recipe/write"
        url={`recipe/${recipeId}`}
      />
    </div>
  );
}

export default Detail;
