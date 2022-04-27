import { Link } from "react-router-dom";
import classNames from "classnames";

function Article({ noti }) {
  return (
    <li className={classNames({ noti })}>
      <div className="sympathy-wrap">
        <div className="sympathy-item">
          <i className="spr-info up"></i>
          <i className="spr-info down"></i>
        </div>
        <div>5</div>
      </div>
      <Link to="/">첫번째 공지사항은 두둥 힘내라!</Link>
      {noti && <span className="gm-label"></span>}
      <div className="opinion">
        <span>
          <i className="icon icon-comment"></i>22
        </span>
        <span>
          <i className="icon icon-view"></i>21
        </span>
        <button className="author">[매니저]루아</button>
        <div className="date">2022-04-25</div>
      </div>
    </li>
  );
}

export default Article;
