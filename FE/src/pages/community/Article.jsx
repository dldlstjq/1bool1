// import { Link } from "react-router-dom";
import classNames from "classnames";

function Article({ articleId, noti }) {
  return (
    <li className={classNames({ noti }, "article")}>
      <div className="updown-wrap">
        <div className="like-item">
          <i className="icon-up"></i>
          <i className="icon-down"></i>
        </div>
        <div>5</div>
      </div>
      {/* <Link to={`${articleId}`}>첫번째 공지사항은 두둥 힘내라!</Link> */}
      <h3 className="article-title">첫번째 공지사항은 두둥 힘내라!</h3>
      {noti && <span className="gm-label"></span>}
      <div className="icons">
        <span className="icon-and-number">
          <i className="icon icon-comment"></i>22
        </span>
        <span className="icon-and-number">
          <i className="icon icon-view"></i>21
        </span>
        <span className="author">[매니저]루아</span>
        <div className="date">4일 전</div>
      </div>
    </li>
  );
}

export default Article;
