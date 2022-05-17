/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";
import Pagination from "react-js-pagination";

import { Searchbar } from "../common/Searchbar";
import { useFetchPage } from "../common/hooks";

import Recipe from "./Recipe";
import ButtonAndPerPage from "../common/WriteOrderBtns";
import {
  Container,
  Box,
  Button,
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
          <div id="category" className="p-8" >
            <h1 className="text-2xl text-center" style={{fontSize:30}}>| USER RECIPES |</h1>
            <h2 className="mt-1 text-center" style={{fontSize:30}}>유저들이 공유하는 레시피</h2>
          </div>

          <ButtonAndPerPage />
          <Box style={{display:'flex', justifyContent:'end', marginBottom:'1rem'}}>
            <Searchbar setState={setRecipes} url="recipe/search" />
            <Button id="write" style={{ marginLeft:'1rem', backgroundColor:'#F93D59', color:'white', fontWeight:'bold', borderRadius:10, height:'2rem', marginTop:'10px'}} >글쓰기</Button>
          </Box>

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
