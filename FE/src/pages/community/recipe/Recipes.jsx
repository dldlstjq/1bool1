/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";

import axios from "axios";

import { Searchbar } from "../common/Searchbar";
import { Pagination } from "../common/Pagination";
import { useFetchPage } from "../common/hooks";

import Recipe from "./Recipe";
import ButtonAndPerPage from "../common/WriteOrderBtns";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";

function Recipes() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [size, setSize] = useState(10);
  const [orderBy, setOrderBy] = useState("recipe");

  const page = searchParams.get("page") ? searchParams.get("page") - 1 : 0;

  const [recipes, setRecipes] = useFetchPage(orderBy, page, size);

  function handleClick({ target }) {
    if (target.matches(".main-photo") || target.matches(".keep-all")) {
      navigate(target.id);
    } else if (target.matches("#write")) {
      navigate("write");
    } else if (target.matches("#order-by-like")) {
      setOrderBy("recipe/like");
    } else if (target.matches("#order-by-recent")) {
      setOrderBy("recipe");
    } else if (target.matches("#bookmark")) {
      alert("유저가 북마크한 리스트를 주세요");
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
    >
      <Appbar />
      {/* <div sytle={{flex:'1'}}> */}
      <div onClick={handleClick} sytle={{ flex: "1" }}>
        <Container>
          <div id="category" className="pb-10">
            <h1 className="text-2xl text-center">| USER RECIPES |</h1>
            <h2 className="mt-1 text-center">유저들이 공유하는 레시피</h2>
          </div>
          <ButtonAndPerPage setSize={setSize} />

          <div
            id="recipes-box"
            className="grid gap-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          >
            {recipes?.map((recipe, idx) => {
              return <Recipe key={idx} recipe={recipe} />;
            })}
            <Pagination
              cols="col-span-2 sm:col-span-3 lg:col-span-4"
              my="my-5"
              setSearchParams={setSearchParams}
            />
          </div>
          <ButtonAndPerPage setSize={setSize} />

          <Searchbar setState={setRecipes} url="recipe/search" />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
