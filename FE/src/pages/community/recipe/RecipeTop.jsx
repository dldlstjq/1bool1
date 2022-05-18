/* eslint-disable no-unused-vars */
import React from "react";
import {
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

function RecipeTop(props) {
  // const [menus, setMenu] = usetState([]);

  axios.get(`https://k6d207.p.ssafy.io/api/v1/recipe/like/week`);

  return (
    <div>
      <Box>
        <Typography
          variant="h4"
          style={{
            fontWeight: "bold",
            display: "flex",
            justifyContent: "start",
            marginTop: "4rem",
          }}
        >
          인기 레시피 TOP 4
        </Typography>
      </Box>
      <Box>
        <Grid></Grid>
      </Box>
    </div>
  );
}

export default RecipeTop;
