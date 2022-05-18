/* eslint-disable no-unused-vars */
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useState } from "react";
import {
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function ButtonAndPerPage({ setState, like, recent }) {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  // function handleClick({ target }) {
  //   if (target.id === "order-by-recent") {
  //     setState(like);
  //     return;
  //   }
  //   if (target.id === "order-by-like") {
  //     setState(recent);
  //     return;
  //   }
  // }

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#F93D59",
          },
          display: "flex",
        }}
        // inBarStyle={{ background: "#F93D59" }}
        inbarStyle={{ background: "#F93D59" }}
      >
        <Tab
          id="order-by-recent"
          label="최신등록순"
          sx={{
            "&.Mui-selected": { color: "#F93D59" },
            fontWeight: "bolder",
            fontSize: "1rem",
          }}
          index={0}
        />
        <Box
          style={{
            alignSelf: "center",
            height: "20px",
            width: "2px",
            backgroundColor: "#F93D59",
          }}
        ></Box>
        <Tab
          id="order-by-like"
          label="좋아요순"
          sx={{
            "&.Mui-selected": { color: "#F93D59" },
            fontWeight: "bolder",
            fontSize: "1rem",
          }}
          index={1}
        />
        <Box
          style={{
            alignSelf: "center",
            height: "20px",
            width: "2px",
            backgroundColor: "#F93D59",
          }}
        ></Box>
        <Tab
          id="bookmark"
          label="북마크"
          sx={{
            "&.Mui-selected": { color: "#F93D59" },
            fontWeight: "bolder",
            fontSize: "1rem",
          }}
          index={2}
        />
      </Tabs>
    </div>
  );
}

export default ButtonAndPerPage;
