/* eslint-disable no-unused-vars */
// import classNames from "classnames";

import { Link } from "react-router-dom";

interface ArticleProps {
  id: string;
  title: string;
  nickname: string;
  password: string;
  modifiedDate: string;
  content: string;
  photo: string;
}
interface Data {
  data: ArticleProps;
}
function Article({ data }: Data) {
  const { id, title, nickname, modifiedDate, photo }: ArticleProps = data;

  return (
    <div className="border-b border-slate-400 flex pt-3">
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
      <div className="inline-block">
        <Link
          className="text-2xl text-ellipsis overflow-hidden pl-1"
          style={{ wordBreak: "keep-all" }}
          to={`/community/${id}`}
          state={data}
        >
          {title}
        </Link>
        {/* <i className="icon-box icon-info icon-comment w-5 h-4"></i> 22
        <i className="icon-box icon-info icon-views w-5 h-4 ml-1"></i> 21 */}
        <div className="my-2 max-h-[50px] overflow-hidden">
          <img src="/images/admin.png" alt="" className="inline-block w-12" />
          {nickname} | {modifiedDate.split(".")[0].slice(0, -3)}
        </div>
      </div>
    </div>
  );
}

export default Article;
