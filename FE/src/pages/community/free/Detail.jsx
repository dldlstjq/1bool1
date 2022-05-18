/* eslint-disable no-unused-vars */

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Comments from "../common/comment/Comments";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import Appbar from "../../../components/main/Appbar";
import Footer from "../../../components/main/Footer";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import moment from "moment";

import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

function Detail() {
  const state = useLocation().state;
  const [articlePw, setarticlePw] = useState("");
  const navi = useNavigate();
  const { title, content, modifiedDate, id, nickname, password, photo, cnt } =
    state;
  const userId = localStorage.getItem("user_id");
  let time = moment({ modifiedDate }).format("YYYY.MM.DD HH:mm");
  // let likes;
  // useEffect(() => {
  //   likes = JSON.parse(localStorage.getItem("likes"));
  // });

  function handleLike() {
    // setIsLike((prev) => !prev);
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Appbar />
      <div style={{ flex: "1" }}>
        <Container>
          <Box
            sx={{
              borderTop: 2,
              borderBottom: 2,
              borderColor: "grey.500",
              marginTop: "3rem",
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "grey.500",
                paddingLeft: "1rem",
              }}
            >
              <Typography
                variant="h4"
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                {title}
              </Typography>
              <Typography style={{ marginBottom: 10 }}>
                {" "}
                <AccountCircleIcon
                  style={{ marginRight: 3, color: "#F93D59" }}
                />
                {nickname} | {time}{" "}
              </Typography>
            </Box>
            <Box style={{ margin: "1rem" }}>
              <Typography style={{ padding: "2rem" }}>{content}</Typography>
              <Box>
                {photo?.split(",").map((url, idx) => (
                  <Box style={{ width: "150px", height: "150px" }}>
                    <img src={url} alt="이미지 확인중" key={idx} />
                  </Box>
                ))}
              </Box>
            </Box>
            <div className="text-center mt-10 mb-5">
              {/* {isLike ? (
                <Favorite
                  color="error"
                  style={{ width: "35px" }}
                  onClick={handleLike}
                />
              ) : (
                <FavoriteBorder
                  color="error"
                  style={{ width: "35px" }}
                  onClick={handleLike}
                />
              )} */}
            </div>
          </Box>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={6}></Grid> */}
            <Grid
              item
              xs={12}
              md={6}
              style={{
                display: "flex",
                justifyContent: "end",
                paddingRight: 10,
                marginTop: 10,
              }}
            >
              <Box style={{ display: "flex", justifyContent: "end" }}>
                <DeleteOrUpdate
                  setPassword={setarticlePw}
                  inputPassword={articlePw}
                  password={password}
                  url={"board/" + id}
                  afterUrl="/community"
                  updatePageUrl="/community/write"
                  state={state}
                  params={{ password }}
                />
              </Box>
            </Grid>
          </Grid>

          <Comments detailId={id} which="board" />

          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={() => navi("/community")}
              style={{
                justifyContent: "center",
                backgroundColor: "#F93D59",
                color: "white",
                fontWeight: "bold",
              }}
            >
              목록
            </Button>
          </Box>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
