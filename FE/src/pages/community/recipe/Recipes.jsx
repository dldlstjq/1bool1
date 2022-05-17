/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";
import Pagination from "react-js-pagination";

import { Searchbar } from "../common/Searchbar";
import { useFetchPage } from "../common/hooks";
import RecipeTop from "./RecipeTop";

import Recipe from "./Recipe";
import ButtonAndPerPage from "../common/WriteOrderBtns";
import {
  Container,
  Box,
  Button,
  Grid,
} from "@mui/material";

function Recipes() {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("recipe");
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => { setPage(page); };
  const [recipes, setRecipes] = useFetchPage(orderBy);

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
      <div onClick={handleClick} sytle={{flex:'1'}}>
       <Container>
          <RecipeTop/>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ButtonAndPerPage />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box style={{display:'flex', justifyContent:'end', marginBottom:'1rem'}}>
                <Searchbar setState={recipes} url="recipe/search" />
                <Button id="write" style={{ marginLeft:'1rem', backgroundColor:'#F93D59', color:'white', fontWeight:'bold', borderRadius:10, height:'2rem', marginTop:'10px'}} >글쓰기</Button>
              </Box>
            </Grid>
          </Grid>
          
          <div
          id="recipes-box"
          className="grid gap-1 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4"
          >
          {recipes.slice(12*(page-1), 12*(page-1)+12).map((recipe, idx) => {
            return <Recipe key={idx} recipe={recipe} />
          }

          )}
          </div>
          
          <Pagination
            activePage={page}
            itemsCountPerPage={12}
            totalItemsCount={recipes.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            >
          </Pagination>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
