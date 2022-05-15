/* eslint-disable no-unused-vars */
import { useState } from "react";

import { useFetchAndUpdate } from "./hooks";
import classNames from "classnames";
import axios from "axios";

function LikeButton({ url, user_id }) {
  const [foo, refresh] = useState(0);
  const [like, setLike] = useFetchAndUpdate(url, foo);
  function postLike() {
    if (!user_id) {
      alert("로그인이 필요합니다");
      return;
    }
    axios({
      method: "post",
      url,
      params: { user_id },
    })
      .then(() => refresh(foo + 1))
      .catch((err) => console.log(err));
  }

  return (
    <div className="text-center my-7">
      <button className="btn" onClick={postLike}>
        <i className={classNames("icon-box icon-info w-5 h-5", "icon-up")}></i>
        {like}
      </button>
    </div>
  );
}

export default LikeButton;
