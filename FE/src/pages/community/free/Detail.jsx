/* eslint-disable no-unused-vars */

import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useFetchItem, useFetchAndUpdate } from "../common/hooks";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Comments from "../common/comment/Comments";
import UserInfoBox from "./UserInfoBox";
import { DeleteOrUpdate } from "./DeleteOrUpdate";
import LikeButton from "../common/LikeButton";
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

function Detail() {
  // const [inputPw, setInputPw] = useState("");

  // const navi = useNavigate();
  // const state = useLocation().state;
  // // const [articleData] = useFetchItem(`board/${articleId}`, []);

  // const { title, content, modifiedDate, id, nickname, password, photo } = state;
  const { articleId } = useParams();
  const [showcomments, setShowcomments] = useState(true);
  const [foo, refresh] = useState(0);
  const [articlePw, setarticlePw] = useState("");

  const navi = useNavigate();

  const [articleData] = useFetchItem(`board/${articleId}`, []);
  const comments = useFetchAndUpdate(`comment/${articleId}`, foo, []);

  const { title, content, modifiedDate, id, nickname, password, photo } =
    articleData;

  const user_id = localStorage.getItem("user_id");
  let time = moment({ modifiedDate }).format("YYYY.MM.DD HH:mm");

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
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* {user_id && id && ( */}
              <LikeButton url={"board/like/" + id} user_id={user_id} />
              {/* )} */}
              {/* <UserInfoBox nickname={nickname} /> */}
            </Grid>
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
                  state={articleData}
                  params={{ password }}
                />
              </Box>
            </Grid>
          </Grid>

          <Comments id={id} />
          {/* <Box style={{margin:'1rem'}}>
              {showcomments && (
                <Comments
                comments={comments}
                articleId={articleId}
                boardId={id}
                url={"/comment/" + id}
                  refresh={refresh}
                />
              )}
            </Box> */}

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
