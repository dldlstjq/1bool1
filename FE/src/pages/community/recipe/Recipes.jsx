/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";
import Pagination from "react-js-pagination";
import { Searchbar } from "../common/searchbar/Searchbar";
import RecipeTop from "./RecipeTop";
import Recipe from "./Recipe";
import OrderByRecentLikeBookmark from "../common/WriteOrderBtns";

import { Container, Box, Button, Grid, Typography } from "@mui/material";
import { FaWonSign, FaCoins, FaCrown } from "react-icons/fa";
import { AiOutlineCrown } from "react-icons/ai";
import { Link } from "react-router-dom";
import cooking from "../../../common/cooking.png";

function Recipes() {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState("recipe");
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: orderBy,
    }).then((res) => {
      setRecipes(res.data.object);
    });
    // .catch((err) => console.log(err));
  }, [orderBy]);

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
      if (localStorage.getItem("user_id") !== null) {
        axios
          .get(
            `${
              axios.defaults.baseURL
            }recipe/like/userlist?user_id=${localStorage.getItem("user_id")}`
          )
          .then((res) => {
            setRecipes(res.data.object);
          })
          .catch((err) => {
            alert("북마크를 확인하시려면 로그인을 해주세요!");
            setRecipes([]);
          });
      } else {
        alert("북마크를 확인하시려면 로그인을 해주세요!");
        setRecipes([]);
      }
    }
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Appbar />
      <div onClick={handleClick} sytle={{ flex: "1" }}>
        <Container>
          <RecipeTop />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "2rem",
            }}
          >
            <img src={cooking} alt="convimg" style={{ width: 50 }} />
            <Typography
              variant="h4"
              style={{
                fontWeight: "bold",
                display: "flex",
                justifyContent: "start",
                paddingTop: 10,
                marginLeft: 10,
              }}
            >
              모두의 레시피
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} style={{ paddingLeft: 30 }}>
              <OrderByRecentLikeBookmark />
            </Grid>
            <Grid item xs={12} md={6} style={{ paddingRight: 10 }}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginBottom: "1rem",
                }}
              >
                <Searchbar setState={setRecipes} url="recipe/search" />
                <Button
                  id="write"
                  style={{
                    marginLeft: "1rem",
                    backgroundColor: "#F93D59",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 10,
                    height: "2rem",
                    marginTop: "10px",
                  }}
                >
                  글쓰기
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Box>
            <Grid container spacing={5}>
              {recipes ? (
                recipes
                  .slice(12 * (page - 1), 12 * (page - 1) + 12)
                  .map((recipe, idx) => <Recipe key={idx} recipe={recipe} />)
              ) : (
                <Box
                  style={{
                    marginTop: "5rem",
                    marginBottom: "3rem",
                    marginLeft: "5rem",
                  }}
                >
                  <Typography variant="h6">목록이 없습니다.</Typography>
                </Box>
              )}
            </Grid>
          </Box>

          <Pagination
            activePage={page}
            itemsCountPerPage={12}
            totalItemsCount={recipes.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
          ></Pagination>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
