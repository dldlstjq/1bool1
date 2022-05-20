/* eslint-disable no-unused-vars */
import axios from "axios";

function postLike(url, user_id) {
  axios({
    method: "post",
    url,
    params: { user_id },
  })
}
