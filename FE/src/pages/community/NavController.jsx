import { Link } from "react-router-dom";
import { useState, Fragment } from "react";

function NavController() {
  const [dialog, setDialog] = useState(false);
  const [category, setcategory] = useState("전체글");

  return (
    <div>
      <div
        className="nav-controller relative"
        onClick={() => setDialog((curr) => !curr)}
      >
        {category}
        <div className="absolute right-1 top-3 ">
          <div className="icon-box icon-arrow w-5 h-5"></div>
        </div>
      </div>
      <NavDialog
        dialog={dialog}
        setDialog={setDialog}
        setcategory={setcategory}
      />
    </div>
  );
}

function clickHandler({ target }, setcategory) {
  if (target.matches("a")) {
    setcategory(target.textContent);
  }
}

function NavDialog({ dialog, setDialog, setcategory }) {
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
          clickHandler(e, setcategory);
        }}
      >
        <Link to="all" className="nav-link">
          전체글
        </Link>
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
