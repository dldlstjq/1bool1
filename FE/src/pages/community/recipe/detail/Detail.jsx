/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";

import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";

import { useFetchList } from "../../common/hooks";

import Step from "./Step";
import Goods from "./Goods";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import Comments from "../../common/comment/Comments";
import UpperInfo from "./components/UpperInfo";

import Appbar from "../../../../components/main/Appbar";
import Footer from "../../../../components/main/Footer";

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
    price,
  } = recipe;

  const steps = content && JSON.parse(content);
  const photos = photo?.split(",");
  const navi = useNavigate();
  const user_id = localStorage.getItem("user_id");

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

  console.log(goods);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
    >
      <Appbar />
      <div style={{ flex: "1", marginTop: 30 }}>
        <Container>
          <div>
            <UpperInfo
              photo={photos && photos[0]}
              minute={minute}
              modifiedDate={modifiedDate}
              nickname={nickname}
              star={star}
              title={title}
              description={description}
              recipeId={recipeId}
              price={price}
            />
            {/* <div id='main' className='border-y-4 py-2 my-2'> */}
            {/* <h1 className='text-xl'> 이 요리는...</h1>
              <p> {description}</p> */}
            {/* </div> */}
            <hr id="line"></hr>
            <Goods goods={goods} />
            {steps?.map((step, idx) => (
              <Step key={idx} step={step} img={photos[idx + 1]} i={idx + 1} />
            ))}
            {/* {user_id && recipeId && (
              <LikeButton url={'recipe/like/' + recipeId} user_id={user_id} recipe_id={recipeId} />
            )} */}
            {/* <LikeButton url={'recipe/like/' + recipeId} user_id={user_id} recipe_id={recipeId} /> */}
            <DeleteOrUpdate
              setPassword={setInputPassword}
              inputPassword={inputPassword}
              afterUrl="/recipe"
              params={{ nickname, password }}
              password={password}
              state={recipe}
              updatePageUrl="/recipe/write"
              url={`recipe/${recipeId}`}
            />
            <Comments which="detail" detailId={recipeId} />
            <button
              className="bg-gray-700 text-white h-10 w-20 mt-5"
              onClick={() => navi("/recipe")}
              style={{
                backgroundColor: "#f93d59",
                color: "white",
                fontWeight: "bold",
                borderRadius: 20,
                marginTop: "1rem",
                marginLeft: 10,
              }}
            >
              목록보기
            </button>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
