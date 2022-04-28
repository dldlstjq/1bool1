import "./input.scss";

import NavController from "./NavController";
import Articles from "./Articles";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";

function Community() {
  return (
    <div className="community">
      <div className="temp-navbar"></div>
      <NavController />
      <Articles />
      <Pagination />
      <div style={{ padding: "1rem" }}>
        <Searchbar />
      </div>
    </div>
  );
}

export default Community;
