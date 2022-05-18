/* eslint-disable no-unused-vars */
// import classNames from "classnames";

import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import adminIcon from "./admin.png";

interface ArticleProps {
  id: string;
  title: string;
  nickname: string;
  password: string;
  modifiedDate: string;
  content: string;
  photo: string;
  cnt: string;
}
interface Data {
  data: ArticleProps;
}
function Article({ data }: Data) {
  const { id, title, nickname, modifiedDate, photo, cnt }: ArticleProps = data;

  return (
    <div className="border-b border-slate-400 flex pt-3 sm:py-3">
      <img
        src={photo.split(",")[0]}
        alt=""
        className="w-20 max-h-20 inline-block border-r-2 md:max-h-32 md:w-32"
      />
      {/* <div className="updown-wrap absolute" style={{ left: 0, top: "30%" }}>
        <div className="icon-updown-box relative bottom-2">
          <i
            className="icon-box icon-info icon-up w-5 h-4 top-2 relative"
            style={{ display: "block" }}
          ></i>
          <i
            className="icon-box icon-info icon-down w-5 h-4 top-2 relative bottom-1"
            style={{ display: "block" }}
          ></i>
        </div>
        5
      </div> */}
      <div className="inline-block grow pr-5">
        <Link
          className="text-xl text-ellipsis overflow-hidden pl-1 flex justify-between"
          style={{ wordBreak: "keep-all" }}
          to={`/community/${id}`}
          state={data}
        >
          <div className="inline-block max-w-[220px] sm:max-w-[400px] h-[35px] overflow-hidden text-ellipsis">
            {title}
          </div>
          <span>
            <FavoriteIcon
              style={{ color: "#F93D59", marginLeft: 3, marginRight: 3 }}
            />
            {cnt}
          </span>
        </Link>

        <div className="my-2 max-h-[50px] overflow-hidden">
          <img src={adminIcon} alt="" className="inline-block w-12" />
          {nickname} | {modifiedDate.split(".")[0].slice(0, -3)}
        </div>
      </div>
    </div>
  );
}

export default Article;
