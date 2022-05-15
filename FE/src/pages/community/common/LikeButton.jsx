/* eslint-disable no-unused-vars */
import { useFetchItem } from "./hooks";
import classNames from "classnames";
import axios from "axios";

function LikeButton({ url }) {
  const [like, setLike] = useFetchItem(url, 0);
  const user = localStorage.getItem("");
  function postLike() {
    if (!user) {
      alert("로그인이 필요합니다");
      return;
    }
    axios({
      method: "post",
      url,
    })
      .then((res) => console.log(res.data.object))
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
