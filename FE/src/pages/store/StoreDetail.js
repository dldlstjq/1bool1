/* eslint-disable no-unused-vars */

import React from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import {
  useFetchHit,
  useFetchItem,
  useFetchListAndUpdate,
} from "../../pages/community/common/hooks";

import { BASE_URL } from "../../index";
import axios from "axios";

import GoodsComments from "../../pages/community/common/GoodsComments";
import Comments from "../../pages/community/common/comment/Comments";
import { DeleteOrUpdate } from "../../pages/community/common/comment/DeleteOrUpdate";

import Appbar from "../../components/main/Appbar";
import Footer from "../../components/main/Footer";

import "./StoreDetail.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function StoreDetail() {
  const location = useLocation();
  let goods = {};
  if (location.state !== null) {
    goods = location.state.data;
    localStorage.setItem("goodsId", goods.id);
  }

  const { articleId } = useParams();
  const [showcomments, setshowcomments] = useState(true);
  const [foo, refresh] = useState(0);
  const [invokeUseEffect, setInvokeUseEffect] = useState(0);
  const [articlePw, setarticlePw] = useState("");
  const [isLike, setIsLike] = useState(false);

  const coordRef = useRef([0, 0]);
  const textareaRef = useRef();
  const navi = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_id") !== null) {
      axios({
        method: "get",
        url: BASE_URL + `goods/like/user/${goods.id}`,
        params: {
          userId: localStorage.getItem("user_id"),
        },
      }).then((res) => {
        if (res.data.object === true) setIsLike(true);
      });
    }
  }, [goods.id]);

  const [comments, setComments] = useFetchListAndUpdate(
    `goodsreview/${localStorage.getItem("goodsId")}`,
    foo
  );

  const convName = {
    MS: "MINISTOP",
    CU: "CU",
    GS: "GS25",
    SE: "7-ELEVEn",
    CS: "CSPACE24",
    EM: "emart24",
  };

  const showEvent = {
    1: "행사안함",
    2: "1+1",
    3: "2+1",
    4: "3+1",
    5: "SALE",
    6: "덤증정",
    7: "균일가",
  };

  const {
    id,
    createdDate,
    modifiedDate,
    name,
    price,
    photoPath,
    photo,
    isSell,
    event,
    hit,
    convinence,
  } = goods;

  const str = String(price);
  let strPrice;
  if (str.length === 4)
    strPrice = str.substring(0, 1) + "," + str.substring(1, str.length);
  else strPrice = str.slice(0, 2) + "," + str.slice(2, str.length);

  function handleClick(e) {
    const { target, clientX, clientY } = e;
    if (target.matches("#show-comments")) {
      setshowcomments((prev) => !prev);
    }
    if (target.matches("#focus")) {
      setshowcomments((prev) => true);
      setTimeout(() => {
        textareaRef.current.focus();
      }, 500);
    }
  }

  const handleChange = async (e) => {
    if (localStorage.getItem("user_id") === null) {
      alert("로그인을 해야 좋아요가 가능합니다!");
      return;
    }

    const likeCurrent = e.target.checked;
    setIsLike(likeCurrent);
    try {
      await axios({
        method: "put",
        url: BASE_URL + `goods/like/${localStorage.getItem("goodsId")}`,
        params: {
          user_id: localStorage.getItem("user_id"),
        },
      }).then((res) => {
        if (res.data.statusCode === 200) {
        }
      });
    } catch (err) {}
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100%" }}
    >
      <Appbar />
      <div style={{ flex: "1", marginTop: 30 }}>
        <Container>
          <div onClick={handleClick}>
            <div className="content-box">
              {convName[convinence] === "CU" && (
                <div id="CU" className="grey">
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === "MINISTOP" && (
                <div id="MS" className="grey">
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === "GS25" && (
                <div id="GS" className="grey">
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === "emart24" && (
                <div id="EM" className="grey">
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === "CSPACE24" && (
                <div id="CS" className="grey">
                  {convName[convinence]}
                </div>
              )}
              {convName[convinence] === "7-ELEVEn" && (
                <div id="SE" className="grey">
                  {convName[convinence]}
                </div>
              )}
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <img
                  style={{
                    display: "block",
                    margin: "0px auto",
                    width: "28%",
                    height: "28%",
                  }}
                  src={photoPath}
                  alt={name}
                />
              </Box>
              <Box sx={{ flexGrow: 1, display: { lg: "none", md: "none" } }}>
                <img
                  style={{
                    display: "block",
                    margin: "0px auto",
                  }}
                  src={photoPath}
                  alt={name}
                />
              </Box>

              <p id="goodsTitle">{name}</p>
              <p id="goodsPrice">{strPrice}원</p>
              <p id="goodsEvent">{showEvent[event]} </p>
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
            <Comments which="goods" detailId={goods.id} />

            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={() => navi("/store")}
                style={{
                  backgroundColor: "#F93D59",
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "2rem",
                }}
              >
                목록
              </Button>
            </Box>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default StoreDetail;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
