/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import { useFetchListAndUpdate, useFetchList } from "../../common/hooks";

import Step from "./Step";
import Goods from "./Goods";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import Comments from "../../common/comment/Comments";
import UpperInfo from "./components/UpperInfo";

function Detail() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [inputPassword, setInputPassword] = useState("");
  const [foo, refresh] = useState(0);

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
  const navi = useNavigate();

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

  const goods = useFetchList("recipe/goods/" + recipeId);
  const comments = useFetchListAndUpdate("recipereview/" + recipeId, foo);

  return (
    <div>
      <UpperInfo
        photo={photos && photos[0]}
        minute={minute}
        modifiedDate={modifiedDate}
        nickname={nickname}
        star={star}
        title={title}
      />
      <div id="main" className="border-y-4 border-purple-900 py-2 my-2">
        <h1 className="text-xl"> 이 요리는...</h1>
        <p> {description}</p>
      </div>
      <Goods goods={goods} />
      {steps?.map((step, idx) => (
        <Step key={idx} step={step} img={photos[idx + 1]} i={idx + 1} />
      ))}
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
      <Comments
        url={"recipereview/" + recipeId}
        comments={comments}
        recipeId={recipeId}
        refresh={refresh}
      />
      <button
        className="bg-gray-700 text-white h-10 w-1/3 mt-5"
        onClick={() => navi("/community/recipe")}
      >
        목록보기
      </button>
    </div>
  );
}

export default Detail;
