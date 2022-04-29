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
        카테고리
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
      <div className="nav-dialog-block" onClick={() => setDialog(false)}>
        <Link to="all" className="nav-link">
          전체글
        </Link>
        <Link to="recipe" className="nav-link">
          레시피
        </Link>
        <Link to="free" className="nav-link">
          자유
        </Link>
      </div>
    </div>
  );
}

export default NavController;
