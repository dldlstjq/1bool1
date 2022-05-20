/* eslint-disable no-unused-vars */

import "./input.scss";
import { Outlet } from "react-router-dom";

import NavController from "./NavController";

function Community() {
  return (
    <div className="community">
      <div className="temp-navbar"></div>

      <div className="p-2">
        <Outlet />
      </div>
    </div>
  );
}

export default Community;
