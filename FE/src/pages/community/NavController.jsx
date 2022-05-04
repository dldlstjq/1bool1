import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";

function NavController() {
  const { category } = useParams();
  const [dialog, setDialog] = useState(false);
  const [categ, setcateg] = useState(category);

  return (
    <div>
      <div
        className="nav-controller relative"
        onClick={() => setDialog((curr) => !curr)}
      >
        카테고리
        <div className="absolute right-1 top-3 ">
          <div className="icon-box icon-arrow w-5 h-5"></div>
        </div>
      </div>
      <NavDialog dialog={dialog} setDialog={setDialog} setcateg={setcateg} />
    </div>
  );
}

function clickHandler({ target }, setcateg) {
  if (target.matches("a")) {
    setcateg(target.textContent);
  }
}

function NavDialog({ dialog, setDialog, setcateg }) {
  if (!dialog) {
    return null;
  }

  return (
    <div>
      <div className="nav-dialog-background" />
      <div
        className="nav-dialog-block"
        onClick={(e) => {
          setDialog(false);
          clickHandler(e, setcateg);
        }}
      >
        <Link to="recipe" className="nav-link">
          레시피 게시판
        </Link>
        <Link to="free" className="nav-link">
          자유 게시판
        </Link>
      </div>
    </div>
  );
}

export default NavController;
