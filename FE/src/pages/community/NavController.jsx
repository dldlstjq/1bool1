import { Link } from "react-router-dom";
import { useState, Fragment } from "react";

function NavController() {
  const [dialog, setDialog] = useState(false);
  return (
    <div>
      <div
        className="nav-controller"
        onClick={() => setDialog((curr) => !curr)}
      >
        전체글
        <button className="nav-controller-btn">
          <i className="icon icon-arrow"></i>
        </button>
      </div>
      <NavDialog dialog={dialog} setDialog={setDialog} />
    </div>
  );
}

function NavDialog({ dialog, setDialog }) {
  if (!dialog) {
    return null;
  }

  return (
    <div>
      <div className="nav-dialog-background" />
      <div className="nav-dialog-block">
        <Link to="/" className="nav-link">
          전체글
        </Link>
        <Link to="/" className="nav-link">
          레시피
        </Link>
        <Link to="/" className="nav-link">
          자유게시판
        </Link>
        <Link to="/" className="nav-link">
          자유게시판
        </Link>
      </div>
    </div>
  );
}

export default NavController;
