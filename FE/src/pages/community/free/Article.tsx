/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import adminIcon from "./admin.png";
import "./article.css";

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
        className="w-20 max-h-20 inline-block border-r-2 md:max-h-32 md:w-32 shrink-0"
      />
      <div className="inline-block grow pr-5 article-after-img">
        <Link
          className="md:text-xl xl:text-2xl text-ellipsis overflow-hidden pl-1 flex justify-between"
          style={{ wordBreak: "keep-all" }}
          to={`/community/${id}`}
          state={data}
        >
          <div
            className="inline-block h-[31px] overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ maxWidth: "calc(100% - 42px)" }}
          >
            {title}
          </div>
          <span>
            <FavoriteIcon
              style={{ color: "#F93D59", marginLeft: 3, marginRight: 3 }}
            />
            {cnt}
          </span>
        </Link>

        <div className="my-2 max-h-[50px] overflow-hidden hidden lg:block">
          <img src={adminIcon} alt="" className="inline-block w-12" />
          {nickname} | {modifiedDate?.split(".")[0].slice(0, -3)}
        </div>
        <div className="my-2 overflow-hidden flex lg:hidden ">
          <img src={adminIcon} alt="" className="inline-block w-12" />
          {nickname}
          <br /> {modifiedDate?.split(".")[0].slice(0, -3)}
        </div>
      </div>
    </div>
  );
}

export default Article;
