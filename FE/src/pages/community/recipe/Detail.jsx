/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import { BASE_URL } from "../../..";
import Step from "./Step";
import Star from "../common/Star";

function Detail() {
  const { recipeId } = useParams();
  const [recipe, setrecipe] = useState({});
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
  const re = /(?<=step\d:).+?(?=,step\d)/g;
  const steps = content?.match(re);
  console.log(steps);

  const photos = photo?.split(",");
  useEffect(() => {
    axios({
      method: "get",
      url: BASE_URL + "recipe/" + recipeId,
    })
      .then((res) => {
        console.log(res.data.object);
        setrecipe(res.data.object);
      })
      .catch((err) => console.log(err));
  }, [recipeId]);

  return (
    <div>
      <img src={photos && photos[0]} alt="" />
      <div className="flex justify-between mb-7">
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
      소요시간 : {minute}분
      <div id="main" className="mt-10 border-t border-stone-400">
        {steps?.map((step, idx) => (
          <Step key={idx} step={step} img={photos[idx + 1]} />
        ))}
      </div>
    </div>
  );
}

export default Detail;
