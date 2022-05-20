/* eslint-disable no-unused-vars */

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

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
import FavoriteIcon from "@mui/icons-material/Favorite";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Detail() {
  const navi = useNavigate();
  let id = useParams().articleId;
  const [data, setData] = useState({
    title: "",
    content: "",
    modifiedDate: "",
    nickname: "",
    password: "",
    photo: "",
    cnt: "",
    id: "",
  });
  const [articlePw, setarticlePw] = useState("");
  const [isLike, setIsLike] = useState(false);

  let userId = localStorage.getItem("user_id");
  let userLike = userId && JSON.parse(localStorage.getItem("board"));
  const boardIdArray = JSON.parse(localStorage.getItem("boardIdArray"));

  const [idx, setIdx] = useState(
    boardIdArray.findIndex((boardId) => id === boardId)
  );
  const prev = boardIdArray[Math.max(idx - 1, 0)];
  const next = boardIdArray[Math.min(idx + 1, boardIdArray.length - 1)];

  useEffect(() => {
    axios({
      method: "get",
      url: "board/" + id,
    })
      .then((res) => setData(res.data.object))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    userLike?.forEach((article) => {
      if (article.id === id) setIsLike(true);
    });
  }, [userLike, id]);

  const { title, content, modifiedDate, nickname, password, photo, cnt } = data;
  let time = moment({ modifiedDate }).format("YYYY.MM.DD HH:mm");

  const handleChange = async (e) => {
    if (localStorage.getItem("user_id") === null) {
      alert("로그인을 해야 좋아요가 가능합니다!");
      return;
    }
    try {
      await axios({
        method: "post",
        url: `board/like/${id}`,
        params: {
          user_id: localStorage.getItem("user_id"),
        },
      }).then((res) => {
        if (res.data.statusCode === 200) {
          userLike = isLike
            ? userLike.filter((likeId) => likeId !== id)
            : [...userLike, id];
          localStorage.setItem("board", JSON.stringify(userLike));
          setIsLike((prev) => !prev);
        }
      });
    } catch (err) {
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Appbar />
      <div style={{ flex: "1" }} className="lg:w-3/4 sm:w-11/12 mx-auto">
        <Container>
          <Box
            sx={{
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
              <Grid container>
                <Grid item xs={6} md={6}>
                  <Typography style={{ marginBottom: 10 }}>
                    {" "}
                    <AccountCircleIcon
                      style={{ marginRight: 3, color: "#F93D59" }}
                    />
                    {nickname} | {time}{" "}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    paddingRight: 10,
                    alignItems: "center",
                  }}
                >
                  <FavoriteIcon style={{ color: "#F93D59", marginRight: 3 }}>
                    {" "}
                    &nbsp;
                  </FavoriteIcon>
                  {cnt}
                </Grid>
              </Grid>

            </Box>
            <Box style={{ margin: "1rem" }}>
              <Typography style={{ padding: "1rem" }}>{content}</Typography>
              <Box>
                {photo !== "error" &&
                  photo?.split(",").map((url, idx) => (
                    <Box style={{ width: "150px", height: "150px" }}>
                      <img src={url} alt="이미지 확인중" key={idx} />
                    </Box>
                  ))}
              </Box>
            </Box>
            <div className="text-center mt-10 mb-5">
              <div className="text-center my-7">
                <button className="btn">
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isLike}
                    onChange={handleChange}
                    color="error"
                  />
                </button>
              </div>
            </div>
          </Box>

          <Box
            style={{ display: "flex", justifyContent: "end", marginTop: 10 }}
          >
            <DeleteOrUpdate
              setPassword={setarticlePw}
              inputPassword={articlePw}
              password={password}
              url={"board/" + id}
              afterUrl="/community"
              updatePageUrl="/community/write"
              params={{ password }}
            />
          </Box>

          <Comments detailId={id} which="board" />
          <div className="text-center">
            <Button
              onClick={() => {
                navi("/community/" + prev);
                setIdx(idx > 0 ? idx - 1 : 0);
              }}
              style={{
                backgroundColor: "#F93D59",
                color: "white",
                fontWeight: "bold",
              }}
            >
              이전
            </Button>
            <Button
              onClick={() => navi("/community")}
              style={{
                backgroundColor: "#F93D59",
                color: "white",
                fontWeight: "bold",
                margin: "2rem",
              }}
            >
              목록
            </Button>
            <Button
              onClick={() => {
                navi("/community/" + next);
                setIdx(
                  idx < boardIdArray.length - 2 ? idx + 1 : boardIdArray.length
                );
              }}
              style={{
                backgroundColor: "#F93D59",
                color: "white",
                fontWeight: "bold",
              }}
            >
              다음
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Detail;
